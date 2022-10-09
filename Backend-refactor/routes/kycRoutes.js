const express = require("express");
const routes = express.Router();
const kycController = require("../controller/kyc_controller");

routes.post("/kyc/update",kycController.update)

routes.get("/kyc/getName",kycController.getDataForTransaction)

exports.kycRoutes = routes;