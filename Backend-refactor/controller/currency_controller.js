const { Sequelize, Currency } = require("../models");

module.exports = {
	// Get a specific currency with currency id (admin)
	get: async function (req, res) {
		try {
			const currency = await Currency.findOne({
				where: { id_currency: req.params.id_currency || req.body.id_currency },
			});

			if (!currency) return res.status(400).send("No existe la moneda");
			return res.status(200).json(currency);
		} catch (err) {
			console.error("Error al buscar la moneda", err);
			return res.status(400).json({ msg: "error \n"+err.message });
		}
	},

	// Get currencies (admin)
	gets: async function (req, res) {
		try {
			const currencies = await Currency.findAll({});

			if (!currencies) return res.status(400).send("No existen las monedas");
			return res.status(200).json(currencies);
		} catch (err) {
			console.error("Error al buscar las monedas", err);
			return res.status(400).json({ msg: "error \n"+err.message });
		}
	},

	// Set currency (admin)
	post: async function (req, res) {
		try {
			const request_body = req.body.currencies;
			const body = Currency.checkPostParams(request_body);
			if (!body) return res.status(400).send("Parametros incompletos");
			const UB = Currency.build(body);
			await UB.save();
			const response = { ...body };
			return res.status(200).json(response);
		} catch (err) {
			console.error("No se guardó la nueva moneda", err);
			return res.status(400).json({ msg: err.message });
		}
	},

	// Update currency (admin)
	update: async function (req, res) {
		try {
			const result = await Currency.update(
				{
					name: req.body.currency.name,
					ticker: req.body.currency.ticker,
					decimals: req.body.currency.decimals,
					updatedAt: new Date(),
				},
				{
					where: { id_currency: req.body.currency.id_currency },
					logging: console.log,
				}
			);
			return res.status(200).json(result);
		} catch (err) {
			console.error("No se actualizó la moneda", err);
			return res.status(400).json({ msg: err.message });
		}
	},

	delete: async function (req, res) {
		try {
			const result = await Currency.destroy({
				where: { id_currency: req.params.id_currency || req.body.id_currency },
			});
			return res.status(200).json(result);
		} catch (err) {
			console.error("No se borró de usuario", err);
			return res.status(400).json({ msg: err.message });
		}
	},
};
