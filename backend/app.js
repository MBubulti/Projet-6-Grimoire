const express = require('express');
const mongoose = require('mongoose');

const app = express();
const authRoutes = require('./routes/auth');
const booksRoutes = require('./routes/books');
const uri = process.env.uri;

mongoose
  .connect(uri)
  .then(() => console.log('Connexion MongoDB réussie !'))
  .catch((err) => console.error('Erreur MongoDB:', err));

app.use(express.json()); // Pour traiter le JSON
app.use('/api/auth', authRoutes);
app.use('/api/books', booksRoutes);

const Book = require('./models/Book');

//Routes POST
//Routes Login
app.post('/api/auth/login', (req, res) => {});

//Routes Books
app.post('/api/books', (req, res) => {
  const book = new Book({
    ...req.body,
  });
  book
    .save()
    .then(() => res.status(201).json({message: 'Livre ajoué !'}))
    .catch((error) => res.status(400).json({error}));
});

//Routes book Rating
app.post('/api/books/:id/rating', (req, res) => {
  res.send('Route Rating');
});

//Routes GET
//Routes Books
app.get('/api/books', (req, res) => {
  Book.find()
    .then((books) => res.status(200).json(books))
    .catch((error) => res.status(400).json({error}));
});

//Routes book
app.get('/api/books/:id', (req, res) => {
  Book.findOne({_id: req.params.id})
    .then((book) => res.status(200).json(book))
    .catch((error) => res.status(404).json({error}));
});

//Routes Best Rated Books
app.get('/api/books/bestrating', (req, res) => {
  res.send('Route bestRated');
});

// Route PUT
app.put('/api/books/:id', (req, res) => {
  Book.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id})
    .then(() => res.status(200).json({message: 'Livre modifié'}))
    .catch((error) => res.status(400).json({error}));
});

// Route DELETE
app.delete('/api/books/:id', (req, res) => {
  Book.deleteOne({_id: req.params.id})
    .then(() => res.status(200).json({message: 'Livre supprimé'}))
    .catch((error) => res.status(400).json({error}));
});

module.exports = app;
