<template>
    <div>
checkbind
    </div>
</template>
<script type="text/javascript">
    export default{
        data:function(){
            return{

            };
        },
        methods:{
            'getArticle':function(option){
                var vm = this;
                this.$http(option).then(function(data){
                 
                    data = data.data;
                    /*data = JSON.parse(data);*/
                    console.log(data);
                
                
            }).catch(function(data){                
                console.log(data);
            });
            },
            'getAppid':function(){
                var option = {};
                option.url = "http://getappid.cn";
                option.data = {};
                option.method = "POST";
                option.before = function(){
                }
                this.$http(option).then(function(data){
                    console.log(data);
            
                
            }).catch(function(data){                
                console.log(data);
            });
            }
        },
        beforeCreate:function(){

        },
        created:function(){
             var vm = this;
            var state = this.$route.query.state;
            var code = this.$route.query.code;
            if(!state){

                var option = {};
                option.url = "http://getappid.cn";
                option.data = {};
                option.method = "POST";
                option.before = function(){
                }
                vm.getArticle(option);
              
            }
        }
    }
</script>