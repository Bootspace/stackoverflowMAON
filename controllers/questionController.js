require('dotenv').config();
const express = require('express');
const User = require('../models/User');
const Question = require('../models/Question');


exports.askQuestion = async (req, res) => {
  let user = await User.findById(req.user);

  const { title, body, tags } = req.body;
  try {
    const question = new Question({ user, title, body, tags });
    const newQuestion = await  question.save();
    await user.question.push(newQuestion._id);
    console.log('User question: ' + user.question);
    await user.save();
    res.status(200).json(newQuestion);

  } catch (error) {
    return res.status(500).send(error.message);
  }
}

exports.getQuestion = async (req, res) => { 
  try {
    const questions = await Question.find();
    if(!questions) {
      return res.status(404).json('Nothing here to show!');
    }
    return res.status(200).json(questions);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

exports.userQuestion = async (req, res) => {
  let user = await User.findById(req.user);
  try {
    if(!user){
      return res.status(404).json('No user found..')
    }
    let questions = await user.question;
    if(!questions) {
      return res.status(404).json('No questions for this user');
    }
    
    return res.status(200).json(questions);
    console.log('question from controller: ', questions)
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.deleteQuestion = async (req, res) => {
  let user = await User.findById(req.user);
  let id = req.params.id;
  try {
    if(!id) {
      return res.status(400).json('File does not exist..')
    }
    const deletedQuestion = await Question.findByIdAndDelete(id);
    return res.status(200).json('File deleted');
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

exports.edit_question = async (req, res) => {
  let id = req.params.id;
  const{ title, body, tags } = req.body;
  try {
    let question = await Question.findByIdAndUpdate(id,
      {
      title, body, tags
    },
    {
      new: true,
      runValidators: true
    }
    );

    if(!question){
      return res.status(400).json('Update failed');
    }
    return res.status(200).json(question);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

// const myQuestion = async (myQuestions) => {
//   console.log('myquestions: ', myQuestions);
//   // const questions = await Question.find({ _id : { $in: myQuestion } });
//   myQuestions.map( async(question) => {
//     await Question.findById(question).populate();
//     console.log('Question: ', question)
//     return {
//       id: question._id,
//       title: question.title,
//       body: question.body,
//       tags: question.tag
//     }
//   })
// }



// Question.createMapping(function(err, mapping) {
//   if(err) console.log('first error: ', err);
//   console.log(` Mapping created: ${mapping},`)
// });