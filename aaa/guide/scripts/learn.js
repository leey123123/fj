/**
 * 页面加载主程
 */
define(function(require, exports, module) {
	var main = require("../base/main");
	var pageu = main.page;
	var layerUtil = main.layerUtils;
	require("../lib/NativeAPI");

	function init(){
		if(iBrowser.aylc){//证券app打开
			setTitle();
		}
		
		layerUtil.closeLoading();
		
	}
	function bind(){
		
		
	}
	

	function destory(){
		
	}

	function setTitle(){
		window.back=function(){
			history.back();
			//pageu.topage('learn','guide');
		}
		PAS.NativeAPI.fSetTitle(
			    { icontype:1, callback:"back", text:"" },
			    { icontype:0, callback:"", text:"融资融券" },
			    { icontype:0, callback:"", text:"" }
			);
	}


	module.exports = {
		"init":init,
		"bind":bind,
		"destory":destory
		};

});