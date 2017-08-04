/**
 * 页面加载主程
 */
define(function(require, exports, module) {
	var main = require("../base/main");
	var swiper = require("swiper");
	var page = main.page;
	var juicer = main.juicer;
	var layerUtil = main.layerUtils;
	var service = require("server");
	require("../lib/adapter");
	require("../lib/init_sdc");
	require("../lib/NativeAPI");

	function init(){
		setHoneHref();
		if(iBrowser.aylc){//证券app打开
			setTitle();
		}
		if(iBrowser.anydoor){
			$("#guide .y-epl-rule").hide();
		}else{
			$("#guide .y-epl-rule").show();
		}
		
		registerJuierFunc();
		getPdfDomain();
		initArticle();
		queryRateRzrq();
		getRateWcdb();
	}
	function bind(){

		$("#guide #banner").off();
		$("#guide #banner").on('click',function(e){
			page.topage('guide','learn');
		});
		var aid = getQueryString('aid');
		var sid = getQueryString('sid');
		var ouid = getQueryString('ouid');
		if(iBrowser.aylc){//证券app打开iBrowser.aylc
			$("#guide #app-btn").off();
			$("#guide #app-btn").on('click',function(){
				window.PAS.NativeAPI.fGetToken(function(data){//获取token
					if(data==null){
						$("#guide"+" #login").show();
						
					}else{//已有登陆状态
						var takenId = data.tokenId;
						var appName = data.appName;
						var userCode = data.userCode;
						var sessionId = data.sessionId;
						var accountType = data.accountType;
						var version = data.version;
						var requestSessionId = "";
						var requestId = data.appName;
						if(takenId==null||""==takenId||" "==takenId||typeof takenId!='string'){
							$("#guide"+" #login").show();
						}else{
							$("#guide"+" #login").hide();
						}
						
						
					}
				});
				$("#guide #cover").removeClass("y-hide");
				$("#guide #dialog").removeClass("y-hide");				
			});
			
			
			$("#guide #cover").off();
			$("#guide #cover").on('click',function(e){
				$("#guide #cover").addClass("y-hide");
				$("#guide #dialog").addClass("y-hide");	
				e.stoppropagation
			});
			
			$("#guide #login").off();
			$("#guide #login").on('click',function(e){
				login();
			});
			
			$("#guide #normalkh").off();
			$("#guide #normalkh").on('click',function(e){
				var thisservice = thisservice||service.getInstance();
				//var data = {"loginType":"5","tokenId":"N_BA7A53BFC8BC24E74D24D84ACF0E8E17E2E2D9004924CEB9A143E2DEC7990B35AFF38CB58EBC0CC3ADE9FAFA5ED0960D62D18B66B1DDAE33365E547BD0D8C5BC82C10965A636DEDC","encryptedToken":"jGEgWoXXQLImnWpoIpD3JEo5z4u+2C7qhMWBuVSzsmL1MW2/NU15Mfw1UYn80y9m8jT3MKGBNRiNpRLP8qjSyDR3o8aeAbWxjofA4ku1RtEx+CACEKDyy6AbazDpX8NyuNXpbDzLZ0rFG+HyGeTjpciVHseLlZWr5qVqtA5BygutK9Ve1FQxGEK+3kofyvacDE50SdDMrhhfXERTZyRbL1l4Hn4oMUaa8dlMXz7jn7fmem6ylXVXezGBB/KNgMSMj+ADYkTWPxDcnvbqEo9uBydThFqq8Tj65VWTjfvbQfcUwv526qpoL1e3dNai1NvrPdv0nIRPNJTn9+xN8sGCug==","appName":"QYRM"};
				window.PAS.NativeAPI.fGetToken(function(data){//获取token
					if(data==null){
						PAS.NativeAPI.fShowLogin(window.location.href, 2, 0);
						
					}else{//已有登陆状态						
						var takenId = data.tokenId;
						var requestId = data.appName;
						if(takenId==null||""==takenId||" "==takenId||typeof takenId!='string'){
							PAS.NativeAPI.fShowLogin(window.location.href, 2, 0);
						}else{
							thisservice.saveNormal(takenId,requestId,function(resultvo){//验证登陆状态的有效性
								var errorno = resultvo.error_no;
								var errormsg = resultvo.error_info;
								if(errorno == 0){//有效性验证成功
									dourl(PAS.NativeAPI.scheme+"://stock.pingan.com/openaccount?method=gotoOpenAccount");
								}
								else if(errorno == 998 || errorno==999 || errorno==997){
									PAS.NativeAPI.fShowLogin(window.location.href, 2, 0);
								}else{
									dourl(PAS.NativeAPI.scheme+"://stock.pingan.com/openaccount?method=gotoOpenAccount");
								}
							});
						
						}
						
						
					}
				});
				
			});
			
			$("#guide #rzrqkh").off();
			$("#guide #rzrqkh").on('click',function(e){
				PAS.NativeAPI.fSetTitle(
					    { icontype:1, callback:"backApp", text:"" },
					    { icontype:0, callback:"", text:"两融预约开户" },
					    { icontype:0, callback:"", text:"" }
					);
				var host = location.host;
				var baseUrl=""
				if(host.indexOf('stock.pingan.com')>-1){
					baseUrl = "https://stock.pingan.com";
				}else if(host.indexOf('stock.stg.pingan.com')>-1){
					baseUrl = "https://stock.stg.pingan.com";
				}else{
					baseUrl = "http://stockfat.stg.pingan.com:30074"
				}
				if(aid&&sid&&ouid){
					location.href=baseUrl+"/rzrqkh/plat/rzrq/index.html#!/business/index.html?aa=tg&aid="+aid+"&sid="+sid+"&ouid="+ouid;
				}else{
					location.href=baseUrl+"/rzrqkh/plat/rzrq/index.html#!/business/index.html?aa=tg&aid=157&sid=2020&ouid=LRAPP003";
				}
				

			});
		}else{
			$("#guide #app-btn").off();
			$("#guide #app-btn").on('click',function(){
				var host = location.host;
				var baseUrl=""
				if(host.indexOf('stock.pingan.com')>-1){
					baseUrl = "https://stock.pingan.com";
				}else if(host.indexOf('stock.stg.pingan.com')>-1){
					baseUrl = "https://stock.stg.pingan.com";
				}else{
					baseUrl = "http://stockfat.stg.pingan.com:30074"
				}
				if(aid&&sid&&ouid){
					location.href=baseUrl+"/rzrqkh/plat/rzrq/index.html#!/business/index.html?aa=tg&aid="+aid+"&sid="+sid+"&ouid="+ouid;
				}else{
					location.href=baseUrl+"/rzrqkh/plat/rzrq/index.html#!/business/index.html?aa=tg&aid=157&sid=2020&ouid=LRAPP003";
				}
			});
		}
		

		

		

		
		
	}
	
	function getQueryString(name) {
	    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	    var r = window.location.search.substr(1).match(reg);
	    if (r != null) {
	        return unescape(r[2]);
	    }
	    return null;
	}

	/**
 * 登陆app
 */	
	function login(){
		PAS.NativeAPI.fShowLogin(window.location.href, 2, 0);
	}
	

/**
 * 注册juicer自定义函数
 */

function registerJuierFunc(){
	var titleSub = function(title){
			if(title.length>0){
				title = title.substr(0,20)+"...";
			}
			return title;
		}
		juicer.register('titleSub',titleSub);
}



function getPdfDomain(){
	var thisservice = thisservice||service.getInstance();
	
	thisservice.getDomain(function(resultVo){//获取PDF文件的域名
			var errorno = resultVo.error_no;
			var errormsg = resultVo.error_info;
			if(errorno==0){
			  	var results = resultVo.results;
	            var  pdfDomain = results[0].pdfDomain;
	            sessionStorage.setItem("pdfDomain",pdfDomain);
			}
			else {
				layer.iAlert("调用接口出错"+resultVo.getErrorNo());
			}
		});
}



/**
 * 获取维持担保比例
 */

function getRateWcdb(){
	var thisservice = thisservice||service.getInstance();
		var param = {
			
		}
		var queryRatio =  function(resultVo){
			var errorno = resultVo.error_no;
			var errormsg = resultVo.error_info;
			if(errorno==0){
			  	var results = resultVo.results;
			  	results = results[0].resultList;
			  	results = JSON.parse(results);
			  	if(results.length<=0){ 
			  		layerUtil.iAlert("没有查询到担保比例");
			  		return;
			  	}
			  	for (var i=0; i<results.length; i++){
			  		var tr=$("<tr></tr>");
			  		var td1=$("<td></td>").text(results[i].matters);
			  		var td2=$("<td></td>").text(results[i].ratio);
			  		
			  		tr.append(td1,td2);
			  		$('#guide #dbbl').append(tr);
				}
			}
			else {
				layerUtil.iAlert(errormsg);
			}
		};
		thisservice.findRatio(queryRatio);
}

/**
 * [initArticle 加载首页公告轮播]
 * 
 */
	function initArticle(){
		var thisservice = thisservice||service.getInstance();
		var param = {
			"page":""
		}
		var tmpArticle = [
			'{@each articlelist as it}',
				'<div class="swiper-slide">',
					'<div class="info">',						
	                    '<a href="javascript:void(0);" name="artic">',
							'<h1>${it.title|titleSub}</h1>',									
						'</a>',		                						
					'</div>',
				'</div>',
			'{@/each}',
		].join('');
		thisservice.findArticle(param,function(data){
			var errorno = data.error_no;
			var errormsg = data.error_info;
			if(errorno==0){
				var results = data.results;
			  	results = results[0].resultList;
			  	articlelist = JSON.parse(results);
			  	if(articlelist.length<=0) { 
			  		layer.iAlert("没有查询到公示公告数据");
			  		return;
			  	}
			  	articlelist = articlelist.slice(0,5);
			  	var articleHtml = juicer(tmpArticle,{"articlelist":articlelist});
			  	$("#guide #article").html(articleHtml);
			  	var swiperHotNews = new Swiper('#swiper_hot_news', {
			        direction: 'vertical',
			        slidesPerView: 1,
			        autoplay: 2500
			    });

			    $("#guide .swiper-slide").off();
				$("#guide .swiper-slide").on('click',function(e){
					page.topage('guide','news');
				});

			}else{
				layerUtil.iAlert(errormsg);
			}
			
		},true);
	}

/**
 * 查询融资融券利率和费率
 */
	function queryRateRzrq(){
		var thisservice = thisservice||service.getInstance();
		var param = {
			
		}
		var queryRate =  function(resultVo){
			var errorno = resultVo.error_no;
			var errormsg = resultVo.error_info;
			if(errorno==0){
			  	var results = resultVo.results;
			  	results = results[0].resultList;
			  	results = JSON.parse(results);
			  	if(results.length<=0){ 
			  		layer.iAlert("没有查询到融资利率与融券费率");
			  		return;
			  	}
		  		$("#guide #updatedate").text(results[0].updatedate);
		  		$("#guide #rzll").text(results[0].financing);
		  		$("#guide #rqll").text(results[0].securities);
			}
			else {
				layerUtil.iAlert(errormsg);
			}
		};
		thisservice.findRate(queryRate,true);
	}
	
	
	function setHoneHref(){
		var href=location.href;
		href =encodeURI(href);
		sessionStorage.setItem("homePage",href);
	}
	
	
	function setTitle(){
		window.back=function(){
			if('tg'==getQueryString('source')){
				history.back();
			}else{
				location.href="../ad/financing.html";
			}
			
		}
		PAS.NativeAPI.fSetTitle(
			    { icontype:1, callback:"back", text:"" },
			    { icontype:0, callback:"", text:"融资融券" },
			    { icontype:0, callback:"", text:"" }
			);
	}
	
	function dourl(url){
        var defaultUrl = window.location.href,
            targetUrl = url;
        if(/\?/g.test(targetUrl)){
            /* 没有传入默认返回地址，默认返回上一层native页面*/
            targetUrl += "&referurl=" + encodeURIComponent(defaultUrl);
        }else{
            targetUrl += "?referurl=" + encodeURIComponent(defaultUrl);
        }
        //alert(targetUrl);
        window.location.href = targetUrl;
    }
	
	function destory(){

	}
	

	  
	
	module.exports = {
		"init":init,
		"bind":bind,
		"destory":destory
		};

});