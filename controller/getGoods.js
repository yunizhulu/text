const goodsModel = require('../db/goods')

module.exports = {
    getGoods(req,res){
        goodsModel.find({id:req.params.id},{_id:0},{__v:0},(err,docs)=>{
            if(err){
                throw new Error(err)
            }
            res.json({
                error_code:0,   
                msg:'商品获取成功',
                data:docs
            })   
        })
    }
}