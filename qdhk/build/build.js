var webpack = require('webpack')
var qdhk_config = require('../config/qdhk/webpack.config');


webpack(qdhk_config,function (error,status) {
       console.log("===============================开始打包渠道获客代码");
        console.log(error+"-->"+status);
    });
