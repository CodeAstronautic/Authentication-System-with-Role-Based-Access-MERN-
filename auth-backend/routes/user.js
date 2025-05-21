const express = require('express');
const { createUser, loginUser, userProfile, getAllUsers } = require('../controllers/userController');
const router = express.Router();

router.post('/', createUser);
router.post('/login', loginUser);
router.post('/profile',  userProfile);
router.get('/adminUsers', getAllUsers);

module.exports = router;
