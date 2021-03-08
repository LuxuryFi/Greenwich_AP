var express = require('express')
var app = express()




app.get('/', function(res, req,next) {
    res.set('Hello world');
})







app.listen(3000, function() {
    console.log('Hihi' )
})
