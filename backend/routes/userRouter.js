import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js'; // Import the User model

const router = express.Router();

// Handle user signup
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  // Check if email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email already in use" });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save the new user to the database
  const newUser = new User({
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error saving user", error });
  }
});

export default router;