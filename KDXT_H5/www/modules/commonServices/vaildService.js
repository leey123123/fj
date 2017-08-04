define([
  "app"
],function(app){

  app.factory('vaildService', ['$http', function ($http) {

    var validation = {
      // 15或者18位身份证测试
      IDCheck: function (id) {

        var city = {11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
        var tip = "";
        var pass = true;

        if (!id || (!/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/.test(id) && !/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|[xX])$/.test(id))) {
          pass = false;
        } else if (!city[id.substr(0,2)]) {
          // 地址编码错误
          pass = false;
        } else {
          //18位身份证需要验证最后一位校验位
          if (id.length === 18) {
            id = id.toUpperCase();
            id = id.split('');
            //∑(ai×Wi)(mod 11)
            //加权因子
            var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
            //校验位
            var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
            var sum = 0;
            var ai = 0;
            var wi = 0;
            for (var i = 0; i < 17; i++) {
                ai = id[i];
                wi = factor[i];
                sum += ai * wi;
            }
            var last = parity[sum % 11];
            if (parity[sum % 11] != id[17]) {
              // 较验位错误
              pass = false;
            }
          }
        }

        return pass;

      },
      // 仅测试18位身份证
      simpleIDCheck: function(ID) {
        if(typeof ID !== 'string') return false;
        var city = {11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"};
        var birthday = ID.substr(6, 4) + '/' + Number(ID.substr(10, 2)) + '/' + Number(ID.substr(12, 2));
        var d = new Date(birthday);
        var newBirthday = d.getFullYear() + '/' + Number(d.getMonth() + 1) + '/' + Number(d.getDate());
        var currentTime = new Date().getTime();
        var time = d.getTime();
        var arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        var arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
        var sum = 0, i, residue;

        ID = ID.toUpperCase();

        if(!/^\d{17}(\d|x)$/i.test(ID)) return false;
        if(city[ID.substr(0,2)] === undefined) return false;
        if(time >= currentTime || birthday !== newBirthday) return false;
        for(i=0; i<17; i++) {
          sum += ID.substr(i, 1) * arrInt[i];
        }
        residue = arrCh[sum % 11];
        if (residue !== ID.substr(17, 1)) return false;

        return true
      },
      phone: function(phoneNum) {
        return /^(0|86|17951)?(13[0-9]|15[012356789]|17[6780]|18[0-9]|14[57])[0-9]{8}$/.test(phoneNum);
      },
      isChinese: function(str) {
        var strTest =  /^[\u0391-\uFFE5]+$/g.test(str);
        return strTest;
      }
    }

    return validation;

  }])

});