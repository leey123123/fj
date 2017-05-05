<template>
<div class="tap-info" style="padding-top: .7rem;">
    <ul class="apply-input-info changing-info">
        <li>
            <label>工作单位名称</label>
            <input type="text" name="" value="" placeholder="请输入工作单位名称" class="box_flex" v-model="postdata.workcorp"  :readonly="dataAbled">
        </li>
        <li @click="worknatureshow()">
            <label>单位性质</label>
            <input type="text" name="" :value="getdicname('worknature',postdata.worknature)" placeholder="请选择单位性质"  class="box_flex" readonly="true">
            <div class="apply-icon box_vam"><i class="chicon-down"></i></div>
        </li>
        <li>
            <label>所在部门</label>
            <input type="text" name="" value="" class="box_flex" placeholder="请输入所在部门" v-model="postdata.department"  :readonly="dataAbled">
        </li>
        
        <li>
            <label>职位名称</label>
            <input type="text" name="" value="" placeholder="请输入职位名称" class="box_flex"  v-model="postdata.headship"  :readonly="dataAbled">
        </li>
        
        </ul>

        <ul class="apply-input-info changing-info list-group-top">
        <li>
            <label>人事部联系人</label>
            <input type="text" name="" value="" placeholder="请输入人事部联系人" class="box_flex"  v-model="postdata.hrname"  :readonly="dataAbled">
        </li>
        <li class="tel">
            <label class="box_flex">人事部联系电话</label>
            <div>
                <input type="text" name="" value="" class="qh" v-model="postdata.hrareacode" placeholder="区号" maxlength="4" :readonly="dataAbled">
                <i class="fh">-</i>
                <input type="text" name="" value="" class="gh" v-model="postdata.hrtelephone" placeholder="人事部联系电话" maxlength="10" :readonly="dataAbled">
            </div>
        </li>
        <li>
            <label>人事部电话分机</label>
            <input type="text" name="" value="" placeholder="请输入人事部电话分机" class="box_flex"  v-model="postdata.hrextension" maxlength="15" :readonly="dataAbled">
        </li>
        </ul>

        <ul class="apply-input-info changing-info list-group-top">
        <li class="tel">
            <label class="box_flex">单位电话</label>
            <div>
                <input type="text" name="" value="" class="qh" v-model="postdata.corparea" placeholder="区号" maxlength="4" :readonly="dataAbled">
                <i class="fh">-</i>
                <input type="text" name="" value="" class="gh" v-model="postdata.worktel" placeholder="单位电话" maxlength="10" :readonly="dataAbled">
            </div>
        </li>
        <li>
            <label>单位电话分机</label>
            <input type="text" name="" value="" placeholder="请输入单位电话分机" class="box_flex"  v-model="postdata.corpextension"  maxlength="15" :readonly="dataAbled">
        </li>
        
    </ul> 
    <ul class="apply-input-info changing-info list-group-top">
        <li>
            <label>单位邮编</label>
            <input type="text" name="" value="" placeholder="请输入单位邮编号" class="box_flex"  v-model="postdata.workzip" maxlength="6" :readonly="dataAbled">
        </li>
        <li @click="workAddCodeselectshow()">
            <label>工作单位所在地</label>
            <input type="text" name=""  placeholder="请选择工作单位所在地" class="box_flex"  :value="getPlace(postdata.workAddCode)" readonly="true">
            <div class="apply-icon box_vam"><i class="chicon-down"></i></div>
        </li>
        <li>
            <label>单位地址</label>
            <input type="text" name="" value="" placeholder="请输入单位地址" class="box_flex"  v-model="postdata.workadd"  :readonly="dataAbled">
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
                workcorp :'',//工作单位名称
                department  :'',//所在部门
                worknature  :'',//单位性质
                headship  :'',//职位名称
                workAddCode  :'',//工作单位行政区划
                workadd  :'',//单位地址
                hrname  :'',//人事部联系人
                hrareacode  :'',//人事部联系电话区号
                hrtelephone  :'',//人事部联系电话
                hrextension :'',//人事部联系电话分机号
                corparea  :'',//单位电话区号
                worktel  :'',//单位电话
                corpextension  :'',//单位电话分机
                workzip  :''//单位邮编


            },
            worknature:{
                picker:'',
                adata:''
            },
            workAddCode:{
                picker:'',
                adata:window.contants['place']
            },
            pop:{
                alertcontent:'保存成功',
                alertPop:false
            },
            dataAbled:true//是否可以编写false可编写true不可编写
        }
    },
    methods:{
        workAddCodeselectshow:function(){
            var vm = this;
            if(vm.dataAbled){
                    return;
                }
            this.workAddCode.picker.show();
        },
        worknatureshow:function(){
            var vm = this;
            if(vm.dataAbled){
                    return;
                }
            this.worknature.picker.show();
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
        getPlace:function(key){
            if(!key){
                return '';
            }
            var vm = this;
            var data = vm.workAddCode.adata;
            var firstkey = key.substr(0,2);
            var secondkey = key.substr(0,4);
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
            var data = vm.workAddCode.adata;
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
            vm.worknature.adata = dict.worknature;

            if(vm.dataAbled){
                    return;
                }
            if(this.worknature.picker===""||this.worknature.picker===undefined){
                this.worknature.picker = new this.Picker({
                    'data': [vm.worknature.adata]
                  });

              this.worknature.picker.on('picker.select', function (selectedVal, selectedIndex) {
                vm.postdata.worknature = vm.worknature.adata[selectedIndex].value;
                
              });

              this.worknature.picker.on('picker.valuechange', function (selectedVal, selectedIndex) {
                vm.postdata.worknature = vm.worknature.adata[selectedIndex].value;
              });
            }


            if(this.workAddCode.picker===""||this.workAddCode.picker===undefined){
                var first=[],second=[],third=[];
                first = vm.getfirst();
                second = vm.workAddCode.adata[0].child;
                third = second[0].child;

                this.workAddCode.picker = new this.Picker({
                    'data': [first,second,third]
                  });

              this.workAddCode.picker.on('picker.select', function (selectedVal, selectedIndex) {
                var region = third[selectedIndex[2]];
                vm.postdata.workAddCode = region.value;
              });

              this.workAddCode.picker.on('picker.valuechange', function (selectedVal, selectedIndex) {
                var region = third[selectedIndex[2]];
                vm.postdata.workAddCode = region.value;
              });
              this.workAddCode.picker.on('picker.change', function (index, selectedIndex) {
                if (index === 0){
                    firstChange();
                  } else if (index === 1) {
                    secondChange();
                  }

                  function firstChange() {
                    var firstindex = selectedIndex;
                    var selectfirst = vm.workAddCode.adata[firstindex];
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
                    

                    vm.workAddCode.picker.refillColumn(1, second);
                    vm.workAddCode.picker.refillColumn(2, third);
                    vm.workAddCode.picker.scrollColumn(1, 0);
                    vm.workAddCode.picker.scrollColumn(2, 0);
                  }

                  function secondChange() {
                    if(second[selectedIndex].hasOwnProperty('child')){
                        third = second[selectedIndex].child;
                    }else{
                        third = [{text: '', value: 0}];
                    }
                    vm.workAddCode.picker.refillColumn(2, third);
                    vm.workAddCode.picker.scrollColumn(2, 0)
                  }
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
        this.$parent.$parent.menutype=2;
        this.$parent.childmenutype=3;
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