//自己封装的框架

(function (window, undefined) {


    var arr = [],
        push = arr.push;

//构造函数
    var sjh = function (selector) {
        return new sjh.fn.init(selector);
    };

//原型
    sjh.fn = sjh.prototype = {
        constructor: sjh,
        selector: null,
        length: 0,
        init: function (selector) {
            //参数
            //1.为null,"",undefined
            //2.为 string
            //3.为 dom对象
            //4.为 sjh对象
            //5.为 Dom数组
            //6.为 function

            //1.为null,"",undefined
            if (!selector) return this;
            //2.为 string
            else if (sjh.isString(selector)) {
                if (selector.charAt(0) === "<") {
                    sjh.push.apply(this, sjh.parseHTML(selector));
                } else {
                    sjh.push.apply(this, sjh.select(selector));
                    this.selector = selector;
                }
                return this;
            }
            //3.为 dom对象
            else if (sjh.isDom(selector)) {
                this[0] = selector;
                this.length = 1;
                return this;
            }
            //4.为 sjh对象
            else if (sjh.isSjh(selector)) {
                return selector;
            }
            //5.为 Dom数组
            else if (sjh.isLikeArray(selector)) {
                sjh.push.apply(this, selector);
                return this;
            }
            //6.为 function
            else if (sjh.isFunction(selector)) {
                var newDom = window.onload;
                if (typeof  newDom === "function") {
                    window.onload = function () {
                        newDom();
                        selector();
                    };
                } else {
                    window.onload = selector;
                }
            }
        },
        each: function (callback) {
            sjh.each(this, callback);
            return this;
        }
    };

//原型链
    sjh.fn.init.prototype = sjh.fn;

//扩展
    sjh.extend = sjh.fn.extend = function (obj) {
        var k;
        for (k in obj) {
            this[k] = obj[k];
        }
    };

//对标签字符串的操作
    var parseHTML = function (html) {
        var div = document.createElement("div"), i, arr = [];
        div.innerHTML = html;
        for (i = 0; i < div.childNodes.length; i++) {
            arr.push(div.childNodes[i]);
        }
        return arr;
    };

//对选择器的操作
//自己写的选择器框架
var select =

(function () {

//兼容IE push方法
var myPush = function (target, els) {
    var j = target.length;
    var i = 0;
    while (target[j++] = els[i++]) {
    }
    target.length = j - 1;
}
//对基本的方法封装
//封装获取标签名
function getTag(tag, context, results) {
    results = results || [];
    try {
        results.push.apply(results, context.getElementsByTagName(tag));
    } catch (e) {
        myPush(results, context.getElementsByTagName(tag));
    }
    return results;
}
//封装获取类名
function getClass(className, context, results) {
    results = results || [];
    if (document.getElementsByClassName) {
        results.push.apply(results, context.getElementsByClassName(className));
    } else {
        each(getTag('*', context), function (i, v) {
            if (( ' ' + v.className + ' ' )
                    .indexOf(' ' + className + ' ') != -1) {
                results.push(v);
            }
        });
    }
    return results;
}
//封装获取id名
function getId(id, results) {
    results = results || [];
    results.push(document.getElementById(id));
    return results;
}
//对循环的封装
function each(arr, fn) {
    for (var i = 0; i < arr.length; i++) {
        if (fn.call(arr[i], i, arr[i]) === false) {
            break;
        }
    }
}
//通用方法
function get(selector, context, results) {
    results = results || [];
    context = context || document;
    var rquickExpr = /^(?:#([\w-]+)|\.([\w-]+)|([\w-]+)|(\*))$/,
        m = rquickExpr.exec(selector);
    if (m) {
        if (context.nodeType) {
            context = [context];
        }
        if (typeof context == "string") {
            context = get(context);
        }
        each(context, function (i, v) {
            if (m[1]) {
                results = getId(m[1], results);
            } else if (m[2]) {
                results = getClass(m[2], v, results);
            } else {
                results = getTag(m[3] || "*", this, results);
            }
        });

    }
    return results;
}
//取出字符串两端的空格
var myTrim = function (str) {
    if (String.prototype.trim) {
        return str.trim();
    } else {
        return str.replace(/^\s+|\s+$/g, '');
    }
};

var select = function (selector, context, results) {
    results = results || [];
    // 首先处理逗号
    var newSelectors = selector.split(',');
    // 细节: 一般不考虑两端的空格
    each(newSelectors, function (i, v) {
        var list = v.split(" ");
        var c = context;
        for (var i = 0; i < list.length; i++) {
            if (list[i] === "") continue;
            //list[ i ] = myTrim( list[ i ] );
            c = get(list[i], c);
        }
        results.push.apply(results, c);
    });
    return results;
};
return select;
}());

//基本方法
    sjh.extend({
        select: select,
        parseHTML: parseHTML
    });

    sjh.extend({
        each: function (arr, fn) {
            var isArray = sjh.isLikeArray(arr), i;
            if (isArray) { //数组
                for (i = 0; i < arr.length; i++) {
                    if (fn.call(arr[i], i, arr[i]) === false) {
                        break;
                    }
                }
            } else { //对象
                for (i in arr) {
                    if (fn.call(arr[i], i, arr[i]) === false) {
                        break;
                    }
                }
            }
            return arr;
        },
        myTrim: function (str) {
            if (String.prototype.trim) {
                return str.trim();
            } else {
                return str.replace(/^\s+|\s+$/g, "");
            }
        },
        push: push,
        //获取第一个元素节点
        firstChild: function (dom) {
            var i, node, len = dom.childNodes.length;
            for (i = 0; i < len; i++) {
                node = dom.childNodes[i];
                if (node.nodeType === 1) {
                    return node;
                }
            }
        },
        //获取下一个兄弟元素节点
        nextSilbing: function (dom) {
            var node = dom;
            while (node = node.nextSilbing) {
                if (node.nodeType === 1) {
                    return node;
                }
            }
        },
        //获取下面所有的兄弟元素节点
        nextAll: function (dom) {
            var node = dom, arr = [];
            while (node = dom.nextSilbing) {
                if (node.nodeType === 1) {
                    arr.push(node);
                }
            }
            return arr;
        }
    });

//判断类型
    sjh.extend({
        isString: function (obj) {
            return typeof obj === "string";
        },
        isFunction: function (obj) {
            return typeof  obj === "function";
        },
        isLikeArray: function (obj) {
            return obj && obj.length && obj.length >= 0;
        },
        isSjh: function (obj) {
            return "selector" in obj;
        },
        isDom: function (obj) {
            return obj.nodeType;
        }
    });

//dom基本操作
    sjh.fn.extend({
        appendTo: function (selector) {
            //1.for循环
            //var objs = sjh( selector),
            //    i, j,
            //    len1 = objs.length,
            //    len2 = this.length,
            //    arr = [], node;
            //for( i = 0; i < len1; i++ ) {
            //    for( j = 0; j < len2; j++ ) {
            //        node = i === len1 - 1? this[ j ]: this[ j ].cloneNode( true );
            //        arr.push( node );
            //        objs[ i].appendChild( node );
            //    }
            //}
            //2.each
            var self = this;
            var objs = sjh(selector),
                arr = [], node;
            sjh.each(objs, function (i1, v1) {
                var that = this;
                sjh.each(self, function (i2, v2) {
                    node = i1 === objs.length - 1 ? this : this.cloneNode(true);
                    arr.push(node);
                    that.appendChild(node);
                });
            })
            return sjh(arr);
        },
        append: function (selector) {
            sjh(selector).appendTo(this);
        },
        prependTo: function (selector) {
            var self = this;
            var objs = sjh(selector),
                node;
            sjh.each(objs, function (i1, v1) {
                var that = this;
                sjh.each(self, function (i2, v2) {
                    node = i1 === objs.length - 1 ? this : this.cloneNode(true);
                    that.insertBefore(node, sjh.firstChild(that));
                });
            })
        },
        prepend: function (selector) {
            sjh(selector).prependTo(this);
        },
        remove: function () {
            var arr = [];
            this.each(function () {
                arr.push(this.parentNode.removeChild(this));
            });
            return sjh(arr);
        },
        next: function () {
            var arr = [];
            sjh.each(this, function (i, v) {
                var str = sjh.nextSilbing(v);
                if (str) {
                    arr.push(str);
                }
            });
            return sjh(arr);
        },
        nextAll: function () {
            var arr = [];
            sjh.each(this, function (i, v) {
                sjh.push.apply(arr, sjh.nextAll(v));
            });
            return sjh(arr);
        }
    });

//事件模块
//S("div").on( "click", function() {});
    sjh.fn.extend({
        on: function (type, callback) {
            this.each(function () {
                if (this.addEventListener) {
                    this.addEventListener(type, callback);
                } else {
                    this.attachEvent("on" + type, callback);
                }
            });
            return this;  //返回当前对象， 实现链式编程
        },
        off: function (type, callback) {
            this.each(function () {
                this.removeEventListener(type, callback);
            });
            return this;
        }
    });

//其他事件
    sjh.each(("click,mouseover," +
    "mouseout,mouseenter,mouseleave,mousedown," +
    "mouseup,keyup,keydown").split(","), function (i, v) {
        sjh.fn[v] = function (callback) {
            //this.on( v, callback );  //返回值为this
            //return this;
            return this.on(v, callback);
        };
    });

//hover和toggle
    sjh.fn.extend({
        hover: function (fn1, fn2) {
            this.mouseover(fn1).mouseout(fn2);
            return this;
        },
        toggle: function () {
            // 调用的时候, 绑定一个方法, 同时在执行的时候要
            // 移除第一个方法, 加载第二个方法 ...
            var args = arguments, i = 0;
            this.click(function (e) {
                args[i++ % args.length].call(this, e);
            });
        }
    });


//样式模块
    sjh.fn.extend({
        css: function (cssName, cssValue) {
            //有一个参数
            if (typeof cssName == "object") {
                return this.each(function () {
                    var k;
                    for (k in cssName) {
                        this.style[k] = cssName[k];
                    }
                });
            } else if (cssValue === undefined) {
                //直接写style只能修改行内样式， 不能修改其他的样式，
                // 只能用getComputedStyle
                //低版本的IE浏览器 用 currentStyle
                if (window.getComputedStyle) {
                    return window.getComputedStyle(this[0])[cssName];
                } else {
                    return document.body.currentStyle(this[0])[cssName];
                }
            } else {
                //两个参数
                this.each(function () {
                    this.style[cssName] = cssValue;
                });
            }
        },
        //判断第一个dom对象中的类名，是否有传入的这个类名
        hasClass: function (cName) {
            var has = false;
            sjh.each(this[0].split(" "), function (i, v) {
                if (v === cName) {
                    has = true;
                    return false;
                }
            });
        },
        //添加类名
        addClass: function (cName) {
            if (this.className) {
                this.className += " " + cName;
            } else {
                this.className = cName;
            }
        },
        //删除类名
        removeClass: function (cName) {
            return this.each(function () {
                /*
                 1.传统方法( 数组)
                 var arr = this.className.split( " "), i;
                 for( i = 0; i < arr.length; i++ ) {
                 if( arr[ i ] === cName ) {
                 break;
                 }
                 }
                 arr.splice( i, 1 );
                 this.className = arr.join( " " );
                 */
                //2.replace方法
                //var className = " " + this.className + " ";
                //this.className = sjh.myTrim( className.replace( " " + cName + " ", " " ) );
                this.className = sjh.myTrim(
                    ( " " + this.className + " " )
                        .replace(" " + cName + " ", " "));

            });
        },
        //判断传入的类名有没有， 没有则添加， 有则删除
        toggleClass: function (cName) {
            if (this.hasClass(cName)) {
                this.removeClass(cName);
            } else {
                this.addClass(cName);
            }
        }
    });

    //属性模块

    sjh.extend({
        getInnerText: function (dom) {
            if (dom.innerText !== undefined) {
                return dom.innerText;
            } else {
                //兼容火狐低版本
                // 1> 获得 innerHTML, 移除所有标签
//                var html = dom.innerHTML + "";
//                //把标签都去掉
//                html.replace(/<\/?[a-zA-Z][^>]*\/?>/g, "" );
//                //转换 &lt; 和 &gt;
//                html.replace(/&lt;/g, "<" ).replace(/&gt;/g, ">" );
//                //去掉<!--  -->
//                html = html.replace(/<\!--[^>]*-->/g, '');
//                return html;

                // 2> 递归获得所有文本节点
                var list = [];
                getTextNode(dom, list);
                return list.join('');

            }
            function getTextNode(dom, arr) {
                // 将 dom 里面的所有的文本节点放到 arr 中
                var i, l = dom.childNodes.length, node;
                for (i = 0; i < l; i++) {
                    node = dom.childNodes[i];
                    if (node.nodeType === 3) {
                        arr.push(node.nodeValue);
                    } else {
                        getTextNode(node, arr);
                    }
                }
            }
        }
    });
    sjh.fn.extend({
        //访问和设置属性
        attr: function (attrName, attrValue) {
            //一个参数 访问属性
            if (attrValue === undefined) {
                return this[0][attrName];
            } else {
                //两个参数  设置属性
                return this.each(function () {
                    this[attrName] = attrValue;
                });
            }
        },
        val: function (value) {
            if (value === undefined) {
                return this[0].value;
            } else {
                return this.each(function () {
                    this.value = value;
                });
            }
        },
        html: function (html) {
            if (html === undefined) {
                return this.innerHTML;
            } else {
                return this.each(function () {
                    this.innerHTML = html;
                });
            }
        },
        text: function (text) {
            // 与 html 类似, 如果带有参数, 给每一个 DOM 对象
            // 设置 innerText 属性. 如果没有参数, 则返回 第 0
            // 个对象的 innerText 值
            if (text === undefined) {
                return this.innerText;
            } else {
                return this.each(function () {
                    this.innerText = text;
                });
            }

        }
    });
    window.S = window.sjh = sjh;
})(window);
