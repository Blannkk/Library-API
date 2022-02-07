
const { Book, validate } = require('../models/book');
const { Author } = require('../models/author');

const getAllBooks = async (req, res, next) => {
  
  
    // const books = await Book.aggregate([
    //     { $match: {} },
    //     {
    //         $lookup: {
    //             from: 'authors',
    //             foreignField: '_id',
    //             localField: 'author',
    //             as: 'author'
    //         }
    //     },
    //     {
    //         $unwind: {
    //             path : "$author"
    //         }
    //     },
    //     {
    //         $project:{
    //            'author._id':0, 
    //            'author.__v':0, 
    //         }
    //     }
    // ])
   const books = await Book.find({})
        .select(" author name puplishedDate price category _id")
        .populate({ path : 'author',select : 'name -_id', model : Author})
        .exec()
    //     .then(docs => {
    res.status(200).json(books);
    //     })
    //     .catch(err => {
    //         res.status(500).json({
    //             error: err.message
    //         });
    //     });
};

const createBook = async (req, res, next) => {

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);


    const author = await Author.findOne({ author: req.body.authorId });
    console.log("🚀 ~ file: books.js ~ line 37 ~ router.post ~ author", author)
    if (!author) return res.status(400).json('Invalid author.');

    const book = await Book.create({

        title: req.body.title,
        price: req.body.price,
        category: req.body.category,
        author: req.body.author
    })

    //    let book = new Book({ 
    //        title: req.body.title,
    //        price: req.body.price,
    //        category: req.body.category,
    //        author :req.body.authorId
    //     });

    res.status(200).json(book);
};

const getBookById = async (req, res, next) => {

    const id = req.params.bookId;

    Book.findById(id)
        .exec()
        .then(book => {

            if (!book) {
                res.status(404).json({
                    message: " Book not found."
                });
            }
            res.status(200).json(book);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};

const updateBook =  async (req, res, next) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const book = await Book.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category
    },
        { new: true });

    if (!book) return res.status(404).json({ message: 'Book not found.' });

    res.status(200).json(book);
};
const deleteBook = async (req, res, next) => {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) return res.status(404).json({ message: 'Book not found.' });

    res.status(200).json(book);

};

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
}
