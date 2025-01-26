import jwt from 'jsonwebtoken';
import User from '../models/User.js';  // Ensure you have a User model defined

// Login function
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Here you should normally hash the password and compare it
    // For simplicity, I'm assuming you're storing plain text passwords
    if (user.password !== password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send the response with the token
    res.json({
      success: true,
      message: 'Login successful',
      token,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export { login };
