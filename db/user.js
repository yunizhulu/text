const mongoose = require('./connection')

const userSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    email: String,
    tel: Number,
    isMan: Boolean,
    age: Number,
    created_at: {
        type: Date,
        default: +new Date()
    },
    updated_at: {
        type: Date,
        default: +new Date()
    },
    enable: {
        type: Boolean,
        default: false
    }
})

// 使用user表
const userModel = mongoose.model('user', userSchema)

module.exports = userModel

