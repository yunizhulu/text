"use strict";

var express = require('express');

var app = express();
app.listen(3000);

var bodyParser = require('body-parser');

var path = require('path'); // 引入处理用户请求的路由


var userRouter = require('./routes/user'); // 引入处理商品请求的路由


var goodsRouter = require('./routes/goods'); // 加入购物车


var addGoodsRouter = require('./routes/addGoodsRouter');

app.use(bodyParser.urlencoded({
  extended: false
})); // 登录注册

app.use('/users', userRouter); // 获取商品

app.use('/api/goods', goodsRouter); // 添加购物车

app.use('/api/cart', addGoodsRouter);
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/index.html'));
}); // 静态托管

app.use(express["static"]('public'));
app.use('/node_modules', express["static"]('node_modules'));