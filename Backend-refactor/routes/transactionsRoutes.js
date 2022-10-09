const express = require('express');
const routes = express.Router();
const transactionController = require('../controller/transactions_controller');
const { SUPER_ADMIN_ROLE, ADMIN_ROLE, REGULAR_USER_ROLE} = require('../enums/roles').roles;
const rules = require('../enums/accessRules');
const guardService = require('../services/guardServices').regularRequest;

/**
 *  Transaction Routes
 */

routes.get('/getTransactions', guardService.authenticate(
    ADMIN_ROLE,
    {
        middleware:[
            rules._isWrongToken,
        ]
    }
), transactionController.gets);

routes.get('/getTransactionsOfUser', guardService.authenticate(
    REGULAR_USER_ROLE,
    {
        middleware:[
            rules._isWrongToken,
            rules._userHasResource,
        ]
    }
), transactionController.getAllSelf);

routes.get('/getTransactionsPerUser', guardService.authenticate(
    REGULAR_USER_ROLE,
    {
        middleware:[
            rules._isWrongToken,
        ]
    }
), transactionController.getTransactionPerUser);

routes.get('/getTransactionTypes',
 guardService.authenticate(
    REGULAR_USER_ROLE,
    {
        middleware:[
            rules._isWrongToken,
        ]
    }
), 
transactionController.getTransactionTypes);

routes.get('/getTransactionStatuses',
  guardService.authenticate(
    REGULAR_USER_ROLE,
    {
        middleware:[
            rules._isWrongToken,
        ]
    }
), 
transactionController.getTransactionStatuses);

routes.post('/createTransaction',
  guardService.authenticate(
    REGULAR_USER_ROLE,
    {
        middleware:[
            rules._isWrongToken,
            rules._userHasResource,
        ]
    }
), 
transactionController.post);

routes.put('/modifyTransaction',
  guardService.authenticate(
    ADMIN_ROLE,
    {
        middleware:[
            rules._isWrongToken,
        ]
    }
), 
transactionController.update);

routes.delete('/deleteTransaction', 
guardService.authenticate(
    ADMIN_ROLE,
    {
        middleware:[
            rules._isWrongToken,
        ]
    }

), 
transactionController.delete);

routes.post('/getForReference', 
guardService.authenticate(
    REGULAR_USER_ROLE,
    {
        middleware:[
            rules._isWrongToken,
            rules._userHasResource,
        ]
    }
), 
transactionController.getForReference);

exports.transactionRoutes = routes;
