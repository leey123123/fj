import Mock  from './mock-min'
export default Mock.mock('http://localhost:8888/sendmes?phone=12222222222', 
    {
        "errorCode": "0",
        "message": "发送成功",
        "data": []
    }).mock('http://localhost:8888/sendmes?phone=11111111111', 
    {
        "errorCode": "-11",
        "message": "发送失败",
        "data": []
    }).mock('http://localhost:8888/weixin/bind?openId=a&mobileNum=12222222222&validCode=123456',{
    
        "errorCode": "0",
        "message": "调用成功",
        "data": [
                {
                    "userId": 10000000
                }
            ]
    
    }).mock('http://localhost:8888/weixin/bind?openId=a&mobileNum=12222222222&validCode=123457',{
    
        "errorCode": "-11",
        "message": "调用失败",
        "data": [
                {
                    "userId": 10000000
                }
            ]
    
    }).mock('http://localhost:8888/weixin/getAppid',{
    
        "errorCode": "0",
        "message": "调用成功",
        "data": [
                {
                    "appid": "wxe75dc631369d747c"
                }
            ]
    
    }).mock('http://localhost:8888/weixin/checkBind?code=123',{//已绑定
    
        "errorCode": "0",
        "message": "调用成功",
        "data": [
                {
                    "type":1,//已绑定
                    "openid": "wxe75dc631369d747c",
                    "nickname":"老司机",
                    "userimg":"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3295371831,789519652&fm=23&gp=0.jpg",
                    "user_id":"123123"

                }
            ]
    
    }).mock('http://localhost:8888/weixin/checkBind?code=125',{//未绑定
    
        "errorCode": "0",
        "message": "调用成功",
        "data": [
                {
                    "type":2,//未绑定
                    "openid": "wxe75dc631369d747c",
                    "nickname":"老司机",
                    "userimg":"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3295371831,789519652&fm=23&gp=0.jpg",
                    "user_id":"123123"

                }
            ]
    
    }).mock('http://localhost:8888/process/query?user_id=123123',{//查询列表成功
    
        "errorCode": "0",
        "message": "调用成功",
        "data|10": [
                {
                    "loanId|+1":1000000,//未绑定
                    "productName": "@name",
                    "applyDate":"@date",
                    "currentState|1-5":5

                }
            ]
    
    }).mock('http://localhost:8888/process/query?user_id=2',{//查询列表失败
    
        "errorCode": "-11",
        "message": "调用失败",
        "data": []
    
    }).mock('http://localhost:8888/process/query/1000000',{//查询列表失败
    
        "errorCode": "0",
        "message": "调用成功",
        "data":{
            "productName":"@name",
            "loanId":10000000
        },
        "list|3": [
              {
                    "stateName":"@name",
                    "stateTime": "@date @time"

                }  

            ]
    
    });