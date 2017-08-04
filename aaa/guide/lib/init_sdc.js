/**
 * SDC初始化
 *
 *
 */
/*define([
    "zepto",
    "js/common/native",
    "js/common/constant",
    "js/common/utils",
    "underscore"
    ], function(
        $,
        Native,
        Constant,
        Utils,
        _
    ) {*/
var getParameter = function (param) {
    var reg = new RegExp('[&,?]' + param + '=([^\\&]*)', 'i');
    var value = reg.exec(location.search);
    return value ? value[1] : '';
}


/**************************方法定义******************************************/
/**
 * Cookie操作
 */
var Cookie = function (key, value, options) {
    if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null || value === undefined)) {
        options = options || {};
        options.secure = (options.secure == undefined) ? true : options.secure;
        if (value === null || value === undefined) {
            options.expires = -1;
        }
        if (typeof options.expires === 'number') {
            var days = options.expires, t = options.expires = new Date();
            // expires以时间天为单位、接受小数
            t.setTime(t.getTime() + parseInt(days * 24 * 60 * 60 * 1000));
        }
        value = String(value);

        return (document.cookie = [encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value), options.expires ? '; expires=' + options.expires.toUTCString() : '', options.path ? '; path=' + options.path : '', options.domain ? '; domain=' + options.domain : '', options.secure ? '; secure' : ''].join(''));
    }
    options = value || {};
    var decode = options.raw ? function (s) {
        return s;
    } : decodeURIComponent;
    var pairs = document.cookie.split('; ');
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i],
            index = pair ? pair.indexOf('=') : -1,
            k, v;
        //cookie值中可能带有=号
        if (index != -1) {
            k = pair.substring(0, index);
            v = pair.substring(index + 1, pair ? pair.length : 0);

            if (decode(k) === key) {
                return decode(v || '');
            }
        }
    }
    return null;
}
$(function() {
    var SDC = {};
    var pusharr = function(str,key){
        var lst = str?str.split(","):[];
        if(lst[0] == key)return;
        if(lst.length>4){
            lst.pop();
        }
        lst.unshift(key);
        return lst.join(",");
    };


    SDC.set = function(opt){
        var m = function(key,value){
            // 对sdcInnerEntry 入口参数进行队列处理
            if(key == "sdcInnerEntry"){
                var innerEntry = Cookie("sdcInnerEntry");
                value = pusharr(innerEntry,value);
            }
            SDC[key] = value;
            if(SDC[key]){
                Cookie(key,SDC[key],{path:'/',domain:"pingan.com"});
            }
        }
        if(typeof(opt) == "string"){   
            m(arguments[0],arguments[1]);
        }else if(typeof(opt)=="object"){
            for(var key in opt){
                if(opt[key]){
                    m(key,opt[key])
                }
            }
        }
    };


    // 初始化埋点信息
    (function(){

        var platform="unknow",client="unknow";
        if(Adapter.isAndroid){
            platform = "android";
        }
        if(Adapter.isIphone){
            platform = "iphone";
        } 
        if(Adapter.isIpad){
            platform = "ipad";
        }
        if(Adapter.isNative){
            client = "aneapp" ;
            // 添加app版本号
            var ua = window.navigator.userAgent;
            var version = ua.match(/AYLCAPP.+/g);
            var vstr = (version && version[0]);
            client+= !!vstr?("_"+vstr.split("/")[1]):"";

        }else if(Adapter.weixin){
            client = "weixin";
        }else if(Adapter.isAnydoor){
            client = "anydoor";
        }else{
            var ua = window.navigator.userAgent;
            client = ua.split(" ")[0];
            if(ua && /safari/ig.test(ua))client = "safari";
            if(ua && /chrome/ig.test(ua))client = "chrome";
            if(ua && /msie/ig.test(ua))client = "msie";
        }


        //aid,sid,ouid,获客渠道编码
        var aid = getParameter("aid") || "";
        var sid = getParameter("sid") || "";
        var ouid = getParameter("ouid") || "";
        var channelCode = _getChannelCode(aid,sid,ouid);
        // 如果没有任何值时，取cookies上一个的值
        if(channelCode.length<=4){
            channelCode =  Cookie('sdcAainSourceChannel');
        }
        //获客渠道编码
        Cookie('sdcAainSourceChannel',channelCode,{expires:5,path:'/',domain:"pingan.com"});
        
        var innerMedia = getParameter("inner_media") || Cookie('sdcSubagent');
        var mc_id = getParameter("WT.mc_id");
        var inner_entry = getParameter("inner_entry");
        var t = getParameter("t");
        // 内媒体需要自动延续
        Cookie('sdcSubagent',innerMedia,{expires:5,path:'/',domain:"pingan.com"});
        if(mc_id){ //如果mc_id存在
            // 媒体来源3天内有效，不会延续
            Cookie('sdcSource',mc_id,{expires:3,path:'/',domain:"pingan.com"});
        }
        if(inner_entry){ //如果inner_entry存在
            // 内部来源3天内有效，不会延续
            SDC.set("sdcInnerEntry",inner_entry);
        }
        if(t){ //如果t存在
            // 推荐人3天内有效，不会延续
            Cookie('sdcReferee',t,{expires:3,path:'/',domain:"pingan.com"});
        }
        $.extend(SDC,{
            /*
                sdcReferee       推荐人
                sdcSource        媒体来源
                sdcVisitorId      访客ID
                sdcPlatform     平台（android/ios/pc等）
                sdcAgent         客户端（App/微信/H5等）
                sdcInnerEntry   内部入口
                sdcSubagent     内媒（用于区分微信的服务号和订订阅号，PC的通达信）
            */
            sdcReferee:t || Cookie('sdcReferee'),
            sdcSource:mc_id || Cookie('sdcSource'),
            sdcVisitorId:"",
            sdcPlatform:platform,
            sdcAgent:client,
            sdcInnerEntry:inner_entry || Cookie('sdcInnerEntry'),
            sdcAainSourceChannel:channelCode,
            sdcSubagent:innerMedia
        });
        Cookie('sdcPlatform',SDC.sdcPlatform,{path:'/',domain:"pingan.com"});
        Cookie('sdcAgent',SDC.sdcAgent,{path:'/',domain:"pingan.com"});

        if(Adapter.isNative && (!channelCode || (channelCode && channelCode.length<=4))){
            // 在app中，取默认的aid\sid\ouid
            Adapter.getConditions(function(data){
                if(!data)return;
                channelCode = _getChannelCode(data.aid,data.sid,data.ouid);
                SDC.set("sdcAainSourceChannel",channelCode);
            })
        }
    })();

    (function(){
        // https协议下才进行埋点
        //if(location.protocol == "https:"){
            var gDomain = "sdc.pingan.com"; // SDC Production Mode Domain
            var gDcsId = "dcspymm36v5rgwyi354yjpm91_6q9m";
            var gFpc = "WT-FPC";
            var gConvert = true;
            var gWTIDJS = window.document.createElement("script");
            window.document.getElementsByTagName("head")[0].appendChild(gWTIDJS);
            if ((typeof(gConvert) != "undefined") && gConvert && (document.cookie.indexOf(gFpc + "=") == -1) && (document.cookie.indexOf("WTLOPTOUT=") == -1)) {
                gWTIDJS.src = "http" + (window.location.protocol.indexOf('https:') == 0 ? 's' : '') + "://" + gDomain + "/" + gDcsId + "/wtid.js";
            }
            function exesdcjs() {
            	var domain='https://stock.pingan.com.cn';
				if(window.location.href.indexOf("stock.pingan.com")>-1){   //PRD
					domain='https://stock.pingan.com.cn';
				}
				else if(window.location.href.indexOf("https://")>-1){      //UAT
					domain='https://stock.pingan.com.cn';
				} else {
					domain='http://10.25.153.173:39999';				   //FAT
				}
                var SDC_js = document.createElement("script");
                SDC_js.src= domain + "/html/aylc/js/build/webtrends.min.js";
                var headElem = document.getElementsByTagName("head")[0];
                headElem.appendChild(SDC_js);
            }
            setTimeout(exesdcjs(), 0);
        //}
    })();
    
    /*
     *获取客户渠道编码
     */
    function _getChannelCode(aid,sid,ouid){
        return (aid || "")+"!!"+(sid || "")+"!!"+(ouid || "");
    }
    
    var trace = function(event,label,map){
        var base = {
            user_id:(Adapter.data('USER_TRACE_INFO') || {}).userId,
            user_code:(Adapter.data('USER_TRACE_INFO') || {}).userCode,
            login_sts:!!Adapter.data("USER_LOGIN_INFO")
        };
        var map = map || {};
        var pick = {},obj = {};
        for(var key in SDC){
            if(typeof(SDC[key])=="string")pick[key]=SDC[key];
        }
        //公共部分信息存储map对象中，特殊信息key，value则和map处同一级
        for(var i in map){
            if(i && i != "product_code"){
                obj.key = i;
                obj.value = map[i];
                delete map[i];
                break;
            }
        }
        var params = {
            event:event,
            label:label,
            map:$.extend(map,pick,base)
        };
        Adapter.TD($.extend(params,obj));
    }
    
    window.trace = function(event,label,map){
    	trace(event,label,map);
    }
    
    var sendTD = function(map){
        var event = $(this).attr("td-event");
        var label = $(this).attr("td-label");
        var domMapStr = $(this).attr("td-map");
        var map = map || {};
        var domMap = {};
        try{
           domMap = eval("("+domMapStr+")");
        }catch(e){
            console.log(e)
        };
        trace(event,label,$.extend(map,domMap));
    }

    /*
    * 元素点击时触发
    * <div td-type="button" td-event="05-挂卡" td-label="050407-点击协议书" td-map="{ad_seq_no:1}"></div>
    * 输入框失焦时触发
    * <div td-type="input" td-event="05-挂卡" td-label="050701-输入验证码" td-map="{ad_seq_no:1}"></div>
    * 进入页面时触发
    * <div td-type="page" td-event="05-挂卡" td-label="050701-输入验证码" td-map="{ad_seq_no:1}"></div>
    */
    $(document).on("click","[td-type=button]",function(){
       sendTD.apply(this);
    }).on("click","[td-entry]",function(){
       var entry = $(this).attr("td-entry");
       SDC.set('sdcInnerEntry',entry);
    }).on("click","[td-inner-media]",function(){
       var entry = $(this).attr("td-inner-media");
       SDC.set('sdcSubagent',entry);
    }).on("blur","[td-type=input]",function(){
        sendTD.apply(this);
    }).on("change","[td-type=select]",function(){
        sendTD.apply(this);
    }).on("keypress","[td-type=password]",function(){
        sendTD.apply(this);
    });
    $(function(){
        (function(){
            var _counter = 0;
            // 循环获取首次加载成功
            var _timer=setInterval(function(){
                if(window.pa_sdcajax || _counter > 50){
                    trace("TRACE","PAGE_VIEW");
                    $("[td-type=page]").each(function(){
                        var self = this;
                        sendTD.apply(self);
                    })
                    clearInterval(_timer);
                    _timer = null;
                }
                _counter++;
            },1000);
        })()
    });
    /*
        C.SDC.trace("05-挂卡","050407-点击协议书",{ad_seq_no:1});
    */
    SDC.trace = trace;
    return SDC;
});


