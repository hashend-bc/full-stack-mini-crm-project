const { validationResult } = require('express-validator')
const Note = require('../models/Note')

const getNotes = async (req, res) => {
  const notes = await Note.find({ assignedTo: req.user._id })
    .populate('assignedTo', 'name email')
    .sort({ createdAt: -1 })
  res.json(notes)
}

const getNote = async (req, res) => {
  const note = await Note.findOne({ _id: req.params.id, assignedTo: req.user._id })
    .populate('assignedTo', 'name email')
  if (!note) return res.status(404).json({ message: 'Note not found' })
  res.json(note)
}

const createNote = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ message: errors.array()[0].msg })

  const { title, description, status, image, dueDate } = req.body
  const note = await Note.create({
    title, description, status, image, dueDate,
    assignedTo: req.user._id,
  })
  await note.populate('assignedTo', 'name email')
  res.status(201).json(note)
}

const updateNote = async (req, res) => {
  const note = await Note.findOne({ _id: req.params.id, assignedTo: req.user._id })
  if (!note) return res.status(404).json({ message: 'Note not found' })

  const { title, description, status, image, dueDate } = req.body
  if (title !== undefined) note.title = title
  if (description !== undefined) note.description = description
  if (status !== undefined) note.status = status
  if (image !== undefined) note.image = image
  if (dueDate !== undefined) note.dueDate = dueDate

  await note.save()
  await note.populate('assignedTo', 'name email')
  res.json(note)
}

const deleteNote = async (req, res) => {
  const note = await Note.findOneAndDelete({ _id: req.params.id, assignedTo: req.user._id })
  if (!note) return res.status(404).json({ message: 'Note not found' })
  res.json({ message: 'Note deleted' })
}

const getNotesStats = async (req, res) => {
  const userId = req.user._id

  // Total notes
  const totalNotes = await Note.countDocuments({ assignedTo: userId })

  // Notes by status
  const statusStats = await Note.aggregate([
    { $match: { assignedTo: userId } },
    { $group: { _id: '$status', count: { $sum: 1 } } }
  ])

  // Notes over time (last 30 days)
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  const timeStats = await Note.aggregate([
    { $match: { assignedTo: userId, createdAt: { $gte: thirtyDaysAgo } } },
    {
      $group: {
        _id: {
          $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
        },
        count: { $sum: 1 }
      }
    },
    { $sort: { '_id': 1 } }
  ])

  res.json({
    totalNotes,
    statusStats,
    timeStats
  })
}

module.exports = { getNotes, getNote, createNote, updateNote, deleteNote, getNotesStats }
