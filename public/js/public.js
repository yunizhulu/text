var cartsGoodsNum = document.getElementById('cartsGoodsNum')

$(function() {

    const token = localStorage.getItem('token');
    if (token) {
    // 获取购物车数据
    const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
    cartsGoodsNum.innerHTML = cartItems.length
    } 

  })
  


