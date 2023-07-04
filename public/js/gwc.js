var xuans = document.getElementsByName('xuan')
var quan = document.getElementsByName('quan')
var total_price_div = document.querySelector('.checkout-total')
var cart_body = document.querySelector('.cart_body')
var container = document.querySelector('.container')
var pays = document.querySelector('.g-btn')
var cartsGoodsNum = document.getElementById('cartsGoodsNum')

document.onclick = function () {
    var e = e || window.event
    var target = e.target || e.srcElement

    // +
    if (target.innerHTML == '+') {
        // 获取输入框中的值
        var val = target.previousElementSibling.value

        val++

        target.previousElementSibling.value = val
        // 获取节点
        var splist = target.parentNode.parentNode.nextElementSibling.children[0].children

        // 获取单价
        var price1 = splist[1].innerHTML


        // 计算总价
        var sum1 = price1 * val

        // 获取节点
        var totallist = target.parentNode.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.children[0].children

        // 将总价赋值
        totallist[1].innerHTML = sum1

        total()
    }

    // -
    if (target.innerHTML == '-') {
        // 获取输入框中的值
        var val = target.previousElementSibling.previousElementSibling.value

        // 判断 让val值最小为1
        if (val <= 1) {
            val = 1
        } else {
            val--
        }

        target.previousElementSibling.previousElementSibling.value = val

        // 获取节点
        var splist = target.parentNode.parentNode.nextElementSibling.children[0].children

        // 获取单价
        var price1 = splist[1].innerHTML


        // 计算总价
        var sum1 = price1 * val
        console.log(sum1, val)
        // 获取节点
        var totallist = target.parentNode.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.children[0].children

        // 将总价赋值
        totallist[1].innerHTML = sum1

        total()
    }

    // 全选
    if (target.name == 'quan') {
        for (var i = 0; i < xuans.length; i++) {
            if (target.checked) {

                xuans[i].checked = true
            } else {
                xuans[i].checked = false
            }
        }

        checked1()
        total()
    }


    if (target.name == 'xuan') {
        checked1()

        total()


    }


}

// 选中框函数
function checked1() {
    var num = 0
    for (var i = 0; i < xuans.length; i++) {
        // 判断当前选中框是否被选中
        if (xuans[i].checked) {
            // 选中则让num+1
            num++
        }
    }

    if (num == xuans.length && num != 0) {
        quan[0].checked = true

    } else {
        quan[0].checked = false
    }

}
checked1()

// 选中时计算总价
function total() {
    var goods = cart_body.children
    var num = 0
    var n = 0
    for (let j = 0; j < xuans.length; j++) {
        // 判断当前选中框是否被选中
        if (xuans[j].checked) {
            var xj = goods[j].children[6].children[0].children[1].innerHTML
            num += parseFloat(xj)
            // 黑色总价
            total_price_div.children[0].children[1].children[0].children[1].innerHTML = num
            // 红色部分总价
            container.children[1].children[1].children[0].children[1].innerHTML = num
            pays.children[1].classList.remove('is-disabled')
        } else {
            n++
            if (n === xuans.length) {
                // 黑色总价
                total_price_div.children[0].children[1].children[0].children[1].innerHTML = 0
                // 红色部分总价
                container.children[1].children[1].children[0].children[1].innerHTML = 0
                pays.children[1].classList.add('is-disabled')
            }
        }

    }
}

// 加入购物车
$(function () {
    // 渲染购物车页面
    renderCartItems()

    function renderCartItems() {
        // 获取购物车数据,判断本地存储中是否有cartItems，有则返回解析后的数组，否则返回一个空数组
        const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
  
        const cartContainer = $('#cartItems')
         // 清空购物车容器
        cartContainer.empty()

        if (cartItems.length > 0) {
            let index = 0
            // 遍历购物车项数组，创建购物车商品项的 HTML 结构
            cartItems.forEach(function (cartItem) {

            const html = `
            <div class="cart_main-tr" data-index=${index}>
                       <!-- 选择框 -->
                       <div class="t-checkbox">
                           <input type="checkbox" name="xuan">
                       </div>
                       <!-- 商品详情 -->
                       <div class="t-goods">
                           <div class="goods-img">
                               <img src="${cartItem.url}">
                           </div>

                           <div class="goods-item__right">
                               <div class="goods-item__title">
                                   <span>${cartItem.name}</span>
                               </div> 
                               <div class="goods-item__specs">
                                   <span class="goods-item__specs-bn">${cartItem.id}</span> 
                                   <span class="goods-item__specs-color">白色涂鸦满身印</span> 
                                   <span class="goods-item__specs-size">${cartItem.size}</span>
                               </div> 
                           </div>
                       </div>

                       <!-- 操作 -->
                       <div class="t-action">
                           <button class="sp-btn sp-btn__text"> 
                               <span class="sp-btn__txt">收藏 |</span>
                           </button> 
                           <button class="sp-btn sp-btn__text">
                               <span class="sp-btn__txt remove_btn">移除</span>
                           </button>
                       </div>

                       <!-- + -  -->
                       <div class="t-quantity">
                            <div class="sp-num-input">
                               <input autocomplete="off" class="sp-num-input__input" value="${cartItem.num}"> 
                               <span class="sp-num-input__btn sp-num-input__btn-up">+</span> 
                               <span class="sp-num-input__btn sp-num-input__btn-down is-disabled">-</span>
                           </div>
                       </div>

                       <!--价格 -->
                       <div class="t-price">
                           <span class="sp-price sp-price__default clearfix">
                               <span class="price__symbol">¥</span> 
                               <span class="price__int">${cartItem.price}</span> 
                               <span class="price__decimal">.00</span>
                           </span>
                       </div>


                       <!-- 优惠 -->
                       <div class="t-coupon">
                           <span class="sp-price sp-price__default clearfix">
                               <span class="price__symbol">¥</span> 
                               <span class="price__int">0</span> 
                               <span class="price__decimal">.00</span>
                           </span>
                       </div>

                       <!-- 总价 -->
                       <div class="t-total">
                           <span class="sp-price sp-price__default total_color">
                               <span class="price__symbol">¥</span> 
                               <span class="price__int">${cartItem.price * cartItem.num}</span> 
                               <span class="price__decimal">.00</span> 
                           </span>
                       </div>
             </div>
                    `
            // 将商品项添加到购物车容器中
            cartContainer.append(html)

            index++

            })

            // 点击移除按钮的事件处理程序
            $('.cart_main-tr').on('click', '.remove_btn', function () {
                const cartItem = $(this).closest('.cart_main-tr')
                const index = cartItem.data('index')

                // 从购物车项数组中移除对应的商品项
                cartItems.splice(index, 1)

                console.log(cartItems)
                // 从本地存储中移除对应的数据
                localStorage.setItem('cartItems', JSON.stringify(cartItems))

                // 判断是否登录
                const token = localStorage.getItem('token');
                if (token) {
                // 获取购物车数据
                const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
                // 把购物车中商品数渲染到头顶
                cartsGoodsNum.innerHTML = cartItems.length
                } 

                // 重新渲染购物车页面
                renderCartItems()
            })




        } else {
            // 如果购物车为空，显示相应的提示信息
            const emptyCartMessage = '<h1>抱歉！您的购物车内暂时没有任何商品，您可以继续购物，或者查看您的订单！</h1>';
            cartContainer.html(emptyCartMessage);
        }
    }
})