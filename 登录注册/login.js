$(".sub").on( "click", function () {
    if( $(".name").val() == "" ) {
        alert("请输入账号！");
    }
    if( $(".pass").val() == "" ) {
        alert("请输入密码！");
    }
    if( $(".name").val() != 120675349 ) {
        alert("输入的账号不存在！");
    }
    if( $(".pass").val() != 123456 ) {
        alert("输入的密码不正确！");
    }
    if( ($(".name").val() == 120675349) && ($(".pass").val() == 123456)) {
        alert("登录成功！");
    }
});


