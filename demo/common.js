$(function(){
    /*IP统计*/
    url="http://www.100sucai.com/phpajax/ajax_ip.php?abc=www.100sucai.com";
    $.ajax({url:url,async:false});

    /*浏览量统�?*/
    var aid=$("#aid").val()
    urls="http://www.100sucai.com/phpajax/ajax_view.php?abc=www.100sucai.com&id="+aid;
    $.ajax({url:urls,async:false});
})