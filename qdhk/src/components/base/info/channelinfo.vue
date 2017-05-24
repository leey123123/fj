<template>
<div class="tap-info" style="padding-top: .7rem;">
    <ul class="apply-input-info changing-info">
        <li>
            <label>渠道公司ID</label>
            <input type="text" name="" class="box_flex" :value="postdata.channelteamid" disabled>
        </li>

        <li>
            <label>渠道公司</label>
            <input type="text" name="" class="box_flex"  :value="postdata.channelteamname" disabled>
        </li>


        <li class="tel">
            <label>渠道公司联系电话</label>
            <input type="text" name=""  class="box_flex" :value="postdata.channelteamphone" disabled>
        </li>

        <li>
            <label>渠道公司手机号码</label>
            <a  class="tela" :href="getTelHref(postdata.channelteammobilephone)">{{postdata.channelteammobilephone}}</a>
            <!-- <input type="text" name=""  class="box_flex" :value="postdata.channelteammobilephone" disabled> -->
        </li>

        <li>
            <label>渠道业务员姓名</label>
            <input type="text" name="" class="box_flex"  :value="postdata.channelstaffname" disabled>
        </li>

        <li>
            <label>渠道业务员电话</label>
            <a  class="tela" :href="getTelHref(postdata.channelstaffmobilephone)">{{postdata.channelstaffmobilephone}}</a>
            <!-- <input type="text" name=""   class="box_flex" :value="postdata.channelstaffmobilephone" disabled> -->
        </li>
        
    </ul>                
</div>
</template>
<script>
import mtPopup from '../../../commom/popup';
import '../../../commom/popup/style.css';
export default{
    data:function(){
        return{
            postdata:{
                channelteamid : '',
                channelteamname : '',
                channelteamphone : '',
                channelteammobilephone : '',
                channelstaffname : '',
                channelstaffmobilephone : ''
            }
        }
        
        
    },
    methods:{
        getTelHref:function(tel){
            if(tel){
                return "tel://"+tel;
            }
            return tel;
        }
    },
    created:function(){
        var vm = this;
        this.$parent.$parent.menutype=2;
        this.$parent.childmenutype=6;
        for(var x in vm.postdata){
            vm.postdata[x] = this.getData(x);
        }
        

    },
    components:{
        'mtPopup':mtPopup
    }
}

    
</script>

<style>
.tela{
    position: absolute;
    right: 0.3rem;
}
</style>
