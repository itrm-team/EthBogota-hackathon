const { Sequelize, Currency, ExchangeLimits } = require('../models');

module.exports = {

	// Get exchange limit with id (admin)
	get: async function (req, res) {
		try {
			const exchangeLimit = await ExchangeLimits.findOne({
				where: { id_exchange_limits: req.body.id_exchange_limits || req.params.id_exchange_limits },
				include: [
					{
						model: Currency,
						as: 'currency',
						on: {
							col1: Sequelize.where(
								Sequelize.col("ExchangeLimits.id_currency"),
								"=",
								Sequelize.col("currency.id_currency")
							)
						}
					}
				],
			});

			if (!exchangeLimit) return res.status(400).send('No se encontro el limite de cambio');
			return res.status(200).json(exchangeLimit);

		} catch (err) {
			console.error("Error al buscar el limite de cambio", err);
			return res.status(400).json({ msg: err.message });
		}
	},

	// Gets exchange limits (user)
	gets: async function (req, res) {
		try {
			const exchangeLimits = await ExchangeLimits.findAll({ 
				include: [
					{
						model: Currency,
						as: 'currency',
						on: {
							col1: Sequelize.where(
								Sequelize.col("ExchangeLimits.id_currency"),
								"=",
								Sequelize.col("currency.id_currency")
							)
						}
					}
				],
			});
			if (!exchangeLimits) return res.status(400).send("No existen exchange limits");
			return res.status(200).json(exchangeLimits);
		} catch (err) {
			console.error("Error al buscar exchange limits", err);
			return res.status(400).json({ msg: "error \n"+err.message });
		}
	},

	// New exchange limits (admin)
	post: async function (req, res) {
		const request_body = req.body.ExchangeLimits;
		const body = ExchangeLimits.checkPostParams(request_body);
		if (!body) return res.status(400).send('Parametros incompletos');
		const UB = ExchangeLimits.build(body);

		try {
			await UB.save();
		} catch (err) {
			console.error("No se agregaron los limites de cambio", err);
			return res.status(400).json({ msg: err.message });
		}

		const response = { ...body };
		return res.status(200).json(response);
	},

	// Update exchange limit (admin)
	update: async function (req, res) {
		try {
			const result = await ExchangeLimits.update(
				{
					max_limit: req.body.max_limit,
					min_limit: req.body.min_limit,
					updatedAt: new Date(),
				},
				{
					where: { id_exchange_limits: req.body.id_exchange_limits },
					logging: console.log,
				}
			);
			return res.status(200).json(result);
		} catch (err) {
			console.error("No se actualizarón los limites de cambio", err);
			return res.status(400).json({ msg: err.message });
		}
	},
	
	delete: async function (req, res) {
		try {
			const result = await ExchangeLimits.destroy({ 
				where: { id_exchange_limits: req.body.id_exchange_limits || req.params.id_exchange_limits } 
			});
			return res.status(200).json(result);
		} catch (err) {
			console.error("No se borró el limite de cambio", err);
			return res.status(400).json({ msg: err.message });
		}
	}
}
