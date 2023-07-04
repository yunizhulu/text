"use strict";

var userModel = require('../db/user');

var bcryptjs = require('bcryptjs');

var jwt = require('jsonwebtoken');

var secretKey = 'QWDASFASDGSDGXFGSDHASDASFASDF';
module.exports = {
  register: function register(req, res) {
    var _req$body = req.body,
        username = _req$body.username,
        password = _req$body.password;
    var responseObj = {
      errCode: 0,
      message: '登录成功，即将跳转到首页',
      token: ''
    };
    userModel.find({
      username: username
    }, function (err, data) {
      if (err) {
        responseObj.errCode = 1;
        responseObj.message = '登录失败';
        res.json(responseObj);
        return;
      }

      if (data.length) {
        // data是一个数组，data[0],才是返回的对象 如果直接data.password会查不到password。
        // 比较加密后的密码bcryptjs.compare
        bcryptjs.compare(password, data[0].password, function (err, isMatch) {
          if (err) {
            responseObj.errCode = 1;
            responseObj.message = '登录失败';
            res.json(responseObj);
            return;
          }

          if (isMatch) {
            // 如果验证成功，生成 Token
            var payload = {
              username: username,
              role: 'user'
            }; // 自定义 payload 对象

            var token = jwt.sign(payload, secretKey);
            responseObj.token = token;
            res.json(responseObj);
          } else {
            responseObj.errCode = 2;
            responseObj.message = '用户名或密码错误';
            res.json(responseObj);
          }
        });
      } else {
        responseObj.errCode = 2;
        responseObj.message = '用户名或密码错误';
        res.json(responseObj);
      }
    });
  }
};