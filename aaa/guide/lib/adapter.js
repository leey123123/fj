/**
 * 安E理财 App适配层
 * @import $$
 */
(function() {
	var isAndroid = navigator.userAgent.match(/android/ig),
		isIos = navigator.userAgent.match(/iphone|ipod/ig),
		isIphone = navigator.userAgent.match(/iphone|ipod/ig),
		isIpad = navigator.userAgent.match(/ipad/ig),
		weixin = navigator.userAgent.match(/MicroMessenger/ig),
		isNative = navigator.userAgent.match(/AYLCAPP/ig) && !navigator.userAgent.match(/anydoor/ig),
		isCorpNative = navigator.userAgent.match(/PAZQCorpApp/ig);
	var Adapter = window.Adapter = {
		isAndroid: isAndroid,
		isIos: isIphone || isIpad,
		isIphone: isIphone,
		isIpad: isIpad,
		isNative: isNative,
		isCorpNative: isCorpNative,
		weixin: weixin,
		checkVersion: function(v) {
		},
		isNewerThan:function(v){
			var vs = (v+"").split(".");
			var vlist = [+vs[0] || 0,+vs[1] || 0,+vs[2] || 0,+vs[3] || 0];
			var appVerStr = navigator.userAgent.match(/AYLCAPP\/[\d\.]+/g);
			var appVer = (appVerStr+"").split("/")[1].split(".");
			var appvlist = [+appVer[0] || 0,+appVer[1] || 0,+appVer[2] || 0,+appVer[3] || 0];
			var isNewer = false;
			for(var i=0;i<4;i++){
				if(appvlist[i]!=vlist[i]){
					if(appvlist[i]>vlist[i]){
						isNewer = true;
						break;
					}else{
						isNewer = false;
						break;
					}
				}
			}
			return isNewer;
		},
		frameCall:function(u){
            setTimeout(function() {
                var iframe = document.createElement("iframe");
                var _src = u;
                iframe.src = _src;
                iframe.style.display = "none";
                document.body.appendChild(iframe);
                iframe.parentNode.removeChild(iframe);
                iframe = null;
            }, 5)
		},
		call: function(funcName, params, callback) {
			var rdm = Math.random().toString().substr(2),
				globalFuncName = "globalCallback" + rdm,
				iframeName = "nativeFuncIframe" + rdm,
				strParams = "";
			window[globalFuncName] = function() {
				if (typeof callback === "function")
					callback.apply(this, arguments);
				delete window[globalFuncName];
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
			var u = 'ane://' + funcName + '?' + encodeURIComponent(strParams);
			this.frameCall(u);
		},
		/*
			icontype:
			0	文字
			1	返回
			2	Home
			3	分享
			4	刷新
			C.Native.setTitle({
                icontype: 2,
                callback: "",
                text: "icon2"
            }, {
                icontype: 0,
                text: "title23"
            }, {
                icontype: 3,
                callback: "alert('分享')",
                text: "icon3"
            })
		*/
		setTitle: function(left, center, right, callback) {
			Adapter.call("navigationInfo", {
				"config": {
					"left": left,
					"center": center,
					"right": right
				}
			}, callback);
		},
		getToken: function(callback) {
			Adapter.call("getToken", null, function(data) {
				if (typeof data == "string") {
					data = JSON.parse(data);
				}
				callback && callback(data);
			});
		},
		getConditions:function(callback){
			Adapter.call("getConditions", null, function(data) {
				if (typeof data == "string") {
					data = JSON.parse(data);
				}
				callback && callback(data);
			});
		},
		getUser: function(callback) {
			Adapter.call("getUser", null, function(data) {
				if (typeof data == "string") {
					data = JSON.parse(data);
				}
				callback && callback(data);
			});
		},
		logout: function(callback) {
			if (isNative) {
				Adapter.call("logout", null, callback);
			} else {
				callback && callback();
			}
		},
		showLoading: function() {
			Adapter.call("showLoading", null, null);
		},
		hideLoading: function() {
			Adapter.call("hideLoading", null, null);
		},
		/*
		 * func: 调用Native接口打开登陆页面
		 * access: public
		 * params:type 1:融资融券，2:普通交易，3:身份证登录
		 *         useClipboard: 0:不调用粘贴板中内容 1:调用粘贴板内容 默认值0
		 */
		showLogin: function(referUrl, accountType, useClipboard) {
			// if(!isIos){
			referUrl = encodeURIComponent(referUrl);
			// }
			Adapter.call("showLogin", {
				"referUrl": referUrl,
				"type": useClipboard
			}, null);
		},
		pushWebview:function(url){
			this.frameCall("anelicaiapp://stock.pingan.com/webv?url="+encodeURIComponent(url));
		},
		resetToNativeBack:function(title){
            this.setTitle({
                icontype: 1,
                callback: "",
                text: ""
            }, {
                icontype: 0,
                text: title || "平安证券"
            }, {
                icontype: 0,
                callback: "",
                text: ""
            });
            Adapter.call("resetNavigationInfo");
		},
		resetNavigationInfo:function(){
            Adapter.call("resetNavigationInfo");
		},
        resetTitle: function(title) {
            Adapter.call("resetNavigationInfo");
            this.setTitle({
                icontype: 1,
                callback: "(function(){window.history.go(-1)})",
                text: ""
            }, {
                icontype: 0,
                text: title || "平安证券"
            }, {
                icontype: 0,
                callback: "",
                text: ""
            });
        },
		/**
		 * native回退功能
		 * 回到app上一个视图
		 *
		 *
		 */
		back: function() {
			Adapter.call("goBack");
		},
		/**
		 * native回退功能
		 * 回到app首页
		 *
		 *
		 */
		home: function() {
			Adapter.call("goPrevious");
		},
		share: function(data, callback) {
			data.type = data.type + "";
			data.channel = data.channel + "";
			if(Adapter.isIos){
				data.link = decodeURIComponent(data.link);
			}
			Adapter.call("shareModule", data, callback);
		},
		showNativeTitle: function(flag) {
			var s = flag * 1 + "";
			Adapter.call("showNativeTitle", {
				"show": s
			});
		},
		bankPassword: function(param, callback) {
			// ane://callTalkingData?{"label":"事件标签","event":"事件类型","parameters":{}}
			Adapter.call("bankPassword", param, callback);
		},
		invalidate : function(callback){
			Adapter.call("invalidate",{},callback);
		},
		// C.Native.openBrowser
		// 打开APP本地浏览器
		openBrowser:function(url){
             Adapter.call("goBrowser", {"referUrl":url});
		},
		/* C.Native.im
			@param data 参数
					senceId		场景id
					description	话术
			打开APP即时通讯客服
		*/
		im:function(data,callback){
			data = data || {};
            Adapter.call("goChatPage", data);
		},
		/*
			调起APP银证转账
		*/
		bsTransfer:function(){
			this.frameCall("anelicaiapp://stock.pingan.com/transferpage");
		},
		validateInvestor:function(){
			//this.frameCall("anelicaiapp://stock.pingan.com/usercenter");
			this.frameCall("anelicaiapp://stock.pingan.com/gotoassetevaluate");
		},
		TD: function(data, success, fail) {
	        // 未实现
	        /*if (Constant.Switch.TD_LOG) {
	            console.log("[TD LOG]", Utils.parseDateFormat(new Date(), "yyyy-MM-dd hh:mm:ss"), JSON.stringify(data));
	        }*/
	        //任意门talkingdata埋点
	        if (navigator.userAgent.match(/anydoor/ig) && isAnydoor) {
	            //任意门灵活宝插件id
	            if (!data.pluginId) {
	                data.pluginId = 'PA01100000000_02_LHBLC';
	            }
	            if (window.RYMJSBRIDGE) {
	                window.RYMJSBRIDGE.saveTalkingData(data, success, fail);
	            } else {
	                _rymSendTalkingData(data, success, fail);
	            }
	        } else if (window.pa_sdcajax) {// 用webtrend来代替埋点
	            setTimeout(function() {
	            	//alert("埋点啦~"+JSON.stringify(data));
	                pa_sdcajax('WT.td_data', JSON.stringify(data), true);
	            }, 10)
	        }
	    },
        /**
         * 本地数据操作
         * getter C.Native.data(C.Constant.DataKey.KEY);
         * setter C.Native.data(C.Constant.DataKey.KEY,"data");
         * @param key
         * @param value
         */
        data: function(key, value) {
            return _data(key, value);
        }
	};

	if (typeof define === 'function' && define.amd) {
		define([], function() {
			return Adapter;
		});
	}
	
	 /**
     * 本地缓存
     *
     * 暫時用try﹣catch包裹起操作storage的操作塊，防止app禁用localstorage
     * 或者safari在無痕模式下瀏覽等情況時導致未捕獲的異常
     *
     * @private
     */
    function _data(key, value, type) {
        var storage = type == 'session' ? sessionStorage : localStorage;
        var getItemValue = function() {
            var data;
            try {
                data = storage.getItem(key);
            } catch (e) {
                console.log(e.message);
                return;
            }

            try {
                data = JSON.parse(data);
            } catch (e) {
                console.log(e.message);
            }
            return data;
        };
        if (key && value === undefined) {
            return getItemValue();
        } else if (key && value === null) {
            try {
                storage.removeItem(key);
            } catch (e) {
                console.log(e.message)
            }
        } else {
            try {
                storage.setItem(key, JSON.stringify(value));
            } catch (e) {
                console.log(e.message);
            }
        }
    };
})();