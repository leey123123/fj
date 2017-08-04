define([
  "app",
  "js/common/common"
],function(app, C){
  
  app.service('formNavigationService', ['$http', function ($http) {

    var formNavigationService = {
      postAll: function () {
        var customerId = sessionStorage.getItem("userId")
        var params = encodeURIComponent("param")+"="+encodeURIComponent(encodeURIComponent(JSON.stringify({"customerId": customerId})))
        return $http.post(C.Api("saveAll"), params)
      },
      getCustomerInfo: function () {
        var customerId = sessionStorage.getItem("userId")
        var params = encodeURIComponent("param")+"="+encodeURIComponent(encodeURIComponent(JSON.stringify({"customerId": customerId})))
        return $http.post(C.Api("customerInfo"), params)
      }
    }

    return formNavigationService

  }]);

});