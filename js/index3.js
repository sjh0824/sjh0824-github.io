/**
 * Created by Administrator on 2016/4/28.
 */

$(function () {
    readHtml();
})
var mydata = '';
function getdata(callback) {

    if(mydata) {
        callback && callback(mydata);
        return false;
    }

    $.ajax({
        url: 'video.json',
        type: 'get',
        dataType:'json',
        success: function (info) {
            mydata = info;
            //console.log( info );
            callback && callback(mydata);
        }
    });
}

function readHtml() {
    getdata(function (data) {
        var tpl = _.template($('#tpl-images').html());
        var tplHtml = tpl({model:data});
        $('.list').html(tplHtml);
    })
}


