const { UserLinkedWallets, Users, Sequelize, Currency } = require("../models");

module.exports = {
	// Get a specific balance with user id (admin)
	get: async function (req, res) {
		try {
			const { id_user } = req.body.decoded ? req.body.decoded : req.body;
			console.log("> get:", {
				where: { id_user },
			});
			const linkedWallets = await UserLinkedWallets.findAll({
				where: { id_user },
			});

			if (!linkedWallets) return res.status(400).send("No existen linked Wallets");
			return res.status(200).json(linkedWallets);
		} catch (err) {
			console.error("Error al buscar linkedWallets", err);
			return res.status(400).json({ msg: "error" });
		}
	},

	// Get balances (admin)
	gets: async function (req, res) {
		try {
			const linkedWallets = await UserLinkedWallets.findAll();

			if (!linkedWallets) return res.status(400).send("No existen linked wallets");
			return res.status(200).json(linkedWallets);
		} catch (err) {
			console.error("Error al buscar linked wallets", err);
			return res.status(400).json({ msg: "error" });
		}
	},

	// Get balance (user)
	getSelf: async function (req, res) {
		try {
			const { id_user } = req.body.decoded ? req.body.decoded : req.body;
			const linkedWallets = await UserLinkedWallets.findAll({
				where: { id_user }
			});

			if (!linkedWallets) return res.status(400).json({});
			return res.status(200).json(balance);
		} catch (err) {
			console.error("Error al buscar linked wallets", err);
			return res.status(400).json({ msg: "error" });
		}
	},

	// Set balance (admin)
	post: async function (req, res) {
		try {
			const request_body = req.body;
			const body = UserLinkedWallets.checkPostParams(request_body);

			if (!body) return res.status(400).send("Parametros incompletos");
			const UB = UserLinkedWallets.build(body);
			await UB.save();
			const response = { ...body };
			return res.status(200).json(response);
		} catch (err) {
			console.error("No se vincularon wallets", err);
			return res.status(400).json({ msg: err.message });
		}		
	},

	// Update balance (admin)
	update: async function (req, res) {
		try {
			const result = await UserLinkedWallets.update(
				{
					walletAddress: req.body.walletAddress,
					trustContractAddress: req.body.trustContractAddress,
				},
				{
					where: { id_user: req.body.id_user },
					logging: console.log,
				}
			);
			if (req.body.self) return "finished";
			return res.status(200).json(result);
		} catch (err) {
			console.error("No se vincularon ", err);
			return res.status(400).json({ msg: err.message });
		}
	},
};
