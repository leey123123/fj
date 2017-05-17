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

          itemJson.productid = this.productid;
            itemJson.solutionid = this.chhoiceSoId;
            itemJson.goldloancustomertype = this.chhoiceSoId;

          if(!postdata.productid){
            flag = false;
              message = "请选择意向贷款方案";
            }

          if(!postdata.solutionid){
            flag = false;
              message = "请选择意向贷款方案";
            }

          if(!postdata.goldloancustomertype){
            flag = false;
              message = "请选择意向贷款方案";
            }

          if(!postdata.marriage){
            flag = false;
              message = "请选择婚姻状况";
            }

          if(!postdata.nativeflag){
            flag = false;
              message = "请选择户籍类型";
          }

          if(!postdata.employeetype){
            flag = false;
              message = "请选择雇佣类型";
          }

          if(!postdata.posionlevel){
            flag = false;
              message = "请选择职务级别";
          }

          if(!postdata.industryage){
            flag = false;
              message = "请填写企业成立年限";
          }

          if(!postdata.workbegindate){
            flag = false;
              message = "请填写工作年限";
          }

          if(!postdata.monthincome){
            flag = false;
              message = "请填写月收入";
          }

          if(!postdata.partnername){
            flag = false;
              message = "请填写配偶联系人姓名";
            }

            if(!postdata.partnermobiletelephone){
            flag = false;
              message = "请填写配偶联系人手机号码";
            }

            if(!postdata.familyname){
            flag = false;
              message = "请填写亲属联系人姓名";
            }

            if(!postdata.familyrelationship){
            flag = false;
              message = "请选择亲属联系人关系";
            }

            if(!postdata.familymobiletelephone){
            flag = false;
              message = "请填写亲属联系人手机号";
            }

            

            if(!postdata.nofamilyname){
            flag = false;
              message = "请填写非亲属联系人姓名";
            }

            if(!postdata.nofamilyrelationship){
            flag = false;
              message = "请选择非亲属联系人关系";
            }

            if(!postdata.nofamilymobiletelephone){
            flag = false;
              message = "请填写非亲属联系人手机号";
            }
            
            
            if(!postdata.businesssum){
            flag = false;
              message = "请填写输入金额";
            }

            if(!postdata.loansUsedNature){
            flag = false;
              message = "请选择贷款用途性质";
            }

            if(!postdata.loanused){
            flag = false;
              message = "请选择贷款用途";
            }

            if(!postdata.loanterm){
            flag = false;
              message = "请填写意向贷款期限";
            }

            if(!postdata.accountinbank){
            flag = false;
              message = "请选择收款行";
            }

            if(!postdata.gatheringname){
            flag = false;
              message = "请填写收款账户户名";
            }

            if(!postdata.gatheringcardid){
            flag = false;
              message = "请填写收款卡号";
            }

            if(!postdata.paymentcardbank){
            flag = false;
              message = "请选择还款行";
            }
            
            if(!postdata.gatheroutgname){
            flag = false;
              message = "请填写还款账户户名";
            }

            if(!postdata.paymentcardid){
            flag = false;
              message = "请填写还款卡号";
            }
            
            
          if(!postdata.eduexperience){
            flag = false;
              message = "请选择教育程度";
            }

          if(!postdata.homestatus){
            flag = false;
              message = "请选择居住状况";
            }

          if(!postdata.familyaddcode){
            flag = false;
              message = "请选择居住地址";
            }

          if(!postdata.homeadd){
            flag = false;
              message = "请填写居住地址详细";
            }

          if(!postdata.childflag){
            flag = false;
              message = "请选择有无子女";
            }

            
          if(!postdata.workcorp){
            flag = false;
              message = "请填写工作单位名称";
            }

          if(!postdata.worknature){
            flag = false;
              message = "请选择单位性质";
          }

          if(!postdata.department){
            flag = false;
              message = "请填写所在部门";
          }

           

           if(!postdata.headship){
            flag = false;
              message = "请填写职位名称";
          }


           if(!postdata.hrname){
            flag = false;
              message = "请填写人事部联系人";
          }

           if(!postdata.hrtelephone||!postdata.hrareacode){
            flag = false;
              message = "请填写人事部联系电话";
          }

           if(!postdata.worktel||!postdata.corparea){
            flag = false;
              message = "请填写单位电话";
          }

           if(!postdata.workzip){
            flag = false;
              message = "请填写单位邮编";
          }

          if(!postdata.workAddCode){
            flag = false;
              message = "请选择工作单位所在地";
          }

           if(!postdata.workadd){
            flag = false;
              message = "请填写单位地址";
          }



          var flag = true;
          var message = "";
          if(!flag){
            Toast({
                message: message,
                position: 'bottom',
                duration: 1500
              });
            }

          return flag;
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
              if(window.contants.role.jl === role){
                  if(!vm.checkCondition()){
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