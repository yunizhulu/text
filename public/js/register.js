// 获取标签
var username = document.querySelector('[name="username"]')
var password = document.querySelector('[name="password"]')
var btn = document.querySelector('[type="button"]')
var btn1 = document.querySelector('.zc')
var usernameLogin = document.getElementById('usernameLogin')
var telLogin = document.getElementById('telLogin')
var infobox1 = document.querySelector('.infobox1')
var infobox2 = document.querySelector('.infobox2')

// 登录按钮绑定点击事件
btn.onclick = function() {
    // layer插件弹出层
    let loadid = layer.load(1, {
        // 第一个参数代表透明度，第二个为颜色
        shade: [0.5, '#000']
    })
    // ajax发送post请求，将数据传递给服务器
    var xhr = new XMLHttpRequest;
    xhr.open('post','/users/api/register');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    // 获取数据
    var data = `username=${username.value}&password=${password.value}`
    // 发送获取到的数据data
    xhr.send(data)
    // 状态处理函数
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if(xhr.status>=200 && xhr.status<300){
                // 获取响应的数据
                var res = xhr.responseText
                // JSON字符串转成对象
                res = JSON.parse(res)
                console.log(res)
                // 解构赋值
                var {errCode, message,token} = res
                // 取消弹出层
                layer.close(loadid)
                // errCode===0 代表登录成功
                if(errCode === 0) {
                    // 设置token,存储在localStorage中
                    localStorage.setItem('token', token)

                    // 设置cookie username
                    setCookie('username', username.value, 7200)

                    // layer插件 登录的成功弹出层
                    layer.msg(message, {
                        icon: 1,
                        time: 2000
                    // 2秒之后执行回调函数，跳转到首页
                    }, function() {
                        location.href = '/'
                    })
                    // 登录失败提示框
                }else {
                    layer.msg(message, {
                        icon: 2,
                        time: 2000
                    })
                }
            }
        }
    }
}

// 注册按钮绑定点击跳转页面
btn1.onclick = function(){
    location.href = '/html/login.html'
}

usernameLogin.onclick = function(){
    infobox1.style.display = 'block'
    infobox2.style.display = 'none'
    telLogin.className = 'noAlive'
    usernameLogin.className = 'isAlive'
}

telLogin.onclick = function(){
    infobox1.style.display = 'none'
    infobox2.style.display = 'block'
    usernameLogin.className = 'noAlive'
    telLogin.className = 'isAlive'
}




  
