define([
  "app",
  "js/common/common"
],function(app, C){
  
  app.service('houseService', ['$http', function ($http) {

    var houseService = {
      postInfo: function (hasLocalHouseProperty, housePropertyCity, housePropertyRegion, housePropertyNature, hasHouseLoan, isHouseLoanCloseOff) {
        if(hasLocalHouseProperty==2) {
          hasLocalHouseProperty = "HAS_OUT_HOUS";
        } else if(hasLocalHouseProperty==1) {
          hasLocalHouseProperty = "HAS_LOCAL_HOUSE";
        }else{
          hasLocalHouseProperty = "NO_HOUSE";
        }
        if(hasHouseLoan) {
          hasHouseLoan = "Y" 
        } else {
          hasHouseLoan = "N" 
        }
        if(isHouseLoanCloseOff) {
          isHouseLoanCloseOff = "Y" 
        } else {
          isHouseLoanCloseOff = "N" 
        }
        var params = encodeURIComponent("param")+"="+encodeURIComponent(encodeURIComponent(JSON.stringify({"customerId": sessionStorage.getItem("userId"), "modulCode": "2", "hasLocalHouseProperty": hasLocalHouseProperty, "housePropertyCity": housePropertyCity, "housePropertyRegion": housePropertyRegion, "housePropertyNature": housePropertyNature, "hasHouseLoan": hasHouseLoan, "isHouseLoanCloseOff": isHouseLoanCloseOff})))
        return $http.post(C.Api("saveModul"), params)
      },
      getModulInfo: function(customerId) {
        var params = encodeURIComponent("param")+"="+encodeURIComponent(encodeURIComponent(JSON.stringify({"customerId": sessionStorage.getItem("userId"), "modulCode": "2"})))
        return $http.post(C.Api("modulInfo"), params)
      }
    }

    return houseService

  }]);

});