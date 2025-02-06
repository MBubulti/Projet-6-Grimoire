const express = require('express');
const tokenCheck = require('../middleware/tokenCheck');
const multer = require('../middleware/multerConfig');
const router = express.Router();
const booksCtrl = require('../controllers/booksCtrl');

router.post(
  '/',
  tokenCheck,
  multer.upload.single('image'),
  multer.uploadImg,
  booksCtrl.createBook
);

//router.post('/:id/rating', tokenCheck, booksCtrl.postRating);

router.get('/', booksCtrl.getBooks);

router.get('/:id', booksCtrl.getOneBook);

//router.get('/bestrating', booksCtrl.bestRated);

router.put(
  '/:id',
  tokenCheck,
  multer.upload.single('image'),
  multer.uploadImg,
  booksCtrl.editBook
);

router.delete('/:id', tokenCheck, booksCtrl.deleteBook);

module.exports = router;
