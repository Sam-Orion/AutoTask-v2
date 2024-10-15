const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
  dueDate: { type: Date, required: true },
  time: { type: String, required: true },
  outdoor: { type: Boolean, default: false },
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' }
});

module.exports = mongoose.model('Task', taskSchema);
