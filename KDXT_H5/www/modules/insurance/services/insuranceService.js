define([
  "app",
  "js/common/common"
],function(app, C){
  
  app.service('insuranceService', ['$http', function ($http) {

    var insuranceService = {
      postInfo: function (hasInsuranceContract, insuranceCompany, isInsuranceContractValid) {

        if(hasInsuranceContract){
          hasInsuranceContract = "Y"
        } else {
          hasInsuranceContract = "N"
        }

        if(insuranceCompany === undefined){
          insuranceCompany = ''
        }

        if(isInsuranceContractValid){
          isInsuranceContractValid = "Y"
        } else {
          isInsuranceContractValid = "N"
        }

        var params = encodeURIComponent("param")+"="+encodeURIComponent(encodeURIComponent(JSON.stringify({"customerId": sessionStorage.getItem("userId"), "modulCode": "3", "hasInsuranceContract": hasInsuranceContract, "insuranceCompany": insuranceCompany, "isInsuranceContractValid": isInsuranceContractValid})))
        return $http.post(C.Api("saveModul"), params)
      },
      getModulInfo: function(customerId) {
        var params = encodeURIComponent("param")+"="+encodeURIComponent(encodeURIComponent(JSON.stringify({"customerId": sessionStorage.getItem("userId"), "modulCode": "3"})))
        return $http.post(C.Api("modulInfo"), params)
      }
    }

    return insuranceService

  }]);

});