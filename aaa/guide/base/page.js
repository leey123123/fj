/**
 * 页面加载主程
 */
define(function(require, exports, module) {
	var gconfig = require("./gconfig");
	var ajax = require("./ajax");
	var juicer = require("./juicer");
	var layerUtils = require("./layerUtils");
	function topage(backPage,toPage,params,type){
		var viewsPath = gconfig.viewsPath;
		var scriptsPath = gconfig.scriptsPath;
		if(!toPage){
			layerUtils.iAlert("请传入定位页代码","错误");
			return;
		}
		layerUtils.iLoading();
		ajax.ajaxPageDiv(viewsPath+toPage+".html",function(dataa){
			$("#afui #content").html(dataa);
			if(backPage){
				require.async(gconfig.scriptsPath+backPage+".js", function(bpage) {
				if(bpage){
					
					bpage.destory();
					
				}
				
			});
			}
			
			require.async(gconfig.scriptsPath+toPage+".js", function(page) {
				if(page){
					page.init(); //当前页面初始化
					page.bind();
					window.currentpage = toPage;
					
				}else{
					layerUtils.closeLoading();
				}
				saveHistory(toPage,params,"111",type);
				//layerUtils.closeLoading();
				
			});
		});
	}
	
	function getQueryString() {
 		if(location.href.indexOf("?")>=0){
 			var url = decodeURIComponent(location.href);
 			var index = location.href.indexOf("?")
 			var search = url.substring((index+1));
 			index = search.indexOf("@");
 			if(index>0){
 				search = search.substring(0,(index));
 			}
 			return search
 		}
 	    return null;
 	};
	
	function saveHistory(page,param,title,type){
		
		var state = {
				'page':page,
				'param':param,
				'title':title
		}
		var paramStr = ""
		if(param){
			paramStr +="?";
			if(Object.keys(param).indexOf('page')==-1){
				paramStr +="page="+page
			}
			for(var o in param){
				paramStr += o+"="+param[o]+"&";
			}
			if(Object.keys(param).length>0){
				paramStr = paramStr.substring(0, paramStr.length-1);
			}
			
			
			
		}else{
			paramStr = "?page="+page;
		}
		
		
		var currentState = history.state;
		if(currentState!=null){
			if(page ==currentState.page){
				iReplaceState(state,title,paramStr);
			}else{
				iPushState(state,title,paramStr);
			}
		}else{
			if(type==1){
				iReplaceState(state,title,paramStr);
			}else{
				iPushState(state,title,paramStr);
			}
			
		}
		setSStorageInfo(page,JSON.stringify(state));
	}
	
	/**
	 * 保存sessionStorage信息
	 * @parm key 设置的key
	 * @parm value 设置的值
	 */
	function setSStorageInfo(key, value)
	{
		try {
			sessionStorage.setItem(key, value);
		} catch (e) {
			layerUtils.iAlert("您的浏览器版本太低，不支持sessionStorage！");
		}
	}
	/**
	 * 对history.pushState的兼容处理
	 */
	function iPushState(state, title, url) 
	{
		if(window.history && window.history.pushState) {
			window.history.pushState(state, title, url);
		} else {
			console.log("您的浏览器不支持history.pushState！！");
		}
	}
	/**
	 * 对history.pushState的兼容处理
	 */
	function iReplaceState(state, title, url) 
	{
		if(window.history && window.history.pushState) {
			window.history.replaceState(state, title, url);
		} else {
			console.log("您的浏览器不支持history.pushState！！");
		}
	}
	
	/**
	 * 获取sessionStorage信息
	 * @parm key 设置的key
	 * @returns value 获取的值
	 */
	function getSStorageInfo(key)
	{
		try {
			var value = sessionStorage.getItem(key);
			return value ? value : null;
		} catch (e) {
			layerUtils.iAlert("您的浏览器版本太低，不支持sessionStorage！");
			return null;
		}
	}
	
	/**
	 * 保存localStorage信息
	 * @parm key 设置的key
	 * @parm value 设置的值
	 */
	function setLStorageInfo(key, value)
	{
		try {
			localStorage.setItem(key, value);
		} catch (e) {
			layerUtils.iAlert("您的浏览器版本太低，不支持localStorage！");
		}
	}
	
	/**
	 * 获取localStorage信息
	 * @parm key 设置的key
	 * @returns value 获取的值
	 */
	function getLStorageInfo(key)
	{
		try {
			var value = localStorage.getItem(key);
			return value ? value : null;
		} catch (e) {
			layerUtils.iAlert("您的浏览器版本太低，不支持localStorage！");
			return null;
		}
	}
	
	/**
	 * seajs的require.async方法存在临时模块，暂时做记录删除处理
	 * @param moduleUri 调用require.async方法的模块uri，值写死为“module.uri”
	 * @param isNoV 是否不包含"?v="，base和plugin目录下的模块为false，project目录下的模块为true
	 */
	function clearTempAsync(moduleUri, isNoV) 
	{
		isNoV = typeof(isNoV)!="undefined"?isNoV:false;
		seajs._asyncNum++;
		var vStr = isNoV?("?v=" + seajs._sysVersion):"";
		var moduleUri = moduleUri+ vStr + "_async_" + seajs._asyncNum;
		delete seajs.cache[moduleUri];
	}
	
module.exports = {
		"topage":topage,
		"getSStorageInfo":getSStorageInfo,
		"iReplaceState":iReplaceState
		};

});