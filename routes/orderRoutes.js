const {getOrdersController, braintreeTokenController, braintreePaymentController, getAdminOrdersController, setOrderStatusController} = require('../controller/orderController');
const express = require('express');
const { requireSignIn, isAdmin} = require('../helpers/authHelper');
const router = express.Router();

router.get('/get-orders', requireSignIn, getOrdersController);
router.get('/get-adminOrders', requireSignIn, isAdmin, getAdminOrdersController);

router.put('/set-order-status', requireSignIn, isAdmin, setOrderStatusController);

// fetching token from braintree
router.get('/braintree/token', braintreeTokenController);

// making payments
router.post('/braintree/payment', requireSignIn, braintreePaymentController);

module.exports = router;