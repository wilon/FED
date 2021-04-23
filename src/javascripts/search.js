String.prototype.md5 = function(bit) {
    var sMessage = this;

    function RotateLeft(lValue, iShiftBits) { return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits)); }

    function AddUnsigned(lX, lY) {
        var lX4, lY4, lX8, lY8, lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
        if (lX4 & lY4) return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        if (lX4 | lY4) {
            if (lResult & 0x40000000) return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
            else return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
        } else return (lResult ^ lX8 ^ lY8);
    }

    function F(x, y, z) { return (x & y) | ((~x) & z); }

    function G(x, y, z) { return (x & z) | (y & (~z)); }

    function H(x, y, z) { return (x ^ y ^ z); }

    function I(x, y, z) { return (y ^ (x | (~z))); }

    function FF(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    }

    function GG(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    }

    function HH(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    }

    function II(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    }

    function ConvertToWordArray(sMessage) {
        var lWordCount;
        var lMessageLength = sMessage.length;
        var lNumberOfWords_temp1 = lMessageLength + 8;
        var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
        var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
        var lWordArray = Array(lNumberOfWords - 1);
        var lBytePosition = 0;
        var lByteCount = 0;
        while (lByteCount < lMessageLength) {
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (sMessage.charCodeAt(lByteCount) << lBytePosition));
            lByteCount++;
        }
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
        lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
        return lWordArray;
    }

    function WordToHex(lValue) {
        var WordToHexValue = "",
            WordToHexValue_temp = "",
            lByte, lCount;
        for (lCount = 0; lCount <= 3; lCount++) {
            lByte = (lValue >>> (lCount * 8)) & 255;
            WordToHexValue_temp = "0" + lByte.toString(16);
            WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
        }
        return WordToHexValue;
    }
    var x = Array();
    var k, AA, BB, CC, DD, a, b, c, d
    var S11 = 7,
        S12 = 12,
        S13 = 17,
        S14 = 22;
    var S21 = 5,
        S22 = 9,
        S23 = 14,
        S24 = 20;
    var S31 = 4,
        S32 = 11,
        S33 = 16,
        S34 = 23;
    var S41 = 6,
        S42 = 10,
        S43 = 15,
        S44 = 21;
    // Steps 1 and 2. Append padding bits and length and convert to words
    x = ConvertToWordArray(sMessage);
    // Step 3. Initialise
    a = 0x67452301;
    b = 0xEFCDAB89;
    c = 0x98BADCFE;
    d = 0x10325476;
    // Step 4. Process the message in 16-word blocks
    for (k = 0; k < x.length; k += 16) {
        AA = a;
        BB = b;
        CC = c;
        DD = d;
        a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
        d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
        c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
        b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
        a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
        d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
        c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
        b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
        a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
        d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
        c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
        b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
        a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
        d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
        c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
        b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
        a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
        d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
        c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
        b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
        a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
        d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
        c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
        b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
        a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
        d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
        c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
        b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
        a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
        d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
        c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
        b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
        a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
        d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
        c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
        b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
        a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
        d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
        c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
        b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
        a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
        d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
        c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
        b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
        a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
        d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
        c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
        b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
        a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
        d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
        c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
        b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
        a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
        d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
        c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
        b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
        a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
        d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
        c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
        b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
        a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
        d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
        c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
        b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
        a = AddUnsigned(a, AA);
        b = AddUnsigned(b, BB);
        c = AddUnsigned(c, CC);
        d = AddUnsigned(d, DD);
    }
    if (bit == 32) {
        return WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d);
    } else {
        return WordToHex(b) + WordToHex(c);
    }
}

var sreach = function() {
    this.data = [];
    this.tagsData = [];
    this.ulhtml = '<div class="title"> <h3>$icon$<a target="_blank" href="$url$">$name$</a></h3> </div> <div class="tags"> $tags$ </div> <div class="description"> <p class="des"><pre><code class="$language$">$des$</code></pre></p> </div>';
    this.boxEml = document.getElementById("list-itme");
    this.inputElm = document.getElementById("search");
    this.info = document.getElementById("info");
    this.error = $("#error");
    this.loadingEml = document.getElementById("spinner");
    this.domainReg = /[a-zA-Z0-9]{0,62}.\/\/[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/;
    this.page_no = 1, this.tags = [];
    this.language = {
        'git': 'bash',
        'svn': 'bash',
        'vim': 'bash',
    }
    if (this.boxEml) { this.init() }
};
sreach.prototype = {
    // 字符串-关键字匹配
    isSreachIndexOF: function(oldstr, kw) {
        if (!oldstr || !kw) return false;
        // 支持正则
        oldstr = oldstr.replace(/\r\n/g, " ")
        oldstr = oldstr.replace(/\n/g, " ");
        var regexp = new RegExp(kw, "ig");
        if (regexp.test(oldstr)) return true;
        return oldstr.toLowerCase().indexOf(kw.toLowerCase()) > -1 ? true : false
    },
    simple: function(str, obj) {
        return str.replace(/\$\w+\$/gi, function(matchs) {
            var returns = obj[matchs.replace(/\$/g, "")];
            return typeof returns === "undefined" ? "" : returns;
        })
    },
    loading: function() {
        var canvas = this.loadingEml,
            ctx = canvas.getContext("2d"),
            w = canvas.width,
            h = canvas.height,
            x = w / 2,
            y = h / 2,
            radius = 16;
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.globalAlpha = .2;
        ctx.fillRect(0, 0, w, h);
        var r = [.25, 1, 1.75, 2.15, 3, 5];
        var angle = [10, 25, 45, 65, 90, 120];
        var alpha = [0, .25, .35, .45, .65, .8, 1];
        var x1 = [],
            y1 = [];
        setInterval(function() {
            ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
            ctx.fillRect(0, 0, w, h);
            x1 = [];
            y1 = [];
            for (var i = 0; i < r.length; i++) {
                if (angle[i] >= 360) angle[i] = 0;
                ctx.beginPath();
                ctx.font = "1rem sans-serif";
                ctx.fillStyle = "rgba(0,0,0," + alpha[i] + ")";
                x1.push(x + radius * Math.cos(angle[i] * Math.PI / 180));
                y1.push(y + radius * Math.sin(angle[i] * Math.PI / 180));
                ctx.arc(x1[i], y1[i], r[i], 0, 2 * Math.PI, true);
                ctx.closePath();
                ctx.fill();
                angle[i] += 6;
            }
        }, 10)
    },
    createOrUpdateItemHTML: function(item, kw) {
        const self = this,
            action = $("#"+item.id).length > 0 ? 'update' : 'create',
            mark = '￥。wilonblog。￥',
            hrefPreg = new RegExp('&lt;a\\s+href(.*?)&lt;\\/a&gt;', 'g'),
            mdHrefPreg = new RegExp(/(\!?\[.*?\]\(.*?\))/, 'g'),
            mdMark = '😍🎍😍';
        var des = item.des
            // .replace(/&/g, '&amp;')
            // .replace(/</g, '&lt;')
            // .replace(/>/g, '&gt;')
            // .replace(/"/g, '&quot;')
            .replace(hrefPreg, function(word) {
                return word
                    .replace(/&amp;/g, '&')
                    .replace(/&lt;/g, '<')
                    .replace(/&gt;/g, '>')
                    .replace(/&quot;/g, '"');
            });
        var isShow = true;
        var isMd = item.lang == 'markdown' || item.lang == 'md';
        var mdHrefReplace = [];
        if (isMd && kw) {
            // markdown 图片链接特殊处理，不搜索
            des = des.replace(mdHrefPreg, function (source) {
                const replaced = mdMark + source.md5() + mdMark;
                mdHrefReplace[replaced] = source;
                return replaced;
            });
        }
        if (kw) {
            // 搜索，忽略大小写，空格模糊搜索，特殊字符原样搜索
            var kwArr = kw.split(/\(\.\*\?\)/);
            if (self.isSreachIndexOF(item.name + des, kw)) {
                for (var i = 0; i < kwArr.length; i++) {
                    if (!self.tagsData.includes(kwArr[i]) && kwArr[i]) {
                        const kwReg = new RegExp("(" + kwArr[i] + ")", "ig");
                        des = des.replace(kwReg, mark+'$1'+mark);
                    }
                }
            } else {
                isShow = false;
            }
        }
        if (action == 'create') {
            const myLi = self.simple(self.ulhtml, {
                name: item.name,
                url: item.url,
                des: des,
                language: typeof item.lang == 'undefined' ? '' : item.lang,
                icon: function() {
                    var dm = self.domainReg.exec(item.url);
                    if (item.icon) {
                        return '<img class="' + item.icon + '" />'
                    } else {
                        if (dm && dm[0]) {
                            return '<img src="' + dm[0] + '/favicon.ico"  onerror="this.remove()" />'
                        } else {
                            return ""
                        }
                    }
                }(),
                tags: function(tags) {
                    var _tags_html = tags.join("</span><span>");
                    return _tags_html && _tags_html != "" ? "<span>" + _tags_html + "</span>" : ""
                }(item.tags || [])
            });
            var liHtml = "<li class='li_item' id='" + item.id + "'>" + myLi + "</li>";
            $('#list-itme').append(liHtml);
        }

        var li = $('#' + item.id),
            code = li.find('code');
        if (li.length < 1) {
            return false;
        }
        if (isShow == false) {
            li.hide();
            return false;
        }
        if (action == 'update') {
            code.text(des)
        }

        var markReg = new RegExp('￥(.*?)。(.*?)wilonblog(.*?)。(.*?)￥(.*?)￥(.*?)。(.*?)wilonblog(.*?)。(.*?)￥', 'ig');
        if (isMd) {
            if (kw) {
                for (var replaced in mdHrefReplace) {
                    des = des.replace(replaced, mdHrefReplace[replaced])
                }
            }
            var mdHtml = window.markdownit({
                html: true,
                linkify: true,
                breaks: true,
                typographer: true
            }).render(des);
            if (kw) {
                mdHtml = mdHtml.replace(markReg, "<sssddd class='searchHighlight'>$5</sssddd>");
            }
            li.find('.description').html(mdHtml).addClass('mddiv');
        } else {
            hljs.highlightBlock(code[0]);
            if (kw) {
                code.html(code.html().replace(markReg, "<sssddd class='searchHighlight'>$5</sssddd>"))
            }
        }

        if (isShow) {
            li.show();
        }
        return true;
    },
    //获取URL上面的参数
    getQueryString: function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = decodeURIComponent(window.location.search.substr(1)).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    },
    // 列表数据加载
    reloadListHtml: function(kw) {
        const self = this;
        // route
        if (window.history && window.history.pushState) {
            kw
            ? history.pushState({}, "wilonblog", "?kw=" + kw)
            : history.pushState({}, "wilonblog", "/");
        }
        if (kw) {
            kw = kw.replace(/(^\s*)|(\s*$)/g, '');
            document.title = '王伟龙的微笔记 - ' + kw
            $('.li_item').hide();
        }
        var count = 0;
        if (kw) {
            // 搜索，忽略大小写，空格模糊搜索，特殊字符原样搜索
            kw = kw.toLowerCase()
                .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
                .replace(/\s+/g, '(.*?)');
        }
        for (var i = 0; i < this.data.length; i++) {
            count += self.createOrUpdateItemHTML(this.data[i], kw)
        }
        console.log("Search '" + kw + "', finded " + count)
    },
    // 搜索数据初始化
    init: function() {
        var self = this;
        // loading动画
        $('#spinner').show();
        this.loading();
        // 加载data数据
        $.ajax({
            url: dataUrl,
            type: 'get',
            dataType: 'json',
            async: false
        }).done(function(dt) {
            // 加载成功，处理json数据
            for (var j = 0; j < dt.length; j++) {
                var d = dt[j];
                d.id = d.tag + j;
                d.name = d.tag.toUpperCase() + ": " + d.name;
                d.url = "/?kw=" + d.name;
                d.tags = [d.tag];
                d.icon = ["icon-" + d.tag];
                // 打乱顺序
                var rand = Math.floor(Math.random() * self.data.length);
                self.data.splice(rand, 0, d);
                self.tagsData.push(d.tag);
            }
            // 右上角
            $('#info').html("共计<i> " + self.data.length + " </i>条微笔记 ｜ ");
            // 搜索绑定事件
            var searchTimeout;
            $('#search').on('keyup', function() {
                var kw = $(this).val();
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(function() {
                    self.reloadListHtml(kw);
                }, 333);
            });
            // 搜索结果
            var kw = self.getQueryString('kw');
            kw && (self.inputElm.value = kw);
            self.reloadListHtml(kw)
            // 取消load
            $('#spinner').hide();
        });
    }
};
new sreach;

$(function() {
    // 搜索框焦点
    $('#search').focus();
    $('.search').mouseover(function(event) {
        $('#search').select();
    });
    // 托中复制
    $("body").mouseup(function(e) {
        var text = "";
        if (document.selection) {
            text = document.selection.createRange().text;
        } else if (window.getSelection()) {
            text = window.getSelection();
        }
        if (text != "") {
            try {
                var result = document.execCommand('copy');
            } catch (e) {
                var result = false;
            }
            if (result) {
                $("#tooltip").text('已复制');
            } else {
                $("#tooltip").text('不支持复制( ▼-▼ )');
            }
        }
    }).mousedown(function() {
        $("#tooltip").text('拖动自动复制');
    });
});