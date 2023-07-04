"use strict";

module.exports = {
  addCart: function addCart(req, res) {
    var _req$body = req.body,
        id = _req$body.id,
        name = _req$body.name,
        price = _req$body.price,
        num = _req$body.num,
        size = _req$body.size,
        url = _req$body.url; // 返回响应

    res.json({
      id: id,
      name: name,
      price: price,
      num: num,
      size: size,
      url: url
    });
  }
};