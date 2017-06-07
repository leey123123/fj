<template>
  <article id="section" class="login" >
    <hgroup class="login-hgroup">
        <h2>客户信息尽在掌握</h2>
        <h6>宣导宣导宣导宣导宣导宣导宣导</h6>
    </hgroup>
    <div class="login_input">
        <ul>
            <li class="box_box">
                <label class="box_vam"><i class="chicon-account"></i></label>
                <input type="text" name="usename" class="box_flex" placeholder="手机号码" v-model="phone.phoneno" maxlength="11">
                <i class="chicon-clear" :style="{display:phone.entered}" @click="clearPhone()"></i>
            </li>
            <li class="box_box">
                <label class="box_vam"><i class="chicon-password"></i></label>
                <input type="text" name="password" placeholder="验证码" class="box_flex" v-model="yzm.yzmno" style="line-height: 0.6rem;" maxlength="6">
                <a><input type="button" v-model="content" class="hk-send" :class="{'hk-sending':issending}" @click="sendMes()"></a>
            </li>
        </ul>
        <div class="ds-login"><a href="javascript:void(0);" class="btn-login" @click="login()">登录</a></div>
    </div>
</article>  

</template>
<script>

export default {
    data:function(){
        return {
            issending:false,
            num:120,
            content:'发送验证码',
            timer:'',
            phone:{
                phoneno:'',
                error:false,
                entered:'none'
            },
            yzm:{
                yzmno:'',
                error:false
            }
        };
    },
    methods:{
        sendMes:function(){
            if(this.num!==120){
                    return;
                }

                var reg = /1[0-9]{10}/;
                if(!reg.test(this.phone.phoneno)){
                   Toast({
                      message: '请输入正确的手机号码',
                      position: 'bottom',
                      duration: 1500
                    });
                   return;
                }
                var url = this.$baseRoot+"ChannelAccessAction?function=SendAuthCode";
                var requestParam = {};
                requestParam.phone = this.phone.phoneno;
                var json = {param:requestParam}
                this.$http.post(url,json).then(function(data){
                    var data = data.body;
                    var errorcode = data['error_no'];
                    var errorinfo = data['error_info'];
                    if(errorcode!==0 && errorcode!=='0'){
                        Toast({
                          message: errorinfo,
                          position: 'bottom',
                          duration: 1500
                        });
                        
                        return;
                    }
                    var results = data.results||[];
                    var result = results[0]||{};
                    if(result.authcode){
                        alert(result.authcode);
                    }
                    this.timer = setTimeout(this.countdown,1000);
                    
                    
                
                }).catch(function(data){                

                });
        },
        countdown:function(){
            this.issending=true;
            this.num--;
            this.content = this.num+"后重发";
            if(this.num<=0){
                this.num=120;
                clearTimeout(this.timer);
                this.timer="";
                this.issending=false;
                this.content = "获取验证码";
                return;
            }
            setTimeout(this.countdown,1000);
        },
        clearPhone:function(){
            this.phone.phoneno='';
        },
        getdict:function(){
            var url = this.$baseRoot+"ChannelAccessAction?function=GetDataDictionary";
            var requestParam = {};
            
            var json = {param:requestParam}
            this.$http.post(url,json).then(function(data){
                var data = data.body;
                var errorcode = data['error_no'];
                var message = data['error_info'];
                
                if(errorcode!==0 && errorcode!=='0'){
                    Toast({
                      message: message,
                      position: 'bottom',
                      duration: 1500
                    });
                    
                    return;
                }
                var results = data['results'];
                var returndata = results[0];
                var dictStr = JSON.stringify(returndata);
                sessionStorage.setItem('qddict',dictStr);
                
            
            }).catch(function(data){                
            });
        },
        login:function(){
            var vm = this;
            var reg = /1[0-9]{10}/;
            var regyzm = /[0-9]{6}/;
            if(!reg.test(this.phone.phoneno)){
               Toast({
                  message: '请输入正确的手机号码',
                  position: 'bottom',
                  duration: 1500
                });
               return;
            }
            if(!regyzm.test(this.yzm.yzmno)){
               Toast({
                  message: '验证码输入错误',
                  position: 'bottom',
                  duration: 1500
                });
               return;
            }
            var url = this.$baseRoot+"ChannelAccessAction?function=UserLogin";
            var requestParam = {};
            requestParam.phone = this.phone.phoneno;
            requestParam.authcode = this.yzm.yzmno;
            var json = {param:requestParam}
            this.$http.post(url,json).then(function(data){
                var data = data.body;
                var errorcode = data['error_no'];
                var message = data['error_info'];
                if(errorcode!==0 && errorcode!=='0'){
                    Toast({
                      message: message,
                      position: 'bottom',
                      duration: 1500
                    });
                    
                    return;
                }
                var results = data['results'];
                var returndata = results[0];
                var userdata = returndata.id+"|"+returndata.roleid+"|"+returndata.username+"|"+returndata.rolename;
                var userdata_secret = this.$Encrypt(userdata,this.phone.phoneno);
                sessionStorage.setItem('userMes',userdata_secret);
                sessionStorage.setItem('key',this.phone.phoneno);
                this.getdict();
                this.$router.push({name:'main'});
                
                
            
            }).catch(function(data){                

            });
        }
    },
    beforeCreate:function(){
        function getCookie(name)
            {
            var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
            if(arr=document.cookie.match(reg))
            return unescape(arr[2]);
            else
            return null;
            }
        function delCookie(name){ 
            var exp = new Date(); 
            exp.setTime(exp.getTime() -10000); 
            var cval=getCookie(name); 
            if(cval!=null) 
                document.cookie= name + "="+cval+";expires="+exp.toGMTString(); 
        }
        delCookie("clientinfo");
    },
    watch:{
        phone : {
            handler:function(curVal,oldVal){
　　　　　　　　　　if(curVal.phoneno){
                        this.phone.entered='block';
                    }else{
                        this.phone.entered='none';
                    }
　　　　　　　　　　},
　　　　　　　　　　deep:true
            }

    }

}
</script>