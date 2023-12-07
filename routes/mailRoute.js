const express = require('express');
const mailController = require('../controller/mailController');
const {isAdmin, requireSignIn} = require('../helpers/authHelper')

const router = express.Router();
router.use(express.json());

router.post("/send-mail", requireSignIn, isAdmin, mailController);

module.exports = router;