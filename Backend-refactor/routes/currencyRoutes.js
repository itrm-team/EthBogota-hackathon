const express = require('express');
const routes = express.Router();
const currencyController = require('../controller/currency_controller');
const { SUPER_ADMIN_ROLE, ADMIN_ROLE, REGULAR_USER_ROLE } = require('../enums/roles').roles;
const rules = require('../enums/accessRules');
const guardService = require('../services/guardServices').regularRequest;

/*
    BALANCE ROUTES
*/

//  GET A SPECIFIC CURRENCY
routes.get('/getCurrency/:id_currency',
    guardService.authenticate(
        ADMIN_ROLE,
        {
            middleware: [
                rules._isWrongToken,
            ]
        }
    ),
currencyController.get);

// GET CURRENCIES
routes.get('/getCurrencies',
    // guardService.authenticate(
    //     ADMIN_ROLE,
    //     {
    //         middleware: [
    //             rules._isWrongToken,
    //         ]
    //     }
    // ),
currencyController.gets);


//  POST CURRENCY
routes.post('/insertCurrency',
    guardService.authenticate(
        ADMIN_ROLE,
        {
            middleware: [
                rules._isWrongToken,
            ]
        }
    ),
currencyController.post);

// PUT CURRENCY
routes.put('/updateCurrency',
    guardService.authenticate(
        ADMIN_ROLE,
        {
            middleware: [
                rules._isWrongToken,
            ]
        }
    ),
currencyController.update);

// GET DELETE CURRENCY
routes.delete('/deleteCurrency/:id_currency',
    guardService.authenticate(
        ADMIN_ROLE,
        {
            middleware: [
                rules._isWrongToken,
            ]
        }
    ),
currencyController.delete);
exports.currencyRoutes = routes;
