// server.js
// SERVER-SIDE JAVASCRIPT


/////////////////////////////
//  SETUP and CONFIGURATION
/////////////////////////////

//require express in our app
var express = require('express'),
  bodyParser = require('body-parser');

// generate a new express app and call it 'app'
var app = express();

// serve static files in public
app.use(express.static('public'));

// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));

// pull in our db models
var db = require('./models');


////////////////////
//  ROUTES
///////////////////


// define a root route: localhost:3000/
app.get('/', function (req, res) {
  res.sendFile('views/index.html' , { root : __dirname});
});

// get all books
app.get('/api/books', function (req, res) {
  // get all books from DB and then send all books as JSON response
  db.Book.find(function(err, books) {
    if (err) { return console.log("index error: " + err); }
    res.json(books);
  });
});

// get one book
app.get('/api/books/:id', function (req, res) {
  // find one book by its id
  console.log('books show', req.params);
  db.Book.findById(req.params.id, function(err, book) {
    if (err) { return console.log("show error: " + err); }
    console.log('book ', book);
    res.json(book);
  });
});

// create new book
app.post('/api/books', function (req, res) {
  // create new book with form data (`req.body`)
  db.Book.create(req.body, function(err, book) {
    if (err) { return console.log('crete error: ' + err); }
    console.log('new book ' , book);
    res.json(book);
  });
});

// update book
// app.put('/api/books/:id', controllers.books.update);

// delete book
app.delete('/api/books/:id', function (req, res) {
  // get book id from url params (`req.params`)
  console.log('books delete', req.params);
  // var bookId = req.params.id;
  // db.Book.remove(bookId, function(err, book) {
  //   if (err) { return console.log('delete error: ' + err); }
  //   console.log('deleted book ', book);
  //   res.json(book);
  // });
  // find the index of the book we want to remove
  // var deleteBookIndex = books.findIndex(function(element, index) {
  //   return (element._id === parseInt(req.params.id)); //params are strings
  // });
  // console.log('deleting book with index', deleteBookIndex);
  // var bookToDelete = books[deleteBookIndex];
  // books.splice(deleteBookIndex, 1);
  // res.json(bookToDelete);
});





app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening at http://localhost:3000/');
});
