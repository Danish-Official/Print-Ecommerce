const { hashPassword, comparePassword } = require('../helpers/authHelper');
const userModel = require('../model/userModel');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const userRegisterController = async (req, res) => {
    try {
        const { fullName, email, phNo, gender, address, password } = req.body;
        const hashedPassword = await hashPassword(password);
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(200).send({ message: "User is already registerd by this email" });
        }
        const User = await new userModel({ fullName, email, phNo, gender, address, password: hashedPassword }).save();
        res.status(200).send({ message: "User has been registered successfully" });
    } catch (error) {
        res.status(500).send({ message: "Something went wrong at server" });
    }
}

const userLoginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const User = await userModel.findOne({ email });
        if (!User) {
            return res.status(401).send({ success: false, message: 'User does not exist' });
        }
        const match = await comparePassword(password, User.password);
        if (!match) {
            return res.status(401).send({ success: false, message: 'Invalid password' });
        }
        const token = jwt.sign({uid: User._id}, process.env.SECRET_KEY);
        res.status(200).send({ success: true, message: 'Login successful', auth: { user: User, token: token } });
    } catch (error) {
        res.status(500).send({ success: false, message: "Something went wrong at server" });
    }
}

const userUpdateController = async (req, res) => {
    try {
        const { id, fullName, email, phNo, gender, address, password } = req.body;
        if (!password) {
            const User = await userModel.findByIdAndUpdate(id, { fullName, email, phNo, gender, address }, { new: true });
            res.status(200).send({ success: true, user: User, message: "User has been updated successfully" });
        }
        else {
            const hashedPassword = await hashPassword(password);
            const User = await userModel.findByIdAndUpdate(id, { fullName, email, phNo, gender, address, password: hashedPassword }, { new: true });
            res.status(200).send({ success: true, user: User, message: "User has been updated successfully" });
        }
    } catch (error) {
        res.status(500).send({ message: "Something went wrong at server" });
    }
}

module.exports = { userRegisterController, userLoginController, userUpdateController };