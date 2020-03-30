const router = require("express").Router();
const { getSavedBooks, saveBook, removeBook} = require("../../controllers/book-controller");

// Matches GET & POST with "/api/books
router.route('/')
  .get(getSavedBooks)
  .post(saveBook)
 

// Matches DELETE with "/api/books/:id"
router.route('/:id')
  .delete(removeBook);

module.exports = router;
