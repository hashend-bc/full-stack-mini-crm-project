import { useState, FormEvent } from 'react'
import { NotePayload } from './notesApi'
import Input from '@/shared/ui/Input'
import Button from '@/shared/ui/Button'

const STATUS_OPTIONS = [
  'Weekly', 'Monthly', 'Personal',
  'Product', 'Business', 'Weekly,Product',
  'Monthly,Product', 'Monthly,Business', 'Personal,Business',
]

interface NoteFormProps {
  initial?: Partial<NotePayload>
  onSubmit: (data: NotePayload) => Promise<void>
  onCancel: () => void
  submitLabel?: string
}

export default function NoteForm({ initial, onSubmit, onCancel, submitLabel = 'Save' }: NoteFormProps) {
  const [title, setTitle] = useState(initial?.title ?? '')
  const [description, setDescription] = useState(initial?.description ?? '')
  const [status, setStatus] = useState(initial?.status ?? 'Weekly')
  const [image, setImage] = useState(initial?.image ?? '')
  const [dueDate, setDueDate] = useState(initial?.dueDate ? initial.dueDate.slice(0, 10) : '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!title.trim()) { setError('Title is required'); return }
    setError('')
    setLoading(true)
    try {
      await onSubmit({ title, description, status, image: image || undefined, dueDate: dueDate || undefined })
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="px-3 py-2 bg-red-50 border border-red-200 rounded text-sm text-red-600">{error}</div>
      )}

      <Input
        label="Title"
        placeholder="Note title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Description</label>
        <textarea
          className="w-full px-3 py-2.5 bg-gray-100 border border-transparent rounded text-sm
            placeholder:text-gray-400 focus:outline-none focus:border-primary focus:bg-white transition-colors resize-none"
          rows={4}
          placeholder="Note description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Status / Tags</label>
        <select
          className="w-full px-3 py-2.5 bg-gray-100 border border-transparent rounded text-sm
            focus:outline-none focus:border-primary focus:bg-white transition-colors"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <Input
        label="Image URL (optional)"
        type="url"
        placeholder="https://..."
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <Input
        label="Due Date (optional)"
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <div className="flex gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
        <Button type="submit" loading={loading} className="flex-1">
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}
