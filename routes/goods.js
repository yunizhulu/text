// 导入
const express = require('express')
const {getAllGoods} = require('../controller/getAllGoods')
const {getGoods} = require('../controller/getGoods')
// 创建路由对象
const router = express.Router()

// 处理获取全部商品信息的请求
router.get('/getAllGoods', getAllGoods)

// 处理获取商品详情的路由
router.get('/getGoods/:id',getGoods)

// 导出路由对象
module.exports = router