/**
 * ajax异步请求数据入口
 */
define(function(require, exports, module) {
	//加载依赖模块  
	var zepto = require('../lib/zepto'),
		layerUtils = require('./layerUtils');
	
	/**
	 * 存放所有的ajax请求对象数组，暂时用数组
	 */
	var ajaxReqArr = [];
	/**
	 * 清理正在请求的ajax，提供给切换页面时调用
	 */
	function clearAjaxReq() 
	{
		for(var i=0; i<ajaxReqArr.length; i++)
		{
			var iAjax = ajaxReqArr[i];
			if(iAjax)
			{
				iAjax.abort(); //中断正在请求的ajax，会执行该请求的error和complete方法
				iAjax = null;
				ajaxReqArr[i] = null;
			}
		}
		ajaxReqArr = [];
	}
	
	/**
	 * ajax请求数据
	 * @param url：请求的url
	 * @param param：传递的参数,这里进行utf-8编码，后端服务器需要进行相应解码，处理中文乱码问题
	 * @param callback 回调处理函数
	 * @param isLastReq 是否是最后一个请求，默认是true
	 * 如果是true表示后面再没有ajax请求了，等待层将清除掉，false表示又有ajax加载数据，保留等待层的状态，
	 * 与isShowWait配合实现多个请求的等待状态显示
	 * @param isAsync 是否异步请求，默认是true
	 * @param isShowWait：是否显示等待层 默认是true
	 * @param isShowOverLay 是否显示遮罩层，默认为true
	 * @param tipsWords 显示等待层时，显示的文字，不传默认显示"请等待..."
	 * @param timeOutFunc 超时后的处理函数，默认可不传，只提示超时
	 */
	function reqByAjax(url, param, callback, isLastReq, isAsync, isShowWait, isShowOverLay, tipsWords, timeOutFunc) {
		//设置默认值
		isLastReq = (typeof(isLastReq)=="undefined"||isLastReq==="")?true:isLastReq;
		isAsync = (typeof(isAsync)=="undefined"||isAsync==="")?true:isAsync;
		isShowWait = (typeof(isShowWait)=="undefined"||isShowWait==="")?true:isShowWait;
		isShowOverLay = (typeof(isShowOverLay)=="undefined"||isShowOverLay==="")?true:isShowOverLay;
		tipsWords = tipsWords || "请等待...";

		var infDescribe = param.infDescribe ? param.infDescribe : ""; //接口描述
		delete param["infDescribe"]; //删除描述的接口入参
		for ( var key in param) {
			var value = param[key] + "";
			if (value === null || value === undefined || value === ""
					|| value.trim().toLowerCase() === "null"
					|| value.trim().toLowerCase() === "undefined") {
				param[key] = "";
			} else {
				value = encodeURIComponent(value);
				param[key] = value;
			}
		}
		var iAjax = zepto.ajax({
			url: url+"&v="+Math.random(),
			data: param,
			type: "post",
			dataType: "json",
			async: isAsync,
			contentType:"application/x-www-form-urlencoded;charset=utf-8",
			xhrFields : {
                'withCredentials' : true
			},
			beforeSend: function(XMLHttpRequest) {
				/*//在头部增加Cookie，用于保持会话
				var cookie = "JSESSIONID="+(param.jsessionid?param.jsessionid:"")+";clientinfo="+(param.clientinfo?param.clientinfo:"")+";";
				XMLHttpRequest.setRequestHeader("Cookie",cookie);
				*/
				if(isShowWait) {
					layerUtils.iLoading();
				}
			},
			success: function(data, textStatus) {
				if(data) {
					if(callback) {
						callback(data);
					}
				} else {
					layerUtils.iAlert(infDescribe+">>后台返回数据格式不正确，请联系管理员！");
				}
			},
			complete: function(XMLHttpRequest, textStatus) {
				if(isLastReq) {
					layerUtils.closeLoading();
				}
			},
			error: function() { //abort会执行error方法
				layerUtils.closeLoading();
				if(require("./gconfig").global.isOnline === false){
					layerUtils.iMsg("您的网络异常，请检查你的网络设置");
				}
			}
		});
		
		//放入数组中，记录方便切换页面时干掉前页面ajax请求
		ajaxReqArr.push(iAjax);
			
		//设置请求超时提醒，时间默认为20秒
		var timeoutNum = require("./gconfig").ajaxTimeout;
		setTimeout(function() {
			if(iAjax && iAjax.readyState && iAjax.readyState != 4) //还在请求状态时
			{
				 iAjax.abort();
				 //增加超时特殊处理功能
				 if(timeOutFunc){
					 timeOutFunc();
				 } else {
					 layerUtils.iAlert(infDescribe+">>请求超时！");
				 }
			}
		}, 1000*parseInt(timeoutNum));
	}
	
	/**
	 * ajax加载纯静态html页面
	 * @param url：请求页面的url
	 * @param callback 回调处理函数
	 * @param isLastReq 是否是最后一个请求，默认是true
	 * 如果是true表示后面再没有ajax请求了，等待层将清除掉，false表示又有ajax加载数据，保留等待层的状态，
	 * 与isShowWait配合实现多个请求的等待状态显示
	 * @param isAsync 是否异步请求，默认是true
	 * @param isShowWait：是否显示等待层 默认是true
	 * @param isShowOverLay 是否显示遮罩层，默认为true
	 */
	function ajaxPageDiv(url, callback, isLastReq, isAsync, isShowWait, isShowOverLay) {
		//设置默认值
		isLastReq = (typeof(isLastReq)=="undefined"||isLastReq==="")?true:isLastReq;
		isAsync = (typeof(isAsync)=="undefined"||isAsync=="")?true:isAsync;
		isShowWait = (typeof(isShowWait)=="undefined"||isShowWait==="")?true:isShowWait;
		isShowOverLay = (typeof(isShowOverLay)=="undefined"||isShowOverLay==="")?true:isShowOverLay;
		var urlCopy = url;
		zepto.ajax({
			url: url + "?v=" + seajs._sysVersion,
			type: "get", //get方式便于缓存页面
			dataType: "html",
			async: isAsync,
			xhrFields : {
                'withCredentials' : true
			},
			beforeSend: function(XMLHttpRequest) {
				if(isShowWait) {
					//layerUtils.iLoading(true, "请等待...", isShowOverLay);
				}
			},
			success: function(data, textStatus) {
				//判断是否成功
				if(data) {
					if(callback) {
						//var page = {}
						//localStorage.setItem(urlCopy, value);
						callback(data);
					}
				} else {
					console.log("请求html页面异常或者页面不存在！>>"+url);
				}
			},
			complete: function(XMLHttpRequest, textStatus) {
				if(isLastReq) {
					//layerUtils.iLoading(false);
				}
			},
			error: function() { //abort会执行error方法
				//layerUtils.iLoading(false);
				console.log("请求html页面异常！>>"+url);
			}
		});
	}
	
	var ajax = {
		"clearAjaxReq": clearAjaxReq,
		"reqByAjax": reqByAjax,
		"ajaxPageDiv": ajaxPageDiv
	};
	//暴露对外的接口
	module.exports = ajax;
});