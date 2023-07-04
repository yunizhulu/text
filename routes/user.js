const express = require("express");
const router = express.Router()
const {login} = require('../controller/login')
const {register} = require('../controller/register')
// 注册路由
router.post('/api/login', login)

// 登录路由
router.post('/api/register',register)

module.exports = router