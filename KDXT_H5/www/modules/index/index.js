define([
    "app",
    "modules/index/controllers/indexController",
    "modules/formNavigation/controllers/formNavigationController",
    "modules/base/controllers/baseController",
    "modules/job/controllers/jobController",
    "modules/house/controllers/houseController",
    "modules/insurance/controllers/insuranceController",
    "modules/gold/controllers/goldController",
    "modules/citySelector/controllers/citySelectorController"
],function(app, indexController, formNavigationController, baseController, jobController){

    app.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider){

        $httpProvider.defaults.headers.post['Content-Type'] = "application/x-www-form-urlencoded"

        $routeProvider
        .when('/index', {
            templateUrl: '../index/index_inner.html',
            controller: 'indexController'
        })
        .when('/formNavigation', {
            templateUrl: '../formNavigation/formNavigation_inner.html',
            controller: 'formNavigationController'
        })
        .when('/base', {
            templateUrl: '../base/base_inner.html',
            controller: 'baseController'
        })
        .when('/job', {
            templateUrl: '../job/index_inner.html',
            controller: 'jobController'
        })
        .when('/house', {
            templateUrl: '../house/index_inner.html',
            controller: 'houseController'
        })
        .when('/insurance', {
            templateUrl: '../insurance/index_inner.html',
            controller: 'insuranceController'
        })
        .when('/gold', {
            templateUrl: '../gold/index_inner.html',
            controller: 'goldController'
        })
        .when('/citySelector', {
            templateUrl: '../citySelector/citySelector_inner.html',
            controller: 'citySelectorController'
        })

    }]);

    app.run(["$rootScope", "$location", function($rootScope, $location) {
        $rootScope.$on( "$routeChangeStart", function(event, next, current) {
            if(!sessionStorage.getItem("userId")) {
                $location.path( "/index" );
                if(sessionStorage.getItem("manid") === "false"){
                    $location.path( "/index" );
                }
            } 
            if($rootScope.submitSuccess){
                $location.path( "/index" );
            }
            /*else {
                if(next.$$route.originalPath === "/"){
                    $location.path( "/formNavigation" );
                }
            }*/
        })
    }])

    app.bootstrap();

});