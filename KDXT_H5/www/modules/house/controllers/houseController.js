define([
  "app",
  "modules/house/services/houseService",
  "Android_Toast",
  "modules/core/mobiScroller"
], function(app, houseService, toast, mobiScroller) {

  app.controller("houseController", 
    ['$scope', 'houseService','$location', 'errorService',
    function($scope, houseService, $location, errorService) {

      $('body').removeClass('page-index');

      $scope.user = {
        house: 0,
        houseCity: {
          code: "",
          name: "",
          area: {
            code: "",
            name: ""
          },
          showName: ""
        },
        houseProperty: {
          label: "",
          name: ""
        },
        loan: false,
        loanFinish: false
      };

      $scope.houseProperties = [
        {name: "ARMY", label: "军产房"},
        {name: "FACTORY", label: "厂房"},
        {name: "LIMITED_PROPERTY", label: "小产权房"},
        {name: "SELF_BUILD", label: "自建房"},
        {name: "ECONOMICAL", label: "经济适用房"},
        {name: "COMMERCIAL", label: "商品住房"},
        {name: "WELFARE", label: "单位福利房"}
      ];

      if(sessionStorage.getItem("house")){
        var data = sessionStorage.getItem("house");
        data = data.split(";");
        $scope.user.houseCity.name = data[0];
        $scope.user.houseCity.code = data[1];
        $scope.user.houseCity.area.name = data[2];
        $scope.user.houseCity.area.code = data[3];
      }

      $scope.$on('scrollInit',function(){
        $scope.scrollInit();
      });

      $scope.scrollInit = function(){
        //房产所在城市｜房产性质
        angular.element(document.getElementById('houseProperty')).val($scope.user.houseProperty.label);
        angular.element(document.getElementById('houseCity')).val($scope.user.houseCity.showName);
      };

      $scope.$watch('user', function(newVal, oldVal){
        
        var house = $scope.user.house, houseProperty = $scope.user.houseProperty, loan = $scope.user.loan, loanFinish = $scope.user.loanFinish;

        if(newVal.house !== oldVal.house&&newVal.house !== 'undefined'){
          house = newVal.house;
        }

        if(!house){
          $scope.user.houseCity.name = "";
          $scope.user.houseCity.code = "";
          $scope.user.houseCity.area.name = "";
          $scope.user.houseCity.area.code = "";
          $scope.user.houseCity.showName = "";
          $scope.user.houseProperty.label = "";
          $scope.user.houseProperty.name = "";
          $scope.user.loan = false;
          $scope.user.loanFinish = false;
          houseProperty = $scope.user.houseProperty;
        }

        if(newVal.houseProperty&&newVal.houseProperty !== 'undefined'){
          if(typeof newVal.houseProperty === "string"){
            houseProperty = newVal.houseProperty;
          } else  if(typeof newVal.houseProperty === "object"){
            houseProperty = JSON.stringify(newVal.houseProperty);
          }
        }
        if(newVal.loan !== oldVal.loan&&newVal.loan !== 'undefined'){
          loan = newVal.loan;
        }
        if(newVal.loanFinish !== oldVal.loanFinish&&newVal.loanFinish !== 'undefined'){
          loanFinish = newVal.loanFinish;
        }

        if(newVal !== oldVal){
          var combine = house + ';' + houseProperty + ';' + loan + ';' + loanFinish;
          console.log(combine);
          sessionStorage.setItem('houseInfo', combine);
        }

        if(sessionStorage.getItem("houseInfo")) {
          var info = sessionStorage.getItem("houseInfo");
          info = info.split(";");
          
          if(info[0] !== 'undefined') {
            if(info[0] === "0" || info[0] === "1" || info[0] === "2"){
              $scope.user.house = parseInt(info[0]);
            } else{
              $scope.user.house = 0;
            }
          }
          if(info[1] !== 'undefined') {
            $scope.user.houseProperty = JSON.parse(info[1]);
          }
          if(info[2] !== 'undefined') {
            if(info[2] === "true"){
              $scope.user.loan = true;
            } else if(info[2] === "false"){
              $scope.user.loan = false;
            }
          }
          if(info[3] !== 'undefined') {
            if(info[3] === "true"){
              $scope.user.loanFinish = true;
            } else if(info[3] === "false"){
              $scope.user.loanFinish = false;
            }
          }
          
        }

        if($scope.user.houseCity.code){
          $scope.houseCityWrapClass = 'valid';
        }
        if($scope.user.houseProperty.name){
          $scope.housePropertyWrapClass = 'valid';
        }

        //初始化下拉框
        $scope.scrollInit();


      }, true);

      var userId = sessionStorage.getItem("userId");

      $scope.loading = true;
      houseService.getModulInfo(userId).then(function (res) {
        if(res.statusText === "OK") {
          if(res.data.status === "0") {

        	  var userDataString = res.data.results[2].label;
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

            if(userData['有无本地房产编码'] === "HAS_OUT_HOUS") {
              $scope.user.house = 2;
            } else if(userData['有无本地房产编码'] === "HAS_LOCAL_HOUSE") {
              $scope.user.house = 1;
            }else{
              $scope.user.house = 0;
            }
            
            $scope.user.houseProperty.label = userData['房产性质'];
            $scope.user.houseProperty.name = userData['房产性质编码'];
            
            if(userData['是否有房贷编码'] === "Y") {
              $scope.user.loan = true;
            } else {
              $scope.user.loan = false;
            }

            if(userData['房贷是否已结清编码'] === "Y") {
              $scope.user.loanFinish = true;
            } else {
              $scope.user.loanFinish = false;
            }
            
            $scope.user.houseCity.name = userData['房产所在城市'];
            $scope.user.houseCity.code = userData['房产所在城市编码'];
            $scope.user.houseCity.area.name = userData['房产所在县区'];
            $scope.user.houseCity.area.code = userData['房产所在县区编码'];
            $scope.user.houseCity.showName = userData['房产所在城市']+' '+userData['房产所在县区'];

            if(sessionStorage.getItem("houseInfo")) {
              var info = sessionStorage.getItem("houseInfo");
              info = info.split(";");
              
              if(info[0] !== 'undefined') {
                if(info[0] === "0" || info[0] === "1" || info[0] === "2"){
                  $scope.user.house = parseInt(info[0]);
                } else{
                  $scope.user.house = 0;
                }
              }
              if(info[1] !== 'undefined') {
                $scope.user.houseProperty = JSON.parse(info[1]);
              }
              if(info[2] !== 'undefined') {
                if(info[2] === "true"){
                  $scope.user.loan = true;
                } else if(info[2] === "false"){
                  $scope.user.loan = false;
                }
              }
              if(info[3] !== 'undefined') {
                if(info[3] === "true"){
                  $scope.user.loanFinish = true;
                } else if(info[3] === "false"){
                  $scope.user.loanFinish = false;
                }
              }
            }

            if(sessionStorage.getItem("house")){
              var data = sessionStorage.getItem("house");
              data = data.split(";");
              $scope.user.houseCity.name = data[0];
              $scope.user.houseCity.code = data[1];
              $scope.user.houseCity.area.name = data[2];
              $scope.user.houseCity.area.code = data[3];
              $scope.user.houseCity.showName = data[0] +' '+ data[3];
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

      $scope.houseSubmit = function(e) {
        e.preventDefault();

        if($scope.user.house) {
          if(!$scope.user.houseCity.code || !$scope.user.houseCity.area.code){
            //new toast({content: '请选择房产所在地信息'});
            $scope.houseCityError = '请选择房产所在地信息';
            $scope.houseCityWrapClass = 'valid error';
            return false;
          }
          if(!$scope.user.houseProperty.label || !$scope.user.houseProperty.name) {
            //new toast({content: '请选择房产性质'});
            $scope.housePropertyError = '请选择房产性质';
            $scope.housePropertyWrapClass = 'valid error';
            return false;
          } 
        }  

        $scope.loading = true;
        houseService.postInfo($scope.user.house, $scope.user.houseCity.code, $scope.user.houseCity.area.code, $scope.user.houseProperty?$scope.user.houseProperty.name:"", $scope.user.loan, $scope.user.loanFinish).then(function (res) {
          if(res.statusText === "OK") {
            if(res.data.status === "0") {
              if(res.data.results.head.status === "0"){

                sessionStorage.removeItem('houseInfo');
                sessionStorage.removeItem('house');
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
        })
        //console.log($scope.user)
      }

  }])

});
