const auth =  require('../middleware/auth');
const admin = require('../middleware/admin');
const express = require('express');
const router = express.Router();
const {
    getAllBooks,
    createBook,
    getBookById,
    updateBook,
    deleteBook } = require('../controllers/books');
router.use(express.json());


router.get('/', auth,getAllBooks );

router.post('/', auth ,createBook );

router.get('/:bookId', auth , getBookById);

router.put('/:bookId', [auth , admin] ,updateBook);

router.delete('/:id', [auth , admin] ,deleteBook);

module.exports = router;