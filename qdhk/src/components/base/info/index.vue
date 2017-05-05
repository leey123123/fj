<template>
    <div>
    <ul class="info-list box_box" style="position: fixed;width: 100%; z-index:20">
        <li @click="choiceChildMenu(1)" :class="{'active':childmenutype===1}">基本信息</li>
        <li @click="choiceChildMenu(2)" :class="{'active':childmenutype===2}">贷款信息</li>
        <li @click="choiceChildMenu(3)" :class="{'active':childmenutype===3}">工作信息</li>
        <li @click="choiceChildMenu(4)" :class="{'active':childmenutype===4}">联系人信息</li>
        <li @click="choiceChildMenu(5)" :class="{'active':childmenutype===5}">其他信息</li>
        <li @click="choiceChildMenu(6)" :class="{'active':childmenutype===6}" v-if="showChannelMes&&showChannelInfo">渠道信息</li>
    </ul>
    <router-view></router-view>
    </div>
</template>
<script>
export default{
    data:function(){
        return{
            childmenutype:0,
            showChannelMes:false,
            showChannelInfo:false
        }
    },
    methods:{
        choiceChildMenu:function(type){
            this.childmenutype=type;
            if(type===1){
                this.$router.replace({name:'baseinfo'});
            }else if(type===2){
                this.$router.replace({name:'loaninfo'});
            }else if(type===3){
                this.$router.replace({name:'workinfo'});
            }else if(type===4){
                this.$router.replace({name:'contactinfo'});
            }else if(type===5){
                this.$router.replace({name:'otherinfo'});
            }else{
                this.$router.replace({name:'channelinfo'});
            } 
        }
    },
    created:function(){
      var vm = this;
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
      if('RI002'===userMesArray[1]){
        vm.showChannelInfo=true;
      }else{
        vm.showChannelInfo=false;
      }
      vm.showChannelMes = this.getData('showChannelMes');
    }
}

    
</script>