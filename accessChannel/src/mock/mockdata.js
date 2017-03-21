import Mock  from './mock-min'
export default Mock.mock('http://g.cn', 
    {
        "errorcode": "0",
        "errormsg": "发送成功"
    }).mock('http://k.cn',{
    
        "errorcode": "0",
        "errormsg": "调用成功",
        "result": {
            "applylist|10": [
                {
                    "applyid|+1": 10000000,
                    "applydate": "@date @time",
                    "customername": '@name',
                    "certid": "43070319890820805X",
                    "applystatus": "0"
                }
            ]
        }
    
    }).mock('http://getappid.cn',{
    
        "errorcode": "0",
        "errormsg": "调用成功",
        "result": {
            "appid":"12312341234"
        }
    
    });