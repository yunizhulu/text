const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/ordermeal')

module.exports = mongoose