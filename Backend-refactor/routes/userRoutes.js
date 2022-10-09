const express = require('express')
const routes = express.Router()
const userController = require('../controller/user_controller')
const { SUPER_ADMIN_ROLE, ADMIN_ROLE, REGULAR_USER_ROLE } =
    require('../enums/roles').roles
const rules = require('../enums/accessRules')
const guardService = require('../services/guardServices').regularRequest

routes.get(
    '/getUser',
    guardService.authenticate(ADMIN_ROLE, {
        middleware: [
            rules._isWrongToken,
        ],
    }),
    userController.get
)

routes.post('/checkEmail', userController.checkEmail)

routes.get(
    '/getUsers',
    // guardService.authenticate(ADMIN_ROLE, {
    //     middleware: [
    //         rules._isWrongToken,
    //     ],
    // }),
    userController.gets
)

//necesita guarda
routes.post('/validationPasswordWithdraw', userController.validationPasswordWithdraw)

routes.post('/login', userController.login)

routes.post('/recover', userController.recover)

routes.post('/register',userController.post)

routes.get(
    '/getSelf',
    guardService.authenticate(REGULAR_USER_ROLE, {
        middleware: [
            rules._isWrongToken,
            rules._userHasResource,
        ],
    }),
    userController.getSelf
)

routes.post(
    '/recoverPassword',
    guardService.authenticate(REGULAR_USER_ROLE, {
        middleware: [
            rules._isWrongToken,
            rules._userHasResource
        ],
    }),
    userController.recover
)

routes.post(
    '/updatePassword',
    guardService.authenticate(REGULAR_USER_ROLE, {
        middleware: [
            rules._isWrongToken,
            rules._userHasResource
        ],
    }),
    userController.updatePasswordSelf
)

routes.post(
    '/validateConfirmationCode',
    guardService.authenticate(REGULAR_USER_ROLE, {
        middleware: [
            rules._isWrongToken,
        ],
    }),
    userController.validateSignUpCode
)


routes.post(
    '/updateUser',
    guardService.authenticate(REGULAR_USER_ROLE, {
        middleware: [
            rules._isWrongToken,
            //rules._userHasResource
        ],
    }),
    userController.update,
)

routes.post(
    '/deleteUser',
    guardService.authenticate(ADMIN_ROLE, {
        middleware: [
            rules._isWrongToken,
            //rules._userHasResource
        ],
    }),
    userController.delete
)

exports.userRoutes = routes
