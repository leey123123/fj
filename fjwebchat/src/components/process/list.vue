<template>
    <div>
        <div class="weui-cells apply-list">
            <a class="weui-cell" href="javascript:void(0);" v-for="item in data" @click="getDetail(item.loanId)">
                <div class="weui-cell__bd">
                    <p>{{item.productName}}</p>
                    <p>{{item.loanId}}</p>
                    <p>状态:<span class="apply-status">{{item.currentState|toStatusName}}</span></p>
                </div>
                <div class="weui-cell__ft">
                    <p>{{item.currentState}}</p>
                </div>
            </a>
        <!--     <a class="weui-cell" href="javascript:;">
            <div class="weui-cell__bd">
                <p>保单贷</p>
                <p>123456789000</p>
                <p>状态:<span class="apply-status apply-status__defeat">审核中</span></p>
            </div>
            <div class="weui-cell__ft">
                <p>2016-11-11</p>
            </div>
        </a>
        <a class="weui-cell" href="javascript:;">
            <div class="weui-cell__bd">
                <p>保单贷</p>
                <p>123456789000</p>
                <p>状态:<span class="apply-status ">审核失败</span></p>
            </div>
            <div class="weui-cell__ft">
                <p>2016-11-11</p>
            </div>
        </a> -->
        </div>
    </div>
</template>
<script>
    var statusF={
        "status_1":"审核中",
        "status_2":"审核通过",
        "status_3":"审核失败",
        "status_4":"面签中",
        "status_5":"面签是吧",
    }
    export default{
        data:function(){
            return {
                data:[]
            }
        },
        beforeCreate:function(){
           var code =  this.$route.query.code;
           var state =  this.$route.query.state;
           var url = location.href;
           var param = {'code':code,'state':state,'url':url};
           this.$checkBind(param,this.queryProcessList);
        },
        methods:{
            queryProcessList:function(){
                var user_idS = sessionStorage.getItem("user_id");
                var code = sessionStorage.getItem("code");
                if(user_idS && user_idS){
                    var user_id = secret.Decrypt(user_idS,code);                   

                     var option = {};
                    option.url = "http://localhost:8888/process/query";
                    option.params = {user_id:user_id};
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
                            return;
                        }
                        this.data = data.data;
                    
                    }).catch(function(data){                

                    });
                }else{
                    this.$router.push({name:'fail'});
                }
            },
            getDetail:function(loanId){
                this.$router.push({name:'detail',query:{'loainid':loanId}});
            }

        },
        filter:{
            toStatusName:function(val){
                var key = "status_"+val;
                return statusF[key];
            }
            }
    }
    
</script>