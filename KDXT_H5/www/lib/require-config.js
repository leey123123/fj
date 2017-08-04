(function(){
    var ts = new Date().getTime();
    var map;
    try{
        // 已经由basket管理缓存了
        // ts = _app.ts;
        // // 开发环境下固定
        // if(_app.env == "DEV"){
        //     ts="dev";
        // }
        var getParameter = function(param) {
            var reg = new RegExp('[&,?]' + param + '=([^\\&]*)', 'i');
            var value = reg.exec(location.search);
            return value ? value[1] : '';
        };
        var debug = getParameter("DEBUG");
        if(debug){
            ts="debug";
            map = {"*":{
               "js":"src/js",
               "modules":"src/modules" 
            }}
        }
    }catch(e){}
    requirejs.config({
        // iloan自带构建时间戳
        // 已经由basket管理缓存了
        /*urlArgs:function(moduleName){
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
                "jweixin":"1.0.0"
            }
            if(v[moduleName]){
                return "v="+v[moduleName];
            }else{
                return "v=" + ts;
            }
        },*/
        baseUrl:"",
        paths: {
            // zepto
            C: 'js/common/common',
            zepto: 'lib/zepto/zepto.min',
            touch: 'lib/zepto/touch.min',
            // angular
            app: 'modules/app',
            // angular
            angular: 'lib/angular/angular.min',
            angularCore: 'lib/angular/angular-core',
            angularRoute: 'lib/angular/angular-route',
            angularAnimate: 'lib/angular/angular-animate',
            angularSanitize: 'lib/angular/angular-sanitize',
            // angular plugins
            ngStorage: 'lib/ngStorage.min',
            ngAlphabetIndexer: 'lib/ng-alphabet-indexer',
            Android_Toast: 'lib/android_toast.min',
            // ko
            ko: 'lib/knockout',
            // underscore
            underscore: 'lib/underscore-min',
            // plugins
            swipe: 'lib/swipe',
            fastclick: 'lib/fastclick.min',
            ccsk: 'lib/ccsk/cc-sk-2.3.5.min',
            mobiScroller : 'lib/mobiscroll/mobiscroll-scroller-config',
            // rsa加密库
            jsencrypt:"lib/jsencrypt",
            iscroll:"js/component/iscroll",
            iscrollProbe:"js/component/iscroll-probe",
            echarts:"lib/echarts",
            zrColor:"lib/zrender/tool/color",
            moment:"lib/moment.min",
            jweixin:"lib/jweixin-1.0.0"
        },
        map:map,
        shim: {
            'mobiScroller': {
              deps: ['zepto'],
                exports: 'mobiscroll'
            },
            'touch': {
                deps: ['zepto']
            },
            'swipe': {
                deps: ['zepto'],
                exports: 'Swipe'
            },
            'angularCore': {
                exports: 'angular'
            },
            'angularRoute': {
                deps: ['angularCore'],
                exports: 'angular'
            },
            'angularAnimate': {
                deps: ['angularCore'],
                exports: 'angular'
            },
            'angularSanitize': {
                deps: ['angularCore'],
                exports: 'angular'
            },
            'echarts':{
            	exports: 'echarts'
            }
        }
    });
})();