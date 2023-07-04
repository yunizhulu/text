"use strict";

var xuans = document.getElementsByName('xuan');
var quan = document.getElementsByName('quan');
var total_price_div = document.querySelector('.checkout-total');
var cart_body = document.querySelector('.cart_body');
var container = document.querySelector('.container');
var pays = document.querySelector('.g-btn');
var cartsGoodsNum = document.getElementById('cartsGoodsNum');

document.onclick = function () {
  var e = e || window.event;
  var target = e.target || e.srcElement; // +

  if (target.innerHTML == '+') {
    // 获取输入框中的值
    var val = target.previousElementSibling.value;
    val++;
    target.previousElementSibling.value = val; // 获取节点

    var splist = target.parentNode.parentNode.nextElementSibling.children[0].children; // 获取单价

    var price1 = splist[1].innerHTML; // 计算总价

    var sum1 = price1 * val; // 获取节点

    var totallist = target.parentNode.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.children[0].children; // 将总价赋值

    totallist[1].innerHTML = sum1;
    total();
  } // -


  if (target.innerHTML == '-') {
    // 获取输入框中的值
    var val = target.previousElementSibling.previousElementSibling.value; // 判断 让val值最小为1

    if (val <= 1) {
      val = 1;
    } else {
      val--;
    }

    target.previousElementSibling.previousElementSibling.value = val; // 获取节点

    var splist = target.parentNode.parentNode.nextElementSibling.children[0].children; // 获取单价

    var price1 = splist[1].innerHTML; // 计算总价

    var sum1 = price1 * val;
    console.log(sum1, val); // 获取节点

    var totallist = target.parentNode.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.children[0].children; // 将总价赋值

    totallist[1].innerHTML = sum1;
    total();
  } // 全选


  if (target.name == 'quan') {
    for (var i = 0; i < xuans.length; i++) {
      if (target.checked) {
        xuans[i].checked = true;
      } else {
        xuans[i].checked = false;
      }
    }

    checked1();
    total();
  }

  if (target.name == 'xuan') {
    checked1();
    total();
  }
}; // 选中框函数


function checked1() {
  var num = 0;

  for (var i = 0; i < xuans.length; i++) {
    // 判断当前选中框是否被选中
    if (xuans[i].checked) {
      // 选中则让num+1
      num++;
    }
  }

  if (num == xuans.length && num != 0) {
    quan[0].checked = true;
  } else {
    quan[0].checked = false;
  }
}

checked1(); // 选中时计算总价

function total() {
  var goods = cart_body.children;
  var num = 0;
  var n = 0;

  for (var j = 0; j < xuans.length; j++) {
    // 判断当前选中框是否被选中
    if (xuans[j].checked) {
      var xj = goods[j].children[6].children[0].children[1].innerHTML;
      num += parseFloat(xj); // 黑色总价

      total_price_div.children[0].children[1].children[0].children[1].innerHTML = num; // 红色部分总价

      container.children[1].children[1].children[0].children[1].innerHTML = num;
      pays.children[1].classList.remove('is-disabled');
    } else {
      n++;

      if (n === xuans.length) {
        // 黑色总价
        total_price_div.children[0].children[1].children[0].children[1].innerHTML = 0; // 红色部分总价

        container.children[1].children[1].children[0].children[1].innerHTML = 0;
        pays.children[1].classList.add('is-disabled');
      }
    }
  }
} // 加入购物车


$(function () {
  // 渲染购物车页面
  renderCartItems();

  function renderCartItems() {
    // 获取购物车数据,判断本地存储中是否有cartItems，有则返回解析后的数组，否则返回一个空数组
    var cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
    var cartContainer = $('#cartItems'); // 清空购物车容器

    cartContainer.empty();

    if (cartItems.length > 0) {
      var index = 0; // 遍历购物车项数组，创建购物车商品项的 HTML 结构

      cartItems.forEach(function (cartItem) {
        var html = "\n            <div class=\"cart_main-tr\" data-index=".concat(index, ">\n                       <!-- \u9009\u62E9\u6846 -->\n                       <div class=\"t-checkbox\">\n                           <input type=\"checkbox\" name=\"xuan\">\n                       </div>\n                       <!-- \u5546\u54C1\u8BE6\u60C5 -->\n                       <div class=\"t-goods\">\n                           <div class=\"goods-img\">\n                               <img src=\"").concat(cartItem.url, "\">\n                           </div>\n\n                           <div class=\"goods-item__right\">\n                               <div class=\"goods-item__title\">\n                                   <span>").concat(cartItem.name, "</span>\n                               </div> \n                               <div class=\"goods-item__specs\">\n                                   <span class=\"goods-item__specs-bn\">").concat(cartItem.id, "</span> \n                                   <span class=\"goods-item__specs-color\">\u767D\u8272\u6D82\u9E26\u6EE1\u8EAB\u5370</span> \n                                   <span class=\"goods-item__specs-size\">").concat(cartItem.size, "</span>\n                               </div> \n                           </div>\n                       </div>\n\n                       <!-- \u64CD\u4F5C -->\n                       <div class=\"t-action\">\n                           <button class=\"sp-btn sp-btn__text\"> \n                               <span class=\"sp-btn__txt\">\u6536\u85CF |</span>\n                           </button> \n                           <button class=\"sp-btn sp-btn__text\">\n                               <span class=\"sp-btn__txt remove_btn\">\u79FB\u9664</span>\n                           </button>\n                       </div>\n\n                       <!-- + -  -->\n                       <div class=\"t-quantity\">\n                            <div class=\"sp-num-input\">\n                               <input autocomplete=\"off\" class=\"sp-num-input__input\" value=\"").concat(cartItem.num, "\"> \n                               <span class=\"sp-num-input__btn sp-num-input__btn-up\">+</span> \n                               <span class=\"sp-num-input__btn sp-num-input__btn-down is-disabled\">-</span>\n                           </div>\n                       </div>\n\n                       <!--\u4EF7\u683C -->\n                       <div class=\"t-price\">\n                           <span class=\"sp-price sp-price__default clearfix\">\n                               <span class=\"price__symbol\">\xA5</span> \n                               <span class=\"price__int\">").concat(cartItem.price, "</span> \n                               <span class=\"price__decimal\">.00</span>\n                           </span>\n                       </div>\n\n\n                       <!-- \u4F18\u60E0 -->\n                       <div class=\"t-coupon\">\n                           <span class=\"sp-price sp-price__default clearfix\">\n                               <span class=\"price__symbol\">\xA5</span> \n                               <span class=\"price__int\">0</span> \n                               <span class=\"price__decimal\">.00</span>\n                           </span>\n                       </div>\n\n                       <!-- \u603B\u4EF7 -->\n                       <div class=\"t-total\">\n                           <span class=\"sp-price sp-price__default total_color\">\n                               <span class=\"price__symbol\">\xA5</span> \n                               <span class=\"price__int\">").concat(cartItem.price * cartItem.num, "</span> \n                               <span class=\"price__decimal\">.00</span> \n                           </span>\n                       </div>\n             </div>\n                    "); // 将商品项添加到购物车容器中

        cartContainer.append(html);
        index++;
      }); // 点击移除按钮的事件处理程序

      $('.cart_main-tr').on('click', '.remove_btn', function () {
        var cartItem = $(this).closest('.cart_main-tr');
        var index = cartItem.data('index'); // 从购物车项数组中移除对应的商品项

        cartItems.splice(index, 1);
        console.log(cartItems); // 从本地存储中移除对应的数据

        localStorage.setItem('cartItems', JSON.stringify(cartItems)); // 判断是否登录

        var token = localStorage.getItem('token');

        if (token) {
          // 获取购物车数据
          var _cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []; // 把购物车中商品数渲染到头顶


          cartsGoodsNum.innerHTML = _cartItems.length;
        } // 重新渲染购物车页面


        renderCartItems();
      });
    } else {
      // 如果购物车为空，显示相应的提示信息
      var emptyCartMessage = '<h1>抱歉！您的购物车内暂时没有任何商品，您可以继续购物，或者查看您的订单！</h1>';
      cartContainer.html(emptyCartMessage);
    }
  }
});