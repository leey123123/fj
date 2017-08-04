define([
	"app",
  "zepto",
  "underscore",
  "modules/index/services/indexService",
  "modules/commonServices/countService",
  "modules/commonServices/vaildService",
  "Android_Toast"
], function(app, $, _, indexService, countService, vaildService, toast) {
	
	app.controller("indexController",
		['$scope', '$rootScope', '$location', 'indexService', 'countService', 'vaildService', 'errorService',
		function($scope, $rootScope, $location, indexService, countService, vaildService, errorService) {

      $('body').addClass('page-index');

			$scope.modal = false;
      $scope.modalClass = '';
			$scope.modalId = false;
			$scope.tally = false;
			$scope.loading = false;
      $scope.phoneError = '请填写正确的手机号码';
			$scope.validCode = "";
      $scope.validCodeError = '请输入验证码';
			$scope.personId = "";
			$scope.idError = '请输入身份证号';
      $scope.submitIdClass = 'disabled';
      $scope.phoneWrapClass = '';
      $scope.validCodeWrapClass = '';
      $scope.userIdWrapClass = '';

			$scope.token = '';

      $rootScope.query = {
        channel1: $location.search().channel1 || "",
        channel2: $location.search().channel2 || "",
        channel3: $location.search().channel3 || "",
        saleTeamId: $location.search().saleTeamId || "",
        saleManagerUserId: $location.search().saleManagerUserId || ""
      };
      if($location.search().channel1){
          sessionStorage.setItem("query",JSON.stringify($rootScope.query));
      }else{
          $rootScope.query=JSON.parse(sessionStorage.getItem('query'));
      }
      
      $scope.inputFocus = function(input,wrap) {
        if(!$scope[input]){
          $scope[wrap] = 'focus';
        }else{
          $scope[wrap] = 'focus hasVal';
        }
      };

      $scope.inputBlur = function(input,wrap) {
        if(!$scope[input]){
          $scope[wrap] = '';
        }else{
          $scope[wrap] = 'valid';
        }
      };

      $scope.inputChange = function(input,wrap) {
        if(!$scope[input]){
          $scope[wrap] = 'focus';
          if(input=='personId'){
            $scope.submitIdClass = 'disabled';
          }
        }else{
          $scope[wrap] = 'focus hasVal';
          if(input=='personId' && $scope.personId.length == 18){
            $scope.submitIdClass = '';
          }
        }
      };

      $scope.inputClear = function(input,wrap) {
        $scope[input] = '';
        $scope[wrap] = '';
      };

			$scope.sendCode = function () {
        if(!$scope.phone){
          $scope.phoneWrapClass = 'valid error';
          return;
        }else{
          $scope.phoneWrapClass = 'valid';
        }
				
				if( vaildService.phone($scope.phone) ) {
					$scope.loading = true;
					indexService.sendCode($scope.phone).then(function (res) {
						if(res.statusText === "OK"){
              //console.log(res)
							if(res.data.results.length === 0){
                new toast({content: res.data.msg.toString()});
                $scope.loading = false;
                return false;
              }

              //console.log(res)

							$scope.token = res.data.results[0].token;

							$scope.loading = false;
							$scope.modal = true;
              $scope.modalClass = 'slideUp';

							$scope.$watch(function(){
								return countService.time;
							}, function (data) {
						    $scope.time = data;
						    if($scope.time <= 0){
						    	$scope.modal = false;
						    	countService.cancel();
						    	countService.set();
						    }
						  }, true);

							countService.start();
							$scope.loading = false;
						} else {
							new toast({content: '服务器异常'});
							$scope.loading = false;
						}
					}, function (err) {
						new toast({content: err.toString()});
						$scope.loading = false;
					});
				} else {
					$scope.phoneWrapClass = 'valid error';
				}
			};

      $scope.closeModal = function () {
        $scope.modal = false;
        $scope.modalClass = '';
        $scope.modalId = false;
        $scope.tally = false;
      };

			$scope.sendPhone = function () {
        if(!$scope.validCode){
          $scope.validCodeError = '请输入验证码';
          $scope.validCodeWrapClass = 'valid error';
          return;
        }else{
          $scope.validCodeWrapClass = 'valid';
        }
				$scope.loading = true;
				indexService.postPhoneNum($scope.phone, $scope.validCode, $scope.token, $rootScope.query.channel1, $rootScope.query.channel2, $rootScope.query.channel3, $rootScope.query.saleTeamId, $rootScope.query.saleManagerUserId).then(function (res) {
					
					var response = errorService.handleError(res, toast);
          
					if(response !== "error") {
						console.log('call 4');
						if(typeof response.customerId !== 'string') {
							new toast({content: '后台系统异常'});
							return false;
						} 

						sessionStorage.setItem('phone', $scope.phone);
						sessionStorage.setItem('userId', response.customerId);

						indexService.postId($scope.phone).then(function (ress) {
							
							var nextResponse = errorService.handleError(ress, toast);
							if(response !== "error") {
								if(ress.data.results.body.hasNotCertId === "Y"){
									$scope.modalId = true;
									$scope.modal = false;
                  $scope.modalClass='';
								} else {
									$location.path('/formNavigation');
								}
							}else{
                $scope.validCodeError = res.data.msg.toString();
                $scope.validCodeWrapClass = 'focus error';
              }

							$scope.loading = false;

						}, function(err){
							new toast({content: '网络异常'});
							$scope.modal = false;
              $scope.modalClass = '';
							$scope.loading = false;
						});

					}else{
            $scope.validCodeError = res.data.msg.toString();
            $scope.validCodeWrapClass = 'valid error';
            $scope.loading = false;
          }

				}, function (err) {
					new toast({content: '网络异常'});
					$scope.modal = false;
          $scope.modalClass = '';
					$scope.loading = false;
				});
			};

			$scope.submitId = function () {
        if($scope.submitIdClass =='disabled'){
          return false;
        }
        if(!$scope.personId){
          $scope.idError = '请输入身份证号';
          $scope.userIdWrapClass = 'valid error';
          $scope.submitIdClass = 'disabled';
        } else if($scope.personId.length != 18){
          $scope.idError = '请输入18位身份证号';
          $scope.userIdWrapClass = 'valid error';
          $scope.submitIdClass = 'disabled';
        } else {
          $scope.userIdWrapClass = 'valid';
          $scope.submitIdClass = '';
        }

				if(vaildService.simpleIDCheck($scope.personId)) {
					$scope.loading = true;
					indexService.getModulInfo().then(function (res) {

						if(res.statusText === "OK") {
        			if(res.data.status === "0") {

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
        				var ID = userData["身份证号"];
        				if(ID === $scope.personId){
        					$scope.modalId = false;
        					$location.path('/formNavigation');
        					sessionStorage.setItem('manid', 'true');
        				} else {
        					$scope.modalId = false;
        					$scope.tally = true;
        					sessionStorage.setItem('manid', 'false');
        				}
        				$scope.loading = false;
        			} else {
        				//new toast({content: res.data.msg.toString()});
                $scope.idError = res.data.msg.toString();
                $scope.userIdWrapClass = 'valid error';
        				$scope.loading = false;
        			}
        		} else {
        			new toast({content: '网络异常'});
        			$scope.loading = false;
        		}

					}, function(err) {
						new toast({content: '服务器异常'});
      			$scope.loading = false;
					})
				} else {
					//$scope.idError = '';
          $scope.idError = '请输入18位身份证号';
          $scope.userIdWrapClass = 'valid error';
          $scope.submitIdClass = 'disabled';
				}
			};

	}]);

});
