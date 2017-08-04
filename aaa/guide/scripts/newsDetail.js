/**
 * 页面加载主程
 */
define(function(require, exports, module) {
	var main = require("../base/main");
	var page = main.page;
	var juicer = main.juicer;
	var layerUtil = main.layerUtils;
	var service = require("server");
	var url,titile,date;
	var _pageId="#newDetail";
	require("../lib/NativeAPI");

	function init(){
		if(iBrowser.aylc){//证券app打开
			setTitle();
		}
		getArticleDetail();
		
	}
	function bind(){
		
		
	}
	

	function destory(){
		
	}

	function getArticleDetail(){
		url=sessionStorage.getItem("url");
		title = sessionStorage.getItem("title");
		date = sessionStorage.getItem("date");
		$(_pageId+" #title").html(title);
		$(_pageId+" #date").html("平安证券       "+date);

		var thisservice = thisservice||service.getInstance();
		
		thisservice.getArtDetail(function(resultVo){
			var errorno = resultVo.error_no;
			var errormsg = resultVo.error_info;
			if(errorno==0){
				var results = resultVo.results;
			  	results = results[0].resultList0;
				
				$(_pageId+" #context").html(results);
				$("table").parent().attr("style","overflow:scroll");
			} else if(errorno == -2){
				layerUtil.iMsg(errormsg); 
			}
			else {
				layerUtil.iMsg(errormsg+"为您跳转到原网页查看"); 
				window.setTimeout(function(){
					$(".content").attr("style","display:none");
					$("#web").attr("src","http://stock.pingan.com"+sessionStorage.getItem("url"));
					$("#web").attr("style","display:inherit;height:800px;width:100%;overflow:scroll");
				}, 3000);
			}
		},url);
	}


	function setTitle(){
		window.back=function(){
			history.back();
			//page.topage('newsDetail','news');
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
