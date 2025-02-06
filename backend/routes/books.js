const express = require('express');
const tokenCheck = require('../middleware/tokenCheck');
const router = express.Router();
const multer = require('../middleware/multerConfig');
const booksCtrl = require('../controllers/booksCtrl');

router.post('/', tokenCheck, multer, booksCtrl.createBook);

//router.post('/:id/rating', tokenCheck, multer, booksCtrl.postRating);

router.get('/', booksCtrl.getBooks);

router.get('/:id', booksCtrl.getOneBook);

//router.get('/bestrating', booksCtrl.bestRated);

router.put('/:id', tokenCheck, booksCtrl.editBook);

router.delete('/:id', tokenCheck, booksCtrl.deleteBook);

module.exports = router;
