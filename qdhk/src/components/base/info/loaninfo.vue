<template>
<div class="tap-info" style="padding-top: .7rem;">
    <ul class="apply-input-info changing-info">
        <li>
            <label>申请金额</label>
            <input type="text" name="" value="" placeholder="请输入申请金额" class="box_flex" v-model="postdata.businesssum"  :readonly="dataAbled">
            <p class="apply-icon">元</p>
        </li>
        <li @click="choiceLoansUsedNature()">
            <label>贷款用途性质</label>
            <input type="text" placeholder="请选择" name="" :value="getdicname('loansUsedNature',postdata.loansUsedNature)" class="box_flex"  readonly="true">
            <div class="apply-icon box_vam"><i class="chicon-down"></i></div>
        </li>
        <li @click="loanusedshow()">
            <label>贷款用途</label>
            <input type="text" name="" :value="getdicname('loanused',postdata.loanused)" class="box_flex" placeholder="请选择贷款用途" readonly="true">
            <div class="apply-icon box_vam"><i class="chicon-down"></i></div>
        </li>
        <li class="work-time">
            <label class="box_flex">意向贷款期限</label>
            <div class="tims-count">
                <i class="input-minus" @click="doloanterm(false)">-</i>
                <input type="text" name="" value="" class="box_flex years-input" v-model="postdata.loanterm" :readonly="dataAbled">
                <i class="input-plus" @click="doloanterm(true)">+</i>
            </div>
            <p class="apply-icon">年</p>
        </li>
    </ul>


    <ul class="apply-input-info changing-info list-group-top">

        <li @click="accountinbankshow()">
            <label>收款行</label>
            <input type="text" name="" :value="getdicname('accountinbank',postdata.accountinbank)" class="box_flex" placeholder="请选择收款行" readonly="true">
            <div class="apply-icon box_vam"><i class="chicon-down"></i></div>
        </li>
        <li>
            <label>收款账户户名</label>
            <input type="text" name="" value="" placeholder="请输入收款账户户名" class="box_flex"  v-model="postdata.gatheringname"  :readonly="dataAbled">
        </li>
        <li>
            <label>收款卡号</label>
            <input type="text" name="" value="" placeholder="请输入收款卡号" class="box_flex"  v-model="postdata.gatheringcardid"   maxlength="50" :readonly="dataAbled">
        </li>
    </ul>

    <ul class="apply-input-info changing-info list-group-top">
        <li @click="paymentcardbankshow()">
            <label>还款行</label>
            <input type="text" name="" :value="getdicname('paymentcardbank',postdata.paymentcardbank)" class="box_flex" placeholder="请选择还款行" readonly="true">
            <div class="apply-icon box_vam"><i class="chicon-down"></i></div>
        </li>
        <li>
            <label>还款账户户名</label>
            <input type="text" name="" value="" placeholder="请输入收款账户户名" class="box_flex"  v-model="postdata.gatheroutgname"  :readonly="dataAbled">
        </li>
        <li>
            <label>还款卡号</label>
            <input type="text" name="" value="" placeholder="请输入还款卡号" class="box_flex"  v-model="postdata.paymentcardid"  maxlength="50" :readonly="dataAbled">
        </li>
    </ul>
                
    <div class="apply-btn">
        <div class="box_box list-btn-group info-btn-group">
            <a href="javascript:void(0);" class="active box_flex" title="" @click="save()" v-if="!dataAbled">保存</a>
        </div>
    </div>
    <mt-popup v-model="pop.alertPop" position="top" pop-transition="popup-fade" ><div class="alertcontent">{{pop.alertcontent}}</div>    </mt-popup>
</div>
</template>
<script>
import mtPopup from '../../../commom/popup';
import '../../../commom/popup/style.css';
export default{
    data:function(){
        return{
            postdata:{
                businesssum :'',//申请金额
                loanused  :'',//贷款用途
                loanterm :'',//意向贷款期限
                accountinbank :'',//收款行编号
                gatheringname  :'',//收款账户户名
                gatheringcardid  :'',//收款卡号
                paymentcardbank  :'',//还款行编号
                paymentcardid  :'',//还款卡号
                gatheroutgname :'',//还款账户户名
                loansUsedNature:''
            },
            accountinbank:{
                picker:'',
                adata:''
            },
            paymentcardbank:{
                picker:'',
                adata:''
            },
            loanused:{
                picker:'',
                adata:''
            },
            loansUsedNature:{
                picker:'',
                adata:''
            },
            pop:{
                alertcontent:'保存成功',
                alertPop:false
            },
            dataAbled:true,//是否可以编写false可编写true不可编写
            role:{
                 role:'',
                user_id:''
              } 
        }
    },
    methods:{
        accountinbankshow:function(){
            var vm = this;
            if(vm.dataAbled){
                    return;
                }
            this.accountinbank.picker.show();
        },
        paymentcardbankshow:function(){
            var vm = this;
            if(vm.dataAbled){
                    return;
                }
            this.paymentcardbank.picker.show();
        },
        loanusedshow:function(){
            var vm = this;
            if(vm.dataAbled){
                    return;
                }
            this.loanused.picker.show();
        },
        choiceLoansUsedNature:function(){
          var vm = this;
          if(vm.dataAbled){
                    return;
                }
            vm.loansUsedNature.picker.show();
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
        initSelect:function(){
            var vm = this;
            var dict = JSON.parse(sessionStorage.getItem('qddict'));
            vm.loanused.adata = dict.loanused;
            vm.loansUsedNature.adata = dict.loansUsedNature;
            vm.accountinbank.adata = dict.accountinbank;
            vm.paymentcardbank.adata = dict.paymentcardbank;
            if(vm.dataAbled){
                    return;
                }
            if(this.loanused.picker===""||this.loanused.picker===undefined){
                this.loanused.picker = new this.Picker({
                    'data': [vm.loanused.adata]
                  });

              this.loanused.picker.on('picker.select', function (selectedVal, selectedIndex) {
                vm.postdata.loanused = vm.loanused.adata[selectedIndex].value;
                
              });

              this.loanused.picker.on('picker.valuechange', function (selectedVal, selectedIndex) {
                vm.postdata.loanused = vm.loanused.adata[selectedIndex].value;
              });
            }

         if(this.loansUsedNature.picker===""||this.loansUsedNature.picker===undefined){
              this.loansUsedNature.picker = new this.Picker({
                  'data': [vm.loansUsedNature.adata]
                });

            this.loansUsedNature.picker.on('picker.select', function (selectedVal, selectedIndex) {
              vm.postdata.loansUsedNature = vm.loansUsedNature.adata[selectedIndex].value;
              
            });

            this.loansUsedNature.picker.on('picker.valuechange', function (selectedVal, selectedIndex) {
              vm.postdata.loansUsedNature = vm.loansUsedNature.adata[selectedIndex].value;
            });
          }

          if(this.accountinbank.picker===""||this.accountinbank.picker===undefined){
              this.accountinbank.picker = new this.Picker({
                  'data': [vm.accountinbank.adata]
                });

            this.accountinbank.picker.on('picker.select', function (selectedVal, selectedIndex) {
              vm.postdata.accountinbank = vm.accountinbank.adata[selectedIndex].value;
              
            });

            this.accountinbank.picker.on('picker.valuechange', function (selectedVal, selectedIndex) {
              vm.postdata.accountinbank = vm.accountinbank.adata[selectedIndex].value;
            });
          }

          if(this.paymentcardbank.picker===""||this.paymentcardbank.picker===undefined){
              this.paymentcardbank.picker = new this.Picker({
                  'data': [vm.paymentcardbank.adata]
                });

            this.paymentcardbank.picker.on('picker.select', function (selectedVal, selectedIndex) {
              vm.postdata.paymentcardbank = vm.paymentcardbank.adata[selectedIndex].value;
              
            });

            this.paymentcardbank.picker.on('picker.valuechange', function (selectedVal, selectedIndex) {
              vm.postdata.paymentcardbank = vm.paymentcardbank.adata[selectedIndex].value;
            });
          }
        },
        doloanterm:function(bool){
            var vm = this;
            if(vm.dataAbled){
                    return;
                }
            if(bool){
                if(vm.postdata.loanterm){
                    vm.postdata.loanterm++;
                }else{
                    vm.postdata.loanterm=1;
                }
            }else{
                if(vm.postdata.loanterm){
                    if(vm.postdata.loanterm==0){
                        return;
                    }
                    vm.postdata.loanterm--;
                }else{
                    vm.postdata.loanterm=0;
                }
            }
        },
        save:function(){
            var vm = this;
            if(vm.dataAbled){
                    return;
                }
            if(window.contants.role.jl===vm.role.role){
                if(!vm.checkCondition()){
                    return;
                }
            }
            vm.addInfo(function(){
                vm.$router.replace({name:'login'});
                return;
            },function(){
                vm.pop.alertPop=true;
                vm.pop.alertcontent="保存成功";
                setTimeout(vm.hideAlertPop,1500); 
            });
            
        },
        checkCondition:function(){
            var vm = this;
            var postdata = vm.postdata;

            if(!postdata.businesssum){
                Toast({
                    message: "请填写输入金额",
                    position: 'bottom',
                    duration: 1500
                  });
                return false;
              }

              if(!postdata.loansUsedNature){
                Toast({
                    message: "请选择贷款用途性质",
                    position: 'bottom',
                    duration: 1500
                  });
                return false;
              }

              if(!postdata.loanused){
                Toast({
                    message: "请选择贷款用途",
                    position: 'bottom',
                    duration: 1500
                  });
                return false;
              }

              if(!postdata.loanterm){
                Toast({
                    message: "请填写意向贷款期限",
                    position: 'bottom',
                    duration: 1500
                  });
                return false;
              }

              if(!postdata.accountinbank){
                Toast({
                    message: "请选择收款行",
                    position: 'bottom',
                    duration: 1500
                  });
                return false;
              }

              if(!postdata.gatheringname){
                Toast({
                    message: "请填写收款账户户名",
                    position: 'bottom',
                    duration: 1500
                  });
                return false;
              }

              if(!postdata.gatheringcardid){
                Toast({
                    message: "请填写收款卡号",
                    position: 'bottom',
                    duration: 1500
                  });
                return false;
              }

              if(!postdata.paymentcardbank){
                Toast({
                    message: "请选择还款行",
                    position: 'bottom',
                    duration: 1500
                  });
                return false;
              }
              
              if(!postdata.gatheroutgname){
                Toast({
                    message: "请填写还款账户户名",
                    position: 'bottom',
                    duration: 1500
                  });
                return false;
              }

              if(!postdata.paymentcardid){
                Toast({
                    message: "请填写还款卡号",
                    position: 'bottom',
                    duration: 1500
                  });
                return false;
              }

              

              return true;
          },
        hideAlertPop:function(){
            this.pop.alertPop=false;
        }
    },
    created:function(){
        var vm = this;
        this.$parent.$parent.menutype=2;
        this.$parent.childmenutype=2;
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
        for(var x in vm.postdata){
                vm.postdata[x] = this.getData(x);
            }
        vm.dataAbled = this.getData('dataAbled');
        this.initSelect();
    },
    components:{
        'mtPopup':mtPopup
    },
    watch:{
        postdata:{
            handler:function(curVal,oldVal){
                
                var vm = this;
                if(!vm.dataAbled){
                    var loanterm = curVal.loanterm;
                    if(loanterm){
                        var reg = /^(0|[1-9][0-9]*)$/;
                        if(reg.test(loanterm)){
                            if(loanterm>100){
                                vm.postdata.loanterm=0;
                                Toast({
                                    message: "意向贷款期限不能大于100年",
                                    position: 'bottom',
                                    duration: 1500
                                  });
                            }else{
                                vm.extend(vm.postdata);
                            }
                        }else{
                            vm.postdata.loanterm=0;
                            Toast({
                                    message: "请填入正确的意向贷款期限",
                                    position: 'bottom',
                                    duration: 1500
                                  });
                        }
                        
                    }else{
                       vm.extend(vm.postdata); 
                    }
                }
                
              },
        　　　deep:true
        }
    }
}

    
</script>