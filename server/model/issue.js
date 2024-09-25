const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const issueSchema = new Schema({
  role: {
    type: String,
    enum: ['user', 'admin', 'guest'],  // Define roles such as user, admin, guest, etc.
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  roomID: {
    type: String,
    required: true,
    unique: true,  // Ensure each roomID is unique for tracking purposes
    trim: true
  },
  issue: {
    type: String,
    required: true,
    trim: true  // The actual issue or problem being reported
  }
}, {
  timestamps: true  // Automatically adds createdAt and updatedAt fields
});

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;
