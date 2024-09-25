const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Import the Room model
const Room = require('../model/Room');  // Assuming the Room schema is in the models directory

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

// CREATE a new room
app.post('/rooms', async (req, res) => {
  try {
    const { name, roomID, role, type } = req.body;
    const newRoom = new Room({ name, roomID, role, type });
    await newRoom.save();
    res.status(201).json(newRoom);
  } catch (error) {
    res.status(400).json({ message: 'Error creating room', error });
  }
});

// READ: Get all rooms
app.get('/rooms', async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching rooms', error });
  }
});

// READ: Get a single room by roomID
app.get('/rooms/:roomID', async (req, res) => {
  try {
    const room = await Room.findOne({ roomID: req.params.roomID });
    if (!room) return res.status(404).json({ message: 'Room not found' });
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching room', error });
  }
});

// UPDATE: Update room details by roomID
app.put('/rooms/:roomID', async (req, res) => {
  try {
    const { name, role, type } = req.body;
    const updatedRoom = await Room.findOneAndUpdate(
      { roomID: req.params.roomID },
      { name, role, type },
      { new: true }
    );
    if (!updatedRoom) return res.status(404).json({ message: 'Room not found' });
    res.status(200).json(updatedRoom);
  } catch (error) {
    res.status(400).json({ message: 'Error updating room', error });
  }
});

// DELETE: Delete a room by roomID
app.delete('/rooms/:roomID', async (req, res) => {
  try {
    const deletedRoom = await Room.findOneAndDelete({ roomID: req.params.roomID });
    if (!deletedRoom) return res.status(404).json({ message: 'Room not found' });
    res.status(200).json({ message: 'Room deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting room', error });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
