const express = require("express");
const routes = express.Router();
const thirdPartyController = require("../controller/third_party_controller");
const guardService = require("../services/guardServices").regularRequest;
const { SUPER_ADMIN_ROLE, ADMIN_ROLE, REGULAR_USER_ROLE } = require("../enums/roles").roles;
const rules = require("../enums/accessRules");
/*
    THIRD PARTY SERVICES ROUTES
*/

routes.get(
	"/testWompi",
	guardService.authenticate(ADMIN_ROLE, {
		middleware: [rules._isWrongToken],
	}),
	thirdPartyController.testApi
);

routes.post(
	"/createReference",
	guardService.authenticate(REGULAR_USER_ROLE, {
		middleware: [rules._isWrongToken, rules._checkFraudCheckId],
	}),
	thirdPartyController.createReference
);

routes.post(
	"/verifyReference",
	guardService.authenticate(REGULAR_USER_ROLE, {
		middleware: [rules._isWrongToken],
	}),
	thirdPartyController.verifyReference
);

routes.post("/wompiCallback",thirdPartyController.wompiCallback)

routes.post("/viralLoops",thirdPartyController.viralLoops)

exports.thirdPartyServRoutes = routes;
