<template>
<div class="tap-list">
    <article>
        <div class="text-predict">
            <p>根据您的征信结果，我们为您预估不同方案可贷金额</p>
        </div>
        <ul class="list-plans">
             
            <li :class="{'active':isshowmenu('0130')}">
                <div class="plans-tit box_box" @click="choiceF('0130')">
                    <i class="chicon-checkbox"></i>
                    <h3 class="box_flex">融e贷-未结清车贷方案</h3>
                </div>
                <article class="plans-con">
                    <ul class="apply-input-info swith-turn">
                        <li>
                            <div class="box_vam box_flex">
                                <p>是否本地车牌</p>
                            </div>
                            <mswitch v-model="radioChoice.car">是</mswitch>
                        </li>
                        <li>
                            <div class="box_vam box_flex">
                                <p>是否有本地房产</p>
                            </div>
                            <mswitch v-model="radioChoice.house">是</mswitch>
                        </li>
                    </ul>
                </article>
            </li>
            <li :class="{'active':isshowmenu('0170')}">
                <div class="plans-tit box_box" @click="choiceF('0170')">
                    <i class="chicon-checkbox"></i>
                    <h3 class="box_flex">融e贷-住房公积金方案</h3>
                </div>
                <article class="plans-con">
                    <ul class="apply-input-info">
                        <li>
                            <label>公积金月缴费</label>
                             <input type="text" name="" value="" class="box_flex nums-input thisinput" style="background: rgba(241, 237, 237, 0.0901961);" v-model="postdata.monthhousingfund"> 
                             <p class="apply-icon">元</p>
                        </li>
                    </ul>
                </article>
            </li>
            <li :class="{'active':isshowmenu('0180')}">
                <div class="plans-tit box_box" @click="choiceF('0180')">
                    <i class="chicon-checkbox"></i>
                    <h3 class="box_flex">融e贷-社保养老金方案客户</h3>
                </div>
                <article class="plans-con">
                    <ul class="apply-input-info">
                        <li>
                            <div class="box_vam box_flex">
                                <p>是否有本地房产</p>
                            </div>
                            <mswitch v-model="radioChoice.house">有</mswitch>
                        </li>

                        <li>
                            <label>社保月缴费</label>
                             <input type="text" name="" value="" class="box_flex nums-input thisinput" style="background: rgba(241, 237, 237, 0.0901961);" v-model="postdata.monthEndowmentInsurance"> 
                             <p class="apply-icon">元</p>
                        </li>
                    </ul>
                </article>
            </li>
            <li :class="{'active':isshowmenu('0100')}">
                <div class="plans-tit box_box" @click="choiceF('0100')">
                    <i class="chicon-checkbox"></i>
                    <h3 class="box_flex">融e贷-寿险保单客户</h3>
                </div>
                <article class="plans-con">
                    <ul class="list-policy">
                        <li v-for="(item,index) in postdata.insurance">
                            <h4>保单{{index+1}}</h4>
                            <ul class="apply-input-info">
                                
                                <li @click="showInsurance(index)">
                                    <p class="box_flex">寿险公司</p>
                                    <p>{{showSelect(item.insurancecompanyname)}}</p>
                                    <div class="apply-icon box_vam"><i class="chicon-down"></i></div>
                                </li>
                                <li>
                                    <label>投资型保单年缴保费</label>
                                     <input type="text" name="" value="" class="box_flex nums-input thisinput" style="background: rgba(241, 237, 237, 0.0901961);" v-model="item.invyearsum"> 
                                     <p class="apply-icon">元</p>
                                </li>
                                <li>
                                    <label>传统型保单年缴保费</label>
                                     <input type="text" name="" value="" class="box_flex nums-input thisinput" style="background: rgba(241, 237, 237, 0.0901961);" v-model="item.trayearsum"> 
                                     <p class="apply-icon">元</p>
                                </li>
                                <li>
                                    <label>年缴保费</label>
                                     <input type="text" name="" value="" class="box_flex nums-input thisinput" style="background: rgba(241, 237, 237, 0.0901961);" v-model="item.insyearsum"> 
                                     <p class="apply-icon">元</p>
                                </li>
                                <li>
                                    <p class="box_flex">生效日期</p>
                                    <input type="date" name="" value="" class="box_flex nums-input thisinput" style="background: rgba(241, 237, 237, 0.0901961); width:1rem;" v-model="item.validdate"> 
                                </li>
                                <li @click="showRevalidflag(index)">
                                    <p class="box_flex">是否发生过复效</p>
                                    <p>{{showSelect(item.revalidflagname)}}</p>
                                    <div class="apply-icon box_vam"><i class="chicon-down"></i></div>
                                </li>
                                <li @click="showPolicyloanflag(index)">
                                    <p class="box_flex">是否有保单借款</p>
                                    <p>{{showSelect(item.policyloanflagname)}}</p>
                                    <div class="apply-icon box_vam"><i class="chicon-down"></i></div>
                                </li>
                            </ul>
                        </li>
                        <li @click="addinsurance()" v-show="showadd()">
                            <h4 class="box_box"><i class="chicon-adds"></i>添加其他保单</h4>
                        </li>
                    </ul>
                </article>
            </li>
            
        </ul>
        <div class="apply-btn"><a href="javascript:void(0);" class="btn-login btn-submit" @click="tryCompute()" v-if="!dataAbled">试算</a></div>
    </article>
</div>
</template>

<script>
import mswitch from '../../commom/switch/switch.vue'

var insurancetype=[
    {
        value:'010',
        text:'一类'

    },
    {
        value:'020',
        text:'二类' 
    },
    {
        value:'030',
        text:'三类'
    }
]; 
var insurance = {
                "010":[{
                   "value":"001","text":"中国平安人寿"
                   }],
               "020":[{"value":"010","text":"中国人寿"},
                    {"value":"030","text":"新华人寿保险"}],
               "030":[{"value":"020","text":"泰康人寿 "},
                    {"value":"050","text":"中国太平洋人寿"},
                    {"value":"060","text":"中国人民人寿"},
                    {"value":"070","text":"太平人寿"},
                    {"value":"080","text":"阳光人寿 "},
                    {"value":"090","text":"富德生命人寿"}]
};
var commomState =[
    {
        value:'1',
        text:'是'
    },
    {
        value:'2',
        text:'否'
    },
    {
        value:'0',
        text:'未知'
      } 
];

    export default{
        data:function(){
            return {
                index:0,
                radioChoice:{
                    car:false,
                    house:false
                },
                postdata:{
                    solutionlist:'',
                    islocallicenseplate:'0',//是否本地车牌
                    localhouseflag:'0',//是否有本地房产
                    monthhousingfund:0,//公积金月缴额度
                    monthEndowmentInsurance:0,//社保月缴额度 
                    insurance:[]
                },
                insurancetypeselect:{//寿险公司下拉
                    picker:'',
                    insurancetype:insurancetype,
                    insurance:insurance
                },
                revalidflagselect:{//是否发生复效
                    picker:'',
                    revalidflag:commomState
                },
                policyloanflagselect:{//是否有保单借款
                    picker:'',
                    policyloanflag:commomState
                },
                dataAbled:true//是否可以编写false可编写true不可编写
                
            }
        },
        components:{
            mswitch:mswitch
        },
        methods:{
            isshowmenu:function(menunum){
                var vm = this;
                var solutionlist = vm.postdata.solutionlist;
                if(!solutionlist){
                    return false;
                }
                return solutionlist.indexOf(menunum)>-1;
            },
            choiceF:function(chioceid){
                var vm = this;
                var list = vm.postdata.solutionlist;
                if(list){
                        if(list.indexOf(chioceid)<0){
                            list = list+"|"+chioceid;
                            if(chioceid==='0100'){
                                if(!vm.postdata.insurance){
                                    vm.addinsurance();
                                }else{
                                    if(vm.postdata.insurance.length<=0){
                                        vm.addinsurance();
                                    }
                                }
                            }
                        }else{
                            if(list.indexOf('|')>-1){
                                if(list.indexOf(chioceid)===0){
                                    list = list.replace(chioceid+'|','');
                                }else{
                                    list = list.replace('|'+chioceid,'');
                                }
                            }else{
                                list = list.replace(chioceid,'');
                            }
                        }
                    }else{
                        list = chioceid;
                        if(chioceid==='0100'){
                            if(!vm.postdata.insurance){
                                vm.addinsurance();
                            }else{
                                if(vm.postdata.insurance.length<=0){
                                    vm.addinsurance();
                                }
                            }  
                        }
                        
                    }
                vm.postdata.solutionlist=list;

            },
            showInsurance:function(index){
                this.insurancetypeselect.picker.show();
                this.index = index;
            },
            showRevalidflag:function(index){
                this.revalidflagselect.picker.show();
                this.index = index;
            },
            showPolicyloanflag:function(index){
                this.policyloanflagselect.picker.show();
                this.index = index;
            },
            showSelect:function(val){
                if(!val){
                    return '请选择';
                }
                return val;
            },
            tologin:function(){
              this.$router.replace({name:'login'});
            },
            tryCompute:function(){
                var vm = this;
                if(vm.dataAbled){
                    return;
                }
                var pagedata = vm.postdata;
                var key = sessionStorage.getItem("key");
                if(!key){
                  this.$router.replace({name:'login'});
                  return;
                }
                var applymes = sessionStorage.getItem("applymes");
                if(!applymes){
                  this.$router.replace({name:'login'});
                  return;
                }
                var itemJson = JSON.parse(this.$Decrypt(applymes,key));
                var postjson = {};
                for(var x in itemJson){
                    postjson[x] = itemJson[x];
                }
                postjson.solutionlist = pagedata.solutionlist;
                if(pagedata.solutionlist){
                    if(pagedata.solutionlist.indexOf('0130')>-1){//车贷
                        postjson.islocallicenseplate=pagedata.islocallicenseplate;
                        postjson.localhouseflag=pagedata.localhouseflag;                     
                    }else{
                        postjson.islocallicenseplate='';
                        postjson.localhouseflag='';
                    }
                    if(pagedata.solutionlist.indexOf('0170')>-1){//公积金
                        postjson.monthhousingfund=pagedata.monthhousingfund;
                    }else{
                        postjson.monthhousingfund=0;
                    }
                    if(pagedata.solutionlist.indexOf('0180')>-1){//社保
                        postjson.localhouseflag=pagedata.localhouseflag;  
                        postjson.monthEndowmentInsurance=pagedata.monthEndowmentInsurance;  
                        
                    }else{
                        postjson.localhouseflag='';
                        postjson.monthEndowmentInsurance='';
                    }
                    if(pagedata.solutionlist.indexOf('0100')>-1){//保单
                        postjson.insurance = pagedata.insurance;
                    }else{
                        postjson.insurance = [];
                    }
                }else{
                    postjson.solutionlist='';
                    postjson.islocallicenseplate='';
                    postjson.localhouseflag='';
                    postjson.monthhousingfund=0;
                    postjson.monthEndowmentInsurance=0;
                    postjson.insurance=[];
                }
                var url = this.$baseRoot+"ChannelAccessAction?function=SaveCustomerApplyDetailInfo";
                  var params = postjson;
                  var json = {param:params};
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
                    var applymes = JSON.stringify(postjson);
                    console.log(applymes);
                    var applymesSe = this.$Encrypt(applymes,key);
                    sessionStorage.setItem('applymes',applymesSe);
                    this.$router.push({name:'loantrial'});         
                  
                  }).catch(function(data){                

                  });
                
                
            },
            getInsuranceSelect:function(selectedIndex){
                var vm = this;
                var typeindex = selectedIndex[0];
                var insuranceindex = selectedIndex[1];
                var type = vm.insurancetypeselect.insurancetype[typeindex].value;
                var company = vm.insurancetypeselect.insurance[type][insuranceindex].value;
                var companyname = vm.insurancetypeselect.insurance[type][insuranceindex].text;
                vm.postdata.insurance[vm.index].insurancetype = type;
                vm.postdata.insurance[vm.index].insurancecompany = company;
                vm.postdata.insurance[vm.index].insurancecompanyname = companyname;


            },
            addinsurance:function(){
                var vm = this;
                var a = {
                        applyid:'',
                        insurancetype:'',
                        insurancecompany:'',
                        insurancecompanyname:'',
                        invyearsum:0,//投资
                        trayearsum:0,//传统
                        insyearsum:0,
                        validdate:'',
                        revalidflag:'',
                        revalidflagname:'',
                        policyloanflag:'',
                        policyloanflagname:''

                    };
                if(!vm.postdata.insurance){
                    vm.postdata.insurance=[];
                }
                
                vm.postdata.insurance.push(a);
            },
            showadd:function(){
                var vm = this;
                var aa = vm.postdata.insurance
                if(aa){
                    if(aa.length<3){
                    return true;
                    }
                }
                
                return false;
            }
        },
        created:function(){
            var vm = this;
            vm.dataAbled = this.getData('dataAbled');
            for(var x in vm.postdata){
                vm.postdata[x] = this.getData(x);
            }
            if('1'===vm.postdata.islocallicenseplate){
                vm.radioChoice.car=true;
            }else{
                vm.radioChoice.car=false;
            }
            if('1'===vm.postdata.localhouseflag){
                vm.radioChoice.house=true;
            }else{
                vm.radioChoice.house=false;
            }
            

         
            this.$parent.menutype=1;

            if(this.insurancetypeselect.picker===""||this.insurancetypeselect.picker===undefined){
                var choiceinsurance = vm.insurancetypeselect.insurance['010'];
                this.insurancetypeselect.picker = new this.Picker({
                    'data': [vm.insurancetypeselect.insurancetype, choiceinsurance]
                  });

              this.insurancetypeselect.picker.on('picker.select', function (selectedVal, selectedIndex) {
                vm.getInsuranceSelect(selectedIndex);
                
              });

              this.insurancetypeselect.picker.on('picker.valuechange', function (selectedVal, selectedIndex) {
                vm.getInsuranceSelect(selectedIndex);
                
              });
              this.insurancetypeselect.picker.on('picker.change', function (index, selectedIndex) {
                if(index===0){
                    var key = vm.insurancetypeselect.insurancetype[selectedIndex].value;
                    var insurance = vm.insurancetypeselect.insurance[key];
                    vm.insurancetypeselect.picker.refillColumn(1, insurance);
                    vm.insurancetypeselect.picker.scrollColumn(1, 0)
                }
                
              });
            }

            if(this.revalidflagselect.picker===""||this.revalidflagselect.picker===undefined){
                this.revalidflagselect.picker = new this.Picker({
                    'data': [vm.revalidflagselect.revalidflag]
                  });

              this.revalidflagselect.picker.on('picker.select', function (selectedVal, selectedIndex) {
                vm.postdata.insurance[vm.index].revalidflag = vm.revalidflagselect.revalidflag[selectedIndex].value;
                vm.postdata.insurance[vm.index].revalidflagname = vm.policyloanflagselect.policyloanflag[selectedIndex].text;
                
              });

              this.revalidflagselect.picker.on('picker.valuechange', function (selectedVal, selectedIndex) {
                vm.postdata.insurance[vm.index].revalidflag = vm.revalidflagselect.revalidflag[selectedIndex].value;
                vm.postdata.insurance[vm.index].revalidflagname = vm.policyloanflagselect.policyloanflag[selectedIndex].text;
                
              });
            }

            if(this.policyloanflagselect.picker===""||this.policyloanflagselect.picker===undefined){
                this.policyloanflagselect.picker = new this.Picker({
                    'data': [vm.policyloanflagselect.policyloanflag]
                  });

              this.policyloanflagselect.picker.on('picker.select', function (selectedVal, selectedIndex) {
                vm.postdata.insurance[vm.index].policyloanflag = vm.policyloanflagselect.policyloanflag[selectedIndex].value;
                vm.postdata.insurance[vm.index].policyloanflagname = vm.policyloanflagselect.policyloanflag[selectedIndex].text;
                
              });

              this.policyloanflagselect.picker.on('picker.valuechange', function (selectedVal, selectedIndex) {
                vm.postdata.insurance[vm.index].policyloanflag = vm.policyloanflagselect.policyloanflag[selectedIndex].value;
                vm.postdata.insurance[vm.index].policyloanflagname = vm.policyloanflagselect.policyloanflag[selectedIndex].text;
                
              });
            }
        },
        watch:{
             radioChoice:{
              handler:function(curVal,oldVal){
                var vm = this;
                var car = curVal.car;
                var house = curVal.house;
                
                if(car){
                    vm.postdata.islocallicenseplate = "1";
                }else{
                    vm.postdata.islocallicenseplate = "0";
                }
                if(house){
                    vm.postdata.localhouseflag = '1';
                }else{
                    vm.postdata.localhouseflag = "0";
                }

              },
        　　　deep:true
            }


        }

    }
</script>
<style>
    .thisinput{
        text-align: right;
    }
</style>