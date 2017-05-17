<template>
  <div>
    <header>
    <div class="head"><h1>&nbsp;</h1></div>
    <a href="javascript:void(0);" onClick="javascript:history.go(-1)" title="返回" id="headerLeft"><i class="header_icon_return"></i></a>
     <a href="javascript:void(0);" id="headerRight"><!--<span @click="refuse" v-if="!dataAbled&&!roleFlag">拒绝</span>&nbsp;&nbsp;<span @click="cancelLoan()" v-if="!dataAbled">撤销</span>&nbsp;&nbsp; --><span @click="submitloan" v-if="!dataAbled">提交</span></a>
    </header>
    <div style="height: .84rem; width: 100%;"></div>

    <article>
        <div class="nav-fixed">
            <ul class="nav-taps box_box">
                <li :class="{'active':menutype==1}" @click="choicemenu(1)"><span>选择贷款方案</span></li>
                <li :class="{'active':menutype==2}" @click="choicemenu(2)"><span>完善资料</span></li>
            </ul>
        </div>
        <div style="height: .88rem; width: 100%;"></div>
        <!-- 完善资料 -->
        <div class="tap-list" style="display: block;">
            <router-view></router-view>
        </div>
    </article>
    <mt-popup v-model="pop.alertPop" position="top" pop-transition="popup-fade" ><div class="alertcontent">{{pop.alertcontent}}</div>    </mt-popup>
  </div>
  
</template>
<script>
import mtPopup from '../../commom/popup';
import '../../commom/popup/style.css';
export default{
    data:function(){
        return{
            roleFlag:false,//false客户经理，true渠道方
            menutype:0,
            pop:{
            alertcontent:'',
            alertPop:false
            },
            dataAbled:true//是否可以编写false可编写true不可编写
        }
    },
    methods:{
        choicemenu:function(type){
            
            if(type===1 && this.menutype!==1){
                this.menutype=type;
                this.$router.replace({name:'loantrial'});
            }else if(type===2 && this.menutype!==2){
                this.menutype=type;
                this.$router.replace({name:'baseinfo'});
            }
        },
        tologin:function(){
          this.$router.replace({name:'login'});
        },

        checkCondition:function(){
          var vm = this;
          var key = sessionStorage.getItem("key");
          if(!key){
            vm.$router.replace({name:'login'});
          }
          var applymes = sessionStorage.getItem("applymes");
          if(!applymes){
            vm.$router.replace({name:'login'});
          }
          var postdata = JSON.parse(vm.$Decrypt(applymes,key));

         var returnJson = {};
          returnJson.flag = true;
          returnJson.message = "";
           if(!postdata.productid){
            returnJson.flag = false;
              returnJson.message = "请选择贷款方案";
              return returnJson;
            }

            if(!postdata.solutionid){
            returnJson.flag = false;
              returnJson.message = "请选择贷款方案";
              return returnJson;
            }

            if(!postdata.goldloancustomertype){
            returnJson.flag = false;
              returnJson.message = "请选择贷款方案";
              return returnJson;
            }

            if(!postdata.marriage){
            returnJson.flag = false;
              returnJson.message = "基本信息，请选择婚姻状况";
              return returnJson;
            }

            if(!postdata.nativeflag){
            returnJson.flag = false;
              returnJson.message = "基本信息，请选择户籍类型";
              return returnJson;
            }

            if(!postdata.employeetype){
            returnJson.flag = false;
              returnJson.message = "基本信息，请选择雇佣类型";
              return returnJson;
            }

            if(!postdata.posionlevel){
            returnJson.flag = false;
              returnJson.message = "基本信息，请选择职务级别";
              return returnJson;
            }

            if(!postdata.industryage){
            returnJson.flag = false;
              returnJson.message = "基本信息，请填写企业成立年限";
              return returnJson;
            }

            if(!postdata.workbegindate){
            returnJson.flag = false;
              returnJson.message = "基本信息，请填写工作年限";
              return returnJson;
            }

            if(!postdata.monthincome){
            returnJson.flag = false;
              returnJson.message = "基本信息，请填写月收入";
              return returnJson;
            }

            if(!postdata.partnername){
            returnJson.flag = false;
              returnJson.message = "联系人信息，请填写配偶联系人姓名";
              return returnJson;
            }

            if(!postdata.partnermobiletelephone){
            returnJson.flag = false;
              returnJson.message = "联系人信息，请填写配偶联系人手机号码";
              return returnJson;
            }

            if(!postdata.familyname){
            returnJson.flag = false;
              returnJson.message = "联系人信息，请填写亲属联系人姓名";
              return returnJson;
            }

            if(!postdata.familyrelationship){
            returnJson.flag = false;
              returnJson.message = "联系人信息，请选择亲属联系人关系";
              return returnJson;
            }

            if(!postdata.familymobiletelephone){
            returnJson.flag = false;
              returnJson.message = "联系人信息，请填写亲属联系人手机号";
              return returnJson;
            }

            

            if(!postdata.nofamilyname){
            returnJson.flag = false;
              returnJson.message = "联系人信息，请填写非亲属联系人姓名";
              return returnJson;
            }

            if(!postdata.nofamilyrelationship){
            returnJson.flag = false;
              returnJson.message = "联系人信息，请选择非亲属联系人关系";
              return returnJson;
            }

            if(!postdata.nofamilymobiletelephone){
            returnJson.flag = false;
              returnJson.message = "联系人信息，请填写非亲属联系人手机号";
              return returnJson;
            }
            
            
            if(!postdata.businesssum){
            returnJson.flag = false;
              returnJson.message = "贷款信息，请填写输入金额";
              return returnJson;
            }

            if(!postdata.loansUsedNature){
            returnJson.flag = false;
              returnJson.message = "贷款信息，请选择贷款用途性质";
              return returnJson;
            }

            if(!postdata.loanused){
            returnJson.flag = false;
              returnJson.message = "贷款信息，请选择贷款用途";
              return returnJson;
            }

            if(!postdata.loanterm){
            returnJson.flag = false;
              returnJson.message = "贷款信息，请填写意向贷款期限";
              return returnJson;
            }

            if(!postdata.accountinbank){
            returnJson.flag = false;
              returnJson.message = "贷款信息，请选择收款行";
              return returnJson;
            }

            if(!postdata.gatheringname){
            returnJson.flag = false;
              returnJson.message = "贷款信息，请填写收款账户户名";
              return returnJson;
            }

            if(!postdata.gatheringcardid){
            returnJson.flag = false;
              returnJson.message = "贷款信息，请填写收款卡号";
              return returnJson;
            }

            if(!postdata.paymentcardbank){
            returnJson.flag = false;
              returnJson.message = "贷款信息，请选择还款行";
              return returnJson;
            }
            
            if(!postdata.gatheroutgname){
            returnJson.flag = false;
              returnJson.message = "贷款信息，请填写还款账户户名";
              return returnJson;
            }

            if(!postdata.paymentcardid){
            returnJson.flag = false;
              returnJson.message = "贷款信息，请填写还款卡号";
              return returnJson;
            }
            
            
            if(!postdata.eduexperience){
            returnJson.flag = false;
              returnJson.message = "其他信息，请选择教育程度";
              return returnJson;
            }

            if(!postdata.homestatus){
            returnJson.flag = false;
              returnJson.message = "其他信息，请选择居住状况";
              return returnJson;
            }

            if(!postdata.familyaddcode){
            returnJson.flag = false;
              returnJson.message = "其他信息，请选择居住地址";
              return returnJson;
            }

            if(!postdata.homeadd){
            returnJson.flag = false;
              returnJson.message = "其他信息，请填写居住地址详细";
              return returnJson;
            }

            if(!postdata.childflag){
            returnJson.flag = false;
              returnJson.message = "其他信息，请选择有无子女";
              return returnJson;
            }

            
            if(!postdata.workcorp){
            returnJson.flag = false;
              returnJson.message = "工作信息，请填写工作单位名称";
              return returnJson;
            }

            if(!postdata.worknature){
            returnJson.flag = false;
              returnJson.message = "工作信息，请选择单位性质";
              return returnJson;
            }

            if(!postdata.department){
            returnJson.flag = false;
              returnJson.message = "工作信息，请填写所在部门";
              return returnJson;
            }

             

             if(!postdata.headship){
            returnJson.flag = false;
              returnJson.message = "工作信息，请填写职位名称";
              return returnJson;
            }


             if(!postdata.hrname){
            returnJson.flag = false;
              returnJson.message = "工作信息，请填写人事部联系人";
              return returnJson;
            }

             if(!postdata.hrtelephone||!postdata.hrareacode){
            returnJson.flag = false;
              returnJson.message = "工作信息，请填写人事部联系电话";
              return returnJson;
            }

             if(!postdata.worktel||!postdata.corparea){
            returnJson.flag = false;
              returnJson.message = "工作信息，请填写单位电话";
              return returnJson;
            }

             if(!postdata.workzip){
            returnJson.flag = false;
              returnJson.message = "工作信息，请填写单位邮编";
              return returnJson;
            }

            if(!postdata.workAddCode){
            returnJson.flag = false;
              returnJson.message = "工作信息，请选择工作单位所在地";
              return returnJson;
            }

             if(!postdata.workadd){
            returnJson.flag = false;
              returnJson.message = "工作信息，请填写单位地址";
              return returnJson;
            }




          return returnJson;
        },
        submitloan:function(){
            var vm = this;
            if(vm.dataAbled){
                return;
            }
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
              var role = userMesArray[1]; 
              var user_id = userMesArray[0];
              if(window.contants.role.jl === role && process.env.NODE_ENV !== 'development'){
                  var json = vm.checkCondition();
                  if(!json.flag){
                      Toast({
                        message: json.message,
                        position: 'bottom',
                        duration: 1500
                      });
                      return;
                  }
              }

            vm.addInfo(function(){
                vm.$router.replace({name:'login'});
            },function(){
                var applyid = vm.getData('applyid');
                var url = vm.$baseRoot+"ChannelAccessAction?function=SubmitCustomerApply";
                var params = {'applyid':applyid,'id':user_id,'roleid':role};
                var json = {'param':params};
                vm.$http.post(url,json).then(function(data){
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
                          setTimeout(vm.tologin, 1500);
                        }
                      return;
                  }
             
                vm.pop.alertPop=true;
                vm.pop.alertcontent="提交成功";
                setTimeout(vm.submitsuccess,1500); 
                  
              
              }).catch(function(data){                

              });
                




            });
            
        },
        hideAlertPop:function(){
            this.pop.alertPop=false;
            this.$router.replace({name:'history'});
        },
        submitsuccess:function(){
            this.pop.alertPop=false;
            this.$router.replace({name:'apply'});
        }
    },
    components:{
        'mtPopup':mtPopup
    },
    created:function(){
        var vm = this;
        vm.dataAbled = this.getData('dataAbled');
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
          var role = userMesArray[1]; 
          if(userMesArray[1]===window.contants.role.qd){//渠道登陆
            vm.roleFlag = true;

          }else if(userMesArray[1]===window.contants.role.jl){//客户经理登陆
            vm.roleFlag = false;
          }else{
            console.log('异常角色');
            this.$router.replace({name:'login'});
            return;
          }
    }
}

    
</script>
<style>
    
</style>