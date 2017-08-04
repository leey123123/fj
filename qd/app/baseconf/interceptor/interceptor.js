define(function(){
  "use strict";
  var requestCount=0;
  return function(app){
    app.factory('MyHttpInterceptor', ['$q', '$rootScope',
        function($q, $rootScope){
            return {
                // optional method
                'request': function(config) {
                	//		alert(1);
                   $rootScope.load = true;
            		requestCount++;
                    return config;
                },

                // optional method
                'requestError': function(rejection) {
                    // do something on error
                    //if (canRecover(rejection)) {
                    //    return responseOrNewPromise;
                    //}
                	 
                    //alert('requestError!!!');
                	requestCount--;
                	if(requestCount===0){
                		$rootScope.load = false;
                	}
                    return $q.reject(rejection);
                },



                // optional method
                'response': function(response) {
                    // do something on success
                	requestCount--;
                	if(requestCount===0){
                		$rootScope.load = true;
                	}
                    return response;
                },

                // optional method
                'responseError': function(rejection) {
                    // do something on error
                    //if (canRecover(rejection)) {
                    //    return responseOrNewPromise;
                    //}
                	requestCount--;
                	if(requestCount===0){
                		$rootScope.load = false;
                	}
                    //alert('responseError!!!');
                    return $q.reject(rejection);
                }
            };
        }
    ]);
  };
});





