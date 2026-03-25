import { Search, HelpCircle, ChevronDown } from 'lucide-react'
import { useAuth } from '@/auth/AuthContext'

export default function TopBar() {
  const { user } = useAuth()

  return (
    <header className="h-14 bg-white border-b border-border flex items-center px-6 gap-4 shrink-0">
      <div className="flex-1 max-w-xs">
        <div className="flex items-center gap-2 bg-gray-100 rounded px-3 py-1.5">
          <Search size={14} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent text-sm flex-1 outline-none placeholder:text-gray-400"
          />
          <span className="text-xs text-gray-400 font-mono">⌘ F</span>
        </div>
      </div>

      <div className="flex items-center gap-4 ml-auto">
        <button className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900">
          <HelpCircle size={16} />
          Help Center
        </button>
        <button className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900">
          <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-xs font-semibold">
            {user?.name?.[0]?.toUpperCase() ?? 'U'}
          </div>
          <span className="font-medium">{user?.name?.split(' ')[0]} {user?.name?.split(' ')[1]?.[0]}.</span>
          <ChevronDown size={14} />
        </button>
      </div>
    </header>
  )
}
