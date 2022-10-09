const express = require('express');
const routes = express.Router();
const financialEntityController = require('../controller/financial_entity_controller');
const { SUPER_ADMIN_ROLE, ADMIN_ROLE, REGULAR_USER_ROLE} = require('../enums/roles').roles;
const rules = require('../enums/accessRules');
const guardService = require('../services/guardServices').regularRequest;

/*
    FINANCIAL ENTITIES RATE ROUTES
*/

//  GET FINANCIAL ENTITY
routes.get('/getFinancialEntity/:id_financial_entity',
    guardService.authenticate(
        ADMIN_ROLE,
        {
            middleware: [
                rules._isWrongToken,
            ]
        }
    ),
financialEntityController.get);

//GET FINANCIAL ENTITIES
routes.get('/getFinancialEntities', 
    guardService.authenticate(
        REGULAR_USER_ROLE,
        {
            middleware:[
                rules._isWrongToken,
            ]
        }
    ),
financialEntityController.gets);


//POST FINANCIAL ENTITY
routes.post('/insertFinancialEntity',
    guardService.authenticate(
        ADMIN_ROLE,
        {
            middleware: [
                rules._isWrongToken,
            ]
        }
    ),
financialEntityController.post);

//PUT FINANCIAL ENTITY
routes.put('/updateFinancialEntity',
    guardService.authenticate(
        ADMIN_ROLE,
        {
            middleware: [
                rules._isWrongToken,
            ]
        }
    ),
financialEntityController.update);

//DELETE FINANCIAL ENTITY
routes.delete('/deleteFinancialEntity/:id_financial_entity',
    guardService.authenticate(
        ADMIN_ROLE,
        {
            middleware: [
                rules._isWrongToken,
            ]
        }
    ),
financialEntityController.delete);

exports.fERoutes = routes;