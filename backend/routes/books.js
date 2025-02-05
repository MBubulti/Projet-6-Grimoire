const express = require('express');
const auth = require('../middleware/tokenCheck');
const router = express.Router();

const booksCtrl = require('../controllers/booksCtrl');
const bookCtrl = require('../controllers/bookCtrl');

router.post('/', auth, booksCtrl.createBook);

router.post('/:id/rating', auth, bookCtrl.postRating);

router.get('/', booksCtrl.getBooks);

router.get('/:id', bookCtrl.getBook);

router.get('/bestrating', booksCtrl.bestRated);

router.put('/:id', auth, bookCtrl.editBook);

router.delete('/:id', auth, bookCtrl.deleteBook);

module.exports = router;
