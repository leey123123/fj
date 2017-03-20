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
                    console.log(data);
                
                /*data = data.data;
                data = JSON.parse(data);
                console.log(data);                
                var errorno = parseInt(data.error_no);
                var errormsg = data.error_info;
                if(errorno===0){
                    
                    

                    
                    
                }else{
                    
                }*/
                
            }).catch(function(data){                
                console.log(data);
            });
            },
            'getAppid':function(){
                var option = baseConf.option;
                option.url = "http://getappid.cn";
                option.data = {};
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
            var vm = this;
            var state = this.$route.query.state;
            var code = this.$route.query.code;
            console.log(code);
            if(!state){
                var option = baseConf.option;
                option.url = "http://getappid.cn";
                option.data = {};
                option.before = function(){
                }
                vm.$http(option).then(function(data){
                    var result = data.data;
                    console.log(result);
            
                
            }).catch(function(data){                
                console.log(data);
            });
            }
        },
        created:function(){
            var vm = this;
            //vm.getArticle(option);
        }
    }
</script>