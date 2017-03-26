<template>
   <div>
        <div class="page-hd">
            <div class="weui-flex">
                <div class="weui-flex__item ">
                    <div class="wx-info">
                        <div class="avatar">
                            <img src="">
                        </div>
                        <div class="name">哈利路亚</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="page-bd">
            <div class="weui-cells weui-cells_form validation-panel">
                <div class="weui-cell">
                    <div class="weui-cell__hd">
                        <label class="weui-label">手机号</label>
                    </div>
                    <div class="weui-cell__bd">
                        <input class="weui-input" type="text" v-model="subData.phone" placeholder="输入您的手机号码" maxlength="11" @focus="phonefocus()" @blur="phonechange()">
                    </div>
                    <div class="weui-icon-cancel cancelbtn" :style="{display:phoneclear}" @click="phoneclearFunc()">
                        <i class="cancelbtn"></i>
                    </div>
                </div>
                <div class="weui-cells__error__msg" v-show="phoneerror.isshow">{{phoneerror.msg}}</div>
                <div class="weui-cell weui-cell_vcode">
                    <div class="weui-cell__hd">
                        <label class="weui-label">手机验证码</label>
                    </div>
                    <div class="weui-cell__bd">
                        <input class="weui-input"  type="text" v-model="subData.yzm" placeholder="请输入验证码" maxlength="6">
                    </div>
                    <div class="weui-cell__ft">
                        <button class="weui-vcode-btn" :class="{'weui-vcode-btn_disabled':yzmwait.issending}" @click="sendMes()">{{yzmwait.content}}</button>
                    </div>
                </div>
            </div>
            <a href="javascript:;" class="weui-btn weui-btn_default bind-confirm-button" @click="bind()">确认绑定</a>
            <p class="agreement">注册即表示同意 <a href="javascript:void(0);">《富爵金融xxxx服务协议》</a></p>
        </div>
        <div class="page-ft"></div>
    </div>
    
</template>

<script>
    
    export default{
        data : function(){
            return {
                timer:"",
                num:120,
                phoneclear:'none',
                subData:{
                    openId:'a',
                    phone:"",
                    yzm:""
                },
                phoneerror:{
                    isshow:false,
                    msg:""

                },
                yzmwait:{
                    issending:false,
                    content:"获取验证码"
                }


            };
        },
        methods:{
            
            phonechange:function(){
                var phone = this.subData.phone;
                var reg = /1[0-9]{10}/;
                if(!reg.test(phone)){
                    this.phoneerror.msg="请输入正确的手机号码";
                    this.phoneerror.isshow=true;
                }
                
            },
            phonefocus:function(){
                this.phoneerror.msg="";
                this.phoneerror.isshow=false;
            },
            phoneclearFunc:function(){
                this.subData.phone="";
            },
            countdown:function(){
                this.yzmwait.issending=true;
                this.num--;
                this.yzmwait.content = this.num+"后重发";
                if(this.num<=0){
                    this.num=120;
                    clearTimeout(this.timer);
                    this.timer="";
                    this.yzmwait.issending=false;
                    this.yzmwait.content = "获取验证码";
                    return;
                }
                setTimeout(this.countdown,1000);
            },
            sendMes:function(){
                if(this.num!==120){
                    return;
                }

                var reg = /1[0-9]{10}/;
                if(!reg.test(this.subData.phone)){
                   Toast({
                      message: '请输入正确的手机号码',
                      position: 'bottom',
                      duration: 1500
                    });
                   return;
                }
                var option = {};
                option.url = "http://localhost:8888/sendmes";
                var requestParam = {};
                requestParam.phone = this.subData.phone;
                option.params = requestParam;
                option.before = function(){
                }
                this.$http(option).then(function(data){
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
                        
                        return;
                    }
                    this.timer = setTimeout(this.countdown,1000);
                    
                    
                
                }).catch(function(data){                

                });
            },
            bind:function(){
                var reg = /1[0-9]{10}/;
                var regyzm = /[0-9]{6}/;
                if(!reg.test(this.subData.phone)){
                   Toast({
                      message: '请输入正确的手机号码',
                      position: 'bottom',
                      duration: 1500
                    });
                   return;
                }
                if(!regyzm.test(this.subData.yzm)){
                   Toast({
                      message: '验证码输入错误',
                      position: 'bottom',
                      duration: 1500
                    });
                   return;
                }
                var option = {};
                option.url = "http://localhost:8888/weixin/bind";
                var requestParam = {};
                requestParam.openId = this.subData.openId;
                requestParam.mobileNum = this.subData.phone;
                requestParam.validCode = this.subData.yzm;
                option.params = requestParam;
                option.before = function(){
                }
                this.$http(option).then(function(data){
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
                        
                        return;
                    }
                    this.$router.push({name:'loginsuccess'});
                    
                    
                
                }).catch(function(data){                

                });
            }
        },
          watch: {
            subData : {
                handler:function(curVal,oldVal){
　　　　　　　　　　　　if(curVal.phone){
                            this.phoneclear='block';
                        }else{
                            this.phoneclear='none';
                        }
　　　　　　　　　　},
　　　　　　　　　　deep:true
            }
          },
        components:{
            
        }
    }
</script>

<style>
    .cancelbtn{
        color:#d4d4d4;
        font-size:.3rem;
    }
</style>