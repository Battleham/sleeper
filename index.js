const express = require("express");
const bodyparser = require("body-parser");
const fetch = require("node-fetch");


var app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.get('/', function(req, res){
    console.log(req.headers.conid);
    
    let startTime = Date.now();
    setTimeout(() => {
        let elTime = Date.now() - startTime;
        let body = {}
        body.connectionId = req.headers.conid;
        body.msg = "I waited for " + elTime;
        let options = {}
        options.method = "POST";
        options.body = JSON.stringify(body);
        options.headers = { 'Content-Type': 'application/json' };
        console.log(options.body);
        fetch("http://localhost:3000/connections", options)
        .then(res => res.text()
        .then(data => console.log(data))
        .catch(err => console.log(err)))
        .catch(err => console.log(err));
        res.send("We waited for " + elTime);
    }, 3000);
  });

app.listen(4000, () => {
    console.log("Listening on port 4000...");
});