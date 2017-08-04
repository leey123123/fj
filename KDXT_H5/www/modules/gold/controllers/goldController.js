define([
  "app",
  "modules/gold/services/goldService",
  "Android_Toast"
], function(app, goldService, toast) {

  app.controller("goldController", 
    ['$scope','$rootScope','goldService', '$location', 'errorService',
    function($scope,$rootScope, goldService, $location, errorService) {

      $('body').removeClass('page-index');

      $scope.moduleNotPass = false;
      $scope.moduleNotPassClass = '';

      $scope.user = {
        social: false,
        localSocial: false
      };

      var userId = sessionStorage.getItem("userId");

      $scope.loading = true;
      goldService.getModulInfo(userId).then(function (res) {
        if(res.statusText === "OK") {
          if(res.data.status === "0") {

        	  var userDataString = res.data.results[4].label;
              var json = "({";
              var strs= new Array();
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
            
            if(userData['是否有社保编码'] === "Y") {
              $scope.user.social = true;
            } else {
              $scope.user.social = false;
            }

            if(userData['是否有住房公积金编码'] === "Y") {
              $scope.user.localSocial = true;
            } else {
              $scope.user.localSocial = false;
            }
            $scope.loading = false;
          } else {
            new toast({content: res.data.msg.toString()});
             $scope.loading = false;
          }
        } else {
          new toast({content: '网络异常'});
           $scope.loading = false;
        }
        $scope.loading = false;
      }, function(err) {
        new toast({content: '服务器异常'});
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
        $rootScope.submitSuccess = false;
        $scope.moduleNotPass = false;
        $scope.moduleNotPassClass = '';
        $location.path("/index");
      };

      $scope.socialSubmit = function(e) {
        e.preventDefault();
        if($scope.user.social==0){
          //new toast({content: '尊敬的客户，您好！暂未有适合您的贷款产品，欢迎您继续关注我司的其他产品!'});
          $scope.moduleNotPass = true;
          $scope.moduleNotPassClass = 'slideUp';
          return;
        }
        
        $scope.loading = true;
        goldService.postInfo($scope.user.social, $scope.user.localSocial).then(function (res) {
          if(res.statusText === "OK") {
            if(res.data.status === "0") {
              if(res.data.results.head.status === "0"){

                new toast({content: '保存成功'});
                $location.path('/formNavigation');
              } else {
                new toast({content: res.data.head.errorMsg.toString()});
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
