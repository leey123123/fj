<template>
<div class="tap-info" style="padding-top: .7rem;">
    <ul class="apply-input-info changing-info">
        <li @click="eduexperienceshow()">
            <label>教育程度</label>
            <input type="text" name="" :value="getdicname('eduexperience',postdata.eduexperience)" class="box_flex" placeholder="请选择教育程度" readonly="true">
            <div class="apply-icon box_vam"><i class="chicon-down"></i></div>
        </li>
        <li @click="homestatusshow()">
            <label>居住状况</label>
            <input type="text" name="" :value="getdicname('homestatus',postdata.homestatus)" placeholder="请选择居住状况"  class="box_flex" readonly="true">
            <div class="apply-icon box_vam"><i class="chicon-down"></i></div>
        </li>
        <li @click="familyaddselectshow()">
            <label>居住地址</label>
            <input type="text" name="" :value="getPlace(postdata.familyaddcode)"  placeholder="请选择居住地址"  class="box_flex" readonly="true">
            <div class="apply-icon box_vam"><i class="chicon-down"></i></div> 
        </li>
        <li>
            <label>居住地地址详细</label>
            <textarea name="" class="box_flex" v-model="postdata.homeadd" placeholder="请输入居住地地址详细" :readonly="dataAbled"></textarea>  
        </li>
        <li>
            <label>有无子女</label>
            <div class="sex-choose box_flex">
                <p class="box_flex" :class="{'active':postdata.childflag==='0'}"><i class="chicon-circle" @click="choiceradio('0')"></i>有</p>
                <p  :class="{'active':postdata.childflag==='1'}"><i class="chicon-circle" @click="choiceradio('1')"></i>无</p>
            </div>
        </li>
        <li>
            <label>居住邮编</label>
            <input type="text" name="" value="" class="box_flex" v-model="postdata.familyzip" placeholder="请输入居住邮编"  maxlength="6" :readonly="dataAbled">
        </li>
        <li class="tel">
            <label class="box_flex">固定电话</label>
            <div>
                <input type="text" name="" value="" class="qh" v-model="postdata.houseareacode" placeholder="区号" maxlength="4" :readonly="dataAbled">
                <i class="fh">-</i>
                <input type="text" name="" value="" class="gh" v-model="postdata.familytel" placeholder="固定电话" maxlength="10" :readonly="dataAbled">
            </div>
        </li>
        <li>
            <label>电子邮箱</label>
            <input type="text" name="" value="" class="box_flex nums-input" v-model="postdata.emailadd" placeholder="请输入电子邮箱" :readonly="dataAbled"> 
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
                eduexperience :'',//教育程度
                homestatus :'',//居住状况
                familyaddcode :'',//居住地行政区划
                homeadd :'',//居住地址详细
                childflag :'',//有无子女
                familyzip :'',//居住邮编
                houseareacode :'',//固话区号
                familytel :'',//固话
                emailadd  :''//电子邮箱
            },
            eduexperience:{
                picker:'',
                adata:''
            },
            homestatus:{
                picker:'',
                adata:''
            },
            familyaddselect:{
                picker:'',
                adata:window.contants['place']
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
        eduexperienceshow:function(){
            var vm = this;
            if(vm.dataAbled){
                    return;
                }
            this.eduexperience.picker.show();
        },
        homestatusshow:function(){
            var vm = this;
            if(vm.dataAbled){
                    return;
                }
            this.homestatus.picker.show();
        },
        familyaddselectshow:function(){
            var vm = this;
            if(vm.dataAbled){
                    return;
                }
            this.familyaddselect.picker.show();
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
        choiceradio:function(val){
            var vm = this;
            if(vm.dataAbled){
                    return;
                }
            vm.postdata.childflag = val;
        },
        getPlace:function(key){
            if(!key){
                return '';
            }
            var vm = this;
            var data = vm.familyaddselect.adata;
            var firstkey = key.substr(0,2)+"0000";
            var secondkey = key.substr(0,4)+"00";
            var thirdkey = key;
            var place = '';
            for(var first in data){
                if(data[first].value === firstkey){
                    place = data[first].text;
                    var datasecond = data[first].child;
                    for(var second in datasecond){
                        if(datasecond[second].value === secondkey){
                            place =place+" "+datasecond[second].text;
                            var datathird = datasecond[second].child;
                            for(var third in datathird){
                                if(datathird[third].value === thirdkey){
                                    place =place+" "+datathird[third].text;
                                }
                            }
                        }
                    }
                }
            }
            return place;

        },
        getfirst:function(){
            var vm = this;
            var list = [];
            var data = vm.familyaddselect.adata;
            for(var index in data){
            var item = data[index];
             var temp = new Object();
              temp.text = item.text;
              temp.value = item.value;
              list.push(temp);
            }
            return list;
        },
        initselect:function(){
            var vm = this;
            var dict = JSON.parse(sessionStorage.getItem('qddict'));
            vm.eduexperience.adata = dict.eduexperience;
            vm.homestatus.adata = dict.homestatus;

            if(vm.dataAbled){
                    return;
                }

            if(this.eduexperience.picker===""||this.eduexperience.picker===undefined){
                this.eduexperience.picker = new this.Picker({
                    'data': [vm.eduexperience.adata]
                  });

              this.eduexperience.picker.on('picker.select', function (selectedVal, selectedIndex) {
                vm.postdata.eduexperience = vm.eduexperience.adata[selectedIndex].value;
                
              });

              this.eduexperience.picker.on('picker.valuechange', function (selectedVal, selectedIndex) {
                vm.postdata.eduexperience = vm.eduexperience.adata[selectedIndex].value;
              });
            }

            if(this.homestatus.picker===""||this.homestatus.picker===undefined){
                this.homestatus.picker = new this.Picker({
                    'data': [vm.homestatus.adata]
                  });

              this.homestatus.picker.on('picker.select', function (selectedVal, selectedIndex) {
                vm.postdata.homestatus = vm.homestatus.adata[selectedIndex].value;
                
              });

              this.homestatus.picker.on('picker.valuechange', function (selectedVal, selectedIndex) {
                vm.postdata.homestatus = vm.homestatus.adata[selectedIndex].value;
              });
            }

            if(this.familyaddselect.picker===""||this.familyaddselect.picker===undefined){
                var first=[],second=[],third=[];
                first = vm.getfirst();
                second = vm.familyaddselect.adata[0].child;
                third = second[0].child;

                this.familyaddselect.picker = new this.Picker({
                    'data': [first,second,third]
                  });

              this.familyaddselect.picker.on('picker.select', function (selectedVal, selectedIndex) {
                var region = third[selectedIndex[2]];
                vm.postdata.familyaddcode = region.value;
              });

              this.familyaddselect.picker.on('picker.valuechange', function (selectedVal, selectedIndex) {
                var region = third[selectedIndex[2]];
                vm.postdata.familyaddcode = region.value;
              });
              this.familyaddselect.picker.on('picker.change', function (index, selectedIndex) {
                if (index === 0){
                    firstChange();
                  } else if (index === 1) {
                    secondChange();
                  }

                  function firstChange() {
                    var firstindex = selectedIndex;
                    var selectfirst = vm.familyaddselect.adata[firstindex];
                    if(selectfirst.hasOwnProperty('child')){
                        second = selectfirst.child;
                        if(second[0].hasOwnProperty('child')){
                            third = second[0].child;
                        }else{
                            third = [{text: '', value: 0}];
                        }
                    }else{
                        second = [{text: '', value: 0}];
                        third = [{text: '', value: 0}];
                    }
                    

                    vm.familyaddselect.picker.refillColumn(1, second);
                    vm.familyaddselect.picker.refillColumn(2, third);
                    vm.familyaddselect.picker.scrollColumn(1, 0);
                    vm.familyaddselect.picker.scrollColumn(2, 0);
                  }

                  function secondChange() {
                    if(second[selectedIndex].hasOwnProperty('child')){
                        third = second[selectedIndex].child;
                    }else{
                        third = [{text: '', value: 0}];
                    }
                    vm.familyaddselect.picker.refillColumn(2, third);
                    vm.familyaddselect.picker.scrollColumn(2, 0)
                  }
              });
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

            if(!postdata.eduexperience){
                Toast({
                    message: "请选择教育程度",
                    position: 'bottom',
                    duration: 1500
                  });
                return false;
              }

            if(!postdata.homestatus){
                Toast({
                    message: "请选择居住状况",
                    position: 'bottom',
                    duration: 1500
                  });
                return false;
              }

            if(!postdata.familyaddcode){
                Toast({
                    message: "请选择居住地址",
                    position: 'bottom',
                    duration: 1500
                  });
                return false;
              }

            if(!postdata.homeadd){
                Toast({
                    message: "请填写居住地址详细",
                    position: 'bottom',
                    duration: 1500
                  });
                return false;
              }

            if(!postdata.childflag){
                Toast({
                    message: "请选择有无子女",
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
        this.$parent.childmenutype=5;
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
        this.initselect();
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
