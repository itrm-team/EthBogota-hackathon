const express = require('express');
const routes = express.Router();
const emailController = require('../controller/email_controller').functions;

/*
    EMAILS ROUTES
*/

// POST
//que clase de guardas necesita esto
routes.post('/sendSignUpConfirmationEmail', emailController.confirmationCode);

routes.post('/sendConfirmationEmailForRecover', emailController.recoverPassword);

routes.post('/sendDepositConfirmationEmail', emailController.confirmationDeposit);

routes.post('/sendWelcomeVIIOEmail', emailController.welcomeVIIO);
//////////
routes.post('/sendVerificationEmailForCampaing', emailController.verifyEmailForCampaing);

routes.post('/addUserForCampaing', emailController.addUserForCampaing);
//////////
routes.post('/sendWithdrawalConfirmationEmail', emailController.confirmationWithdrawal);


exports.emailRoutes = routes; 