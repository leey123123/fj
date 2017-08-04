/**
 * 程序入口配置读取
 * 项目开发时需要的自定义配置
 * 另外：configuration为系统配置模块或者配置模板
 * 这里可以扩展，支持多个系统共用一个项目：
 * 思路：在最开始的地方做一个sysCode的获取，然后在这个模块初始化时赋不同系统的configuration配置模块的引用，
 * 当然还要做修改的地方，比如地址栏hash处理，需要增加sysCode（涉及到的模块main和appUtils）
 */
define(function(require, exports, module) {
	var baseDir = "/html/rzrq/guidedist";//项目根目录
	var configuration = {
		/**
		 * 平台，不传默认为0：
		 * 0：pc或者手机浏览器、1：android壳子嵌phonegap、2：ios壳子嵌phonegap、3：ios壳子嵌AIR
		 */
		"platform": "0",
		"defaultPage": "guide", //项目的默认页面
		//"firstLoadCss": [baseDir+"/m/project/css/css.css"], //项目中的需要先加载的css样式文件，如果多个，添加在数组里面
		//"firstLoadCss": [baseDir+"/m/project/css/style.css",baseDir+"/m/project/css/box.css"],
		"layerTheme": "style", //各种弹出层主题样式，默认为系统自带
		//前端根据后台的errorNo做的过滤器配置，需要后台配合
		/**
		 * 后台返回结果集出参结构，类似errorNo、errorInfo的出参命名定义，
		 * 防止不同项目的后台的出参命名不一致，而框架中写死导致解析出错，可由项目自己定义
		 * 标准命名结构：errorNo、errorInfo，这里只为表示可以自定义，但后台必须统一
		 */
		"resultsParser": {"errorNo": "error_no", "errorInfo": "error_info"},
		//项目中模块的别名配置
		"pAlias": {
			"swiper":baseDir+"/lib/swiper.min.js",
			"server":baseDir+"/scripts/services/service",
			"iscroll":baseDir+"/lib/iscroll.js",
		},
		
		/**
		 * 项目中需要调用到的常量、变量这里配置
		 * 调用方式，通过require("gconfig").global.*来调用
		 */
		"global": {
			"isPrd":"1"   //是否生产环境   0.是   1.否
		},
		"projName":"",
		"serverpath":(function(){
            return location.href.indexOf("https://")>-1?"/fss/servlet":"/servlet";
        })()
	};
	//暴露对外的接口
	module.exports = window.configuration = configuration;
});