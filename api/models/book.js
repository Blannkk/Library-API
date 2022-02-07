require('dotenv').config()
const Joi = require('joi');
const mongoose = require('mongoose');
const { Author} = require('./author')
const { authorModelName } = require('./author');
   Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

const connection = mongoose.createConnection(process.env.MONGO_URI);

autoIncrement.initialize(connection);

const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    puplishedDate: {
        type: Date,
        default: Date.now 
    },
    price: {
        type: Number,
        required: true,
        min: 10,
        max: 200
    },
    category:{
        type: String,
        required: true,
        minlength: 3,
        maxlength:15,
    },
    author:{
        type : Number,
        ref: 'author'
    }
});

bookSchema.plugin(autoIncrement.plugin,  {model: 'Book', field: 'id',startAt: 1, incremrntBy: 1});
const Book = connection.model('Book', bookSchema);


function validateBook(book) {
    const schema = Joi.object({
        title: Joi.string().min(5).max(50).required(),
        data: Joi.date(),
        price: Joi.number().min(10).max(200).required(),
        category: Joi.string().min(3).max(15).required(),
        author: Joi.number().min(0).max(100).required()
    });
    return schema.validate(book);
};



exports.validate = validateBook;
exports.Book = Book;
