const axios = require('axios');
const fs = require('fs');
const jsdom = require('jsdom');
const {
    JSDOM
} = jsdom;
const url = require('url');
const mysql = require('mysql')
const express = require('express')
const app = express();

var getListStudent = require('./getListStudent');

axios.defaults.headers.common['Cookie'] = 'G_ENABLED_IDPS=google; _ga=GA1.3.358351611.1615029154; ASP.NET_SessionId=4cfcvr1qp3fxpnrpagnfbqgq; G_AUTHUSER_H=1';

 



var con = mysql.createConnection({
    host: "45.124.94.41",
    user: "root",
    password: "root",
    database: "asm2"
});


app.get('/getListStudent',async (res,req,next) => {
    let list = await getListStudent.getStudent;
    console.log(list);
})

app.get('/getListTopic',async (res,req,next) => {
    let list = await getListStudent.getTopic;
    console.log(list);
})



app.listen(3000,function(){
    console.log('Node server running @ http://localhost:3000')
});



