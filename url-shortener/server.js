require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const dns = require('dns')
const autoIncrement = require('mongoose-auto-increment')
app.use(bodyParser.urlencoded({extended: false}))
const connection = mongoose.createConnection(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
autoIncrement.initialize(connection)
// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

const urlSchema = mongoose.Schema ({
  "original_url": String,
})

async function checkURL() {
  let a = null
  await connection.on('open', function (ref) {
    connection.db.listCollections().toArray(function (err, names) {
      a = names
    });
  })
  return a
}

checkURL().then(result => console.log(result))

urlSchema.plugin(autoIncrement.plugin, {model:"URL", field:'short_url'})
var URL = connection.model('URL', urlSchema)

app.post('/api/shorturl/new', (req, res) => {
  let input = req.body.url
  let regex = /^https?:\/\/([A-Za-z0-9\-.]+)\/?.*$/i
  if (!(regex.test(input))){
    res.json({'error':'invalid url'})
  } else {
    dns.lookup(input.match(regex)[1], (err, add)=>{
      if (!err){
        URL.findOne({original_url:input}, (error, result)=> {
          if (!result){
            URL.create({original_url:input}, (errors, results) => {
              if (errors) return console.log(errors)
              res.json({original_url:results.original_url, short_url:results.short_url})
            })
          } else {
            res.json({original_url:results.original_url, short_url:results.short_url})
          }
        })
      } else {
        res.json({error:'invalid hostname'})
      }
    })
  }
})

app.get('/api/shorturl/:shorturlInput', (req, res) => {
  URL.findOne({short_url:req.params.shorturlInput}, (err, data) => {
    res.redirect(data.original_url)
  })
})