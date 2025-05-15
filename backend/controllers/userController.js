const User = require('../models/userModel')
const bcrypt = require('bcryptjs');
const { sendToken } = require('../utils/generateToken');


//signup
exports.signup = async (req, res) => {
    try {
        const { username, phone, password, role } = req.body;
        if (!username || !phone || !password) {
            return res.status(400).json({ success: false, message: 'Please Enter All Required Fields' })
        }

        let user = await User.findOne({ phone });
        if (user) {
            return res.status(400).json({ success: false, message: 'User Already Exists With This Number ...' })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const new_user = await User.create({ username, phone, password: hashedPassword, role });
        if (!new_user) {
            return res.status(400).json({ success: false, message: 'Failed to Create User' });
        }

        sendToken(new_user, 201, res);
    } catch (error) {
        console.log('Error in signup controller:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}


//login
exports.login = async (req, res) => {
    try {
        const { phone, password } = req.body;
        if (!phone || !password) {
            return res.status(400).json({ success: false, message: 'Please Enter Valid Number OR Password..' })
        }

        const user = await User.findOne({ phone }).select('+password');
        if (!user) {
            return res.status(400).json({ success: false, message: 'No User Exists..' })
        }

        const matchPassword = await bcrypt.compare(password, user.password);
        if (!matchPassword) {
            return res.status(400).json({ success: false, message: 'Invalid Password' })
        }

        sendToken(user, 200, res);
    } catch (error) {
        console.log('Error in login controller:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}


//logout
exports.logout = async (req, res) => {
    try {
        res.status(200).cookie('token', null, { maxAge: 0 }).json({
            success: true,
            message: 'Loggod Out Successfully'
        })
    } catch (error) {
        console.log('Error in logout controller:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}