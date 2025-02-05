const express = require('express');
const router = express.Router();

const booksCtrl = require('../controllers/booksCtrl');
const bookCtrl = require('../controllers/bookCtrl');

router.post('/', booksCtrl.createBook);

router.post('/:id/rating', bookCtrl.postRating);

router.get('/', booksCtrl.getBooks);

router.get('/:id', bookCtrl.getBook);

router.get('/bestrating', booksCtrl.bestRated);

router.put('/:id', bookCtrl.editBook);

router.delete('/:id', bookCtrl.deleteBook);

module.exports = router;
