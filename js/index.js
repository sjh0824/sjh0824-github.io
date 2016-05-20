/**
 * Created by Administrator on 2016/3/24.
 */
$(function () {
    var video = $("video")[0],
        $stop = $("#stop"),
        $play = $("#play"),
        $volume = $("#volume"),
        $volumeInner = $(".volumeInner"),
        $maximize = $("#maximize"),
        $upload = $("#upload"),
        $volumeBar = $(".volumeBar"),
        $progress = $(".progress"),
        $line = $(".line"),
        $file = $('#file'),
        $list = $(".list"),
        $lists = $("#lists");
    var $video = $("video");

    // 当视频可以播放时
    video.oncanplay = function () {
        h = Math.floor(video.duration / 3600)
        m = Math.floor(video.duration / 60);
        s = Math.floor(video.duration % 60);
        // 小于10时拼接字符串0
        h = h < 10 ? '0' + h : h;
        m = m < 10 ? '0' + m : m;
        s = s < 10 ? '0' + s : s;
        // 总共多少时间
        $('.total').text(h + ':' + m + ':' + s);
    }

    // 播放/暂停
    $play.on('click', function () {
        // 切换状态
        if (video.paused) {
            video.play();
            $(this).removeClass('icon-play').addClass('icon-pause');
        } else {
            video.pause();
            $(this).removeClass('icon-pause').addClass('icon-play');
        }
    });

    //停止并返回开始位置
    $stop.on('click', function () {
        video.pause();
        $play.removeClass('icon-pause').addClass('icon-play');
        video.currentTime = 0;
        $line.css('width', 0 + 'px');

    });

    //点击小喇叭 设置是否静音
    $volume.on('click', function () {
        if (video.muted) {
            video.muted = false;
            if (window.vol > 0.5) {
                $volume.removeClass("icon-volume-off").removeClass("icon-volume-down").addClass("icon-volume-up");
            } else {
                $volume.removeClass("icon-volume-off").removeClass("icon-volume-up").addClass("icon-volume-down");
            }
            $volumeInner.css('width', window.vol * 100 + '%');
        } else {
            video.muted = true;
            $(this).removeClass('icon-volume-up').removeClass("icon-volume-down").addClass('icon-volume-off');
            $volumeInner.css('width', 0);
        }
    });


    // 播放进度
    video.ontimeupdate = (function () {
        if (video.currentTime) {
            var value = video.currentTime / video.duration * 100;
        }
        $line.css('width', value + '%');
        h = Math.floor(video.currentTime / 3600)
        m = Math.floor(video.currentTime / 60);
        s = Math.floor(video.currentTime % 60);
        // 小于10时拼接字符串0
        h = h < 10 ? '0' + h : h;
        m = m < 10 ? '0' + m : m;
        s = s < 10 ? '0' + s : s;
        // 时间进度
        $(".current").text(h + ':' + m + ':' + s);

        if (video.ended) { //播放完毕
            $play.removeClass('icon-pause').addClass('icon-play');
        }
    });

    //快进
    var $speed = $("#speed");
    $speed.on("click", function () {
        video.currentTime = video.currentTime + 5;
        console.log( video.currentTime );
        var value = video.currentTime / video.duration * 100;
        $line.css("width", value + "%");
    });

    //快退
    var $fate = $("#fate");
    $fate.on("click", function () {
        video.currentTime = video.currentTime - 5;
        var value = video.currentTime / video.duration * 100;
        $line.css("width", value + "%");
    });


    //全屏
    $maximize.on('click', function () {
        console.log( document.webkitIsFullScreen );
        if (!document.webkitIsFullScreen) {
            video.webkitRequestFullScreen(); //全屏
            $(this).removeClass('icon-expand').addClass('icon-expand');
        } else {
            document.webkitExitFullScreen();
            $(this).removeClass('icon-contract').addClass('icon-expand');
        }
    });


    //从本地取视频
    var $headTitle = $(".header-title")[0];
    $listname = $(".listname");
    var $span1 = $(".span1");
    (function () {
        //循环a标签组成的数组
        for (var i = 0; i < $listname.length; i++) {
            //给每一个a标签绑定事件
            $listname[i].ondblclick = function () {
                //把a标签的rel属性的值，给当前的video的src
                video.src = this.rel;
                //改变当前播放的视频名字
                $headTitle.innerHTML = this.title;
                currentPlay($listname);
                $play.removeClass('icon-pause').addClass('icon-play');
            }
        }
        //循环span标签组成的数组
        for (var i = 0; i < $span1.length; i++) {
            //绑定事件
            $span1[i].onclick = function () {
                //移除当前span标签的父元素
                $list[0].removeChild(this.parentNode);
                //把video的src值变为空
                video.src = "";
            }
        }
        //上一个视频文件
        var $prev = $("#prev");
        $prev.on("click", function () {
            for (var i = 0; i < $listname.length; i++) {
                var str1 = $listname[i].baseURI.slice(0, -11);
                var str2 = $listname[i].baseURI.slice(0, -10);
                str1 = str1.concat($listname[i].rel);
                str2 = str2.concat($listname[i].rel);
                if (video.src == $listname[i].rel || video.src == str1 || video.src == str2) {
                    var Dom = $listname[i].parentNode.previousElementSibling;
                    Dom = Dom.firstElementChild;
                    video.src = Dom.rel;
                    $headTitle.innerHTML = Dom.title;
                    i = $listname.length;
                }
                currentPlay($listname);
            }
            $play.removeClass('icon-pause').addClass('icon-play');
        });

        //下一个视频
        var $next = $("#next");
        $next.on("click", function () {
            for (var i = 0; i < $listname.length; i++) {
                var str1 = $listname[i].baseURI.slice(0, -11);
                var str2 = $listname[i].baseURI.slice(0, -10);
                str1 = str1.concat($listname[i].rel);
                str2 = str2.concat($listname[i].rel);
                if (video.src == $listname[i].rel || video.src == str1 || video.src == str2) {
                    var Dom = $listname[i].parentNode.nextElementSibling;
                    Dom = Dom.firstElementChild;
                    video.src = Dom.rel;
                    $headTitle.innerHTML = Dom.title;
                    i = $listname.length;
                }
                currentPlay($listname);
            }
            $play.removeClass('icon-pause').addClass('icon-play');
        });

    })();

    function currentPlay( $listname ) {
        for (var i = 0; i < $listname.length; i++) {
            $($listname[i].parentNode).removeClass("skyblue");
            var str1 = $listname[i].baseURI.slice(0, -11);
            var str2 = $listname[i].baseURI.slice(0, -10);
            str1 = str1.concat($listname[i].rel);
            str2 = str2.concat($listname[i].rel);
            if (video.src == $listname[i].rel || video.src == str1 || video.src == str2) {
                $($listname[i].parentNode).addClass("skyblue");
            }
        }
    }

//导入文件
    $upload.on("click", function () {
        $file.trigger('click');
    });
    $file.on("change", function (e) {
        //创建相应的标签
        var div = document.createElement("div");
        var span = document.createElement("span");
        var a = document.createElement("a");
        //给标签添加类名
        span.className = 'span1 icon icon-trash';
        a.className = "listname";
        div.className = "listy";
        var source = document.createElement("source");
        var file = e.target.files[0],
            canPlayType = video.canPlayType(file.type);
        if (canPlayType === 'maybe' || canPlayType === 'probably') {
            src = window.URL.createObjectURL(file);
            //给相应的属性添加内容
            a.rel = src;
            a.innerHTML = file.name;
            a.title = file.name;
            //把其添加到相应的标签中
            div.appendChild(a);
            div.appendChild(span);
            $list.append(div);
            //设置当前的video的src和添加一个sourc标签
            source.src = src;
            video.src = src;
            video.appendChild(source);
            //添加当前视频的名字
            $headTitle.innerHTML = file.name;
            //获取播放列表中的a标签和sapn标签
            $listname = $(".listname");
            $span1 = $(".span1");
            //循环a标签组成的数组
            for (var i = 0; i < $listname.length; i++) {
                //给每一个a标签绑定事件
                $listname[i].ondblclick = function () {
                    //把a标签的rel属性的值，给当前的video的src
                    video.src = this.rel;
                    //改变当前播放的视频名字
                    $headTitle.innerHTML = this.title;
                    currentPlay($listname);
                    $play.removeClass('icon-pause').addClass('icon-play');
                }
            }
            //循环span标签组成的数组
            for (var i = 0; i < $span1.length; i++) {
                //绑定事件
                $span1[i].onclick = function () {
                    //移除当前span标签的父元素
                    $list[0].removeChild(this.parentNode);
                    //把video的src值变为空
                    video.src = "";
                }
            }
            currentPlay($listname);
            //新打开的视频处于paused状态
            $play.removeClass('icon-pause').addClass('icon-play');
            video.onload = function () {
                window.URL.revokeObjectURL(src);
            };
        } else {
            alert("浏览器不支持您选择的文件格式");
        }
    });






    //点击音量条 设置音量
    $volumeBar.on('click', function (e) {
        var x = e.offsetX,
            w = $(this).width();
        window.vol = (x / w).toFixed(1); //全局变量
        var volumes = x / w * 100;
        if (volumes <= 0) {
            $volume.removeClass("icon-volume-down").removeClass("icon-volume-up").addClass("icon-volume-off");
        } else if (volumes > 50) {
            $volume.removeClass("icon-volume-off").removeClass("icon-volume-down").addClass("icon-volume-up");
        } else {
            $volume.removeClass("icon-volume-off").removeClass("icon-volume-up").addClass("icon-volume-down");
        }
        video.volume = window.vol;
        $volumeInner.css('width', x + 'px');
    });

    //跳跃播放
    $progress.on('click', function (e) {
        var w = $(this).width(),
            x = e.offsetX;
        var duration = video.duration;
        video.currentTime = (duration * (x/w));

        $line.css('width', x + 'px');
    });

    //播放列表
    var has = true;
    $listna = $(".list-1")
    $lists.on("click", function () {

        if (has) {
            has = false;
            $video.css("padding-right", "128px");
            $listna.css("display", "block");

        } else {
            has = true;
            $video.css("padding-right", "0");
            $listna.css("display", "none");

        }
    });

    $button = $("#button");
    $button.on( "click", function () {
        if (has) {
            has = false;
            $video.css("padding-right", "128px");
            $listna.css("display", "block");

        } else {
            has = true;
            $video.css("padding-right", "0");
            $listna.css("display", "none");
        }
    });

    //菜单按钮
    $menu = $("#menu");
    $menus = $("#menus");
    $game = $("#game");
    $bgc = $("#bgc");
    $bgi = $("#bgi");
    $url = $("#url");
    $msection = $(".menu > section");
    $section = $("#section");
    $urls = $(".url");
    $menu.on("click", function () {
        $menus.toggleClass("disd disn");
        if($msection.hasClass("disd")) {
            $msection.toggleClass("disd disn");
        }
        if( $section.hasClass("disd")) {
            $section.toggleClass("disd disn");
        }
        if( $borwer.hasClass("disd")) {
            $borwer.toggleClass("disd disn");
        }
    });

    //游戏
    $game.on("click", function () {
        $msection.toggleClass("disd disn");
        if( $section.hasClass("disd")) {
            $section.toggleClass("disd disn");
        }
        if( $borwer.hasClass("disd")) {
            $borwer.toggleClass("disd disn");
        }
    });

    //变视频的背景色
    $bgc.on("click", function () {
        $section.toggleClass("disd disn");
        if($msection.hasClass("disd")) {
            $msection.toggleClass("disd disn");
        }
        if( $borwer.hasClass("disd")) {
            $borwer.toggleClass("disd disn");
        }
    });

    $spans = $("#section > span ");
    $spans.on("click", function () {
        var color = $(this).css("background-color");
        $(".large").css("background-color", color);
    });

    //变浏览器的背景图
    $borwer = $("#borwer");
    $bgi.on("click", function () {
        $borwer.toggleClass("disd disn");
        if($msection.hasClass("disd")) {
            $msection.toggleClass("disd disn");
        }
        if( $section.hasClass("disd")) {
            $section.toggleClass("disd disn");
        }
    });

    $img = $("#borwer > img");
    //console.log( $img);
    $img.on("click", function () {
        var src = $(this)[0].src;
        var srcd = $("body").css("background-image").slice(4, -1);
        console.log(src);
        console.log(srcd);
        if (src == srcd) {
            $("body").css("background-image", "");
        } else {
            $("body").css("background-image", "url(" + src + ")");
        }
    });

    //url链接
    $url.on("click", function () {
        $urls.css("display", "block");
    });

    $(".right").on("click", function () {
        $urls.css("display", "none");
    });
    $("#btn2").on("click", function () {
        $urls.css("display", "none");
    });
    $("#btn1").on("click", function () {
        video.src = $("#inp").val();
        $play.removeClass('icon-pause').addClass('icon-play');
    });


    //3d效果
    $(document).ready(function(){
        $(".videos").hover3d({
            selector: ".video",
            shine: false,
        });
    });

    //弹幕功能
    $("#click_screen").on( "click", function(){
//            alert(1);
        $(".screen").toggle(600);
        $("#click_screen").toggleClass("icon-eye-open icon-eye-close");

    });
    $(".s_close").click(function(){
        $(".screen").toggle(600);

    });

    //发表评论
    $(".s_btn").click(function(){
        var text=$(".s_txt").val();
        $(".s_txt").val("");
        $(".s_show").append("<div>"+text+"</div>");
        init_screen();

    });

    $(".s_txt").keydown(function(){
        var code = window.event.keyCode;

        //alert(code);

        if(code == 13)//回车键按下时，输出到弹幕
        {
            var text=$(".s_txt").val();
            $(".s_txt").val("");
            $(".s_show").append("<div>"+text+"</div>");
            init_screen();
        }
    });

//    });

    //初始化弹幕
    function init_screen(){
        var _top=0;

        $(".s_show").find("div").show().each(function(){
            var _left=$("#player").width();
            var _height=$("#player").height();

            _top=_top+80;

            if(_top>_height-100){
                _top=80;
            }

            var time=10000;
            if($(this).index()%2==0){
                time=20000;
            }
            //设定文字的初始化位置
            var _this = $(this);
            $(this).css({left:_left,top:_top,color:getRandomColor()});
            $(this).animate({left:"-"+_left+"px"},time,function(){
                if( _left > 200 ) {
                    _this.css("display", "none" );
                }
            });


        });
    }

    //随机获取颜色值
    function getRandomColor(){
        return '#'+(function(h){
                return new Array(7-h.length).join("0")+h
            })((Math.random()*0x1000000<<0).toString(16))
    }

});