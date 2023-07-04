const userModel = require('../db/user')
const bcryptjs = require('bcryptjs')

module.exports = {
    login(req, res) {
        let {
            username,
            password,
            tel,
            email
        } = req.body
        // 定义响应对象
        let responseObj = {
            errorCode: 0,
            message: '注册成功'
        }
        // 验证必填
        if (username === '' || password === '' || tel === '' || email === '') {
            responseObj.errorCode = 1
            responseObj.message = '数据不能为空'
            res.json(responseObj)
            return
        }

        // 判断用户名是否存在
        userModel.find({username}, (err, data) => {
            console.log(data)
            if (err) {
                responseObj.errorCode = 2
                responseObj.message = '注册失败，请刷新后重试'
                res.json(responseObj)
                return
            }

            if (data.length) {
                responseObj.errorCode = 3
                responseObj.message = '用户名被占用'
                res.json(responseObj)
                return
            }
            // 插入数据库
            userModel.insertMany({
                username,
                // 加密
                password: bcryptjs.hashSync(password, 10),
                tel,
                email
            }, (err, data) => {
                if (err) {
                    responseObj.errorCode = 2
                    responseObj.message = '注册失败，请刷新后重试'
                    res.json(responseObj)
                    return
                }
                res.json(responseObj)
            })
        })
    }

}