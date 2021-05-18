var express = require('express');
var app = express();
var longpoll = require("express-longpoll")(app);
var longpollWithDebug = require("express-longpoll")(app, { DEBUG: true });

// Creates app.get("/poll") for the long poll
longpoll.create("/poll");

app.listen(8080, function () {
    console.log("Listening on port 8080");
});


// Publishes data to all clients long polling /poll endpoint
// You need to call this AFTER you make a GET request to /poll
longpoll.create("/routerpoll");

app.use('/static', express.static(__dirname + '/static'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/static/client.html");
});

app.post("/send", (req, res) => {
    req.on("data", function (room) {
        let jsonData = JSON.parse(room)
        longpoll.publish("/poll", jsonData);
        console.log(jsonData)
    })
});


