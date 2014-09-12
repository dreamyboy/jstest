/**
 * @author: zyh
 * @see: <a href="mailto:jikeytang@gmail.com">zyh</a>
 * @time: 2013-9-25 下午4:25
 * @info:
 */

String.prototype.hasString = function (a) {
    if (typeof a == "object") {
        for (var b = 0, c = a.length; b < c; b++)if (!this.hasString(a[b]))return false;
        return true
    } else if (this.indexOf(a) != -1)return true
};
String.prototype.breakWord = function (a, b) {
    b || (b = "<wbr/>");
    return this.replace(RegExp("(\\w{" + (a ? a : 0) + "})(\\w)", "g"), function (c, d, e) {
        return d + b + e
    })
};
var _MUI;
(function () {
    _MUI = {
        isObject: function (a) {
            return typeof a == "object"
        },
        isElement: function (a) {
            return a && a.nodeType == 1
        },
        isUndefined: function (a) {
            return typeof a == "undefined"
        },
        isFunction: function (a) {
            return this.getType(a) == "Function"
        },
        isNumber: function (a) {
            return this.getType(a) == "Number"
        },
        isString: function (a) {
            return this.getType(a) == "String"
        },
        isArray: function (a) {
            return this.getType(a) == "Array"
        },
        getType: function (a) {
            return Object.prototype.toString.call(a).slice(8, -1)
        },
        cookie: function (a, b, c) {
            if (b == undefined) {
                a = a + "=";
                b = document.cookie.split(";");
                for (c = 0; c < b.length; c++) {
                    for (var d = b[c]; d.charAt(0) == " ";)d = d.substring(1, d.length);
                    if (d.indexOf(a) == 0)return decodeURIComponent(d.substring(a.length, d.length))
                }
                return null
            } else {
                d = "";
                if (c) {
                    d = new Date;
                    d.setTime(d.getTime() + c * 24 * 60 * 60 * 1E3);
                    d = "; expires=" + d.toGMTString()
                }
                document.cookie = a + "=" + b + d + "; path=/"
            }
        },
        hide: function (a) {
            if (_MUI.isString(a))a = this.G(a);
            if (a) {
                var b = this.C(a, "display");
                if (b != "none")a.__curDisplay = b;
                a.style.display = "none"
            }
        },
        show: function (a) {
            if (_MUI.isString(a))a = this.G(a);
            if (a)a.style.display = a.__curDisplay || ""
        },
        toggle: function (a) {
            if (_MUI.isString(a))a = this.G(a);
            this.C(a, "display") == "none" ? this.show(a) : this.hide(a)
        },
        hasClass: function (a, b) {
            if (!a.className)return false;
            return a.className != a.className.replace(new RegExp("\\b" + b + "\\b"), "")
        },
        addClass: function (a, b) {
            if (a.className)if (this.hasClass(a, b))return false; else a.className += " " + b; else a.className = b
        },
        removeClass: function (a, b) {
            if (a)a.className = a.className.replace(new RegExp("\\b" + b + "\\b"), "")
        },
        toggleClass: function (a, b) {
            this.hasClass(a, b) ? this.removeClass(a, b) : this.addClass(a, b)
        },
        width: function (a) {
            return parseInt(a.offsetWidth)
        },
        height: function (a) {
            return parseInt(a.offsetHeight)
        },
        next: function (a) {
            a = a.nextSibling;
            if (a == null)return false;
            return _MUI.isElement(a) ? a : this.next(a)
        },
        prev: function (a) {
            a = a.previousSibling;
            if (a == null)return false;
            return _MUI.isElement(a) ? a : this.prev(a)
        },
        remove: function (a) {
            a && a.parentNode && a.parentNode.removeChild(a)
        },
        append: function (a, b) {
            b.appendChild(a)
        },
        prepend: function (a, b) {
            var c = b.firstChild;
            c ? _MUI.before(a, c) : _MUI.append(a, b)
        },
        after: function (a, b) {
            var c = b.parentNode;
            c.lastChild == a ? c.appendChild(a) : c.insertBefore(a, b.nextSibling)
        },
        before: function (a, b) {
            b.parentNode.insertBefore(a, b)
        },
        replace: function (a, b) {
            b.parentNode.replaceChild(a, b)
        },
        tmpl: function () {
            var a = {};
            return function b(c, d) {
                c = !/\W/.test(c) ? (a[c] = a[c] || b(_MUI.G(c).innerHTML)) : _MUI.tmplString(c);
                return d ? c(d) : c
            }
        }(),
        tmplString: function (a) {
            return new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('" + a.replace(/[\r\t\n]/g, " ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');")
        },
        html: function (a) {
            var b = _MUI.DC("div"), c = [];
            b.innerHTML = a;
            _MUI.each(b.childNodes, function (d) {
                c.push(d)
            });
            return c
        },
        css: function (a) {
            var b = _MUI.DC("style");
            _MUI.A(b, "type", "text/css");
            if (b.styleSheet)b.styleSheet.cssText = a; else {
                a = document.createTextNode(a);
                _MUI.append(a, b)
            }
            _MUI.append(b, _MUI.GT(document, "head")[0])
        },
        text: function a(b) {
            var c = [];
            b = b.childNodes;
            for (var d = 0, e = b.length; d < e; d++)c.push(b[d].nodeType != 1 ? b[d].nodeValue : a(b[d]));
            return c.join("")
        },
        parent: function (a, b) {
            if (_MUI.isArray(a)) {
                var c = [];
                _MUI.each(a, function (d) {
                    if (b && _MUI.hasClass(d.parentNode, b) || !b)c.push(d.parentNode)
                });
                return c
            }
            return a.parentNode
        },
        parents: function (a, b) {
            if (b) {
                var c = [];
                a = _MUI.parents(a);
                _MUI.each(a, function (d) {
                    _MUI.hasClass(d, b) && c.push(d)
                });
                return c
            }
            a = a.parentNode;
            return a.nodeName == "HTML" ? [a] : [a].concat(_MUI.parents(a))
        },
        children: function (a, b) {
            var c = [];
            if (b)b = b.split("|");
            _MUI.each(a.childNodes, function (d) {
                var e = false;
                if (b)for (var f = 0, g = b.length; f < g; f++)if (_MUI.hasClass(d, b[f])) {
                    e = true;
                    break
                }
                if (_MUI.isElement(d) && (!b || e))c.push(d)
            });
            return c
        },
        A: function (a, b, c) {
            if (c == undefined)return a.getAttribute(b); else c == "" ? a.removeAttribute(b) : a.setAttribute(b, c)
        },
        C: function (a, b, c) {
            if (c == undefined)if (window.getComputedStyle) {
                b = b.replace(/([A-Z])/g, "-$1");
                b = b.toLowerCase();
                return window.getComputedStyle(a, null).getPropertyValue(b)
            } else {
                if (a.currentStyle) {
                    if (b == "opacity")return a.style.filter.indexOf("opacity=") >= 0 ? parseFloat(a.style.filter.match(/opacity=([^)]*)/)[1]) / 100 : "1";
                    return a.currentStyle[b]
                }
            } else if (b == "opacity" && _MUI.B.ie)a.style.filter = (a.filter || "").replace(/alpha\([^)]*\)/, "") + "alpha(opacity=" + c * 100 + ")"; else a.style[b] = c
        },
        DC: function (a) {
            return document.createElement(a)
        },
        E: function (a) {
            if (a && a.clone)return a;
            a = window.event || a;
            return{clone: true, stop: function () {
                if (a && a.stopPropagation)a.stopPropagation(); else a.cancelBubble = true
            }, prevent: function () {
                if (a && a.preventDefault)a.preventDefault(); else a.returnValue = false
            }, target: a.target || a.srcElement, x: a.clientX || a.pageX, y: a.clientY || a.pageY, button: a.button, key: a.keyCode, shift: a.shiftKey, alt: a.altKey, ctrl: a.ctrlKey, type: a.type, wheel: a.wheelDelta / 120 || -a.detail / 3}
        },
        EA: function (a, b, c, d) {
            if (_MUI.isString(a)) {
                var e = c;
                c = function () {
                    eval(e)
                }
            }
            if (a.addEventListener) {
                if (b == "mousewheel")b = "DOMMouseScroll";
                a.addEventListener(b, c, d);
                return true
            } else return a.attachEvent ? a.attachEvent("on" + b, c) : false
        },
        ER: function (a, b, c) {
            if (a.removeEventListener) {
                a.removeEventListener(b, c, false);
                return true
            } else return a.detachEvent ? a.detachEvent("on" + b, c) : false
        },
        G: function (a) {
            return document.getElementById(a)
        },
        GT: function (a, b) {
            return a.getElementsByTagName(b)
        },
        GC: function () {
            function a(i, j) {
                if (!j) {
                    j = i;
                    i = document
                }
                i = i || document;
                if (!/^[\w\-_#]+$/.test(j) && i.querySelectorAll)return b(i.querySelectorAll(j));
                if (j.indexOf(",") > -1) {
                    j = j.split(/,/g);
                    for (var k = [], h = 0, n = j.length; h < n; ++h)k = k.concat(a(i, j[h]));
                    return p(k)
                }
                j = j.match(e);
                var l = j.pop();
                k = (l.match(g) || o)[1];
                h = !k && (l.match(f) || o)[1];
                n = l.split(".").slice(2);
                l = !k && (l.match(m) || o)[1];
                if (h && !l && i.getElementsByClassName)l = b(i.getElementsByClassName(h)); else {
                    l = !k && b(i.getElementsByTagName(l || "*"));
                    if (h)l = d(l, "className", RegExp("(^|\\s)" + h + "(\\s|$)"), n);
                    if (k)return(i = i.getElementById(k)) ? [i] : []
                }
                return j[0] && l[0] ? c(j, l) : l
            }

            function b(i) {
                try {
                    return Array.prototype.slice.call(i)
                } catch (j) {
                    for (var k = [], h = 0, n = i.length; h < n; ++h)k[h] = i[h];
                    return k
                }
            }

            function c(i, j, k) {
                var h = i.pop();
                if (h === ">")return c(i, j, true);
                var n = [], l = -1, q = (h.match(g) || o)[1], r = !q && (h.match(f) || o)[1];
                h = !q && (h.match(m) || o)[1];
                var v = -1, u, s, t;
                for (h = h && h.toLowerCase(); u = j[++v];) {
                    s = u.parentNode;
                    do {
                        t = (t = (t = !h || h === "*" || h === s.nodeName.toLowerCase()) && (!q || s.id === q)) && (!r || RegExp("(^|\\s)" + r + "(\\s|$)").test(s.className));
                        if (k || t)break
                    } while (s = s.parentNode);
                    if (t)n[++l] = u
                }
                return i[0] && n[0] ? c(i, n) : n
            }

            function d(i, j, k, h) {
                var n = -1, l, q = -1, r = [];
                for (h = h || ""; l = i[++n];)if (k.test(l[j]) && l[j].hasString(h))r[++q] = l;
                return r
            }

            var e = /(?:[\w\-\\.#]+)+(?:\[\w+?=([\'"])?(?:\\\1|.)+?\1\])?|\*|>/ig, f = /^(?:[\w\-_]+)?\.([\w\-_]+)/, g = /^(?:[\w\-_]+)?#([\w\-_]+)/, m = /^([\w\*\-_]+)/, o = [null, null], p = function () {
                var i = +new Date, j = function () {
                    var k = 1;
                    return function (h) {
                        var n = h[i], l = k++;
                        if (!n) {
                            h[i] = l;
                            return true
                        }
                        return false
                    }
                }();
                return function (k) {
                    for (var h = k.length, n = [], l = -1, q = 0, r; q < h; ++q) {
                        r = k[q];
                        if (j(r))n[++l] = r
                    }
                    i += 1;
                    return n
                }
            }();
            return a
        }(),
        each: function (a, b) {
            if (_MUI.isUndefined(a[0]))for (var c in a)_MUI.isFunction(a[c]) || b(c, a[c]); else {
                c = 0;
                for (var d = a.length; c < d; c++)_MUI.isFunction(a[c]) || b(a[c], c)
            }
        },
        A: function (a, b, c) {
            if (c == undefined)return a.getAttribute(b); else c == "" ? a.removeAttribute(b) : a.setAttribute(b, c)
        },
        crossQueue: {},
        crossAsynJson: function (a, b, c, d, e, f) {
            _MUI.crossQueue[b] && clearTimeout(_MUI.crossQueue[b]);
            _MUI.crossQueue[b] = null;
            var g = _MUI.DC("script"), m = _MUI.GT(document, "head")[0];
            window[b] = function (p) {
                _MUI.crossQueue[b] && clearTimeout(_MUI.crossQueue[b]);
                window[b] = undefined;
                try {
                    delete window[b]
                } catch (i) {
                }
                c(p);
                m && setTimeout(function () {
                    _MUI.remove(g)
                }, 5)
            };
            var o = 5E3;
            if (typeof e == "number")o = e;
            if (typeof d == "function")_MUI.crossQueue[b] = setTimeout(function () {
                clearTimeout(_MUI.crossQueue[b]);
                window[b] = undefined;
                try {
                    delete window[b]
                } catch (p) {
                }
                m && setTimeout(function () {
                    _MUI.remove(g)
                }, 5);
                d()
            }, o);
            f && _MUI.A(g, "charset", f);
            _MUI.A(g, "type", "text/javascript");
            _MUI.A(g, "src", a);
            m.appendChild(g)
        },
        getScript: function (a, b, c) {
            var d = _MUI.DC("script");
            if (b)if (_MUI.B.ie)d.onreadystatechange = function () {
                if (d.readyState == "loaded" || d.readyState == "complete")b()
            }; else d.onload = b;
            c && _MUI.A(d, "charset", c);
            _MUI.A(d, "type", "text/javascript");
            _MUI.A(d, "src", a);
            _MUI.GT(document, "head")[0].appendChild(d)
        },
        ready: function (a) {
            if (_MUI.ready.done)return a();
            if (_MUI.isReady.done)_MUI.readyDo.push(a); else {
                _MUI.readyDo = [a];
                _MUI.isReady()
            }
        },
        readyDo: [], isReady: function () {
            if (!_MUI.isReady.done) {
                _MUI.isReady.done = true;
                if (document.addEventListener)document.addEventListener("DOMContentLoaded", function () {
                    document.removeEventListener("DOMContentLoaded", arguments.callee, false);
                    _MUI.onReady()
                }, false); else if (document.attachEvent) {
                    var a = top != self;
                    if (a)document.attachEvent("onreadystatechange", function () {
                        if (document.readyState === "complete") {
                            document.detachEvent("onreadystatechange", arguments.callee);
                            _MUI.onReady()
                        }
                    }); else document.documentElement.doScroll && !a && function () {
                        if (!_MUI.ready.done) {
                            try {
                                document.documentElement.doScroll("left")
                            } catch (b) {
                                setTimeout(arguments.callee, 0);
                                return
                            }
                            _MUI.onReady()
                        }
                    }()
                }
                _MUI.EA(window, "load", _MUI.onReady)
            }
        },
        onReady: function () {
            if (!_MUI.ready.done) {
                _MUI.ready.done = true;
                for (var a = 0, b = _MUI.readyDo.length; a < b; a++)try {
                    _MUI.readyDo[a]()
                } catch (c) {
                }
                _MUI.readyDo = null
            }
        },
        B: function () {
            var a = {}, b = navigator.userAgent;
            a.win = b.hasString("Windows") || b.hasString("Win32");
            a.ie6 = b.hasString("MSIE 6") && !b.hasString("MSIE 7") && !b.hasString("MSIE 8");
            a.ie8 = b.hasString("MSIE 8");
            a.ie = b.hasString("MSIE");
            a.safari = b.hasString("WebKit");
            a.ipad = b.hasString("iPad");
            a.firefox = b.hasString("Firefox");
            return a
        }()
    }
})();
_$ = _MUI.G;
_$$ = _MUI.GC;
var _MI = _MI || {};
_MI = {
    time: null,
    string: {
        length: function (a) {
            var b = a.match(/[^\x00-\x80]/g);
            return a.length + (b ? b.length : 0)
        },
        escape: function (a) {
            return _MI.string.html(a).replace(/'/g, "\\'")
        },
        escapeReg: function (a) {
            for (var b = [], c = 0; c < a.length; c++) {
                var d = a.charAt(c);
                switch (d) {
                    case ".":
                        b.push("\\x2E");
                        break;
                    case "$":
                        b.push("\\x24");
                        break;
                    case "^":
                        b.push("\\x5E");
                        break;
                    case "{":
                        b.push("\\x7B");
                        break;
                    case "[":
                        b.push("\\x5B");
                        break;
                    case "(":
                        b.push("\\x28");
                        break;
                    case "|":
                        b.push("\\x28");
                        break;
                    case ")":
                        b.push("\\x29");
                        break;
                    case "*":
                        b.push("\\x2A");
                        break;
                    case "+":
                        b.push("\\x2B");
                        break;
                    case "?":
                        b.push("\\x3F");
                        break;
                    case "\\":
                        b.push("\\x5C");
                        break;
                    default:
                        b.push(d)
                }
            }
            return b.join("")
        },
        html: function (a) {
            return a.replace(/</g, "&lt;").replace(/>/g, "&gt;")
        },
        cut: function (a, b, c) {
            c = _MUI.isUndefined(c) ? "..." : c;
            var d = [], e = "";
            if (_MI.string.length(a) > b) {
                a = a.split("");
                e = 0;
                for (var f = a.length; e < f; e++)if (b > 0) {
                    d.push(a[e]);
                    b -= _MI.string.length(a[e])
                } else break;
                e = d.join("") + c
            } else e = a;
            return e
        },
        id: function (a) {
            return a.match(/[^\/]+$/g)[0].replace("#M", "")
        }
    },
    number: {
        format: function (a) {
            return(a + "").replace(/(?=(?!\b)(?:\w{3})+$)/g, ",")
        }
    },
    random: function (a) {
        a = a || 1;
        return parseInt((new Date).getTime() / a)
    },
    tmpl: {},
    fC: {
        numFormat: [],
        num: []
    },
    follow: function (a, b, c) {
        function d() {
            if (!b.sending) {
                var g = -1, m;
                m = b.className;
                var o = _$("followedNum_" + a), p = _$("followNum_" + a), i = m != "addAttention" && m != "delAttention";
                if (m == "addAttention" || i) {
                    g = 1;
                    m = "http://mini.t.qq.com/mini/follow.php"
                } else m = "http://mini.t.qq.com/mini/unfollow.php";
                b.sending = 1;
                _MUI.crossAsynJson(m + "?u=" + a + "&callback=followCallback&" + _MI.AcInfo() + "&r=" + _MI.random(), "followCallback", function (j) {
                    b.sending = 0;
                    if (j.result == 0) {
                        if (!i)b.className = g == 1 ? "delAttention" : "addAttention";
                        o && _MI.countNum(o, g);
                        p && _MI.countNum(p, g);
                        for (var k = 0, h = _MI.fC.numFormat.length; k < h; k++)_MI.countNum(_MI.fC.numFormat[k], g, 1);
                        k = 0;
                        for (h = _MI.fC.num.length; k < h; k++)_MUI.A(_MI.fC.num[k], "rel") == a && _MI.countNum(_MI.fC.num[k], g);
                        c && c(g, j)
                    } else j.result == -100 && _MI.code.show({msg: j.msg, code: j.info, call: function (n) {
                        _MI.follow(a, b, c, n)
                    }})
                })
            }
        }

        if (!_MI.fC.init) {
            _MI.fC.numFormat = _$$(".followNumFormat");
            _MI.fC.num = _$$(".followNum");
            _MI.fC.init = 1
        }
        if (MI.Login) {
            MI.Login.setCallback("follow_send", d);
            MI.AccountInfo.setCallback("follow_send", d);
            var e = MI.Login.getUin(), f = MI.S("account_mbid_" + e);
            if (!e || !f) {
                MI.Login.showPopup("follow_send", b);
                _MI.Bos("btnAddAttentionNotLogin", _MI.Host())
            } else d()
        } else {
            window.open("http://t.qq.com");
            _MI.Bos("btnAddAttentionNotLogin", _MI.Host())
        }
    }
};
_MI.Bos = function (a, b) {
    try {
        var c = MI.Uin(), d = "";
        b = b || MI.boss;
        if (UI.isNumber(b))d = "&sServerIp=&iBackInt1=" + b + "&iBackInt2=&sBackStr1="; else if (UI.isString(b))d = "&sServerIp=&iBackInt1=&iBackInt2=&sBackStr1=" + b;
        MI.Bos.pic.src = "http://btrace.qq.com/collect?sIp=&iQQ=" + c + "&sBiz=microblog&sOp=" + a + "&iSta=0&iTy=291&iFlow=0" + d
    } catch (e) {
    }
};
_MI.Bos.pic = new Image;
_MI.Host = function () {
    return window.location.host
};
_MI.Uin = function () {
    var a = "";
    try {
        a = _MUI.trim(_MUI.cookie("luin") || _MUI.cookie("uin"))
    } catch (b) {
    }
    return Number(a.replace(/o/g, ""))
};
_MI.ClientUin = _MI.ClientKey = "";
_MI.AcInfo = function () {
    return"uin=" + MI.Login.getUin() + "&clientuin=" + _MI.ClientUin + "&clientkey=" + _MI.ClientKey
};
MIIco = ["auth", "expo", "star"];
MIIcoHtml = ['<a href="http://t.qq.com/certification" target="_blank" class="vip" title="鑵捐璁よ瘉"></a>', '<a href="http://blog.qq.com/zt/2010/2010expo/shibovol.htm" title="2010涓婃捣涓栧崥蹇楁効鑰�" target="_blank" class="ico_expo"></a>', '<a href="http://ent.qq.com/zt2010/star2010/fans.htm" class="ico_star" title="鏄熷厜杈句汉" target="_blank"></a>'];
function MIIcon(a) {
    return"<%for(var k=0,num=MIIco.length;k<num;k++){if(" + a + "[MIIco[k]]){%><%=MIIcoHtml[k]%><%;break;}}%>"
}
(function () {
    _MI.tmpl.sCard = '<div class="mbSourceCardInfo" style="display:none"><div class="arrowBox"><div calss="arrow"></div></div><div class="mbloading"></div></div>';
    _MI.tmpl.userInfo = '<div class="mbCardUserDetail"><div class="userPic"><a title="<%=info.nick%>(@<%=info.name%>)" href="http://t.qq.com/<%=info.name%>?pref=<%=info.pref%>" rel="<%=info.nick%>(@<%=info.name%>)" target="_blank"><%if(info.head){%><img src="<%=info.head%>/50" /><%}else{%><img src="http://mat1.gtimg.com/www/mb/images/head_50.jpg" /><%}%></a></div><div class="userInfo">\t<div class="nick"><a title="<%=info.nick%>(@<%=info.name%>)" href="http://t.qq.com/<%=info.name%>?pref=<%=info.pref%>" target="_blank"><span><%=info.nick%></span></a>' + MIIcon("info.flag") + '</div>\t<div class="follower"><%if(info.num[1] > 0){%><a title="鍚紬锛�<%=info.num[1]%>浜�" href="http://t.qq.com/<%=info.name%>/follower?pref=<%=info.pref%>" target="_blank"><span>鍚紬锛�</span><span><%=info.num[1]%>浜�</span></a><%}else{%>&nbsp;<%}%></div>\t<div class="attentBoxWrap" follow="<%=info.follow%>" uid="<%=info.name%>"><a href="#" class="addAttention" title="绔嬪嵆鏀跺惉" style="display: none;"><span>+鏀跺惉</span></a><a href="#"class="delAttention" title="宸叉敹鍚�" style="display: none;"><span>宸叉敹鍚�</span></a></div></div>\t</div>';
    _MI.tmpl.shareArticlePic = '<div class="mbArticleSharePic"><div class="mbArticleShareBtn"><span>杞挱鍒拌吘璁井鍗�</span></div></div>'
})();
_MI.WebSCard = {
    boss: null,
    callback: null,
    hoverTime: null,
    tmpl: _MI.tmpl.sCard,
    tmplInfo: _MI.tmpl.userInfo,
    build: function (a, b, c) {
        var d = this;
        a = _$(a);
        b = b ? b : "qqcom";
        c = c ? c : ".mbSourceCard";
        (a = _$$(a, c)) && a.length && _MUI.each(a, function (e) {
            if (UI.A(e, "rel")) {
                e.onmouseover = function () {
                    d.show(e, b)
                };
                e.onmouseout = function () {
                    d.hide(e)
                }
            }
        })
    },
    show: function (a, b) {
        var c = this, d = _$$(a.parentNode, ".mbSourceCardInfo")[0];
        clearTimeout(c.hoverTime);
        c.hoverTime = setTimeout(function () {
            d ? _MUI.show(d) : c.buildCard(a, b)
        }, 100)
    },
    hide: function (a) {
        var b = this, c = _$$(a.parentNode, ".mbSourceCardInfo")[0];
        clearTimeout(b.hoverTime);
        b.hoverTime = setTimeout(function () {
            _MUI.hide(c)
        }, 50)
    },
    buildCard: function (a, b) {
        var c = this, d = _MUI.A(a, "rel");
        _MUI.A(a, "reltitle");
        var e = _MUI.A(a, "loaded"), f = _MUI.html(c.tmpl)[0];
        _MUI.after(f, a);
        var g = _$$(a.parentNode, ".mbSourceCardInfo")[0], m = _$$(g, ".mbCardUserDetail")[0], o = _$$(g, ".mbloading")[0];
        f = _$$(g, ".mbCardUserErr")[0];
        _MUI.show(g);
        f && _MUI.hide(f);
        g.onmouseover = function () {
            c.show(a)
        };
        g.onmouseout = function () {
            c.hide(a)
        };
        if (!e) {
            _MUI.show(o);
            _MUI.crossAsynJson("http://mini.t.qq.com/mini/userCard.php?&u=" + d + "&callback=userCard&r=" + _MI.random(), "userCard", function (p) {
                o && _MUI.hide(o);
                if (b)p.info.pref = b;
                var i = document.createDocumentFragment();
                if (p.result == 0) {
                    _MUI.A(a, "loaded", "1");
                    p = _MUI.html((new _MUI.tmplString(c.tmplInfo))(p));
                    _MUI.each(p, function (j) {
                        _MUI.append(j, i)
                    });
                    m ? _MUI.replace(i, m) : _MUI.append(i, g);
                    c.addEvent(g)
                } else c.errEvent(a)
            }, function () {
                c.errEvent(a)
            }, 3E3)
        }
    },
    errEvent: function (a) {
        var b = _MUI.A(a, "rel"), c = _MUI.A(a, "reltitle");
        a = _$$(a.parentNode, ".mbSourceCardInfo")[0];
        var d = _$$(a, ".mbCardUserDetail")[0], e = _$$(a, ".mbloading")[0], f = document.createDocumentFragment();
        b = _MUI.html('<div class="mbCardUserErr"><table><tr><td><span class="mbIcon_a"></span><a href="http://t.qq.com/' + b + '" target="_blank">鐐瑰嚮璁块棶' + (c ? c + "鐨勫井鍗�" : "鑵捐寰崥") + '</a><span class="mbIcon_b"></span></td></tr></table></div>');
        _MUI.each(b, function (g) {
            _MUI.append(g, f)
        });
        e && _MUI.hide(e);
        d ? _MUI.replace(f, d) : _MUI.append(f, a)
    },
    addEvent: function (a) {
        a = _$$(a, ".attentBoxWrap");
        var b;
        a && a.length && _MUI.each(a, function (c) {
            uid = _MUI.A(c, "uid");
            b = _MUI.A(c, "follow");
            add = _$$(c, ".addAttention")[0];
            del = _$$(c, ".delAttention")[0];
            b == 1 ? _MUI.show(del) : _MUI.show(add);
            add.onclick = function () {
                var d = this;
                _MI.follow(uid, d, function () {
                    _MUI.hide(d);
                    _MUI.show(_MUI.next(d));
                    d.className = "addAttention";
                    _MI.Bos("btnAddAttention", _MI.Host())
                });
                return false
            };
            del.onclick = function () {
                return false
            }
        })
    }
};
_MI.ArticleInfo = function () {
    var a = {}, b = document.title;
    b = b.indexOf("#") > 0 ? encodeURI(b.substr(0, document.title.indexOf("#")).replace(/\_[\u4E00-\u9FA5]+\_鑵捐缃�/g, "")) : encodeURI(b.replace(/\_[\u4E00-\u9FA5]+\_鑵捐缃�/g, ""));
    a.title = b;
    a.source = 1000001;
    a.site = encodeURI("http://www.qq.com");
    b = window.location.href;
    b = b.indexOf("#") > 0 ? encodeURI(b.substr(0, b.indexOf("#"))) : encodeURI(b);
    a.url = b;
    return a
};
_MI.ShareArticlePic = {
    boss: null,
    callback: null,
    tmpl: _MI.tmpl.shareArticlePic,
    build: function (a, b) {
        if (typeof GroupjsUrl == "undefined") {
            var c = this;
            c._body = _MUI.isString(a) ? _$(a) : a;
            c._pic = _$$(c._body, "img");
            c._pref = b ? b : "qqcom";
            c.addEvent()
        }
    },
    addEvent: function () {
        var a = this, b;
        setTimeout(function () {
            _MUI.each(a._pic, function (c) {
                var d = UI.width(c), e = UI.height(c), f;
                if (d > 100 || e > 100) {
                    var g = c.parentNode.tagName.toLocaleLowerCase() == "a" ? c.parentNode : c;
                    f = _MUI.html(a.tmpl)[0];
                    _MUI.append(g.cloneNode(true), f);
                    _MUI.replace(f, g);
                    f.style.cssText += "width:" + d + "px;height:" + e + "px;";
                    b = _$$(f, ".mbArticleShareBtn")[0];
                    f.onmouseover = function () {
                        _MUI.addClass(f, "hover")
                    };
                    f.onmouseout = function () {
                        _MUI.removeClass(f, "hover")
                    };
                    b.onclick = function (m) {
                        _MUI.E(m).stop();
                        _MI.Share.pop(c.src, a._pref);
                        return false
                    }
                }
            })
        }, 100)
    }
};
_MI.ShareArticle = {
    boss: null,
    callback: null,
    build: function (a, b) {
        var c = this;
        c._body = _MUI.isString(a) ? _$(a) : a;
        c._pref = b ? b : "qqcom";
        c.addEvent()
    }, addEvent: function () {
        var a = this;
        if (a._body)a._body.onclick = function () {
            _MI.Share.pop("", a._pref);
            return false
        }
    }
};
_MI.Share = {
    popup: null,
    url: "http://radio.t.qq.com/share.php",
    pop: function (a, b) {
        var c = this, d = _MI.ArticleInfo();
        a = c.url + "?title=" + d.title + "&url=" + d.url + (a ? "&pic=" + a : "") + "&pref=" + b;
        if (!c.popup)c.popup = new MI.Popup({title: "杞挱鍒拌吘璁井鍗�", titleCls: "mblogo", width: 600, height: 300});
        c.popup.src = a;
        c.show()
    },
    show: function () {
        this.popup.showPopup()
    },
    hide: function () {
        this.popup.hidePopup()
    },
    close: function () {
        this.popup.closePopup()
    },
    publish: function () {
        var a = this;
        setTimeout(function () {
            var b = MI.Login.getUin(), c = MI.S("account_mbid_" + b);
            if (b && c)a.show(); else if (!c)window.mb_quick_reg_call = a.publish
        }, 300)
    },
    hang: function () {
    }
};
_MI.Portal = {};
_MI.Follow = function (a, b) {
    var c = this;
    c._body = _MUI.isString(a) ? _$(a) : a;
    c._pref = b ? b : "qqcom";
    c.addEvent()
};
_MI.Follow.prototype = {
    boss: null,
    addEvent: function () {
        var a = _$$(this._body, ".attentBoxWrap"), b;
        a && a.length && _MUI.each(a, function (c) {
            uid = _MUI.A(c, "uid");
            b = _MUI.A(c, "follow");
            add = _$$(c, ".addAttention")[0];
            del = _$$(c, ".delAttention")[0];
            b == 1 ? _MUI.show(del) : _MUI.show(add);
            add.onclick = function () {
                var d = this;
                _MI.follow(uid, d, function (e, f) {
                    if (f.result == 0) {
                        _MUI.hide(d);
                        _MUI.show(_MUI.next(d));
                        d.className = "addAttention";
                        _MI.Bos("portalAttention", _MI.Host())
                    }
                });
                return false
            };
            del.onclick = function () {
                return false
            }
        })
    }
};
_MI.FollowAll = function (a, b, c, d) {
    var e = this;
    e._body = _MUI.isString(a) ? _$(a) : a;
    e._followBtn = _MUI.isString(b) ? _$(b) : b;
    e._pref = d ? d : "qqcom";
    e._class = c ? c : "";
    e.addEvent()
};
_MI.FollowAll.prototype = {
    boss: null,
    addEvent: function () {
        var a = this, b = _$$(a._body, ".userCheckItem");
        _$$(a._body, ".attentBoxWrap");
        var c = _$$(a._body, ".addAttention");
        _$$(a._body, ".delAttention");
        var d;
        _MUI.each(c, function (e) {
            uid = _MUI.A(e.parentNode, "uid");
            d = _MUI.A(e, "follow");
            add = e;
            del = _$$(e.parentNode, ".delAttention")[0];
            d == 1 ? _MUI.show(del) : _MUI.show(add);
            e.onclick = function () {
                var f = this;
                _MI.follow(uid, f, function (g, m) {
                    if (m.result == 0) {
                        _MUI.hide(f);
                        _MUI.show(_MUI.next(f));
                        f.className = "addAttention";
                        _MI.Bos("portalAttention", _MI.Host())
                    }
                });
                return false
            };
            del.onclick = function () {
                return false
            }
        });
        a._followBtn.onclick = function () {
            var e = this, f = [];
            _MUI.each(b, function (g) {
                g.value && g.checked && f.push(g.value)
            });
            if (f.length <= 0)alert("璇烽€夋嫨瑕佹敹鍚殑浜�"); else {
                _MUI.A(e, "follow") || _MI.follow(f, e, function (g, m) {
                    if (m.result == 0) {
                        _MUI.A(e, "follow", "1");
                        e.innerHTML = "鏀跺惉鎴愬姛";
                        _MUI.addClass(e, "followed");
                        _MI.Bos("portalAttentionALL", _MI.Host())
                    }
                });
                return false
            }
        }
    }
};