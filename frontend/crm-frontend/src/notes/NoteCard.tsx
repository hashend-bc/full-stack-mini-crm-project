import { MoreHorizontal, Trash2, Pencil } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { Note } from './notesApi'
import Tag from '@/shared/ui/Tag'

interface NoteCardProps {
  note: Note
  onEdit: (note: Note) => void
  onDelete: (id: string) => void
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false })
}

function getInitials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
}

// Parse comma-separated status tags
function parseTags(status: string): string[] {
  return status.split(',').map((s) => s.trim()).filter(Boolean)
}

export default function NoteCard({ note, onEdit, onDelete }: NoteCardProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const tags = parseTags(note.status)
  const assignedName = note.assignedTo?.name ?? 'Unknown'

  return (
    <div className="bg-white rounded-lg shadow-card border border-border p-4 flex flex-col gap-3 hover:shadow-md transition-shadow">
      {/* Tags row */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {tags.map((tag) => <Tag key={tag} label={tag} />)}
        <div className="ml-auto relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1 rounded hover:bg-gray-100 text-gray-400"
          >
            <MoreHorizontal size={16} />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-7 bg-white border border-border rounded-lg shadow-modal z-10 min-w-[120px]">
              <button
                onClick={() => { onEdit(note); setMenuOpen(false) }}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <Pencil size={14} /> Edit
              </button>
              <button
                onClick={() => { onDelete(note._id); setMenuOpen(false) }}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <Trash2 size={14} /> Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Title */}
      <h3 className="font-semibold text-gray-900 text-sm leading-snug">{note.title}</h3>

      {/* Description */}
      <p className="text-sm text-gray-500 leading-relaxed line-clamp-4 flex-1">{note.description}</p>

      {/* Image if present */}
      {note.image && (
        <img src={note.image} alt={note.title} className="w-full h-32 object-cover rounded" />
      )}

      {/* Footer: avatar + name + date */}
      <div className="flex items-center gap-2 pt-1 border-t border-border mt-auto">
        <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-semibold shrink-0">
          {getInitials(assignedName)}
        </div>
        <span className="text-xs text-gray-600 flex-1 truncate">{assignedName}</span>
        <span className="text-xs text-gray-400 shrink-0">{formatDate(note.createdAt)}</span>
      </div>
    </div>
  )
}
