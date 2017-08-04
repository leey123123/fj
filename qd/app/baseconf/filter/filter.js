define(function(){
	return function(app){
		
        app.
            filter('showTextByValue', function() {
                return function(status, data) {
                    var st = '';
                    angular.forEach(data, function(item){
                        if(item.value === status){
                            st = item.text;
                        }
                    });
                    return st;
                };
            }).
            filter('showTime', function() {
                return function(time) {
                    if(""===time||"undefined"===time||" "===time||undefined===time){
                    	return time;
                    }else{
                    	if(time.length>10){
                    		var str= time.substring(0,10);
                    		//alert(str);
                    		return str;
                    	}
                    }
                    return time;
                };
            }).
            filter('showPhd', ['$rootScope',
                function($rootScope) {
                    return function(claimField) {
                        return !claimField && $rootScope.claimReadOnly ? '-- --' : '请输入正确信息';
                    };
                }
            ]).
            filter('showOpt', ['$rootScope',
                function($rootScope) {
                    return function() {
                        return $rootScope.claimReadOnly ? '-- --' : '-- 请选择 --';
                    };
                }
            ]).
            filter('hidePartStr', function(){
            	return function(str, num) {
                    if(str===null){
                    	return "----";
                    }
                    if(str.length<=num){
                    	return str;
                    }
                    var lastStr = str.substring((str.length-num),(str.length));
                    str="***"+lastStr;
                    return str;
                };
            });

    
	};
});