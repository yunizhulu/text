const express = require('express')
const {addCart} = require('../controller/addCart')
// const authMiddleware = require('../controller/authMiddleware')
// 创建路由对象
const router = express.Router()

router.post('/add', addCart)

// 导出路由对象
module.exports = router