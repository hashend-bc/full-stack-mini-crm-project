const router = require('express').Router()
const { body } = require('express-validator')
const { getNotes, getNote, createNote, updateNote, deleteNote } = require('../controllers/notesController')
const { protect } = require('../middleware/auth')

router.use(protect)

router.get('/', getNotes)
router.get('/:id', getNote)

router.post('/', [
  body('title').trim().notEmpty().withMessage('Title is required'),
], createNote)

router.put('/:id', updateNote)
router.delete('/:id', deleteNote)

module.exports = router
