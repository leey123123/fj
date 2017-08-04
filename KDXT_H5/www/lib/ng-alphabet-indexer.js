define([
    "angular",
    "zepto"
],function(angular, $){
/**
 * ngAlphabetIndexer: AlphabetIndexer for mobile development with AngularJS
 *
 * @author Matthieu COLLE
 * @url https://github.com/raiseandfall/ng-alphabet-indexer
 */

/**
 * @ngdoc module
 * @name ngAlphabetIndexer
 * @description ngAlphabetIndexer: AlphabetIndexer for mobile development with AngularJS
 * @example
   <doc:example>
     <doc:source>
        <script>
        var app = angular.module('myApp', ['ngAlphabetIndexer']);
        app.controller('MyCtrl', function($scope) {

        });
        </script>
        <alphabet-indexer></alphabet-indexer>
     </doc:source>
   </doc:example>
 */

var app = angular.module('ngAlphabetIndexer', []);
/**
 * ngAlphabetIndexer: AlphabetIndexer for mobile development with AngularJS
 *
 * @author Matthieu COLLE
 * @url https://github.com/raiseandfall/ng-alphabet-indexer
 */

/**
 * @ngdoc object
 * @name ngAlphabetIndexer.directive:ngAlphabetIndexer.ngAlphabetIndexerController
 *
 * @description
 * Each {@link ngAlphabetIndexer.directive:ngAlphabetIndexer ngAlphabetIndexer} directive creates an instance of `ngAlphabetIndexerController`
 */

var ngAlphabetIndexerController = [
  '$scope',
  '$rootScope',
  '$log',
  '$compile',
  '$element',
  '$document',
  '$location', 
  '$anchorScroll',
  function($scope, $rootScope, $log, $compile, $elmt, $document, $location, $anchorScroll) {

    'use strict';

    $scope.city = [
    {
C0: "79",
DICT_ENTRY_CODE: "310100",
DICT_ENTRY_NAME: "上海市",
DICT_ENTRY_PINYIN: "SB",
DICT_CHILDREN: [
{
C0: "63",
DICT_ENTRY_CODE: "310120",
DICT_ENTRY_NAME: "奉贤区",
P_DICT_ENTRY_CODE: "310100",
P_DICT_ENTRY_NAME: "上海市"
},
{
C0: "155",
DICT_ENTRY_CODE: "310115",
DICT_ENTRY_NAME: "浦东新区",
P_DICT_ENTRY_CODE: "310100",
P_DICT_ENTRY_NAME: "上海市"
},
{
C0: "489",
DICT_ENTRY_CODE: "310104",
DICT_ENTRY_NAME: "徐汇区",
P_DICT_ENTRY_CODE: "310100",
P_DICT_ENTRY_NAME: "上海市"
},
{
C0: "928",
DICT_ENTRY_CODE: "310105",
DICT_ENTRY_NAME: "长宁区",
P_DICT_ENTRY_CODE: "310100",
P_DICT_ENTRY_NAME: "上海市"
},
{
C0: "1201",
DICT_ENTRY_CODE: "310112",
DICT_ENTRY_NAME: "闵行区",
P_DICT_ENTRY_CODE: "310100",
P_DICT_ENTRY_NAME: "上海市"
},
{
C0: "1213",
DICT_ENTRY_CODE: "310113",
DICT_ENTRY_NAME: "宝山区",
P_DICT_ENTRY_CODE: "310100",
P_DICT_ENTRY_NAME: "上海市"
},
{
C0: "1357",
DICT_ENTRY_CODE: "310101",
DICT_ENTRY_NAME: "黄浦区",
P_DICT_ENTRY_CODE: "310100",
P_DICT_ENTRY_NAME: "上海市"
},
{
C0: "1358",
DICT_ENTRY_CODE: "310118",
DICT_ENTRY_NAME: "青浦区",
P_DICT_ENTRY_CODE: "310100",
P_DICT_ENTRY_NAME: "上海市"
},
{
C0: "1639",
DICT_ENTRY_CODE: "310108",
DICT_ENTRY_NAME: "闸北区",
P_DICT_ENTRY_CODE: "310100",
P_DICT_ENTRY_NAME: "上海市"
},
{
C0: "1738",
DICT_ENTRY_CODE: "310106",
DICT_ENTRY_NAME: "静安区",
P_DICT_ENTRY_CODE: "310100",
P_DICT_ENTRY_NAME: "上海市"
},
{
C0: "1739",
DICT_ENTRY_CODE: "310109",
DICT_ENTRY_NAME: "虹口区",
P_DICT_ENTRY_CODE: "310100",
P_DICT_ENTRY_NAME: "上海市"
},
{
C0: "1740",
DICT_ENTRY_CODE: "310110",
DICT_ENTRY_NAME: "杨浦区",
P_DICT_ENTRY_CODE: "310100",
P_DICT_ENTRY_NAME: "上海市"
},
{
C0: "1750",
DICT_ENTRY_CODE: "310114",
DICT_ENTRY_NAME: "嘉定区",
P_DICT_ENTRY_CODE: "310100",
P_DICT_ENTRY_NAME: "上海市"
},
{
C0: "2143",
DICT_ENTRY_CODE: "310230",
DICT_ENTRY_NAME: "崇明县",
P_DICT_ENTRY_CODE: "310100",
P_DICT_ENTRY_NAME: "上海市"
},
{
C0: "2524",
DICT_ENTRY_CODE: "310117",
DICT_ENTRY_NAME: "松江区",
P_DICT_ENTRY_CODE: "310100",
P_DICT_ENTRY_NAME: "上海市"
},
{
C0: "2641",
DICT_ENTRY_CODE: "310116",
DICT_ENTRY_NAME: "金山区",
P_DICT_ENTRY_CODE: "310100",
P_DICT_ENTRY_NAME: "上海市"
},
{
C0: "2727",
DICT_ENTRY_CODE: "310107",
DICT_ENTRY_NAME: "普陀区",
P_DICT_ENTRY_CODE: "310100",
P_DICT_ENTRY_NAME: "上海市"
}
]
},
    {
C0: "56",
DICT_ENTRY_CODE: "110100",
DICT_ENTRY_NAME: "北京市",
DICT_ENTRY_PINYIN: "BB",
DICT_CHILDREN: [
{
C0: "87",
DICT_ENTRY_CODE: "110112",
DICT_ENTRY_NAME: "通州区",
P_DICT_ENTRY_CODE: "110100",
P_DICT_ENTRY_NAME: "北京市"
},
{
C0: "88",
DICT_ENTRY_CODE: "110114",
DICT_ENTRY_NAME: "昌平区",
P_DICT_ENTRY_CODE: "110100",
P_DICT_ENTRY_NAME: "北京市"
},
{
C0: "490",
DICT_ENTRY_CODE: "110116",
DICT_ENTRY_NAME: "怀柔区",
P_DICT_ENTRY_CODE: "110100",
P_DICT_ENTRY_NAME: "北京市"
},
{
C0: "537",
DICT_ENTRY_CODE: "110101",
DICT_ENTRY_NAME: "东城区",
P_DICT_ENTRY_CODE: "110100",
P_DICT_ENTRY_NAME: "北京市"
},
{
C0: "538",
DICT_ENTRY_CODE: "110108",
DICT_ENTRY_NAME: "海淀区",
P_DICT_ENTRY_CODE: "110100",
P_DICT_ENTRY_NAME: "北京市"
},
{
C0: "869",
DICT_ENTRY_CODE: "110102",
DICT_ENTRY_NAME: "西城区",
P_DICT_ENTRY_CODE: "110100",
P_DICT_ENTRY_NAME: "北京市"
},
{
C0: "870",
DICT_ENTRY_CODE: "110111",
DICT_ENTRY_NAME: "房山区",
P_DICT_ENTRY_CODE: "110100",
P_DICT_ENTRY_NAME: "北京市"
},
{
C0: "871",
DICT_ENTRY_CODE: "110115",
DICT_ENTRY_NAME: "大兴区",
P_DICT_ENTRY_CODE: "110100",
P_DICT_ENTRY_NAME: "北京市"
},
{
C0: "1592",
DICT_ENTRY_CODE: "110109",
DICT_ENTRY_NAME: "门头沟区",
P_DICT_ENTRY_CODE: "110100",
P_DICT_ENTRY_NAME: "北京市"
},
{
C0: "1641",
DICT_ENTRY_CODE: "110229",
DICT_ENTRY_NAME: "延庆县",
P_DICT_ENTRY_CODE: "110100",
P_DICT_ENTRY_NAME: "北京市"
},
{
C0: "1686",
DICT_ENTRY_CODE: "110113",
DICT_ENTRY_NAME: "顺义区",
P_DICT_ENTRY_CODE: "110100",
P_DICT_ENTRY_NAME: "北京市"
},
{
C0: "1902",
DICT_ENTRY_CODE: "110228",
DICT_ENTRY_NAME: "密云县",
P_DICT_ENTRY_CODE: "110100",
P_DICT_ENTRY_NAME: "北京市"
},
{
C0: "2399",
DICT_ENTRY_CODE: "110117",
DICT_ENTRY_NAME: "平谷区",
P_DICT_ENTRY_CODE: "110100",
P_DICT_ENTRY_NAME: "北京市"
},
{
C0: "2438",
DICT_ENTRY_CODE: "110105",
DICT_ENTRY_NAME: "朝阳区",
P_DICT_ENTRY_CODE: "110100",
P_DICT_ENTRY_NAME: "北京市"
},
{
C0: "2820",
DICT_ENTRY_CODE: "110106",
DICT_ENTRY_NAME: "丰台区",
P_DICT_ENTRY_CODE: "110100",
P_DICT_ENTRY_NAME: "北京市"
},
{
C0: "3083",
DICT_ENTRY_CODE: "110107",
DICT_ENTRY_NAME: "石景山区",
P_DICT_ENTRY_CODE: "110100",
P_DICT_ENTRY_NAME: "北京市"
}
]
},
    {
C0: "226",
DICT_ENTRY_CODE: "510100",
DICT_ENTRY_NAME: "成都市",
DICT_ENTRY_PINYIN: "CB",
DICT_CHILDREN: [
{
C0: "3",
DICT_ENTRY_CODE: "510105",
DICT_ENTRY_NAME: "青羊区",
P_DICT_ENTRY_CODE: "510100",
P_DICT_ENTRY_NAME: "成都市"
},
{
C0: "4",
DICT_ENTRY_CODE: "510129",
DICT_ENTRY_NAME: "大邑县",
P_DICT_ENTRY_CODE: "510100",
P_DICT_ENTRY_NAME: "成都市"
},
{
C0: "237",
DICT_ENTRY_CODE: "510182",
DICT_ENTRY_NAME: "彭州市",
P_DICT_ENTRY_CODE: "510100",
P_DICT_ENTRY_NAME: "成都市"
},
{
C0: "324",
DICT_ENTRY_CODE: "510181",
DICT_ENTRY_NAME: "都江堰市",
P_DICT_ENTRY_CODE: "510100",
P_DICT_ENTRY_NAME: "成都市"
},
{
C0: "388",
DICT_ENTRY_CODE: "510101",
DICT_ENTRY_NAME: "成都市",
P_DICT_ENTRY_CODE: "510100",
P_DICT_ENTRY_NAME: "成都市"
},
{
C0: "389",
DICT_ENTRY_CODE: "510115",
DICT_ENTRY_NAME: "温江区",
P_DICT_ENTRY_CODE: "510100",
P_DICT_ENTRY_NAME: "成都市"
},
{
C0: "749",
DICT_ENTRY_CODE: "510104",
DICT_ENTRY_NAME: "锦江区",
P_DICT_ENTRY_CODE: "510100",
P_DICT_ENTRY_NAME: "成都市"
},
{
C0: "991",
DICT_ENTRY_CODE: "510124",
DICT_ENTRY_NAME: "郫县",
P_DICT_ENTRY_CODE: "510100",
P_DICT_ENTRY_NAME: "成都市"
},
{
C0: "1069",
DICT_ENTRY_CODE: "510122",
DICT_ENTRY_NAME: "双流县",
P_DICT_ENTRY_CODE: "510100",
P_DICT_ENTRY_NAME: "成都市"
},
{
C0: "1140",
DICT_ENTRY_CODE: "510108",
DICT_ENTRY_NAME: "成华区",
P_DICT_ENTRY_CODE: "510100",
P_DICT_ENTRY_NAME: "成都市"
},
{
C0: "1141",
DICT_ENTRY_CODE: "510131",
DICT_ENTRY_NAME: "蒲江县",
P_DICT_ENTRY_CODE: "510100",
P_DICT_ENTRY_NAME: "成都市"
},
{
C0: "1142",
DICT_ENTRY_CODE: "510184",
DICT_ENTRY_NAME: "崇州市",
P_DICT_ENTRY_CODE: "510100",
P_DICT_ENTRY_NAME: "成都市"
},
{
C0: "1503",
DICT_ENTRY_CODE: "510132",
DICT_ENTRY_NAME: "新津县",
P_DICT_ENTRY_CODE: "510100",
P_DICT_ENTRY_NAME: "成都市"
},
{
C0: "1532",
DICT_ENTRY_CODE: "510106",
DICT_ENTRY_NAME: "金牛区",
P_DICT_ENTRY_CODE: "510100",
P_DICT_ENTRY_NAME: "成都市"
},
{
C0: "2082",
DICT_ENTRY_CODE: "510183",
DICT_ENTRY_NAME: "邛崃市",
P_DICT_ENTRY_CODE: "510100",
P_DICT_ENTRY_NAME: "成都市"
},
{
C0: "2709",
DICT_ENTRY_CODE: "510114",
DICT_ENTRY_NAME: "新都区",
P_DICT_ENTRY_CODE: "510100",
P_DICT_ENTRY_NAME: "成都市"
},
{
C0: "2738",
DICT_ENTRY_CODE: "510113",
DICT_ENTRY_NAME: "青白江区",
P_DICT_ENTRY_CODE: "510100",
P_DICT_ENTRY_NAME: "成都市"
},
{
C0: "2739",
DICT_ENTRY_CODE: "510121",
DICT_ENTRY_NAME: "金堂县",
P_DICT_ENTRY_CODE: "510100",
P_DICT_ENTRY_NAME: "成都市"
},
{
C0: "2990",
DICT_ENTRY_CODE: "510107",
DICT_ENTRY_NAME: "武侯区",
P_DICT_ENTRY_CODE: "510100",
P_DICT_ENTRY_NAME: "成都市"
},
{
C0: "3068",
DICT_ENTRY_CODE: "510112",
DICT_ENTRY_NAME: "龙泉驿区",
P_DICT_ENTRY_CODE: "510100",
P_DICT_ENTRY_NAME: "成都市"
}
]
},
    {
C0: "204",
DICT_ENTRY_CODE: "440100",
DICT_ENTRY_NAME: "广州市",
DICT_ENTRY_PINYIN: "GB",
DICT_CHILDREN: [
{
C0: "628",
DICT_ENTRY_CODE: "440115",
DICT_ENTRY_NAME: "南沙区",
P_DICT_ENTRY_CODE: "440100",
P_DICT_ENTRY_NAME: "广州市"
},
{
C0: "970",
DICT_ENTRY_CODE: "440106",
DICT_ENTRY_NAME: "天河区",
P_DICT_ENTRY_CODE: "440100",
P_DICT_ENTRY_NAME: "广州市"
},
{
C0: "1347",
DICT_ENTRY_CODE: "440103",
DICT_ENTRY_NAME: "荔湾区",
P_DICT_ENTRY_CODE: "440100",
P_DICT_ENTRY_NAME: "广州市"
},
{
C0: "1448",
DICT_ENTRY_CODE: "440113",
DICT_ENTRY_NAME: "番禺区",
P_DICT_ENTRY_CODE: "440100",
P_DICT_ENTRY_NAME: "广州市"
},
{
C0: "1621",
DICT_ENTRY_CODE: "440101",
DICT_ENTRY_NAME: "广州市",
P_DICT_ENTRY_CODE: "440100",
P_DICT_ENTRY_NAME: "广州市"
},
{
C0: "1871",
DICT_ENTRY_CODE: "440117",
DICT_ENTRY_NAME: "从化区",
P_DICT_ENTRY_CODE: "440100",
P_DICT_ENTRY_NAME: "广州市"
},
{
C0: "2200",
DICT_ENTRY_CODE: "440112",
DICT_ENTRY_NAME: "黄埔区",
P_DICT_ENTRY_CODE: "440100",
P_DICT_ENTRY_NAME: "广州市"
},
{
C0: "2317",
DICT_ENTRY_CODE: "440111",
DICT_ENTRY_NAME: "白云区",
P_DICT_ENTRY_CODE: "440100",
P_DICT_ENTRY_NAME: "广州市"
},
{
C0: "2425",
DICT_ENTRY_CODE: "440114",
DICT_ENTRY_NAME: "花都区",
P_DICT_ENTRY_CODE: "440100",
P_DICT_ENTRY_NAME: "广州市"
},
{
C0: "2664",
DICT_ENTRY_CODE: "440104",
DICT_ENTRY_NAME: "越秀区",
P_DICT_ENTRY_CODE: "440100",
P_DICT_ENTRY_NAME: "广州市"
},
{
C0: "2958",
DICT_ENTRY_CODE: "440105",
DICT_ENTRY_NAME: "海珠区",
P_DICT_ENTRY_CODE: "440100",
P_DICT_ENTRY_NAME: "广州市"
},
{
C0: "2959",
DICT_ENTRY_CODE: "440116",
DICT_ENTRY_NAME: "萝岗区",
P_DICT_ENTRY_CODE: "440100",
P_DICT_ENTRY_NAME: "广州市"
},
{
C0: "2960",
DICT_ENTRY_CODE: "440118",
DICT_ENTRY_NAME: "增城区",
P_DICT_ENTRY_CODE: "440100",
P_DICT_ENTRY_NAME: "广州市"
}
]
},
    {
C0: "166",
DICT_ENTRY_CODE: "330100",
DICT_ENTRY_NAME: "杭州市",
DICT_ENTRY_PINYIN: "HB",
DICT_CHILDREN: [
{
C0: "595",
DICT_ENTRY_CODE: "330122",
DICT_ENTRY_NAME: "桐庐县",
P_DICT_ENTRY_CODE: "330100",
P_DICT_ENTRY_NAME: "杭州市"
},
{
C0: "640",
DICT_ENTRY_CODE: "330105",
DICT_ENTRY_NAME: "拱墅区",
P_DICT_ENTRY_CODE: "330100",
P_DICT_ENTRY_NAME: "杭州市"
},
{
C0: "1360",
DICT_ENTRY_CODE: "330183",
DICT_ENTRY_NAME: "富阳市",
P_DICT_ENTRY_CODE: "330100",
P_DICT_ENTRY_NAME: "杭州市"
},
{
C0: "1747",
DICT_ENTRY_CODE: "330109",
DICT_ENTRY_NAME: "萧山区",
P_DICT_ENTRY_CODE: "330100",
P_DICT_ENTRY_NAME: "杭州市"
},
{
C0: "1748",
DICT_ENTRY_CODE: "330127",
DICT_ENTRY_NAME: "淳安县",
P_DICT_ENTRY_CODE: "330100",
P_DICT_ENTRY_NAME: "杭州市"
},
{
C0: "1749",
DICT_ENTRY_CODE: "330185",
DICT_ENTRY_NAME: "临安市",
P_DICT_ENTRY_CODE: "330100",
P_DICT_ENTRY_NAME: "杭州市"
},
{
C0: "1852",
DICT_ENTRY_CODE: "330103",
DICT_ENTRY_NAME: "下城区",
P_DICT_ENTRY_CODE: "330100",
P_DICT_ENTRY_NAME: "杭州市"
},
{
C0: "2151",
DICT_ENTRY_CODE: "330104",
DICT_ENTRY_NAME: "江干区",
P_DICT_ENTRY_CODE: "330100",
P_DICT_ENTRY_NAME: "杭州市"
},
{
C0: "2152",
DICT_ENTRY_CODE: "330106",
DICT_ENTRY_NAME: "西湖区",
P_DICT_ENTRY_CODE: "330100",
P_DICT_ENTRY_NAME: "杭州市"
},
{
C0: "2261",
DICT_ENTRY_CODE: "330108",
DICT_ENTRY_NAME: "滨江区",
P_DICT_ENTRY_CODE: "330100",
P_DICT_ENTRY_NAME: "杭州市"
},
{
C0: "2406",
DICT_ENTRY_CODE: "330102",
DICT_ENTRY_NAME: "上城区",
P_DICT_ENTRY_CODE: "330100",
P_DICT_ENTRY_NAME: "杭州市"
},
{
C0: "2407",
DICT_ENTRY_CODE: "330110",
DICT_ENTRY_NAME: "余杭区",
P_DICT_ENTRY_CODE: "330100",
P_DICT_ENTRY_NAME: "杭州市"
},
{
C0: "2534",
DICT_ENTRY_CODE: "330101",
DICT_ENTRY_NAME: "杭州市",
P_DICT_ENTRY_CODE: "330100",
P_DICT_ENTRY_NAME: "杭州市"
},
{
C0: "3038",
DICT_ENTRY_CODE: "330182",
DICT_ENTRY_NAME: "建德市",
P_DICT_ENTRY_CODE: "330100",
P_DICT_ENTRY_NAME: "杭州市"
}
]
},
    {
C0: "160",
DICT_ENTRY_CODE: "320100",
DICT_ENTRY_NAME: "南京市",
DICT_ENTRY_PINYIN: "NB",
DICT_CHILDREN: [
{
C0: "64",
DICT_ENTRY_CODE: "320105",
DICT_ENTRY_NAME: "建邺区",
P_DICT_ENTRY_CODE: "320100",
P_DICT_ENTRY_NAME: "南京市"
},
{
C0: "156",
DICT_ENTRY_CODE: "320111",
DICT_ENTRY_NAME: "浦口区",
P_DICT_ENTRY_CODE: "320100",
P_DICT_ENTRY_NAME: "南京市"
},
{
C0: "157",
DICT_ENTRY_CODE: "320114",
DICT_ENTRY_NAME: "雨花台区",
P_DICT_ENTRY_CODE: "320100",
P_DICT_ENTRY_NAME: "南京市"
},
{
C0: "158",
DICT_ENTRY_CODE: "320117",
DICT_ENTRY_NAME: "溧水区",
P_DICT_ENTRY_CODE: "320100",
P_DICT_ENTRY_NAME: "南京市"
},
{
C0: "457",
DICT_ENTRY_CODE: "320118",
DICT_ENTRY_NAME: "高淳区",
P_DICT_ENTRY_CODE: "320100",
P_DICT_ENTRY_NAME: "南京市"
},
{
C0: "588",
DICT_ENTRY_CODE: "320115",
DICT_ENTRY_NAME: "江宁区",
P_DICT_ENTRY_CODE: "320100",
P_DICT_ENTRY_NAME: "南京市"
},
{
C0: "1741",
DICT_ENTRY_CODE: "320102",
DICT_ENTRY_NAME: "玄武区",
P_DICT_ENTRY_CODE: "320100",
P_DICT_ENTRY_NAME: "南京市"
},
{
C0: "1795",
DICT_ENTRY_CODE: "320113",
DICT_ENTRY_NAME: "栖霞区",
P_DICT_ENTRY_CODE: "320100",
P_DICT_ENTRY_NAME: "南京市"
},
{
C0: "1847",
DICT_ENTRY_CODE: "320106",
DICT_ENTRY_NAME: "鼓楼区",
P_DICT_ENTRY_CODE: "320100",
P_DICT_ENTRY_NAME: "南京市"
},
{
C0: "1848",
DICT_ENTRY_CODE: "320116",
DICT_ENTRY_NAME: "六合区",
P_DICT_ENTRY_CODE: "320100",
P_DICT_ENTRY_NAME: "南京市"
},
{
C0: "2257",
DICT_ENTRY_CODE: "320101",
DICT_ENTRY_NAME: "南京市",
P_DICT_ENTRY_CODE: "320100",
P_DICT_ENTRY_NAME: "南京市"
},
{
C0: "2911",
DICT_ENTRY_CODE: "320104",
DICT_ENTRY_NAME: "秦淮区",
P_DICT_ENTRY_CODE: "320100",
P_DICT_ENTRY_NAME: "南京市"
}
]
},
    {
C0: "254",
DICT_ENTRY_CODE: "120100",
DICT_ENTRY_NAME: "天津市",
DICT_ENTRY_PINYIN: "TB",
DICT_CHILDREN: [
{
C0: "491",
DICT_ENTRY_CODE: "120110",
DICT_ENTRY_NAME: "东丽区",
P_DICT_ENTRY_CODE: "120100",
P_DICT_ENTRY_NAME: "天津市"
},
{
C0: "492",
DICT_ENTRY_CODE: "120113",
DICT_ENTRY_NAME: "北辰区",
P_DICT_ENTRY_CODE: "120100",
P_DICT_ENTRY_NAME: "天津市"
},
{
C0: "493",
DICT_ENTRY_CODE: "120115",
DICT_ENTRY_NAME: "宝坻区",
P_DICT_ENTRY_CODE: "120100",
P_DICT_ENTRY_NAME: "天津市"
},
{
C0: "732",
DICT_ENTRY_CODE: "120106",
DICT_ENTRY_NAME: "红桥区",
P_DICT_ENTRY_CODE: "120100",
P_DICT_ENTRY_NAME: "天津市"
},
{
C0: "827",
DICT_ENTRY_CODE: "120111",
DICT_ENTRY_NAME: "西青区",
P_DICT_ENTRY_CODE: "120100",
P_DICT_ENTRY_NAME: "天津市"
},
{
C0: "1202",
DICT_ENTRY_CODE: "120221",
DICT_ENTRY_NAME: "宁河县",
P_DICT_ENTRY_CODE: "120100",
P_DICT_ENTRY_NAME: "天津市"
},
{
C0: "1903",
DICT_ENTRY_CODE: "120223",
DICT_ENTRY_NAME: "静海县",
P_DICT_ENTRY_CODE: "120100",
P_DICT_ENTRY_NAME: "天津市"
},
{
C0: "2056",
DICT_ENTRY_CODE: "120101",
DICT_ENTRY_NAME: "和平区",
P_DICT_ENTRY_CODE: "120100",
P_DICT_ENTRY_NAME: "天津市"
},
{
C0: "2057",
DICT_ENTRY_CODE: "120225",
DICT_ENTRY_NAME: "蓟县",
P_DICT_ENTRY_CODE: "120100",
P_DICT_ENTRY_NAME: "天津市"
},
{
C0: "2095",
DICT_ENTRY_CODE: "120104",
DICT_ENTRY_NAME: "南开区",
P_DICT_ENTRY_CODE: "120100",
P_DICT_ENTRY_NAME: "天津市"
},
{
C0: "2096",
DICT_ENTRY_CODE: "120116",
DICT_ENTRY_NAME: "滨海新区",
P_DICT_ENTRY_CODE: "120100",
P_DICT_ENTRY_NAME: "天津市"
},
{
C0: "2400",
DICT_ENTRY_CODE: "120102",
DICT_ENTRY_NAME: "河东区",
P_DICT_ENTRY_CODE: "120100",
P_DICT_ENTRY_NAME: "天津市"
},
{
C0: "2439",
DICT_ENTRY_CODE: "120114",
DICT_ENTRY_NAME: "武清区",
P_DICT_ENTRY_CODE: "120100",
P_DICT_ENTRY_NAME: "天津市"
},
{
C0: "2821",
DICT_ENTRY_CODE: "120103",
DICT_ENTRY_NAME: "河西区",
P_DICT_ENTRY_CODE: "120100",
P_DICT_ENTRY_NAME: "天津市"
},
{
C0: "2822",
DICT_ENTRY_CODE: "120105",
DICT_ENTRY_NAME: "河北区",
P_DICT_ENTRY_CODE: "120100",
P_DICT_ENTRY_NAME: "天津市"
},
{
C0: "2843",
DICT_ENTRY_CODE: "120112",
DICT_ENTRY_NAME: "津南区",
P_DICT_ENTRY_CODE: "120100",
P_DICT_ENTRY_NAME: "天津市"
}
]
},
    {
C0: "5",
DICT_ENTRY_CODE: "500100",
DICT_ENTRY_NAME: "重庆市",
DICT_ENTRY_PINYIN: "ZB",
DICT_CHILDREN: [
{
C0: "236",
DICT_ENTRY_CODE: "500119",
DICT_ENTRY_NAME: "南川区",
P_DICT_ENTRY_CODE: "500100",
P_DICT_ENTRY_NAME: "重庆市"
},
{
C0: "323",
DICT_ENTRY_CODE: "500101",
DICT_ENTRY_NAME: "万州区",
P_DICT_ENTRY_CODE: "500100",
P_DICT_ENTRY_NAME: "重庆市"
},
{
C0: "385",
DICT_ENTRY_CODE: "500108",
DICT_ENTRY_NAME: "南岸区",
P_DICT_ENTRY_CODE: "500100",
P_DICT_ENTRY_NAME: "重庆市"
},
{
C0: "386",
DICT_ENTRY_CODE: "500233",
DICT_ENTRY_NAME: "忠县",
P_DICT_ENTRY_CODE: "500100",
P_DICT_ENTRY_NAME: "重庆市"
},
{
C0: "387",
DICT_ENTRY_CODE: "500236",
DICT_ENTRY_NAME: "奉节县",
P_DICT_ENTRY_CODE: "500100",
P_DICT_ENTRY_NAME: "重庆市"
},
{
C0: "647",
DICT_ENTRY_CODE: "500235",
DICT_ENTRY_NAME: "云阳县",
P_DICT_ENTRY_CODE: "500100",
P_DICT_ENTRY_NAME: "重庆市"
},
{
C0: "717",
DICT_ENTRY_CODE: "500106",
DICT_ENTRY_NAME: "沙坪坝区",
P_DICT_ENTRY_CODE: "500100",
P_DICT_ENTRY_NAME: "重庆市"
},
{
C0: "769",
DICT_ENTRY_CODE: "500228",
DICT_ENTRY_NAME: "梁平县",
P_DICT_ENTRY_CODE: "500100",
P_DICT_ENTRY_NAME: "重庆市"
},
{
C0: "773",
DICT_ENTRY_CODE: "500231",
DICT_ENTRY_NAME: "垫江县",
P_DICT_ENTRY_CODE: "500100",
P_DICT_ENTRY_NAME: "重庆市"
},
{
C0: "1135",
DICT_ENTRY_CODE: "500102",
DICT_ENTRY_NAME: "涪陵区",
P_DICT_ENTRY_CODE: "500100",
P_DICT_ENTRY_NAME: "重庆市"
},
{
C0: "1136",
DICT_ENTRY_CODE: "500103",
DICT_ENTRY_NAME: "渝中区",
P_DICT_ENTRY_CODE: "500100",
P_DICT_ENTRY_NAME: "重庆市"
},
{
C0: "1137",
DICT_ENTRY_CODE: "500116",
DICT_ENTRY_NAME: "江津区",
P_DICT_ENTRY_CODE: "500100",
P_DICT_ENTRY_NAME: "重庆市"
},
{
C0: "1138",
DICT_ENTRY_CODE: "500118",
DICT_ENTRY_NAME: "永川区",
P_DICT_ENTRY_CODE: "500100",
P_DICT_ENTRY_NAME: "重庆市"
},
{
C0: "1139",
DICT_ENTRY_CODE: "500223",
DICT_ENTRY_NAME: "潼南县",
P_DICT_ENTRY_CODE: "500100",
P_DICT_ENTRY_NAME: "重庆市"
},
{
C0: "1454",
DICT_ENTRY_CODE: "500111",
DICT_ENTRY_NAME: "大足区",
P_DICT_ENTRY_CODE: "500100",
P_DICT_ENTRY_NAME: "重庆市"
},
{
C0: "1455",
DICT_ENTRY_CODE: "500243",
DICT_ENTRY_NAME: "彭水苗族土家族自治县",
P_DICT_ENTRY_CODE: "500100",
P_DICT_ENTRY_NAME: "重庆市"
},
{
C0: "1531",
DICT_ENTRY_CODE: "500113",
DICT_ENTRY_NAME: "巴南区",
P_DICT_ENTRY_CODE: "500100",
P_DICT_ENTRY_NAME: "重庆市"
},
{
C0: "1881",
DICT_ENTRY_CODE: "500115",
DICT_ENTRY_NAME: "长寿区",
P_DICT_ENTRY_CODE: "500100",
P_DICT_ENTRY_NAME: "重庆市"
},
{
C0: "1882",
DICT_ENTRY_CODE: "500237",
DICT_ENTRY_NAME: "巫山县",
P_DICT_ENTRY_CODE: "500100",
P_DICT_ENTRY_NAME: "重庆市"
},
{
C0: "1919",
DICT_ENTRY_CODE: "500230",
DICT_ENTRY_NAME: "丰都县",
P_DICT_ENTRY_CODE: "500100",
P_DICT_ENTRY_NAME: "重庆市"
},
{
C0: "1960",
DICT_ENTRY_CODE: "500114",
DICT_ENTRY_NAME: "黔江区",
P_DICT_ENTRY_CODE: "500100",
P_DICT_ENTRY_NAME: "重庆市"
},
{
C0: "1961",
DICT_ENTRY_CODE: "500234",
DICT_ENTRY_NAME: "开县",
P_DICT_ENTRY_CODE: "500100",
P_DICT_ENTRY_NAME: "重庆市"
},
{
C0: "2222",
DICT_ENTRY_CODE: "500104",
DICT_ENTRY_NAME: "大渡口区",
P_DICT_ENTRY_CODE: "500100",
P_DICT_ENTRY_NAME: "重庆市"
},
{
C0: "2280",
DICT_ENTRY_CODE: "500120",
DICT_ENTRY_NAME: "璧山区",
P_DICT_ENTRY_CODE: "500100",
P_DICT_ENTRY_NAME: "重庆市"
},
{
C0: "2281",
DICT_ENTRY_CODE: "500232",
DICT_ENTRY_NAME: "武隆县",
P_DICT_ENTRY_CODE: "500100",
P_DICT_ENTRY_NAME: "重庆市"
},
{
C0: "2321",
DICT_ENTRY_CODE: "500109",
DICT_ENTRY_NAME: "北碚区",
P_DICT_ENTRY_CODE: "500100",
P_DICT_ENTRY_NAME: "重庆市"
},
{
C0: "2345",
DICT_ENTRY_CODE: "500107",
DICT_ENTRY_NAME: "九龙坡区",
P_DICT_ENTRY_CODE: "500100",
P_DICT_ENTRY_NAME: "重庆市"
},
{
C0: "2346",
DICT_ENTRY_CODE: "500110",
DICT_ENTRY_NAME: "綦江区",
P_DICT_ENTRY_CODE: "500100",
P_DICT_ENTRY_NAME: "重庆市"
},
{
C0: "2347",
DICT_ENTRY_CODE: "500226",
DICT_ENTRY_NAME: "荣昌县",
P_DICT_ENTRY_CODE: "500100",
P_DICT_ENTRY_NAME: "重庆市"
},
{
C0: "2348",
DICT_ENTRY_CODE: "500240",
DICT_ENTRY_NAME: "石柱土家族自治县",
P_DICT_ENTRY_CODE: "500100",
P_DICT_ENTRY_NAME: "重庆市"
},
{
C0: "2349",
DICT_ENTRY_CODE: "500241",
DICT_ENTRY_NAME: "秀山土家族苗族自治县",
P_DICT_ENTRY_CODE: "500100",
P_DICT_ENTRY_NAME: "重庆市"
},
{
C0: "2350",
DICT_ENTRY_CODE: "500242",
DICT_ENTRY_NAME: "酉阳土家族苗族自治县",
P_DICT_ENTRY_CODE: "500100",
P_DICT_ENTRY_NAME: "重庆市"
},
{
C0: "2588",
DICT_ENTRY_CODE: "500112",
DICT_ENTRY_NAME: "渝北区",
P_DICT_ENTRY_CODE: "500100",
P_DICT_ENTRY_NAME: "重庆市"
},
{
C0: "2589",
DICT_ENTRY_CODE: "500229",
DICT_ENTRY_NAME: "城口县",
P_DICT_ENTRY_CODE: "500100",
P_DICT_ENTRY_NAME: "重庆市"
},
{
C0: "2708",
DICT_ENTRY_CODE: "500238",
DICT_ENTRY_NAME: "巫溪县",
P_DICT_ENTRY_CODE: "500100",
P_DICT_ENTRY_NAME: "重庆市"
},
{
C0: "2736",
DICT_ENTRY_CODE: "500105",
DICT_ENTRY_NAME: "江北区",
P_DICT_ENTRY_CODE: "500100",
P_DICT_ENTRY_NAME: "重庆市"
},
{
C0: "2737",
DICT_ENTRY_CODE: "500151",
DICT_ENTRY_NAME: "铜梁区",
P_DICT_ENTRY_CODE: "500100",
P_DICT_ENTRY_NAME: "重庆市"
},
{
C0: "3105",
DICT_ENTRY_CODE: "500117",
DICT_ENTRY_NAME: "合川区",
P_DICT_ENTRY_CODE: "500100",
P_DICT_ENTRY_NAME: "重庆市"
}
]
},
    {
C0: "206",
DICT_ENTRY_CODE: "440300",
DICT_ENTRY_NAME: "深圳市",
DICT_ENTRY_PINYIN: "SB",
DICT_CHILDREN: [
{
C0: "207",
DICT_ENTRY_CODE: "440305",
DICT_ENTRY_NAME: "南山区",
P_DICT_ENTRY_CODE: "440300",
P_DICT_ENTRY_NAME: "深圳市"
},
{
C0: "1349",
DICT_ENTRY_CODE: "440306",
DICT_ENTRY_NAME: "宝安区",
P_DICT_ENTRY_CODE: "440300",
P_DICT_ENTRY_NAME: "深圳市"
},
{
C0: "1784",
DICT_ENTRY_CODE: "440308",
DICT_ENTRY_NAME: "盐田区",
P_DICT_ENTRY_CODE: "440300",
P_DICT_ENTRY_NAME: "深圳市"
},
{
C0: "1915",
DICT_ENTRY_CODE: "440307",
DICT_ENTRY_NAME: "龙岗区",
P_DICT_ENTRY_CODE: "440300",
P_DICT_ENTRY_NAME: "深圳市"
},
{
C0: "2201",
DICT_ENTRY_CODE: "440303",
DICT_ENTRY_NAME: "罗湖区",
P_DICT_ENTRY_CODE: "440300",
P_DICT_ENTRY_NAME: "深圳市"
},
{
C0: "2335",
DICT_ENTRY_CODE: "440304",
DICT_ENTRY_NAME: "福田区",
P_DICT_ENTRY_CODE: "440300",
P_DICT_ENTRY_NAME: "深圳市"
}
]
},
    {
C0: "98",
DICT_ENTRY_CODE: "370200",
DICT_ENTRY_NAME: "青岛市",
DICT_ENTRY_PINYIN: "QB",
DICT_CHILDREN: [
{
C0: "72",
DICT_ENTRY_CODE: "370213",
DICT_ENTRY_NAME: "李沧区",
P_DICT_ENTRY_CODE: "370200",
P_DICT_ENTRY_NAME: "青岛市"
},
{
C0: "303",
DICT_ENTRY_CODE: "370211",
DICT_ENTRY_NAME: "黄岛区",
P_DICT_ENTRY_CODE: "370200",
P_DICT_ENTRY_NAME: "青岛市"
},
{
C0: "304",
DICT_ENTRY_CODE: "370282",
DICT_ENTRY_NAME: "即墨市",
P_DICT_ENTRY_CODE: "370200",
P_DICT_ENTRY_NAME: "青岛市"
},
{
C0: "673",
DICT_ENTRY_CODE: "370214",
DICT_ENTRY_NAME: "城阳区",
P_DICT_ENTRY_CODE: "370200",
P_DICT_ENTRY_NAME: "青岛市"
},
{
C0: "1001",
DICT_ENTRY_CODE: "370212",
DICT_ENTRY_NAME: "崂山区",
P_DICT_ENTRY_CODE: "370200",
P_DICT_ENTRY_NAME: "青岛市"
},
{
C0: "1399",
DICT_ENTRY_CODE: "370203",
DICT_ENTRY_NAME: "市北区",
P_DICT_ENTRY_CODE: "370200",
P_DICT_ENTRY_NAME: "青岛市"
},
{
C0: "2240",
DICT_ENTRY_CODE: "370201",
DICT_ENTRY_NAME: "青岛市",
P_DICT_ENTRY_CODE: "370200",
P_DICT_ENTRY_NAME: "青岛市"
},
{
C0: "2241",
DICT_ENTRY_CODE: "370283",
DICT_ENTRY_NAME: "平度市",
P_DICT_ENTRY_CODE: "370200",
P_DICT_ENTRY_NAME: "青岛市"
},
{
C0: "2242",
DICT_ENTRY_CODE: "370285",
DICT_ENTRY_NAME: "莱西市",
P_DICT_ENTRY_CODE: "370200",
P_DICT_ENTRY_NAME: "青岛市"
},
{
C0: "3018",
DICT_ENTRY_CODE: "370202",
DICT_ENTRY_NAME: "市南区",
P_DICT_ENTRY_CODE: "370200",
P_DICT_ENTRY_NAME: "青岛市"
},
{
C0: "3019",
DICT_ENTRY_CODE: "370281",
DICT_ENTRY_NAME: "胶州市",
P_DICT_ENTRY_CODE: "370200",
P_DICT_ENTRY_NAME: "青岛市"
}
]
},
    {
C0: "307",
DICT_ENTRY_CODE: "610100",
DICT_ENTRY_NAME: "西安市",
DICT_ENTRY_PINYIN: "XB",
DICT_CHILDREN: [
{
C0: "28",
DICT_ENTRY_CODE: "610112",
DICT_ENTRY_NAME: "未央区",
P_DICT_ENTRY_CODE: "610100",
P_DICT_ENTRY_NAME: "西安市"
},
{
C0: "29",
DICT_ENTRY_CODE: "610114",
DICT_ENTRY_NAME: "阎良区",
P_DICT_ENTRY_CODE: "610100",
P_DICT_ENTRY_NAME: "西安市"
},
{
C0: "755",
DICT_ENTRY_CODE: "610111",
DICT_ENTRY_NAME: "灞桥区",
P_DICT_ENTRY_CODE: "610100",
P_DICT_ENTRY_NAME: "西安市"
},
{
C0: "1566",
DICT_ENTRY_CODE: "610102",
DICT_ENTRY_NAME: "新城区",
P_DICT_ENTRY_CODE: "610100",
P_DICT_ENTRY_NAME: "西安市"
},
{
C0: "1567",
DICT_ENTRY_CODE: "610116",
DICT_ENTRY_NAME: "长安区",
P_DICT_ENTRY_CODE: "610100",
P_DICT_ENTRY_NAME: "西安市"
},
{
C0: "1676",
DICT_ENTRY_CODE: "610126",
DICT_ENTRY_NAME: "高陵县",
P_DICT_ENTRY_CODE: "610100",
P_DICT_ENTRY_NAME: "西安市"
},
{
C0: "1891",
DICT_ENTRY_CODE: "610115",
DICT_ENTRY_NAME: "临潼区",
P_DICT_ENTRY_CODE: "610100",
P_DICT_ENTRY_NAME: "西安市"
},
{
C0: "1989",
DICT_ENTRY_CODE: "610122",
DICT_ENTRY_NAME: "蓝田县",
P_DICT_ENTRY_CODE: "610100",
P_DICT_ENTRY_NAME: "西安市"
},
{
C0: "2376",
DICT_ENTRY_CODE: "610103",
DICT_ENTRY_NAME: "碑林区",
P_DICT_ENTRY_CODE: "610100",
P_DICT_ENTRY_NAME: "西安市"
},
{
C0: "2596",
DICT_ENTRY_CODE: "610101",
DICT_ENTRY_NAME: "西安市",
P_DICT_ENTRY_CODE: "610100",
P_DICT_ENTRY_NAME: "西安市"
},
{
C0: "2679",
DICT_ENTRY_CODE: "610104",
DICT_ENTRY_NAME: "莲湖区",
P_DICT_ENTRY_CODE: "610100",
P_DICT_ENTRY_NAME: "西安市"
},
{
C0: "2680",
DICT_ENTRY_CODE: "610125",
DICT_ENTRY_NAME: "户县",
P_DICT_ENTRY_CODE: "610100",
P_DICT_ENTRY_NAME: "西安市"
},
{
C0: "2716",
DICT_ENTRY_CODE: "610124",
DICT_ENTRY_NAME: "周至县",
P_DICT_ENTRY_CODE: "610100",
P_DICT_ENTRY_NAME: "西安市"
},
{
C0: "3000",
DICT_ENTRY_CODE: "610113",
DICT_ENTRY_NAME: "雁塔区",
P_DICT_ENTRY_CODE: "610100",
P_DICT_ENTRY_NAME: "西安市"
}
]
},
    {
C0: "321",
DICT_ENTRY_CODE: "410100",
DICT_ENTRY_NAME: "郑州市",
DICT_ENTRY_PINYIN: "ZB",
DICT_CHILDREN: [
{
C0: "306",
DICT_ENTRY_CODE: "410102",
DICT_ENTRY_NAME: "中原区",
P_DICT_ENTRY_CODE: "410100",
P_DICT_ENTRY_NAME: "郑州市"
},
{
C0: "307",
DICT_ENTRY_CODE: "410181",
DICT_ENTRY_NAME: "巩义市",
P_DICT_ENTRY_CODE: "410100",
P_DICT_ENTRY_NAME: "郑州市"
},
{
C0: "508",
DICT_ENTRY_CODE: "410108",
DICT_ENTRY_NAME: "惠济区",
P_DICT_ENTRY_CODE: "410100",
P_DICT_ENTRY_NAME: "郑州市"
},
{
C0: "1022",
DICT_ENTRY_CODE: "410183",
DICT_ENTRY_NAME: "新密市",
P_DICT_ENTRY_CODE: "410100",
P_DICT_ENTRY_NAME: "郑州市"
},
{
C0: "1392",
DICT_ENTRY_CODE: "410104",
DICT_ENTRY_NAME: "管城回族区",
P_DICT_ENTRY_CODE: "410100",
P_DICT_ENTRY_NAME: "郑州市"
},
{
C0: "1418",
DICT_ENTRY_CODE: "410101",
DICT_ENTRY_NAME: "郑州市",
P_DICT_ENTRY_CODE: "410100",
P_DICT_ENTRY_NAME: "郑州市"
},
{
C0: "1837",
DICT_ENTRY_CODE: "410122",
DICT_ENTRY_NAME: "中牟县",
P_DICT_ENTRY_CODE: "410100",
P_DICT_ENTRY_NAME: "郑州市"
},
{
C0: "1838",
DICT_ENTRY_CODE: "410185",
DICT_ENTRY_NAME: "登封市",
P_DICT_ENTRY_CODE: "410100",
P_DICT_ENTRY_NAME: "郑州市"
},
{
C0: "1938",
DICT_ENTRY_CODE: "410182",
DICT_ENTRY_NAME: "荥阳市",
P_DICT_ENTRY_CODE: "410100",
P_DICT_ENTRY_NAME: "郑州市"
},
{
C0: "2072",
DICT_ENTRY_CODE: "410103",
DICT_ENTRY_NAME: "二七区",
P_DICT_ENTRY_CODE: "410100",
P_DICT_ENTRY_NAME: "郑州市"
},
{
C0: "2627",
DICT_ENTRY_CODE: "410105",
DICT_ENTRY_NAME: "金水区",
P_DICT_ENTRY_CODE: "410100",
P_DICT_ENTRY_NAME: "郑州市"
},
{
C0: "2628",
DICT_ENTRY_CODE: "410184",
DICT_ENTRY_NAME: "新郑市",
P_DICT_ENTRY_CODE: "410100",
P_DICT_ENTRY_NAME: "郑州市"
},
{
C0: "2797",
DICT_ENTRY_CODE: "410106",
DICT_ENTRY_NAME: "上街区",
P_DICT_ENTRY_CODE: "410100",
P_DICT_ENTRY_NAME: "郑州市"
}
]
}
  ]

    var alphabet = ['B','C','D','F','G','H','J','K','L','M','N','P','Q','R','S','T','W','X','Y','Z'];

    var list = $compile(
      '<div class="padding y-header">' +
        '<div class="y-search">'+
          '<span class="y-icon"></span>'+
          '<input type="text" name="" id="" value="" placeholder="关键词" ng-model="search" ng-change="scrollTo()">'+
        '</div>'+
      '</div>'+
      '<div class="y-city-t" id="热门">' +
        '热门城市' +
      '</div>' +
      '<div class="y-main y-hot padding">' +
        '<ul id="container">' +
          '<li ng-repeat="ci in city" ng-click="ci.DICT_CHILDREN.length > 0?cityClick({name: ci.DICT_ENTRY_NAME, code: ci.DICT_ENTRY_CODE}):null">' +
            '<span>{{ci.DICT_ENTRY_NAME}}</span>' +
            '<select ng-model="selectedItem" ng-init="selectedItem = selectedItem || children[0]" ng-options="children.DICT_ENTRY_NAME for children in ci.DICT_CHILDREN track by children.DICT_ENTRY_CODE" ng-change="updateSelect()">' +
            '</select>' + 
          '</li>' +
        '</ul>' +
      '</div>' +
      '<div class="y-main y-letter y-nopadding">'+
        '<ul class="container">' +
          '<li  scrollIf="item.DICT_ENTRY_NAME === search" ng-repeat="item in listItems | orderBy:listOrderBy" ng-disabled="item.isDivider" ng-class="{divider:item.isDivider,people:!item.isDivider}" id="{{item.DICT_ENTRY_NAME}}" ng-click="item.DICT_CHILDREN.length > 0?cityClick({name: item.DICT_ENTRY_NAME, code: item.DICT_ENTRY_CODE}):null">' +
            '<div>{{item.DICT_ENTRY_NAME}}</div>' +
            '<select ng-model="selectedItem" ng-init="selectedItem = selectedItem || children[0]" ng-options="children.DICT_ENTRY_NAME for children in item.DICT_CHILDREN track by children.DICT_ENTRY_CODE" ng-change="updateSelect()" ng-show="item.DICT_CHILDREN.length > 0">' +
            '</select>' + 
          '</li>'+
        '</ul>'+
      '</div>')($scope);
    $elmt.append(list);

    var x = 0, y = 0, i = 0, all, lettersScrollBar, offsetLeft, offsetTop, li, liHeight;

    //
    // @function  addLetters
    //
    $scope.addLetters = function(elem) {
      var firstLetters = [],
          hideUnusedLetters = $scope.hideUnusedLetters || false,
          i;
      if (hideUnusedLetters) {
        for (i = $scope.listItems.length - 1; i >= 0; i--) {
          firstLetters.push($scope.listItems[i].DICT_ENTRY_PINYIN[0].toUpperCase());
          if($scope.listItems[i].DICT_ENTRY_NAME.length === 1) {
            $scope.listItems.splice(i, 1)
          }
        }
      }

      for (i = alphabet.length - 1; i >= 0; i--) {
        if(!hideUnusedLetters || (hideUnusedLetters && firstLetters.indexOf(alphabet[i]) !== -1)){
          $scope.listItems.push({DICT_ENTRY_NAME: alphabet[i], DICT_ENTRY_PINYIN:alphabet[i] + "A", isDivider: true, id:alphabet[i]});
        }
      }


      if (alphabet.length) {
        lettersScrollBar = elem.$$element[0].firstChild;
        if (lettersScrollBar.offsetHeight > 0) {
          all = lettersScrollBar.children;
          /*var padding = parseInt((elem.$$element[0].lastChild.offsetHeight - lettersScrollBar.offsetHeight)/52, 10);
          for (var i = 0, len = all.length; i < len; i++) {
            all[i].style.paddingTop = padding + 'px';
            all[i].style.paddingBottom = padding + 'px';
          }*/
          //$elmt.find('.scrollLetter').css({'padding-top':padding+'px','padding-bottom':padding+'px'});
          $scope.addTouchBar();
        }
      }
    };

    /*$scope.cityClick = function(params) {
        console.log(params)
    }*/

    $scope.updateSelect = function() {

      var city = this.selectedItem.P_DICT_ENTRY_NAME
      var cityCode = this.selectedItem.P_DICT_ENTRY_CODE

      var area = this.selectedItem.DICT_ENTRY_NAME
      var areaCode = this.selectedItem.DICT_ENTRY_CODE

      if($location.search().huko) {
        sessionStorage.setItem('baseHuko', city+';'+cityCode+';'+area+';'+areaCode+';');
        $location.path('/base').search("");
      } else if($location.search().live) {
        sessionStorage.setItem('baseLive', city+';'+cityCode+';'+area+';'+areaCode+';');
        $location.path('/base').search("");
      } else if($location.search().house) {
        sessionStorage.setItem('house', city+';'+cityCode+';'+area+';'+areaCode+';');
        $location.path('/house').search("");
      } else if($location.search().job) {
        sessionStorage.setItem('job', city+';'+cityCode+';'+area+';'+areaCode+';');
        $location.path('/job').search("");
      }
      
      console.log(this.selectedItem)

    }

    $scope.searchChange = function() {
      var list = this.listItems;
      var len = this.listItems.length
      
    }

    $scope.scrollTo = function() {
        var search = this.search
        var elem = document.getElementById(search + "市")
        
        if(elem) {
          this.scrollTop(document.getElementById('container'), elem.getBoundingClientRect().top, 500)
        }
    }

    $scope.scrollTop = function (element, to, duration) {
        if (duration <= 0) return;
        var difference = to - element.scrollTop;
        var perTick = difference / duration * 10;

        setTimeout(function() {
            element.scrollTop = element.scrollTop + perTick;
            if (element.scrollTop === to) return;
            scrollTo(element, to, duration - 10);
        }, 10);
    }

    //
    // @function  addTouchBar
    //
    $scope.addTouchBar = function() {
      for (var i = 0, len = all.length; i < len; i++) {
        removeClass(all[i], 'touched')
        addListenerMulti(all[i], 'touchstart touchmove', function(e){
          e.preventDefault();
          addClass(this, 'touched');
          $scope.goto($(this).text());
        })
        /*all[i].addEventListener('touchstart', function(e){
          e.preventDefault();
          addClass(this, 'touched');
          $scope.goto($(this).text());
        })*/
      }

      /*all.on('touchstart mousedown', function(event) {
        all.removeClass('touched');
        $(this).addClass('touched');
        $scope.goto($(this).text());
      });*/

      /*offsetTop = lettersScrollBar.getBoundingClientRect().top;
      offsetLeft = lettersScrollBar.getBoundingClientRect().left;
      li = el.find('.letter');
      liHeight = li.height() + parseInt(li.css('padding-top'), 10) * 2;*/

    };

    //
    // @function  goto
    //
    $scope.goto = function(idx) {
      console.log(idx)
      var old = $location.hash();
      $location.hash(idx);
      $anchorScroll();
      $location.hash(old);
    };

    $scope.alphabet = alphabet;
  }
];

function addListenerMulti(el, s, fn) {
  var evts = s.split(' ');
  for (var i=0, iLen=evts.length; i<iLen; i++) {
    el.addEventListener(evts[i], fn, false);
  }
}

function addClass(el, className) {
    if (el.classList) el.classList.add(className);
    else if (!hasClass(el, className)) el.className += ' ' + className;
}

function removeClass(el, className) {
    if (el.classList) el.classList.remove(className);
    else el.className = el.className.replace(new RegExp('\\b'+ className+'\\b', 'g'), '');
}
/**
 * ngAlphabetIndexer: AlphabetIndexer for mobile development with AngularJS
 *
 * @author Matthieu COLLE
 * @url https://github.com/raiseandfall/ng-alphabet-indexer
 */

/**
 * @ngdoc directive
 * @name ngAlphabetIndexer.directive:alphabetIndexer
 * @restrict E
 *
 * @description
 * Directive that instantiates {@link ngAlphabetIndexer.directive:ngAlphabetIndexer.ngAlphabetIndexerController ngAlphabetIndexerController}.
 */

app.directive('ngAlphabetIndexer', [
  '$log',
  '$compile',
  '$timeout',
  function($log, $compile, $timeout) {
    'use strict';

    return {
      restrict: 'E',
      scope: {
        listItems: '=',
        listOrderBy: '=',
        hideUnusedLetters: '='
      },
      controller: ngAlphabetIndexerController,
      template: '<ul class="lettersScrollBar">'+
                  '<li class="scrollLetter" myTouchend="scrollToLetter('+"A"+')" ng-myTouchstart="scrollToLetter('+"A"+')">热门</li>' +
                  '<li class="scrollLetter" ng-repeat="letter in alphabet" myTouchend="scrollToLetter(letter)" ng-myTouchstart="scrollToLetter(letter)">{{letter | uppercase}}</li>'+
                '</ul>',
      link: function($scope, $attrs, $element, ctrl) {
        // Add static letters dividers
        $timeout(function(){
          $scope.addLetters($element);
        })

      }
    };

  }
]);


app.directive('myTouchstart', [function() {
  return function(scope, element, attr) {
    element.on('touchstart', function(event) {
        scope.$apply(function() { 
            scope.$eval(attr.myTouchstart); 
        });
    });
  };
}])


app.directive('myTouchend', [function() {
  return function(scope, element, attr) {
    element.on('touchend', function(event) {
      scope.$apply(function() { 
        scope.$eval(attr.myTouchend); 
      });
    });
  };
}]);


});