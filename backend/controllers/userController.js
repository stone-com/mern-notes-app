const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// Register a new User
// POST /api/users
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  // Check if the user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User email already exists');
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create the user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({ _id: user.id, name: user.name, email: user.email });
  } else {
    res.status(400);
    throw new Error('Invalid User Data');
  }
});

// Authenticate a user
// POST /api/users/login
const loginUser = asyncHandler(async (req, res) => {
  res.json({ message: 'Login User' });
});

// Get user Data
// GET /api/users/me
const getMe = asyncHandler(async (req, res) => {
  res.json({ message: 'User data' });
});

module.exports = { registerUser, loginUser, getMe };