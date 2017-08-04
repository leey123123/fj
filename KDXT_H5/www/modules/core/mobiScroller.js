define([
    'app',
    "zepto",
    "mobiScroller"
],function(app, $, mobiscroll){
  //console.log(mobiscroll);
  //滑动选择控件
    app.directive("scrollerSelect",function(){
        return {
            restrict:"A",
            scope: true,
            link:function($scope,$element,$attrs){

              //console.log($scope);
                
              $(function(){
                var selectKey = $attrs.id;
                var width = $(window).width()/3;
                var minWidth = $(window).width()-50;
                var height = parseFloat($('html').css('font-size'))*0.8;

                if($attrs.scrollerSelect == 'city'){

                    var provinceData = C.Province, wheelsProvince = [], wheelsCity = [], wheelsArea = [];
                    var values = []; //保存选择的省市区code
                    
                    var getData = function(data){
                        var list = [];
                        if(data.length>0){
                          for(var i=0; i<data.length; i++){
                              var item = data[i];
                              list.push({
                                value: item.CODE + '&' + item.NAME,
                                display: item.NAME
                              });
                            }
                          }

                        return list;
                    };

                    var getChildData = function(data, code){
                        var list = [];
                        if(data.length>0){
                          for(i=0; i<data.length; i++){
                            if(data[i].CODE == code){
                              list = data[i].CHILD;
                            }
                          }
                        }
                        
                        return  list;
                    };

                    wheelsProvince = getData(provinceData);

                    //省市区
                    mobiscroll.scroller($('#'+ selectKey),{
                      theme: 'ios',
                      display: 'bottom',
                      lang: 'zh',
                      height: height,
                      rows: 5,
                      minWidth: 80,
                      width: width,
                      maxWidth: 250,
                      wheels: [
                          [{
                              circular: false,
                              label: 'province',
                              data: wheelsProvince
                          }, {
                              circular: false,
                              label: 'city',
                              data: []
                          },
                          {
                              circular: false,
                              label: 'area',
                              data: []
                          }]
                      ],
                    onInit: function(event, inst){

                        var pcode, ccode, acode;
                        var cityData = [], citys = [], areaData = [], areas = [];
                        console.log('call 2'+JSON.stringify($scope.user[selectKey]));

                        var init = function(){
                          //默认显示第一个省第一个城市
                            pcode = provinceData[0].CODE+'&'+provinceData[0].NAME;
                            cityData = provinceData[0].CHILD;

                            citys = getData(cityData);
                            inst.settings.wheels[0][1].data = citys;
                            
                            ccode = cityData[0].CODE+'&'+cityData[0].NAME;
                            areaData = cityData[0].CHILD;

                            areas = getData(areaData);
                            inst.settings.wheels[0][2].data = areas;

                            acode = areaData[0].CODE+'&'+areaData[0].NAME;
                        };

                        if ($scope.user[selectKey]) {
                            var ccodeNum = $scope.user[selectKey].code;
                            var acodeNum = $scope.user[selectKey].area.code;
                            if(ccodeNum.substring(-1,4)==acodeNum.substring(-1,4)){
                              var cityLabel = '', areaLabel = '';
                              for(var k; k<provinceData.length; k++){
                                var p = provinceData[k];
                                var cityChild = p.CHILD;
                                for(var k2; k2<cityChild.length; k2++){
                                  var c = cityChild[k2];
                                  if(c.CODE == ccodeNum){
                                      pcode = p.CODE+'&'+p.NAME;
                                      ccode = ccodeNum+'&'+c.NAME;
                                      cityLabel = c.NAME;
                                      var areaChild = c.CHILD;
                                      for(var k3; k3<areaChild.length; k3++){
                                        var a = areaChild[k3];
                                        if(a.CODE == acodeNum){
                                          acode = acodeNum+'&'+a.NAME;
                                          areaLabel = a.NAME;
                                        }
                                      }
                                  }
                                }
                              }

                            } else {
                              init();
                            }
                            

                        } else {
                          init();
                        }
                        
                        values = [pcode,ccode,acode];
                        inst.setArrayVal(values);

                    },
                    validate: function(event, inst){
                      values = event.values;
                    },
                    onChange: function(event, inst){
                      //console.log('values='+values);
                      
                      var i,j,ii,jj,
                          //values = inst.getArrayVal();
                          pcode = values[0].substring(-1,6),
                          ccode = values[1].substring(-1,6),
                          acode = values[2].substring(-1,6),
                          cityData = [],
                          citys = [],
                          areaData = [],
                          areas = [],
                          newValues = [];

                          if(!pcode || pcode == undefined){

                            return false;
                          }
                          newValues[0] = values[0];
                          cityData = getChildData(provinceData, pcode);

                          if(pcode.substring(-1,2)!=ccode.substring(-1,2)){
                            //省市code前两位不相等，根据省获取市和区
                            citys = getData(cityData);
                            //默认选择第一个城市
                            ccode = cityData[0].CODE;
                            areaData = cityData[0].CHILD;
                            areas = getData(areaData);

                            inst.changeWheel({
                                1: { data: citys},
                                2: { data: areas}
                            }, 300); 
                            
                            newValues[1] = cityData[0].CODE+'&'+cityData[0].NAME;

                          }else if(ccode.substring(-1,4)!=acode.substring(-1,4)){

                            //省市code前两位相等，根据市获取区
                            areaData = getChildData(cityData,ccode);
                            areas = getData(areaData);

                            inst.changeWheel({
                                2: { data: areas}
                            }, 300); 

                            newValues[1] = values[1];
                            newValues[2] = areaData[0].CODE+'&'+areaData[0].NAME;

                          }else {
                            newValues[1] = values[1];
                            newValues[2] = values[2];
                          }

                          values = newValues;

                          inst.setArrayVal(newValues);

                    },
                    
                    onSet: function(event, inst){
                      var data  = inst.getArrayVal();
                      var city = data[1], area = data[2];
                      var reg = /[1-9][0-9]*/g, num = /[\d|&|,]+/g;
                      var key = selectKey.replace('Select','');
                      $scope.user[key] = {
                        code: city.match(reg)+'',
                        name: city.replace(num,'')+'',
                        area: {
                          code: area.match(reg)+'',
                          name: area.replace(num,'')+''
                        },
                        showName: city.replace(num,'') + ' ' + area.replace(num,'')
                      };
                      $scope.$apply();
                    },
                    formatValue: function(data){
                      return false;
                    }
                  });
                    
                }else {
                  
                  var selectItems = $scope[$('#'+ selectKey).attr('list-items')];
                  var wheelsData = [], selectValues;

                  for(var i=0; i<selectItems.length; i++){
                    var item = selectItems[i];
                    wheelsData.push({
                      value: item.name,
                      display: item.label
                    });
                  }

                  var getLabel = function(data,name){
                    var label = '';
                    if(data.length>0){
                      for(var i=0; i<data.length; i++){
                        if(data[i].name == name){
                          label = data[i].label;
                        }
                      }
                    }
                    return label;
                  };

                    mobiscroll.scroller($('#'+ selectKey),{
                        theme: 'ios',
                        display: 'bottom',
                        lang: 'zh',
                        height: height,
                        rows: 5,
                        minWidth: minWidth,
                        maxWidth: 300,
                        placeholder:$scope.placeholder||'',
                        wheels: [
                          [{
                            circular: false,
                            label: 'selectList',
                            data: wheelsData
                          }]
                        ],
                        onInit: function(event, inst){
                          //console.log($scope.user[$attrs.id]);
                          if($scope.user[selectKey]){
                            var name = $scope.user[selectKey].name;
                            selectValues = name;
                            inst.setArrayVal(selectValues);
                          }
                          
                        },
                        validate: function(event, inst){
                          selectValues = event.values[0];
                        },
                        onChange: function(event, inst){
                          console.log(selectValues);
                        },
                        onSet: function(event, inst){
                          console.log('onset='+inst.getArrayVal());
                          var name = inst.getArrayVal()[0];
                          var label = getLabel(selectItems,name);
                          
                          $scope.user[selectKey] = {
                            name: name,
                            label: label
                          };
                          $scope.$apply();
                        },
                        formatValue: function(data){
                          return false;
                        }
                    });
                }

                $scope.$emit('scrollInit');

              });

            }
        };
    });

});