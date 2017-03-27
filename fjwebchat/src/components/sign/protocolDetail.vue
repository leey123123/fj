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
     <div id="signature-pad" class="m-signature-pad">
        <div class="m-signature-pad--body">
          <canvas id="signcan"></canvas>
        </div>
        <div class="m-signature-pad--footer">
          <div class="left" @click="clear()">
            <a href="javascript:void(0);">清除</a>
          </div>
          <div class="right" @click="signBase64()">
            <a href="javascript:void(0);">签署</a>
          </div>
        </div>
      </div>
</div>
</template>
<script>
import sign from '../../js/signature_pad';
export default{
    data:function(){
        return {
            popupVisible:false,
            signaturePad:""
        }
    },
    methods:{
        sign:function(){
            var canvas = document.getElementById('signcan');
            this.resizeCanvas(canvas);
            this.signaturePad = new sign(canvas,{
                minWidth:2,
                maxWidth:5
            });
        },
        showSign:function(){
            if(this.signaturePad===""||this.signaturePad===undefined){

                setTimeout(this.sign,1000);
                
            }
        },
        resizeCanvas:function(canvas) {

            var ratio =  Math.max(window.devicePixelRatio || 1, 1);
            canvas.width = canvas.offsetWidth * ratio;
            canvas.height = canvas.offsetHeight * ratio;
            canvas.getContext("2d").scale(ratio, ratio);
        },
        clear:function(){
            this.signaturePad.clear();
        },
        signBase64:function(){
            if (this.signaturePad.isEmpty()) {
                alert("Please provide signature first.");
            } else {
                console.log(this.signaturePad.toDataURL());
            }
        }
    },
    created:function(){
        this.showSign();
    }
}

</script>

<style>
    
.m-signature-pad {
  position: fixed;
  width: 100%;
  height: 40%;
  bottom: 0;
  border: 1px solid #e8e8e8;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.27), 0 0 40px rgba(0, 0, 0, 0.08) inset;
  border-radius: 4px;
}

.m-signature-pad:before, .m-signature-pad:after {
    position: absolute;
  z-index: -1;
  content: "";
    width: 40%;
    height: 10px;
    left: 20px;
    bottom: 10px;
    background: transparent;
    -webkit-transform: skew(-3deg) rotate(-3deg);
    -moz-transform: skew(-3deg) rotate(-3deg);
    -ms-transform: skew(-3deg) rotate(-3deg);
    -o-transform: skew(-3deg) rotate(-3deg);
    transform: skew(-3deg) rotate(-3deg);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.4);
}

.m-signature-pad:after {
    left: auto;
    right: 20px;
    -webkit-transform: skew(3deg) rotate(3deg);
    -moz-transform: skew(3deg) rotate(3deg);
    -ms-transform: skew(3deg) rotate(3deg);
    -o-transform: skew(3deg) rotate(3deg);
    transform: skew(3deg) rotate(3deg);
}

.m-signature-pad--body {
  position: absolute;
  left: 20px;
  right: 20px;
  top: .1rem;
  bottom: 1.2rem;
  border: 1px solid #f4f4f4;
}

.m-signature-pad--body
  canvas {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 4px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.02) inset;
  }

.m-signature-pad--footer {
    position: absolute;
    left: 20px;
    right: 20px;
    bottom: .2rem;
    height: 1rem;
}

.m-signature-pad--footer
  .description {
    color: #C3C3C3;
    text-align: center;
    font-size: 1.2em;
    margin-top: 1em;
  }

.m-signature-pad--footer
  .left, .right {
    position: absolute;
    bottom: 0;
    width:50%;
    text-align: center;
    height: 1rem;
  }

.m-signature-pad--footer
  .left {
    left: 0;
  }

.m-signature-pad--footer
  .right {
    right: 0;
  }

@media screen and (max-width: 1024px) {
  .m-signature-pad {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 40%;
    min-width: 250px;
    min-height: 140px;
  }
  #github {
    display: none;
  }
}

@media screen and (min-device-width: 768px) and (max-device-width: 1024px) {
  /* .m-signature-pad {
    margin: 10%;
  } */
}

@media screen and (max-height: 320px) {
  .m-signature-pad--body {
    left: 0;
    right: 0;
    top: 0;
    bottom: 32px;
  }
  .m-signature-pad--footer {
    left: 20px;
    right: 20px;
    bottom: 4px;
    height: 28px;
  }
  .m-signature-pad--footer
    .description {
      font-size: 1em;
      margin-top: 1em;
    }
}
.m-signature-pad--footer a{
    font-size: .35rem
}

</style>