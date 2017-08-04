
define(['angular', 'require', 'baseconf/services/mainService','baseconf/filter/filter','baseconf/interceptor/interceptor','route'], function (angular, require,service,filter,interceptor) {
    var app = angular.module('webapp', [
        'ngRoute'
    ]);
    var version = "mainVersionstmp";
    interceptor(app);
    var stmp = "";
    if(version!=="mainVersionstmp"){
        stmp="."+version;
    }

    var defaultRoute = '/one';  
    var routeMap = {
                '/one': {                           //路由
                    controller: '../modules/one/one'+stmp+'.js',         //模块的代码路径
                    controllerName: 'oneController' ,    //控制器名称
                    temp:'../modules/one/one.html'
                },
                '/two': {                           //路由
                    controller: '../modules/two/two'+stmp+'.js',         //模块的代码路径
                    controllerName: 'twoController' ,    //控制器名称
                    temp:'../modules/two/two.html'
                }
            };


    app.config( function($httpProvider,$routeProvider, $controllerProvider) {

            $httpProvider.interceptors.push('MyHttpInterceptor');
                        //默认跳转到某个路由

            $routeProvider.otherwise({redirectTo: defaultRoute});
            for (var key in routeMap) {
                $routeProvider.when(key, {
                    templateUrl: routeMap[key].temp,
                    controller: routeMap[key].controllerName,
                    resolve:{
                        keyName: requireModule(routeMap[key])
                    }
                });
            }


            function requireModule(routeMap) {
                return function ($q) {
                    var deferred = $q.defer();
                    require([routeMap.controller], function (contrl) {
                        $controllerProvider.register(routeMap.controllerName, contrl);
                        deferred.resolve();
                    });
                    return deferred.promise;
                };  
            }

        });


    service(app);
    filter(app);
    return app;
});