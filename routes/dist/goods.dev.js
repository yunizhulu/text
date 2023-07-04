"use strict";

// 导入
var express = require('express');

var _require = require('../controller/getAllGoods'),
    getAllGoods = _require.getAllGoods;

var _require2 = require('../controller/getGoods'),
    getGoods = _require2.getGoods; // 创建路由对象


var router = express.Router(); // 处理获取全部商品信息的请求

router.get('/getAllGoods', getAllGoods); // 处理获取商品详情的路由

router.get('/getGoods/:id', getGoods); // 导出路由对象

module.exports = router;