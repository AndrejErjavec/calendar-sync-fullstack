const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const errorHandler = require('../middleware/errorMiddleware');

const register = async (req, res) => {
  const {email, password} = req.body;
  if (!email || !password) {
    return errorHandler({req, res, status: 400, err: "Please fill all fields"});
  }

  const existingUser = await User.findOne({email});
  if (existingUser) {
    return errorHandler({req, res, status: 400, err: "User already exists"});
  }

  const salt = await bcrypt.genSalt(10);
  const hpassword = await bcrypt.hash(password, salt);
  // EQUALS TO: const user = await new User({email, password: hpassword}).save();
  const user = await User.create({
    email, 
    password: hpassword
  });

  if (user) {
    res.status(200).json({
      _id: user._id,
      email: user.email,
      token: generateToken(user._id)
    });
  }
  else {
    return errorHandler({req, res, status: 400, err: "Registration error"});
  }
};



const login = async (req, res) => {
  const {email, password} = req.body;
  if (!email || !password) {
    return errorHandler({req, res, status: 400, err: "Please fill all fields"});
  }

  const user = await User.findOne({email});
  if (!user) {
    return errorHandler({req, res, status: 400, err: "User not found"});
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return errorHandler({req, res, status: 400, err: "Incorrect password"});
  }
  
  res.status(200).json({
    _id: user._id,
    email: user.email,
    token: generateToken(user._id)
  });
};

const getMe = async (req, res) => {
  res.status(200).json(req.user);
}

const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET);
}


module.exports = {
  register,
  login,
  getMe
}