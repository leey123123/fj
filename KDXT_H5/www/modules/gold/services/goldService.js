define([
  "app",
  "js/common/common"
],function(app, C){
  
  app.service('goldService', ['$http', function ($http) {

    var goldService = {
      postInfo: function (hasLocalSocialSecurity, hasLocalHousingFund) {

        if(hasLocalSocialSecurity){
          hasLocalSocialSecurity = "Y"
        } else {
          hasLocalSocialSecurity = "N"
        }

        if(hasLocalHousingFund){
          hasLocalHousingFund = "Y"
        } else {
          hasLocalHousingFund = "N"
        }

        var params = encodeURIComponent("param")+"="+encodeURIComponent(encodeURIComponent(JSON.stringify({"customerId": sessionStorage.getItem("userId"), "modulCode": "4", "hasLocalSocialSecurity": hasLocalSocialSecurity, "hasLocalHousingFund": hasLocalHousingFund})))
        return $http.post(C.Api("saveModul"), params)
      },
      getModulInfo: function(customerId) {
        var params = encodeURIComponent("param")+"="+encodeURIComponent(encodeURIComponent(JSON.stringify({"customerId": sessionStorage.getItem("userId"), "modulCode": "4"})))
        return $http.post(C.Api("modulInfo"), params)
      }
    }

    return goldService

  }]);

});