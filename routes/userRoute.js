const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.post('/register', UserController.register);

router.post('/login', UserController.login);

router.get('/getUser/:id', UserController.getOne);
router.get('/getUsers', UserController.getUsers);

module.exports = router;