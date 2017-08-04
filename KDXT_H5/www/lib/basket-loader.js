/**
 * requirejs-basketjs
 * Author: Andrew Wakeling <andrew.wakeling@gmail.com>
 * requirejs-basketjs may be freely distributed under the MIT license.
 *
 * Load require.js modules via basket.js.
 */

/**
 * For more information about this function, see comments in "req.load" in require.js.
 *
 * @param {Object} context the require context to find state.
 * @param {String} moduleName the name of the module.
 * @param {Object} url the URL to the module.
 */
;(function () {
    // return
    // window.addEventListener("error",function(e){
        // if(e.error.stack.indexOf("basket")!=-1){
            // basket.clear();
            // location.reload();
        // }
    // })
    var getParameter = function(param) {
        var reg = new RegExp('[&,?]' + param + '=([^\\&]*)', 'i');
        //location.search在route模式下获取不到参数
        var value = reg.exec(location.search);
        return value ? value[1] : '';
    };
    var ts = new Date().getTime();
    var skipCache = false;
    // 核心库不是每次都修改就手动改版本号
    var v = {
        "zepto":"1.1.6_1",
        "touch":"1.1.6_1",
        "angular":"1.4.1_1",
        "swipe":"2.0",
        "datePicker":"2.16.1",
        "jsencrypt":"1.0",
        "echarts":"2.2.7",
        "iscroll":"5.1.3",
        "moment":"2.9.0",
        "underscore":"1.8.3",
        "jweixin":"1.0.0",
        "fastclick":"1.0.2"
    }
    try{
        // 现发现部分对basket不兼容的案例、暂时全部屏蔽basket,zhouyiping
        // 现发现部分对basket不兼容的案例、暂时全部屏蔽basket,zhouyiping
        // 现发现部分对basket不兼容的案例、暂时全部屏蔽basket,zhouyiping
        // 现发现部分对basket不兼容的案例、暂时全部屏蔽basket,zhouyiping
        // 现发现部分对basket不兼容的案例、暂时全部屏蔽basket,zhouyiping
        // 现发现部分对basket不兼容的案例、暂时全部屏蔽basket,zhouyiping
        // 现发现部分对basket不兼容的案例、暂时全部屏蔽basket,zhouyiping
        // 现发现部分对basket不兼容的案例、暂时全部屏蔽basket,zhouyiping
        // if(true){
        ts =_appver.v ||  _app.ts;
        if(getParameter("BASKET_OFF")=="true" || getParameter("DEBUG")=="true" || _app.env == "DEV"){
            requirejs.config({
                // iloan自带构建时间戳
                // 已经由basket管理缓存了
                urlArgs:function(moduleName){
                    if(v[moduleName]){
                        return "v="+v[moduleName];
                    }else if(_app.env!='DEV'){
                        return "v=" + ts;
                    }
                    else{
                    	return '';
                    }
                }
            })
            return;
        }else{

        }
    }catch(e){}
    var original_loader = requirejs.load;
    var reload = function(){
        return;
        var last = localStorage.getItem("LAST_RELOAD");
        if(!last || (new Date().getTime()-last)>1000*120){
            localStorage.setItem("LAST_RELOAD",new Date().getTime());
            location.reload();
        }
    }
    basket.timeout=999999;
    requirejs.onError = function(e){
        console.error(1,e);
        basket.clear();
        reload();
    };
    window.addEventListener("error",function(){
        basket.clear();
        setTimeout(function(){
            reload();
        },2000);
    })
    requirejs.load = function (context, moduleName, url) {
        try{
             var config = requirejs.s.contexts._.config;
            if (config.basket && config.basket.excludes && config.basket.excludes.indexOf(moduleName) !== -1) {
                original_loader(context, moduleName, url);
            } else {
                var unique = ts;
                config.basket = {
                    unique : v
                }
                if(config.basket && config.basket.unique && config.basket.unique.hasOwnProperty(moduleName) ){
                    unique = config.basket.unique[moduleName];
                }
                basket.require({ url: url,unique:unique,execute:false}).then(function (res) {
                    original_loader(context, moduleName, url ,res[0].data);
                    context.completeLoad(moduleName);
                }, function (error) {
                    context.onError(error);
                    console.log("error",error);
                });
            }
        }catch(e){
            context.onError(error);
        }

    };
}());