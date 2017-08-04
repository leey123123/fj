define([
	"app",
  "js/common/common",
	"modules/base/services/baseService",
  "modules/commonServices/errorService",
  "modules/commonServices/vaildService",
  "Android_Toast",
  "modules/core/mobiScroller"
], function(app, C, baseService, errorService, vaildService, toast, mobiScroller) {

	app.controller("baseController", 
    ['$scope', 'baseService', 'errorService', 'vaildService', '$location',
    function($scope, baseService, errorService, vaildService, $location) {

    $('body').removeClass('page-index');
    
		$scope.loading = false;
    $scope.nameWrapClass = '';
    $scope.nameError = '请填写您的真实姓名';
    $scope.userIdWrapClass = '';
    $scope.userIdError = '请填写您的身份证号码';

    $scope.user = {
      name: "",
      id: "",
      marriage: "",
      education: "",
      hukoCity: {
        code: "",
        name: "",
        area: {
          code: "",
          name: ""
        },
        showName: ""
      },
      liveCity: {
        code: "",
        name: "",
        area: {
          code: "",
          name: ""
        },
        showName: ""
      }
    };

    $scope.maritalStatus = [
      {name: "MARRIED", label: '已婚'},
      {name: "UNMARRIED", label: '未婚'},
      {name: "DIVORCE", label: '离婚未再婚'},
      {name: "BEREFT", label: '丧偶'} 
    ];
  
    $scope.educationStatus = [
        // {name: 'NONE',label: '无'},
        {name: 'PRIMARY',label: '小学'},
        {name: 'JUNION_HIGH',label: '初中'},
        {name: 'SENIOR_HIGH',label: '高中'},
        {name: 'JUNION_COLLEGE',label: '专科'},
        {name: 'REGULAR_COLLEGE',label: '本科'},
        {name: 'MASTER',label: '研究生'},
        {name: 'DOCTOR',label: '博士'}
      ];

    $scope.provinces = C.Province;

    $scope.inputFocus = function(input,wrap) {
      if(!$scope.user[input]){
        $scope[wrap] = 'focus';
      }else{
        $scope[wrap] = 'focus hasVal';
      }
    };

    $scope.inputBlur = function(input,wrap) {
      if(!$scope.user[input]){
        $scope[wrap] = '';
      }else{
        $scope[wrap] = 'valid';
      }
    };

    $scope.inputChange = function(input,wrap) {
      if(!$scope.user[input]){
        $scope[wrap] = 'focus';
      }else{
        $scope[wrap] = 'focus hasVal';
      }
    };

    $scope.selectChange = function(input,wrap) {
      if(!$scope.user[input]){
        $scope[wrap] = 'valid';
      }else{
        $scope[wrap] = 'valid hasVal';
      }
    };

    $scope.inputClear = function(input,wrap) {
      $scope.user[input] = '';
      $scope[wrap] = '';
    };

    $scope.$on('scrollInit',function(){
        $scope.scrollInit();
    });

    $scope.scrollInit = function(){
      //初始化婚姻状况|教育程序｜户口所在城市｜现居住城市
      angular.element(document.getElementById('marriage')).val($scope.user.marriage.label);
      angular.element(document.getElementById('education')).val($scope.user.education.label);
      angular.element(document.getElementById('hukoCity')).val($scope.user.hukoCity.showName);
      angular.element(document.getElementById('liveCity')).val($scope.user.liveCity.showName);
    };

    $scope.$watch('user', function(newVal, oldVal){
      
      var name, id, marriage, education;

      if(typeof newVal.name === "string"&&newVal.name !== 'undefined'){
        if(newVal.name !== oldVal.name) {
          name = newVal.name;
        } else {
          name = oldVal.name;
        }
      }
      if(typeof newVal.id === "string"&&newVal.id !== 'undefined'){
        if(newVal.id !== oldVal.id) {
          id = newVal.id;
        } else {
          id = oldVal.id;
        }
      }
      
      if(newVal.marriage&&newVal.marriage !== 'undefined'){
        if(typeof newVal.marriage === "string"){
          marriage = newVal.marriage;
        } else  if(typeof newVal.marriage === "object"){
          marriage = JSON.stringify(newVal.marriage);
        }
      }
      if(newVal.education&&newVal.education !== 'undefined'){
        if(typeof newVal.education === "string"){
          education = newVal.education;
        } else  if(typeof newVal.education === "object"){
          education = JSON.stringify(newVal.education);
        }
      }

      if(newVal.name !== oldVal.name&&typeof newVal.name === "string" || newVal.id !== oldVal.id&&typeof newVal.id === "string" || newVal.marriage || newVal.education){
        var combine = name + ';' + id + ';' + marriage + ';' + education;
        sessionStorage.setItem('baseInfo', combine);
      }


      if(sessionStorage.getItem("baseInfo")) {
        var info = sessionStorage.getItem("baseInfo");
        info = info.split(";");

        if(info[0] !== 'undefined') {
          $scope.user.name = info[0];
        }
        if(info[1] !== 'undefined') {
          $scope.user.id = info[1];
        }
        if(info[2] !== 'undefined') {
          $scope.user.marriage = JSON.parse(info[2]);
        }
        if(info[3] !== 'undefined') {
          $scope.user.education = JSON.parse(info[3]);
        }
        
      }

      if($scope.user.name){
        $scope.nameWrapClass = 'valid';
      }
      if($scope.user.id){
        $scope.userIdWrapClass = 'valid';
      }
      if($scope.user.marriage){
        $scope.marriageWrapClass = 'valid';
      }
      if($scope.user.education){
        $scope.educationWrapClass = 'valid';
      }
      if($scope.user.education){
        $scope.educationWrapClass = 'valid';
      }
      if($scope.user.hukoCity.code){
        $scope.hukoCityWrapClass = 'valid';
      }
      if($scope.user.liveCity.code){
        $scope.liveCityWrapClass = 'valid';
      }
      //初始化下拉框
      $scope.scrollInit();

    }, true);

    var userId = sessionStorage.getItem("userId");

    $scope.loading = true;
    baseService.getModulInfo(userId).then(function (res) {
      if(res.statusText === "OK") {
        if(res.data.status === "0") {
          //var json1=eval("{ss:'dd',ww:'dd'}");
          var userDataString = res.data.results[0].label;
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
          $scope.user.name = userData['客户姓名'];
          //$scope.user.marriage =  userData['婚姻状况'];
          //$scope.user.education = userData['教育程度'];

          if(userData['婚姻状况'] === "已婚") {
            $scope.user.marriage = '{"label":"' + userData['婚姻状况'] + '", "name": "MARRIED"}';
          } else if(userData['婚姻状况'] === "未婚") {
            $scope.user.marriage = '{"label":"' + userData['婚姻状况'] + '", "name": "UNMARRIED"}';
          } else if(userData['婚姻状况'] === "离婚未再婚") {
            $scope.user.marriage = '{"label":"' + userData['婚姻状况'] + '", "name": "DIVORCE"}';
          }else if(userData['婚姻状况'] === "丧偶") {
            $scope.user.marriage = '{"label":"' + userData['婚姻状况'] + '", "name": "BEREFT"}';
          }
          
          if(userData['教育程度'] === "无") {
            $scope.user.education = '{"label":"' + userData['教育程度'] + '", "name": "NONE"}';
          } else if(userData['教育程度'] === "小学") {
            $scope.user.education = '{"label":"' + userData['教育程度'] + '", "name": "PRIMARY"}';
          } else if(userData['教育程度'] === "初中") {
            $scope.user.education = '{"label":"' + userData['教育程度'] + '", "name": "JUNION_HIGH"}';
          } else if(userData['教育程度'] === "高中") {
            $scope.user.education = '{"label":"' + userData['教育程度'] + '", "name": "SENIOR_HIGH"}';
          } else if(userData['教育程度'] === "专科") {
            $scope.user.education = '{"label":"' + userData['教育程度'] + '", "name": "JUNION_COLLEGE"}';
          } else if(userData['教育程度'] === "本科") {
            $scope.user.education = '{"label":"' + userData['教育程度'] + '", "name": "REGULAR_COLLEGE"}';
          } else if(userData['教育程度'] === "硕士") {
            $scope.user.education = '{"label":"' + userData['教育程度'] + '", "name": "MASTER"}';
          } else if(userData['教育程度'] === "博士") {
            $scope.user.education = '{"label":"' + userData['教育程度'] + '", "name": "DOCTOR"}';
          }

          $scope.user.id = userData['身份证号'];
          $scope.user.hukoCity.name = userData['户口所在城市'];
          $scope.user.hukoCity.code = userData['户口所在城市编码'];
          $scope.user.hukoCity.area.name = userData['户口所在区域'];
          $scope.user.hukoCity.area.code = userData['户口所在区域编码'];
          $scope.user.hukoCity.showName = userData['户口所在城市']+' '+ userData['户口所在区域'];
          $scope.user.liveCity.name = userData['现居住城市'];
          $scope.user.liveCity.code = userData['现居住城市编码'];
          $scope.user.liveCity.area.name = userData['现居住区域'];
          $scope.user.liveCity.area.code = userData['现居住区域编码'];
          $scope.user.liveCity.showName = userData['现居住城市']+' '+ userData['现居住区域'];

          if(sessionStorage.getItem("baseInfo")) {
            var info = sessionStorage.getItem("baseInfo");
            console.log(info);
            info = info.split(";");

            if(info[0] !== 'undefined') {
              $scope.user.name = info[0];
            }
            if(info[1] !== 'undefined') {
              $scope.user.id = info[1];
            }
            if(info[2] !== 'undefined') {
              $scope.user.marriage = JSON.parse(info[2]);
            }
            if(info[3] !== 'undefined') {
              $scope.user.education = JSON.parse(info[3]);
            }
            
          }

          if(sessionStorage.getItem("baseHuko")){
            var data = sessionStorage.getItem("baseHuko");
            console.log('hukoCity='+data);
            data = data.split(";");
            $scope.user.hukoCity.name = data[0];
            $scope.user.hukoCity.code = data[1];
            $scope.user.hukoCity.area.name = data[2];
            $scope.user.hukoCity.area.code = data[3];
          }
          if(sessionStorage.getItem("baseLive")){
            var data = sessionStorage.getItem("baseLive");
            data = data.split(";");
            $scope.user.liveCity.name = data[0];
            $scope.user.liveCity.code = data[1];
            $scope.user.liveCity.area.name = data[2];
            $scope.user.liveCity.area.code = data[3];
          }

        } else {
          new toast({content: res.data.msg.toString()});
        }
      } else {
        new toast({content: '网络异常'});
      }
      $scope.loading = false;
    }, function(err) {
      new toast({content: '网络异常'});
      $scope.loading = false;
    });

    $scope.submitData = function(e) {
      e.preventDefault();

      if(!vaildService.isChinese($scope.user.name)) {
        //new toast({content: '请填写正确的中文姓名'});
        $scope.nameError = '请填写正确的中文姓名';
        $scope.nameWrapClass = "valid error";
        return false;

      } else if(!vaildService.simpleIDCheck($scope.user.id)){
        //new toast({content: '请填写正确的身份证号码'});
        $scope.userIdError = '请填写正确的身份证号码';
        $scope.userIdWrapClass = 'valid error';
        return false;

      } else if(!$scope.user.marriage){
        //new toast({content: '请选择婚姻状况'});
        $scope.marriageError = '请选择婚姻状况';
        $scope.marriageWrapClass = 'valid error';
        return false;

      } else if(!$scope.user.education){
        //new toast({content: '请选择教育程度'});
        $scope.educationError = '请选择教育程度';
        $scope.educationWrapClass = 'valid error';
        return false;

      } else if(!$scope.user.hukoCity.code){
        //new toast({content: '请选择户口所在地'});
        $scope.hukoCityError = '请选择户口所在地';
        $scope.hukoCityWrapClass = 'valid error';
        return false;

      } else if(!$scope.user.liveCity.code){
        //new toast({content: '请选择现居住地'});
        $scope.liveCityError = '请选择现居住地';
        $scope.liveCityWrapClass = 'valid error';
        return false;
      }

      $scope.loading = true;
      baseService.postInfo($scope.user.name, $scope.user.id, $scope.user.hukoCity.code, $scope.user.hukoCity.area.code, $scope.user.liveCity.code, $scope.user.liveCity.area.code, $scope.user.marriage.name, $scope.user.education.name).then(function (res) {
        
        if(res.statusText === "OK") {
          if(res.data.status === "0") {
            if(res.data.results.head.status === "0"){


              sessionStorage.removeItem('baseHuko');
              sessionStorage.removeItem('baseLive');
              sessionStorage.removeItem('baseInfo');
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
        new toast({content: '网络异常'});
        $scope.loading = false;
      });

    };

	}]);

});
