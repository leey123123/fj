define([
  "app",
  "modules/insurance/services/insuranceService",
  "Android_Toast",
  "modules/core/mobiScroller"
], function(app, insuranceService, toast, mobiScroller) {

  app.controller("insuranceController", 
    ['$scope', 'insuranceService', '$location', 'errorService',
    function($scope, insuranceService, $location, errorService) {

    $('body').removeClass('page-index');

    $scope.user = {
      insurance: false,
      insuranceCompany: {
        name: "",
        label: ""
      },
      valid: false
    };

    $scope.insuranceCompanies = [
      {name: "PINGAN", label: "中国平安人寿保险股份有限公司"},
      {name: "GUOSHOU", label: "中国人寿保险股份有限公司"},
      {name: "XINHUA", label: "新华人寿保险股份有限公司"},
      {name: "TAIKANG", label: "泰康人寿保险股份有限公司"},
      {name: "TAIPINGYANG", label: "中国太平洋人寿保险股份有限公司"},
      {name: "YANGGUANG", label: "阳光人寿保险股份有限公司"},
      {name: "FUDE", label: "富德生命人寿保险股份有限公司"},
      {name: "OTHER", label: "其他"}
    ];

    $scope.$on('scrollInit',function(){
        $scope.scrollInit();
    });

    $scope.scrollInit = function(){
      //保险公司名称 
      angular.element(document.getElementById('insuranceCompany')).val($scope.user.insuranceCompany.label);
    };

    $scope.$watch('user', function(newVal, oldVal){

      var insurance; 

      if(!$scope.user.insurance){
          $scope.user.insuranceCompany.label = "";
          $scope.user.insuranceCompany.name = "";
      }

      if($scope.user.insuranceCompany){
        $scope.insuranceCompanyWrapClass = 'valid';
      }

      //初始化下拉框
      $scope.scrollInit();

    }, true);

    var userId = sessionStorage.getItem("userId");

    $scope.loading = true;
    insuranceService.getModulInfo(userId).then(function (res) {
      if(res.statusText === "OK") {
        if(res.data.status === "0") {

        	var userDataString = res.data.results[3].label;
            var json = "({";
            var strs = [];
            strs = userDataString.split(";");

            for (var i=0;i<strs.length;i++)
          	{
          	  if(strs[i]=="")continue;
          	  var str=strs[i].split("|");
          	  json+=str[0];
          	  json = json+":'"+str[1]+"',";
          	}
            json=json.substring(0,json.length-1);
            json+="})";
            var userData = eval(json);
            console.log(userData);
          if(userData['是否有保单编码'] === "Y"){
            $scope.user.insurance = true;
          } else {
            $scope.user.insurance = false;
          }

          if(userData['保单是否有效编码'] === "Y"){
            $scope.user.valid = true;
          } else {
            $scope.user.valid = false;
          }

          $scope.user.insuranceCompany.label = userData['保险公司'] || "";
          $scope.user.insuranceCompany.name = userData['保险公司编码'] || "";

        } else {
          new toast({content: res.data.msg.toString()});
        }
      } else {
        new toast({content: '网络异常'});
      }
      $scope.loading = false;
    }, function(err) {
      new toast({content: '服务器异常'});
      $scope.loading = false;
    });

    $scope.insuranceSubmit = function(e) {
      e.preventDefault();

      if($scope.user.insurance) {
        if(!$scope.user.insuranceCompany) {
          //new toast({content: '请选择保险公司名称'});
          $scope.insuranceCompanyError = '请选择保险公司名称';
          $scope.insuranceCompanyWrapClass = 'valid error';
          return false;
        }
      }

      $scope.loading = true;
      insuranceService.postInfo($scope.user.insurance, $scope.user.insuranceCompany.name, $scope.user.valid).then(function (res) {
        if(res.statusText === "OK") {
          if(res.data.status === "0") {
            if(res.data.results.head.status === "0"){

              new toast({content: '保存成功'});
              $location.path('/formNavigation');
            } else {
              new toast({content: res.data.results.head.errorMsg.toString()});
            }
          } else {
            new toast({content: res.data.msg.toString()});
          }
        } else {
          new toast({content: '网络异常'});
        }
        $scope.loading = false;
      }, function(err) {
        new toast({content: '服务器异常'});
        $scope.loading = false;
      });
      
    };

  }]);

});
