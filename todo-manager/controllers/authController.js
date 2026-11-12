import { User } from "../models/User.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const normalizedEmail = email.toLowerCase(); // <-- Normalize

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ success: false, error: 'Email already in use' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      email: normalizedEmail, // <-- Save normalized
      password: hashedPassword
    });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: { id: newUser._id, username: newUser.username, email: newUser.email }
    });
  } catch (err) {
    next(err);
  }
};
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = email ? email.toLowerCase() : '';

    const user = await User.findOne({ email: normalizedEmail });
    console.log("🔍 FOUND USER IN DB:", user); // Check if user is null or found

    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid email or password' });
    }

    console.log("🔑 PASSWORD SUBMITTED:", password);
    console.log("🔒 STORED HASH:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("✅ DOES PASSWORD MATCH?:", isMatch); // Check if bcrypt returns true or false

    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      token
    });
  } catch (err) {
    next(err);
  }
};
