const express = require('express');
const router = express.Router();
const { User, validate } = require('../modules/user');
router.use(express.json());


router.get('/', async(req, res, next) => {
    const users = await User.find();
    res.status(200).json(users);
});

router.post('/', async(req, res, next) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).json(error.details[0].message);
        

   let user = new User({ 
       name: req.body.name,
       password: req.body.password
     });
     
   user = await user.save();
   res.status(200).json(user);
});

router.get('/:id', async(req, res, next) => {
    const user = await User.findById(req.params.id);

    if(!user) return res.status(404).json({message :'User not found.'});

    res.status(200).json(user);
});

router.put('/:id', async(req, res, next) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

   const user = await User.findByIdAndUpdate(req.params.id, {
       name: req.body.name,
       password: req.body.phone
    },
    { new: true });

    if(!user) return res.status(404).json({message :'User not found.'});
    
    res.status(200).json(user);
});

router.delete('/:id', async(req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id);

    if(!user) return res.status(404).json({message :'User not found.'});

    res.status(200).json(user);

});
module.exports = router;

