const express = require('express');
const router = express.Router();
const { Author, validate } = require('../modules/author');
router.use(express.json());

router.get('/', async(req, res, next) => {
   Author.find()
   .exec()
   .then(
     author =>{
      if(!author) {return res.status(404).json({ message: 'Author not found'});
     }
  
     res.status(200).json(author)
    })
    .catch(err => {
      res.status(500).json({ error : err});
    });
});


router.get('/:id', async(req, res, next) => {

  Author.findById(req.params.id)
  .exec()
  .then( author => {
    if(!author) {
      return res.status(404).json({ 
         message: 'Author not found'
      });
    }
  res.status(200).json(author);
  })
  .catch(err => {
    console.log(err);
     res.status(500).json({error: err.message});
  });
});

router.post('/', async(req, res, next) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).json(error.details[0].message);
        
   let author = new Author({ 
       name: req.body.name
     });
     
   author = await author.save();
   res.status(200).json(author);
});

router.put('/:authorId', async(req, res, next) => {
  const {error} = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);

 const author = await Author.findByIdAndUpdate(req.params.id, 
  { name: req.body.name,},
  { new: true });

  if(!author) return res.status(404).json({ message: 'Author not found.'});
  
  res.status(200).json(author);
});

router.delete('/:id', async(req, res, next) => {
  const author = await Author.findByIdAndDelete(req.params.id);

  if(!author) return res.status(404).json({ message: 'Author not found.'});

  res.status(200).json(author);

});

module.exports = router;