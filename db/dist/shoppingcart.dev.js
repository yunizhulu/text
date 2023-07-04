"use strict";

var mongoose = require('./connection');

var cartsSchema = new mongoose.Schema({
  id: String,
  url: String,
  name: String,
  price: String,
  number: String,
  num: String,
  size: String
}); // {id: 'DK011506', name: 'Dickies商场同款 23春夏条纹夹克', price: '779', num: '1', size: 'M'}
// 使用shoppingcart表

var cartsModel = mongoose.model('shoppingcart', goodsSchema);
module.exports = cartsModel;