<template>
<div>
    <router-view></router-view>
    <div class="reser_btn public-bottom">
        <ul class="navbar navbar-inbottom">
              <li :class="{'active':1==type}" @click="switchMenu(1)">
                  <a href="javascript:void(0);" title="">
                    <h3><span class="chicon-bwaiting"></span></h3>
                    <p>待办</p>
                  </a>
              </li>
              <li  :class="{'active':2==type}" @click="switchMenu(2)">
                  <a href="javascript:void(0);" title="">
                    <h3><span class="chicon-bhistory"></span></h3>
                    <p>历史</p>
                  </a>
              </li>
              <li>
                  <a href="javascript:void(0);" title="" class="bottom-add" @click="add()">
                    <span class="chicon-badd"></span>
                  </a>
              </li>
              <li :class="{'active':3==type}" @click="switchMenu(3)">
                  <a href="javascript:void(0);" title="">
                    <h3><span class="chicon-bfind"></span></h3>
                    <p>发现</p>
                  </a>
              </li>          
              <li :class="{'active':4==type}" @click="switchMenu(4)">
                  <a href="javascript:void(0);" title="">
                    <h3><span class="chicon-bmine"></span></h3>
                    <p>我的</p>
                  </a>
              </li>
          </ul>
    </div>
</div>

</template>
<script>
    export default{
        data:function(){
            return {
                type:0
            }
        },
        methods:{
            switchMenu:function(type){
                if(type === 1 && this.type !==1){
                    this.$router.replace({name:'apply'});
                }
                if(type === 2 && this.type !==2){
                    this.$router.replace({name:'history'});
                }
                if(type === 3 && this.type !==3){
                  Toast({
                          message: "功能尚未开放",
                          position: 'bottom',
                          duration: 1500
                        });
                  return;
                    //this.$router.replace({name:'menu'});
                }
                if(type === 4 && this.type !==4){
                    this.$router.replace({name:'mine'});
                }
                this.type = type;
            },
            add:function(){
               this.$router.push({name:'add'});
            }
        },
        created:function(){
          var vm = this;
          vm.initdata();
        }
    }
</script>