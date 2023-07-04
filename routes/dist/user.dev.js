"use strict";

var express = require("express");

var router = express.Router();

var _require = require('../controller/login'),
    login = _require.login;

var _require2 = require('../controller/register'),
    register = _require2.register; // 注册路由


router.post('/api/login', login); // 登录路由

router.post('/api/register', register);
module.exports = router;