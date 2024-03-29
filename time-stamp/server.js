// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

app.get('/api/timestamp', (req, res) => {
  res.json({"unix":Date.now(),"utc":Date()})
})
 
app.get('/api/timestamp/:input', (req, res) => {
  let input = req.params.input
  if (!req.params.input){
    res.send(input)
  }
  let date
  if (!(/^\d+$/.test(input))){
    date = new Date(input)
  } else {
    date = new Date(parseInt(input))
  }
  if (isNaN(date)){
    res.json({"error": "Invalid Date"})
  } else {
    res.json({"unix":date.getTime(), "utc":date.toUTCString()})
  }
})