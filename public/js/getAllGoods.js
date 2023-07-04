// 页面加载完之后发送AJAX请求获取商品数据
// $()与$(document).ready(function()功能完全相同 都是文档加载完成之后执行相应的代码
$(function() {
    // 发送AJAX请求获取商品数据
    $.ajax({
    url: '/api/goods/getAllGoods',
    type: 'GET',
    dataType: 'json',
     // 请求成功时的处理函数
    success: function(data) {
      if (data.error_code === 0) {
        console.log(data)
        // 定义变量接收返回的数据
        var goodsData = data.data
        // 获取商品列表的容器
        var goodsContainer = $('#goodsContainer')
    
        // 渲染商品列表
        $.each(goodsData, function(index, item) {
          console.log(index,item)
          // 一个商品的html结构
          var html = 
            `
            <div class="goods">

                 <a href="productdetails.html?id=${item.id}">
                     <img src="${item.url}">
                 </a>

                <div class="fast-browse">
                    快速浏览
                 </div>

                <div class="good-crad_title">
                     <span>${item.title}</span>
                </div>

                <div class="good-pricie">
                        <span>${item.number}</span>
                            <span>
                                <span>¥</span>
                                <span>${item.price}</span>
                                <span>.00</span>
                            </span>
                </div>
            </div>
            `
            // 往容器中追加商品
          goodsContainer.append(html)
        })

      } else {
        console.error('商品获取失败:', data.msg)
      }
    },

    error: function(xhr, status, error) {
      console.error('AJAX请求发生错误:', error)
    }
  })
})

