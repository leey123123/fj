/*!
 * common模块提供iLoanH5的所有基础功能以及环境初始化
 * @module common
 * @author 周一平 
 * @history 2015-6-10 add
 */
define([
    "js/common/constant",
    "js/common/code",
    "js/common/api",
    "js/common/ui",
    'js/common/utils',
    'js/common/city',
    'js/common/province'
], function(
    Constant,
    Code,
    Api,
    UI,
    Utils,
    City,
    Province
) {

    var C = window.C =  {
        Constant: Constant,
        Code: Code,
        Api: Api,
        UI: UI,
        Utils: Utils,
        City: City,
        Province: Province
    }

    return C;
});
