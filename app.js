const express = require('express')
const app = express()
app.listen(3000)

const bodyParser = require('body-parser')
const path = require('path')
// 引入处理用户请求的路由
const userRouter = require('./routes/user')
// 引入处理商品请求的路由
const goodsRouter = require('./routes/goods')
// 加入购物车
const addGoodsRouter = require('./routes/addGoodsRouter')

app.use(bodyParser.urlencoded({extended: false}))


// 登录注册
app.use('/users', userRouter)


// 获取商品
app.use('/api/goods', goodsRouter)


// 添加购物车
app.use('/api/cart', addGoodsRouter)



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))

})


// 静态托管
app.use(express.static('public'))

app.use('/node_modules', express.static('node_modules'))