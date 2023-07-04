"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = sendAjax;

function sendAjax(method, url, async, data, fn) {
  var xhr = new XMLHttpRequest();

  if (data) {
    if (method === 'get') {
      url += '?' + data;
      xhr.open(method, url, async);
      xhr.send();
    } else if (method === 'post') {
      xhr.open(method, url, async);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.send(data);
    }
  } else {
    xhr.open(method, url, async);
    xhr.send();
  }

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        var res = xhr.responseText;
        fn(res);
      }
    }
  };
}