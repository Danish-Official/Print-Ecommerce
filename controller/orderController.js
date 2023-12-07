const order = require('../model/orderModel');
var braintree = require("braintree");
const dotenv = require('dotenv');

dotenv.config();

const getOrdersController = async (req, res) =>{
    try {
        const orders = await order.find({buyer: req.user.uid}).populate('products', "-photo").populate('buyer', 'fullName');
        res.status(200).send({message: 'Orders fetched successfully', orders});
    } catch (error) {
        res.status(500).send({message: 'Server error while fetching the orders'});
    }
}
const getAdminOrdersController = async (req, res) =>{
    try {
        const orders = await order.find({}).populate('products', "-photo").populate('buyer');
        res.status(200).send({message: 'Orders fetched successfully', orders});
    } catch (error) {
        res.status(500).send({message: 'Server error while fetching the orders'});
    }
}

const setOrderStatusController = async (req, res) => {
    try {
        const {oid, value} = req.body;
        const Order = await order.findByIdAndUpdate(oid, {status: value});
        res.status(200).send({message: 'Status set successfully'});
    } catch (error) {
        res.status(500).send({message: 'Server error while setting status of the order'});
    }
}
// creating gateway
var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});


// payment gateway api
// we will generate client token from the gateway we made above.
const braintreeTokenController = async(req, res) => {
    try {
        gateway.clientToken.generate({}, function(err, response){
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(response);
            }
        });

    } catch (error) {
        console.log(error);
    }
}

const braintreePaymentController = async(req, res) => {
    try {
        const {nonce, cartItems} = req.body;
        const total = cartItems.reduce((sum, item)=> sum += item.price, 0);
        const newTransaction = gateway.transaction.sale({
            amount: total,
            paymentMethodNonce: nonce,
            options: {
                submitForSettlement: true
            }
        },
        async function (err, result){
            if (result) {
                const Order = new order({
                    buyer: req.user.uid,
                    products: cartItems,
                    payment: result
                });
                await Order.save();
                res.json({ ok: true });
            } else {
                res.status(500).send(err);
            }
        }
        )
    } catch (error) {
        console.log(error);
    }
}

module.exports = {setOrderStatusController, getOrdersController, getAdminOrdersController, braintreeTokenController, braintreePaymentController}