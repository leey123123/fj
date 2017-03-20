<template>
  <table>
    <tr><th>one</th><th>col2</th><th>col3</th></tr>
    <tr v-for="item in 10">
        <td v-text="item"></td>
    </tr>
</table>
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
            }
        },
        created:function(){
            var vm = this;
            var url = baseConf.url+"http://g.cn";
            var param = {
                
            };
            var option = baseConf.option;
            option.url = url;
            option.data = param;
            option.before = function(){
            }
            vm.getArticle(option);
        }
    }
</script>