<!-- <template>
	<div>
	    <mt-tabbar v-on:input="getids" v-bind:value="val">
		  <mt-tab-item id="tab1">
		    <img slot="icon" src="http://placehold.it/100x100">
		    tab1
		  </mt-tab-item>
		  <mt-tab-item id="tab2">
		    <img slot="icon" src="http://placehold.it/100x100">
		    tab2
		  </mt-tab-item>
		  <mt-tab-item id="tab3">
		    <img slot="icon" src="http://placehold.it/100x100">
		    tab3
		  </mt-tab-item>
		  <mt-tab-item id="tab4">
		    <img slot="icon" src="http://placehold.it/100x100">
		    tab4
		  </mt-tab-item>
		</mt-tabbar>
	</div>
	
</template>

<script type="text/javascript">
	export default {
		data:function(){
			return {
				val:'tab1'
			}
		},
		methods:{
			getids:function(id){
				this.val = id;
			}
		}
	}

</script> -->

<template>

<div id="no-mode-translate-demo" class="demo">
  <div class="no-mode-translate-demo-wrapper">
    <transition name="no-mode-translate-fade">
      <button v-if="on" key="on" @click="on = false">
        on
      </button>
      <button v-else="" key="off" @click="on = true">
        off
      </button>
    </transition>
  </div>
</div>
</template>
<script>
export default{
  data: function(){
  	return {
  		on: false
  	}
    
  }
}
</script>
<style>
.no-mode-translate-demo-wrapper {
  position: relative;
  height: 20px;
}
.no-mode-translate-demo-wrapper button {
  position: absolute;
}
.no-mode-translate-fade-enter-active, .no-mode-translate-fade-leave-active {
  transition: all 1s;
}
.no-mode-translate-fade-enter, .no-mode-translate-fade-leave-active {
  opacity: 0;
}
.no-mode-translate-fade-enter {
  transform: translateY(20px);
}
.no-mode-translate-fade-leave-active {
  transform: translateY(-20px);
}
</style>
