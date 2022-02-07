const express = require('express');
const router = express.Router();
const {getAllRentals, createRental } = require('../controllers/rentals');
router.use(express.json());


router.get('/', getAllRentals);

router.post('/',createRental );


module.exports = router;