const { UserBalance, Users, Sequelize, Currency } = require("../models");

module.exports = {
	// Get a specific balance with user id (admin)
	get: async function (req, res) {
		try {
			const { id_user } = req.body.decoded ? req.body.decoded : req.body;
			const balance = await UserBalance.findAll({
				where: { id_user },
				include: [
					{
						model: Currency,
						as: "Currency",
						attributes: ["name", "ticker", "decimals"],
						on: {
							col1: Sequelize.where(
								Sequelize.col("UserBalance.id_currency"),
								"=",
								Sequelize.col("Currency.id_currency")
							),
						},
					},
				],
			});

			if (!balance) return res.status(400).send("No existe balance");
			return res.status(200).json(balance);
		} catch (err) {
			console.error("Error al buscar balance", err);
			return res.status(400).json({ msg: "error" });
		}
	},

	// Get balances (admin)
	gets: async function (req, res) {
		try {
			const balances = await UserBalance.findAll({
				attributes: ["balance", "createdAt", "updatedAt"],
				include: [
					{
						model: Users,
						as: "User",
						attributes: ["id_user", "email"],
						on: {
							col1: Sequelize.where(
								Sequelize.col("User.id_user"),
								"=",
								Sequelize.col("UserBalance.id_user")
							),
						},
					},
				],
			});

			if (!balances) return res.status(400).send("No existen balances");
			return res.status(200).json(balances);
		} catch (err) {
			console.error("Error al buscar balances", err);
			return res.status(400).json({ msg: "error" });
		}
	},

	// Get balance (user)
	getSelf: async function (req, res) {
		try {
			const { id_user } = req.body.decoded ? req.body.decoded : req.body;
			const balance = await UserBalance.findAll({
				where: { id_user },
				include: [
					{
						model: Currency,
						as: "Currency",
						attributes: ["name", "ticker", "decimals"],
						on: {
							col1: Sequelize.where(
								Sequelize.col("UserBalance.id_currency"),
								"=",
								Sequelize.col("Currency.id_currency")
							),
						},
					},
				],
			});

			if (!balance) return res.status(400).send({ balance: 0 });
			if (req.body.self) return balance[0].dataValues.balance;
			return res.status(200).json(balance);
		} catch (err) {
			console.error("Error al buscar balance de usuario", err);
			return res.status(400).json({ msg: "error" });
		}
	},

	// Set balance (admin)
	post: async function (req, res) {
		try {
			const request_body = req.body;
			const body = UserBalance.checkPostParams(request_body);

			if (!body) return res.status(400).send("Parametros incompletos");
			const UB = UserBalance.build(body);
			await UB.save();
		} catch (err) {
			console.error("No se guardó el balance de usuario", err);
			return res.status(400).json({ msg: err.message });
		}

		const response = { ...body };
		return res.status(200).json(response);
	},

	// Update balance (admin)
	updateBalance: async function (req, res) {
		try {
			const result = await UserBalance.update(
				{
					balance: req.body.balance,
					id_currency: req.body.id_currency,
				},
				{
					where: { id_user: req.body.id_user },
					logging: console.log,
				}
			);
			if (req.body.self) return "finished";
			return res.status(200).json(result);
		} catch (err) {
			console.error("No se actualizó el balance de usuario", err);
			return res.status(400).json({ msg: err.message });
		}
	},
};
