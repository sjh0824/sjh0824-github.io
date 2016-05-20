$("#share").on("click", function () {
    $(".gb_resLay").toggleClass("disn disb");
});
//        //全局变量，动态的文章ID
var ShareURL = "";
//        //绑定所有分享按钮所在A标签的鼠标移入事件，从而获取动态ID
$(function () {
    $(".bdsharebuttonbox img").mouseover(function () {
        ShareURL = $(this).attr("data-url");
    });
});
//
//        /*
//         * 动态设置百度分享URL的函数,具体参数
//         * cmd为分享目标id,此id指的是插件中分析按钮的ID
//         *，我们自己的文章ID要通过全局变量获取
//         * config为当前设置，返回值为更新后的设置。
//         */
function SetShareUrl(cmd, config) {
    if (ShareURL) {
        config.bdUrl = ShareURL;
    }
    return config;
}
//
//        //插件的配置部分，注意要记得设置onBeforeClick事件，主要用于获取动态的文章ID
window._bd_share_config = {
    "common": {
        onBeforeClick: SetShareUrl,
        "bdSnsKey": {},
        "bdText": ""
        ,
        "bdMini": "2",
        "bdMiniList": false,
        "bdPic": "http://www.internetke.com/uploads/allimg/131026/1-1310261J0270-L.jpg",
        "bdStyle": "0",
        "bdSize": "24"
    }, "share": {}
};
//        //插件的JS加载部分
with (document) 0[(getElementsByTagName('head')[0] || body)
    .appendChild(createElement('script'))
    .src = 'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='
    + ~(-new Date() / 36e5)];
