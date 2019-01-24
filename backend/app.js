// Will hold the express app
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const postsRoutes = require('./routes/posts.js');

// create express app
// Will execute the express app
const app = express();

// connects to mongooDB using mongoose
mongoose.connect("mongodb+srv://egonio:YYjoW9QfLOeYtWcv@cluster0-sjykb.mongodb.net/mean-test?retryWrites=true")
  .then(() => {
    console.log('Connected to Database');
  }).catch(() => {
    console.log('Connection Failed');
  });

// setting up body parser for easy way of getting res
app.use(bodyParser.json());

// Setting Up CORS headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT,  DELETE, OPTIONS');
  next();
});

// imports all posts routes
app.use("/api/posts", postsRoutes);

// How to export the app
module.exports = app;
