const express = require("express");
routes = express.Router();
const userRoutes = require("./userRoutes").userRoutes;
const balanceRoutes = require("./balanceRoutes").balanceRoutes;
const transactionRoutes = require("./transactionsRoutes").transactionRoutes;
const exchangeRateRoutes = require("./exchangeRateRoutes").exRateRoutes;
const exchangeLimitsRoutes = require("./exchangeLimitsRoutes").exLimitsRoutes;
const emailManagementRoutes = require("./emailManagement").emailRoutes;
const financialEntitiesRoutes = require("./financialEntitiesRoutes").fERoutes;
const thirdPartyServRoutes = require("./thirdPartyServRoutes").thirdPartyServRoutes;
const currencyRoutes = require("./currencyRoutes").currencyRoutes;
const rolesRoutes = require("./rolesRoutes").rolesRoutes;
const kycRoutes = require("./kycRoutes").kycRoutes;
const linkWalletRoutes = require ("./linkWalletRoutes").linkWalletRoutes;


routes.use("/", transactionRoutes);
routes.use("/", userRoutes);
routes.use("/", balanceRoutes);
routes.use("/", exchangeRateRoutes);
routes.use("/", exchangeLimitsRoutes);
routes.use("/", emailManagementRoutes);
routes.use("/", financialEntitiesRoutes);
routes.use("/", thirdPartyServRoutes);
routes.use("/", currencyRoutes);
routes.use("/", rolesRoutes);
routes.use("/", kycRoutes);
routes.use("/", linkWalletRoutes);


routes.get("/", (req, res) => {
  return res.send("hello api server talking");
});


module.exports = routes;
