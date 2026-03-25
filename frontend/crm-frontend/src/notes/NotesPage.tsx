import { useEffect, useState } from 'react'
import { SlidersHorizontal, Filter, Plus, FileText } from 'lucide-react'
import AppLayout from '@/shared/layout/AppLayout'
import Button from '@/shared/ui/Button'
import Modal from '@/shared/ui/Modal'
import NoteCard from './NoteCard'
import NoteForm from './NoteForm'
import { notesApi, Note, NotePayload } from './notesApi'

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [addOpen, setAddOpen] = useState(false)
  const [editNote, setEditNote] = useState<Note | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleteLoading, setDeleteLoading] = useState(false)

  const fetchNotes = async () => {
    try {
      const data = await notesApi.getAll()
      setNotes(data)
    } catch {
      setError('Failed to load notes')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchNotes() }, [])

  const handleCreate = async (data: NotePayload) => {
    const note = await notesApi.create(data)
    setNotes((prev) => [note, ...prev])
    setAddOpen(false)
  }

  const handleUpdate = async (data: NotePayload) => {
    if (!editNote) return
    const updated = await notesApi.update(editNote._id, data)
    setNotes((prev) => prev.map((n) => (n._id === updated._id ? updated : n)))
    setEditNote(null)
  }

  const handleDelete = async () => {
    if (!deleteId) return
    setDeleteLoading(true)
    try {
      await notesApi.delete(deleteId)
      setNotes((prev) => prev.filter((n) => n._id !== deleteId))
      setDeleteId(null)
    } finally {
      setDeleteLoading(false)
    }
  }

  return (
    <AppLayout>
      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Notes</h1>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" className="gap-1.5">
            <SlidersHorizontal size={14} /> Sort By
          </Button>
          <Button variant="secondary" size="sm" className="gap-1.5">
            <Filter size={14} /> Filter
          </Button>
          <Button size="sm" className="gap-1.5" onClick={() => setAddOpen(true)}>
            <Plus size={14} /> Add Notes
          </Button>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-24">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="text-center py-16 text-red-500">{error}</div>
      )}

      {/* Empty state */}
      {!loading && !error && notes.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
            <FileText size={28} className="text-gray-400" />
          </div>
          <div>
            <p className="text-gray-900 font-medium">No notes yet</p>
            <p className="text-sm text-gray-400 mt-1">Create your first note to get started</p>
          </div>
          <Button onClick={() => setAddOpen(true)} className="gap-1.5">
            <Plus size={14} /> Add Notes
          </Button>
        </div>
      )}

      {/* Notes grid — 3 columns matching Figma */}
      {!loading && !error && notes.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              onEdit={setEditNote}
              onDelete={setDeleteId}
            />
          ))}
        </div>
      )}

      {/* Add Note Modal */}
      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Add Note">
        <NoteForm onSubmit={handleCreate} onCancel={() => setAddOpen(false)} submitLabel="Create Note" />
      </Modal>

      {/* Edit Note Modal */}
      <Modal open={!!editNote} onClose={() => setEditNote(null)} title="Edit Note">
        {editNote && (
          <NoteForm
            initial={editNote}
            onSubmit={handleUpdate}
            onCancel={() => setEditNote(null)}
            submitLabel="Save Changes"
          />
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal open={!!deleteId} onClose={() => setDeleteId(null)} title="Delete Note">
        <p className="text-sm text-gray-600 mb-6">
          Are you sure you want to delete this note? This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={() => setDeleteId(null)} className="flex-1">
            Cancel
          </Button>
          <Button variant="danger" loading={deleteLoading} onClick={handleDelete} className="flex-1">
            Delete
          </Button>
        </div>
      </Modal>
    </AppLayout>
  )
}
