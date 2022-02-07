
const { Rental, validate } = require('../models/rental');
const { Book } = require('../models/book');
const { User } = require('../models/user');

const getAllRentals = async (req, res, next) => {
    const rentals = await Rental.find().sort('-dateOut');
    res.status(200).json(rentals);
};

const createRental = async (req, res, next) => {

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);


    const user = await User.findOne({ author: req.body.userId });
    if (!user) return res.status(400).json('Invalid user.');

    const book = await Book.findOne({ author: req.body.bookId });
    if (!book) return res.status(400).json('Invalid book.');

    const rental = await Rental.create({

        renatlFee: req.body.renatlFee,
        author: req.body.author,
        book : req.body.book
    });
        await rental.save();

    res.status(200).json(rental);
};

module.exports = { getAllRentals, createRental }