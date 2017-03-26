import Vue from 'vue'
import VueReource from 'vue-resource'
Vue.use(VueReource);



    /**
     * [checkBind 检查是否绑定]
     * @param  {[json]} param      [json入参]
     * @param  {[function]} bindedCall [已绑定回调]
     * @return {[void]}            [无返回值]
     * 
     */
    
Vue.prototype.$checkBind = function(param,bindedCall){
    var state = param.state;//状态
    var url = param.url;//回调地址
    var code = param.code;
    if(typeof state == 'undefined'|| state==null){//当为空时，获取appid，重定向进行auth2授权

        var option = {};
        option.url = "http://localhost:8888/weixin/getAppid";
        option.params = {};
        option.before = function(){
        }
        Vue.http(option).then(function(data){
            var data = data.body;
            var errorcode = data['errorCode'];
            var message = data['message'];
            var errorcode = data.errorCode;
            var msg = data.message;
            if(errorcode!==0 && errorcode!=='0'){
                Toast({
                  message: msg,
                  position: 'bottom',
                  duration: 1500
                });
                WeixinJSBridge.call("closeWindow");
                return;
            }
            var appid = data.data[0].appid;
            location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appid+
                                "&redirect_uri="+encodeURIComponent(url)+
                                "&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect";
            
            
        
        }).catch(function(data){                

        });

    }else{
        var option = {};
        option.url = "http://localhost:8888/weixin/checkBind";
        option.params = {code:code};
        option.before = function(){
        }
        Vue.http(option).then(function(data){
            var data = data.body;
            var errorcode = data['errorCode'];
            var message = data['message'];
            var errorcode = data.errorCode;
            var msg = data.message;
            if(errorcode!==0 && errorcode!=='0'){
                Toast({
                  message: msg,
                  position: 'bottom',
                  duration: 1500
                });
                WeixinJSBridge.call("closeWindow");
                return;
            }
            var type = data.data[0].type;
            if(type===1){//已绑定

                var user_id = data.data[0].user_id;
                var user_idSecret = secret.Encrypt(user_id,code);
                sessionStorage.setItem("user_id",user_idSecret);
                sessionStorage.setItem("code",code);
                bindedCall();

            }else if(type===2){//未绑定，跳转绑定页面
                var openid = data.data[0].openid;
                var nickname = data.data[0].nickname;
                var userimg = data.data[0].userimg;
                var wxMes = openid+"|"+nickname+"|"+userimg;
                var wxMesSecret = secret.Encrypt(wxMes,code);
                sessionStorage.setItem("wxMes",wxMesSecret);
                sessionStorage.setItem("code",code);
                Vue.router.push({name:'login'});
            }else{//查询异常
                Toast({
                  message: "检查绑定关系异常",
                  position: 'bottom',
                  duration: 1500
                });
            }
            
            
        
        }).catch(function(data){                

        });
    }
}