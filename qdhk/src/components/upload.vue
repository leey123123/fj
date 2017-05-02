<template>
<div>
    <header>
    <div class="head"><h1>上传身份证照片</h1></div>
    <a href="javascript:void(0);" onClick="javascript:history.go(-1)" title="返回" id="headerLeft">取消</a>
    <a href="javascript:void(0);" id="headerRight" @click="upload()">提交</a>
    </header>
    <div style="height: .84rem; width: 100%;"></div>
    <article>
        <section class="id-upload">
            <ul class="card-pic">
                <li>
                    <a href="javascript:void(0);">
                        <input type="file" name="" class="input-upload" accept="image/jpg,image/jpeg,image/png"  @change="uploadposition">
                        <div class="card-side">
                            <div class="add-pic" style="display: block;"><i class="chicon-plus">+</i></div>
                            <div><img src="../images/card-front.jpg" alt="" style="display: inline-block;" v-if="!pshow"></div>
                            <div><img :src="imgposition" alt="" style="display: inline-block;" v-if="pshow"></div>
                            <p class="card-explain">上传身份证正面</p>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="javascript:void(0);">
                        <input type="file" name="" class="input-upload" accept="image/jpg,image/jpeg,image/png" @change="uploadopposite">
                        <div class="card-side">
                            <div class="add-pic" style="display: block;"><i class="chicon-plus">+</i></div>
                            <div><img src="../images/card-back.jpg" alt="" v-if="!oshow"></div>
                            <div><img :src="imgopposite" alt="" v-if="oshow"></div>
                            <p class="card-explain">上传身份证背面</p>
                        </div>
                    </a>
                </li>
              <!--   <li>
                  <a href="javascript:void(0);">
                      <div class="card-side">
                          <div class="card-cover">
                              <img src="../images/card-front01.jpg" alt="">
                              <div class="cover-bg" style="height: 75%;"></div>
                          </div>
                          <p class="card-explain">上传中...</p>
                      </div>
                  </a>
              </li>
              <li>
                  <input type="file" name="" class="input-upload">
                  <a href="javascript:void(0);">
                      <div class="card-side">
                          <div><img src="../images/card-front01.jpg" alt=""></div>
                          <p class="card-explain">重新上传</p>
                      </div>
                  </a>
              </li> -->
            </ul>
        </section>
        <div class="apply-btn"><a href="javascript:void(0);" class="btn-login btn-submit" @click="upload()">提交</a></div>
        <div class="card-tip">
            <h3 class="card-tit">
                <span>小贴士</span>
                <i class="through-line"></i>
            </h3>
            <ul class="pic-tip box_box">
                <li>
                    <img src="../images/card-right.jpg" alt="">
                    <i class="chicon-right"></i>
                    <p>正确示范</p>
                </li>
                <li>
                    <img src="../images/card-wrong01.jpg" alt="">
                    <i class="chicon-wrong"></i>
                    <p>边框缺失</p>
                </li>
                <li>
                    <img src="../images/card-wrong02.jpg" alt="">
                    <i class="chicon-wrong"></i>
                    <p>照片模糊</p>
                </li>
                <li>
                    <img src="../images/card-wrong03.jpg" alt="">
                    <i class="chicon-wrong"></i>
                    <p>曝光过度</p>
                </li>
            </ul>
        </div>
    </article>
</div>
    
</template>
<script>
import '../js/lrz.bundle.js'
    export default{
        data:function(){
            return {
              pshow:false,
              oshow:false,
              imgposition:'',
              imgopposite:'',
              config: {
                    width: 800,
                    height: 400,
                    quality: 0.8
                }
            }
        },
        methods:{
          uploadposition:function(e){

            var self = this
            var file = e.target.files[0]

            lrz(file, self.config)
                    .then(function (rst) {
                        self.imgposition = rst.base64;
                        self.pshow = true;
                    })
                    .catch(function (err) {
                        console.log(err)
                    })
                    .always(function () {
                        // 清空文件上传控件的值
                        e.target.value = null
                    })
          },
          uploadopposite:function(e){

            var self = this
            var file = e.target.files[0]

            lrz(file, self.config)
                    .then(function (rst) {
                        self.imgopposite = rst.base64;
                        self.oshow = true;
                    })
                    .catch(function (err) {
                        console.log(err)
                    })
                    .always(function () {
                        // 清空文件上传控件的值
                        e.target.value = null
                    })
          },
          tologin:function(){
          this.$router.replace({name:'login'});
        },

          upload:function(){
            var vm = this;
            if(!vm.pshow){
              Toast({
                    message: "请先上传身份证正面",
                    position: 'bottom',
                    duration: 1500
                  });
              return;
            }
            if(!vm.oshow){
              Toast({
                    message: "请先上传身份证反面",
                    position: 'bottom',
                    duration: 1500
                  });
              return;
            }
            var list = [];
            var key = sessionStorage.getItem('key');
            if(!key){
              this.$router.replace({name:'login'});
              return;
            }
            var imgPosition = vm.imgposition;
            imgPosition  = imgPosition.replace('data:image/jpeg;base64,','');
            var position = {filetype:'1' , filecontent:imgPosition };

            var imgOpposite = vm.imgopposite;
            imgOpposite  = imgOpposite.replace('data:image/jpeg;base64,','');
            var opposite = {filetype:'2' , filecontent:imgOpposite};

            list.push(position);
            list.push(opposite);

            var url = this.$baseRoot+"ChannelAccessAction?function=GetOcrUserInfo";
            var requestParam = {};
            requestParam.flist = list;
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
                    if(errorcode==="-998"||errorcode===-998){
                          setTimeout(vm.tologin, 1500);
                        }
                    
                    return;
                }
                var results = data.results;
                var sbData = results[0];
                vm.extend(sbData);
                vm.$router.replace({name:'add'});
                
                
            
            }).catch(function(data){                

            });
          }

        }
    }
</script>