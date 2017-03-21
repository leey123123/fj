<template>
	<div>
	<div class="y-epl-appbtn" id="app-btn" @click="apply">立刻申请</div>
		<div class="y-epl-cover" id="cover" v-show="currentValue" @click.stop="hideapply"></div>
		<transition name="actionsheet-float">
			<div class="y-epl-dialog aa" id="dialog" v-show="currentValue">
				<ul class="diacon">
					<li>
						<a href="#">立刻登录</a>
						<a href="#" class="t-right">已有两融账户</a>
					</li>
					<li>
						<a href="#">两融预约开户</a>
						<a href="#" class="t-right">已有平安证券账户</a>
					</li>
					<li>
						<a href="#">股票开户</a>
						<a href="#" class="t-right">未在平安证券开户</a>
					</li>
				</ul>
			</div>
		</transition>
	</div>
</template>
<style>
	.actionsheet-float-enter,
	  .actionsheet-float-leave-active {
	    transform: translate3d(0%, 100%, 0);
	  }
	  .aa{
	  	transition: transform .2s ease;
	  }
</style>

<script type="text/javascript">
export default{
	data:function(){
		return {
			'currentValue':false
		}
	},
	methods:{
		"apply":function(){
				this.currentValue = !(this.currentValue);				
			},
		'hideapply':function(){
			this.currentValue = !(this.currentValue);
		}
	}
}
	/*import Actionsheet from 'mint-ui/lib/Actionsheet';
	import 'mint-ui/lib/Actionsheet/style.css';
	export default{
		data:function(){
			return {
				'actions':[
				{
					name:'普通开户',
					method:function(){
						alert(1);
					}
				},
				{
					name:'两融开户',
					method:function(){
						alert(2);
					}
				},
				{
					name:'登陆',
					method:function(){
						alert(3);
					}
				}
				],
				'sheetVisible':false

			}
			
		},
		methods:{
			"apply":function(){
				if(this.sheetVisible){
					this.sheetVisible=false;
				}else{
					this.sheetVisible=true;
				}
			}
			

		},
		components:{
			"ll":Actionsheet,
		}
	}*/
</script>