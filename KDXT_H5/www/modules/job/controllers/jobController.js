define([
  "app",
  "modules/job/services/jobService",
  "modules/commonServices/errorService",
  "Android_Toast",
  "modules/core/mobiScroller"
], function(app, jobService, errorService, toast, mobiScroller) {

  app.controller("jobController", 
    ['$scope','$rootScope', '$location', 'jobService', 'errorService',
    function($scope,$rootScope, $location, jobService, errorService) {

    $('body').removeClass('page-index');

    $scope.companyWrapClass = '';
    $scope.companyPropertyWrapClass = '';
    $scope.seniorityWrapClass = '';
    $scope.typeWrapClass = '';
    $scope.incomeWrapClass = '';
    $scope.payTypeWrapClass = '';
    //$scope.jobCityWrapClass = '';
    $scope.moduleNotPass = false;
    $scope.moduleNotPassClass = '';

    $scope.user = {
      company: "",
      companyProperty: "",
      seniority: "",
      type: "",
      income: "",
      payType: ""
      // jobCity: {
      //   code: "",
      //   name: ""
      // },
      // jobArea: {
      //   code: "",
      //   name: ""
      // }
    };

    $scope.companyProperties = [
      {name: 'GOV', label: '政府/事业单位'},
      {name: 'ARMY', label: '军队'},
      {name: 'STATE', label: '国有企业'},
      {name: 'COLLECTIVE', label: '集体企业'},
      {name: 'FOREIGN', label: '外资企业'},
      {name: 'SOLE', label: '独资企业'},
      // {name: 'INDIVIDUAL', label: '个体'},
      {name: 'LLC', label: '有限责任'}
      // {name: 'SHARES', label: '股份公司'}
    ];


    $scope.seniorities = [
      {name: '0_1', label: '不足一年'},
      {name: '1_2', label: '一到两年'},
      {name: '2_3', label: '两到三年'},
      {name: '3_5', label: '三到五年'},
      {name: '5_10', label: '五到十年'},
      {name: '10_', label: '十年以上'}
    ];

    $scope.types = [
      {name: 'GENERAL_STAFF', label: '普通职员'},
      {name: 'MANAGER', label: '管理人员'},
      {name: 'OWNER', label: '企业主'}
    ];

    $scope.incomes = [
      {name: '0_2000', label: '0-2000'},
      {name: '2001_5000', label: '2001-5000'},
      {name: '5001_8000', label: '5001-8000'},
      {name: '8001_15000', label: '8001-15000'},
      {name: '15000_', label: '15000以上'}
    ];

    $scope.payTypes = [
      {name: "BANK", label: "银行代发"},
      {name: "CASH", label: "现金发放"}
    ];

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
      angular.element(document.getElementById('companyProperty')).val($scope.user.companyProperty.label);
      angular.element(document.getElementById('seniority')).val($scope.user.seniority.label);
      angular.element(document.getElementById('type')).val($scope.user.type.label);
      angular.element(document.getElementById('income')).val($scope.user.income.label);
      angular.element(document.getElementById('payType')).val($scope.user.payType.label);
    };


    $scope.$watch('user', function(newVal, oldVal){
      
      var company, companyProperty, seniority, type, income, payType;

      if(typeof newVal.company === "string"&&newVal.company !== 'undefined'){
        if(newVal.company !== oldVal.company) {
          company = newVal.company;
        } else {
          company = oldVal.company;
        }
      }
      if(newVal.companyProperty&&newVal.companyProperty !== 'undefined'){
        if(typeof newVal.companyProperty === "string"){
          companyProperty = newVal.companyProperty;
        } else if(typeof newVal.companyProperty === "object"){
          companyProperty = JSON.stringify(newVal.companyProperty);
        }
      }
      if(newVal.seniority&&newVal.seniority !== 'undefined'){
        if(typeof newVal.seniority === "string"){
          seniority = newVal.seniority;
        } else  if(typeof newVal.seniority === "object"){
          seniority = JSON.stringify(newVal.seniority);
        }
      }
      if(newVal.type&&newVal.type !== 'undefined'){
        if(typeof newVal.type === "string"){
          type = newVal.type;
        } else  if(typeof newVal.type === "object"){
          type = JSON.stringify(newVal.type);
        }
      }

      if(newVal.income&&newVal.income !== 'undefined'){
        if(typeof newVal.income === "string"){
          income = newVal.income;
        } else  if(typeof newVal.income === "object"){
          income = JSON.stringify(newVal.income);
        }
      }

      if(newVal.payType&&newVal.payType !== 'undefined'){
        if(typeof newVal.payType === "string"){
          payType = newVal.payType;
        } else  if(typeof newVal.payType === "object"){
          payType = JSON.stringify(newVal.payType);
        }
      }

      if(newVal.company !== oldVal.company&&typeof newVal.company === "string" || newVal.companyProperty || newVal.seniority || newVal.type || newVal.income || newVal.payType){
        var combine = company + ';' + companyProperty + ';' + seniority + ';' + type + ';' + income + ';' + payType;
        
        sessionStorage.setItem('jobInfo', combine);
      }


      if(sessionStorage.getItem("jobInfo")) {
        var info = sessionStorage.getItem("jobInfo");
        info = info.split(";");
        
        if(info[0] !== 'undefined') {
          $scope.user.company = info[0];
        }
        if(info[1] !== 'undefined') {
          $scope.user.companyProperty = JSON.parse(info[1]);
        }
        if(info[2] !== 'undefined') {
          $scope.user.seniority = JSON.parse(info[2]);
        }
        if(info[3] !== 'undefined') {
          $scope.user.type = JSON.parse(info[3]);
        }
        if(info[4] !== 'undefined') {
          $scope.user.income = JSON.parse(info[4]);
        }
        if(info[5] !== 'undefined') {
          $scope.user.payType = JSON.parse(info[5]);
        }
        
      }

      if($scope.user.company){
        $scope.companyWrapClass = 'valid';
      }
      if($scope.user.companyProperty){
        $scope.companyPropertyWrapClass = 'valid';
      }
      if($scope.user.seniority){
        $scope.seniorityWrapClass = 'valid';
      }
      if($scope.user.type){
        $scope.typeWrapClass = 'valid';
      }
      if($scope.user.income){
        $scope.incomeWrapClass = 'valid';
      }
      if($scope.user.payType){
        $scope.payTypeWrapClass = 'valid';
      }
      // if($scope.user.jobCity.name){
      //   $scope.jobCityWrapClass = 'focus';
      // }

    }, true);

    var userId = sessionStorage.getItem("userId");

    $scope.loading = true;
    jobService.getModulInfo(userId).then(function (res) {
      if(res.statusText === "OK") {
        if(res.data.status === "0") {
          
          
          var userDataString = res.data.results[1].label;
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
          
          $scope.user.company = userData['单位名称'];
          $scope.user.companyProperty = $scope.forEachSelect($scope.companyProperties, userData['单位性质']);
          $scope.user.seniority = $scope.forEachSelect($scope.seniorities, userData['现单位工龄']);
          $scope.user.type = $scope.forEachSelect($scope.types, userData['职位类型']);
          $scope.user.income = $scope.forEachSelect($scope.incomes, userData['月收入']);
          $scope.user.payType = $scope.forEachSelect($scope.payTypes, userData['工资发放方式']);
          // $scope.user.jobCity.name = userData['工作城市'];
          // $scope.user.jobCity.code = userData['工作城市编码'];
          // $scope.user.jobArea.name = userData['工作区域'];
          // $scope.user.jobArea.code = userData['工作区域编码'];

          if(sessionStorage.getItem("jobInfo")) {
            var info = sessionStorage.getItem("jobInfo");
            info = info.split(";");

            if(info[0] !== 'undefined') {
              $scope.user.company = info[0];
            }
            if(info[1] !== 'undefined') {
              $scope.user.companyProperty = JSON.parse(info[1]);
            }
            if(info[2] !== 'undefined') {
              $scope.user.seniority = JSON.parse(info[2]);
            }
            if(info[3] !== 'undefined') {
              $scope.user.type = JSON.parse(info[3]);
            }
            if(info[4] !== 'undefined') {
              $scope.user.income = JSON.parse(info[4]);
            }
            if(info[5] !== 'undefined') {
              $scope.user.payType = JSON.parse(info[5]);
            }
            
          }

          // if(sessionStorage.getItem("job")){
          //   var data = sessionStorage.getItem("job");
          //   data = data.split(";");
          //   $scope.user.jobCity.name = data[0];
          //   $scope.user.jobCity.code = data[1];
          //   $scope.user.jobArea.name = data[2];
          //   $scope.user.jobArea.code = data[3];
          // }
          

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

    $scope.forEachSelect = function(select, data) {
      var i = 0, len = select.length;
      for(i;i<len;i++) {
        if(select[i].label === data) {
          return '{"label":"' + data + '", "name": "' + select[i].name + '"}';
        }
      }
    };

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

    $scope.jobSubmit = function(e) {
      e.preventDefault();
      if(!$scope.user.company) {
        //new toast({content: '请填写工作单位'});
        $scope.companyError = '请填写工作单位';
        $scope.companyWrapClass = 'valid error';
        return false;
      } else if(!$scope.user.companyProperty) {
        //new toast({content: '请选择单位性质'});
        $scope.companyPropertyError = '请选择单位性质';
        $scope.companyPropertyWrapClass = 'valid error';
        return false;
      } else if(!$scope.user.seniority) {
        //new toast({content: '请选择单位工龄'});
        $scope.seniorityError = '请选择单位工龄';
        $scope.seniorityWrapClass = 'valid error';
        return false;
      } else if(!$scope.user.type) {
        //new toast({content: '请选择职务类型龄'});
        $scope.typeError = '请选择职务类型龄';
        $scope.typeWrapClass = 'valid error';
        return false;
      } else if(!$scope.user.income) {
        //new toast({content: '请选择月收入'});
        $scope.incomeError = '请选择月收入';
        $scope.incomeWrapClass = 'valid error';
        return false;
      } else if(!$scope.user.payType) {
        //new toast({content: '请选择工资发放形式'});
        $scope.payTypeError = '请选择工资发放形式';
        $scope.payTypeWrapClass = 'valid error';
        return false;
      }else if($scope.user.payType.name==='CASH'||$scope.user.income.name==='0_2000') {
        //new toast({content: '请选择工资发放形式'});
        //new toast({content: '尊敬的客户，您好！暂未有适合您的贷款产品，欢迎您继续关注我司的其他产品!'});
        $scope.moduleNotPass = true;
        $scope.moduleNotPassClass = 'slideUp';
        return false;
      }



     

      $scope.loading = true;
      jobService.postInfo($scope.user.company, $scope.user.companyProperty.name, $scope.user.seniority.name, $scope.user.type.name, $scope.user.income.name, $scope.user.payType.name).then(function (res) {
        if(res.statusText === "OK") {
          if(res.data.status === "0") {
            if(res.data.results.head.status === "0"){

              sessionStorage.removeItem('jobInfo');
              sessionStorage.removeItem('job');
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
      //console.log($scope.user)
    };

  }]);

});
