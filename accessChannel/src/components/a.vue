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
                    data = data.data;
                    console.log(data);
                                
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