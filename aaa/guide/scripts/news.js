/**
 * 页面加载主程
 */
define(function(require, exports, module) {
	var main = require("../base/main");
	var pageu = main.page;
	var juicer = main.juicer;
	var layerUtil = main.layerUtils;
	var service = require("server");
	var page = 0;
	var iscroll = require("iscroll");
	var _pageId = "#news";
	require("../lib/NativeAPI");
	var myScroll,
	 	pullDownEl, pullDownOffset,
	 	pullUpEl, pullUpOffset;
	 var pdfDomain="";

	function init(){
		if(iBrowser.aylc){//证券app打开
			setTitle();
		}
		pdfDomain = sessionStorage.getItem("pdfDomain");
		if(!pdfDomain){
			var thisservice = thisservice||service.getInstance();
			thisservice.getDomain(function(resultVo){//获取PDF文件的域名
			var errorno = resultVo.error_no;
			var errormsg = resultVo.error_info;
			if(errorno==0){
			  	var results = resultVo.results;
	            pdfDomain = results[0].pdfDomain;
	            sessionStorage.setItem("pdfDomain",pdfDomain);
			}
			else {
				layer.iAlert("调用接口出错"+resultVo.getErrorNo());
			}
		});

		}
		queryArticle();
		
	}
	function bind(){
		
		
	}
	

	function destory(){
		myScroll=null;
	}

	function setTitle(){
		window.back=function(){
			history.back();
			//pageu.topage('news','guide');
		}
		PAS.NativeAPI.fSetTitle(
			    { icontype:1, callback:"back", text:"" },
			    { icontype:0, callback:"", text:"融资融券" },
			    { icontype:0, callback:"", text:"" }
			);
	}


	/**
 * [initArticle 加载首页公告轮播]
 * 
 */
	function queryArticle(){
		var thisservice = thisservice||service.getInstance();
		var param = {
			"page":page
		}

		var tmpArticle = [
			'{@each articlelist as it}',
				'<li class="list-item">',
						'{@if it.type==1 || it.type==2}',
		                   '<a value="${it.link_url}" href="javascript:void(0);" class="artDetail">',
						 '{@else}',
						 	'<a value="${it.url}" href="javascript:void(0);" class="artDetail">',
		                '{@/if}',
		             '<div class="name">${it.title}</div>',
					'<div class="date">${it.create_date}</div>',
					'</a>',
				'</li>',
					
			'{@/each}',
		].join('');
		
		thisservice.findArticle(param,function(data){

			var errorno = data.error_no;
			var errormsg = data.error_info;
			if(errorno==0){
				var results = data.results;
			  	results = results[0].resultList;
			  	results = JSON.parse(results);
			  	if(results.length<=0) { 
			  		layer.iAlert("没有查询到公示公告数据");
			  		return;
			  	}
			  	var articleHtml = juicer(tmpArticle,{"articlelist":results});
			  	$(_pageId+" .list").append(articleHtml);

			  	$(_pageId+" .list-item").off();
			  	$(_pageId+" .list-item").on('click',function(){
		  		var urlSuffix  = $(this).find("a").attr('value');
				if (!isHTML(urlSuffix)){ //pdf
					sessionStorage.setItem("url",pdfDomain+urlSuffix);
					window.location.href="pdf/viewer.html";
				}
				else { 
					//sessionStorage.setItem("previousPage","index.html");
					sessionStorage.setItem("url",urlSuffix);
					var name=$(this).find(".name").text();
					sessionStorage.setItem("title",name);
					var date=$(this).find(".date").text();
					sessionStorage.setItem("date",date);
					pageu.topage('news','newsDetail');
				}
		  	});
			  	
			}else{
				layerUtil.iAlert(errormsg);
			}

			if(!myScroll){
             	setTimeout(startLoad, 300);
             }else{
             	setTimeout(function () {	
              		
              		myScroll.refresh();	
              		layerUtil.closeLoading();
              	}, 1000);
             		
             }
			
		},false);
	}


	function startLoad(){
		myScroll = loaded(_pageId,pullUpAction);
	}
	function pullUpAction () {
	   	 page++;
	   	 
	   	 layerUtil.iLoading();
	   	 queryArticle();
	   	 pullUpEl = $(_pageId+" #pullUp");
	   	 pullUpEl.hide();
	    	 setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
	    	
	    		
	    		myScroll.refresh();		// Remember to refresh when contents are loaded (ie: on ajax completion)
	    	}, 1000);	// <-- Simulate network congestion, remove setTimeout from production!
	}
	  

	  function isHTML(url){
		var arr = url.split(".");
		if(arr[1].toLowerCase()=="shtml"){
			return true;
		}
		else return false;
	}


	var loaded = function(_pageId,pullUpAction) {
     	pullUpEl = $(_pageId+" #pullUp");
     	pullUpOffset = pullUpEl.offsetHeight;
  	
     	
    	myScroll = new iScroll('wrapper', {
    		useTransition: false,
    		topOffset: pullDownOffset,
    		bounce:true,
    		onRefresh: function () {
    		if (pullUpEl.hasClass('loading')) {
    			    pullUpEl.removeClass();
    			    pullUpEl.find(".pullUpLabel").html("加载更多...");
    			}
    		},
    		onScrollMove: function () {
    			//console.log("y="+this.y+",this.maxScrollY="+this.maxScrollY+",minScrollY="+this.minScrollY);
    			if(this.y < (this.maxScrollY - 50) && !pullUpEl.hasClass('flip')){
    				pullUpEl.show();
    			}
				if (this.y < (this.maxScrollY - 70) && !pullUpEl.hasClass('flip')) {
					pullUpEl.addClass('flip');
					pullUpEl.find('.pullUpLabel').html('释放刷新...');
    				this.maxScrollY = this.maxScrollY;
    			
			}
    			
    		},
    		onScrollEnd: function () {
    			if (pullUpEl.hasClass('flip')) {
    				pullUpEl.addClass ('loading');
    				pullUpEl.find('.pullUpLabel').html('正在加载...');				
    				pullUpAction();	
    			}
    		}
    	});
    	

    	setTimeout(function () { 
    		document.getElementById('wrapper').style.left = '0'; 
    		layerUtil.closeLoading();
    	}, 800);
    	return myScroll;
    	
    }
	
	module.exports = {
		"init":init,
		"bind":bind,
		"destory":destory
		};

});