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

// axios.defaults.headers.common['Cookie'] = 'G_ENABLED_IDPS=google; _ga=GA1.3.358351611.1615029154; ASP.NET_SessionId=4cfcvr1qp3fxpnrpagnfbqgq; G_AUTHUSER_H=1';

var con = mysql.createConnection({
    host: "45.124.94.41",
    user: "root",
    password: "root",
    database: "asm2"
});


app.get('/getListStudent', async (req, res, next) => {
    let list = await getListStudent.getStudent;
    list.forEach(element => {
        var sql = "INSERT trainee (trainee_firstname,trainee_lastname,trainee_email,avatar) VALUES ('"+element.firstname+"','" +element.lastname+"','"+element.email+"','"+element.avatar+"')";
        // con.query(sql, function (err, result) {
        // if (err) throw err;
        // console.log("1 record inserted");
        // });
        // console.log(sql)

    });
    res.send(list);
})

app.get('/getListTopic', async (req, res, next) => {
    let list = await getListStudent.getTopic;

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        list.forEach(element => {
            var sql = "INSERT INTO topic (topic_name,credit,topic_code,semester) VALUES ('" +element.topic_name+"','" +element.credit+"','"+element.topic_code+"','"+element.semester+"')";
            // con.query(sql, function (err, result) {
            // if (err) throw err;
            // console.log("1 record inserted");
            // });
            console.log(sql)

        });
       
      });


    res.send(list);
})




app.listen(3001, function () {
    console.log('Node server running @ http://localhost:3000')
});
