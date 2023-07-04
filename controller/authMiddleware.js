// const jwt = require('jsonwebtoken')
// console.log(1)
// module.exports = (req, res, next) => {
//     if(!req.headers.authorization) {
//         respond(res, 3, '缺少令牌！')
//         console.log(res)
//         return
//     }
//     let tokenData
//     try{
//         tokenData = jwt.verify(req.headers.authorization, 'ASDFWETRRTYU$#^5kjfaklsdhfkjashf');
//     } catch(err) {
//         writeErrLog(err)
//         respond(res, 4, '令牌是错误的')
//         return
//     }
//     if(tokenData.startTime + tokenData.expires < +new Date()) {
//         respond(res, 5, '令牌过期了')
//         return
//     }
//     next()
// }