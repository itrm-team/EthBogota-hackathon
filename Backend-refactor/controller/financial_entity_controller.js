const { Sequelize, FinancialEntity, Currency } = require("./../models");

module.exports = {
	// Get a specific fE with fE id (admin)
	get: async function (req, res) {
		try {
			const financialEntity = await FinancialEntity.findOne({
				where: {
					id_financial_entity: req.params.id_financial_entity || req.body.id_financial_entity,
				},
				include: [
					{
						model: Currency,
						as: "currency",
						on: {
							col1: Sequelize.where(
								Sequelize.col("FinancialEntity.id_currency"),
								"=",
								Sequelize.col("currency.id_currency")
							),
						},
					},
				],
			});

			if (!financialEntity) return res.status(400).send("No existe la entidad financiera");
			return res.status(200).json(financialEntity);
		} catch (err) {
			console.error("Error al buscar la entidad financiera", err);
			return res.status(400).json({ msg: "error \n" + err.message });
		}
	},

	// Get financial entities (users)
	gets: async function (req, res) {
		const fEntities = await FinancialEntity.findAll({
			include: [
				{
					model: Currency,
					as: "currency",
					on: {
						col1: Sequelize.where(
							Sequelize.col("FinancialEntity.id_currency"),
							"=",
							Sequelize.col("currency.id_currency")
						),
					},
				},
			],
		});

		if (!fEntities) return res.status(400).send("Error al buscar las entidades financieras");
		return res.status(200).json(fEntities);
	},

	// Set Financial Entity (admin)
	post: async function (req, res) {
		try {
			const request_body = req.body.financialEntity;
			const body = FinancialEntity.checkPostParams(request_body);
			if (!body) return res.status(400).send("Parametros incompletos");
			const UB = FinancialEntity.build(body);
			await UB.save();
			const response = { ...body };
			return res.status(200).json(response);
		} catch (err) {
			console.error("No se guardó la entidad financiera", err);
			return res.status(400).json({ msg: err.message });
		}
	},

	// Update Financial Entity (admin)
	update: async function (req, res) {
		try {
			const result = await FinancialEntity.update(
				{
					name: req.body.financialEntity.name,
					id_currency: req.body.financialEntity.id_currency,
					updatedAt: new Date(),
				},
				{
					where: { id_financial_entity: req.body.financialEntity.id_financial_entity },
					logging: console.log,
				}
			);
			return res.status(200).json(result);
		} catch (err) {
			console.error("No se actualizó la entidad financiera", err);
			return res.status(400).json({ msg: err.message });
		}
	},

	delete: async function (req, res) {
		try {
			const result = await FinancialEntity.destroy({
				where: {
					id_financial_entity: req.params.id_financial_entity || req.body.id_financial_entity,
				},
			});
			return res.status(200).json(result);
		} catch (err) {
			console.error("No se borró de usuario", err);
			return res.status(400).json({ msg: err.message });
		}
	},
};
