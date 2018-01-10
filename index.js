const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const expressArt = require('express-art-template');
const app = express();

app.use(express.static('www'));

app.use(bodyParser.urlencoded({extended:true}));
app.engine('art',expressArt);
app.post('/reg',(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
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

app.get('/test',(req,res)=>{
    const username = req.query.username
    fs.readFile('data.json',(err,data)=>{
        if(err){
            res.json({success:0,message:'系统错误，稍后再试'})
            return;
        }
        const dataArr = JSON.parse(data);
        for(let i = 0 ; i<dataArr.length ; i ++){
            if(dataArr[i].username==username){
                res.json({success:0,message:'aaaaaa'})
                return;
            }
        }
        res.json({success:1,message:'系统错误，稍后再试'})
    })
})

app.get('/getall',(req,res)=>{
    fs.readFile('data.json',(err,data)=>{
        const dataArr = JSON.parse(data);
        res.render('data.art',({data:dataArr}));
    })
})
app.listen('3000',function(){
    console.log('运行于3000端口');
})