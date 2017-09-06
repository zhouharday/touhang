
var express = require("express");
var path = require("path")
var app = express();

//设置静态资源
app.use(express.static(path.resolve(__dirname, "dist")));
app.get("/",function(req,res){
    res.sendfile("dist/index.html")
})

app.listen(8080, function() {
    var c = require('child_process');
    c.exec('start http://192.168.0.134:8080');
})