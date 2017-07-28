import CryptoJS from './aes_2';
import Picker from './picker.min.js'
//import rsa from '../../lib/rsa.js'




class Common{

    init(Vue){
        if(process.env.NODE_ENV === 'development'){
            //Vue.prototype.$baseRoot = 'http://10.243.246.15:8080/servlet/channelAccess/action/';
            Vue.prototype.$baseRoot = '/fss/servlet/channelAccess/action/';
        }else{
            Vue.prototype.$baseRoot = '/fss/servlet/channelAccess/action/';
        }
        Vue.prototype.$Encrypt = function(word,key){
            return CryptoJS.AES.encrypt(word,key).toString();
      },
        Vue.prototype.$Decrypt = function(word,key){
          return CryptoJS.AES.decrypt(word,key).toString(CryptoJS.enc.Utf8);
      };
/*      Vue.prototype.$rsaEncrypt = function(modulus,publicExponent,word){
        modulus && publicExponent || console.log("加密模块modulus或者公钥publicExponent为空！");
        rsa.setPublic(modulus,publicExponent);
        return "encrypt_rsa:" + rsa.encrypt("word");
      }*/
      Vue.prototype.Picker = Picker;
      Vue.prototype.IdCardValidate = this.idcheck;
      Vue.prototype.maleOrFemalByIdCard = this.maleOrFemalByIdCard;
      Vue.prototype.daysBetween = this.daysBetween;
      
      Vue.prototype.initdata = function(){
        var applyjson = {};
        var applyStr = JSON.stringify(applyjson); 
        var key = sessionStorage.getItem("key");
        if(!key){
          return false;
        }

        var applymes = CryptoJS.AES.encrypt(applyStr,key).toString();
        sessionStorage.setItem('applymes',applymes);
        return true;
        
      }


        

      /*比较时间大小*/
      Vue.prototype.compareDate = function(DateOne, DateTwo) {
          var OneMonth = DateOne.substring(5, DateOne.lastIndexOf("-"));
          var OneDay = DateOne.substring(DateOne.length, DateOne.lastIndexOf("-") + 1);
          var OneYear = DateOne.substring(0, DateOne.indexOf("-"));
          var TwoMonth = DateTwo.substring(5, DateTwo.lastIndexOf("-"));
          var TwoDay = DateTwo.substring(DateTwo.length, DateTwo.lastIndexOf("-") + 1);
          var TwoYear = DateTwo.substring(0, DateTwo.indexOf("-"));
          if (Date.parse(OneMonth + "/" + OneDay + "/" + OneYear) > Date.parse(TwoMonth + "/" + TwoDay + "/" + TwoYear)) {
            return true;
          } else {
            return false;
          }
        }
      /**
       *返回 ：2需要重新登陆 0成功 1失败
       * 
       */
      Vue.prototype.extend = function(json){
        var key = sessionStorage.getItem("key");
        if(!key){
          return 2;
        }
        var applymes = sessionStorage.getItem("applymes");
        if(!applymes){
          return 2;
        }
        var itemJson = JSON.parse(CryptoJS.AES.decrypt(applymes,key).toString(CryptoJS.enc.Utf8));
        if(json){
          for(var x in json){

            if(x!=='applyid'){
              itemJson[x] = json[x];
            }else{
              if(!itemJson.hasOwnProperty('applyid')){
                itemJson[x] = json[x];
              }
            }
            
          }
          var applyStr = JSON.stringify(itemJson); 
          var applymes = CryptoJS.AES.encrypt(applyStr,key).toString();
          sessionStorage.setItem('applymes',applymes);
          return 0;
        }
        return 1;
        
        
      }
      Vue.prototype.getData = function(key){
        var keyse = sessionStorage.getItem("key");
        var item = sessionStorage.getItem('applymes');
        var itemJson = JSON.parse(CryptoJS.AES.decrypt(item,keyse).toString(CryptoJS.enc.Utf8));
        return itemJson[key];
        
      }
      Vue.prototype.addInfo = function(loginback,sucback,failback){
        var baseUrl = '';
        if(process.env.NODE_ENV === 'development'){
            //baseUrl = 'http://10.243.246.15:8080/servlet/channelAccess/action/';
            baseUrl = '/fss/servlet/channelAccess/action/';
            
        }else{
            baseUrl = '/fss/servlet/channelAccess/action/';
        }
        var key = sessionStorage.getItem("key");
        if(!key){
          if(loginback){
            loginback();
          }
        }
        var applymes = sessionStorage.getItem("applymes");
        if(!applymes){
          if(loginback){
            loginback();
          }
        }
        var itemJson = JSON.parse(CryptoJS.AES.decrypt(applymes,key).toString(CryptoJS.enc.Utf8));
         var url = baseUrl+"ChannelAccessAction?function=SaveCustomerApplyDetailInfo";
          var param = {param:itemJson};
          Vue.http.post(url,param).then(function(data){
            var data = data.body;
            var errorcode = data['error_no'];
            var errorinfo = data['error_info'];
            if(errorcode!==0 && errorcode!=='0'){
                Toast({
                  message: errorinfo,
                  position: 'bottom',
                  duration: 1500
                });
                if(errorcode==="-998"||errorcode===-998){
                      setTimeout(() => {
                          if(loginback){
                            loginback();
                          }
                        }, 2000);
                      return
                    }
                if(failback){
                  failback();
                }
                return;
            }
              if(sucback){
                  sucback();
                }
              
              
          
          }).catch(function(data){                
            Toast({
                    message: "系统异常，请重试",
                    position: 'bottom',
                    duration: 1500
                  });
          });
      }

    }

      /** 
  * 通过身份证判断是男是女 
  * @param idCard 15/18位身份证号码 
  * @return 'female'-女、'male'-男 
  */ 
 maleOrFemalByIdCard(idCard){ 
    idCard = idCard.replace(/ /g, "").replace(/(^\s*)|(\s*$)/g, "");// 对身份证号码做处理。包括字符间有空格。 
    if(idCard.length==15){ 
      if(idCard.substring(14,15)%2==0){ 
        return 'female'; 
      }else{ 
        return 'male'; 
      } 
    }else if(idCard.length ==18){ 
    if(idCard.substring(14,17)%2==0){ 
        return 'female'; 
      }else{ 
        return 'male'; 
      } 
    }else{ 
      return null; 
    } 
  
  }


  /** 
  * 身份证15位编码规则：dddddd yymmdd xx p 
  * dddddd：地区码 
  * yymmdd: 出生年月日 
  * xx: 顺序类编码，无法确定 
  * p: 性别，奇数为男，偶数为女 
  * <p /> 
  * 身份证18位编码规则：dddddd yyyymmdd xxx y 
  * dddddd：地区码 
  * yyyymmdd: 出生年月日 
  * xxx:顺序类编码，无法确定，奇数为男，偶数为女 
  * y: 校验码，该位数值可通过前17位计算获得 
  * <p /> 
  * 18位号码加权因子为(从右到左) Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2,1 ] 
  * 验证位 Y = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ] 
  * 校验位计算公式：Y_P = mod( ∑(Ai×Wi),11 ) 
  * i为身份证号码从右往左数的 2...18 位; Y_P为脚丫校验码所在校验码数组位置 
  * 
  */ 


  
  
  idcheck(idCard){ 
     /** 
  * 判断身份证号码为18位时最后的验证位是否正确 
  * @param a_idCard 身份证号码数组 
  * @return 
  */ 
  function isTrueValidateCodeBy18IdCard(a_idCard) { 
    var Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1 ];// 加权因子 
    var ValideCode = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ];// 身份证验证位值.10代表X 
    var sum = 0; // 声明加权求和变量 
    if (a_idCard[17].toLowerCase() == 'x') { 
      a_idCard[17] = 10;// 将最后位为x的验证码替换为10方便后续操作 
    } 
    for ( var i = 0; i < 17; i++) { 
      sum += Wi[i] * a_idCard[i];// 加权求和 
    } 
    var valCodePosition = sum % 11;// 得到验证码所位置 
    if (a_idCard[17] == ValideCode[valCodePosition]) { 
      return true; 
    } else { 
      return false; 
    } 
  }  
  /** 
  * 验证18位数身份证号码中的生日是否是有效生日 
  * @param idCard 18位书身份证字符串 
  * @return 
  */ 
 function isValidityBrithBy18IdCard(idCard18){ 
    var year = idCard18.substring(6,10); 
    var month = idCard18.substring(10,12); 
    var day = idCard18.substring(12,14); 
    var temp_date = new Date(year,parseFloat(month)-1,parseFloat(day)); 
    // 这里用getFullYear()获取年份，避免千年虫问题 
    if(temp_date.getFullYear()!=parseFloat(year) 
    ||temp_date.getMonth()!=parseFloat(month)-1 
    ||temp_date.getDate()!=parseFloat(day)){ 
      return false; 
    }else{ 
      return true; 
    } 
  } 



    idCard = idCard.replace(/ /g, "").replace(/(^\s*)|(\s*$)/g, "");
    if (idCard.length == 15) { 
      return false; 
    } else if (idCard.length == 18) { 
      var a_idCard = idCard.split("");// 得到身份证数组 
      if(isValidityBrithBy18IdCard(idCard)&&isTrueValidateCodeBy18IdCard(a_idCard)){ 
        return true; 
      }else { 
        return false; 
      } 
    } else { 
      return false; 
    } 
  }

/**
 * 日期相隔毫秒数
 */
  daysBetween(DateOne,DateTwo) 
   { 
   var OneMonth = DateOne.substring(5,DateOne.lastIndexOf ('-')); 
   var OneDay = DateOne.substring(DateOne.length,DateOne.lastIndexOf ('-')+1); 
   var OneYear = DateOne.substring(0,DateOne.indexOf ('-')); 
   
   var TwoMonth = DateTwo.substring(5,DateTwo.lastIndexOf ('-')); 
   var TwoDay = DateTwo.substring(DateTwo.length,DateTwo.lastIndexOf ('-')+1); 
   var TwoYear = DateTwo.substring(0,DateTwo.indexOf ('-')); 
   
   var cha=((Date.parse(OneMonth+'/'+OneDay+'/'+OneYear)- Date.parse(TwoMonth+'/'+TwoDay+'/'+TwoYear))/86400000);
   return cha; 
   } 
 

} 



export default Common;