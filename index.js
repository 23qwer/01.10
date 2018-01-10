const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(express.static('www'));

app.use(bodyParser.urlencoded({extended:true}));

app.post('/reg',(req,res)=>{
    const username = req.body.username;
    console.log(username);
    const password = req.body.password;
    console.log(password);
    fs.readFile('data.json',(err,data)=>{
        if(err){
            res.json({success:0,message:'系统错误，稍后再试'})
            return;
        }
        console.log(data);
        const dataArr = JSON.parse(data)
        dataArr.unshift({username,password});
        fs.writeFile('data.json',JSON.stringify(dataArr),(err)=>{
            if(err){
                res.json({success:0,message:'系统错误，稍后再试'})
                return;
            }
        })
        res.json({success:1,message:'操作成功'});
    })
})

app.listen('3000',function(){
    console.log('运行于3000端口');
})