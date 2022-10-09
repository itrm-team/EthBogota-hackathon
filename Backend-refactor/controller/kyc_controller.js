const crypto = require("crypto");
const axios = require("axios");
const { Users } = require("./../models");

async function sha256(secret, message) {
	let hmac = crypto.createHmac("sha256", secret);
	data = hmac.update(message);
	gen_hmac = data.digest("Hex");
	return gen_hmac;
}

async function sha512(secret, message) {
	let hmac = crypto.createHmac("sha512", secret);
	data = hmac.update(message);
	gen_hmac = data.digest("Hex");
	return gen_hmac;
}

async function updateUserWithKycInfo(email, fraudCheckId) {
	try {
		const user = await Users.findOne({ where: { email } });
		user.metadata.fraudCheckId = fraudCheckId;
		user.changed("metadata", true);
		await user.save();
		return "user updated";
	} catch (error) {
		console.error(error);
		console.log(">>NO SE PUDO AGREGAR EL FRAUDCHEK ID", fraudCheckId, "AL USUARIO", email);
		return;
	}
}

async function getNameFromKYC(fraudCheckId) {
	try {
		let [name, lastName] = ["", ""];
		const accesTokenKyc_ = await accesTokenKyc();
		const config = {
			method: "get",
			url: "https://api.sekuritance.com/verification/v2/kyc/" + fraudCheckId,
			headers: {
				Authorization: `Bearer ${accesTokenKyc_}`,
				Cookie: `Authorization=Bearer+${accesTokenKyc_}`,
			},
		};
		await axios(config).then(function (response) {
			name = response.data.user.firstName;
			lastName = response.data.user.lastName;
		});
		return { name: name, lastName: lastName };
	} catch (error) {
		console.log(error);
	}
}

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
	return accessToken;
}

module.exports = {
	update: async function (req, res) {
		try {
			const [headers, body] = [req.headers, req.body];
			const signature = await sha256(process.env.KYC_API_CALLBACK_PROD, JSON.stringify(body));
			console.log(">>signauture:", signature);
			console.log(">>headers:", headers["x-payload-signature"]);
			if (signature != headers["x-payload-signature"])
				return res.status(400).json({ msg: "Cannot verify origin" });
			const { fraudCheckId, user } = body;
			if (!(fraudCheckId && user)) return res.status(400).json({ msg: "Incomplete parameters" }); //maybe use throw
			await updateUserWithKycInfo(user.emailAddress, fraudCheckId);
			return res.status(200).json({ msg: "Successful callback" });
		} catch (error) {
			console.error(error);
			return res.status(400).json({ msg: error.message });
		}
	},

	getDataForTransaction: async function (req, res) {
		try {
			const { email } = req.query;
			const user = await Users.findOne({ where: { email } });
			if (!user) return res.status(400).json({ msg: "no existe el usuario" });
			if (!user.metadata.fraudCheckId)
				return res.status(201).json({ msg: "el usuario no esta registrado en sekuritance" });
			const names = await getNameFromKYC(user.metadata.fraudCheckId);
			return res.status(200).json(names);
		} catch (error) {
			return res.status(400).json({ msg: error.message });
		}
	},
};
