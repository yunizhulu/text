const goodsModel = require('../db/goods')

module.exports = {
    getAllGoods(req,res){
        // {}空对象表示查询所有数据行
        // {__v:0}：这是一个投影选项，用于指定要从查询结果中排除的字段
        goodsModel.find({},{__v:0},(err,docs)=>{
            if(err){
                throw new Error(err)
            }

            res.json({
                error_code:0,   
                msg:'全部商品获取成功',
                data:docs
            })
        })
    }
}