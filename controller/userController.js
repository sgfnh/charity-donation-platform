
const express = require("express");
const User = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

exports.userC = async (req, res, next) => {
  try {
    const { name, email, phone, password } = req.body;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(200).json({ message: "USER ALREADY EXISTS, PLEASE LOGIN" });
    } else {
      const saltRounds = 10
      bcrypt.hash(password, saltRounds, async function (err, hash) {
        await User.create({ name, email, phone, password: hash });
      })
      res.status(201).json({ message: "Signup Completed!!" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
function generateAccessToken(id, name) {
  return jwt.sign({ userId: id, name: name }, process.env.JWT_SECRET);
}
exports.loginC = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });


    if (!user) {
      return res.status(404).json({ message: "User Not Found!!" });
    }
    bcrypt.compare(password, user.password, function (err, result) {
      if (err) {
        res.status(400).json({ message: "ERROR IN BCRYPT COMPARE" });
      } else {
        if (result == true) {
          res.status(200).json({ message: "User Login successful!", token: generateAccessToken(user.id, user.name) });
          const token = generateAccessToken(user.id, user.name)
          console.log("ty", token)
        } else if (result == false) {
          return res.status(401).json({ message: "User Not Authorised!!" });
        }
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.profileC = async (req, res) => {
  const { email } = req.params;
  const user = await User.findOne({ where: { email }, attributes: { exclude: ['password'] } });
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
}
exports.profileG = async (req, res) => {
  const { email } = req.params;
  const { name, phone, passportNumber, dateOfBirth, panNumber } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(404).json({ error: 'User not found' });

  user.name = name;
  user.phone = phone;
  user.passportNumber = passportNumber;
  user.dateOfBirth = dateOfBirth;
  user.panNumber = panNumber;
  await user.save();

  res.json({ message: 'Profile updated successfully' });
}

