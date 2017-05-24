<template>
<li @click="showDate()">
    <label v-text="title"></label>
    <input type="text" v-model="currentValue" class="box_flex" readonly="true" :placeholder="tip">
    <div class="apply-icon box_vam"><i class="chicon-down"></i></div>
</li>

</template>
<script>
export default {
  name: 'mdate',
  data:function(){
    return {
        picker:''
    };
    
  },
  computed: {
    currentValue: {
      get:function() {
        return this.value;
      },
      set:function(val) {
        this.$emit('input', val);
      }
    }
  },

  props: {
    tip: String,
    title:String,
    value:String,
    onlyread:String
  },
  methods:{
    showDate:function(){
      if('1'!==this.onlyread){
        this.picker.show();
      }
      
    },
    initdate:function(){
        var vm = this;
        if(this.picker===""||this.picker===undefined){
                var first = this.createYear();
                var second = [{'text':'01', 'value':'01'},{'text':'02', 'value':'02'},{'text':'03', 'value':'03'},{'text':'04', 'value':'04'},{'text':'05', 'value':'05'},{'text':'06', 'value':'06'},{'text':'07', 'value':'07'},{'text':'08', 'value':'08'},{'text':'09', 'value':'09'},{'text':'10', 'value':'10'},{'text':'11', 'value':'11'},{'text':'12', 'value':'12'}];
                
                var thirdcopy = [{'text':'01', 'value':'01'},{'text':'02', 'value':'02'},{'text':'03', 'value':'03'},{'text':'04', 'value':'04'},{'text':'05', 'value':'05'},{'text':'06', 'value':'06'},{'text':'07', 'value':'07'},{'text':'08', 'value':'08'},{'text':'09', 'value':'09'},{'text':'10', 'value':'10'},{'text':'11', 'value':'11'},{'text':'12', 'value':'12'},{'text':'13', 'value':'13'},{'text':'14', 'value':'14'},{'text':'15', 'value':'15'},{'text':'16', 'value':'16'},{'text':'17', 'value':'17'},{'text':'18', 'value':'18'},{'text':'19', 'value':'19'},{'text':'20', 'value':'20'},{'text':'21', 'value':'21'},{'text':'22', 'value':'22'},{'text':'23', 'value':'23'},{'text':'24', 'value':'24'},{'text':'25', 'value':'25'},{'text':'26', 'value':'26'},{'text':'27', 'value':'27'},{'text':'28', 'value':'28'},{'text':'29', 'value':'29'},{'text':'30', 'value':'30'},{'text':'31', 'value':'31'}];

                var third = thirdcopy;
                this.picker = new this.Picker({
                    'data': [first,second,third]
                  });
              var year = first[0].value;
              var month = parseInt(second[0].value);
              var day = parseInt(third[0].value);

              this.picker.on('picker.select', function (selectedVal, selectedIndex) {
                var val = selectedVal.join("-");
                vm.currentValue = val
              });

              this.picker.on('picker.valuechange', function (selectedVal, selectedIndex) {
                var val = selectedVal.join("-");
                vm.currentValue = val
              });
              this.picker.on('picker.change', function (index, selectedIndex) {
                
                if (index === 0){
                    firstChange();
                  } else if (index === 1) {
                    secondChange();
                  }else{
                    var selectThird = third[selectedIndex];
                    day = parseInt(selectThird.value);
                  }

                  function firstChange() {
                    var selectFirst = first[selectedIndex];
                    year = selectFirst.value;
                    computerDay();
                  }

                  function secondChange() {
                    var selectSecond = second[selectedIndex];
                    month = parseInt(selectSecond.value);
                    computerDay();
                  }
                  function computerDay(){
                    if(month == 2){
                        //如果是闰年
                        if((year % 4 === 0 && year % 100 !== 0)  || year % 400 === 0){
                            third = thirdcopy.slice(0,29);
                            vm.picker.refillColumn(2, third);
                            if(day>29){
                                vm.picker.scrollColumn(2, 0);
                            }
                        //如果是平年
                        }else{
                            third = thirdcopy.slice(0,28);
                            vm.picker.refillColumn(2, third);
                            if(day>28){
                                vm.picker.scrollColumn(2, 0);
                            }
                        }
                    //如果是第4、6、9、11月
                    }else if(month == 4 || month == 6 ||month == 9 ||month == 11){
                        third = thirdcopy.slice(0,30);
                        vm.picker.refillColumn(2, third);
                            if(day>30){
                                vm.picker.scrollColumn(2, 0);
                            }
                    }else{
                        third = thirdcopy;
                        vm.picker.refillColumn(2, third);
                    }
                  }
              });
            }
    },
    createYear:function(){
        var myDate = new Date();
        var currentYear = myDate.getFullYear();
        var bigyear = currentYear+50;
        var smallyear = currentYear-50;
        var flag = true;
        var yeararray = [];
        while (flag){
            var aa = {};
            aa.text=bigyear;
            aa.value=bigyear
            yeararray.push(aa);
            bigyear--;
            flag = bigyear===smallyear?false:true;
          }
        return yeararray    
    }
  },
  created:function(){
    this.initdate();
    
  }
};
</script>