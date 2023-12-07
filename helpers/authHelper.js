const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const userModel = require('../model/userModel');


dotenv.config();

const hashPassword = async (password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    } catch (error) {
        console.log(error);
    }
}

const comparePassword = async (enterdPassword, hashedPassword) => {
    return bcrypt.compare(enterdPassword, hashedPassword);
}

// Authorization middlewares
const requireSignIn = (req, res, next) => {
    try {
        const decodedValue = jwt.verify(req.headers.authorization, process.env.SECRET_KEY);
        req.user = decodedValue;
        next();
    } catch (error) {
        console.log(error);
    }
}
const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user.uid);
        if (!user.admin) {
            return res.status(403).send({ message: 'Unauthorized access' });
        }
        next();
    } catch (error) {
        res.status(500).send({ message: 'Server error while checking for admin' });
        console.log(error);
    }
}

module.exports = { hashPassword, comparePassword, requireSignIn, isAdmin };