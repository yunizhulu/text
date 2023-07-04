"use strict";

var xiding = document.querySelector('.xiding');
var btn2 = document.querySelector('.denglu');
var btn3 = document.querySelector('.zhuce');
var imglist = document.querySelectorAll('.logo-img');
var backTopBtn = document.getElementById('back-top'); // 吸顶

window.onscroll = function () {
  var top_side = document.documentElement.scrollTop || document.body.scrollTop;

  if (top_side >= 150) {
    xiding.style.display = 'block';
  } else {
    xiding.style.display = 'none';
  }
}; // 回到顶部


backTopBtn.onclick = function () {
  var t = document.documentElement.scrollTop || document.body.scrollTop;
  var timer = setInterval(function () {
    t -= 150;
    document.documentElement.scrollTop = document.body.scrollTop = t; // 让定时器停止

    if (t <= 0) {
      clearInterval(timer);
    }
  }, 30);
};