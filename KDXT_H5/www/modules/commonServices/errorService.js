define([
  "app",
  "js/common/common"
],function(app, C){
  
  app.service('errorService', ['$http', function ($http) {

    var errorService = {
      handleError: function (res, errorFn) {
        if(res.statusText === "OK"){
          if(res.data.status === "0"){
            if(res.data.results.head && res.data.results.head.status === "0") {
              return res.data.results.body;
            } else {
              if(res.data.results.head) new errorFn({content: res.data.results.head.errorMsg.toString()});
              return "error" 
            }
          } else {
            //new errorFn({content: res.data.msg.toString()});
            return "error"
          }
        } else {
          new errorFn({content: '网络异常'});
          return "error"
        }
      }
    }

    return errorService

  }]);

});