const express = require('express');
const routes = express.Router();
const balanceController = require('../controller/balance_controller');
const { SUPER_ADMIN_ROLE, ADMIN_ROLE, REGULAR_USER_ROLE } = require('../enums/roles').roles;
const rules = require('../enums/accessRules');
const guardService = require('../services/guardServices').regularRequest;

/*
    BALANCE ROUTES
*/

//  GET A SPECIFIC BALANCE
routes.get('/getBalance',
guardService.authenticate(
    ADMIN_ROLE,
    {
        middleware: [
            rules._isWrongToken,
        ]
    }
),
balanceController.get);

// GET BALANCES
routes.get('/getBalances',
guardService.authenticate(
    ADMIN_ROLE,
    {
        middleware: [
            rules._isWrongToken,
        ]
    }
),
balanceController.gets);

// GET USER BALANCE 
routes.get('/getSelfBalance',
guardService.authenticate(
    REGULAR_USER_ROLE,
    {
        middleware: [
            rules._isWrongToken,
            rules._userHasResource,
        ]
    }
),
balanceController.getSelf);

//  POST BALANCE
routes.post('/setBalance',
guardService.authenticate(
    ADMIN_ROLE,
    {
        middleware: [
            rules._isWrongToken,
        ]
    }
),
balanceController.post);

// PUT BALANCE
routes.put('/updateBalance',
guardService.authenticate(
    ADMIN_ROLE,
    {
        middleware: [
            rules._isWrongToken,
        ]
    }
),
balanceController.updateBalance);

exports.balanceRoutes = routes;
