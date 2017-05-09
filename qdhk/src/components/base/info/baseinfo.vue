<template>
<div class="tap-info" style="padding-top: .7rem;">
    <ul class="apply-input-info changing-info">
        <li>
            <label>姓名</label>
            <input type="text" name=""  placeholder="请输入姓名" class="box_flex" :value="postdata.customername" disabled>
        </li>
        <li>
            <label>证件类型</label>
            <input type="text" name="" value="身份证" class="box_flex" disabled>
            <div class="apply-icon box_vam"><i class="chicon-down"></i></div>
        </li>
        <li>
            <label>身份证</label>
            <input type="text" name="" placeholder="请输入身份证号" class="box_flex"  :value="postdata.certid" disabled>
        </li>
        <li>
            <label>性别</label>
            <div class="sex-choose box_flex">
                <p class="box_flex" :class="{'active':postdata.sex==='1'}"><i class="chicon-circle"></i>男</p>
                <p  :class="{'active':postdata.sex==='2'}"><i class="chicon-circle"></i>女</p>
            </div>
        </li>
        <li>
            <label>手机号码</label>
            <input type="text" name="" value="" class="box_flex"  :value="postdata.mobiletelephone" disabled>
        </li>
        <li>
            <label>出生日期</label>
            <input type="date" name="" value="" class="box_flex"  :value="postdata.birthday" disabled>
        </li>
        <li>
            <label>证件开始日</label>
            <input type="date" name="" value="" class="box_flex"  v-model="postdata.certstartdate" placeholder="请选择" disabled>
        </li>
        <li>
            <label>证件结束日</label>
            <input type="date" name="" value="" class="box_flex"  v-model="postdata.certmaturitydate" placeholder="请选择" disabled>
        </li>

        <li>
            <label>发证机关所在地</label>
            <textarea name="" class="box_flex" v-model="postdata.certplace" placeholder="请输入发证机关所在地" disabled></textarea>  
        </li>

        <li @click="choiceMarriage()">
            <label>婚姻状况</label>
            <input type="text" name=""  placeholder="请选择" class="box_flex" :value="getdicname('marriage',postdata.marriage)" readonly="true">
            <div class="apply-icon box_vam"><i class="chicon-down"></i></div>
        </li>
  <!--       <li>
      <label>户口所在地</label>
      <textarea name="" class="box_flex" v-model="postdata.certplace"></textarea>  
  </li> -->
        <li @click="nativeflagShow()">
            <label>户籍类型</label>
            <input type="text" name="" :value="getdicname('nativeflag',postdata.nativeflag)" class="box_flex" placeholder="请选择户籍类型" readonly="true">
            <div class="apply-icon box_vam"><i class="chicon-down"></i></div>
        </li>
        <li>
            <label>雇佣类型</label>
            <input type="text" name="" :value="getdicname('employeetype',postdata.employeetype)" class="box_flex"  disabled>
            <div class="apply-icon box_vam"><i class="chicon-down"></i></div>
        </li>
        <li @click="choiceposionlevel()">
            <label>职务级别</label>
            <input type="text" name="" placeholder="请选择" :value="getdicname('posionlevel',postdata.posionlevel)"  class="box_flex" readonly="true">
            <div class="apply-icon box_vam"><i class="chicon-down"></i></div>
        </li>
        <li class="work-time">
            <label class="box_flex">企业成立年限</label>
            <div class="tims-count">
                <i class="input-minus" @click="doindustryage(false)">-</i>
                <input type="text" name="" value="" class="box_flex years-input" v-model="postdata.industryage"  :readonly="dataAbled">
                <i class="input-plus" @click="doindustryage(true)">+</i>
            </div>
            <p class="apply-icon">年</p>
        </li>

        <li class="work-time">
            <label class="box_flex">现单位工龄</label>
            <div class="tims-count">
                <i class="input-minus" @click="doworktime(false)">-</i>
                <input type="text" name="" value="" class="box_flex years-input" v-model="postdata.workbegindate" :readonly="dataAbled">
                <i class="input-plus" @click="doworktime(true)">+</i>
            </div>
            <p class="apply-icon">年</p>
        </li>
        <li>
            <label>月收入</label>
            <input type="text" name="" value="" class="box_flex nums-input" v-model="postdata.monthincome" placeholder="请输入月收入" :readonly="dataAbled">               
            <p class="apply-icon">元</p>
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
                    customername:'',
                    mobiletelephone:'',
                    certtype :'Ind01',
                    certid :'',
                    sex :'',
                    birthday :'',
                    certstartdate:'',
                    certmaturitydate:'',
                    certplace :'',
                    marriage:'',
                    employeetype:'',
                    posionlevel:'',
                    industryage:0,
                    workbegindate :0,
                    monthincome :'',
                    nativeflag:''
                },
            dict:{
                employeetype:'',
                marriage:'',
                posionlevel:''
            },
            nativeflag:{
                picker:'',
                adata:''
            },
            marriageselect:{
                picker:'',
                adata:''
            },
            posionlevelselect:{
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
        doworktime:function(bool){
            var vm = this;
            if(vm.dataAbled){
                    return;
                }
            if(bool){
                if(vm.postdata.workbegindate){
                    vm.postdata.workbegindate++;
                }else{
                    vm.postdata.workbegindate=1;
                }
            }else{
                if(vm.postdata.workbegindate){
                    if(vm.postdata.workbegindate==0){
                        return;
                    }
                    vm.postdata.workbegindate--;
                }else{
                    vm.postdata.workbegindate=0;
                }
            }
        },
        doindustryage:function(bool){
            var vm = this;
            if(vm.dataAbled){
                    return;
                }
            if(bool){
                if(vm.postdata.industryage){
                    vm.postdata.industryage++;
                }else{
                    vm.postdata.industryage=1;
                }
            }else{
                if(vm.postdata.industryage){
                    if(vm.postdata.industryage==0){
                        return;
                    }
                    vm.postdata.industryage--;
                }else{
                    vm.postdata.industryage=0;
                }
            }
        },
        getdicname:function(dickey,valuekey){
            var vm = this;
            var dict = vm.dict[dickey];
            for(var i=0;i<dict.length;i++){
                if(dict[i].value===valuekey){
                    return dict[i].text;
                }
            }
            return '';
        },
        choiceMarriage:function(){
            var vm = this;
            if(vm.dataAbled){
                    return;
                }
            this.marriageselect.picker.show();
        },
        choiceposionlevel:function(){
            var vm = this;
            if(vm.dataAbled){
                    return;
                }
            this.posionlevelselect.picker.show();
        },
        nativeflagShow:function(){
            var vm = this;
            if(vm.dataAbled){
                    return;
                }
            this.nativeflag.picker.show();
        },
        initSelect:function(){
            var vm = this;
            var dict = JSON.parse(sessionStorage.getItem('qddict'));
            var employeeType = dict.employeetype;
            var marriage = dict.marriage;
            var posionlevel = dict.posionlevel;
            var nativeflag = dict.nativeflag;

            vm.dict = {
                employeetype:employeeType,
                marriage:marriage,
                posionlevel:posionlevel,
                nativeflag:nativeflag
            };
            vm.marriageselect.adata = marriage;
            vm.posionlevelselect.adata = posionlevel;
            vm.nativeflag.adata = nativeflag
            if(vm.dataAbled){
                    return;
                }

          if(this.nativeflag.picker===""||this.nativeflag.picker===undefined){
              this.nativeflag.picker = new this.Picker({
                  'data': [vm.nativeflag.adata]
                });

            this.nativeflag.picker.on('picker.select', function (selectedVal, selectedIndex) {
              vm.postdata.nativeflag = vm.nativeflag.adata[selectedIndex].value;
              
            });

            this.nativeflag.picker.on('picker.valuechange', function (selectedVal, selectedIndex) {
              vm.postdata.nativeflag = vm.nativeflag.adata[selectedIndex].value;
            });
          }


            if(this.marriageselect.picker===""||this.marriageselect.picker===undefined){
                this.marriageselect.picker = new this.Picker({
                    'data': [vm.marriageselect.adata]
                  });

              this.marriageselect.picker.on('picker.select', function (selectedVal, selectedIndex) {
                vm.postdata.marriage = vm.marriageselect.adata[selectedIndex].value;
                
              });

              this.marriageselect.picker.on('picker.valuechange', function (selectedVal, selectedIndex) {
                vm.postdata.marriage = vm.marriageselect.adata[selectedIndex].value;
              });
            }

            if(this.posionlevelselect.picker===""||this.posionlevelselect.picker===undefined){
                this.posionlevelselect.picker = new this.Picker({
                    'data': [vm.posionlevelselect.adata]
                  });

              this.posionlevelselect.picker.on('picker.select', function (selectedVal, selectedIndex) {
                vm.postdata.posionlevel = vm.posionlevelselect.adata[selectedIndex].value;
                
              });

              this.posionlevelselect.picker.on('picker.valuechange', function (selectedVal, selectedIndex) {
                vm.postdata.posionlevel = vm.posionlevelselect.adata[selectedIndex].value;
              });
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
        vm.dataAbled = this.getData('dataAbled');
        this.$parent.$parent.menutype=2;
        this.$parent.childmenutype=1;
        for(var x in vm.postdata){
                vm.postdata[x] = this.getData(x);
            }
        vm.initSelect();
    },
    components:{
        'mtPopup':mtPopup
    },
    watch:{
        postdata:{
            handler:function(curVal,oldVal){
                
                var vm = this;
                if(!vm.dataAbled){
                    var worknum = curVal.workbegindate;
                    var industryage = curVal.industryage;
                    if(worknum){
                        var reg = /^(0|[1-9][0-9]*)$/;
                        if(reg.test(worknum)){
                            if(worknum>100){
                                vm.postdata.workbegindate=0;
                                Toast({
                                    message: "工作年限不能大于100",
                                    position: 'bottom',
                                    duration: 1500
                                  });
                            }else{
                                vm.extend(vm.postdata); 
                            }
                        }else{
                            vm.postdata.workbegindate=0;
                            Toast({
                                    message: "请填入正确的工作年限",
                                    position: 'bottom',
                                    duration: 1500
                                  });
                        }
                    }else{
                         vm.extend(vm.postdata);
                    }
                    if(industryage){
                        var reg = /^(0|[1-9][0-9]*)$/;
                        if(reg.test(industryage)){
                            if(industryage>200){
                                vm.postdata.industryage=0;
                                Toast({
                                    message: "企业成立年限不能大于200",
                                    position: 'bottom',
                                    duration: 1500
                                  });
                            }else{
                                 vm.extend(vm.postdata);
                            }
                        }else{
                            vm.postdata.industryage=0;
                            Toast({
                                    message: "请填入正确的企业成立年限",
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
