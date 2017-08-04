define([
    "angular",
    "fastclick",
    "ngAlphabetIndexer"
],function(angular, fastclick, ngAlphabetIndexer){
    
	var app = angular.module(_app.name, [
        'ngRoute',
        'ngAnimate',
        'ngSanitize',
        'ngAlphabetIndexer',
        'ng-fclick'
    ]);

    angular.module('ng-fclick', []).run(function() {
        angular.element(window.document).ready(function(){
            fastclick.attach(document.body);
        })
    });

    app.bootstrap = function(){
        angular.element(window.document).ready(function(){
            angular.bootstrap(document, [_app.name])
        });
    };

	return app;
});