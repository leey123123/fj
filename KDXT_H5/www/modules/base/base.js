define([
	"app",
	"modules/base/controllers/baseController"
],function(app, baseController){

	app.config(['$routeProvider', function($routeProvider){
    	$routeProvider
            .when('/', {
                templateUrl: '../base/base_inner.html',
                controller: 'baseController'
            })
    }]);

	app.bootstrap();

});