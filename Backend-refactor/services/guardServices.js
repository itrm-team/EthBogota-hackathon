const axios = require("axios");
const jwt = require("jsonwebtoken");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const config = require("../config/config.json");
const {
	_isWrongToken,
	_canRefreshToken,
	_userHasResource,
	_checkParams,
	_checkFraudCheckId,
} = require("../enums/accessRules");
const { SUPERADMIN_ROLE, ADMIN_ROLE, REGULAR_USER_ROLE } = require("../enums/roles");
const { db, Users, UserBalance, Role } = require("./../models");

var jwtStrategyOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	algorithm: ["HS256"],
	secretOrKey: config.jwtSecret,
};

exports.regularRequest = {
	authenticate: (allowedRole, options) => {
		return async (req, res, next) => {
			try {
				const token = req.headers.authorization.replace(/Bearer /g, "");
				const { middleware } = options;
				if (!token) return res.status(400).json({ msg: "UNAUTHORIZED" });
				if (!middleware) return res.status(500).send("Server Error; Broken guards");
				const decode = jwt.decode(token, jwtStrategyOptions);
				jwt.verify(token, process.env.JWT_SECRET, jwtStrategyOptions, (err, decoded) => {
					if (err) {
						console.error("token error !", err);
						return res.status(401).json({ msg: "Unauthorized" });
					}
					return verify({
						decoded,
						req,
						res,
						next,
						allowedRole,
						token,
						middleware,
					});
				});
			} catch (error) {
				return { msg: error.message };
			}
			//if(!req.headers.authorization) return res.status(401).json({ msg: 'Unauthorized' });
		};
	},

	/* return new JwtStrategy(opts, (jwt_payload, done)=> {
	
		if(jwt_payload) {
			done(processRequest(role, options, jwt_payload));
		} else return done("UNAUTHORIZED", false);
		
	}) */
};

async function verify(body) {
	try {
		const { decoded, req, res, next, allowedRole, token, middleware } = body;
		const bodyBuffer = { ...req.body };
		req.body = { ...req.body, decoded };
		const actuator = getErrorActuator();
		return await Promise.all(
			getConditions(middleware, {
				decoded,
				allowedRole,
				token,
				req,
				res,
				bodyBuffer,
			})
		).then(
			(promised) => {
				return next();
			},
			(e) => {
				console.error("got error", e);
				return actuator[e.index](res);
			}
		);
	} catch (error) {
		return { msg: error.message };
	}
}

function getConditions(middleware, body) {
	try {
		const { decoded, allowedRole, token, bodyBuffer, req } = body;

		const promises = [
			() => isWrongToken(decoded, allowedRole).catch(getCatch(_isWrongToken)),
			() => canRefreshToken(decoded, token).catch(getCatch(_canRefreshToken)),
			() => userHasResource(decoded, allowedRole, req).catch(getCatch(_userHasResource)),
			() => checkParams(decoded, bodyBuffer).catch(getCatch(_checkParams)),
			() => checkFraudCheckId(decoded).catch(getCatch(_checkFraudCheckId)),
		];

		let conditions = [];
		for (const i in promises) {
			if (middleware.includes(parseInt(i))) {
				conditions.push(promises[i]());
			}
		}
		return conditions;
	} catch (error) {
		return { msg: error.message };
	}
}

function getCatch(functionEnum) {
	return (e) => {
		e.index = functionEnum;
		throw e;
	};
}

function getErrorActuator() {
	let actuator = {};
	actuator[_isWrongToken] = (res) => res.status(401).json({ msg: "Unauthorized" });
	actuator[_canRefreshToken] = (res) => res.status(400).json({ msg: "Session error" });
	actuator[_userHasResource] = (res) => res.status(400).json({ msg: "Unauthorized resource" });
	actuator[_checkParams] = (res) => res.status(401).json({ msg: "Unathorized payload" });
	actuator[_checkFraudCheckId] = (res) => res.status(401).json({ msg: "KYC error" });
	return actuator;
}

async function checkFraudCheckId(decoded) {
	// console.log(">>fraudcheckId:>>>>>>>>>>",decoded.fraudCheckId)
	return new Promise(async (response, reject) => {
		try {
			if (!decoded) {
				reject({});
			}
			const accesTokenKyc_ = await accesTokenKyc();
			const config = {
				method: "get",
				url: "https://api.sekuritance.com/verification/v2/kyc/"+decoded.fraudCheckId,
				headers: {
					Authorization: `Bearer ${accesTokenKyc_}`,
					Cookie: `Authorization=Bearer+${accesTokenKyc_}`,
				},
			};
			await axios(config).then(function (response) {
				console.log(">>verifyng user status >>",JSON.stringify(response.data.userStatus));
				if (response.data.userStatus != 'VERIFIED') reject({msg:`Estado del kyc ${response.data.userStatus} no valido`})
			});
			response(true);
		} catch (error) {
			console.log(error)
			reject({msg:"no se pudo verificar el estado de KYC"})
		}
		
	});
}

///este se remueve
async function accesTokenKyc() {
	const data = JSON.stringify({
		username: process.env.KYC_USER,
		password: process.env.KYC_PASSWORD,
	});
	const config = {
		method: "post",
		url: "https://api.sekuritance.com/auth/v1/public/users/login",
		headers: {
			"Content-Type": "application/json",
		},
		data: data,
	};
	const accessToken = await axios(config).then((res) => {
		return res.data.accessToken;
	});
	return accessToken
}

async function isWrongToken(decoded, allowedRole) {
	return new Promise((response, reject) => {
		if (!decoded || allowedRole < decoded.id_role) {
			reject({});
		}
		response(true);
	});
}

async function sessionExists(email, token) {
	return new Promise((response) => {
		response(false);
		/* client.get(email, (err, responseToken) => {
			if (err) return response(false);
			responseToken = JSON.parse(responseToken);
			if (responseToken?.token && token === responseToken.token)
				return response(true);
			return response(false);
		}); */
	});
}

async function userHasResource(decoded, allowedRole, req) {
	return new Promise(async (resolve, reject) => {
		try {
			const { id_user } = req.route ? (req.route.methods.get ? req.query : req.body) : null;
			const { username, email } = decoded;
			const _id_user = decoded.id_user;

			if (!id_user || !_id_user) reject({ msg: "non identifiable parameters" });

			const role = await Role.findOne({ where: { id_role: decoded.id_role } });

			if (decoded.id_role <= allowedRole) {
				if (role.role === "ADMIN" || role.role === "SUPERADMIN") resolve(true);
				else {
					const user = await Users.findOne({
						where: { id_user },
					});

					if (id_user !== _id_user) {
						reject({});
					} else if (user.email === email || user.username === username) {
						resolve(true);
					} else {
						reject({});
					}
				}
			} else {
				reject({});
			}
		} catch (error) {
			return { msg: error.message };
		}
	});
}

async function canRefreshToken(decoded, token) {
	return new Promise(async (resolve, reject) => {
		// const now = Math.floor(Date.now() / 1000);

		if (!(await sessionExists(decoded.email, token))) return reject(false);
		// if (decoded.refresh <= now) {
		// 	const new_token = await guard_services.refresh_token({
		// 		...decoded,
		// 		token,
		// 	});
		// 	res.setHeader('authorization', new_token.token);
		// 	return new_token ? resolve(req.body) : reject({});
		// }
		// res.setHeader('authorization', token);
		return resolve(true);
	});
}

async function checkParams(decoded, bodyBuffer) {
	return new Promise((resolve, reject) => {
		try {
			if (decoded.id_role <= ADMIN_ROLE) return resolve(true);
			for (const [key, value] of Object.entries(bodyBuffer)) {
				if ((!decoded[key] || decoded[key] != value) && key !== "token") return reject({});
				return resolve(true);
			}
		} catch (error) {
			return reject({});
		}
	});
}

async function checkApiKey(decoded, headers) {
	return new Promise((resolve, reject) => {
		// const { apiKey, host } = headers;
	});
}

exports.validateRequest = (role, options) => {
	return new JwtStrategy(jwtStrategyOptions, (jwt_payload, done) => {
		if (jwt_payload) {
			done(processRequest(role, options, jwt_payload));
		} else return done("UNAUTHORIZED", false);

		/* UserP.identifyU(jwt_payload, function(err, user){
			//console.log("passport for user",[err, user]);
	
			if (err) 
				return done(err, false);
			if (user) 
				return done(null, user);
			else 
				return done("UNAUTHORIZED", false);
		}); */
	});
};

function processRequest(role, options, jwt_payload) {
	return null, true;
}

/* module.exports = new JwtStrategy(opts, function(jwt_payload, done){
    UserP.identifyU(jwt_payload, function(err, user){
        //console.log("passport for user",[err, user]);
        if (err) 
            return done(err, false);
        if (user) 
            return done(null, user);
        else 
            return done("UNAUTHORIZED", false);
    });
}); */
