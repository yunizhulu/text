var goods_title = document.querySelector('.goods-title')
var goods_bn = document.querySelector('.goods-bn')
var now_price1 = document.querySelector('.now_price1')
var sp_num = document.getElementById('sp-num-input__input')
var likeBuy = document.getElementById('likeBuy')
var cartsGoodsNum = document.getElementById('cartsGoodsNum')


$(function () {
  $('#addToCartBtn').on('click', function () {

    // 加载层
    let loadid = layer.load(1, {
      shade: [0.5, '#000']
    })

    // 获取商品信息
    var productId = goods_bn.innerHTML
    var productName = goods_title.innerHTML
    var productPrice = now_price1.innerHTML
    var num = sp_num.value

    // 构建要添加到购物车的商品对象
    var product = {
      id: productId,
      name: productName,
      price: productPrice,
      num: num,
      size: "M",
      url: $(".bigImgurl").attr("src")
    }
    // 将商品信息发送到服务器的购物车接口
    $.ajax({
      url: '/api/cart/add', // 替换为实际的购物车接口URL
      method: 'POST',
      data: product,
      success: function (response) {
        // 解构赋值
        let {
          id,
          name,
          price,
          num,
          size,
          url
        } = response

        let goodsData = {
          id: id,
          name: name,
          price: price,
          num: num,
          size: size,
          url: url
        }
        // 获取购物车数据
        let cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
        // 将新的购物车项添加到数组中
        // unshift追加到数组第一位
        cartItems.unshift(goodsData)
        // 存储更新后的购物车数据到 localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItems))

        // 判断用户是否已经登录
        if (localStorage.getItem('token')) {
          let message2 = '加入购物车成功'
          // 取消加载层
          layer.close(loadid)
          layer.msg(message2, {
            icon: 1,
            time: 2000
          }, function () {
           
            const token = localStorage.getItem('token')
            if (token) {
              // 获取购物车数据
              const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
              // 顶部显示购物车内商品件数
              cartsGoodsNum.innerHTML = cartItems.length
            }
          })
        } else {
          let message = '您还未登录，请先登录'
          layer.msg(message, {
            icon: 2,
            time: 2000
          }, function () {
            // 未登录，跳转到登录页
            window.location.href = '/html/register.html'
          })
        }
      },
      error: function (xhr, status, error) {
        // 加入购物车失败
        console.error('添加到购物车失败:', error)
      }
    })

  })
})



likeBuy.onclick = function () {
  let message = '您还未登录，请先登录'
  if (!isLoggedIn()) {
    layer.msg(message, {
      icon: 2,
      time: 2000

    }, function () {
      // 未登录，跳转到登录页
      window.location.href = '/html/register.html'
    })

  } else {
    // 已登录，跳转到购物车页
    window.location.href = '/html/shoppingcart.html'
  }
}

// 判断用户是否已登录的示例函数
function isLoggedIn() {
  // 假设这里检查本地存储中是否存在有效的 token
  const token = localStorage.getItem('token');
  return token !== null && token !== undefined;
}