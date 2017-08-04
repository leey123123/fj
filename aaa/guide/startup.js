seajs._sysVersion = window._sysVersion?window._sysVersion:1;
seajs._platRoot = seajs.data.dir;
seajs.use("./configuration.js?v="+seajs._sysVersion,function(configuration){
	
	/**
	 * seajs的配置信息
	 */
	seajs.config({
		_preDo: (function(win) { //起初框架做的处理
				//浏览器运行环境相关信息
				var u = navigator.userAgent;
				var iBrowser = {
					//是否为移动终端 ，/Mobile/i.test(u) 与 /AppleWebKit.*Mobile/i.test(u)重复，后期再看具体怎么区分
					mobile: /Mobile/i.test(u) || /AppleWebKit.*Mobile/i.test(u) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(u)),
					//是否为PC端
					pc: !(/Mobile/i.test(u) || /AppleWebKit.*Mobile/i.test(u) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(u))),
					uc: /UCWEB|UcBrowser/i.test(u), //是否为uc浏览器
					qq: /QQBrowser/i.test(u), //是否为qq浏览器
					android: u.indexOf('Android') > -1, //是否为android终端
					ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //是否为ios终端
					iPhone: u.indexOf('iPhone') > -1, //是否为iPhone
					iPad: u.indexOf('iPad') > -1, //是否iPad
			        trident: u.indexOf('Trident') > -1, //是否为IE内核
			        presto: u.indexOf('Presto') > -1, //是否为opera内核
			        webKit: u.indexOf('AppleWebKit') > -1, //是否为苹果、谷歌内核
			        aylc:u.toLowerCase().indexOf('aylcapp') > -1,//是否是证券app打开
			        anydoor:u.toLowerCase().indexOf('anydoor') > -1,//是否是任意门打开
			        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //是否为火狐内核
					language: (navigator.browserLanguage || navigator.language).toLowerCase(),
					app: navigator.appVersion
				};
				win.iBrowser = iBrowser;
				
				//添加调试信息方法
				console.printStackTrace = function(e) {
					var message = e.message, stack = e.stack;
					if(message) { console.log("错误说明：" + message); }
					if(stack) { console.log("错误堆栈：" + stack); }
				};
				return "";
			})(window),
		base: configuration.seaBaseUrl ? configuration.seaBaseUrl : "/html/",
	    alias: (function(win) {
	    	//框架别名设置
	        var alias = {
	           
	        };
	        //处理项目中模块的别名
	        var pAlias = configuration.pAlias ? configuration.pAlias : {};
	        for (var i in pAlias) {
	            alias[i] = pAlias[i];
	        }
	        return alias;
	    })(window),
	    map: [ [ /^(.*\/html\/rzrq\/guidedist\/.*\.(?:css|js))(?:.*)$/i, '$1?v='+seajs._sysVersion ] ],
	    charset: "utf-8"
	});
	
	//不同平台延时不同，这里依平台可再修改
	var delayTime = 0;
	
	setTimeout(function() {
		seajs.use(["/html/rzrq/guidedist/base/main","/html/rzrq/guidedist/lib/zepto"],function(main, $){
			$(document).ready(function(){
				main.init();
			})
		});
	}, delayTime);
});