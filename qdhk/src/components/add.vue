<template>
    <div>
        <header>
            <div class="head"><h1>录入申请单</h1></div>
            <a href="javascript:void(0);" onClick="javascript:history.go(-1)" title="返回" id="headerLeft">取消</a>
        </header>
        <div style="height: .84rem; width: 100%;"></div>  

        <!-- popup end-->
        <section class="steps">
          <div class="">
              <ul class="basis_list box_box">
                  <li class="active">
                      <div>
                           <p><i>1</i></p>
                           <p>录入信息</p>
                       </div>
                       <p class="basis_left_line basis_list_line"><span></span></p>
                  </li>
                  <li class="box_flex">
                      <div>
                           <p><i>2</i></p>
                           <p>选择贷款方案</p>
                       </div>
                       <p class="basis_list_line"><span class="basis_list_line"></span></p>
                  </li>
                  <!-- <li class="box_flex">
                      <div class="basis_list_second">
                           <p><i>2</i></p>
                           <p>选择贷款方案</p>
                       </div>
                       <p class="basis_list_line"><span class="basis_list_line"></span></p>
                  </li> -->
                  <li>
                       <div>
                           <p><i>3</i></p>
                           <p>完善信息</p>
                       </div>
                       <p class="basis_right_line basis_list_line"><span></span></p>
                  </li>
              </ul>
          </div>
        </section>
        <article>
            <div style="display: none;">
              <div class="con-tip box_vam">
                <p><i class="chicon-tip"></i> 此证件号码信用记录不良，无法办理</p>
              </div>
            </div>
            <ul class="list-apply apply-input-group">
                <li>
                    <label>姓名</label>
                    <input type="text" name="" value="" placeholder="请输入姓名" class="box_flex" v-model="applyMes.customername">
                </li>
                <li>
                    <label>证件类型</label>
                    <input type="text" name="" value="身份证" class="box_flex" readonly="true">
                    <div class="apply-icon box_vam"><i class="chicon-down"></i></div>
                </li>
                <li>
                    <label>身份证</label>
                    <input type="text" name="" value="" placeholder="请输入身份证号" class="box_flex" maxlength="18" v-model="applyMes.certid" @blur="checkcertid()">
                    <div class="apply-icon box_vam mo_click" @click="touplaod()"><i class="chicon-camera"></i></div>
                </li>
                <li @click="choiceEmployType()">
                    <label>雇佣类型</label>
                    <input type="text" name="" value="" v-model="applyMes.employtype" class="box_flex" readonly="true" placeholder="请选择雇佣类型">
                    <div class="apply-icon box_vam"><i class="chicon-down"></i></div>
                </li>
                <li>
                    <label>证件开始日</label>
                    <input type="date" name="" value="" class="box_flex"  v-model="applyMes.certstartdate" placeholder="请选择">
                </li>
                <li>
                    <label>证件结束日</label>
                    <input type="date" name="" value="" class="box_flex"  v-model="applyMes.certmaturitydate" placeholder="请选择">
                </li>

                <li>
                    <label>发证机关所在地</label>
                    <textarea name="" style="text-align:right;" class="box_flex" v-model="applyMes.certplace" placeholder="请输入发证机关所在地"></textarea>  
                </li>
                <li>
                    <label>手机号码</label>
                    <input type="tel" name="" value="" placeholder="请输入手机号码" class="box_flex nums-input" v-model="applyMes.mobiletelephone" maxlength="11">
                    <!-- <p class="text-succ" @click="sendMes()">&nbsp;{{yzm.content}}</p> -->
                </li>
                <li @click="nativeflagShow()">
                    <label>户籍类型</label>
                    <input type="text" name="" :value="getdicname('nativeflag',applyMes.nativeflag)" class="box_flex" placeholder="请选择贷款用途" readonly="true">
                    <div class="apply-icon box_vam"><i class="chicon-down"></i></div>
                </li>
                <li @click="choiceLoansUsedNature()">
                    <label>贷款用途性质</label>
                    <input type="text" placeholder="请选择" name="" :value="getdicname('loansUsedNature',applyMes.loansUsedNature)" class="box_flex"  readonly="true">
                    <div class="apply-icon box_vam"><i class="chicon-down"></i></div>
                </li>
                <!-- <li>
                    <label>验证码</label>
                    <input type="text" name="" value="083324" class="box_flex" v-model="yzm.code" maxlength="6">
                </li> -->
            </ul>
            <div class="apply-btn"><a href="javascript:void(0);" class="btn-login btn-submit" @click="submit()">保存</a></div>
        </article>

        <!-- <transition name="popup-ad-bottom" v-on:after-leave="afterLeave" v-on:before-enter="beforeEnter">
        <div id="signature-pad" class="popup-ad-bottom" v-show="popupVisible">
            <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
          </div>
              </transition> -->


      <transition name="popup-middle-opacity" v-on:after-leave="afterLeave" v-on:before-enter="beforeEnter">
          <article class="popup-bg" v-show="alertshow">
              <!-- 提示 -->
              <section class="popup-boxes popup-box-top">
                 <div class="popup-title">
                    <h3>无法获取征信报告</h3>
                 </div>
                 <div class="popup-con box_vam">
                      <p>{{alertcontent}}</p>
                      
                 </div>
                 <div class="popup-btn box_box" @click="yes()">
                    <a href="javascript:void(0);">好</a>
                </div>
              </section>
          </article>
      </transition>      

      <div class="shadeAll" v-show="shadowShow" @click="hide()"></div>


    </div>
</template>
<script>
export default{
  

    data:function(){
        return{
          nativeflag:{
                picker:'',
                adata:''
          },
          loansUsedNature:{
                picker:'',
                adata:''
            },
          role:{
            role:'',
            user_id:''
          },
            employeeType:{
                picker:'',
                adata: ''
            },
            yzm:{
              issending:false,
              num :120,
              timer:'',
              content:'发送验证码',
              code:''
            },
            applyMes:{
              employtype:'',
              employtypecode:'',
              customername:'',
              certid:'',
              birthday:'',
              sex:'',
              mobiletelephone:'',
              certstartdate:'',
              certmaturitydate:'',
              certplace:'',
              nativeflag:'',
              loansUsedNature:''
            },
            alertshow:false,
            alertcontent:'',
            shadowShow:false
        }
    },
    methods:{
        nativeflagShow:function(){
          var vm = this;
            vm.nativeflag.picker.show();
        },
        choiceLoansUsedNature:function(){
          var vm = this;
            vm.loansUsedNature.picker.show();
        },
        choiceEmployType:function(){
          this.employeeType.picker.show();
        },
        hide:function(){
        },
        afterLeave:function(){
            this.shadowShow = false;
        },
        beforeEnter:function(){
            this.shadowShow = true;
        },
        yes:function(){
          this.$router.push({name:'baseinfo'});
        },
        tologin:function(){
          this.$router.replace({name:'login'});
        },
        sendMes:function(){
          var vm = this;
            if(vm.yzm.num!==120){
                    return;
                }

                var reg = /1[0-9]{10}/;
                if(!reg.test(vm.applyMes.mobiletelephone)){
                   Toast({
                      message: '请输入正确的手机号码',
                      position: 'bottom',
                      duration: 1500
                    });
                   return;
                }
                var url = this.$baseRoot+"doSendSMS";
                var requestParam = {};
                requestParam.phone = vm.applyMes.mobiletelephone;
               
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
                    vm.yzm.timer = setTimeout(vm.countdown,1000);
                    
                    
                
                }).catch(function(data){                

                });
        },
        countdown:function(){
          var vm = this;
            vm.yzm.issending=true;
            vm.yzm.num--;
            vm.yzm.content = vm.yzm.num+"后重发";
            if(vm.yzm.num<=0){
                vm.yzm.num=120;
                clearTimeout(vm.yzm.timer);
                vm.yzm.timer="";
                vm.yzm.issending=false;
                vm.yzm.content = "获取验证码";
                return;
            }
            setTimeout(vm.countdown,1000);
        },
        getdicname:function(dickey,valuekey){
          var vm = this;
          var dict = vm[dickey].adata;
          for(var i=0;i<dict.length;i++){
              if(dict[i].value===valuekey){
                  return dict[i].text;
              }
          }
          return '';
        },
        initselect:function(){
          var vm = this;
          var dict = JSON.parse(sessionStorage.getItem('qddict'));
          vm.employeeType.adata = dict.employeetype;
          vm.nativeflag.adata = dict.nativeflag;
          vm.loansUsedNature.adata = dict.loansUsedNature;
          if(this.nativeflag.picker===""||this.nativeflag.picker===undefined){
              this.nativeflag.picker = new this.Picker({
                  'data': [vm.nativeflag.adata]
                });

            this.nativeflag.picker.on('picker.select', function (selectedVal, selectedIndex) {
              vm.applyMes.nativeflag = vm.nativeflag.adata[selectedIndex].value;
              
            });

            this.nativeflag.picker.on('picker.valuechange', function (selectedVal, selectedIndex) {
              vm.applyMes.nativeflag = vm.nativeflag.adata[selectedIndex].value;
            });
          }

          if(this.loansUsedNature.picker===""||this.loansUsedNature.picker===undefined){
              this.loansUsedNature.picker = new this.Picker({
                  'data': [vm.loansUsedNature.adata]
                });

            this.loansUsedNature.picker.on('picker.select', function (selectedVal, selectedIndex) {
              vm.applyMes.loansUsedNature = vm.loansUsedNature.adata[selectedIndex].value;
              
            });

            this.loansUsedNature.picker.on('picker.valuechange', function (selectedVal, selectedIndex) {
              vm.applyMes.loansUsedNature = vm.loansUsedNature.adata[selectedIndex].value;
            });
          }
          if(this.employeeType.picker===""||this.employeeType.picker===undefined){
            this.employeeType.picker = new this.Picker({
                'data': [vm.employeeType.adata]
              });

          this.employeeType.picker.on('picker.select', function (selectedVal, selectedIndex) {
            vm.applyMes.employtype = vm.employeeType.adata[selectedIndex].text;
            vm.applyMes.employtypecode = vm.employeeType.adata[selectedIndex].value;
            
          });

          this.employeeType.picker.on('picker.valuechange', function (selectedVal, selectedIndex) {
            vm.applyMes.employtype = vm.employeeType.adata[selectedIndex].text;
            vm.applyMes.employtypecode = vm.employeeType.adata[selectedIndex].value;
          });
        }


        },
        initpage:function(){
          var vm = this; 
          vm.$parent.type=1; 
          var key = sessionStorage.getItem('key');
          if(!key){
            this.$router.replace({name:'login'});
            return;
          }
          var userMes = sessionStorage.getItem('userMes');
          if(!userMes){
            this.$router.replace({name:'login'});
            return;
          }
          userMes = this.$Decrypt(userMes,key);
          var userMesArray = userMes.split('|');
          vm.role.role = userMesArray[1]; 
          vm.role.user_id = userMesArray[0];

          var mes = sessionStorage.getItem("addMestemp")||"{}";
          mes = JSON.parse(mes);
          for(var x in vm.applyMes){
            vm.applyMes[x] = mes[x];
          }
          this.initselect();
              
        },
        submit:function(){
          var vm = this;
          if(!this.checkMes()){
            return;
          }
          var param = {};
          param.customername = vm.applyMes.customername;
          param.mobiletelephone = vm.applyMes.mobiletelephone;
          param.certplace = vm.applyMes.certplace;
          param.certstartdate = vm.applyMes.certstartdate;
          param.certmaturitydate = vm.applyMes.certmaturitydate;
          param.certtype = 'Ind01';
          param.certid = vm.applyMes.certid;
          param.employeetype = vm.applyMes.employtypecode;
          param.loansUsedNature = vm.applyMes.loansUsedNature;
          param.nativeflag = vm.applyMes.nativeflag;
          param.sex = vm.applyMes.sex;
          param.birthday = vm.applyMes.birthday;
          param.roleid = vm.role.role;
          param.id = vm.role.user_id;

          var url = this.$baseRoot+"ChannelAccessAction?function=SaveCustomerApplyBasicInfo";
          var json = {param:param}
          this.$http.post(url,json).then(function(data){
            
              var data = data.body;
              var errorcode = data['error_no'];
              var errorinfo = data['error_info'];
              var results = data.results;
              if(errorcode!==0 && errorcode!=='0'){
                  Toast({
                    message: errorinfo,
                    position: 'bottom',
                    duration: 1500
                  });

                  if(errorcode==="-998"||errorcode===-998){
                         setTimeout(vm.tologin, 2000);
                        }
                  
                  return;
              }
         
          var applyid = results[0].applyid;
            var tempjson = vm.applyMes;
            var jsonto = {};
            jsonto['employeetype']  = tempjson['employtypecode'];
            jsonto['customername']  = tempjson['customername'];
            jsonto['certid']  = tempjson['certid'];
            jsonto['birthday']  = tempjson['birthday'];
            jsonto['sex']  = tempjson['sex'];
            jsonto['certtype']  = 'Ind01';
            jsonto['mobiletelephone']  = tempjson['mobiletelephone'];
            jsonto['certplace']  = tempjson['certplace'];
            jsonto['certstartdate']  = tempjson['certstartdate'];
            jsonto['certmaturitydate']  = tempjson['certmaturitydate'];
            jsonto['nativeflag']  = tempjson['nativeflag'];
            jsonto['loansUsedNature']  = tempjson['loansUsedNature'];
            jsonto['applyid']  = applyid;
            jsonto['dataAbled']  = false;
            var val = vm.extend(jsonto);

            if(val===0){
              this.$router.push({name:'loantrial'});
            }else if(val === 2){
              this.$router.replace({name:'login'});
              return;
            }else{
              Toast({
                    message: "合并json异常!",
                    position: 'bottom',
                    duration: 1500
                  });
            };


              
              
          
          }).catch(function(data){                

          });

        },
        checkMes:function(){
          
          if(!this.applyMes.customername){
            Toast({
                    message: "姓名不能为空",
                    position: 'bottom',
                    duration: 1500
                  });
            return false;
          }
          if(!this.applyMes.certid){
            Toast({
                    message: "身份证不能为空！",
                    position: 'bottom',
                    duration: 1500
                  });
            return false;
          }
           if(!this.IdCardValidate(this.applyMes.certid)){
            Toast({
                    message: "身份证格式错误",
                    position: 'bottom',
                    duration: 1500
                  });
            return false;
          }
          if(!this.applyMes.employtype){
            Toast({
                    message: "请先选择雇佣类型",
                    position: 'bottom',
                    duration: 1500
                  });
            return false;
          }
          if(!this.applyMes.mobiletelephone){
            Toast({
                    message: "请输入手机号码",
                    position: 'bottom',
                    duration: 1500
                  });
            return false;
          }
          if(!this.applyMes.certstartdate){
            Toast({
                    message: "请输入证件开始日",
                    position: 'bottom',
                    duration: 1500
                  });
            return false;
          }
          if(!this.applyMes.certmaturitydate){
            Toast({
                    message: "请输入证件结束日",
                    position: 'bottom',
                    duration: 1500
                  });
            return false;
          }
          if(!this.applyMes.certplace){
            Toast({
                    message: "请先输入证件所在地",
                    position: 'bottom',
                    duration: 1500
                  });
            return false;
          }
          if(!this.applyMes.nativeflag){
            Toast({
                    message: "请先选择户籍类型",
                    position: 'bottom',
                    duration: 1500
                  });
            return false;
          }
          if(!this.applyMes.loansUsedNature){
            Toast({
                    message: "请先选择贷款用途性质",
                    position: 'bottom',
                    duration: 1500
                  });
            return false;
          }
          return true;
         
        },
        checkcertid:function(){
          if(!this.applyMes.certid){
            Toast({
                    message: "身份证不能为空！",
                    position: 'bottom',
                    duration: 1500
                  });
            return;
          }
          if(!this.IdCardValidate(this.applyMes.certid)){
            Toast({
                    message: "身份证格式错误",
                    position: 'bottom',
                    duration: 1500
                  });
          }
        },
        touplaod:function(){
          var vm = this;
          vm.$router.push({name:'upload'});
        }
    },
    created:function(){
      var vm = this;
      vm.initpage();
    },

    watch:{
        applyMes : {
            handler:function(curVal,oldVal){
                    var vm = this;
                    var idCard18 = curVal.certid;
　　　　　　　　　　if(idCard18){
                        if(idCard18.length===18){
                          var year = idCard18.substring(6,10); 
                          var month = idCard18.substring(10,12); 
                          var day = idCard18.substring(12,14); 
                          if(this.maleOrFemalByIdCard(idCard18)==='male'){
                            this.applyMes.sex = '1';
                          }else{
                            this.applyMes.sex = '2';
                          }
                          
                          this.applyMes.birthday = year+"-"+month+"-"+day;
                        }
                    }
                    var mes = JSON.stringify(vm.applyMes);
                    sessionStorage.setItem("addMestemp",mes);
　　　　　　　　　　},
　　　　　　　　　　deep:true
            }

    }

}
    
</script>
<style>
.popup-ad-bottom {
  position: fixed;
  width: 100%;
  height: 30%;
  bottom: 0;
  border: 1px solid #e8e8e8;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.27), 0 0 40px rgba(0, 0, 0, 0.08) inset;
  border-radius: 4px;
   -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0); 
 z-index: 106;
}


.popup-ad-bottom-enter-active {
  animation-name: fold-in;
  animation-duration: .4s;
}
.popup-ad-bottom-leave-active {
  animation-name: fold-out;
  animation-duration: .2s;
}
@keyframes fold-in {
  0% {
    transform: translate3d(0, 100%, 0);
    -webkit-transform: translate3d(0, 100%, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
    -webkit-transform: translate3d(0, 0, 0);
  }
}
@keyframes fold-out {
  0% {
    transform: translate3d(0, 0, 0);
    -webkit-transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(0, 100%, 0);
    -webkit-transform: translate3d(0, 100%, 0);
  }
}










    
</style>