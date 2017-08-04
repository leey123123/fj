/**
 * @author liupengfei376 FED
 * @DateTime    2015-07-07
 * @version     v1.0
 * @name PAS.NativeAPI
 * @description 平安证券APP接口API
 * @namespace
 */
(function(window, PAS, undefined) {
    window.PAS = PAS || {};
    /*
     * NativeAPI构造方法
     */
    var NativeAPIConstruct = function() {
        this.initialize = function() {
            if (_fGetQuery("v") != null) {
                _version = _fGetQuery("v").substr(0, 3);
                localStorage["app_version"] = _version;
            } else {
                if (typeof(localStorage["app_version"]) != "undefined") {
                    _version = localStorage["app_version"];
                } else {
                    _version = "5.6";
                }
            }
            
          //解析scheme
            var scheme;
            if(navigator.userAgent.indexOf('AYLCAPP')>-1){
            	if(navigator.userAgent.indexOf("scheme")>-1){
            		var schemeStr = navigator.userAgent.substring(navigator.userAgent.indexOf("scheme"),navigator.userAgent.length);
            		scheme = schemeStr.split("/")[1];
            		scheme = scheme.split(" ")[0];
            	}
            }
			if(scheme==null || scheme=="" ||scheme==undefined){
				scheme = "anelicaiapp";
			}
			if(window.location.href.indexOf('stock.pingan.com')>-1){
				scheme = "anelicaiapp";
			}
			this.scheme = scheme;
        }
        /*
         * func: 注释部分代码为存储App中获取到的Token数据
         * 非注释代码为restapi 接口需要新增参数
         * access: private
         */
        var _tokenData = {
            /*tokenId: "d48bf9941ce64422849eca44f09b919a",
            appName: "AYLCAPP",
            userCode: "18891670a",
            sessionId: "646146a612b9471b8212f2a359493dca",
            accountType: 2,*/
            version: "2.0",//api版本号
            channel: "mobileH5",//渠道代码
            requestId: function(){
                var rnd = Math.random().toString();
                return rnd.substr(rnd.indexOf('.')+1,12);
            }(),//12位随机数
            cltplt : "h5", //applt可选clt, web, aph, apd, iph, ipd, editor, h5
            cltver : "1.0",
            body:{}//接口入参
        }

        /*
         * func: 存储大数据所需的Token数据  该token为一个坑 增加原因为app传过来token域tradesso中校验keyvalue不一样 所以在调用大数据的时候做一个转换
         * access: private
         * add by lym for BigData
         */
        /*var _BigDatatokenData = {
            hostSessionId : "646146a612b9471b8212f2a359493dc4",//sessionId
            hostAppName : "AYLCAPP",//写死的 在app中调用tradesso
            requestSessionId: function(){
                var rnd = Math.random().toString();
                return rnd.substr(rnd.indexOf('.')+1,12);
            }(),//12位随机数
            requestAppName : "AYLCAPP",//写死的 在app中调用tradesso
            loginName : "188916706",//userCode
            tokenId : "d48bf9941ce64422849eca44f09b9193",//tokenId
            cltplt : "h5", //applt可选clt, web, aph, apd, iph, ipd, editor, h5
            cltver : "1.0",
            body:{}//接口入参
        }*/

        /*将app中获取到的token转换成大数据的token
            入参：apptoken
            出参：大数据token
        */
        /*_fTranforAppTokenToBigDataToken = function(token){
            var temp = _BigDatatokenData;
            temp.hostSessionId = token.sessionId;
            temp.loginName = token.userCode;
            temp.tokenId = token.tokenId;
            temp.accountType = token.accountType;//登陆类型
            return temp;
        }*/
        /*将app中获取到的token包装成rest所需的token
            入参：apptoken
            出参：rest所需的token
        */
        _fTranforAppTokenToRestToken = function(token){
            return $.extend(token,_tokenData);//增加rest api需要的参数;
        }
        /*
         * func: 是否开启DEBUG模式
         * access: private
         */
        var _debug = (location.hostname == "127.0.0.1" || location.hostname == "localhost") ? true : false;
        var _version = "5.6";
        //app环境变量
        this.globalConditions = {
            version: "5.6"
        };




        /*
         * 获取url 的query参数
         * access: private
         */
        _fGetQuery = function(key) {
            var reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
            return null;
        }

        /*
         * 检查版本号
         * access: private
         */
        _fCheckVersion = function(version) {
            switch (version) {
                case "5.6":
                    return true;
                    break;
                default:
                    return false;
                    break;
            }
        }

        /*
         * func: 调用Native接口base方法
         * access: private
         */
        var _fCallNativeFunc = function(funcName, params, callback) {
            if (_debug) {
                $.ajax({
                    url: '../ane/nativeFunc/' + funcName,
                    type: 'GET',
                    dataType: 'json',
                    data: params,
                    success: function(data) {
                        if (typeof callback == "function")
                            callback(data);
                    },
                    error: function(xhr, errortype, error) {},
                    complete: function(xhr, status) {}
                });

                return true;
            }
            var rdm = Math.random().toString().substr(2),
                globalFuncName = "globalCallback" + rdm,
                iframeName = "nativeFuncIframe" + rdm,
                strParams = "";

            $("<iframe></iframe>").css({
                "margin": 0,
                "padding": 0,
                "border": "none",
                "height": "0px",
                "width": "0px",
                "position": "absolute"
            }).attr("id", iframeName).appendTo('body');

            window[globalFuncName] = function() {
                if (typeof callback === "function")
                    callback.apply(this, arguments);
                delete window[globalFuncName];
                $("#" + iframeName).remove();
            }

            if (params && typeof params === "object") {
                params["callback"] = "window." + globalFuncName;
            } else {
                params = {
                    callback: "window." + globalFuncName
                };
            }

            try {
                strParams = JSON.stringify(params);
            } catch (e) {
                strParams = '{"error":"params data error!"}';
            }

            $("#" + iframeName).attr("src", 'ane://' + funcName + '?' + encodeURIComponent(strParams));
        }

        /*
         * func: 设置Native头
         * access: public
         * params:icontype如果是0；则不调用图标，否则现实图片+文字
         *        left:{ icontype:1, callback:"", text:"返回" }
         *       center:{ icontype:0, callback:"", text:"标题" }
         *       right:{ icontype:3, callback:"", text:"首页" }
         */

         /**
          * @memberof    PAS.NativeAPI
          * @version     [1.0]
          * @description 设置Native头
          * @example     PAS.NativeAPI.fSetTitle({icontype: 1,callback: "window.fGoPrevious",text: ""}, {icontype: 0,callback: "",text: "资讯"}, {icontype: 0,callback: "",text: ""});
          * @param       {object}                 oLeft                 左边对象 left:{ icontype:1, callback:"", text:"返回" }
          * @param       {object}                 oCenter               中间对象center:{ icontype:0, callback:"", text:"标题" }
          * @param       {object}                 oRight                右侧对象right:{ icontype:3, callback:"", text:"首页" }
          * @param       {Function}               fCallback             回调方法
          * @return      {Function}                                     [description]
          */
        this.fSetTitle = function(oLeft, oCenter, oRight, fCallback) {
        	 _fCallNativeFunc("navigationInfo", {
                 "config": {
                     "left": oLeft,
                     "center": oCenter,
                     "right": oRight
                 }
             }, fCallback);
        }

        /*
         * func: 调用Native返回接口
         * access: public
         */
        this.fGoback = function(callback) {
        	_fCallNativeFunc("goBack", null, callback);
        }

        /*
         * func: 取Token值
         * access: public
         */
        this.fGetToken = function(callback) {
            if (_debug) {
                callback(_tokenData);
            } else {
                _fCallNativeFunc("getToken", null, function(data) {
                    if (typeof data == "string") {
                        data = JSON.parse(data);
                    }
                    data = _fTranforAppTokenToRestToken(data);//转换为大数据需要的token
                    if (typeof callback === "function") {
                        callback(data);
                    }
                });
            }
        }


        /*
         * func: 获取appToken转换为大数据所需的token
         * access: public
         */
        /*this.fGetTokenForBigData = function(callback) {
            if (_debug) {
                callback(_BigDatatokenData);
            } else {
                _fCallNativeFunc("getToken", null, function(data) {
                    if (typeof data == "string") {
                        data = JSON.parse(data);
                    }
                    data = _fTranforAppTokenToBigDataToken(data);//转换为大数据需要的token
                    if (typeof callback === "function") {
                        callback(data);
                    }
                });
            }
        }*/


        /*
         * func: 调用获取用户信息接口
         * access: public
         */
        this.fGetUser = function(callback) {
            _fCallNativeFunc("getUser", null, function(data) {
                if (typeof data == "string") {
                    data = JSON.parse(data);
                }

                if (typeof callback == "function") {
                    callback(data);
                }
            });
        }

        /*
         * func: 调用Native接口打开开户页面
         * access: public
         */
        this.fOpenAccount = function() {
            _fCallNativeFunc("openAccount", null, null);
        }

        /*
         * func: 调用复制到剪切板接口
         * access: public
         */
        this.fCopyDataToClipboard = function(data) {
            _fCallNativeFunc("copyDataToClipboard", {
                "data": data
            }, null);
        }

        /*
         * func: 调用退出接口
         * access: public
         */
        this.fLogout = function(callback) {
            _fCallNativeFunc("logout", null, callback);
        }

        /*
         * func: 调用获取全局信息接口
         * access: public
         */
        this.fGetConditions = function(callback) {

            _fCallNativeFunc("getConditions", null, function(data) {
                if (typeof data == "string") {
                    data = JSON.parse(data);
                }
                if (data.aneVersion) {
                    window.PAS.NativeAPI.globalConditions = data;
                    window.PAS.NativeAPI.globalConditions.version = window.PAS.NativeAPI.globalConditions.aneVersion.substr(0, 3);
                } else {
                    window.PAS.NativeAPI.globalConditions = {
                        version: "5.6"
                    }
                }
                if (typeof(callback) == "function") {
                    callback(data);
                }
            });
        }

        /*
         * 禁用webview自带下拉功能
         * 0禁用 1启用
         * access: public
         */
        this.fForbidDropDown = function(isForbidden) {
            _fCallNativeFunc("webViewBouncesStatus", {
                "status": isForbidden ? 1 : 0
            }, null);
        }
        /*
         * 新用户注册时若已默认注册，存储默认注册用户信息
         * access: public
         */
        this.fGetRegisterUser = function(callback) {
            _fCallNativeFunc("getRegisterUser", null, callback);
        }

        /*
         * 获取自选股接口
         * 返回数据：[{“code”:”600000.SH”},{“code”:”000001.SZ”}]
         * access: public
         */
        this.fGetStockCode = function(callback) {
            _fCallNativeFunc("getCode", null, callback);
        }

        /*
         * func: 清空内嵌WebView导航栏相关信息
         * access: public
         */
        this.fResetNavigationInfo = function() {
            _fCallNativeFunc("resetNavigationInfo", null, null);
        }

        /*
         * func: 显示App Alert提示框
         * access: public
         */
        this.fAlert = function(title, content, btnName, callback) {
            if(content==undefined){
                content=title;
                title="";
            }

            if (_fCheckVersion(_version) || _debug) {
                alert(content);

            } else {
                window._alertcallbackfunc = function() {
                    if (typeof callback == "function")
                        callback();
                }
                _fCallNativeFunc("showAlert", {
                    "title": title,
                    "content": content,
                    "button": [{
                        "name": btnName || "我知道了",
                        "callback": "window._alertcallbackfunc"
                    }]
                }, null);
            }
        }

        /*
         * func: 调用Native RSA加密模块
         *       cleartext 明文长度 限制200字节, 如果超出长度限制 回调JS方法直接返回空字符串""
         * access: public
         */
        this.fEncryptWithRSA = function(cleartext, callback) {
            _fCallNativeFunc("encryptWithRSA", {
                "cleartext": cleartext
            }, callback);
        }

        /*
         * func: 显示App confirm提示框
         * access: public
         */
        this.fConfirm = function(title, content, yCallback, nCallback) {
            if (_fCheckVersion(_version) || _debug) {

                var result = window.confirm(content);
                if (result && typeof yCallback == "function") {
                    yCallback();
                } else if (!result && typeof nCallback == "function") {
                    nCallback();
                }

            } else {

                window._yCallbackfunc = function() {
                    if (typeof yCallback == "function")
                        yCallback();
                }
                window._nCallbackfunc = function() {
                    if (typeof nCallback == "function")
                        nCallback();
                }
                _fCallNativeFunc("showAlert", {
                    "title": title,
                    "content": content,
                    "button": [{
                        "name": "确定",
                        "callback": "window._yCallbackfunc"
                    }, {
                        "name": "取消",
                        "callback": "window._nCallbackfunc"
                    }]
                }, null);
            }
        }

        /*
         * func: 用户自定义的APP 弹窗提示
         * access: public
         * params: buttons=[{"name":"button name","callback":"callback name"}]
         */
        this.fUserConfirm = function(title, content, buttons) {
            if (_fCheckVersion(_version) || _debug) {
                alert("非app环境下不支持fUserConfirm功能。");
            } else {
                _fCallNativeFunc("showAlert", {
                    "title": title,
                    "content": content,
                    "button": buttons
                });
            }
        }

        /*
         * func: 调用Native接口打开登陆页面
         * access: public
         * params:type 1:融资融券，2:普通交易，3:身份证登录
         * useClipboard: 0:不调用粘贴板中内容 1:调用粘贴板内容 默认值0
         * errCode: 998 //从tradesso拿到的错误码
         */
        this.fShowLogin = function(referUrl, accountType, useClipboard, errCode, actionAuth) {
            referUrl = encodeURIComponent(referUrl);
            window.location.href = this.scheme+"://stock.pingan.com/login?account=&type=" + (accountType || 2) + "&referUrl=" + referUrl + "&useclipboard=" + (useClipboard || 0) + "&errcode=" + (errCode || "") + "&actionAuth=" + (actionAuth || "");
        }


        /*
         * func: 调用Native接口跳转到首页
         * access: public
         */
        this.fGoHome = function() {
            if (_fCheckVersion(_version)) {
                _fCallNativeFunc("goPrevious", null, null);
            } else {

                window.location.href = "anelicaiapp://stock.pingan.com/homepage";
            }
        }

        /*
         * func: 调用Native接口跳转个人中心
         * access: public
         */
        this.fGoPersonalCenter = function() {
            if (_fCheckVersion(_version)) {
                window.location.href = "../personal/index.html";
            } else {
                window.location.href = "anelicaiapp://stock.pingan.com/usercenter";
            }
        }

        /*
         * func: 调用Native接口跳转我的持仓
         * access: public
         */
        this.fGoMyPosition = function() {
            window.location.href = "anelicaiapp://stock.pingan.com/myposition";
        }

        /*
         * func: 调用Native接口跳转现金宝
         * access: public
         */
        this.fGoMyFinacing = function() {
            window.location.href = "anelicaiapp://stock.pingan.com/myfinacing";
        }

        /*
         * func: 调用Native接口跳转我的资料
         * access: public
         */
        this.fGoMyInformation = function() {
            window.location.href = "anelicaiapp://stock.pingan.com/myinformation";
        }

        /*
         * func: 调用内嵌webview打开web页面
         * access: public
         */
        this.fOpenByNativeWeb = function(url, title) {
            if (_fCheckVersion(_version) || _debug) {
                window.location.href = url;
            } else {
                url = encodeURIComponent(url);
                window.location.href = "anelicaiapp://stock.pingan.com/webv?url=" + url + "&title=" + title;
            }
        }

        /*
         * func: 调用系统浏览器打开web页面
         * access: public
         */
        this.fOpenBySystemWeb = function(url) {
            url = encodeURIComponent(url);
            window.location.href = "anelicaiapp://stock.pingan.com/browser?url=" + url;
        }

        /*
         * func: 跳转我的股票
         * access: public
         */
        this.fShowTradeInfoPage = function() {
            _fCallNativeFunc("showTradeInfoPage", null, null);
        }

        /*
         * func: 跳转我的基金
         * access: public
         */
        this.fShowFundPage = function() {
            _fCallNativeFunc("showFundPage", null, null);
        }

        /*
         * func: 跳转银证转账
         * access: public
         */
        this.fShowTransferPage = function() {
            //_fCallNativeFunc("showTransferPage", null, null);
            window.location.href = "anelicaiapp://stock.pingan.com/transferpage";
        }

        /*
         * func: 打开native loading
         * access: public
         */
        this.fShowLoading = function() {
            _fCallNativeFunc("showLoading", null, null);
        }

        /*
         * func: 隐藏native loading
         * access: public
         */
        this.fHideLoading = function() {
            _fCallNativeFunc("hideLoading", null, null);
        }

        /*
         * func:APP分享到微信QQ等
         * access: public
         */
        this.fShareModule = function(data, callback) {
            _fCallNativeFunc("shareModule", data, callback);
        }

        /*
         * 调用安卓系统的原生拨号(对于某些安卓手机不支持a标签拨号)
         * access: public
         */
        this.fInvokeDial = function(iphoneNum, callback) {
            _fCallNativeFunc("invokeDial", {
                "iphoneNum": iphoneNum
            }, callback);
        }

        /*
         * 调用APP自带提示信息控件
         * message        提示信息
         * delaytime      延迟几秒后消失(0:使用Native默认时间)
         * access: public
         */
        this.fShowTip = function(content, delayTime) {
            _fCallNativeFunc("showTipInfoView", {
                "message": content,
                "delaytime":delayTime?delayTime:0
            }, null);
        }

    }

    window.PAS.NativeAPI = new NativeAPIConstruct();
    window.PAS.NativeAPI.initialize();
    /*window.PAS.NativeAPI.fGetConditions();*/

}(window, window.PAS));
