import api from '@/lib/api'

export interface Note {
  _id: string
  title: string
  description: string
  status: string
  image?: string
  dueDate?: string
  assignedTo?: { _id: string; name: string; email: string }
  createdAt: string
  updatedAt: string
}

export interface NotePayload {
  title: string
  description: string
  status: string
  image?: string
  dueDate?: string
  assignedTo?: string
}

export const notesApi = {
  getAll: (): Promise<Note[]> => api.get<Note[]>('/notes').then((r) => r.data),
  getOne: (id: string): Promise<Note> => api.get<Note>(`/notes/${id}`).then((r) => r.data),
  create: (data: NotePayload): Promise<Note> => api.post<Note>('/notes', data).then((r) => r.data),
  update: (id: string, data: Partial<NotePayload>): Promise<Note> => api.put<Note>(`/notes/${id}`, data).then((r) => r.data),
  delete: (id: string) => api.delete(`/notes/${id}`).then((r) => r.data),
}
