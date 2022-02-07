const express = require('express');
const router = express.Router();
router.use(express.json());
const registerUser = require('../controllers/auth')


router.post('/',registerUser );





module.exports = router;

