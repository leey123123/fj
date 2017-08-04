
define(function(){
  "use strict";
  return function(app){
    app.factory('mainService', function(){
      return {
        test: function(){
          console.log('loaded service');
        }
      };
    });
  };
});