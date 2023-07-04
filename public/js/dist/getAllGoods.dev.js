"use strict";

// 页面加载完之后发送AJAX请求获取商品数据
// $()与$(document).ready(function()功能完全相同 都是文档加载完成之后执行相应的代码
$(function () {
  // 发送AJAX请求获取商品数据
  $.ajax({
    url: '/api/goods/getAllGoods',
    type: 'GET',
    dataType: 'json',
    // 请求成功时的处理函数
    success: function success(data) {
      if (data.error_code === 0) {
        console.log(data); // 定义变量接收返回的数据

        var goodsData = data.data; // 获取商品列表的容器

        var goodsContainer = $('#goodsContainer'); // 渲染商品列表

        $.each(goodsData, function (index, item) {
          console.log(index, item); // 一个商品的html结构

          var html = "\n            <div class=\"goods\">\n\n                 <a href=\"productdetails.html?id=".concat(item.id, "\">\n                     <img src=\"").concat(item.url, "\">\n                 </a>\n\n                <div class=\"fast-browse\">\n                    \u5FEB\u901F\u6D4F\u89C8\n                 </div>\n\n                <div class=\"good-crad_title\">\n                     <span>").concat(item.title, "</span>\n                </div>\n\n                <div class=\"good-pricie\">\n                        <span>").concat(item.number, "</span>\n                            <span>\n                                <span>\xA5</span>\n                                <span>").concat(item.price, "</span>\n                                <span>.00</span>\n                            </span>\n                </div>\n            </div>\n            "); // 往容器中追加商品

          goodsContainer.append(html);
        });
      } else {
        console.error('商品获取失败:', data.msg);
      }
    },
    error: function error(xhr, status, _error) {
      console.error('AJAX请求发生错误:', _error);
    }
  });
});