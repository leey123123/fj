<template>
<div class="tap-info">
    <ul class="apply-input-info changing-info">
        <li>
            <label>申请金额</label>
            <input type="text" name="" value="" placeholder="请输入申请金额" class="box_flex" v-model="postdata.businesssum"  :readonly="dataAbled">
            <p class="apply-icon">元</p>
        </li>
        <li @click="loanusedshow()">
            <label>贷款用途</label>
            <input type="text" name="" :value="getdicname('loanused',postdata.loanused)" class="box_flex" placeholder="请选择贷款用途">
            <div class="apply-icon box_vam"><i class="chicon-down"></i></div>
        </li>
        <li class="work-time">
            <label class="box_flex">意向贷款期限</label>
            <div class="tims-count">
                <i class="input-minus" @click="doloanterm(false)">-</i>
                <input type="text" name="" value="" class="box_flex years-input" v-model="postdata.loanterm" :readonly="dataAbled">
                <i class="input-plus" @click="doloanterm(true)">+</i>
            </div>
            <p class="apply-icon">月</p>
        </li>
    </ul>


    <ul class="apply-input-info changing-info list-group-top">
        <li>
            <label>收款行</label>
            <input type="text" name="" value="" class="box_flex" placeholder="请输入收款行" v-model="postdata.accountinbank" :readonly="dataAbled">
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
        <li>
            <label>还款行</label>
            <input type="text" name="" value="" class="box_flex" placeholder="请输入还款行"v-model="postdata.paymentcardbank" :readonly="dataAbled">
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
                accountinbank :'',//收款行名称
                gatheringname  :'',//收款账户户名
                gatheringcardid  :'',//收款卡号
                paymentcardbank  :'',//还款行名称
                paymentcardid  :'',//还款卡号
                gatheroutgname :''//还款账户户名
            },
            loanused:{
                picker:'',
                adata:''
            },
            pop:{
                alertcontent:'保存成功',
                alertPop:false
            },
            dataAbled:true//是否可以编写false可编写true不可编写
        }
    },
    methods:{
        loanusedshow:function(){
            var vm = this;
            if(vm.dataAbled){
                    return;
                }
            this.loanused.picker.show();
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
            vm.addInfo(function(){
                vm.$router.replace({name:'login'});
                return;
            },function(){
                vm.pop.alertPop=true;
                vm.pop.alertcontent="保存成功";
                setTimeout(vm.hideAlertPop,1500); 
            });
            
        },
        hideAlertPop:function(){
            this.pop.alertPop=false;
        }
    },
    created:function(){
        var vm = this;
        this.$parent.$parent.menutype=2;
        this.$parent.childmenutype=2;
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
                                    message: "意向贷款期限不能大于100月",
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