const mongoose = require('./connection')

const goodsSchema = new mongoose.Schema({

    id: String,
    url: String,
    title: String,
    price: String,
    number: String,
    url1: String,
    url2: String,
    url3: String
})


// 使用goods表
const goodsModel = mongoose.model('goods', goodsSchema)

module.exports = goodsModel