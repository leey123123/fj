/**
 * 定义Url地址，包含前端或服务端
 *
 *
 */
define([
    "js/common/constant"
    ],function(
        Constant
    ){
    var prefix = '';
    if(_app.env=="UAT"||_app.env=="PRD"){
        prefix = '/fss/servlet/webcustomer/action/WebCustomerAction?function=';
    }else{
        prefix = '/servlet/webcustomer/action/WebCustomerAction?function=';
    }
    
    
    
    return function (path) {
        return prefix + Constant.url[path]
    }

});