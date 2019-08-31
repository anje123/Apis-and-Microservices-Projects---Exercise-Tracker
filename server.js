const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const user = require("./controllers/user");
const exercise = require("./controllers/exercise");
const Exercise = require("./models/users");

const cors = require('cors')

const mongoose = require('mongoose')
mongoose.connect(process.env.MLAB_URI || 'mongodb://localhost/exercise-track',{useNewUrlParser: true} );

app.use(cors())

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});



// Error Handling middleware
app.use((err, req, res, next) => {
  let errCode, errMessage

  if (err.errors) {
    // mongoose validation error
    errCode = 400 // bad request
    const keys = Object.keys(err.errors)
    // report the first validation error
    errMessage = err.errors[keys[0]].message
  } else {
    // generic or custom error
    errCode = err.status || 500
    errMessage = err.message || 'Internal Server Error'
  }
  res.status(errCode).type('txt')
    .send(errMessage)
})

app.use("/api/exercise/new-user", user);
app.use("/api/exercise/add", exercise);

app.get("/api/exercise/log",async(req,res)=>{
 try {
  let {userId,from,to,limit} = req.query;
  from = Date.parse(from);
  to = Date.parse(to);
  limit = Number(limit);
  await exercise.find({userId,date: {$gt: from, $lt: to}}).limit(limit);
  res.json(exercise);
 } catch (error) {
   console.log(error);
   
 }

});

// Not found middleware
app.use((req, res, next) => {
  return next({status: 404, message: 'not found'})
})


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
