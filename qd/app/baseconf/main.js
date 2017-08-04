
    var config = {
        baseUrl: '',           //依赖相对路径
        paths: {                    //如果某个前缀的依赖不是按照baseUrl拼接这么简单，就需要在这里指出
            angular: 'baseconf/lib/angular/angular.min',
            route: 'baseconf/lib/angular-route/angular-route.min'
        },
        shim: {                     //引入没有使用requirejs模块写法的类库。例如underscore这个类库，本来会有一个全局变量'_'。这里shim等于快速定义一个模块，把原来的全局变量'_'封装在局部，并导出为一个exports，变成跟普通requirejs模块一样
            angular: {
                exports: 'angular'
            },
            route: {
                deps: ['angular'],   //依赖什么模块
                exports: 'ngRouteModule'
            }
        }//,
       // urlArgs: "bust=" + (new Date()).getTime()  //防止读取缓存，调试用
    };

    require.config(config);

    require(['angular', 'baseconf/app'], function(angular){
        angular.bootstrap(document, ['webapp']);

    });
