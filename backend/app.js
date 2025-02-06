const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();
const app = express();
const authRoutes = require('./routes/auth');
const booksRoutes = require('./routes/books');
const uri = process.env.URI;
const cors = require('./middleware/cors');

mongoose
  .connect(uri)
  .then(() => console.log('Connexion MongoDB réussie !'))
  .catch((err) => console.error('Erreur MongoDB:', err));

app.use(cors);
app.use(express.json()); // Pour traiter le JSON
app.use('/api/auth', authRoutes);
app.use('/api/books', booksRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;
