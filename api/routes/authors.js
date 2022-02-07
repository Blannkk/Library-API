const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const admin = require('../middleware/admin');
const {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor
} = require('../controllers/authors')
router.use(express.json());

router.get('/',auth, getAllAuthors);


router.get('/:id', auth ,getAuthorById);

router.post('/', auth ,createAuthor);

router.put('/:authorId', [auth , admin] ,updateAuthor);

router.delete('/:id', [auth , admin] ,deleteAuthor);

module.exports = router;