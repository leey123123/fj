define([
    'app',
    "zepto",
    "datePicker"
],function(app, $){
    //滑动选择控件
    app.directive("scrollSelect",function(){
        return {
            restrict:"A",
            scope:{
                placeholder:'@'
            },
            link:function($scope,$element,$attrs){

                if($attrs.scrollSelect=='clearPwd'){
                    $('#'+ $attrs.id).on('change',function(e){
                        $scope.$emit('clearPwd');
                    });
                }

                // if($attrs.scrollSelect=='dividendType'){
                //     $('#'+ $attrs.id).on('change',function(e){
                //         $scope.$emit('dividendType');
                //     })
                // }

                //$scope.$on('finishLoading',function(){
                    $(function(){

                        if($attrs.scrollSelect == 'city'){

                            //省市区
                            $('#'+ $attrs.id).mobiscroll().scroller({
                                theme: "",     // Specify theme like: theme: 'ios' or omit setting to use default
                                mode: "mixed",       // Specify scroller mode like: mode: 'mixed' or omit setting to use default
                                display: "bottom", // Specify display mode like: display: 'bottom' or omit setting to use default
                                lang: "zh",
                                minWidth: false,
                                maxWidth: true,
                                mode: 'scroller',
                                //headerText: true,
                                placeholder:$scope.placeholder||'',
                                onBeforeShow: function (event, inst) {
                                    window.scrollTo(0, 0);
                                },
                                height:60,
                                group: true,
                                wheels: [
                                    [{
                                        label: 'province',
                                        data: ['广东', '福建', '海南', '新疆', '吉林', '广西', '湖南', '江西']
                                    }, {
                                        label: 'city',
                                        data: [{
                                            value: 0,
                                            display: '深圳'
                                        }, {
                                            value: 1,
                                            display: '广州'
                                        }, {
                                            value: 2,
                                            display: '惠州'
                                        }, {
                                            value: 3,
                                            display: '韶关'
                                        }]
                                    },{
                                        label: 'area',
                                        data: [{
                                            value:'1',
                                            display: '福田区'
                                        },{
                                            value:'2',
                                            display: '罗湖区'
                                        },{
                                            value:'3',
                                            display: '福田区'
                                        }]
                                    }]
                                ]
                            });
                            
                        }else {
                            $('#'+ $attrs.id).mobiscroll().select({
                                theme: "",     // Specify theme like: theme: 'ios' or omit setting to use default
                                mode: "mixed",       // Specify scroller mode like: mode: 'mixed' or omit setting to use default
                                display: "bottom", // Specify display mode like: display: 'bottom' or omit setting to use default
                                lang: "zh",
                                minWidth: false,
                                maxWidth: true,
                                //headerText: true,
                                placeholder:$scope.placeholder||'',
                                onBeforeShow: function (event, inst) {
                                    window.scrollTo(0, 0);
                                },
                                height:60,
                                group: true
                            });
                        }

                        

                        $scope.$emit('scrollInit');
                    });
                //});

            }
        };
    });

    
});
