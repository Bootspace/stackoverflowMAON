const express = require('express');
const router = express.Router();
const { isAuthUser } = require('../Middlewares/isAuth');
const questioncontroller = require('../controllers/questionController');

router.post('/ask', isAuthUser, questioncontroller.askQuestion);
router.get('/getall', questioncontroller.getQuestion);
router.get('/getone', isAuthUser, questioncontroller.userQuestion);
router.delete('/deletequestion/:id', isAuthUser, questioncontroller.deleteQuestion);
router.put('/edit/:id', isAuthUser, questioncontroller.edit_question);

module.exports = router;