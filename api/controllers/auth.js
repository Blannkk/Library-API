const Joi = require('joi')
const bcrypt = require('bcrypt');
const { User } = require('../models/user');



const registerUser = async(req, res, next) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).json(error.details[0].message);
        
    const user = await User.findOne({email: req.body.email});
    if(!user) { return res.status(400).json('Invalid email or password')};

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) { return res.status(400).json('Invalid email or password')};

  const token = user.genarateAuthToken();
   res.status(200).json({token});
}


function validate(req) {
    const schema = Joi.object({
        password: Joi.string().required(),
        email: Joi.string().min(6).email().required()
    });
    return schema.validate(req);
};

module.exports = registerUser;