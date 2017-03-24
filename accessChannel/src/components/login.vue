<template>
    <div>
        <!-- 贷款申请评估 start -->
    <div><img src="../images/info-banner.png" alt=""></div>
    <div class="info-box info-box-home">
        <div class="info-input info-margin" :class="{error:phoneerror.isshow}">
            <input type="tel" placeholder="手机号" id="tel" maxlength="11" v-model="subData.phone" @blur="phonechange()" @focus="phonefocus()"/>
            <div class="info-error-msg">{{phoneerror.msg}}</div>
            <div class="info-input-clear" :style="{display:phoneclear}" @click="phoneclearFunc()">
                <img src="../images/info-input-clear.png" />
            </div>
        </div>
        <div class="info-input info-margin" id="imgCode" v-show="showPicCode">
            <input type="text" placeholder="动态验证码" maxlength="4" id="yzm" v-model="subData.picyzm"/>
            <div class="info-error-msg">动态验证码错误</div>
            <div class="info-code" >
                <img class="code-img" src="" alt="">
            </div>
        </div>
        <div class="info-input info-margin">
            <input type="text" placeholder="验证码" id="telCode" maxlength="6" v-model="subData.yzm"/>
            <div class="info-error-msg">验证码输入错误，请重新发送</div>
            <div class="info-code" @click="sendMes()">
                <span class="code-send">立即获取</span>
            </div>
        </div>
        
        <label class="info-margin info-checkbox">
            <input type="checkbox" class="checkbox" name="subscribe" checked="checked">
            若有平安最新产品或服务信息，我们将按照以上号码发送给您。
        </label>
        <div class="info-btn-next info-margin c">
            <a href="javascript:void(0);" id="telsubmit"><img src="../images/info-btn-next.png"></a>
        </div>
    </div>
    <!-- 贷款申请评估 end -->
    </div>
    
</template>

<script>
    
    export default{
        data : function(){
            return {
                phoneclear:'none',
                showPicCode:false,
                subData:{
                    phone:"",
                    picyzm:"",
                    yzm:""
                },
                phoneerror:{
                    isshow:false,
                    msg:""

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
            sendMes:function(){
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
                option.url = "http://localhost:8091/servlet/channelAccess/action/ChannelAccessAction";
                var requestParam = {};
                var param = {};
                param.phone=this.subData.phone;
                var paramStr = encodeURIComponent(JSON.stringify(param));
                requestParam.function="SendSMS";
                requestParam.param=paramStr;
                option.params = requestParam;
                option.before = function(){
                }
                this.$http(option).then(function(data){
                    data = data.data;
                
                
                }).catch(function(data){                
                    console.log(data);
                });
            }
        },
          watch: {
            subData : {
                handler(curVal,oldVal){
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