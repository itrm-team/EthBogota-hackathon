const express = require("express");
const routes = express.Router();
const rolesController = require("../controller/role_controller");
const { SUPER_ADMIN_ROLE, ADMIN_ROLE, REGULAR_USER_ROLE } =
    require('../enums/roles').roles
const rules = require('../enums/accessRules')
const guardService = require('../services/guardServices').regularRequest
/*
    ROLES ROUTES
*/

//necesitan rutas de seguridad????
routes.get(
	"/getRole",
	guardService.authenticate(ADMIN_ROLE, {
		middleware: [rules._isWrongToken],
	}),
	rolesController.get
);
routes.get(
	"/getAllRoles",
	guardService.authenticate(ADMIN_ROLE, {
		middleware: [rules._isWrongToken],
	}),
	rolesController.getAll
);
routes.post(
	"/createRole",
	guardService.authenticate(ADMIN_ROLE, {
		middleware: [rules._isWrongToken],
	}),
	rolesController.create
);
routes.delete(
	"/deleteRole",
	guardService.authenticate(ADMIN_ROLE, {
		middleware: [rules._isWrongToken],
	}),
	rolesController.delete
);
routes.put(
	"/updateRole",
	guardService.authenticate(ADMIN_ROLE, {
		middleware: [rules._isWrongToken],
	}),
	rolesController.update
);

exports.rolesRoutes = routes;
