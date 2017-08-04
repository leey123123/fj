define([
  "app",
  "modules/job/controllers/jobController"
],function(app, jobController){

  app.config(['$routeProvider', function($routeProvider){
      $routeProvider
            .when('/', {
                templateUrl: '../job/job_inner.html',
                controller: 'jobController'
            })
    }]);

  app.bootstrap();

});