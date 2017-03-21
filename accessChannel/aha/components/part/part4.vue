<template>
	<section>
			<div class="y-epl-pro-t">产品介绍</div>
			
			<section>
				<div class="y-epl-con y-epl-flow">
					<div class="flow-rz">
						<div class="flow-tit"><span>融资／融券</span>流程</div>
						<ul>
							<li>网上预约</li>
							<li>临柜签署协议</li>
							<li>开立账户</li>
							<li>提交担保物</li>
							<li>交易</li>
						</ul>
					</div>
					<div class="flow-hk">
						<div class="flow-tit"><span>融资负债偿还</span>流程</div>
						<ul>
							<li>买券还款(T+1)</li>
							<li>现券还券(T+1)</li>
						</ul>
					</div>
					<div class="flow-hq">
						<div class="flow-tit"><span>融券负债偿还</span>流程</div>
						<ul>
							<li>卖券还款(T+1)</li>
							<li>现金还款(可T+0)</li>
						</ul>
					</div>
				</div>
				
				<div class="y-epl-info">
					<h1>产品简介</h1>
					<p class="text-info">
						融资融券是指客户向证券公司提供担保物，证券公司向客户出借资金供其买入标的证券或者出借标的证券供其卖出的经营活动。
					</p>
				</div>
		
				<div class="y-epl-feilv">
					<div class="tit">
						<span class="text-right">{{rate.updatedate}}</span>
						融资利率与融券费率
					</div>
					<ul class="feilv-info">
						<li>
							<p class="f-red"><span class="f-big">{{rate.financing}}</span></p>
							<p>融资利率(年)</p>
						</li>
						<li>
							<p class="f-red"><span class="f-big">{{rate.securities}}</span></p>
							<p>融券费率(年)</p>
						</li>
					</ul>
				</div>
		
				<div class="y-epl-danbao">
					<div class="tit">维持担保比例</div>
					<table class="table-box" cellpadding="0" cellspacing="0">
						<tr>
							<th>事项</th>
							<th>比例</th>
						</tr>
						<tr v-for="item in ratelist">
							<td>{{item.matters}}</td>
							<td>{{item.ratio}}</td>
						</tr>
						
					</table>
				</div>
		
				<a href="#" class="y-epl-rule">详细规则</a>
			</section>
		</section>
</template>

<script type="text/javascript">
	export default{
		data:function(){
			return {
				'rate':{},
				'ratelist':[]
			}
		},
		beforeCreate:function(){
			var url = baseConf.url+"/rzrqapp/RZRQStkAction?function=Rate";
			
			var joption = baseConf.option;
			joption.url = url;
			joption.data = {};
			joption.before = function(){
			}
			var vm = this;
			this.$http(joption).then(function(data){
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
					vm.rate = jsonArray[0];

					
					
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

			var aoption = baseConf.option;
			aoption.url = baseConf.url+"/rzrqapp/RZRQStkAction?function=Ratio";;
			aoption.data = {};
			aoption.before = function(){
			}
			this.$http(aoption).then(function(data){
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
					vm.ratelist = jsonArray;
					//console.log(result);

					
					
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
		filters:{

					}
	}
</script>