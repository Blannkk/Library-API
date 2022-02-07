const auth =  require('../middleware/auth');
const express = require('express');
const router = express.Router();
const admin = require('../middleware/admin');
const {
    getMe,
    createUser,
    upadteUser,
    deleteUser
} = require('../controllers/users');
router.use(express.json());


router.get('/me', auth ,getMe);

router.post('/' , createUser);

router.put('/:id', [auth , admin], upadteUser);

router.delete('/:id', [auth , admin] , deleteUser);

module.exports = router;

