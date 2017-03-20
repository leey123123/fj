<template>
	<section class="y-epl-news" id="news">
			<span class="news-icon"></span>
			<router-link to="/news">
			<div class="news-info" id="swipe">		
				
					<!----> <div class="info" v-for="item in ad">
						<a href="javascript:void(0);">
							<h1>{{item.title|sub}}</h1>
							
						</a>
					</div> 
					
					
<!-- 					<div class="info">
	<a href="javascript:void(0);">
		<h1>111111111111111111</h1>
		
	</a>
</div>

<div class="info">
	<a href="javascript:void(0);">
		<h1>2222222222222222222222222222222</h1>
		
	</a>
</div>

<div class="info">
	<a href="javascript:void(0);">
		<h1>333333333333333333333333333</h1>
		
	</a>
</div>

<div class="info">
	<a href="javascript:void(0);">
		<h1>444444444444444444444444444</h1>
		
	</a>
</div>

<div class="info">
	<a href="javascript:void(0);">
		<h1>5555555555555</h1>
		
	</a>
</div>

<div class="info">
	<a href="javascript:void(0);">
		<h1>6666666666666</h1>
		
	</a>
</div>  -->
					
				
			</div>
			</router-link>
		</section>
</template>

<script type="text/javascript">
	export default{
		
		data:function(){
			return {
				'Delay':10,
				'Amount':1,
				'Direction':"up", 
				'Timeout':1000,
				'ScrollContent':null,
				'AutoScrollTimer':null,
				'ScrollTimer':null,
				'scrollNum':0,
				'kk':null,
				'ad':[]
			};
		},
		filters: {
		    sub: function (value) {
		      if (!value) return '';
		      if(value.length>15){
		      	value = value.substring(0,15)+'...';
		      }
		      return value;
		    }
		  },
		methods:{
			'srollPlus':function(){
				this.ScrollContent.scrollTop += this.Amount; 
			},
			'Start':function(){ 
				clearTimeout(this.AutoScrollTimer); 
				this.AutoScrollTimer=setTimeout(this.GetFunction(this,"AutoScroll"),this.Timeout); 
			},
			'AutoScroll':function(){ 
				var oneHeight = Math.round(parseInt(this.ScrollContent.scrollHeight)/this.scrollNum);
				var scrollTop = parseInt(this.ScrollContent.scrollTop);
				if(this.Direction=="up"){ 
					if(scrollTop>=parseInt(this.ScrollContent.scrollHeight-oneHeight)){ 
						this.ScrollContent.scrollTop=0; 
						clearTimeout(this.AutoScrollTimer); 
						this.AutoScrollTimer = setTimeout(this.GetFunction(this,"AutoScroll"), this.Timeout); 
					return; 
					}
					this.ScrollContent.scrollTop += this.Amount; 
					
				}else 
				{ 
				if(parseInt(this.ScrollContent.scrollTop) <= 0) 
				{ 
				this.ScrollContent.scrollTop = parseInt(this.ScrollContent.scrollHeight) / 2; 
				} 
				this.ScrollContent.scrollTop -= this.Amount; 
				} 
				//console.log(oneHeight);
				if(parseInt(this.ScrollContent.scrollTop) % oneHeight != 0) 
				{ 
				this.ScrollTimer = setTimeout(this.GetFunction(this,"AutoScroll"), this.Delay); 
				} 
				else 
				{ 
					
				this.AutoScrollTimer = setTimeout(this.GetFunction(this,"AutoScroll"), this.Timeout); 
				} 
			},
			'GetFunction':function(variable,method){ 
				return function(){variable[method]();}
			},
			'Stop':function(){ 
				clearTimeout(this.AutoScrollTimer); 
				clearTimeout(this.ScrollTimer); 
				clearTimeout(this.kk); 
			},
			'mes':function(){

			}    

		},
		beforeCreate:function(){
			
			var url = baseConf.url+"/rzrqapp/RZRQStkAction?function=Article";
			var param = {
				"page":""
			};
			var option = baseConf.option;
			option.url = url;
			option.data = param;
			option.before = function(){
			}
			var vm = this;
			this.$http(option).then(function(data){
				data = data.data;
				data = JSON.parse(data);				
				var errorno = parseInt(data.error_no);
				var errormsg = data.error_info;
				if(errorno===0){
					var result = data.results[0].resultList;
					var thiskey = 'key'+new Date().getTime();
					var tmpJson = '{"'+ thiskey +'":' + result + '}';
					var thisJson = JSON.parse(tmpJson);
					var jsonArray = thisJson[thiskey];
					if(jsonArray!=null && jsonArray.length>9){
						jsonArray.slice(0,9);
					}
					vm.ad = jsonArray;

					
					
				}else{
					Toast({
					  message: errormsg,
					  position: 'bottom',
					  duration: 3000
					});
				}
				
			}).catch(function(data){				
				console.log(data);
			});
		},
		updated:function(){
			var vm = this;
			function aa(){
				vm.ScrollContent = document.getElementById('swipe');
				vm.scrollNum = vm.ScrollContent.getElementsByTagName('div').length;
				if(vm.scrollNum>1){
					vm.Start();
					clearTimeout(this.kk); 
				}else{
					vm.kk = setTimeout(aa,200);
				}
			}
			
			vm.kk = setTimeout(aa,200);
			
			
				
			},
		
		destroyed:function(){
				this.Stop();
				
			}
		
		
	}
</script>

