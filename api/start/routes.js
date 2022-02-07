
const express = require('express')
const error = require('../middleware/error');
const books = require('../routes/books');
const users = require('../routes/users');
const authors = require('../routes/authors');
const rentals = require('../routes/rentals');
const auth = require('../routes/auth');

module.exports = function(app){

app.use(express.json());

app.use('/authors',authors)
app.use('/books',books);
app.use('/users', users);
app.use('/rentals', rentals);
app.use('/auth', auth);
app.use(error);

}