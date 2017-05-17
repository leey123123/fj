<template>
<div class="tap-info" style="padding-top: .7rem;">
    <ul class="apply-input-info changing-info">
        <li>
            <label>配偶联系人姓名</label>
            <input type="text" name="" placeholder="请输入姓名" class="box_flex" v-model="postdata.partnername" :readonly="dataAbled">
        </li>
        <li>
            <label>配偶联系人手机号码</label>
            <input type="text" name="" placeholder="请输入手机号码" class="box_flex" v-model="postdata.partnermobiletelephone" maxlength="11" :readonly="dataAbled">
        </li>
        <li class="tel">
            <label class="box_flex">配偶联系人座机</label>
            <div>
                <input type="text" name="" maxlength="4" value="" class="qh" v-model="postdata.partnerareacode" placeholder="区号" :readonly="dataAbled">
                <i class="fh">-</i>
                <input type="text" name="" value="" class="gh" v-model="postdata.partnertelephone" placeholder="配偶联系人座机" maxlength="10" :readonly="dataAbled">
            </div>
        </li>
    </ul>
    <ul class="apply-input-info changing-info list-group-top">
        <li>
            <label>亲属联系人姓名</label>
            <input type="text" name="" placeholder="请输入姓名" class="box_flex" v-model="postdata.familyname" :readonly="dataAbled">
        </li>
        <li @click="familyshipshow()">
            <label>亲属联系人关系</label>
            <input type="text" name="" :value="getdicname('familyship',postdata.familyrelationship)" class="box_flex"placeholder="请选择"  readonly="true">
            <div class="apply-icon box_vam"><i class="chicon-down"></i></div>
        </li>
        <li>
            <label>亲属联系人手机</label>
            <input type="text" name="" placeholder="请输入亲属联系人手机" class="box_flex" v-model="postdata.familymobiletelephone" maxlength="11" :readonly="dataAbled">
        </li>
        <li class="tel">
            <label class="box_flex">亲属联系人座机</label>
            <div>
                <input type="text" name="" value="" class="qh" placeholder="区号" v-model="postdata.kinsfolkareacode" maxlength="4" :readonly="dataAbled">
                <i class="fh">-</i>
                <input type="text" name="" value="" class="gh" v-model="postdata.familytelephone" placeholder="亲属联系人座机" maxlength="10" :readonly="dataAbled">
            </div>
        </li>
    </ul>
    <ul class="apply-input-info changing-info list-group-top">
        <li>
            <label>非亲属联系人姓名</label>
            <input type="text" name="" placeholder="请输入姓名" class="box_flex" v-model="postdata.nofamilyname" :readonly="dataAbled">
        </li>
        <li @click="nofamilyshipshow()">
            <label>非亲属联系人关系</label>
            <input type="text" name=""  class="box_flex" placeholder="请选择" :value="getdicname('nofamilyship',postdata.nofamilyrelationship)"  readonly="true">
            <div class="apply-icon box_vam"><i class="chicon-down"></i></div>
        </li>
        <li>
            <label>非亲属联系人手机</label>
            <input type="text" name="" placeholder="请输入非亲属联系人手机" class="box_flex" v-model="postdata.nofamilymobiletelephone" maxlength="11" :readonly="dataAbled">
        </li>
        <li class="tel">
            <label class="box_flex">非亲属联系人座机</label>
            <div>
                <input type="text" maxlength="4" name="" value="" class="qh" placeholder="区号" v-model="postdata.telarea" :readonly="dataAbled">
                <i class="fh">-</i>
                <input type="text" name="" value="" class="gh" v-model="postdata.nofamilytelephone" placeholder="请输入非亲属联系人座机" maxlength="10" :readonly="dataAbled">
            </div>
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

var familyship = [
                    {
                        "value": "0302", "text": "父母"
                    },{
                        "value": "0303", "text": "兄弟姐妹"
                    },{
                        "value": "0304", "text": "子女"
                    }
                ];

var nofamilyship = [
                    {
                        "value": "0", "text": "其他"
                    },{
                        "value": "1", "text": "朋友"
                    },{
                        "value": "2", "text": "同学"
                    },{
                        "value": "3", "text": "同事"
                    }
                ];
export default{
    data:function(){
        return{
            postdata:{
                    partnername :'',//配偶联系人姓名
                    partnermobiletelephone :'',//配偶联系人手机号码
                    partnerareacode  :'',//配偶联系电话区号
                    partnertelephone  :'',//配偶联系电话
                    familyname :'',//亲属联系人姓名
                    familyrelationship :'',//亲属联系人关系
                    familymobiletelephone  :'',//亲属联系人手机号
                    kinsfolkareacode  :'',//亲属联系人电话区号
                    familytelephone  :'',//亲属联系人座机号码
                    nofamilyname :'',//非亲属联系人姓名
                    nofamilyrelationship :'',//非亲属联系人关系
                    nofamilymobiletelephone :'',//非亲属联系人手机号
                    telarea :'',//非亲属联系人电话区号
                    nofamilytelephone :''//非亲属联系人座机号码

                },
            familyship:{
                picker:'',
                adata:familyship
            },
            nofamilyship:{
                picker:'',
                adata:nofamilyship
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
        familyshipshow:function(){
            var vm = this;
            if(vm.dataAbled){
                    return;
                }
            this.familyship.picker.show();
        },
        nofamilyshipshow:function(){
            var vm = this;
            if(vm.dataAbled){
                    return;
                }
            this.nofamilyship.picker.show();
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
            var flag = true;
            var message = "";
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
              if(!flag){
                Toast({
                    message: message,
                    position: 'bottom',
                    duration: 1500
                  });
                }

                return flag;
          },
        initSelect:function(){
            var vm = this;

            if(vm.dataAbled){
                    return;
                }
            if(this.familyship.picker===""||this.familyship.picker===undefined){
                this.familyship.picker = new this.Picker({
                    'data': [vm.familyship.adata]
                  });

              this.familyship.picker.on('picker.select', function (selectedVal, selectedIndex) {
                vm.postdata.familyrelationship = vm.familyship.adata[selectedIndex].value;
                
              });

              this.familyship.picker.on('picker.valuechange', function (selectedVal, selectedIndex) {
                vm.postdata.familyrelationship = vm.familyship.adata[selectedIndex].value;
              });
            }
            if(this.nofamilyship.picker===""||this.nofamilyship.picker===undefined){
                this.nofamilyship.picker = new this.Picker({
                    'data': [vm.nofamilyship.adata]
                  });

              this.nofamilyship.picker.on('picker.select', function (selectedVal, selectedIndex) {
                vm.postdata.nofamilyrelationship = vm.nofamilyship.adata[selectedIndex].value;
                
              });

              this.nofamilyship.picker.on('picker.valuechange', function (selectedVal, selectedIndex) {
                vm.postdata.nofamilyrelationship = vm.nofamilyship.adata[selectedIndex].value;
              });
            }
        },
        hideAlertPop:function(){
            this.pop.alertPop=false;
        }
    },
    created:function(){
        var vm = this;
        this.$parent.$parent.menutype=2;
        this.$parent.childmenutype=4;
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
                    vm.extend(vm.postdata);
                }
                
                
              },
        　　　deep:true
        }
    }
}

    
</script>