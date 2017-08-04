/**
 * 总应用程序入口
 */
define(function(require, exports, module) {
	var page = require("./page");
	var gconfig = require("./gconfig");
	var ajax = require("./ajax");
	var juicer = require("./juicer");
	var zepto = require("../lib/zepto");
	var layerUtils = require("./layerUtils");
	
function init() {
	function getQueryString(name) {
	    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	    var r = window.location.search.substr(1).match(reg);
	    if (r != null) {
	        return unescape(r[2]);
	    }
	    return null;
	}
	function getParamJson() {
		var returnjson = {}
		var paramStr = "";
 		if(location.href.indexOf("?")>=0){
 			var url = location.href;
 			//var url = decodeURIComponent(location.href);
 			var index = location.href.indexOf("?")
 			var search = url.substring((index+1));
 			index = search.indexOf("@");
 			if(index>0){
 				search = search.substring(0,(index));
 			}
 			paramStr = search
 		}
 	    if(paramStr){
 	    	var thisParam = search.split("&");
 	    	for(var i=0;i<thisParam.length;i++){
 	    		var paramArray = thisParam[i].split("=");
 	    		var key = paramArray[0];
 	    		var value = paramArray[1];
 	    		returnjson[key]=value;
 	    	}
 	    }
 	    return returnjson;
 	};
 	
	window.addEventListener("popstate", function() {
		var url = location.href;
		var curPage = getQueryString("page");
	    var currentState = history.state;
	    if(currentState==null){
	    	var url = location.href;
	    	if(url == (gconfig.seaBaseUrl+"index.html")){
	    		var defaultPageJson = page.getSStorageInfo(gconfig.defaultPage);
	    		page.iReplaceState(defaultPageJson,"","?page="+gconfig.defaultPage);
	    		return;
	    	}else{
	    		if(gconfig.defaultPage==curPage){
	    			return;
	    		}
	    	}
	    }
	    var url = currentState.page;
	    var bpage = window.currentpage?currentpage:"";
	    page.topage(bpage,currentState.page,currentState.param);
	});
	var url = location.href;
	var curPage = getQueryString("page");
	curPage = curPage? curPage:gconfig.defaultPage;
	var paramPage = getParamJson();
	if(curPage==gconfig.defaultPage){//第一次进首页
		page.topage("",curPage,paramPage,1);
	}else{
		page.topage("",curPage,paramPage);
	}
	
	
	
	

} 
var a = {'page':page};
var b = {'gconfig':gconfig};
var c = {'ajax':ajax};
var d = {'juicer':juicer};
var e = {"layerUtils":layerUtils};
var exp=zepto.extend({"init":init},a,b,c,d,e);
module.exports = exp;
});