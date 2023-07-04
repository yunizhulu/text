// 购物车按钮点击事件
$('#cart-button').on('click', function() {
    let  message =  '您还未登录，请先登录'
    if (!isLoggedIn()) {
        layer.msg(message, {
            icon: 2,
            time: 2000
            
        },function(){
        // 未登录，跳转到登录页
        window.location.href = '/html/register.html'
        })
   
    } else {
      // 已登录，跳转到购物车页
      window.location.href = '/html/shoppingcart.html'
      
    }
  })
  

  // 判断用户是否已登录的示例函数
  function isLoggedIn() {
    // 假设这里检查本地存储中是否存在有效的 token
    const token = localStorage.getItem('token');
    return token !== null && token !== undefined;
  }
  

