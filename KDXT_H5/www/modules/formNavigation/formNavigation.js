define([
	"app",
	"modules/formNavigation/controllers/formNavigationController"
],function(app, formNavigationController){

	app.config(['$routeProvider', function($routeProvider){
    	$routeProvider
            .when('/', {
                templateUrl: '../formNavigation/formNavigation_inner.html',
                controller: 'formNavigationController'
            })
    }]);

	app.bootstrap();

});