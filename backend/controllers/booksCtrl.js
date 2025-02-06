const Book = require('../models/Book');
const fs = require('fs');
const path = require('path');

//Post Create Book
exports.createBook = (req, res) => {
  const bookObject = JSON.parse(req.body.book);
  delete bookObject._id;
  delete bookObject._userId;

  const book = new Book({
    ...bookObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get('host')}${req.file.path}`,
  });

  book
    .save()
    .then(() => res.status(201).json({message: 'Nouveau livre ajouté'}))
    .catch((error) => res.status(400).json({error}));
};

//Get Books
exports.getBooks = (req, res, next) => {
  Book.find()
    .then((books) => res.status(200).json(books))
    .catch((error) => res.status(400).json({error}));
};

//Get Book
exports.getOneBook = (req, res, next) => {
  Book.findOne({_id: req.params.id})
    .then((book) => res.status(200).json(book))
    .catch((error) => res.status(400).json({error}));
};

//Get Best Rated exports.bestRated = (req, res, next);

//Post Rating
exports.postRating = async (req, res, next) => {
  const userId = req.auth.userId;
  const grade = req.body.rating;
  if (grade < 0 || grade > 5) {
    return res.status(400).json({message: 'La note doit être entre 0 & 5'});
  }
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({message: 'Book not found'});
    }

    book.ratings.push({userId, grade});

    const totalGrade = book.ratings.reduce(
      (sum, rating) => sum + rating.grade,
      0
    );
    const averageGrade =
      book.ratings.length > 0 ? totalGrade / book.ratings.length : 0;
    book.averageRating = averageGrade;
    await book.save();
    return res.status(200).json(book);
  } catch (error) {
    return res.status(500).json({error});
  }
};

//Put Edit Book
exports.editBook = (req, res, next) => {
  const bookObject = req.file
    ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${
          req.file.filename
        }`,
      }
    : {...req.body};

  delete bookObject._userId;
  Book.findOne({_id: req.params.id})
    .then((book) => {
      if (book.userId != req.auth.userId) {
        res.status(401).json({message: 'Requête non-autorisée'});
      }
      if (req.file) {
        const oldFileName = book.imageUrl.split('/images/')[1];
        const oldFilePath = path.join(__dirname, '../images', oldFileName);

        fs.unlink(oldFilePath, (err) => {
          if (err) {
            return res.status(500).json({
              error: "Erreur lors de la suppression de l'ancienne image.",
            });
          }
        });
      }
      Book.updateOne({_id: req.params.id}, {...bookObject, _id: req.params.id})
        .then(() => res.status(200).json({message: 'Mise à jour du livre'}))
        .catch((error) => res.status(400).json({error}));
    })
    .catch((error) => res.status(400).json({error}));
};

//Delete Book
exports.deleteBook = (req, res, next) => {
  Book.findOne({_id: req.params.id})
    .then((book) => {
      if (book.userId != req.auth.userId) {
        res.status(401).json({message: 'Requête non-autorisée'});
      } else {
        const filename = book.imageUrl.split('/images/')[1];
        const filePath = path.join(__dirname, '../images', filename);
        fs.unlink(filePath, () => {
          Book.deleteOne({_id: req.params.id})
            .then(() => res.status(200).json({message: 'Livre supprimé'}))
            .catch((error) => res.status(400).json({error}));
        });
      }
    })
    .catch((error) => res.status(500).json({error}));
};
