const Joi = require('joi');
const mongoose = require('mongoose');
Schema = mongoose.Schema,
autoIncrement = require('mongoose-auto-increment');

const connection = mongoose.createConnection(process.env.MONGO_URI);

autoIncrement.initialize(connection);


const authorModelName = 'author'
const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
});

authorSchema.plugin(autoIncrement.plugin,  {model: 'Author', field: 'id',startAt: 1, incremrntBy: 1});
const Author = mongoose.model(authorModelName, authorSchema);


function validateAuthor(author) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required()
        });
    return schema.validate(author);
};

exports.validate = validateAuthor;
exports.authorSchema = authorSchema;
exports.Author = Author;
exports.authorModelName = authorModelName
