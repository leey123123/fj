<template>
<div>
  <header>
      <div class="head"><h1>待办申请</h1></div>
      <!-- <a href="javascript:void(0);" onClick="javascript:history.go(-1)" title="返回" id="headerLeft"><i class="header_icon_return"></i>返回</a> -->
      <a href="javascript:void(0);" class="search" id="headerRight" title="搜索" @click="showSearchFunc()"><i class="header_icon_search"></i></a>
  </header>
  <div style="height: .84rem; width: 100%;"></div>

  <!-- popup rend -->
  <article>
      <section>
          <ul class="list-apply" id="applylist">
              <li v-for="(item,index) in applyList">
                  <div>
                      <p>{{cutTime(item.inputdate)}}</p>
                      <p>移动端录入 <span class="chicon-xin" v-if="item.iscredit==='1'">信</span></p>
                  </div>
                  <div class="personal-name box_flex">
                      <h4 class="text-fn-large">{{item.customername}}</h4>
                      <p class="text-lighter">{{cutidno(item.certid)}}</p>
                  </div>
                  <div class="box_vam">
                      <div class="box_box list-btn-group">
                          <a href="javascript:void(0);" class="active" title="" @click="editOder(item.applyid)">编辑</a>
                          <a href="javascript:void(0);" class="" title="" @click="deleteOder(item.applyid)">撤销</a>
                      </div>
                  </div>
              </li>
          </ul>
          <div class="loadmore" v-show="loadmore.showload">加载中...</div>
      </section>
  </article>
  <div style="height: 1rem; width: 100%;"></div>



  <!-- 提示 -->
  <transition name="apply-delete">
    <section class="popup-boxes iAlert" v-show="showAlert">
       <div class="popup-title">
          <h3>提示</h3>
       </div>
       <div class="popup-con box_vam">
            <p>{{alertContent}}</p>
            
       </div>
       <div class="popup-btn box_box">
          <a href="javascript:void(0);" @click="cancelDelete()">取消</a>
          <a href="javascript:void(0);" class="active" @click="cancelOrder()">撤销申请</a>
      </div>
    </section>
  </transition>

  <transition name="apply-search">
  <!-- 查找 -->
    <section class="popup-search applyse"  v-show="showSearch">
       <div class="search-name">
           <input type="text" name="" placeholder="身份证后4位" class="search-inputs" v-model="search.certid" maxlength="4">
       </div>
       <div class="popup-input-group">
            <h4>录入时间</h4>
            <div class="box_box">
                <input type="date" name="" class="search-inputs box_flex" value=""  v-model="search.startdate">
                <div class="input-link box_vam"><span class="chicon-input-link">-</span></div>
                <input type="date" name="" class="search-inputs box_flex" value=""  v-model="search.enddate">
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
   <div class="shadeAll" v-show="showSearch||showAlert" @click="hide()"></div>
</div>

</template>
<script>
export default{
  data:function(){
    return{
      role:{
        role:'',
        user_id:''
      },
      choiceCancel:'',
      showSearch:false,
      showAlert:false,
      alertContent:'',
      search:{
        certid:'',
        customername:'',
        startdate:'',
        enddate:'',
        status:''
      },
      pageFinish:false,
      pagenum:0,
      pagelength:20,
      applyList:[],
      loadmore:{
        showload:false,
        scrollTop:0,
        offsetHeight:0,
        scrollHeight:0
      },
      scrollListener:''
    };
  },
  methods:{
    cancelOrder:function(){
        var applyid = this.choiceCancel;
        var url = this.$baseRoot+"ChannelAccessAction?function=RepealApply";
        var params = {'applyid':applyid};
        var json = {param:params}
        this.$http.post(url,json).then(function(data){
            this.showAlert=false;
            this.alertContent = '';
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
            var aa = this.applyList.find(function(t) {
              return t.applyid === applyid;
            });
            var index = this.applyList.indexOf(aa);
            this.applyList.splice(index,1);
            
        }).catch(function(data){    
            this.showAlert=false;
            this.alertContent = '';            
      });
    },
    showSearchFunc:function(){
      this.showSearch = !this.showSearch;
    },
    deleteOder:function(applyid){
      this.choiceCancel = applyid;
      this.showAlert=true;
      this.alertContent = '是否确定撤销申请？'
    },
    editOder:function(applyid){
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
        applymes.dataAbled = false;
        applymes.showChannelMes = true;
        var key = sessionStorage.getItem("key");
        var applymesSe = vm.$Encrypt(JSON.stringify(applymes),key)
        sessionStorage.setItem('applymes',applymesSe);
        this.$router.push({name:'baseinfo'});    
        }).catch(function(data){                
      });
    },
    hide:function(){
      this.showSearch=false;
    },
    cancelDelete:function(){
      this.showAlert=false;
      this.alertContent = '';
    },
    searchClear:function(){
      var vm = this;
      vm.search={
        certid:'',
        customername:'',
        startdate:'',
        enddate:'',
        status:''
      };
    },
    docheck:function(){
      var me = this;
      me.scrollTop = document.body.scrollTop;
      me.offsetHeight = document.body.offsetHeight;
      me.scrollHeight = document.body.scrollHeight;
      if((me.scrollTop+me.offsetHeight)>=(me.scrollHeight-5)){//拉到底部
        this.queryApplyList();
      }



    },
    searchApply:function(){
      var vm = this;
      this.showSearch = false;
      vm.pageFinish = false;
      vm.pagenum = 0;
      vm.applyList=[];
      this.queryApplyList();


    },
    tologin:function(){
          this.$router.replace({name:'login'});
        },
    queryApplyList:function(){
      var vm = this;
      if(vm.pageFinish){
            Toast({
                    message: "列表数据已经加载完成",
                    position: 'bottom',
                    duration: 1500
                  });
          }
      if(vm.loadmore.showload){
        return;
      }
      vm.loadmore.showload=true;
      
      var param = vm.search;
      param.roleid = vm.role.role;
      param.id = vm.role.user_id;
      param.pagenum = vm.pagenum;
      param.pagelength = vm.pagelength;
      var url = this.$baseRoot+"ChannelAccessAction?function=GetCustomerApplyList";
      var json = {param:param}
      this.$http.post(url,json).then(function(data){
          vm.loadmore.showload=false;
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
          
          var array1 = this.applyList;
          var array2 = results;
          var array3 = array1.concat(array2);
          
          this.applyList = array3;
          this.$nextTick(function(){
            if(!vm.scrollListener){
              vm.scrollListener = vm.docheck;
              window.addEventListener('scroll',vm.scrollListener);
              return;
            }
          });
      }).catch(function(data){                
         vm.loadmore.showload=false;
    });
    },
    cutidno:function(idno){
        if(idno){
          return '****'+idno.substring(14);
        }
        return '';
    },
    cutTime:function(time){
        if(time){
          if(time.length>10){

          }
          return time.substring(0,10);
        }
        return '';
    },
    initpage:function(){
      var vm = this; 
      vm.$parent.type=1; 
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
      if(userMesArray[1]===window.contants.role.qd){//渠道登陆
        vm.search.status='0001';

      }else if(userMesArray[1]===window.contants.role.jl){//客户经理登陆
        vm.search.status='0003';
      }else{
        console.log('异常角色');
        this.$router.replace({name:'login'});
        return;
      }
    }
  },
  beforeCreate:function(){

  },
  created:function(){
    var vm = this; 
    this.initpage();
    vm.queryApplyList();
  },
  beforeDestroy:function(){
    var vm = this;
    window.removeEventListener('scroll',vm.scrollListener,false);
    vm.scrollListener='';
    vm.loadmore.showload = false;
    vm.loadmore.scrollTop = 0;
    vm.loadmore.offsetHeight = 0;
    vm.loadmore.scrollHeight = 0;

  },
  watch:{
    search:{
      handler:function(curVal,oldVal){
        var vm = this;
        var bdate = curVal.startdate;
        var edate = curVal.enddate;
        if(bdate && edate){
          if(vm.daysBetween(edate,bdate)<0){
            var bdateold = oldVal.startdate;
            var edateold = oldVal.enddate;
              vm.search.startdate='';
              vm.search.enddate='';
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
  components:{
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