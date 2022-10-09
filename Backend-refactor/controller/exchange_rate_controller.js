const { Sequelize, ExchangeRate, Currency, ExchangeLimits, sequelize } = require("./../models");

module.exports = {
	// Get exchange rate with id (admin)
	get: async function (req, res) {
		try {
			const exchangeR = await ExchangeRate.findOne({
				where: { id_exchange_rate: req.params.id_exchange_rate || req.body.id_exchange_rate },
				include: [
					{
						model: Currency,
						as: "baseCurrency",
						attributes: ["name", "ticker", "decimals"],
						on: {
							col1: Sequelize.where(
								Sequelize.col("ExchangeRate.id_base_currency"),
								"=",
								Sequelize.col("baseCurrency.id_currency")
							),
						},
					},
					{
						model: Currency,
						as: "quoteCurrency",
						attributes: ["name", "ticker", "decimals"],
						on: {
							col1: Sequelize.where(
								Sequelize.col("ExchangeRate.id_quote_currency"),
								"=",
								Sequelize.col("quoteCurrency.id_currency")
							),
						},
					},
				],
			});

			if (!exchangeR) return res.status(400).send("No se encontro exchange rate");
			if (req.body.self) return exchangeR;
			return res.status(200).json(exchangeR);
		} catch (err) {
			console.error("Error al buscar exchange rate", err);
			return res.status(400).json({ msg: err.message });
		}
	},

	// Gets exchange rates with id (user)
	gets: async function (req, res) {
		const body = req.body;
		try {
			const exchangeRates = await ExchangeRate.findAll({
				include: [
					{
						model: Currency,
						as: "baseCurrency",
						on: {
							col1: Sequelize.where(
								Sequelize.col("ExchangeRate.id_base_currency"),
								"=",
								Sequelize.col("baseCurrency.id_currency")
							),
						},
					},
					{
						model: Currency,
						as: "quoteCurrency",
						attributes: ["name", "ticker", "decimals"],
						on: {
							col1: Sequelize.where(
								Sequelize.col("ExchangeRate.id_quote_currency"),
								"=",
								Sequelize.col("quoteCurrency.id_currency")
							),
						},
					},
				],
			});
			if (body.self) return exchangeRates;
			if (!exchangeRates) return res.status(400).send("No existen exchange rates");
			return res.status(200).json(exchangeRates);
		} catch (err) {
			console.error("Error al buscar exchange rates", err);
			return res.status(400).json({ msg: err.message });
		}
	},

	getUpdated: async function (req, res) {
		const body = req.body;
		try {
			let query = { attributes: "", where: "", order: "", raw: "", include: "" };
			(query.include = [
				{
					model: Currency,
					as: "baseCurrency",
					on: {
						col1: Sequelize.where(
							Sequelize.col("ExchangeRate.id_base_currency"),
							"=",
							Sequelize.col("baseCurrency.id_currency")
						),
					},
				},
				{
					model: Currency,
					as: "quoteCurrency",
					attributes: ["name", "ticker", "decimals"],
					on: {
						col1: Sequelize.where(
							Sequelize.col("ExchangeRate.id_quote_currency"),
							"=",
							Sequelize.col("quoteCurrency.id_currency")
						),
					},
				},
			]),
			(query.attributes = [sequelize.literal('DISTINCT ON("ExchangeRate"."id_quote_currency") *')]);
			query.where = { id_base_currency: 1 };
			query.order = [["id_quote_currency","DESC"],["valid_for","DESC"]];
			query.raw = true;
			let exchangeRates = await ExchangeRate.findAll(query);
			exchangeRates.forEach((rate) => {
				rate["baseCurrency"] = {
					id_currency: rate["baseCurrency.id_currency"],
					name: rate["baseCurrency.name"],
					ticker: rate["baseCurrency.ticker"],
					decimals: rate["baseCurrency.decimals"],
					type: rate["baseCurrency.type"],
				};
				rate["quoteCurrency"] = {
					name: rate["quoteCurrency.name"],
					ticker: rate["quoteCurrency.ticker"],
					decimals: rate["quoteCurrency.decimals"],
				};
			});
			// const { QueryTypes } = require("sequelize");
			// const exchangeRates = await sequelize.query('SELECT DISTINCT ON (id_quote_currency) * from "ExchangeRate" WHERE id_base_currency = 1 ORDER BY id_quote_currency, valid_for DESC;', { type: QueryTypes.SELECT });
			if (!exchangeRates) return res.status(400).send("No existen exchange rates");
			return res.status(200).json(exchangeRates);
		} catch (err) {
			console.error("Error al buscar exchange rates", err);
			return res.status(400).json({ msg: err.message });
		}
	},

	get_limits: async function (req, res) {
		try {
			const exchangeLimits = await ExchangeLimits.findAll({
				include: [
					{
						model: Currency,
						as: "currency",
						on: {
							col1: Sequelize.where(
								Sequelize.col("ExchangeLimits.id_currency"),
								"=",
								Sequelize.col("currency.id_currency")
							),
						},
					},
				],
			});
			if (!exchangeLimits) return res.status(400).send("No existen exchange limits");
			return res.status(200).json(exchangeLimits);
		} catch (err) {
			console.error("Error al buscar exchange limits", err);
			return res.status(400).json({ msg: "error \n" + err.message });
		}
	},

	// Set exchange rate (admin)
	post: async function (req, res) {
		const request_body = req.body;
		const body = ExchangeRate.checkPostParams(request_body);

		if (!body) return res.status(400).send("Parametros incompletos");
		const UB = ExchangeRate.build(body);

		try {
			await UB.save();
		} catch (err) {
			console.error("No se guardo exchange rates", err);
			return res.status(400).json({ msg: err.message });
		}

		const response = { ...body };
		return res.status(200).json(response);
	},

	// Update exchange rate (admin)
	update: async function (req, res) {
		try {
			const result = await ExchangeRate.update(
				{
					buy_rate: req.body.exchangeRate.buy_rate,
					sell_rate: req.body.exchangeRate.sell_rate,
					updatedAt: new Date(),
				},
				{
					where: { id_exchange_rate: req.body.exchangeRate.id_exchange_rate },
					logging: console.log,
				}
			);
			return res.status(200).json(result);
		} catch (err) {
			console.error("No se actualizó la tasa de cambio", err);
			return res.status(400).json({ msg: err.message });
		}
	},

	delete: async function (req, res) {
		try {
			const result = await ExchangeRate.destroy({
				where: { id_exchange_rate: req.params.id_exchange_rate || req.body.id_exchange_rate },
			});
			return res.status(200).json(result);
		} catch (err) {
			console.error("No se borró la tasa de cambio", err);
			return res.status(400).json({ msg: err.message });
		}
	},
};
