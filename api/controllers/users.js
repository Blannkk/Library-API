
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validate } = require('../models/user');

const getMe = async(req, res, next) => {
    const user = await User.findOne({id: req.user.id}).select(['-password', '-__v', '-_id']);
    res.status(200).json({user});
};

const createUser = async(req, res, next) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).json(error.details[0].message);
        
    const validUser = await User.findOne({email: req.body.email});
    if( validUser) { return res.status(400).json('User already exist..')};

   let user = await User.create({ 
       name: req.body.name,
       password: req.body.password,
       email: req.body.email
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();
    
    const token = user.genarateAuthToken();
   res.header('x-auth-token', token).status(200).json(_.pick(user,['id', 'name', 'email']));
};

const upadteUser =  async(req, res, next) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

   const user = await User.findByIdAndUpdate(req.params.id, {
       name: req.body.name,
       password: req.body.phone
    },
    { new: true });

    if(!user) return res.status(404).json({message :'User not found.'});
    
    res.status(200).json(user);
};
const deleteUser = async(req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id);

    if(!user) return res.status(404).json({message :'User not found.'});

    res.status(200).json(user);

};

module.exports = {
    getMe,
    createUser,
    upadteUser,
    deleteUser
}