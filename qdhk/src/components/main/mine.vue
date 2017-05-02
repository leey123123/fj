<template>
<div>
  <article id="section">
    <section class="login login-mine">
        <div class="mine-info">
            <!-- <img src="images/channel/mine-hpic.png" alt=""> -->
            <h3>{{username}}</h3>
            <p>{{rolename}}</p>
        </div>
    </section>
<!--     <div class="list-group-top">
    <div class="check-new box_box">
        <p class="box_flex">检查更新</p>
        <p class="check-text">当前已是最新版本</p>            
        <i class="chicon-arrow"></i>
    </div>
</div> -->
    <div class="list-group-top">
        <div class="check-new">
            <a href="javascript:void(0);" title="" class="login-esc" @click="loginout()">退出登录</a>
        </div>
    </div>
  </article>
</div>

</template>
<script>

    export default{
        data:function(){
            return {
                username:'',
                rolename:''
            }   
        },
        methods:{
            loginout:function(){
                sessionStorage.clear();
                this.$router.replace({name:'login'});
                return;
              
            }
        },
        created:function(){
              var vm =this;
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
              vm.username = userMesArray[2]; 
              vm.rolename = userMesArray[3];
        }
    }

    
</script>