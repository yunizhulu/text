"use strict";

var cartsGoodsNum = document.getElementById('cartsGoodsNum');
$(function () {
  var token = localStorage.getItem('token');

  if (token) {
    // 获取购物车数据
    var cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
    cartsGoodsNum.innerHTML = cartItems.length;
  }
});