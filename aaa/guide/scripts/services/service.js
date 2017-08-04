/**
 * 页面加载主程
 */
define(function(require, exports, module) {
	var main = require("../../base/main");
	var ajax = main.ajax;
	var gconfig = main.gconfig;

	function Service(){
		this.service = {};
	}
	
	Service.prototype.findArticle=function(param, callback, isLastReq){
		var url = gconfig.serverpath+"/rzrqapp/RZRQStkAction?function=Article";
		var paraMap = {};
		paraMap["page"] = param.page;
		//var postParam = encodeParam(paraMap);
		ajax.reqByAjax(url, paraMap, callback, isLastReq, "", "", "", "", "");
	}


		/*
	 * PDF所在的域名
	 */
	Service.prototype.getDomain = function(callBackFunc){

		var url = gconfig.serverpath+"/rzrqapp/RZRQStkAction?function=GetDomian";
		var paraMap = {};
		ajax.reqByAjax(url, paraMap, callBackFunc, true, "", "", "", "", "");
	};

	/**
	 * 功能:查询融资利率与融券费率
	 * 入参: callBackFunc: 回调函数
	 */
	Service.prototype.findRate = function(callBackFunc,isLastReq){
		var url = gconfig.serverpath+"/rzrqapp/RZRQStkAction?function=Rate";
		var paraMap = {};
		ajax.reqByAjax(url, paraMap, callBackFunc, isLastReq, "", "", "", "", "");
	};


	/**
	 * 功能:查询维持担保比例
	 * 入参: callBackFunc: 回调函数
	 */
	Service.prototype.findRatio = function(callBackFunc){
		var url = gconfig.serverpath+"/rzrqapp/RZRQStkAction?function=Ratio";
		var paraMap = {};
		ajax.reqByAjax(url, paraMap, callBackFunc, true, "", "", "", "", "");

	};


	/*
	 * 查询公示公告详情
	 */
	Service.prototype.getArtDetail = function(callBackFunc,urla){

		var url = gconfig.serverpath+"/rzrqapp/RZRQStkAction?function=ArtDetail";
		var paraMap = {};
		paraMap["url"] = encodeURI(urla);
		ajax.reqByAjax(url, paraMap, callBackFunc, true, "", "", "", "", "");
	};
	
	
	/*
	 * 记录普通开户入口客户信息
	 */
	Service.prototype.saveNormal = function(token,requestId,callBackFunc){

		var url = gconfig.serverpath+"/rzrqapp/RZRQStkAction?function=InsertNormal";
		var paraMap = {};
		paraMap["token"] = token;
		paraMap["requestId"] = requestId;
		
		ajax.reqByAjax(url, paraMap, callBackFunc, true, "", "", "", "", "");
	};
	

	
	/**
	 * 解析过滤返回数据
	 */
	function filterResult(url, param, callback, isLastReq, isAsync, isShowWait, isShowOverLay, tipsWords, timeOutFunc){
		ajax.reqByAjax(url, param, function(data){
			var errorno = data.errorno;
			var errormsg = data.errormsg;
			
		}, isLastReq, isAsync, isShowWait, isShowOverLay, tipsWords, timeOutFunc);
	}

	var encodeParam = function (param) {
        return {
            param: encodeURI(JSON.stringify(param))
        };
    };
	
	 /**
	 * 实例化对象
	 */
	function getInstance(){
		return new Service();
	};
	
	var service = {
		"getInstance" : getInstance
	};
	
	// 暴露对外的接口
	module.exports = service;

});