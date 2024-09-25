const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Import the Issue model
const Issue = require('../model/issue');

// Initialize Express
const app = express();
app.use(bodyParser.json());  // Parse JSON request bodies

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// CRUD Operations for Issues

// CREATE: Add a new issue
app.post('/issues', async (req, res) => {
  const { role, name, roomID, issue } = req.body;

  // Validate request body
  if (!role || !name || !roomID || !issue) {
    return res.status(400).json({ message: 'All fields (role, name, roomID, issue) are required' });
  }

  try {
    const newIssue = new Issue({
      role,
      name,
      roomID,
      issue
    });
    await newIssue.save();
    res.status(201).json({ message: 'Issue created successfully', issue: newIssue });
  } catch (error) {
    res.status(500).json({ message: 'Error creating issue', error });
  }
});

// READ: Get all issues
app.get('/issues', async (req, res) => {
  try {
    const issues = await Issue.find();
    res.status(200).json(issues);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching issues', error });
  }
});

// READ: Get a specific issue by roomID
app.get('/issues/:roomID', async (req, res) => {
  try {
    const issue = await Issue.findOne({ roomID: req.params.roomID });
    if (!issue) return res.status(404).json({ message: 'Issue not found' });
    res.status(200).json(issue);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching issue', error });
  }
});

// UPDATE: Update a specific issue by roomID
app.put('/issues/:roomID', async (req, res) => {
  const { role, name, issue } = req.body;

  // Validate request body
  if (!role || !name || !issue) {
    return res.status(400).json({ message: 'All fields (role, name, issue) are required to update' });
  }

  try {
    const updatedIssue = await Issue.findOneAndUpdate(
      { roomID: req.params.roomID },
      { role, name, issue },
      { new: true }
    );

    if (!updatedIssue) return res.status(404).json({ message: 'Issue not found' });

    res.status(200).json({ message: 'Issue updated successfully', issue: updatedIssue });
  } catch (error) {
    res.status(500).json({ message: 'Error updating issue', error });
  }
});

// DELETE: Delete a specific issue by roomID
app.delete('/issues/:roomID', async (req, res) => {
  try {
    const deletedIssue = await Issue.findOneAndDelete({ roomID: req.params.roomID });

    if (!deletedIssue) return res.status(404).json({ message: 'Issue not found' });

    res.status(200).json({ message: 'Issue deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting issue', error });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
