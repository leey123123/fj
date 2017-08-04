define([
  "app",
  "js/common/common"
],function(app, C){
  
  app.service('baseService', ['$http', function ($http) {

    var baseService = {
      postInfo: function (name, id, registeredCity, registeredRegion, residentCity, residentRegion, marriage, education) {
        var params = encodeURIComponent("param")+"="+encodeURIComponent(encodeURIComponent(JSON.stringify({"customerId": sessionStorage.getItem("userId"), "modulCode": "0", "customerName": name, "certId": id, "registeredCity": registeredCity, "registeredRegion": registeredRegion, "residentCity": residentCity, "residentRegion": residentRegion, "maritalStatus": marriage, "educationalDegree": education})))
        return $http.post(C.Api("saveModul"), params)
      },
      getModulInfo: function(customerId) {
        var params = encodeURIComponent("param")+"="+encodeURIComponent(encodeURIComponent(JSON.stringify({"customerId": sessionStorage.getItem("userId"), "modulCode": "0"})))
        return $http.post(C.Api("modulInfo"), params)
      }
    }

    return baseService

  }]);

});