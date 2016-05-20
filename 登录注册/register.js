// 提交的
$('.submit').on('click', function () {
    var _this = $(this);
    // 禁止重复提交
    if(_this.hasClass('disabled')) return;
    var formData = $('#ajaxForm').serialize();
    $.ajax({
        type: 'post',
        url: 'register.php',
        data: formData,
        beforeSend: function () {
            if($('.name').val() == '') {
                $('.tips p').stop(true, true).fadeIn(400)
                    .delay(1500).fadeOut(400).text('用户名不能为空');
                return false;
            }
            if($('.pass').val() == '') {
                $('.tips p').stop(true, true).fadeIn(400)
                    .delay(1500).fadeOut(400).text('密码不能为空');
                return false;
            }
            if($('.mobile').val() == '') {
                $('.tips p').stop(true, true).fadeIn(400)
                    .delay(1500).fadeOut(400).text('手机号不能为空');
                return false;
            }
            _this.addClass('disabled');
            _this.val('正在提交...');
        },
        complete: function () {
            // 恢复初始状态
            _this.removeClass('disabled');
            _this.val('立即注册');
        }
    });
});

// 获取验证码
$('.verify').on('click', function () {
    var _this = $(this);
    // 禁止重复提交
    if(_this.is('.disabled')) return;
    _this.addClass('disabled');
    var mobile = $('.mobile').val();
    $.ajax({
        type: 'post',
        url: 'getCode.php',
        data: {mobile: mobile},
        timeout: 2000,
        beforeSend: function () {
            //验证用户名
            var user = /[a-zA-z0-9]{6,12}/;
            if( !user.test( $('.name').val() ) ) {
                $('.tips p').stop(true, true).fadeIn(400)
                    .delay(1500).fadeOut(400).text('用户名必须在6-12个字符之间');
                return false;
            }
            //验证密码
            var password = /.{8,}/;
            if( !password.test( $('.pass').val() ) ) {
                $('.tips p').stop(true, true).fadeIn(400)
                    .delay(1500).fadeOut(400).text('密码必须大于8个字符');
                return false;
            }
            //验证两次输入的密码是否一致
            if( $(".pass").val() != $(".repass").val() ) {
                $('.tips p').stop(true, true).fadeIn(400)
                    .delay(1500).fadeOut(400).text('两次密码不一致');
                return false;
            }
            // 验证手机号
            var regMoble = /1\d{10}/;
            if( !regMoble.test( $('.mobile').val() ) ) {

                $('.tips p').stop(true, true).fadeIn(400)
                    .delay(1500).fadeOut(400).text('手机格式应该是11位');
                return false;
            }
            var seconds = 10;
            var t = setInterval(function () {
                _this.val(--seconds + '秒后重新获取');
                if(seconds <= 0) {
                    // 清除定时器
                    clearInterval(t);
                    _this.val('获取验证码').removeClass('disabled');
                }
            }, 1000);
        },
        complete: function () {
            console.log('complete');
        }

    });
});
// 全局设置
$.ajaxSetup({
    // 设置超时
    timeout: 3000
});
