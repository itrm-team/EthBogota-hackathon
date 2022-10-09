const express = require('express');
const routes = express.Router();
const exchangeLimitsController = require('../controller/exchange_limits_controller');
const { SUPER_ADMIN_ROLE, ADMIN_ROLE, REGULAR_USER_ROLE } = require('../enums/roles').roles;
const rules = require('../enums/accessRules');
const guardService = require('../services/guardServices').regularRequest;

/*
    EXCHANGE RATE ROUTES
*/

//  GET EXCHANGE LIMIT
routes.get('/getExchangeLimit/:id_exchange_limits',
guardService.authenticate(
    ADMIN_ROLE,
    {
        middleware: [
            rules._isWrongToken,
        ]
    }
), 
exchangeLimitsController.get);

//  GET EXCHANGE LIMITS
routes.get('/getExchangeLimits',
guardService.authenticate(
    REGULAR_USER_ROLE,
    {
        middleware: [
            rules._isWrongToken,
        ]
    }
), 
exchangeLimitsController.gets);

//  POST EXCHANGE LIMIT
routes.post('/insertExchangeLimit',
guardService.authenticate(
    ADMIN_ROLE,
    {
        middleware: [
            rules._isWrongToken,
        ]
    }
),
exchangeLimitsController.post);

// UPDATE EXCHANGE LIMIT
routes.put('/updateExchangeLimit',
guardService.authenticate(
    ADMIN_ROLE,
    {
        middleware: [
            rules._isWrongToken,
        ]
    }
),
exchangeLimitsController.update)

// GET DELETE EXCHANGE LIMIT
routes.delete('/deleteExchangeLimit/:id_exchange_limits',
    guardService.authenticate(
        ADMIN_ROLE,
        {
            middleware: [
                rules._isWrongToken,
            ]
        }
    ),
exchangeLimitsController.delete);

exports.exLimitsRoutes = routes;
