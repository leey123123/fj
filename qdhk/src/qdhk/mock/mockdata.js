import Mock  from './mock-min'
export default Mock.mock('http://localhost:8888/doSendSMS?phone=12222222222', 
    {
        "error_no": "0",
        "error_info": "发送成功"
    }).mock('http://localhost:8888/doSendSMS?phone=11111111111', 
    {
        "error_no": "-11",
        "error_info": "发送失败"
    }).mock('http://localhost:8888/doUserLogin?phone=12222222222&authcode=123456',{
    
        "error_no": "0",
        "error_info": "调用成功",
        "results": [
                {
                    "role": 1,
                    "id":12345
                }
            ]
    
    }).mock('http://localhost:8888/doUserLogin?phone=12222222222&authcode=123457',{
    
        "error_no": "-11",
        "error_info": "调用失败",
        "results": [
                {
                    "role": 10000000
                }
            ]
    
    }).mock('http://localhost:8888/submitbase?customername=liyao&certtype=00&certid=43070319890820805X&employeetype=1&sex=0&birthday=1989-08-20',{
    
        "error_no": "0",
        "error_info": "调用成功",
        "results": [
                {
                    "applyid": 123456
                }
            ]
    
    }).mock('http://localhost:8888/doGetCreditSolutions?applyid=123456',{
    
        "error_no": "0",
        "error_info": "调用成功",
        "results": [
                    {
                    "productid": 1000,
                    "productionname": "融e贷",
                    "solution|4":[
                                {
                                "solutionid|+1": 1000,
                                "solutionname": "@name",
                                "creditamount|1-100": 100,
                                "ischeck":0

                                }
                                ]
                    
                    },
                    {
                    "productid": 1001,
                    "productionname": "新一贷",
                    "solution|2":[
                                {
                                "solutionid|+1": 10000,
                                "solutionname": "@name",
                                "creditamount|1-100": 100,
                                "ischeck":0
                                }
                                ]
                    
                    }

            ]
    
    }).mock('http://localhost:8888/doGetCreditSolutions?idno=1234&startdate=2017-04-11&enddate=2017-04-14&status=0001&roleid=1&id=12345&pagenum=0&pagelength=20',{
    
        "error_no": "0",
        "error_info": "调用成功",
        "results|20": [
                    {
                        "customername": "@name",
                        "certid": "43070319890830805X",
                        "applyid|+1": 100000,
                        "customerid|+1": 10000,
                        "inputedate": "@date",
                        "applystatus": "0003",
                        "dststatus": "000"
                    }

            ]
    
    }).mock('http://localhost:8888/doGetCreditSolutions?idno=&startdate=&enddate=&status=0001&roleid=1&id=12345&pagenum=0&pagelength=20',{
    
        "error_no": "0",
        "error_info": "调用成功",
        "results|20": [
                    {
                        "customername": "@name",
                        "certid": "43070319890830805X",
                        "applyid|+1": 100000,
                        "customerid|+1": 10000,
                        "inputedate": "@date",
                        "applystatus": "0001",
                        "dststatus": "000"
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