define([
  "app",
  "js/common/common"
],function(app, C){
  
  app.service('jobService', ['$http', function ($http) {

    var jobService = {
      postInfo: function (organizationName, organizationNature, curOrgServiceYears, positionType, monthIncome, salaryPayoffMethod, workingCity, workingRegion) {
        var params = encodeURIComponent("param")+"="+encodeURIComponent(encodeURIComponent(JSON.stringify({"customerId": sessionStorage.getItem("userId"), "modulCode": "1", "organizationName": organizationName, "organizationNature": organizationNature, "curOrgServiceYears": curOrgServiceYears, "positionType": positionType, "monthIncome": monthIncome, "salaryPayoffMethod": salaryPayoffMethod, "workingCity": workingCity, "workingRegion": workingRegion})))
        return $http.post(C.Api("saveModul"), params)
      },
      getModulInfo: function(customerId) {
        var params = encodeURIComponent("param")+"="+encodeURIComponent(encodeURIComponent(JSON.stringify({"customerId": sessionStorage.getItem("userId"), "modulCode": "1"})))
        return $http.post(C.Api("modulInfo"), params)
      }
    }

    return  jobService

  }]);

});