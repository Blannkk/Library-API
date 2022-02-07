const { Author, validate } = require('../models/author');


const getAllAuthors = async(req, res, next) => {

    const authors = Author.find().exec()
  
    return res.status(200).json(authors)
      
}

const getAuthorById = async(req, res, next) => {

    const author = Author.findById(req.params.id).exec()
      if(!author) {
        return res.status(404).json({ 
           message: 'Author not found'
        });
      }
    res.status(200).json(author);
}

const createAuthor = async(req, res, next) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).json(error.details[0].message);
          
    const author = await Author.create({ 
      name: req.body.name
    });
       
    await author.save();
    res.status(200).json(author);
}

const updateAuthor = async(req, res, next) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
  
   const author = await Author.findByIdAndUpdate(req.params.id, 
    { name: req.body.name,},
    { new: true });
  
    if(!author) return res.status(404).json({ message: 'Author not found.'});
    
    res.status(200).json(author);
}

const deleteAuthor = async(req, res, next) => {
    const author = await Author.findByIdAndDelete(req.params.id);
  
    if(!author) return res.status(404).json({ message: 'Author not found.'});
  
    res.status(200).json(author);
  
}

module.exports = {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor
}