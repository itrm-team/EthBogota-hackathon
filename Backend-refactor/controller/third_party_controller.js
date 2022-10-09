const bcrypt = require("bcryptjs");
const axios = require("axios");
const crypto = require("crypto");
let salt = bcrypt.genSaltSync(20); //salt statica
const transactionController = require("./transactions_controller");
const emailController = require("./email_controller");

const { Transactions, TransactionStatus, UserBalance, ExchangeRate } = require("./../models");

const privateKey = process.env.WOMPI_PRIVATE_KEY_TEST;
const wompiGet = process.env.WOMPI_GET_TEST;

async function sha256(message) {
	const hash = crypto.createHash("sha256").update(message).digest("hex");
	return hash;
}

async function createReference(req, res) {
	try {
		const { currentUser } = req.body;
		if (!currentUser) return res.status(400).send("incomplete params");
		let date = new Date();
		let hashi = await bcrypt.hash(`${currentUser}${date}`, 10); ///need to be changed
		return res.status(200).send(hashi);
	} catch (error) {
		return res.status(400).json({ msg: error.message });
	}
}

async function verifyReference(req, res) {
	try {
		const { reference, id_user } = req.body.reference;
		if (!reference || !id_user) return res.status(400).send("incomplete params");
		//verify that the reference of the transaction is from the user that is tryng to see it and status
		const isLegal = await verifyOwnershipAndStatus(reference, id_user);
		if (!isLegal.legality) return res.status(400).send(isLegal.error);
		let receipt = {};
		const headers = {
			accept: "*/*",
			Authorization: `Bearer ${privateKey}`,
		};

		payload = await axios.get(wompiGet + reference, { headers });

		if (payload.data.data[0].reference == reference) {
			receipt.name = payload.data.data[0].customer_data.full_name;
			receipt.phone = payload.data.data[0].customer_data.phone_number;
			receipt.result = payload.data.data[0].status;
			receipt.id = payload.data.data[0].id;
			receipt.amount_in_cents = payload.data.data[0].amount_in_cents;
			receipt.email = payload.data.data[0].customer_email;
			receipt.payment_method = payload.data.data[0].payment_method_type;

			if (payload.data.data[0].status_message)
				receipt.status_message = payload.data.data[0].status_message;

			if (receipt.result == "APPROVED") {
				let body = {
					reference: reference,
					id_user: id_user,
					amount_in_cents: receipt.amount_in_cents,
				};
				// await updateBalanceAndTransactionStatus(body);
			}
			return res.status(200).json(receipt);
		} else {
			receipt.result = "INVALID";
			return res.status(200).json(receipt);
		}
	} catch (error) {
		console.error(error);
		return res.status(400).json({ msg: error.message });
	}
}

//SOLO PERMITIDO A UN ADMIN
async function testApi(req, res) {
	try {
		const headers = {
			Accept: "application/json",
		};
		let response = await axios.get(
			`https://sandbox.wompi.co/v1/merchants/${process.env.WOMPI_PUBLIC_KEY_TEST}`,
			{ headers }
		);
		return res.status(200).json(response.data);
	} catch (error) {
		return res.status(400).json({ msg: error.message });
	}
}

//buscar la transaccion, ver si es de la persona y ver el estatus
async function verifyOwnershipAndStatus(reference, id_user) {
	try {
		const body = { reference: reference, self: true };
		const transaction = await transactionController.getForReference({ body });
		if (transaction.dataValues.id_user != id_user)
			return {
				legality: false,
				error: "esta transaccion no pertenece al usuario",
			};
		return { legality: true };
	} catch (error) {
		console.error(error);
		return { legality: false, error: "error al procesar la transaccion" };
	}
}

async function wompiCallback(req, res) {
	try {
		const { event, data, signature, timestamp } = req.body;
		if (event != "transaction.updated") return res.status(201).json({ msg: "nequi" });
		const secret = process.env.WOMPI_SECRET_TEST;
		const properties = signature.properties;
		let toSign = "";
		for (let x = 0; x < properties.length; x++) {
			let props = properties[x].split(".");
			toSign += data[props[0]][props[1]];
		}
		toSign = toSign + timestamp + secret;
		const signature_ = await sha256(toSign);
		if (signature_ != signature.checksum)
			return res.status(400).json({ msg: "No se pudo verificar el origen" });
		if (data.transaction.status === "APPROVED") await updateTransaction(data.transaction); //TODO: verify
		return res.status(200).json({ msg: "verificacion exitosa" });
	} catch (error) {
		console.error(error);
		return res.status(400).json({ msg: error.message });
	}
}

async function updateTransaction(body) {
	try {
		const { reference, amount_in_cents } = body;
		const transactionStatus = await TransactionStatus.findAll({
			attributes: ["id_transaction_status", "status"],
		});

		console.log(">>transaction Status:", transactionStatus);
		const newStatus = transactionStatus.filter((element) => {
			return element.status.toLowerCase().includes("aprobada");
		})[0].id_transaction_status;

		console.log(">>new Status:", newStatus);

		const transaction = await Transactions.findOne({
			where: { metadata: { reference: reference } },
		});

		const id_user = transaction.dataValues.id_user;
		transaction.id_transaction_status = newStatus;
		transaction.changed("id_transaction_status", true);
		await transaction.save();

		await updateBalance({ id_user, amount_in_cents });
		return "";
	} catch (error) {
		return res.status(400).json({ msg: error.message });
	}
}

async function updateBalance(body) {
	try {
		const { id_user, amount_in_cents } = body;
		const balance = await UserBalance.findOne({ where: { id_user } });
		const exchangeRate = await ExchangeRate.findOne({
			where: { id_quote_currency: 2 },
			order: [["createdAt", "DESC"]],
		}); ///todo
		const sellRate = exchangeRate.sell_rate;
		balance.balance = balance.balance + amount_in_cents / 100 / sellRate;
		await balance.save();
		return "";
	} catch (error) {
		console.error(error);
		return res.status(400).json({ msg: error.message });
	}
}

async function viralLoops(req, res) {
	try {
		console.log(">> viral loops:", req.body);
		const { referrer } = req.body;
		if (!referrer) return res.status(200).json({ msg: "arrived" });
		await emailController.functions.sendEmailForReferrer({email:referrer.email})
		return res.status(200).json({ msg: "arrived" });
	} catch (error) {
		console.error(error)
		return res.status(400).json({ msg: error.message });
	}
}

module.exports = {
	createReference,
	verifyReference,
	testApi,
	wompiCallback,
	viralLoops,
};
