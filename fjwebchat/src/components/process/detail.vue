<template>
    <div>
        <div class="page-hd">
            <div class="weui-cells apply-detail-title">
                <a class="weui-cell" href="javascript:;">
                    <div class="weui-cell__bd">
                        <p>{{data.productName}}</p>
                    </div>
                    <div class="weui-cell__ft">
                        <p>{{data.loanId}}</p>
                    </div>
                </a>
            </div>
        </div>
        <div class="page-bd">
            <div class="apply-progress ">
                <!-- <div class="weui-flex completed">
                    <div class="weui-flex__item">
                        <div class="progress-descript">重新提交</div>
                    </div>
                    <div class="progress-time">
                        2016/12/03 12:38:47
                    </div>
                </div -->>
                <div v-for="(item,index) in list" :class="{index===1?'completed':'','weui-flex'}">
                    <div class="weui-flex__item ">
                        <div class="progress-descript">{{item.stateName}}</div>
                    </div>
                    <div class="progress-time">
                        {{item.stateTime}}
                    </div>
                </div>
               <!--  <div class="weui-flex">
                   <div class="weui-flex__item">
                       <div class="progress-descript">初始提交</div>
                   </div>
                   <div class="progress-time">
                       2016/12/03 12:38:47
                   </div>
               </div> -->
            </div>
        </div>
    </div>
</template>
<script>

export default{
    data:function(){
        return{
            data:{},
            list:[]
        }
    },
    beforeCreate:function(){
        var loanId = this.$route.query.loanId;
         var option = {};
                    option.url = "http://localhost:8888/process/query/"+loanId;
                    option.params = {user_id:user_id};
                    option.before = function(){
                    }
                    Vue.http(option).then(function(data){
                        var data = data.body;
                        var errorcode = data['errorCode'];
                        var message = data['message'];
                        var errorcode = data.errorCode;
                        var msg = data.message;

                        if(errorcode!==0 && errorcode!=='0'){
                            Toast({
                              message: msg,
                              position: 'bottom',
                              duration: 1500
                            });
                            return;
                        }
                        this.data = data.data;
                        this.list = data.list; 
                    
                    }).catch(function(data){                

                    });
    }
}
    
</script>