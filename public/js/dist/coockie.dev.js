"use strict";

var loginbox = document.querySelector('.loginbox'); // 获取Cookie值的函数

function getCookie(name) {
  var cookieName = name + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var cookieArray = decodedCookie.split(';');

  for (var i = 0; i < cookieArray.length; i++) {
    var cookie = cookieArray[i].trim();

    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }

  return null;
} // 获取并使用Cookie的值


var username = getCookie('username');

if (username) {
  loginbox.innerHTML = ''; // 创建元素

  var a1 = document.createElement('a');
  var a2 = document.createElement('i');
  var a3 = document.createElement('a');
  a1.innerHTML = "<a href=\"/html/personal.html\" class=\"denglu\">".concat(username, " | </a>");
  a2.innerHTML = "<a href=\"javascript:;\" class=\"zhuce\">\u9000\u51FA</a> ";
  a3.innerHTML = "<a href=\"/html/personal.html\"><img src=\"../img/topbar-member.png\"></a>";
  loginbox.appendChild(a1);
  loginbox.appendChild(a2);
  loginbox.appendChild(a3);
}

function setCookie(key, value, seconds) {
  var path = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '/';
  var date = new Date();
  date.setTime(date.getTime() - 8 * 3600 * 1000 + seconds * 1000);
  document.cookie = "".concat(key, "=").concat(value, ";expires=").concat(date, ";path=").concat(path);
}

function removeCookie(key) {
  var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '/';
  setCookie(key, null, -1, path);
} // 清除Cookie


document.querySelector('.zhuce').onclick = function () {
  removeCookie('username', path = '/');
  localStorage.removeItem('token');
  location.href = '/html/register.html';
};