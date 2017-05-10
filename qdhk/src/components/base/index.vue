<template>
  <div>
    <header>
    <div class="head"><h1>&nbsp;</h1></div>
    <a href="javascript:void(0);" onClick="javascript:history.go(-1)" title="返回" id="headerLeft"><i class="header_icon_return"></i></a>
    <!-- <a href="javascript:void(0);" id="headerRight"><span @click="refuse" v-if="!dataAbled&&!roleFlag">拒绝</span>&nbsp;&nbsp;<span @click="cancelLoan()" v-if="!dataAbled">撤销</span>&nbsp;&nbsp; --><span @click="submitloan" v-if="!dataAbled">提交</span></a>
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

        /*refuse:function(){

            var vm = this;
            if(vm.dataAbled){
                return;
            }
            if(vm.roleFlag){
                return;
            }
            var key = sessionStorage.getItem("key");
            if(!key){
              this.$router.replace({name:'login'});
              return;
            }
            var item = sessionStorage.getItem('applymes');
            if(!item){
              this.$router.replace({name:'login'});
              return;
            }
            var applymes = JSON.parse(this.$Decrypt(item,key));
            var applyid = applymes['applyid'];
            console.log(applyid);
            var url = this.$baseRoot+"ChannelAccessAction?function=RefuseCustomerApply";
            var params = {'applyid':applyid};
            var json = {param:params}
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
                          setTimeout(vm.tologin, 1500);
                        }
                      
                    return;
                }

                vm.pop.alertPop=true;
                vm.pop.alertcontent="回绝成功";
                setTimeout(vm.hideAlertPop,1000); 
                
                
                
            
            }).catch(function(data){                

            });
        },
        cancelLoan:function(){
            var vm = this;
            if(vm.dataAbled){
                return;
            }
            var key = sessionStorage.getItem("key");
            if(!key){
              this.$router.replace({name:'login'});
              return;
            }
            var item = sessionStorage.getItem('applymes');
            if(!item){
              this.$router.replace({name:'login'});
              return;
            }
            var applymes = JSON.parse(this.$Decrypt(item,key));
            var applyid = applymes['applyid'];
            var url = this.$baseRoot+"ChannelAccessAction?function=RepealApply";
            var params = {'applyid':applyid};
            var json = {param:params}
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
                          setTimeout(vm.tologin, 1500);
                        }
                    return;
                }

                vm.pop.alertPop=true;
                vm.pop.alertcontent="撤销成功";
                setTimeout(vm.hideAlertPop,1000); 
                
                
                
            
            }).catch(function(data){                

            });
        },*/
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