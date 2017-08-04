/**
 * 框架配置信息，与configuration做了交集
 * 如果configuration模块中配置了就取configuration模块的配置值
 * 框架默认值 || 项目自定义配置
 */
define(function(require, exports, module) {
	var projName = configuration.projName || "";
	var gconfig = {
		//框架配置
		"appWidth": document.body.clientWidth, //界面宽度
		"appHeight": document.documentElement.clientHeight?document.documentElement.clientHeight:document.body.clientHeight, //界面高度
		"triggerEventName": iBrowser.pc?"click":"mousedown", //触发界面响应的事件 pc上：click  手机上：mousedown
		
		//平台：0：pc或者手机浏览器、1：android壳子嵌phonegap、2：ios壳子嵌phonegap、3：ios壳子嵌AIR
		"platform": configuration.platform || "0",
		//壳子按返回键，退出应用还是返回上级页面，true-退出，false-返回页面，默认为true
		"isDirectExit": typeof(configuration.isDirectExit)!="undefined" ? configuration.isDirectExit : true,		
		//项目的默认页面
		"defaultPage": configuration.defaultPage || {"pageCode": "errorPage", "jsonParam":{}},
		//项目中的需要先加载的css样式文件，如果多个，添加在数组里面
		"firstLoadCss": (function() {
			var firstLoadCss = configuration.firstLoadCss;
			if(firstLoadCss) {
				for(var i=0,len=firstLoadCss.length; i<len; i++){
					firstLoadCss[i] = seajs._platRoot + firstLoadCss[i];
				}
				return firstLoadCss;
			} else {
				return [seajs._platRoot+projName+"/css/app_style.css"];
			}
		})(),
		//项目名，默认为project
		//seajs根目录，默认为“/m/”
		"seaBaseUrl": seajs._platRoot,
		//项目根路径
		"projPath": seajs._platRoot + projName + "/",
		//项目的css目录
		"cssPath": seajs._platRoot +  projName + "/css/",
		//项目的images目录
		"imagesPath": seajs._platRoot + projName + "/images/",
		//项目的scripts目录
		"scriptsPath": seajs._platRoot + projName + "/scripts/",
		//项目的views目录
		"viewsPath": seajs._platRoot + projName+ "views/",
		//各种弹出层主题样式，默认为系统自带
		"layerTheme": configuration.layerTheme || "default",
		//ajax请求超时时间设置，默认为20秒超时
		"ajaxTimeout": configuration.ajaxTimeout || 20,
		//是否启动页面平滑过渡效果
		"isSmoothTran": typeof(configuration.isSmoothTran)!="undefined" ? configuration.isSmoothTran : false,
		//点击遮罩层是否关闭遮罩，关闭后用户可操作页面
		"isClickShadeHide": typeof(configuration.isClickShadeHide)!="undefined" ? configuration.isClickShadeHide : false,
		//是否休眠超过一定时间自动退出到登录页面，和freeTime、loginPage参数配合使用，默认为false，可不需配置
		"isControlProcess": typeof(configuration.isControlProcess)!="undefined" ? configuration.isControlProcess : false,
		//默认空闲时间30分钟，单位分钟，如果界面上有配置，修改需要调用appUtils.setLStorageInfo("_freeTime", 数值)
		"freeTime": typeof(configuration.freeTime)!="undefined" ? configuration.freeTime : 30,
		//引导页配置
		"guidePage": configuration.guidePage || "",
		/**
		 * 后台返回结果集出参结构，类似errorNo、errorInfo的出参命名定义，
		 * 防止不同项目的后台的出参命名不一致，而框架中写死导致解析出错，可由项目自己定义
		 * 标准命名结构：errorNo、errorInfo，这里只为表示可以自定义
		 */
		"resultsParser": configuration.resultsParser || {"errorNo": "errorNo", "errorInfo": "errorInfo"},
		/**
		 * 前端根据后台的errorNo做的过滤器配置，需要后台配合定义errorCode，
		 * 有的需要跳转页面，有的只做提示
		 */
		"filters": configuration.filters || {},
		//项目中模块的别名配置
		"pAlias": configuration.pAlias || {},
		//项目中的常量、变量
		"global": configuration.global || {},
		"serverpath":configuration.serverpath||""
	};
	
	//清理全局的configuration
	window.configuration = null;
	delete window.configuration;
	//暴露对外的接口
	module.exports = gconfig;
});