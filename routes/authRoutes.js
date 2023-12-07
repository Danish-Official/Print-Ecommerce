const express = require('express');
const { userRegisterController, userLoginController, userUpdateController } = require('../controller/usersController');
const { requireSignIn, isAdmin } = require('../helpers/authHelper');
const { getAdminProducts } = require('../controller/productsController');
const router = express.Router();

router.post('/register', userRegisterController);
router.post('/login', userLoginController);
router.post('/update', requireSignIn, userUpdateController);
router.get('/user-auth', requireSignIn, (req, res) => {
    return res.status(200).send({ ok: true })
});
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true })
});
router.get('/admin-products', requireSignIn, isAdmin, getAdminProducts);

module.exports = router;
