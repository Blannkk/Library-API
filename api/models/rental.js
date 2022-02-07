require('dotenv').config()
const { date } = require('joi');
const Joi = require('joi');
const mongoose = require('mongoose');
   Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

const connection = mongoose.createConnection(process.env.MONGO_URI);

autoIncrement.initialize(connection);

const rentalSchema = new Schema({
    user:{
        type : Number,
        ref: 'user'
    },
    book: {
        type: Number,
        ref: 'book'
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Date
    },
    renatlFee: {
        type: Number,
        min: 0
    }
});

rentalSchema.plugin(autoIncrement.plugin, {model: 'Rental', field: 'id',startAt: 1, incremrntBy: 1});
const Book = connection.model('Rental', rentalSchema);


function validateBook(rental) {
    const schema = Joi.object({
        user: Joi.number().min(0).max(200),
        book: Joi.number().min(0).max(200)
    });
    return schema.validate(rental);
};



exports.validate = validateBook;
exports.Book = Book;
