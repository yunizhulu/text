"use strict";

var imglist = document.querySelectorAll('.imglist ul li img');
var mengbanceng = document.querySelector('.mengbanceng');
var leftbox = document.querySelector('.leftbox');
var rightbox = document.querySelector('.rightbox');
var rightimg = document.querySelector('.rightbox img');
var leftimg = document.querySelector('.leftbox img'); // 放大镜

function magnifier() {
  //左边盒子绑定鼠标移入事件
  leftbox.onmouseover = function () {
    //蒙版层和右边大盒子显示
    mengbanceng.style.display = 'block';
    rightbox.style.display = 'block';
  };

  leftbox.onmouseout = function () {
    // 蒙版层隐藏
    mengbanceng.style.display = 'none';
    rightbox.style.display = 'none';
  };

  leftbox.onmousemove = function (e) {
    //兼容
    var e = e || window.event; //获取当前蒙版层的移动距离

    var left_distance = e.pageX - leftbox.offsetLeft - parseInt(mengbanceng.offsetWidth / 2);
    var top_distance = e.pageY - leftbox.offsetTop - parseInt(mengbanceng.offsetHeight / 2); //设置当前蒙版层最大的移动距离

    var maxX = leftbox.clientWidth - mengbanceng.clientWidth;
    var maxY = leftbox.clientHeight - mengbanceng.clientHeight; //图片的移动距离

    var imgX;
    var imgY; //水平

    if (left_distance <= 0) {
      mengbanceng.style.left = '0px';
      imgX = 0;
    } else if (left_distance >= maxX) {
      mengbanceng.style.left = maxX + 'px';
      imgX = maxX;
    } else {
      mengbanceng.style.left = left_distance + 'px';
      imgX = left_distance;
    } //垂直


    if (top_distance <= 0) {
      mengbanceng.style.top = '0px';
      imgY = 0;
    } else if (top_distance >= maxY) {
      mengbanceng.style.top = maxY + 'px';
      imgY = maxY;
    } else {
      mengbanceng.style.top = top_distance + 'px';
      imgY = top_distance;
    } //计算比例


    var blx = imgX / maxX;
    var bly = imgY / maxY; // 右边图片的移动距离

    rightimg.style.left = -(rightimg.offsetWidth - rightbox.offsetWidth) * blx + 'px';
    rightimg.style.top = -(rightimg.offsetHeight - rightbox.offsetHeight) * bly + 'px'; // // 右边图片的放大效果

    var scale = 1.5; // 设置放大倍数

    rightimg.style.transform = "scale(".concat(scale, ")");
    rightimg.style.transformOrigin = "".concat(blx * 100, "% ").concat(bly * 100, "%");
  };
} // $(function()与$(document).ready(function()功能完全相同 都是文档加载完成之后执行相应的代码


$(function () {
  // 获取 URL 参数的值
  var urlParams = new URLSearchParams(window.location.search); // window.location.search，你可以获取当前页面 URL 中的查询参数部分，包括问号 ? 后面的内容。

  var id = urlParams.get('id');
  console.log(urlParams, id); // 使用 AJAX 请求数据

  $.ajax({
    url: '/api/goods/getGoods/' + id,
    method: 'GET',
    success: function success(data) {
      // 在页面中渲染数据
      console.log(data); //  jQuery 库的 text() 方法

      $('.goods-title').text(data.data[0].title);
      $('.goods-bn').text(data.data[0].number);
      $('.now_price1').text(data.data[0].price); // //  jQuery 库的attr方法,可以设置指定元素的属性值，这里设置img标签的src属性，即图片路径

      $('.bigImgurl').attr('src', data.data[0].url);
      $('.smallImg').attr('src', data.data[0].url);
      $('.sizeImg').attr('src', data.data[0].url);
      $('.show1').attr('src', data.data[0].url).attr('data-imgurl', data.data[0].url);
      $('.show2').attr('src', data.data[0].url1).attr('data-imgurl', data.data[0].url1);
      $('.show3').attr('src', data.data[0].url2).attr('data-imgurl', data.data[0].url2);
      $('.show4').attr('src', data.data[0].url3).attr('data-imgurl', data.data[0].url3); // 切换图片的函数

      function change(m) {
        var imgurl = $('.show' + m).attr('data-imgurl');
        leftimg.setAttribute('src', imgurl);
        rightimg.setAttribute('src', imgurl); // 切换图片后再次调用放大镜函数

        magnifier();
      }

      imglist.forEach(function (item, index) {
        item.onclick = function () {
          change(index + 1);
        };
      });
    },
    error: function error() {
      console.log('请求数据失败');
    }
  });
});