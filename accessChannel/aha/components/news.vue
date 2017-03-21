<template>
	<div id="news">
		<div id="wrapper">
			<div id="scroller">
				<div id="pullDown" style="display:none;">
				</div>
					<div class="content" id="article">
						<mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded">
							 <ul class="list">
								 <li class="list-item" v-for="it in news">
									 <a  :value="it.link_url" href="javascript:void(0);" class="artDetail" v-if="it.link_url">
										
										 <div class="name">{{it.title}}</div>
										<div class="date">{{it.create_date}}</div>
									</a> 
									<a  :value="it.url" href="javascript:void(0);" class="artDetail" v-else>
										
										 <div class="name">{{it.title}}</div>
										<div class="date">{{it.create_date}}</div>
									</a>
								</li> 
							</ul>
						</mt-loadmore>
						
					</div>
			</div>
		</div>

				
	</div>
</template>

<script type="text/javascript">
import MtLoadmore from 'mint-ui/lib/loadmore';
import 'mint-ui/lib/loadmore/style.css';
	export default{
		data:function(){
			return {
				'news':[],
				'page':0,
				'allLoaded':false
			}
		},
		components:{
			'MtLoadmore':MtLoadmore
		},
		methods:{
			'getArticle':function(option){
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
					vm.news = vm.news.concat(jsonArray);
					

					
					
				}else{
					Toast({
					  message: errormsg,
					  position: 'bottom',
					  duration: 30
					});
				}
				
			}).catch(function(data){				
				console.log(data);
			});
			},
			'loadBottom':function(){
				var vm = this;
				var url = baseConf.url+"/rzrqapp/RZRQStkAction?function=Article";
				vm.page = vm.page+1;
				var param = {
					"page":vm.page
				};
				var option = baseConf.option;
				option.url = url;
				option.data = param;
				option.before = function(){
				}
				vm.getArticle(option);
			}
		},
		created:function(){
			var vm = this;
			var url = baseConf.url+"/rzrqapp/RZRQStkAction?function=Article";
			var param = {
				"page":vm.page
			};
			var option = baseConf.option;
			option.url = url;
			option.data = param;
			option.before = function(){
			}
			vm.getArticle(option);
		},
		filters:{

		}
		
	}

</script>
