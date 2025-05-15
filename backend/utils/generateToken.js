const User = require("../models/userModel");
const jwt = require('jsonwebtoken')

exports.sendToken = async (user, statusCode, res) => {
    try {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '3d' });
        const options = {
            httpOnly: true,
            maxAge: 3 * 24 * 60 * 60 * 1000,
            sameSite: 'strict',
        }
        const message = statusCode === 201 ? "User Created Successfully" : "Loggod In Successfully";
        res.status(statusCode).cookie('token', token, options).json({
            success: true,
            message
        })
    } catch (error) {
        console.log('Error in sendToken Utils:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}