const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    profile_img: {
        type: String,
        default: 'https://thanhtra.com.vn/images/avatar-default.png'
    },
    role: {
        type: String,
        enum: ['requester', 'driver', 'admin'],
        default: 'requester'
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;