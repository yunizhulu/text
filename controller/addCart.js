module.exports = {
    addCart(req,res){
    const { id, name,price,num,size,url} = req.body
    // 返回响应
     res.json({id, name,price ,num,size,url})
    }
}