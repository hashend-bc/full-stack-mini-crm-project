const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    status: { type: String, default: 'Weekly' },
    image: { type: String, default: '' },
    dueDate: { type: Date },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Note', noteSchema)
