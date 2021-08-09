var express = require('express');
var router = express.Router()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const connection = mongoose.createConnection(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

router.use(bodyParser.urlencoded({extended: false}))

const userSchema = mongoose.Schema({
  username: {type: String, required: true},
  exercises: [{
    description: String,
    duration: Number,
    date: String
  }]
})
const User = connection.model('User', userSchema)

router.post('/api/exercise/new-user', (req, res) => {
  User.findOne({username:req.body.username}, (findErr, findResult) => {
    if (!(findResult)){
      User.create({username:req.body.username}, (createErr, createResult)=>{
        if (createErr) return console.log(createErr)
        res.json({username:req.body.username, _id:createResult._id})
      })
    } else {
      res.send('Username already taken')
    }
  })
})

router.get('/api/exercise/users', (req, res) => {
  User.find({}, (err, results)=> {
    res.json(results.map(a=>({
      username:a.username,
      _id:a._id
    })))
  })
})

router.post('/api/exercise/add', (req, res) => {
  const exerciseToAdd = {
    description: req.body.description,
    duration: req.body.duration,
    date: req.body.date === '' ? new Date() : new Date(req.body.date)
  }
  User.findById(req.body.userId, (err, results) => {
    if (results) {
      results.exercises.push(exerciseToAdd)
      results.save()
      let jsonResponse = {
        _id: results._id,
        username: results.username,
        date:exerciseToAdd.date.toDateString(),
        duration:parseInt(req.body.duration),
        description:req.body.description
      }
      res.json(jsonResponse)
    } else {
      res.send('userIdNotfound')
    }
  })
})

router.get('/api/exercise/log', (req, res) => {
  User.findById(req.query.userId, (error, result) => {
    if (result) {
      let log = result.exercises
      if ('from' in req.query){
        log = log.filter(
          exer => {
            return (new Date(exer.date) >= new Date(req.query.from) && new Date(exer.date) <= new Date(req.query.to))
          }
        )
      }
      if ('limit' in req.query) {
        log = log.slice(0, req.query.limit)
      }
      let jsonResponse = {
        _id:result._id,
        username: result.username,
        count: log.length,
        log: log 
      }
      res.json(jsonResponse)
    } else {
      res.send('UserId not found')
    }
  })
})

module.exports = router