;
/*!searchdetail:widget/ui/utils/lib.js*/
define("searchdetail:widget/ui/utils/lib",
function(t) {
    var n = t("common:widget/ui/base/base"),
    e = t("common:widget/ui/utils/utils"),
    r = function() {
        var t = {
            w: "a",
            k: "b",
            v: "c",
            1 : "d",
            j: "e",
            u: "f",
            2 : "g",
            i: "h",
            t: "i",
            3 : "j",
            h: "k",
            s: "l",
            4 : "m",
            g: "n",
            5 : "o",
            r: "p",
            q: "q",
            6 : "r",
            f: "s",
            p: "t",
            7 : "u",
            e: "v",
            o: "w",
            8 : "1",
            d: "2",
            n: "3",
            9 : "4",
            c: "5",
            m: "6",
            0 : "7",
            b: "8",
            l: "9",
            a: "0",
            _z2C$q: ":",
            "_z&e3B": ".",
            AzdH3F: "/"
        },
        n = /([a-w\d])/g,
        e = /(_z2C\$q|_z&e3B|AzdH3F)/g;
        return {
            compile: function(t) {
                if (!t) return "";
                for (var n = (t.charCodeAt(0) + t.length).toString(16), e = 1; e < t.length; e++) n += "g" + (t.charCodeAt(e) + t.charCodeAt(e - 1)).toString(16);
                return n
            },
            uncompile: function(r) {
                if (!r) return "";
                var o = r.replace(e,
                function(n, e) {
                    return t[e]
                });
                return o.replace(n,
                function(n, e) {
                    return t[e]
                })
            },
            uncompileURL: function(t) {
                return /^(http|https)/.test(t) ? t: this.uncompile(t)
            }
        }
    } (),
    o = function() {
        var t = ["a", "c", "e", "g", "i", "k", "z", "b", "w", "o"];
        return {
            encodeTime: function(n) {
                for (var e = n + "",
                r = "",
                o = 0,
                i = e.length; i > o; o++) r += t[parseInt(e.charAt(o), 10)];
                return r
            }
        }
    } (),
    i = n.extend({
        stringEncode: function(t) {
            var t = t || "";
            return t.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;")
        },
        getBaiduId: function(t) {
            var e = n.cookie("BAIDUID");
            return e && (t ? e.substr(0, t) : e)
        },
        getHost: function(t) {
            var n = t.match(/^(https?:\/\/[^\/]+)(\/|$)/i);
            return n && n.length && n[1] || ""
        },
        isCrossDomain: function(t) {
            var n = t.match(/^(https?:)\/\/([^\/]+)(\/|$)/i);
            return ! (!n || !n.length || n[1] == location.protocol && n[2] == location.host)
        },
        getUniqId: function() {
            var t = 0,
            n = "imgdetailpg_";
            return function(e) {
                return (e || n) + ++t
            }
        } (),
        parseResponse: function(t) {
            if ("string" == typeof t) try {
                t = n.json.parse(n.trim(t))
            } catch(e) {
                t = null
            }
            return t
        },
        getRedirectUrl: function(t, n, e) {
            var r = Math.round((new Date).getTime() / 1e3),
            n = n || "",
            o = "";
            if (e && e[0]) for (var u = 0; u < e.length; u++) o += "&bakfurl" + (u + 1) + "=" + encodeURIComponent(e[u].FromURL);
            return "/search/redirect?tn=redirect&word=j&juid=" + encodeURIComponent(i.getBaiduId(6)) + "&sign=" + encodeURIComponent(i.encodeTime(r)) + "&url=" + encodeURIComponent(t) + o + "&objurl=" + encodeURIComponent(n)
        },
        getThumbUrl: function(t, n) {
            n = n || 201;
            var r = Math.floor(100 * Math.random()) % 5,
            o = e.ihttpsAgent("http://img" + r + ".imgtn.bdimg.com");
            return o + "/it/u=" + t + "&fm=" + n + "&gp=0.jpg"
        },
        getSiteName: function(t) {
            return t ? t.replace(/^(https?:\/\/)?(www\.)?(.+)(:\d+)?\/?$/i, "$3") : ""
        },
        split: function(t, n) {
            t = String(t || "");
            var e = [t];
            if (t) for (var r = 0,
            o = n.length; o > r; r++) for (var i = n[r], u = e.length - 1; u >= 0; u--) {
                var a = e[u].split(i);
                e.splice.apply(e, [u, 1].concat(a))
            }
            return e
        },
        mergeSeqArray: function(t, e) {
            var r = [],
            o = [];
            if (t && t.length) if (e && e.length) {
                for (var i = 0; i < t.length; i++) {
                    var u = t[i];
                    n.inArray(u, e) >= 0 ? (r.push(i), o.push(null)) : o.push(u)
                }
                if (r.length) {
                    if (r.length != e.length) for (var i = e.length - 1; i >= 0; i--) n.inArray(e[i], t) < 0 && e.splice(i, 1);
                    for (var i = 0; i < r.length; i++) {
                        var a = r[i];
                        o[a] = e[i]
                    }
                }
            } else o = [].concat(t);
            return o
        },
        cutTextByCharWidth: function(t, n, e, r) {
            if (t) {
                "undefined" == typeof r && (r = String(e).length);
                var o = 0,
                i = 0,
                u = 0,
                a = "",
                c = [],
                l = [],
                g = !1;
                if (t = String(t), t.replace(/[\u4e00-\u9fa5\u3000-\u303F\uFF00-\uFFFF]+/gi,
                function(e, r) {
                    i += r - o,
                    g || r > o && (a = t.substring(o, r), c.push(a), l.push(1), u += r - o, u >= n && (g = !0));
                    var h = 2 * e.length;
                    return g || (c.push(e), l.push(2), u += h, u >= n && (g = !0)),
                    o = e.length + r,
                    i += h,
                    e
                }), c.length || (c.push(t), l.push(1), i = t.length, u = i, u >= n && (g = !0)), g && u > n) {
                    var h = c[c.length - 1],
                    f = l[l.length - 1];
                    return c[c.length - 1] = h.substr(0, Math.floor((h.length * f - (u - n) - r) / f)),
                    c.join("") + e
                }
            }
            return t
        },
        logTime: function(t, n, e, r) {
            r = r || "//imgstat.baidu.com/";
            var o, i = r + "6.gif?for=detailtime&hostfr=imgstat&_dev=pc&p=1012200&logid=" + window.logid,
            u = "_dts" + e;
            o = window[u] = new Image,
            o.onload = o.onerror = function() {
                o.onload = o.onerror = null,
                o = null,
                window[u] = null
            },
            o.src = i + "&act=" + t + "&time=" + (e - n) + "&" + new Date * Math.random()
        }
    },
    r, o);
    return i
});;
/*!searchdetail:widget/ui/utils/imghelper.js*/
define("searchdetail:widget/ui/utils/imghelper",
function(t) {
    var h = t("common:widget/ui/base/base"),
    i = {
        _loaded: {},
        _loading: {},
        fetch: function(t) {
            var i = new h.Deferred;
            if (this._loaded[t]) return i.resolve(this._loaded[t]);
            if (this._loading[t]) return this._loading[t];
            var e = new Image,
            n = this;
            return e.onload = function() {
                var h = {
                    width: e.width,
                    height: e.height
                };
                n._loaded[t] = h,
                i.resolve(h)
            },
            e.onerror = function() {
                i.reject()
            },
            this._loading[t] = i,
            e.src = t,
            i.always(function() {
                e.onload = e.onerror = null,
                delete n._loading[t],
                e = null
            })
        }
    },
    e = {
        zoom: function(t, h) {
            if (! (t.width && t.height && h.width && h.height)) return {
                width: t.width && h.width ? Math.min(h.width, t.width) : "auto",
                height: t.height && h.height ? Math.min(h.height, t.height) : "auto"
            };
            var i = {};
            return t.width / t.height > h.width / h.height ? (i.width = Math.min(t.width, h.width), i.height = Math.floor(t.height * i.width / t.width)) : (i.height = Math.min(t.height, h.height), i.width = Math.floor(t.width * i.height / t.height)),
            i
        },
        scaleFull: function(t, h) {
            if (! (t.width && t.height && h.width && h.height)) return {
                width: t.width && h.width ? Math.min(h.width, t.width) : "auto",
                height: t.height && h.height ? Math.min(h.height, t.height) : "auto"
            };
            var i = {};
            return t.width / t.height > h.width / h.height ? (i.height = h.height, i.width = Math.floor(t.width * i.height / t.height)) : (i.width = h.width, i.height = Math.floor(t.height * i.width / t.width)),
            i.width > h.width && (i["margin-left"] = (h.width - i.width) / 2 + "px"),
            i.height > h.height && (i["margin-top"] = (h.height - i.height) / 3 + "px"),
            i
        },
        getFileType: function(t) {
            if (!t) return "";
            var h = t.lastIndexOf(".");
            return h > 0 ? t.substr(h + 1) : ""
        },
        formatBytes: function(t, h, i) {
            var e = ["b", "kb", "mb", "gb"],
            n = t;
            for (h = h || 0; n >= 1024 && h < e.length - 1;) n /= 1024,
            h += 1;
            return h > 0 && (n = Math.round(100 * n) / 100),
            i && (n = i.call(null, n)),
            n + e[h]
        },
        bindScaleFull: function(t, h, i) {
            var n = t[0];
            n.onload = function() {
                var n = e._imgLoaded(t, h);
                i && i(n)
            }
        },
        _imgLoaded: function(t, h) {
            var i = t[0],
            n = e.scaleFull({
                width: i.width,
                height: i.height
            },
            h);
            return t.css(n),
            i.onload = null,
            n
        },
        loadImage: function(t, e) {
            h(t).each(function(t, h) {
                i.fetch(h).then(e ||
                function() {})
            })
        }
    };
    return e
});;
/*!searchdetail:widget/ui/app/pagemodel.js*/
define("searchdetail:widget/ui/app/pagemodel",
function(e) {
    function t() {
        r.apply(this, arguments)
    }
    var n = e("common:widget/ui/base/base"),
    o = e("common:widget/ui/utils/utils"),
    r = e("common:widget/ui/arch/pagemodel");
    return n.extend(t.prototype, r.prototype, {
        load: function() {
            r.prototype.load.call(this);
            var e = n.extend({},
            this.uri.query.getAll(), this.uri.hash.getAll());
            for (var t in e) e.hasOwnProperty(t) && e[t] && (e[t] = o.tryDecodeURIComponent(e[t]));
            e.pn = 1 * (e.pn || 0),
            e.spn && (e.spn = 1 * (e.spn || 0)),
            e.pn < 0 && e.spn < 0 && (e.spn = 0),
            e.sampleId = o.getSampleId(),
            this.set(e)
        },
        parseHash: function(e) {
            var t = {};
            if (e) {
                var t = o.decodeJsonForQuery(o.queryToJson(e, !0));
                if ("undefined" == typeof t.pn) {
                    var n, r = e.split("&"),
                    s = /(pn|di|objURL|fromURLW|H|S|TP)(.*)/;
                    t = {};
                    for (var a = 0; a < r.length; a++) n = r[a].match(s),
                    n && n.length && (t[n[1]] = o.escapeHTML(o.tryDecodeURIComponent(n[2] || "")), "pn" == n[1] && (t.spn = o.escapeHTML(o.tryDecodeURIComponent(r[a + 1] || 0))))
                }
            }
            return t
        },
        buildQuery: function(e) {
            var t = [],
            o = this;
            return n(e).each(function(e, n) {
                t.push(n + "=" + encodeURIComponent(o.get(n) || ""))
            }),
            t.join("&")
        },
        setAbTest: function() {
            if (arguments && arguments.length) for (var e = this,
            t = 1 * this.get("sampleId"), n = 0; n < arguments.length; n++) {
                var o = arguments[n];
                if (t >= o[0] && t <= o[1]) {
                    e.set("__abtestgrp", o.length > 2 ? o[2] : n + 1);
                    break
                }
            }
        },
        getAbTestGroup: function() {
            return this.get("__abtestgrp") || ""
        }
    }),
    new t
});;
/*!searchdetail:widget/ui/statistic/statistic-core.js*/
define("searchdetail:widget/ui/statistic/statistic-core",
function(t) {
    var a = t("common:widget/ui/base/base"),
    e = t("common:widget/ui/monitorRequest/monitorRequest"),
    i = t("searchdetail:widget/ui/app/pagemodel"),
    n = t("common:widget/ui/utils/utils"),
    o = (t("common:widget/ui/base/events"), {
        ROOT_URL: "//imgstat.baidu.com/",
        GRAPH_ROOT_URL: "//graph.baidu.com/api/log?",
        PV_URL: "//image.baidu.com/pv/pv.gif",
        gif: 0,
        imgData: {},
        imgViewStart: -1,
        pageData: {},
        init: function(t) {
            this.pageData = {
                ct: t.data.ct,
                tn: t.data.tn,
                word: t.data.queryWordEnc,
                step_word: t.data.step_word,
                pn: t.data.pn,
                spn: t.data.spn,
                rn: t.data.rn,
                istype: t.data.istype,
                "in": t.data["in"],
                cl: t.data.cl,
                lm: t.data.lm,
                hd: t.data.hd,
                latest: t.data.latest,
                copyright: t.data.copyright,
                st: t.data.st,
                cs: t.data.cs,
                os: t.data.os,
                ln: t.data.ln,
                fr: t.data.fr,
                fmq: t.data.fmq,
                ic: t.data.ic,
                s: t.data.s,
                se: t.data.se,
                tab: t.data.tab,
                face: t.data.face,
                ist: t.data.ist,
                jit: t.data.jit,
                tpl: t.data.tpl,
                resTabs: t.data.resTabs,
                pn: t.data.pageNum,
                objURL: t.data.objURL,
                fromURL: t.data.fromURL,
                fromURLHost: t.data.fromURLHost,
                type: t.data.type,
                isAspDianjing: t.data.isAspDianjing,
                token: t.data.token,
                key: t.data.key,
                investid: t.get("investId") || "",
                samplekey: encodeURIComponent(window.samplekey || ""),
                fromHost: t.data.fromHost,
                dututype: t.data.dututype
            },
            t.data.hs - 0 && (this.pageData.ishttps = t.data.hs)
        },
        update: function(t) {
            this.imgViewStart = (new Date).getTime();
            var a = "";
            if (t.fromPageTitleEnc) try {
                a = JSON.parse(t.fromPageTitleEnc).strategy
            } catch(e) {}
            this.imgData = {
                thumbURL: encodeURIComponent(t.thumbURL),
                u: encodeURIComponent(t.objURLHttp || t.objURL),
                f: encodeURIComponent(t.fromURL),
                width: t.width,
                height: t.height,
                di: t.di,
                is: t.is,
                isAspDianjing: t.isAspDianjing,
                token: t.token,
                cs: t.cs,
                os: t.os,
                key: t.key,
                isSet: t.isSet,
                fromHost: t.fromHost,
                ftitle: encodeURIComponent(t.fromPageTitle),
                pn: t.pn,
                vs: window.vsid || "",
                adQuery: t.adQuery || "",
                samplekey: encodeURIComponent(window.samplekey || ""),
                adtype: t.adType,
                lensman: "1" === t.youtuType ? 1 : void 0,
                frm: "lensman" === i.get("frm") ? "lensman": void 0,
                personalized: t.personalized || "",
                adPicId: t.adPicId || "",
                strategy: a
            }
        },
        send: function(t, o) {
            var s = {};
            s = a.extend({},
            this.pageData, this.imgData, o),
            s.p = t.toString().split(".")[1],
            s.samplekey = encodeURIComponent(window.samplekey || ""),
            s.logid = window.logid,
            s.baiduid = a.cookie("BAIDUID") || "";
            var d = i.get("is");
            d && (s.isset = encodeURIComponent(d || "")),
            s = n.jsonToQuery(s);
            var p = parseInt(t);
            isNaN(p) || (this.gif = p + ".gif?", e(this.ROOT_URL + this.gif + s))
        },
        graphSend: function(t) {
            var i = {
                lt: 0,
                tn: t.tn,
                sign: this.imgData.cs,
                baiduid: a.cookie("BAIDUID") || "",
                pro_n: t.pro_n,
                image_source: "GRAPH_IMAGE",
                entrance: "GENERAL"
            };
            i = n.jsonToQuery(i),
            e(this.GRAPH_ROOT_URL + i)
        },
        hold: function(t, i) {
            var o = {};
            o = a.extend({},
            this.pageData, this.imgData, i),
            o.p = t.toString().split(".")[1],
            o.samplekey = encodeURIComponent(window.samplekey || ""),
            o.logid = window.logid,
            o = n.jsonToQuery(o);
            var s = parseInt(t),
            d = parseInt(t) + ".gif?",
            p = this;
            return {
                send: function() {
                    isNaN(s) || e(p.ROOT_URL + d + o)
                }
            }
        }
    });
    return o
});;
/*!searchdetail:widget/ecomads/layer/layer.js*/
define("searchdetail:widget/ecomads/layer/layer",
function(e, t, i) {
    function a() {
        var e = window.samplekey.match("UI_PC_TUIGUANG:2") || window.samplekey.match("UI_PC_TUIGUANG:1") ? "": "<h3>商业推广</h3>";
        this.layerTpl1 = ['<div class="ecom-layer" id="ecom-hint-layer">', e, '<p>本搜索结果为<a href="http://e.baidu.com/" target="_blank">商业推广</a>信息，请注意可能的风险。百度推出', '<a class="layer-plan" target="_blank" href="http://baozhang.baidu.com/guarantee/">网民权益保障计划</a>，', '<a class="layer-login" target="_blank" href="https://passport.baidu.com/">登录</a>搜索有保障</p>', "</div>"].join(""),
        this.layerTpl2 = ['<div class="ecom-layer" id="ecom-hint-layer">', e, '<p>本搜索结果为<a href="http://e.baidu.com/" target="_blank">商业推广</a>信息，请注意可能的风险。', '您当前为登录状态，已参加<a target="_blank" href="http://baozhang.baidu.com/guarantee/">网民权益保障计划</a>。', "</div>"].join("")
    }
    var s = e("common:widget/ui/base/base"),
    n = (e("common:widget/ui/utils/utils"), e("common:widget/ui/base/events"), e("searchdetail:widget/ui/utils/lib"), e("searchdetail:widget/ui/utils/imghelper"), e("common:widget/ui/juicer/juicer"), e("searchdetail:widget/ui/statistic/statistic-core"));
    s.extend(a.prototype, {
        init: function(e) {
            this.hasUser = e,
            this.render(),
            this.bindEvents()
        },
        render: function() {
            var e = this.hasUser ? this.layerTpl2: this.layerTpl1,
            t = s("#ecom-hint-layer"),
            i = s("#adCard").find(".tips"),
            a = this;
            t.length || (s("#wrapper").append(e), this.layer = s("#ecom-hint-layer"), this.tips = i, setTimeout(function() {
                a.setPos()
            },
            800))
        },
        setPos: function() {
            var e = this.getLayerTop();
            this.layer.css({
                top: e + 22 + "px"
            })
        },
        appear: function() {
            var e = this;
            this.setTop(),
            this.layer.show(),
            clearTimeout(this.timer),
            this.timer = setTimeout(function() {
                e.layer.hide()
            },
            2e3)
        },
        disappear: function() {
            this.layer.hide(),
            clearTimeout(this.timer)
        },
        getLayerTop: function() {
            return s("#adCard")[0].getBoundingClientRect().top
        },
        setTop: function() {
            this.layer.css({
                top: this.getLayerTop()
            })
        },
        layerLog: function(e) {
            n.send("10.1010100", {
                as: "card-layer",
                pos: "right",
                subpos: "0",
                shownum: "1",
                matcont: e,
                materialNum: "1"
            })
        },
        bindEvents: function() {
            var e = this;
            s("body").off("click"),
            s("body").on("click",
            function(t) {
                var i = s(t.target).closest("#adCard .tips");
                return i.length && e.layer.is(":hidden") ? void e.appear() : void e.disappear()
            }),
            s("#sider").on("scroll",
            function() {
                e.layer.is(":visible") && e.setTop()
            }),
            s(".layer-login").on("click",
            function() {
                e.layerLog("login")
            }),
            s(".layer-plan").on("click",
            function() {
                e.layerLog("plan")
            }),
            s(window).on("resize",
            function() {
                e.setPos()
            })
        }
    }),
    i.exports = new a
});;
/*!searchdetail:widget/searchbox/searchbox.js*/
define("searchdetail:widget/searchbox/searchbox",
function(e) {
    function t() {
        var e = f.getTime(),
        t = u.get("fmq");
        return t ? t.indexOf("m") > -1 && -1 == t.indexOf("_m") && -1 == t.indexOf("_D") ? t = e + "_" + t + "_D": -1 == t.indexOf("_D") && (t += "_D") : t = e + "_D",
        t
    }
    function n(e) {
        if (!u) return e.preventDefault(),
        !1;
        if (s) return ! 0;
        s = !0;
        var n = this;
        if (u.get("word") == n.word.value) n.fmq.value = t(),
        n.fm.value = "";
        else {
            var i = new Date,
            a = i.getTime(),
            o = u.get("fmq");
            n.fmq.value = o && o.indexOf("m") > -1 && -1 == o.indexOf("_m") && -1 == o.indexOf("_R") ? a + "_" + o + "_R": a + "_R"
        }
        return d.send("5.41", {
            q: n.word.value
        }),
        !0
    }
    function i(e, t) {
        function n(e) {
            var t, n = e.form,
            i = e.value,
            a = e.originValue,
            d = e.index;
            i != a && ("undefined" == typeof n.f ? (t = document.createElement("input"), t.type = "hidden", t.name = "f", t.value = "3", n.appendChild(t)) : n.f.value = "3", "undefined" == typeof n.oq ? (t = document.createElement("input"), t.type = "hidden", t.name = "oq", t.value = a, n.appendChild(t)) : n.oq.value = a, "undefined" == typeof n.rsp ? (t = document.createElement("input"), t.type = "hidden", t.name = "rsp", t.value = d, n.appendChild(t)) : n.rsp.value = d)
        }
        var i = a(e),
        d = i.parent(),
        u = d.position(),
        f = d.outerWidth() - 2,
        s = d.outerHeight(),
        m = t.parent(),
        l = function() {
            a(window).width() < 1217 ? m.addClass("narrow") : m.removeClass("narrow"),
            f = d.outerWidth() - 2
        };
        l();
        var p = new o({
            el: i,
            formElement: document.f1,
            parentElement: d.parent()
        });
        p.css({
            left: u.left,
            top: u.top + s - 1,
            width: f
        }).on("beforesubmit", n);
        var c = a.cookie.get("indexPageSugList");
        c = c ? a.json.parse(c) : [];
        var w = new r({
            width: f,
            fm: "detail",
            offsetL: 0,
            offsetT: 4,
            page: 1011112,
            query: i.val(),
            samplekey: window.samplekey
        });
        w.init(c),
        a(window).on("resize",
        function() {
            l(),
            p.css({
                width: f
            }),
            w && w.update && w.update({
                width: f
            })
        })
    }
    var a = e("common:widget/ui/base/base"),
    d = e("searchdetail:widget/ui/statistic/statistic-core"),
    o = e("common:widget/ui/suggest/suggestion"),
    r = e("common:widget/ui/sugHistory/sugHistory"),
    u = null,
    f = new Date,
    s = !1;
    return {
        init: function(e, t, d) {
            u = e,
            t = a(t),
            t.submit(n),
            d && i(t[0].word, t)
        }
    }
});;
/*!searchdetail:widget/shitutip/tip.js*/
define("searchdetail:widget/shitutip/tip",
function(i, e, t) {
    {
        var o = i("common:widget/ui/base/base");
        t.exports = {
            init: function() {
                o.cookie("closedututip") || (o.browser.msie ? o(".ie-shituTip").show() : o(".shituTip").show(), o(".closetip").on("click",
                function() {
                    o(this).parent().remove(),
                    o.cookie("closedututip", !0)
                }))
            }
        }
    }
});;
/*!searchdetail:widget/sning1/sning1.js*/
define("searchdetail:widget/sning1/sning1",
function(t, n, i) {
    function e(t) {
        this.defaultOpts = {
            landingPages: {
                1 : "http://www.niwodai.com/index.do?method=ac&artId=1823227138797576&f&utm_source=baidutz&utm_medium=cpc&cid=sem-bdtp-04"
            }
        },
        this.options = s.extend({},
        this.defaultOpts, t || {}),
        this.$container = null
    }
    var s = t("common:widget/ui/base/base"),
    o = t("searchdetail:widget/ui/statistic/statistic-core");
    s.extend(e.prototype, {
        init: function(t) {
            t && s.extend(this.options, t),
            this.$container = s("#" + t.id)
        },
        show: function(t) {
            this._render(t.container),
            this._bindEvent()
        },
        _render: function(t) {
            t && t.length && t.append(this.$container.remove());
            var n = "pc_1_4.jpg",
            i = this.$container.find("img").eq(0);
            i.attr("src", "//img0.bdstatic.com/img/image/nwd/" + n),
            this.$container.show(),
            o.send("5.1011103", {
                fm: "searchdetail",
                type: "sning3",
                sning: this.options.label,
                event: "show"
            })
        },
        _bindEvent: function() {
            var t = this;
            this.$container.on("click", "a",
            function(n) {
                n.preventDefault(),
                o.send("5.1011103", {
                    fm: "searchdetail",
                    type: "sning3",
                    sning: t.options.label,
                    event: "click"
                });
                var i = t.options.landingPages["" + t.options.label];
                i && window.open(i)
            })
        }
    }),
    i.exports = new e
});;
/*!searchdetail:widget/ui/app/history.js*/
define("searchdetail:widget/ui/app/history",
function(t) {
    function i(t) {
        s.apply(this),
        this.pageModel = t,
        this._isLockUrl = !1,
        this._lockedState = null
    }
    var e = t("common:widget/ui/base/base"),
    s = t("common:widget/ui/arch/history");
    return e.extend(i.prototype, s.prototype, {
        urlParamKeys: {
            ct: "ct",
            z: "z",
            ipn: "ipn",
            word: "word",
            step_word: "step_word",
            hs: "hs",
            pn: "pn",
            spn: "spn",
            di: "di",
            pi: "pi",
            rn: "rn",
            tn: "tn",
            is: "is",
            istype: "istype",
            ie: "ie",
            oe: "oe",
            "in": "in",
            cl: "cl",
            lm: "lm",
            st: "st",
            cs: "cs",
            os: "os",
            simid: "simid",
            adpicid: "adpicid",
            lpn: "lpn",
            cs: "cs",
            ln: "ln",
            fr: "fr",
            fmq: "fmq",
            fm: "fm",
            ic: "ic",
            s: "s",
            hd: "hd",
            latest: "latest",
            copyright: "copyright",
            se: "se",
            sme: "sme",
            tab: "tab",
            width: "width",
            height: "height",
            face: "face",
            ist: "ist",
            jit: "jit",
            statnum: "statnum",
            cg: "cg",
            bdtype: "imgData.bdSrcType",
            simics: "simics",
            oriquery: "oriquery",
            objurl: "objurl",
            fromurl: "fromurl",
            adtype: "adtype",
            gsm: "gsm",
            rpstart: "rpstart",
            rpnum: "rpnum",
            catename: "catename",
            tabname: "tabname",
            querytype: "querytype",
            islist: "islist",
            querylist: "querylist",
            force: "force"
        },
        hashParamKeys: {
            pn: "pn",
            spn: "spn",
            di: "di",
            adpicid: "adpicid",
            lpn: "lpn",
            cs: "cs",
            pi: "pi",
            simid: "simid",
            objurl: "objurl",
            fromurl: "fromurl",
            W: "imgData.width",
            H: "imgData.height",
            S: "imgData.filesize",
            TP: "imgData.type"
        },
        init: function() {
            this.pageModel.get("simics") && (this.urlParamKeys = e.extend({},
            this.urlParamKeys, {
                cardserver: "cardserver"
            })),
            s.prototype.init.call(this),
            this.pageModel.addEventListener("changed", this._pageModelChangedHandler.bind(this))
        },
        lockState: function() {
            this._isLockUrl = !0
        },
        unlockState: function() {
            this._isLockUrl = !1,
            this._lockedState && (this.forward(this._lockedState), this._lockedState = null)
        },
        forward: function(t) {
            this._popState || (this._isLockUrl ? this._lockedState = t: s.prototype.forward.call(this, t))
        },
        buildStateParams: function(t) {
            var i, s = this.pageModel,
            a = {};
            for (var r in t) t.hasOwnProperty(r) && (i = s.get(t[r] || r), i && "word" == r && e("#kw").val(i), "undefined" != typeof i && (a[r] = null == i ? "": i));
            return a
        },
        _pageModelChangedHandler: function(t) {
            for (var i = t.keys,
            e = this.urlParamKeys,
            s = i.length - 1; s >= 0; s--) if ("undefined" != typeof e[i[s]]) {
                this.forward(this.buildStateParams(this.supportPushState ? this.urlParamKeys: this.hashParamKeys));
                break
            }
        }
    }),
    i
});;
/*!searchdetail:widget/ui/app/sizemanager.js*/
define("searchdetail:widget/ui/app/sizemanager",
function(i) {
    var e = i("common:widget/ui/base/base"),
    t = i("common:widget/ui/utils/utils"),
    n = i("common:widget/ui/base/subject"),
    a = {};
    return e.extend(a, n, {
        elements: {
            wrapper: "#wrapper",
            main: "#main",
            container: "#container",
            header: "#header",
            sider: "#sider",
            imgContainer: ".img-container",
            albumPnl: ".album-pnl",
            albumContainer: ".album-container"
        },
        mainMinSize: {
            width: 630,
            height: 391
        },
        init: function() {
            var i = this.elements;
            for (var t in i) i.hasOwnProperty(t) && (this.elements[t] = e(i[t]));
            i.imgPrev = i.container.find(".img-prev"),
            i.imgNext = i.container.find(".img-next")
        },
        update: function() {
            var i = e(window),
            n = i.width(),
            a = i.height(),
            g = this.elements,
            r = g.main,
            m = g.sider[0].offsetWidth,
            h = t.UI.getCssDigitValueSum(g.sider, ["padding-top", "padding-bottom"]),
            d = Math.max(n - m, this.mainMinSize.width),
            s = Math.max(a, this.mainMinSize.height),
            o = t.UI.getCssDigitValueSum(g.imgContainer, ["padding-top", "padding-bottom"]),
            l = g.header[0].offsetHeight + t.UI.getCssDigitValue(g.header, "margin-bottom"),
            u = s - l - g.albumPnl[0].offsetHeight - o - 3,
            p = d - t.UI.getCssDigitValueSum(g.imgContainer, ["padding-left", "padding-right", "margin-left", "margin-right"]),
            c = s - l,
            w = t.UI.getCssDigitValueSum(g.albumContainer, ["padding-left", "padding-right"]);
            g.imgContainer.height(u).width(p),
            g.albumPnl.width(d).css("visibility", "visible"),
            g.albumContainer.width(d - w),
            g.container.height(c),
            g.imgPrev.height(c),
            g.imgNext.height(c),
            r.height(s).width(d),
            g.wrapper.width(d + m),
            g.sider.css("height", a - h - 55 + "px"),
            this.notify(),
            e.cookie && e.cookie("winWH", "^6_" + n + "x" + a)
        }
    }),
    a
});;
/*!searchdetail:widget/ui/controls/imagedetail/dragsupport.js*/
define("searchdetail:widget/ui/controls/imagedetail/dragsupport",
function(t) {
    function e(t, e, s) {
        this.$pnl = t,
        this.$handler = e,
        this.opts = n.extend({
            minInterval: 10,
            cursor: "url(//img0.bdstatic.com/img/image/grabhand.cur), move"
        },
        s),
        this._isInited = !1,
        this.enabled = !1,
        this.dragState = {
            startX: 0,
            startY: 0,
            dx: 0,
            dy: 0,
            useDrag: !1
        };
        var i = this;
        this._pnlMouseDownHandler = function(t) {
            return 1 != t.which || i.$handler[0] != t.target ? !0 : (i._moveStart(t), t.stopPropagation(), void t.preventDefault())
        },
        this._pnlMouseOutHandler = function(t) {
            var e = t.target; ! i.dragState.useDrag || e === i.$handler[0] && e === i.$pnl[0] || i._moveEnd(t)
        },
        this._moveHandler = function(t) {
            return i._moving(t),
            t.preventDefault ? t.preventDefault() : t.returnValue = !1,
            !1
        },
        this._mouseUpHandler = function(t) {
            t.stopPropagation(),
            t.preventDefault(),
            i._moveEnd(t)
        }
    }
    var n = t("common:widget/ui/base/base"),
    s = t("common:widget/ui/base/events");
    return n.extend(e.prototype, s, {
        init: function() {
            this.$pnl.on("mousedown", this._pnlMouseDownHandler),
            this.$pnl.on("mouseout", this._pnlMouseOutHandler),
            this._isInited = !0
        },
        _moveStart: function(t) {
            var e = this.$handler.position(),
            n = this.dragState;
            n.startX = t.clientX,
            n.startY = t.clientY,
            n.dx = n.startX - e.left,
            n.dy = n.startY - e.top,
            document.addEventListener ? document.addEventListener("mousemove", this._moveHandler, !0) : (this.$handler[0].setCapture(), this.$handler.on("mousemove", this._moveHandler)),
            this.$handler.on("mouseup", this._mouseUpHandler),
            this.fire("startMove")
        },
        _moving: function(t) {
            t = t || window.event;
            var e = this.dragState,
            n = t.clientX - e.dx,
            s = t.clientY - e.dy;
            if (!e.useDrag) {
                var i = this.opts.minInterval;
                e.useDrag = Math.abs(t.clientX - e.startX) > i || Math.abs(t.clientY - e.startY) > i
            }
            this.$handler.css({
                top: s,
                left: n
            }),
            this.dragState.ingMoveStatus || (this.dragState.ingMoveStatus = !0, this.fire("ingMove"))
        },
        _moveEnd: function() {
            document.removeEventListener ? document.removeEventListener("mousemove", this._moveHandler, !0) : (this.$handler[0].releaseCapture(), this.$handler.off("mousemove", this._moveHandler)),
            this.$handler.off("mouseup", this._mouseUpHandler),
            this.dragState.useDrag = !1,
            this.dragState.ingMoveStatus = !1,
            this.fire("endMove")
        },
        enable: function() {
            this._isInited && this.enabled || this.init(),
            this.enabled = !0,
            this.$handler.css("cursor", this.opts.cursor)
        },
        disable: function() {
            this.enabled && (this._moveEnd(), this.$pnl.off("mousedown", this._pnlMouseDownHandler), this.$pnl.off("mouseout", this._pnlMouseOutHandler)),
            this.dragState.useDrag = !1,
            this.enabled = !1,
            this.$handler.css("cursor", "")
        }
    }),
    e
});;
/*!searchdetail:widget/ui/models/settingmodel.js*/
define("searchdetail:widget/ui/models/settingmodel",
function(e) {
    function t() {
        this.data = {},
        this._isLoaded = !1,
        this._storageKey = "usetting",
        this.DUTU_TAG_CLOSE = "cdutu",
        this.DUTU_GUIDE_KEY = "cguide",
        this._keyIndexes = {
            cdutu: 0,
            cguide: 1
        }
    } {
        var i = e("common:widget/ui/base/base"),
        s = (e("common:widget/ui/utils/utils"), e("common:widget/ui/base/events"));
        e("common:widget/ui/arch/model"),
        e("searchdetail:widget/ui/utils/lib"),
        e("common:widget/ui/browser-storage/browser-storage")
    }
    return i.extend(t.prototype, s, {
        getValue: function(e) {
            var t = this._load(),
            i = t[e] || "";
            return i
        },
        setValue: function(e, t) {
            this._saveToLocal(e, t),
            this.fire(e + ":changed")
        },
        _load: function() {
            if (this._isLoaded) return this.data;
            try {
                var e = i.cookie(this._storageKey);
                if (e) {
                    var t = this._keyIndexes;
                    for (var s in t) if (t.hasOwnProperty(s)) {
                        var a = t[s];
                        this.data[s] = e.length > a ? 1 * e[a] : ""
                    }
                }
            } catch(o) {}
            return this._isLoaded = !0,
            this.data
        },
        _saveToLocal: function(e, t) {
            var s = this._load();
            s[e] = t;
            try {
                var a = this._keyIndexes,
                o = [],
                r = 0;
                for (var n in a) if (a.hasOwnProperty(n)) {
                    var d = a[n];
                    d > r && (r = d),
                    o[d] = s[n] || 0
                }
                for (var u = 0; r >= u; u++)"undefined" == typeof o[u] && (o[u] = 0);
                i.cookie.set(this._storageKey, o.join(""), {
                    path: "/",
                    expires: 2592e6
                })
            } catch(h) {}
        }
    }),
    new t
});;
/*!searchdetail:widget/ui/controls/imagedetail/dutuanchor/dutuanchor.js*/
define("searchdetail:widget/ui/controls/imagedetail/dutuanchor/dutuanchor",
function(t) {
    function e(t) {
        this.$element = i(null),
        this.elements = {
            name: "em"
        },
        this.opts = i.extend({
            query: "",
            tpl: "<div id='dutu-anchor-wrapper'></div>",
            itemTpl: "<div class='dutu-anchor'><span class='ic'><span class='ic-bg-new'></span><i class='downloadoptimize'></i></span><a target='_blank'><em></em></a></div>"
        },
        t),
        this.opts.elements = i.extend({},
        {},
        this.elements),
        this.pnl = null,
        this.hostImg = null,
        this.imgData = null,
        this.imgScale = 1,
        this.visible = !1;
        var e = this;
        n.on(n.DUTU_TAG_CLOSE + ":changed",
        function() {
            e.update(e.imgData, e.imgScale)
        })
    }
    var i = t("common:widget/ui/base/base"),
    a = t("common:widget/ui/utils/utils"),
    s = t("common:widget/ui/base/events"),
    n = (t("searchdetail:widget/ui/utils/lib"), t("searchdetail:widget/ui/models/settingmodel")),
    h = t("searchdetail:widget/ui/statistic/statistic-core");
    return i.extend(e.prototype, s, {
        init: function(t, e) {
            if (this.pnl = t, this.hostImg = e, i.browser.msie && i.browser.version <= 6) {
                var a = this;
                t.on("mouseover",
                function() {
                    a.hover()
                }).on("mouseout",
                function() {
                    a.hout()
                })
            }
        },
        render: function() {
            var t = this,
            e = t.face_list != t.render_face_list || t.auto_list != t.render_auto_list || t.cloth_list != t.render_cloth_list;
            t.render_face_list = t.face_list,
            t.render_auto_list = t.auto_list,
            t.render_cloth_list = t.cloth_list;
            var a = function() {
                var e = i("<div/>"),
                a = 0,
                s = t.face_list.length;
                for (a; s >= a && (a != s || "downloadoptimize" == t.group) && (a != s || 0 == s); a++) {
                    var n = i("<div/>"),
                    h = i(t.opts.itemTpl).attr("data-id", "face_" + a).appendTo(n);
                    t._compat(h),
                    e.append(n.children())
                }
                var o = 0,
                l = t.auto_list.length;
                for (o; l >= o && (o != l || 0 == l); o++) {
                    var u = i("<div/>"),
                    h = i(t.opts.itemTpl).addClass("auto").attr("data-id", "face_auto_" + o).appendTo(u);
                    t._compat(h),
                    e.append(u.children())
                }
                var d = 0,
                r = t.cloth_list.length;
                for (d; r > d && (d != r || 0 == r); d++) {
                    var c = i("<div/>"),
                    h = i(t.opts.itemTpl).addClass("cloth").attr("data-id", "face_cloth_" + d).appendTo(c);
                    t._compat(h),
                    e.append(c.children())
                }
                return e
            };
            this.$element.length ? e && this.$element.empty().append(a().children()) : (this.$element = i(this.opts.tpl), this.$element.append(a().children()), this.$element.appendTo(this.pnl), this.bindEvent())
        },
        _compat: function(t) {
            a.UI.isSupportCss3("borderRadius", t.get(0), !0) || t.addClass("dutu-anchor-lower")
        },
        _removeTwinkle: function() {
            this.$element.find(".dutu-anchor").each(function(t, e) {
                e = i(e),
                e.hasClass("dutu-twinkle") && e.removeClass("dutu-twinkle")
            })
        },
        bindEvent: function() {
            var t = this,
            e = !1;
            this.$element.on("mouseenter", ".dutu-anchor",
            function() {
                var a = i(this).attr("data-id");
                if (t.anthorIndex = a, !e) {
                    i(this).hasClass("dutu-twinkle") && i(this).removeClass("dutu-twinkle");
                    var s = "face";
                    a.indexOf("auto") >= 0 && (s = "auto"),
                    a.indexOf("cloth") >= 0 && (s = "cloth"),
                    h.send("5.1011200", {
                        tn: "baiduimagedetail",
                        fm: s,
                        tag: "face"
                    }),
                    h.graphSend({
                        tn: "pc",
                        fm: s,
                        tag: "face",
                        pro_n: "pc_web_hover"
                    }),
                    e = !0,
                    t.fire("hover")
                }
            }).on("mouseleave", ".dutu-anchor",
            function() {
                e = !1,
                t.fire("hout")
            }),
            i("#srcPic").on("mouseenter",
            function() {
                t.wrapperLeaveTimeout && clearTimeout(t.wrapperLeaveTimeout),
                i(this).find(".dutu-anchor").show()
            }).on("mouseleave",
            function() {
                var e = this;
                t.wrapperLeaveTimeout = setTimeout(function() {
                    i(e).find(".dutu-anchor").each(function(t, e) {
                        e = i(e),
                        e.hasClass("dutu-twinkle") || e.hide()
                    })
                },
                150)
            }),
            i(document).on("mouseleave",
            function() {
                i(this).find(".dutu-anchor").each(function(t, e) {
                    e = i(e),
                    e.hasClass("dutu-twinkle") || e.hide()
                })
            })
        },
        setQuery: function(t) {
            this.opts.query = t
        },
        _imgChanged: function(t) {
            return t == this.imgData ? !1 : t && this.imgData ? t.objURL != this.imgData.objURL: !0
        },
        update: function(t, e, i, a) {
            this.group = t.group,
            this.update_dutu(t, e, i, a)
        },
        update_dutu: function(t, e, i, a) {
            var s = this._imgChanged(t) || a,
            o = this;
            s && this._removeTwinkle(),
            this.imgData = t,
            this.imgScale = e || 1;
            var l = t.star_face,
            u = t.auto_info,
            d = "clothcard" == this.group ? t.cloth: null,
            r = t.wiki_face_entity,
            c = t.srv_auto,
            f = [],
            m = [],
            g = [];
            if (u && 1 == u.length && c && g.push(u[0]), l && l.length > 0 && r && r.length > 0) {
                var _, p;
                for (_ = r.length - 1; _ >= 0; _--) for (p = l.length - 1; p >= 0; p--) l[p].entity === r[_].ne && (f.unshift(l[p]), m.unshift(r[_]))
            }
            l && 0 == l.length && r && r.length > 0 && m.unshift(r[0]),
            this.face_list = f,
            this.wiki_list = m,
            this.auto_list = g,
            this.cloth_list = d ? [d] : [],
            this.default_auto_info = t.default_auto_info,
            this.default_star_face = t.default_star_face,
            (this.face_list.length > 0 || this.auto_list.length > 0 || this.default_auto_info || this.default_star_face || 0 == this.face_list.length && r && r.length > 0 || 0 == this.auto_list.length && c || this.cloth_list.length > 0) && !n.getValue(n.DUTU_TAG_CLOSE) ? (s && o.show(), this.updateData(t, i), this.refreshPos(), 0 == this.auto_list.length && c && !this.default_auto_info && this.hide(), (this.default_auto_info || this.default_star_face || this.cloth_list.length > 0) && (o.visible = !0), s && (this.$element.find(".dutu-anchor").addClass("dutu-twinkle"), setTimeout(function() {
                o._removeTwinkle(),
                o.visible || o.hide()
            },
            3600), this.face_list.length > 0 && h.send("5.1011000", {
                tn: "baiduimagedetail",
                fm: "face",
                tag: "face",
                dutusize: this.face_list.length
            }), this.auto_list.length > 0 && h.send("5.1011000", {
                tn: "baiduimagedetail",
                fm: "auto",
                tag: "face",
                dutusize: this.auto_list.length
            }), d && h.send("5.1011000", {
                tn: "baiduimagedetail",
                fm: "cloth",
                tag: "face",
                dutusize: 1
            }))) : this.hide()
        },
        update_dutu_dz: function(t, e, i) {
            var a = this._imgChanged(t),
            s = this;
            a && this._removeTwinkle(),
            this.imgData = t,
            this.imgScale = e || 1;
            var o = t.star_face,
            l = t.auto_info,
            u = t.wiki_face_entity,
            d = t.srv_auto,
            r = [],
            c = [],
            f = [];
            if (l && 1 == l.length && d && f.push(l[0]), o && o.length > 0 && u && u.length > 0) {
                var m, g;
                for (m = u.length - 1; m >= 0; m--) for (g = o.length - 1; g >= 0; g--) o[g].entity === u[m].ne && (r.unshift(o[g]), c.unshift(u[m]))
            }
            this.face_list = r,
            this.wiki_list = c,
            this.auto_list = f,
            (this.face_list.length > 0 || this.auto_list.length > 0) && !n.getValue(n.DUTU_TAG_CLOSE) ? (a && this.show(), this.updateData(t, i), this.refreshPos(), a && (this.$element.find(".dutu-anchor").addClass("dutu-twinkle"), setTimeout(function() {
                s._removeTwinkle(),
                s.visible || s.hide()
            },
            3600), this.face_list.length > 0 && h.send("5.1011000", {
                tn: "baiduimagedetail",
                fm: "face",
                tag: "face",
                dutusize: this.face_list.length
            }), this.auto_list.length > 0 && h.send("5.1011000", {
                tn: "baiduimagedetail",
                fm: "auto",
                tag: "face",
                dutusize: this.auto_list.length
            }))) : this.hide()
        },
        clearHout: function() {
            this.wrapperLeaveTimeout && clearTimeout(this.wrapperLeaveTimeout),
            this.$element.show(),
            this.visible = !0,
            this.$element.find(".dutu-anchor").show()
        },
        nocardtip: function(t, e, i) {
            var a = e.getPropCollection("serviceCard"),
            s = e.getKey(),
            n = t.srv_auto.name;
            a && a.getByKey(e.getKey()).done(function(t) {
                s == e.getKey() && (t = t ? t.auto: null, !t && n && i.attr("href", "/search/index?tn=baiduimage&ie=utf-8&word=" + encodeURIComponent(n)).attr("log-click", "p=5.15&fm=auto&tag=innerface"))
            })
        },
        updateData: function(t, e) {
            var i = this.wiki_list,
            a = this.face_list,
            s = this.$element,
            n = 0,
            o = a.length;
            for (n; o > n; n++) {
                var l = s.find('[data-id="face_' + n + '"]'),
                u = this.opts.elements,
                d = this.elements;
                for (var r in u) d.hasOwnProperty(r) && (d[r] = l.find(u[r]));
                this.elements.name.text(i[n].ne).parent().attr("href", i[n].url).attr("log-click", "p=5.15&fm=face&tag=face&site=" + encodeURIComponent(i[n].url)),
                !i[n].ne || this.opts.query && this.opts.query.indexOf(i[n].ne) >= 0 ? this.elements.name.parent().hide() : this.elements.name.parent().show()
            }
            if (0 == o && 0 != i.length && "downloadoptimize" == this.group) {
                var l = s.find('[data-id="face_0"]'),
                u = this.opts.elements,
                d = this.elements;
                l.addClass("default_icon default_face_icon");
                for (var r in u) d.hasOwnProperty(r) && (d[r] = l.find(u[r]));
                this.elements.name.text(i[0].ne).parent().attr("href", i[0].url),
                h.send("5.1011000", {
                    tn: "baiduimagedetail",
                    fm: "facedefault",
                    tag: "face"
                })
            }
            if (0 == this.auto_list.length && this.imgData.srv_auto || this.auto_list.length > 0) {
                var c = s.find('[data-id="face_auto_0"]').find("em"),
                f = c.parent(),
                m = f.parent();
                m.attr("title", ""),
                c.text(this.imgData.srv_auto.name || "猜猜图中车型"),
                this.auto_list.length > 0 && (!t.srv_auto.name || this.opts.query && this.opts.query.indexOf(t.srv_auto.name) >= 0 ? c.parent().hide() : c.parent().show()),
                e && this.nocardtip(t, e, f)
            }
            if (this.cloth_list.length > 0) {
                var c = s.find('[data-id="face_cloth_0"]').find("em"),
                g = e && e.get("imgData").cs,
                _ = e && e.get("word"),
                p = e && e.get("imgData").bdSrcType,
                v = encodeURIComponent(e && e.get("bigImgUrl")),
                w = e && e.get("imgData").map,
                b = w && w.cloth_info ? 1 : 2,
                T = e && e.get("imgData").picDesc,
                y = e && e.get("imgData").fromPageTitleEnc,
                C = "/n/pc_list?queryImageUrl=" + v + "&querysign=" + g + "&query=" + _ + "&shixiao=" + p + "&objtype=" + b + "&title=" + y + "&ddesc=" + T + "&fp=searchdetail&pos=card&fm=searchdetail&uptype=button#tab=product";
                c.parent().attr("href", C),
                c.text("找同款")
            }
        },
        show: function() {
            this.render(),
            this.$element.css("display", ""),
            this.visible = !0
        },
        hide: function() {
            this.visible = !1,
            this.$element.find(".dutu-anchor").hasClass("dutu-twinkle") || this.$element.hide()
        },
        hover: function() {
            this.update(this.imgData, this.imgScale),
            this.$element.hasClass("dutu-anchor-hover") || this.$element.addClass("dutu-anchor-hover")
        },
        hout: function() {
            this.$element.hasClass("dutu-anchor-hover") && this.$element.removeClass("dutu-anchor-hover")
        },
        refreshPos: function(t) {
            if (this.visible) {
                this.imgScale = t || this.imgScale;
                var e = this.face_list,
                i = this.wiki_list,
                a = this.$element,
                s = 0,
                n = e.length,
                h = this.imgScale,
                o = this.hostImg.position();
                for (s; n > s; s++) {
                    var l = a.find('[data-id="face_' + s + '"]'),
                    u = e[s];
                    l.css({
                        left: u.x * h + o.left,
                        top: o.top + (1 * u.y + 1 * u.h) * h + 20
                    })
                }
                if (0 == n && 0 != i.length && "downloadoptimize" == this.group) {
                    var l = a.find('[data-id="face_' + s + '"]');
                    l.css({
                        left: o.left + this.hostImg.width() - l.width() - 10,
                        top: o.top + this.hostImg.height() - l.height() - 10
                    })
                }
                if (this.auto_list.length >= 0) {
                    var l = a.find('[data-id="face_auto_0"]'),
                    u = this.auto_list[0],
                    d = this.hostImg.width(),
                    r = this.hostImg.height();
                    0 == this.auto_list.length && this.imgData.srv_auto ? l.css({
                        left: o.left + parseInt(d / 2),
                        top: o.top + parseInt(r / 2)
                    }) : 0 != this.auto_list.length && this.imgData.srv_auto && l.css({
                        left: (1 * u.x + 1 * u.w / 2) * h + o.left,
                        top: (1 * u.y + 1 * u.h / 2) * h + o.top
                    })
                }
                if (this.cloth_list.length > 0) {
                    var l = a.find('[data-id="face_cloth_0"]'),
                    u = this.auto_list[0],
                    h = this.imgScale,
                    o = this.hostImg.position();
                    l.css({
                        left: (1 * u.x + 1 * u.w / 2) * h + o.left,
                        top: (1 * u.y + 1 * u.h / 2) * h + o.top
                    })
                }
            }
        }
    }),
    e
});;
/*!searchdetail:widget/ui/statistic/bdgstat.js*/
define("searchdetail:widget/ui/statistic/bdgstat",
function(e, t, i) {
    var a = e("common:widget/ui/base/base"),
    s = e("common:widget/ui/utils/utils"),
    o = e("common:widget/ui/monitorRequest/monitorRequest"),
    d = e("searchdetail:widget/ui/app/pagemodel"),
    n = {
        host: "//imgstat.baidu.com/10.gif?"
    };
    a.extend(n, {
        sendLog: function(e) {
            var t = this._getBaseParams();
            e = a.extend({},
            t, e, {
                timestamp: (new Date).getTime()
            }),
            o(this.host + s.jsonToQuery(e))
        },
        _getBaseParams: function() {
            if (!this._defaultParams) {
                var e = a.cookie("BAIDUID") || "";
                this._defaultParams = {
                    query: d.data.queryWordEnc || "",
                    baiduid: e.slice(0, -5),
                    logid: window.logid || "",
                    samplekey: encodeURIComponent(window.samplekey || ""),
                    as: ""
                }
            }
            return this._defaultParams
        }
    }),
    i.exports = n
});;
/*!searchdetail:widget/ui/controls/imagedetail/textlinkad/displaystrategy.js*/
define("searchdetail:widget/ui/controls/imagedetail/textlinkad/displaystrategy",
function(i, t, s) {
    function e(i) {
        this._displayLimit = i || 0
    }
    function n(i) {
        e.call(this, i),
        this._firstDisplayPosition = {
            isSet: !1,
            pn: -1,
            spn: -1
        }
    }
    function o(i) {
        e.call(this, i),
        this._displayCount = 0,
        this._displayPositions = {}
    }
    var r = i("common:widget/ui/base/base");
    r.extend(e.prototype, {
        getDisplayIndex: function(i, t, s) {
            return this.computeIndex(i, t, s)
        },
        computeIndex: function() {
            return - 1
        }
    }),
    r.extend(n.prototype, e.prototype, {
        computeIndex: function(i, t, s) {
            var e = s && s.imgMetaArray,
            n = s && s.imgModel && s.imgModel.get("rootImg");
            if (!e || e.length < this._displayLimit || !n) return - 1;
            var o = -1;
            if (this._firstDisplayPosition.isSet) {
                e.push({
                    isInited: !0,
                    pn: i,
                    imgNum: n.bdSetImgNum || 1,
                    adType: n.adType || "0"
                });
                var r = i - this._displayLimit <= this._firstDisplayPosition.pn && this._firstDisplayPosition.pn <= i;
                if (!r) return - 1;
                for (var p = 0,
                a = e.length; a > p; p++) {
                    var d = e[p];
                    if (d.isInited && d.pn === this._firstDisplayPosition.pn) break
                }
                if (p >= a) return - 1;
                for (o = 0; a - 1 > p; p++) {
                    var d = e[p];
                    d.isInited && "0" === d.adType && (o += d.imgNum)
                }
                if (o = o + t - this._firstDisplayPosition.spn, 0 > o || o >= this._displayLimit) return - 1
            } else this._firstDisplayPosition = {
                isSet: !0,
                pn: i,
                spn: t
            },
            o = 0;
            return o
        }
    }),
    r.extend(o.prototype, e.prototype, {
        computeIndex: function(i, t) {
            var s = this._createPositionKey(i, t);
            if ("number" == typeof this._displayPositions[s]) return this._displayPositions[s];
            if (this._displayCount < this._displayLimit) {
                var e = this._displayCount++;
                return this._displayPositions[s] = e,
                e
            }
            return - 1
        },
        _createPositionKey: function(i, t) {
            return i + ("number" == typeof t ? "_" + t: "")
        }
    }),
    s.exports = {
        arbitrary: o,
        forward: n
    }
});;
/*!searchdetail:widget/ui/controls/imagedetail/rightAd/rightAd.js*/
define("searchdetail:widget/ui/controls/imagedetail/rightAd/rightAd",
function(i, t, e) {
    function n(i, t) {
        this.init(i, t)
    }
    var s = i("common:widget/ui/base/base"),
    o = (i("common:widget/ui/base/events"), i("searchdetail:widget/ui/statistic/bdgstat"));
    s.extend(n.prototype, {
        init: function(i, t) {
            this.$win = s(window),
            this.$im = s("#imContainer"),
            this.imgModel = t,
            this._adsEpv = [],
            this.render(i)
        },
        bindEvents: function() {
            this.sendRightLog(),
            this.checkCropout()
        },
        render: function(i) {
            if (i) {
                var t = s("#adCard"),
                e = s("#imContainer");
                i.length && i[0].AdDesc && (t && t.length && "hidden" === t.css("visibility") && t.css({
                    visibility: "visible",
                    height: "auto"
                }), e.append(i[0].AdTitle), e.append("<script>" + i[0].AdDesc + "</script>"), this.bindEvents())
            }
        },
        checkCropout: function() {
            var i, t, e = this.$im.find(".ec_img_detail"),
            n = this.$win.height(),
            d = e.length;
            if (! (this._adsEpv.length >= d)) for (var c = 0; d > c; c++) i = s(".ec_img_detail:eq(" + c + ")"),
            t = i.offset().top,
            n >= t && !i.attr("data-epv") && (o.sendLog({
                p: 1101006,
                pos: "pc_detail_right_card",
                subpos: "右侧index",
                type: "epv",
                shownum: 1
            }), i.attr("data-epv", 1), this._adsEpv.push(c))
        },
        sendRightLog: function() {
            var i = s(".ec_img_detail"),
            t = i.find(".ec_img_wrap_a"),
            e = i.find(".ec_img_channel_title"),
            n = i.find(".ec_img_channel_url"),
            d = (n.text(), this);
            t.on("click",
            function() {
                o.sendLog({
                    p: 1101007,
                    pos: "pc_detail_right_card",
                    shownum: 1,
                    subpos: "右侧index",
                    matcont: "img"
                })
            }),
            e.on("click",
            function() {
                o.sendLog({
                    p: 1101007,
                    pos: "pc_detail_right_card",
                    shownum: 1,
                    subpos: "右侧index",
                    matcont: "title"
                })
            }),
            n.on("click",
            function() {
                var i = s(this).attr("href");
                o.sendLog({
                    p: 1101007,
                    pos: "pc_detail_right_card",
                    shownum: 1,
                    subpos: "右侧index",
                    matcont: i
                })
            }),
            i.on("click",
            function() {
                o.sendLog({
                    p: 1101007,
                    pos: "pc_detail_right_card",
                    shownum: 1,
                    subpos: "右侧index",
                    matcont: "ad"
                })
            }),
            s("#sider").scroll(function() {
                d.checkCropout()
            })
        }
    }),
    e.exports = n
});;
/*!searchdetail:widget/ui/controls/imagedetail/textlinkad/textlinkad.js*/
define("searchdetail:widget/ui/controls/imagedetail/textlinkad/textlinkad",
function(t, e, i) {
    function s(t) {
        this._element = "string" === n.type(t) ? n(t) : t,
        this._isRequestProcessing = !1,
        this._forceHide = !1,
        this._isHidden = !1,
        this._cachedAds = {
            isSet: !1,
            ads: [],
            js: ""
        },
        this._adsShowRecords = {},
        this._ckCode = {
            isLoaded: !1,
            timeSign: 0
        },
        this._opts = {
            defaultLineHeight: 20,
            marginTop: 14,
            marginBottom: 14,
            fetchNum: 8,
            userIsLogin: !1
        },
        this._imgModel = {},
        this._displayStrategy = null,
        this._displayStrategyType = "arbitrary";
        var e = o[this._displayStrategyType];
        e && (this._displayStrategy = new e(this._opts.fetchNum)),
        this._bindEvents()
    }
    var n = t("common:widget/ui/base/base"),
    d = t("common:widget/ui/base/events"),
    a = t("searchdetail:widget/ui/statistic/bdgstat"),
    o = t("searchdetail:widget/ui/controls/imagedetail/textlinkad/displaystrategy"),
    h = t("searchdetail:widget/ui/controls/imagedetail/rightAd/rightAd"),
    c = t("searchdetail:widget/ui/statistic/statistic-core"),
    r = function(t) {
        return n("<div>" + t + "</div>").text()
    },
    _ = function() {
        return window.ecom && window.ecom.pl && window.ecom.pl.run
    };
    s.EventType = {
        AD_UPDATE: "ad-update"
    },
    n.extend(s.prototype, d, {
        setOptions: function(t) {
            n.extend(this._opts, t)
        },
        update: function(t) {
            this._imgModel = t,
            this._forceHide || this._updateInternal(t)
        },
        _updateInternal: function(t) {
            this._showElement(!1);
            var e = t.get("pn"),
            i = t.get("spn"),
            s = t.get("rootImg"),
            n = (this.getFetchNum(), s.adType);
            if (("65" === n || "128" === n) && (n = "0"), "0" !== n || !t.data.word || !this._displayStrategy || "1" === t.data.imgData.youtuType) return void(this._isHidden = !0);
            var d = this._displayStrategy.getDisplayIndex(e, i, {
                imgModel: t
            });
            return 0 > d ? void(this._isHidden = !0) : this._cachedAds.isSet && !this._cachedAds.ads[d] ? void(this._isHidden = !0) : (this._isHidden = !1, this._cachedAds.isSet && this._cachedAds.ads[d] ? void this._updateContent({
                index: d,
                ad: this._cachedAds.ads[d],
                js: this._cachedAds.js
            }) : void this._fetchAds(t, d))
        },
        _bindEvents: function() {
            var t = this,
            e = this._element,
            i = e.find(".promote-tag"),
            d = e.find(".promote-warning"),
            o = e.find(".close-button");
            this._domAd = e.find(".ad-container a"),
            this._domDetail = e.find(".detail-button"),
            this._domWarningLines = d.find(".warning-line");
            var h = !1,
            r = null,
            _ = function() {
                r && (clearTimeout(r), r = null)
            },
            l = function() {
                d.hide(),
                h = !1,
                n(document).off("click.domPromote")
            };
            o.click(function() {
                t._showElement(!1),
                e.empty(),
                t._isHidden = !0,
                t._forceHide = !0,
                t.dispatchEvent(s.EventType.AD_UPDATE),
                a.sendLog({
                    p: "1101009",
                    pos: "pc_detail_left_textlink",
                    matcont: "close",
                    subpos: +e.attr("data-index") || 0
                })
            }),
            i.click(function(t) {
                h || (d.show(), h = !0, r = setTimeout(function() {
                    l()
                },
                2e3), n(document).on("click.domPromote",
                function() {
                    _(),
                    l()
                }), t.stopPropagation()),
                a.sendLog({
                    p: "1101009",
                    pos: "pc_detail_left_textlink",
                    matcont: "promote",
                    subpos: +e.attr("data-index") || 0
                })
            }),
            this._domAd.click(function() {
                a.sendLog({
                    p: "1101009",
                    pos: "pc_detail_left_textlink",
                    matcont: "ad",
                    subpos: +e.attr("data-index") || 0
                }),
                c.send("5.1011104")
            }),
            this._domDetail.length && this._domDetail.click(function() {
                a.sendLog({
                    p: "1101009",
                    pos: "pc_detail_left_textlink",
                    matcont: "detail",
                    subpos: +e.attr("data-index") || 0
                }),
                c.send("5.1011104")
            })
        },
        _fetchAds: function(t, e) {
            if (!this._isRequestProcessing) {
                this._isRequestProcessing = !0;
                var i = this,
                s = {
                    tn: "baiduaspdetail",
                    word: t.data.word,
                    request_type: "ImageAspDetail",
                    ie: "utf-8",
                    objurl: "",
                    adiswise: 0,
                    adreqtype: 12
                };
                n.ajax({
                    url: "/search/aspdetail?",
                    type: "GET",
                    data: s,
                    dataType: "json",
                    success: function(s) {
                        i.rightAd = s.rightAd,
                        i._cachedAds.isSet = !0,
                        i._cachedAds.ads = s.textLinkAdList && s.textLinkAdList.slice(0, 3) || [],
                        i._cachedAds.js = s[70009] || "",
                        new h(i.rightAd, t),
                        i._cachedAds.ads.length && i._cachedAds.ads[e] ? i._updateContent({
                            index: e,
                            ad: i._cachedAds.ads[e],
                            js: i._cachedAds.js
                        }) : i._isHidden = !0
                    },
                    error: function() {
                        i._isHidden = !0
                    },
                    complete: function() {
                        i._isRequestProcessing = !1
                    }
                })
            }
        },
        _updateContent: function(t) {
            var e = r(t.ad.AdTitle),
            i = r(t.ad.AdDesc),
            d = t.ad.AdLink,
            o = t.index || 0;
            this._element.attr("data-index", o),
            this._domAd.text(e).attr("href", d).attr("title", i),
            this._domDetail.length && this._domDetail.attr("href", d);
            var h = !!this._imgModel.get("userName"),
            l = this._opts.userIsLogin !== h;
            if (l) {
                this._opts.userIsLogin = h;
                var u = n("#text-link-warning-login").html();
                u && n(this._domWarningLines[1]).html(u)
            }
            if (this._ckCode.isLoaded || (this._element.after(t.js || ""), _() && (this._ckCode = {
                isLoaded: !0,
                timeSign: window.ecom.pl.imTimesign || 0
            })), _()) {
                var p = this;
                window.ecom.pl.run(function(e) {
                    p._element.each(function(i, s) {
                        var n = s.getElementsByTagName("A");
                        e.ck(n, t.timeSign || p._ckCode.timeSign)
                    })
                },
                !1)
            }
            this.dispatchEvent(s.EventType.AD_UPDATE),
            this._isHidden || this._showElement(!0),
            this._adsShowRecords[o] !== !0 && (a.sendLog({
                p: 1101008,
                pos: "pc_detail_left_textlink",
                subpos: o,
                shownum: 1
            }), this._adsShowRecords[o] = !0),
            c.send("5.1011114")
        },
        getFetchNum: function() {
            return this._opts.fetchNum
        },
        getHeight: function() {
            if (this._isHidden) return 0;
            var t = this._opts.defaultLineHeight;
            return t + this._opts.marginTop + this._opts.marginBottom
        },
        reRender: function() {
            var t = this._element.parent();
            t.length && (t.append(this._element.remove()), this._bindEvents())
        },
        _showElement: function(t) {
            t ? this._element.show() : this._element.hide()
        },
        isShow: function() {
            return ! this._isHidden
        },
        resetPosition: function(t) {
            if (!this._isHidden) {
                var e = t.left > 0 ? t.left: 0,
                i = t.top + t.height + this._opts.marginTop;
                this._element.css({
                    left: e + "px",
                    top: i + "px"
                })
            }
        }
    }),
    i.exports = s
});;
/*!searchdetail:widget/ui/controls/card/base/base.js*/
define("searchdetail:widget/ui/controls/card/base/base",
function(t) {
    function e(t, e) {
        this.$element = s(e.element || null),
        this.elements = s.extend({
            title: ".card-title",
            content: ".card-content",
            cntWrapper: ".cnt-wrapper",
            closeBtn: ".card-title .close"
        },
        t),
        this.opts = s.extend({
            initHide: !1,
            logTag: "card",
            dataKey: "",
            logKey: "",
            checkState: !0,
            collapseClass: "card-box-collpse",
            activeClass: "card-box-active",
            collapseHeight: !1,
            caption: "",
            tpl: ['<div class="card-box">', '<h5 class="card-title"><i class="sticker"></i><span class="text"></span><i class="close"></i></h5>', '<div class="card-content">', "</div>", "</div>"].join("")
        },
        e),
        this.imgData = null,
        this.curState = {
            visible: !1,
            collapse: !1,
            pro: null,
            hasContent: !1
        },
        this.pnl = null
    }
    var s = t("common:widget/ui/base/base"),
    i = t("common:widget/ui/utils/utils"),
    a = t("common:widget/ui/base/events"),
    n = (t("searchdetail:widget/ui/utils/lib"), t("searchdetail:widget/ui/statistic/statistic-core"));
    return s.extend(e.prototype, a, {
        init: function(t) {
            this.pnl = t,
            this.$element.length ? (this._compat(this.$element), this._init()) : (this.render(), this.$element.hide())
        },
        _init: function() {
            var t = this.$element,
            e = this.elements;
            for (var s in e) e.hasOwnProperty(s) && (e[s] = t.find(e[s]));
            this.bindEvent()
        },
        render: function() {
            var t = this.pnl;
            if (!this.$element.length) {
                var e = s(this.opts.tpl),
                i = s('<div class="cnt-wrapper"></div>');
                e.find(".card-content").appendTo(i),
                e.append(i),
                this._compat(e),
                this.$element = e.show().appendTo(t)
            }
            this._init(),
            this.opts.caption && this.elements.title.find(".text").text(this.opts.caption)
        },
        _compat: function(t) {
            i.UI.isSupportCss3("transform", t.get(0)) || t.find(".card-title .close").addClass("close-lower")
        },
        setLinkLog: function(t) {
            t = t || this.$element;
            var e = this.opts.logKey,
            i = this;
            i.element = t,
            t.find("a").each(function(t, a) {
                a = s(a);
                var n = a.attr("href");
                if (n && !a.attr("log-click") && !a.hasClass("nolog")) {
                    var o = a.attr("log-ext") || "";
                    a.attr("log-click", "p=5.15&tag=" + i.opts.logTag + "&fm=" + e + "&site=" + encodeURIComponent(n) + "&pos=" + (a.attr("log-pos") || "") + "&ext=" + encodeURIComponent(o))
                }
            }),
            i.element.find(".sma-container").size() > 0 && i.element.find(".sma-container .sma-body>li").size() > 0 && (n.send("5.1010000", {
                tn: "baiduimagedetail",
                tag: "card",
                fm: "sma"
            }), i.element.find(".sma-container").find("a").each(function(t, e) {
                e = s(e);
                var a = e.attr("href");
                if (a) {
                    var n = e.attr("log-ext") || "";
                    e.attr("log-click", "p=5.15&tag=" + i.opts.logTag + "&fm=sma&site=" + encodeURIComponent(a) + "&pos=" + (e.attr("log-pos") || "") + "&ext=" + encodeURIComponent(n))
                }
            })),
            i.element.find("#imContainer").size() > 0 && i.element.find("#imContainer .EC_im").size() > 0 && (n.send("5.1010000", {
                tn: "baiduimagedetail",
                tag: "card",
                fm: "ecim"
            }), i.element.find("#imContainer").find("a").each(function(t, e) {
                e = s(e);
                var a = e.attr("href");
                if (a) {
                    var n = e.attr("log-ext") || "";
                    e.attr("log-click", "p=5.15&tag=" + i.opts.logTag + "&fm=ecim&site=" + encodeURIComponent(a) + "&pos=" + (e.attr("log-pos") || "") + "&ext=" + encodeURIComponent(n))
                }
            })),
            s(".card-box-more").size() > 0 && s(".card-box-more").each(function(t, e) {
                e = s(e);
                var a = e.attr("href"),
                n = s(this).attr("id") ? "xiangsi": s(this).attr("fm") ? s(this).attr("fm") : "";
                if (a) {
                    var o = e.attr("log-ext") || "";
                    e.attr("log-click", "p=5.15&tag=" + i.opts.logTag + "&fm=" + n + "&site=" + encodeURIComponent(a) + "&pos=more&ext=" + encodeURIComponent(o))
                }
            })
        },
        updateLogSeq: function(t) {
            this.opts.logIndex = t,
            this.$element.find("a[log-click]").each(function(e, i) {
                i = s(i);
                var a = i.attr("log-click") || "";
                a.indexOf("&seq") > 0 ? a = a.replace(/&seq=\d+(&|$)/, "&seq=" + t + "$1") : a += "&seq=" + t,
                i.attr("log-click", a)
            })
        },
        bindEvent: function() {
            var t = this;
            this.elements.closeBtn.on("click",
            function() {
                var e = t.toggleState();
                n.send("5.1010101", {
                    tn: "baiduimagedetail",
                    fm: t.opts.logKey,
                    act: e ? "open": "close",
                    seq: t.opts.logIndex,
                    tag: "card"
                })
            })
        },
        toggleState: function() {
            var t = this,
            e = t.opts.collapseClass,
            i = !t.$element.hasClass(e);
            return t.opts.cardHeight || (t.opts.cardHeight = t._ready4Animate()),
            t.$element.toggleClass(e).css("height", i ? t.opts.collapseHeight: t.opts.cardHeight),
            s.browser.msie && s.browser.version <= 6 && s(document.body).toggleClass("refr4ie6"),
            !i
        },
        _ready4Animate: function() {
            var t = this.elements,
            e = t.cntWrapper.height(),
            s = e + (t.title.length ? t.title[0].offsetHeight: 0);
            return this.opts.collapseHeight || (this.opts.collapseHeight = t.title.height()),
            this.$element.height(s).css("overflow", "hidden"),
            t.cntWrapper.height(e).css({
                position: "absolute",
                bottom: "1px"
            }),
            s
        },
        _resetBox4Update: function() {
            var t = this.opts.collapseClass;
            this.opts.cardHeight = !1,
            this.elements.cntWrapper.css({
                position: "static",
                height: "auto"
            }),
            this.$element.hasClass(t) && this.$element.removeClass(t),
            this.$element.hasClass("ad-card") || this.$element.css("height", "auto")
        },
        bindText: function(t, e) {
            t.text(e || ""),
            e ? t.show() : t.hide()
        },
        getState: function() {
            return this.curState
        },
        update: function(t, e, s) {
            var i = this.checkState(t),
            a = !0;
            if (this.imgData = t, this.curState.hasContent = i.hasContent, (!this.opts.checkState || i.hasContent && i.changed || "common" === this.opts.sortKey && window.hitFeibiao) && !s) {
                this.curState.collapse = !1;
                var n = this.opts.dataKey;
                this.$element.length || this.render();
                var o = this.updateView(t[n] || t, e);
                if (this._resetBox4Update(), o !== !1) {
                    var l = t.card_pres_info || {};
                    if (n && l[n]) {
                        var c = this.opts.collapseClass;
                        this.$element.hasClass(c) || this.$element.addClass(c),
                        this.$element.height(37),
                        this.curState.collapse = !0
                    }
                    a = !1,
                    this.setLinkLog(this.elements.content)
                }
            }
            this.curState.visible = !a,
            a || this.opts.initHide ? this.hide() : this.$element.show()
        },
        hide: function() {
            var t = this.$element,
            e = this.opts.collapseClass;
            t.hide(),
            t.hasClass(e) && t.removeClass(e),
            this.$element.hasClass("ad-card") || this.$element.css("height", "auto")
        },
        active: function() {
            var t = this.opts.collapseClass,
            e = !this.$element.hasClass(t);
            e || this.toggleState();
            var s = this.opts.activeClass;
            this.$element.hasClass(s) || this.$element.addClass(s)
        },
        disactive: function() {
            var t = this.opts.activeClass;
            this.$element.hasClass(t) && this.$element.removeClass(t)
        },
        checkState: function(t) {
            var e = this.opts.dataKey,
            i = this.curState.hasContent,
            a = e && this.imgData ? this.imgData[e] : null,
            n = e ? t[e] : null,
            o = n && (!s.isArray(n) || n.length);
            return "decoration_sim" === e ? o = !1 : void 0,
            t.decoration_sim && "decoration_sim" === e ? o = !0 : void 0,
            {
                hasContent: o,
                changed: i != o || o && a != n,
                dataObj: n
            }
        },
        getData: function(t) {
            var e = this.opts.dataKey;
            return e ? t[e] : null
        },
        updateView: function() {},
        getDataByPosId: function(t, e) {
            if (!t || !e) return null;
            for (var s = null,
            i = 0; i < e.length; i++) e[i].Tag === t && (s = e[i]);
            return s
        }
    }),
    e
});;
/*!searchdetail:widget/ui/controls/card/nsAdII_leftBottomButton/leftBottomButton.js*/
define("searchdetail:widget/ui/controls/card/nsAdII_leftBottomButton/leftBottomButton",
function(t) {
    function e(t, e) {
        e = n.extend({
            pn: -1,
            spn: -1,
            itemTpl: '<a class="leftBottomButton" id="leftBottomButton1" target="_blank" href="${adLink1}">${adButtonText1}</a>\n<a class="leftBottomButton" id="leftBottomButton2" target="_blank" href="${adLink2}">${adButtonText2}</a>',
            tpl: "",
            layerTpl1: ['<p>本搜索结果为<a target="_blank" href="http://e.baidu.com/">商业推广</a>信息，请注意可能的风险。百度推出', '<a target="_blank" href="http://baozhang.baidu.com/guarantee/">网民权益保障计划</a>，', '<a target="_blank" href="https://passport.baidu.com/">登录</a>搜索有保障。</p>'].join(""),
            layerTpl2: ['<p>本搜索结果为<a target="_blank" href="http://e.baidu.com/">商业推广</a>信息，请注意可能的风险。', '您当前为登录状态，已参加<a target="_blank" href="http://baozhang.baidu.com/guarantee/">网民权益保障计划</a>。'].join("")
        },
        e),
        a.call(this, t, e)
    }
    var n = t("common:widget/ui/base/base"),
    i = t("common:widget/ui/base/events"),
    o = (t("searchdetail:widget/ui/utils/lib"), t("searchdetail:widget/ui/utils/imghelper"), t("common:widget/ui/juicer/juicer")),
    a = t("searchdetail:widget/ui/controls/card/base/base"),
    s = t("searchdetail:widget/ui/statistic/statistic-core");
    return n.extend(e.prototype, i, a.prototype, {
        checkState: function(t) {
            var e = this.getDataByPosId("pc_detail_slider_left_bottom_button", t.fbResult),
            i = !!e;
            return ! i && n("#srcPic").find(".fb-leftBottomButton-wrapper").remove(),
            !i && n("#srcPic").find(".tuiguang-btn").remove(),
            !i && n("#srcPic").find(".tuiguang-info").remove(),
            {
                hasContent: i,
                changed: i,
                dataObj: []
            }
        },
        addSpread: function(t) {
            var e = this,
            i = n("#srcPic").find(".tuiguang-btn"),
            o = n("#srcPic").find(".tuiguang-info"),
            a = !t.get("userName");
            o.empty().append(a ? e.opts.layerTpl1: e.opts.layerTpl2),
            o.css("display", "none"),
            i.off("click"),
            o.off("click"),
            o.off("hover"),
            i.on("click",
            function() {
                o.show()
            }),
            e.clickTips = setTimeout(function() {
                o.hide()
            },
            4e3),
            o.hover(function() {
                o.show(),
                clearTimeout(e.clickTips)
            },
            function() {
                e.clickTips = setTimeout(function() {
                    o.hide()
                },
                4e3)
            }),
            o.on("click",
            function() {
                o.hide()
            })
        },
        resize: function(t) {
            var e = n("#srcPic"),
            t = t || e.find(".currentImg") || e.find("img"),
            i = e.find(".fb-leftBottomButton-wrapper"),
            o = e.find(".tuiguang-btn"),
            a = e.find(".tuiguang-info"),
            s = t.width() || 0,
            c = t.height() || 0,
            d = t.position() ? t.position().left: 0,
            p = t.position() ? t.position().top: 0,
            u = i.height();
            i.css("top", p + c - u + "px"),
            i.css("left", d + "px"),
            i.width(s + "px"),
            o.css({
                top: p + "px",
                left: d + s - 35 + "px"
            }),
            a.css({
                top: p + "px",
                left: d + s - 281 + "px"
            })
        },
        updateView: function(t, e) {
            var i = this,
            a = n("#srcPic"),
            c = a.find(".fb-leftBottomButton-wrapper"),
            d = (a.find(".currentImg"), "pc_detail_slider_left_bottom_button"),
            p = this.getDataByPosId(d, t.fbResult),
            u = p.Items[0].Images,
            r = p.Items[0].BrandName,
            l = {};
            c[0] || (a.append('<div class="fb-leftBottomButton-wrapper"></div>'), a.append('<span class="tuiguang-btn">广告</span><div class="tuiguang-info"></div>'), c = a.find(".fb-leftBottomButton-wrapper"), i.resize()),
            n(u).each(function(t, e) {
                "1" === e.AdPosition && (l = n.extend({
                    adLink1: e.AdLink,
                    adButtonText1: e.AdTitle
                },
                l)),
                "2" === e.AdPosition && (l = n.extend({
                    adLink2: e.AdLink,
                    adButtonText2: e.AdTitle
                },
                l))
            }),
            (this.opts.pn !== e.get("pn") || this.opts.spn !== e.get("spn")) && (this.opts.pn = e.get("pn"), this.opts.spn = e.get("spn"), s.send("10.1010100", {
                as: r,
                pos: d,
                subpos: "0",
                shownum: "2",
                matcont: l.adButtonText1,
                materialNum: "2"
            }), s.send("10.1010100", {
                as: r,
                pos: d,
                subpos: "1",
                shownum: "2",
                matcont: l.adButtonText2,
                materialNum: "2"
            })),
            c.empty().append(o(i.opts.itemTpl, l)),
            n("#leftBottomButton1").click(function() {
                s.send("10.1010101", {
                    as: r,
                    pos: d,
                    subpos: "0",
                    matcont: l.adButtonText1,
                    tgTo: 1
                })
            }),
            n("#leftBottomButton2").click(function() {
                s.send("10.1010101", {
                    as: r,
                    pos: d,
                    subpos: "1",
                    matcont: l.adButtonText2,
                    tgTo: 1
                })
            }),
            i.addSpread(e)
        }
    }),
    e
});;
/*!searchdetail:widget/ui/statistic/avatar-statistic.js*/
define("searchdetail:widget/ui/statistic/avatar-statistic",
function(t, a, e) {
    var i = t("searchdetail:widget/ui/app/pagemodel"),
    n = t("common:widget/ui/utils/utils"),
    r = n.ihttpsAgent("http://bzclk.baidu.com") + "/7.gif";
    e.exports = function() {
        function t(t) {
            if (null === t || "object" != typeof t) return t;
            var a = [];
            for (var e in t)"" !== e && (a[a.length] = e + "=" + t[e]);
            return a.join("&")
        }
        return function(a, e) {
            var n = {
                type: "avatar",
                app: "pc",
                page: "detail",
                wd: i.data.queryWordEnc,
                pn: i.data.pn
            };
            n.adid = a,
            n.etype = e;
            var c = new Image;
            c.src = r + "?" + t(n) + "&_=" + +new Date
        }
    } ()
});;
/*!searchdetail:widget/ui/controls/imagedetail/imagedetail.js*/
define("searchdetail:widget/ui/controls/imagedetail/imagedetail",
function(t) {
    function e(t, e) {
        this._pageModel = e.pageModel,
        this.$pnl = i(t),
        this.$img = this.$pnl.find("img"),
        this.$desc = i(null),
        this._imgInited = !0,
        this._showFirstObjUrl = !0,
        this.dutuAnchor = new h,
        this.timeout = null,
        this.mouseWheelFlag = !0,
        this.textLinkAd = new r(this.$pnl.find(".img-wrapper .text-link-ads")),
        i('<div class="currentImg-adtext" style="display:none"><p></p></div>').insertAfter(".currentImg"),
        this.fbLeftBottomButton = new n,
        this.$img.length ? (alog && alog("speed.set", "c_imginsert", +new Date), alog.fire && alog.fire("mark")) : (this.$img = i("<img />"), document.body.appendChild(this.$img[0]), this._imgInited = !1, this._showFirstObjUrl = !1),
        this.setJsaction(),
        this.opts = i.extend({
            minScale: .1,
            maxScale: 10,
            descTpl: ""
        },
        e),
        this.data = {},
        this.scale = 1,
        this.dragSupport = null,
        this.wheelZoomable = !1
    }
    var i = t("common:widget/ui/base/base"),
    s = (t("common:widget/ui/utils/utils"), t("common:widget/ui/base/events")),
    a = t("searchdetail:widget/ui/utils/lib"),
    o = t("searchdetail:widget/ui/controls/imagedetail/dragsupport"),
    h = t("searchdetail:widget/ui/controls/imagedetail/dutuanchor/dutuanchor"),
    r = t("searchdetail:widget/ui/controls/imagedetail/textlinkad/textlinkad"),
    n = t("searchdetail:widget/ui/controls/card/nsAdII_leftBottomButton/leftBottomButton"),
    l = t("searchdetail:widget/ui/statistic/avatar-statistic"),
    g = t("searchdetail:widget/ui/statistic/statistic-core");
    return i.extend(e.prototype, s, {
        errImgData: {
            bigImgUrl: "//img0.bdstatic.com/img/image/error.gif",
            width: 318,
            height: 73
        },
        setOptions: function(t) {
            i.extend(this.opts, t)
        },
        init: function() {
            var t = this;
            this.$img.length && this.dutuAnchor.init(this.$pnl, this.$img);
            /macintosh|mac os x/i.test(navigator.userAgent); ! i.browser.mozilla || "onmousewheel" in document.body ? this.$pnl.on("mousewheel", this._onMouseWheelHandler.bind(this)) : this.$pnl.on("DOMMouseScroll", this._onMouseWheelHandler.bind(this)),
            t.group = t.opts.pageModel && t.opts.pageModel.getAbTestGroup(),
            t.group && "prevnextarrow" == t.group ? (t.$pnl.on("mouseleave",
            function() {
                i(this).parent("#container").removeClass("left right")
            }), t.$pnl.children(".img-wrapper").on("mousemove",
            function(e) {
                var s = e || window.event,
                a = i(t.$img).width(),
                o = i(t.$img).offset().left,
                h = s.pageX,
                r = (s.pageY, (h - o) / a),
                n = (i(this).parent().siblings(".img-prev"), i(this).parent().siblings(".img-next"), "");.3 > r ? (i(this).removeClass("rightArrow").addClass("leftArrow"), i(this).closest("#container").removeClass("right").addClass("left"), i(this).closest("#container").find(".img-next").css("visibility", "hidden"), i(this).closest("#container").find(".img-prev").css("visibility", "visible"), n = "点击上翻") : (i(this).removeClass("leftArrow").addClass("rightArrow"), i(this).closest("#container").removeClass("left").addClass("right"), i(this).closest("#container").find(".img-prev").css("visibility", "hidden"), i(this).closest("#container").find(".img-next").css("visibility", "visible"), n = "点击下翻"),
                t.$img.attr("title", t.wheelZoomable ? "可拖动": n)
            })) : (t.$pnl.find("img").css("cursor", "pointer"), this.$img.on("click",
            function() {
                if (t.data && (!t.dragSupport || !t.dragSupport.enabled)) {
                    if (!t.data.fromURL || "http://" === t.data.fromURL) return;
                    window.open(a.getRedirectUrl(t.data.fromURL, t.data.objURL, t.data.replaceUrl)),
                    t.dispatchEvent("linkout")
                }
                1 === +t.data.adType && l(t.data.adid, "clk")
            })),
            this.opts.descTpl && (this.$desc = i(this.opts.descTpl)),
            this.on("scaleChanged",
            function() {
                t.dutuAnchor.refreshPos(t.scale),
                t._repositionTextLinkAd(),
                t.fbLeftBottomButton.resize(t.$img)
            }),
            this.textLinkAd.on(r.EventType.AD_UPDATE,
            function() {
                t.autoScale()
            })
        },
        _initImg: function() {
            this.opts.descTpl && this.$desc.appendTo(this.$pnl);
            var t = this;
            this.$img.get(0).onload = function() {
                t._imgloaded()
            },
            this.$img.appendTo(this.$pnl),
            this._imgInited = !0,
            this.dutuAnchor.init(this.$pnl, this.$img),
            this.textLinkAd.reRender(),
            alog && alog("speed.set", "c_imginsert", +new Date),
            alog.fire && alog.fire("mark"),
            a.logTime("imginsert", window.pageStartTime, (new Date).getTime())
        },
        _imgloaded: function() {
            alog && alog("speed.set", "c_firstPageComplete", +new Date),
            alog.fire && alog.fire("mark"),
            this.$img.get(0).onload = null
        },
        update: function(t, e) {
            this.updateData(e.get("imgData"), e.get("rootImg"), e)
        },
        updateData: function(t, e, s) {
            this.group = t.group;
            var o = t.key != this.data.key;
            if (o || t.bigImgUrl != this.data.bigImgUrl) {
                e = e || t,
                this.setDraggable(!1);
                var h = this.scale;
                if (o && (this.scale = 1), this._imgInited && this.$img.attr("src") != t.bigImgUrl) {
                    var r = this.$img[0];
                    r.onload = r.onerror = null
                }
                if (t && t.bigImgUrl) {
                    var n = !0;
                    i("#dutu-anchor-wrapper").hide();
                    var l = this._showImg(t, e, s);
                    l || (this.scale = h, this.dispatchEvent("scaleChanged", {
                        scale: this.scale
                    }))
                } else this._showThumbImg(t);
                if (this._imgInited || this._initImg(), t.bigImgUrl == t.objURL) {
                    if (this._showFirstObjUrl && alog) {
                        var d = (new Date).getTime() - g.imgViewStart;
                        alog && alog("speed.set", "p_switchimgobjshow", d),
                        alog.fire && alog.fire("mark"),
                        o && (alog && alog("speed.set", "p_switchimgthumbshow", d), alog.fire && alog.fire("mark"))
                    }
                    this._showFirstObjUrl || (this._showFirstObjUrl = !0, alog && alog("speed.set", "c_imgobjshow", +new Date), alog.fire && alog.fire("mark"), a.logTime("imgobjshow", window.pageStartTime, (new Date).getTime()))
                } else {
                    var c = (new Date).getTime() - g.imgViewStart;
                    this._showFirstObjUrl && alog && alog("speed.set", "p_switchimgthumbshow", c),
                    alog.fire && alog.fire("mark")
                } !! n || this.dutuAnchor.update(t, this.scale, s)
            }
        },
        update_dutuAnchor: function(t, e) {
            this.dutuAnchor.update(t, this.scale, e, !0)
        },
        _showImg: function(t, e, s) {
            {
                var a = this,
                o = !1,
                h = (i(".img-wrapper .currentImg").length > 0, new i.Deferred, t.bigImgUrl),
                r = t.objURL;
                t.replaceUrl
            }
            e = e || {};
            var n = this.data;
            this.data = i.extend({},
            t),
            this.$img.get(0).onload = this.$img.get(0).onerror = function() {
                a.$img.get(0).onload = a.$img.get(0).onerror = null,
                a.$img.show(),
                o = !0,
                i("#dutu-anchor-wrapper").show(),
                a.dutuAnchor.update(t, a.scale, s),
                a._repositionTextLinkAd(),
                a.fbLeftBottomButton.resize(a.$img)
            };
            var l = i("#hdFirstImgObj"),
            g = !1;
            220 === l.width() && 159 === l.height() && (g = !0),
            l.attr("data-ispreload") && "1" === i(".currentImg").attr("data-ispreload") && !g && (t.bigImgUrl = l.attr("src"));
            var d = new Image;
            return d.onload = function() {
                a.data.__idx_ === t.__idx_ && a.$img.attr("src") !== r && a.$img.attr("src", h)
            },
            d.src = h,
            a.$img.height(),
            this.$desc.text(e.setTitle),
            e.setTitle ? this.$desc.show() : this.$desc.hide(),
            n.width != t.width || n.height != t.height ? (n.width && !o && a.$img.hide(), a.autoScale(), !0) : (a.$img.show(), o = !1, !1)
        },
        _showThumbImg: function(t) {
            this.data = i.extend({},
            t);
            var e = this.$img[0];
            if (this.$img.attr("src") == t.bakUrl) this.$img.css({
                width: "auto",
                height: "auto"
            }),
            this._thumbLoaded(t, e.offsetWidth, e.offsetHeight);
            else {
                var s = this;
                e.onload = function() {
                    s._thumbLoaded(t, e.offsetWidth, e.offsetHeight)
                },
                e.onerror = function() {
                    s._thumbLoaded(t, 0, 0)
                },
                this.$img.attr("src", t.bakUrl).css({
                    width: "auto",
                    height: "auto"
                })
            }
        },
        _thumbLoaded: function(t, e, i) {
            var s = this.$img[0];
            if (s.onload = s.onerror = null, this.data.key == t.key) {
                var a = {
                    key: t.key,
                    bigImgUrl: t.bakUrl,
                    width: e,
                    height: i
                };
                0 >= e && (a.width = this.errImgData.width, a.height = this.errImgData.height, this.$img.attr("src", this.errImgData.bigImgUrl)),
                this.data = a,
                this._updateImageStyle(this.$img, {
                    width: a.width,
                    height: a.height
                }),
                this.autoScale()
            }
        },
        resetSize: function(t, e) {
            this.wheelZoomable || this.autoScale(t, e)
        },
        autoScale: function(t, e) {
            t = t || this.getPnlWidth(),
            e = e || this.getPnlHeight();
            var s = function(i, s) {
                return {
                    top: Math.floor((e - s) / 2),
                    left: Math.floor((t - i) / 2)
                }
            },
            a = this.data.width,
            o = this.data.height;
            t >= a && e >= o || (t / e > a / o ? (a = a * e / o, o = e) : (o = o * t / a, a = t));
            var h = s(a, o),
            r = this._getReservedHeight();
            r.reserve && (h.top = h.top + r.topHeight),
            this._updateImageStyle(this.$img, i.extend({
                width: a,
                height: o
            },
            h)),
            this._updateDescPos(t, e, a, o, h),
            this.scale = a / this.data.width,
            this.dispatchEvent("scaleChanged", {
                scale: this.scale
            })
        },
        _updateImageStyle: function(t, e) {
            var s = 2,
            a = {},
            o = {};
            if (i.isNumeric(e.left) || i.isNumeric(e.top)) {
                var h = {
                    left: parseFloat(t.css("left")) || 0,
                    top: parseFloat(t.css("top")) || 0
                },
                r = (i.isNumeric(e.left) ? Math.abs(e.left - h.left) : 0) + (i.isNumeric(e.top) ? Math.abs(e.top - h.top) : 0);
                r >= s && (a.left = (i.isNumeric(e.left) ? e.left: h.left) + "px", o.left = parseInt(a.left, 0) + "px", a.top = (i.isNumeric(e.top) ? e.top: h.top) + "px", o.top = a.top)
            }
            e.width >= 0 && (a.width = e.width + "px", o.width = a.width),
            e.height >= 0 && (a.height = e.height + "px"),
            t.css(a),
            o.top && (o.top = parseInt(o.top, 0) + parseInt(i(".currentImg").height(), 0) - 30 + "px"),
            o.width && parseInt(o.width, 0) > parseInt(i("#srcPic").width(), 0) && (o.width = i("#srcPic").width(), o.left = "0"),
            a.height && parseInt(a.height, 0) > parseInt(i("#srcPic").height(), 0) && (o.top = parseInt(i("#srcPic").height(), 0) - 30 + "px"),
            i(".currentImg-adtext").css(o)
        },
        _getImagePosition: function(t) {
            return {
                left: parseFloat(t.css("left")) || 0,
                top: parseFloat(t.css("top")) || 0
            }
        },
        _getReservedHeight: function() {
            var t = this.textLinkAd.getHeight();
            return {
                reserve: 0 !== this._pageModel.get("firstPic") && !!t,
                topHeight: 48,
                bottomHeight: t
            }
        },
        _updateDescPos: function(t, e, i, s, a) {
            var o = !!this.$desc.text();
            if (o) if (200 > i || 100 > s) this.$desc.hide();
            else {
                this.$desc.show();
                var h = Math.min(t, i + Math.min(a.left, 0)),
                r = Math.max(0, a.left),
                n = Math.min(a.top + s, e) - (this.$desc.height() || 32);
                this.$desc.width(h).css({
                    top: n,
                    left: r
                })
            }
        },
        zoomChange: function(t) {
            this.zoom(t)
        },
        zoom: function(t, e) {
            var i = t < this.opts.minScale;
            if (t = Math.max(this.opts.minScale, Math.min(t, this.opts.maxScale)), t && t != this.scale) {
                e = e || this.getZoomCenter();
                var s = this.$img,
                a = this.data.width,
                o = this.data.height,
                h = s.width(),
                r = s.height(),
                n = this.getPnlWidth(),
                l = this.getPnlHeight(),
                g = a * t,
                d = o * t,
                c = 100,
                m = this._getImagePosition(s),
                p = {
                    left: g / h * (m.left - e.x) + e.x,
                    top: d / r * (m.top - e.y) + e.y
                };
                p.left + g < c ? p.left = c - g: p.left > n - c && (p.left = n - c),
                p.top + d < c ? p.top = c - d: p.top > l - c && (p.top = l - c),
                this._updateImageStyle(s, {
                    width: g,
                    height: d,
                    top: p.top,
                    left: p.left
                }),
                this.scale = t,
                this._updateDescPos(n, l, g, d, p),
                this.dispatchEvent("scaleChanged", {
                    scale: this.scale
                }),
                i || this.setDraggable(!0)
            }
        },
        getPnlWidth: function() {
            return this.$pnl.width()
        },
        getPnlHeight: function() {
            var t = this.$pnl.height(),
            e = this._getReservedHeight();
            return t -= e.reserve ? e.topHeight + e.bottomHeight: e.bottomHeight
        },
        getZoomCenter: function() {
            var t = this.$img,
            e = this._getImagePosition(t),
            i = e.left + t.width() / 2,
            s = e.top + t.height() / 2;
            return {
                x: i,
                y: s
            }
        },
        setDraggable: function(t) {
            this.wheelZoomable = t;
            var e = this;
            if (t && !this.dragSupport && (this.dragSupport = e.group && "prevnextarrow" == e.group ? new o(this.$pnl, this.$img, {
                cursor: ""
            }) : new o(this.$pnl, this.$img), this.dragSupport.on("startMove",
            function() {
                e.dutuAnchor.$element.addClass("hide"),
                e.$desc.hide()
            }), e.group && "prevnextarrow" == e.group && this.dragSupport.on("ingMove",
            function() {
                i(e.$pnl).find(".img-wrapper").addClass("dragging"),
                i(e.$img).css("cursor", "url(//img0.bdstatic.com/img/image/grabhand.cur), move")
            }), this.dragSupport.on("endMove",
            function() {
                e.dutuAnchor.$element.removeClass("hide"),
                e.dutuAnchor.refreshPos(e.scale);
                var t = !!e.$desc.text();
                t && e._updateDescPos(e.getPnlWidth(), e.getPnlHeight(), e.$img.width(), e.$img.height(), e.$img.position()),
                e.group && "prevnextarrow" == e.group && setTimeout(function() {
                    i(e.$pnl).find(".img-wrapper").removeClass("dragging"),
                    i(e.$img).css("cursor", "")
                },
                0)
            })), this.dragSupport && (t ? this.dragSupport.enable() : this.dragSupport.disable()), e.group && "prevnextarrow" == e.group) {
                var s = "";
                s = this.$pnl.find(".img-wrapper").hasClass("leftArrow") ? "点击上翻": this.$pnl.find(".img-wrapper").hasClass("rightArrow") && "点击下翻",
                this.$img.attr("title", t ? "可拖动": s)
            } else this.$img.attr("title", t ? "可拖动": e.data.fromURL ? "点击查看源网页": ""),
            !t && this.$img.css("cursor", e.data.fromURL ? "pointer": "")
        },
        setJsaction: function() {
            this.$img.attr("log-rightclick", "p=5.102")
        },
        _onMouseWheelHandler: function(t) {
            var e = this,
            i = /macintosh|mac os x/i.test(navigator.userAgent);
            t = t.originalEvent || t || window.event;
            var s = Math.abs(t.deltaY),
            a = /^([0-9])[0-9]*(\\.\\w*)?$/;
            if (window.samplekey.match("UI_PC_MOUSEWHEEL:1") && i && a.test(s) || window.samplekey.match("UI_PC_MOUSEWHEEL:1") && !i && !a.test(s)) {
                var o = i ? 45 : 100;
                this.mouseWheelFlag && (e.wheelZoomable ? e.processWheelZoom(t) : e._processWheelSwitch(t), t.preventDefault && t.preventDefault(), t.returnValue = !1, this.mouseWheelFlag = !1),
                clearTimeout(this.timeout),
                this.timeout = setTimeout(function() {
                    e.mouseWheelFlag = !0
                },
                o)
            } else e.wheelZoomable ? e.processWheelZoom(t) : e._processWheelSwitch(t),
            t.preventDefault && t.preventDefault(),
            t.returnValue = !1
        },
        throttle: function(t, e, i) {
            var s = !1;
            return i || (i = {}),
            function() {
                var a = this,
                o = arguments;
                s || (i.leading !== !1 && t.apply(a, o), s = !0, setTimeout(function() {
                    i.trailing !== !1 && t.apply(a, o),
                    s = !1
                },
                e))
            }
        },
        _processWheelSwitch: function(t) {
            var e = 0;
            t.wheelDelta ? e = t.wheelDelta / 240 : t.detail && (e = -t.detail / 6),
            e && e > 0 ? this.dispatchEvent("wheelPrev") : e && 0 > e && this.dispatchEvent("wheelNext")
        },
        processWheelZoom: function(t) {
            var e = t.clientX - 14,
            i = t.clientY - 47,
            s = t.wheelDelta || -1 * t.detail,
            a = .25 * (s > 0 ? 1 : -1);
            this.zoom((1 + a) * this.scale, {
                x: e,
                y: i
            })
        },
        _repositionTextLinkAd: function() {
            if (this.textLinkAd.isShow()) {
                var t = "none" === this.$img.css("display");
                t && this.$img.show();
                var e = this.$img.position();
                e.left = e.left + (this.$img.width() / 2 - this.$pnl.find(".img-wrapper .text-link-ads").width() / 2),
                this.textLinkAd.resetPosition({
                    left: e.left,
                    top: e.top,
                    width: this.$img.width(),
                    height: this.$img.height()
                }),
                t && this.$img.hide()
            }
        }
    }),
    e
});;
/*!searchdetail:widget/ui/databinder/databind.js*/
define("searchdetail:widget/ui/databinder/databind",
function(n) {
    var a = (n("common:widget/ui/base/base"), {
        bind: function(n, a, e, i, t) {
            if (n && a && e && i) {
                var r;
                if (n.addEventListener(a + ":changed",
                function() {
                    var t = n.get(a);
                    r != t && e[i].call(e, t, n),
                    r = t
                }), t) {
                    var d = e[t];
                    e[t] = function() {
                        var i = d.apply(e, arguments);
                        return n.set(a, i),
                        i
                    }
                }
            }
        }
    });
    return a
});;
/*!searchdetail:widget/ui/controls/pressbtn/pressbtn.js*/
define("searchdetail:widget/ui/controls/pressbtn/pressbtn",
function(s) {
    function e(s, e) {
        this.$element = s,
        this._pressing = !1,
        this._ignoreNextClick = !1,
        this._pressDelay = null,
        this.options = t.extend({
            pressDelay: 150,
            disabledClass: "disabled",
            disabledTitle: ""
        },
        e)
    }
    var t = s("common:widget/ui/base/base"),
    n = s("common:widget/ui/utils/utils"),
    i = s("common:widget/ui/base/events");
    return t.extend(e.prototype, i, {
        init: function() {
            this.$element = t(this.$element),
            this._bindBtnEvent()
        },
        setEnable: function(s) {
            var e = this.options.disabledClass,
            t = this.options.disabledTitle,
            n = this.$element;
            s && n.hasClass(e) ? (n.removeClass(e), t && n.attr("title", "")) : s || n.hasClass(e) || (n.addClass(e), t && n.attr("title", t), this._pressing && this._presssEnd())
        },
        getEnable: function() {
            return ! this.$element.hasClass(this.options.disabledClass)
        },
        _bindBtnEvent: function() {
            var s = this.$element,
            e = this,
            t = n.throttle(function() {
                e._ignoreNextClick || e.dispatchEvent("clicked"),
                e._ignoreNextClick = !1
            },
            e.options.pressDelay);
            s.on("click",
            function(s) {
                s.preventDefault(),
                e.getEnable() && t()
            }),
            s.on("mousedown",
            function() {
                e.getEnable() && (e._pressDelay = n.delay(function() {
                    e._pressDelay = null,
                    e._pressing || (e._pressing = !0, e.dispatchEvent("pressing"))
                },
                e.options.pressDelay))
            }),
            s.on("mouseup",
            function() {
                e.getEnable() && (e._ignoreNextClick = e._pressing, e._presssEnd())
            }),
            s.on("mouseout",
            function() {
                e.getEnable() && e._presssEnd()
            })
        },
        _presssEnd: function() {
            this._pressDelay && this._pressDelay.cancel(),
            this._pressDelay = null,
            this._pressing && (this._pressing = !1, this.dispatchEvent("pressEnd"))
        }
    }),
    e
});;
/*!searchdetail:widget/ui/controls/imgtoolbar/zoomview/zoomview.js*/
define("searchdetail:widget/ui/controls/imgtoolbar/zoomview/zoomview",
function(t) {
    function i(t, i) {
        this.elements = {
            zoomIn: t.zoomIn,
            zoomOut: t.zoomOut,
            scale: t.scale,
            zoomToggle: t.zoomToggle,
            img: t.img,
            imgPnl: t.imgPnl
        },
        this.lastImgModel = null,
        this.zoomInBtn = null,
        this.zoomOutBtn = null,
        this.zoomToggle = null,
        this._timerFrag = e("<div></div>"),
        this.options = e.extend({
            minScale: .1,
            maxScale: 10,
            step: .25
        },
        i),
        this.scale = 1
    }
    var e = t("common:widget/ui/base/base"),
    n = t("common:widget/ui/base/events"),
    o = t("searchdetail:widget/ui/controls/pressbtn/pressbtn");
    return e.extend(i.prototype, n, {
        init: function() {
            var t = this.elements;
            for (var i in t) t.hasOwnProperty(i) && (this.elements[i] = e(t[i]));
            this.zoomInBtn = new o(t.zoomIn),
            this.zoomInBtn.init(),
            this.zoomOutBtn = new o(t.zoomOut),
            this.zoomOutBtn.init(),
            this._bindEvent()
        },
        _bindEvent: function() {
            this._bindBtnEvent(this.zoomInBtn, !0),
            this._bindBtnEvent(this.zoomOutBtn, !1);
            var t = this;
            this.elements.zoomToggle.on("click",
            function() {
                var i = e(this);
                if (!i.hasClass("btn-imgtoggle-disable")) {
                    var n = "1" == i.attr("data-adapt");
                    t.fire("viewModeChanged", {
                        mode: n ? "adapt": "origin"
                    })
                }
            })
        },
        _bindBtnEvent: function(t, i) {
            var e = this,
            n = this.options.step * (i ? 1 : -1),
            o = i ? this.options.maxScale: this.options.minScale;
            t.on("clicked",
            function() {
                e._timerFrag.stop(),
                e.changeScale(n, !0)
            }),
            t.on("pressing",
            function() {
                e._startChangeTimer(o)
            }),
            t.on("pressEnd",
            function() {
                e._timerFrag.stop()
            })
        },
        _getZoomDuration: function(t, i, e) {
            return 1 > i ? 1 >= t ? (t - i) * e: (1 - i + (t - 1) / this.options.maxScale) * e: t >= 1 ? (i - t) / this.options.maxScale * e: ((i - 1) / this.options.maxScale + (1 - t)) * e
        },
        _startChangeTimer: function(t) {
            var i = this;
            this._timerFrag.width(this.scale).animate({
                width: t
            },
            {
                duration: this._getZoomDuration(this.scale, t, 2e3),
                easing: "linear",
                step: function(t) {
                    i.changeScale(t, !1)
                }
            })
        },
        changeScale: function(t, i) {
            var e = i ? (1 + t) * this.scale: t;
            return e = Math.min(e, this.options.maxScale),
            e = Math.max(e, this.options.minScale)
        },
        updateScale: function(t) {
            this.scale = t,
            this.elements.scale.text(Math.floor(100 * t) + "%"),
            this._updateToggleBtnState()
        },
        resetImgPnlSize: function() {
            this._updateToggleBtnState()
        },
        _updateToggleBtnState: function() {
            this.elements.img && 0 === this.elements.img.length && (this.elements.img = e("#srcPic img"));
            var t = this.elements,
            i = t.img.width(),
            n = t.img.height(),
            o = t.imgPnl.width(),
            s = t.imgPnl.height();
            i > o || n > s || 1 == this.scale ? t.zoomToggle.html('<span class="b-before"></span>合适尺寸<i></i>').attr("data-adapt", "1").attr("title", "合适尺寸") : t.zoomToggle.html('<span class="b-before"></span>原始尺寸<i></i>').attr("data-adapt", "").attr("title", "原始尺寸");
            var a = "btn-imgtoggle-disable";
            o >= i && s >= n && 1 == this.scale ? t.zoomToggle.hasClass(a) || t.zoomToggle.addClass(a) : t.zoomToggle.hasClass(a) && t.zoomToggle.removeClass(a)
        }
    }),
    i
});;
/*!searchdetail:widget/ui/controls/pop/pop.js*/
define("searchdetail:widget/ui/controls/pop/pop",
function(t) {
    function i(t) {
        t = e.extend({
            hasArrow: !0,
            hasClose: !0
        },
        t);
        var i = e('<div class="mod-pop" style="display:none;position:absolute;z-index:999;"><div class="content"></div></div>');
        i.attr("id", o.getUniqId("imgpop_")),
        t.className && i.addClass(t.className),
        t.hasArrow && i.append('<div class="arrow"><div class="arrow-bd"></div><div class="arrow-bg"></div></div>'),
        t.hasClose && i.append('<a class="pop-close" href="#" title="关闭"></a>'),
        this.$element = i,
        this.$content = i.find(".content"),
        this.$arrow = i.find(".arrow"),
        this.$close = i.find(".pop-close"),
        this.opts = t,
        this._inited = !1,
        this.triggerElement = null,
        this.visible = !1
    }
    var e = t("common:widget/ui/base/base"),
    s = t("common:widget/ui/utils/utils"),
    n = t("common:widget/ui/base/events"),
    o = t("searchdetail:widget/ui/utils/lib");
    return e.extend(i.prototype, n, {
        setContent: function(t) {
            this.$content.html(t)
        },
        init: function() {
            var t = this;
            this.$element = this.$element.appendTo(document.body),
            e(document).on("mousedown",
            function(i) { (!t.triggerElement || t.triggerElement[0] != i.target) && t.hide()
            }),
            this.$element.on("mousedown",
            function(t) {
                t.stopPropagation()
            }),
            this.$close.on("click",
            function(i) {
                i.preventDefault(),
                t.hide()
            }),
            this.opts.contentWidth = this.$content.width() || this.$element.width() - s.UI.getCssDigitValueSum(this.$content, ["border-left-width", "border-right-width", "padding-left", "padding-right"]),
            this.opts.contentHeight = this.$content.height(),
            this._inited = !0
        },
        setTrigger: function(t) {
            this.triggerElement = t
        },
        _beforeShow: function() {},
        refreshPos: function(t) {
            var i = this.triggerElement;
            if (this.visible && this._inited && i) {
                if ("none" == i.css("display")) return void this.hide();
                t = t || this.$arrow.position().left + this.$arrow.width() / 2;
                var e = i.offset(),
                s = this.$arrow.height(),
                n = i[0].offsetWidth,
                o = (i[0].offsetHeight, this.opts.contentHeight);
                this.$element.css({
                    top: e.top - o - s / 2,
                    left: e.left - t + n / 2
                })
            }
        },
        show: function() {
            this._inited || this.init();
            var t = this._beforeShow();
            if (!t) {
                this.visible = !0;
                var i = this.triggerElement;
                if (i && i.length) {
                    this.$element.show();
                    var e = this.opts.contentWidth,
                    s = this.$arrow.position().left + this.$arrow.width() / 2,
                    n = s / e,
                    o = this;
                    this.refreshPos(s),
                    this.$close.hide(),
                    this.$content.css({
                        width: 100,
                        height: 5,
                        "margin-left": (e - 100) * n
                    }).animate({
                        width: e,
                        height: this.opts.contentHeight
                    },
                    {
                        duration: 200,
                        step: function(t, i) {
                            "width" == i.prop && o.$content.css({
                                "margin-left": (e - t) * n,
                                opacity: t / e / 2
                            })
                        },
                        done: function() {
                            o.$content.css("opacity", 1).height(o.opts.contentHeight),
                            o.$close.show()
                        }
                    })
                } else this.$element.show()
            }
        },
        hide: function() {
            this.$content.stop(),
            this.$element.fadeOut("fast"),
            this.visible = !1
        }
    }),
    i
});;
/*!searchdetail:widget/ui/qrcode/qrcode.js*/
define("searchdetail:widget/ui/qrcode/qrcode",
function(e) {
    function t() {
        this.options = {
            background: "#ffffff",
            foreground: "#000000"
        }
    }
    function o() {}
    function r(e) {
        this.opts = i.extend({
            width: 130,
            height: 130
        },
        e),
        this.generator = i.browser.msie && i.browser.version <= 7 ? new t: new o
    }
    var i = e("common:widget/ui/base/base");
    return i.extend(t.prototype, {
        get: function(e, t, o) {
            var r = new i.Deferred,
            n = this,
            d = i.extend({
                width: t,
                height: o
            },
            n.options);
            return this._loadLib().then(function(t) {
                var o = n._createTable(t.QRCodeClass, e, d);
                o.css("margin-top", 0),
                r.resolve({
                    dom: o,
                    width: d.width,
                    height: d.height
                })
            }),
            r
        },
        _loadLib: function() {
            var e = new i.Deferred;
            return window.QRCode ? e.resolve({
                QRCodeClass: window.QRCode
            }) : i.getScript("//img0.bdstatic.com/img/image/qrcode.min.js").then(function() {
                e.resolve({
                    QRCodeClass: window.QRCode
                })
            }),
            e
        },
        _createTable: function(e, t, o) {
            var r = new e( - 1, QRErrorCorrectLevel.H);
            r.addData(t),
            r.make();
            var n = 3,
            d = 3,
            a = r.getModuleCount(),
            s = r.getModuleCount();
            o.width = n * a,
            o.height = d * s;
            for (var h = ["<table style='width:", o.width, "px;height:", o.height, "px;border:0px;margin:5px 0 5px 0;border-collapse:collapse;background-color:", o.background, ";'>"], c = 0; a > c; c++) {
                h.push("<tr style='height:", d, "px;'>");
                for (var g = 0; s > g; g++) h.push("<td style='width:", n, "px;background-color:", r.isDark(c, g) ? o.foreground: o.background, ";'></td>");
                h.push("</tr>")
            }
            return h.push("</table>"),
            i(h.join(""))
        }
    }),
    i.extend(o.prototype, {
        get: function(e, t, o) {
            var r = new i.Deferred,
            n = this;
            return this._loadLib().then(function(i) {
                var d = n._createImg(i.QRCodeClass, e);
                d.width(t).height(o),
                r.resolve({
                    dom: d,
                    width: t,
                    height: o
                })
            }),
            r
        },
        _loadLib: function() {
            var e = new i.Deferred;
            return window.qrcode ? e.resolve({
                QRCodeClass: window.qrcode
            }) : i.getScript("//img0.bdstatic.com/img/image/qrcode.plus.js").then(function() {
                e.resolve({
                    QRCodeClass: window.qrcode
                })
            }),
            e
        },
        _createImg: function(e, t) {
            t = t.replace(/^[\s\u3000]+|[\s\u3000]+$/g, "");
            var o = new e(10, "M");
            return o.addData(t),
            o.make(),
            i(o.createImgTag())
        }
    }),
    i.extend(r.prototype, {
        get: function(e) {
            return this.generator.get(e, this.opts.width, this.opts.height)
        }
    }),
    r
});;
/*!searchdetail:widget/ui/controls/imgtoolbar/qrcodepop/qrcodepop.js*/
define("searchdetail:widget/ui/controls/imgtoolbar/qrcodepop/qrcodepop",
function(e) {
    function i(e) {
        e = t.extend({
            className: "qrcode-pop",
            hasArrow: !0,
            hasClose: !0
        },
        e),
        h.call(this, e),
        this.elementSize = {
            width: 220,
            height: 205
        },
        this.codeImgSize = {
            width: 130,
            height: 130
        },
        this.$element.css(this.elementSize),
        this.setContent(s),
        this.imgData = null,
        this.imgChanged = !1,
        this.qrcodeBuilder = new o(this.codeImgSize)
    }
    var t = e("common:widget/ui/base/base"),
    h = e("searchdetail:widget/ui/controls/pop/pop"),
    o = e("searchdetail:widget/ui/qrcode/qrcode"),
    s = ['<p class="title-row">用手机二维码扫描器打开图片</p>', '<div class="qrcode"></div>', '<p class="sizeinfo"></p>'].join("");
    return t.extend(i.prototype, h.prototype, {
        update: function(e) {
            this.imgData = e,
            this.imgChanged = !0
        },
        _beforeShow: function() {
            if (this.imgChanged) {
                this.imgChanged = !1;
                var e = this.imgData,
                i = this.$element,
                t = this,
                h = this.elementSize,
                o = this.codeImgSize,
                s = e.width + "&#215;" + e.height;
                e.filesize && "0" != e.filesize && (s += " , " + e.filesize + "KB"),
                i.find(".sizeinfo").html(s),
                this.qrcodeBuilder.get(e.objURLHttp || e.objURL).then(function(e) {
                    var s = e.height - o.height + h.height;
                    t.$content.height(s),
                    i.find(".qrcode").html(e.dom).css({
                        width: e.width,
                        height: e.height
                    }),
                    t.opts.contentHeight = s
                })
            }
        }
    }),
    i
});;
/*!searchdetail:widget/ui/controls/imgtoolbar/downloadpop/downloadpop.js*/
define("searchdetail:widget/ui/controls/imgtoolbar/downloadpop/downloadpop",
function(t) {
    function i(t) {
        t = a.extend({
            className: "download-pop",
            hasArrow: !0,
            hasClose: !0,
            itemTpl: o
        },
        t),
        e.call(this, t),
        this.elementSize = {
            width: 320,
            height: 200
        },
        this.$element.css(this.elementSize),
        this.setContent(n),
        this.imgShallowData = null,
        this.imgData = null,
        this.imgChanged = !1,
        this.curState = {
            collapse: !1,
            hasContent: !1,
            pro: null,
            visible: !1
        },
        this.elements = {
            infoList: ".info-list"
        },
        this.liNum = 0,
        this._validData = null,
        this._validData2 = null
    } {
        var a = t("common:widget/ui/base/base"),
        e = t("searchdetail:widget/ui/controls/pop/pop"),
        o = ["<li>", '<p class="size-info">', '<span class="info-text info-size"></span>', '<span class="vsep">|</span><span class="info-text info-bytes"></span>', '<span class="vsep">|</span><span class="info-text info-type"></span>', '<span class="info-text info-bizhi-highlight">壁纸</span>', '<a class="download-btn" href="javascript:void(0);">下载</a>', "</p>", '<p class="url-info">', '<a class="src-site" href="" target="_blank">来自：<span></span></a>', "</p>", "</li>"].join(""),
        n = ['<p class="title-row">相同图片</p>', '<div class="sizeinfo"></div>', '<ul class="info-list" id="down-pop-info-list"></ul>', '<div class="bottom-download-btn">', '<a id="bottom-download-btn-link" href="">', '<div id="bottom-download-btn-link-size"></div><div>下载原图</div>', "</a>", "</div>"].join(""); ['<p class="download-tip" id="download-tip">tip</p>'].join("")
    }
    return a.extend(i.prototype, e.prototype, {
        checkWallpaperState: function(t) {
            this.opts.dataKey = "wallp_info";
            var i = BaseCardControl.prototype.checkState.call(this, t);
            if (i.hasContent && i.changed) {
                var e = window.screen.width,
                o = window.screen.height;
                this._validData = a(i.dataObj).filter(function(t, i) {
                    return i.w >= e && i.h >= o
                }),
                this._validData = a(this._validData).sort(function(t, i) {
                    return t.w != i.w ? t.w > i.w: t.h > i.h
                }),
                i.hasContent = !(!this._validData || !this._validData.length)
            } else this._validData = null;
            return i
        },
        checkSucaiState: function(t) {
            this.opts.dataKey = "sucai_info";
            var i = BaseCardControl.prototype.checkState.call(this, t);
            if (i.hasContent && i.changed) {
                var e = this;
                this._validData2 = a(i.dataObj).filter(function(t, i) {
                    return i.fm ? e.isEmpty(i.w) && e.isEmpty(i.dpi) && e.isEmpty(i.filesize) ? !1 : !0 : !1
                }),
                i.hasContent = !(!this._validData2 || !this._validData2.length)
            } else this._validData2 = null;
            return i
        },
        isEmpty: function(t) {
            return ! t || "0" == t
        },
        update: function(t) {
            this.imgData = t,
            this.imgChanged = !0,
            this.checkWallpaperState(t),
            this.checkSucaiState(t);
            var i = this._validData ? this._validData.length > 3 ? 3 : this._validData.length: 0,
            a = this._validData2 ? this._validData2.length > 2 ? 2 : this._validData2.length: 0,
            e = i + a;
            this._inited = !1,
            this.elementSize = {
                width: 320,
                height: 101 + 45 * e
            },
            this.$element.css(this.elementSize),
            this.$content.css(this.elementSize),
            this.init()
        },
        updateShallow: function(t) {
            this.imgShallowData = t
        },
        initDom: function(t, i, e, o, n) {
            var s = this,
            l = "sucai" === n ? !0 : !1;
            o = a(s.opts.itemTpl).appendTo(e);
            var d = o.find(".info-type"),
            h = o.find(".info-size"),
            p = o.find(".info-bytes"),
            c = o.find(".info-bizhi-highlight"),
            r = o.find(".download-btn"),
            f = o.find(".src-site"),
            w = {
                s: (i.w || "0") + "x" + (i.h || "0")
            },
            u = i.fm || imghelper.getFileType(i.objurl).split("?")[0];
            d.text(u.toUpperCase()),
            h.html(i.w + "&#215;" + i.h);
            var m = 1 * (i.size || 0),
            v = i.dpi;
            m ? p.text(imghelper.formatBytes(m, 0, Math.floor).toUpperCase()).show().prev().show() : v && v && v - 0 !== 0 ? p.text(v + "dpi").show().prev().show() : p.hide().prev().hide(); {
                var g = a.json.stringify(w) || "";
                "p=5.15&tag=card&fm=" + (l ? "sucai": "wallp") + "&site=" + encodeURIComponent(l ? i.furl: i.objurl) + "&pos=&ext=" + encodeURIComponent(g)
            }
            if (l ? (r.attr({
                href: i.furl,
                target: "_blank"
            }), c.css({
                display: "none"
            })) : r.attr({
                href: "/search/down?tn=download&word=download&ie=utf8&fr=detail&url=" + encodeURIComponent(i.objurl) + "&thumburl=" + encodeURIComponent(s.imgData.thumbURL)
            }), l) {
                var b = i.siteName || lib.getSiteName(i.s || i.site);
                f.attr("href", "http://" + i.site || "").find("span").text(utils.cutHtmlText(b, 14, "...")),
                f.attr("log-click", "p=5.15")
            } else f.parent().css({
                visibility: "hidden"
            });
            r.click(function(t) {
                t.stopImmediatePropagation(),
                statistic.send("5.15", {
                    tag: "card",
                    fm: l ? "sucai": "wallp",
                    site: encodeURIComponent(l ? i.furl: i.objurl),
                    pos: "",
                    ext: encodeURIComponent(g)
                })
            }),
            f.click(function(t) {
                t.stopImmediatePropagation(),
                statistic.send("5.15", {
                    tag: "card",
                    fm: l ? "sucai": "wallp",
                    site: encodeURIComponent(i.site),
                    pos: "",
                    ext: encodeURIComponent(g)
                })
            }),
            this.liNum += 1
        },
        _beforeShow: function() {
            var t, i = this,
            e = a("<ul></ul>"),
            o = this;
            a(this._validData).each(function(a, n) {
                return a > 2 ? !1 : void i.initDom.call(o, a, n, e, t, "wallp")
            }),
            a(this._validData2).each(function(a, n) {
                return a > 1 ? !1 : void i.initDom.call(o, a, n, e, t, "sucai")
            });
            var n = this._validData ? this._validData.length > 3 ? 3 : this._validData.length: 0,
            s = this._validData2 ? this._validData2.length > 2 ? 2 : this._validData2.length: 0,
            l = n + s;
            if (i.imgShallowData && "1" === i.imgShallowData.youtuType) return this.forbidDownloadTip(),
            !0;
            if (0 === l) return statistic.send("5.42", {}),
            window.open(a(".btn-download").attr("href")),
            !0;
            statistic.send("5.44", {});
            var d = [],
            h = [];
            s > 0 && (d.push("sucai"), h.push(1)),
            n > 0 && (d.push("wallp"), h.push(1)),
            statistic.send("5.1010000", {
                tn: "baiduimagedetail",
                tag: "card",
                fm: d.join(","),
                state: h.join(",")
            }),
            a("#down-pop-info-list").empty().append(e.children()),
            a("#bottom-download-btn-link-size").text(this.imgData.width + "X" + this.imgData.height),
            a("#bottom-download-btn-link").attr("href", a(".btn-download").attr("href")),
            a("#bottom-download-btn-link").click(function(t) {
                t.stopImmediatePropagation(),
                statistic.send("5.45", {})
            }),
            a(".download-tip").remove(),
            a.cookie("closedowntip", "1")
        },
        hide: function() {
            e.prototype.hide.call(this)
        },
        forbidDownloadTip: function() {
            var t = a(".download-tip"),
            i = a(".album-pnl"),
            e = a(".btn-download").offset().left,
            o = "left:" + (e > 500 ? e - 95 : 1e3) + "px;bottom:" + (i.height() + 10) + "px",
            n = ['<div class="download-tip" style="' + o + '">', '版权归作者所有，请勿商用<i class="download-tip-close">&#10006;</i>', "</div>"].join("");
            0 === t.length && i.before(n),
            a(window).on("resize",
            function() {
                var t = a(".btn-download").offset().left;
                a(".download-tip").css({
                    left: (t > 500 ? t - 95 : 1e3) + "px"
                })
            }),
            a(".download-tip-close").one("click",
            function() {
                a(this).parent().remove()
            })
        },
        downtip: function() {
            var t = a(".download-tip"),
            i = a(".album-pnl"),
            e = ['<div class="download-tip" style="left:' + ((a("#toolbar").width() - 737) / 2 + 579 - 95) + "px;bottom:" + (i.height() + 10) + 'px">素材和壁纸移动至这里<i class="download-tip-close">&#10006;</i></div>'].join("");
            if (0 === t.length) {
                i.before(e);
                var o = a(".btn-download").offset().left;
                window.samplekey.match("UI_PC_DETAIL_DOWNLOAD:1") && a(".download-tip").css({
                    left: (o > 500 ? o - 95 : 1e3) + "px"
                })
            }
            "1" !== a.cookie("closedowntip") ? (a(".download-tip").show(), a.cookie("closedowntip", "1")) : a(".download-tip").remove(),
            a(window).on("resize",
            function() {
                var t = a(".btn-download").offset().left;
                a(".download-tip").css({
                    left: (t > 500 ? t - 95 : 1e3) + "px"
                })
            }),
            a(".download-tip-close").one("click",
            function() {
                a(this).parent().remove(),
                a.cookie("closedowntip", "1")
            })
        }
    }),
    i
});;
/*!searchdetail:widget/ui/collections/albumpiccollection.js*/
define("searchdetail:widget/ui/collections/albumpiccollection",
function(e) {
    function t(e, t) {
        r.call(this),
        this.configCache({
            primaryKey: "picSrc"
        }),
        this.albumId = e,
        this.token = t || "",
        this.total = 0
    }
    var i = e("common:widget/ui/base/base"),
    r = e("common:widget/ui/arch/collection"),
    n = e("searchdetail:widget/ui/utils/lib"),
    c = e("common:widget/ui/browser-storage/browser-storage");
    return i.extend(t.prototype, r.prototype, {
        contains: function(e) {
            return !! this.getPic(e)
        },
        getPic: function(e) {
            var t = null;
            return this.get({
                picSrc: e
            }).then(function(e) {
                e && e.length && (t = e[0])
            }),
            t
        },
        addPic: function(e, t) {
            var r = this.getPic(e),
            n = new i.Deferred,
            c = this;
            if (r) n.reject(r);
            else {
                var o = this.albumId ? this._saveToServer: this._saveToLocal;
                o.call(this, e, t).always(function(r) {
                    if (r && "0" == r.errno) {
                        var o = i.extend({
                            picSrc: e
                        },
                        t);
                        c.put(o),
                        n.resolve(o)
                    } else n.reject()
                })
            }
            return n
        },
        _saveToServer: function(e, t) {
            var r = {
                app_id: 1002,
                album_id: this.albumId,
                "picture_src_list[]": [e],
                "surl[]": [t.surl || ""],
                "picture_name[]": [t.desc || ""],
                bdstoken: this.token,
                "contsign[]": [t.contsign]
            };
            return i.post("/picturefav/submit/url", r).then(function(e) {
                return n.parseResponse(e)
            })
        },
        getTotal: function() {
            return this.total
        },
        _saveToLocal: function(e, t) {
            var r = new i.Deferred,
            o = c.api.get({
                key: "_favpic_local_key"
            });
            o = i.parseJSON(o.value) || [];
            var s = !1;
            if (i.each(o,
            function(i, r) {
                return r.picUrl == e && r.desc == t.desc ? (s = !0, !1) : void 0
            }), this.total = o.length, !s) {
                o.push({
                    picUrl: e,
                    desc: t.desc,
                    originalUrl: t.surl,
                    detailUrl: window.location.href,
                    userId: n.getBaiduId()
                });
                try {
                    c.api.set({
                        key: "_favpic_local_key",
                        value: i.json.stringify(o),
                        expires: 2592e3
                    }),
                    this.total += 1
                } catch(a) {
                    return r.reject()
                }
            }
            return r.resolve({
                errno: "0"
            }),
            r
        }
    }),
    t
});;
/*!searchdetail:widget/ui/collections/albumcollection.js*/
define("searchdetail:widget/ui/collections/albumcollection",
function(e) {
    function t(e, t) {
        n.call(this, s),
        this.configCache({
            primaryKey: "id",
            indexes: ["name"]
        }),
        this.userId = e,
        this.token = t || "",
        this.picCollections = {},
        s.reqParams = {
            uid: e
        }
    }
    var a = e("common:widget/ui/base/base"),
    n = e("common:widget/ui/arch/collection"),
    i = e("searchdetail:widget/ui/collections/albumpiccollection"),
    r = e("searchdetail:widget/ui/utils/lib"),
    s = {
        url: "/picturefav/data/albumlist",
        reqParams: null,
        hasMore: !0,
        fetch: function(e, t) {
            var n = a.extend({},
            this.reqParams),
            i = this;
            if (!this.hasMore) {
                var r = new a.Deferred;
                return r.resolve({
                    offset: t
                }),
                r
            }
            return a.get(this.url, n, null, "text").then(function(e) {
                var t = i.parseResponse(e, n.pn);
                return i.hasMore = !1,
                t
            })
        },
        parseResponse: function(e) {
            e = r.parseResponse(e);
            return {
                offset: 0,
                total: e && e.length,
                dataSet: e
            }
        }
    };
    return a.extend(t.prototype, n.prototype, {
        get: function() {
            if (!this.userId) {
                var e = new a.Deferred;
                return e.resolve([]),
                e
            }
            return n.prototype.get.call(this)
        },
        getByName: function(e) {
            return n.prototype.get.call(this, {
                name: e
            }).then(function(e) {
                return e && e.length && e[0]
            })
        },
        addAlbum: function(e, t, n) {
            var i = new a.Deferred,
            s = this;
            return this.getByName(e).then(function(o) {
                if (o && o.id) i.reject({
                    data: o
                });
                else {
                    var l = {
                        album_name: e,
                        album_scope: n || 1,
                        album_category: t || "",
                        bdstoken: s.token
                    };
                    a.post("/albumlist/createalbum", l).always(function(t) {
                        if (t = r.parseResponse(t), t && t.status && "0" == t.status.code && t.data && t.data.album_id) {
                            var a = {
                                id: t.data.album_id,
                                name: t.data.album_name || e,
                                picture_num: 0
                            };
                            s.put(a),
                            i.resolve(a)
                        } else i.reject(t)
                    })
                }
            }),
            i
        },
        getPicCollection: function(e) {
            var t = e || "_default_",
            a = this.picCollections[t];
            return a || (a = new i(e, this.token), this.picCollections[t] = a),
            a
        }
    }),
    t
});;
/*!searchdetail:widget/ui/controls/imgtoolbar/favo/favopop.js*/
define("searchdetail:widget/ui/controls/imgtoolbar/favo/favopop",
function(t) {
    function e(t) {
        t = l.extend({
            className: "favo-pop",
            hasArrow: !0,
            hasClose: !0
        },
        t),
        n.call(this, t),
        this.setContent(a),
        this.descInput = null,
        this.albumListCtrl = null,
        this.newAlbumNameEle = null
    }
    var l = t("common:widget/ui/base/base"),
    i = (t("common:widget/ui/utils/utils"), t("common:widget/ui/dropdownlist/dropdownlist")),
    n = t("searchdetail:widget/ui/controls/pop/pop"),
    a = ['<div class="favo-content">', '<div class="album-row"><label>专辑：</label><select name="albumId"></select></div>', '<div class="desc-row"><label>描述：</label><textarea name="desc"></textarea></div>', '<p class="button-row"><a href="#" class="pop-okbtn">确定</a></p>', "</div>"].join("");
    return l.extend(e.prototype, n.prototype, {
        init: function() {
            n.prototype.init.call(this);
            var t = this;
            this.$element.find(".pop-okbtn").on("click",
            function(e) {
                e.preventDefault(),
                t.fire("onok", {
                    data: t._collectFormData()
                })
            }),
            this.descInput = this.$element.find(".desc-row textarea"),
            this.albumListCtrl = this._initAlbumDDLCtrl()
        },
        _initAlbumDDLCtrl: function() {
            var t = i.create({
                select: this.$element.find(".album-row select"),
                attrs: {
                    column: 5,
                    width: 170
                },
                box: l(['<div class="x-createalbum">', '<div class="box-ipt clearfix">', '<input type="text" name="albumName" title="创建新相册">', '<button class="btn-new-album">创建</button>', "</div>", "<div>"].join(""))
            }),
            e = this;
            return this.newAlbumNameEle = this.$element.find("[name=albumName]"),
            this.$element.find(".btn-new-album").on("click", this._onNewAlbumClick.bind(this)),
            t.change(function() {
                e.fire("albumSelectChange", {
                    value: t.val()
                })
            }),
            t
        },
        addAlbumOption: function(t) {
            this.albumListCtrl.add(t)
        },
        resetNewAlbumName: function() {
            this.newAlbumNameEle && this.newAlbumNameEle.val("")
        },
        setDesc: function(t) {
            this.descInput.val(t || "")
        },
        _collectFormData: function() {
            return {
                albumId: this.albumListCtrl.val(),
                desc: this.descInput.val()
            }
        },
        _onNewAlbumClick: function() {
            this.fire("newAlbumClicked", {
                albumName: this.newAlbumNameEle.val()
            })
        }
    }),
    e
});;
/*!searchdetail:widget/ui/controls/imgtoolbar/favo/favotip.js*/
define("searchdetail:widget/ui/controls/imgtoolbar/favo/favotip",
function(t) {
    function e(t) {
        t = i.extend({
            className: "favotip-pop",
            hasArrow: !0,
            hasClose: !0
        },
        t),
        a.call(this, t),
        this.setContent(n),
        this.$text = this.$element.find(".tip-text"),
        this.$link = this.$element.find(".tip-link")
    }
    var i = t("common:widget/ui/base/base"),
    a = t("searchdetail:widget/ui/controls/pop/pop"),
    n = ['<div class="tip-content">', '<span class="tip-text"></span>', '<a class="tip-link" href="http://image.baidu.com/picturefav/fav" target="_blank">去我的图片查看</a>', "</div>"].join("");
    return i.extend(e.prototype, a.prototype, {
        setTipText: function(t) {
            this.$text.html(t)
        }
    }),
    e
});;
/*!searchdetail:widget/ui/controls/imgtoolbar/favo/favoview.js*/
define("searchdetail:widget/ui/controls/imgtoolbar/favo/favoview",
function(t) {
    function i(t) {
        this.$button = t,
        this.imgData = null,
        this.pop = null,
        this.tip = null
    }
    var o = t("common:widget/ui/base/base"),
    e = t("common:widget/ui/utils/utils"),
    a = t("common:widget/ui/base/events"),
    n = t("common:widget/ui/browser-storage/browser-storage"),
    s = t("common:widget/ui/message/message"),
    l = t("searchdetail:widget/ui/app/pagemodel"),
    c = t("searchdetail:widget/ui/statistic/statistic-core"),
    p = t("searchdetail:widget/ui/collections/albumcollection"),
    u = t("searchdetail:widget/ui/controls/imgtoolbar/favo/favopop"),
    r = t("searchdetail:widget/ui/controls/imgtoolbar/favo/favotip");
    return o.extend(i.prototype, a, {
        init: function() {
            var t = this;
            this.$button.on("click",
            function(i) {
                i.preventDefault(),
                l.data.userName ? t.albumCollection ? (t.albumCollection.userName = l.data.userName, t.albumCollection.bdstoken = l.data.bdstoken, t.albumCollection.dataProxy.reqParams.uid = encodeURIComponent(l.data.userName), t.albumCollection.get().then(function(i) {
                    i && i.length ? t._showInputPop(i) : t._savePic()
                })) : t._saveToLocal() : t.popLogin()
            })
        },
        popLogin: function() {
            var t = this;
            o.getScript("//passport.baidu.com/passApi/js/uni_login_wrapper.js?cdnversion=" + (new Date).getTime(),
            function() {
                var i = o("#passLog");
                if (i) {
                    i.attr("href", "javascript:void(0);");
                    var e = {
                        tangram: !0,
                        cache: !1,
                        apiOpt: {
                            product: "im",
                            staticPage: location.protocol + "//" + location.host + "/static/searchresult/html/v3Jump.html",
                            memberPass: !0,
                            u: location.href,
                            qrcode: 3
                        },
                        authsite: ["tsina", "renren", "qzone"],
                        authsiteCfg: {
                            tpl: "im",
                            display: "popup",
                            act: "optional",
                            jumpUrl: location.protocol + "//" + location.host + "/static/imgsearch/html/xd.html",
                            onBindSuccess: function() {
                                return o.cookie("BDIMGISLOGIN", 1),
                                c && c.send("5.1010200", {
                                    tn: "baiduimagedetail",
                                    act: "loginsucess"
                                }),
                                location.reload(),
                                !1
                            }
                        },
                        onLoginSuccess: function(t) {
                            o.cookie("BDIMGISLOGIN", 1),
                            c && c.send("5.1010200", {
                                tn: "baiduimagedetail",
                                act: "loginsucess"
                            }),
                            t.returnValue = !1,
                            location.reload()
                        },
                        onShow: function() {
                            t.trigger("loginPop.show"),
                            c && c.send("5.1010200", {
                                tn: "baiduimagedetail",
                                act: "loginshow"
                            })
                        },
                        onHide: function() {
                            t.trigger("loginPop.hide")
                        }
                    };
                    window.loginPop || (window.loginPop = passport.pop.init(e)),
                    window.loginPop && window.loginPop.show()
                }
            })
        },
        setAlbumCollection: function(t) {
            this.albumCollection = t
        },
        userNameChanged: function() {
            this.setAlbumCollection(new p(l.data.userName, l.data.bdstoken))
        },
        update: function(t) {
            var i = this;
            this.imgData = t,
            this._updatePop(t);
            var e = parseInt(o.cookie("BDIMGISLOGIN"));
            1 === e && i.$button.trigger("click"),
            o.cookie("BDIMGISLOGIN", 0)
        },
        _updatePop: function(t) {
            if (this.pop) {
                var i = t.fromPageTitle || "";
                this.pop.setDesc(e.trimTags(i))
            }
        },
        _initPop: function(t) {
            var i, o = new u,
            e = n.api.get({
                key: "_local_album_key_"
            }),
            a = e && e.value,
            s = t && t.length && t[0].id,
            l = this;
            o.init();
            for (var c = 0,
            p = t.length; p > c; c++) i = t[c],
            o.addAlbumOption({
                text: i.name,
                value: i.id
            }),
            i.id == a && (s = a);
            return o.albumListCtrl.val(s),
            o.setTrigger(this.$button),
            this.pop = o,
            o.on("onok",
            function(t) {
                l._savePic(t.data)
            }),
            o.on("newAlbumClicked", this._onPopNewAlbumClicked.bind(this)),
            o.on("albumSelectChange", this._onPopAlbumSelectChange.bind(this)),
            o
        },
        _onPopNewAlbumClicked: function(t) {
            if (t.albumName) {
                var i = this;
                this.albumCollection.addAlbum(t.albumName).done(function(t) {
                    i.pop.addAlbumOption({
                        text: t.name,
                        value: t.id
                    }),
                    i.pop.resetNewAlbumName(),
                    i.pop.albumListCtrl.val(t.id + ""),
                    i.pop.albumListCtrl.hide(),
                    new s("创建相册成功", {
                        type: "info"
                    })
                }).fail(function(t) {
                    var o = t && t.status && t.status.msg || "创建相册失败，请选择其他相册";
                    t && t.data && (i.pop.albumListCtrl.val(t.data.id), o = "相册已存在"),
                    new s(o, {
                        type: "error"
                    })
                })
            } else new s("请输入名称", {
                type: "error"
            })
        },
        _onPopAlbumSelectChange: function(t) {
            n.api.set({
                key: "_local_album_key_",
                value: t.value,
                expires: 2592e3
            })
        },
        _showInputPop: function(t) {
            this.imgData && (this.pop || (this._initPop(t), this._updatePop(this.imgData)), this.pop.visible || this.pop.show())
        },
        _savePic: function(t) {
            t = t || {
                desc: e.trimTags(this.imgData.fromPageTitle || "")
            };
            var i = this.albumCollection.getPicCollection(t.albumId),
            o = this.imgData,
            a = this;
            i.addPic(o.objURLHttp, {
                desc: t.desc,
                surl: o.fromURL,
                contsign: o.cs
            }).always(function() {
                a.pop && a.pop.hide(),
                a._showEffect(),
                a._showSuccessTip(t, i)
            })
        },
        _showSuccessTip: function(t, i) {
            this.tip ? t.albumId || this.tip.setTipText('已临时收藏<span class="tip-num">' + i.getTotal() + "</span>张图片，") : (this.tip = new r, this.tip.setTipText(t.albumId ? "收藏成功，": '已临时收藏<span class="tip-num">' + i.getTotal() + "</span>张图片，"), this.tip.setTrigger(this.$button)),
            this.tip.show()
        },
        _showAddOne: function(t) {
            var i = o("#fav-add-one"),
            e = new o.Deferred;
            return i[0] || (i = o('<span id="fav-add-one">+1</span>').appendTo("body")),
            i.css({
                position: "absolute",
                top: t.top + 3,
                left: t.left - 22,
                "z-index": 1020,
                display: "block",
                width: "30px",
                height: "30px",
                "font-size": "30px",
                "font-family": "TAHOMA",
                color: "#000",
                opacity: 1
            }).delay(100).animate({
                top: "-=30",
                opacity: 0
            },
            500,
            function() {
                i.hide(),
                e.resolve()
            }),
            e
        },
        _showEffect: function() {
            var t = o("#container").find(".img-container img"),
            i = t.offset(),
            e = this.$button,
            a = e.offset(),
            n = o("<img />").attr({
                src: this.imgData.bigImgUrl || this.imgData.thumbURL
            }),
            s = this,
            l = new o.Deferred,
            c = function() {
                n.css({
                    position: "absolute",
                    top: i.top,
                    left: i.left,
                    width: t.width(),
                    height: t.height(),
                    "z-index": 1020
                }).animate({
                    top: a.top + 10,
                    left: a.left + 50,
                    width: 0,
                    height: 0
                },
                500, "linear",
                function() {
                    n.remove(),
                    s._showAddOne(a).then(function() {
                        l.resolve()
                    })
                })
            };
            return n.ready(c),
            n.appendTo("body"),
            l
        }
    }),
    i
});;
/*!searchdetail:widget/ui/utils/swf.js*/
define("searchdetail:widget/ui/utils/swf",
function() {
    var e = e || {
        version: "1.3.9"
    };
    return e.guid = "$BAIDU$",
    window[e.guid] = window[e.guid] || {},
    e.swf = e.swf || {},
    e.swf.version = function() {
        var e = navigator;
        if (e.plugins && e.mimeTypes.length) {
            var r = e.plugins["Shockwave Flash"];
            if (r && r.description) return r.description.replace(/([a-zA-Z]|\s)+/, "").replace(/(\s)+r/, ".") + ".0"
        } else if (window.ActiveXObject && !window.opera) for (var n = 12; n >= 2; n--) try {
            var t = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + n);
            if (t) {
                var a = t.GetVariable("$version");
                return a.replace(/WIN/g, "").replace(/,/g, ".")
            }
        } catch(i) {}
    } (),
    e.string = e.string || {},
    e.string.encodeHTML = function(e) {
        return String(e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;")
    },
    e.encodeHTML = e.string.encodeHTML,
    e.swf.createHTML = function(r) {
        r = r || {};
        var n, t, a, i, o, s, l = e.swf.version,
        c = r.ver || "6.0.0",
        u = {},
        g = e.string.encodeHTML;
        for (i in r) u[i] = r[i];
        if (r = u, !l) return "";
        for (l = l.split("."), c = c.split("."), a = 0; 3 > a && (n = parseInt(l[a], 10), t = parseInt(c[a], 10), !(n > t)); a++) if (t > n) return "";
        var d = r.vars,
        f = ["classid", "codebase", "id", "width", "height", "align"];
        if (r.align = r.align || "middle", r.classid = "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000", r.codebase = "https://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0", r.movie = r.url || "", delete r.vars, delete r.url, "string" == typeof d) r.flashvars = d;
        else {
            var p = [];
            for (i in d) s = d[i],
            p.push(i + "=" + encodeURIComponent(s));
            r.flashvars = p.join("&")
        }
        var v = ["<object "];
        for (a = 0, o = f.length; o > a; a++) s = f[a],
        v.push(" ", s, '="', g(r[s]), '"');
        v.push(">");
        var w = {
            wmode: 1,
            scale: 1,
            quality: 1,
            play: 1,
            loop: 1,
            menu: 1,
            salign: 1,
            bgcolor: 1,
            base: 1,
            allowscriptaccess: 1,
            allownetworking: 1,
            allowfullscreen: 1,
            seamlesstabbing: 1,
            devicefont: 1,
            swliveconnect: 1,
            flashvars: 1,
            movie: 1
        };
        for (i in r) s = r[i],
        i = i.toLowerCase(),
        w[i] && (s || s === !1 || 0 === s) && v.push('<param name="' + i + '" value="' + g(s) + '" />');
        r.src = r.movie,
        r.name = r.id,
        delete r.id,
        delete r.movie,
        delete r.classid,
        delete r.codebase,
        r.type = "application/x-shockwave-flash",
        r.pluginspage = "https://get.adobe.com/cn/flashplayer/",
        v.push("<embed");
        var h;
        for (i in r) if (s = r[i], s || s === !1 || 0 === s) {
            if (new RegExp("^salign$", "i").test(i)) {
                h = s;
                continue
            }
            v.push(" ", i, '="', g(s), '"')
        }
        return h && v.push(' salign="', g(h), '"'),
        v.push("></embed></object>"),
        v.join("")
    },
    e.swf.create = function(r, n) {
        r = r || {};
        var t = e.swf.createHTML(r) || r.errorMessage || "";
        n && "string" == typeof n && (n = document.getElementById(n)),
        n ? n.innerHTML = t: document.write(t)
    },
    e.browser = e.browser || {},
    e.browser.ie = e.ie = /msie (\d+\.\d+)/i.test(navigator.userAgent) ? document.documentMode || +RegExp.$1: void 0,
    e.array = e.array || {},
    e.array.remove = function(e, r) {
        for (var n = e.length; n--;) n in e && e[n] === r && e.splice(n, 1);
        return e
    },
    e.lang = e.lang || {},
    e.lang.isArray = function(e) {
        return "[object Array]" == Object.prototype.toString.call(e)
    },
    e.lang.isFunction = function(e) {
        return "[object Function]" == Object.prototype.toString.call(e)
    },
    e.lang.toArray = function(r) {
        if (null === r || void 0 === r) return [];
        if (e.lang.isArray(r)) return r;
        if ("number" != typeof r.length || "string" == typeof r || e.lang.isFunction(r)) return [r];
        if (r.item) {
            for (var n = r.length,
            t = new Array(n); n--;) t[n] = r[n];
            return t
        }
        return [].slice.call(r)
    },
    e.swf.getMovie = function(r) {
        var n, t = document[r];
        return 9 == e.browser.ie ? t && t.length ? 1 == (n = e.array.remove(e.lang.toArray(t),
        function(e) {
            return "embed" != e.tagName.toLowerCase()
        })).length ? n[0] : n: t: t || window[r]
    },
    e
});;
/*!searchdetail:widget/ui/controls/imgtoolbar/wallpaper/checkax.js*/
define("searchdetail:widget/ui/controls/imgtoolbar/wallpaper/checkax",
function(e, t, i) {
    var n = function(e) {
        var t = function() {
            return "Win32" == e.navigator.platform && e.navigator.userAgent.toLowerCase().indexOf("wow64") <= 0 ? !0 : !1
        },
        i = function() {
            if (t()) if (e.navigator.userAgent.indexOf("MSIE") > 0) try {
                if (document.getElementById("BDWallpaper")) return document.getElementById("BDWallpaper");
                var i = document.createElement("div");
                return i.style.display = "none",
                document.body.appendChild(i),
                i.innerHTML = '<OBJECT ID="BDWallpaper" CLASSID="CLSID:03D2BA47-F4B2-45ba-BD3A-4DE2D5797DAC" ></OBJECT>',
                document.getElementById("BDWallpaper")
            } catch(n) {} else {
                var a = e.navigator.mimeTypes["application/baiduwp-activex"];
                if (a) {
                    var r = e.navigator.mimeTypes["application/baiduwp-activex"];
                    if (r) {
                        if (document.getElementById("BDWallpaper")) return document.getElementById("BDWallpaper");
                        var o = document.createElement("embed");
                        return o.style.visibility = "hidden",
                        o.type = "application/baiduwp-activex",
                        o.width = 0,
                        o.height = 0,
                        o.setAttribute("progid", "wpbpluginAX.BrowserControl.1"),
                        o.setAttribute("id", "BDWallpaper"),
                        document.body.appendChild(o),
                        o
                    }
                }
            }
        },
        n = function() {
            if (t()) {
                if (e.navigator.userAgent.indexOf("MSIE") > 0) try {
                    {
                        new ActiveXObject("wpbpluginAX.BrowserControl.1")
                    }
                } catch(i) {
                    return ! 1
                } else {
                    var n = e.navigator.mimeTypes["application/baiduwp-activex"];
                    if (!n) {
                        if (navigator.plugins) {
                            navigator.plugins.refresh(!1);
                            for (var a = 0; a < navigator.plugins.length; a++) if (navigator.plugins[a][0].type && "application/baiduwp-activex" == navigator.plugins[a][0].type) return ! 0
                        }
                        return ! 1
                    }
                }
                return ! 0
            }
            return alert("Only support windows 32bit!"),
            !1
        },
        a = !1,
        r = function(e, t) {
            n() ? e && "function" == typeof e && !a && (e(), a = !0) : (t || (t = 100), setTimeout(function() {
                r(e, t)
            },
            t))
        };
        return {
            exist: n,
            instance: i,
            checkSys: t,
            pollingCheck: r
        }
    } (window);
    i.exports = n
});;
/*!searchdetail:widget/ui/controls/imgtoolbar/wallpaper/wallpaper.js*/
define("searchdetail:widget/ui/controls/imgtoolbar/wallpaper/wallpaper",
function(t) {
    function i() {
        this.imgData = {}
    }
    function e(t, i) {
        this.$pnl = t,
        this.$btn = t.find(".btn-wallp-in"),
        this.$flashPnl = t.find(".flashpnl"),
        this.$tip = n(null),
        this._tipHideTimer = !1,
        this.flashCtrl = null,
        this.opts = n.extend({
            popUrl: "http://bizhi.baidu.com/imagepreview/index.html",
            redirectUrl: location.protocol + "//" + location.host + "/static/searchdetail/html/crosswallpaper.html"
        },
        i)
    }
    var n = t("common:widget/ui/base/base"),
    r = t("common:widget/ui/base/events"),
    a = t("searchdetail:widget/ui/utils/swf"),
    l = t("searchdetail:widget/ui/controls/imgtoolbar/wallpaper/checkax");
    n.extend(i.prototype, r, {
        init: function() {
            var t = this,
            i = window.BD || {};
            i.IMG = i.IMG || {},
            window.WP9278A0FC9F485dB8C86BAA1688E99F = function() {
                t.pluginProc()
            },
            i.IMG.getCurrImgURL = function() {
                return t.getCurrImgURL()
            },
            i.IMG.setWallPaper = function() {
                t.setWallPaper()
            }
        },
        pluginProc: function() {
            var t = l.instance(),
            i = t.GetErrorCode();
            this.fire("pluginExit", {
                errCode: i
            })
        },
        getCurrImgURL: function() {
            var t = "/search/down?tn=download&word=download&ie=utf8&fr=detailWall&url=",
            i = this.imgData;
            return t + encodeURIComponent(i.objURL) + "&height=" + i.height + "&width=" + i.width
        },
        setWallPaper: function() {
            l && l.exist() ? l.instance().WebSetWallpaper(this.getCurrImgURL()) : this.fire("trySetWallPaper")
        }
    }),
    n.extend(e.prototype, r, {
        init: function() {
            a.swf.create({
                id: "flashPreView",
                url: "/static/searchdetail/flash/WallpaperImages.swf?v=1",
                width: "72",
                height: "30",
                wmode: "transparent",
                allowFullScreen: "true",
                errorMessage: "载入FLASH出错",
                ver: "9.0.0",
                vars: {
                    preview: 1,
                    system: this._getSystemVar(),
                    imagesurl: ""
                }
            },
            this.$flashPnl[0]);
            var t = !!this.$flashPnl.find("object").length;
            return t && (this._initBtnState(), this.flashCtrl = new i, this.flashCtrl.on("trySetWallPaper", this._setWallPaperHandler.bind(this)), this.flashCtrl.on("pluginExit", this._pluginExitHandler.bind(this))),
            t
        },
        _initBtnState: function() {
            if (l.exist()) this.$btn.hide(),
            this.$flashPnl.show();
            else {
                var t = this;
                this.$flashPnl.hide(),
                this.$btn.show().on("click",
                function(i) {
                    i.preventDefault(),
                    t.showPop()
                })
            }
        },
        _getSystemVar: function() {
            var t = "";
            return t = "Win32" == navigator.platform ? navigator.userAgent.indexOf("Windows NT 5") > -1 ? "xp": "win7": "xp"
        },
        update: function(t) {
            this.flashCtrl && (this.flashCtrl.imgData = t),
            t.bigImgUrl && t.width >= 1024 && t.height >= 640 && !/\.nipic\.com/.test(t.objURL) ? this.$pnl.show() : this.$pnl.hide()
        },
        showPop: function() {
            var t = this.flashCtrl.getCurrImgURL(),
            i = this,
            e = '<div id="iframeBg" class="iframeBg"></div><div id="disIframe" class="disIframe"><iframe id="bizi-iframe" frameborder="0" width="907px" height="452px"></iframe></div>';
            if (document.getElementById("iframeBg"));
            else {
                window.__closeWallPaperPop__ = function(t) {
                    i._pluginExitHandler({
                        errCode: t
                    })
                },
                n(document.body).append(e);
                var r = this.opts.popUrl + "?redirecturl=" + encodeURIComponent(this.opts.redirectUrl) + "&imageurl=" + encodeURIComponent(t) + "&" + (new Date).getTime();
                document.getElementById("bizi-iframe").src = r,
                n("#iframeBg").on("click",
                function() {
                    i.hidePop()
                })
            }
        },
        hidePop: function() {
            document.getElementById("iframeBg") && n("#iframeBg").remove(),
            document.getElementById("disIframe") && n("#disIframe").remove()
        },
        showTip: function(t) {
            this.$tip.length || (this.$tip = n('<div class="wallpaper-info"></div>').appendTo(document.body)),
            this._tipHideTimer && (this._tipHideTimer = clearTimeout(this._tipHideTimer)),
            this.$tip.text(t).show();
            var i = this;
            this._tipHideTimer = setTimeout(function() {
                i.$tip.hide()
            },
            1500)
        },
        _setWallPaperHandler: function() {
            this.showPop()
        },
        _pluginExitHandler: function(t) {
            t.errCode && this.showTip(1 == t.errCode ? "设置成功": "设置失败"),
            this.hidePop(),
            this._initBtnState()
        }
    });
    var s = null,
    o = !1;
    return {
        init: function(t) {
            return s || o || (l && l.checkSys() && (s = new e(t), s.init() || (s = null)), s || (o = !0, t.hide())),
            s
        }
    }
});;
/*!searchdetail:widget/ui/controls/fullscreen/fullscreen.js*/
define("searchdetail:widget/ui/controls/fullscreen/fullscreen",
function(t) {
    function i(t, i) {
        this.imgCollection = t,
        this.imgModel = i,
        this.cache = {},
        this.requestId = 0
    }
    function e(t, i, e) {
        this.imgCollection = t,
        this.imgModel = i,
        this.$btnPnl = e,
        this.dataManager = null,
        this.model = {},
        this.list = [],
        this._isFullScreen = !1,
        this.config = {
            minThumbWidth: 57,
            maxThumbWidth: 230,
            thumbGapWidth: 6,
            thumbHeight: 90
        }
    }
    var n = t("common:widget/ui/base/base"),
    s = t("common:widget/ui/juicer/juicer"),
    o = t("common:widget/ui/base/events"),
    a = (t("searchdetail:widget/old/hotInfo/utils/utils"), t("common:widget/ui/utils/utils")),
    h = t("searchdetail:widget/ui/statistic/statistic-core");
    n.extend(i.prototype, {
        getLowerBound: function() {
            return - 1 * ~~this.imgCollection.getFixDataLength()
        },
        getUpperBound: function() {
            return~~this.imgModel.get("total") + this.getLowerBound() - 1
        },
        getImgsInBatch: function(t) {
            var i = new n.Deferred,
            e = t.offset,
            s = 30 * Math.floor((e + 30) / 30),
            o = s - e,
            a = void 0 === t.root ? this.imgCollection.getByIndex(e, o) : this.imgCollection.getSubImg(t.root, e, o);
            return a.then(function(e) {
                var n = t.limit - o,
                a = void 0 === t.root ? e || [] : e && e.subList || [];
                n > 0 ? this.getImgsInBatch({
                    root: t.root,
                    offset: s,
                    limit: n
                }).then(function(t) {
                    i.resolve(a.concat(t))
                }) : i.resolve(a.splice(0, t.limit))
            }.bind(this)),
            i
        },
        getParsedImgByPos: function(t, i, e, n) {
            var s = [i, e, ~~n].join(".");
            return t = t || {},
            this.cache[s] = this.cache[s] || {
                key: s,
                pn: i,
                spn: e,
                width: t.width,
                height: t.height,
                thumbURL: t.thumbURL,
                objURL: t.objURL,
                replaceUrl: (t.replaceUrl || []).filter(function(t) {
                    return t && t.ObjURL
                }).map(function(t) {
                    return a.httpsTimg(t.ObjURL)
                }),
                isRoot: n
            },
            this.cache[s].bdSetImgNum = t.bdSetImgNum,
            this.cache[s]
        },
        mergeList: function(t, i, e) {
            var n = t[e],
            s = (t || []).map(function(t) {
                return this.getParsedImgByPos(t, t.pageNum, 0, !0)
            }.bind(this)),
            o = (i || []).map(function(t) {
                return this.getParsedImgByPos(t, n.pageNum, t.pageNum, !1)
            }.bind(this));
            return o && o.length && o.length < n.bdSetImgNum && 0 !== o[0].spn ? Array.prototype.splice.apply(s, [0, e + 1].concat(o)) : o && o.length && o.length < n.bdSetImgNum ? Array.prototype.splice.apply(s, [e, s.length].concat(o)) : o && o.length && Array.prototype.splice.apply(s, [e, 1].concat(o)),
            s
        },
        getImgsByMiddle: function(t, i, e) {
            var n = ++this.requestId,
            s = Math.max(this.getLowerBound(), Math.floor(t.pn - i / 2));
            this.getImgsInBatch({
                offset: s,
                limit: i
            }).then(function(o) {
                if (n === this.requestId) {
                    var a = t.pn - s,
                    h = o[a],
                    r = o[o.length - 1],
                    l = o.length < i;
                    if (h && h.isSet) {
                        var d = Math.max(0, Math.floor(t.spn - i / 2));
                        this.getImgsInBatch({
                            root: t.pn,
                            offset: d,
                            limit: i
                        }).then(function(i) {
                            if (n === this.requestId) {
                                var s = i[t.spn - d];
                                e && e({
                                    rootImg: this.getParsedImgByPos(h, t.pn, 0, !0),
                                    imgData: this.getParsedImgByPos(s || h, t.pn, t.spn, !s),
                                    list: this.mergeList(o, i, a),
                                    lastImg: r,
                                    exhausted: l
                                })
                            }
                        }.bind(this))
                    } else h && e && e({
                        rootImg: this.getParsedImgByPos(h, t.pn, 0, !0),
                        imgData: this.getParsedImgByPos(h, t.pn, 0, !0),
                        list: this.mergeList(o),
                        lastImg: r,
                        exhausted: l
                    })
                }
            }.bind(this))
        },
        getImgsByPnRange: function(t, i, e, n) {
            var s = ++this.requestId,
            o = i.pn - t.pn + 1;
            this.getImgsInBatch({
                offset: t.pn,
                limit: o
            }).then(function(a) {
                if (s === this.requestId) {
                    var h = a.length < o,
                    r = a.map(function(t) {
                        return t.pn
                    }).indexOf(e),
                    l = a[r];
                    if (~r) {
                        var d = 0 === r ? t.spn: 0,
                        u = r === a.length - 1 ? i.spn - d + 1 : l.bdSetImgNum;
                        this.getImgsInBatch({
                            root: e,
                            offset: d,
                            limit: u
                        }).then(function(t) {
                            s === this.requestId && n && n({
                                list: this.mergeList(a, t, r),
                                exhausted: h
                            })
                        }.bind(this))
                    } else n && n({
                        list: this.mergeList(a),
                        exhausted: h
                    })
                }
            }.bind(this))
        }
    }),
    n.extend(e.prototype, o, {
        init: function() {
            this.dataManager = new i(this.imgCollection, this.imgModel),
            this.bindEvents()
        },
        update: function() {
            if (!this._isFullScreen) {
                var t = this.imgModel.get("rootImg"),
                i = this.imgModel.get("imgData");
                this.model = {
                    pn: this.imgModel.get("pn"),
                    spn: this.imgModel.get("spn"),
                    imgData: this.dataManager.getParsedImgByPos(i, t.pn, i.pn, !1),
                    rootImg: this.dataManager.getParsedImgByPos(t, t.pn, 0, !0),
                    total: this.imgModel.get("total")
                }
            }
        },
        bindEvents: function() {
            var t = this.toggleUnfold = this.toggle(".unfold"),
            i = this.togglePlay = this.toggle(".play");
            n(this.$btnPnl).on("click",
            function() {
                this.toggleFullscreen()
            }.bind(this)),
            n(document).on("click", ".fullscreen-close-btn", this.toggleFullscreen.bind(this)),
            n(document).on("click", ".unfold-bar",
            function() {
                var i = t();
                this.toggleSlider(i),
                h.send(i ? "5.1013002": "5.1013003", {})
            }.bind(this)),
            n(document).on("click", ".play-bar",
            function() {
                var t = i();
                this.toggleSetinterval(t),
                h.send(t ? "5.1013000": "5.1013001", {})
            }.bind(this)),
            n(document).on("fullscreenchange webkitfullscreenchange mozfullscreenchange MSFullscreenChange",
            function() {
                this._isFullScreen = !this._isFullScreen,
                this._isFullScreen ? (t(!0), this.toggleSlider(!0, !0)) : (this.toggleSetinterval(), i(!1), this.fire("selectedChange", {
                    index: this.model.pn + -1 * this.dataManager.getLowerBound(),
                    subIndex: this.model.spn
                }))
            }.bind(this)),
            n(window).on("resize",
            function() {
                this._isFullScreen && this.model && this.selectImage(this.model, this.render.bind(this))
            }.bind(this)),
            this.bindNavigateActions()
        },
        bindNavigateActions: function() {
            n(document).on("click.navigate", ".arrow-wrap", this.setSlider.bind(this)),
            n(document).on("click.navigate", ".list-arrow-wrap", this.setList.bind(this)),
            n(document).on("click.navigate", ".item", this.clickSlider.bind(this))
        },
        unbindNavigateActions: function() {
            n(document).off("click.navigate")
        },
        toggle: function(t, i) {
            var e = {},
            s = i || "-switch";
            return function(i) {
                var o = t + s;
                return e[t] = void 0 === i ? !e[t] : i,
                e[t] ? (n(t).hide(), n(o).show()) : (n(t).show(), n(o).hide()),
                this[t.slice(1) + "Status"] = e[t] ? o.slice(1) : t.slice(1),
                e[t]
            }.bind(this)
        },
        render: function() {
            var t, i = n("body"),
            e = n("#fullscreentpl").html(),
            o = n(".fullscreen"),
            a = this.adaptData();
            t = s(e, a),
            o.length <= 0 ? i.append(n(t)) : o.replaceWith(t),
            this.loadLargeImage()
        },
        pendList: function(t, i) {
            if (!t || !t.list || !t.list.length) return void(i && i());
            var e = (this.config.thumbGapWidth, n("#fullscreentpl").html());
            this.animateList(t, n(".fullscreen .list"), n(s(e, this.adaptData(t))).find(".list"),
            function() {
                i && i()
            }.bind(this))
        },
        animateList: function(t, i, e, n) {
            var s = i.parent(),
            o = e.parent().clone(),
            a = parseInt(i.css("left"), 10),
            h = this.config.thumbGapWidth,
            r = t.list.map(function(t) {
                return t.key
            }).indexOf(this.list["append" === t.type ? this.list.length - 1 : 0].key),
            l = [];
            "append" === t.type ? (i.append(e.children().splice(r + 1)), l = this.list.slice().concat(t.list.slice().splice(r + 1))) : (a -= t.list.filter(function(t, i) {
                return r > i
            }).reduce(function(t, i) {
                return t + i.thumbWidth + h
            },
            0), i.prepend(e.children().splice(0, r)), i.css("left", a), l = t.list.slice().splice(0, r).concat(this.list.slice()));
            var d = l.map(function(t) {
                return [t.pn, t.spn].join(".")
            }).indexOf([t.sentianel.pn, t.sentianel.spn].join(".")),
            u = l.filter(function(t, i) {
                return d > i
            }).reduce(function(t, i) {
                return t + i.thumbWidth + h
            },
            h),
            c = "append" === t.type ? -u: Math.min(0, window.innerWidth - u - (~d ? l[d].thumbWidth: 0));
            i.animate({
                left: c
            },
            Math.floor(Math.abs(c - a)) / 5,
            function() {
                s.replaceWith(o),
                n && n()
            }.bind(this))
        },
        getDirection: function(t) {
            var i = n(t.currentTarget);
            return i.hasClass("left-list-arrow-wrap") || i.hasClass("left-arrow-wrap") ? "left": "right"
        },
        toggleSlider: function(t, i) {
            var e = n(".slider"),
            s = t ? "-105px": 0;
            i ? e.css({
                bottom: s
            }) : e.animate({
                bottom: s
            },
            300)
        },
        loadImagesTrial: function(t, i, e, n) {
            var s = i[e];
            if (s) {
                var o = new Image;
                o.onerror = function() {
                    this.loadImagesTrial(t, i, e + 1, n)
                }.bind(this),
                o.onload = function() {
                    var i = 50;
                    return this.width && this.height && (Math.abs(this.width - t.width) > i || Math.abs(this.height - t.height) > i) ? void o.onerror() : void(n && n(s))
                },
                o.src = s
            }
        },
        loadLargeImage: function() {
            var t = this.model.imgData,
            i = [t.objURL].concat(t.replaceUrl);
            this.loadImagesTrial(t, i, 0,
            function(t) {
                this.model.imgData && ~i.indexOf(this.model.imgData.objURL) && n(".content img").attr("src", t) && (this.model.imgData.objURL = t)
            }.bind(this))
        },
        toggleSetinterval: function(t) {
            t ? this.timerId = setInterval(function() {
                this.setSlider("right")
            }.bind(this), 4e3) : (this.timerId && clearInterval(this.timerId), this.timerId = void 0)
        },
        clickSlider: function(t) {
            var i = n(t.currentTarget);
            i.hasClass("active") || (this.unbindNavigateActions(), this.selectImage({
                pn: +i.attr("data-pn"),
                spn: +i.attr("data-spn")
            },
            function() {
                this.render(),
                this.bindNavigateActions()
            }.bind(this)), h.send("5.13", {
                isSF: 1
            }))
        },
        setSlider: function(t) {
            var i = this.getDirection(t);
            this.getNextPos({
                pn: this.model.pn,
                spn: this.model.spn
            },
            "left" === i ? -1 : 1).then(function(t) { (t.pn !== this.model.pn || t.spn !== this.model.spn) && (this.unbindNavigateActions(), this.selectImage(t,
                function() {
                    this.render(),
                    this.bindNavigateActions()
                }.bind(this)))
            }.bind(this)),
            h.send("5.12", {
                isSF: 1
            })
        },
        setList: function(t) {
            var i = this.getDirection(t),
            e = this.getListVisibleRange(),
            n = this.getPosFromDom(e[0]),
            s = this.getPosFromDom(e[e.length - 1]),
            o = Math.ceil(window.innerWidth / (this.config.minThumbWidth + this.config.thumbGapWidth)),
            a = "left" === i,
            h = a ? this.getNextPos(n, -o) : this.getNextPos(s, o);
            h.then(function(t) {
                var i = a ? t: t.overflowed ? n: s,
                e = a ? t.overflowed ? s: n: t;
                this.unbindNavigateActions(),
                this.dataManager.getImgsByPnRange(i, e, this.model.pn,
                function(t) {
                    this.pendList({
                        list: t.list || [],
                        type: a ? "prepend": "append",
                        sentianel: a ? n: s,
                        align: a ? "right": "left"
                    },
                    function() {
                        this.list = t.list || [],
                        this.bindNavigateActions()
                    }.bind(this))
                }.bind(this))
            }.bind(this))
        },
        selectImage: function(t, i) {
            t = n.extend({
                pn: 0,
                spn: 0
            },
            t);
            var e = Math.ceil(window.innerWidth / (this.config.minThumbWidth + this.config.thumbGapWidth));
            this.dataManager.getImgsByMiddle(t, e,
            function(e) {
                n.extend(this.model, {
                    pn: t.pn,
                    spn: t.spn,
                    imgData: e.imgData,
                    rootImg: e.rootImg,
                    total: e.exhausted && e.lastImg ? e.lastImg.pn + 1 : this.model.total
                }),
                this.list = e.list,
                i && i()
            }.bind(this))
        },
        getPosFromDom: function(t) {
            return {
                pn: ~~n(t).data("pn"),
                spn: ~~n(t).data("spn")
            }
        },
        getNextPos: function(t, i) {
            var e = new n.Deferred,
            s = this.model.rootImg,
            o = t.pn,
            a = t.spn,
            h = !1,
            r = this.dataManager.getLowerBound(),
            l = this.dataManager.getUpperBound();
            if (o !== this.model.pn || this.isOutOfBoundary(a + i, 0, ~~s.bdSetImgNum - 1)) if (i >= 0 && !this.isOutOfBoundary(o + i, r, l)) o += i,
            a = 0;
            else {
                if (!this.isOutOfBoundary(o + i, r, l)) return o += i,
                this.dataManager.getImgsInBatch({
                    offset: o,
                    limit: 1
                }).then(function(t) {
                    e.resolve({
                        pn: o,
                        spn: t.length && Math.max(0, t[0].bdSetImgNum - 1),
                        overflowed: !1
                    })
                }),
                e;
                if (i > 0) return o = l,
                this.dataManager.getImgsInBatch({
                    offset: o,
                    limit: 1
                }).then(function(t) {
                    e.resolve({
                        pn: o,
                        spn: t.length && Math.max(0, t[0].bdSetImgNum - 1),
                        overflowed: !0
                    })
                }),
                e;
                h = !0,
                o = r,
                a = 0
            } else a += i;
            return e.resolve({
                pn: o,
                spn: a,
                overflowed: h
            })
        },
        isOutOfBoundary: function(t, i, e) {
            return i > t || t > e
        },
        adaptData: function(t) {
            t = t || {};
            var i = this.model.rootImg,
            e = this.model.imgData,
            s = t.list || this.list,
            o = this.unfoldStatus || "unfold",
            a = this.playStatus || "play",
            h = window.innerWidth,
            r = window.innerHeight,
            l = h / r,
            d = this.config.minThumbWidth,
            u = this.config.maxThumbWidth,
            c = (this.config.thumbGapWidth, this.config.thumbHeight);
            n.each(s.concat(e),
            function(t, i) {
                var e = i && i.width,
                n = i && i.height;
                if (e && n && !(i.thumbWidth && i.contentStyle && i.thumbClass)) {
                    var s = e / n;
                    i.thumbWidth = Math.floor(Math.max(d, Math.min(u, s * c))),
                    i.thumbClass = i.thumbWidth === d ? "narrow": i.thumbWidth === u ? "wide": "normal",
                    i.contentStyle = h > e && r > n ? {
                        width: e,
                        height: n
                    }: s > l ? {
                        width: h,
                        height: n * h / e
                    }: {
                        width: e * r / n,
                        height: r
                    }
                }
            });
            var g = this.getListPosition(t),
            m = this.getListSurrounding(s, g);
            return {
                curr: e,
                currIndex: e.spn + 1,
                currTotal: i.bdSetImgNum || 1,
                list: s,
                offset: g.offset,
                surrounding: m,
                unfold: o,
                play: a,
                pn: this.model.pn,
                spn: this.model.spn,
                total: this.model.total,
                lowerBound: this.dataManager.getLowerBound(),
                upperBound: this.dataManager.getUpperBound()
            }
        },
        getListSurrounding: function(t, i) {
            if (!t.length) return {
                noPrev: !0,
                noNext: !0
            };
            var e = this.model.rootImg,
            n = t[0],
            s = t[t.length - 1],
            o = this.dataManager.getLowerBound(),
            a = this.dataManager.getUpperBound(),
            h = this.config.thumbGapWidth,
            r = i.offset >= -h && n.pn === o && !n.spn,
            l = i.total + i.offset - window.innerWidth <= h && s.pn === a && s.spn === (e.pn === s.pn ? (e.bdSetImgNum || 1) - 1 : 0);
            return {
                noPrev: r,
                noNext: l
            }
        },
        getListPosition: function(t) {
            var i = this.config.thumbGapWidth,
            e = window.innerWidth,
            n = t.list || this.list,
            s = t.sentianel || this.model,
            o = t.align || "middle",
            a = 0,
            h = 0,
            r = n.reduce(function(t, e) {
                return e.pn === s.pn && e.spn === s.spn && (a = t, h = t + e.thumbWidth),
                t + e.thumbWidth + i
            }.bind(this), i),
            l = e > r ? (e - r) / 2 : "left" === o ? -a: "right" === o ? Math.min(0, e - h) : Math.min(0, e / 2 - (a + h) / 2);
            return {
                offset: l,
                total: r
            }
        },
        getListVisibleRange: function() {
            var t = n(".fullscreen .item"),
            i = window.innerWidth;
            return Array.prototype.filter.call(t,
            function(t) {
                var e = n(t),
                s = e.offset().left,
                o = s + e.width();
                return o >= 0 && i > s
            }.bind(this))
        },
        toggleFullscreen: function() {
            var t = window.document,
            i = t.documentElement,
            e = i.requestFullscreen || i.mozRequestFullScreen || i.webkitRequestFullscreen || i.msRequestFullscreen,
            n = t.exitFullscreen || t.mozCancelFullScreen || t.webkitExitFullscreen || t.msExitFullscreen;
            t.fullscreenElement || t.mozFullScreenElement || t.webkitFullscreenElement || t.msFullscreenElement ? n.call(t) : (e.call(i), this.selectImage(this.model, this.render.bind(this)))
        }
    });
    var r = null,
    l = !1;
    return {
        init: function(t, i, n) {
            var s = window.document,
            o = s.fullscreenEnabled || s.mozFullScreenEnabled || s.webkitFullscreenEnabled || s.msFullscreenEnabled;
            return r || l || (o ? (r = new e(t, i, n), r.init()) : n.hide()),
            r
        },
        update: function(t) {
            r && r.update(t)
        }
    }
});;
/*!searchdetail:widget/ui/controls/responsive/responsive.js*/
define("searchdetail:widget/ui/controls/responsive/responsive",
function(e) {
    function t(e) {
        return n.UI.getCssDigitValueSum(e, ["margin-left", "margin-right"])
    }
    function i(e, i) {
        i = i || [];
        var n = 0,
        r = 0,
        a = [],
        h = [];
        s(i).each(function(e, i) {
            n += t(i) + i[0].offsetWidth
        }),
        a.push(n),
        h.push(i),
        r = n;
        var o = i;
        s(e).each(function(e, i) {
            r += t(i) + i[0].offsetWidth,
            a.push(r),
            o = o.concat([i]),
            h.push(o)
        }),
        this.minSize = n,
        this.maxSize = r,
        this.sortedSizeArea = a,
        this.areaElements = h,
        this.elements = h[h.length - 1] || [],
        this.curAreaSize = a[a.length - 1]
    }
    var s = e("common:widget/ui/base/base"),
    n = e("common:widget/ui/utils/utils");
    return s.extend(i.prototype, {
        resize: function(e) {
            for (var t = this.sortedSizeArea,
            i = -1,
            s = 0,
            n = t.length; n > s && e >= t[s]; s++) i = s;
            this._updateState(i)
        },
        _updateState: function(e) {
            var t = e >= 0 ? this.sortedSizeArea[e] : 0;
            if (t != this.curAreaSize) {
                this.curAreaSize = t;
                var i = e >= 0 ? this.areaElements[e] : [];
                s(this.elements).each(function(e, t) {
                    t.hide()
                }),
                s(i).each(function(e, t) {
                    t.show()
                })
            }
        }
    }),
    i
});;
/*!searchdetail:widget/ui/controls/imgtoolbar/imgtoolbar.js*/
define("searchdetail:widget/ui/controls/imgtoolbar/imgtoolbar",
function(t) {
    function e(t, e, o) {
        this.$pnl = t,
        this.imgModel = null,
        this.elements = i.extend({
            wallpaperBtn: "",
            zoomScale: "",
            zoomIn: "",
            zoomOut: "",
            zoomToggle: "",
            downloadLink: "",
            toPhoneBtn: "",
            favoBtn: "",
            fullScreenBtn: "",
            dutuSwitcher: "",
            reportLink: "",
            shituBtn: ".btn-shitu"
        },
        e),
        this.opts = i.extend({
            imgPnl: "",
            img: ""
        },
        o),
        this.zoomViewCtrl = null,
        this.fullScreenCtrl = null,
        this.qrcodePopCtrl = null,
        this.downloadPopCtrl = null,
        this.favoViewCtrl = null,
        this.wallpaperCtrl = null,
        this.responsiveCtrl = null
    }
    var i = t("common:widget/ui/base/base"),
    o = (t("common:widget/ui/utils/utils"), t("common:widget/ui/base/events")),
    n = t("searchdetail:widget/ui/databinder/databind"),
    l = t("searchdetail:widget/ui/controls/imgtoolbar/zoomview/zoomview"),
    s = t("searchdetail:widget/ui/controls/imgtoolbar/qrcodepop/qrcodepop"),
    r = t("searchdetail:widget/ui/controls/imgtoolbar/downloadpop/downloadpop"),
    a = t("searchdetail:widget/ui/controls/imgtoolbar/favo/favoview"),
    d = t("searchdetail:widget/ui/controls/imgtoolbar/wallpaper/wallpaper"),
    h = t("searchdetail:widget/ui/controls/fullscreen/fullscreen"),
    u = t("searchdetail:widget/ui/models/settingmodel"),
    p = t("searchdetail:widget/ui/controls/responsive/responsive"),
    c = (t("searchdetail:widget/ui/app/pagemodel"), t("searchdetail:widget/ui/statistic/statistic-core"));
    return i.extend(e.prototype, o, {
        init: function(t, e) {
            this.imgModel = e,
            this.$pnl = i(this.$pnl);
            var o = this.elements,
            n = this.$pnl;
            i.browser.msie && i.browser.version <= 9 && i(o.shituBtn).hide();
            for (var d in o) o.hasOwnProperty(d) && (o[d] = n.find(o[d]));
            this.zoomViewCtrl = new l({
                scale: o.zoomScale,
                zoomIn: o.zoomIn,
                zoomOut: o.zoomOut,
                zoomToggle: o.zoomToggle,
                img: this.opts.img,
                imgPnl: this.opts.imgPnl
            }),
            this.zoomViewCtrl.init(),
            this.qrcodePopCtrl = new s,
            this.qrcodePopCtrl.setTrigger(o.toPhoneBtn),
            window.downloadPopCtrl = this.downloadPopCtrl = new r,
            this.downloadPopCtrl.setTrigger(o.downloadLink),
            this.favoViewCtrl = new a(o.favoBtn),
            this.favoViewCtrl.init(),
            this.setDutuSwitcherText(),
            this._bindEvent()
        },
        _bindEvent: function() {
            var t = this.elements,
            e = this;
            t.toPhoneBtn.on("click",
            function(t) {
                t.preventDefault(),
                e.qrcodePopCtrl.visible || e.qrcodePopCtrl.show()
            }),
            t.downloadLink.on("click",
            function(t) {
                t.preventDefault(),
                e.downloadPopCtrl.visible || e.downloadPopCtrl.show()
            }),
            t.dutuSwitcher.on("click",
            function() {
                var t = e.toggleDutuSetting();
                c.send("5.1009109", {
                    tn: "baiduimagedetail",
                    fm: "face",
                    act: t ? "open": "close"
                })
            }),
            t.shituBtn.click(function() {
                i.cookie("uploadTime", Date.now(), {
                    path: "/"
                })
            })
        },
        bindModel: function(t, e) {
            n.bind(t, "scale", this.zoomViewCtrl, "updateScale", "changeScale"),
            n.bind(t, "imgData", this, "update"),
            n.bind(t, "bigImgUrl", this, "refreshState"),
            this._initFullScreenCtrl(e, t),
            h && n.bind(t, "imgData", h, "update"),
            this.wallpaperCtrl = d.init(this.elements.wallpaperBtn),
            this.wallpaperCtrl && n.bind(t, "imgData", this.wallpaperCtrl, "update"),
            this.downloadPopCtrl && n.bind(t, "imgData", this.downloadPopCtrl, "updateShallow"),
            this.downloadPopCtrl && n.bind(t, "imgDeepData", this.downloadPopCtrl, "update")
        },
        _initFullScreenCtrl: function(t, e) {
            return this.fullScreenCtrl = h.init(t, e, this.elements.fullScreenBtn),
            this.fullScreenCtrl
        },
        _initResponsive: function() {
            var t = this.elements,
            e = [t.toPhoneBtn, t.favoBtn, t.reportLink],
            i = [t.zoomOut, t.zoomScale, t.zoomIn, t.downloadLink];
            this.wallpaperCtrl && i.push(t.wallpaperBtn),
            this.fullScreenCtrl && i.push(t.fullScreenBtn),
            this.responsiveCtrl = new p(e, i)
        },
        update: function(t, e) {
            function i() {
                var e = t.group,
                i = t.star_face,
                o = t.auto_info,
                n = "clothcard" == e ? t.cloth: null,
                l = t.wiki_face_entity,
                s = t.srv_auto,
                r = [],
                a = [];
                if (o && 1 == o.length && s && a.push(o[0]), i && i.length > 0 && l && l.length > 0) {
                    var d, h;
                    for (d = l.length - 1; d >= 0; d--) for (h = i.length - 1; h >= 0; h--) i[h].entity === l[d].ne && r.unshift(i[h])
                }
                var u = a.length > 0 || r.length > 0 || n;
                return u
            }
            this.responsiveCtrl || (this.$pnl.show(), this._initResponsive(), this.responsiveCtrl.resize(this.$pnl.parent().width()));
            var o = this.elements;
            "1" === t.youtuType ? o.downloadLink.addClass("bar-btn-disabled").attr("href", "javascript:void(0);") : o.downloadLink.removeClass("bar-btn-disabled").attr("href", "/search/down?tn=download&word=download&ie=utf8&fr=detail&url=" + encodeURIComponent(t.objURL) + "&thumburl=" + encodeURIComponent(t.thumbURL)),
            this.qrcodePopCtrl && this.qrcodePopCtrl.update(t, e),
            this.favoViewCtrl.update(t, e),
            i(),
            o.dutuSwitcher.hide(),
            this.showSetNum(e);
            var n = "https://graph.baidu.com/details?image=" + encodeURIComponent(t.thumbURL || t.bigImgUrl || t.objURL) + "&isfromtusoupc=1&tn=pc&carousel=0&promotion_name=pc_image_shitulist&extUiData%5bisLogoShow%5d=1";
            o.shituBtn.attr("href", n)
        },
        refreshState: function(t) {
            var e = ["wallpaperBtn", "zoomScale", "zoomIn", "zoomOut", "downloadLink", "toPhoneBtn"],
            o = "disabled",
            n = !!t,
            l = this.elements;
            i(e).each(function(t, e) {
                var i = l[e];
                n && i.hasClass(o) ? i.removeClass(o) : n || i.hasClass(o) || i.addClass(o)
            })
        },
        showSetNum: function(t) {
            var e = t.data.spn + 1,
            o = t.data.rootImg.bdSetImgNum;
            i(".btn-setnum-index").text(e),
            i(".btn-setnum-total").text(o),
            0 == o ? i(".btn-setnum").css("display", "none") : i(".btn-setnum").css("display", "inline-block")
        },
        resetSize: function() {
            var t = this.$pnl.parent().width();
            this.responsiveCtrl && this.responsiveCtrl.resize(t),
            this.qrcodePopCtrl && this.qrcodePopCtrl.refreshPos(),
            this.downloadPopCtrl && this.downloadPopCtrl.refreshPos(),
            this.favoViewCtrl && (this.favoViewCtrl.pop && this.favoViewCtrl.pop.refreshPos(), this.favoViewCtrl.tip && this.favoViewCtrl.tip.refreshPos()),
            this.zoomViewCtrl && this.zoomViewCtrl.resetImgPnlSize(); {
                var e = this.elements;
                e.reportLink.offset()
            }
        },
        setReportLinkState: function(t) {
            var e = this.elements.reportLink;
            t && e.hasClass("disabled") ? e.removeClass("disabled") : t || e.hasClass("disabled") || e.addClass("disabled")
        },
        setDutuSwitcherText: function() {
            var t = !!u.getValue(u.DUTU_TAG_CLOSE),
            e = t ? "打开图上标签": "关闭图上标签";
            this.elements.dutuSwitcher.html('<span class="b-before"></span>' + e + "<i></i>").attr("title", e)
        },
        toggleDutuSetting: function() {
            var t = !!u.getValue(u.DUTU_TAG_CLOSE);
            return u.setValue(u.DUTU_TAG_CLOSE, t ? "": "1"),
            this.setDutuSwitcherText(),
            t && i("#dutu-anchor-wrapper").css("display", ""),
            t && this.elements.dutuSwitcher.trigger("mouseover"),
            !!t
        }
    }),
    e
});;
/*!searchdetail:widget/ui/controls/imgtoolbarnew/zoomview/zoomview.js*/
define("searchdetail:widget/ui/controls/imgtoolbarnew/zoomview/zoomview",
function(t) {
    function i(t, i) {
        this.elements = {
            zoomIn: t.zoomIn,
            zoomOut: t.zoomOut,
            scale: t.scale,
            zoomToggle: t.zoomToggle,
            img: t.img,
            imgPnl: t.imgPnl
        },
        this.lastImgModel = null,
        this.zoomInBtn = null,
        this.zoomOutBtn = null,
        this.zoomToggle = null,
        this._timerFrag = e("<div></div>"),
        this.options = e.extend({
            minScale: .1,
            maxScale: 10,
            step: .25
        },
        i),
        this.scale = 1
    }
    var e = t("common:widget/ui/base/base"),
    n = t("common:widget/ui/base/events"),
    o = t("searchdetail:widget/ui/controls/pressbtn/pressbtn");
    return e.extend(i.prototype, n, {
        init: function() {
            var t = this.elements;
            for (var i in t) t.hasOwnProperty(i) && (this.elements[i] = e(t[i]));
            this.zoomInBtn = new o(t.zoomIn),
            this.zoomInBtn.init(),
            this.zoomOutBtn = new o(t.zoomOut),
            this.zoomOutBtn.init(),
            this._bindEvent()
        },
        _bindEvent: function() {
            this._bindBtnEvent(this.zoomInBtn, !0),
            this._bindBtnEvent(this.zoomOutBtn, !1);
            var t = this;
            this.elements.zoomToggle.on("click",
            function() {
                var i = e(this);
                if (!i.hasClass("btn-imgtoggle-disable")) {
                    var n = "1" == i.attr("data-adapt");
                    t.fire("viewModeChanged", {
                        mode: n ? "adapt": "origin"
                    })
                }
            })
        },
        _bindBtnEvent: function(t, i) {
            var e = this,
            n = this.options.step * (i ? 1 : -1),
            o = i ? this.options.maxScale: this.options.minScale;
            t.on("clicked",
            function() {
                e._timerFrag.stop(),
                e.changeScale(n, !0)
            }),
            t.on("pressing",
            function() {
                e._startChangeTimer(o)
            }),
            t.on("pressEnd",
            function() {
                e._timerFrag.stop()
            })
        },
        _getZoomDuration: function(t, i, e) {
            return 1 > i ? 1 >= t ? (t - i) * e: (1 - i + (t - 1) / this.options.maxScale) * e: t >= 1 ? (i - t) / this.options.maxScale * e: ((i - 1) / this.options.maxScale + (1 - t)) * e
        },
        _startChangeTimer: function(t) {
            var i = this;
            this._timerFrag.width(this.scale).animate({
                width: t
            },
            {
                duration: this._getZoomDuration(this.scale, t, 2e3),
                easing: "linear",
                step: function(t) {
                    i.changeScale(t, !1)
                }
            })
        },
        changeScale: function(t, i) {
            var e = i ? (1 + t) * this.scale: t;
            return e = Math.min(e, this.options.maxScale),
            e = Math.max(e, this.options.minScale)
        },
        updateScale: function(t) {
            this.scale = t,
            this.elements.scale.text(Math.floor(100 * t) + "%"),
            this._updateToggleBtnState()
        },
        resetImgPnlSize: function() {
            this._updateToggleBtnState()
        },
        _updateToggleBtnState: function() {
            var t = this.elements,
            i = t.img.width(),
            e = t.img.height(),
            n = t.imgPnl.width(),
            o = t.imgPnl.height();
            i > n || e > o || 1 == this.scale ? t.zoomToggle.html('<span class="b-before"></span>合适尺寸<i></i>').attr("data-adapt", "1").attr("title", "合适尺寸") : t.zoomToggle.html('<span class="b-before"></span>原始尺寸<i></i>').attr("data-adapt", "").attr("title", "原始尺寸");
            var s = "btn-imgtoggle-disable";
            n >= i && o >= e && 1 == this.scale ? t.zoomToggle.hasClass(s) || t.zoomToggle.addClass(s) : t.zoomToggle.hasClass(s) && t.zoomToggle.removeClass(s)
        }
    }),
    i
});;
/*!searchdetail:widget/ui/controls/imgtoolbarnew/materialinfo/materialinfo.js*/
define("searchdetail:widget/ui/controls/imgtoolbarnew/materialinfo/materialinfo",
function(t) {
    function i(t, i) {
        i = e.extend({
            dataKey: "sucai_info",
            sucaiTpl: ['<div class="material">', "<span>其他格式:", '<span class="size-info">', '<span class="info-text info-type"></span>', '<span class="vsep">|</span><span class="info-text info-type"></span>', '<span class="vsep">|</span><span class="info-text info-dpi"></span>', '<span class="vsep">|</span><span class="info-text info-size"></span>', "</span>", "</span>", '<p class="url-info">', '<a class="cardbtn cardbtn-small linkbtn" href="javascript:void(0);" target="_blank">前往下载</a>', "</p>", "</div>"].join("")
        },
        i),
        this._validData = null,
        t = e.extend({
            list: ".info-list"
        },
        t)
    }
    var e = t("common:widget/ui/base/base"),
    a = t("common:widget/ui/utils/utils"),
    s = (t("common:widget/ui/base/events"), t("searchdetail:widget/ui/utils/lib")),
    n = t("searchdetail:widget/ui/utils/imghelper"),
    p = t("searchdetail:widget/ui/controls/card/base/base");
    return e.extend(i.prototype, p.prototype, {
        checkState: function(t) {
            var i = p.prototype.checkState.call(this, t);
            if (i.hasContent && i.changed) {
                var a = this;
                this._validData = e(i.dataObj).filter(function(t, i) {
                    return i.fm ? a.isEmpty(i.w) && a.isEmpty(i.dpi) && a.isEmpty(i.filesize) ? !1 : !0 : !1
                }),
                i.hasContent = !(!this._validData || !this._validData.length)
            }
            return i
        },
        isEmpty: function(t) {
            return ! t || "0" == t
        },
        updateView: function(t) {
            var i, p = e("<ul></ul>"),
            l = this;
            e(t).each(function(t, o) {
                if (t > 0) return ! 1;
                i = e(l.opts.itemTpl).appendTo(p);
                var r = i.find(".material .info-dpi"),
                d = i.find(".material .info-type"),
                f = i.find(".material .info-size"),
                c = i.find(".info-bytes");
                linkbtn = i.find(".linkbtn"),
                infoSite = i.find(".src-site"),
                infoExt = {
                    s: (o.w || "0") + "x" + (o.h || "0")
                },
                d.text(o.fm.toUpperCase()),
                r.text((o.dpi || "") + "dpi"),
                l.isEmpty(o.dpi) ? r.hide().prev().hide() : r.show().prev().show(),
                l.isEmpty(o.w) ? f.hide().prev().hide() : f.html(o.w + "&#215;" + o.h).prev().show();
                var h = 1 * (o.filesize || 0);
                h ? c.text(n.formatBytes(h).toUpperCase()).show().prev().show() : c.hide().prev().hide(),
                linkbtn.attr("href", o.furl);
                var u = o.siteName || s.getSiteName(o.site);
                infoSite.attr("href", "http://" + o.site).find("span").text(a.cutHtmlText(u, 14, "...")),
                i.find("a").attr("log-ext", e.json.stringify(infoExt))
            }),
            this.elements.list.empty().append(p.children())
        }
    }),
    i
});;
/*!searchdetail:widget/ui/controls/imgtoolbarnew/qrcodepop/qrcodepop.js*/
define("searchdetail:widget/ui/controls/imgtoolbarnew/qrcodepop/qrcodepop",
function(t) {
    function e(t) {
        t = i.extend({
            className: "qrcode-pop",
            hasArrow: !0,
            hasClose: !0
        },
        t),
        a.call(this, t),
        this.codeImgSize = {
            width: 130,
            height: 130
        },
        this.setContent(n),
        this.imgData = null,
        this._validData = null,
        this.imgChanged = !1,
        this.qrcodeBuilder = new s(this.codeImgSize)
    }
    var i = t("common:widget/ui/base/base"),
    a = t("searchdetail:widget/ui/controls/pop/pop"),
    s = t("searchdetail:widget/ui/qrcode/qrcode");
    BaseCardControl = t("searchdetail:widget/ui/controls/card/base/base"),
    MaterialInfoControl = t("searchdetail:widget/ui/controls/imgtoolbarnew/materialinfo/materialinfo"),
    utils = t("common:widget/ui/utils/utils"),
    events = t("common:widget/ui/base/events"),
    lib = t("searchdetail:widget/ui/utils/lib"),
    baiduSwf = t("searchdetail:widget/ui/utils/swf"),
    imghelper = t("searchdetail:widget/ui/utils/imghelper"),
    statistic = t("searchdetail:widget/ui/statistic/statistic-core");
    var n = ['<div class="top">', '<div class="left">', '<div class="download-img">', "</div>", '<p class="download-btn">', '<a id="btnDownload" logkey="download" class="cardbtn cardbtn-small" href="#" title="保存原图到电脑" hidefocus="true">下载原图至本地</a>', "</p>", "</div>", '<div class="vsep"></div>', '<div class="right">', '<p class="title-row">扫一扫到手机</p>', '<div class="qrcode"></div>', "</div>", "</div>", '<div class="bottom">', '<div class="wallpaper">', "</div>", '<div class="center">', "</div>", '<div class="material">', "</div>", "</div>"].join(""),
    l = ['<p class="sucai-title">图片格式:</p>', '<div class="size-info">', '<p class="info-first info-text info-type"></p>', '<p class="text2"><span class="vsepnew vsep2">|</span><span class="info-text info-dpi"></span></p>', '<p class="text2"><span class="vsepnew">|</span><span class="info-text info-size"></span></p>', "</div>", '<p class="url-info clearfix">', '<a logkey="meterial" class="cardbtn cardbtn-small linkbtn" href="javascript:void(0);" target="_blank">前往下载</a>', "</p>"].join(""),
    o = ['<p class="bizhi-title">壁纸下载:</p>', '<div class="size-info">', '<p class="info-first info-text info-size"></p>', '<p class="text2"><span class="vsepnew vsep2">|</span><span class="info-text info-bytes"></span></p>', '<p class="text2"><span class="vsepnew">|</span><span class="info-text info-type"></span></p>', "</div>", '<p class="url-info clearfix">', '<a logkey="wallpaper" class="cardbtn cardbtn-small preview-btn" href="javascript:void(0);">预览<span class="flashcon"></span></a>', '<a logkey="wallpaper" class="cardbtn cardbtn-small download-btn" href="javascript:void(0);">下载</a>', "</p>"].join("");
    return i.extend(e.prototype, a.prototype, {
        _validMaterial: function(t) {
            var e = null,
            a = this;
            return this._validData = i(t).filter(function(t, e) {
                return e.fm ? a.isEmpty(e.w) && a.isEmpty(e.dpi) && a.isEmpty(e.filesize) ? !1 : !0 : !1
            }),
            e = this._validData[0]
        },
        _validWallpaper: function(t) {
            var e = window.screen.width,
            a = window.screen.height;
            validWallpaper = null;
            return this._validData = i(t).filter(function(t, i) {
                return i.w >= e && i.h >= a
            }),
            this._validData = i(this._validData).sort(function(t, e) {
                return t.w != e.w ? t.w > e.w: t.h > e.h
            }),
            validWallpaper = this._validData[0]
        },
        isEmpty: function(t) {
            return ! t || "0" == t
        },
        updateMaterial: function(t) {
            var e, a = i("<ul></ul>"),
            s = this;
            return i(t).each(function(t, n) {
                if (t > 0) return ! 1;
                e = i(l).appendTo(a);
                var o = e.find(".info-dpi"),
                r = e.find(".info-type"),
                d = e.find(".info-size"),
                h = e.find(".info-bytes"),
                p = e.find(".linkbtn"),
                c = e.find(".src-site"),
                f = {
                    s: (n.w || "0") + "x" + (n.h || "0")
                };
                r.text(n.fm.toUpperCase()),
                o.text((n.dpi || "") + "dpi"),
                s.isEmpty(n.dpi) ? o.hide().prev().hide() : o.show().prev().show(),
                s.isEmpty(n.w) ? d.hide().prev().hide() : d.html(n.w + "&#215;" + n.h).prev().show();
                var m = 1 * (n.filesize || 0);
                m ? h.text(imghelper.formatBytes(m).toUpperCase()).show().prev().show() : h.hide().prev().hide(),
                p.attr("href", n.furl);
                var w = n.siteName || lib.getSiteName(n.site);
                c.attr("href", "http://" + n.site).find("span").text(utils.cutHtmlText(w, 14, "...")),
                e.find("a").attr("log-ext", i.json.stringify(f))
            }),
            s.statisticBlocks.push("meterial"),
            a
        },
        updateWallpaper: function(t) {
            var e, a = i("<ul></ul>"),
            s = this,
            n = [];
            return i(t).each(function(t, s) {
                if (t > 0) return ! 1;
                e = i(o).appendTo(a);
                var l = e.find(".info-type"),
                r = e.find(".info-size"),
                d = e.find(".info-bytes"),
                h = e.find(".preview-btn"),
                p = e.find(".download-btn"),
                c = e.find(".src-site"),
                f = {
                    s: (s.w || "0") + "x" + (s.h || "0")
                },
                m = s.fm || imghelper.getFileType(s.objurl);
                l.text(m.toUpperCase()),
                r.html(s.w + "&#215;" + s.h);
                var w = 1 * (s.size || 0);
                w ? d.text(imghelper.formatBytes(w, 0, Math.floor).toUpperCase()).show().prev().show() : d.hide().prev().hide(),
                h.attr("data-src", s.objurl),
                p.attr("href", "/search/down?tn=download&word=download&ie=utf8&fr=detail&url=" + encodeURIComponent(s.objurl)),
                c.attr("href", "http://" + s.s).find("span").text(s.siteName || lib.getSiteName(s.s)),
                n.push({
                    id: "wallpcard_preview_" + t,
                    width: s.w,
                    height: s.h,
                    imgSrc: s.objurl,
                    flashCon: e.find(".preview-btn .flashcon")
                }),
                e.find("a").attr("log-ext", i.json.stringify(f))
            }),
            i(n).each(function(t, e) {
                s.initPreview(e.id, e.imgSrc, e.width, e.height, e.flashCon.get(0))
            }),
            s.statisticBlocks.push("wallpaper"),
            a
        },
        initPreview: function(t, e, i, a, s) {
            e = "/search/down?tn=download&word=download&ie=utf8&fr=detailWall&url=" + encodeURIComponent(e) + "&height=" + a + "&width=" + i,
            baiduSwf.swf.create({
                id: t,
                width: "74",
                height: "30",
                ver: "9.0.28",
                errorMessage: "请下载最新的Flash播放器！",
                url: "/static/flash/WallpaperImagesv103.swf",
                bgcolor: "#ffffff",
                wmode: "transparent",
                allowfullscreen: "true",
                vars: {
                    preview: 2,
                    system: this.gatSystem(),
                    imagesurl: e
                }
            },
            s)
        },
        gatSystem: function() {
            var t = "";
            return t = "Win32" == navigator.platform ? navigator.userAgent.indexOf("Windows NT 5") > -1 ? "xp": "win7": "xp"
        },
        update: function(t) {
            this.imgData = t,
            this.imgChanged = !0
        },
        _beforeShow: function() {
            var t = this;
            if (this.imgChanged) {
                this.statisticBlocks = ["download", "qrcode"],
                this.imgChanged = !1; {
                    var e = this.imgData,
                    a = this.$element,
                    t = this;
                    this.elementSize,
                    this.codeImgSize
                }
                downloadThisLink = i("#btnDownload"); {
                    e.width + "&#215;" + e.height
                }
                downloadThisLink.attr("href", "/search/down?tn=download&word=download&ie=utf8&fr=detail&url=" + encodeURIComponent(e.objURL) + "&thumburl=" + encodeURIComponent(e.thumbURL)),
                i(downloadThisLink).on("click",
                function(t) {
                    t.stopPropagation(),
                    t.preventDefault();
                    i(this).attr("href");
                    window.open(i(this).attr("href"))
                }),
                this.qrcodeBuilder.get(e.objURL).then(function(t) {
                    a.find(".qrcode").html(t.dom).css({
                        width: t.width,
                        height: t.height
                    })
                });
                var n = t._validMaterial(e.sucai_info),
                l = t._validWallpaper(e.wallp_info);
                if (n && "0" != n && (!l || 0 == l.length)) {
                    t.elementSize = {
                        width: 330,
                        height: 286
                    },
                    t.$element.css(t.elementSize),
                    t.qrcodeBuilder = new s(t.codeImgSize);
                    var o = this.updateMaterial(n);
                    i(".bottom").addClass("line"),
                    i(".bottom").removeClass("double"),
                    i(".bottom .material").html(o.children()),
                    i(".bottom .wallpaper").html(""),
                    this.opts.contentHeight = 286
                }
                if (l && "0" != l && (!n || 0 == n.length)) {
                    t.elementSize = {
                        width: 330,
                        height: 286
                    },
                    t.$element.css(t.elementSize),
                    t.qrcodeBuilder = new s(t.codeImgSize);
                    var o = this.updateWallpaper(l);
                    i(".bottom").removeClass("double"),
                    i(".bottom .wallpaper").html(o.children()),
                    i(".bottom .material").html(""),
                    i(".bottom").addClass("line"),
                    this.opts.contentHeight = 286
                }
                if (l && "0" != l && n && "0" != n) {
                    t.elementSize = {
                        width: 330,
                        height: 307
                    },
                    t.$element.css(t.elementSize),
                    t.qrcodeBuilder = new s(t.codeImgSize);
                    var r = this.updateMaterial(n),
                    d = this.updateWallpaper(l);
                    i(".bottom .material").html(r.children()),
                    i(".bottom .wallpaper").html(d.children()),
                    i(".bottom").addClass("line"),
                    i(".bottom").addClass("double"),
                    this.opts.contentHeight = 307
                } else l || n || (t.elementSize = {
                    width: 330,
                    height: 196
                },
                t.$element.css(t.elementSize), t.qrcodeBuilder = new s(t.codeImgSize), i(".bottom .material").html(""), i(".bottom .wallpaper").html(""), i(".bottom").removeClass("line"), this.opts.contentHeight = 196);
                statistic.send("5.1010000", {
                    tn: "baiduimagedetail",
                    tag: "card",
                    fm: t.statisticBlocks.join(",")
                }),
                t.$element.find("a").each(function(t, e) {
                    var e = i(e),
                    a = e.attr("href");
                    e.on("click",
                    function() {
                        statistic.send("5.15", {
                            tn: "baiduimagedetail",
                            tag: "card",
                            fm: e.attr("logkey"),
                            site: encodeURIComponent(a)
                        })
                    })
                }),
                t.refreshPos()
            }
        }
    }),
    e
});;
/*!searchdetail:widget/ui/controls/imgtoolbarnew/downloadtip/downloadtip.js*/
define("searchdetail:widget/ui/controls/imgtoolbarnew/downloadtip/downloadtip",
function(e) {
    function t() {
        this.$element = i('<div class="download-tip-content"><span class="tip-close"></span></div>'),
        this.$close = this.$element.find(".tip-close")
    }
    var i = e("common:widget/ui/base/base");
    return i.extend(t.prototype, {
        init: function(e) {
            this.$element = this.$element.appendTo(e),
            i.cookie("closedownloadtip") || (this.$element.show(), this.$close.on("click",
            function() {
                i(this).parent().remove(),
                i.cookie("closedownloadtip", !0)
            }))
        },
        repos: function(e) {
            e ? this.$element.css("margin-left", "125px") : this.$element.css("margin-left", "200px")
        }
    }),
    t
});;
/*!searchdetail:widget/ui/controls/imgtoolbarnew/favo/favopop.js*/
define("searchdetail:widget/ui/controls/imgtoolbarnew/favo/favopop",
function(t) {
    function e(t) {
        t = l.extend({
            className: "favo-pop",
            hasArrow: !0,
            hasClose: !0
        },
        t),
        n.call(this, t),
        this.setContent(a),
        this.descInput = null,
        this.albumListCtrl = null,
        this.newAlbumNameEle = null
    }
    var l = t("common:widget/ui/base/base"),
    i = (t("common:widget/ui/utils/utils"), t("common:widget/ui/dropdownlist/dropdownlist")),
    n = t("searchdetail:widget/ui/controls/pop/pop"),
    a = ['<div class="favo-content">', '<div class="album-row"><label>专辑：</label><select name="albumId"></select></div>', '<div class="desc-row"><label>描述：</label><textarea name="desc"></textarea></div>', '<p class="button-row"><a href="#" class="pop-okbtn">确定</a></p>', "</div>"].join("");
    return l.extend(e.prototype, n.prototype, {
        init: function() {
            n.prototype.init.call(this);
            var t = this;
            this.$element.find(".pop-okbtn").on("click",
            function(e) {
                e.preventDefault(),
                t.fire("onok", {
                    data: t._collectFormData()
                })
            }),
            this.descInput = this.$element.find(".desc-row textarea"),
            this.albumListCtrl = this._initAlbumDDLCtrl()
        },
        _initAlbumDDLCtrl: function() {
            var t = i.create({
                select: this.$element.find(".album-row select"),
                attrs: {
                    column: 5,
                    width: 170
                },
                box: l(['<div class="x-createalbum">', '<div class="box-ipt clearfix">', '<input type="text" name="albumName" title="创建新相册">', '<button class="btn-new-album">创建</button>', "</div>", "<div>"].join(""))
            }),
            e = this;
            return this.newAlbumNameEle = this.$element.find("[name=albumName]"),
            this.$element.find(".btn-new-album").on("click", this._onNewAlbumClick.bind(this)),
            t.change(function() {
                e.fire("albumSelectChange", {
                    value: t.val()
                })
            }),
            t
        },
        addAlbumOption: function(t) {
            this.albumListCtrl.add(t)
        },
        resetNewAlbumName: function() {
            this.newAlbumNameEle && this.newAlbumNameEle.val("")
        },
        setDesc: function(t) {
            this.descInput.val(t || "")
        },
        _collectFormData: function() {
            return {
                albumId: this.albumListCtrl.val(),
                desc: this.descInput.val()
            }
        },
        _onNewAlbumClick: function() {
            this.fire("newAlbumClicked", {
                albumName: this.newAlbumNameEle.val()
            })
        }
    }),
    e
});;
/*!searchdetail:widget/ui/controls/imgtoolbarnew/favo/favotip.js*/
define("searchdetail:widget/ui/controls/imgtoolbarnew/favo/favotip",
function(t) {
    function e(t) {
        t = i.extend({
            className: "favotip-pop",
            hasArrow: !0,
            hasClose: !0
        },
        t),
        a.call(this, t),
        this.setContent(n),
        this.$text = this.$element.find(".tip-text"),
        this.$link = this.$element.find(".tip-link")
    }
    var i = t("common:widget/ui/base/base"),
    a = t("searchdetail:widget/ui/controls/pop/pop"),
    n = ['<div class="tip-content">', '<span class="tip-text"></span>', '<a class="tip-link" href="http://image.baidu.com/picturefav/fav" target="_blank">去我的图片查看</a>', "</div>"].join("");
    return i.extend(e.prototype, a.prototype, {
        setTipText: function(t) {
            this.$text.html(t)
        }
    }),
    e
});;
/*!searchdetail:widget/ui/controls/imgtoolbarnew/favo/favoview.js*/
define("searchdetail:widget/ui/controls/imgtoolbarnew/favo/favoview",
function(t) {
    function i(t) {
        this.$button = t,
        this.imgData = null,
        this.pop = null,
        this.tip = null
    }
    var e = t("common:widget/ui/base/base"),
    o = t("common:widget/ui/utils/utils"),
    a = t("common:widget/ui/base/events"),
    n = t("common:widget/ui/browser-storage/browser-storage"),
    s = t("common:widget/ui/message/message"),
    l = t("searchdetail:widget/ui/app/pagemodel"),
    c = t("searchdetail:widget/ui/statistic/statistic-core"),
    p = t("searchdetail:widget/ui/collections/albumcollection"),
    u = t("searchdetail:widget/ui/controls/imgtoolbarnew/favo/favopop"),
    r = t("searchdetail:widget/ui/controls/imgtoolbarnew/favo/favotip");
    return e.extend(i.prototype, a, {
        init: function() {
            var t = this;
            this.$button.on("click",
            function(i) {
                i.preventDefault(),
                l.data.userName ? t.albumCollection ? (t.albumCollection.userName = l.data.userName, t.albumCollection.bdstoken = l.data.bdstoken, t.albumCollection.dataProxy.reqParams.uid = encodeURIComponent(l.data.userName), t.albumCollection.get().then(function(i) {
                    i && i.length ? t._showInputPop(i) : t._savePic()
                })) : t._saveToLocal() : t.popLogin()
            })
        },
        popLogin: function() {
            var t = this;
            e.getScript("//passport.baidu.com/passApi/js/uni_login_wrapper.js?cdnversion=" + (new Date).getTime(),
            function() {
                var i = e("#passLog");
                if (i) {
                    i.attr("href", "javascript:void(0);");
                    var o = {
                        tangram: !0,
                        cache: !1,
                        apiOpt: {
                            product: "im",
                            staticPage: location.protocol + "//" + location.host + "/static/searchresult/html/v3Jump.html",
                            memberPass: !0,
                            u: location.href,
                            qrcode: 3
                        },
                        authsite: ["tsina", "renren", "qzone"],
                        authsiteCfg: {
                            tpl: "im",
                            display: "popup",
                            act: "optional",
                            jumpUrl: location.protocol + "//" + location.host + "/static/imgsearch/html/xd.html",
                            onBindSuccess: function() {
                                return e.cookie("BDIMGISLOGIN", 1),
                                c && c.send("5.1010200", {
                                    tn: "baiduimagedetail",
                                    act: "loginsucess"
                                }),
                                location.reload(),
                                !1
                            }
                        },
                        onLoginSuccess: function(t) {
                            e.cookie("BDIMGISLOGIN", 1),
                            c && c.send("5.1010200", {
                                tn: "baiduimagedetail",
                                act: "loginsucess"
                            }),
                            t.returnValue = !1,
                            location.reload()
                        },
                        onShow: function() {
                            t.trigger("loginPop.show"),
                            c && c.send("5.1010200", {
                                tn: "baiduimagedetail",
                                act: "loginshow"
                            })
                        },
                        onHide: function() {
                            t.trigger("loginPop.hide"),
                            e("#passport-login-pop").remove()
                        }
                    },
                    a = passport.pop.init(o);
                    a.show()
                }
            })
        },
        setAlbumCollection: function(t) {
            this.albumCollection = t
        },
        userNameChanged: function() {
            this.setAlbumCollection(new p(l.data.userName, l.data.bdstoken))
        },
        update: function(t) {
            var i = this;
            this.imgData = t,
            this._updatePop(t);
            var o = parseInt(e.cookie("BDIMGISLOGIN"));
            1 === o && i.$button.trigger("click"),
            e.cookie("BDIMGISLOGIN", 0)
        },
        _updatePop: function(t) {
            if (this.pop) {
                var i = t.fromPageTitle || "";
                this.pop.setDesc(o.trimTags(i))
            }
        },
        _initPop: function(t) {
            var i, e = new u,
            o = n.api.get({
                key: "_local_album_key_"
            }),
            a = o && o.value,
            s = t && t.length && t[0].id,
            l = this;
            e.init();
            for (var c = 0,
            p = t.length; p > c; c++) i = t[c],
            e.addAlbumOption({
                text: i.name,
                value: i.id
            }),
            i.id == a && (s = a);
            return e.albumListCtrl.val(s),
            e.setTrigger(this.$button),
            this.pop = e,
            e.on("onok",
            function(t) {
                l._savePic(t.data)
            }),
            e.on("newAlbumClicked", this._onPopNewAlbumClicked.bind(this)),
            e.on("albumSelectChange", this._onPopAlbumSelectChange.bind(this)),
            e
        },
        _onPopNewAlbumClicked: function(t) {
            if (t.albumName) {
                var i = this;
                this.albumCollection.addAlbum(t.albumName).done(function(t) {
                    i.pop.addAlbumOption({
                        text: t.name,
                        value: t.id
                    }),
                    i.pop.resetNewAlbumName(),
                    i.pop.albumListCtrl.val(t.id + ""),
                    i.pop.albumListCtrl.hide(),
                    new s("创建相册成功", {
                        type: "info"
                    })
                }).fail(function(t) {
                    var e = t && t.status && t.status.msg || "创建相册失败，请选择其他相册";
                    t && t.data && (i.pop.albumListCtrl.val(t.data.id), e = "相册已存在"),
                    new s(e, {
                        type: "error"
                    })
                })
            } else new s("请输入名称", {
                type: "error"
            })
        },
        _onPopAlbumSelectChange: function(t) {
            n.api.set({
                key: "_local_album_key_",
                value: t.value,
                expires: 2592e3
            })
        },
        _showInputPop: function(t) {
            this.imgData && (this.pop || (this._initPop(t), this._updatePop(this.imgData)), this.pop.visible || this.pop.show())
        },
        _savePic: function(t) {
            t = t || {
                desc: o.trimTags(this.imgData.fromPageTitle || "")
            };
            var i = this.albumCollection.getPicCollection(t.albumId),
            e = this.imgData,
            a = this;
            i.addPic(e.objURLHttp, {
                desc: t.desc,
                surl: e.fromURL,
                contsign: e.cs
            }).always(function() {
                a.pop && a.pop.hide(),
                a._showEffect(),
                a._showSuccessTip(t, i)
            })
        },
        _showSuccessTip: function(t, i) {
            this.tip ? t.albumId || this.tip.setTipText('已临时收藏<span class="tip-num">' + i.getTotal() + "</span>张图片，") : (this.tip = new r, this.tip.setTipText(t.albumId ? "收藏成功，": '已临时收藏<span class="tip-num">' + i.getTotal() + "</span>张图片，"), this.tip.setTrigger(this.$button)),
            this.tip.show()
        },
        _showAddOne: function(t) {
            var i = e("#fav-add-one"),
            o = new e.Deferred;
            return i[0] || (i = e('<span id="fav-add-one">+1</span>').appendTo("body")),
            i.css({
                position: "absolute",
                top: t.top + 3,
                left: t.left - 22,
                "z-index": 1020,
                display: "block",
                width: "30px",
                height: "30px",
                "font-size": "30px",
                "font-family": "TAHOMA",
                color: "#000",
                opacity: 1
            }).delay(100).animate({
                top: "-=30",
                opacity: 0
            },
            500,
            function() {
                i.hide(),
                o.resolve()
            }),
            o
        },
        _showEffect: function() {
            var t = e("#container").find(".img-container img"),
            i = t.offset(),
            o = this.$button,
            a = o.offset(),
            n = e("<img />").attr({
                src: this.imgData.bigImgUrl || this.imgData.thumbURL
            }),
            s = this,
            l = new e.Deferred,
            c = function() {
                n.css({
                    position: "absolute",
                    top: i.top,
                    left: i.left,
                    width: t.width(),
                    height: t.height(),
                    "z-index": 1020
                }).animate({
                    top: a.top + 10,
                    left: a.left + 50,
                    width: 0,
                    height: 0
                },
                500, "linear",
                function() {
                    n.remove(),
                    s._showAddOne(a).then(function() {
                        l.resolve()
                    })
                })
            };
            return n.ready(c),
            n.appendTo("body"),
            l
        }
    }),
    i
});;
/*!searchdetail:widget/ui/controls/imgtoolbarnew/wallpaper/checkax.js*/
define("searchdetail:widget/ui/controls/imgtoolbarnew/wallpaper/checkax",
function(e, t, i) {
    var n = function(e) {
        var t = function() {
            return "Win32" == e.navigator.platform && e.navigator.userAgent.toLowerCase().indexOf("wow64") <= 0 ? !0 : !1
        },
        i = function() {
            if (t()) if (e.navigator.userAgent.indexOf("MSIE") > 0) try {
                if (document.getElementById("BDWallpaper")) return document.getElementById("BDWallpaper");
                var i = document.createElement("div");
                return i.style.display = "none",
                document.body.appendChild(i),
                i.innerHTML = '<OBJECT ID="BDWallpaper" CLASSID="CLSID:03D2BA47-F4B2-45ba-BD3A-4DE2D5797DAC" ></OBJECT>',
                document.getElementById("BDWallpaper")
            } catch(n) {} else {
                var a = e.navigator.mimeTypes["application/baiduwp-activex"];
                if (a) {
                    var r = e.navigator.mimeTypes["application/baiduwp-activex"];
                    if (r) {
                        if (document.getElementById("BDWallpaper")) return document.getElementById("BDWallpaper");
                        var o = document.createElement("embed");
                        return o.style.visibility = "hidden",
                        o.type = "application/baiduwp-activex",
                        o.width = 0,
                        o.height = 0,
                        o.setAttribute("progid", "wpbpluginAX.BrowserControl.1"),
                        o.setAttribute("id", "BDWallpaper"),
                        document.body.appendChild(o),
                        o
                    }
                }
            }
        },
        n = function() {
            if (t()) {
                if (e.navigator.userAgent.indexOf("MSIE") > 0) try {
                    {
                        new ActiveXObject("wpbpluginAX.BrowserControl.1")
                    }
                } catch(i) {
                    return ! 1
                } else {
                    var n = e.navigator.mimeTypes["application/baiduwp-activex"];
                    if (!n) {
                        if (navigator.plugins) {
                            navigator.plugins.refresh(!1);
                            for (var a = 0; a < navigator.plugins.length; a++) if (navigator.plugins[a][0].type && "application/baiduwp-activex" == navigator.plugins[a][0].type) return ! 0
                        }
                        return ! 1
                    }
                }
                return ! 0
            }
            return alert("Only support windows 32bit!"),
            !1
        },
        a = !1,
        r = function(e, t) {
            n() ? e && "function" == typeof e && !a && (e(), a = !0) : (t || (t = 100), setTimeout(function() {
                r(e, t)
            },
            t))
        };
        return {
            exist: n,
            instance: i,
            checkSys: t,
            pollingCheck: r
        }
    } (window);
    i.exports = n
});;
/*!searchdetail:widget/ui/controls/imgtoolbarnew/wallpaper/wallpaper.js*/
define("searchdetail:widget/ui/controls/imgtoolbarnew/wallpaper/wallpaper",
function(t) {
    function i() {
        this.imgData = {}
    }
    function e(t, i) {
        this.$pnl = t,
        this.$btn = t.find(".btn-wallp-in"),
        this.$flashPnl = t.find(".flashpnl"),
        this.$tip = n(null),
        this._tipHideTimer = !1,
        this.flashCtrl = null,
        this.opts = n.extend({
            popUrl: "http://bizhi.baidu.com/imagepreview/index.html",
            redirectUrl: location.protocol + "//" + location.host + "/static/searchdetail/html/crosswallpaper.html"
        },
        i)
    }
    var n = t("common:widget/ui/base/base"),
    r = t("common:widget/ui/base/events"),
    a = t("searchdetail:widget/ui/utils/swf"),
    l = t("searchdetail:widget/ui/controls/imgtoolbarnew/wallpaper/checkax");
    n.extend(i.prototype, r, {
        init: function() {
            var t = this,
            i = window.BD || {};
            i.IMG = i.IMG || {},
            window.WP9278A0FC9F485dB8C86BAA1688E99F = function() {
                t.pluginProc()
            },
            i.IMG.getCurrImgURL = function() {
                return t.getCurrImgURL()
            },
            i.IMG.setWallPaper = function() {
                t.setWallPaper()
            }
        },
        pluginProc: function() {
            var t = l.instance(),
            i = t.GetErrorCode();
            this.fire("pluginExit", {
                errCode: i
            })
        },
        getCurrImgURL: function() {
            var t = "/search/down?tn=download&word=download&ie=utf8&fr=detailWall&url=",
            i = this.imgData;
            return t + encodeURIComponent(i.objURL) + "&height=" + i.height + "&width=" + i.width
        },
        setWallPaper: function() {
            l && l.exist() ? l.instance().WebSetWallpaper(this.getCurrImgURL()) : this.fire("trySetWallPaper")
        }
    }),
    n.extend(e.prototype, r, {
        init: function() {
            a.swf.create({
                id: "flashPreView",
                url: "/static/searchdetail/flash/WallpaperImages.swf?v=1",
                width: "72",
                height: "30",
                wmode: "transparent",
                allowFullScreen: "true",
                errorMessage: "载入FLASH出错",
                ver: "9.0.0",
                vars: {
                    preview: 1,
                    system: this._getSystemVar(),
                    imagesurl: ""
                }
            },
            this.$flashPnl[0]);
            var t = !!this.$flashPnl.find("object").length;
            return t && (this._initBtnState(), this.flashCtrl = new i, this.flashCtrl.on("trySetWallPaper", this._setWallPaperHandler.bind(this)), this.flashCtrl.on("pluginExit", this._pluginExitHandler.bind(this))),
            t
        },
        _initBtnState: function() {
            if (l.exist()) this.$btn.hide(),
            this.$flashPnl.show();
            else {
                var t = this;
                this.$flashPnl.hide(),
                this.$btn.show().on("click",
                function(i) {
                    i.preventDefault(),
                    t.showPop()
                })
            }
        },
        _getSystemVar: function() {
            var t = "";
            return t = "Win32" == navigator.platform ? navigator.userAgent.indexOf("Windows NT 5") > -1 ? "xp": "win7": "xp"
        },
        update: function(t) {
            this.flashCtrl && (this.flashCtrl.imgData = t),
            t.bigImgUrl && t.width >= 1024 && t.height >= 640 && !/\.nipic\.com/.test(t.objURL) ? this.$pnl.show() : this.$pnl.hide()
        },
        showPop: function() {
            var t = this.flashCtrl.getCurrImgURL(),
            i = this,
            e = '<div id="iframeBg" class="iframeBg"></div><div id="disIframe" class="disIframe"><iframe id="bizi-iframe" frameborder="0" width="907px" height="452px"></iframe></div>';
            if (document.getElementById("iframeBg"));
            else {
                window.__closeWallPaperPop__ = function(t) {
                    i._pluginExitHandler({
                        errCode: t
                    })
                },
                n(document.body).append(e);
                var r = this.opts.popUrl + "?redirecturl=" + encodeURIComponent(this.opts.redirectUrl) + "&imageurl=" + encodeURIComponent(t) + "&" + (new Date).getTime();
                document.getElementById("bizi-iframe").src = r,
                n("#iframeBg").on("click",
                function() {
                    i.hidePop()
                })
            }
        },
        hidePop: function() {
            document.getElementById("iframeBg") && n("#iframeBg").remove(),
            document.getElementById("disIframe") && n("#disIframe").remove()
        },
        showTip: function(t) {
            this.$tip.length || (this.$tip = n('<div class="wallpaper-info"></div>').appendTo(document.body)),
            this._tipHideTimer && (this._tipHideTimer = clearTimeout(this._tipHideTimer)),
            this.$tip.text(t).show();
            var i = this;
            this._tipHideTimer = setTimeout(function() {
                i.$tip.hide()
            },
            1500)
        },
        _setWallPaperHandler: function() {
            this.showPop()
        },
        _pluginExitHandler: function(t) {
            t.errCode && this.showTip(1 == t.errCode ? "设置成功": "设置失败"),
            this.hidePop(),
            this._initBtnState()
        }
    });
    var s = null,
    o = !1;
    return {
        init: function(t) {
            return s || o || (l && l.checkSys() && (s = new e(t), s.init() || (s = null)), s || (o = !0, t.hide())),
            s
        }
    }
});;
/*!searchdetail:widget/ui/controls/imgtoolbarnew/imgtoolbarnew.js*/
define("searchdetail:widget/ui/controls/imgtoolbarnew/imgtoolbarnew",
function(t) {
    function e(t, e, o) {
        this.$pnl = t,
        this.imgModel = null,
        this.elements = i.extend({
            wallpaperBtn: "",
            zoomScale: "",
            zoomIn: "",
            zoomOut: "",
            zoomToggle: "",
            downloadLink: "",
            toPhoneBtn: "",
            favoBtn: "",
            fullScreenBtn: "",
            dutuSwitcher: "",
            reportLink: ""
        },
        e),
        this.opts = i.extend({
            imgPnl: "",
            img: ""
        },
        o),
        this.zoomViewCtrl = null,
        this.fullScreenCtrl = null,
        this.qrcodePopCtrl = null,
        this.favoViewCtrl = null,
        this.wallpaperCtrl = null,
        this.responsiveCtrl = null
    }
    var i = t("common:widget/ui/base/base"),
    o = (t("common:widget/ui/utils/utils"), t("common:widget/ui/base/events")),
    n = t("searchdetail:widget/ui/databinder/databind"),
    l = t("searchdetail:widget/ui/controls/imgtoolbarnew/zoomview/zoomview"),
    s = t("searchdetail:widget/ui/controls/imgtoolbarnew/qrcodepop/qrcodepop"),
    r = t("searchdetail:widget/ui/controls/imgtoolbarnew/downloadtip/downloadtip"),
    a = t("searchdetail:widget/ui/controls/imgtoolbarnew/favo/favoview"),
    d = t("searchdetail:widget/ui/controls/imgtoolbarnew/wallpaper/wallpaper"),
    h = t("searchdetail:widget/ui/controls/fullscreen/fullscreen"),
    u = t("searchdetail:widget/ui/models/settingmodel"),
    p = t("searchdetail:widget/ui/controls/responsive/responsive"),
    c = (t("searchdetail:widget/ui/app/pagemodel"), t("searchdetail:widget/ui/statistic/statistic-core"));
    return i.extend(e.prototype, o, {
        init: function(t, e) {
            this.imgModel = e,
            this.$pnl = i(this.$pnl);
            var o = this.elements,
            n = this.$pnl;
            for (var d in o) o.hasOwnProperty(d) && (o[d] = n.find(o[d]));
            this.zoomViewCtrl = new l({
                scale: o.zoomScale,
                zoomIn: o.zoomIn,
                zoomOut: o.zoomOut,
                zoomToggle: o.zoomToggle,
                img: this.opts.img,
                imgPnl: this.opts.imgPnl
            }),
            this.zoomViewCtrl.init(),
            this.qrcodePopCtrl = new s,
            this.qrcodePopCtrl.setTrigger(o.toPhoneBtn),
            this.favoViewCtrl = new a(o.favoBtn),
            this.favoViewCtrl.init(),
            this.downloadTopControl = new r,
            this.downloadTopControl.init(this.$pnl.parent().parent()),
            this.setDutuSwitcherText(),
            this._bindEvent()
        },
        _bindEvent: function() {
            var t = this.elements,
            e = this;
            t.downloadLink.on("click",
            function(t) {
                t.preventDefault(),
                e.qrcodePopCtrl.visible || e.qrcodePopCtrl.show()
            }),
            t.dutuSwitcher.on("click",
            function() {
                var t = e.toggleDutuSetting();
                c.send("5.1009109", {
                    tn: "baiduimagedetail",
                    fm: "face",
                    act: t ? "open": "close"
                })
            })
        },
        bindModel: function(t, e, i) {
            n.bind(t, "scale", this.zoomViewCtrl, "updateScale", "changeScale"),
            i ? n.bind(t, "imgDeepData", this, "update") : n.bind(t, "imgData", this, "update"),
            n.bind(t, "bigImgUrl", this, "refreshState"),
            this._initFullScreenCtrl(e, t),
            this.wallpaperCtrl = d.init(this.elements.wallpaperBtn),
            this.wallpaperCtrl && n.bind(t, "imgData", this.wallpaperCtrl, "update")
        },
        _initFullScreenCtrl: function(t, e) {
            return this.fullScreenCtrl = h.init(t, e, this.elements.fullScreenBtn),
            this.fullScreenCtrl
        },
        _initResponsive: function() {
            var t = this.elements,
            e = [t.toPhoneBtn, t.favoBtn, t.reportLink],
            i = [t.zoomOut, t.zoomScale, t.zoomIn, t.downloadLink];
            this.wallpaperCtrl && i.push(t.wallpaperBtn),
            this.fullScreenCtrl && i.push(t.fullScreenBtn),
            this.responsiveCtrl = new p(e, i)
        },
        update: function(t, e) {
            function i() {
                var e = (t.group, t.star_face),
                i = t.auto_info,
                o = t.cloth,
                n = t.wiki_face_entity,
                l = t.srv_auto,
                s = [],
                r = [];
                if (i && 1 == i.length && l && r.push(i[0]), e && e.length > 0 && n && n.length > 0) {
                    var a, d;
                    for (a = n.length - 1; a >= 0; a--) for (d = e.length - 1; d >= 0; d--) e[d].entity === n[a].ne && s.unshift(e[d])
                }
                var h = r.length > 0 || s.length > 0 || t.default_auto_info || t.default_star_face || o || 0 == s.length && n && n.length > 0;
                return h
            }
            this.responsiveCtrl || (this.$pnl.show(), this._initResponsive(), this.responsiveCtrl.resize(this.$pnl.parent().width()));
            var o = this.elements;
            o.downloadLink.attr("href", "/search/down?tn=download&word=download&ie=utf8&fr=detail&url=" + encodeURIComponent(t.objURL) + "&thumburl=" + encodeURIComponent(t.thumbURL));
            var n = this.qrcodePopCtrl._validMaterial(t.sucai_info),
            l = this.qrcodePopCtrl._validWallpaper(t.wallp_info);
            l || n ? o.downloadLink.find(".hdicon").show() : o.downloadLink.find(".hdicon").hide(),
            this.qrcodePopCtrl && this.qrcodePopCtrl.update(t, e),
            this.favoViewCtrl.update(t, e),
            i() ? (o.dutuSwitcher.show(), this.downloadTopControl.repos(1)) : (o.dutuSwitcher.hide(), this.downloadTopControl.repos(0)),
            this.showSetNum(e)
        },
        refreshState: function(t) {
            var e = ["wallpaperBtn", "zoomScale", "zoomIn", "zoomOut", "downloadLink", "toPhoneBtn"],
            o = "disabled",
            n = !!t,
            l = this.elements;
            i(e).each(function(t, e) {
                var i = l[e];
                n && i.hasClass(o) ? i.removeClass(o) : n || i.hasClass(o) || i.addClass(o)
            })
        },
        showSetNum: function(t) {
            var e = t.data.spn + 1,
            o = t.data.rootImg.bdSetImgNum;
            i(".btn-setnum-index").text(e),
            i(".btn-setnum-total").text(o),
            0 == o ? i(".btn-setnum").css("display", "none") : i(".btn-setnum").css("display", "inline-block")
        },
        resetSize: function() {
            var t = this.$pnl.parent().width();
            this.responsiveCtrl && this.responsiveCtrl.resize(t),
            this.qrcodePopCtrl && this.qrcodePopCtrl.refreshPos(),
            this.favoViewCtrl && (this.favoViewCtrl.pop && this.favoViewCtrl.pop.refreshPos(), this.favoViewCtrl.tip && this.favoViewCtrl.tip.refreshPos()),
            this.zoomViewCtrl && this.zoomViewCtrl.resetImgPnlSize(); {
                var e = this.elements;
                e.reportLink.offset()
            }
        },
        setReportLinkState: function(t) {
            var e = this.elements.reportLink;
            t && e.hasClass("disabled") ? e.removeClass("disabled") : t || e.hasClass("disabled") || e.addClass("disabled")
        },
        setDutuSwitcherText: function() {
            var t = !!u.getValue(u.DUTU_TAG_CLOSE),
            e = t ? "打开图上标签": "关闭图上标签";
            this.elements.dutuSwitcher.html('<span class="b-before"></span>' + e + "<i></i>").attr("title", e)
        },
        toggleDutuSetting: function() {
            var t = !!u.getValue(u.DUTU_TAG_CLOSE);
            return u.setValue(u.DUTU_TAG_CLOSE, t ? "": "1"),
            this.setDutuSwitcherText(),
            t && i("#dutu-anchor-wrapper").css("display", ""),
            t && this.elements.dutuSwitcher.trigger("mouseover"),
            !!t
        }
    }),
    e
});;
/*!searchdetail:widget/ui/controls/albumslider/imgselectedlist/item.js*/
define("searchdetail:widget/ui/controls/albumslider/imgselectedlist/item",
function(i) {
    function t(i, t) {
        this.$element = e(t),
        this.$img = e(null),
        this.$imgBox = e(null),
        this.view = e.extend({
            className: "imgitem",
            focusClass: "focus",
            focusClass4Ie6: "imgitem-focus",
            imgMaxSize: {
                width: 70,
                height: 70
            },
            imgFocusSize: {
                width: 76,
                height: 76
            },
            html: '<li><div class="img-box"><img /></div></li>',
            diableTitle: !1
        },
        i),
        this.imgData = null
    }
    var e = i("common:widget/ui/base/base"),
    s = i("common:widget/ui/utils/utils"),
    a = i("common:widget/ui/base/events"),
    h = i("searchdetail:widget/ui/utils/imghelper");
    return e.extend(t.prototype, a, {
        render: function(i) {
            var t = this.view,
            a = e(t.html);
            return t.className && a.addClass(t.className),
            t.diableTitle || a.attr("title", s.trimTags(i.fromPageTitle || i.fromPageTitleEnc || "")),
            this.$imgBox = a.find(".img-box"),
            this.$img = a.find("img"),
            this.$element = a,
            this.setImage(i),
            a
        },
        init: function() {
            this.$img = this.$element.find("img"),
            this.$imgBox = this.$element.find(".img-box")
        },
        getWidth: function() {
            return this.$element.width()
        },
        getFocusedWidth: function() {
            return this.getWidth()
        },
        isFocus: function() {
            return this.$element.hasClass(this.view.focusClass)
        },
        focus: function() {
            var i = this.$element,
            t = this.view.focusClass,
            e = i.find("img");
            i.hasClass(t) || i.addClass(t).addClass(this.view.focusClass4Ie6);
            var s = h.zoom(this.imgData, this.view.imgFocusSize);
            1 === e.length && e.attr({
                width: s.width,
                height: s.height
            })
        },
        display: function() {},
        blur: function() {
            var i = this.$element,
            t = this.view.focusClass,
            e = i.find("img");
            i.hasClass(t) && i.removeClass(t).removeClass(this.view.focusClass4Ie6);
            var s = h.zoom(this.imgData, this.view.imgMaxSize);
            1 === e.length && e.attr({
                width: s.width,
                height: s.height
            })
        },
        setImage: function(i) {
            var t = h.zoom(i, this.view.imgMaxSize);
            if (i.key && i.objURL && i.imgUrl != i.objURL) {
                var e = this.$img[0],
                a = this;
                e.onerror = function() {
                    i.key == a.imgData.key && (e.src = i.objURL),
                    setTimeout(function() {
                        e.onerror = null
                    })
                }
            }
            this.$img.attr({
                src: i.imgUrl,
                width: t.width,
                height: t.height
            }),
            this.view.diableTitle || this.$element.attr("title", s.trimTags(i.fromPageTitle || i.fromPageTitleEnc || "")),
            this.imgData = i
        }
    }),
    t
});;
/*!searchdetail:widget/ui/controls/albumslider/imgselectedlist/list.js*/
define("searchdetail:widget/ui/controls/albumslider/imgselectedlist/list",
function(t) {
    function e(t, e) {
        this.$element = t,
        this.itemConf = i.extend({
            selector: ">li.imgitem",
            selectedClass: "focus",
            indexTpl: "",
            width: 80,
            marginRight: 10,
            total: 0
        },
        e),
        this.selectedItem = {
            ctrl: null,
            index: -1
        },
        this.indexs = {
            start: 0,
            end: 0
        },
        this.controls = {}
    }
    var i = t("common:widget/ui/base/base"),
    n = t("common:widget/ui/utils/utils"),
    s = t("common:widget/ui/base/events"),
    r = t("searchdetail:widget/ui/controls/albumslider/imgselectedlist/item");
    return i.extend(e.prototype, s, {
        getElement: function() {
            return this.$element
        },
        getWidth: function() {
            this.$element.width()
        },
        setTotal: function(t) {
            this.itemConf.total = t
        },
        getTotal: function() {
            return this.itemConf.total
        },
        getItemCount: function() {
            return this.indexs.end - this.indexs.start + 1
        },
        render: function() {
            return this.$element = i("<ul></ul>"),
            this.$element
        },
        init: function() {
            var t = this;
            this.$element = i(this.$element),
            this.$element.delegate(this.itemConf.selector, "click",
            function(e) {
                var n = i(this),
                s = n.attr("data-idx");
                s && !n.hasClass(t.itemConf.selectedClass) && t.selectItem(s),
                e.stopPropagation()
            })
        },
        selectItem: function(t) {
            var e = this.selectedItem,
            i = this.controls[t];
            e.index !== t && i ? (this.dispatchEvent("selectedChanging", {
                index: t,
                item: i
            }), e.ctrl && e.ctrl.blur(), e.ctrl = i, e.index = t, i && i.imgData && i.imgData.spn, e.ctrl && e.ctrl.focus(), this.dispatchEvent("selectedChange", {
                index: t,
                item: i,
                subIndex: e.subIndex || 0
            })) : e.ctrl || (e.ctrl = i, e.ctrl && e.ctrl.focus())
        },
        getSelectedIndex: function() {
            return this.selectedItem.index
        },
        appendItems: function(t) {
            var e = this.indexs.end + t.length;
            if (e >= this.itemConf.total - 1 && (t = t.slice(0, this.itemConf.total - this.indexs.end - 1), e = this.itemConf.total - 1), !t.length) return 0;
            var i = this,
            n = function(t) {
                return i.indexs.end + t + 1
            },
            s = this._renderItems(t, n);
            return s.appendTo(this.$element),
            this._initItemCtrls(t, n),
            this.indexs.end = e,
            t.length
        },
        prependItems: function(t) {
            var e = this.indexs.start - t.length;
            if (0 > e && (t = t.slice( - 1 * this.indexs.start), e = 0), !t.length) return 0;
            var i = this,
            n = function(t) {
                return i.indexs.start - t - 1
            },
            s = this._renderItems(t, n);
            return s.prependTo(this.$element),
            this._initItemCtrls(t, n),
            this.indexs.start = e,
            t.length
        },
        insertItems: function(t, e) {
            return this.indexs.start = t,
            this.indexs.end = t - 1,
            this.appendItems(e)
        },
        _renderItems: function(t, e) {
            for (var s, r, l, d, h = i("<ul></ul>"), o = this.itemConf, c = (o.selectedClass, o.total || t.length), m = t.length - 1; m >= 0; m--) s = t[m],
            d = e(m),
            r = this._createItem(s),
            l = r.render(i.extend({
                imgUrl: s.thumbURL,
                imgWidth: s.width,
                imgHeight: s.height
            },
            s)),
            l.attr("data-idx", d),
            o.indexTpl && i(n.format(o.indexTpl, {
                index: d + 1,
                total: c
            })).appendTo(l),
            l.prependTo(h),
            this._setItemCtrl(d, r);
            return h.children()
        },
        _createItem: function() {
            return new r({
                focusClass: this.itemConf.selectedClass
            })
        },
        _setItemCtrl: function(t, e) {
            t == this.getSelectedIndex() && (this.selectedItem.ctrl = e),
            this.controls[t] = e
        },
        _initItemCtrls: function(t, e) {
            for (var i, n, s = 0; s < t.length; s++) n = e(s),
            i = this.controls[n],
            i && i.init()
        },
        emptyItems: function() {
            this.indexs.start = 0,
            this.indexs.end = 0,
            this.controls = {},
            this.selectedItem.ctrl = null,
            this.$element.empty()
        },
        shiftItems: function(t) {
            if (!t) return 0;
            var e = this.$element.find(this.itemConf.selector).filter(function(e) {
                return e >= 0 && t > e
            }),
            t = e.length;
            return this.indexs.start += t,
            this._removeItems(e),
            t
        },
        popItems: function(t) {
            if (!t) return 0;
            var e = this.$element.find(this.itemConf.selector),
            i = Math.max(e.length - t, 0),
            n = e.filter(function(t) {
                return t >= i
            }),
            t = n.length;
            return this.indexs.end -= t,
            this._removeItems(n),
            t
        },
        _removeItems: function(t) {
            var e, n = this.controls;
            t.each(function(t, s) {
                e = i(s).attr("data-idx"),
                e && n[e] && delete n[e]
            }),
            n[this.getSelectedIndex()] || (this.selectedItem.ctrl = null),
            t.remove()
        }
    }),
    e
});;
/*!searchdetail:widget/ui/controls/albumslider/imgselectedlist/setitem.js*/
define("searchdetail:widget/ui/controls/albumslider/imgselectedlist/setitem",
function(t) {
    function i(t, i, e, l) {
        t = s.extend({
            className: "imgsetitem",
            focusClassNoSub4Ie6: "imgitem-focus",
            focusClass4Ie6: "imgsetitem-focus",
            listSwitchBtnWidth: 54,
            minShowSubCount: 2,
            maxShowSubCount: 5
        },
        t),
        n.call(this, t, e),
        this.listControl = i,
        this._listCtrlDataReady = !1,
        this.subIndex = l || 0,
        this._initListPro = null
    }
    var s = t("common:widget/ui/base/base"),
    e = t("common:widget/ui/utils/utils"),
    n = t("searchdetail:widget/ui/controls/albumslider/imgselectedlist/item");
    return s.extend(i.prototype, n.prototype, {
        render: function(t) {
            var i = n.prototype.render.call(this, t);
            return s.browser.msie && s.browser.version <= 6 && i.append('<span class="seti-after"></span>'),
            i
        },
        init: function() {
            n.prototype.init.call(this);
            var t = this.view.className;
            t && (this.$element.addClass(t) || this.$element.addClass(t))
        },
        setSize: function(t) {
            var i = this.getWidth(),
            s = this.getFocusedWidth(t),
            e = s - i;
            0 != e && (this.$element.width(s), this.setListSize(s), this.fire("sizeChanged", {
                diff: e
            }))
        },
        setListSize: function(t) {
            this.listControl && this.listControl.isInited && (t || (t = this.$element.width() + (s.browser.msie && 6 == s.browser.version ? 2 : 0)), this.listControl.setPnlWidth(t - this.view.listPadding))
        },
        resetSize: function(t) {
            this.setSize(t),
            this.listControl && this.listControl.isInited && this.listControl.resetSize()
        },
        getFocusedWidth: function(t) {
            var i = this.listControl ? this.listControl.getTotal() : 1;
            if (i > 1) {
                var s = this.view,
                e = this.listControl.getItemPlaceWidth(),
                n = Math.floor((t - s.listSwitchBtnWidth) / e),
                l = Math.min(s.maxShowSubCount, i, Math.max(n, s.minShowSubCount)),
                o = l * e + s.listSwitchBtnWidth;
                return o
            }
            return this.getWidth()
        },
        display: function(t) {
            var i = this;
            this._listCtrlDataReady ? (this.setSize(t), this._showList()) : this._initListData(t).then(function() {
                i._showList()
            })
        },
        _initListCtrl: function() {
            var t = this.listControl;
            t.render().appendTo(this.$element),
            t.init(),
            this.view.listPadding = e.UI.getCssDigitValueSum(t.$pnl, ["padding-left", "padding-right"]),
            this.setListSize()
        },
        _initListData: function(t) {
            var i = this;
            return this._initListPro ? this._initListPro: (this._initListPro = this.listControl.load(20).then(function(s) {
                i._listCtrlDataReady = !0,
                i._initListPro = null,
                i.listControl.getTotal() < 2 ? (i.$element.removeClass(i.view.className), i.isFocus() && (i.$element.removeClass(i.view.focusClass4Ie6), i.view.focusClass4Ie6 = i.view.focusClassNoSub4Ie6, i.$element.addClass(i.view.focusClass4Ie6))) : (i.$element.attr("title", ""), i.view.diableTitle = !0, i.setSize(t), i._initListCtrl(), i.listControl.insertItems(0, s))
            }), this._initListPro)
        },
        _showList: function() {
            var t = this.listControl,
            i = t.getTotal();
            i > 1 && (t.selectItem(this.subIndex || 0), t.getElement().show(), this.$imgBox.hide(), t.resetSize())
        },
        blur: function() {
            var t = this.getWidth();
            this.$element.width(this.view.imgMaxSize.width),
            this.$imgBox.show(),
            this.listControl && this.listControl.isInited && this.listControl.getElement().hide(),
            n.prototype.blur.call(this),
            this.subIndex = 0;
            var i = this.view.imgMaxSize.width - t;
            0 != i && this.fire("sizeChanged", {
                diff: i
            })
        },
        setImage: function(t) {
            n.prototype.setImage.call(this, t),
            this.listControl.setTotal(1 * (t.bdSetImgNum || 2))
        }
    }),
    i
});;
/*!searchdetail:widget/ui/controls/albumslider/honscrollpanel.js*/
define("searchdetail:widget/ui/controls/albumslider/honscrollpanel",
function(t) {
    function s(t, s, i) {
        this.$pnl = t,
        this.$content = s,
        this.offset = 0,
        this.maxOffset = 0,
        this._scrolling = {
            targetOffset: 0,
            pro: null
        },
        this.opts = e.extend({
            step: 0
        },
        i)
    }
    var e = t("common:widget/ui/base/base"),
    i = t("common:widget/ui/base/events"),
    n = t("common:widget/ui/arch/behavior/animation");
    return e.extend(s.prototype, i, {
        init: function() {
            this.$pnl = e(this.$pnl),
            this.$content = e(this.$content),
            this.offset = this.getOffset(),
            this._calcMaxOffset()
        },
        _adjustOffset: function(t, s, e) {
            t = Math.min(t, 0);
            var i = this.getMaxOffset();
            i > t + e && (t = i);
            var n = this.opts.step;
            return n > 0 ? (s = s || Math.round, s(t / n) * n) : t
        },
        _calcMaxOffset: function() {
            var t = this.$pnl.width(),
            s = this.$content.width(),
            i = t % this.opts.step;
            e.browser.msie && 6 == e.browser.version && 5 >= i && (i = 0),
            this.maxOffset = Math.min(t - s - (i > 0 ? this.opts.step: 0), 0)
        },
        getScrollEnable: function(t) {
            var s = this.offset;
            if (t) return 0 != s;
            var i = this.$pnl.width(),
            n = i % this.opts.step,
            o = this.getMaxOffset();
            return e.browser.msie && 6 == e.browser.version && 5 >= n && (n = 0),
            s > o + (n > 0 ? this.opts.step: 0)
        },
        getOffset: function() {
            if (this.$pnl.parent().length) return this.$content.position().left;
            var t = this.$content.css("left");
            return t ? 1 * t.replace("px", "") : 0
        },
        setOffset: function(t) {
            t = this._adjustOffset(t),
            this.offset = t,
            this.$content.css("left", t)
        },
        getMaxOffset: function() {
            return this.maxOffset
        },
        setWidth: function(t) {
            this.$pnl.width(t || 0),
            this._calcMaxOffset()
        },
        setContentWidth: function(t) {
            this.$content.width(t || 0),
            this._calcMaxOffset()
        },
        scrollToStep: function(t, s) {
            return this.opts.step ? this.scrollTo(this.opts.step * t * -1, s) : void 0
        },
        scrollTo: function(t, s) {
            var i = {},
            o = this;
            return s = s || {},
            i.left = this._adjustOffset(t || 0, null, s.allowGap || 0),
            i.left == this._scrolling.targetOffset && this._scrolling.pro ? this._scrolling.pro: i.left == this.offset ? (o.dispatchEvent("scrollEnd"), (new e.Deferred).resolve()) : (this.$content.stop(!0, !0), s.step = function(t) {
                o.dispatchEvent("scrolling", {
                    offset: t
                })
            },
            o.abort(), o.dispatchEvent("scrollStart"), this._scrolling.targetOffset = i.left, this._scrolling.pro = n.animate(this.$content, i, s).then(function() {
                o.offset = i.left,
                o._scrolling.pro = null,
                o.dispatchEvent("scrollEnd")
            }), this._scrolling.pro)
        },
        scrollBy: function(t, s) {
            return this.scrollTo(t + this.offset, s)
        },
        abort: function() {
            this.$content.stop(!0, !0)
        },
        stopScroll: function(t) {
            this.$content.stop(),
            this.offset = this.getOffset();
            var s = t ? Math.ceil: Math.floor,
            e = this._adjustOffset(this.offset, s);
            this.scrollBy(e - this.offset)
        }
    }),
    s
});;
/*!searchdetail:widget/ui/controls/albumslider/sliderlist.js*/
define("searchdetail:widget/ui/controls/albumslider/sliderlist",
function(t) {
    function e(t, e, i, n) {
        s.call(this, t.list, e),
        this.imgCollection = i,
        this.$pnl = t.pnl,
        this.$content = t.content,
        this.scrollPanel = null,
        this.slideLeftBtn = null,
        this.slideRightBtn = null,
        this._conf = {
            prevBtn: t.prevBtn,
            nextBtn: t.nextBtn
        },
        this.isInited = !1,
        this._itemsLocked = !0,
        this.selectedItem.subIndex = 0,
        this.sliderListTimeout = null,
        this.opts = {
            spn: n && n.spn || 0
        },
        this.sliderListFlag = !0
    }
    var i = t("common:widget/ui/base/base"),
    n = t("common:widget/ui/utils/utils"),
    s = t("searchdetail:widget/ui/controls/albumslider/imgselectedlist/list"),
    l = t("searchdetail:widget/ui/controls/albumslider/imgselectedlist/item"),
    o = t("searchdetail:widget/ui/controls/albumslider/imgselectedlist/setitem"),
    r = t("searchdetail:widget/ui/controls/pressbtn/pressbtn"),
    h = t("searchdetail:widget/ui/controls/albumslider/honscrollpanel"),
    a = ['<div class="#{pnl}">', '<div class="#{content}">', '<ul class="#{list} clearfix"></ul>', "</div>", '<span class="slider-btn #{slidePrev}" href="javascript:void(0);" hidefocus="true"><i></i></span>', '<span class="slider-btn #{slideNext}" href="javascript:void(0);" hidefocus="true"><i></i></span>', "</div>"].join(""),
    d = '<div class="set-index"><strong>#{index}</strong><span class="set-total">#{total}</span></div>';
    return i.extend(e.prototype, s.prototype, {
        render: function() {
            var t = this._conf,
            e = i(n.format(a, {
                pnl: this.$pnl.substr(1),
                content: this.$content.substr(1),
                list: this.$element.substr(1),
                slidePrev: t.prevBtn.substr(1),
                slideNext: t.nextBtn.substr(1)
            }));
            return this.$pnl = e,
            this.$element = e.find(this.$element),
            this.$content = e.find(this.$content),
            e
        },
        init: function() {
            s.prototype.init.call(this),
            this.$pnl = i(this.$pnl),
            this.$content = this.$pnl.find(this.$content),
            this._conf.contentPadding = n.UI.getCssDigitValueSum(this.$content, ["padding-left", "padding-right"]),
            this.$content.width(this.$pnl.width() - this._conf.contentPadding),
            this._conf.itemCountPerScreen = this._calcItemCountPerScreen();
            var t = this._conf;
            this._initScrollPnl(),
            this.slideLeftBtn = new r(this.$pnl.find(t.prevBtn), {
                disabledClass: "slider-btn-prev-disabled",
                disabledTitle: "已经是第一张图"
            }),
            this.slideRightBtn = new r(this.$pnl.find(t.nextBtn), {
                disabledClass: "slider-btn-next-disabled",
                disabledTitle: "已经是最后一张图"
            }),
            this.slideLeftBtn.init(),
            this.slideRightBtn.init(),
            this._updateSlideBtnState(),
            this._bindEvent(),
            this.isInited = !0
        },
        _initScrollPnl: function() {
            var t = i('<div style="position:relative;"><ul style="position:relative;left:0;"></ul></div>'),
            e = new h(t, t.find("ul"), {
                step: this.getItemPlaceWidth()
            });
            this.scrollPanel = e,
            e.init(),
            this._updateScrollPnlSize()
        },
        _updateScrollPnlSize: function(t, e) {
            var i = this.scrollPanel;
            i && (t = t || this.getWidth(), e = e || this.getItemPlaceWidth(), i.setWidth(t), i.setContentWidth(e * (this.itemConf.total + (this.itemConf.hasTail ? 1 : 0))))
        },
        _bindEvent: function() {
            this.scrollPanel.addEventListener("scrollStart", this._scrollStart.bind(this)),
            this.scrollPanel.addEventListener("scrolling", this._scrolling.bind(this)),
            this.scrollPanel.addEventListener("scrollEnd", this._scrollEnd.bind(this)),
            this._bindSlideBtnEvent(this.slideLeftBtn, !0),
            this._bindSlideBtnEvent(this.slideRightBtn, !1),
            this.itemConf.enableWheel && (!i.browser.mozilla || "onmousewheel" in document.body ? this.$content.on("mousewheel", this._wheelHandler.bind(this)) : this.$content.on("DOMMouseScroll", this._wheelHandler.bind(this)))
        },
        _bindSlideBtnEvent: function(t, e) {
            var i = this;
            t.addEventListener("clicked",
            function() {
                i.switchScreen(e)
            }),
            t.addEventListener("pressing",
            function() {
                var t = i.scrollPanel.offset,
                n = e ? 0 : -1 * i.getItemPlaceWidth() * (i.itemConf.total + (i.itemConf.hasTail ? 1 : 0)),
                s = /chrome\/(\d+\.\d+)/i.test(navigator.userAgent) ? .6 : .8;
                i.scrollPanel.scrollTo(n, {
                    duration: Math.abs(n - t) / s,
                    easing: "linear"
                })
            }),
            t.addEventListener("pressEnd",
            function() {
                i.scrollPanel.stopScroll(e)
            })
        },
        getElement: function() {
            return this.$pnl
        },
        setPnlWidth: function(t) {
            var e = t - this._conf.contentPadding,
            i = this.getItemPlaceWidth();
            this.$pnl.width(t),
            this.$content.width(e),
            this._conf.itemCountPerScreen = this._calcItemCountPerScreen(e, i),
            this._updateScrollPnlSize(e, i),
            this._updateSlideBtnState()
        },
        getWidth: function() {
            return this.$content.width()
        },
        _calcItemCountPerScreen: function(t, e) {
            t = t || this.getWidth(),
            e = e || this.getItemPlaceWidth();
            var i = (t + this.itemConf.marginRight) / e,
            n = Math.floor(i);
            return n + (i - n >= .9 ? 1 : 0)
        },
        getItemCountPerScreen: function() {
            return this._conf.itemCountPerScreen
        },
        setTotal: function(t) {
            var e = t - this.itemConf.total;
            0 != e && (s.prototype.setTotal.call(this, t), this.scrollPanel && (this.scrollPanel.setContentWidth("+=" + e * this.getItemPlaceWidth()), this._updateSlideBtnState()))
        },
        getItemPlaceWidth: function() {
            return this.itemConf.width + this.itemConf.marginRight
        },
        appendItems: function(t) {
            var e = this.indexs.end + t.length,
            i = this.itemConf,
            n = s.prototype.appendItems.call(this, t);
            if (i.hasTail && e >= i.total - 1 && !this.$element.find(">li.imgenditem").length) {
                n += 1;
                var l = [{
                    key: "imgenditem",
                    placeHolder: "imgenditem"
                }];
                this._renderItems(l,
                function(t) {
                    return "enditem_" + t
                }).appendTo(this.$element)
            }
            return n
        },
        emptyItems: function() {
            s.prototype.emptyItems.call(this),
            this.$element.css("left", 0)
        },
        popItems: function(t) {
            if (t) {
                var e = 0,
                n = this.$element.find(">li.imgenditem");
                if (n.length) {
                    var l = n.nextAll();
                    e += 1 + l.length;
                    for (var o = l.length - 1; o >= 0; o--) i(l[o]).remove();
                    n.remove()
                }
                var r = t - e;
                return r > 0 && s.prototype.popItems.call(this, r),
                t
            }
            return 0
        },
        _createItem: function(t) {
            var e;
            if (t.isSet) e = this._createImgSetItemCtrl(t);
            else {
                var i = {
                    className: t.thumbURL ? "imgitem": t.placeHolder || "empty"
                };
                t.thumbURL || (i.html = "<li></li>"),
                e = new l(i)
            }
            return e
        },
        _createImgSetItemCtrl: function(t, i) {
            var n = this.imgCollection.getImgSetCollection(t.key),
            s = new e({
                pnl: ".subslider-con",
                content: ".subslider-listcon",
                list: ".subslider-list",
                prevBtn: ".slider-btn-prev",
                nextBtn: ".slider-btn-next"
            },
            {
                width: 70,
                total: n ? t.bdSetImgNum: 1,
                indexTpl: d
            },
            n),
            l = this;
            s.addEventListener("selectedChange",
            function(t) {
                l.dispatchEvent("selectedChange", {
                    index: l.getSelectedIndex(),
                    subIndex: t.index
                })
            });
            var r = new o({
                html: '<li class="imgitem"><div class="img-box"><img /></div></li>'
            },
            s, i, this.opts.spn);
            return r.on("sizeChanged", this.itemSizeChangedHandler.bind(this)),
            r
        },
        insertItems: function(t) {
            return this.scrollPanel.setOffset(t * this.getItemPlaceWidth() * -1),
            s.prototype.insertItems.apply(this, arguments)
        },
        lockItems: function() {
            this._itemsLocked = !0
        },
        unlockItems: function() {
            this._itemsLocked = !1
        },
        getMinLoadedCount: function() {
            return 2 * this.getItemCountPerScreen()
        },
        _loadDataByFocus: function(t) {
            if (this.imgCollection) {
                var e = this.getItemCount(),
                n = this.getMinLoadedCount();
                n > e && (e = n);
                var s = this.imgModel.get("pn"),
                l = this;
                return this.imgCollection.getByMiddle(s, e).then(function(e) { (!t || t(s)) && (l.emptyItems(), l.insertItems(e.offset, e.result), l.lockItems())
                })
            }
            return (new i.Deferred).resolve()
        },
        update: function(t, e) {
            var i = e.get("offset"),
            n = e.get("spn"),
            s = this;
            if (this.imgModel = e, i != this.getSelectedIndex() || n != this.selectedItem.subIndex) {
                this.selectedItem.subIndex = n;
                var l = this.controls[i];
                if (l && (l.subIndex = n), this.controls[i]) s._updateSubIndex(i, n),
                s.selectItem(i);
                else {
                    var o = function(t) {
                        return t == e.get("pn")
                    };
                    this._loadDataByFocus(o).then(function() {
                        s._updateSubIndex(i, e.get("spn")),
                        s.selectItem(i).then(function() {
                            s.selectedItem.ctrl && s.selectedItem.ctrl.focus(),
                            s.unlockItems()
                        })
                    })
                }
            }
        },
        resetSize: function() {
            this.$content.width(this.$pnl.width() - n.UI.getCssDigitValueSum(this.$content, ["padding-left", "padding-right"]));
            var t = this.getWidth(),
            e = this.getItemPlaceWidth(),
            i = this.selectedItem.ctrl,
            s = this;
            this._conf.itemCountPerScreen = this._calcItemCountPerScreen(t, e),
            this.imgModel && (!this.selectedItem.ctrl || this.getItemCount() < this.getMinLoadedCount()) ? this._loadDataByFocus().then(function() {
                var t = s.imgModel.get("offset");
                s._updateSubIndex(t, s.imgModel.get("spn")),
                s.selectItem(t).then(function() {
                    s.selectedItem.ctrl && s.selectedItem.ctrl.focus(),
                    s.unlockItems()
                })
            }) : this.scrollToFocus().then(function() {
                i && i.listControl && i.resetSize(s._getSubAvailableWidth(t, e))
            })
        },
        _updateSubIndex: function(t, e) {
            var i = this.controls[t],
            n = i && i.listControl;
            n && (i.subIndex = e),
            n && n.isInited && e != n.getSelectedIndex() && n.selectItem(e)
        },
        selectItem: function(t) {
            var e, i = this.controls[t],
            n = this.getWidth(),
            l = this.getItemPlaceWidth(),
            o = this._getSubAvailableWidth(n, l);
            return s.prototype.selectItem.call(this, t),
            e = this.centerIndex(t),
            i && this.imgModel && (i.subIndex = this.imgModel.get("spn") || 0),
            i && i.display(o),
            e
        },
        _getSubAvailableWidth: function(t, e) {
            return t = t || this.getWidth(),
            e = e || this.getItemPlaceWidth(),
            t - 2 * e
        },
        itemSizeChangedHandler: function(t) {
            this.scrollPanel.setContentWidth("+=" + t.diff)
        },
        load: function(t) {
            var e = this;
            return this.imgCollection ? this.imgCollection.getByOffset(0, t).then(function(t) {
                return e.setTotal(e.imgCollection.getTotal()),
                e.unlockItems(),
                t
            }) : (new i.Deferred).resolve([])
        },
        _append: function(t) {
            var e = [],
            i = 0,
            n = this.indexs.end;
            if (n >= this.itemConf.total) return 0;
            for (; i++<t;) e.push({
                thumbURL: "//img0.bdstatic.com/img/image/HLloading.gif",
                imgWidth: 32,
                imgHeight: 32
            });
            var s = this.appendItems(e),
            l = this.getItemCount(),
            o = this.getMinLoadedCount(),
            r = Math.min(s, l - o);
            if (t = this.shiftItems(r), s > 0) {
                var h = n + 1,
                a = this;
                this.imgCollection && this.imgCollection.getByOffset(h, s).then(function(t) {
                    a.setTotal(a.imgCollection.getTotal()),
                    a.updateImage(h, t)
                })
            }
            return t
        },
        _prepend: function(t) {
            var e = [],
            i = 0,
            n = this.indexs.start;
            if (0 == n) return 0;
            for (; i++<t;) e.push({
                thumbURL: "//img0.bdstatic.com/img/image/HLloading.gif",
                imgWidth: 32,
                imgHeight: 32
            });
            var s = this.prependItems(e),
            l = this.getItemCount(),
            o = this.getMinLoadedCount(),
            r = Math.min(s, l - o);
            if (t = this.popItems(r), s > 0) {
                var h = n - s,
                a = this;
                this.imgCollection && this.imgCollection.getByOffset(h, s).then(function(t) {
                    a.updateImage(h, t)
                })
            }
            return t
        },
        updateImage: function(t, e) {
            for (var n, s, l, o = this.getSelectedIndex(), r = this.controls, h = this._getSubAvailableWidth(this.getWidth(), this.getItemPlaceWidth()), a = 0; a < e.length; a++) s = e[a],
            s = i.extend({
                imgUrl: s.thumbURL,
                imgWidth: s.width,
                imgHeight: s.height
            },
            s),
            n = t + a,
            l = r[n],
            l && (s.isSet && !l.listControl && (l = this._createImgSetItemCtrl(s, l.$element), l.init(), n == o && (l.subIndex = this.imgModel.get("spn"), l.resetSize(h)), r[n] = l, this._setItemCtrl(n, l)), l.setImage(s), n == o && (l.focus(), l.display(h)))
        },
        _updateSlideBtnState: function() {
            var t = this.scrollPanel.getScrollEnable(!0),
            e = this.scrollPanel.getScrollEnable();
            this.slideLeftBtn.setEnable(t),
            this.slideRightBtn.setEnable(e)
        },
        _wheelHandler: function(t) {
            var e = this,
            i = /macintosh|mac os x/i.test(navigator.userAgent);
            t = t.originalEvent || t || window.event;
            var n = t.deltaY,
            s = /^([0-9])[0-9]*(\\.\\w*)?$/;
            if (window.samplekey.match("UI_PC_MOUSEWHEEL:1") && i && s.test(n) || window.samplekey.match("UI_PC_MOUSEWHEEL:1") && !i && !s.test(n)) {
                var l = i ? 45 : 100;
                if (this.sliderListFlag) {
                    var o = 0;
                    t.wheelDelta ? o = t.wheelDelta / 120 : t.detail && (o = -t.detail / 3);
                    var r = e.getItemPlaceWidth();
                    o > 0 ? e.scrollPanel.scrollBy(r, {
                        duration: 0
                    }) : 0 > o && e.scrollPanel.scrollBy( - 1 * r, {
                        duration: 0
                    }),
                    t.preventDefault && t.preventDefault(),
                    t.returnValue = !1,
                    this.sliderListFlag = !1
                }
                clearTimeout(this.sliderListTimeout),
                this.sliderListTimeout = setTimeout(function() {
                    e.sliderListFlag = !0
                },
                l)
            } else {
                var o = 0;
                t.wheelDelta ? o = t.wheelDelta / 120 : t.detail && (o = -t.detail / 3);
                var r = e.getItemPlaceWidth();
                o > 0 ? e.scrollPanel.scrollBy(r, {
                    duration: 0
                }) : 0 > o && e.scrollPanel.scrollBy( - 1 * r, {
                    duration: 0
                }),
                t.preventDefault && t.preventDefault(),
                t.returnValue = !1
            }
        },
        _scrollStart: function() {
            this._scrollStartOffset = this.scrollPanel.offset,
            this._scrolledStep = 0
        },
        _scrolling: function(t) {
            var e = t.offset - this._scrollStartOffset,
            i = this.getItemPlaceWidth(),
            n = Math.round(e / i),
            s = t.offset + this.indexs.start * i;
            if (n != this._scrolledStep && !this._itemsLocked) {
                var l = n - this._scrolledStep,
                o = Math.abs(l),
                r = i,
                h = Math.abs(t.offset);
                l > 0 ? h < -1 * this.scrollPanel.getMaxOffset() - r && (o = this._prepend(o), s -= o * i) : h > r && (o = this._append(o), s += o * i),
                this._scrolledStep = n
            }
            this.$element.css("left", s)
        },
        _scrollEnd: function() {
            this._updateSlideBtnState()
        },
        scrollToFocus: function() {
            return this.centerIndex(this.getSelectedIndex())
        },
        centerIndex: function(t) {
            var e = this.getItemCountPerScreen(),
            n = this.itemConf.total;
            if (t >= 0 && n > e) {
                var s = this.controls[t],
                l = this.getWidth(),
                o = this.getItemPlaceWidth(),
                r = this._getSubAvailableWidth(l, o),
                h = s && s.getWidth(),
                a = s && s.getFocusedWidth(r),
                d = s ? this._calcItemCountPerScreen(a) : 1,
                c = Math.max(t - Math.floor((e - d) / 2), 0),
                u = n - (e - d) + (this.itemConf.hasTail ? 1 : 0);
                return c = Math.min(c, u),
                this.scrollPanel.scrollToStep(c, {
                    allowGap: d > 1 ? a - h: 0
                })
            }
            return (new i.Deferred).resolve()
        },
        switchScreen: function(t) {
            var e = this.getItemCountPerScreen(),
            i = this.getItemPlaceWidth();
            return this.scrollPanel.scrollBy(e * i * (t ? 1 : -1), {
                duration: 300
            })
        }
    }),
    e
});;
/*!searchdetail:widget/ui/controls/dockpanel/dockpanel.js*/
define("searchdetail:widget/ui/controls/dockpanel/dockpanel",
function(t) {
    function o(t, o, e) {
        this.$handler = t,
        this.opts = s.extend({
            handlerDockedClass: "docked",
            sinkHeight: 16,
            autoDockInterval: 0,
            direction: "bottom"
        },
        e),
        this.pnl = o,
        this.parentPnl = null,
        this._autoDockTimer = !1,
        this._autoDockAborted = !1;
        var n = this;
        this._pnlMouseOverHandler = function() {
            n.stopAutoDock()
        },
        this._pnlMouseOutHandler = function() {
            n.startAutoDock()
        },
        this._pnlMouseDownHandler = function() {
            n.abortAutoDock()
        }
    }
    var s = t("common:widget/ui/base/base"),
    e = t("common:widget/ui/base/events"),
    n = t("common:widget/ui/arch/behavior/animation"),
    i = {
        top: {
            show: "slideDown",
            hide: "slideUp"
        },
        left: {
            show: "pullOn",
            hide: "pushOff"
        }
    };
    return i.bottom = i.top,
    i.right = i.right,
    s.extend(o.prototype, e, {
        init: function() {
            this.$handler = s(this.$handler),
            this.pnl = s(this.pnl),
            this.parentPnl = this.pnl.parent(),
            this.opts.handlerHeight = this.$handler.height();
            var t = this;
            this.$handler.on("click",
            function(o) {
                o.preventDefault(),
                t.abortAutoDock(),
                s(this).hasClass(t.opts.handlerDockedClass) ? t.showPanel() : t.hidePanel()
            }),
            this.pnl.on("mouseover", this._pnlMouseOverHandler),
            this.pnl.on("mouseout", this._pnlMouseOutHandler),
            this.pnl.on("mousedown", this._pnlMouseDownHandler),
            this.animate = n.create(this.pnl).init(),
            this.opts.autoDockInterval ? this.startAutoDock() : (this.pnl.height(0).css({
                "padding-top": 0,
                "padding-bottom": 0
            }), this.$handler.addClass(this.opts.handlerDockedClass).html('<span class="b-before"></span>展开缩略图<i></i>'))
        },
        showPanel: function() {
            var t = i[this.opts.direction].show,
            o = this;
            window.samplekey.match("UI_PC_DETAIL_DOWNLOAD:1") ? (o.$handler.removeClass(o.opts.handlerDockedClass).html('<span class="b-before"></span><i></i>'), o.$handler.addClass("showed")) : o.$handler.removeClass(o.opts.handlerDockedClass).html('<span class="b-before"></span>图片列表<i></i>'),
            o.parentPnl.css("padding-top", ""),
            this.animate[t].call(this.animate).then(function() {
                o.dispatchEvent("stateChanged"),
                s(".download-tip").css({
                    bottom: s(".album-pnl").height() + 10 + "px"
                })
            })
        },
        hidePanel: function() {
            var t = i[this.opts.direction].hide,
            o = this;
            this.animate[t].call(this.animate).then(function() {
                window.samplekey.match("UI_PC_DETAIL_DOWNLOAD:1") ? (o.$handler.addClass(o.opts.handlerDockedClass).html('<span class="b-before"></span><i></i>'), o.$handler.removeClass("showed")) : o.$handler.addClass(o.opts.handlerDockedClass).html('<span class="b-before"></span>图片列表<i></i>'),
                o.dispatchEvent("stateChanged"),
                s(".download-tip").css({
                    bottom: s(".album-pnl").height() + 10 + "px"
                })
            })
        },
        startAutoDock: function() {
            if (!this._autoDockAborted && !this._autoDockTimer && this.opts.autoDockInterval) {
                var t = this;
                this._autoDockTimer = window.setTimeout(function() {
                    t.hidePanel(),
                    t.abortAutoDock()
                },
                this.opts.autoDockInterval)
            }
        },
        stopAutoDock: function() {
            this._autoDockTimer && (this._autoDockTimer = window.clearTimeout(this._autoDockTimer))
        },
        abortAutoDock: function() {
            this.stopAutoDock(),
            this._autoDockAborted = !0,
            this.pnl.off("mouseover", this._pnlMouseOverHandler),
            this.pnl.off("mouseout", this._pnlMouseOutHandler),
            this.pnl.off("mousedown", this._pnlMouseDownHandler)
        }
    }),
    o
});;
/*!searchdetail:widget/ui/controls/pictureinfo/pictureinfo.js*/
define("searchdetail:widget/ui/controls/pictureinfo/pictureinfo",
function(e, i, t) {
    function r(e, i) {
        return e + (i && i.length >= 1 ? i.slice(0, 1).toUpperCase() + i.slice(1) : "")
    }
    function n(e) {
        this._element = o(e),
        this._innerElements = null
    }
    var o = e("common:widget/ui/base/base"),
    s = e("common:widget/ui/utils/utils"),
    c = e("searchdetail:widget/ui/utils/lib"),
    a = e("common:widget/ui/juicer/juicer"),
    l = e("searchdetail:widget/ui/statistic/statistic-core"),
    p = '<div class="pic-info-box card-box" style="display:none;"><div class="card-title"><i class="pic-info-sticker"></i><span>图片信息</span></div><div class="pic-info-content"><div class="pic-title"><a target="_blank" href="#"></a></div><div class="pic-copyright-detail"></div><div class="pic-source"><a class="pic-from-host" target="_blank" href="#" hidefocus="true"></a><span class="divider"></span><a class="pic-size" target="_blank" href="#" log-click="p=9.urlsearch" hidefocus="true"></a></div><div class="pic-copyright"><span class="copyright-from"></span><span class="copyright-tip"><img src="//img2.bdstatic.com/static/searchdetail/img/icon_copyright_tip_4a93e68.png" /><span class="cr-tip up-arrow"></span></span><div class="cr-tip cr-tip-words"></div></div><div class="pic-copyright-buy"></div></div></div>',
    d = {
        copyrightDetail: a(["{@if wxh}", '<div class="pic-copyright-detail-line">', "<span>规格：</span>", "${width} &times; ${height} px", "</div>", "{@/if}", "{@if imgSize}", '<div class="pic-copyright-detail-line">', "<span>存储大小：</span>", "${(imgSize / 1024 / 1024).toFixed(3)} MB", "{@if ext}", " - ${ext.toUpperCase()}", "{@/if}", "</div>", "{@/if}", "{@if authType}", '<div class="pic-copyright-detail-line">', "<span>授权方式：</span>", "${authType}", '{@if authType === "RF"}', "（免版税金使用版权图片）", '{@else if authType === "RM"}', "（特定使用范围版权图片）", '{@else if authType === "RR"}', "（限定用途类版权图片）", '{@else if authType === "CC0"}', "（版权共享图片）", "{@/if}", "</div>", "{@/if}", "{@if brand}", '<div class="pic-copyright-detail-line"><span>品牌：</span>${brand}</div>', "{@/if}", "{@if author}", '<div class="pic-copyright-detail-line"><span>作者：</span>${author}</div>', "{@/if}", "{@if modelRelease}", '<div class="pic-copyright-detail-line"><span>肖像权/物权：</span>${modelRelease}</div>', "{@/if}", "{@if imgType}", '<div class="pic-copyright-detail-line"><span>图片类型：</span>${imgType}</div>', "{@/if}"].join("")),
        copyrightBuy: a(['<a class="pic-copyright-buy-btn" target="_blank" href="${orderLink}" hidefocus="true"', ' oncontextmenu="return false" log-click="${orderLog}">购买</a>'].join(""))
    },
    h = {
        1 : "视觉中国",
        2 : "全景网",
        3 : "东方IC",
        4 : "中国图库",
        5 : "汇图网",
        6 : "壹图网",
        7 : "拍信",
        8 : "美好景象",
        9 : "站酷",
        10 : "麦片网",
        12 : "图腾",
        203 : "天极网",
        205 : "易车网",
        206 : "来福岛",
        207 : "秀人网",
        208 : "尤果网",
        209 : "58车",
        210 : "房天下",
        211 : "家图网",
        212 : "摄影网"
    };
    o.extend(n.prototype, {
        init: function() {
            this._element.append(p),
            this._element = this._element.find(".pic-info-box"),
            this._innerElements = {
                title: this._element.find(".pic-title a"),
                host: this._element.find(".pic-from-host"),
                moreSize: this._element.find(".pic-size"),
                copyright: this._element.find(".copyright-from"),
                copyrightTip: this._element.find(".cr-tip-words")
            },
            this._innerAsyncElements = {
                copyrightDetail: this._element.find(".pic-copyright-detail"),
                copyrightBuy: this._element.find(".pic-copyright-buy")
            },
            this._innerElements.moreSize.click(function() {
                o.cookie("uploadTime", Date.now(), {
                    path: "/"
                })
            })
        },
        update: function(e, i) {
            var t = e.imgCollectionWord;
            if (t && (i.set("word", t), o("#kw").val(t)), this._element.hide(), "1" !== e.youtuType) {
                var r = i.getKey();
                this.syncRender(e, i).then(function() {
                    return this.asyncRender(e, i)
                }.bind(this)).done(function() {
                    r === i.getKey() && l.send("5.1010003", {})
                }).always(function() {
                    r === i.getKey() && this._element.show()
                }.bind(this))
            }
        },
        syncRender: function(e, i) {
            var t = new o.Deferred,
            n = this._getUpdatedInfo(e, i),
            s = this._innerElements;
            this._element.removeClass("pic-info-hascopyright"),
            e.partnerId && 0 !== +e.partnerId && 1 !== +e.partnerId && this._element.addClass("pic-info-hascopyright");
            for (var c in s) if (s.hasOwnProperty(c)) {
                var a = s[c],
                l = r("titleFor", c),
                p = r("urlFor", c),
                d = r("logFor", c);
                a.html(n[c] || ""),
                a.attr("title", n[l] || ""),
                a.attr("href", n[p] || "#"),
                n[d] && a.attr("log-click", n[d])
            }
            return t.resolve()
        },
        asyncRender: function(e, i) {
            var t = new o.Deferred;
            o.each(this._innerAsyncElements,
            function(e, i) {
                i.empty()
            });
            var r = i.getKey(),
            n = i.getPropCollection("copyrightInfo");
            return e.partnerId && 0 !== +e.partnerId && n ? n.getByKey(r, i.data.rootImg && i.data.rootImg.key, !1).then(function(n) {
                var s = n && n[e.cs];
                if (r === i.getKey() && s) {
                    var a = (s.wxh || "").split("x"),
                    l = e.fromURL || "",
                    p = o.extend({},
                    s, {
                        width: ~~a[0],
                        height: ~~a[1],
                        orderLog: "p=5.15&tn=baiduimagedetail&fm=prodbuy&site=" + encodeURIComponent(l),
                        orderLink: c.getRedirectUrl(l, e.objURL)
                    });
                    o.each(this._innerAsyncElements,
                    function(e, i) {
                        i.empty().html(d[e].render(p))
                    }),
                    t.resolve()
                } else t.reject()
            }.bind(this),
            function() {
                t.reject()
            }) : t.reject(),
            t
        },
        _getUpdatedInfo: function(e, i) {
            var t = e.fromPageTitle || e.fromPageTitleEnc || e.picDesc || i.get("word");
            t = s.trimTags(t);
            var r = e.fromHost.replace(/^https?:\/\//i, ""),
            n = 25;
            if (r.length > n) {
                var a = r.match(/(.+)(\.[a-z0-9]{1,3})$/i);
                if (a && a.length >= 3) {
                    var l = a[2];
                    r = s.cutHtmlText(a[1], n - l.length, "...") + l
                } else r = s.cutHtmlText(r, n, "...")
            }
            var p = e.fromURL || "",
            d = e.objURL,
            f = c.getRedirectUrl(e.fromURL || e.picDescUrl || "", d),
            g = c.getRedirectUrl(p, d),
            m = "/n/pc_list?queryImageUrl=" + encodeURIComponent(e.thumbURL || e.bigImgUrl || d) + "&querySign=" + encodeURIComponent(e.cs || e.querysign) + "#activeTab=0",
            u = "p=5.15&tn=baiduimagedetail&fm=ahref&site=" + encodeURIComponent(p),
            y = u + "&ext=" + encodeURIComponent(o.json.stringify({
                desc: e.picDesc
            })); ! e.fromURLHostWord && e.partnerId && (e.fromURLHostWord = h[e.partnerId]);
            var v = function(e) {
                return "本图片版权归" + e.fromURLHostWord + "或" + e.fromURLHostWord + "所代理的著作权人所有，仅限个人基于欣赏、学习、研究目的查看、下载使用，并应注明图片来源" + e.fromURLHostWord + "。如需用于任何公开媒介或商业用途，请联系" + e.fromURLHostWord + "（" + e.fromHost + "）获取图片授权，否则如造成图片侵权，应承担相应法律责任。"
            };
            return {
                title: s.cutHtmlText(t, 30, "...", 2),
                host: r,
                moreSize: e.width + "*" + e.height,
                copyright: "© " + e.fromURLHostWord + " 版权声明 ",
                copyrightTip: v(e),
                urlForTitle: f,
                urlForHost: g,
                urlForMoreSize: m,
                titleForTitle: t,
                titleForHost: p,
                titleForMoreSize: "更多尺寸",
                logForHost: u,
                logForTitle: y
            }
        }
    }),
    t.exports = n
});;
/*!searchdetail:widget/ui/collections/imgcollection.js*/
define("searchdetail:widget/ui/collections/imgcollection",
function(t) {
    function e() {
        this.url = "/search/acjson",
        this.total = -1,
        this.resOffsetAdjust = 0,
        this.reqParams = null,
        this.requestPool = {},
        this.requestedMinOffset = 1 / 0,
        this.fieldsMap = null,
        this.parseResponseFunc = null
    }
    function n(t) {
        t = t || new e,
        r.call(this, t),
        this.configCache({
            primaryKey: "key"
        }),
        this.imgSetCollections = {},
        this.fixedData = [];
        var n = this;
        a(["beforeFetch", "afterFetch"]).each(function(e, s) {
            t.on(s,
            function(t) {
                n.fire(s, t)
            })
        }),
        this.imgSetParams = !1
    }
    function s(t, s) {
        var i = this,
        r = new e,
        o = s.imgSetParams || s.dataProxy.reqParams;
        r.on("afterFetch",
        function() {
            var e = i.getTotal();
            2 > e && (t.isSet = !1),
            t.bdSetImgNum = e
        }),
        this.albumImgInfo = t,
        n.call(this, r);
        var f = {
            is: t.is,
            cs: t.cs || "",
            lpn: t.spn || 0,
            adpicid: t.adPicId,
            bdtype: t.bdSrcType,
            istype: 1
        }; + t.pn === u && (f.is = o.is || t.is, f.lpn = o.spn || t.lpn, f.adpicid = o.adpicid || t.adPicId, f.cs = o.cs || t.cs),
        ("pcindexnew" === o.catename || "pcindexhot" === o.catename) && (f.word = t.userData && t.userData.Query || o.word),
        this.setReqParams(a.extend({},
        o, f)),
        this.setFieldMap(a.extend({},
        s.dataProxy.fieldsMap, {
            bdSetImgNum: function() {
                return 0
            },
            isSet: function() {
                return ! 1
            }
        }))
    }
    var a = t("common:widget/ui/base/base"),
    i = t("common:widget/ui/base/events"),
    r = t("common:widget/ui/arch/collection"),
    o = t("searchdetail:widget/ui/app/pagemodel"),
    f = t("searchdetail:widget/ui/utils/lib"),
    u = o.get("pn") || 0;
    return a.extend(e.prototype, i, {
        _putRequest: function(t, e, n) {
            var s = this;
            n.then(function(n) {
                return s._completeRequest(t, e),
                n
            }),
            this.requestPool[t] = {
                rn: e,
                promise: n
            }
        },
        _completeRequest: function(t, e) {
            t < this.requestedMinOffset && (this.requestedMinOffset = t);
            var n = this.requestPool[t];
            n && n.rn == e && delete this.requestPool[t]
        },
        _getRequest: function(t, e) {
            var n = this.requestPool[t];
            return n && e <= n.rn ? n.promise: null
        },
        hasMore: function(t, e) {
            var n = e ? e.length: 0;
            return fixedCount = this.resOffsetAdjust - t,
            fixedCount > 0 && (n -= fixedCount),
            this.total < 0 || t + n < this.total
        },
        fetch: function(t, e, n, s) {
            var i = this.fetchSingle(t, e, n, s),
            r = i.param;
            if (i.hasMore && r.pn + r.rn < e + n + Math.floor(n / 2)) {
                var o = 0,
                f = {
                    dataSet: []
                },
                u = new a.Deferred,
                l = this.fetchSingle(t, r.pn + r.rn, 30, []);
                return i.pro.then(function(t) {
                    return o += 1,
                    f.offset = t.offset,
                    f.total = t.total,
                    f.dataSet = t.dataSet.concat(f.dataSet),
                    2 == o && u.resolve(f),
                    t
                }),
                l.pro.then(function(t) {
                    return o += 1,
                    f.dataSet = f.dataSet.concat(t.dataSet),
                    2 == o && u.resolve(f),
                    t
                }),
                u
            }
            return i.pro
        },
        fetchSingle: function(t, e, n, s) {
            var i = this.parseReqParam(t, e, n, s),
            r = this,
            f = {
                param: i,
                offset: e,
                limit: n,
                existDataSet: s
            };
            if (! (i.rn && this.hasMore(e, s) || -1 == r.total)) {
                var u = new a.Deferred;
                return u.resolve({
                    offset: e
                }),
                {
                    pro: u,
                    param: i,
                    hasMore: !1
                }
            }
            var l = this._getRequest(i.pn, i.rn),
            h = this.url;
            return "avatarnewimagesetpic" === i.tn && (h = "/search/imagesetpic", i.rn = 60, i.spn = i.lpn || 0),
            l || (this.fire("beforeFetch", f), o.data.gsms && o.data.gsms[i.pn] ? i.gsm = o.data.gsms[i.pn] : o.data.gsms && o.data.gsms[i.pn + i.rn] ? i.gsm = o.data.gsms[i.pn + i.rn] : (i.gsm = o.data.gsm, o.data.gsms ? o.data.gsms[i.pn] = o.data.gsm: (o.data.gsms = [], o.data.gsms[i.pn] = o.data.gsm)), i[(new Date).getTime()] = "", l = a.get(h, i, null, "text").then(function(t) {
                var e = r.parseResponse(t, i.pn);
                return o.set("gsm", e.gsm),
                o.data.gsms[i.pn + i.rn] = e.gsm,
                r.total = e.dataSet.length < i.rn ? Math.min(e.total, i.pn + e.dataSet.length) : e.total,
                r.fire("afterFetch", a.extend({
                    responseData: e
                },
                f)),
                e
            }), this._putRequest(i.pn, i.rn, l)),
            {
                pro: l,
                param: i,
                hasMore: !0
            }
        },
        parseResponse: function(t, e) {
            t = f.parseResponse(t),
            this.parseResponseFunc && (t = this.parseResponseFunc(t));
            var n = t && t.data,
            s = t && t.gsm,
            i = t && (t.total || t.displayNum || t.listNum) || -1;
            if (n && n.length) {
                var r = n.length - (a.isEmptyObject(n[n.length - 1]) ? 1 : 0);
                i = Math.max(i, e + r),
                a(n).each(function(t, s) {
                    a.isEmptyObject(s) || (n[t].gsm = o.data.gsms[e])
                })
            }
            return {
                offset: e + this.resOffsetAdjust,
                total: i,
                gsm: s,
                dataSet: n && n.length && null != n[0] ? this.mapList(a.isEmptyObject(n[n.length - 1]) ? n.splice(0, n.length - 1) : n, e) : []
            }
        },
        mapList: function(t, e) {
            for (var n, s = "undefined" != typeof e,
            a = t.length - 1; a >= 0; a--) n = this.mapField(t[a]),
            s && (n.pn = e + a, n.offset = n.pn + this.resOffsetAdjust, n.pageNum || (n.pageNum = n.pn));
            return t
        },
        mapField: function(t) {
            if (t && this.fieldsMap && !t.key) {
                var e = this.fieldsMap || {};
                for (var n in e) e.hasOwnProperty(n) && (fieldValConf = e[n], t[n] = "function" == typeof fieldValConf ? fieldValConf(t) : t[fieldValConf])
            }
            return t
        },
        parseReqParam: function(t, e, n) {
            var s = a.extend({
                tn: "resultjson_com"
            },
            this.reqParams, t);
            return this.reqParams.fr && (this.reqParams.fr = ""),
            e = e || 0,
            s.pn = 30 * Math.floor(e / 30),
            s.rn = Math.max(30 * Math.ceil((n + e - s.pn) / 30), 30),
            s.pn <= this.requestedMinOffset && s.pn + s.rn > this.requestedMinOffset && (s.pn = s.pn - (s.pn + s.rn - this.requestedMinOffset), s.pn < 0 && (s.pn = 0, s.rn = this.requestedMinOffset)),
            s
        }
    }),
    a.extend(n.prototype, r.prototype, i, {
        setReqUrl: function(t) {
            this.dataProxy.url = t
        },
        setReqParams: function(t) {
            this.dataProxy.reqParams = t
        },
        getReqParams: function() {
            return this.dataProxy.reqParams
        },
        setFieldMap: function(t) {
            this.dataProxy.fieldsMap = t
        },
        setParseResponse: function(t) {
            this.dataProxy.parseResponseFunc = t
        },
        getFixDataLength: function() {
            return this.dataProxy.resOffsetAdjust
        },
        putFixData: function(t) {
            if (t && t.length) {
                for (var e, n = this.dataProxy.resOffsetAdjust,
                s = this.getTotal(), a = 0, i = t.length; i > a; a++) e = t[a],
                n += 1,
                e.srcType = e.srcType || "rec",
                this.dataProxy.mapField(e),
                e.key = -1 * n,
                e.offset = s + a,
                this.put(e);
                this.dataProxy.resOffsetAdjust += n
            }
        },
        mapField: function(t) {
            return this.dataProxy.mapField(t)
        },
        get: function(t, e, n) {
            return "undefined" != typeof e && (e = 1 * e, e += this.dataProxy.resOffsetAdjust),
            r.prototype.get.call(this, t, e, n)
        },
        getByOffset: function(t, e) {
            return r.prototype.get.call(this, {},
            t, e)
        },
        getByIndex: function(t, e) {
            return this.get({},
            t, e)
        },
        getByKey: function(t) {
            var e = {
                key: t
            };
            return this.get(e).then(function(t) {
                return t.length ? t[0] : null
            })
        },
        getByMiddle: function(t, e) {
            var n = Math.ceil((e - 1) / 2),
            s = Math.max(t - n, -1 * this.getFixDataLength()),
            a = t - s + 1 + n,
            i = this;
            return a = Math.min(a, 30 * Math.floor(s / 30) + 60 - s),
            this.getByIndex(s, a).then(function(t) {
                return {
                    offset: s + i.getFixDataLength(),
                    reqCount: a,
                    result: t
                }
            })
        },
        getTotal: function() {
            return Math.max(this.dataProxy.total, 0) + this.dataProxy.resOffsetAdjust
        },
        getSubImg: function(t, e, n) {
            n = n || 1;
            var s = new a.Deferred,
            i = this;
            return this.getByIndex(t, 1).then(function(t) {
                var a = t[0],
                r = i._getImgSetCollectionIns(a);
                r ? r.getByIndex(e, n).then(function(t) {
                    s.resolve({
                        imgData: a,
                        subList: t
                    })
                }) : s.resolve({
                    imgData: a,
                    subList: null
                })
            }),
            s
        },
        getImgSetCollection: function(t) {
            var e = a.isPlainObject(t) ? t: null;
            return e || this.getByKey(t).then(function(t) {
                e = t
            }),
            e && this._getImgSetCollectionIns(e)
        },
        _getImgSetCollectionIns: function(t) {
            var e = t && this.imgSetCollections[t.key];
            return e || (e = this._createImgSetCollection(t), e && (this.imgSetCollections[t.key] = e), e && this.fire("newImgSetCollection", {
                imgSetCollection: e
            })),
            e
        },
        _createImgSetCollection: function(t) {
            return t && t.isSet ? new s(t, this) : null
        },
        setImgSetReqParams: function(t) {
            this.imgSetParams = t
        },
        tamperImg: function(t, e, n) {
            var s = new a.Deferred,
            i = this;
            return this.getByIndex(t, 1).then(function(r) {
                var o = r[0];
                if (o) {
                    var f = o.key;
                    o.di != e.di || o.objURL != e.objURL ? n ? i.checkImgData(t, e).done(function() {
                        a.extend(o, e),
                        o.key = f,
                        i.fire("tamperImg", {
                            offset: t,
                            imgData: o
                        }),
                        s.resolve()
                    }).fail(function() {
                        s.reject()
                    }) : (a.extend(o, e), o.key = f, s.resolve(), i.fire("tamperImg", {
                        offset: t,
                        imgData: o
                    })) : s.resolve()
                } else s.reject()
            }),
            s
        },
        checkImgData: function(t, e) {
            var n = new a.Deferred;
            if (e.di && e.objURL) {
                var s = this.getReqParams(),
                i = {
                    ct: "503316480",
                    tn: "resultjson_com",
                    ipn: "dj",
                    word: s.word,
                    cl: s.cl,
                    lm: s.lm,
                    hd: s.hd,
                    latest: s.latest,
                    copyright: s.copyright,
                    ie: s.ie,
                    st: s.st,
                    z: s.z,
                    ic: s.ic || "",
                    s: s.s || "",
                    se: s.se || "1",
                    tab: s.tab || "",
                    width: s.width || "",
                    height: s.height || "",
                    face: s.face || "",
                    istype: s.istype || "",
                    di: e.di,
                    objURL: encodeURIComponent(e.objURL),
                    pn: t,
                    ln: 1,
                    fromURL: f.compile(e.fromURL || ""),
                    rpstart: s.rpstart,
                    rpnum: s.rpnum
                };
                a.get("/search/acjson", i, null, "text").then(function(t) {
                    t = f.parseResponse(t),
                    t && 1 != t.imageInfo ? n.resolve() : n.reject()
                })
            } else n.reject();
            return n
        }
    }),
    a.extend(s.prototype, n.prototype, {
        getImgSetCollection: function() {
            return null
        }
    }),
    n
});;
/*!searchdetail:widget/ui/imgloader/imgloadpool.js*/
define("searchdetail:widget/ui/imgloader/imgloadpool",
function(t) {
    function i(t) {
        this._queue = [],
        this._loadingCount = 0,
        this._loadingList = {},
        this._loadingConflict = {},
        this._loadedImgs = [],
        this._imgInfoCache = {},
        this._waitTimer = !1,
        this.options = e.extend({
            loader: a,
            parallelCount: 3,
            maxQueueCount: 50,
            maxCacheCount: 1e3
        },
        t)
    }
    var e = t("common:widget/ui/base/base"),
    o = t("common:widget/ui/base/events"),
    n = t("common:widget/ui/monitorRequest/monitorRequest"),
    h = t("common:widget/ui/utils/utils"),
    a = {
        load: function(t, i) {
            var o, a = new e.Deferred,
            u = new Image,
            s = this;
            return u.onload = function() {
                var e = s.getImgInfo(u);
                e.loadTime = (new Date).getTime() - o,
                s.checkResponse(e, i, 100) ? (e.url = t, a.resolve(e), s.checkResponse(e, i, 0) || n("//imgstat.baidu.com/5.gif?p=1012001&refer=" + encodeURIComponent(window.location.href) + "&" + h.jsonToQuery({
                    type: "wrongSize",
                    objurl: encodeURIComponent(t),
                    width: e.width,
                    height: e.height,
                    backwidth: i.width,
                    backheight: i.height,
                    fromurl: !!i.imgData && encodeURIComponent(i.imgData.thumbURL)
                }))) : (a.reject(), n("//imgstat.baidu.com/5.gif?p=1012001&refer=" + encodeURIComponent(window.location.href) + "&" + h.jsonToQuery({
                    type: "filter",
                    objurl: encodeURIComponent(t),
                    width: e.width,
                    height: e.height,
                    backwidth: i.width,
                    backheight: i.height,
                    fromurl: !!i.imgData && encodeURIComponent(i.imgData.thumbURL)
                })))
            },
            u.onerror = function() {
                a.reject()
            },
            o = (new Date).getTime(),
            u.src = t,
            a.always(function() {
                u.onload = u.onerror = null,
                u = null
            })
        },
        getImgInfo: function(t) {
            var i = {
                url: t.src,
                width: t.width,
                height: t.height
            };
            return i
        },
        checkResponse: function(t, i, e) {
            return this._checkSize(t.width, i.width, e) && this._checkSize(t.height, i.height, e)
        },
        _checkSize: function(t, i, e) {
            return 0 >= t || 0 >= i ? !0 : (e = e || 0, Math.abs(t - i) <= e)
        }
    };
    return e.extend(i.prototype, o, {
        put: function(t, i) {
            for (var e = [], o = 0, n = t.length; n > o; o++) this._needLoad(t[o]) && e.push(t[o]);
            return e.length && (!1 === i ? Array.prototype.push.apply(this._queue, e) : Array.prototype.unshift.apply(this._queue, e), this._queue.length > this.options.maxQueueCount && this._queue.splice(this.options.maxQueueCount), this._load()),
            !!e.length
        },
        immediate: function(t) {
            this.put([t]) && this._loadQueueFirst()
        },
        clear: function() {
            this._queue = []
        },
        _needLoad: function(t) {
            var i = t.url;
            return i in this._loadingList ? (this.addConflict(i, t), !1) : i in this._imgInfoCache ? (this.dispatchEvent("imgloaded", {
                imgInfo: this._imgInfoCache[i],
                reqInfo: t
            }), !1) : !0
        },
        _load: function() {
            var t = this._queue;
            if (!this._waitTimer && t.length && this._loadingCount < this.options.parallelCount) {
                var i = this;
                this._waitTimer = window.setTimeout(function() {
                    i._waitTimer = !1,
                    i._loadBegin()
                },
                200)
            }
        },
        _loadBegin: function() {
            var t = this._queue;
            t.length && this._loadingCount < this.options.parallelCount && (this._loadQueueFirst(), this._load())
        },
        _loadQueueFirst: function() {
            var t = this._queue.shift();
            if (t && this._needLoad(t)) {
                this._loadingCount += 1;
                var i = this,
                e = this.options.loader.load(t.url, t);
                this._loadingList[t.url] = e,
                this.addConflict(t.url, t),
                e.then(function(e) {
                    i.loadCompeleted(t.url, e)
                },
                function() {
                    i.loadCompeleted(t.url, null)
                })
            }
        },
        loadCompeleted: function(t, i) {
            this._loadingCount -= 1;
            this._loadingList[t];
            this._putInLoaded(t, i);
            for (var e = this._loadingConflict[t], o = e.length - 1; o >= 0; o--) this.dispatchEvent("imgloaded", {
                imgInfo: i,
                reqInfo: e[o]
            });
            delete this._loadingList[t],
            delete this._loadingConflict[t],
            this._load()
        },
        _putInLoaded: function(t, i) {
            var e = this._loadedImgs,
            o = this._imgInfoCache;
            e.push(t),
            o[t] = i;
            for (var n, h = this.options.maxCacheCount; e.length > h;) n = e.shift(),
            delete o[n]
        },
        addConflict: function(t, i) {
            var o = this._loadingConflict[t];
            o && ~e.map(o,
            function(t) {
                return t.imgData
            }).indexOf(i.imgData) || (this._loadingConflict[t] = o || [], this._loadingConflict[t].push(i))
        }
    }),
    i
});;
/*!searchdetail:widget/ui/imgloader/imgloadstrategy.js*/
define("searchdetail:widget/ui/imgloader/imgloadstrategy",
function(e) {
    function i(e, i, t, o) {
        this.imgCollection = e,
        this.bigImgLoadPool = new a({
            parallelCount: 5
        }),
        this.imgModel = i,
        this.pageModel = o,
        this._initialIndex = t || i.get("pn") || 0,
        this._isFirstFetch = !0,
        this.isLoaded = !0,
        this.loadedURI = ""
    }
    var t = e("common:widget/ui/base/base"),
    o = e("common:widget/ui/base/events"),
    a = (e("searchdetail:widget/ui/utils/lib"), e("searchdetail:widget/ui/imgloader/imgloadpool"));
    return t.extend(i.prototype, o, {
        start: function() {
            var e = this;
            this.bigImgLoadPool.addEventListener("imgloaded", this._onBigImageLoaded.bind(this)),
            this._listenImgCollection(this.imgCollection),
            this.imgCollection.on("newImgSetCollection",
            function(i) {
                e._listenImgCollection(i.imgSetCollection)
            }),
            "new_dep_tpl" == this.pageModel.get("investTpl") ? this.imgModel.on("imgDeepData:changed", this._onImgSwitched.bind(this)) : this.imgModel.on("imgData:changed", this._onImgSwitched.bind(this))
        },
        _listenImgCollection: function(e) {
            e.on("beforeFetch", this._onBeforeFetchImg.bind(this)),
            e.on("afterFetch", this._onAfterFetchImg.bind(this)),
            e.on("tamperImg", this._onTamperImg.bind(this))
        },
        _buildLoadReqInfo: function(e) {
            return {
                imgData: e,
                url: e.objURL,
                width: e.width,
                height: e.height
            }
        },
        _onImgSwitched: function() {
            var e = this.imgModel.get("imgData"),
            i = this.imgModel.get("pn"),
            t = this;
            this.immediateLoad(e),
            i > 0 && this.imgCollection.get({},
            i - 1, 1).then(function(e) {
                var i = e[0];
                if (t.immediateLoad(i), i.isSet) {
                    var o = t.imgCollection.getImgSetCollection(i);
                    o.getByIndex(i.bdSetImgNum - 5, 5)
                }
                "new_dep_tpl" === t.pageModel.get("investTpl") ? t.loadDeepPropInfo(i) : t.loadPropInfo(i),
                t.fire("preload", {
                    data: i
                })
            }),
            this.imgCollection.get({},
            i + 1, 3).then(function(e) {
                for (var i, o = 0; o < e.length; o++) {
                    if (i = e[o], t.immediateLoad(i), i.isSet) {
                        var a = t.imgCollection.getImgSetCollection(i);
                        a.getByIndex(0, 5)
                    }
                    "new_dep_tpl" == t.pageModel.get("investTpl") ? t.loadDeepPropInfo(i) : t.loadPropInfo(i)
                }
                t.fire("preload", {
                    data: e
                })
            })
        },
        loadPropInfo: function(e) {
            var i = this.imgModel.getPropCollections(e);
            if (i && i.length) for (var t = i.length - 1; t >= 0; t--) i[t].getByKey(e.key)
        },
        loadDeepPropInfo: function(e) {
            var i = this.imgModel.getPropCollections(e),
            t = this;
            if (i && i.length) {
                var o = this.imgModel.getPropCollection("imageDeepInfo");
                if (o) o.getByKey(e.key).done(function(a) {
                    var n, g;
                    if (a && a.cards) {
                        n = o.imgCollection.mapField(a.cards),
                        g = o.imgCollection.mapField({}),
                        n.key = a.key;
                        for (var l in n) n.hasOwnProperty(l) && n[l] && n[l] !== g[l] && (e[l] = n[l])
                    }
                    i = t.imgModel.getPropCollections(e);
                    for (var d = i.length - 1; d >= 0; d--) {
                        var l = i[d].dataProxy && i[d].dataProxy.opts && i[d].dataProxy.opts.key;
                        "imageDeepInfo" != l && i[d].getByKey(e.key)
                    }
                });
                else for (var a = i.length - 1; a >= 0; a--) i[a].getByKey(e.key)
            }
        },
        immediateLoad: function(e) {
            e.bigImgUrl && e.bigImgUrl != e.objURL && this.bigImgLoadPool.immediate(this._buildLoadReqInfo(e))
        },
        loadBigImg: function(e, i) {
            for (var t = [], o = e.length - 1; o >= 0; o--) {
                var a = e[o];
                a.bigImgUrl && a.bigImgUrl !== a.objURL && t.unshift(this._buildLoadReqInfo(a))
            }
            t.length && this.bigImgLoadPool.put(t, i)
        },
        _onTamperImg: function(e) {
            var i = this.imgModel.get("pn");
            e.offset == i && this.immediateLoad(e.imgData)
        },
        _onBeforeFetchImg: function(e) {
            e.existDataSet && this.loadBigImg(e.existDataSet)
        },
        _onAfterFetchImg: function(e) {
            this._loadImages(e, this.pageModel.get("pn")),
            this._isFirstFetch && (alog && alog("speed.set", "c_imgfsload", +new Date), alog.fire && alog.fire("mark")),
            this._isFirstFetch = !1
        },
        _loadImages: function(e, i) {
            var t = e.responseData.dataSet,
            o = e.param.pn;
            if (i >= o && i < o + t.length) {
                var a = i - o,
                n = [];
                n = n.concat(t.slice(a, a + 4), t.slice(Math.max(a - 2, 0), a), t.slice(a + 4), t.slice(0, Math.max(a - 2, 0))),
                this.loadBigImg(n)
            } else this.loadBigImg(t, !1)
        },
        _onBigImageLoaded: function(e) {
            var i = e.reqInfo.imgData,
            t = e.imgInfo;
            t ? i.objURL === t.url && (i.bigImgUrl = t.url, i.loadState = 1, this.fire("bigimgloaded", {
                imgData: i,
                loadInfo: t
            })) : (i.loadState = -2, this.fire("bigimgloadedErr", {
                imgData: i,
                loadInfo: {}
            }))
        }
    }),
    i
});;
/*!searchdetail:widget/ui/models/imagemodel.js*/
define("searchdetail:widget/ui/models/imagemodel",
function(t) {
    var e = t("common:widget/ui/base/base"),
    o = (t("common:widget/ui/utils/utils"), t("common:widget/ui/base/events")),
    i = t("common:widget/ui/arch/model"),
    n = new i({
        imgData: null,
        scale: 1,
        total: 0,
        word: "",
        pn: 0
    });
    return e.extend(n, i.prorotype, o, {
        set: function(t, e, o) {
            var n = i.prototype.set.call(this, t, e);
            if (o && (n = [t]), n && n.length) for (var r = 0; r < n.length; r++) this.dispatchEvent(n[r] + ":changed")
        },
        getKey: function() {
            var t = this.get("imgData");
            return t && t.key
        },
        setPropCollections: function(t) {
            this.set("__propcols_", t)
        },
        getPropCollection: function(t) {
            var e = this.get("__propcols_");
            return e && e[t]
        },
        getPropCollections: function(t) {
            var o = this.get("__propcols_"),
            i = [];
            if (t) for (var n in o) if (o.hasOwnProperty(n)) {
                var r = t[n],
                s = r && (!e.isArray(r) || r.length);
                s && i.push(o[n])
            }
            return i
        }
    }),
    n
});;
/*!searchdetail:widget/ui/app/datacontroller.js*/
define("searchdetail:widget/ui/app/datacontroller",
function(e) {
    function t(e, t, i, o) {
        this.pageModel = e,
        this.imgModel = t,
        this.imgCollection = i,
        this.priorDataProc = o
    }
    var i = e("common:widget/ui/base/base"),
    o = e("searchdetail:widget/ui/statistic/avatar-statistic"),
    g = e("searchdetail:widget/ui/utils/lib");
    return i.extend(t.prototype, {
        initialData: function(e) {
            e = e || 30;
            var t = this,
            o = this.pageModel.get("pn"),
            g = new i.Deferred,
            a = this.priorDataProc.getData(),
            n = a && a.length || 0;
            n && this.imgCollection.putFixData(a);
            var r = -1 * n;
            return this.pageModel.set("minPn", r),
            r > o && (this.pageModel.set("pn", r), o = r),
            this.imgCollection.getByMiddle(o, e).then(function(i) {
                var a = t.imgCollection.getTotal();
                t.imgModel.set("total", a),
                a > o ? t._overrideData(o, i.result).done(function() {
                    o != t.pageModel.get("pn") ? t.imgCollection.getByMiddle(t.pageModel.get("pn"), e).then(function(e) {
                        g.resolve({
                            offset: e.offset,
                            dataSet: e.result
                        })
                    }) : g.resolve({
                        offset: i.offset,
                        dataSet: i.result
                    })
                }).fail(function() {
                    g.reject()
                }) : g.reject()
            }),
            g
        },
        getInitImgData: function() {
            var e = this.pageModel.tempData.get("imgInfo"),
            t = e && e.imgData;
            return t && t.objURL && t.width ? this.imgCollection.mapField(t) : null
        },
        _overrideData: function(e, t) {
            var o = this.pageModel.tempData.get("imgInfo"),
            a = o && o.imgData,
            n = this.pageModel.uri.hash.data,
            r = {},
            s = !1;
            if (a && a.pn == this.pageModel.get("pn")) {
                var l = !0;
                if (a.objURL) {
                    a.fromURL = i.trim(g.uncompileURL(a.fromURL)),
                    a.hoverURL = i.trim(g.uncompileURL(a.hoverURL)),
                    a.largeTnImageUrl = a.thumbURL || a.hoverURL || a.largeTnImageUrl,
                    a.objURL = i.trim(g.uncompileURL(a.objURL)),
                    a.fromPageTitle = i.trim(a.fromPageTitle),
                    a.is = this.pageModel.get("is"),
                    a.cs = this.pageModel.get("cs") || "",
                    a.os = a.os || this.pageModel.get("os") || "",
                    a.pi = a.pi || this.pageModel.get("pi") || "";
                    var m = this._findImgInList(a, t, e);
                    m && (this.pageModel.set("pn", m.pn), l = !1)
                } else l = !1;
                l && this.imgCollection.tamperImg(e, this.imgCollection.mapField(a), !1)
            }
            return n.di && (a && n.di == a.di ? n.spn || (r = a, r.bdSetImgNum = 0) : (r = i.extend(r, n, {
                objURL: n.objURL || n.objurl,
                fromURL: g.uncompileURL(n.fromURL || n.fromurl),
                fromPageTitle: this.pageModel.get("word"),
                is: "",
                bdSrcType: "0",
                bdSetImgNum: 0,
                bdSourceName: "",
                bdFromPageTitlePrefix: "",
                width: n.W,
                height: n.H,
                filesize: n.S,
                type: n.TP
            }), r.thumbURL = r.objURL, r.fromURLHost = g.getHost(r.fromURL), s = !0)),
            r.di ? this.imgCollection.tamperImg(e, r, s) : (new i.Deferred).resolve()
        },
        isImgDataEqual: function(e, t) {
            return e && t && (e.os && e.os === t.os || e.objURL && e.objURL === t.objURL || e.objURLHttp && e.objURLHttp === t.objURLHttp) ? !0 : !1
        },
        _findImgInList: function(e, t, i) {
            if (!e || !e.os && !e.objURL) return ! 1;
            if ("undefined" != typeof i && i >= 0 && i < t.length && this.isImgDataEqual(e, t[i])) return t[i];
            for (var o, g = t.length - 1; g >= 0; g--) if (o = t[g], this.isImgDataEqual(o, e)) return o;
            return ! 1
        },
        freshImgModel: function() {
            var e = this,
            t = this.pageModel.get("pn"),
            i = this.pageModel.get("spn") || 0;
            t < (this.pageModel.get("minPn") || 0) || this.imgCollection.getByIndex(t, 1).then(function(t) {
                var o = t[0],
                g = e.imgCollection.getImgSetCollection(o);
                i > 0 || e.switchImage(o),
                g && g.getByIndex(i, 1).then(function(t) {
                    var i = t[0],
                    g = e.pageModel.get("pageSrc");
                    "result" !== g || i.objURL !== o.objURL && i.objURLHttp !== o.objURLHttp || (i.bigImgUrl = o.bigImgUrl),
                    e.switchImage(o, i)
                })
            })
        },
        freshImgData: function(e) {
            this.imgModel.set("imgData", e, !0)
        },
        changePn: function(e, t, o, g) {
            t = t || 0;
            var o = o || 1,
            a = this,
            n = new i.Deferred;
            return g || e != 1 * this.pageModel.get("pn") || t != 1 * this.pageModel.get("spn") ? e < (this.pageModel.get("minPn") || 0) ? (n.reject(), n) : !g && e >= this.imgCollection.getTotal() - this.imgCollection.getFixDataLength() ? (n.reject(), n) : (this.imgCollection.getByIndex(e, 1).then(function(e) {
                var i = e[0],
                g = a.imgCollection.getImgSetCollection(i); - 1 !== t && i.isSet || (t = i.spn, a.switchImage(i, null)),
                g ? (0 > o && 0 === t && (t = i.bdSetImgNum > 0 ? i.bdSetImgNum - 1 : 0), g.getByIndex(t, 1).then(function(e) {
                    a.switchImage(i, e[0]),
                    n.resolve()
                })) : i ? n.resolve() : n.reject()
            }), n) : (n.reject(), n)
        },
        changeImgOffset: function(e) {
            var t = this.imgModel.get("rootImg"),
            o = 1 * this.pageModel.get("pn"),
            g = 1 * this.pageModel.get("spn"),
            a = !1;
            if (t.isSet) {
                var n = g + e;
                if (n >= 0 && n < t.bdSetImgNum) return a = !0,
                this.changePn(o, n)
            }
            return a ? (new i.Deferred).reject() : this.changePn(o + e, -1, e)
        },
        switchImage: function(e, t) {
            if (e) {
                var i = "number" == typeof e.offset && e.offset - this.imgCollection.getFixDataLength() || e.pn,
                g = t && t.offset || 0,
                a = t || e,
                n = this.pageModel;
                n.set({
                    pn: i,
                    spn: g,
                    lpn: e.spn || 0,
                    di: e.di,
                    cs: e.cs,
                    os: e.os,
                    is: e.is || "",
                    simid: e.simid,
                    pi: e.pi || "",
                    gsm: e.gsm || "",
                    adpicid: e.adPicId,
                    fromurl: e.compiledFromURL || e.fromURL,
                    objurl: a.objURLHttp || a.objURL,
                    "imgData.bdSrcType": a.bdSrcType,
                    "imgData.width": a.width,
                    "imgData.height": a.height,
                    "imgData.filesize": a.filesize,
                    "imgData.type": a.type
                }),
                e.userData && e.userData.Query && n.set({
                    word: e.userData.Query
                }),
                this.imgModel.set({
                    word: n.get("word"),
                    gbkword: n.get("gbkword"),
                    imgData: a,
                    rootImg: e,
                    bigImgUrl: a.bigImgUrl,
                    offset: e.offset,
                    pn: i,
                    spn: g
                }),
                1 === +a.adType && o(a.adid, "pv")
            }
        }
    }),
    t
});;
/*!searchdetail:widget/ui/app/priordata.js*/
define("searchdetail:widget/ui/app/priordata",
function(e) {
    function t(e, t) {
        this.tempData = e,
        this.sequence = t || ["hotWordResult", "browserRsData", "baikeResult"]
    }
    var r = e("common:widget/ui/base/base"),
    i = e("common:widget/ui/utils/utils");
    return r.extend(t.prototype, {
        getData: function() {
            var e, t, i = this,
            a = this.tempData;
            return r(this.sequence).each(function(r, o) {
                return t = i[o],
                e = t ? t.call(i, a.get(o)) : a.get(o),
                e && e.length ? !1 : void 0
            }),
            e
        },
        hotWordResult: function(e) {
            return e
        },
        browserRsData: function(e) {
            var t = [];
            if (e && e.photos) for (var r = 0,
            i = e.photos.length; i > r; r++) {
                var a = e.photos[r];
                t[r] = {
                    srcType: "browserRsData",
                    bdImgnewsDate: "1970-01-01 08:00",
                    bdSetImgNum: 0,
                    bdSourceName: "",
                    bdSrcType: "0",
                    currentIndex: "",
                    di: "0",
                    filesize: "",
                    fromPageTitle: "" == a.summary ? a.query: a.summary,
                    fromPageTitleEnc: "" == a.summary ? a.query: a.summary,
                    fromURL: /^http/.test(a.from_url) ? a.from_url: "http://" + a.from_url,
                    fromURLHost: "",
                    hasLarge: 0,
                    hasThumbData: "0",
                    height: a.height,
                    hoverURL: a.url,
                    is: "0,0",
                    isAspDianjing: 0,
                    largeTnImageUrl: a.url,
                    middleURL: a.url,
                    objURL: a.url,
                    pageNum: "",
                    source_type: "",
                    thumbURL: a.url,
                    token: "",
                    type: "jpg",
                    width: a.width
                }
            }
            return t
        },
        baikeResult: function(e) {
            var t;
            return window.data = e,
            e && (t = [{
                thumbURL: e.pic && i.httpsTimg({
                    imgUrl: e.pic
                }) || "",
                pageNum: -1,
                hasLarge: 2,
                objURL: e.pic || "",
                fromURL: e.original_url || "",
                fromURLHost: "",
                currentIndex: "",
                width: parseInt(e.pic_width) || 310,
                height: parseInt(e.pic_height) || 240,
                type: "jpg",
                filesize: "",
                bdSrcType: "0",
                di: "baikeimg",
                is: "",
                fromPageTitle: e.name,
                token: "",
                bdSetImgNum: 0,
                bdSourceName: "",
                bdFromPageTitlePrefix: ""
            }]),
            t
        }
    }),
    t
});;
/*!searchdetail:widget/ui/featuremanager/cardsequence.js*/
define("searchdetail:widget/ui/featuremanager/cardsequence",
function(e) {
    function t(e) {
        var t = {},
        i = [];
        a(e).each(function(e, a) {
            var r = a.opts.logKey;
            t[r] = a,
            i.push(r)
        }),
        this._cardMap = t,
        this._defaultSeq = i,
        this._currentSeq = i
    }
    var a = e("common:widget/ui/base/base"),
    i = e("searchdetail:widget/ui/utils/lib"),
    r = e("common:widget/ui/base/events");
    a.extend(t.prototype, r, {
        _isSeqEual: function(e, t) {
            return e.join(",") == t.join(",")
        },
        update: function(e) {
            if (e) {
                var t;
                if (e.cardSeq && !this._isSeqEual(e.cardSeq, this._defaultSeq)) t = i.mergeSeqArray(this._defaultSeq, e.cardSeq);
                else {
                    t = [].concat(this._defaultSeq);
                    var r = 0,
                    n = 0;
                    a.each(t,
                    function(e, t) {
                        "relateCase" === t && (r = e),
                        "relateImg" === t && (n = e)
                    });
                    var s = l("pc_detail_slider_right_relate_case", e.fbResult),
                    c = !1;
                    0 !== r && s && 0 !== s.Items[0].TemplateId && (c = !0, t.splice(r, 1), t.splice(1, 0, "relateCase"));
                    var u = l("pc_detail_slider_right_relate_img", e.fbResult);
                    0 !== n && u && 0 !== u.Items[0].TemplateId && (c ? (t.splice(n + 1, 1), t.splice(2, 0, "relateImg")) : (t.splice(n, 1), t.splice(1, 0, "relateImg")))
                }
                if (!this._isSeqEual(t, this._currentSeq)) {
                    var d = this._cardMap;
                    a(t).each(function(e, t) {
                        var a = d[t];
                        a.$element.parent().append(a.$element)
                    }),
                    this._currentSeq = t
                }
            }
        }
    });
    var l = function(e, t) {
        if (!e || !t) return null;
        for (var a = null,
        i = 0; i < t.length; i++) t[i].Tag === e && (a = t[i]);
        return a
    };
    return t
});;
/*!searchdetail:widget/ui/featuremanager/cardlogger.js*/
define("searchdetail:widget/ui/featuremanager/cardlogger",
function(t) {
    function e(t) {
        this._cards = t,
        this._startTime = (new Date).getTime(),
        this._states = [],
        this._proCount = 0
    }
    var s = t("common:widget/ui/base/base"),
    a = t("common:widget/ui/base/events"),
    i = t("searchdetail:widget/ui/statistic/statistic-core");
    return s.extend(e.prototype, a, {
        traceBegin: function() {
            this._states.length && this._send(),
            this._startTime = (new Date).getTime()
        },
        traceEnd: function(t, e) {
            var a = this._states,
            i = this,
            o = this._startTime,
            n = [];
            this._proCount = this._cards.length,
            this.isShowEcom = e,
            s(this._cards).each(function(e, r) {
                var h = r.getState();
                if (h.visible && "rsResult" != r.opts.dataKey) a.push({
                    key: r.opts.logKey,
                    state: h.collapse ? "0": 1
                }),
                i._proCount -= 1,
                r.updateLogSeq(a.length),
                n.push(r.opts.logKey);
                else if (h.pro) {
                    var u = {
                        key: r.opts.logKey,
                        state: 2
                    };
                    a.push(u);
                    var d = a.length;
                    h.pro.done(function() {
                        o == i._startTime && (i._proCount -= 1, h = r.getState(), h.visible && (u.state = h.collapse ? "0": 1, r.updateLogSeq(d)), i._proCount || i._send())
                    }),
                    n.push(r.opts.logKey)
                } else if (i._proCount -= 1, t && t.cardTest) {
                    var c = r.opts.dataKey,
                    g = c ? t.cardTest[c] : null; ! g || s.isArray(g) && !g.length || n.push(r.opts.logKey)
                }
            }),
            i._proCount || i._send(e)
        },
        _send: function() {
            var t = this.isShowEcom;
            if (!this._states.length) return void this.fire("cardlogged", {
                keys: [],
                state: []
            });
            var e = [],
            a = [];
            if (s(this._states).each(function(t, s) {
                e.push(s.key),
                a.push(s.state)
            }), e.length) {
                var o = t ? 1 : 0;
                t && e.push("adCard"),
                a.push(o),
                i.send("5.1010000", {
                    tn: "baiduimagedetail",
                    tag: "card",
                    fm: e.join(","),
                    state: a.join(",")
                })
            }
            this.fire("cardlogged", {
                keys: e,
                state: a
            }),
            this._states = []
        }
    }),
    e
});;
/*!searchdetail:widget/ui/featuremanager/featuremanager.js*/
define("searchdetail:widget/ui/featuremanager/featuremanager",
function(a) {
    function t(a) {
        this.config = e.extend({
            afterPicInfo: "#siderAdAfterPicInfo",
            topRecom: "#header .recom",
            wikiInfoCard: "#wikiInfoCard",
            cards: "#siderCardsAfterWikiInfo",
            beforeAdCard: "#beforeAdCard",
            adCard: "#adCard",
            imagedetailCards: "#imagedetail-cardswrapper"
        },
        a),
        this.ads = [],
        this._cardLogger = null,
        this._cardSeq = null
    }
    var e = a("common:widget/ui/base/base"),
    r = a("common:widget/ui/base/events"),
    i = a("searchdetail:widget/ui/featuremanager/cardsequence"),
    s = a("searchdetail:widget/ui/featuremanager/cardlogger");
    return e.extend(t.prototype, r, {
        setAds: function(a) {
            var t = this;
            for (var r in a) if (a.hasOwnProperty(r)) if ("priority" == r) t.priority = a[r];
            else {
                var i = a[r];
                e.isArray(i) ? e(i).each(function(a, e) {
                    t.ads.push({
                        pos: r,
                        ctrl: e
                    })
                }) : this.ads.push({
                    pos: r,
                    ctrl: i
                })
            }
        },
        setLogCards: function(a) {
            this._cardLogger || a && (this._cardLogger = new s(a))
        },
        setCardSeq: function(a) {
            this._cardSeq || a && (this._cardSeq = new i(a))
        },
        init: function() {
            var a = this.config;
            for (var t in a) a.hasOwnProperty(t) && (a[t] = e(a[t]));
            e(this.ads).each(function(t, e) {
                e.ctrl.init(a[e.pos])
            })
        },
        updateEachCard: function(a, t, e) {
            if (a == this.ads.length) return ! 1;
            var r = this.priority[a],
            i = this;
            if ("cards" != this.ads[r].pos || this.ads[r].ctrl.opts.notBusinessSort) this.ads[r].ctrl.update && this.ads[r].ctrl.update(t, e),
            this.updateEachCard(a + 1, t, e);
            else if (t.hasLoadFirstCard) this.ads[r].ctrl.update && this.ads[r].ctrl.update(t, e, 1),
            this.updateEachCard(a + 1, t, e);
            else {
                this.ads[r].ctrl.update && this.ads[r].ctrl.update(t, e);
                var s = this.ads[r].ctrl.getState();
                s.visible ? (t.hasLoadFirstCard = !0, this.updateEachCard(a + 1, t, e)) : s.pro ? s.pro.done(function() {
                    s = i.ads[r].ctrl.getState(),
                    s.visible && (t.hasLoadFirstCard = !0),
                    i.updateEachCard(a + 1, t, e)
                }) : this.updateEachCard(a + 1, t, e)
            }
        },
        update: function(a, t) {
            var r = this._cardLogger;
            a.adEcommCardsIndex = 0,
            r && r.traceBegin(a),
            a.hasLoadFirstCard = !1,
            a.is_business_query ? this.updateEachCard(this.priority[0], a, t) : e(this.ads).each(function(e, r) {
                r.ctrl.update && r.ctrl.update(a, t)
            }),
            this._cardSeq && this._cardSeq.update(a, t);
            var i = "none" === e("#adCard").css("display") ? !1 : !0;
            r && r.traceEnd(a, i),
            this.fire("updated")
        },
        resetSize: function() {
            var a = e("#header").width();
            780 > a ? this.config.topRecom.hide() : this.config.topRecom.show()
        }
    }),
    t
});;
/*!searchdetail:widget/ui/app/page.js*/
define("searchdetail:widget/ui/app/page",
function(e) {
    var t = e("common:widget/ui/base/base"),
    i = e("common:widget/ui/base/events"),
    n = (e("common:widget/ui/base/EventDispatcher").eventCenter, e("searchdetail:widget/ui/app/history")),
    o = e("common:widget/ui/arch/behavior/pageresizer"),
    a = (e("common:widget/ui/arch/behavior/animation"), e("searchdetail:widget/ui/app/sizemanager")),
    r = e("common:widget/ui/arch/handlers"),
    l = e("searchdetail:widget/ui/controls/imagedetail/imagedetail"),
    d = e("searchdetail:widget/ui/controls/imgtoolbar/imgtoolbar"),
    s = e("searchdetail:widget/ui/controls/imgtoolbarnew/imgtoolbarnew"),
    g = e("searchdetail:widget/ui/controls/albumslider/sliderlist"),
    m = e("searchdetail:widget/ui/controls/dockpanel/dockpanel"),
    c = e("searchdetail:widget/ui/controls/pictureinfo/pictureinfo"),
    u = e("common:widget/ui/userInfo/userInfo"),
    h = e("searchdetail:widget/ui/collections/imgcollection"),
    p = (e("searchdetail:widget/ui/collections/albumcollection"), e("searchdetail:widget/ui/imgloader/imgloadstrategy")),
    f = e("searchdetail:widget/ui/models/imagemodel"),
    b = e("searchdetail:widget/ui/databinder/databind"),
    v = e("searchdetail:widget/ui/app/datacontroller"),
    w = e("searchdetail:widget/ui/app/priordata"),
    I = e("searchdetail:widget/ui/featuremanager/featuremanager"),
    C = e("common:widget/ui/admanager/admanager"),
    D = e("searchdetail:widget/shitutip/tip"),
    S = (e("searchdetail:widget/ui/models/settingmodel"), e("searchdetail:widget/ui/statistic/statistic-core")),
    L = e("searchdetail:widget/old/hotInfo/utils/utils"),
    k = e("common:widget/ui/utils/utils"),
    y = e("searchdetail:widget/ui/app/pagemodel"),
    P = t.extend({
        model: null,
        imgModel: f,
        imgCollection: new h,
        imgInfoObservers: [],
        history: null,
        dataController: null,
        imgLoadStratey: null,
        featureManager: null,
        controls: {
            imgDetail: null,
            toolbar: null,
            imgSlidePrevBtn: null,
            imgSlideNextBtn: null,
            container: null,
            slideDockPnl: null,
            imgSlideList: null,
            picInfo: null
        },
        handlers: new r(this),
        _isFirstImgLoaded: !1,
        _isFirstImgLoadedErr: !1,
        init: function(e) {
            this.model = e,
            this.dataController = new v(e, this.imgModel, this.imgCollection, new w(e.tempData)),
            this.imgLoadStratey = new p(this.imgCollection, f, this.model.get("pn"), this.model),
            this.imgLoadStratey.addEventListener("bigimgloaded", this.onBigImageLoaded.bind(this)),
            this.imgLoadStratey.addEventListener("bigimgloadedErr", this.onBigImageLoadedErr.bind(this)),
            this.featureManager = new I,
            this.initData(),
            this.history = new n(this.model),
            this.history.init(),
            o.init({
                tick: 20
            }),
            t(window).on("load", this.onPageLoaded.bind(this)).on("unload", this.handlers.get("onPageUnLoadedHandler")),
            o.addEventListener("resizeEnd", this.handlers.get("onPageResizeHandler")),
            this.history.addEventListener("popstate", this.handlers.get("onHistoryChangedHandler")),
            this.createControls()
        },
        initData: function() {
            var e = this.model.tempData.get("imgInfo");
            e && this.imgLoadStratey.immediateLoad(this.imgCollection.mapField(e))
        },
        createControls: function() {
            var e = this.model.tempData.get("imgInfo"),
            i = this.controls,
            n = e && e.imgData && "1" === e.imgData.youtuType;
            if (i.imgDetail = new l(".img-container", {
                pageModel: this.model
            }), i.imgDetail.dutuAnchor.setQuery(this.model.get("word")), "downloadoptimize" == this.model.getAbTestGroup()) D.init(),
            t(".btn-toPhone").find("i").addClass("downloadicon"),
            i.toolbar = new s("#toolbar", {
                wallpaperBtn: ".btn-wallpaper",
                zoomIn: "#btnZoomIn",
                zoomOut: "#btnZoomOut",
                zoomScale: "#zoomScale",
                zoomToggle: ".btn-imgtoggle",
                downloadLink: ".btn-toPhone",
                toPhoneBtn: ".btn-toPhone",
                favoBtn: ".btn-favo",
                fullScreenBtn: ".btn-fullscr",
                dutuSwitcher: ".btn-closedutu",
                reportLink: ".reportlink"
            },
            {
                img: "#srcPic img",
                imgPnl: "#srcPic"
            });
            else {
                D.init(),
                t(".btn-toPhone").remove();
                var o = '<span class="bar-btn btn-download' + (n ? " bar-btn-disabled": "") + '" href="#" title="保存原图到电脑" hidefocus="true"><span class="b-before"></span>下载<i></i></span>';
                if (window.samplekey.match("UI_PC_DETAIL_DOWNLOAD:1")) {
                    t(".btn-fullscr").after(o);
                    var a = '<span class="bar-btn btn-toPhone" log-click="p=5.50" href="javascript:void(0);" title="保存原图到手机" hidefocus="true"><span class="b-before"></span><i></i></span>';
                    t(".reportlink").after(a)
                } else {
                    t(".btn-favo").after(o);
                    var a = '<span class="bar-btn btn-toPhone" log-click="p=5.50" href="javascript:void(0);" title="保存原图到手机" hidefocus="true"><span class="b-before"></span>扫描到手机<i></i></span>';
                    t(".btn-fullscr").after(a)
                }
                i.toolbar = new d("#toolbar", {
                    wallpaperBtn: ".btn-wallpaper",
                    zoomIn: "#btnZoomIn",
                    zoomOut: "#btnZoomOut",
                    zoomScale: "#zoomScale",
                    zoomToggle: ".btn-imgtoggle",
                    downloadLink: ".btn-download",
                    toPhoneBtn: ".btn-toPhone",
                    favoBtn: ".btn-favo",
                    fullScreenBtn: ".btn-fullscr",
                    dutuSwitcher: ".btn-closedutu",
                    reportLink: ".reportlink"
                },
                {
                    img: "#srcPic img",
                    imgPnl: "#srcPic"
                })
            }
            var r = t("#container");
            i.container = r,
            i.imgSlidePrevBtn = r.find(".img-prev"),
            i.imgSlideNextBtn = r.find(".img-next");
            var h = parseInt(t.cookie("BDIMGISLOGIN"), 10),
            p = 6e3; (1 === h || n) && (p = 0),
            i.slideDockPnl = new m("#toolbar .btn-handler", ".album-container", {
                autoDockInterval: p
            }),
            i.imgSlideList = new g({
                pnl: ".album-container",
                content: ".album-imgs",
                list: ".album-imgs>ul",
                prevBtn: ".slider-btn-prev",
                nextBtn: ".slider-btn-next"
            },
            {
                hasTail: !0,
                enableWheel: !0,
                width: 70,
                marginRight: 10
            },
            this.imgCollection, {
                spn: this.model.get("spn") || 0
            }),
            i.picInfo = new c("#picInfoPnl"),
            i.userInfoBox = new u
        },
        run: function() {
            var e = this;
            this.initControls(),
            e.bindModel();
            var t = e.dataController.priorDataProc.getData(),
            i = e.model.get("pn"),
            n = 0 > i ? e.imgCollection.mapField(t[t.length + i]) : e.dataController.getInitImgData();
            this._detectPicReplace() && (n.bigImgUrl = n.objURL),
            n && this.controls.imgDetail.updateData(n),
            e.bindEvent(),
            alog && alog("speed.set", "c_asynACStart", +new Date),
            alog.fire && alog.fire("mark"),
            this.dataController.initialData(this.controls.imgSlideList.getMinLoadedCount()).done(function(t) {
                alog && alog("speed.set", "c_asynACEnd", +new Date),
                alog.fire && alog.fire("mark"),
                e.renderFirstImg(),
                e.initSlideListData(t.offset, t.dataSet).then(function() {
                    e.controls.imgSlideList.addEventListener("selectedChange", e.handlers.get("onSlideImgSelected")),
                    e.dataController.freshImgModel()
                })
            }).fail(function() {
                e.controls.slideDockPnl.hidePanel(),
                e.initSlideListData(1, [n]),
                e.controls.imgSlideList.addEventListener("selectedChange", e.handlers.get("onSlideImgSelected")),
                e.dataController.switchImage(n, null)
            }),
            o.start()
        },
        initControls: function() {
            var e = this;
            this.sizeManager = a,
            a.init(),
            a.update(),
            this.featureManager.init();
            var i = this.controls;
            i.imgDetail.init(),
            i.userInfoBox.init(function(t) {
                var i = t.data.user;
                y.set({
                    userName: i.user_name
                }),
                y.set({
                    bdstoken: i.bdstoken
                }),
                e.imgModel.set("userName", i.user_name)
            }),
            i.toolbar.init();
            this.model.get("userInfo");
            i.slideDockPnl.init(),
            i.imgSlideList.init(),
            window.samplekey.match("UI_PC_DETAIL_DOWNLOAD:1") ? (t(".pic-info").css({
                padding: 0,
                border: "none"
            }), t(".card-box").css({
                "margin-top": 0
            }), t(".ad-card").css({
                "margin-top": "5px"
            })) : i.picInfo.init(),
            a.update()
        },
        bindModel: function() {
            {
                var e = this.controls,
                t = this.imgModel;
                this.pageModel
            }
            b.bind(t, "userName", e.toolbar.favoViewCtrl, "userNameChanged"),
            b.bind(t, "imgData", this, "onImgDataChanged"),
            b.bind(t, "imgData", S, "update"),
            b.bind(t, "bigImgUrl", e.imgDetail, "update"),
            b.bind(t, "imgData", e.imgDetail, "update"),
            b.bind(t, "scale", e.imgDetail, "zoomChange"),
            b.bind(t, "imgData", e.imgSlideList, "update"),
            "new_dep_tpl" == this.model.get("investTpl") ? (b.bind(t, "imgData", this, "getImageDeepInfo"), b.bind(t, "imgDeepData", this.featureManager, "update"), window.samplekey.match("UI_PC_DETAIL_DOWNLOAD:1") || b.bind(t, "imgDeepData", e.picInfo, "update"), "downloadoptimize" == this.model.getAbTestGroup() ? e.toolbar.bindModel(t, this.imgCollection, !0) : e.toolbar.bindModel(t, this.imgCollection), b.bind(t, "imgDeepData", e.imgDetail, "update_dutuAnchor"), b.bind(t, "imgDeepData", this, "imgSwitched")) : (window.samplekey.match("UI_PC_DETAIL_DOWNLOAD:1") || b.bind(t, "imgData", e.picInfo, "update"), e.toolbar.bindModel(t, this.imgCollection), b.bind(t, "imgData", this.featureManager, "update"), b.bind(t, "imgData", this, "imgSwitched")),
            b.bind(this.imgModel, "imgData", C, "update"),
            b.bind(this.imgModel, "scale", C, "update"),
            this.imgLoadStratey.start()
        },
        bindEvent: function() {
            var e = this.controls,
            i = e.toolbar,
            n = this.handlers,
            o = this;
            this.sizeManager.addObserver(e.imgDetail, "resetSize").addObserver(e.imgSlideList, "resetSize").addObserver(i, "resetSize").addObserver(this.featureManager, "resetSize").addObserver(C, "resetsize").notify(),
            e.imgDetail.on("scaleChanged", n.get("onImageScaleChanged")),
            e.imgDetail.on("wheelPrev", n.get("onImageWheelPrev")),
            e.imgDetail.on("wheelNext", n.get("onImageWheelNext")),
            e.imgDetail.on("linkout", n.get("onImageLinkOut")),
            e.imgDetail.dutuAnchor.on("hover", n.get("onDutuAnchorOver")),
            e.imgDetail.dutuAnchor.on("hout", n.get("onDutuAnchorOut")),
            e.WikiInfoFaceControl.on("hover", n.get("onWikiinfoOver")),
            e.WikiInfoFaceControl.on("hout", n.get("onWikiinfoOut")),
            e.carCtrl.on("hover", n.get("onCarOver")),
            e.carCtrl.on("hout", n.get("onCarOut")),
            e.carCtrlNoResult.on("hover", n.get("onCarNoresultOver")),
            e.carCtrlNoResult.on("hout", n.get("onCarNoresultOut")),
            e.clothCtrl.on("hover", n.get("onClothOver")),
            e.clothCtrl.on("hout", n.get("onClothOut")),
            e.imgSlidePrevBtn.on("click",
            function(t) {
                e.container.find(".img-container>.img-wrapper").hasClass("leftArrow") && (e.container.addClass("left leftTwinkle"), setTimeout(function() {
                    e.container.removeClass("leftTwinkle")
                },
                500)),
                n.get("onImgSlidePrevBtnClicked")(t)
            }),
            e.imgSlideNextBtn.on("click",
            function(t) {
                e.container.find(".img-container>.img-wrapper").hasClass("rightArrow") && (e.container.addClass("right rightTwinkle"), setTimeout(function() {
                    e.container.removeClass("rightTwinkle")
                },
                500)),
                n.get("onImgSlideNextBtnClicked")(t)
            }),
            "prevnextarrow" == this.model.getAbTestGroup() && (e.imgSlidePrevBtn.attr("title", "点击上翻"), e.imgSlideNextBtn.attr("title", "点击下翻"), e.imgSlidePrevBtn.on("mouseover",
            function() {
                e.container.removeClass("right").addClass("left")
            }), e.imgSlideNextBtn.on("mouseover",
            function() {
                e.container.removeClass("left").addClass("right")
            }), e.imgSlidePrevBtn.on("mouseout",
            function() {
                e.container.removeClass("left")
            }), e.imgSlideNextBtn.on("mouseout",
            function() {
                e.container.removeClass("right")
            }), e.container.find(".img-container>.img-wrapper").on("click",
            function(i) {
                if (!t(this).hasClass("dragging")) {
                    var o = (e.imgDetail, i || window.event);
                    t(this).hasClass("leftArrow") ? (e.container.addClass("left leftTwinkle"), setTimeout(function() {
                        e.container.removeClass("leftTwinkle")
                    },
                    500), n.get("onImgSlidePrevBtnClicked")(o)) : (e.container.addClass("right rightTwinkle"), setTimeout(function() {
                        e.container.removeClass("rightTwinkle")
                    },
                    500), n.get("onImgSlideNextBtnClicked")(o))
                }
            })),
            t(document.body).on("mousemove", n.get("onPageMouseMove")),
            e.slideDockPnl.on("stateChanged", n.get("onSlideDockPanelStateChanged")),
            i.fullScreenCtrl && (i.fullScreenCtrl.on("enterFullScreen", n.get("onEnterFullScreen")), i.fullScreenCtrl.on("escFullScreen", n.get("onEscFullScreen")), i.fullScreenCtrl.on("selectedChange", n.get("onSlideImgSelected"))),
            i.zoomViewCtrl.on("viewModeChanged", n.get("onViewModeChanged")),
            i.elements.downloadLink.on("click", n.get("onDownloadClick")),
            e.toolbar.elements.dutuSwitcher.on("mouseover", n.get("onDutuSwitcherOver")).on("mouseout", n.get("onDutuSwitcherOut")),
            this.bindKeyEvent();
            var a = "";
            t("#sider").on("scroll",
            function() {
                var e = o.imgModel.getKey(),
                i = t("#sider"),
                n = i.length ? i[0].scrollTop: 0;
                e && n > 0 && e != a && (S.send("5.1010200", {
                    tn: "baiduimagedetail"
                }), a = e)
            }),
            window.speed && speed.mark("app_ready")
        },
        bindKeyEvent: function() {
            var e = function(e) {
                e = e || window.event;
                var t;
                return t = e.srcElement ? e.srcElement: e.target,
                "INPUT" == t.nodeName.toUpperCase() ? !0 : !1
            },
            i = 0,
            n = 0,
            o = t(document),
            a = this;
            o.on("keydown.ui-page",
            function(t) {
                return e(t) ? !0 : void(n || (n = setInterval(function() {
                    i++,
                    a.handlers.get("onKeyPressHandler").call(a, t)
                },
                800)))
            }),
            o.on("keyup.ui-page",
            function(t) {
                return e(t) ? !0 : (0 == i && a.handlers.get("onKeyPressHandler").call(a, t), clearInterval(n), n = 0, void(i = 0))
            })
        },
        offKeyEvent: function() {
            var e = t(document);
            e.off("keydown.ui-page"),
            e.off("keyup.ui-page")
        },
        initSlideListData: function(e, i) {
            var n = this.model.get("pn"),
            o = this.model.get("spn"),
            a = this.controls.imgSlideList,
            r = new t.Deferred;
            return a.setTotal(this.imgCollection.getTotal() || 2),
            a.insertItems(e, i),
            this.imgCollection.getSubImg(n, o).then(function(e) {
                a.selectItem(e.imgData && e.imgData.offset || i[0] && i[0].pn).then(function() {
                    a.unlockItems(),
                    r.resolve()
                })
            }),
            r
        },
        renderFirstImg: function() {
            var e = this.model.get("pn"),
            t = this.model.get("spn");
            if (!t || "0" == t) {
                var i = this;
                this.imgCollection.getByIndex(e, 1).then(function(e) {
                    if (e && e.length) {
                        var t = e[0];
                        i._detectPicReplace() && (t.bigImgUrl = t.objURL),
                        i.controls.imgDetail.updateData(t)
                    }
                })
            }
        },
        loadErrorLog: function(e) {
            var t = new Image;
            t.src = "//imgstat.baidu.com/6.gif?" + L.json2Query(e) + "&_=" + +new Date
        },
        onBigImageLoaded: function(e) {
            var i = e.loadInfo,
            n = e.imgData;
            if (n.loadState = 1, n.loadTime = i.loadTime, this.fire("firstimgloaded"), this.imgModel.getKey() == n.key) {
                if (!this._isFirstImgLoaded) {
                    this._isFirstImgLoaded = !0;
                    var o = n.loadState,
                    a = n.objURL,
                    r = i.loadTime,
                    l = n.fromURL;
                    if (o = -1 == o ? -1 : r, "undefined" == typeof o) {
                        var d = "//imgstat.baidu.com/6.gif?u=" + encodeURIComponent(a) + "&ue=" + encodeURIComponent(a) + "&f=" + encodeURIComponent(l) + "&tm=" + o + "&_dev=pc&hostfr=imgstat&tn=1&fr=" + this.model.get("fr"),
                        s = new Image;
                        s.src = d + "&" + (new Date).getTime()
                    }
                    try {
                        var g = L.query2JSON((location.search || "").replace("?", ""));
                        if ( + g.hs && "baiduimage" === g.tn && "ala" === g.fr) {
                            var m = (L.getHost(document.referrer) || "").replace(/^.*\//, "");
                            m.match(/^(|www\.baidu\.com)$/) && ((new Image).src = "//image.baidu.com/pv/pv.gif?" + L.json2Query({
                                dsp: "pc",
                                hs: g.hs,
                                tn: "detail",
                                type: "firstsc"
                            }).replace(/^&/, ""))
                        }
                    } catch(c) {}
                }
                var u = !1,
                h = t("#hdFirstImgObj");
                220 === h.width() && 159 === h.height() && (u = !0),
                "1" !== t(".currentImg").attr("data-ispreload") || u ? this.imgModel.set("bigImgUrl", n.bigImgUrl) : (this.imgModel.set("bigImgUrl", t("#hdFirstImgObj").attr("src")), t(".currentImg").attr("data-ispreload", "0"))
            }
        },
        onBigImageLoadedErr: function(e) {
            var t = e.loadInfo,
            i = e.imgData,
            n = 0,
            o = i.replaceUrl,
            a = new Image,
            r = this;
            i.loadState = -1,
            i.loadTime = t.loadTime || -1,
            this.imgModel.getKey() === i.key &&
            function l() {
                if (o && n < o.length) {
                    r.loadErrorLog({
                        pcError: "objurl",
                        pcObjurl: encodeURIComponent(i.objURL),
                        pcLoadState: n,
                        pcHaveReplaceUrl: 1
                    });
                    var e = k.httpsTimg({
                        imgUrl: o[n].ObjURL
                    });
                    a.onload = function() {
                        if (r.imgModel.getKey() === i.key) {
                            if (4 === this.width && 8 === this.height) return n++,
                            void l();
                            i.objURL = e,
                            i.width = a.width,
                            i.height = a.height,
                            r.imgModel.set("imgDeepData", i, !0)
                        }
                    },
                    a.onerror = function() {
                        r.imgModel.getKey() === i.key && (n++, l())
                    },
                    a.src = e
                } else r.loadErrorLog({
                    pcError: "objurl",
                    pcObjurl: encodeURIComponent(i.objURL),
                    pcLoadState: n,
                    pcHaveReplaceUrl: 0
                }),
                i.objURLBackup || (i.objURLBackup = i.objURL, i.objURL = i.thumbURL)
            } ()
        },
        onPageLoaded: function() {
            this.fire("loaded")
        },
        getImageDeepInfo: function(e, t) {
            var i = t.getPropCollection("imageDeepInfo");
            i.getByKey(t.getKey(), t.data.rootImg && t.data.rootImg.key, !1).done(function(n) {
                var o, a;
                if (n && n.cards && n.key == t.getKey()) {
                    o = i.imgCollection.mapField(n.cards),
                    a = i.imgCollection.mapField({}),
                    o.key = n.key;
                    for (var r in o) o.hasOwnProperty(r) && o[r] && o[r] !== a[r] && (e[r] = o[r]);
                    e.is_business_query = n.is_business_query || 0
                }
                t.set("imgDeepData", e, 1)
            })
        },
        imgSwitched: function(e) {
            t("#sider")[0].scrollTop = 0,
            this.fire("imageSwitched", {
                imgData: e
            })
        },
        initAds: function(e) {
            C.init(this.model),
            C.initAds(e),
            this.imgCollection.on("afterFetch",
            function(e) {
                C.receive(e.param.pn, e.responseData.dataSet)
            })
        },
        onImgDataChanged: function(e, i) {
            var n = this.model.get("firstPic");
            n ? this.model.set("firstPic", 0) : 0 !== n && this.model.set("firstPic", 1);
            var o = !1;
            if ("65" === e.adType && "" !== e.fromPageTitleEnc) try {
                o = JSON.parse(e.fromPageTitleEnc)
            } catch(a) {}
            o && "" !== o.desc ? (t(".currentImg-adtext").addClass("currentImg-adtext-p"), t(".currentImg-adtext p").html(o.desc), t(".currentImg").hover(function() {
                t(".currentImg-adtext").show(),
                S.send("10.1010100", {
                    as: o.brand_name,
                    pos: "pc_detail_hover",
                    subpos: "0",
                    shownum: "1",
                    matcont: o.desc,
                    materialNum: "1"
                })
            },
            function() {
                t(".currentImg-adtext").hide()
            })) : (t(".currentImg-adtext").removeClass("currentImg-adtext-p"), t(".currentImg-adtext p").html(""), t(".currentImg").unbind("hover")),
            this._updateTextLinkAd(i),
            this._hasReqSimi = !1,
            1 !== this.model.get("fullScreen") && e.objURLBackup && e.objURLBackup !== e.objURL && (e.objURL = e.objURLBackup, e.objURLBackup = null);
            var r, l, d = "";
            if ("3" === e.adType) {
                if (this.model && this.model.tempData) {
                    r = this.model.tempData,
                    l = r.get("nsAdIIData");
                    for (var s = 0; l && s < l.length; s++) if ("pc_detail_slider_right_relate_img" === l[s].Tag && l[s].Items.length) {
                        var g = l[s].Items;
                        g && g.length && (d = l[s].Items[0].BrandName)
                    }
                }
                S.send("10.1010100", {
                    as: d,
                    pos: "pc_detail_before_insert",
                    subpos: "0",
                    shownum: "1",
                    matcont: e && e.bigImgUrl,
                    materialNum: "1"
                })
            }
        },
        _updateTextLinkAd: function(e) {
            var t = this.controls.imgDetail.textLinkAd;
            t.update(e)
        },
        _detectPicReplace: function() {
            var e = t("#hdFirstImgObj");
            return "result" === this.model.get("pageSrc") && e.length && "1" === e.attr("data-replace")
        }
    },
    i);
    return P
});;
/*!searchdetail:widget/ui/specialrecord/specialrecord.js*/
define("searchdetail:widget/ui/specialrecord/specialrecord",
function(e, i, n) {
    var t, o = e("common:widget/ui/base/base"),
    a = e("searchdetail:widget/ui/statistic/statistic-core"),
    c = "postMessage" in window,
    s = "__ilike_picture_icon",
    d = "__ilike_page_icon",
    r = (o.browser.msie, "-1,,,"),
    u = (escape(r), window.name),
    m = function(e) {
        a.send("5.361", {
            type: e
        })
    },
    w = function(e) {
        e && e.data === r && m("msg")
    },
    g = function() {
        var e = window.name,
        i = (document.domain, /woxihuan/gi);
        e !== u && i.test(e) && (u = e, m("nameck"))
    };
    n.exports.init = function() {
        var e = o(window);
        e.on("load",
        function() {
            navigator.userAgent.match(/Chrome\//) ? o(document.body).on("mousedown",
            function(e) {
                var i = e.target; (i.id === s || i.id === d) && m("click")
            }) : c ? e.on("message", w) : t = setInterval(g, 500)
        })
    }
});;
/*!searchdetail:widget/ui/statistic/statistic.js*/
define("searchdetail:widget/ui/statistic/statistic",
function(t) {
    var e = t("common:widget/ui/base/base"),
    i = t("searchdetail:widget/ui/statistic/statistic-core"),
    a = t("common:widget/ui/utils/utils"),
    o = {
        timestamp: 0,
        dom: null
    };
    e(document).unbind().on("mousedown", "a,.album-imgs,#srcPic img,#toolbar [log-click]",
    function(t) {
        if (t.type = 1 == t.which ? "click": t.type, t.type = 3 == t.which ? "rightclick": t.type, "mouseover" == t.type) return o.timestamp = t.timeStamp,
        void(o.dom = t.srcElement || t.target);
        if ("mouseleave" != t.type || t.srcElement != o.dom && t.target != o.dom || !(t.timeStamp - o.timestamp < 5e3)) {
            for (var e = t.srcElement || t.target,
            m = !1; e.parentNode != document.body && !m;) {
                for (var r = 0; r < e.attributes.length; r++) {
                    var s = t.type;
                    if (e.attributes["log-" + s]) {
                        m = !0;
                        break
                    }
                }
                m || (e = e.parentNode)
            }
            if (e.attributes["log-" + t.type]) {
                var c = e.attributes["log-" + t.type].value,
                n = a.queryToJson(c),
                l = n.p,
                u = n || {}; ! u.clivt && i.imgViewStart > 0 && (u.clivt = (new Date).getTime() - i.imgViewStart),
                i.send(l, u)
            }
        }
    })
});;
/*!searchdetail:widget/ui/app/app.js*/
define("searchdetail:widget/ui/app/app",
function(t) {
    var e = t("common:widget/ui/base/base"),
    i = t("common:widget/ui/utils/utils"),
    a = t("common:widget/ui/arch/app"),
    c = t("searchdetail:widget/ui/app/pagemodel"),
    o = (t("searchdetail:widget/ui/app/page"), t("searchdetail:widget/ui/utils/lib"), t("searchdetail:widget/ui/specialrecord/specialrecord")),
    r = t("searchdetail:widget/ui/statistic/statistic-core"),
    n = new a(c);
    return e.extend(n, {
        logicBeginTime: (new Date).getTime(),
        setPageInfo: function(t) {
            t && (t.word && (t.word = t.word.replace(/\\'/g, "'").replace(/\\"/g, '"'), t.word = i.tryDecodeURIComponent(t.word)), c.set(t)),
            c.setAbTest()
        },
        init: function() {
            this.logicBeginTime = (new Date).getTime(),
            alog && alog("speed.set", "c_djsStart", +new Date),
            alog.fire && alog.fire("mark"),
            r.init(this.pageModel),
            t("searchdetail:widget/ui/statistic/statistic"),
            a.prototype.init.call(this);
            var e = function() {
                return [{
                    rule: {
                        tpl: "avatarbeautyset"
                    },
                    action: "searchdetail:widget/ui/action/avatarbeautyset/action.js"
                },
                {
                    rule: {
                        tpl: "rightrecommend"
                    },
                    action: "searchdetail:widget/ui/action/rightrecommend/action.js"
                },
                {
                    rule: {
                        tpl: "btea"
                    },
                    action: "searchdetail:widget/ui/action/btea/action.js"
                },
                {
                    rule: {
                        tpl: "ecomad"
                    },
                    action: "searchdetail:widget/ui/action/ecomad/action.js"
                },
                {
                    rule: {
                        tpl: "avatar"
                    },
                    action: "searchdetail:widget/ui/action/avatar/action.js"
                },
                {
                    rule: {
                        tpl: "dutu"
                    },
                    action: "searchdetail:widget/ui/action/dutu/action.js"
                },
                {
                    rule: {},
                    action: "searchdetail:widget/ui/action/base/base.js"
                }]
            } ();
            this.router.addRules(e)
        },
        setData: function(t, e) {
            this.pageModel.tempData.set(t, e)
        },
        run: function() {
            a.prototype.run.apply(this, arguments),
            o.init()
        }
    }),
    n
});;
/*!searchdetail:widget/ui/collections/imgpropertycollection.js*/
define("searchdetail:widget/ui/collections/imgpropertycollection",
function(t) {
    function e(t, e) {
        this.opts = s.extend({
            key: "",
            url: "",
            jsonpCb: "cb",
            buildQuery: function() {
                return {}
            }
        },
        t),
        this.imgCollection = e,
        this.imgData = null,
        this.hasMore = !0,
        this._reqPool = {}
    }
    function a(t, a) {
        this.imgCollection = t;
        var s = new e(a, t);
        r.call(this, s),
        this.configCache({
            primaryKey: "key"
        })
    }
    var s = t("common:widget/ui/base/base"),
    r = t("common:widget/ui/arch/collection"),
    o = t("searchdetail:widget/ui/utils/lib"),
    i = t("common:widget/ui/utils/utils");
    return s.extend(e.prototype, {
        setImgData: function(t) {
            this.imgData = t
        },
        fetch: function(t, e, a, r) {
            var n = this.opts.buildQuery && this.opts.buildQuery(this.imgData),
            l = s.extend({},
            n, this.reqParams),
            d = this.imgData.key,
            p = this;
            if (this.opts.reqParams && (l = this.reqParams = s.extend({},
            this.opts.reqParams, n, this.reqParams), l = this.parseReqParam(t, e, a, r)), !this.opts.url || !this.hasMore || s.isEmptyObject(l)) {
                var u = new s.Deferred;
                return u.resolve({
                    offset: e
                }),
                u
            }
            var h = this._reqPool[d];
            if (h) return h;
            var c;
            if (o.isCrossDomain(this.opts.url)) {
                var f = this.opts.url;
                f += (f.indexOf("?") > 0 ? "&": "?") + this.opts.jsonpCb + "=?",
                c = +new Date,
                h = s.getJSON(f, l)
            } else if ("post" == this.opts.type) {
                var m = this.opts.buildPostData(this.imgData);
                if (!m.keyword) {
                    var u = new s.Deferred;
                    return u.resolve({
                        offset: e
                    }),
                    u
                }
                c = +new Date,
                h = s.post(this.opts.url + "?" + i.jsonToQuery(l), m, null, "text")
            } else c = +new Date,
            h = s.get(this.opts.url, l, null, "text");
            return h = h.then(function(t) {
                var e = p.parseResponse(t, d);
                return p.hasMore = !0,
                e.dataSet.length && delete p._reqPool[d],
                e
            }),
            this._reqPool[d] = h,
            h
        },
        parseResponse: function(t, e) {
            t = o.parseResponse(t),
            this.opts.parseResponse && (t = this.opts.parseResponse(t));
            var a = [];
            return t && (t.key = e, a.push(t)),
            {
                offset: !1,
                total: 1,
                dataSet: a
            }
        },
        parseReqParam: function(t, e, a) {
            var r = s.extend({
                tn: "resultjson_com"
            },
            this.reqParams, t);
            return e = e || 0,
            r.pn = 30 * Math.floor(e / 30),
            r.rn = Math.max(30 * Math.ceil((a + e - r.pn) / 30), 30),
            r.pn <= this.requestedMinOffset && r.pn + r.rn > this.requestedMinOffset && (r.pn = r.pn - (r.pn + r.rn - this.requestedMinOffset), r.pn < 0 && (r.pn = 0, r.rn = this.requestedMinOffset)),
            r
        }
    }),
    s.extend(a.prototype, r.prototype, {
        setReqParams: function(t) {
            this.dataProxy.reqParams = t
        },
        getByKey: function(t, e, a) {
            var i = new s.Deferred,
            n = this,
            l = n.dataProxy && n.dataProxy.opts && n.dataProxy.opts.pageModel,
            d = n.dataProxy && n.dataProxy.opts && n.dataProxy.opts.key;
            if (d && "asyncCard" == d && l && l.get("isNeedAsyncRequest")) {
                var p = {};
                p.asyncCard = ["srv_beautyphoto"],
                p.srv_beautyphoto = {
                    query: l.get("word"),
                    tn: "exchangedata"
                },
                n.dataProxy.setImgData(p),
                n.dataProxy.fetch().then(function(t) {
                    i.resolve(t && t.dataSet && t.dataSet.length && t.dataSet[0])
                })
            } else {
                var u = e && this.imgCollection.imgSetCollections[e] || this.imgCollection;
                u.getByKey(t).then(function(e) {
                    e ? (n.dataProxy.setImgData(e), r.prototype.get.call(n, {
                        key: t
                    }).then(function(t) {
                        if ("serviceCard" == d && e.srv_auto && n.dataProxy.opts.serviceConf && !t[0].auto && a) {
                            n.requesting = !0;
                            var r = s.extend({},
                            n.dataProxy.opts.serviceConf[0].getParams(), {
                                word: e.srv_auto.name,
                                pn: 0,
                                rn: 3
                            });
                            s.get("/search/acjson", r,
                            function(a) {
                                var a = s.parseJSON(a);
                                if (a.data.length > 0) {
                                    var l, d = 0,
                                    p = a.data.length,
                                    u = [],
                                    h = o.uncompileURL(a.data[d].fromURL);
                                    for (h.match(/^https?:\/\//i) || (h = "http://" + h), d; p > d; d++) {
                                        var l = "/search/detail?ct=503316480&z=" + r.z + "&tn=baiduimagedetail&ipn=d&word=" + r.word + "&step_word=" + (r.step_word || "") + "&ie=" + r.ie + "&in=" + a.data[d].currentIndex + "&cl=" + r.cl + "&lm=" + r.lm + "&st=" + r.st + "&cs=" + a.data[d].cs + "&os=" + a.data[d].os + "&pn=" + d + "&rn=1&di=" + a.data[d].di + "&ln=" + r.listNum + "&fr=" + (r.fr || "") + "&fmq=&ic=" + r.ic + "&s=" + r.s + "&se=" + r.se + "&sme=" + r.sme + "&tab=" + (a.data[d].tab || 0) + "&width=&height=&face=" + a.data[d].face + "&is=" + a.data[d].is + "&istype=" + (a.data[d].istype || 0) + "&ist=" + a.data[d].source_type + "&jit=" + r.jit + "&objurl=" + encodeURIComponent(o.uncompileURL(a.data[d].objURL)) + "&bdtype=" + a.data[d].bdSrcType,
                                        c = {
                                            picUrl: a.data[d].thumbURL,
                                            linkUrl: l
                                        };
                                        u.push(c)
                                    }
                                }
                                var f = {
                                    name: e.srv_auto.name,
                                    picList: u
                                };
                                n.autoNoResult = t[0].autoNoResult = f,
                                n.requesting = !1,
                                i.resolve(t && t.length && t[0])
                            })
                        } else i.resolve(t && t.length && t[0])
                    })) : i.resolve(null)
                })
            }
            return i
        }
    }),
    a
});;
/*!searchdetail:widget/ui/controls/card/adcard/adcard.js*/
define("searchdetail:widget/ui/controls/card/adcard/adcard",
function(e) {
    function t(e, t) {
        t = i.extend({
            tpl: ""
        },
        t),
        s.call(this, e, t),
        this._timer = !1,
        this._maxCheckTimes = 10,
        this._checkedTimes = 0,
        this._timerInterval = 200,
        this.haveUpdate = !1
    }
    var i = e("common:widget/ui/base/base"),
    s = (e("common:widget/ui/utils/utils"), e("common:widget/ui/base/events"), e("searchdetail:widget/ui/utils/lib"), e("searchdetail:widget/ui/controls/card/base/base")),
    r = e("searchdetail:widget/ecomads/layer/layer");
    return i.extend(t.prototype, s.prototype, {
        update: function(e, t) {
            s.prototype.update.call(this, e, t),
            this.haveUpdate || (i(".card-box .card-title .tips").css(window.samplekey.match("UI_PC_TUIGUANG:2") || window.samplekey.match("UI_PC_TUIGUANG:1") ? {
                color: "#666"
            }: {
                color: "#2da0fd",
                border: "1px solid #b5d7f3",
                "border-radius": "2px"
            }), window.samplekey.match("UI_PC_TUIGUANG:1") && (i("#similarpicCard") ? i("#sider #adCard").remove().clone(!0, !0).insertAfter("#similarpicCard") : i("#sider #adCard").remove().clone(!0, !0).prependTo("#siderCardsAfterWikiInfo")), this.haveUpdate = !0),
            this.checkUser(t);
            var r = this;
            this._timer || (this._timer = setTimeout(function() {
                r._timer = !1,
                r._startTimer(),
                r.checkContent()
            },
            50))
        },
        _startTimer: function() {
            if (this._checkedTimes < this._maxCheckTimes) {
                var e = this;
                this._timer = setTimeout(function() {
                    e._checkedTimes += 1,
                    e._timer = !1,
                    e.checkContent() || e._startTimer()
                },
                this._timerInterval)
            }
        },
        checkUser: function(e) {
            var t = !!e.get("userName");
            r.init(t)
        },
        checkContent: function() {
            var e = this.elements.content.get(0);
            if (!e) return ! 0;
            var t = this.elements.content.get(0).offsetHeight < 50;
            return this.$element.css("visibility", t ? "hidden": "visible"),
            this.$element.css("margin-bottom", t ? "0": "15px"),
            this.$element.css("height", t ? "0": "auto"),
            !t
        }
    }),
    t
});;
/*!searchdetail:widget/ui/controls/card/appbeauty/appbeauty.js*/
define("searchdetail:widget/ui/controls/card/appbeauty/appbeauty",
function(t) {
    function a(t, a) {
        a = i.extend({
            tpl: ['<div class="card-box appbeauty-card">', '<h5 class="card-title"><i class="sticker"></i><span class="text">百度图片APP</span><i class="close"></i></h5>', '<div class="card-content appbeauty-card-content">', '<div class="appbeauty-qrbox"><img src="//img0.bdstatic.com/img/image/ugcqr.png"></div>', "</div>", "</div>"].join("")
        },
        a),
        e.call(this, t, a)
    }
    var i = t("common:widget/ui/base/base"),
    e = (t("common:widget/ui/utils/utils"), t("common:widget/ui/base/events"), t("searchdetail:widget/ui/utils/lib"), t("searchdetail:widget/ui/controls/card/base/base"));
    return i.extend(a.prototype, e.prototype, {
        updateView: function() {
            i(".appbeauty-card-content").css({
                cursor: "pointer"
            }).click(function(t) {
                t.stopImmediatePropagation(),
                window.open("http://image.baidu.com/app/tupian")
            })
        }
    }),
    a
});;
/*!searchdetail:widget/ui/controls/card/base/asyncard.js*/
define("searchdetail:widget/ui/controls/card/base/asyncard",
function(e) {
    function t(e, t) {
        r.call(this, e, t),
        this.propData = null
    }
    var o = e("common:widget/ui/base/base"),
    r = (e("common:widget/ui/utils/utils"), e("common:widget/ui/base/events"), e("searchdetail:widget/ui/utils/lib"), e("searchdetail:widget/ui/controls/card/base/base"));
    return o.extend(t.prototype, r.prototype, {
        checkProp: function(e) {
            return ! (!e || o.isArray(e) && !e.length)
        },
        updateView: function(e, t) {
            var r = t.getPropCollection(this.opts.mergeKey || this.opts.propKey || this.opts.dataKey),
            a = !1;
            if (this.curState.pro = null, r) {
                var n = this,
                i = this.opts.mergeKey,
                s = t.getKey();
                n.resetContent(),
                this.curState.pro = new o.Deferred,
                alog && alog("speed.set", "c_asyncardStart", +new Date),
                alog.fire && alog.fire("mark");
                var c = (new Date).getTime();
                r.getByKey(t.getKey(), t.data.rootImg && t.data.rootImg.key, "auto" == e.service_type).done(function(o) {
                    if (s == t.getKey()) {
                        i && (o = o ? o[n.opts.propKey] : null),
                        n.propData = o,
                        a = n.checkProp(o),
                        a && n.renderContent(o, e, t); { (new Date).getTime() - c
                        }
                        alog && alog("speed.set", "c_asyncardEnd", +new Date),
                        alog.fire && alog.fire("mark"),
                        n.setLinkLog(n.elements.content),
                        n.curState.visible = a,
                        n.curState.pro.resolve()
                    }
                }).fail(function() {
                    n.hide()
                })
            }
            return void 0 == a ? !1 : a
        },
        resetContent: function() {},
        renderContent: function() {}
    }),
    t
});;
/*!searchdetail:widget/ui/controls/card/beauty/beauty.js*/
define("searchdetail:widget/ui/controls/card/beauty/beauty",
function(i) {
    function t(i, t) {
        t = e.extend({
            dataKey: "",
            itemSize: {
                width: 78,
                height: 98
            },
            titleArray: ["性感系", "清纯系", "丝袜系"],
            pTpl: '<p class="item-title"></p>',
            itemTpl: ['<li class="picbox">', '<span class="pic-loading-dot"></span>', '<a href="" target="_blank"><img /></a>', "</li>"].join(""),
            tpl: ['<div class="card-box beauty-card">', '<h5 class="card-title"><i class="sticker"></i><span class="text">更多美女</span><i class="close"></i></h5>', '<div class="card-content">', '<ul class="clearfix piclist piclist3">', "</ul>", "</div>", "</div>"].join("")
        },
        t),
        i = e.extend({
            picList: ".piclist"
        },
        i),
        a.call(this, i, t)
    } {
        var e = i("common:widget/ui/base/base"),
        s = (i("common:widget/ui/utils/utils"), i("common:widget/ui/base/events"), i("searchdetail:widget/ui/utils/lib"), i("searchdetail:widget/ui/utils/imghelper")),
        a = i("searchdetail:widget/ui/controls/card/base/asyncard");
        i("searchdetail:widget/ui/statistic/statistic-core")
    }
    return e.extend(t.prototype, a.prototype, {
        checkProp: function(i) {
            return e.isArray(i) && i.length > 5 || !!i && e.isArray(i.piclist) && i.piclist.length > 5
        },
        renderContent: function(i) {
            if (!e.isArray(i)) {
                {
                    var t = i.piclist;
                    i["simi-listdata"]
                }
                i = t
            }
            var a = e("<ul></ul>"),
            l = this,
            c = (this.imgData, this.opts.itemSize);
            e(i).each(function(i, t) {
                if (! (i >= 4)) {
                    var r = e(l.opts.itemTpl).appendTo(a),
                    n = r.find("img"),
                    d = {
                        cs: t.cs,
                        p: i + 1
                    };
                    r.find("a").attr("href", t.fromurl),
                    s.loadImage([t.objurl],
                    function(i) {
                        var e = s.scaleFull(i, c);
                        r.find(".pic-loading-dot").hide(),
                        n.css(e).attr("src", t.objurl)
                    }),
                    n.attr("data-src", t.objurl),
                    r.find("a").attr("log-ext", e.json.stringify(d))
                }
            }),
            this.elements.picList.empty().append(a.children()),
            this.$element.show()
        }
    }),
    t
});;
/*!searchdetail:widget/ui/controls/card/car/car.js*/
define("searchdetail:widget/ui/controls/card/car/car",
function(t) {
    function i(t, i) {
        i = a.extend({
            dataKey: "",
            itemSize: {
                width: 118,
                height: 88
            },
            itemTpl: ['<li class="car-item">', '<div class="picbox">', '<span class="pic-loading-dot"></span>', '<a href="" target="_blank"><img /></a>', "</div>", '<h6 class="car-item-title"><span class="car-item-title-bg"></span><a href="" target="_blank"></a></h6>', "</li>"].join(""),
            tpl: ['<div class="card-box car-card">', '<h5 class="card-title"><i class="sticker"></i><span class="text">车型信息</span><i class="close"></i></h5>', '<div class="card-content">', '<div class="car-info">', "</div>", '<ul class="clearfix piclist">', "</ul>", '<a class="morebtn" href="" target="_blank">更多信息&gt;</a>', "</div>", "</div>"].join(""),
            carLogoTpl: ['<div class="car-logo">', '<div class="car-logo-img"><a target="_blank" href=""><img /></a></div>', "<ul>", '<li><h6><a href="" target="_blank" title=""></a></h6></li>', '<li class="src-site-info"><span>来自：</span><a href="" target="_blank"></a></li>', "</ul>", "</div>"].join(""),
            cartypeDetailTpl: ['<ul class="cartype-logo-detail">', '<li>报价：<a target="_blank" href=""></a></li>', "<li>排量：<span></span></li>", '<li class="bsx"><span class="bsx-label">变速箱：</span><span class="bsx-text"></span></li>', "</ul>"].join(""),
            cartypeQuiryTpl: '<a class="car-quiry" target="_blank" href="">询问底价</a>'
        },
        i),
        t = a.extend({
            picList: ".piclist",
            carInfo: ".car-info"
        },
        t),
        l.call(this, t, i)
    }
    var a = t("common:widget/ui/base/base"),
    e = (t("common:widget/ui/utils/utils"), t("common:widget/ui/base/events"), t("searchdetail:widget/ui/utils/lib"), t("searchdetail:widget/ui/utils/imghelper")),
    l = t("searchdetail:widget/ui/controls/card/base/asyncard");
    return a.extend(i.prototype, l.prototype, {
        resetContent: function() {
            var t = this.elements.picList;
            this.elements.carInfo.empty(),
            t && t.html('<li class="card-loading"></li>')
        },
        checkProp: function(t) {
            var i = 2;
            return ! t || !t.picList || !t.picList.length || t.picList.length < i ? !1 : !0
        },
        renderContent: function(t) {
            var i = a("<ul></ul>"),
            l = a("<div></div>"),
            r = a("<div></div>"),
            s = a("<div></div>"),
            n = this,
            c = this.opts.itemSize,
            o = (this.opts.dataKey, 2),
            d = t.picList,
            p = a(n.opts.carLogoTpl).appendTo(l),
            h = p.children("ul").find("li");
            p.children(".car-logo-img").find("a").attr("href", t.moreUrl),
            p.children(".car-logo-img").find("img").attr("src", t.logo),
            h.eq(0).find("h6>a").text(t.name).attr({
                href: t.moreUrl,
                title: t.name
            }),
            h.eq(1).find("a").attr("href", t.srcUrl).text(t.srcSite);
            var f = a(n.opts.cartypeDetailTpl).appendTo(r),
            m = (a(n.opts.cartypeQuiryTpl).appendTo(s), f.find("li"));
            m.eq(0).find("a").text(t.priceInfo).attr("href", t.priceUrl),
            m.eq(1).find("span").text(t.volume),
            m.eq(2).find("span").eq(1).text(t.trans).attr("title", t.trans),
            s.find("a").attr("href", t.inquiryUrl);
            var g = [l[0].innerHTML, r[0].innerHTML, s[0].innerHTML].join("");
            a(d).each(function(t, l) {
                if (t > o - 1) return ! 1;
                var r = a(n.opts.itemTpl).appendTo(i),
                s = r.find(".picbox img"),
                d = l.picUrl;
                r.find("a").attr("href", l.linkUrl),
                e.loadImage([d],
                function(t) {
                    var i = e.scaleFull(t, c);
                    r.find(".pic-loading-dot").hide(),
                    s.css(i).attr("src", d)
                }),
                s.attr("data-src", d),
                r.find(".car-item-title a").text(l.desc).attr("title", l.desc)
            }),
            this.elements.content.find(".morebtn").attr("href", t.moreUrl),
            this.elements.carInfo.empty().html(g),
            this.elements.picList.empty().append(i.children()),
            this.$element.show()
        }
    }),
    i
});;
/*!searchdetail:widget/ui/controls/card/carface/carface.js*/
define("searchdetail:widget/ui/controls/card/carface/carface",
function(e) {
    function t(e, t) {
        t = a.extend({
            logTag: "face",
            dataKey: "",
            itemSize: {
                width: 118,
                height: 88
            },
            itemTpl: ['<li class="car-face-item">', '<div class="picbox">', '<span class="pic-loading-dot"></span>', '<a href="" target="_blank"><img /></a>', "</div>", '<h6 class="car-face-item-title"><span class="car-face-item-title-bg"></span><a href="" target="_blank"></a></h6>', "</li>"].join(""),
            tpl: ['<div class="card-box car-face-card">', '<span class="margin-packed"></span>', '<div class="card-content">', '<div class="car-face-info">', "</div>", '<ul class="clearfix piclist">', "</ul>", '<p class="morebtn-wrapper">', '<a class="morebtn" href="" target="_blank">更多信息&gt;</a>', '<span class="src-site-info">来自：<a href="" target="_blank"></a></span>', "</p>", "</div>", "</div>"].join(""),
            carLogoTpl: ['<div class="car-face-logo">', '<div class="car-face-logo-wrapper">', '<div class="car-face-logo-img">', '<a target="_blank" href=""><!--[if lt IE 9]><em class="ie-circel-bg"></em><![endif]--><span><img /></span></a>', "</div>", '<span class="car-face-logo-padding-bg"></span>', "</div>", '<div id="car-face-quiry-wrapper"></div>', "</div>"].join(""),
            cartypeDetailTpl: ['<ul class="cartype-logo-detail">', '<li class="car-face-detail-title">', '<h6><a href="" target="_blank" title=""></a></h6>', "</li>", '<li class="car-face-detail-price"><span class="detail-label">报价：</span><a class="detail-text" target="_blank" href=""></a></li>', '<li><span class="detail-label">排量：</span><span class="detail-text"></span></li>', '<li class="bsx"><span class="detail-label">变速箱：</span><span class="detail-text"></span></li>', "</ul>"].join(""),
            cartypeQuiryTpl: '<a class="car-face-quiry" target="_blank" href="">询问底价</a>'
        },
        t),
        e = a.extend({
            picList: ".piclist",
            carInfo: ".car-face-info"
        },
        e),
        r.call(this, e, t)
    }
    var a = e("common:widget/ui/base/base"),
    i = e("common:widget/ui/utils/utils"),
    s = (e("common:widget/ui/base/events"), e("searchdetail:widget/ui/utils/lib"), e("searchdetail:widget/ui/utils/imghelper")),
    r = e("searchdetail:widget/ui/controls/card/base/asyncard"),
    n = e("searchdetail:widget/ui/statistic/statistic-core");
    return a.extend(t.prototype, r.prototype, {
        resetContent: function() {
            var e = this.elements.picList;
            this.elements.carInfo.empty(),
            e && e.html('<li class="card-loading"></li>')
        },
        checkProp: function(e) {
            var t = 2;
            return ! e || !e.picList || !e.picList.length || e.picList.length < t ? !1 : !0
        },
        renderContent: function(e) {
            this.propData = e,
            this.$element.show();
            var t = a("<ul></ul>"),
            r = a("<div></div>"),
            l = a("<div></div>"),
            c = a("<div></div>"),
            o = this,
            d = this.opts.itemSize,
            p = (this.opts.dataKey, 2),
            h = e.picList,
            f = a(o.opts.carLogoTpl).appendTo(r);
            f.find(".car-face-logo-img").find("a").attr("href", e.moreUrl);
            var m = f.find(".car-face-logo-img").find("img");
            m.attr("src", i.httpsTimg({
                imgUrl: e.logo
            }));
            var v = a(o.opts.cartypeDetailTpl).appendTo(l),
            u = (a(o.opts.cartypeQuiryTpl).appendTo(c), v.find("li"));
            u.eq(0).find("h6>a").text(e.name).attr({
                href: e.moreUrl,
                title: e.name
            }),
            u.eq(1).find(".detail-text").text(e.priceInfo).attr({
                href: e.priceUrl,
                title: e.priceInfo
            }),
            u.eq(2).find(".detail-text").text(e.volume).attr("title", e.volume),
            u.eq(3).find(".detail-text").text(e.trans).attr("title", e.trans),
            c.find("a").attr("href", e.inquiryUrl).appendTo(f.find("#car-face-quiry-wrapper"));
            var g = [r[0].innerHTML, l[0].innerHTML].join("");
            a(h).each(function(e, i) {
                if (e > p - 1) return ! 1;
                var r = a(o.opts.itemTpl).appendTo(t),
                n = r.find(".picbox img"),
                l = i.picUrl;
                r.find("a").attr("href", i.linkUrl),
                s.loadImage([l],
                function(e) {
                    var t = s.scaleFull(e, d);
                    r.find(".pic-loading-dot").hide(),
                    n.css(t).attr("src", l)
                }),
                n.attr("data-src", l),
                r.find(".car-face-item-title a").text(i.desc).attr("title", i.desc)
            });
            var b = "来自" === e.srcSite.substring(0, 2) ? e.srcSite.substring(3) : e.srcSite;
            this.elements.title.find(".text").html(e.name),
            this.elements.content.find(".morebtn").attr("href", e.moreUrl),
            this.elements.content.find(".src-site-info>a").attr("href", e.srcUrl).text(b),
            this.elements.carInfo.empty().html(g),
            this.elements.picList.empty().append(t.children()),
            this.$element.attr("data-id", "face_auto_0");
            var w = a("#dutu-anchor-wrapper").children('[data-id="face_auto_0"]');
            setTimeout(function() {
                var t = a("#dutu-anchor-wrapper").children('[data-id="face_auto_0"]');
                t.children("a").attr("href", e.moreUrl).attr("log-click", "p=5.15&fm=auto&tag=face&site=" + encodeURIComponent(e.moreUrl))
            },
            100),
            w.show(),
            w.parent().show(),
            w.hasClass("default_icon") && n.send("5.1011000", {
                tn: "baiduimagedetail",
                fm: "autodefault",
                tag: "face"
            })
        },
        bindEvent: function() {
            var e = this;
            this.$element.on("mouseenter",
            function() {
                var t = a(this).attr("data-id");
                e.anthorIndex = t,
                e.fire("hover")
            }).on("mouseleave",
            function() {
                e.fire("hout")
            })
        },
        active: function(e) {
            if (this.checkProp(this.propData) && (this.disactiveTimeout && clearTimeout(this.disactiveTimeout), "card-box car-face-card" != e.$element[0].className)) {
                var t, i = a(e.$element[0]).find('[data-id="' + e.anthorIndex + '"]')[0] || a("body"),
                s = parseFloat(i.style.top),
                r = parseFloat(i.style.left),
                n = this.$element.height(),
                l = a(".img-container").height() - n,
                c = -parseInt(s),
                o = a(".img-container").offset().top,
                d = a(".img-container").offset().left;
                a(i).addClass("hover"),
                this.$element.siblings(".card-box").css("visibility", "hidden"),
                a("#wikiinfo-card-wrapper .card-box").css("visibility", "hidden");
                var p = a.browser.msie && a.browser.version < 9;
                if (!p) {
                    var h = a(i).siblings().children("a"),
                    f = h.find("em");
                    f.hasClass("hover") && h.css("width", "auto") && f.removeClass("hover")
                }
                var h = a(i).children("a"),
                f = h.find("em");
                "none" == h.css("display") || a(i).hasClass("default_icon") ? this.$element.find(".car-face-detail-title").show() : this.$element.find(".car-face-detail-title").hide();
                var m = n + 40 + c,
                v = s + 32 - l,
                p = a.browser.msie && a.browser.version < 9;
                v > 0 && (0 > m || v > m) ? (t = s - this.$element.height() + o, p || f.hasClass("hover") && h.css("width", "auto") && f.removeClass("hover")) : (t = s + 32 + o, parseInt(f.width()) > 136 && !f.hasClass("hover") && !p && (h.css("width", "136px"), f.addClass("hover"))),
                this.$element.css({
                    left: r + d + "px",
                    top: t + "px",
                    visibility: "visible"
                })
            }
        },
        disactive: function(e) {
            if (this.checkProp(this.propData)) {
                var t = this,
                i = e.anthorIndex; !
                function(e) {
                    t.disactiveTimeout = setTimeout(function() {
                        var s = a(e.$element[0]).find('[data-id="' + i + '"]')[0];
                        a(s).removeClass("hover"),
                        t.$element.css("visibility", "hidden");
                        var r = a.browser.msie && a.browser.version < 9;
                        if (!r) {
                            var n = a(s).children("a"),
                            l = n.find("em");
                            l.hasClass("hover") && n.css("width", "auto") && l.removeClass("hover")
                        }
                    },
                    150)
                } (e)
            }
        }
    }),
    t
});;
/*!searchdetail:widget/ui/controls/card/carface2/carface2.js*/
define("searchdetail:widget/ui/controls/card/carface2/carface2",
function(e) {
    function t(e, t) {
        t = i.extend({
            logTag: "face",
            dataKey: "",
            itemSize: {
                width: 84,
                height: 62
            },
            itemTpl: ['<li class="car-face-item">', '<div class="picbox">', '<span class="pic-loading-dot"></span>', '<a href="" target="_blank"><img /></a>', "</div>", "</li>"].join(""),
            tpl: ['<div class="card-box car2-face-card" id="carFace2">', '<div class="card-search">', '<a class="search-a" target="_blank"><span class="search">查看更多"</span><span class="carname"></span><span>"图片</span><i class="icon-more"></i></a>', "</div>", '<div class="card-content">', '<ul class="clearfix piclist">', "</ul>", "</div>", "</div>"].join("")
        },
        t),
        e = i.extend({
            picList: ".piclist",
            more: ".card-search"
        },
        e),
        s.call(this, e, t)
    }
    var i = e("common:widget/ui/base/base"),
    a = (e("common:widget/ui/utils/utils"), e("common:widget/ui/base/events"), e("searchdetail:widget/ui/utils/lib"), e("searchdetail:widget/ui/utils/imghelper")),
    s = e("searchdetail:widget/ui/controls/card/base/asyncard"),
    r = e("searchdetail:widget/ui/statistic/statistic-core");
    return i.extend(t.prototype, s.prototype, {
        resetContent: function() {
            var e = this.elements.picList;
            e && e.html('<li class="card-loading"></li>')
        },
        checkProp: function(e) {
            var t = 3;
            return ! e || !e.picList || !e.picList.length || e.picList.length < t ? !1 : !0
        },
        renderContent: function(e) {
            this.propData = e,
            this.$element.show();
            var t = i("<ul></ul>"),
            s = this,
            n = this.opts.itemSize,
            c = (this.opts.dataKey, 3),
            o = e.picList;
            i(o).each(function(e, r) {
                if (e > c - 1) return ! 1;
                var o = i(s.opts.itemTpl).appendTo(t),
                d = o.find(".picbox img"),
                l = r.picUrl;
                o.find("a").attr("href", r.linkUrl),
                a.loadImage([l],
                function(e) {
                    var t = a.scaleFull(e, n);
                    o.find(".pic-loading-dot").hide(),
                    d.css(t).attr("src", l)
                }),
                d.attr("data-src", l)
            }),
            this.elements.more.find(".carname").text(e.name),
            this.elements.picList.empty().append(t.children()),
            this.$element.attr("data-id", "face_auto_0");
            var d = i("#dutu-anchor-wrapper").children('[data-id="face_auto_0"]');
            d.children("a").attr("href", e.moreUrl).attr("log-click", "p=5.15&fm=auto&tag=face&site=" + encodeURIComponent(e.moreUrl)),
            d.show(),
            d.parent().show(),
            d.hasClass("default_icon") && r.send("5.1011000", {
                tn: "baiduimagedetail",
                fm: "autodefault",
                tag: "face"
            }),
            this.$element.find(".card-search .search-a").attr("href", "/search/index?tn=baiduimage&ie=utf-8&word=" + encodeURIComponent(e.name)).attr("log-click", "p=5.15&fm=autoNoResult&tag=face&site=" + encodeURIComponent(e.url))
        },
        bindEvent: function() {
            var e = this;
            this.$element.on("mouseenter",
            function() {
                var t = i(this).attr("data-id");
                e.anthorIndex = t,
                e.fire("hover")
            }).on("mouseleave",
            function() {
                e.fire("hout")
            })
        },
        active: function(e) {
            if (this.checkProp(this.propData) && (this.disactiveTimeout && clearTimeout(this.disactiveTimeout), "card-box car2-face-card" != e.$element[0].className)) {
                var t, a = i(e.$element[0]).find('[data-id="' + e.anthorIndex + '"]')[0] || i("body"),
                s = parseFloat(a.style.top),
                r = parseFloat(a.style.left),
                n = this.$element.height(),
                c = i(".img-container").height() - n,
                o = -parseInt(s),
                d = i(".img-container").offset().top,
                l = i(".img-container").offset().left;
                i(a).addClass("hover"),
                this.$element.siblings(".card-box").css("visibility", "hidden"),
                i("#wikiinfo-card-wrapper .card-box").css("visibility", "hidden");
                var h = i.browser.msie && i.browser.version < 9;
                if (!h) {
                    var m = i(a).siblings().children("a"),
                    p = m.find("em");
                    p.hasClass("hover") && m.css("width", "auto") && p.removeClass("hover")
                }
                var m = i(a).children("a"),
                p = m.find("em"),
                f = n + 40 + o,
                u = s + 32 - c,
                h = i.browser.msie && i.browser.version < 9;
                u > 0 && (0 > f || u > f) ? (t = s - this.$element.height() + d, h || p.hasClass("hover") && m.css("width", "auto") && p.removeClass("hover")) : (t = s + 32 + d, parseInt(p.width()) > 136 && !p.hasClass("hover") && !h && (m.css("width", "136px"), p.addClass("hover"))),
                this.$element.css({
                    left: r + l + "px",
                    top: t + "px",
                    visibility: "visible"
                })
            }
        },
        disactive: function(e) {
            if (this.checkProp(this.propData)) {
                var t = this,
                a = e.anthorIndex; !
                function(e) {
                    t.disactiveTimeout = setTimeout(function() {
                        var s = i(e.$element[0]).find('[data-id="' + a + '"]')[0];
                        i(s).removeClass("hover"),
                        t.$element.css("visibility", "hidden")
                    },
                    150)
                } (e)
            }
        }
    }),
    t
});;
/*!searchdetail:widget/ui/controls/card/decoration_sim/decoration_sim.js*/
define("searchdetail:widget/ui/controls/card/decoration_sim/decoration_sim",
function(t) {
    function a(t, a) {
        a = i.extend({
            dataKey: "decoration_sim",
            logKey: "decoration_sim",
            itemSize: {
                width: 78,
                height: 78
            },
            itemTpl: ['<li class="picbox decoration_sim_item">', '<span class="pic-loading-dot"></span>', '<a href="" target="_blank"><img /></a>', "</li>"].join(""),
            tpl: ['<div class="card-box decoration_sim_card">', '<h5 class="card-title"><i class="sticker"></i><span class="text">装修案例</span><i class="close"></i></h5>', '<div class="card-content">', '<a href="" target="_blank" class="card-subtitle"></a>', '<div class="starbox">', '<span class="starbar">案例评分：</span>', '<a class="talktoher" href="" target="_blank">免费咨询</a>', "</div>", '<ul class="clearfix piclist"></ul>', '<a class="dataprovider" href="" target="_blank"></a>', "</div>", "</div>"].join("")
        },
        a),
        t = i.extend({
            picList: ".piclist"
        },
        t),
        s.call(this, t, a)
    }
    var i = t("common:widget/ui/base/base"),
    e = (t("common:widget/ui/utils/utils"), t("common:widget/ui/base/events"), t("searchdetail:widget/ui/utils/lib"), t("searchdetail:widget/ui/utils/imghelper")),
    s = t("searchdetail:widget/ui/controls/card/base/base");
    return i.extend(a.prototype, s.prototype, {
        updateView: function(t, a) {
            var s = (t.same, this.elements.title.find("span")),
            r = this.elements.content.find(".starbox");
            s.html("相似案例"),
            r.hide(),
            this.opts.logKey = "decoration_sim"; {
                var l = i("<ul></ul>"),
                c = this,
                n = (this.imgData, this.opts.itemSize);
                a.get("imgData").cs,
                a.get("word")
            }
            i(t.pics).each(function(a, s) {
                var r = i(c.opts.itemTpl);
                a > 0 && r.css("margin-left", "5px"),
                r.appendTo(l);
                var d = r.find("img"),
                o = {
                    cs: s.cs,
                    p: a + 1
                };
                r.find("a").attr("href", t.caseurl),
                e.loadImage([s],
                function(t) {
                    var a = e.scaleFull(t, n);
                    r.find(".pic-loading-dot").hide(),
                    d.css(a).attr("src", s)
                }),
                d.attr("data-src", s.imgUrl),
                r.find("a").attr("log-ext", i.json.stringify(o))
            }),
            this.elements.cntWrapper.find(".card-subtitle").html(t.title).attr("href", t.caseurl),
            this.elements.cntWrapper.find(".starbar").addClass("star" + t.star),
            this.elements.cntWrapper.find(".dataprovider").html(t.company).attr("href", t.srcUrl),
            this.elements.cntWrapper.find(".talktoher").attr("href", t.srcUrl),
            this.elements.picList.empty().append(l.children())
        }
    }),
    a
});;
/*!searchdetail:widget/ui/controls/card/foods/foods.js*/
define("searchdetail:widget/ui/controls/card/foods/foods",
function(t) {
    function i(t, i) {
        i = e.extend({
            dataKey: "srv_food",
            itemSize: {
                width: 78,
                height: 78
            },
            itemTpl: ['<li class="picbox">', '<span class="pic-loading-dot"></span>', '<a href="" target="_blank" log-pos="pic">', '<img height=80 src="" />', '<span class="step-numbg"></span>', '<span class="step-num"></span>', "</a>", "</li>"].join(""),
            tpl: ['<div class="card-box foods-card">', '<h5 class="card-title"><i class="sticker"></i><span class="text">美食教程</span><i class="close"></i></h5>', '<div class="card-content">', '<h6><a href="" target="_blank" log-pos="title"></a></h6>', '<ul class="clearfix piclist">', "</ul>", '<p class="src-row"><a href="" target="_blank" log-pos="more"><span></span></a></p>', "</div>", "</div>"].join("")
        },
        i),
        t = e.extend({
            titleLink: "h6 a",
            picList: ".piclist",
            srcSite: ".src-row a"
        },
        t),
        l.call(this, t, i)
    }
    var e = t("common:widget/ui/base/base"),
    s = (t("common:widget/ui/utils/utils"), t("common:widget/ui/base/events"), t("searchdetail:widget/ui/utils/lib")),
    a = t("searchdetail:widget/ui/utils/imghelper"),
    l = t("searchdetail:widget/ui/controls/card/base/base");
    return e.extend(i.prototype, l.prototype, {
        updateView: function(t) {
            var i = e("<ul></ul>"),
            l = this,
            n = this.opts.itemSize,
            r = {
                t: t.title,
                f: t.srcUrl
            };
            e(t.steps).each(function(t, s) {
                if (t > 2) return ! 1;
                var c = e(l.opts.itemTpl).appendTo(i),
                o = c.find("img"),
                d = s.picUrl,
                p = e.extend({},
                r, {
                    f: s.linkUrl
                });
                c.find("a").attr("href", s.linkUrl),
                a.loadImage([d],
                function(t) {
                    var i = a.scaleFull(t, n);
                    c.find(".pic-loading-dot").hide(),
                    o.css(i).attr("src", d)
                }),
                o.attr("data-src", d),
                c.find("a").attr("log-ext", e.json.stringify(p)),
                c.find(".step-num").text(t + 1)
            }),
            this.elements.picList.empty().append(i.children()),
            this.elements.titleLink.attr("href", t.srcUrl).html(t.title + "的做法").attr("title", t.title).attr("log-ext", e.json.stringify(r));
            var c = s.getHost(t.srcUrl);
            this.elements.srcSite.attr("href", c).attr("log-ext", e.json.stringify(r)).find("span").text(s.getSiteName(c))
        }
    }),
    i
});;
/*!searchdetail:widget/ui/controls/card/friends/friendsasync.js*/
define("searchdetail:widget/ui/controls/card/friends/friendsasync",
function(t) {
    function i(t, i) {
        i = s.extend({
            dataKey: "",
            logKey: "friend",
            itemSize: {
                width: 70,
                height: 70
            },
            itemTpl: ['<li class="picbox num${index}"><a href="${fromUrl}" target="_blank" log-click="p=5.15&tag=card&fm=jiaoyou&site=${encodeURIComponent(fromUrl)}&pos=&ext=&pageurl=${encodeURIComponent(pageurl)}">', '<span class="pic-loading-dot"></span>', '<img src="${stUrl}" class="img" /><span class="shadow"></span><span class="hover">打招呼</span>', '<p class="similar">${parseInt(similarity*100)}%相似</p>', '<p class="age">${age}岁</p>', '<p class="site">${fromSite}</p>', "</a></li>"].join(""),
            tpl: ['<div class="card-box friends-card">', '<h5 class="card-title"><i class="sticker"></i><span class="text">识图交友</span><i class="close"></i></h5>', '<div class="card-content">', '<div class="con"><div class="headImg"><img src="" /><span class="shadow"></span></div></div>', '<p class="text">Ta是你的梦中情人么,为你找到和Ta样貌相似的人</p>', '<ul class="clearfix piclist">', "</ul>", "</div>", "</div>"].join("")
        },
        i),
        t = s.extend({
            picList: ".piclist"
        },
        t),
        a.call(this, t, i)
    } {
        var s = t("common:widget/ui/base/base"),
        e = (t("common:widget/ui/utils/utils"), t("common:widget/ui/base/events"), t("searchdetail:widget/ui/utils/lib"), t("searchdetail:widget/ui/utils/imghelper"), t("common:widget/ui/juicer/juicer")),
        a = t("searchdetail:widget/ui/controls/card/base/asyncard");
        t("searchdetail:widget/ui/statistic/statistic-core")
    }
    return s.extend(i.prototype, a.prototype, {
        checkProp: function(t) {
            return t && !s.isArray(t) && t.cont && t.cont.length > 2
        },
        renderContent: function(t) {
            var i = this.opts.itemSize.width / (t.avatar_face_loc.width - 0);
            htmls = "";
            for (var s = {
                width: i * this.imgData.width + "px",
                left: -i * t.avatar_face_loc.left + "px",
                top: -i * t.avatar_face_loc.top + "px"
            },
            a = 0; 3 > a; a++) t.cont[a].index = a + 1,
            t.cont[a].pageurl = location.href,
            htmls += e(this.opts.itemTpl, t.cont[a]);
            this.elements.picList.empty().append(htmls),
            this.elements.cntWrapper.find(".headImg img").attr("src", t.avatar_url).css(s),
            this.$element.show()
        }
    }),
    i
});;
/*!searchdetail:widget/ui/controls/card/goods/goods.js*/
define("searchdetail:widget/ui/controls/card/goods/goods",
function(e) {
    function t(e, t) {
        t = i.extend({
            dataKey: "",
            logKey: "cloth",
            itemSize: {
                width: 118,
                height: 98
            },
            itemTpl: ['<li class="goods-item">', '<div class="picbox">', '<span class="pic-loading-dot"></span>', '<a href="" target="_blank"><img /></a>', "</div>", '<div class="goods-info"><span></span><a class="brand" href="" target="_blank"></a></div>', "</li>"].join(""),
            tpl: ['<div class="card-box goods-card">', '<h5 class="card-title"><i class="sticker"></i><span class="text">相似商品</span>', '<a class="card-box-more card-box-goods-more" log-pos="more" href="" target="_blank"><span class="card-box-more-text">更多</span><i class="card-box-more-img"></i></a><i class="close"></i></h5>', '<div class="card-content">', '<ul class="clearfix piclist">', "</ul>", "</div>", "</div>"].join("")
        },
        t),
        e = i.extend({
            picList: ".piclist"
        },
        e),
        a.call(this, e, t)
    }
    var i = e("common:widget/ui/base/base"),
    o = (e("common:widget/ui/utils/utils"), e("common:widget/ui/base/events"), e("searchdetail:widget/ui/utils/lib"), e("searchdetail:widget/ui/utils/imghelper")),
    a = e("searchdetail:widget/ui/controls/card/base/asyncard");
    return i.extend(t.prototype, a.prototype, {
        resetContent: function() {
            var e = this.elements.picList;
            e && e.html('<li class="card-loading"></li>')
        },
        checkProp: function(e) {
            return ! e || !e.length || e.length < 4 ? !1 : !0
        },
        renderContent: function(e, t, a) {
            var s = i("<ul></ul>"),
            r = this,
            d = this.opts.itemSize,
            c = a.get("imgData").cs,
            n = a.get("word"),
            l = a.get("imgData").bdSrcType || 0,
            m = encodeURIComponent(a.get("imgData").thumbURL),
            g = a.get("imgData").map,
            p = g.cloth_info ? 1 : 2,
            h = encodeURIComponent(a.get("imgData").picDesc),
            f = a.get("imgData").fromPageTitleEnc,
            u = "/n/pc_list?queryImageUrl=" + m + "&querySign=" + c + "&query=" + n + "&shixiao=" + l + "&objtype=" + p + "&title=" + f + "&ddesc=" + h + "&fp=searchdetail&pos=card&fm=searchdetail&uptype=button#activeTab=2";
            i(e).each(function(e, t) {
                if (e > 3) return ! 1;
                var a = i(r.opts.itemTpl).appendTo(s),
                c = a.find("img"),
                n = t.imgInfo.thumbURL;
                a.find("a").attr("href", t.pcBuyURL || t.fromURL),
                "http://error" == t.imgInfo.thumbURL && (n = t.imgInfo.objURL),
                o.loadImage([n],
                function(e) {
                    var t = o.scaleFull(e, d);
                    a.find(".pic-loading-dot").hide(),
                    c.css(t).attr("src", n)
                }),
                c.attr("data-src", n);
                var l = "￥" + (t.price >= 100 ? String(t.price).replace(/(\d{2})$/, ".$1") : "0." + t.price),
                m = a.find(".goods-info");
                m.find("span:first-child").text(l),
                m.find(".brand").text(t.source)
            }),
            i(".card-box-goods-more").attr({
                href: u,
                fm: r.opts.logKey
            }),
            i(".card-box-goods-more").hover(function() {
                i(this).find(".card-box-more-text").addClass("card-box-more-text-hover"),
                i(this).find(".card-box-more-img").addClass("card-box-more-img-hover")
            },
            function() {
                i(this).find(".card-box-more-text").removeClass("card-box-more-text-hover"),
                i(this).find(".card-box-more-img").removeClass("card-box-more-img-hover")
            }),
            "shoe" == r.opts.logKey && i(".card-box-goods-more").remove(),
            this.elements.picList.empty().append(s.children()),
            this.$element.show(),
            this.elements.picList.find(".goods-item").each(function(e, t) {
                t = i(t),
                t.find(".goods-info>.brand").width(Math.max(0, d.width - t.find(".goods-info>span").width() - 10))
            }),
            i(".card-box-more").on("click",
            function() {
                i.cookie("uploadTime", (new Date).getTime(), {
                    path: "/"
                })
            })
        }
    }),
    t
});;
/*!searchdetail:widget/ui/controls/card/goods/goodsSync.js*/
define("searchdetail:widget/ui/controls/card/goods/goodsSync",
function(e) {
    function i(e, i) {
        i = o.extend({
            dataKey: "",
            logKey: "cloth",
            itemSize: {
                width: 118,
                height: 98
            },
            itemTpl: ['<li class="goods-item">', '<div class="picbox">', '<span class="pic-loading-dot"></span>', '<a href="" target="_blank"><img /></a>', "</div>", '<div class="goods-info"><a class="brand" href="" target="_blank"></a></div>', "</li>"].join(""),
            tpl: ['<div class="card-box goods-card">', '<h5 class="card-title"><i class="sticker"></i><span class="text">相关商品</span>', '<a class="card-box-more card-box-goods-more" log-pos="more" href="" target="_blank">', '<span class="card-box-more-text">更多</span><i class="card-box-more-img"></i></a><i class="close"></i></h5>', '<div class="card-content">', '<ul class="clearfix piclist">', "</ul>", "</div>", "</div>"].join("")
        },
        i),
        e = o.extend({
            picList: ".piclist"
        },
        e),
        s.call(this, e, i)
    }
    var o = e("common:widget/ui/base/base"),
    t = e("common:widget/ui/utils/utils"),
    a = (e("common:widget/ui/base/events"), e("searchdetail:widget/ui/utils/lib"), e("searchdetail:widget/ui/utils/imghelper")),
    s = e("searchdetail:widget/ui/controls/card/base/base");
    return o.extend(i.prototype, s.prototype, {
        updateView: function(e, i) {
            var s = o("<ul></ul>"),
            d = this,
            r = this.opts.itemSize,
            c = i.get("imgData"),
            n = {
                querySign: c.cs,
                os: c.os,
                query: i.get("word"),
                shixiao: c.bdSrcType || 0,
                queryImageUrl: encodeURIComponent(c.thumbURL),
                objtype: 2,
                ddesc: encodeURIComponent(c.picDesc),
                title: c.fromPageTitleEnc
            },
            l = "/n/pc_list?" + t.jsonToQuery(n) + "&fp=searchdetail&pos=card&fm=searchdetail&uptype=button#activeTab=2";
            o(e).each(function(e, i) {
                if (e > 3) return ! 1;
                var t = o(d.opts.itemTpl).appendTo(s),
                c = t.find("img"),
                n = i.tnurl;
                t.find("a").attr("href", i.url),
                a.loadImage([n],
                function(e) {
                    var i = a.scaleFull(e, r);
                    t.find(".pic-loading-dot").hide(),
                    c.css(i).attr("src", n)
                }),
                c.attr("data-src", n);
                var l = t.find(".goods-info");
                l.find(".brand").text(i.source)
            }),
            o(".card-box-goods-more").attr({
                href: l,
                fm: d.opts.logKey
            }),
            o(".card-box-goods-more").hover(function() {
                o(this).find(".card-box-more-text").addClass("card-box-more-text-hover"),
                o(this).find(".card-box-more-img").addClass("card-box-more-img-hover")
            },
            function() {
                o(this).find(".card-box-more-text").removeClass("card-box-more-text-hover"),
                o(this).find(".card-box-more-img").removeClass("card-box-more-img-hover")
            }),
            this.elements.picList.empty().append(s.children()),
            this.$element.show(),
            this.elements.picList.find(".goods-item").each(function(e, i) {
                i = o(i),
                i.find(".goods-info>.brand").width(Math.max(0, r.width - i.find(".goods-info>span").width() - 10))
            }),
            o(".card-box-more").on("click",
            function() {
                o.cookie("uploadTime", (new Date).getTime(), {
                    path: "/"
                })
            })
        }
    }),
    i
});;
/*!searchdetail:widget/ui/controls/card/goodsdetail/goodsdetail.js*/
define("searchdetail:widget/ui/controls/card/goodsdetail/goodsdetail",
function(t, i, e) {
    function a(t, i) {
        i = s.extend({
            checkState: !1,
            logKey: "pc_detail_slider_right_goods_detail",
            itemTpl: "<li>\n<div class='left-pic'>\n<a target='_blank'>\n<img>\n</a>\n</div>\n<a target='_blank' class='feibiao-link fl1'></a>\n<a target='_blank' class='feibiao-link fl2'></a>\n<a target='_blank' class='feibiao-link fl3'>\n<span>官方价：</span>\n<span class='price'></span>\n</a>\n<a target='_blank' class='feibiao-link fl4'>\n<span>线上优惠价：</span>\n<span class='discount-price'></span>\n</a>\n</li>",
            tpl: ['<div class="card-box goodsdetail">', '<h5 class="card-title"><i class="sticker"></i><span class="text">图中商品详情</span><i class="new"></i></h5>', '<div class="card-content">', '<ul class="piclist">', "</ul>", "</div>", "</div>"].join("")
        },
        i),
        t = s.extend({
            titleLink: "h6 a",
            picList: ".piclist"
        },
        t),
        n.call(this, t, i)
    }
    var s = t("common:widget/ui/base/base"),
    n = (t("searchdetail:widget/ui/statistic/statistic-core"), t("searchdetail:widget/ui/controls/card/base/base")),
    l = t("searchdetail:widget/ui/statistic/statistic-core");
    s.extend(a.prototype, n.prototype, {
        setLog: function(t, i, e) {
            var a = this;
            return l.send("10.1010100", {
                as: a.opts.brandName,
                pos: a.opts.logKey,
                subpos: i,
                shownum: e,
                matcont: t,
                materialNum: "5"
            }),
            "p=10.1010101&as" + a.opts.brandName + "&pos=" + a.opts.logKey + "&subpos" + i + "&matcont=" + t + "&tgTo=1"
        },
        updateView: function(t) {
            var i = {},
            e = this;
            if (t.fbResult && t.fbResult.length && s.each(t.fbResult,
            function(t, e) {
                return e.Tag === this.opts.logKey ? (i = e, !1) : void 0
            }.bind(this)), !i.Tag) return ! 1;
            var a = i.Items[0].Images;
            e.opts.brandName = i.Items[0].BrandName,
            this.elements.picList.empty(),
            s.each(a,
            function(t, i) {
                var n = s(this.opts.itemTpl);
                n.find("img").attr("src", i.ImageUrl),
                n.find(".fl1").text(i.AdTitle).attr("log-click", e.setLog(i.AdTitle, t, a.length)),
                n.find(".fl2").text(i.AdDesc).attr("log-click", e.setLog(i.AdDesc, t, a.length)),
                n.find(".price").text(i.OriginPrice).attr("log-click", e.setLog(i.OriginPrice, t, a.length)),
                n.find(".discount-price").text(i.Price).attr("log-click", e.setLog(i.Price, t, a.length)),
                n.find(".left-pic a").attr("href", i.AdLink).attr("log-click", e.setLog(i.ImageUrl, t, a.length)),
                n.find(".feibiao-link").attr("href", i.AdLink),
                this.elements.picList.append(n)
            }.bind(this))
        }
    }),
    e.exports = a
});;
/*!searchdetail:widget/ui/controls/card/goodsface/goodsface.js*/
define("searchdetail:widget/ui/controls/card/goodsface/goodsface",
function(e) {
    function i(e, i) {
        i = t.extend({
            dataKey: "",
            logKey: "cloth",
            itemSize: {
                width: 110,
                height: 140
            },
            itemTpl: ['<li class="goods-item">', '<div class="picbox">', '<span class="pic-loading-dot"></span>', '<a href="" target="_blank"><img /></a>', "</div>", '<div class="goods-info"><span></span><a class="brand" href="" target="_blank"></a><em class="bg"></em></div>', "</li>"].join(""),
            tpl: ['<div class="card-box goods-face-card">', '<div class="card-content">', '<ul class="clearfix piclist">', "</ul>", '<div class="moresimilarpic"><a log-pos="more" href="" target="_blank">查看更多<span class="arrow1"></span><span class="arrow2"></span></a></div>', "</div>", "</div>"].join("")
        },
        i),
        e = t.extend({
            picList: ".piclist"
        },
        e),
        a.call(this, e, i)
    }
    var t = e("common:widget/ui/base/base"),
    s = (e("common:widget/ui/utils/utils"), e("common:widget/ui/base/events"), e("searchdetail:widget/ui/utils/lib"), e("searchdetail:widget/ui/utils/imghelper")),
    a = e("searchdetail:widget/ui/controls/card/base/asyncard");
    return t.extend(i.prototype, a.prototype, {
        resetContent: function() {
            var e = this.elements.picList;
            e && e.html('<li class="card-loading"></li>')
        },
        checkProp: function(e) {
            return this.propData = e,
            !e || !e.length || e.length < 3 ? !1 : !0
        },
        renderContent: function(e, i, a) {
            var n = t("<ul></ul>"),
            o = this,
            r = this.opts.itemSize,
            d = a.get("imgData").cs,
            l = a.get("word"),
            c = a.get("imgData").bdSrcType,
            h = encodeURIComponent(a.get("bigImgUrl")),
            m = a.get("imgData").map,
            p = m.cloth_info ? 1 : 2,
            f = a.get("imgData").picDesc,
            g = a.get("imgData").fromPageTitleEnc,
            u = "/n/pc_list?queryImageUrl=" + h + "&querysign=" + d + "&query=" + l + "&shixiao=" + c + "&objtype=" + p + "&title=" + g + "&ddesc=" + f + "&fp=searchdetail&pos=card&fm=searchdetail&uptype=button#tab=product";
            t(e).each(function(e, i) {
                if (e > 2) return ! 1;
                var a = t(o.opts.itemTpl).appendTo(n),
                d = a.find("img"),
                l = i.imgInfo.thumbURL;
                a.find("a").attr("href", i.pcBuyURL || i.fromURL),
                "http://error" == i.imgInfo.thumbURL && (l = i.imgInfo.objURL),
                s.loadImage([l],
                function(e) {
                    var i = s.scaleFull(e, r);
                    a.find(".pic-loading-dot").hide(),
                    d.css(i).attr("src", l)
                }),
                d.attr("data-src", l);
                var c = i.price >= 100 ? String(i.price).replace(/(\d{2})$/, ".$1") : "0." + i.price,
                h = a.find(".goods-info");
                h.find("span:first-child").text(c),
                h.find(".brand").text(i.source)
            }),
            this.elements.picList.empty().append(n.children()),
            this.$element.attr("data-id", "face_cloth_0"),
            this.$element.show(),
            this.elements.picList.find(".goods-item").each(function(e, i) {
                i = t(i),
                i.find(".goods-info>.brand").width(Math.max(0, r.width - i.find(".goods-info>span").width() - 12))
            }),
            this.elements.cntWrapper.find(".moresimilarpic").find("a").attr("href", u)
        },
        bindEvent: function() {
            var e = this;
            this.$element.on("mouseenter",
            function() {
                var i = t(this).attr("data-id");
                e.anthorIndex = i,
                e.fire("hover")
            }).on("mouseleave",
            function() {
                e.fire("hout")
            })
        },
        active: function(e) {
            if (this.disactiveTimeout && clearTimeout(this.disactiveTimeout), "card-box goods-face-card" != e.$element[0].className && this.propData && this.propData.length && this.propData.length > 3) {
                var i = t(e.$element[0]).find('[data-id="' + e.anthorIndex + '"]')[0] || t("body"),
                s = parseFloat(i.style.top),
                a = parseFloat(i.style.left),
                n = this.$element.height(),
                o = t(".img-container").height() - n,
                r = -parseInt(s),
                d = t(".img-container").offset().top,
                l = t(".img-container").offset().left;
                t(i).siblings().removeClass("hover"),
                t(i).addClass("hover"),
                this.$element.siblings().css("visibility", "hidden"),
                t("#wikiinfo-card-wrapper .card-box").css("visibility", "hidden");
                var c = t.browser.msie && t.browser.version < 9;
                if (!c) {
                    var h = t(i).siblings().children("a"),
                    m = h.find("em");
                    m.hasClass("hover") && h.css("width", "auto") && m.removeClass("hover")
                }
                var p, h = t(i).children("a"),
                m = h.find("em"),
                f = n + 65 + r,
                g = s + 32 - o,
                c = t.browser.msie && t.browser.version < 9;
                g > 0 && (0 > f || g > f) ? (p = s - this.$element.height() + d, c || m.hasClass("hover") && h.css("width", "auto") && m.removeClass("hover")) : (p = s + 32 + d, parseInt(m.width()) > 104 && !m.hasClass("hover") && !c && (h.css("width", "104px"), m.addClass("hover"))),
                this.$element.css({
                    left: a + l + "px",
                    top: p + "px"
                }).css("visibility", "visible"),
                this.$element.show(),
                this.$element.find("ul>li").css("border", "1px solid #eef2f5")
            }
        },
        disactive: function(e) {
            var i = this,
            s = e.anthorIndex; !
            function(e) {
                i.disactiveTimeout = setTimeout(function() {
                    var a = t(e.$element[0]).find('[data-id="' + s + '"]')[0];
                    t(a).removeClass("hover"),
                    i.$element.css("visibility", "hidden")
                },
                150)
            } (e)
        }
    }),
    i
});;
/*!searchdetail:widget/ui/controls/card/hotcars/hotcars.js*/
define("searchdetail:widget/ui/controls/card/hotcars/hotcars",
function(t) {
    function i(t, i) {
        i = e.extend({
            dataKey: "",
            itemSize: {
                width: 118,
                height: 88
            },
            itemTpl: ['<li class="hotcars-item">', '<div class="picbox">', '<span class="pic-loading-dot"></span>', '<a href="" target="_blank"><img /></a>', "</div>", '<h6 class="hotcars-item-title"><span class="hotcars-item-title-bg"></span><a href="" target="_blank"></a></h6>', "</li>"].join(""),
            tpl: ['<div class="card-box hotcars-card">', '<h5 class="card-title"><i class="sticker"></i><span class="text">热门汽车</span><i class="close"></i></h5>', '<div class="card-content">', '<div class="hotcars-info">', "</div>", '<ul class="clearfix piclist">', "</ul>", '<a class="morebtn" href="" target="_blank">更多车型&gt;</a>', "</div>", "</div>"].join(""),
            carLogoTpl: ['<div class="hotcars-logo">', '<div class="hotcars-logo-img"><a target="_blank" href=""><img /></a></div>', "<ul>", '<li><h6><a target="_blank" href="" title=""></a></h6></li>', '<li class="src-site-info"><span>来自：</span><a href="" target="_blank"></a></li>', "</ul>", "</div>"].join("")
        },
        i),
        t = e.extend({
            picList: ".piclist",
            carInfo: ".hotcars-info"
        },
        t),
        r.call(this, t, i)
    }
    var e = t("common:widget/ui/base/base"),
    a = t("common:widget/ui/utils/utils"),
    s = (t("common:widget/ui/base/events"), t("searchdetail:widget/ui/utils/lib"), t("searchdetail:widget/ui/utils/imghelper")),
    r = t("searchdetail:widget/ui/controls/card/base/asyncard");
    return e.extend(i.prototype, r.prototype, {
        resetContent: function() {
            var t = this.elements.picList;
            this.elements.carInfo.empty(),
            t && t.html('<li class="card-loading"></li>')
        },
        checkProp: function(t) {
            var i = 4;
            return ! t || !t.picList || !t.picList.length || t.picList.length < i ? !1 : !0
        },
        renderContent: function(t) {
            var i = e("<ul></ul>"),
            r = e("<div></div>"),
            l = this,
            c = this.opts.itemSize,
            n = (this.opts.dataKey, 4),
            o = t.picList,
            d = e(l.opts.carLogoTpl).appendTo(r),
            h = d.children("ul").find("li"),
            p = "来自" === t.srcSite.substring(0, 2) ? t.srcSite.substring(3) : t.srcSite;
            d.children(".hotcars-logo-img").find("a").attr("href", t.moreUrl),
            d.children(".hotcars-logo-img").find("img").attr("src", a.httpsTimg({
                imgUrl: t.logo
            })),
            h.eq(0).find("h6>a").text(t.name).attr({
                href: t.moreUrl,
                title: t.name
            }),
            h.eq(1).find("a").attr("href", t.srcUrl).text(p),
            e(o).each(function(t, a) {
                if (t > n - 1) return ! 1;
                var r = e(l.opts.itemTpl).appendTo(i),
                o = r.find(".picbox img"),
                d = a.picUrl;
                r.find("a").attr("href", a.linkUrl),
                s.loadImage([d],
                function(t) {
                    var i = s.scaleFull(t, c);
                    r.find(".pic-loading-dot").hide(),
                    o.css(i).attr("src", d)
                }),
                o.attr("data-src", d),
                r.find(".hotcars-item-title a").text(a.name).attr("title", a.name)
            }),
            this.elements.content.find(".morebtn").attr("href", t.moreUrl),
            this.elements.carInfo.empty().html(r.children()),
            this.elements.picList.empty().append(i.children()),
            this.$element.show()
        }
    }),
    i
});;
/*!searchdetail:widget/ui/controls/card/hottags/hottags.js*/
define("searchdetail:widget/ui/controls/card/hottags/hottags",
function(t) {
    function e(t, e) {
        e = a.extend({
            dataKey: "",
            tpl: ['<div class="card-box hottags-card">', '<h5 class="card-title"><i class="sticker"></i><span class="text">相关热词</span><i class="close"></i></h5>', '<div class="card-content">', '<div class="tag-wrapper"></div>', "</div>", "</div>"].join("")
        },
        e),
        t = a.extend({
            tagWrapper: ".tag-wrapper"
        },
        t),
        i.call(this, t, e)
    }
    var a = t("common:widget/ui/base/base"),
    i = (t("common:widget/ui/utils/utils"), t("common:widget/ui/base/events"), t("searchdetail:widget/ui/utils/lib"), t("searchdetail:widget/ui/utils/imghelper"), t("searchdetail:widget/ui/controls/card/base/base"));
    return a.extend(e.prototype, i.prototype, {
        updateView: function(t) {
            var e = a("<div></div>");
            a(t).each(function(t, i) {
                var s = a('<a class="tag-item" target="_blank"></a>').appendTo(e),
                d = "/search/index?tn=baiduimage&ie=utf-8&fr=2.0_hottags&word=" + encodeURIComponent(i.query);
                s.text(i.tag).attr("href", d)
            }),
            this.elements.tagWrapper.empty().append(e.children())
        }
    }),
    e
});;
/*!searchdetail:widget/ui/controls/card/imgstory/imgstory.js*/
define("searchdetail:widget/ui/controls/card/imgstory/imgstory",
function(t) {
    function e(t, e) {
        e = s.extend({
            dataKey: "act_info",
            itemTpl: ['<div class="story-detail">', '<h6 class="story-name"><a href="http://www.chinanews.com/yl/yrfc/news/2007/07-18/982241.shtml" target="_blank">布拉德·皮特偷带女儿见前妻 致使茱莉大发雷霆</a></h6>', '<p class="detail-row"></p>', '<p class="src-row"><a class="src-lbl" href="http://www.chinanews.com/" target="_blank">中国新闻网</a><span class="src-lbl">2007-07-18</span></p>', "</div>"].join(""),
            tpl: ['<div class="card-box imgstory-card">', '<h5 class="card-title"><i class="sticker"></i><span class="text">相关资讯</span><i class="close"></i></h5>', '<div class="card-content">', "</div>", "</div>"].join("")
        },
        e),
        l.call(this, t, e)
    }
    var s = t("common:widget/ui/base/base"),
    a = t("common:widget/ui/utils/utils"),
    i = (t("common:widget/ui/base/events"), t("searchdetail:widget/ui/utils/lib")),
    l = t("searchdetail:widget/ui/controls/card/base/base");
    return s.extend(e.prototype, l.prototype, {
        updateLogSeq: function(t) {
            l.prototype.updateLogSeq.call(this, t),
            t > 1 && !this.$element.hasClass(this.opts.collapseClass)
        },
        updateView: function(t) {
            var e, l = s("<div></div>"),
            n = this;
            s(t).each(function(t, r) {
                if (t > 1) return ! 1;
                e = s(n.opts.itemTpl).appendTo(l);
                var o = r.title,
                c = 30,
                d = e.find(".story-name"),
                p = {
                    t: o,
                    tm: r.time
                };
                r.cont ? (p.hd = 1, d.hasClass("sline") || d.addClass("sline")) : (p.hd = 0, o = a.cutHtmlText(o, c, "...", 1), d.hasClass("sline") && d.removeClass("sline")),
                e.find(".story-name a").attr("href", r.fromurl).text(o).attr("title", r.title),
                r.cont ? e.find(".detail-row").text(a.cutHtmlText(a.trimTags(r.cont), 37, "...")).show() : e.find(".detail-row").hide();
                var h = e.find(".src-row"),
                m = i.getHost(r.fromurl),
                f = r.site || i.getSiteName(m);
                h.find("a").attr("href", m).text(f),
                h.find("span").text(r.time.replace(/\s+[0-9:]+$/, "")),
                e.find("a").attr("log-ext", s.json.stringify(p))
            }),
            this.elements.content.empty().append(l.children())
        }
    }),
    e
});;
/*!searchdetail:widget/ui/controls/card/invest/invest.js*/
define("searchdetail:widget/ui/controls/card/invest/invest",
function(t) {
    function e(t, e) {
        e = i.extend({
            dataKey: "",
            caption: "",
            tpl: ['<div class="card-box invest-card">', '<h5 class="card-title"><i class="sticker"></i><span class="text"></span><i class="close"></i></h5>', '<div class="card-content" style="font-size:0;">', "</div>", "</div>"].join("")
        },
        e),
        a.call(this, t, e)
    }
    var i = t("common:widget/ui/base/base"),
    a = (t("common:widget/ui/utils/utils"), t("common:widget/ui/base/events"), t("searchdetail:widget/ui/utils/lib"), t("searchdetail:widget/ui/controls/card/base/base"));
    return i.extend(e.prototype, a.prototype, {
        render: function() {
            a.prototype.render.call(this),
            this.elements.title.find(".text").text(this.opts.caption)
        },
        updateView: function(t) {
            var e = i('<a target="_blank"><img /></a>');
            e.attr("href", t.banner_fromurl).attr("title", t.name || "").find("img").attr("src", t.banner_url),
            this.elements.content.html(e)
        }
    }),
    e
});;
/*!searchdetail:widget/ui/controls/card/jipiao/jipiao.js*/
define("searchdetail:widget/ui/controls/card/jipiao/jipiao",
function(t) {
    function i(t, i) {
        i = s.extend({
            dataKey: "",
            flashOptions: {
                xTitle: "时间",
                yTitle: "人均价格（元）",
                xTitleFont: "微软雅黑",
                yTitleFont: "微软雅黑",
                xTitleColor: "0x9c9898",
                yTitleColor: "0x9c9898",
                lineColor: "0xf77d76",
                markColor: "0xf77d76"
            },
            pollingInterval: 50,
            tpl: ['<div class="card-box jipiao-card">', '<h5 class="card-title"><i class="sticker"></i><span class="text">机票</span><i class="close"></i></h5>', '<div class="card-content">', '<h6><a class="title" target="_blank"></a><span class="src-site">(来自：<a href="" target="_blank"></a>)</span></h6>', '<div class="price-flash"></div>', '<a class="morebtn" href="" target="_blank">更多趋势&gt;</a>', "</div>", "</div>"].join("")
        },
        i),
        t = s.extend({
            contentTitle: "h6 .title",
            srcSite: "h6 .src-site a",
            priceFlash: ".price-flash",
            moreLink: ".morebtn"
        },
        t),
        r.call(this, t, i),
        this._flashObj = !1,
        this._pollingTimer = !1
    }
    function e() {}
    var s = t("common:widget/ui/base/base"),
    a = (t("common:widget/ui/utils/utils"), t("common:widget/ui/base/events")),
    l = (t("searchdetail:widget/ui/utils/lib"), t("searchdetail:widget/ui/utils/imghelper"), t("searchdetail:widget/ui/statistic/statistic-core")),
    r = (t("searchdetail:widget/ui/utils/swf"), t("searchdetail:widget/ui/controls/card/base/asyncard"));
    return s.extend(i.prototype, r.prototype, {
        checkProp: function(t) {
            var i = r.prototype.checkProp.call(this, t);
            return i && r.prototype.checkProp.call(this, t.priceList)
        },
        render: function() {
            r.prototype.render.call(this),
            this._flashObj === !1 && this._initFlash()
        },
        renderContent: function(t, i, e) {
            var s = this.elements;
            s.contentTitle.text(t.fromPlace + "—" + t.toPlace).attr("href", t.moreUrl),
            s.srcSite.text(t.srcSite).attr("href", t.srcUrl),
            s.moreLink.attr("href", t.moreUrl),
            this.$element.show(),
            this._startPollingCallFlash(t, e)
        },
        _startPollingCallFlash: function(t, i) {
            if (this._pollingTimer && (this._pollingTimer = window.clearTimeout(this._pollingTimer)), this._flashObj) if ("function" == typeof this._flashObj.callAsFunction) this.imgData && this.imgData.key == i.getKey() && this._refreshPriceData(t.priceList);
            else {
                var e = this;
                this._pollingTimer = setTimeout(function() {
                    e._startPollingCallFlash(t, i)
                },
                this.opts.pollingInterval)
            }
        },
        _refreshPriceData: function(t) {
            var i = [];
            s(t).each(function(t, e) {
                if (e.price) {
                    var s = i.length;
                    i.push({
                        id: t,
                        x: 10 * s,
                        y: 1 * e.price,
                        xVal: 0 == s || 6 == s ? e.date: "",
                        url: e.url
                    })
                }
                return i.length > 6 ? !1 : void 0
            }),
            this._flashObj.callAsFunction(i, this.opts.flashOptions)
        },
        _initFlash: function() {
            this.elements.priceFlash.flash({
                id: "wChart",
                name: "wChart",
                width: "262",
                height: "190",
                ver: "9.0.28",
                errorMessage: "请下载最新的Flash播放器！",
                swf: "/static/flash/wChart.swf",
                bgcolor: "#ffffff",
                wmode: "transparent",
                allowScriptAccess: "always",
                vars: {}
            });
            var t = this.elements.priceFlash.find("object");
            if (this._flashObj = t.length ? t.get(0) : null, !window.wChartFlash) {
                var i = this;
                window.wChartFlash = new e,
                window.wChartFlash.on("priceLinkClick",
                function(t) {
                    var e = i.propData.priceList || [],
                    s = e && e[t.index];
                    l.send("5.15", {
                        tag: "card",
                        fm: i.opts.logKey,
                        site: encodeURIComponent(s && s.url || ""),
                        seq: i.opts.logIndex || ""
                    })
                })
            }
        }
    }),
    s.extend(e.prototype, a, {
        nodeClicked: function(t) {
            this.fire("priceLinkClick", {
                index: t
            })
        }
    }),
    i
});;
/*!searchdetail:widget/ui/controls/card/lvyouluxian/lvyouluxian.js*/
define("searchdetail:widget/ui/controls/card/lvyouluxian/lvyouluxian",
function(t) {
    function e(t, e) {
        e = i.extend({
            dataKey: "",
            itemTpl: ['<li class="lvyouluxian-item">', '<a class="lvyouluxian-title" href="" target="_blank"></a>', '<span class="price"><span style="font-size:14px;margin-right:-2px;">￥</span><em></em><span style="font-size:12px;">起</span></span>', "</li>"].join(""),
            tpl: ['<div class="card-box lvyouluxian-card">', '<h5 class="card-title"><i class="sticker"></i><span class="text">路线推荐</span><i class="close"></i></h5>', '<div class="card-content">', '<h6><a class="title" target="_blank"></a><span class="src-site">(来自：<a href="" target="_blank"></a>)</span></h6>', '<ul class="clearfix list">', "</ul>", '<a class="morebtn" href="" target="_blank">更多路线&gt;</a>', "</div>", "</div>"].join("")
        },
        e),
        t = i.extend({
            contentTitle: "h6 .title",
            srcSite: "h6 .src-site a",
            list: ".list",
            moreLink: ".morebtn"
        },
        t),
        a.call(this, t, e)
    }
    var i = t("common:widget/ui/base/base"),
    a = (t("common:widget/ui/utils/utils"), t("common:widget/ui/base/events"), t("searchdetail:widget/ui/utils/lib"), t("searchdetail:widget/ui/utils/imghelper"), t("searchdetail:widget/ui/controls/card/base/asyncard"));
    return i.extend(e.prototype, a.prototype, {
        resetContent: function() {
            var t = this.elements.list;
            t && t.html('<li class="card-loading"></li>')
        },
        renderContent: function(t) {
            var e = i("<ul></ul>"),
            a = this,
            l = this.elements;
            i(t.lineList).each(function(t, l) {
                if (t > 2) return ! 1;
                var s = i(a.opts.itemTpl).appendTo(e),
                n = s.find(".lvyouluxian-title"),
                r = s.find(".price em");
                r.text(l.realPrice || l.price);
                var c = "<" + l.style + ">",
                o = l.title.replace(c, "");
                n.text(c + l.duration + o).attr("title", o).attr("href", l.linkUrl)
            }),
            l.contentTitle.text(t.fromPlace + "—" + t.toPlace).attr("href", t.moreUrl),
            l.srcSite.text(t.srcSite).attr("href", t.srcUrl),
            l.moreLink.attr("href", t.moreUrl),
            l.list.empty().append(e.children()),
            this.$element.show(),
            l.list.find(".lvyouluxian-item").each(function(t, e) {
                e = i(e),
                e.find(".lvyouluxian-title").width(Math.max(0, e.width() - e.find(".price").width() - 15))
            })
        }
    }),
    e
});;
/*!searchdetail:widget/ui/controls/card/materialinfo/materialinfo.js*/
define("searchdetail:widget/ui/controls/card/materialinfo/materialinfo",
function(t) {
    function i(t, i) {
        i = e.extend({
            dataKey: "sucai_info",
            itemTpl: ["<li>", '<p class="size-info">', '<span class="info-text info-type"></span>', '<span class="vsep">|</span><span class="info-text info-dpi"></span>', '<span class="vsep">|</span><span class="info-text info-size"></span>', '<span class="vsep">|</span><span class="info-text info-bytes"></span>', "</p>", '<p class="url-info">', '<a class="cardbtn cardbtn-small linkbtn" href="javascript:void(0);" target="_blank">前往下载</a>', '<a class="src-site" href="" target="_blank">（来自：<span></span>）</a>', "</p>", "</li>"].join(""),
            tpl: ['<div class="card-box materialinfo-card">', '<h5 class="card-title"><i class="sticker"></i><span class="text">素材下载</span><i class="close"></i></h5>', '<div class="card-content">', '<ul class="info-list">', "</ul>", "</div>", "</div>"].join("")
        },
        i),
        this._validData = null,
        t = e.extend({
            list: ".info-list"
        },
        t),
        l.call(this, t, i)
    }
    var e = t("common:widget/ui/base/base"),
    s = t("common:widget/ui/utils/utils"),
    a = (t("common:widget/ui/base/events"), t("searchdetail:widget/ui/utils/lib")),
    n = t("searchdetail:widget/ui/utils/imghelper"),
    l = t("searchdetail:widget/ui/controls/card/base/base");
    return e.extend(i.prototype, l.prototype, {
        checkState: function(t) {
            var i = l.prototype.checkState.call(this, t);
            if (i.hasContent && i.changed) {
                var s = this;
                this._validData = e(i.dataObj).filter(function(t, i) {
                    return i.fm ? s.isEmpty(i.w) && s.isEmpty(i.dpi) && s.isEmpty(i.filesize) ? !1 : !0 : !1
                }),
                i.hasContent = !(!this._validData || !this._validData.length)
            }
            return i
        },
        isEmpty: function(t) {
            return ! t || "0" == t
        },
        updateView: function(t) {
            var i, l = e("<ul></ul>"),
            p = this;
            e(t).each(function(t, o) {
                if (t > 1) return ! 1;
                i = e(p.opts.itemTpl).appendTo(l);
                var r = i.find(".info-dpi"),
                c = i.find(".info-type"),
                d = i.find(".info-size"),
                f = i.find(".info-bytes");
                linkbtn = i.find(".linkbtn"),
                infoSite = i.find(".src-site"),
                infoExt = {
                    s: (o.w || "0") + "x" + (o.h || "0")
                },
                c.text(o.fm.toUpperCase()),
                r.text((o.dpi || "") + "dpi"),
                p.isEmpty(o.dpi) ? r.hide().prev().hide() : r.show().prev().show(),
                p.isEmpty(o.w) ? d.hide().prev().hide() : d.html(o.w + "&#215;" + o.h).prev().show();
                var h = 1 * (o.filesize || 0);
                h ? f.text(n.formatBytes(h).toUpperCase()).show().prev().show() : f.hide().prev().hide(),
                linkbtn.attr("href", o.furl);
                var u = o.siteName || a.getSiteName(o.site);
                infoSite.attr("href", "http://" + o.site).find("span").text(s.cutHtmlText(u, 14, "...")),
                i.find("a").attr("log-ext", e.json.stringify(infoExt))
            }),
            this.elements.list.empty().append(l.children())
        }
    }),
    i
});;
/*!searchdetail:widget/ui/controls/card/nsAdII_bottomBanner/bottomBanner.js*/
define("searchdetail:widget/ui/controls/card/nsAdII_bottomBanner/bottomBanner",
function(t) {
    function e(t, e) {
        e = a.extend({
            pn: -1,
            spn: -1,
            bottomBannerTpl: ['<a href="${targetUrl}" target="_blank" log-click="p=10.1010101&as=${brandName}&pos=${index}&subpos=0&matcont=${imageUrl}&time=${adTime}&tgTo=1">', '<img src="${imageUrl}" style="width: 100%"></img>', "</a>"].join(""),
            tpl: ['<div class="card-box bottom-banner-card">', '<div class="card-content">', "</div>", '<span class="tuiguang-btn">广告</span>', '<div class="tuiguang-info"></div>', "</div>"].join(""),
            layerTpl1: ['<p>本搜索结果为<a target="_blank" href="http://e.baidu.com/">商业推广</a>信息，请注意可能的风险。百度推出', '<a target="_blank" href="http://baozhang.baidu.com/guarantee/">网民权益保障计划</a>，', '<a target="_blank" href="https://passport.baidu.com/">登录</a>搜索有保障。</p>'].join(""),
            layerTpl2: ['<p>本搜索结果为<a target="_blank" href="http://e.baidu.com/">商业推广</a>信息，请注意可能的风险。', '您当前为登录状态，已参加<a target="_blank" href="http://baozhang.baidu.com/guarantee/">网民权益保障计划</a>。'].join("")
        },
        e),
        t = a.extend({
            bannerBox: ".banner-box"
        },
        t),
        i.call(this, t, e)
    }
    var a = t("common:widget/ui/base/base"),
    n = (t("common:widget/ui/utils/utils"), t("common:widget/ui/base/events"), t("searchdetail:widget/ui/utils/lib"), t("searchdetail:widget/ui/utils/imghelper"), t("common:widget/ui/juicer/juicer")),
    i = t("searchdetail:widget/ui/controls/card/base/base"),
    o = t("searchdetail:widget/ui/statistic/statistic-core");
    return a.extend(e.prototype, i.prototype, {
        getDataByPosId: function(t, e) {
            if (!t || !e) return null;
            for (var a = null,
            n = 0; n < e.length; n++) e[n].Tag === t && (a = e[n]);
            return a
        },
        checkState: function(t) {
            var e = "pc_detail_slider_right_bottom_banner",
            a = this.getDataByPosId(e, t.fbResult),
            t = this.getDataByPosId(e, this.opts.nsAdData),
            n = !!a || !!t;
            return {
                hasContent: n,
                changed: n,
                dataObj: []
            }
        },
        addSpread: function(t) {
            var e = this,
            n = a(".bottom-banner-card").find(".tuiguang-btn"),
            i = a(".bottom-banner-card").find(".tuiguang-info"),
            o = !t.get("userName");
            i.append(o ? e.opts.layerTpl1: e.opts.layerTpl2),
            i.css("display", "none"),
            n.off("click"),
            i.off("click"),
            i.off("hover"),
            n.on("click",
            function() {
                i.show()
            }),
            e.clickTips = setTimeout(function() {
                i.hide()
            },
            4e3),
            i.hover(function() {
                i.show(),
                clearTimeout(e.clickTips)
            },
            function() {
                e.clickTips = setTimeout(function() {
                    i.hide()
                },
                4e3)
            }),
            i.on("click",
            function() {
                i.hide()
            })
        },
        updateView: function(t, e) {
            var a = this,
            i = "pc_detail_slider_right_bottom_banner",
            s = this.getDataByPosId(i, t.fbResult) || this.getDataByPosId(i, this.opts.nsAdData),
            r = s.Items[0].Images,
            d = (new Date).toLocaleString(),
            c = s.Items[0].BrandName,
            l = {
                brandName: c,
                imageUrl: r[0].ImageUrl,
                targetUrl: r[0].AdLink,
                index: i,
                adTime: d
            }; (this.opts.pn !== e.get("pn") || this.opts.spn !== e.get("spn")) && (this.opts.pn = e.get("pn"), this.opts.spn = e.get("spn"), o.send("10.1010100", {
                as: c,
                pos: i,
                subpos: "0",
                shownum: "1",
                matcont: l.imageUrl,
                materialNum: "1"
            })),
            this.elements.content.empty().append(n(a.opts.bottomBannerTpl, l)),
            a.addSpread(e)
        }
    }),
    e
});;
/*!searchdetail:widget/ui/controls/card/nsAdII_consult/consult.js*/
define("searchdetail:widget/ui/controls/card/nsAdII_consult/consult",
function(t) {
    function a(t, a) {
        a = s.extend({
            pn: -1,
            spn: -1,
            consultTpl: ['<a href="${targetUrl}" class="consult-card" target="_blank" log-click="p=10.1010101&as=${brandName}&pos=${index}&subpos=0&matcont=${adDesc}&time=${adTime}&tgTo=1">', '<span class="consult-info">${adDesc}</span>', '<span class="consult-btn">立即咨询</span>', "</a>"].join(""),
            tpl: ['<div class="card-box consult-card-box">', '<h5 class="card-title">', '<i class="sticker"></i>', '<span class="text">咨询</span>', '<span class="tuiguang-spread">广告</span>', '<i class="close"></i>', "</h5>", '<div class="consult-card-content">', "</div>", "</div>"].join(""),
            layerTpl1: ['<div class="spread-layer" id="spread-layer">', '<p>本搜索结果为<a target="_blank" href="http://e.baidu.com/">商业推广</a>信息，请注意可能的风险。百度推出', '<a target="_blank" href="http://baozhang.baidu.com/guarantee/">网民权益保障计划</a>，', '<a target="_blank" href="https://passport.baidu.com/">登录</a>搜索有保障。</p>', "</div>"].join(""),
            layerTpl2: ['<div class="spread-layer" id="spread-layer">', '<p>本搜索结果为<a target="_blank" href="http://e.baidu.com/">商业推广</a>信息，请注意可能的风险。', '您当前为登录状态，已参加<a target="_blank" href="http://baozhang.baidu.com/guarantee/">网民权益保障计划</a>。', "</div>"].join("")
        },
        a),
        t = s.extend({
            consultContent: ".consult-card-content"
        },
        t),
        n.call(this, t, a)
    }
    var s = t("common:widget/ui/base/base"),
    e = (t("common:widget/ui/utils/utils"), t("common:widget/ui/base/events"), t("searchdetail:widget/ui/utils/lib"), t("searchdetail:widget/ui/utils/imghelper"), t("common:widget/ui/juicer/juicer")),
    n = t("searchdetail:widget/ui/controls/card/base/base"),
    i = t("searchdetail:widget/ui/statistic/statistic-core");
    return s.extend(a.prototype, n.prototype, {
        getDataByPosId: function(t, a) {
            if (!t || !a) return null;
            for (var s = null,
            e = 0; e < a.length; e++) a[e].Tag === t && (s = a[e]);
            return s
        },
        checkState: function(t) {
            var a = this.getDataByPosId("pc_detail_slider_right_consult", t.fbResult) || this.getDataByPosId("pc_detail_slider_right_consult", this.opts.nsAdData),
            s = !!a;
            return {
                hasContent: s,
                changed: s,
                dataObj: []
            }
        },
        addSpread: function(t) {
            var a = this,
            e = s(".consult-card-box").find(".tuiguang-spread"),
            n = !t.get("userName"),
            i = 0; ! s("#spread-layer").length && s("#wrapper").append(n ? a.opts.layerTpl1: a.opts.layerTpl2);
            var o = s("#spread-layer");
            o.css("display", "none"),
            e.off("click"),
            o.off("click"),
            s("#sider").off("scroll"),
            e.on("click",
            function() {
                i = e.offset().top - e.height() / 2,
                o.css("top") !== i + "px" && (o.hide(), o.css("top", i)),
                o.toggle(),
                "block" === o.css("display") && (a.clickTips = setTimeout(function() {
                    o.css("display", "none")
                },
                4e3))
            }),
            o.on("click",
            function() {
                o.toggle()
            }),
            s("#sider").scroll(function() {
                o.css("top", e.offset().top - e.height() / 2)
            })
        },
        updateView: function(t, a) {
            var s = this,
            n = "pc_detail_slider_right_consult",
            o = this.getDataByPosId(n, t.fbResult) || this.getDataByPosId(n, this.opts.nsAdData),
            c = (new Date).toLocaleString(),
            l = o.Items[0].Images,
            d = o.Items[0].BrandName,
            r = {
                brandName: d,
                adDesc: l[0].AdTitle || l[0].AdDesc,
                targetUrl: l[0].AdLink,
                index: n,
                adTime: c
            }; (this.opts.pn !== a.get("pn") || this.opts.spn !== a.get("spn")) && (this.opts.pn = a.get("pn"), this.opts.spn = a.get("spn"), i.send("10.1010100", {
                as: d,
                pos: n,
                subpos: "0",
                shownum: "1",
                matcont: r.adDesc,
                materialNum: "1"
            })),
            this.elements.consultContent.empty().append(e(s.opts.consultTpl, r)),
            s.addSpread(a)
        }
    }),
    a
});;
/*!searchdetail:widget/ui/controls/card/nsAdII_cpl/city.js*/
define("searchdetail:widget/ui/controls/card/nsAdII_cpl/city",
function(i) {
    function t(i) {
        this.$container = i.container,
        this.onchange = i.onchange,
        this.cities = i.cities,
        this.cats = i.cats,
        this.tpl = i.tpl,
        this.init = function() {
            this.$container.append(this.tpl),
            this.$cats = this.$container.find(".city-cats"),
            this.$list = this.$container.find(".city-list"),
            this.$city = this.$container.find(".city-value"),
            this.$cityPanel = this.$container.find(".city-panel"),
            this.$citySearchPanel = this.$container.find(".city-search-panel"),
            this.$searchList = this.$container.find(".city-search-list"),
            this.$cityButton = this.$container.find(".city-shadow"),
            this.$yearPanel = s(".year-panel"),
            this.$city.click(this.showPanel.bind(this)),
            this.$cityButton.click(this.showPanel.bind(this)),
            this.$city.on("change, keyup", this.query.bind(this)),
            this.$list.on("click", "a", this.select.bind(this)),
            this.$searchList.on("click", "a", this.select.bind(this)),
            s(document).click(this.hide.bind(this)),
            this.$container.click(function(i) {
                var t = s(".year-panel");
                i.stopPropagation(),
                t.hide()
            });
            for (var i = 0; i < this.cities.length; i++) this.cities[i].index = i;
            this.render()
        },
        this.render = function() {
            this.$cats.html(s.map(this.cats,
            function(i, t) {
                return '<a href="javascript:void(0)" data-index="' + t + '">' + i.label + "</a>"
            }).join("")),
            this.$cats.on("click", "a", this.changeCat.bind(this)),
            this.changeCat()
        },
        this.filter = function(i) {
            for (var t = [], s = 0; s < this.cities.length; s++) {
                var e = this.cities[s];
                if ("hot" === i) null != e.h && e.h < 100 && t.push(e);
                else {
                    var n = e.spy.substring(0, 1);
                    n === i && t.push(e)
                }
            }
            return t
        },
        this.query = function() {
            var i = [],
            t = s.trim(this.$city.val());
            if (this.$container.find(".query").text(t), !t) return this.$cityPanel.show(),
            this.$citySearchPanel.hide(),
            void this.$city.removeClass("emptyTip");
            this.$cityPanel.hide(),
            this.$citySearchPanel.show();
            for (var e = 0; e < this.cities.length; e++) {
                var n = this.cities[e]; (0 === n.py.indexOf(t) || 0 === n.spy.indexOf(t) || 0 === n.scn.indexOf(t)) && i.push(n)
            }
            this.$searchList.html(s.map(i,
            function(i) {
                return ['<a href="javascript:void(0)" data-index="', i.index, '"><span class="py">', i.py, '</span><span class="name">', i.scn, "</span></a>"].join("")
            }).join("")),
            this.$citySearchPanel.toggleClass("empty", 0 === i.length),
            t && this.$city.toggleClass("emptyTip", 0 === i.length)
        },
        this.select = function(i) {
            var t = s(i.currentTarget).data("index");
            this.currentCity = this.cities[t],
            this.$city.val(this.currentCity.scn),
            this.$cityPanel.hide(),
            this.$citySearchPanel.hide(),
            this.$city.hasClass("active") && this.$city.removeClass("active"),
            this.$city.next(".holder").hide(),
            this.onchange && this.onchange(this.currentDistrict())
        },
        this.changeCat = function(i) {
            var t = i ? s(i.currentTarget).data("index") : 0;
            this.$cats.find(".selected").removeClass("selected"),
            this.$cats.find(":nth-child(" + (t + 1) + ")").addClass("selected");
            var e = this.cats[t];
            if ("hot" === e.filter) {
                var n = s.map(this.filter("hot"),
                function(i) {
                    return ['<a href="javascript:void(0)" data-index="', i.index, '">', i.scn, "</a>"].join("")
                }).join("");
                this.$list.html(['<div class="row">', n, "</div>"].join(""))
            } else {
                for (var c = e.filter.split(","), h = [], a = 0; a < c.length; a++) {
                    var r = c[a];
                    h.push({
                        label: r.toUpperCase(),
                        children: s.map(this.filter(r),
                        function(i) {
                            return ['<a href="javascript:void(0)" data-index="', i.index, '">', i.scn, "</a>"].join("")
                        }).join("")
                    })
                }
                this.$list.html(s.map(h,
                function(i) {
                    return ['<div class="row"><label>', i.label, '</label><div class="content">', i.children, "</div></div>"].join("")
                }).join(""))
            }
        },
        this.showPanel = function() {
            this.$cityPanel.toggle("fast"),
            this.$city.toggleClass("active"),
            this.$city.hasClass("emptyTip") && this.$city.removeClass("emptyTip"),
            this.$citySearchPanel.hide(),
            this.$city.next(".holder").hide()
        },
        this.currentDistrict = function() {
            return this.currentCity ? {
                cityCode: this.currentCity.cc,
                provinceCode: this.currentCity.pc,
                carLicence: this.currentCity.carnum,
                cityName: this.currentCity.scn
            }: null
        },
        this.hide = function() {
            this.$citySearchPanel.hide(),
            this.$cityPanel.hide(),
            this.$city.hasClass("active") && this.$city.removeClass("active"),
            !this.$city.val() && this.$city.next(".holder").show()
        }
    }
    var s = i("common:widget/ui/base/base");
    return t
});;
/*!searchdetail:widget/ui/controls/card/nsAdII_cpl/cpl.js*/
define("searchdetail:widget/ui/controls/card/nsAdII_cpl/cpl",
function(require, exports, module) {
    function cplCardControl(a, s) {
        s = $.extend({
            adPosId: "pc_detail_slider_right_cpl",
            showCount: 1,
            dataKey: "",
            itemTpl: '<div class="card-box cpl-card">\n<h5 class="card-title"><i class="sticker"></i><span class="text">相关推广</span><i class="close"></i></h5>\n<h5 class="card-Logo">\n<img class="cardLogo" src="${logo}"/>\n<span class="tuiguang-hint" id="tuiguang-hint">商业推广</span>\n</h5>\n<div class="introduce">\n<p class="introduce-text"><span class="block block1"></span><span>${desc1}</span></p>\n<p class="introduce-text"><span span class="block block2"></span><span>${desc2}</span></p>\n</div>\n<div class="cpl-car-insurance">\n<table>\n<tbody>\n<tr>\n<td class="cpl-car-insurance-input">\n<div class="cpl-car-insurance-city cpl-car-insurance-input-div">\n<input type="text" class="city-value" id="city-value" data-pc="" data-cc="" placeholder=""/>\n<span class="holder"><span class="placeholder">行驶城市</span><span class="required-select">*</span></span>\n<span class="shadow city-shadow"></span>\n</div>\n</td>\n<td class="cpl-car-insurance-input cpl-car-insurance-input-num">\n<div class="cpl-car-insurance-num cpl-car-insurance-input-div">\n<input type="text" class="num-value" id="num-value" placeholder=""/>\n<span class="holder"><span class="placeholder">车牌号</span><span class="required-select">*</span></span>\n</div>\n</td>\n<td class="cpl-car-insurance-input cpl-car-insurance-input-year">\n<div class="cpl-car-insurance-year cpl-car-insurance-input-div">\n<input type="text" class="year-value" id="year-value" readonly="readonly" placeholder=""/>\n<span class="holder"><span class="placeholder">购车年份</span></span>\n<span class="shadow year-shadow"></span>\n<div class="year-panel">\n<div class="year-list">\n</div>\n</div>\n</div>\n</td>\n</tr>\n<tr>\n<td class="cpl-car-insurance-input">\n<div class="cpl-car-insurance-carPrice cpl-car-insurance-input-div">\n<input type="text" class="carPrice-value" id="carPrice-value" placeholder="" />\n<span class="holder"><span class="placeholder">车价</span><span class="required-select">*</span></span>\n<span class="carPrice-unit">万元</span>\n<div class="cpl-car-insurance-carPrice-show">\n</div>\n</div>\n</td>\n<td class="cpl-car-insurance-input">\n<div class="cpl-car-insurance-phoneNum cpl-car-insurance-input-div">\n<input type="text" class="phoneNum-value" id="phoneNum-value" placeholder=""/>\n<span class="holder"><span class="placeholder">手机号码（授权）</span><span class="required-select">*</span></span>\n<div class="cpl-car-insurance-phoneNum-show">\n</div>\n</div>\n</td>\n</tr>\n</tbody>\n</table>\n<div class="checkfail-tip">\n<div class="checkfail-tip-sign">\n<span id="checkfail-remind-i">!</span>\n</div>\n<span class="checkfail-tip-message">请选择行驶城市</span>\n</div>\n<div style="position: relative;">\n<button class="cpl-car-insurance-calc">快速试算</button>\n<span class="cpl-car-insurance-calc-text">参考报价：</span>\n<span class="cpl-car-insurance-calc-price">￥0</span>\n<a class="cpl-car-insurance-calc-link" href="${url}" target="_blank">查看精准报价></a>\n</div>\n</div>\n<div class="remind-message">\n<span>以上信息将仅授权${company}公司车险报价使用</span>\n<div class="remind-message-sign">\n<span id="cpl-remind-i">i</span>\n</div>\n</div>\n<div class="tuiguang-tip-container">\n<div class="tuiguang-tip">\n<h3 class="tuiguang-tip-title">\n商业推广</h3>\n<div class="tuiguang-tip-info">\n本搜索结果为商业推广信息，请注意可能的风险。<br>\n百度推出<a href="http://baozhang.baidu.com/guarantee/" target="_blank">网民权益保障计划</a>，<a href="https://passport.baidu.com/v2/?login" target="_blank">登录</a>搜索有保障。</div>\n<div class="tuiguang-tip-arrow">\n<em></em>\n<ins></ins>\n</div>\n</div>\n</div>\n<div class="remind-tip">\n<div class="remind-tip-info">\n本保险报价服务由${company}提供，您在报价表单中填写的所有信息仅${company}有权使用，${company}可能会根据业务需要与您联系。</div>\n<div class="remind-tip-arrow">\n<em></em>\n<ins></ins>\n</div>\n</div>\n</div>\n',
            tpl: '<div><div class="cpl"></div></div>'
        },
        s),
        a = $.extend({
            cnt: ".cpl"
        },
        a),
        BaseCardControl.call(this, a, s)
    }
    var $ = require("common:widget/ui/base/base"),
    events = require("common:widget/ui/base/events"),
    lib = require("searchdetail:widget/ui/utils/lib"),
    imghelper = require("searchdetail:widget/ui/utils/imghelper"),
    juicer = require("common:widget/ui/juicer/juicer"),
    BaseCardControl = require("searchdetail:widget/ui/controls/card/base/base"),
    statistic = require("searchdetail:widget/ui/statistic/statistic-core"),
    CityControl = require("searchdetail:widget/ui/controls/card/nsAdII_cpl/city");
    return $.extend(cplCardControl.prototype, BaseCardControl.prototype, {
        checkState: function(a) {
            var s = this,
            e = this.getDataByPosId("pc_detail_slider_right_cpl", this.opts.verticalAdData),
            n = !this.opts.nsAdData && !a.fbResult && !!e;
            return n && (s.opts.showCount > 5 ? (n = !1, $("#adCard").children().show()) : (s.opts.showCount++, $("#adCard").children().hide())),
            {
                hasContent: n,
                changed: n,
                dataObj: []
            }
        },
        getData: function(a, s, e, n) {
            for (var c = !1,
            i = 0; i < a.length; i++) {
                var t = a[i];
                if (t[s] === e) return t[n]
            }
            return c
        },
        getDataFromInterval: function(a, s, e, n) {
            var c = !1;
            a.length && (c = a[0]);
            for (var i = 0; i < a.length; i++) {
                var t = a[i];
                if ("E" === t[e]) {
                    if (t[s] <= n) return t
                } else if (t[s] <= n && n < t[e]) return t
            }
            return c
        },
        calcRiskFee: function() {
            var a = this,
            s = $(".cpl-car-insurance-calc-price"),
            e = $(".cpl-car-insurance-calc-text"),
            n = $(".cpl-car-insurance-calc-link"),
            c = $(".year-value"),
            i = $(".carPrice-value"),
            t = $(".city-value").data("pc"),
            l = "110000",
            p = c.val() ? parseInt(c.val()) : 2015,
            r = 2016 - p,
            d = 1e4 * parseFloat(i.val()),
            o = 30,
            u = a.getData(a.getData(a.opts.cplMessage.riskFee, "company", a.opts.cplMessage.corp, "p_items"), "pc", t, "p_fee");
            u = u ? u: a.getData(a.getData(a.opts.cplMessage.riskFee, "company", a.opts.cplMessage.corp, "p_items"), "pc", l, "p_fee");
            var h = a.getDataFromInterval(a.getData(u, "Risk_Type", "comprehensive_risk", "items"), "year_min", "year_max", r),
            v = a.getDataFromInterval(a.getData(u, "Risk_Type", "TPL", "items"), "payment_price_min", "payment_price_max", o),
            m = a.getData(u, "Risk_Type", "BOL", "items"),
            g = (a.getData(u, "Risk_Type", "robbery_Insurance", "base_rate"), a.getData(u, "Risk_Type", "glass_Insurance", "China_rate"), h.base_fee + (d * h.rate + 1e4 * m[0] + 4e4 * m[1]) / 100 + v.fee);
            s.empty().text("￥" + parseInt(g)),
            s.addClass("cpl-car-insurance-calc-test"),
            e.addClass("cpl-car-insurance-calc-test"),
            n.show(),
            statistic.send("10.1010100", {
                as: a.opts.brandName,
                pos: a.opts.adPosId,
                subpos: "0",
                shownum: "1",
                matcont: n.attr("href"),
                SampleID: a.opts.SampleID,
                SampleTag: a.opts.SampleTag
            }),
            statistic.send("10.1010100", {
                as: a.opts.brandName,
                pos: a.opts.adPosId,
                subpos: "0",
                shownum: "1",
                matcont: "referencePrice",
                SampleID: a.opts.SampleID,
                SampleTag: a.opts.SampleTag
            }),
            statistic.send("10.1010100", {
                company: a.opts.brandName,
                adChannel: "百度图搜",
                device: "PC",
                cityName: $(".city-value").data("scn"),
                cityCode: $(".city-value").data("cc"),
                carNum: $(".num-value").val(),
                carPrice: d,
                carYear: p,
                phoneNum: $(".phoneNum-value").val(),
                SampleID: a.opts.SampleID,
                SampleTag: a.opts.SampleTag
            })
        },
        checkInit: function() {
            var a = this,
            s = [$(".city-value"), $(".carPrice-value"), $(".phoneNum-value")],
            e = [134, 135, 136, 137, 138, 139, 147, 150, 151, 152, 157, 158, 159, 178, 182, 183, 184, 187, 188, 130, 131, 132, 145, 155, 156, 171, 175, 176, 185, 186, 133, 149, 153, 173, 177, 180, 181, 189, 170],
            n = [],
            c = [],
            i = "",
            t = "";
            i = "/^" + $(".city-value").data("scn") + "$/",
            c.push(i),
            i = "/^(?!0$)([1-9][0-9]{0,1}|[1-9][0-9][0-8]|0)(\\.(?![0]+$)[0-9]+)?$/",
            c.push(i);
            for (var l = 0; l < e.length - 1; l++) t += e[l] + "[0-9]|";
            t += e[l] + "[0-9]",
            i = "/^(" + t + ")\\d{7}$/",
            c.push(i),
            "axatp" === a.opts.cplMessage.corp && (s.push($(".num-value")), i = "/^[\\u4e00-\\u9fa5][A-Za-z].{5}$/", c.push(i));
            for (var l = 0; l < s.length; l++) n.push({
                checkItem: s[l],
                state: 0
            });
            a.opts.checkList = n,
            a.opts.ruleList = c
        },
        check: function() {
            for (var me = this,
            failList = [], failNum = 0, checkListLen = me.opts.checkList.length, checkTip = $(".checkfail-tip"), checkTipText = "", i = 0; checkListLen > i; i++) {
                var item = me.opts.checkList[i];
                item.checkItem.val() ? item.state = 1 : (failList.push(item), !item.checkItem.hasClass("wrongTip") && item.checkItem.addClass("wrongTip"))
            }
            if (0 !== failList.length) {
                if (1 === failList.length) switch (failList[0].checkItem.attr("id")) {
                case "city-value":
                    checkTipText = "请选择行驶城市";
                    break;
                case "num-value":
                    checkTipText = "请输入车牌号码";
                    break;
                case "carPrice-value":
                    checkTipText = "请输入购车价格";
                    break;
                case "phoneNum-value":
                    checkTipText = "请输入手机号码";
                    break;
                default:
                    checkTipText = "请输入有效信息"
                } else checkTipText = "请输入有效信息";
                return checkTip.find(".checkfail-tip-message").empty().text(checkTipText),
                checkTip.show(),
                !1
            }
            for (var i = 0; checkListLen > i; i++) {
                var item = me.opts.checkList[i],
                patrn = me.opts.ruleList[i];
                eval(patrn).test(item.checkItem.val()) ? item.state = 2 : (failList.push(item), !item.checkItem.hasClass("wrongTip") && item.checkItem.addClass("wrongTip"))
            }
            return 0 !== failList.length ? (checkTipText = "请输入有效信息", checkTip.find(".checkfail-tip-message").empty().text(checkTipText), checkTip.show(), !1) : !0
        },
        yearSelect: function(a) {
            var s = [];
            if (a) {
                for (var e = a.find(".year-value"), n = a.find(".year-panel"), c = a.find(".year-shadow"), i = a.find(".year-list"), t = 2006; 2016 >= t; t++) s.push(['<a href="javascript:void(0)">', t, "</a>"].join(""));
                i && i.empty().append(s.join("")),
                e.click(function() {
                    e.toggleClass("active"),
                    n.toggle("fast"),
                    e.next(".holder").hide()
                }),
                c.click(function() {
                    e.toggleClass("active"),
                    n.toggle("fast"),
                    e.next(".holder").hide()
                }),
                a.on("click", "a",
                function(a) {
                    e.val($(a.target).text()),
                    n.hide(),
                    e.hasClass("active") && e.removeClass("active")
                }),
                $(document).click(function() {
                    n.hide(),
                    !e.val() && e.next(".holder").show(),
                    e.hasClass("active") && e.removeClass("active")
                }),
                a.click(function(a) {
                    a.stopPropagation(),
                    $(".city-panel").hide()
                })
            }
        },
        onchange: function(a) {
            var s = $(".num-value");
            a && s && a.carLicence && s.val(a.carLicence),
            a && s && a.carLicence && s.next(".holder").hide(),
            a && a.provinceCode && this.$city.data("pc", a.provinceCode),
            a && a.cityCode && this.$city.data("cc", a.cityCode),
            a && a.cityName && this.$city.data("scn", a.cityName)
        },
        bind: function() {
            var a = this,
            s = $("#tuiguang-hint"),
            e = $(".tuiguang-tip"),
            n = $(".remind-message-sign"),
            c = $(".remind-tip"),
            i = $(".cpl-car-insurance-calc"),
            t = $(".checkfail-tip"),
            l = $(".cpl-car-insurance-calc-price"),
            p = $(".cpl-car-insurance-calc-text"),
            r = $(".cpl-car-insurance-calc-link");
            $(".cpl-car-insurance-input-div input").focus(function(a) { ! $(a.target).hasClass("city-value") && !$(a.target).hasClass("year-value") && $(a.target).addClass("active"),
                $(".cpl-car-insurance-input-div input").removeClass("wrongTip"),
                t.hide(),
                l.empty().text("￥0"),
                r.hide(),
                l.removeClass("cpl-car-insurance-calc-test"),
                p.removeClass("cpl-car-insurance-calc-test"),
                $(a.target).next(".holder").hide()
            }),
            $(".cpl-car-insurance-input-div input").blur(function(a) { ! $(a.target).hasClass("city-value") && !$(a.target).hasClass("year-value") && $(a.target).removeClass("active"),
                !($(a.target).hasClass("city-value") || $(a.target).hasClass("year-value")) && !$(a.target).val() && $(a.target).next(".holder").show()
            }),
            $(".holder").click(function(a) {
                $(a.target).parent(".holder").prev().focus().click()
            }),
            s.click(function(a) {
                a.stopPropagation(),
                e.toggle()
            }),
            $(document).click(function() {
                e.hide()
            }),
            e.click(function(a) {
                a.stopPropagation()
            }),
            n.hover(function() {
                c.toggle()
            }),
            i.click(function() {
                statistic.send("10.1010101", {
                    as: a.opts.brandName,
                    pos: a.opts.adPosId,
                    subpos: "0",
                    matcont: "button",
                    SampleID: a.opts.SampleID,
                    SampleTag: a.opts.SampleTag
                }),
                a.checkInit(),
                a.check() && a.calcRiskFee()
            }),
            $(".cpl-car-insurance-calc-link").click(function() {
                statistic.send("10.1010101", {
                    as: a.opts.brandName,
                    pos: a.opts.adPosId,
                    subpos: "0",
                    matcont: "精准报价",
                    tgTo: 1,
                    SampleID: a.opts.SampleID,
                    SampleTag: a.opts.SampleTag
                })
            })
        },
        renderHtml: function(a, s) {
            var e = this;
            e.elements.cnt.empty().append(juicer(e.opts.itemTpl, s)),
            statistic.send("10.1010100", {
                as: e.opts.brandName,
                pos: e.opts.adPosId,
                subpos: "0",
                shownum: "1",
                matcont: "card",
                SampleID: e.opts.SampleID,
                SampleTag: e.opts.SampleTag
            }),
            e.yearSelect($(".cpl-car-insurance-year")),
            "axatp" === a.corp && ($(".cpl-car-insurance-input-num").show(), $(".cpl-car-insurance-input-year").hide());
            var n = new CityControl({
                container: $(".cpl-car-insurance-city"),
                onchange: e.onchange,
                cats: a.cats,
                cities: a[a.corp],
                tpl: '<div class="city-panel">\n<span class="tip">支持中文/拼音/简拼输入</span>\n<div class="city-cats"></div>\n<div class="city-list"></div>\n</div>\n<div class="city-search-panel">\n<div class="tip">查找更多城市请直接输入汉字或拼音</div>\n<div class="city-search-list"></div>\n<div class="error-tip">\n<span>很抱歉，未找到</span>\n<span class="highlight">“</span>\n<span class="query highlight"></span>\n<span class="highlight">”</span>\n<span>的城市</span><br>\n<span class="tip-bottom">请检查输入是否正确，若无误则城市不在投保范围内</span>\n</div>\n</div>\n'
            });
            n.init(),
            e.bind()
        },
        updateView: function() {
            var a, s = this;
            s.opts.itemTpl = '<div class="card-box cpl-card">\n<h5 class="card-title"><i class="sticker"></i><span class="text">相关推广</span><i class="close"></i></h5>\n<h5 class="card-Logo">\n<img class="cardLogo" src="${logo}"/>\n<span class="tuiguang-hint" id="tuiguang-hint">商业推广</span>\n</h5>\n<div class="introduce">\n<p class="introduce-text"><span class="block block1"></span><span>${desc1}</span></p>\n<p class="introduce-text"><span span class="block block2"></span><span>${desc2}</span></p>\n</div>\n<div class="cpl-car-insurance">\n<table>\n<tbody>\n<tr>\n<td class="cpl-car-insurance-input">\n<div class="cpl-car-insurance-city cpl-car-insurance-input-div">\n<input type="text" class="city-value" id="city-value" data-pc="" data-cc="" placeholder=""/>\n<span class="holder"><span class="placeholder">行驶城市</span><span class="required-select">*</span></span>\n<span class="shadow city-shadow"></span>\n</div>\n</td>\n<td class="cpl-car-insurance-input cpl-car-insurance-input-num">\n<div class="cpl-car-insurance-num cpl-car-insurance-input-div">\n<input type="text" class="num-value" id="num-value" placeholder=""/>\n<span class="holder"><span class="placeholder">车牌号</span><span class="required-select">*</span></span>\n</div>\n</td>\n<td class="cpl-car-insurance-input cpl-car-insurance-input-year">\n<div class="cpl-car-insurance-year cpl-car-insurance-input-div">\n<input type="text" class="year-value" id="year-value" readonly="readonly" placeholder=""/>\n<span class="holder"><span class="placeholder">购车年份</span></span>\n<span class="shadow year-shadow"></span>\n<div class="year-panel">\n<div class="year-list">\n</div>\n</div>\n</div>\n</td>\n</tr>\n<tr>\n<td class="cpl-car-insurance-input">\n<div class="cpl-car-insurance-carPrice cpl-car-insurance-input-div">\n<input type="text" class="carPrice-value" id="carPrice-value" placeholder="" />\n<span class="holder"><span class="placeholder">车价</span><span class="required-select">*</span></span>\n<span class="carPrice-unit">万元</span>\n<div class="cpl-car-insurance-carPrice-show">\n</div>\n</div>\n</td>\n<td class="cpl-car-insurance-input">\n<div class="cpl-car-insurance-phoneNum cpl-car-insurance-input-div">\n<input type="text" class="phoneNum-value" id="phoneNum-value" placeholder=""/>\n<span class="holder"><span class="placeholder">手机号码（授权）</span><span class="required-select">*</span></span>\n<div class="cpl-car-insurance-phoneNum-show">\n</div>\n</div>\n</td>\n</tr>\n</tbody>\n</table>\n<div class="checkfail-tip">\n<div class="checkfail-tip-sign">\n<span id="checkfail-remind-i">!</span>\n</div>\n<span class="checkfail-tip-message">请选择行驶城市</span>\n</div>\n<div style="position: relative;">\n<button class="cpl-car-insurance-calc">快速试算</button>\n<span class="cpl-car-insurance-calc-text">参考报价：</span>\n<span class="cpl-car-insurance-calc-price">￥0</span>\n<a class="cpl-car-insurance-calc-link" href="${url}" target="_blank">查看精准报价></a>\n</div>\n</div>\n<div class="remind-message">\n<span>以上信息将仅授权${company}公司车险报价使用</span>\n<div class="remind-message-sign">\n<span id="cpl-remind-i">i</span>\n</div>\n</div>\n<div class="tuiguang-tip-container">\n<div class="tuiguang-tip">\n<h3 class="tuiguang-tip-title">\n商业推广</h3>\n<div class="tuiguang-tip-info">\n本搜索结果为商业推广信息，请注意可能的风险。<br>\n百度推出<a href="http://baozhang.baidu.com/guarantee/" target="_blank">网民权益保障计划</a>，<a href="https://passport.baidu.com/v2/?login" target="_blank">登录</a>搜索有保障。</div>\n<div class="tuiguang-tip-arrow">\n<em></em>\n<ins></ins>\n</div>\n</div>\n</div>\n<div class="remind-tip">\n<div class="remind-tip-info">\n本保险报价服务由${company}提供，您在报价表单中填写的所有信息仅${company}有权使用，${company}可能会根据业务需要与您联系。</div>\n<div class="remind-tip-arrow">\n<em></em>\n<ins></ins>\n</div>\n</div>\n</div>\n';
            var e = this.getDataByPosId(s.opts.adPosId, this.opts.verticalAdData),
            n = e.Items[0].Images[0];
            s.opts.brandName = e.Items[0].BrandName,
            s.opts.SampleTag = e.SampleTag,
            s.opts.SampleID = e.SampleID;
            var c, i = e.Items[0].AdDesc; - 1 !== i.indexOf("<br/>") && (c = i.split("<br/>"));
            var t = {
                title: n.AdTitle,
                company: s.opts.brandName,
                logo: n.ImageUrl,
                desc1: c[0],
                desc2: c[1],
                url: n.AdLink
            };
            switch (t.company) {
            case "安盛天平":
                a = "axatp";
                break;
            default:
                a = "axatp"
            }
            s.opts.cplMessage ? s.renderHtml(s.opts.cplMessage, t) : require.async(["searchdetail:static/json/cplMessage"],
            function(e) {
                s.opts.cplMessage = {
                    cats: e.cats,
                    cities: e.cities,
                    axatp: e.axatp,
                    corp: a,
                    riskFee: e.riskFee
                },
                s.renderHtml(s.opts.cplMessage, t)
            })
        }
    }),
    cplCardControl
});;
/*!searchdetail:widget/ui/controls/card/nsAdII_leftAnchor/tplConf.js*/
define("searchdetail:widget/ui/controls/card/nsAdII_leftAnchor/tplConf",
function(a, n, s) {
    var i = {
        0 : '<div class="dutu-anchor auto" title="" data-width="${width}"  data-x="${anchorX}" data-y="${anchorY}" style="display: block; left: ${left}px; top: ${top}px;">\n<span class="ic">\n<span class="ic-bg-new"></span><i class="downloadoptimize"></i></span>\n<a target="_blank" herf="${adLink}" log-click="p=10.1010101&as=${brandName}&pos=${index}&subpos=0&matcont=${picTitle}&tgTo=1">\n<em>${picTitle}</em>\n</a>\n<div class="fb-anchor-card" style="">\n<div class=\'left-pic\'>\n<a target=\'_blank\' herf="${adLink}" log-click="p=10.1010101&as=${brandName}&pos=${index}&subpos=0&matcont=${imageUrl}&tgTo=1">\n<img src="${imageUrl}">\n</a>\n</div>\n<a target=\'_blank\' class=\'feibiao-link fl1\' herf="${adLink}" log-click="p=10.1010101&as=${brandName}&pos=${index}&subpos=0&matcont=${picTitle}&tgTo=1">${picTitle}</a>\n<a target=\'_blank\' class=\'feibiao-link fl2\' herf="${adLink}" log-click="p=10.1010101&as=${brandName}&pos=${index}&subpos=0&matcont=${adDesc}&tgTo=1">${adDesc}<br>${price}<br>${offPrice}</a>\n<a class="detail-btn" herf="${adLink}" log-click="p=10.1010101&as=${brandName}&pos=${index}&subpos=0&matcont=${buttonDesc}&tgTo=1">\n${buttonDesc}</a>\n<span class="anchor-tuiguang-btn">广告</span>\n<div class="anchor-tuiguang-info"></div>\n</div>\n</div>',
        1 : '<div class="dutu-anchor auto" title="" data-width="${width}"  data-x="${anchorX}" data-y="${anchorY}" style="display: block; left: ${left}px; top: ${top}px;">\n<span class="ic">\n<span class="ic-bg-new"></span><i class="downloadoptimize"></i></span>\n<a target="_blank" herf="${adLink}" log-click="p=10.1010101&as=${brandName}&pos=${index}&subpos=0&matcont=${picTitle}&tgTo=1">\n<em>${picTitle}</em>\n</a>\n<div class="fb-anchor-card" style="">\n<div class=\'left-pic\'>\n<a target=\'_blank\' herf="${adLink}" log-click="p=10.1010101&as=${brandName}&pos=${index}&subpos=0&matcont=${imageUrl}&tgTo=1">\n<img src="${imageUrl}">\n</a>\n</div>\n<a target=\'_blank\' class=\'feibiao-link fl1\' herf="${adLink}" log-click="p=10.1010101&as=${brandName}&pos=${index}&subpos=0&matcont=${picTitle}&tgTo=1">${picTitle}</a>\n<a target=\'_blank\' class=\'feibiao-link fl2\' herf="${adLink}" log-click="p=10.1010101&as=${brandName}&pos=${index}&subpos=0&matcont=${adDesc}&tgTo=1">${adDesc}</a>\n<a target=\'_blank\' class=\'feibiao-link fl5\' herf="${adLink}" log-click="p=10.1010101&as=${brandName}&pos=${index}&subpos=0&matcont=${price}&tgTo=1">\n<span class=\'price\' title="${price}">${price}</span>\n</a>\n<a target=\'_blank\' class=\'feibiao-link fl6\' herf="${adLink}" log-click="p=10.1010101&as=${brandName}&pos=${index}&subpos=0&matcont=${offPrice}&tgTo=1">\n<span class=\'discount-price\' title="${offPrice}">${offPrice}</span>\n</a>\n<a class="detail-btn" herf="${adLink}" log-click="p=10.1010101&as=${brandName}&pos=${index}&subpos=0&matcont=${buttonDesc}&tgTo=1">\n${buttonDesc}</a>\n<span class="anchor-tuiguang-btn">广告</span>\n<div class="anchor-tuiguang-info"></div>\n</div>\n</div>\n',
        2 : '<div class="dutu-anchor auto" title="" data-width="${width}"  data-x="${anchorX}" data-y="${anchorY}" style="display: block; left: ${left}px; top: ${top}px;">\n<span class="ic">\n<span class="ic-bg-new"></span><i class="downloadoptimize"></i></span>\n<a target="_blank" herf="${adLink}" log-click="p=10.1010101&as=${brandName}&pos=${index}&subpos=0&matcont=${picTitle}&tgTo=1">\n<em>${picTitle}</em>\n</a>\n<div class="fb-anchor-card" style="">\n<div class=\'left-pic\'>\n<a target=\'_blank\' herf="${adLink}" log-click="p=10.1010101&as=${brandName}&pos=${index}&subpos=0&matcont=${imageUrl}&tgTo=1">\n<img src="${imageUrl}">\n</a>\n</div>\n<a target=\'_blank\' class=\'feibiao-link fl1\' herf="${adLink}" log-click="p=10.1010101&as=${brandName}&pos=${index}&subpos=0&matcont=${picTitle}&tgTo=1">${picTitle}</a>\n<a target=\'_blank\' class=\'feibiao-link fl2\' herf="${adLink}" log-click="p=10.1010101&as=${brandName}&pos=${index}&subpos=0&matcont=${adDesc}&tgTo=1">${adDesc}</a>\n<a target=\'_blank\' class=\'feibiao-link fl3\' herf="${adLink}" log-click="p=10.1010101&as=${brandName}&pos=${index}&subpos=0&matcont=${price}&tgTo=1">\n<span>市场价：</span>\n<span class=\'price\'>${price}</span>\n</a>\n<a target=\'_blank\' class=\'feibiao-link fl4\' herf="${adLink}" log-click="p=10.1010101&as=${brandName}&pos=${index}&subpos=0&matcont=${offPrice}&tgTo=1">\n<span>线上优惠价：</span>\n<span class=\'discount-price\'>${offPrice}</span>\n</a>\n<a class="detail-btn" herf="${adLink}" log-click="p=10.1010101&as=${brandName}&pos=${index}&subpos=0&matcont=${buttonDesc}&tgTo=1">\n${buttonDesc}</a>\n<span class="anchor-tuiguang-btn">广告</span>\n<div class="anchor-tuiguang-info"></div>\n</div>\n</div>'
    };
    s.exports = i
});;
/*!searchdetail:widget/ui/controls/card/nsAdII_leftAnchor/leftanchor.js*/
define("searchdetail:widget/ui/controls/card/nsAdII_leftAnchor/leftanchor",
function(a) {
    function t(a, t) {
        t = e.extend({
            pn: -1,
            spn: -1,
            tpl: "",
            layerTpl1: ['<p>本搜索结果为<a class="spreadInfo-link" target="_blank" href="http://e.baidu.com/">商业推广</a>信息，', "请注意可能的风险。百度推出", '<a class="spreadInfo-link" target="_blank" href="http://baozhang.baidu.com/guarantee/">网民权益保障计划</a>，', '<a class="spreadInfo-link" target="_blank" href="https://passport.baidu.com/">登录</a>搜索有保障。</p>'].join(""),
            layerTpl2: ['<p>本搜索结果为<a class="spreadInfo-link" target="_blank" href="http://e.baidu.com/">商业推广</a>信息，', "请注意可能的风险。您当前为登录状态，已参加", '<a class="spreadInfo-link" target="_blank" href="http://baozhang.baidu.com/guarantee/">网民权益保障计划</a>。'].join("")
        },
        t),
        o.call(this, a, t)
    }
    var e = a("common:widget/ui/base/base"),
    n = a("common:widget/ui/base/events"),
    i = (a("searchdetail:widget/ui/utils/lib"), a("searchdetail:widget/ui/utils/imghelper"), a("common:widget/ui/juicer/juicer")),
    o = a("searchdetail:widget/ui/controls/card/base/base"),
    s = a("searchdetail:widget/ui/statistic/statistic-core"),
    c = a("searchdetail:widget/ui/controls/card/nsAdII_leftAnchor/tplConf");
    return e.extend(t.prototype, n, o.prototype, {
        checkState: function(a) {
            var t = this.getDataByPosId("pc_detail_slider_left_anchor", a.fbResult),
            n = !!t,
            i = e("#srcPic"),
            o = i.find(".fb-anchor-wrapper");
            return o.empty(),
            {
                hasContent: n,
                changed: n,
                dataObj: []
            }
        },
        addSpread: function(a) {
            var t = this,
            n = e(".fb-anchor-card").find(".anchor-tuiguang-btn"),
            i = e(".fb-anchor-card").find(".anchor-tuiguang-info"),
            o = !a.get("userName");
            i.append(o ? t.opts.layerTpl1: t.opts.layerTpl2),
            i.css("display", "none"),
            n.off("click"),
            i.off("click"),
            i.off("hover"),
            n.on("click",
            function() {
                i.toggle(),
                "block" === i.css("display") && (t.clickTips = setTimeout(function() {
                    i.css("display", "none")
                },
                4e3))
            }),
            i.hover(function() {
                clearTimeout(t.clickTips)
            },
            function() {
                i.hide()
            }),
            i.on("click",
            function() {
                i.toggle()
            })
        },
        setAnchorPos: function() {
            var a = e("#srcPic"),
            t = a.find(".currentImg"),
            n = a.find(".dutu-anchor"),
            i = +t.attr("data-width"),
            o = +t.attr("data-height"),
            s = +t.width(),
            c = Math.floor(t.position().left),
            r = Math.floor(t.position().top),
            d = s / i;
            n.each(function(a, t) {
                var n = e(t),
                l = +n.attr("data-y"),
                f = +n.attr("data-x"),
                h = parseInt(l * d + r),
                p = parseInt(f * d + c),
                u = +n.width();
                l > o / 2 && n.find(".fb-anchor-card").css({
                    top: "-170px",
                    bottom: "auto"
                }),
                f > i / 2 && (u + p > c + s && (p = c + s - u - 10), n.find(".ic").css({
                    "float": "right"
                }), n.find(".fb-anchor-card").css({
                    right: "0px",
                    left: "auto"
                })),
                n.css({
                    top: h + "px",
                    left: p + "px"
                })
            })
        },
        updateView: function(a, t) {
            var n = this,
            o = "pc_detail_slider_left_anchor",
            r = this.getDataByPosId(o, a.fbResult),
            d = r.Items[0].Images,
            l = ((new Date).toLocaleString(), e("#srcPic")),
            f = l.find(".fb-anchor-wrapper"),
            h = l.find(".currentImg"),
            p = r.Items[0].BrandName,
            u = r.Items[0].TemplateId,
            m = r.Items[0].AdDesc || "查看详情";
            "undefined" == typeof u && (u = 2);
            var g = c[u];
            h.attr("data-width", a.width),
            h.attr("data-height", a.height),
            l.removeClass("active"),
            f[0] || (l.append('<div class="fb-anchor-wrapper"></div>'), f = l.find(".fb-anchor-wrapper")),
            f.empty(),
            e.each(d,
            function(a, t) {
                var e = {
                    buttonDesc: m,
                    brandName: p,
                    imageUrl: t.ImageUrl,
                    adLink: t.AdLink,
                    picTitle: t.AdTitle,
                    adDesc: t.AdDesc,
                    anchorX: t.AnchorX,
                    anchorY: t.AnchorY,
                    price: t.PicHeight,
                    offPrice: t.PicWidth,
                    index: o
                };
                if ( - 1 !== e.adDesc.indexOf("<br>")) {
                    var n = e.adDesc.split("<br>");
                    e.adDesc = n[0],
                    e.price = n[1],
                    e.offPrice = n[2]
                }
                f.append(i(g, e)),
                s.send("10.1010100", {
                    as: p,
                    pos: o,
                    subpos: a,
                    shownum: d.length,
                    matcont: e.picTitle,
                    materialNum: "1"
                })
            }),
            n.setAnchorPos();
            var b = l.find(".dutu-anchor");
            e(window).resize(function() {
                n.setAnchorPos()
            }),
            h.hover(function() {
                n.setAnchorPos(),
                b.css({
                    opacity: 1
                })
            },
            function() {
                b.css({
                    opacity: 0
                })
            }),
            b.find("a").on("click",
            function() {
                var a = e(this);
                window.open(a.attr("herf"))
            }),
            b.hover(function() {
                var a = e(this),
                t = a.find("img").attr("src"),
                n = a.find(".fl1").text(),
                i = a.find(".fl2").text(),
                c = a.find(".price").text(),
                r = a.find(".discount-price").text();
                s.send("10.1010100", {
                    as: p,
                    pos: o,
                    subpos: "0",
                    shownum: "1",
                    matcont: t,
                    materialNum: "6"
                }),
                s.send("10.1010100", {
                    as: p,
                    pos: o,
                    subpos: "0",
                    shownum: "1",
                    matcont: n,
                    materialNum: "6"
                }),
                s.send("10.1010100", {
                    as: p,
                    pos: o,
                    subpos: "0",
                    shownum: "1",
                    matcont: i,
                    materialNum: "6"
                }),
                s.send("10.1010100", {
                    as: p,
                    pos: o,
                    subpos: "0",
                    shownum: "1",
                    matcont: c,
                    materialNum: "6"
                }),
                s.send("10.1010100", {
                    as: p,
                    pos: o,
                    subpos: "0",
                    shownum: "1",
                    matcont: r,
                    materialNum: "6"
                }),
                s.send("10.1010100", {
                    as: p,
                    pos: o,
                    subpos: "0",
                    shownum: "1",
                    matcont: m,
                    materialNum: "6"
                }),
                a.css({
                    opacity: 1
                }).siblings(".dutu-anchor").css({
                    opacity: 0
                }),
                a.find(".fb-anchor-card").addClass("active"),
                l.removeClass("active")
            },
            function() {
                var a = e(this),
                t = e(".fb-anchor-card").find(".anchor-tuiguang-info");
                a.find(".fb-anchor-card").removeClass("active"),
                t.hide(),
                a.siblings(".dutu-anchor").css({
                    opacity: 1
                })
            });
            var w = 0,
            v = e(".dutu-anchor a em"); !
            function k() {
                2 > w && (v.css(w % 2 === 0 ? {
                    backgroundColor: "rgba(0, 0, 0, .1)"
                }: {
                    backgroundColor: "#4c4c4c",
                    backgroundColor: "rgba(0, 0, 0, .7)"
                }), setTimeout(k, 500), w++)
            } (),
            n.addSpread(t)
        }
    }),
    t
});;
/*!searchdetail:widget/ui/controls/card/nsAdII_relateCase/relateCase.js*/
define("searchdetail:widget/ui/controls/card/nsAdII_relateCase/relateCase",
function(e) {
    function t(e, t) {
        t = a.extend({
            itemSize: {
                width: 78,
                height: 78
            },
            itemTpl: ['<li class="picbox relate-case-item">', '<span class="pic-loading-dot"></span>', '<a class="picbox-link" href="${targetUrl}" target="_blank"><img /></a>', "</li>"].join(""),
            tpl: ['<div class="card-box relate-case-card">', '<h5 class="card-title">', '<i class="sticker"></i>', '<span class="text">相关案例</span>', '<span class="tuiguang-spread">广告</span>', '<i class="close"></i>', "</h5>", '<div class="card-content">', '<span class="card-subtitle"></span>', '<p class="card-desc"></p>', '<ul class="clearfix piclist"></ul>', '<a class="dataprovider" href="" target="_blank"></a>', "</div>", "</div>"].join(""),
            layerTpl1: ['<div class="spread-layer" id="spread-layer">', '<p>本搜索结果为<a target="_blank" href="http://e.baidu.com/">商业推广</a>信息，请注意可能的风险。百度推出', '<a target="_blank" href="http://baozhang.baidu.com/guarantee/">网民权益保障计划</a>，', '<a target="_blank" href="https://passport.baidu.com/">登录</a>搜索有保障。</p>', "</div>"].join(""),
            layerTpl2: ['<div class="spread-layer" id="spread-layer">', '<p>本搜索结果为<a target="_blank" href="http://e.baidu.com/">商业推广</a>信息，请注意可能的风险。', '您当前为登录状态，已参加<a target="_blank" href="http://baozhang.baidu.com/guarantee/">网民权益保障计划</a>。', "</div>"].join("")
        },
        t),
        e = a.extend({
            picList: ".piclist"
        },
        e),
        d.call(this, e, t)
    }
    var a = e("common:widget/ui/base/base"),
    s = (e("common:widget/ui/utils/utils"), e("common:widget/ui/base/events"), e("searchdetail:widget/ui/utils/lib"), e("searchdetail:widget/ui/utils/imghelper")),
    i = e("common:widget/ui/juicer/juicer"),
    d = e("searchdetail:widget/ui/controls/card/base/base"),
    l = 0;
    return a.extend(t.prototype, d.prototype, {
        checkState: function(e) {
            var t = "pc_detail_slider_right_relate_case",
            a = this.getDataByPosId(t, e.fbResult),
            s = this.getDataByPosId(t, this.opts.nsAdData),
            e = a || s;
            l = a ? a.Items[0].TemplateId: 0;
            var i = !!e;
            return {
                hasContent: i,
                changed: i,
                dataObj: []
            }
        },
        addSpread: function(e) {
            var t = this,
            s = a(".relate-case-card").find(".tuiguang-spread"),
            i = !e.get("userName"),
            d = 0; ! a("#spread-layer").length && a("#wrapper").append(i ? t.opts.layerTpl1: t.opts.layerTpl2);
            var l = a("#spread-layer");
            l.css("display", "none"),
            s.off("click"),
            l.off("click"),
            a("#sider").off("scroll"),
            s.on("click",
            function() {
                d = s.offset().top - s.height() / 2,
                l.css("top") !== d + "px" && (l.hide(), l.css("top", d)),
                l.toggle(),
                "block" === l.css("display") && (t.clickTips = setTimeout(function() {
                    l.css("display", "none")
                },
                4e3))
            }),
            l.on("click",
            function() {
                l.toggle()
            }),
            a("#sider").scroll(function() {
                l.css("top", s.offset().top - s.height() / 2)
            })
        },
        updateView: function(e, t) {
            var d = "pc_detail_slider_right_relate_case",
            n = this,
            r = this.getDataByPosId(d, e.fbResult) || this.getDataByPosId(d, this.opts.nsAdData),
            c = this.opts.itemSize,
            o = !1;
            a.each(r.Items[0].Images,
            function(e, t) {
                return "brand_name" === t.AdPosition ? (r.Items[0].Images.splice(0, 0, r.Items[0].Images[e]), r.Items[0].Images.splice(e + 1, 1), o = !0, !1) : void 0
            });
            var p = o ? r.Items[0].Images.length - 1 : r.Items[0].Images.length,
            m = r.Items[0].Images.slice(0, o ? 4 : 3),
            u = a("<ul></ul>"),
            g = r.Items[0].BrandName,
            h = 0,
            f = a(".relate-case-card");
            n.elements.cntWrapper.find(".dataprovider").html(""),
            f.find(".card-desc").html(""),
            a(m).each(function(e, t) {
                var r, o = (new Date).toLocaleString(),
                f = encodeURIComponent(t.ImageUrl),
                b = {
                    targetUrl: t.AdLink,
                    imageUrl: t.ImageUrl,
                    index: d,
                    adTime: o,
                    logUrl: f
                },
                I = a(i(n.opts.itemTpl, b)),
                v = I.find("img"),
                k = I.find(".picbox-link");
                if ("brand_name" === t.AdPosition) {
                    if (p = t.AdDesc || "3", 2 === l) return ! 0;
                    r = "p=10.1010101&as=" + g + "&pos=" + d + "&time=" + o + "&subpos=0&matcont=" + t.AdTitle + "&tgTo=1",
                    statistic.send("10.1010100", {
                        as: g,
                        pos: d,
                        subpos: "0",
                        shownum: "1",
                        matcont: t.AdTitle,
                        materialNum: m.length + 2
                    }),
                    n.elements.cntWrapper.find(".dataprovider").html(t.AdTitle),
                    1 !== l ? n.elements.cntWrapper.find(".dataprovider").attr("href", m[1].AdLink).attr("log-click", r) : n.elements.cntWrapper.find(".dataprovider").attr("href", m[1].AdLink).attr("log-click", "")
                } else {
                    var w = t.PicId || t.ImageUrl;
                    r = "p=10.1010101&as=" + g + "&pos=" + d + "&time=" + o + "&subpos=" + h + "&matcont=" + w + "&tgTo=1",
                    window.statistic.send("10.1010100", {
                        as: g,
                        pos: d,
                        subpos: h++,
                        shownum: m.length,
                        matcont: w,
                        materialNum: m.length + 2
                    }),
                    s.loadImage([t.ImageUrl],
                    function(e) {
                        var a = s.scaleFull(e, c);
                        I.find(".pic-loading-dot").hide(),
                        v.css(a).attr("src", t.ImageUrl)
                    }),
                    k.attr("log-click", r),
                    u.append(I)
                }
            });
            var b = (new Date).toLocaleString(),
            I = "p=10.1010101&as=" + g + "&pos=" + d + "&time=" + b + "&subpos=0&matcont=" + r.Items[0].AdTitle + "&tgTo=1";
            if (statistic.send("10.1010100", {
                as: g,
                pos: d,
                subpos: "0",
                shownum: "1",
                matcont: r.Items[0].AdTitle,
                materialNum: m.length + 2
            }), this.elements.cntWrapper.find(".card-subtitle").html('<a class="card-subtitle-text" log-click="' + I + '" href="' + m[1].AdLink + '" target="_blank">' + r.Items[0].AdTitle + "</a>"), this.elements.cntWrapper.find(".card-desc").html(r.Items[0].AdDesc).attr("title", r.Items[0].AdDesc), f.find(".text").html("相关案例"), f.find(".dataprovider").removeClass("dataprovider-new"), f.find(".card-subtitle").removeClass("card-subtitle-new"), a(f.find(".relate-case-count")).remove(), 1 === l) {
                f.find(".text").html("当前套图"),
                f.find(".dataprovider").addClass("dataprovider-new"),
                f.find(".card-subtitle").addClass("card-subtitle-new");
                var v = a('<span class="relate-case-count">' + p + "张</span>");
                a(f.find(".card-subtitle")).append(v)
            }
            if (2 === l) {
                f.find(".text").html("当前案例"),
                f.find(".card-subtitle").addClass("card-subtitle-new");
                var k = {};
                try {
                    k = JSON.parse(r.Items[0].AdDesc)
                } catch(w) {}
                f.find(".card-desc").html(""),
                a.each(k,
                function(e, t) {
                    f.find(".card-desc").append('<span class="card-desc-item">' + e + ":" + t + "</span>")
                })
            }
            window.statistic.send("10.1010100", {
                as: g,
                pos: d,
                subpos: "0",
                shownum: "1",
                matcont: r.Items[0].AdDesc,
                materialNum: m.length + 2
            }),
            this.elements.picList.empty().append(u.children()),
            1 !== l && 2 !== l ? (f.find(".tuiguang-spread").html("广告"), n.addSpread(t)) : f.find(".tuiguang-spread").html("")
        }
    }),
    t
});;
/*!searchdetail:widget/ui/controls/card/nsAdII_relateCase/relateCaseAsync.js*/
define("searchdetail:widget/ui/controls/card/nsAdII_relateCase/relateCaseAsync",
function(t) {
    function e(t, e) {
        e = a.extend({
            itemSize: {
                width: 78,
                height: 78
            },
            itemTpl: ['<li class="picbox decoration_sim_item">', '<span class="pic-loading-dot"></span>', '<a class="picbox-link" href="${targetUrl}" target="_blank"><img /></a>', "</li>"].join(""),
            tpl: ['<div class="card-box goods-recommend">', '<h5 class="card-title">', '<i class="sticker"></i>', '<span class="text">爆款商品推荐</span>', '<span class="tuiguang-spread">广告</span>', '<i class="close"></i>', "</h5>", '<div class="card-content">', '<a href="" target="_blank" class="card-subtitle" target="_blank"></a>', '<p class="card-desc"></p>', '<ul class="clearfix piclist"></ul>', '<a class="dataprovider" href="" target="_blank"></a>', "</div>", "</div>"].join(""),
            layerTpl1: ['<div class="spread-layer" id="spread-layer">', '<p>本搜索结果为<a target="_blank" href="http://e.baidu.com/">商业推广</a>信息，请注意可能的风险。百度推出', '<a target="_blank" href="http://baozhang.baidu.com/guarantee/">网民权益保障计划</a>，', '<a target="_blank" href="https://passport.baidu.com/">登录</a>搜索有保障。</p>', "</div>"].join(""),
            layerTpl2: ['<div class="spread-layer" id="spread-layer">', '<p>本搜索结果为<a target="_blank" href="http://e.baidu.com/">商业推广</a>信息，请注意可能的风险。', '您当前为登录状态，已参加<a target="_blank" href="http://baozhang.baidu.com/guarantee/">网民权益保障计划</a>。', "</div>"].join("")
        },
        e),
        t = a.extend({
            picList: ".piclist"
        },
        t),
        l.call(this, t, e)
    }
    var a = t("common:widget/ui/base/base"),
    s = (t("common:widget/ui/utils/utils"), t("common:widget/ui/base/events"), t("searchdetail:widget/ui/utils/lib"), t("searchdetail:widget/ui/utils/imghelper")),
    i = t("common:widget/ui/juicer/juicer"),
    l = t("searchdetail:widget/ui/controls/card/base/base"),
    n = t("searchdetail:widget/ui/statistic/statistic-core");
    return a.extend(e.prototype, l.prototype, {
        getDataByPosId: function(t, e) {
            if (!t || !e) return null;
            for (var a = null,
            s = 0; s < e.length; s++) e[s].Tag === t && (a = e[s]);
            return a
        },
        checkState: function(t) {
            var e = "pc_detail_slider_right_goods_recommend",
            a = this.getDataByPosId(e, t.fbResult),
            t = this.getDataByPosId(e, this.opts.nsAdData),
            s = !!a || !!t;
            return {
                hasContent: s,
                changed: s,
                dataObj: []
            }
        },
        addSpread: function(t) {
            var e = this,
            s = a(".goods-recommend").find(".tuiguang-spread"),
            i = !t.get("userName"),
            l = 0; ! a("#spread-layer").length && a("#wrapper").append(i ? e.opts.layerTpl1: e.opts.layerTpl2);
            var n = a("#spread-layer");
            n.css("display", "none"),
            s.off("click"),
            n.off("click"),
            a("#sider").off("scroll"),
            s.on("click",
            function() {
                l = s.offset().top - s.height() / 2,
                n.css("top") !== l + "px" && (n.hide(), n.css("top", l)),
                n.toggle(),
                "block" === n.css("display") && (e.clickTips = setTimeout(function() {
                    n.css("display", "none")
                },
                4e3))
            }),
            n.on("click",
            function() {
                n.toggle()
            }),
            a("#sider").scroll(function() {
                n.css("top", s.offset().top - s.height() / 2)
            })
        },
        updateView: function(t, e) {
            var l = this,
            o = "pc_detail_slider_right_goods_recommend",
            r = a("<ul></ul>"),
            d = l.opts.itemSize,
            c = this.getDataByPosId(o, t.fbResult) || this.getDataByPosId(o, this.opts.nsAdData),
            p = c.Items[0].Images,
            m = c.Items[0].BrandName,
            g = 0;
            a(p).each(function(t, e) {
                var c, u = (new Date).toLocaleString(),
                h = {
                    targetUrl: e.AdLink,
                    imageUrl: e.ImageUrl,
                    index: o,
                    adTime: u
                },
                f = a(i(l.opts.itemTpl, h)),
                b = f.find("img"),
                k = f.find(".picbox-link");
                "brand_name" === e.AdPosition ? (c = "p=10.1010101&as=" + m + "&pos=" + o + "&time=" + u + "&subpos=0&matcont=" + e.AdTitle + "&tgTo=1", n.send("10.1010100", {
                    as: m,
                    pos: o,
                    subpos: "0",
                    shownum: "1",
                    matcont: e.AdTitle,
                    materialNum: p.length + 2
                }), l.elements.cntWrapper.find(".dataprovider").html(e.AdTitle).attr("href", e.AdLink).attr("log-click", c)) : (c = "p=10.1010101&as=" + m + "&pos=" + o + "&time=" + u + "&subpos=" + g + "&matcont=" + e.ImageUrl + "&tgTo=1", n.send("10.1010100", {
                    as: m,
                    pos: o,
                    subpos: g++,
                    shownum: p.length,
                    matcont: e.ImageUrl,
                    materialNum: p.length + 2
                }), s.loadImage([e.ImageUrl],
                function(t) {
                    var a = s.scaleFull(t, d);
                    f.find(".pic-loading-dot").hide(),
                    b.css(a).attr("src", e.ImageUrl)
                }), k.attr("log-click", c), r.append(f))
            });
            var u = (new Date).toLocaleString(),
            h = "p=10.1010101&as=" + m + "&pos=" + o + "&time=" + u + "&subpos=0&matcont=" + c.Items[0].AdTitle + "&tgTo=1";
            n.send("10.1010100", {
                as: m,
                pos: o,
                subpos: "0",
                shownum: "1",
                matcont: c.Items[0].AdTitle,
                materialNum: p.length + 2
            }),
            this.elements.cntWrapper.find(".card-subtitle").html(c.Items[0].AdTitle).attr("href", p[0].AdLink).attr("log-click", h),
            this.elements.cntWrapper.find(".card-desc").html(c.Items[0].AdDesc),
            n.send("10.1010100", {
                as: m,
                pos: o,
                subpos: "0",
                shownum: "1",
                matcont: c.Items[0].AdDesc,
                materialNum: p.length + 2
            }),
            this.elements.picList.empty().append(r.children()),
            l.addSpread(e)
        }
    }),
    e
});;
/*!searchdetail:widget/ui/controls/card/nsAdII_relateImg/relateImg.js*/
define("searchdetail:widget/ui/controls/card/nsAdII_relateImg/relateImg",
function(e) {
    function t(e, t) {
        t = a.extend({
            itemSize: {
                width: 78,
                height: 78
            },
            itemTpl: ['<li class="picbox ${type}">', '<span class="pic-loading-dot"></span>', '<a class="picbox-link" href="${targetUrl}" log-click="${logInfo}" target="_blank">', '<img data-src="${imageUrl}"/>', "</a>", "</li>"].join(""),
            tpl: ['<div class="card-box relate-img-card">', '<h5 class="card-title">', '<span class="text">相关图片</span>', '<span class="tuiguang-spread">广告</span>', '<i class="close"></i>', "</h5>", '<span class="type0 relate-img-card-active"></span>', '<span class="type1"></span>', '<div class="card-content">', '<ul class="clearfix piclist">', "</ul>", "</div>", "</div>"].join(""),
            layerTpl1: ['<div class="spread-layer" id="spread-layer">', '<p>本搜索结果为<a target="_blank" href="http://e.baidu.com/">商业推广</a>信息，请注意可能的风险。百度推出', '<a target="_blank" href="http://baozhang.baidu.com/guarantee/">网民权益保障计划</a>，', '<a target="_blank" href="https://passport.baidu.com/">登录</a>搜索有保障。</p>', "</div>"].join(""),
            layerTpl2: ['<div class="spread-layer" id="spread-layer">', '<p>本搜索结果为<a target="_blank" href="http://e.baidu.com/">商业推广</a>信息，请注意可能的风险。', '您当前为登录状态，已参加<a target="_blank" href="http://baozhang.baidu.com/guarantee/">网民权益保障计划</a>。', "</div>"].join("")
        },
        t),
        e = a.extend({
            picList: ".piclist"
        },
        e),
        l.call(this, e, t)
    }
    var a = e("common:widget/ui/base/base"),
    i = (e("common:widget/ui/utils/utils"), e("common:widget/ui/base/events"), e("searchdetail:widget/ui/utils/lib"), e("searchdetail:widget/ui/utils/imghelper")),
    s = e("common:widget/ui/juicer/juicer"),
    l = e("searchdetail:widget/ui/controls/card/base/base"),
    r = e("searchdetail:widget/ui/statistic/statistic-core"),
    c = 0;
    return a.extend(t.prototype, l.prototype, {
        checkState: function(e) {
            window.canShowIt = !0;
            var t = this.getDataByPosId("pc_detail_slider_right_relate_img", this.opts.nsAdData),
            a = this.getDataByPosId("pc_detail_slider_right_relate_img", e.fbResult),
            e = a || t;
            a ? c = a.Items[0].TemplateId: (c = 0, window.canShowIt = !1);
            var i = !!e && canShowIt;
            return {
                hasContent: i,
                changed: i,
                dataObj: []
            }
        },
        addSpread: function(e) {
            var t = this,
            i = a(".relate-img-card").find(".tuiguang-spread"),
            s = !e.get("userName"),
            l = 0; ! a("#spread-layer").length && a("#wrapper").append(s ? t.opts.layerTpl1: t.opts.layerTpl2);
            var r = a("#spread-layer");
            r.css("display", "none"),
            i.off("click"),
            r.off("click"),
            a("#sider").off("scroll"),
            i.on("click",
            function() {
                l = i.offset().top - i.height() / 2,
                r.css("top") !== l + "px" && (r.hide(), r.css("top", l)),
                r.toggle(),
                "block" === r.css("display") && (t.clickTips = setTimeout(function() {
                    r.css("display", "none")
                },
                4e3))
            }),
            r.on("click",
            function() {
                r.toggle()
            }),
            a("#sider").scroll(function() {
                r.css("top", i.offset().top - i.height() / 2)
            })
        },
        updateView: function(e, t) {
            var l = this,
            d = (e.pn, "pc_detail_slider_right_relate_img"),
            n = this.getDataByPosId(d, e.fbResult) || this.getDataByPosId(d, this.opts.nsAdData);
            a(n.Items).each(function(e, t) {
                a(t.Images).each(function(a, i) {
                    i.type = "relate-img-card-type" + e,
                    i.title = t.AdTitle
                })
            });
            var o = this.opts.itemSize,
            p = n.Items[0].Images,
            g = 5; (1 === c || 2 === c) && (p = n.Items[0].Images.slice(0, 6).concat(n.Items[1].Images.slice(0, 6)), g = 11);
            var m = p.length,
            h = n.Items[0].BrandName,
            u = (Math.floor(m / 6), a("<ul></ul>")),
            f = "/search/addetail?word=" + encodeURI(e.srv_simi.query) + "&tn=addetail&picIndex=";
            a(p).each(function(e, t) {
                if (e >= 0 && g >= e) {
                    var n = (new Date).toLocaleString(),
                    m = encodeURIComponent(t.ImageUrl),
                    y = t.PicId || t.ImageUrl,
                    I = "p=10.1010101&as=" + h + "&pos=" + d + "&time=" + n + "&subpos=" + e + "&matcont=" + y + "&matcontTitle=" + t.title + "&tgTo=1";
                    r.send("10.1010100", {
                        as: h,
                        pos: d,
                        subpos: e,
                        shownum: p.length,
                        matcont: y,
                        matcontTitle: t.title,
                        materialNum: p.length
                    });
                    var v = {
                        targetUrl: f + e,
                        imageUrl: t.ImageUrl,
                        index: d,
                        adTime: n,
                        logUrl: m,
                        type: t.type,
                        logInfo: I
                    };
                    0 !== c && (v.targetUrl = t.AdLink); {
                        var b = a(s(l.opts.itemTpl, v)),
                        w = b.find("img");
                        b.find("picbox-link")
                    }
                    i.loadImage([t.ImageUrl],
                    function(e) {
                        var a = i.scaleFull(e, o);
                        b.find(".pic-loading-dot").hide(),
                        w.css(a).attr("src", t.ImageUrl)
                    }),
                    u.append(b)
                }
            }),
            this.elements.picList.empty().append(u.children());
            var y = a(".relate-img-card");
            y.find(".text").html("相关图片"),
            (1 === c || 2 === c) && (y.find(".text").html("相似图片"), a("#similarpicCard").hide(), a(".relate-img-card .type0").addClass("relate-img-card-active"), a(".relate-img-card .type1").removeClass("relate-img-card-active"), a(".relate-img-card .type0").html(n.Items[0].AdTitle).on("click",
            function() {
                a(".relate-img-card .type0").addClass("relate-img-card-active"),
                a(".relate-img-card .type1").removeClass("relate-img-card-active"),
                a(".relate-img-card-type0").show(),
                a(".relate-img-card-type1").hide()
            }), a(".relate-img-card .type1").html(n.Items[1].AdTitle).on("click",
            function() {
                a(".relate-img-card .type1").addClass("relate-img-card-active"),
                a(".relate-img-card .type0").removeClass("relate-img-card-active"),
                a(".relate-img-card-type1").show(),
                a(".relate-img-card-type0").hide()
            }), a(".relate-img-card-type1").css("display", "none")),
            1 !== c && 2 !== c ? (y.find(".tuiguang-spread").html("广告"), l.addSpread(t)) : y.find(".tuiguang-spread").html("")
        }
    }),
    t
});;
/*!searchdetail:widget/ui/controls/card/nsAdII_rightPicInfo/rightpicinfo.js*/
define("searchdetail:widget/ui/controls/card/nsAdII_rightPicInfo/rightpicinfo",
function(i) {
    function e(i, e) {
        e = t.extend({
            pn: -1,
            spn: -1,
            itemTpl: ['<a href="${logoAdLink}" class="ad-logo" target="_blank" log-click="p=10.1010101&as=${brandName}&pos=${index}&subpos=0&matcont=${imageUrl}&time=${adTime}&tgTo=1">', '<img src="${imageUrl}" alt="" width=100 height=38/>', "</a>", '<div class="pic-info-detail">', '<a href="${titleAdLink}" class="pic-title-info" target="_blank" title="${picTitle}" ', 'log-click="p=10.1010101&as=${brandName}', '&pos=${index}&subpos=0&matcont=${picTitle}&time=${adTime}&tgTo=1">${picTitle}</a>', '<em class="pic-size-info">${picSize}</em>', "</div>"].join(""),
            itemTplNew1: ['<div class="pic-info-new1">', "<p>${title}</p>", '<a href="${link}" target="_blank" log-click="p=10.1010101&as=${brandName}&pos=${index}', '&subpos=0&matcont=${loglink}&time=${adTime}&tgTo=1">${link}</a>', "<span>${name}</span>", "<span>|</span>", "<em>${width}*${height}</em>", "</div>"].join(""),
            itemTplNew2: ['<div class="pic-info-new2">', '<img src="${face}">', '<div class="pic-info-new2-title">', "<span>${name}</span>", '<a href="${link}" target="_blank" log-click="p=10.1010101&as=${brandName}&pos=${index}', '&subpos=0&matcont=${loglink}&time=${adTime}&tgTo=1">进入主页</a>', "</div>", "<p>${desc}</p>", "</div>"].join(""),
            tpl: ['<div class="card-box pic-info pic-info-box right-pic-info-box">', '<div class="card-title">', '<i class="pic-info-sticker"></i>', '<span class="text">图片信息</span>', '<span class="tuiguang-spread">广告</span>', "</div>", '<div class="card-content">', "</div>", "</div>"].join(""),
            layerTpl1: ['<div class="spread-layer" id="spread-layer">', '<p>本搜索结果为<a target="_blank" href="http://e.baidu.com/">商业推广</a>信息，请注意可能的风险。百度推出', '<a target="_blank" href="http://baozhang.baidu.com/guarantee/">网民权益保障计划</a>，', '<a target="_blank" href="https://passport.baidu.com/">登录</a>搜索有保障。</p>', "</div>"].join(""),
            layerTpl2: ['<div class="spread-layer" id="spread-layer">', '<p>本搜索结果为<a target="_blank" href="http://e.baidu.com/">商业推广</a>信息，请注意可能的风险。', '您当前为登录状态，已参加<a target="_blank" href="http://baozhang.baidu.com/guarantee/">网民权益保障计划</a>。', "</div>"].join("")
        },
        e),
        i = t.extend({},
        i),
        s.call(this, i, e)
    }
    var t = i("common:widget/ui/base/base"),
    a = i("common:widget/ui/base/events"),
    n = (i("searchdetail:widget/ui/utils/lib"), i("searchdetail:widget/ui/utils/imghelper"), i("common:widget/ui/juicer/juicer")),
    s = i("searchdetail:widget/ui/controls/card/base/base"),
    d = i("searchdetail:widget/ui/statistic/statistic-core"),
    o = 0;
    return t.extend(e.prototype, a, s.prototype, {
        checkState: function(i) {
            var e = this.opts.nsAdData,
            a = this.getDataByPosId("pc_detail_slider_right_pic_info", e),
            n = this.getDataByPosId("pc_detail_slider_right_pic_info", i.fbResult);
            o = n ? n.Items[0].TemplateId: 0;
            var s = !!n;
            s || (s = !!a && "0" !== i.adType);
            var d = !!n || !!a && "0" !== i.adType;
            return d ? t("#picInfoPnl").hide() : t("#picInfoPnl").show(),
            {
                hasContent: s,
                changed: s,
                dataObj: []
            }
        },
        addSpread: function(i) {
            var e = this,
            a = t(".pic-info-box").find(".tuiguang-spread"),
            n = !i.get("userName"),
            s = 0; ! t("#spread-layer").length && t("#wrapper").append(n ? e.opts.layerTpl1: e.opts.layerTpl2);
            var d = t("#spread-layer");
            d.css("display", "none"),
            a.off("click"),
            d.off("click"),
            t("#sider").off("scroll"),
            a.on("click",
            function() {
                s = a.offset().top - a.height() / 2,
                d.css("top") !== s + "px" && (d.hide(), d.css("top", s)),
                d.toggle(),
                "block" === d.css("display") && (e.clickTips = setTimeout(function() {
                    d.css("display", "none")
                },
                4e3))
            }),
            d.on("click",
            function() {
                d.toggle()
            }),
            t("#sider").scroll(function() {
                d.css("top", a.offset().top - a.height() / 2)
            })
        },
        updateView: function(i, e) {
            var a, s = this,
            l = "pc_detail_slider_right_pic_info",
            p = this.getDataByPosId(l, i.fbResult) || this.getDataByPosId(l, s.opts.nsAdData),
            c = p.Items[0].Images,
            r = (new Date).toLocaleString(),
            g = p.Items[0].BrandName,
            m = {
                imageUrl: "",
                logoAdLink: "",
                titleAdLink: "",
                picTitle: "",
                picSize: "",
                adTime: "",
                index: "",
                brandName: ""
            };
            1 === c.length ? (m = {
                imageUrl: c[0].ImageUrl,
                logoAdLink: c[0].AdLink,
                titleAdLink: c[0].AdLink,
                picTitle: c[0].AdTitle || i.picDesc || i.fromPageTitle,
                picSize: i.width + "x" + i.height,
                adTime: r,
                index: l,
                brandName: g
            },
            a = s.opts.itemTpl) : 2 === c.length && (m = {
                imageUrl: c[0].ImageUrl,
                logoAdLink: c[0].AdLink,
                titleAdLink: c[1].AdLink,
                picTitle: c[1].AdTitle,
                picSize: i.width + "x" + i.height,
                adTime: r,
                index: l,
                brandName: g
            },
            a = s.opts.itemTpl);
            var h = t(".right-pic-info-box");
            1 === o && (m = {
                title: c[0].AdTitle,
                link: c[0].AdLink,
                loglink: encodeURIComponent(c[0].AdLink),
                name: c[0].AdDesc,
                width: c[0].PicWidth,
                height: c[0].PicHeight,
                adTime: r,
                index: l,
                brandName: g
            },
            a = s.opts.itemTplNew1),
            2 === o ? (m = {
                face: c[0].ImageUrl,
                link: c[0].AdLink,
                loglink: encodeURIComponent(c[0].AdLink),
                name: c[0].AdTitle,
                desc: c[0].AdDesc,
                adTime: r,
                index: l,
                brandName: g
            },
            a = s.opts.itemTplNew2, h.find(".text").html("设计师信息")) : h.find(".text").html("图片信息"),
            (this.opts.pn !== e.get("pn") || this.opts.spn !== e.get("spn")) && (this.opts.pn = e.get("pn"), this.opts.spn = e.get("spn"), 1 === o ? d.send("10.1010100", {
                as: g,
                pos: l,
                subpos: "0",
                shownum: "1",
                matcont: m.loglink,
                materialNum: "4"
            }) : 2 === o ? d.send("10.1010100", {
                as: g,
                pos: l,
                subpos: "0",
                shownum: "1",
                matcont: m.loglink,
                materialNum: "4"
            }) : (d.send("10.1010100", {
                as: g,
                pos: l,
                subpos: "0",
                shownum: "1",
                matcont: m.imageUrl,
                materialNum: "2"
            }), d.send("10.1010100", {
                as: g,
                pos: l,
                subpos: "0",
                shownum: "1",
                matcont: m.picTitle,
                materialNum: "2"
            }))),
            this.elements.content.empty().append(n(a, m)),
            m.imageUrl && m.logoAdLink || t(".ad-logo").hide(),
            m.picTitle && m.titleAdLink || t(".pic-info-detail").hide(),
            1 !== o ? (h.find(".tuiguang-spread").html("广告"), s.addSpread(e)) : h.find(".tuiguang-spread").html("")
        }
    }),
    e
});;
/*!searchdetail:widget/ui/controls/card/nsAdII_rightWorks/rightWorks.js*/
define("searchdetail:widget/ui/controls/card/nsAdII_rightWorks/rightWorks",
function(t) {
    function a(t, a) {
        a = e.extend({
            itemSize: {
                width: 78,
                height: 78
            },
            itemTpl: ['<li class="picbox right-works-item">', '<span class="pic-loading-dot"></span>', '<a class="picbox-link" href="${targetUrl}" target="_blank">', "<img />", '<span class="right-works-item-title">${title}</span>', "</a>", "</li>"].join(""),
            tpl: ['<div class="card-box right-works-card">', '<h5 class="card-title">', '<i class="sticker"></i>', '<span class="text">他的作品集</span>', '<i class="close"></i>', "</h5>", '<div class="card-content">', '<ul class="clearfix piclist"></ul>', "</div>", "</div>"].join(""),
            layerTpl1: ['<div class="spread-layer" id="spread-layer">', '<p>本搜索结果为<a target="_blank" href="http://e.baidu.com/">商业推广</a>信息，请注意可能的风险。百度推出', '<a target="_blank" href="http://baozhang.baidu.com/guarantee/">网民权益保障计划</a>，', '<a target="_blank" href="https://passport.baidu.com/">登录</a>搜索有保障。</p>', "</div>"].join(""),
            layerTpl2: ['<div class="spread-layer" id="spread-layer">', '<p>本搜索结果为<a target="_blank" href="http://e.baidu.com/">商业推广</a>信息，请注意可能的风险。', '您当前为登录状态，已参加<a target="_blank" href="http://baozhang.baidu.com/guarantee/">网民权益保障计划</a>。', "</div>"].join("")
        },
        a),
        t = e.extend({
            picList: ".piclist"
        },
        t),
        l.call(this, t, a)
    }
    var e = t("common:widget/ui/base/base"),
    i = t("searchdetail:widget/ui/utils/imghelper"),
    s = t("common:widget/ui/juicer/juicer"),
    l = t("searchdetail:widget/ui/controls/card/base/base");
    return e.extend(a.prototype, l.prototype, {
        checkState: function(t) {
            var a = "pc_detail_slider_right_works",
            t = this.getDataByPosId(a, t.fbResult),
            e = !!t;
            return {
                hasContent: e,
                changed: e,
                dataObj: []
            }
        },
        updateView: function(t) {
            var a = "pc_detail_slider_right_works",
            l = this,
            r = this.getDataByPosId(a, t.fbResult) || this.getDataByPosId(a, this.opts.nsAdData),
            n = this.opts.itemSize,
            c = r.Items[0].Images.slice(0, 3),
            d = e("<ul></ul>"),
            o = r.Items[0].BrandName,
            p = 0;
            e(c).each(function(t, r) {
                var g, h = (new Date).toLocaleString(),
                m = encodeURIComponent(r.ImageUrl),
                u = {
                    targetUrl: r.AdLink,
                    imageUrl: r.ImageUrl,
                    index: a,
                    adTime: h,
                    logUrl: m,
                    title: r.AdTitle
                },
                b = e(s(l.opts.itemTpl, u)),
                f = b.find("img"),
                k = b.find(".picbox-link"),
                w = r.PicId || r.ImageUrl;
                g = "p=10.1010101&as=" + o + "&pos=" + a + "&time=" + h + "&subpos=" + p + "&matcont=" + w + "&tgTo=1",
                window.statistic.send("10.1010100", {
                    as: o,
                    pos: a,
                    subpos: p++,
                    shownum: c.length,
                    matcont: w,
                    materialNum: c.length + 2
                }),
                i.loadImage([r.ImageUrl],
                function(t) {
                    var a = i.scaleFull(t, n);
                    b.find(".pic-loading-dot").hide(),
                    f.css(a).attr("src", r.ImageUrl)
                }),
                k.attr("log-click", g),
                d.append(b)
            }),
            this.elements.picList.empty().append(d.children())
        }
    }),
    a
});;
/*!searchdetail:widget/ui/controls/card/nsAdII_similarCase/tplConf.js*/
define("searchdetail:widget/ui/controls/card/nsAdII_similarCase/tplConf",
function(s, a, i) {
    var e = {
        0 : '<div class="card-box similarcase-card">\n<h5 class="card-title"><i class="sticker"></i><span class="text">${cardTitle}</span><span class="tuiguang-spread">广告</span><i class="close"></i></h5>\n<div class="card-content">\n<a class="similarcase-link" href="${targetUrl}" target="_blank">\n<img class="similarcase-pic" src="${imgUrl}"/>\n<div class="designer-message">\n<span>${designerName}</span>\n</div>\n<div class="portrait" title="${adlink}"><img src="${portraitUrl}"></div>\n</a>\n<div class="similarcase-message">\n{@each mesData as item}<p>\n<span class="similarcase-text" title="${item}">${item}</span>\n</p>\n{@/each}</div>\n<a class="similarcase-more button0" href="${targetUrl}" target="_blank">\n<span class="similarcase-more-text">${buttonDesc}</span>\n</a>\n</div>\n</div>\n',
        1 : '<div class="card-box similarcase-card">\n<h5 class="card-title"><i class="sticker"></i><span class="text">${cardTitle}</span><span class="tuiguang-spread">广告</span><i class="close"></i></h5>\n<div class="card-content">\n<a class="similarcase-link" href="${targetUrl}" target="_blank">\n<img class="similarcase-pic" src="${imgUrl}"/>\n<div class="designer-message">\n<span>${designerName}</span>\n</div>\n<div class="portrait" title="${adlink}"><img src="${portraitUrl}"></div>\n</a>\n<div class="similarcase-message">\n{@each mesData as item}<p>\n<span class="similarcase-text" title="${item}">${item}</span>\n</p>\n{@/each}</div>\n<a class="similarcase-more button0" href="${targetUrl}" target="_blank">\n<span class="similarcase-more-text">${buttonDesc}</span>\n</a>\n</div>\n</div>\n',
        2 : '<div class="card-box similarcase-card">\n<h5 class="card-title"><i class="sticker"></i><span class="text">相关案例</span><span class="tuiguang-spread">广告</span><i class="close"></i></h5>\n<div class="card-content">\n<a class="similarcase-link" href="${targetUrl}" target="_blank">\n<img class="similarcase-pic" src="${imgUrl}"/>\n<div class="similarcase-designer-message">\n<span>${designerName}</span>\n</div>\n</a>\n<div class="similarcase-message">\n{@each mesData as item}<p>\n<span class="similarcase-text" title="${item}">${item}</span>\n</p>\n{@/each}</div>\n<a class="similarcase-more button0" href="${targetUrl}" target="_blank">\n<span class="similarcase-more-text">查看详情</span>\n</a>\n</div>\n</div>\n'
    };
    i.exports = e
});;
/*!searchdetail:widget/ui/controls/card/nsAdII_similarCase/similarcaseAsync.js*/
define("searchdetail:widget/ui/controls/card/nsAdII_similarCase/similarcaseAsync",
function(e) {
    function t(e, t) {
        t = s.extend({
            pn: -1,
            spn: -1,
            dataKey: "",
            pnMore: -1,
            itemSize: {
                width: 118,
                height: 98
            },
            itemTpl: "",
            tpl: '<div><div class="similarcase"></div></div>',
            layerTpl1: ['<div class="spread-layer" id="spread-layer">', '<p>本搜索结果为<a target="_blank" href="http://e.baidu.com/">商业推广</a>信息，请注意可能的风险。百度推出', '<a target="_blank" href="http://baozhang.baidu.com/guarantee/">网民权益保障计划</a>，', '<a target="_blank" href="https://passport.baidu.com/">登录</a>搜索有保障。</p>', "</div>"].join(""),
            layerTpl2: ['<div class="spread-layer" id="spread-layer">', '<p>本搜索结果为<a target="_blank" href="http://e.baidu.com/">商业推广</a>信息，请注意可能的风险。', '您当前为登录状态，已参加<a target="_blank" href="http://baozhang.baidu.com/guarantee/">网民权益保障计划</a>。', "</div>"].join("")
        },
        t),
        e = s.extend({
            cnt: ".similarcase"
        },
        e),
        i.call(this, e, t)
    }
    var s = e("common:widget/ui/base/base"),
    a = (e("common:widget/ui/base/events"), e("searchdetail:widget/ui/utils/lib"), e("searchdetail:widget/ui/utils/imghelper"), e("common:widget/ui/juicer/juicer")),
    i = e("searchdetail:widget/ui/controls/card/base/base"),
    n = e("searchdetail:widget/ui/statistic/statistic-core"),
    o = e("searchdetail:widget/ui/controls/card/nsAdII_similarCase/tplConf");
    return s.extend(t.prototype, i.prototype, {
        checkState: function(e) {
            var t = this.getDataByPosId("pc_detail_slider_right_relate_cases", e.fbResult),
            s = !!t;
            return s ? this.opts.pnMore = (e[this.opts.dataKey] || e).pn: (t = this.getDataByPosId("pc_detail_slider_right_relate_cases", this.opts.nsAdData), s = !!t),
            {
                hasContent: s,
                changed: s,
                dataObj: []
            }
        },
        addSpread: function(e) {
            var t = this,
            a = s(".similarcase-card").find(".tuiguang-spread"),
            i = !e.get("userName"),
            n = 0; ! s("#spread-layer").length && s("#wrapper").append(i ? t.opts.layerTpl1: t.opts.layerTpl2);
            var o = s("#spread-layer");
            o.css("display", "none"),
            a.off("click"),
            o.off("click"),
            s("#sider").off("scroll"),
            a.on("click",
            function() {
                n = a.offset().top - a.height() / 2,
                o.css("top") !== n + "px" && (o.hide(), o.css("top", n)),
                o.toggle(),
                "block" === o.css("display") && (t.clickTips = setTimeout(function() {
                    o.css("display", "none")
                },
                4e3))
            }),
            o.on("click",
            function() {
                o.toggle()
            }),
            s("#sider").scroll(function() {
                o.css("top", a.offset().top - a.height() / 2)
            })
        },
        updateView: function(e, t) {
            var i, r, d, l, p, c, m, u, h = this,
            g = "pc_detail_slider_right_relate_cases",
            f = this.getDataByPosId(g, e.fbResult),
            b = e.pn,
            y = {};
            f ? (i = f.Items[0].Images, p = f.Items[0].TemplateId, c = f.Items[0].BrandName, m = f.Items[0].AdTitle || "相关案例", u = f.Items[0].AdDesc || "查看详情") : (f = this.getDataByPosId(g, this.opts.nsAdData), r = f.Items, d = r.length, l = (b - this.opts.pnMore - 1) % d, i = r[l].Images, p = r[l].TemplateId, c = r[l].BrandName, m = r[l].AdTitle || "相关案例", u = r[l].AdDesc || "查看详情"),
            h.opts.iteamTpl = o[p],
            s(i).each(function(e, t) {
                if ("content" === t.AdPosition) {
                    y = s.extend({
                        cardTitle: m,
                        buttonDesc: u,
                        AdDesc: t.AdDesc,
                        imgUrl: t.ImageUrl,
                        targetUrl: t.AdLink
                    },
                    y);
                    var a = y.AdDesc.split("<br>");
                    y = s.extend({
                        mesData: a
                    },
                    y)
                }
                "logo" === t.AdPosition && (y = s.extend({
                    designerName: t.AdDesc,
                    portraitUrl: t.ImageUrl,
                    adlink: t.AdLink
                },
                y))
            }),
            (this.opts.pn !== t.get("pn") || this.opts.spn !== t.get("spn")) && (this.opts.pn = t.get("pn"), this.opts.spn = t.get("spn"), n.send("10.1010100", {
                as: c,
                pos: g,
                subpos: "0",
                shownum: "1",
                matcont: m,
                materialNum: "6"
            }), n.send("10.1010100", {
                as: c,
                pos: g,
                subpos: "0",
                shownum: "1",
                matcont: y.imgUrl,
                materialNum: "6"
            }), n.send("10.1010100", {
                as: c,
                pos: g,
                subpos: "0",
                shownum: "1",
                matcont: y.designerName,
                materialNum: "6"
            }), n.send("10.1010100", {
                as: c,
                pos: g,
                subpos: "0",
                shownum: "1",
                matcont: y.portraitUrl,
                materialNum: "6"
            }), n.send("10.1010100", {
                as: c,
                pos: g,
                subpos: "0",
                shownum: "1",
                matcont: y.AdDesc,
                materialNum: "6"
            }), n.send("10.1010100", {
                as: c,
                pos: g,
                subpos: "0",
                shownum: "1",
                matcont: u,
                materialNum: "6"
            })),
            h.elements.cnt.empty().append(a(h.opts.iteamTpl, y));
            var _ = s(".similarcase-link"),
            I = s(".similarcase-more");
            _.click(function() {
                n.send("10.1010101", {
                    as: c,
                    pos: g,
                    subpos: "0",
                    matcont: y.imgUrl,
                    tgTo: 1
                })
            }),
            I.click(function() {
                n.send("10.1010101", {
                    as: c,
                    pos: g,
                    subpos: "0",
                    matcont: u,
                    tgTo: 1
                })
            }),
            h.addSpread(t)
        }
    }),
    t
});;
/*!searchdetail:widget/ui/controls/card/photo/photo.js*/
define("searchdetail:widget/ui/controls/card/photo/photo",
function(i) {
    function t(i, t) {
        t = e.extend({
            dataKey: "",
            itemSize: {
                width: 78,
                height: 78
            },
            itemTpl: ['<li class="picbox">', '<span class="pic-loading-dot"></span>', '<a href="" target="_blank"><img /></a>', "</li>"].join(""),
            tpl: ['<div class="card-box similarpic-card">', '<h5 class="card-title"><i class="sticker"></i><span class="text">精美头像</span><i class="close"></i></h5>', '<div class="card-content">', '<ul class="clearfix piclist">', "</ul>", "</div>", "</div>"].join("")
        },
        t),
        i = e.extend({
            picList: ".piclist"
        },
        i),
        a.call(this, i, t)
    } {
        var e = i("common:widget/ui/base/base"),
        s = (i("common:widget/ui/utils/utils"), i("common:widget/ui/base/events"), i("searchdetail:widget/ui/utils/lib"), i("searchdetail:widget/ui/utils/imghelper")),
        a = i("searchdetail:widget/ui/controls/card/base/asyncard");
        i("searchdetail:widget/ui/statistic/statistic-core")
    }
    return e.extend(t.prototype, a.prototype, {
        checkProp: function(i) {
            return e.isArray(i) && i.length > 5 || !!i && e.isArray(i.piclist) && i.piclist.length > 5
        },
        renderContent: function(i) {
            if (!e.isArray(i)) {
                {
                    var t = i.piclist;
                    i["simi-listdata"]
                }
                i = t
            }
            var a = e("<ul></ul>"),
            c = this,
            l = (this.imgData, this.opts.itemSize);
            e(i).each(function(i, t) {
                var r = e(c.opts.itemTpl).appendTo(a),
                n = r.find("img"),
                o = {
                    cs: t.cs,
                    p: i + 1
                };
                r.find("a").attr("href", t.fromurl),
                s.loadImage([t.objurl],
                function(i) {
                    var e = s.scaleFull(i, l);
                    r.find(".pic-loading-dot").hide(),
                    n.css(e).attr("src", t.objurl)
                }),
                n.attr("data-src", t.objurl),
                r.find("a").attr("log-ext", e.json.stringify(o))
            }),
            this.elements.picList.empty().append(a.children()),
            this.$element.show()
        }
    }),
    t
});;
/*!searchdetail:widget/ui/controls/card/photographDetail/index.js*/
define("searchdetail:widget/ui/controls/card/photographDetail/index",
function(t) {
    function i(t, i) {
        i = e.extend({
            tpl: ['<div class="card-box photograph-detail">', '<div class="card-content">', "</div>", "</div>"].join(""),
            itemTpl: ["<div>", '<div class="summary">${summary}</div>', "{@if showpv}", '<div class="showpv">${showpv}浏览</div>', "{@/if}", "{@if description}", '<div class="description">${description}</div>', "{@/if}", '<div class="size">${width}x${height}</div>', "{@if tags && tags.length}", '<div class="tags">', "{@each tags as tag}", '<span class="tag">${tag}</span>', "{@/each}", "</div>", "{@/if}", '<div class="copyright">©版权归作者所有，请勿商用</div>', "</div>"].join("")
        },
        i),
        s.call(this, t, i)
    }
    var e = t("common:widget/ui/base/base"),
    a = t("common:widget/ui/juicer/juicer"),
    s = t("searchdetail:widget/ui/controls/card/base/base");
    return e.extend(i.prototype, s.prototype, {
        checkState: function(t) {
            var i = "1" === t.youtuType;
            return {
                hasContent: i,
                changed: i,
                dataObj: []
            }
        },
        updateView: function(t, i) {
            var s = i.data.spn + 1,
            d = i.data.rootImg.bdSetImgNum,
            o = +d ? s + "/" + d: "",
            c = t.setTitle || (t.fromPageTitleEnc ? "": i.data.word),
            n = t.browserPv || 0;
            this.elements.content.empty().append(e(a(this.opts.itemTpl, {
                summary: o + c,
                showpv: n,
                description: t.fromPageTitleEnc || "",
                width: t.width,
                height: t.height,
                tags: t.imageSetTag
            })))
        }
    }),
    i
});;
/*!searchdetail:widget/ui/controls/card/photographerInfo/index.js*/
define("searchdetail:widget/ui/controls/card/photographerInfo/index",
function(t) {
    function e(t, e) {
        e = i.extend({
            tpl: ['<div class="card-box photographer-info">', '<div class="card-content">', "</div>", "</div>"].join(""),
            itemTpl: ["<div>", '<i class="sticker"></i>', '<div class="photographer-detail">', '<img src="${portrait}" class="portrait" />', '<div class="name">${name}</div>', "</div>", "</div>"].join("")
        },
        e),
        n.call(this, t, e)
    }
    var i = t("common:widget/ui/base/base"),
    a = t("common:widget/ui/juicer/juicer"),
    n = t("searchdetail:widget/ui/controls/card/base/base"),
    o = t("searchdetail:widget/ui/statistic/statistic-core");
    return i.extend(e.prototype, n.prototype, {
        checkState: function(t) {
            var e = "1" === t.youtuType && !(!t.userData || !t.userData.Nickname);
            return {
                hasContent: e,
                changed: e,
                dataObj: []
            }
        },
        updateView: function(t, e) {
            var n = t.userData.Nickname,
            r = t.userData.Portrait,
            c = i(a(this.opts.itemTpl, {
                portrait: r,
                name: n
            })),
            d = e.get("word") || n;
            c.find(".name, .portrait").click(function() {
                window.open("/search/index?tn=baiduimage&ie=utf-8&word=" + encodeURIComponent(d)),
                o.send("5.1024100", {})
            }),
            this.elements.content.empty().append(c)
        }
    }),
    e
});;
/*!searchdetail:widget/ui/controls/card/photographerRecommend/index.js*/
define("searchdetail:widget/ui/controls/card/photographerRecommend/index",
function(e) {
    function t(e, t) {
        t = i.extend({
            dataKey: "",
            logKey: "photorecommend",
            recommendPeopleNum: 3,
            recommendPictureNum: 3,
            itemSize: {
                width: 80,
                height: 80
            },
            itemTpl: ['<div class="recommendContentItem">', '<div class="recommendPhotographer">', '<img class="portrait">', '<div class="name"></div>', '<div class="productNum"></div>', "</div>", '<div class="recommendPhotos">', '<ul class="piclist">', '<li class="piclistItem">', '<a href="" target="_blank"><img class="photo0"></a>', "</li>", '<li class="piclistItem">', '<a href="" target="_blank"><img class="photo1"></a>', "</li>", '<li class="piclistItem">', '<a href="" target="_blank"><img class="photo2"></a>', "</li>", "</ul>", "</div>", "</div>"].join(""),
            tpl: ['<div class="card-box photographer-recommend">', '<div class="card-content">', '<div class="recommendTitle">每日作者推荐</div>', '<div class="recommendContent"></div>', "</div>", "</div>"].join("")
        },
        t),
        e = i.extend({
            recommendContent: ".recommendContent"
        },
        e),
        a.call(this, e, t)
    }
    var i = e("common:widget/ui/base/base"),
    n = e("searchdetail:widget/ui/utils/imghelper"),
    a = e("searchdetail:widget/ui/controls/card/base/asyncard"),
    o = e("searchdetail:widget/ui/app/pagemodel"),
    r = e("searchdetail:widget/ui/utils/lib");
    return i.extend(t.prototype, a.prototype, {
        checkState: function(e) {
            var t = "1" === e.youtuType;
            return {
                hasContent: t,
                changed: t,
                dataObj: []
            }
        },
        renderContent: function(e, t, a) {
            var o = (a.map, i("<div></div>")),
            r = this,
            c = (this.imgData, this.opts.itemSize);
            i(e).each(function(e, t) {
                if (e > r.opts.recommendPeopleNum - 1) return ! 1;
                var a = i(r.opts.itemTpl).appendTo(o),
                d = a.find(".portrait");
                d.attr("src", t.userInfo.portrait);
                var s = a.find(".name");
                s.text(t.userInfo.nickname),
                a.find(".name, .portrait").click(function() {
                    r.sendPortraitClickLog(),
                    window.open("/search/index?tn=baiduimage&ie=utf-8&word=" + t.recommandQuery)
                });
                var m = a.find(".productNum");
                m.text(t.picCount + "张作品");
                var l = t.cateName;
                i(t.picData).each(function(e, i) {
                    if (e > r.opts.recommendPictureNum - 1) return ! 1;
                    var o = i.thumbURL,
                    d = a.find(".photo" + e);
                    d.parent().attr("href", r.getDetailURL(i, e, decodeURIComponent(t.recommandQuery), l)),
                    d.parent().click(function() {
                        r.sendRecommendPicClickLog()
                    }),
                    n.loadImage([o],
                    function(e) {
                        var t = n.scaleFull(e, c);
                        d.css(t).attr("src", o)
                    })
                })
            }),
            this.elements.recommendContent.empty().append(o.children()),
            this.$element.show()
        },
        getDetailURL: function(e, t, i, n) {
            return "/search/detail?ct=503316480&z=" + o.get("z") + "&tn=baiduimagedetail&ipn=d&word=" + encodeURIComponent(i) + "&step_word=" + (o.get("step_word") || "") + "&ie=" + o.get("ie") + "&in=" + (e.currentIndex || "") + "&cl=" + o.get("cl") + "&lm=" + o.get("lm") + "&st=" + o.get("st") + "&hd=" + o.get("hd") + "&latest=" + o.get("latest") + "&copyright=" + o.get("copyright") + "&cs=" + e.cs + "&os=" + e.os + "&simid=" + e.simid + "&pn=" + t + "&rn=1&di=" + e.di + "&fr=&fmq=" + this.getfmq() + "&fm=" + (o.get("fm") || "") + "&ic=" + o.get("ic") + "&s=" + o.get("s") + "&se=" + o.get("se") + "&sme=" + o.get("sme") + "&tab=" + (e.tab || 0) + "&width=" + o.get("width") + "&height=" + o.get("height") + "&face=" + e.face + "&is=" + e.is + "&istype=" + (o.get("istype") || 0) + "&ist=" + (e.source_type || "") + "&jit=" + o.get("jit") + "&bdtype=" + (e.bdSrcType || 0) + "&spn=" + (e.spn || 0) + ("&pi=" + (e.pi || "")) + "&gsm=" + (o.get("tmpGsm") || 0) + ( + o.get("hs") ? "&hs=" + o.get("hs") : "") + (o.get("oriquery") ? "&oriquery=" + o.get("oriquery") : "") + "&objurl=" + encodeURIComponent(r.uncompileURL(e.objURL)) + "&rpstart=" + (o.get("rpstart") || 0) + "&rpnum=" + (o.get("rpnum") || 0) + "&adpicid=" + (e.adPicId || 0) + "&catename=" + encodeURIComponent(n)
        },
        getfmq: function() {
            var e = new Date,
            t = e.getTime(),
            i = o.get("fmq"),
            n = "";
            return n = i && i.indexOf("m") > -1 && -1 === i.indexOf("_m") && -1 === i.indexOf("_R") ? t + "_" + i + "_R": t + "_R"
        },
        sendPortraitClickLog: function() {
            var e = "//imgstat.baidu.com/5.gif?p=1024101&tn=baiduimagedetail",
            t = new Image;
            t.src = e + "&" + (new Date).getTime()
        },
        sendRecommendPicClickLog: function() {
            var e = "//imgstat.baidu.com/5.gif?p=1024102&tn=baiduimagedetail",
            t = new Image;
            t.src = e + "&" + (new Date).getTime()
        }
    }),
    t
});;
/*!searchdetail:widget/ui/controls/card/photographRelated/index.js*/
define("searchdetail:widget/ui/controls/card/photographRelated/index",
function(a) {
    function i(a, i) {
        i = s.extend({
            tpl: ['<div class="card-box photograph-related">', '<h5 class="card-title">', '<i class="sticker"></i>', '<span class="text">相关作品</span>', '<a class="card-box-more" href="" target="_blank">', '<span class="card-box-more-text">更多</span>', '<i class="card-box-more-img"></i>', "</a>", '<i class="close"></i>', "</h5>", '<div class="card-content">', "</div>", "</div>"].join(""),
            itemTpl: ['<div class="imgs-box">', '<div class="left-box">', '<div class="half-box img-box box-0">', '<span class="pic-loading-dot"></span>', '<a href="" target="_blank"><img /></a>', "</div>", '<div class="half-box img-box box-1">', '<span class="pic-loading-dot"></span>', '<a href="" target="_blank"><img /></a>', "</div>", "</div>", '<div class="right-box">', '<div class="full-box img-box box-2">', '<span class="pic-loading-dot"></span>', '<a href="" target="_blank"><img /></a>', "</div>", "</div>", "</div>"].join("")
        },
        i),
        t.call(this, a, i)
    }
    var s = a("common:widget/ui/base/base"),
    t = (a("common:widget/ui/juicer/juicer"), a("searchdetail:widget/ui/controls/card/base/base"));
    return s.extend(i.prototype, t.prototype, {
        checkState: function(a) {
            var i = "1" === a.youtuType && !!a.relatedPhotographs;
            return {
                hasContent: i,
                changed: i,
                dataObj: []
            }
        },
        updateView: function() {}
    }),
    i
});;
/*!searchdetail:widget/ui/controls/card/relatedpic/relatedpic.js*/
define("searchdetail:widget/ui/controls/card/relatedpic/relatedpic",
function(t) {
    function i(t, i) {
        i = e.extend({
            itemSize: {
                width: 78,
                height: 78
            },
            itemTpl: ['<li class="picbox">', '<span class="pic-loading-dot"></span>', '<a href="" target="_blank">', '<img height=80 src="" />', "</a>", "</li>"].join(""),
            tpl: ['<div class="card-box relatedpic-card">', '<h5 class="card-title"><i class="sticker"></i><span class="text">同主题图片</span><i class="close"></i></h5>', '<div class="card-content">', '<h6><a href="" target="_blank"><span class="num"></span></a></h6>', '<ul class="clearfix piclist">', "</ul>", '<p class="src-row"><a href="" target="_blank"><span></span></a></p>', "</div>", "</div>"].join("")
        },
        i),
        t = e.extend({
            titleLink: "h6 a",
            picList: ".piclist",
            srcSite: ".src-row a"
        },
        t),
        c.call(this, t, i)
    }
    var e = t("common:widget/ui/base/base"),
    s = t("common:widget/ui/utils/utils"),
    a = (t("common:widget/ui/base/events"), t("searchdetail:widget/ui/utils/lib")),
    r = t("searchdetail:widget/ui/utils/imghelper"),
    c = t("searchdetail:widget/ui/controls/card/base/base");
    return e.extend(i.prototype, c.prototype, {
        updateView: function(t) {
            var i = e("<ul></ul>"),
            c = this,
            l = this.opts.itemSize,
            n = {
                t: t.topic,
                f: t.topicUrl
            };
            e(t.pics).each(function(t, s) {
                if (t > 2) return ! 1;
                var a = e(c.opts.itemTpl).appendTo(i),
                o = a.find("img"),
                d = s.thumbUrl || s.objUrl,
                p = e.extend({},
                n, {
                    f: s.fromUrl,
                    cs: s.cs || "",
                    sd: s.sd
                });
                a.find("a").attr("href", s.fromUrl),
                r.loadImage([d],
                function(t) {
                    var i = r.scaleFull(t, l);
                    a.find(".pic-loading-dot").hide(),
                    o.css(i).attr("src", d)
                }),
                o.attr("data-src", d),
                a.find("a").attr("log-ext", e.json.stringify(p))
            });
            var o = t.picNum ? 54 : 60,
            d = a.cutTextByCharWidth(s.trimTags(t.topic), o, "...", 1);
            t.picNum && (d += '<span class="num"><em>' + t.picNum + "</em>张</span>"),
            this.elements.titleLink.attr("href", t.topicUrl).html(d).attr("title", t.topic).attr("log-ext", e.json.stringify(n));
            var p = t.siteUrl || a.getHost(t.topicUrl);
            this.elements.srcSite.attr("href", p).attr("log-ext", e.json.stringify(n)).find("span").text(t.site || a.getSiteName(p)),
            this.elements.picList.empty().append(i.children())
        }
    }),
    i
});;
/*!searchdetail:widget/ui/controls/card/relationship/relationship.js*/
define("searchdetail:widget/ui/controls/card/relationship/relationship",
function(i) {
    function t(i, t) {
        t = e.extend({
            itemSize: {
                width: 123,
                height: 96
            },
            itemTpl: ['<li class="wiki-item" title="点击进入ta的百科">', '<div class="picbox">', '<span class="pic-loading-dot"></span>', '<a href="" target="_blank"><img /></a>', "</div>", '<div class="wiki-info"><span class="wiki-info-bg"></span><a class="wiki-name" href="" target="_blank"></a></div>', "</li>"].join(""),
            tpl: ['<div class="card-box relationship-card">', '<h5 class="card-title"><i class="sticker"></i><span class="text">八卦关系</span><i class="close"></i></h5>', '<div class="card-content">', '<div class="rs-info">', '<div class="rs-pics"></div>', '<div class="rs-name"><a target="_blank"></a></div>', "</div>", "</div>", "</div>"].join("")
        },
        t),
        i = e.extend({
            rsPics: ".rs-pics",
            rsName: ".rs-name a"
        },
        i),
        a.call(this, i, t)
    }
    var e = i("common:widget/ui/base/base"),
    s = (i("common:widget/ui/utils/utils"), i("common:widget/ui/base/events"), i("searchdetail:widget/ui/utils/lib"), i("searchdetail:widget/ui/utils/imghelper")),
    a = i("searchdetail:widget/ui/controls/card/base/base");
    return e.extend(t.prototype, a.prototype, {
        updateView: function(i) {
            var t = e("<div></div>"),
            s = e(this.opts.itemTpl).addClass("wiki-item-left").appendTo(t),
            a = e(this.opts.itemTpl).addClass("wiki-item-right").appendTo(t),
            n = i.entityA.name + " " + i.entityB.name + " " + i.relation,
            l = "https://www.baidu.com/s?wd=" + encodeURIComponent(n);
            elements = this.elements,
            this._setWikiInfo(s, i.entityA),
            this._setWikiInfo(a, i.entityB),
            elements.rsName.text(i.relation).attr("href", l),
            elements.rsPics.html(t.children())
        },
        _setWikiInfo: function(i, t) {
            var e = this.opts.itemSize;
            s.loadImage([t.pic],
            function(a) {
                var n = s.scaleFull(a, e);
                i.find(".pic-loading-dot").hide(),
                i.find("img").css(n).attr("src", t.pic)
            }),
            i.find(".picbox a").attr("href", t.url),
            i.find(".wiki-name").text(t.name).attr("href", t.url).attr("title", t.name)
        }
    }),
    t
});;
/*!searchdetail:widget/ui/controls/card/rsResult/rsResult.js*/
define("searchdetail:widget/ui/controls/card/rsResult/rsResult",
function(e) {
    function t(e, t) {
        var s = ['<li class="rsline" index="${index}">', '<a class="nolog" log-click="p=5.1010001&tpl=detailrs&rsword=${encodeQuery}&pos=${index}" href="https://www.baidu.com/s?wd=${relateSearchQuery}&rsv_dl=0_cont_img_big_${index}&rsf=${feature}&tn=SE_PCimageXG_2rz3bwdr" target="_blank">${relateSearchQuery}</a>', "</li>"];
        t = i.extend({
            dataKey: "rsResult",
            pointer: 0,
            isFirst: 1,
            itemTpl: s.join(""),
            tpl: ['<div class="card-box rsresult-card">', '<h5 class="card-title"><span class="text">去全网搜索</span></h5>', '<div class="card-content">', '<ul class="clearfix rslist">', "</ul>", "</div>", "</div>"].join("")
        },
        t),
        e = i.extend({
            rsList: ".rslist"
        },
        e),
        r.call(this, e, t)
    }
    var i = e("common:widget/ui/base/base"),
    s = (e("common:widget/ui/utils/utils"), e("common:widget/ui/base/events"), e("searchdetail:widget/ui/utils/lib"), e("searchdetail:widget/ui/utils/imghelper"), e("common:widget/ui/juicer/juicer")),
    r = e("searchdetail:widget/ui/controls/card/base/base"),
    a = e("searchdetail:widget/ui/statistic/statistic-core");
    return i.extend(t.prototype, r.prototype, {
        checkState: function(e) {
            var t = this.opts.rsResult,
            i = "1" === e.youtuType ? !1 : t && t.length;
            return {
                hasContent: i,
                changed: i,
                dataObj: i && t || []
            }
        },
        updateView: function(e) {
            if (!e.offset && e.pi && e.pi.length > 6 && !this.isFirst) return void(this.isFirst = 1);
            e = this.opts.rsResult;
            for (var t, i, r, n = "",
            l = 0,
            o = 0,
            d = 0,
            c = this.opts.pointer,
            u = e.length,
            h = [], p = this, g = [], m = 0, f = c; u > m; m++, f++) {
                if (f %= u, i = e[f].relateSearchQuery.match(/[^\x00-\xff]/g), r = i && i.length || 0, letter = e[f].relateSearchQuery.length - r, t = 14 * (r + 1) + 8 * letter, o += t, o > 250 && (l++, o = t, n += "</br>"), e[f].index = ++d, e[f].oriquery = this.opts.oriquery, e[f].encodeQuery = encodeURIComponent(e[f].relateSearchQuery), e[f].rsPersonalizedStr = "1" === e[f].rsPersonalized ? "&rspersonalized=1": "", l >= 3) {
                    this.opts.pointer = f;
                    break
                }
                h.push(e[f].relateSearchQuery),
                "1" === e[f].rsPersonalized && g.push(m + 1),
                n += s(this.opts.itemTpl, e[f])
            }
            if (2 > l) return setTimeout(function() {
                p.$element.hide()
            },
            50),
            !1;
            var w = {
                tpl: "detailrs",
                rstr: encodeURIComponent(h.join(","))
            };
            g.length && (w.rspn = g.join("$")),
            a.send("3.1010002", w),
            this.elements.rsList.empty().append(n),
            this.$element.show(),
            this.t++
        }
    }),
    t
});;
/*!searchdetail:widget/ui/controls/card/rsResult/rsResultAsync.js*/
define("searchdetail:widget/ui/controls/card/rsResult/rsResultAsync",
function(e) {
    function t(e, t) {
        t = i.extend({
            dataKey: "rsResult",
            itemTpl: ['<li class="rsline" index="${index}">', '<a class="nolog" log-click="p=5.1010001&tpl=detailrs&rsword=${encodeQuery}&pos=${index}" href="https://www.baidu.com/s?wd=${RelateSearchQuery}&rsv_dl=0_cont_img_big_${index}&rsf=${Feature}" target="_blank">${RelateSearchQuery}</a>', "</li>"].join(""),
            tpl: ['<div class="card-box rsresult-card">', '<h5 class="card-title"><span class="text">去全网搜索</span></h5>', '<div class="card-content">', '<ul class="clearfix rslist">', "</ul>", "</div>", "</div>"].join("")
        },
        t),
        e = i.extend({
            rsList: ".rslist"
        },
        e),
        r.call(this, e, t)
    }
    var i = e("common:widget/ui/base/base"),
    s = (e("common:widget/ui/utils/utils"), e("common:widget/ui/base/events"), e("searchdetail:widget/ui/utils/lib"), e("searchdetail:widget/ui/utils/imghelper"), e("common:widget/ui/juicer/juicer")),
    r = e("searchdetail:widget/ui/controls/card/base/asyncard"),
    n = e("searchdetail:widget/ui/statistic/statistic-core");
    return i.extend(t.prototype, r.prototype, {
        checkProp: function(e) {
            return e && i.isArray(e) && e.length > 4
        },
        renderContent: function(e) {
            for (var t, i, r, a = "",
            l = 0,
            c = 0,
            o = 0,
            d = (this.opts.pointer, e.length), u = [], h = this, p = 0; d > p && (i = e[p].RelateSearchQuery.match(/[^\x00-\xff]/g), r = i && i.length || 0, letter = e[p].RelateSearchQuery.length - r, t = 14 * (r + 1) + 8 * letter, c += t, c > 250 && (l++, c = t, a += "</br>"), e[p].index = ++o, e[p].oriquery = this.opts.oriquery, e[p].encodeQuery = encodeURIComponent(e[p].RelateSearchQuery), !(l >= 3)); p++) u.push(e[p].RelateSearchQuery),
            a += s(this.opts.itemTpl, e[p]);
            return 2 > l ? (setTimeout(function() {
                h.$element.hide()
            },
            50), !1) : (n.send("3.1010002", {
                tpl: "detailrs",
                rstr: encodeURIComponent(u.join(","))
            }), this.elements.rsList.empty().append(a), this.$element.show(), void this.t++)
        }
    }),
    t
});;
/*!searchdetail:widget/ui/controls/card/scenicspot/scenicspot.js*/
define("searchdetail:widget/ui/controls/card/scenicspot/scenicspot",
function(t) {
    function i(t, i) {
        i = e.extend({
            dataKey: "",
            itemSize: {
                width: 118,
                height: 88
            },
            itemTpl: ['<li class="scenicspot-item">', '<div class="picbox">', '<span class="pic-loading-dot"></span>', '<a href="" target="_blank"><img /></a>', "</div>", '<h6 class="scenicspot-item-title"><span class="scenicspot-item-title-bg"></span><a href="" target="_blank"></a></h6>', "</li>"].join(""),
            tpl: ['<div class="card-box scenicspot-card">', '<h5 class="card-title"><i class="sticker"></i><span class="text">景点推荐</span><i class="close"></i></h5>', '<div class="card-content">', '<div class="scenicspot-info">', "</div>", '<ul class="clearfix piclist">', "</ul>", '<a class="morebtn" href="" target="_blank">更多景点&gt;</a>', "</div>", "</div>"].join(""),
            scenicspotInfoTpl: '<h6><a class="title" target="_blank" href=""></a><span class="src-site">(来自：<a target="_blank" href=""></a>)</span></h6>'
        },
        i),
        t = e.extend({
            picList: ".piclist",
            scenicspotInfo: ".scenicspot-info"
        },
        t),
        c.call(this, t, i)
    }
    var e = t("common:widget/ui/base/base"),
    s = (t("common:widget/ui/utils/utils"), t("common:widget/ui/base/events"), t("searchdetail:widget/ui/utils/lib"), t("searchdetail:widget/ui/utils/imghelper")),
    c = t("searchdetail:widget/ui/controls/card/base/asyncard");
    return e.extend(i.prototype, c.prototype, {
        resetContent: function() {
            var t = this.elements.picList;
            this.elements.scenicspotInfo.empty(),
            t && t.html('<li class="card-loading"></li>')
        },
        checkProp: function(t) {
            var i = 4;
            return ! t || !t.picList || !t.picList.length || t.picList.length < i ? !1 : !0
        },
        renderContent: function(t) {
            var i = e("<ul></ul>"),
            c = e("<div></div>"),
            a = this,
            n = this.opts.itemSize,
            l = (this.opts.dataKey, 4),
            r = t.picList,
            o = (e(a.opts.scenicspotInfoTpl).appendTo(c), c.find("h6"));
            o.find(".title").text(t.city).attr("href", t.moreUrl),
            o.find(".src-site a").attr({
                href: t.srcUrl
            }).text(t.srcSite),
            e(r).each(function(t, c) {
                if (t > l - 1) return ! 1;
                var r = e(a.opts.itemTpl).appendTo(i),
                o = r.find(".picbox img"),
                p = c.picUrl;
                r.find("a").attr("href", c.fromUrl),
                s.loadImage([p],
                function(t) {
                    var i = s.scaleFull(t, n);
                    r.find(".pic-loading-dot").hide(),
                    o.css(i).attr("src", p)
                }),
                o.attr("data-src", p),
                r.find(".scenicspot-item-title a").text(c.name).attr("title", c.name)
            }),
            this.elements.content.find(".morebtn").attr("href", t.moreUrl),
            this.elements.scenicspotInfo.empty().html(c.children()),
            this.elements.picList.empty().append(i.children()),
            this.$element.show()
        }
    }),
    i
});;
/*!searchdetail:widget/ui/controls/card/sim_travel/sim_travel.js*/
define("searchdetail:widget/ui/controls/card/sim_travel/sim_travel",
function(t) {
    function i(t, i) {
        i = a.extend({
            dataKey: "sim_travel",
            logKey: "sim_travel",
            itemSize: {
                width: 118,
                height: 88
            },
            itemTpl: ['<li class="picbox">', '<span class="pic-loading-dot"></span>', '<a href="" target="_blank"><img /></a>', '<a class="desc" href="" target="_blank"></a>', "</li>"].join(""),
            tpl: ['<div class="card-box sim_travel_card">', '<h5 class="card-title"><i class="sticker"></i><span class="text">相似景点</span><i class="close"></i></h5>', '<div class="card-content">', '<ul class="clearfix piclist">', "</ul>", '<span href="http://www.qunar.com/" target="_blank" class="dataprovider">来自：<a href="http://www.qunar.com/" target="_blank">去哪儿网</a></span>', "</div>", "</div>"].join("")
        },
        i),
        t = a.extend({
            picList: ".piclist"
        },
        t),
        s.call(this, t, i)
    }
    var a = t("common:widget/ui/base/base"),
    e = (t("common:widget/ui/utils/utils"), t("common:widget/ui/base/events"), t("searchdetail:widget/ui/utils/lib"), t("searchdetail:widget/ui/utils/imghelper")),
    s = t("searchdetail:widget/ui/controls/card/base/base");
    return a.extend(i.prototype, s.prototype, {
        updateView: function(t, i) {
            {
                var s = a("<ul></ul>"),
                l = this,
                c = (this.imgData, this.opts.itemSize);
                i.get("imgData").cs,
                i.get("word")
            }
            a(t.cont).each(function(t, i) {
                if (! (t > 3)) {
                    var r = a(l.opts.itemTpl);
                    t % 2 === 1 && r.css("margin-left", 12),
                    r.appendTo(s);
                    var n = r.find("img"),
                    d = {
                        cs: i.cs,
                        p: t + 1
                    };
                    r.find("a").attr("href", i.caseurl),
                    r.find(".desc").html(i.city ? i.city + "-" + i.spotname: i.spotname),
                    e.loadImage([i.picurl],
                    function(t) {
                        var a = e.scaleFull(t, c);
                        r.find(".pic-loading-dot").hide(),
                        n.css(a).attr("src", i.picurl)
                    }),
                    n.attr("data-src", i.imgUrl),
                    r.find("a").attr("log-ext", a.json.stringify(d))
                }
            }),
            this.elements.picList.empty().append(s.children())
        }
    }),
    i
});;
/*!searchdetail:widget/ui/controls/card/similarpic/similarpic.js*/
define("searchdetail:widget/ui/controls/card/similarpic/similarpic",
function(i) {
    function t(i, t) {
        t = e.extend({
            dataKey: "xiangshi_info",
            itemSize: {
                width: 78,
                height: 78
            },
            itemTpl: ['<li class="picbox">', '<span class="pic-loading-dot"></span>', '<a href="" target="_blank"><img /></a>', "</li>"].join(""),
            tpl: ['<div class="card-box similarpic-card" id="similarpicCard">', '<h5 class="card-title"><i class="sticker"></i><span class="text">相似图片</span><i class="close"></i></h5>', '<div class="card-content">', '<ul class="clearfix piclist">', "</ul>", '<div class="moresimilarpic"><a href="" target="_blank">更多相似图片></a></div>', "</div>", "</div>"].join("")
        },
        t),
        i = e.extend({
            picList: ".piclist"
        },
        i),
        s.call(this, i, t)
    }
    var e = i("common:widget/ui/base/base"),
    a = (i("common:widget/ui/utils/utils"), i("common:widget/ui/base/events"), i("searchdetail:widget/ui/utils/lib"), i("searchdetail:widget/ui/utils/imghelper")),
    s = i("searchdetail:widget/ui/controls/card/base/base");
    return e.extend(t.prototype, s.prototype, {
        checkState: function(i) {
            var t = s.prototype.checkState.call(this, i),
            i = this.getDataByPosId("pc_detail_slider_right_relate_img", this.opts.nsAdData),
            e = !!i;
            return (t.hasContent && t.dataObj.length < 6 || e) && (t.hasContent = !1),
            t
        },
        updateView: function(i, t) {
            var s = e("<ul></ul>"),
            c = this,
            l = this.imgData,
            r = this.opts.itemSize,
            n = t.get("imgData").cs,
            d = t.get("word"),
            o = t.get("imgData").bdSrcType,
            p = (t.get("imgData").fromPageTitle, t.get("imgData").picDesc, encodeURIComponent(t.get("bigImgUrl"))),
            g = "/n/pc_list?queryImageUrl=" + p + "&querysign=" + n + "&query=" + d + "&srctype=" + o + "&fp=searchdetail&pos=card&fm=searchdetail&uptype=button#tab=similar";
            e(i).each(function(i, t) {
                var n = e(c.opts.itemTpl).appendTo(s),
                d = n.find("img"),
                o = {
                    cs: t.cs,
                    p: i + 1
                };
                n.find("a").attr("href", t.detailUrl + "&bdtype=" + encodeURIComponent(l.bdSrcType || "") + "&simics=" + encodeURIComponent(l.cs)),
                a.loadImage([t.imgUrl],
                function(i) {
                    var e = a.scaleFull(i, r);
                    n.find(".pic-loading-dot").hide(),
                    d.css(e).attr("src", t.imgUrl)
                }),
                d.attr("data-src", t.imgUrl),
                n.find("a").attr("log-ext", e.json.stringify(o))
            }),
            this.elements.cntWrapper.find(".moresimilarpic").find("a").attr("href", g).attr("log-click", ""),
            this.elements.picList.empty().append(s.children())
        }
    }),
    t
});;
/*!searchdetail:widget/ui/controls/card/similarpic/similarpicasync.js*/
define("searchdetail:widget/ui/controls/card/similarpic/similarpicasync",
function(i) {
    function t(i, t) {
        t = e.extend({
            dataKey: "",
            logKey: "xiangsi",
            itemSize: {
                width: 78,
                height: 78
            },
            itemTpl: ['<li class="picbox">', '<span class="pic-loading-dot"></span>', '<a href="" target="_blank"><img /></a>', "</li>"].join(""),
            tpl: ['<div class="card-box similarpic-card" id="similarpicCard">', '<h5 class="card-title"><i class="sticker"></i><span class="text">相似图片</span></h5>', '<div class="card-content">', '<ul class="clearfix piclist">', "</ul>", "</div>", "</div>"].join("")
        },
        t),
        i = e.extend({
            picList: ".piclist"
        },
        i),
        s.call(this, i, t)
    }
    var e = i("common:widget/ui/base/base"),
    a = (i("common:widget/ui/utils/utils"), i("common:widget/ui/base/events"), i("searchdetail:widget/ui/utils/lib"), i("searchdetail:widget/ui/utils/imghelper")),
    s = i("searchdetail:widget/ui/controls/card/base/asyncard"),
    c = i("searchdetail:widget/ui/statistic/statistic-core");
    return e.extend(t.prototype, s.prototype, {
        checkProp: function(i) {
            var t = (this.getDataByPosId("pc_detail_slider_right_relate_img", this.opts.nsAdData), i && e.isArray(i) && i.length > 5 || i && e.isArray(i.piclist) && i.piclist.length > 5),
            a = this.opts.tjadData || {},
            s = a.adType,
            c = a.adData,
            n = !!c && c.length > 2 && c[0].AdTagList,
            r = a.adSrc,
            l = 3 === s && 4 === r && !!c && n && this.opts.pnMore < 4;
            return l = l && !window.samplekey.match("UI_PC_TJAD:0"),
            t && !l
        },
        renderContent: function(i, t) {
            var s = t.map,
            c = ("/n/pc_list?queryImageUrl=" + encodeURIComponent(this.imgData.thumbURL) + "&querySign=" + t.SimiCs + "&query=" + encodeURIComponent(t.query) + "&srctype=" + (t.srctype || 0) + "&fp=searchdetail&pos=card&fm=searchdetail&uptype=button&objtype=" + (s ? s.cloth_info ? 1 : s.bag_info ? 2 : 0 : 0) + "#activeTab=3", e("<ul></ul>")),
            n = this,
            r = this.imgData,
            l = this.opts.itemSize,
            d = e("#sider"),
            o = d.width() - d[0].clientWidth;
            e(i).each(function(i, t) {
                if (i > 5) return ! 1;
                var s = e(n.opts.itemTpl).appendTo(c),
                d = s.find("img"),
                p = {
                    cs: t.cs,
                    p: i + 1
                };
                s.find("a").attr("href", t.detailUrl + "&simics=" + encodeURIComponent(r.cs) + "&cardserver=1&srctype=" + t.srctype + "&bdtype=" + t.srctype).click(function(i) {
                    i.preventDefault();
                    var t = e(this).attr("href") + "&ctd=" + (new Date).getTime() + "^3_" + (e(window).width() - o) + "X" + e(window).height() + "%1";
                    window.open(t, "_blank")
                }),
                a.loadImage([t.imgUrl],
                function(i) {
                    var e = a.scaleFull(i, l);
                    s.find(".pic-loading-dot").hide(),
                    d.css(e).attr("src", t.imgUrl)
                }),
                d.attr("data-src", t.imgUrl),
                s.find("a").attr("log-ext", e.json.stringify(p))
            }),
            this.elements.picList.empty().append(c.children()),
            "相似图片" !== e(".relate-img-card").find(".text").html() && this.$element.show(),
            this.bindEvent()
        },
        bindEvent: function() {
            var i = this;
            i.isClick = !1,
            this.$element.on("mousedown", ".picbox [log-click]",
            function() {
                i.isClick || (c.graphSend({
                    tn: "pc",
                    fm: "xiangsi",
                    tag: "card",
                    pro_n: "pc_web_click"
                }), i.isClick = !0)
            }).on("mouseup", ".picbox [log-click]",
            function() {
                i.isClick = !1
            })
        }
    }),
    t
});;
/*!searchdetail:widget/ui/controls/card/spreadHint/spreadHint.js*/
define("searchdetail:widget/ui/controls/card/spreadHint/spreadHint",
function(e) {
    function t(e, t) {
        t = i.extend({
            timer: null,
            layer: null,
            tpl: ['<div class="spread-hint-box">', "</div>"].join(""),
            btnTpl: ['<div class="spread-hint-btn">商业推广', "</div>"].join(""),
            layerTpl: ['<div class="spread-hint-layer" id="spread-hint-layer">', "<h3>商业推广</h3>", "<p>本搜索结果为商业推广信息，请注意可能的风险。百度推出", '<a target="_blank" href="http://baozhang.baidu.com/guarantee/">网民权益保障计划</a>，', '<a target="_blank" href="https://passport.baidu.com/">登录</a>搜索有保障</p>', "</div>"].join("")
        },
        t),
        e = i.extend({
            spreadButton: ".spread-button"
        },
        e),
        a.call(this, e, t)
    } {
        var i = e("common:widget/ui/base/base"),
        a = (e("common:widget/ui/utils/utils"), e("common:widget/ui/base/events"), e("searchdetail:widget/ui/utils/lib"), e("searchdetail:widget/ui/utils/imghelper"), e("common:widget/ui/juicer/juicer"), e("searchdetail:widget/ui/controls/card/base/base"));
        e("searchdetail:widget/ui/statistic/statistic-core")
    }
    return i.extend(t.prototype, a.prototype, {
        checkState: function(e) {
            var t = this.opts.nsAdData,
            i = this.getDataByPosId("pc_detail_slider_right_pic_info", t),
            a = this.getDataByPosId("pc_detail_slider_right_pic_info", e.fbResult),
            s = i && "0" !== e.adType || a;
            return {
                hasContent: s,
                changed: s,
                dataObj: []
            }
        },
        updateView: function() {
            var e = this,
            t = e.elements,
            a = t.cntWrapper,
            s = a.find(".spread-hint-btn");
            if (!s.length) {
                a.append(e.opts.btnTpl),
                i("#wrapper").append(e.opts.layerTpl),
                e.opts.layer = i("#spread-hint-layer");
                var r = i("#sider").width(),
                n = i("#header").height();
                e.opts.layer.css({
                    top: n + 20 + "px",
                    right: r + "px"
                }),
                e.bindEvents()
            }
        },
        bindEvents: function() {
            var e = this,
            t = e.elements,
            a = t.cntWrapper,
            s = a.find(".spread-hint-btn");
            s.on("click",
            function() {
                var t = i(this);
                clearTimeout(e.opts.timer),
                t.hasClass("layer-show") ? (t.removeClass("layer-show"), e.opts.layer.hide()) : (t.addClass("layer-show"), e.opts.layer.show(), e.opts.timer = setTimeout(function() {
                    e.opts.layer.hide(),
                    t.removeClass("layer-show")
                },
                4e3))
            }),
            e.opts.layer.hover(function() {
                i(this);
                clearTimeout(e.opts.timer)
            },
            function() {
                i(this);
                clearTimeout(e.opts.timer),
                s.removeClass("layer-show"),
                e.opts.layer.hide()
            }),
            e.opts.layer.on("click",
            function() {
                clearTimeout(e.opts.timer),
                e.opts.layer.hide()
            })
        }
    }),
    t
});;
/*!searchdetail:widget/ui/controls/card/suCard/suCard.js*/
define("searchdetail:widget/ui/controls/card/suCard/suCard",
function(i) {
    function s(i, s) {
        s = t.extend({
            itemSize: {
                width: 78,
                height: 78
            },
            itemTpl: ['<li class="picbox">', '<span class="pic-loading-dot"></span>', '<a href="" target="_blank">', '<img height=80 src="" />', "</a>", "</li>"].join(""),
            tpl: ['<div class="card-box suCard">', '<h5 class="card-title"><i class="sticker"></i><span class="text">热门推广</span><i class="close"></i></h5>', '<div class="card-content">', '<div class="clearfix piclist">', "</div>", '<p class="src-row"><a href="" target="_blank"><span></span></a></p>', "</div>", "</div>"].join("")
        },
        s),
        i = t.extend({
            titleLink: "h6 a",
            picList: ".piclist",
            srcSite: ".src-row a"
        },
        i),
        a.call(this, i, s)
    }
    var t = i("common:widget/ui/base/base"),
    a = (i("searchdetail:widget/ui/statistic/statistic-core"), i("searchdetail:widget/ui/controls/card/base/base")),
    e = i("searchdetail:widget/sning1/sning1");
    return t.extend(s.prototype, a.prototype, {
        updateView: function() {
            e.show({
                container: this.elements.picList.empty()
            })
        }
    }),
    s
});;
/*!searchdetail:widget/ui/controls/card/tjAd/tjAd.js*/
define("searchdetail:widget/ui/controls/card/tjAd/tjAd",
function(t) {
    function a(t, a) {
        a = e.extend({
            pn: -1,
            spn: -1,
            dataKey: "",
            pnMore: 0,
            itemSize: {
                width: 118,
                height: 98
            },
            itemTpl: ['<a class="tjadCard-link" href="${targetUrl}" target="_blank">', '<img class="tjadCard-pic" src="${imgUrl}"/>', '<div class="tjad-message">', '<span class="tjad-desc" title="${adTitle}">${adTitle}</span>', '{@each tags as item}<span class="tjad-tag">${item}</span>{@/each}', '<span class="price">${price}</span>', "</div>", '<div class="tjad-logo" title="${adlink}"><img src="${logoUrl}"></div>', "</a>"].join(""),
            tpl: ['<div class="card-box tjadCard">', '<h5 class="card-title">', '<i class="sticker"></i>', '<span class="text">相关商品</span>', '<span class="tuiguang-spread">品牌广告</span>', '<i class="close"></i>', "</h5>", '<div class="card-content">', "</div>", "</div>"].join(""),
            layerTpl1: ['<div class="spread-layer" id="spread-layer">', '<p>本搜索结果为<a target="_blank" href="http://e.baidu.com/">商业推广</a>信息，请注意可能的风险。百度推出', '<a target="_blank" href="http://baozhang.baidu.com/guarantee/">网民权益保障计划</a>，', '<a target="_blank" href="https://passport.baidu.com/">登录</a>搜索有保障。</p>', "</div>"].join(""),
            layerTpl2: ['<div class="spread-layer" id="spread-layer">', '<p>本搜索结果为<a target="_blank" href="http://e.baidu.com/">商业推广</a>信息，请注意可能的风险。', '您当前为登录状态，已参加<a target="_blank" href="http://baozhang.baidu.com/guarantee/">网民权益保障计划</a>。', "</div>"].join("")
        },
        a),
        t = e.extend({
            cnt: ".card-content"
        },
        t),
        s.call(this, t, a)
    }
    var e = t("common:widget/ui/base/base"),
    i = t("common:widget/ui/juicer/juicer"),
    s = t("searchdetail:widget/ui/controls/card/base/base"),
    n = (t("searchdetail:widget/ui/statistic/statistic-core"), 1);
    return e.extend(a.prototype, s.prototype, {
        checkState: function() {
            var t = this.opts.tjadDat || {},
            a = t.adType,
            e = t.adData,
            i = !!e && e.length > 2 && e[0].AdTagList,
            s = t.adSrc,
            n = 3 === a && 4 === s && !!e && i && this.opts.pnMore < 4;
            return n = n && !window.samplekey.match("UI_PC_TJAD:0"),
            {
                hasContent: n,
                changed: n,
                dataObj: []
            }
        },
        addSpread: function(t) {
            var a = this,
            i = e(".tjadCard").find(".tuiguang-spread"),
            s = !t.get("userName"),
            n = 0; ! e("#spread-layer").length && e("#wrapper").append(s ? a.opts.layerTpl1: a.opts.layerTpl2);
            var d = e("#spread-layer");
            d.css("display", "none"),
            i.off("click"),
            d.off("click"),
            e("#sider").off("scroll"),
            i.on("click",
            function() {
                n = i.offset().top - i.height() / 2,
                d.css("top") !== n + "px" && (d.hide(), d.css("top", n)),
                d.toggle(),
                "block" === d.css("display") && (a.clickTips = setTimeout(function() {
                    d.css("display", "none")
                },
                4e3))
            }),
            d.on("click",
            function() {
                d.toggle()
            }),
            e("#sider").scroll(function() {
                d.css("top", i.offset().top - i.height() / 2)
            })
        },
        addView: function(t, a) {
            var e, s = {},
            n = []; ! a || t >= a.length || (e = a[t], !!e.AdTagList && (n = e.AdTagList.split(",")), s = {
                imgUrl: e.Base64 || e.PicUrl,
                targetUrl: e.AdLink,
                adlink: e.AdLink,
                logoUrl: e.AdLogoUrl,
                price: e.AdPrice || 0,
                tags: n,
                adTitle: e.AdTitel,
                adDesc: e.AdDesc
            },
            this.elements.cnt.append(i(this.opts.itemTpl, s)))
        },
        sendLog: function(t) {
            var a = function() {
                var t = (new Date).getTime() + "-",
                a = 0;
                return function() {
                    return t + a++
                }
            } (),
            e = a(),
            i = new Image;
            i.onload = i.onerror = function() {
                i.onload = i.onerror = null,
                i = null
            },
            i.src = t + "&_uid=" + e
        },
        updateView: function(t, a) {
            var i = this,
            s = this.opts.tjadData,
            d = s.adData,
            r = d.length,
            c = s.tjUrl,
            o = i.opts.pnMore,
            l = window.samplekey.match("UI_PC_TJAD:1") ? 1 : 2,
            p = this.opts.pn !== a.get("pn") || this.opts.spn !== a.get("spn");
            e(".similarpic-card").hide(),
            i.elements.cnt.empty(),
            1 === l ? (i.addView(o, d), n = 1) : (i.addView(2 * o % r, d), i.addView((2 * o + 1) % r, d), n = 2),
            p && (this.opts.pn = a.get("pn"), this.opts.spn = a.get("spn"), i.sendLog(c + "&actionid=4&attach=" + o + "|src=detail|render_type=" + n), 1 !== l && i.sendLog(c + "&actionid=4&attach=" + o + "|src=detail|render_type=" + n));
            e(".tjadCard-link");
            e(".tjadCard-link").click(function() {
                i.sendLog(c + "&actionid=2&attach=" + o + "|src=detail|render_type=" + n)
            }).mouseenter(function() {
                i.sendLog(c + "&actionid=1&attach=" + o + "|src=detail|render_type=" + n)
            }),
            i.addSpread(a),
            i.opts.pnMore++
        }
    }),
    a
});;
/*!searchdetail:widget/ui/controls/card/travelnotes/travelnotes.js*/
define("searchdetail:widget/ui/controls/card/travelnotes/travelnotes",
function(t) {
    function i(t, i) {
        i = e.extend({
            dataKey: "",
            itemSize: {
                width: 120,
                height: 90
            },
            itemTpl: ['<li class="travelnotes-item">', '<div class="item-pic-img picbox">', '<span class="pic-loading-dot"></span>', '<a href="" target="_blank"><img /></a>', "</div>", '<ul class="item-pic-info">', '<li><h6><a href="" target="_blank"></a></h6></li>', '<li>行程共<span class="time-spend"></span>天</li>', '<li><span class="start-time"></span>出发</li>', "</ul>", "</li>"].join(""),
            tpl: ['<div class="card-box travelnotes-card">', '<h5 class="card-title"><i class="sticker"></i><span class="text">景点游记</span><i class="close"></i></h5>', '<div class="card-content">', '<ul class="clearfix piclist">', "</ul>", '<a class="morebtn" href="" target="_blank">更多游记&gt;</a>', "</div>", "</div>"].join("")
        },
        i),
        t = e.extend({
            picList: ".piclist"
        },
        t),
        s.call(this, t, i)
    }
    var e = t("common:widget/ui/base/base"),
    a = (t("common:widget/ui/utils/utils"), t("common:widget/ui/base/events"), t("searchdetail:widget/ui/utils/lib"), t("searchdetail:widget/ui/utils/imghelper")),
    s = t("searchdetail:widget/ui/controls/card/base/asyncard");
    return e.extend(i.prototype, s.prototype, {
        resetContent: function() {
            var t = this.elements.picList;
            t && t.html('<li class="card-loading"></li>')
        },
        checkProp: function(t) {
            var i = 2;
            return ! t || !t.data || !t.data.length || t.data.length < i ? !1 : !0
        },
        renderContent: function(t) {
            var i = e("<ul></ul>"),
            s = this,
            l = this.opts.itemSize,
            n = (this.opts.dataKey, 2),
            r = t.data;
            e(r).each(function(t, r) {
                if (t > n - 1) return ! 1;
                var c = e(s.opts.itemTpl).appendTo(i),
                d = c.find(".item-pic-img img"),
                o = r.image,
                p = c.find(".item-pic-info");
                c.find("a").attr("href", r.url),
                a.loadImage([o],
                function(t) {
                    var i = a.scaleFull(t, l);
                    c.find(".pic-loading-dot").hide(),
                    d.css(i).attr("src", o)
                }),
                d.attr("data-src", o),
                p.find("h6>a").text(r.title).attr({
                    title: r.title,
                    href: r.url
                }),
                p.find(".time-spend").text(r.routeDays),
                p.find(".start-time").text(r.startTime)
            }),
            this.elements.content.find(".morebtn").attr("href", t.moreUrl),
            this.elements.picList.empty().append(i.children()),
            this.$element.show()
        }
    }),
    i
});;
/*!searchdetail:widget/ui/controls/card/wallpaper/wallpaper.js*/
define("searchdetail:widget/ui/controls/card/wallpaper/wallpaper",
function(t) {
    function e(t, e) {
        e = a.extend({
            dataKey: "wallp_info",
            itemTpl: ["<li>", '<p class="size-info">', '<span class="info-text info-size"></span>', '<span class="vsep">|</span><span class="info-text info-bytes"></span>', '<span class="vsep">|</span><span class="info-text info-type"></span>', "</p>", '<p class="url-info">', '<a class="cardbtn cardbtn-small preview-btn" href="javascript:void(0);">预览<span class="flashcon"></span></a>', '<a class="cardbtn cardbtn-small download-btn" href="javascript:void(0);">下载</a>', '<a class="src-site" href="" target="_blank" target="_blank">（来自：<span></span>）</a>', "</p>", "</li>"].join(""),
            tpl: ['<div class="card-box wallpaper-card">', '<h5 class="card-title"><i class="sticker"></i><span class="text">壁纸下载</span><i class="close"></i></h5>', '<div class="card-content">', "<h6>您电脑屏幕的尺寸：" + window.screen.width + "&#215;" + window.screen.height + "</h6>", '<p class="subtitle">发现<span class="num"></span>个适合的壁纸</p>', '<ul class="info-list">', "</ul>", "</div>", "</div>"].join("")
        },
        e),
        this._validData = null,
        t = a.extend({
            infoList: ".info-list",
            num: ".subtitle .num"
        },
        t),
        l.call(this, t, e)
    }
    var a = t("common:widget/ui/base/base"),
    i = (t("common:widget/ui/utils/utils"), t("common:widget/ui/base/events"), t("searchdetail:widget/ui/utils/lib")),
    n = t("searchdetail:widget/ui/utils/imghelper"),
    s = t("searchdetail:widget/ui/utils/swf"),
    l = t("searchdetail:widget/ui/controls/card/base/base");
    return a.extend(e.prototype, l.prototype, {
        checkState: function(t) {
            var e = l.prototype.checkState.call(this, t);
            if (e.hasContent && e.changed) {
                var i = window.screen.width,
                n = window.screen.height;
                this._validData = a(e.dataObj).filter(function(t, e) {
                    return e.w >= i && e.h >= n
                }),
                this._validData = a(this._validData).sort(function(t, e) {
                    return t.w != e.w ? t.w > e.w: t.h > e.h
                }),
                e.hasContent = !(!this._validData || !this._validData.length)
            }
            return e
        },
        updateView: function() {
            var t, e = a("<ul></ul>"),
            s = this,
            l = [];
            a(this._validData).each(function(r, o) {
                if (r > 2) return ! 1;
                t = a(s.opts.itemTpl).appendTo(e);
                var d = t.find(".info-type"),
                c = t.find(".info-size"),
                p = t.find(".info-bytes");
                previewBtn = t.find(".preview-btn"),
                downloadLink = t.find(".download-btn"),
                infoSite = t.find(".src-site"),
                infoExt = {
                    s: (o.w || "0") + "x" + (o.h || "0")
                };
                var h = o.fm || n.getFileType(o.objurl);
                d.text(h.toUpperCase()),
                c.html(o.w + "&#215;" + o.h);
                var f = 1 * (o.size || 0);
                f ? p.text(n.formatBytes(f, 0, Math.floor).toUpperCase()).show().prev().show() : p.hide().prev().hide(),
                previewBtn.attr("data-src", o.objurl),
                downloadLink.attr("href", "/search/down?tn=download&word=download&ie=utf8&fr=detail&url=" + encodeURIComponent(o.objurl)),
                infoSite.attr("href", "http://" + o.s).find("span").text(o.siteName || i.getSiteName(o.s)),
                l.push({
                    id: "wallpcard_preview_" + r,
                    width: o.w,
                    height: o.h,
                    imgSrc: o.objurl,
                    flashCon: t.find(".preview-btn .flashcon")
                }),
                t.find("a").attr("log-ext", a.json.stringify(infoExt))
            }),
            this.elements.num.text(this._validData.length),
            this.elements.infoList.empty().append(e.children()),
            a(l).each(function(t, e) {
                s.initPreview(e.id, e.imgSrc, e.width, e.height, e.flashCon.get(0))
            })
        },
        initPreview: function(t, e, a, i, n) {
            e = "/search/down?tn=download&word=download&ie=utf8&fr=detailWall&url=" + encodeURIComponent(e) + "&height=" + i + "&width=" + a,
            s.swf.create({
                id: t,
                width: "74",
                height: "30",
                ver: "9.0.28",
                errorMessage: "请下载最新的Flash播放器！",
                url: "/static/flash/WallpaperImagesv103.swf",
                bgcolor: "#ffffff",
                wmode: "transparent",
                allowfullscreen: "true",
                vars: {
                    preview: 2,
                    system: this.gatSystem(),
                    imagesurl: e
                }
            },
            n)
        },
        gatSystem: function() {
            var t = "";
            return t = "Win32" == navigator.platform ? navigator.userAgent.indexOf("Windows NT 5") > -1 ? "xp": "win7": "xp"
        }
    }),
    e
});;
/*!searchdetail:widget/ui/controls/card/wikiinfo/wikiinfo.js*/
define("searchdetail:widget/ui/controls/card/wikiinfo/wikiinfo",
function(i) {
    function t(i, t) {
        t = e.extend({
            tpl: ['<div class="card-box wikiinfo-card">', '<h5 class="card-title"><img width=34 height=34 /><i class="sticker"></i><span class="text">人物百科</span><i class="close"></i></h5>', '<div class="card-content">', '<div class="wiki-detail">', '<h6 class="wiki-name">', '<p class="main-name">布拉德·皮特</p>', '<p class="sub-name">Brad Pitt</p>', "</h6>", '<p><label>国籍：</label><span class="guoji">美国</span></p>', '<p><label>职业：</label><span class="job">演员、制片人</span></p>', '<p class="big-row"><label>代表作品：</label><br/>《神枪手之死》<br/>《返老还童》<br/>《侏罗纪公园》</p>', "</div>", '<div class="wiki-img">', '<div class="wiki-portrait"><a href="#" target="_blank"><img src="http://d.hiphotos.baidu.com/baike/w%3D268/sign=ba583f494dc2d562f208d7ebdf1190f3/b2de9c82d158ccbf6fe124131bd8bc3eb13541bd.jpg" /></a></div>', '<a class="cardbtn" href="#" target="_blank">进入百科</a>', "</div>", "</div>", "</div>"].join("")
        },
        t),
        i = e.extend({
            portrait: ".wiki-portrait img",
            linkBtn: ".cardbtn",
            mainName: ".main-name",
            subName: ".sub-name",
            guoJi: ".guoji",
            job: ".job",
            zuoPin: ".big-row"
        },
        i),
        this.wikiRepeatInfo = {
            count: 0,
            name: ""
        },
        n.call(this, i, t)
    }
    var e = i("common:widget/ui/base/base"),
    a = i("common:widget/ui/utils/utils"),
    s = (i("common:widget/ui/base/events"), i("searchdetail:widget/ui/utils/lib")),
    n = i("searchdetail:widget/ui/controls/card/base/base");
    return e.extend(t.prototype, n.prototype, {
        _compat: function(i) {
            n.prototype._compat.call(this, i),
            a.UI.isSupportCss3("borderRadius", i.get(0), !0) || e('<div class="radius-mask"></div>').insertAfter(i.find(".card-title .close"))
        },
        checkState: function(i) {
            var t = n.prototype.checkState.call(this, i);
            return t.hasContent && (t.changed && t.dataObj.name != this.wikiRepeatInfo.name ? (this.wikiRepeatInfo.count = 0, this.wikiRepeatInfo.name = t.dataObj.name) : this.wikiRepeatInfo.count += 1),
            t
        },
        _resetBox4Update: function() {
            this.opts.collapseClass;
            this.opts.cardHeight = !1,
            this.elements.cntWrapper.css({
                position: "static",
                height: "auto"
            })
        },
        updateView: function(i) {
            var t = this.elements;
            this.$element.attr("data-fr", i.fr || ""),
            t.title.find("img").attr("src", i.pic);
            var a = i.fr ? "#" + i.fr: "",
            s = {
                name: i.name
            };
            t.portrait.attr("src", i.pic + a).parent().attr("href", i.url),
            t.linkBtn.attr("href", i.url),
            this.bindText(t.mainName, i.name),
            this.bindText(t.subName, i.enName),
            this.bindText(t.guoJi, i.guoJi),
            this.bindText(t.job, i.job);
            var n = this.parseZuoPin(i.zuoPin);
            if (n.length) {
                var o = ["<label>代表作品：</label>"],
                r = !1;
                e(n).each(function(i, t) {
                    return t.length > 9 ? (r = !0, !1) : void 0
                }),
                e(n).each(function(i, t) {
                    o.push("<br/>" + (r ? "": "《") + t + (r ? "": "》"))
                }),
                t.zuoPin.html(o.join("")).show(),
                r ? t.zuoPin.hasClass("big-row-noindent") || t.zuoPin.addClass("big-row-noindent") : t.zuoPin.hasClass("big-row-noindent") && t.zuoPin.removeClass("big-row-noindent")
            } else t.zuoPin.hide();
            if (!n.length || i.collapse || this.wikiRepeatInfo.count >= 2) {
                var l = this.opts.collapseClass;
                this.$element.hasClass(l) || this.$element.addClass(l),
                this.$element.height(37),
                this.curState.collapse = !0
            }
            t.content.find("a").attr("log-ext", e.json.stringify(s))
        },
        parseZuoPin: function(i) {
            var t = [];
            if (i) {
                i = e.trim(i);
                var a = s.split(i, ["《", "》"]),
                n = ["、", ",", "，", "《", "》"];
                e(a).each(function(i, a) {
                    a = e.trim(a),
                    a && (a.length > 1 || e.inArray(a, n) < 0) && t.push(a)
                })
            }
            return t
        }
    }),
    t
});;
/*!searchdetail:widget/ui/controls/card/wikiinfoface/wikiinfoface.js*/
define("searchdetail:widget/ui/controls/card/wikiinfoface/wikiinfoface",
function(i) {
    function e(i, e, a) {
        e = t.extend({
            logTag: "face",
            tpl: ['<div id="wikiinfo-face-card-wrapper"></div>'].join(""),
            itemtpl: ['<div class="card-box wikiinfo-face-card">', '<span class="margin-packed"></span>', '<div class="cnt-wrapper cnt-wrapper-new"><div class="card-content">', '<div class="wiki-detail-wrapper">', '<div class="wiki-detail wiki-detail-new">', '<h6 class="wiki-name">', '<span class="main-name"></span>', '<span class="sub-name"></span>', "</h6>", '<p class="wiki-sr wiki-item"><label>生日：</label><span class="birth"></span></p>', '<p class="wiki-zy wiki-item"><label>职业：</label><span class="zy job"></span></p>', '<p class="wiki-gj wiki-item"><label>国籍：</label><span class="gj"></span></p>', '<!--[if lt IE 9]><p class="cardbtn-wrapper wiki-skip" style="text-align: center"><a href="#" target="_blank">进入百科</a></p><![endif]-->', "</div>", '<div class="wiki-img">', '<div class="wiki-portrait-wrapper">', '<div class="wiki-portrait">', '<a href="#" target="_blank"><!--[if lt IE 9]><em class="ie-circel-bg"></em><![endif]--><img src="" /></a>', "</div>", '<span class="car-logo-padding-bg"></span>', "</div>", '<p class="cardbtn-wrapper wiki-skip" style="text-align: center"><a href="#" target="_blank">进入百科</a></p>', "</div>", "</div>", '<div class="zp zp-new">', '<h5 class="cardbtn-intro"><i class="cardbtn-content">代表作品</i><span></span></h5>', "<p></p>", "</div>", "</div></div>", "</div>"].join("")
        },
        e),
        i = t.extend({
            mainName: ".main-name",
            subName: ".sub-name",
            birth: ".birth",
            gj: ".gj",
            zy: ".zy",
            portrait: ".wiki-portrait img",
            linkBtn: ".cardbtn-wrapper a",
            cardbtnIntro: ".cardbtn-content",
            wikiDetail: ".wiki-detail",
            zp: ".zp p",
            zpNew: ".zp-new",
            wikiItem: ".wiki-item",
            zpTitle: ".zp h5"
        },
        i),
        this.wikiRepeatInfo = {
            count: 0,
            name: ""
        },
        this.group = a,
        s.call(this, i, e)
    }
    var t = i("common:widget/ui/base/base"),
    a = i("common:widget/ui/utils/utils"),
    s = (i("common:widget/ui/base/events"), i("searchdetail:widget/ui/utils/lib"), i("searchdetail:widget/ui/controls/card/base/base"));
    return t.extend(e.prototype, s.prototype, {
        _init: function() {
            var i = this.$element,
            e = this.elements;
            this.opts.elements = t.extend({},
            {},
            e);
            for (var a in this.opts.elements) e.hasOwnProperty(a) && (e[a] = i.find(e[a]));
            this.bindEvent()
        },
        _compat: function(i) {
            s.prototype._compat.call(this, i),
            a.UI.isSupportCss3("borderRadius", i.get(0), !0) || t('<div class="radius-mask"></div>').insertAfter(i.find(".card-title .close"))
        },
        checkState: function(i) {
            var e = s.prototype.checkState.call(this, i);
            return e.hasContent && (e.changed && e.dataObj.name != this.wikiRepeatInfo.name ? (this.wikiRepeatInfo.count = 0, this.wikiRepeatInfo.name = e.dataObj.name) : this.wikiRepeatInfo.count += 1),
            e
        },
        _resetBox4Update: function() {
            this.opts.collapseClass;
            this.opts.cardHeight = !1,
            this.elements.cntWrapper.css({
                position: "static",
                height: "auto"
            })
        },
        updateView: function(i, e) {
            var a = this,
            s = e.data.imgData.star_face,
            n = [];
            if (s && s.length && i && i.length) {
                var r, o;
                for (r = i.length - 1; r >= 0; r--) for (o = s.length - 1; o >= 0; o--) s[o].entity === i[r].ne && n.unshift(i[r])
            }
            0 == s.length && i && i.length && n.unshift(i[0]);
            var l = n != a.render_wiki_list;
            a.render_wiki_list = n;
            var c = (n[0], a.opts.itemtpl);
            if (n.length && l) {
                var d = n.length,
                p = 0,
                h = t("<div/>");
                for (p; d > p; p++) {
                    var f = n[p],
                    v = t("<div/>"),
                    m = t(c).attr("data-id", "face_" + p).appendTo(v),
                    w = a.opts.elements,
                    b = a.elements;
                    for (var g in w) b.hasOwnProperty(g) && (b[g] = m.find(w[g]));
                    m.attr("data-fr", f.fr || ""),
                    b.title.find("img").attr("src", f.st);
                    var k = f.fr ? "#" + f.fr: "",
                    u = {
                        name: f.ne
                    };
                    b.portrait.attr("src", f.st + k).parent().attr("href", f.url),
                    b.linkBtn.attr("href", f.url),
                    b.mainName.text(f.ne);
                    for (var x = (t.browser.msie && t.browser.version <= 9, ["birth", "zy", "gj"]), y = 0, I = 0; 3 > I; I++) {
                        var z = x[I];
                        f[z] && 2 > y && (y++, a.elements[z].text(f[z]), a.elements[z].parent().show())
                    }
                    2 > y && (b.wikiItem.hide(), b.mainName.parent().css({
                        marginTop: "2px"
                    }), b.wikiDetail.css({
                        height: "47px"
                    }), b.zpNew.css({
                        marginTop: "-25px"
                    }), b.linkBtn.parent().css({
                        height: "24px"
                    }));
                    var C = f.abstract || "" || f.zp;
                    C = t("<div></div>").html(C).text();
                    var _ = -1 == C.lastIndexOf("...") ? "...": "";
                    if (C = C.substring(0, 65) + _, b.zp.text(C), f.zp || f.abstract) {
                        var j = b.cardbtnIntro,
                        T = f.abstract ? "人物简介": "代表作品";
                        j.text(T),
                        b.zp.siblings("h5").show(),
                        b.zp.show()
                    } else b.zp.siblings("h5").hide(),
                    b.zp.hide();
                    b.content.find("a").attr("log-ext", t.json.stringify(u)),
                    h.append(v.children())
                }
                this.$element.empty().append(h.children())
            }
        },
        setLinkLog: function() {
            this.$element.find("a").each(function(i, e) {
                e = t(e);
                var a = e.attr("href");
                if (a && !e.attr("log-click")) {
                    var s = e.attr("log-ext") || "";
                    e.attr("log-click", "p=5.15&tag=face&fm=face&site=" + encodeURIComponent(a) + "&ext=" + encodeURIComponent(s))
                }
            })
        },
        bindEvent: function() {
            var i = this;
            this.$element.on("mouseenter", ".wikiinfo-face-card",
            function() {
                var e = t(this).attr("data-id");
                i.anthorIndex = e,
                i.fire("hover")
            }).on("mouseleave", ".wikiinfo-face-card",
            function() {
                i.fire("hout")
            })
        },
        active: function(i) {
            if (this.disactiveTimeout && clearTimeout(this.disactiveTimeout), "wikiinfo-face-card-wrapper" != i.$element[0].id) {
                var e = t(i.$element[0]).find('[data-id="' + i.anthorIndex + '"]')[0] || t("body"),
                a = parseFloat(e.style.top),
                s = parseFloat(e.style.left),
                n = this.$element.find('[data-id="' + i.anthorIndex + '"]'),
                r = n.height(),
                o = t(".img-container").height() - r,
                l = -parseInt(a),
                c = t(".img-container").offset().top,
                d = t(".img-container").offset().left;
                t(e).siblings().removeClass("hover"),
                t(e).addClass("hover"),
                n.siblings().css("visibility", "hidden"),
                t("#wikiinfo-face-card-wrapper").siblings(".card-box").css("visibility", "hidden");
                var p = t.browser.msie && t.browser.version < 9;
                if (!p) {
                    var h = t(e).siblings().children("a"),
                    f = h.find("em");
                    f.hasClass("hover") && h.css("width", "auto") && f.removeClass("hover")
                }
                var v, h = t(e).children("a"),
                f = h.find("em");
                "none" == h.css("display") && (n.removeClass("none-title"), n.find(".wiki-name").show(), n.find(".whitespace-pack").remove()),
                "猜猜图中是谁" == f.text() && (n.removeClass("none-title"), n.find(".wiki-name").show(), n.find(".whitespace-pack").remove());
                var m = r + 65 + l,
                w = a + 32 - o,
                p = t.browser.msie && t.browser.version < 9;
                if (w > 0 && (0 > m || w > m) ? (v = a - n.height() + c, p || f.hasClass("hover") && h.css("width", "auto") && f.removeClass("hover")) : (v = a + 32 + c, parseInt(f.width()) > 104 && !f.hasClass("hover") && !p && (h.css("width", "104px"), f.addClass("hover"))), this.$element.show(), t(e).hasClass("default_icon")) {
                    v = a - n.height() + c;
                    var b = s - (parseInt(n.width()) - parseInt(t(e).width())) + 70;
                    n.css({
                        left: b + "px",
                        top: v + "px"
                    }).css("visibility", "visible")
                } else n.css({
                    left: s + d + "px",
                    top: v + "px"
                }).css("visibility", "visible")
            }
        },
        disactive: function(i) {
            var e = this,
            a = i.anthorIndex; !
            function(i) {
                e.disactiveTimeout = setTimeout(function() {
                    var s = t(i.$element[0]).find('[data-id="' + a + '"]')[0];
                    t(s).removeClass("hover");
                    var n = e.$element.find('[data-id="' + a + '"]');
                    n.css("visibility", "hidden");
                    var r = t.browser.msie && t.browser.version < 9;
                    if (!r) {
                        var o = t(s).children("a"),
                        l = o.find("em");
                        l.hasClass("hover") && o.css("width", "auto") && l.removeClass("hover")
                    }
                },
                150)
            } (i)
        }
    }),
    e
});;
/*!searchdetail:widget/ui/controls/card/xianguiProductsAd/xianguiProductsAd.js*/
define("searchdetail:widget/ui/controls/card/xianguiProductsAd/xianguiProductsAd",
function(i) {
    function t(i, t) {
        t = e.extend({
            dataKey: "xianguiProducts",
            tpl: ['<div id="xianguiproductscard" class="xianguiproductscard card-box pic-info">', '<h5 class="card-title">', '<i class="sticker"></i>', '<span class="text">产品信息</span>', '<i class="close"></i>', "</h5>", '<div class="card-content"></div></div>'].join("")
        },
        t),
        c.call(this, i, t)
    }
    var e = i("common:widget/ui/base/base"),
    a = i("common:widget/ui/juicer/juicer"),
    c = (i("common:widget/ui/utils/utils"), i("common:widget/ui/base/events"), i("searchdetail:widget/ui/utils/lib"), i("searchdetail:widget/ui/utils/imghelper"), i("searchdetail:widget/ui/controls/card/base/base")),
    s = i("searchdetail:widget/ui/statistic/statistic-core");
    return e.extend(t.prototype, c.prototype, {
        checkState: function(i) {
            var t = i.fbResult,
            a = c.prototype.checkState.call(this, i),
            s = this.opts.nsAdData,
            d = this.getDataByPosId("pc_detail_slider_right_pic_info", s),
            n = !!d && "0" !== i.adType,
            o = t && t.length;
            return a.hasContent && a.changed ? (e("#picInfoPnl").hide(), e("#xianguiproductscard").show()) : n || o || (e("#picInfoPnl").show(), e("#xianguiproductscard").hide()),
            a
        },
        updateView: function(i) {
            var t = a("#xianguiproductscardtpl", i);
            e("#xianguiproductscard .card-content").html(t),
            s.send("5.1010000", {
                fm: "provide,product",
                state: "1,1"
            })
        }
    }),
    t
});;
/*!searchdetail:widget/ui/controls/card/xianguiProviderAd/xianguiProviderAd.js*/
define("searchdetail:widget/ui/controls/card/xianguiProviderAd/xianguiProviderAd",
function(i) {
    function e(i, e) {
        e = t.extend({
            dataKey: "xianguiProvider",
            tpl: ""
        },
        e),
        r.call(this, i, e)
    }
    var t = i("common:widget/ui/base/base"),
    a = i("common:widget/ui/juicer/juicer"),
    r = (i("common:widget/ui/utils/utils"), i("common:widget/ui/base/events"), i("searchdetail:widget/ui/utils/lib"), i("searchdetail:widget/ui/utils/imghelper"), i("searchdetail:widget/ui/controls/card/base/base"));
    return t.extend(e.prototype, r.prototype, {
        checkState: function(i) {
            var e = i.fbResult,
            a = r.prototype.checkState.call(this, i),
            d = this.opts.nsAdData,
            n = this.getDataByPosId("pc_detail_slider_right_pic_info", d),
            o = !!n && "0" !== i.adType,
            c = e && e.length;
            return a.hasContent && a.changed ? (t("#picInfoPnl").hide(), t("#xianguiprovidercard").show()) : c || o || (t("#xianguiprovidercard").hide(), t("#picInfoPnl").show()),
            a
        },
        updateView: function(i) {
            var e = a("#xianguiprovidercardtpl", i);
            t("#xianguiprovidercard").html(e)
        }
    }),
    e
});;
/*!searchdetail:widget/ui/controls/dutuguide/dutuguide.js*/
define("searchdetail:widget/ui/controls/dutuguide/dutuguide",
function(e) {
    function i(e) {
        this.$element = t(null),
        this.$refImgDom = t(null),
        this.opts = t.extend({
            exploreWidth: 1156,
            exploreHeight: 520,
            boxSize: {
                width: 418,
                height: 441
            },
            duration: 1200,
            cards: []
        },
        e),
        this.elements = {
            exploreView: ".explore-view",
            scanBar: ".explore-view .scan-light",
            viewWrapper: ".view-wrapper",
            screenPnl: ".media-screen",
            cardPnl: ".screen-cnt .cnt-inner",
            screenCaption: ".screen-caption",
            working: ".media-working"
        },
        this.receivedData = !1,
        this.allCards = [],
        this._preparePro = null,
        this._scanKeyFrames = null,
        this.tpl = ['<div class="dutuguide">', '<div class="explore-view">', '<div class="view-wrapper">', '<div class="scan-view">', '<div class="img-box">', '<img src="" />', '<div class="img-mask"></div>', "</div>", '<div class="scan-window">', '<div class="win-body">', '<div class="scan-bar">', '<div class="scan-light"></div>', "</div>", "</div>", "</div>", '<div class="media-working">', '<div class="media-working-inner"></div>', "</div>", '<div class="media-screen-wrapper">', '<div class="media-screen">', '<div class="screen-cnt"><div class="cnt-inner"></div></div>', "</div>", '<div class="screen-caption"></div>', "</div>", "</div>", "</div>", '<div class="media-hd media-hd-left"></div>', '<div class="media-hd media-hd-right"></div>', "</div>", "</div>"].join("")
    } {
        var t = e("common:widget/ui/base/base"),
        s = e("common:widget/ui/utils/utils"),
        n = e("common:widget/ui/base/events"),
        r = (e("searchdetail:widget/ui/utils/lib"), e("common:widget/ui/arch/behavior/animation")),
        a = e("searchdetail:widget/ui/utils/imghelper");
        e("searchdetail:widget/ui/statistic/statistic-core")
    }
    return t.extend(i.prototype, n, {
        init: function() {},
        render: function(e) {
            var i = t(window).width(),
            s = t(window).height(),
            n = {
                top: s / 2 - this.opts.exploreHeight / 2,
                left: i / 2 - this.opts.exploreWidth / 2
            };
            this.$element = t(this.tpl);
            var r = this.$element,
            a = this.elements;
            for (var o in a) a.hasOwnProperty(o) && (a[o] = r.find(a[o]));
            this.opts.exploreViewStyle = n,
            a.exploreView.css(n),
            e && e.length && this.initialAnimate(e),
            this.reset(),
            this.$element.appendTo(document.body)
        },
        setImgSize: function(e) {
            var i = e.width(),
            t = e.height(),
            s = this.$element.find(".img-box img"),
            n = this.opts.boxSize,
            r = n.width / n.height;
            i < n.width || t < n.height ? s.attr({
                width: i,
                height: t
            }) : i / t >= r ? s.css({
                width: "100%",
                height: "auto"
            }) : s.attr({
                width: "auto",
                height: "100%"
            }),
            s.attr("src", e.attr("src"))
        },
        initialAnimate: function(e) {
            this.setImgSize(e),
            this.opts.cards = this.renderCards();
            var i = 0;
            t("#sider").find(".card-box").each(function(e, s) {
                if (s.offsetHeight) {
                    var n = 200 * i + "ms";
                    t(s).css({
                        "-webkit-animation-delay": n,
                        "-moz-animation-delay": n,
                        "-ms-animation-delay": n,
                        "-o-animation-delay": n,
                        "animation-delay": n
                    }),
                    i += 1
                }
            })
        },
        show: function(e) {
            this.$refImgDom = e,
            this.$element.length ? this.initialAnimate(e) : this.render(e),
            t("#adCard").hide();
            var i = this;
            setTimeout(function() {
                i.doShow()
            },
            200)
        },
        doShow: function() {
            this.$element.show(),
            this.$element.height();
            var e = [this.dropBg, this.displayExplore, this.expandExplore, this.startExplore, this.printCards, this.collapseExplore, this.exit, this.twinkleSider, this.reset],
            i = e.length,
            t = this,
            s = function(n) {
                if (i > n) {
                    var r = e[n],
                    a = r.call(t);
                    a ? a.done(function() {
                        s(n + 1)
                    }) : s(n + 1)
                }
            };
            s(0)
        },
        reset: function() {
            var e = this.elements;
            e.exploreView.hide(),
            e.viewWrapper.width(0),
            e.cardPnl.css("top", ""),
            e.scanBar.removeClass("scan-light-animate"),
            e.working.removeClass("media-working-animate"),
            e.screenPnl.css("left", ""),
            this.$element.height(0).removeClass("dutuguide-exiting"),
            t("#sider").removeClass("twinkle")
        },
        dropBg: function() {
            if (s.UI.isSupportCss3("transition", this.$element.get(0))) {
                var e = new t.Deferred,
                i = this;
                return this.$element.height(t(window).height()),
                setTimeout(function() {
                    i.$element.addClass("dutuguide-exiting"),
                    e.resolve()
                },
                300),
                e
            }
            return r.animate(this.$element, {
                height: t(window).height()
            },
            {
                duration: 300,
                easing: "easeInSine"
            })
        },
        displayExplore: function() {
            var e = new t.Deferred,
            i = this;
            return this.elements.exploreView.show().css("opacity", .8),
            setTimeout(function() {
                i.elements.exploreView.css("opacity", 1),
                e.resolve()
            },
            300),
            e
        },
        expandExplore: function() {
            if (s.UI.isSupportCss3("transition", this.elements.viewWrapper.get(0))) {
                var e = new t.Deferred;
                return this.elements.viewWrapper.css("width", ""),
                setTimeout(function() {
                    e.resolve()
                },
                500),
                e
            }
            return r.animate(this.elements.viewWrapper, {
                width: 1076
            },
            {
                duration: 500,
                easing: "easeInSine"
            })
        },
        startExplore: function() {
            var e = this.elements;
            return s.UI.isSupportCss3("animation", e.scanBar.get(0)) ? (e.scanBar.addClass("scan-light-animate"), e.working.addClass("media-working-animate")) : this._scanKeyFrames = r.keyframes([[e.scanBar, {
                top: 419
            },
            {
                duration: 1200,
                easing: "linear"
            }], [e.scanBar, {
                top: -19
            },
            {
                duration: 1200,
                easing: "linear"
            }]], {
                iterationCount: 10
            }),
            s.UI.isSupportCss3("transition", e.screenPnl.get(0)) ? void e.screenPnl.css("left", 0) : r.animate(e.screenPnl, {
                left: 0
            },
            {
                duration: 200,
                easing: "easeInOutSine"
            })
        },
        printCards: function() {
            var e = new t.Deferred,
            i = this.elements.cardPnl,
            n = this.opts.cards,
            a = n.length,
            o = 1e3,
            d = 400,
            c = 0,
            l = 193,
            h = 193,
            u = s.UI.isSupportCss3("transition", i.get(0)),
            m = this,
            p = function() {
                if (c >= a) return void e.resolve();
                var t = n[c];
                u ? i.css({
                    top: l - (c + 1) * h,
                    opacity: .6
                }) : r.animate(i, {
                    top: l - (c + 1) * h
                },
                {
                    duration: d,
                    easing: "linear"
                }),
                m.elements.screenCaption.addClass("screen-caption-blur"),
                setTimeout(function() {
                    m.elements.screenCaption.text(t).removeClass("screen-caption-blur")
                },
                d / 2),
                c += 1,
                setTimeout(function() {
                    i.css("opacity", 1)
                },
                d),
                setTimeout(function() {
                    p()
                },
                o + d)
            };
            return p(),
            e
        },
        renderCards: function() {
            for (var e = t("#sider").find(".card-box"), i = t("<div></div>"), s = 0, n = this, r = [], a = 0; 3 > s && a < e.length - 1; a++) {
                var o = t(e[a]);
                if (e[a].offsetHeight) {
                    var d = o.clone();
                    d.find(".cnt-wrapper").css("position", ""),
                    d.css({
                        width: "",
                        height: ""
                    }).appendTo(i),
                    r.push(d.find(".card-title").text() || "图片信息"),
                    s += 1
                }
            }
            return this.elements.cardPnl.empty().append(i.children()),
            this.elements.cardPnl.find(".picbox").each(function(e, i) {
                n._scalePicSize(t(i))
            }),
            r
        },
        _scalePicSize: function(e) {
            var i = e.find("img");
            if (!i.attr("src")) {
                var t = {
                    width: 1 * e.css("width").replace("px", ""),
                    height: 1 * e.css("height").replace("px", "")
                };
                a.loadImage([i.attr("data-src")],
                function(s) {
                    var n = a.scaleFull(s, t);
                    e.find(".pic-loading-dot").hide(),
                    i.css(n).attr("src", i.attr("data-src"))
                })
            }
        },
        collapseExplore: function() {
            if (s.UI.isSupportCss3("transition", this.elements.viewWrapper.get(0))) {
                var e = new t.Deferred,
                i = this;
                return this.elements.viewWrapper.css("width", 0),
                setTimeout(function() {
                    i.elements.exploreView.hide(),
                    e.resolve()
                },
                400),
                e
            }
            return this._scanKeyFrames && this._scanKeyFrames.stop(),
            r.animate(this.elements.viewWrapper, {
                width: 0
            },
            {
                duration: 400,
                easing: "easeOutSine"
            })
        },
        exit: function() {
            var e = this;
            if (s.UI.isSupportCss3("transition", this.$element.get(0))) {
                var i = new t.Deferred;
                return this.$element.css("height", 0),
                setTimeout(function() {
                    e.$element.hide(),
                    t("#adCard").show(),
                    i.resolve()
                },
                400),
                i.always(function() {
                    e.fire("exit")
                }),
                i
            }
            return r.animate(this.$element, {
                height: 0
            },
            {
                duration: 400,
                easing: "easeOutSine"
            }).always(function() {
                e.fire("exit")
            })
        },
        twinkleSider: function() {
            var e = t("#sider"),
            i = new t.Deferred;
            return e.addClass("twinkle"),
            setTimeout(function() {
                i.resolve()
            },
            1200),
            i
        },
        prepare: function() {
            if (this._preparePro) return this._preparePro;
            this._preparePro = new t.Deferred;
            var e = ["//img2.bdstatic.com/static/searchdetail/widget/ui/controls/dutuguide/img/scan_bg_39ea267.png", "//img2.bdstatic.com/static/searchdetail/widget/ui/controls/dutuguide/img/scan_working_ae5bfc8.png", "//img1.bdstatic.com/static/searchdetail/widget/ui/controls/dutuguide/img/scan_light_1d97cd6.png", "//img1.bdstatic.com/static/searchdetail/widget/ui/controls/dutuguide/img/scan_maskline_6629130.png"],
            i = e.length,
            s = 0;
            return me = this,
            stepCompleted = function() {
                s += 1,
                s == i && (me.$element.length || me.render(), me._preparePro.resolve())
            },
            t(e).each(function(e, i) {
                me._loadImg(i).then(stepCompleted)
            }),
            this._preparePro
        },
        _loadImg: function(e) {
            var i = new Image,
            s = new t.Deferred;
            return i.onload = function() {
                s.resolve()
            },
            i.src = e,
            s
        },
        setCards: function(e) {
            this.allCards = e
        },
        needShow: function(e) {
            if (this.receivedData = !0, t.browser.msie && t.browser.version < 8) return ! 1;
            var i = 0,
            s = 1;
            t(this.allCards).each(function(t, n) {
                var r = n.checkState(e);
                return r.hasContent && (i += 1, i >= s) ? !1 : void 0
            });
            var n = i >= s;
            return n
        }
    }),
    i
});;
/*!searchdetail:widget/ui/controls/dutulink/dutulink.js*/
define("searchdetail:widget/ui/controls/dutulink/dutulink",
function(t) {
    function e() {
        this.tpl = '<a class="dutu-link" href="#" target="_blank">识图一下，发现更多</a>',
        this.$element = i(null)
    }
    var i = t("common:widget/ui/base/base"),
    n = (t("common:widget/ui/utils/utils"), t("common:widget/ui/base/events"));
    return i.extend(e.prototype, n, {
        init: function(t) {
            this.$element = i(this.tpl).appendTo(t).hide(),
            this.isIE6789 = i.browser.msie && i.browser.version <= 9
        },
        update: function(t) {
            this.isIE6789 || t && this.$element.attr("href", "https://graph.baidu.com/details?isfromtusoupc=1&tn=pc&carousel=0&promotion_name=pc_image_shitu&extUiData%5bisLogoShow%5d=1&image=" + encodeURIComponent(t.thumbURL || t.bigImgUrl || t.objURL)).show()
        }
    }),
    e
});;
/*!searchdetail:widget/ui/ecomrecord/ecomrecord.js*/
define("searchdetail:widget/ui/ecomrecord/ecomrecord",
function(e, o, n) {
    var t = (e("common:widget/ui/base/base"), e("common:widget/ui/utils/utils")),
    i = function() {
        function e(e) {
            var o = (new Date).getTime(),
            n = window["ecom_recor_" + o] = new Image;
            n.onerror = n.onload = function() {
                n.onerror = n.onload = null,
                n = null,
                window["ecom_recor_" + o] = null
            },
            n.src = e + "&tid=" + o
        }
        function o(o) {
            o && o.di === a && (o._ecomStartView = (new Date).getTime(), e(o.s_rcv + "&actionid=200&attach=0"))
        }
        function n(o) {
            if ("undefined" == typeof o && (o = d), o && o.di === a && o._ecomStartView) {
                var n = (new Date).getTime(),
                t = n - o._ecomStartView;
                e(o.s_rcv + "&actionid=201&attach=" + t)
            }
        }
        function i(o, n) {
            o && o.di === a && e(o.s_rcv + "&" + t.jsonToQuery(n))
        }
        function c(e) {
            a = e
        }
        function r(e, t) {
            e = t.get("imgData"),
            n(d),
            d = e,
            o(e)
        }
        var a = "",
        d = {};
        return {
            logStart: o,
            logEnd: n,
            logClick: i,
            init: c,
            update: r
        }
    } ();
    n.exports = window.ecomRecord = i
});;
/*!searchdetail:widget/ui/action/base/imgcollectioin_setting.js*/
define("searchdetail:widget/ui/action/base/imgcollectioin_setting",
function(t) {
    function e(t, e) {
        this.imgCollection = t,
        this.pageModel = e,
        this._fieldMapBinded = !1
    }
    var i = t("common:widget/ui/base/base"),
    n = t("searchdetail:widget/ui/utils/lib"),
    r = t("common:widget/ui/utils/utils");
    return i.extend(e.prototype, {
        fieldMap: {
            key: function(t) {
                var e = "";
                return t.os ? e = "os" + t.os: t.di && (e = "di" + t.di),
                n.getUniqId("imgkey_") + "_" + e
            },
            isSet: function(t) {
                return t.bdSetImgNum > 1 && t.is && "0" != t.is && "0,0" != t.is
            },
            setTitle: function(t) {
                return i.trim(t.setTitle || t.setTittle || "")
            },
            type: function(t) {
                return t.type && "0" != t.type ? t.type: "jpg"
            },
            compiledFromURL: "fromURL",
            fromURL: function(t) {
                if (!t.fromURL) return "";
                var e = n.uncompileURL(t.fromURL);
                return e.match(/^https?:\/\//i) || (e = "http://" + e),
                e
            },
            fromHost: function(t) {
                return t.fromURLHost || n.getHost(t.fromURL)
            },
            fromURLHostWord: function(t) {
                var e = t.fromURLHost || n.getHost(t.fromURL);
                return t.pageNum > 29 ? "": "www.vcg.com" === e ? "视觉中国": "www.quanjing.com" === e ? "全景网": ""
            },
            objURLHttp: function(t) {
                return n.uncompileURL(t.objURL)
            },
            objURL: function(t) {
                var e = n.uncompileURL(t.objURL);
                return e ? /\.gif$/.test(e) ? /^https/.test(e) && e || r.httpsTimg({
                    imgUrl: e,
                    imgType: "0",
                    size: "b9999_10000"
                }) : /^https/.test(e) && e || r.httpsTimg({
                    imgUrl: e,
                    imgType: "0"
                }) : e
            },
            bakUrl: function(t) {
                return t.thumbURL || t.hoverURL || t.largeTnImageUrl
            },
            bigImgUrl: function(t) {
                return t.thumbURL || t.largeTnImageUrl || t.hoverURL || t.objURL
            },
            picDesc: function(t) {
                var e = t.simid_info;
                return n.stringEncode(e && e.desc && e.desc.cont) || ""
            },
            picDescUrl: function(t) {
                var e = t.simid_info;
                return e && e.desc && e.desc.gpg || ""
            },
            ImageNewsDate: function(t) {
                var e = t.ImageNewsDate && t.ImageNewsDate.replace(/\s+[:0-9]+$/i, "");
                return "1970-01-01" == e ? "": e
            },
            youtuType: function(t) {
                return t.youtuType || "0"
            },
            browserPv: function(t) {
                return + (t.browserPv || "0")
            },
            imageSetTag: function(t) {
                return t.imageSetTag ? t.imageSetTag.split ? t.imageSetTag.split("#") : t.imageSetTag: []
            },
            userData: function(t) {
                return t.userData || {}
            },
            wiki_entities: function(t) {
                var e = t.simid_info;
                if (e && e.star_entity) {
                    var n = [],
                    r = e.star_entity,
                    o = function(t, e) {
                        return {
                            name: t.ne,
                            enName: t.en || "",
                            url: t.url,
                            pic: t.st,
                            job: t.zy || "",
                            guoJi: t.gj || "",
                            zuoPin: t.zp || "",
                            fr: e || ""
                        }
                    };
                    return r && r.cont && r.cont.length && i(r.cont).each(function(t, e) {
                        n.push(o(e))
                    }),
                    n
                }
                return null
            },
            wiki_face_entity: function(t) {
                var e = t.simid_info;
                if (e && e.star_entity && e.star_entity.cont && e.star_entity.cont.length > 0) {
                    var i = e.star_entity.cont;
                    return i
                }
                return null
            },
            wiki_entity1: function(t) {
                var e = t.wiki_entities && t.wiki_entities.length && t.wiki_entities[0];
                return e && t.wiki_entities.length > 1 && (e.collapse = 1),
                e
            },
            relationShip: function(t) {
                var e = null,
                i = t.simid_info,
                n = t.wiki_entities;
                if (i && i.star_entity && i.star_entity.relations) {
                    var r = i.star_entity.relations;
                    if (r && r.length && n && n.length > 1) {
                        for (var o = {},
                        s = 0; s < n.length; s++) o[n[s].name] = n[s];
                        for (var s = 0,
                        a = r.length; a > s; s++) {
                            var c = r[s],
                            u = o[c.entityA],
                            p = o[c.entityB];
                            u && p && (e = c, e.entityA = u, e.entityB = p)
                        }
                    }
                }
                return (e || n && n.length > 1) && delete t.wiki_entity1,
                e
            },
            act_info: function(t) {
                var e = t.simid_info;
                return e && e.acti && e.acti.cont && e.acti.cont.length ? e.acti.cont: null
            },
            pic_sets: function(t) {
                var e = t.simid_info,
                i = [];
                if (e && e.pic_set && e.pic_set.cont && e.pic_set.cont.length) for (var r = e.pic_set.cont,
                o = 0; o < r.length; o++) {
                    for (var s = r[o], a = s.cs, c = s.sd || [], u = s.ourl || [], p = s.furl, l = [], f = 0, _ = a.length; _ > f; f++) {
                        var d = a[f];
                        d && "0" != d && "0,0" != d && l.push({
                            objUrl: u[f],
                            cs: d,
                            sd: c[f],
                            thumbUrl: n.getThumbUrl(d),
                            fromUrl: p[f]
                        })
                    }
                    l.length >= 3 && i.push({
                        topic: s.tc,
                        topicUrl: s.topic_url,
                        site: s.site,
                        picNum: s.dnum || 0,
                        pics: l
                    })
                }
                return i
            },
            relatePic1: function(t) {
                var e = t.pic_sets && t.pic_sets.length && t.pic_sets[0];
                return e && e.pics.length >= 3 ? e: null
            },
            relatePic2: function(t) {
                var e = t.pic_sets && t.pic_sets.length > 1 && t.pic_sets[1];
                return e && e.pics.length >= 3 ? e: null
            },
            sucai_info: function(t) {
                var e = t.simid_info;
                return e && e.sucai ? e.sucai.cont || null: null
            },
            sim_travel: function(t) {
                var e = t.simid_info;
                return e && e.sim_travel ? e.sim_travel || null: null
            },
            decoration_sim: function(t) {
                var e = t.simid_info;
                return e && e.decoration_sim ? e.decoration_sim || null: null
            },
            wallp_info: function(t) {
                var e = t.simid_info;
                return e && e.wallp ? e.wallp.cont || null: null
            },
            xiangshi_info: function(t) {
                var e = t.xiangshi_info,
                i = [];
                if (e && e.url && e.url.length) for (var n = e.url,
                r = e.os,
                o = e.cs,
                s = (e.pn, e.di), a = e.srctype, c = ["tn", "word", "ie", "step_word", "ipn", "istype", "fr"], u = this.pageModel.buildQuery(c), p = 0, l = n.length; l > p; p++) i.push({
                    imgUrl: n[p],
                    cs: o[p],
                    srctype: a[p],
                    detailUrl: "/search/detail?" + u + "&os=" + r[p] + "&cs=" + o[p] + (s ? "&di=" + s[p] : "") + "&pn=" + (p + 1)
                });
                return i
            },
            tuJiaAdData: function(t) {
                var e = t.simid_info;
                if (e && e.pic_set && e.pic_set.tujia_cont && e.pic_set.tujia_cont.length) for (var i = e.pic_set.tujia_cont,
                n = 0; n < i.length; n++) {
                    for (var r = i[n], o = r.ourl || [], s = r.furl, a = [], c = 0, u = o.length; u > c; c++) {
                        var p = o[c];
                        p && a.push({
                            objUrl: p,
                            thumbUrl: p,
                            fromUrl: s[c]
                        })
                    }
                    if (a.length >= 3) return {
                        topic: r.tc,
                        topicUrl: r.topic_url && r.topic_url.replace(/^hhttp:/, "http:"),
                        site: r.site,
                        siteUrl: r.site ? /^http/i.test(r.site) ? r.site: "http://" + r.site: "",
                        picNum: 0,
                        pics: a
                    }
                }
                return null
            },
            map: function(t) {
                return t.map || t.face_info
            },
            imageDeep_info: function(t) {
                var e = this.pageModel;
                return {
                    provider: "mola",
                    query: e.get("word"),
                    cs: t.cs,
                    srctype: t.bdSrcType,
                    os: t.os,
                    query: e.get("word")
                }
            },
            goods: function(t) {
                return t.map && (t.map.shoe_info && t.map.shoe_info.shopping_window_pos_0 || t.map.bag_info && t.map.bag_info.shopping_window_pos_0 || t.map.cloth_info && t.map.cloth_info.shopping_window_pos_0) ? null: t.simid_info && t.simid_info.product_relate
            },
            cloth: function(t) {
                return t.map && (t.map.shoe_info && t.map.shoe_info.shopping_window_pos_0 || t.map.bag_info && t.map.bag_info.shopping_window_pos_0) ? null: t.map && t.map.cloth_info && t.map.cloth_info.shopping_window_pos_0 ? t.map.cloth_info.shopping_window_pos_0 || null: null
            },
            photographerRecommend: function(t) {
                var e = [];
                return "1" === t.youtuType && e.push("photographerRecommend"),
                e
            },
            bag: function(t) {
                return t.map && t.map.shoe_info && t.map.shoe_info.shopping_window_pos_0 ? null: t.map && t.map.bag_info && t.map.bag_info.shopping_window_pos_0 ? t.map.bag_info.shopping_window_pos_0 || null: null
            },
            shoe: function(t) {
                return t.map && t.map.shoe_info && t.map.shoe_info.shopping_window_pos_0 ? t.map.shoe_info.shopping_window_pos_0 || null: void 0
            },
            face_info: function(t) {
                var e = t.map;
                if (e) {
                    if (i.isArray(e)) return e;
                    for (var n = e.face_info,
                    r = n ? n.face_num || 0 : 0, o = 0, s = []; r > o;) n["face_" + o] && s.push(n["face_" + o]),
                    o += 1;
                    return s
                }
                return null
            },
            star_face: function(t) {
                var e = t.map;
                if (e) {
                    if (i.isArray(e)) return e;
                    for (var n = e.star_face,
                    r = n ? n.length || 0 : 0, o = 0, s = [], a = []; r > o;) {
                        if (n[o]) {
                            var c = n[o];
                            s.push(c),
                            a.push([c.x, c.y, c.w, c.h].join("_"))
                        }
                        o += 1
                    }
                    return a.length && a.join(",").match(/(\d+(_\d+){3}),.*\1/) && (s = null),
                    s
                }
                return null
            },
            _mapInfoJianRong: function(t) {
                if (! (t.map && t.map.star_face && t.map.star_face.length) && t.face_info && 1 == t.face_info.length && t.wiki_entities && 1 == t.wiki_entities.length) {
                    var e = t.face_info[0],
                    i = t.wiki_entity1;
                    t.star_face = [{
                        x: e.face_left,
                        y: e.face_top,
                        w: e.face_width,
                        h: e.face_height,
                        entity: i.name
                    }]
                }
            },
            auto_info: function(t) {
                var e = t.map;
                if (e) {
                    if (i.isArray(e)) return e;
                    for (var n = e.car_info,
                    r = n ? n.length || 0 : 0, o = 0, s = []; r > o;) n[o] && s.push(n[o]),
                    o += 1;
                    if (1 == s.length && e.auto_brand_pos && e.auto_brand_pos.cont && 1 == e.auto_brand_pos.cont.length) {
                        var a = e.auto_brand_pos.cont[0],
                        c = s[0];
                        1 * a.x >= 1 * c.x && 1 * a.y >= 1 * c.y && 1 * a.x + 1 * a.w <= 1 * c.x + 1 * c.w && 1 * a.y + 1 * a.h <= 1 * c.y + 1 * c.h && (s = [a])
                    }
                    return s
                }
                return null
            },
            srv_simi: function(t) {
                if ("1" === t.youtuType) return null;
                var e = this.pageModel;
                return {
                    provider: "piclist",
                    query: e.get("word"),
                    SimiCs: t.cs,
                    type: "card",
                    pn: "0",
                    rn: "6",
                    srctype: t.bdSrcType,
                    bdtype: t.bdSrcType,
                    map: t.map,
                    os: e.get("os")
                }
            },
            srv_friend: function(t) {
                var e = this.pageModel,
                i = e.getAbTestGroup();
                return t.pi && t.pi.length > 1 && "friendscard" == i ? {
                    provider: "mola",
                    query: e.get("word"),
                    simid: "AB" + t.pi,
                    cs: t.cs,
                    srctype: t.bdSrcType,
                    os: t.os,
                    service_type: "friends"
                }: null
            },
            imageDeepInfo: function() {
                return "new_dep_tpl" == this.pageModel.get("investTpl") ? ["imageDeep_info"] : []
            },
            serviceCard: function(t) {
                var e = t.simid_info,
                i = (this.pageModel.getAbTestGroup(), []);
                if (e && e.service) {
                    if (e.service.cont) for (var n = e.service.cont,
                    r = {
                        "auro-brand": "auto-brand"
                    },
                    o = {
                        food: function(t) {
                            return t.data && t.data.steps && t.data.steps.length > 2 ? t.data: null
                        }
                    },
                    s = n.length - 1; s >= 0; s--) {
                        var a = n[s];
                        if (!a.conf_level || 2 == a.conf_level) {
                            var c = r[a.service_type] || a.service_type,
                            u = a.service_type ? "srv_" + c: "";
                            u && !t[u] && (o[c] ? t[u] = o[c](a) : ("auto" != c && "auto-brand" != c || "yiche" == a.provider || "autohome" == a.provider) && (t[u] = a, i.push(u), "yiche" === a.provider && (a.provider = "bitauto")))
                        }
                    }
                    if (e.service.invests) for (var p, l = e.service.invests,
                    s = l.length - 1; s >= 0; s--) if (p = l[s]) for (var f in p) if (p.hasOwnProperty(f)) {
                        p[f] && (t["srv_" + f] = p[f]);
                        break
                    }
                }
                return i.push("srv_simi"),
                i.push("srv_friend"),
                i
            },
            asyncCard: function() {
                var t = [];
                return this.pageModel.get("isNeedAsyncRequest") && t.push("srv_beautyphoto"),
                t
            },
            asyncRs: function() {
                var t = [];
                return t.push("rsResult"),
                t
            },
            copyrightInfo: function(t) {
                return t.partnerId ? {}: null
            },
            rsResult: function() {
                var t = this.pageModel;
                return {
                    word: t.get("word"),
                    tn: "rscjson"
                }
            },
            srv_beautyphoto: function() {
                var t = this.pageModel;
                return this.pageModel.get("isNeedAsyncRequest") ? {
                    query: t.get("word"),
                    tn: "exchangedata"
                }: void 0
            },
            srv_appbeauty: function() {
                this.pageModel;
                return "美女" === this.pageModel.get("word") ? {}: void 0
            },
            cardSeq: function(t) {
                var e = t.simid_info;
                return e && e.cardSeq || ""
            },
            card_pres_info: function(t) {
                var e = t.simid_info,
                i = {};
                if (e && e.card_pres_info) {
                    var n = e.card_pres_info;
                    i.xiangshi_info = !!n.xiangsi,
                    i.sucai_info = !!n.sucai,
                    i.wallp_info = !!n.wallp,
                    i.act_info = !!n.acti,
                    i.relatePic1 = !!n.pic_set,
                    i.relatePic2 = !!n.pic_set
                }
                return i
            },
            cardTest: function(t) {
                var e = this.pageModel.getAbTestGroup(),
                n = (this.pageModel.get("investTpl"), {});
                t.group = e;
                var r = t.cardSeq;
                return r && r.length && i.inArray("sucai", r) < 0 && i.inArray("wallp", r) < 0 && i.inArray("foods", r) < 0 && (t.cardSeq = null),
                (!t.auto_info || t.auto_info && !t.auto_info.length) && t.srv_auto && (t.default_auto_info = !0),
                "downloadoptimize" == e && (!t.star_face || t.star_face && !t.star_face.length) && t.wiki_face_entity && t.wiki_face_entity.length && (t.default_star_face = !0),
                n.group = e,
                n
            },
            adType: function(t) {
                var e = t.adType;
                return e || "0"
            },
            adid: function(t) {
                return t.adid || 0
            }
        },
        getUrl: function() {
            var t = this.pageModel,
            e = t.get("datatn") ? t.get("datatn") : "acjson",
            i = "/search/acjson",
            n = /(?:avatar|jsonav)/,
            r = /com$/,
            o = "resultjsonavbrandcom";
            return i = n.test(e) ? o === e ? "/search/advert": r.test(e) ? "/search/acjson": "/search/acjson": "acjson" === e ? "/search/acjson": "/search/" + e
        },
        getReqParams: function() {
            var t = this.pageModel,
            e = {
                tn: t.get("datatn") || "resultjson_com",
                ipn: "rj",
                ct: "201326592",
                is: t.get("is") || "",
                fp: "detail"
            },
            n = ["cl", "lm", "ie", "oe", "adpicid", "lpn", "st", "word", "z", "ic", "hd", "latest", "copyright", "s", "se", "tab", "width", "height", "face", "istype", "qc", "nc", "fr", "simics", "srctype", "bdtype", "rpstart", "rpnum", "cs", "catename", "force"],
            r = t.get("step_word");
            n.push("cardserver"),
            n.push("tabname"),
            i(n).each(function(i, n) {
                e[n] = t.get(n) || ""
            }),
            r && (e.word = r, e.step_word = r, e.ie = "utf-8");
            var o = t.get("islist");
            o && (e.islist = o);
            var s = t.get("querylist");
            s && (e.querylist = s);
            var a = t.get("force");
            return a && (e.force = a),
            e
        },
        setImgSetCollection: function() {
            var t = this.pageModel.get("settn");
            t && this.imgCollection.setImgSetReqParams(i.extend({},
            this.getReqParams(), {
                tn: t
            }))
        },
        getFieldMap: function() {
            if (!this._fieldMapBinded && this.fieldMap) {
                var t = this.fieldMap;
                for (var e in t) if (t.hasOwnProperty(e)) {
                    var i = t[e];
                    "function" == typeof i && (t[e] = i.bind(this))
                }
                this._fieldMapBinded = !0
            }
            return this.fieldMap
        },
        getParseResponse: function() {
            var t = this.pageModel,
            e = function(e) {
                return void 0 === t.get("isNeedAsyncRequest") ? t.set("isNeedAsyncRequest", e && !!e.isNeedAsyncRequest) : t.set("isNeedAsyncRequest", t.get("isNeedAsyncRequest")),
                e
            };
            return e
        },
        process: function() {
            var t = this.imgCollection;
            t.setReqUrl(this.getUrl()),
            t.setFieldMap(this.getFieldMap()),
            t.setReqParams(this.getReqParams()),
            t.setParseResponse(this.getParseResponse()),
            this.setImgSetCollection()
        }
    }),
    e
});;
/*!searchdetail:widget/ui/action/base/propcollection_setting.js*/
define("searchdetail:widget/ui/action/base/propcollection_setting",
function(r) {
    function e(r) {
        return {
            key: "photographerRecommend",
            url: "/copyright/recommandcard",
            buildQuery: function(r) {
                return {
                    pi: r.pi
                }
            },
            parseResponse: function(e) {
                if (!e || 0 !== e.errno || !e.recommendphotographers || 0 === e.recommendphotographers.photographersNum) return null;
                r.set("frm", "lensman");
                var t = e && e.recommendphotographers;
                return t.photographersInfo
            }
        }
    }
    function t(r, e) {
        return {
            key: "goods",
            url: window.location.protocol + "//image-shop.baidu.com/n/imageproduct",
            jsonpCb: "cb",
            buildQuery: function(t) {
                var i = r.getAbTestGroup(),
                n = {
                    cs: t.cs,
                    word: r.get("word"),
                    title: u.trimTags(t.fromPageTitle || t.fromPageTitleEnc || ""),
                    ddesc: u.trimTags(t.picDesc || ""),
                    shixiao: 11 == t.bdSrcType || 12 == t.bdSrcType ? 1 : 0,
                    objectType: e,
                    appid: 2e4
                };
                return 1 == e && "clothcard" == i && (n = {
                    cs: t.cs,
                    title: u.trimTags(t.fromPageTitle || t.fromPageTitleEnc || ""),
                    ddesc: u.trimTags(t.picDesc || ""),
                    shixiao: 11 == t.bdSrcType || 12 == t.bdSrcType ? 1 : 0,
                    objectType: e,
                    appid: 2e4
                }),
                n
            },
            parseResponse: function(r) {
                if (!r || !r.data || 0 != r.errno || 0 != r.data.errnum) return null;
                var e = r && r.data && r.data.results;
                if (e && e.length) {
                    for (var t = [], i = 0, n = e.length; n > i; i++) {
                        var s = this._buildInfo(e[i]);
                        s && t.push(s)
                    }
                    return t
                }
                return null
            },
            _buildInfo: function(r) {
                var e = null;
                return r.items && r.items.length && r.images && r.images.length && o(r.items).each(function(t, i) {
                    return i.imageId && (o(r.images).each(function(r, e) {
                        return i.imageId == e.imageId ? (i.imgInfo = e, !1) : void 0
                    }), i.imgInfo) ? (e = i, !1) : void 0
                }),
                e
            }
        }
    }
    function i(r, e, t, i) {
        return {
            key: e,
            url: "/cardserver/search",
            _propParser: {},
            pageModel: r,
            buildQuery: function(r) {
                for (var i = this,
                n = r[e], s = [], a = 0; a < n.length; a++) {
                    var u = n[a],
                    p = r[u],
                    c = t[u];
                    if ("srv_auto" == u && (i.serviceConf = c), p && c) for (var l = 0; l < c.length; l++) {
                        var d = c[l];
                        this._propParser[d.key] || (this._propParser[d.key] = d.parser),
                        s.push(this._buildReqInfo(p, d.key, d.fieldsMap))
                    }
                }
                return s.length ? {
                    para: o.json.stringify(s)
                }: null
            },
            _buildReqInfo: function(r, e, t) {
                var i = {
                    ct: e,
                    cv: [{
                        provider: r.provider,
                        Https: "https:" == window.location.protocol ? "1": "0"
                    }]
                },
                n = i.cv[0];
                if (t) for (var s in t) if (t.hasOwnProperty(s)) {
                    var a = t[s] || s;
                    n[s] = String(o.isFunction(a) ? a(r) : r[a] || "")
                }
                return i
            },
            parseResponse: function(e) {
                if (!e || !e.data) return null;
                var t = e.data,
                n = this._propParser;
                for (var s in n) if (n.hasOwnProperty(s)) {
                    var a = t[s],
                    u = n[s];
                    a && (delete a.cache, u && (a = u(a, r)), o.isEmptyObject(a) && (a = null), t[s] = a)
                }
                return i && (t = i(t, r)),
                t
            }
        }
    }
    function n(r, e, t, i) {
        return {
            key: e,
            url: "/search/exchangedata",
            _propParser: {},
            reqParams: {},
            pageModel: r,
            buildQuery: function(r) {
                for (var i = r[e], n = {},
                s = 0; s < i.length; s++) {
                    var a = i[s],
                    u = r[a],
                    p = t[a];
                    if (u && p) for (var c = 0; c < p.length; c++) {
                        var l = p[c];
                        this._propParser[l.key] || (this._propParser[l.key] = l.parser),
                        l.getReqParam && o.isFunction(l.getReqParam) && (this.reqParams = l.getReqParam()),
                        n = o.extend({},
                        this._buildReqInfo(u, l.key, l.fieldsMap))
                    }
                }
                return o.isEmptyObject(n) ? null: n
            },
            _buildReqInfo: function(r, e, t) {
                var i = {};
                if (t) for (var n in t) if (t.hasOwnProperty(n)) {
                    var s = t[n] || n;
                    i[n] = String(o.isFunction(s) ? s(r) : r[s] || "")
                }
                return i
            },
            parseResponse: function(e) {
                if (!e || !e.data) return null;
                var t, n = this._propParser;
                for (var s in n) if (n.hasOwnProperty(s)) {
                    var a = n[s];
                    e && e.data.length > 0 && a && (t = a(e))
                }
                return i && (t = i(t, r)),
                t
            }
        }
    }
    function s(r, e, t, i) {
        return {
            key: e,
            url: "/search/rscjson",
            _propParser: {},
            pageModel: r,
            type: "get",
            buildQuery: function(e) {
                var t = r.get("word"),
                i = e.fromPageTitle || e.fromPageTitleEnc || e.picDesc || t;
                return i = u.trimTags(i),
                {
                    title: i,
                    fromurl: e.fromURL || e.picDescUrl || "",
                    word: t,
                    tn: "recjson"
                }
            },
            parseResponse: function(e) {
                return e ? (i && (parseResObj = i(e, r)), parseResObj) : null
            }
        }
    }
    function a(r) {
        return {
            key: "copyright",
            url: "/copyright/copyrightjson",
            pageModel: r,
            type: "get",
            buildQuery: function(r) {
                return {
                    cslist: JSON.stringify([r.cs])
                }
            },
            parseResponse: function(r) {
                return r || {}
            }
        }
    } {
        var o = r("common:widget/ui/base/base"),
        u = r("common:widget/ui/utils/utils"),
        p = r("searchdetail:widget/ui/utils/lib");
        r("searchdetail:widget/ui/app/pagemodel")
    }
    return {
        pageModel: null,
        init: function(r, e) {
            return this.pageModel = r,
            this.imgpropCollection = e,
            this
        },
        getReqParams: function() {
            var r = this.pageModel,
            e = {
                tn: r.get("datatn") || "resultjson_com",
                ipn: "rj",
                ct: "201326592",
                is: r.get("is") || "",
                fp: "detail"
            },
            t = ["cl", "lm", "hd", "latest", "copyright", "ie", "oe", "adpicid", "lpn", "st", "word", "z", "ic", "s", "se", "tab", "width", "height", "face", "istype", "qc", "nc", "fr", "simics", "rpstart", "rpnum", "cs"],
            i = r.get("step_word");
            return r.get("simics") && t.push("cardserver"),
            o(t).each(function(t, i) {
                e[i] = r.get(i) || ""
            }),
            i && (e.word = i, e.step_word = i, e.ie = "utf-8"),
            e
        },
        cloth: function() {
            return t(this.pageModel, 1)
        },
        bag: function() {
            return t(this.pageModel, 2)
        },
        shoe: function() {
            return t(this.pageModel, 3)
        },
        imageDeepInfo: function() {
            return i(this.pageModel, "imageDeepInfo", {
                imageDeep_info: [{
                    key: "cards",
                    fieldsMap: {
                        provider: "provider",
                        cs: "cs",
                        srctype: "srctype",
                        os: "os",
                        query: "query"
                    },
                    parser: function(r) {
                        return r
                    }
                }]
            },
            function(r) {
                return r
            },
            this.imgCollection)
        },
        serviceCard: function() {
            var r = this;
            return i(this.pageModel, "serviceCard", {
                srv_sight: [{
                    key: "lvyouxianlu",
                    fieldsMap: {
                        arrive: function(r) {
                            return r.sight || r.city
                        }
                    }
                },
                {
                    key: "jingdiantuijian",
                    fieldsMap: {
                        sightName: "sight",
                        cityName: "city"
                    }
                }],
                srv_auto: [{
                    key: "auto",
                    fieldsMap: {
                        id: "id"
                    },
                    parser: function(r) {
                        if (r) {
                            for (var e = ["logo", "name", "priceInfo", "volume", "trans", "inquiryUrl", "picList"], t = e.length - 1; t >= 0; t--) {
                                var i = e[t];
                                if (!r[i]) return null
                            }
                            var n = r.table_id;
                            n && o(r.picList).each(function(r, e) {
                                e.suo_url && (e.picUrl = p.getThumbUrl(e.suo_url, n))
                            });
                            for (var t = r.picList.length - 1; t >= 0; t--) {
                                var s = r.picList[t].suo_url;
                                s && "0" != s && "0,0" != s || r.picList.splice(t, 1)
                            }
                        }
                        return r
                    },
                    getParams: function() {
                        return r.getReqParams()
                    }
                }],
                "srv_auto-brand": [{
                    key: "auto-brand",
                    fieldsMap: {
                        id: "id"
                    },
                    parser: function(r) {
                        if (r) {
                            var e = r.table_id;
                            e && o(r.picList).each(function(r, t) {
                                t.suo_url && (t.picUrl = p.getThumbUrl(t.suo_url, e))
                            })
                        }
                        return r
                    }
                }],
                srv_simi: [{
                    key: "simi",
                    fieldsMap: {
                        provider: "provider",
                        query: "query",
                        SimiCs: "SimiCs",
                        type: "type",
                        pn: "pn",
                        rn: "rn",
                        srctype: "srctype",
                        bdtype: "bdtype",
                        os: "os"
                    },
                    parser: function(r, e) {
                        var t = r.xiangshi_info,
                        i = [];
                        if (t && t.url && t.url.length) for (var n = t.url,
                        s = t.os,
                        a = t.cs,
                        o = (t.pn, t.di), u = t.srctype, p = ["tn", "word", "ie", "step_word", "ipn", "istype"], c = e.buildQuery(p), l = 0, d = n.length; d > l; l++) i.push({
                            srctype: u[l],
                            imgUrl: n[l],
                            cs: a[l],
                            detailUrl: "/search/detail?" + c + "&os=" + s[l] + "&cs=" + a[l] + (o ? "&di=" + o[l] : "") + "&pn=" + l + "&simi=cardserver"
                        });
                        return i
                    }
                }],
                srv_friend: [{
                    key: "cards",
                    fieldsMap: {
                        provider: "provider",
                        simid: "simid",
                        cs: "cs",
                        srctype: "srctype",
                        os: "os"
                    },
                    parser: function(r) {
                        var e = r.simid_info;
                        return e && e.make_friends
                    }
                }],
                srv_zhuangxiu: [{
                    key: "simi",
                    fieldsMap: {
                        provider: "provider",
                        query: "query",
                        SimiCs: "SimiCs",
                        type: "type",
                        pn: "pn",
                        rn: "rn",
                        srctype: "srctype"
                    },
                    parser: function(r, e) {
                        var t = r.xiangshi_info,
                        i = [];
                        if (t && t.url && t.url.length) for (var n = t.url,
                        s = t.os,
                        a = t.cs,
                        o = (t.pn, t.di), u = t.srctype, p = ["tn", "word", "ie", "step_word", "ipn", "istype", "fr"], c = e.buildQuery(p), l = 0, d = n.length; d > l; l++) i.push({
                            srctype: u[l],
                            imgUrl: n[l],
                            cs: a[l],
                            detailUrl: "/search/detail?" + c + "&os=" + s[l] + "&cs=" + a[l] + (o ? "&di=" + o[l] : "") + "&pn=" + (l + 1) + "&simi=cardserver"
                        });
                        return i
                    }
                }]
            },
            function(r) {
                return r
            },
            this.imgCollection)
        },
        asyncCard: function() {
            var r = this;
            return n(this.pageModel, "asyncCard", {
                srv_beautyphoto: [{
                    key: "beautyphoto",
                    fieldsMap: {
                        query: "query",
                        tn: "tn"
                    },
                    parser: function(r) {
                        var e = {};
                        return "meinv" == r.dataType ? e.beauty = r.data: e.photo = r.data,
                        e
                    },
                    getReqParam: function() {
                        return r.getReqParams()
                    }
                }]
            },
            function(r) {
                return r
            })
        },
        asyncRs: function() {
            return s(this.pageModel, "asyncRs", {
                rsResult: [{
                    key: "asynrsresult",
                    fieldsMap: {
                        word: "word",
                        tn: "tn"
                    },
                    parser: function(r) {
                        return r
                    }
                }]
            },
            function(r) {
                var e = {};
                return r.PsRelateSearch && r.PsRelateSearch.ResultArray ? (e.rsresult = r.PsRelateSearch.ResultArray, e) : null
            })
        },
        photographerRecommend: function() {
            return e(this.pageModel)
        },
        copyrightInfo: function() {
            return a(this.pageModel)
        }
    }
});;
/*!searchdetail:widget/ui/action/base/base.js*/
define("searchdetail:widget/ui/action/base/base",
function(e) {
    function t(e) {
        this.pageModel = e
    }
    var a = e("common:widget/ui/base/base"),
    o = e("searchdetail:widget/ui/app/page"),
    i = e("searchdetail:widget/ui/action/base/imgcollectioin_setting"),
    n = e("searchdetail:widget/ui/action/base/propcollection_setting"),
    r = e("searchdetail:widget/ui/collections/imgpropertycollection"),
    d = e("searchdetail:widget/ui/statistic/statistic-core"),
    l = (e("searchdetail:widget/ui/controls/card/base/base"), e("searchdetail:widget/ui/controls/card/wikiinfo/wikiinfo")),
    g = e("searchdetail:widget/ui/controls/card/wikiinfoface/wikiinfoface"),
    c = (e("searchdetail:widget/ui/controls/card/relationship/relationship"), e("searchdetail:widget/ui/controls/card/relatedpic/relatedpic")),
    s = e("searchdetail:widget/ui/controls/card/suCard/suCard"),
    m = (e("searchdetail:widget/ui/controls/card/wallpaper/wallpaper"), e("searchdetail:widget/ui/controls/card/materialinfo/materialinfo"), e("searchdetail:widget/ui/controls/card/similarpic/similarpicasync")),
    u = e("searchdetail:widget/ui/controls/card/friends/friendsasync"),
    p = e("searchdetail:widget/ui/controls/card/goods/goodsSync"),
    f = e("searchdetail:widget/ui/controls/card/goodsface/goodsface"),
    h = (e("searchdetail:widget/ui/controls/card/car/car"), e("searchdetail:widget/ui/controls/card/carface/carface")),
    w = e("searchdetail:widget/ui/controls/card/carface2/carface2"),
    C = e("searchdetail:widget/ui/controls/card/hotcars/hotcars"),
    y = (e("searchdetail:widget/ui/controls/card/foods/foods"), e("searchdetail:widget/ui/controls/card/hottags/hottags")),
    I = e("searchdetail:widget/ui/controls/card/adcard/adcard"),
    D = (e("searchdetail:widget/ui/controls/card/imgstory/imgstory"), e("searchdetail:widget/ui/controls/card/beauty/beauty")),
    M = e("searchdetail:widget/ui/controls/card/photo/photo"),
    v = e("searchdetail:widget/ui/controls/card/xianguiProviderAd/xianguiProviderAd"),
    A = e("searchdetail:widget/ui/controls/card/xianguiProductsAd/xianguiProductsAd"),
    K = (e("searchdetail:widget/ui/controls/card/decoration_sim/decoration_sim"), e("searchdetail:widget/ui/controls/card/sim_travel/sim_travel")),
    b = e("searchdetail:widget/ui/controls/card/rsResult/rsResult"),
    R = (e("searchdetail:widget/ui/controls/card/rsResult/rsResultAsync"), e("searchdetail:widget/ui/controls/card/nsAdII_relateCase/relateCaseAsync")),
    x = e("searchdetail:widget/ui/controls/card/goodsdetail/goodsdetail"),
    _ = e("searchdetail:widget/ui/controls/card/nsAdII_relateImg/relateImg"),
    S = e("searchdetail:widget/ui/controls/card/nsAdII_relateCase/relateCase"),
    U = e("searchdetail:widget/ui/controls/card/nsAdII_rightWorks/rightWorks"),
    k = e("searchdetail:widget/ui/controls/card/nsAdII_consult/consult"),
    O = e("searchdetail:widget/ui/controls/card/nsAdII_bottomBanner/bottomBanner"),
    P = e("searchdetail:widget/ui/controls/card/nsAdII_rightPicInfo/rightpicinfo"),
    T = e("searchdetail:widget/ui/controls/card/nsAdII_leftAnchor/leftanchor"),
    q = e("searchdetail:widget/ui/controls/card/nsAdII_leftBottomButton/leftBottomButton"),
    L = e("searchdetail:widget/ui/controls/card/nsAdII_similarCase/similarcaseAsync"),
    j = e("searchdetail:widget/ui/controls/card/nsAdII_cpl/cpl"),
    W = e("searchdetail:widget/ui/controls/card/tjAd/tjAd"),
    B = e("searchdetail:widget/ui/controls/card/photographerInfo/index"),
    N = e("searchdetail:widget/ui/controls/card/photographDetail/index"),
    F = e("searchdetail:widget/ui/controls/card/photographRelated/index"),
    H = e("searchdetail:widget/ui/controls/card/photographerRecommend/index");
    return a.extend(t.prototype, {
        initPage: function() {
            o.on("firstimgloaded",
            function() {}),
            o.on("loaded",
            function() {}),
            o.init(this.pageModel)
        },
        afterInit: function() {},
        initImgCollection: function() {
            new i(o.imgCollection, this.pageModel).process()
        },
        initImgPropCollection: function() {
            n.init(this.pageModel, new r(o.imgCollection));
            var e = {
                imageDeepInfo: new r(o.imgCollection, n.imageDeepInfo()),
                serviceCard: new r(o.imgCollection, n.serviceCard()),
                asyncCard: new r(o.imgCollection, n.asyncCard()),
                photographerRecommend: new r(o.imgCollection, n.photographerRecommend()),
                copyrightInfo: new r(o.imgCollection, n.copyrightInfo())
            };
            o.imgModel.setPropCollections(e)
        },
        initFeature: function() {
            var e = this.pageModel.getAbTestGroup(),
            t = new g(null, {
                dataKey: "wiki_face_entity",
                logKey: "wiki"
            },
            e),
            a = new h(null, {
                dataKey: "srv_auto",
                mergeKey: "serviceCard",
                propKey: "auto",
                logKey: "auto"
            }),
            i = new w(null, {
                dataKey: "srv_auto",
                mergeKey: "serviceCard",
                propKey: "autoNoResult",
                logKey: "autoNoResult"
            }),
            n = new f(null, {
                dataKey: "cloth",
                logKey: "cloth"
            });
            o.controls.WikiInfoFaceControl = t,
            o.controls.carCtrl = a,
            o.controls.carCtrlNoResult = i,
            o.controls.clothCtrl = n,
            o.controls.wikiInfoCtrl = new l(null, {
                dataKey: "wiki_entity1",
                logKey: "wiki"
            });
            var r = {
                wikiInfoCard: [],
                imagedetailCards: [t, a, i],
                cards: [new D(null, {
                    dataKey: "srv_beautyphoto",
                    mergeKey: "asyncCard",
                    propKey: "beauty",
                    logKey: "beauty"
                }), new P(null, {
                    nsAdData: this.pageModel.tempData.get("nsAdIIData")
                }), new B(null, {
                    dataKey: "photographerInfo"
                }), new N(null, {
                    dataKey: "photographDetail"
                }), new F(null, {
                    dataKey: "photographRelated"
                }), new H(null, {
                    dataKey: "photographerRecommend"
                }), new U(null, {
                    logKey: "rightWorks"
                }), new T(null), new q(null), new W(null, {
                    tjadData: this.pageModel.tempData.get("tjadData")
                }), new m(null, {
                    dataKey: "srv_simi",
                    mergeKey: "serviceCard",
                    propKey: "simi",
                    logKey: "xiangsi",
                    nsAdData: this.pageModel.tempData.get("nsAdIIData"),
                    tjadData: this.pageModel.tempData.get("tjadData")
                }), new I(null, {
                    element: "#adCard",
                    checkState: !1
                }), new b(null, {
                    dataKey: "rsResult",
                    logKey: "rsResult",
                    sortKey: "common",
                    rsResult: this.pageModel.get("rsResult") || [],
                    oriquery: this.pageModel.get("queryWordEnc")
                }), new j(null, {
                    nsAdData: this.pageModel.tempData.get("nsAdIIData"),
                    verticalAdData: this.pageModel.tempData.get("verticalAdData")
                }), new y(null, {
                    dataKey: "hotTags",
                    logKey: "hottags"
                }), new C(null, {
                    dataKey: "srv_auto-brand",
                    mergeKey: "serviceCard",
                    propKey: "auto-brand",
                    logKey: "autobrand"
                }), new K(null, {
                    dataKey: "sim_travel"
                }), new p(null, {
                    dataKey: "goods",
                    logKey: "goods"
                }), new c(null, {
                    dataKey: "relatePic1",
                    logKey: "picset"
                }), new c(null, {
                    caption: "识图推广",
                    dataKey: "tuJiaAdData",
                    logKey: "tujiaad"
                }), new x(null, {
                    dataKey: "goodsDetail",
                    sortKey: "common"
                }), new R(null, {
                    logKey: "relateCaseAsync"
                }), new _(null, {
                    logKey: "relateImg",
                    nsAdData: this.pageModel.tempData.get("nsAdIIData")
                }), new S(null, {
                    logKey: "relateCase",
                    nsAdData: this.pageModel.tempData.get("nsAdIIData")
                }), new L(null, {
                    nsAdData: this.pageModel.tempData.get("nsAdIIData")
                }), new k(null, {
                    nsAdData: this.pageModel.tempData.get("nsAdIIData")
                }), new M(null, {
                    dataKey: "srv_beautyphoto",
                    mergeKey: "asyncCard",
                    propKey: "photo",
                    logKey: "photo"
                }), new v(null, {
                    dataKey: "xianguiProvider",
                    nsAdData: this.pageModel.tempData.get("nsAdIIData")
                }), new A(null, {
                    dataKey: "xianguiProducts",
                    nsAdData: this.pageModel.tempData.get("nsAdIIData")
                }), new s(null, {
                    dataKey: "suCard",
                    logKey: "",
                    sortKey: "common"
                }), new O(null, {
                    logKey: "bottomBanner",
                    nsAdData: this.pageModel.tempData.get("nsAdIIData")
                })],
                priority: [0, 1, 2, 3, 4, 5, 17, 18, 19, 11, 20, 13, 6, 7, 8, 9, 10, 12, 14, 15, 16, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32]
            };
            "friendscard" == e && r.cards.splice(2, 0, new u(null, {
                dataKey: "srv_friend",
                mergeKey: "serviceCard",
                propKey: "cards",
                logKey: "jiaoyou"
            })),
            o.featureManager.setAds(r);
            var d = [].concat(r.wikiInfoCard, r.cards);
            o.featureManager.setLogCards(d),
            o.featureManager.setCardSeq(d)
        },
        initAds: function() {
            o.initAds(["eyeball", "ecomimad"])
        },
        process: function() {
            this.initPage(),
            this.initImgCollection(),
            this.initImgPropCollection(),
            this.initFeature(),
            this.initAds(),
            this.afterInit(),
            this.initHandlers(),
            this.bindEvent(),
            o.run(),
            this.attatchControls()
        },
        initHandlers: function() {
            var e = this;
            e.onChangeImgOffset = function() {
                a(".ie-shituTip, .shituTip").remove(),
                a(".download-tip-content").remove()
            },
            window.isAlaPreload = "";
            var t = document.getElementById("hdFirstImgObj");
            t && t.getAttribute("data-israndom") && (window.isAlaPreload = "1" === t.getAttribute("data-israndom") ? "1": "0"),
            o.handlers.extend({
                onPageResizeHandler: function() {
                    o.sizeManager.update()
                },
                onHistoryChangedHandler: function(e) {
                    null != e.state && (pn = e.state && e.state.pn || 0, spn = e.state && e.state.spn || 0, o.dataController.changePn(1 * pn, 1 * spn))
                },
                onKeyPressHandler: function(t) {
                    var t = t || window.event,
                    i = t.keyCode || t.which,
                    n = {
                        38 : !0,
                        37 : !0
                    },
                    r = {
                        39 : !0,
                        40 : !0
                    };
                    if (!t.ctrlKey && n[i]) {
                        var l = (o.imgModel.get("imgData"), {
                            livt: (new Date).getTime() - d.imgViewStart
                        }),
                        g = e.pageModel.get("simics");
                        g && (l = a.extend(l, {
                            isSimi: "simi"
                        })),
                        e.pageModel.get("oriquery") && e.pageModel.get("fm") && (l = a.extend(l, {
                            oriquery: e.pageModel.get("oriquery"),
                            fm: e.pageModel.get("fm")
                        })),
                        e.onChangeImgOffset(),
                        o.dataController.changeImgOffset( - 1).done(function() {
                            0 !== o.dataController.imgModel.data.imgData.partnerId && (l.copyright = o.dataController.imgModel.data.imgData.partnerId),
                            d.send("5.12", a.extend(l, {
                                tp: 3,
                                eo: "p410",
                                keyb: 3,
                                tpl: window.isAlaPreload
                            }));
                            var e = o.dataController.imgModel.data.imgData.loadState,
                            t = o.dataController.imgModel.data.imgData.objURL,
                            i = o.dataController.imgModel.data.imgData.loadTime,
                            n = o.dataController.imgModel.data.imgData.fromURL;
                            if (e = -1 == e ? -1 : i, "undefined" != typeof e) {
                                var r = "//imgstat.baidu.com/6.gif?u=" + encodeURIComponent(t) + "&ue=" + encodeURIComponent(t) + "&f=" + encodeURIComponent(n) + "&tm=" + e + "&_dev=pc&hostfr=imgstat",
                                g = new Image;
                                g.src = r + "&" + (new Date).getTime()
                            }
                        })
                    }
                    if (!t.ctrlKey && r[i]) {
                        var l = (o.imgModel.get("imgData"), {
                            livt: (new Date).getTime() - d.imgViewStart
                        }),
                        g = e.pageModel.get("simics");
                        g && (l = a.extend(l, {
                            isSimi: "simi"
                        })),
                        e.pageModel.get("oriquery") && e.pageModel.get("fm") && (l = a.extend(l, {
                            oriquery: e.pageModel.get("oriquery"),
                            fm: e.pageModel.get("fm")
                        })),
                        e.onChangeImgOffset(),
                        o.dataController.changeImgOffset(1).done(function() {
                            0 !== o.dataController.imgModel.data.imgData.partnerId && (l.copyright = o.dataController.imgModel.data.imgData.partnerId),
                            d.send("5.12", a.extend(l, {
                                tp: 3,
                                eo: "p410",
                                keyb: 4,
                                tpl: window.isAlaPreload
                            }));
                            var e = o.dataController.imgModel.data.imgData.loadState,
                            t = o.dataController.imgModel.data.imgData.objURL,
                            i = o.dataController.imgModel.data.imgData.loadTime,
                            n = o.dataController.imgModel.data.imgData.fromURL;
                            if (e = -1 == e ? -1 : i, "undefined" != typeof e) {
                                var r = "//imgstat.baidu.com/6.gif?u=" + encodeURIComponent(t) + "&ue=" + encodeURIComponent(t) + "&f=" + encodeURIComponent(n) + "&tm=" + e + "&_dev=pc&hostfr=imgstat",
                                g = new Image;
                                g.src = r + "&" + (new Date).getTime()
                            }
                        })
                    }
                },
                onImageScaleChanged: function(e) {
                    o.imgModel.set("scale", e.scale)
                },
                onImageWheelPrev: function() {
                    var t = (o.imgModel.get("imgData"), {
                        livt: (new Date).getTime() - d.imgViewStart
                    }),
                    i = e.pageModel.get("simics");
                    i && (t = a.extend(t, {
                        isSimi: "simi"
                    })),
                    e.pageModel.get("oriquery") && e.pageModel.get("fm") && (t = a.extend(t, {
                        oriquery: e.pageModel.get("oriquery"),
                        fm: e.pageModel.get("fm")
                    })),
                    e.onChangeImgOffset(),
                    o.dataController.changeImgOffset( - 1).done(function() {
                        0 !== o.dataController.imgModel.data.imgData.partnerId && (t.copyright = o.dataController.imgModel.data.imgData.partnerId),
                        d.send("5.12", a.extend(t, {
                            tp: 3,
                            eo: "p409",
                            keyb: 6,
                            tpl: window.isAlaPreload
                        }));
                        var e = o.dataController.imgModel.data.imgData.loadState,
                        i = o.dataController.imgModel.data.imgData.objURL,
                        n = o.dataController.imgModel.data.imgData.loadTime,
                        r = o.dataController.imgModel.data.imgData.fromURL;
                        if (e = -1 == e ? -1 : n, "undefined" != typeof e) {
                            var l = "//imgstat.baidu.com/6.gif?u=" + encodeURIComponent(i) + "&ue=" + encodeURIComponent(i) + "&f=" + encodeURIComponent(r) + "&tm=" + e + "&_dev=pc&hostfr=imgstat",
                            g = new Image;
                            g.src = l + "&" + (new Date).getTime()
                        }
                    })
                },
                onImageWheelNext: function() {
                    var t = (o.imgModel.get("imgData"), {
                        livt: (new Date).getTime() - d.imgViewStart
                    }),
                    i = e.pageModel.get("simics");
                    i && (t = a.extend(t, {
                        isSimi: "simi"
                    })),
                    e.pageModel.get("oriquery") && e.pageModel.get("fm") && (t = a.extend(t, {
                        oriquery: e.pageModel.get("oriquery"),
                        fm: e.pageModel.get("fm")
                    })),
                    e.onChangeImgOffset(),
                    o.dataController.changeImgOffset(1).done(function() {
                        0 !== o.dataController.imgModel.data.imgData.partnerId && (t.copyright = o.dataController.imgModel.data.imgData.partnerId),
                        d.send("5.12", a.extend(t, {
                            tp: 3,
                            eo: "p409",
                            keyb: 7,
                            tpl: window.isAlaPreload
                        }));
                        var e = o.dataController.imgModel.data.imgData.loadState,
                        i = o.dataController.imgModel.data.imgData.objURL,
                        n = o.dataController.imgModel.data.imgData.loadTime,
                        r = o.dataController.imgModel.data.imgData.fromURL;
                        if (e = -1 == e ? -1 : n, "undefined" != typeof e) {
                            var l = "//imgstat.baidu.com/6.gif?u=" + encodeURIComponent(i) + "&ue=" + encodeURIComponent(i) + "&f=" + encodeURIComponent(r) + "&tm=" + e + "&_dev=pc&hostfr=imgstat",
                            g = new Image;
                            g.src = l + "&" + (new Date).getTime()
                        }
                    })
                },
                onViewModeChanged: function(e) {
                    "adapt" == e.mode ? (o.controls.imgDetail.autoScale(), d.send("5.1009112")) : (o.controls.imgDetail.zoom(1), d.send("5.1009111"))
                },
                onImageLinkOut: function() {
                    var t = o.imgModel,
                    a = t && t.get("imgData");
                    d.send("5.15", {
                        tn: "baiduimagedetail",
                        fm: "picwrap",
                        site: a && a.fromURL
                    });
                    var i, n, r = "";
                    if ("3" === a.adType) {
                        if (e.pageModel && e.pageModel.tempData) {
                            i = e.pageModel.tempData,
                            n = i.get("nsAdIIData");
                            for (var l = 0; n && l < n.length; l++) if ("pc_detail_slider_right_relate_img" === n[l].Tag) {
                                var g = n[l].Items;
                                g && g.length && (r = n[l].Items[0].BrandName)
                            }
                        }
                        d.send("10.1010101", {
                            as: r,
                            pos: "pc_detail_before_insert",
                            subpos: "0",
                            matcont: a && a.bigImgUrl,
                            tgTo: 1
                        })
                    }
                },
                onDutuAnchorOver: function(e) {
                    e.target.anthorIndex.indexOf("auto") >= 0 ? (o.controls.carCtrl.active(e.target), o.controls.carCtrlNoResult.active(e.target)) : e.target.anthorIndex.indexOf("cloth") >= 0 ? o.controls.clothCtrl.active(e.target) : o.controls.WikiInfoFaceControl.active(e.target)
                },
                onDutuAnchorOut: function(e) {
                    e.target.anthorIndex.indexOf("auto") >= 0 ? (o.controls.carCtrl.disactive(e.target), o.controls.carCtrlNoResult.disactive(e.target)) : e.target.anthorIndex.indexOf("cloth") >= 0 ? o.controls.clothCtrl.disactive(e.target) : o.controls.WikiInfoFaceControl.disactive(e.target)
                },
                onWikiinfoOver: function(e) {
                    o.controls.WikiInfoFaceControl.active(e.target),
                    o.controls.imgDetail.dutuAnchor.clearHout(e.target)
                },
                onWikiinfoOut: function() {
                    o.controls.WikiInfoFaceControl.disactive(o.controls.imgDetail.dutuAnchor)
                },
                onCarOver: function(e) {
                    o.controls.carCtrl.active(e.target),
                    o.controls.imgDetail.dutuAnchor.clearHout(e.target)
                },
                onCarOut: function() {
                    o.controls.carCtrl.disactive(o.controls.imgDetail.dutuAnchor)
                },
                onCarNoresultOver: function(e) {
                    o.controls.carCtrlNoResult.active(e.target),
                    o.controls.imgDetail.dutuAnchor.clearHout(e.target)
                },
                onCarNoresultOut: function() {
                    o.controls.carCtrlNoResult.disactive(o.controls.imgDetail.dutuAnchor)
                },
                onClothOver: function(e) {
                    o.controls.clothCtrl.active(e.target),
                    o.controls.imgDetail.dutuAnchor.clearHout(e.target)
                },
                onClothOut: function() {
                    o.controls.clothCtrl.disactive(o.controls.imgDetail.dutuAnchor)
                },
                onDownloadClick: function() {},
                onDutuSwitcherOver: function() {
                    o.controls.imgDetail.dutuAnchor.hover()
                },
                onDutuSwitcherOut: function() {
                    o.controls.imgDetail.dutuAnchor.hout()
                },
                onImgSlidePrevBtnClicked: function(t) {
                    var i = e.pageModel.get("simics");
                    t.preventDefault();
                    var n = (o.imgModel.get("imgData"), {
                        livt: (new Date).getTime() - d.imgViewStart
                    });
                    i && (n = a.extend(n, {
                        isSimi: "simi"
                    })),
                    e.pageModel.get("oriquery") && e.pageModel.get("fm") && (n = a.extend(n, {
                        oriquery: e.pageModel.get("oriquery"),
                        fm: e.pageModel.get("fm")
                    })),
                    e.onChangeImgOffset(),
                    o.dataController.changeImgOffset( - 1).done(function() {
                        0 !== o.dataController.imgModel.data.imgData.partnerId && (n.copyright = o.dataController.imgModel.data.imgData.partnerId),
                        d.send("5.12", a.extend(n, {
                            tp: 3,
                            eo: "p12",
                            keyb: 13,
                            tpl: window.isAlaPreload
                        }));
                        var e = o.dataController.imgModel.data.imgData.loadState,
                        t = o.dataController.imgModel.data.imgData.objURL,
                        i = o.dataController.imgModel.data.imgData.loadTime,
                        r = o.dataController.imgModel.data.imgData.fromURL;
                        if (e = -1 == e ? -1 : i, "undefined" != typeof e) {
                            var l = "//imgstat.baidu.com/6.gif?u=" + encodeURIComponent(t) + "&ue=" + encodeURIComponent(t) + "&f=" + encodeURIComponent(r) + "&tm=" + e + "&_dev=pc&hostfr=imgstat",
                            g = new Image;
                            g.src = l + "&" + (new Date).getTime()
                        }
                    })
                },
                onImgSlideNextBtnClicked: function(t) {
                    var i = e.pageModel.get("simics");
                    t.preventDefault();
                    var n = (o.imgModel.get("imgData"), {
                        livt: (new Date).getTime() - d.imgViewStart
                    });
                    i && (n = a.extend(n, {
                        isSimi: "simi"
                    })),
                    e.pageModel.get("oriquery") && e.pageModel.get("fm") && (n = a.extend(n, {
                        oriquery: e.pageModel.get("oriquery"),
                        fm: e.pageModel.get("fm")
                    })),
                    e.onChangeImgOffset(),
                    o.dataController.changeImgOffset(1).done(function() {
                        0 !== o.dataController.imgModel.data.imgData.partnerId && (n.copyright = o.dataController.imgModel.data.imgData.partnerId),
                        d.send("5.12", a.extend(n, {
                            tp: 3,
                            eo: "p12",
                            keyb: 14,
                            tpl: window.isAlaPreload
                        }));
                        var e = o.dataController.imgModel.data.imgData.loadState,
                        t = o.dataController.imgModel.data.imgData.objURL,
                        i = o.dataController.imgModel.data.imgData.loadTime,
                        r = o.dataController.imgModel.data.imgData.fromURL;
                        if (e = -1 == e ? -1 : i, "undefined" != typeof e) {
                            var l = "//imgstat.baidu.com/6.gif?u=" + encodeURIComponent(t) + "&ue=" + encodeURIComponent(t) + "&f=" + encodeURIComponent(r) + "&tm=" + e + "&_dev=pc&hostfr=imgstat",
                            g = new Image;
                            g.src = l + "&" + (new Date).getTime()
                        }
                    })
                },
                onPageMouseMove: function(t) {
                    var a = e.pageModel.getAbTestGroup();
                    if ("prevnextarrow" != a) {
                        t = t || window.event;
                        var i = {
                            x: t.clientX + document.body.scrollLeft,
                            y: t.clientY + document.body.scrollTop
                        },
                        n = o.controls.imgSlidePrevBtn;
                        i.x > o.controls.container.width() / 3 ? n.visible && (n.visible = !1, n.stop().fadeOut()) : n.visible || (n.visible = !0, n.stop().fadeIn())
                    }
                },
                onSlideImgSelected: function(t) {
                    a(".download-tip").remove(),
                    window.downloadPopCtrl.hide();
                    var i = (o.imgModel.get("imgData"), {
                        livt: (new Date).getTime() - d.imgViewStart
                    }),
                    n = e.pageModel.get("simics");
                    n && (i = a.extend(i, {
                        isSimi: "simi"
                    })),
                    e.pageModel.get("oriquery") && e.pageModel.get("fm") && (i = a.extend(i, {
                        oriquery: e.pageModel.get("oriquery"),
                        fm: e.pageModel.get("fm")
                    })),
                    e.onChangeImgOffset(),
                    o.dataController.changePn(t.index - o.imgCollection.getFixDataLength(), t.subIndex).done(function() {
                        d.send(5.13, a.extend(i, {
                            nb: 7
                        }));
                        var e = o.dataController.imgModel.data.imgData.loadState,
                        t = o.dataController.imgModel.data.imgData.objURL,
                        n = o.dataController.imgModel.data.imgData.loadTime,
                        r = o.dataController.imgModel.data.imgData.fromURL;
                        if (e = -1 == e ? -1 : n, "undefined" != typeof e) {
                            var l = "//imgstat.baidu.com/6.gif?u=" + encodeURIComponent(t) + "&ue=" + encodeURIComponent(t) + "&f=" + encodeURIComponent(r) + "&tm=" + e + "&_dev=pc&hostfr=imgstat",
                            g = new Image;
                            g.src = l + "&" + (new Date).getTime()
                        }
                    })
                },
                onSlideDockPanelStateChanged: function() {
                    o.sizeManager.update()
                },
                onEnterFullScreen: function() {
                    o.history.lockState(),
                    d.send(5.28, {}),
                    e.pageModel.set("fullScreen", 1)
                },
                onEscFullScreen: function() {
                    o.history.unlockState(),
                    e.pageModel.set("fullScreen", 0)
                },
                onPageUnLoadedHandler: function() {}
            })
        },
        bindEvent: function() {},
        attatchControls: function() {}
    }),
    t
});
