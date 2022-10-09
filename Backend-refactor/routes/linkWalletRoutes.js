const express = require('express');
const routes = express.Router();
const walletController = require('../controller/linkwallet_controller');
const { SUPER_ADMIN_ROLE, ADMIN_ROLE, REGULAR_USER_ROLE } = require('../enums/roles').roles;
const rules = require('../enums/accessRules');
const guardService = require('../services/guardServices').regularRequest;

/*
    BALANCE ROUTES
*/

//  GET A SPECIFIC BALANCE
routes.post('/getLinkedWallet',
guardService.authenticate(
    ADMIN_ROLE,
    {
        middleware: [
            rules._isWrongToken,
        ]
    }
),
walletController.get);

// GET BALANCES
routes.get('/getLinkedWallets',
guardService.authenticate(
    ADMIN_ROLE,
    {
        middleware: [
            rules._isWrongToken,
        ]
    }
),
walletController.gets);

// GET USER BALANCE 
routes.post('/getSelfLinkedWallet',
guardService.authenticate(
    REGULAR_USER_ROLE,
    {
        middleware: [
            rules._isWrongToken,
            rules._userHasResource,
        ]
    }
),
walletController.getSelf);

//  POST BALANCE
routes.post('/setLinkedWallet',
guardService.authenticate(
    ADMIN_ROLE,
    {
        middleware: [
            rules._isWrongToken,
        ]
    }
),
walletController.post);

// PUT BALANCE
routes.put('/updateLinkedWallet',
guardService.authenticate(
    ADMIN_ROLE,
    {
        middleware: [
            rules._isWrongToken,
        ]
    }
),
walletController.update);

exports.linkWalletRoutes = routes;
