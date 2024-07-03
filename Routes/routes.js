const express = require('express');
const routes = express.Router();
const Controlls = require('../Controllers/Controlls');

// Routes
routes.get('/', Controlls.default);

// GET
routes.get('/get-members', Controlls.getMembers);
routes.get('/get-payment-plan', Controlls.getPaymentPlan);
routes.get('/get-payments', Controlls.getPayments);
routes.get('/login/:email/:password', Controlls.login);
routes.get('/add-management-accounts', Controlls.addManagementAccounts);

// POST
routes.post('/add-member', Controlls.addMember);
routes.post('/add-payment-plan', Controlls.addPaymentPlan);
routes.post('/add-payment', Controlls.addPayment);

// DELETE
routes.delete('/delete-member/:email', Controlls.deleteMember);

// UPDATE
routes.put('/update-member', Controlls.updateMember);
routes.put('/update-payment-plan', Controlls.updatePaymentPlan);

module.exports = routes;
