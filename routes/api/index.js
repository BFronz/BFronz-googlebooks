const router = require("express").Router();
const bookRoutes = require("./book-routes");

// Book routes
router.use("/books", bookRoutes);

module.exports = router;
