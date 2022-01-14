const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    password: {
        type: String,
        required : true,
        minlength : 7,
        maxlength : 11
    }
});

userSchema.plugin(autoIncrement.plugin, 'User');
const User = mongoose.model('User', userSchema);


function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        password: Joi.string().min(7).max(11).required()
    });
    return schema.validate(user);
};

exports.validate = validateUser;
exports.userSchema = userSchema;
exports.User = User;
