<template>
  <div class="tap-list">
    <article>
        <div class="text-predict">
            <p>根据您的征信结果，我们为您预估不同方案可贷金额</p>
        </div>
        <ul class="list-choose box_box" v-for="(item, index) in solution" :productid="item.productid">
            <li class="box_vam">
                <h4>{{item.productname}}</h4>
            </li>
            <li class="box_flex choose-cont">
                <ul class="apply-input-info">
                    <li v-for="(itemc,index) in item.solutions" :class="{'active':chhoiceSoId===itemc.solutionid}" :solutionid="itemc.solutionid" @click="choiceType(item.productid,itemc.solutionid)">
                        <i class="chicon-circle"></i>
                        <p class="box_flex">{{itemc.solutionname}}</p>
                        <p>{{itemc.creditamount}}元</p>
                    </li>
                </ul>
            </li>
        </ul>

        <div class="apply-btn">
            <div class="ways-btn info-btn-group">
                <!-- <a href="javascript:void(0);" class="active box_flex" title="">选择方案</a> -->
                <a href="javascript:void(0);" class="active box_flex" title="" @click="moretype()">更多方案</a>
            </div>
        </div>
        <div style="height: .84rem; width: 100%;"></div>
    </article>

     <!-- 提示 -->
  <transition name="apply-delete">
    <section class="popup-boxes iAlert" v-show="alert.show">
       <div class="popup-title">
          <h3>提示</h3>
       </div>
       <div class="popup-con box_vam">
            <p>{{alert.content}}</p>
            
       </div>
       <div class="popup-btn box_box">
          <a href="javascript:void(0);" class="active" @click="sure()">确定</a>
      </div>
    </section>
  </transition>

  </div>
</template>
<script>
export default{
    data:function(){
        return{
            solution:[],
            chhoiceSoId:'',
            productid:'',
            dataAbled:true,//是否可以编写false可编写true不可编写
            alert:{
                show:false,
                content:''

            }
        
        }
    },
    methods:{
        choiceType:function(productid,solutionid){
            var vm = this;
            if(vm.dataAbled){
                return;
            }
            this.chhoiceSoId = solutionid;
            this.productid = productid;
            this.savecheck();
        },
        tologin:function(){
          this.$router.replace({name:'login'});
        },
        savecheck:function(key,value){
            var key = sessionStorage.getItem("key");
            var item = sessionStorage.getItem('applymes');
            var itemJson = JSON.parse(this.$Decrypt(item,key));
            itemJson.productid = this.productid;
            itemJson.solutionid = this.chhoiceSoId;
            itemJson.goldloancustomertype = this.chhoiceSoId;
            var applymes = JSON.stringify(itemJson);
            var applysercet = this.$Encrypt(applymes,key);
            sessionStorage.setItem('applymes',applysercet);   
        },
        moretype:function(){
            this.$router.replace({name:'trialDetail'});
        },
        sure:function(){
            var vm = this;
            vm.alert.show=false;
            vm.alert.content="";
            this.$router.replace({name:'apply'});

        }
    },
    beforeCreate:function(){
      
        

        
        
    },
    created:function(){
        var vm = this;
        this.$parent.menutype=1;
        vm.dataAbled = this.getData('dataAbled');
        var applyid = this.getData('applyid');
        var url = this.$baseRoot+"ChannelAccessAction?function=GetCreditSolution";
        var params = {'applyid':applyid,'isshow':false};
        var json = {param:params};
        this.$http.post(url,json).then(function(data){
            var data = data.body;
            var errorcode = data['error_no'];
            var errorinfo = data['error_info'];
            var results = data.results;
            
            if(errorcode!==0 && errorcode!=='0'){
                if((errorcode!==1 && errorcode!=='1')||(errorcode!==2 && errorcode!=='2')||(errorcode!==4 && errorcode!=='4')){
                    vm.alert.content="客户为非准入客户";
                    vm.alert.show=true;
                    return;
                }
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
            this.solution = results; 
            this.chhoiceSoId = this.getData('solutionid');
            this.productid =  this.getData('productid');

        
            
            
        
        }).catch(function(data){                

        });
    
    },
     watch:{
            /* chhoiceSoId:{
              handler:function(curVal,oldVal){
                var vm = this;
                var soid = curVal;
                var json = {productid:vm.productid,solutionid:soid};
                this.extend(json);
              },
        　　　deep:true
            }*/


        }
}

    
</script>