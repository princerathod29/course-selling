import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";
// signup endpoint
export const signup = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      userName: userName,
      email: email.toLowerCase(),
      password: hashedPassword,
    });
    await newUser.save();
    const token = jwt.sign({ userId:newUser._id },ENV.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        id: newUser._id,
        userName: newUser.userName,
        email: newUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
//login endpoint
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check fields
    if (!email || !password) {
      return res
        .status(401)
        .json({ message: "please provide all the details" });
    }
    // check user
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: "Error in email or password" });
    }
    // compare password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Error in email or password" });
    }
    // create token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    // response send
    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, email: user.email, userName: user.Name },
    });
  } catch (error) {
    console.log(`error from login backend, ${error}`);
    res.status(500).json({message: "Server error"});
  }
};
// logout endpoint 
export const logout = async (req, res) => {
  try{
    return res.cookie("token","").status(201).json({
      message:"User logged out"
    })
  }catch (error) {
    console.log(error)
  }
}
//Get user
export const getUser = async (req,res)=>{
  try{

    const user = await User.findById(req.user.userId);

    if(!user){
      return res.status(404).json({message:"User not found"});
    }

    res.status(200).json(user);

  }catch(err){
    res.status(500).json({message:"Server error"});
  }
}
