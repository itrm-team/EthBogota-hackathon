const { Users, UserBalance, Role, Sequelize, sequelize } = require("./../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function createToken(user) {
	const signature = jwt.sign(
		{
			key: user.id_user,
			email: user.email,
			id_role: user.id_role,
			id_user: user.id_user,
			ref: user.id_user,
			statusTutorial: user.metadata.statusTutorial,
			numberQ1: user.metadata.numberQ1,
			questionR1: user.metadata.questionR1,
			numberQ2: user.metadata.numberQ2,
			questionR2: user.metadata.questionR2,
			fraudCheckId: user.metadata.fraudCheckId,
			timerUpdate: user.metadata.timerUpdate,
		},
		process.env.JWT_SECRET,
		{
			algorithm: "HS256",
			expiresIn: 60000,
		}
	);
	return signature;
}

module.exports = {
	createToken,

	get: async function (req, res) {
		try {
			const { id_user } = req.body;
			const user = await Users.findOne({
				where: { id_user },
				attributes: [
					"email",
					"password",
					"id_role",
					"updated",
					"createdAt",
					"updatedAt",
					"statusTutorial",
				],
				include: [
					{
						model: Role,
						attributes: ["role"],
					},
				],
			});
			if (!user) return res.status(400).send("user does not exist");
			return res.status(200).json(user);
		} catch (error) {
			console.error("user get error", error);
			return res.status(400).send("error getting user");
		}
	},

	getSelf: async function (req, res) {
		try {
			const { id_user } = req.body;
			const user = await Users.findOne({
				where: { id_user },
				attributes: ["email", "password", "id_role", "updated", "createdAt", "updatedAt"],
				include: [
					{
						model: Role,
						attributes: ["role"],
					},
				],
			});
			if (!user) return res.status(400).send("user does not exist");
			return res.status(200).json(user);
		} catch (error) {
			console.error("getSelf error", error);
			return res.status(400).send("error getting self user");
		}
	},

	//ADMIN_ROLE
	gets: async function (req, res) {
		try {
			const users = await Users.findAll({
				attributes: {
					exclude: ["password"],
				},
				include: [
					{
						model: Role,
						attributes: ["role"],
					},
				],
			});
			if (users) return res.status(200).json({ users });
			return res.status(400).json({ msg: "error" });
		} catch (error) {
			console.error("gets error", error);
			return res.status(400).send("error getting all users");
		}
	},

	update: async function (req, res) {
		try {
			const { email, newValues } = req.body;
			const attributes = [
				"id_role",
				"active",
				"contador",
				"statusTutorial",
				"updatedKYCAt",
				"fraudCheckId",
				"timerUpdate",
			];
			if (!email || !newValues) return res.status(400).json({ msg: "Parametros incompletos" });
			const user = await Users.findOne({
				where: { email },
				attributes: {
					exclude: ["password"],
				}
			});
			if (!user) return res.status(400).send("user does not exist");
			for (let value of attributes) {
				try {
					if (newValues[value]) {
						user[value] = newValues[value];
					} else if (newValues["metadata"][value]) {
						user["metadata"][value] = newValues["metadata"][value];
					}
				} catch (error) {
					continue;
				}
			}
			user.changed("metadata", true);
			await user.save();
			if (user) return res.status(200).json({ user });
			return res.status(400).json({ msg: "Error actualizando datos" });
		} catch (error) {
			console.error("Error en actualización", error);
			return res.status(400).json({ msg: error.message });
		}
	},

	updateSelf: async function (req, res) {
		try {
			const { id_user } = req.body.decoded;
			const new_values = req.body;
			let user = await Users.findOne({
				where: { id_user },
			});
			for (let value of attributes) {
				user[value] = new_values[value] || user[value];
			}
			await user.save();
			if (user) {
				return res.status(200).json({ user: { ...user.dataValues, password: undefined } });
			}
			return res.status(400).json({ msg: "error" });
		} catch (error) {
			console.error("updateSeld error", error);
			return res.status(400).send("error self updating user");
		}
	},

	post: async function (req, res) {
		try {
			const request_body = req.body;
			const body = Users.checkPostParams(request_body);
			if (!body) return res.status(400).send("incomplete params");
			const user = Users.build(body);
			await user.save();

			const userBalance = UserBalance.build(
				UserBalance.checkPostParams({
					id_user: user.id_user,
					balance: 0,
					id_currency: 2,
				})
			);
			await userBalance.save();

			const response = { ...body };
			return res.status(200).json(response);
		} catch (err) {
			console.error("couldn't save user", err);
			return res.status(400).json({ msg: err.message });
		}
	},

	delete: async function (req, res) {
		try {
			const { email } = req.body;
			if (!email) return res.status(400).json({ msg: "incomplete params" });
			const user = await Users.findOne({ where: { email } });
			if (!user) return res.status(400).send("user does not exist");
			await user.destroy();
			return res.status(200).json({ email });
		} catch (error) {
			return res.status(400).json({ msg: error.message });
		}
	},

	checkEmail: async function (req, res) {
		try {
			const { email } = req.body;
			const user = await Users.findOne({
				where: { email },
				attributes: ["email"],
			});
			if (user != null)
				return res.status(400).json({
					icon: "Invalid_email",
					title: "Este correo ya se encuentra en uso",
					msg: "Ya existe una cuenta asociada a este correo electrónico. Intenta ingresar con tu contraseña o recupera el acceso.",
				});
			return res.status(200).send("Email not in use");
		} catch (error) {
			console.error("checkEmail error", error);
			return res.status(400).send("error checkEmail");
		}
	},

	//SEND AN EMAIL
	email: async function (req, res) {
		try {
			const { subject, text } = req.body;

			if (!subject || !text) return res.status(400).json({ msg: "bad request" });

			const transporter = nodemailer.createTransport({
				service: "gmail",
				auth: {
					user: "itrm.contact@gmail.com",
					pass: ".07060610.",
				},
			});

			const mailOptions = {
				from: "itrm.contact@protonmail.com",
				to: "andres.fonseca@itrmachines.com, santiago.hernandez@itrmachines.com",
				subject: subject,
				html: text,
			};

			return transporter.sendMail(mailOptions, function (error, info) {
				if (error) {
					console.error(error);
					return res.status(500).json({ msg: "internal server error" });
				}
				return res.status(200).json({ msg: "ok" });
			});
		} catch (error) {
			console.error(error);
			return res.status(500).json({ msg: "internal server error" });
		}
	},

	recover: async function (req, res) {
		try {
			let { email, password, retypepassword } = req.body; //reTypePassword
			const user = await Users.findOne({ where: { email: email } });
			if (!password) return res.status(400).json({ msg: "bad request" });

			if (password) {
				const hash = Users.changePassword(password, retypepassword);
				if (hash === null) return res.status(400).json({ msg: "Error setting new password" });
				user.password = hash;
			}
			await user.save();
			if (user) {
				return res.status(200).json({ user: { ...user.dataValues, password: undefined } });
			}
			return res.status(400).json({ msg: "error" });
		} catch (error) {
			console.error("recover error", error);
			return res.status(400).send("error recoveryng password");
		}
	},

	updatePasswordSelf: async function (req, res) {
		try {
			const { id_user } = req.body.decoded;
			const { newPassword, newPasswordRepeat, oldPassword } = req.body;
			if (!(newPassword && newPasswordRepeat && oldPassword))
				return res.status(400).json({ msg: "bad request" });
			let user = await Users.findOne({
				where: { id_user },
			});

			const verify = bcrypt.compareSync(oldPassword, user.password);

			if (!verify) return res.status(400).json({ msg: "wrong password" });

			if (newPassword) {
				const hash = Users.changePassword(newPassword, newPasswordRepeat);

				if (hash === null) return res.status(400).json({ msg: "Error setting new password" });
				user.password = hash;
			}
			await user.save();
			if (user) {
				return res.status(200).json({ user: { ...user.dataValues, password: undefined } });
			}
			return res.status(400).json({ msg: "error" });
		} catch (error) {
			console.error("recover error", error);
			return res.status(400).send("error recoveryng password");
		}
	},

	validationPasswordWithdraw: async function (req, res) {
		try{
		  let { id_user, oldPassword } = req.body;
		  const user = await Users.findOne({ where: { id_user: id_user } });
		  if (user.dataValues.metadata.contador < 3) {
			return bcrypt.compare(
			  oldPassword,
			  user.dataValues.password,
			  async (err, response) => {
				if (err || !response) {
					user.dataValues.metadata.contador += 1;
					user.changed("metadata", true);
				  user.save();
				  return res.status(400).json({
					icon: "Wrong_password",
					title:"Contraseña Incorrecta" ,
					msg:
					  "Contraseña incorrecta, quedan " +
					  (4 - user.metadata.contador) +
					  " intentos",
				  });
				}else 
				user.dataValues.metadata.contador=0;
				user.changed("metadata", true);
				await user.save();
				const token = await createToken(user.dataValues);
				return res.status(200).json({ token });
			  }
			);
		  } else {
			return res.status(400).json({
				icon: "Account_bloqued",
				title: "Cuenta Bloqueada",
				msg: "Tu cuenta se encuentra bloqueada. Intenta recuperar tu contraseña desde el botón de recuperación o escríbenos un correo a viio@itrmachines.com y sigue las instrucciones del equipo de soporte.",
			});
		}
		} catch (error) {
			console.error(error);
			return res.status(500).json({ msg: "internal server error" });
		}
	},

	login: async function (req, res) {
		try {
			let { email, password } = req.body;
			if (!email || !password) return res.status(400).json({ msg: "incomplete params" });
			const user = await Users.findOne({ where: { email: email } });
			if (!user) {
				return res.status(400).json({
					icon: "Invalid_access",
					title: "Acceso inválido",
					msg: "El usuario no se encuentra registrado. Realiza el registro para acceder a billetera DeFi de latinoamérica. Toma menos de 5 minutos. ",
				});
			}
			if (user.metadata.contador < 3) {
				return bcrypt.compare(password, user.dataValues.password, async (err, response) => {
					if (err || !response) {
						user.metadata.contador += 1;
						user.changed("metadata", true);
						await user.save();
						return res.status(400).json({
							icon: "Wrong_password",
							title: "Acceso Inválido",
							msg:
								"Contraseña o email incorrecto, quedan " +
								(4 - user.metadata.contador) +
								" intentos",
						});
					} else {
						user.metadata.contador = 0;
						user.changed("metadata", true);
						await user.save();
						const token = await createToken(user.dataValues);
						return res.status(200).json({ token });
					}
				});
			} else {
				return res.status(400).json({
					icon: "Account_bloqued",
					title: "Cuenta Bloqueada",
					msg: "Tu cuenta se encuentra bloqueada. Intenta recuperar tu contraseña desde el botón de recuperación o escríbenos un correo a viio@itrmachines.com y sigue las instrucciones del equipo de soporte.",
				});
			}
		} catch (error) {
			console.error("couldn't log user", error);
			return res.status(400).json({ msg: error.message });
		}
	},

	updateVerificationCode: async function (email) {
		try {
			const user = await Users.findOne({ where: { email } });
			if (user) {
				user.confirmationCode = Users.generateRandomCode();
				await user.save();
				return user.confirmationCode;
			}
			return false;
		} catch (err) {
			console.error("updating verification code", err);
			return false;
		}
	},

	validateSignUpCode: async function (req, res) {
		try {
			const user = await Users.findOne({
				where: { email: req.body.email },
				attributes: ["email", "confirmationCode"],
			});
			if (!user) return res.status(400).json({ msg: "Couldn't validate code", status: false });
			if (user.confirmationCode == req.body.confirmationCode) {
				return res.status(200).json({ msg: "Code validated", status: true });
			} else {
				if (!user) return res.status(400).json({ msg: "Invalid code", status: false });
			}
		} catch (error) {
			console.error("couldn't validate Sign Up Code", error);
			return res.status(400).json({ msg: error.message });
		}
	},

};
