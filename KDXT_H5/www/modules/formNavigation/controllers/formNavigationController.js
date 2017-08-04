define([
	"app",
  "modules/formNavigation/services/formNavigationService",
  "Android_Toast"
], function(app, formNavigationService, toast) {

	app.controller("formNavigationController", 
    ['$scope', '$rootScope', 'formNavigationService', 'errorService','$location',
    function($scope, $rootScope, formNavigationService, errorService,$location) { 

      $('body').addClass('page-index');

      $scope.phoneNum = "";
      $scope.moduleSuccess = false;
      $scope.submitSuccess = false;
      $scope.submitable = false;
      $scope.resubmit = false;
      $scope.moduleSuccessClass = '';
      $scope.submitSuccessClass = '';
      $scope.resubmitClass = '';
    
      $scope.info = {//是否已经填写相关表单，默认未填写
        base: "U",
        career: "U",
        house: "U",
        insurance: "U",
        glod: "U"
      };

      $scope.requireModule = {//表单是否必填，默认必填
        base: "Y",
        career: "Y",
        house: "Y",
        insurance: "Y",
        glod: "Y"
      };

      var phoneNum = sessionStorage.getItem('phone');
      if(phoneNum) {
        angular.forEach(phoneNum, function(v, k) {
          if(k > 2 && k < 6) {
            phoneNum[k] = "*";
          }
        });
        $scope.phoneNum = phoneNum;
      }

      $scope.loading = true;
		  formNavigationService.getCustomerInfo().then(function(res) {

        var response = errorService.handleError(res, toast);

        if(response !== "error") {
          var modulsStatus = response.modulsStatus;
          var require = response.requiredModul;
          console.log(require);
          require = require.split(',');

          if(response.status !== "INPUT") {
            $scope.submitable = false;
            $scope.resubmit = true;
            $scope.resubmitClass = 'slideUp';
          }else{
            $scope.submitable = true;
          }

          $scope.productName = "融e贷";
          $scope.productDescription = "";

          angular.forEach(Object.keys($scope.info), function(v, k) {
            console.log(modulsStatus[k]);
            $scope.info[v] = modulsStatus[k];
          });   
          
          /*for(var i = 0, len = Object.keys($scope.info).length;i<len;i++) {
            for(var j = 0, len1 = require.length; j<len;j++) {
              if(Object.keys($scope.info)[require[j]] === Object.keys($scope.info)[i]){
                $scope.info[Object.keys($scope.info)[i]] += require[j];
              }
            }
          }*/
          angular.forEach(Object.keys($scope.requireModule), function(v, k) {
            var flag = false;
            for(var j = 0, len1 = require.length; j<len1;j++) {
              if(k==require[j]){
                  flag = true;
              }
            }
            if(!flag){
              $scope.requireModule[v]="N";
            }
          });

          angular.forEach(Object.keys($scope.info), function(v, k) {
            if($scope.info[v]==='U'&&$scope.requireModule[v]==='Y'){
              $scope.submitable = false;
            }         
          }); 

         
          /*angular.forEach($scope.info, function(v, k) {
            if(v.length > 1&&v[0] === "U") {
              $scope.submitable = false;
            }
          });*/

          
          if(sessionStorage.getItem('phone') && sessionStorage.getItem('done')) {
            if(+sessionStorage.getItem('done') === +sessionStorage.getItem('phone')){
              $scope.submitable = false;
            } else {
              sessionStorage.removeItem('done');
            }
          }

        }

        $scope.loading = false;
      }, function(err) {
        new toast({content: '网络异常'});
        $scope.loading = false;
      });

      $scope.closeModal = function(){
        sessionStorage.removeItem("done");
        sessionStorage.removeItem("phone");
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem('jobInfo');
        sessionStorage.removeItem('job');
        sessionStorage.removeItem('houseInfo');
        sessionStorage.removeItem('house');
        $scope.moduleSuccess = false;
        $scope.submitSuccess = false;
        $scope.resubmit = false;
        $rootScope.submitSuccess = false;
        $scope.moduleSuccessClass = '';
        $scope.submitSuccessClass = '';
        $scope.resubmitClass = '';
        $scope.moduleNotPass = false;
        $scope.moduleNotPassClass = '';
        $location.path("/index");
      };

      $scope.back = function(){
        sessionStorage.removeItem("done");
        sessionStorage.removeItem("phone");
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem('jobInfo');
        sessionStorage.removeItem('job');
        sessionStorage.removeItem('houseInfo');
        sessionStorage.removeItem('house');
        $scope.moduleSuccess = false;
        $scope.submitSuccess = false;
        $scope.resubmit = false;
        $rootScope.submitSuccess = false;
        $scope.moduleSuccessClass = '';
        $scope.submitSuccessClass = '';
        $scope.resubmitClass = '';
        $scope.moduleNotPass = false;
        $scope.moduleNotPassClass = '';
        $location.path("/index");
      };

      $scope.allSubmit = function (e) {
        e.preventDefault();

        if(!$scope.submitable) {
          return false;
        }

        $scope.loading = true;
        formNavigationService.postAll().then(function(res){
          if(res.statusText === "OK") {
            if(res.data.status === "0") {
              if(res.data.results.head.status === "0") {

                if(sessionStorage.getItem('phone')) {
                  sessionStorage.setItem('done', sessionStorage.getItem('phone'));
                }

                $rootScope.submitSuccess = true;
                $scope.submitSuccess = true;
                $scope.submitSuccessClass = 'slideUp';

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

        }, function(err){
          new toast({content: '网络异常'});
          $scope.loading = false;
        });

      };

	}]);

});
