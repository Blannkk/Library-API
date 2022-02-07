require('dotenv/config')
const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        email: true,
        unique: true
    },
    password: {
        type: String,
        required : true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

userSchema.methods.genarateAuthToken = function(){

    const token = jwt.sign({ id: this.id, isAdmin: this.isAdmin }, process.env.JWT_KEY);
    return token;
}

userSchema.plugin(autoIncrement.plugin,  {model: 'User', field: 'id',startAt: 1, incremrntBy: 1});
const User = mongoose.model('User', userSchema);


function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        password: Joi.string().required(),
        email: Joi.string().min(6).email().required(),
        isAdmin: Joi.boolean()
    });
    return schema.validate(user);
};

exports.validate = validateUser;
exports.userSchema = userSchema;
exports.User = User;