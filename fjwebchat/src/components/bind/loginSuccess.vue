<template>
<div>
   <div class="page-hd">
        <div class="success-panel">
            <div class="title">
            <i class="weui-icon-success"></i>
            绑定成功
            </div>
            <div class="message">功能可以正常使用了，请返回！</div>
        </div>
    </div>
    <div class="page-bd">
        
    </div>
    <div class="page-ft">
        <div class="bind-wx-button">
            <a href="javascript:;" class="weui-btn weui-btn_default confirm-button" @click="goback()">返回</a>
        </div>
    </div> 
</div>
</template>

<script>

    export default{
        data:function(){
            return{}
        },
        methods:{
            goback:function(){
                if(WeixinJSBridge){
                    WeixinJSBridge.call("closeWindow");
                }
                
            }
        },
        created:function(){
            this.$checkBind();
        }
    }
</script>

