define([
  "app",
  "modules/citySelector/controllers/citySelectorController"
],function(app, baseController){

  app.config(['$routeProvider', function($routeProvider){
      $routeProvider
            .when('/', {
                templateUrl: '../citySelector/citySelector_inner.html',
                controller: 'citySelectorController'
            })
    }]);

  app.bootstrap();

});