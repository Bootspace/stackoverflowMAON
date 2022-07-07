const express = require('express');
const Question = require('../models/Question');
const Reply = require('../models/Reply');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { generateJWT } = require('../config/validator');
const client = require('../config/redis_config');
exports.register = async (req, res) => {
  const { name, email } = req.body;
  let password = req.body.password;
  try {
    const userFound = await User.findOne({email});
    if(userFound) {
      return res.status(403).json('User already exist...')
    }
    // Hashing the password
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(password, salt);

    password = hashedPassword;
    let user = await new User({ email, name, password });

    const savedUser = await user.save();

        return res.status(200).json({ savedUser });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
      let user = await User.findOne({ email });
      if (!user) {
          res.status(404).json({ message: 'User not found!' });
      }

      let auth = await bcrypt.compare(password, user.password);
      if (!auth) {
          res.status(404).json({ message: 'User not found!' });
      }

      // Generating Tokens
      let token = await generateJWT(user);

      const data = {
          message: 'Login succesful',
          details: user,
          token: token
      };
      res.status(200).json(data);
  } catch (error) {
      return res.status(500).json(error.message);
  }
};

// exports.getUsers = async (req, res) => {
//   try {
//     const users = await User.find();
//     if(!users) {
//       return res.status(404).json('User not found');
//     }
//     return res.status(200).json(users);
//   } catch (error) {
//     return res.status(500).json(error.message);
//   }
// 

exports.getUsers = async (req, res) => {
  try {
    let users = await User.find();
    if(!users) {
      return res.status(404).json('No users')
    }
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

exports.getOne = async (req, res) => {
  let id = req.params.id;
  try {
    let user = await User.findById(id);
    if(!user) {
      return res.status(400).json('This user does not exist');
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message)
  }
}