define([
	"app",
  "js/common/common"
],function(app, C){
  
	app.service('indexService', ['$http', function ($http) {

    var indexService = {
      sendCode: function (phoneNum) {
        var params = encodeURIComponent("param")+"="+encodeURIComponent(encodeURIComponent(JSON.stringify({"mobileTelephone": phoneNum})))
        return $http.post(C.Api("sms"), params)
      },
      postId: function(phoneNum) {
        var params = encodeURIComponent("param")+"="+encodeURIComponent(encodeURIComponent(JSON.stringify({"mobileTelephone": phoneNum})))
        return $http.post(C.Api("checkId"), params)
      },
      postPhoneNum: function (phoneNum, vaildCode, token, channel1, channel2, channel3, saleTeamId, saleManagerUserId) {
        var params = encodeURIComponent("param")+"="+encodeURIComponent(encodeURIComponent(JSON.stringify({"mobileTelephone": phoneNum, "validateCode": vaildCode, "token": token, "channel1": channel1, "channel2": channel2, "channel3": channel3, "saleTeamId": saleTeamId, "saleManagerUserId": saleManagerUserId})))
        return $http.post(C.Api("register"), params)
      },
      getModulInfo: function(customerId) {
        var params = encodeURIComponent("param")+"="+encodeURIComponent(encodeURIComponent(JSON.stringify({"customerId": sessionStorage.getItem("userId"), "modulCode": "0"})))
        return $http.post(C.Api("modulInfo"), params)
      }
    }

    return indexService

	}]);

});