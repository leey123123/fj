<template>
<div>
    <div class="page-hd">
        <div class="error-panel">
            <div class="title">协议1</div>
            <div class="message">温馨提示:您尚未绑定富爵微信服务，请按照提示绑定谢谢！温馨提示:您尚未绑定富爵微信服务，请按照提示绑定谢谢！
            温馨提示:您尚未绑定富爵微信服务，请按照提示绑定谢谢！温馨提示:您尚未绑定富爵微信服务，请按照提示绑定谢谢！
            温馨提示:您尚未绑定富爵微信服务，请按照提示绑定谢谢！温馨提示:您尚未绑定富爵微信服务，请按照提示绑定谢谢！温馨提示:您尚未绑定富爵微信服务，请按照提示绑定谢谢！温馨提示:您尚未绑定富爵微信服务，请按照提示绑定谢谢！
            温馨提示:您尚未绑定富爵微信服务，请按照提示绑定谢谢！
            温馨提示:您尚未绑定富爵微信服务，请按照提示绑定谢谢！
            温馨提示:您尚未绑定富爵微信服务，请按照提示绑定谢谢！
            温馨提示:您尚未绑定富爵微信服务，请按照提示绑定谢谢！
            温馨提示:您尚未绑定富爵微信服务，请按照提示绑定谢谢！
            温馨提示:您尚未绑定富爵微信服务，请按照提示绑定谢谢！
            温馨提示:您尚未绑定富爵微信服务，请按照提示绑定谢谢！
            温馨提示:您尚未绑定富爵微信服务，请按照提示绑定谢谢！
            温馨提示:您尚未绑定富爵微信服务，请按照提示绑定谢谢！
            温馨提示:您尚未绑定富爵微信服务，请按照提示绑定谢谢！
            </div>


        </div>
    </div>
    <div class="page-bd">
        
    </div>
    <div class="page-ft">
        <div class="bind-wx-button">
            <a href="javascript:;" class="weui-btn weui-btn_default confirm-button" @click="showSign()">签署协议</a>
        </div>
    </div>  
    <mt-popup v-model="popupVisible" position="bottom">
        <canvas class="pad" id='pad'align="center"></canvas>
    </mt-popup>
</div>
</template>
<script>
import mtPopup from '../../commom/popup';
import '../../commom/popup/style.css';
import sign from '../../js/signature_pad';
export default{
    data:function(){
        return {
            popupVisible:false,
            signaturePad:""
        }
    },
    methods:{
        showSign:function(){
            if(this.signaturePad===""||this.signaturePad===undefined){
                var canvas = document.getElementById('pad');
                this.signaturePad = new sign(canvas, {
                                            backgroundColor: 'rgb(255,255,255)',
                                            onBegin: function() {
                                                console.log('onbegin')
                                            },
                                            onEnd: function() {
                                                console.log('onEnd')
                                            }
                                        });
            }
            this.popupVisible = !this.popupVisible;
        }
    },
    components:{
        'mtPopup':mtPopup
    }
}

</script>