"use strict";

var goods = document.querySelector('.right-goods');
var gd = document.querySelectorAll('.goods');
var xiding = document.querySelector('.xiding');

window.onscroll = function () {
  // 吸顶
  var top_side = document.documentElement.scrollTop || document.body.scrollTop;

  if (top_side >= 150) {
    xiding.style.display = 'block';
  } else {
    xiding.style.display = 'none';
  }
};