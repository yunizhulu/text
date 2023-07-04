"use strict";

// 获取操作对象
var box = document.querySelector('.big-banner');
var ltBtn = document.querySelector('.leftbtn');
var rtBtn = document.querySelector('.rightbtn');
var dsq1, dsq2; // 当前显示的图片下标

var divIndex = 1; // 定义开关

var flag = true; // 切换函数

function autoChange() {
  if (flag) {
    flag = false;
    divIndex++;

    if (divIndex > 5) {
      //上一张过渡图片的位置
      box.scrollLeft = 0;
      divIndex = 1;
    }

    change();
  }
}

dsq1 = setInterval(autoChange, 3000);

rtBtn.onclick = function () {
  autoChange();
};

ltBtn.onclick = function () {
  if (flag) {
    flag = false;
    divIndex--;
    change();

    if (divIndex < 1) {
      box.scrollLeft = 1445;
      divIndex = 5;
    }
  }
};

box.onmouseover = function () {
  clearInterval(dsq1);
  ltBtn.style.display = 'block';
  rtBtn.style.display = 'block';
};

box.onmouseout = function () {
  dsq1 = setInterval(autoChange, 3000);
  ltBtn.style.display = 'none';
  rtBtn.style.display = 'none';
}; //  创建运动函数


function change() {
  // 获取初始值
  var start = box.scrollLeft; // 获取结束值

  var end = divIndex * 1445; // 设置步长

  var speed = (end - start) / 20; // 设置起始步数

  var num = 0;
  dsq2 = setInterval(function () {
    num++; // 判断步数是否为20

    if (num == 20) {
      // 清楚定时器
      clearInterval(dsq2); // 一步到位

      box.scrollLeft = end;
      flag = true;
    } else {
      // 使用起始值加上步长，并重新赋值
      start += speed;
      box.scrollLeft = start; // console.log(start)
      // console.log(box.scrollLeft)
    }
  }, 66);
}

change();