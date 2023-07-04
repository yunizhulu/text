"use strict";

var goodsModel = require('../db/goods');

module.exports = {
  getAllGoods: function getAllGoods(req, res) {
    goodsModel.find({}, {
      __v: 0
    }, function (err, docs) {
      if (err) {
        throw new Error(err);
      }

      res.json({
        error_code: 0,
        msg: '商品获取成功',
        data: docs
      });
    });
  }
};