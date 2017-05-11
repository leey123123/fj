<template>
<div>
  <header>
    <div class="head"><h1>历史申请</h1></div>
    <!-- <a href="javascript:void(0);" onClick="javascript:history.go(-1)" title="返回" id="headerLeft"><i class="header_icon_return"></i>返回</a> -->
    <a href="javascript:void(0);" class="search" id="headerRight" title="搜索" @click="showSearchFunc()"><i class="header_icon_search"></i></a>
  </header>
  <div style="height: .84rem; width: 100%;"></div>

  <article>
      <ul class="list-apply list-history">
          <li v-for="(item,index) in datalist" @click="selectone(item.applyid)">
              <div class="box_vam"><span class="chicon-xin" v-if="item.iscredit==='1'">信</span> {{cutTime(item.inputdate)}}</div>
              <p class="history-name">{{item.customername}}</p>
              <p class="box_flex text-center">{{cutcertid(item.certid)}}</p>
              <p class="text-light text-right">{{getStatusName(item.applystatus)}}</p>
          </li>
      </ul>
  </article>

  <div style="height: 1.01rem; width: 100%;"></div>

  <transition name="apply-search">
  <!-- 查找 -->
    <section class="popup-search applyse"  v-show="search.show">
       <div class="search-name">
           <input type="text" name="" placeholder="身份证后4位" class="search-inputs" v-model="search.param.certid" maxlength="4">
       </div>
       <div class="popup-input-group">
            <h4>录入时间</h4>
            <div class="box_box">
                <input type="date" name="" class="search-inputs box_flex" value=""  v-model="search.param.startdate">
                <div class="input-link box_vam"><span class="chicon-input-link">-</span></div>
                <input type="date" name="" class="search-inputs box_flex" value=""  v-model="search.param.enddate">
            </div>
       </div>
       <div class="popup-btn-search">
          <div class="list-btn-group box_box">
             <a href="javascript:void(0);" class="box_flex" @click="searchClear()">清空</a>
             <a href="javascript:void(0);" class="box_flex active" @click="searchApply()">查找</a>
          </div>
      </div>
    </section>
  </transition>
   <div class="shadeAll" v-show="search.show" @click="hide()"></div>
</div>

</template>
<script>
export default{
  data:function(){
    return {
      role:{
        role:'',
        user_id:''
      },
      pageFinish:false,
      pagenum:0,
      pagelength:20,
      scrollListener:'',
      search:{
        show:false,
        param:{
          certid:'',
          startdate:'',
          enddate:'',
          status:'0002|0004|0005|0006'
        }
      },
      datalist:[],
      scroll:{
        show:false,
        scrollTop:0,
        offsetHeight:0,
        scrollHeight:0
      },
      state:[
        {
          value:'0002',
          text:'撤销'
        },
        {
          value:'0003',
          text:'客户经理审核'
        },
        {
          value:'0004',
          text:'审批否决'
        },
        {
          value:'0005',
          text:'通过'
        },
        {
          value:'0006',
          text:'不合格'
        }
      ]
    };
  },
  methods:{
    searchApply:function(){
      var vm = this;
      this.search.show=false;
      vm.pageFinish = false;
      vm.pagenum = 0;
      vm.datalist=[];
      if(vm.role.role === window.contants.role.qd){
        vm.search.param.status='0002|0003|0004|0005|0006';
      }else{
        vm.search.param.status='0002|0004|0005|0006';
      }
      this.queryList();


    },
    queryList:function(){
        var vm = this;
        if(vm.pageFinish){
            Toast({
                    message: "列表数据已经加载完成",
                    position: 'bottom',
                    duration: 1500
                  });
          }
        if(vm.scroll.show){
          return;
        }
        vm.scroll.show=true;
        var key = sessionStorage.getItem('key');
        var userMes = sessionStorage.getItem('userMes');
        userMes = this.$Decrypt(userMes,key);
        var userMesArray = userMes.split('|');
        var user_id = userMesArray[0];
        var role = userMesArray[1];
        var param = vm.search.param;
        param.roleid = role;
        param.id = user_id;
        param.pagenum = vm.pagenum;
        param.pagelength = vm.pagelength;
        var url = this.$baseRoot+"ChannelAccessAction?function=GetCustomerApplyList";
        var json = {param:param};        
        this.$http.post(url,json).then(function(data){
            vm.scroll.show=false;
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
            if(results===null){
            Toast({
                    message: "列表数据已经加载完成",
                    position: 'bottom',
                    duration: 1500
                  });
            vm.pageFinish=true;
          }
            vm.pagenum = vm.pagenum+1;
            var array1 = this.datalist;
            var array2 = results;
            var array3 = array1.concat(array2);
            
            this.datalist = array3;
            this.$nextTick(function(){
              if(!vm.scrollListener){
                vm.scrollListener = vm.docheck;
                window.addEventListener('scroll',vm.scrollListener);
                return;
              }
            });
        }).catch(function(data){                
           vm.scroll.show=false;
      });

    },
    showSearchFunc:function(){
      this.search.show = !this.search.show;
    },
     docheck:function(){
      var me = this;
      me.scroll.scrollTop = document.body.scrollTop;
      me.scroll.offsetHeight = document.body.offsetHeight;
      me.scroll.scrollHeight = document.body.scrollHeight;
      if((me.scroll.scrollTop+me.scroll.offsetHeight)>=(me.scroll.scrollHeight-5)){//拉到底部
        console.log("true");
        me.queryList();
      }


    },
    searchClear:function(){
      var vm = this;
      vm.search.param.certid='';
      vm.search.param.startdate='';
      vm.search.param.enddate='';
    },
    hide:function(){
      this.search.show=false;
    },
    cutcertid:function(certid){
        if(certid){
          return '****'+certid.substring(14);
        }
        return '';
    },
    getStateName:function(stateid){
      for(var i=0;i<this.state.length;i++){
        var thisstate = this.state[i];
        var key = thisstate.value;
        var text = thisstate.text;
        if(key === stateid){
          return text;
        }
        

      }
      return '--';
    },
    cutTime:function(time){
        if(time){
          if(time.length>10){

          }
          return time.substring(0,10);
        }
        return '';
    },
    tologin:function(){
          this.$router.replace({name:'login'});
        },
    getStatusName:function(status){
      var vm = this;
      var statusList = vm.state;
      if(status){
          for(var v in statusList){
            if(statusList[v].value === status){
              return statusList[v].text;
            }
          }
        }
        return ''
    },
    selectone:function(applyid){

        var vm = this;
        var roleid = vm.role.role;
        var url = this.$baseRoot+"ChannelAccessAction?function=GetCustomerApplyDetailInfo";
        var params = {'applyid':applyid,'roleid':roleid};
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
        var result = data.results;
        var applymes = result[0];
        applymes.dataAbled = true;
        applymes.showChannelMes = true;
        var key = sessionStorage.getItem("key");
        var applymesSe = vm.$Encrypt(JSON.stringify(applymes),key)
        sessionStorage.setItem('applymes',applymesSe);
        this.$router.push({name:'baseinfo'});    
        }).catch(function(data){                
      });
    }
  },
  created:function(){
    var vm = this;
    vm.$parent.type=2;  
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
    if(userMesArray[1]===window.contants.role.qd){
      vm.search.param.status='0002|0003|0004|0005|0006';
    }else{
      vm.search.param.status='0002|0004|0005|0006';
    }
    vm.queryList();
  },
  watch:{
    search:{
      handler:function(curVal,oldVal){
        var vm = this;
        var bdate = curVal.param.startdate;
        var edate = curVal.param.enddate;
        if(bdate && edate){
          if(vm.daysBetween(edate,bdate)<0){
            var bdateold = oldVal.param.startdate;
            var edateold = oldVal.param.enddate;
              vm.search.param.startdate='';
              vm.search.param.enddate='';
              Toast({
                message: "结束时间需要大于开始时间！",
                position: 'bottom',
                duration: 1500
              });
          }
        }

      },
　　　deep:true
    }
  },
  beforeDestroy:function(){
    var vm = this;
    window.removeEventListener('scroll',vm.scrollListener,false);
    vm.scrollListener='';
    vm.scroll.show = false;
    vm.scroll.scrollTop = 0;
    vm.scroll.offsetHeight = 0;
    vm.scroll.scrollHeight = 0;
  }
}
    
</script>

<style>
.loadmore{
    width: 100%;
    height: .7rem;
    line-height: .7rem;
    text-align: center;
}
.applyse{
     -webkit-transform: translate3d(0, 0, 0);
     transform: translate3d(0, 0, 0); 
}
  
.apply-search-enter-active {
  animation-name: fold-in;
  animation-duration: .3s;
}
.apply-search-leave-active {
  animation-name: fold-out;
  animation-duration: .3s;
}
@keyframes fold-in {
  0% {
    transform: translate3d(0, -100%, 0);
    -webkit-transform: translate3d(0, -100%, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
    -webkit-transform: translate3d(0, 0, 0);
  }
}
@keyframes fold-out {
  0% {
    transform: translate3d(0, 0, 0);
    -webkit-transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(0, -100%, 0);
    -webkit-transform: translate3d(0, -100%, 0);
  }
}
</style>