const express = require('express');
const router = express.Router();
const tokenCheck = require('../middleware/tokenCheck');
const multer = require('../middleware/multerConfig');
const checkRated = require('../middleware/checkrated');
const booksCtrl = require('../controllers/booksCtrl');

router.post(
  '/',
  tokenCheck,
  multer.upload.single('image'),
  multer.uploadImg,
  booksCtrl.createBook
);

router.post('/:id/rating', tokenCheck, checkRated, booksCtrl.postRating);

router.get('/', booksCtrl.getBooks);

router.get('/bestrating', booksCtrl.bestRated);

router.get('/:id', booksCtrl.getOneBook);

router.put(
  '/:id',
  tokenCheck,
  multer.upload.single('image'),
  multer.uploadImg,
  booksCtrl.editBook
);

router.delete('/:id', tokenCheck, booksCtrl.deleteBook);

module.exports = router;
