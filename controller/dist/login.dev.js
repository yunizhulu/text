"use strict";

var userModel = require('../db/user');

var bcryptjs = require('bcryptjs');

module.exports = {
  login: function login(req, res) {
    var _req$body = req.body,
        username = _req$body.username,
        password = _req$body.password,
        tel = _req$body.tel,
        email = _req$body.email; // 定义响应对象

    var responseObj = {
      errorCode: 0,
      message: '注册成功'
    }; // 验证必填

    if (username === '' || password === '' || tel === '' || email === '') {
      responseObj.errorCode = 1;
      responseObj.message = '数据不能为空';
      res.json(responseObj);
      return;
    } // 判断用户名是否存在


    userModel.find({
      username: username
    }, function (err, data) {
      console.log(data);

      if (err) {
        responseObj.errorCode = 2;
        responseObj.message = '注册失败，请刷新后重试';
        res.json(responseObj);
        return;
      }

      if (data.length) {
        responseObj.errorCode = 3;
        responseObj.message = '用户名被占用';
        res.json(responseObj);
        return;
      } // 插入数据库


      userModel.insertMany({
        username: username,
        // 加密
        password: bcryptjs.hashSync(password, 10),
        tel: tel,
        email: email
      }, function (err, data) {
        if (err) {
          responseObj.errorCode = 2;
          responseObj.message = '注册失败，请刷新后重试';
          res.json(responseObj);
          return;
        }

        res.json(responseObj);
      });
    });
  }
};