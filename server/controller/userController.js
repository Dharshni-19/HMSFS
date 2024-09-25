const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Import the User model
const User = require('../model/user');  // Assuming the User schema is in the models directory

// Initialize Express
const app = express();
app.use(bodyParser.json());  // To parse JSON request bodies

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// CREATE a new user
app.post('/users', async (req, res) => {
  try {
    const { name, userID, password, role } = req.body;
    const newUser = new User({ name, userID, password, role });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: 'Error creating user', error });
  }
});

// READ: Get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
});

// READ: Get a single user by userID
app.get('/users/:userID', async (req, res) => {
  try {
    const user = await User.findOne({ userID: req.params.userID });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
});

// UPDATE: Update user details by userID
app.put('/users/:userID', async (req, res) => {
  try {
    const { name, password, role } = req.body;
    const updatedUser = await User.findOneAndUpdate(
      { userID: req.params.userID },
      { name, password, role },
      { new: true }
    );
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: 'Error updating user', error });
  }
});

// DELETE: Delete a user by userID
app.delete('/users/:userID', async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete({ userID: req.params.userID });
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
