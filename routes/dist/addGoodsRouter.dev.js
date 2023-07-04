"use strict";

var express = require('express');

var _require = require('../controller/addCart'),
    addCart = _require.addCart; // const authMiddleware = require('../controller/authMiddleware')
// 创建路由对象


var router = express.Router();
router.post('/add', addCart); // 导出路由对象

module.exports = router;