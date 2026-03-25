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

module.exports = { getNotes, getNote, createNote, updateNote, deleteNote }
