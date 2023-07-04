"use strict";

var submitBtn = document.querySelector('.submit');
var agreeinp = document.getElementsByName('agree'); //  jQuery选择器， 并应用了jQuery中validate插件的validate()方法，用于对表单进行验证。

$('.register-form').validate({
  // 匹配规则
  rules: {
    username: {
      // 必填
      required: true,
      // 最小长度
      minlength: 2,
      // 最大长度
      maxlength: 10
    },
    password: {
      required: true,
      minlength: 6,
      maxlength: 12
    },
    // 确认密码
    repass: {
      required: true,
      equalTo: "#password" // 确保当前字段的值与的password的值相等。

    },
    tel: {
      required: true,
      number: true,
      maxlength: 11,
      minlength: 11
    },
    email: {
      required: true,
      email: true
    }
  },
  // 提示信息
  messages: {
    username: {
      required: '用户名不能为空',
      minlength: '请输入2-10位的用户名',
      maxlength: '请输入2-10位的用户名'
    },
    password: {
      required: '密码不能为空',
      minlength: '请输入6-12位的密码',
      maxlength: '请输入6-12位的密码'
    },
    repass: {
      required: '确认密码不能为空',
      equalTo: "两次密码输入不一致"
    },
    tel: {
      required: '手机号不能为空',
      number: '手机号错误',
      maxlength: '请输入11位的手机号',
      minlength: '请输入11位的手机号'
    },
    email: {
      required: '邮箱不能为空',
      email: "邮箱格式错误"
    }
  },
  // submitHandler是jQuery Validate插件中的一个回调函数，用于处理在验证成功后表单提交的逻辑。
  submitHandler: function submitHandler() {
    // jQuery 方法，这个方法会收集表单中所有带有 name 属性的输入字段的值，并将它们编码为适合用于 URL 查询字符串的格式。
    // 获取到注册表单中的数据
    var formData = $('.register-form').serialize(); // 加载层

    var loadid = layer.load(1, {
      shade: [0.5, '#000']
    }); // 获取到数据，通过ajax发送请求
    // 这里是sendAjax是封装好的方法，也可以用jQuery中的$.ajax()

    sendAjax({
      method: 'post',
      url: '/users/api/login',
      data: formData,
      success: function success(res) {
        var errorCode = res.errorCode,
            message = res.message; // 取消加载层

        layer.close(loadid);

        if (errorCode === 0) {
          layer.msg(message, {
            icon: 1,
            time: 2000
          }, function () {
            location.href = 'register.html';
          });
        } else {
          layer.msg(message, {
            icon: 2,
            time: 2000
          });
        }
      }
    });
  }
});

agreeinp[0].onclick = function () {
  if (agreeinp[0].checked) {
    submitBtn.classList.remove('is-disabled');
  } else {
    submitBtn.classList.add('is-disabled');
  }
};