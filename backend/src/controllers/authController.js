const bcrypt = require('bcryptjs')
const User = require('../models/User')
const generateToken = require('../utils/generateToken');
const sendToken = require('../utils/sendToken');

const registerUser = async (req, res) => {
    try{

        const { name, email, password } = req.body;
        
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }
        
        const existingUser = await User.findOne({email,});
        
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }
        
        const salt = await bcrypt.genSalt(10);
        
        const hashedPassword = await bcrypt.hash(password,salt);
        
        const user = await User.create({
            name,
            email,
            password: hashedPassword,});
        
        const token = generateToken(
            user._id);

        sendToken(res,token)

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        
        })
            
    }catch(error){
        res.status(500).json({
            message: "Server Error"
        })
    }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and Password are required",
      });
    }

    const existingUser = await User.findOne({
      email,
    });

    if (!existingUser) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        existingUser.password
      );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }

    const token = generateToken(
      existingUser._id
    );

    sendToken(res,token)

    res.status(200).json({
      _id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
      role: existingUser.role,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Get Current User
const getMe = async (req, res) => {
  res.status(200).json(req.user);
};

// Logout User
const logoutUser = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    message: "Logged out successfully",
  });
};

module.exports = { registerUser,loginUser,getMe,logoutUser }