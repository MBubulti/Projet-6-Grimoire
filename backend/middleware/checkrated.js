const Book = require('../models/Book');

const checkRated = async (req, res, next) => {
  const bookId = req.params.id;
  const userId = req.auth.userId;

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({message: 'Book not found'});
    }
    const isRated = book.ratings.find(
      (rating) => rating.userId.toString() === userId.toString()
    );
    if (isRated) {
      return res.status(400).json({
        message: `Vous avez déjà donné la note de ${isRated.grade} à "${book.title}"`,
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({error});
  }
};

module.exports = checkRated;
