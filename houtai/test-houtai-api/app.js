let express = require('express');

let mongoose = require('mongoose');

let bodyParser = require('body-parser');

let app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json())

app.use('/activeManage',require('./routers/api'));
app.use('/activePublic',require('./routers/activePublic'));

mongoose.connect('mongodb://localhost:27019/test',(err)=>{
    if(err){
        console.log('数据库链接失败')
    }else{
        console.log('数据库链接成功');
        app.listen(3000)
        console.log('监听建立在3000端口');
    }
})
