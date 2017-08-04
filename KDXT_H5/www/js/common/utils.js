define([
], function(
) {
    // 核心对象定义
    var utils = {
        /**
         * 查询当前页面URL参数
         * @param param 字段名
         * @returns 字段值
         */
        getParameter: function(param) {
            var reg = new RegExp('[&,?]' + param + '=([^\\&]*)', 'i');
            var value = reg.exec(location.search);
            return value ? value[1] : '';
        },
        /**
         * 修改url的某个参数值
         * @param url 需要处理的url
         * @param arg 字段名
         * @param arg_val 修改值
         * @returns 修改后的url
         */
        changeParameter: function(url, arg, arg_val) {
            var pattern = arg + '=([^&]*)';
            var replaceText = arg + '=' + arg_val;
            if (url.match(pattern)) {
                var tmp = '/(' + arg + '=)([^&]*)/gi';
                tmp = url.replace(eval(tmp), replaceText);
                return tmp;
            } else {
                if (url.match('[\?]')) {
                    return url + '&' + replaceText;
                } else {
                    return url + '?' + replaceText;
                }
            }
            return url + '\n' + arg + '\n' + arg_val;
        },
        /**
         * 查询URL参数
         * @param name
         * @param [url]
         * @returns {*}
         */
        getQueryString: function(name, url) {
            var reg = new RegExp('[&,?]' + name + '=([^\\&]*)', 'i');
            var value = reg.exec(url || location.href);
            return value ? value[1] : '';
        },
        /**
         * 获取URL参数对象
         * @param queryString
         * @returns {{}}
         */
        getQueryMap: function(queryString) {
            var paramObj = {},
                paramList,
                oneQueryMatch,
                regGlobal = /[\?\&][^\?\&]+=[^\?\&#]+/g,
                regOne = /[\?\&]([^=\?]+)=([^\?\&#]+)/;

            queryString = queryString || location.href;
            paramList = queryString.match(regGlobal);

            if (!paramList) {
                return paramObj;
            }

            for (var i = 0, len = paramList.length; i < len; i++) {
                oneQueryMatch = paramList[i].match(regOne);
                if (null === oneQueryMatch) {
                    continue;
                }
                paramObj[oneQueryMatch[1]] = oneQueryMatch[2];
            }

            return paramObj;
        },
        /**
         * Cookie操作
         */
        Cookie: function(key, value, options) {
            if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null || value === undefined)) {
                options = options || {};
                if (value === null || value === undefined) {
                    options.expires = -1;
                }
                if (typeof options.expires === 'number') {
                    var days = options.expires,
                        t = options.expires = new Date();
                    // expires以时间天为单位、接受小数
                    t.setTime(t.getTime() + parseInt(days * 24 * 60 * 60 * 1000));
                }
                value = String(value);

                return (document.cookie = [encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value), options.expires ? '; expires=' + options.expires.toUTCString() : '', options.path ? '; path=' + options.path : '', options.domain ? '; domain=' + options.domain : '', options.secure ? '; secure' : ''].join(''));
            }
            options = value || {};
            var decode = options.raw ? function(s) {
                return s;
            } : decodeURIComponent;
            var pairs = document.cookie.split('; ');
            for (var i = 0; i < pairs.length; i++) {
                var pair = pairs[i],
                    index = pair ? pair.indexOf('=') : -1,
                    k, v;
                //cookie值中可能带有=号 
                if (index != -1) {
                    k = pair.substring(0, index);
                    v = pair.substring(index + 1, pair ? pair.length : 0);

                    if (decode(k) === key) {
                        return decode(v || '');
                    }
                }
            }
            return null;
        }



    };
    return utils;
});
