$("#share").on("click", function () {
    $(".gb_resLay").toggleClass("disn disb");
});
//        //ȫ�ֱ�������̬������ID
var ShareURL = "";
//        //�����з���ť����A��ǩ����������¼����Ӷ���ȡ��̬ID
$(function () {
    $(".bdsharebuttonbox img").mouseover(function () {
        ShareURL = $(this).attr("data-url");
    });
});
//
//        /*
//         * ��̬���ðٶȷ���URL�ĺ���,�������
//         * cmdΪ����Ŀ��id,��idָ���ǲ���з�����ť��ID
//         *�������Լ�������IDҪͨ��ȫ�ֱ�����ȡ
//         * configΪ��ǰ���ã�����ֵΪ���º�����á�
//         */
function SetShareUrl(cmd, config) {
    if (ShareURL) {
        config.bdUrl = ShareURL;
    }
    return config;
}
//
//        //��������ò��֣�ע��Ҫ�ǵ�����onBeforeClick�¼�����Ҫ���ڻ�ȡ��̬������ID
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
//        //�����JS���ز���
with (document) 0[(getElementsByTagName('head')[0] || body)
    .appendChild(createElement('script'))
    .src = 'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='
    + ~(-new Date() / 36e5)];
