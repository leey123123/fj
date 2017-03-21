<template>
	<div>
		<banner></banner>
		<part2></part2>
		<part3></part3>
		<part4></part4>
		<part5></part5>
	</div>
</template>

<script type="text/javascript">
	import banner from './part/banner';
	import part2 from './part/part2';
	import part3 from './part/part3';
	import part4 from './part/part4';
	import part5 from './part/part5';
	export default{
		beforeCreate:function(){

		},
		mounted:function(){
			
			
		},

		components:{
			'banner':banner,
			'part2':part2,
			'part3':part3,
			'part4':part4,
			'part5':part5
		}
	}

</script></s>