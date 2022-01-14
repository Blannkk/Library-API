const express = require('express');
const app = express();

const bookRoutes = require('./api/routes/books');
const userRoutes = require('./api/routes/users');
const authorRoutes = require('./api/routes/authors')

app.use('/authors',authorRoutes)
app.use('/books',bookRoutes);
app.use('/users', userRoutes);

module.exports = app;