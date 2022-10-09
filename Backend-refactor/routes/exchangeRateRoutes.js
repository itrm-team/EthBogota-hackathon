const express = require('express');
const routes = express.Router();
const exchangeRateController = require('../controller/exchange_rate_controller');
const { SUPER_ADMIN_ROLE, ADMIN_ROLE, REGULAR_USER_ROLE } = require('../enums/roles').roles;
const rules = require('../enums/accessRules');
const guardService = require('../services/guardServices').regularRequest;

/*
    EXCHANGE RATE ROUTES
*/

//  GET EXCHANGE RATE
routes.get('/getExchangeRate/:id_exchange_rate',
guardService.authenticate(
    ADMIN_ROLE,
    {
        middleware: [
            rules._isWrongToken,
        ]
    }
), 
exchangeRateController.get);

//  GET EXCHANGE RATES
routes.get('/getExchangeRates',
guardService.authenticate(
    REGULAR_USER_ROLE,
    {
        middleware: [
            rules._isWrongToken,
        ]
    }
), 
exchangeRateController.gets);

routes.get('/getUpdatedExchangeRates',
guardService.authenticate(
    REGULAR_USER_ROLE,
    {
        middleware: [
            rules._isWrongToken,
        ]
    }
), 
exchangeRateController.getUpdated);

//  GET EXCHANGE LIMITS
routes.get('/getExchangeLimits', 
guardService.authenticate(
    REGULAR_USER_ROLE,
    {
        middleware:[
            rules._isWrongToken,
            //rules._canRefreshToken,
            //rules._userHasResource,
            //rules._checkParams
        ]
    }
), 
exchangeRateController.get_limits);

//  POST EXCHANGE RATE
routes.post('/setExchangeRate',
guardService.authenticate(
    ADMIN_ROLE,
    {
        middleware: [
            rules._isWrongToken,
        ]
    }
),
exchangeRateController.post);

// UPDATE EXCHANGE RATE
routes.put('/updateExchangeRate',
guardService.authenticate(
    ADMIN_ROLE,
    {
        middleware: [
            rules._isWrongToken,
        ]
    }
),
exchangeRateController.update)

// GET DELETE CURRENCY
routes.delete('/deleteExchangeRate/:id_exchange_rate',
    guardService.authenticate(
        ADMIN_ROLE,
        {
            middleware: [
                rules._isWrongToken,
            ]
        }
    ),
exchangeRateController.delete);

exports.exRateRoutes = routes;
