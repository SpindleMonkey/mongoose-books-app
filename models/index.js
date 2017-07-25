// when the /models dir is required, the default file to look for is index

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/book-app");

module.exports.Book = require('./book.js');