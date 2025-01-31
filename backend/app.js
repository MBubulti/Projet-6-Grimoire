const express = require('express');
const mongoose = require('mongoose');

const app = express();

const uri =
  'mongodb+srv://maximebuffet10:104070QsDvbn@cluster0.hxh6q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose
  .connect(uri)
  .then(() => console.log('Connexion MongoDB réussie !'))
  .catch((err) => console.error('Erreur MongoDB:', err));

app.use(express.json()); // Pour traiter le JSON

const Book = require('./models/Book');
const User = require('./models/User');

//Routes POST
//Routes SignUp
app.post('/api/auth/signup', (req, res) => {
  res.send('Route Signup');
});

//Routes Login
app.post('/api/auth/login', (req, res) => {
  res.send('Route Login');
});

//Routes Books
app.post('/api/books', (req, res) => {
  res.send('Route Books');
});

//Routes book Rating
app.post('/api/books/:id/rating', (req, res) => {
  res.send('Route Rating');
});

//Routes GET
//Routes Books
app.get('/api/books', (req, res) => {
  res.send('Route books');
});

//Routes book
app.get('/api/books/id', (req, res) => {
  res.send('Route book');
});

//Routes Best Rated Books
app.get('/api/books/bestrating', (req, res) => {
  res.send('Route bestRated');
});

// Route PUT
app.put('/api/books/:id', (req, res) => {
  res.send('Route Update');
});

// Route DELETE
app.delete('/api/books/:id', (req, res) => {
  res.send('Route Delete');
});

module.exports = app;
