const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload');

// Import all routes
const user = require('./routes/user')

// initialize our express app
const app = express()

// Initialize the port
let port = 3001

// Set static file 
app.use(express.static('public'))

// Listen port 
app.listen(port, () => {
  console.log(`This app is running on port: ${port}`);
})

// set up mongoose collection
let db_url = 'mongodb://localhost:27017/node_crud';

// Connect mongoose to database
mongoose.connect(db_url)
  .then(() => {
    console.log('Db connected')
  })
  .catch((err) => {
    console.log('Error occured.')
  })

// Use body parser for body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

// Upload file
app.use(fileUpload())

app.use('/users', user)