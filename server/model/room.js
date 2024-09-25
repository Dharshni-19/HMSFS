const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  roomID: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  role: {
    type: String,
    enum: ['host', 'guest', 'admin'],  // Example roles within a room
    required: true
  },
  type: {
    type: String,
    enum: ['conference', 'meeting', 'private', 'public'],  // Example room types
    required: true
  }
}, {
  timestamps: true  // Adds createdAt and updatedAt timestamps
});

// Export the Room model
const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
