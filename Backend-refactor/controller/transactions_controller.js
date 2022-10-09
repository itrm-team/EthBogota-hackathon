const {
	Transactions,
	TransactionTypes,
	TransactionStatus,
	Currency,
	Users,
	Sequelize,
	sequelize,
} = require("./../models");

module.exports = {
	get: async function (req, res) {
		try {
			const { id_transaction } = req.body.decoded;
			const transaction = await Transactions.findOne({
				where: { id_transaction },
				attributes: [
					"id_transaction",
					"transaction_time",
					"id_user",
					"id_currency",
					"total",
					"commission",
					"metadata",
					"createdAt",
					"updatedAt",
				],
				include: [
					{
						model: Users,
						as: "Users",
						attributes: ["username"],
						on: {
							col1: Sequelize.where(
								Sequelize.col("Users.id_user"),
								"=",
								Sequelize.col("Transactions.id_user")
							),
						},
					},
					{
						model: TransactionTypes,
						attributes: ["type"],
						on: {
							col1: Sequelize.where(
								Sequelize.col("TransactionType.id_transaction_type"),
								"=",
								Sequelize.col("Transactions.id_transaction_type")
							),
						},
					},
					{
						model: TransactionStatus,
						attributes: ["status"],
						on: {
							col1: Sequelize.where(
								Sequelize.col("TransactionStatus.id_transaction_status"),
								"=",
								Sequelize.col("Transactions.id_transaction_status")
							),
						},
					},
				],
				order: [["transaction_time", "DESC"]],
			});
			if (!transaction) return res.status(400).send("transaccion no existe");
			return res.status(200).json(transaction);
		} catch (err) {
			console.log("Error al buscar transacción", err);
			return res.status(400).json({ msg: err.message });
		}
	},

	gets: async function (req, res) {
		try {
			const _transactions = await Transactions.findAll({
				attributes: [
					"id_transaction",
					"transaction_time",
					"id_user",
					"id_currency",
					"total",
					"comission",
					"metadata",
					"createdAt",
					"updatedAt",
				],
				include: [
					{
						model: Users,
						as: "User",
						attributes: ["id_user"],
						on: {
							col1: Sequelize.where(
								Sequelize.col("User.id_user"),
								"=",
								Sequelize.col("Transactions.id_user")
							),
						},
					},
					{
						model: TransactionTypes,
						attributes: ["type"],
						on: {
							col1: Sequelize.where(
								Sequelize.col("TransactionType.id_transaction_type"),
								"=",
								Sequelize.col("Transactions.id_transaction_type")
							),
						},
					},
					{
						model: TransactionStatus,
						attributes: ["status"],
						on: {
							col1: Sequelize.where(
								Sequelize.col("TransactionStatus.id_transaction_status"),
								"=",
								Sequelize.col("Transactions.id_transaction_status")
							),
						},
					},
				],
			});
			if (!_transactions) return res.status(400).send("No existen transacciones");
			return res.status(200).json(_transactions);
		} catch (err) {
			console.log("Error al buscar transacciones", err);
			return res.status(400).json({ msg: err.message });
		}
	},

	getTransactionPerUser: async function (req, res) {
		try {
			const { id_user } = req.query;
			const transactions = await Transactions.findAll({
				where: { id_user },
				//attributes: ["id_user", "transaction_time", "total"],
				include: [
					{
						model: Users,
						as: "User",
						on: {
							col1: Sequelize.where(
								Sequelize.col("User.id_user"),
								"=",
								Sequelize.col("Transactions.id_user")
							),
						},
					},
					{
						model: TransactionTypes,
						as: "TransactionType",
						attributes: ["type"],
						on: {
							col1: Sequelize.where(
								Sequelize.col("TransactionType.id_transaction_type"),
								"=",
								Sequelize.col("Transactions.id_transaction_type")
							),
						},
					},
					{
						model: TransactionStatus,
						as: "TransactionStatus",
						attributes: ["status"],
						on: {
							col1: Sequelize.where(
								Sequelize.col("TransactionStatus.id_transaction_status"),
								"=",
								Sequelize.col("Transactions.id_transaction_status")
							),
						},
					},
				],
				order: [["transaction_time", "DESC"]],
			});
			if (!transactions) return res.status(400).send("No existen transacciones de usuario");
			return res.status(200).json(transactions);
		} catch (err) {
			console.log("Error al buscar transacciones de un usuario", err);
			return res.status(400).json({ msg: err.message });
		}
	},

	getAllSelf: async function (req, res) {
		try {
			const { id_user } = req.query;
			const transactions = await Transactions.findAll({
				where: { id_user },
				attributes: ["id_user", "transaction_time", "total"],
				include: [
					{
						model: Users,
						as: "User",
						on: {
							col1: Sequelize.where(
								Sequelize.col("User.id_user"),
								"=",
								Sequelize.col("Transactions.id_user")
							),
						},
					},
					{
						model: TransactionTypes,
						as: "TransactionType",
						attributes: ["type"],
						on: {
							col1: Sequelize.where(
								Sequelize.col("TransactionType.id_transaction_type"),
								"=",
								Sequelize.col("Transactions.id_transaction_type")
							),
						},
					},
					{
						model: TransactionStatus,
						as: "TransactionStatus",
						attributes: ["status"],
						on: {
							col1: Sequelize.where(
								Sequelize.col("TransactionStatus.id_transaction_status"),
								"=",
								Sequelize.col("Transactions.id_transaction_status")
							),
						},
					},
				],
				order: [["transaction_time", "DESC"]],
			});
			if (!transactions) return res.status(400).send("No existen transacciones de usuario");
			return res.status(200).json(transactions);
		} catch (err) {
			console.log("Error al buscar transacciones de un usuario", err);
			return res.status(400).json({ msg: err.message });
		}
	},

	getTransactionStatuses: async function (req, res) {
		try {
			const _transactions = await TransactionStatus.findAll({
				attributes: ["id_transaction_status", "status"],
			});
			if (_transactions && req === "self") return _transactions;
			if (_transactions) return res.status(200).json(_transactions);
			return res.status(400).json({ msg: "error" });
		} catch (error) {
			return res.status(400).json({ msg: error.message });
		}
	},

	getTransactionTypes: async function (req, res) {
		try {
			const _transactions = await TransactionTypes.findAll({
				attributes: ["id_transaction_type", "type"],
			});
			if (_transactions) return res.status(200).json(_transactions);
			return res.status(400).json({ msg: "error" });
		} catch (error) {
			return res.status(400).json({ msg: error.message });
		}
	},

	getForReference: async function (req, res) {
		try {
			const { reference,self } = req.body;
			if (!reference) return res.status(400).json({ msg: "parametros incompletos" });
			const transaction = await Transactions.findOne({
				where: { metadata: { reference } },
				include: {
					model: TransactionStatus,
					attributes: ["status"],
					on: {
						col1: Sequelize.where(
							Sequelize.col("TransactionStatus.id_transaction_status"),
							"=",
							Sequelize.col("Transactions.id_transaction_status")
						),
					},
				},
			});
			if (!transaction) return res.status(400).json({ msg: "no se encontro la transaccion"});
			if (self) return (transaction)
			return res.status(200).json({ msg: transaction });
		} catch (error) {
			console.error(error);
			return res.status(400).json({ msg: error.message });
		}
	},

	post: async function (req, res) {
		try {
			const request_body = req.body;
			const body = Transactions.checkPostParams(request_body);
			if (!body) return res.status(400).send("incomplete params");
			const transaction = Transactions.build(body);
			await transaction.save();
			const response = { ...body };
			return res.status(200).json(response);
		} catch (err) {
			console.error("couldn't save transaction", err);
			return res.status(400).json({ msg: err.message });
		}
	},

	delete: async function (req, res) {
		try {
			const { reference } = req.body;
			await Transactions.destroy({
				where: {
					"metadata.reference": {
						[Sequelize.Op.eq]: reference,
					},
				},
			});
			return res.status(200).json("transacción eliminada");
		} catch (err) {
			console.error("couldn't save transaction", err);
			return res.status(400).json({ msg: err.message });
		}
	},

	update: async function (req, res) {
		try {
			console.log("cuerpo de update",req.body)
			const { reference } = req.body;
			const { status } = req.body;
			const { metadata } = req.body;
			const { self } = req.body;
			if (!reference || !status) return res.status(400).json({ msg: "faltan parametros" });
			const _transactions = await Transactions.findOne({
				where: {
					"metadata.reference": {
						[Sequelize.Op.eq]: reference,
					},
				},
			});
			const transactionsStatus = await module.exports.getTransactionStatuses("self");
			const newStatus = transactionsStatus.filter((element) => {
				return element.status.toLowerCase().includes(status);
			})[0].id_transaction_status;
			_transactions["id_transaction_status"] = newStatus;
			_transactions["metadata"] = metadata;
			await _transactions.save();
			if (self) return "yes";
			res.status(200).json({ Aprobada: "yes" });
		} catch (error) {
			console.error(error);
			return res.status(400).json({ msg: error.message });
		}
	},
};
