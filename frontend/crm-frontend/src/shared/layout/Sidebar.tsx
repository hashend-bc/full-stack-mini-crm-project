import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '@/auth/AuthContext'
import Logo from '@/shared/ui/Logo'
import {
  LayoutDashboard, Bell, FileText, CheckSquare, Mail, Calendar,
  BarChart2, Users, Building2, Puzzle, Settings, LogOut, ChevronDown
} from 'lucide-react'
import { useState } from 'react'

const mainNav = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/notifications', icon: Bell, label: 'Notifications' },
  { to: '/notes', icon: FileText, label: 'Notes' },
  { to: '/tasks', icon: CheckSquare, label: 'Tasks' },
  { to: '/emails', icon: Mail, label: 'Emails', hasChildren: true },
  { to: '/calendars', icon: Calendar, label: 'Calendars' },
]

const dbNav = [
  { to: '/analytics', icon: BarChart2, label: 'Analytics' },
  { to: '/contacts', icon: Users, label: 'Contacts' },
  { to: '/companies', icon: Building2, label: 'Companies' },
]

const bottomNav = [
  { to: '/integrations', icon: Puzzle, label: 'Integrations' },
  { to: '/settings', icon: Settings, label: 'Settings' },
]

export default function Sidebar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [emailsOpen, setEmailsOpen] = useState(false)

  const handleLogout = () => { logout(); navigate('/login') }

  return (
    <aside className="w-60 min-h-screen bg-white border-r border-border flex flex-col shrink-0">
      <div className="px-4 py-5 border-b border-border">
        <Logo size="sm" />
      </div>

      <nav className="flex-1 px-2 py-4 space-y-0.5 overflow-y-auto">
        {mainNav.map(({ to, icon: Icon, label, hasChildren }) => (
          <div key={to}>
            {hasChildren ? (
              <button
                onClick={() => setEmailsOpen(!emailsOpen)}
                className="sidebar-link w-full"
              >
                <Icon size={16} />
                <span className="flex-1 text-left">{label}</span>
                <ChevronDown size={14} className={`transition-transform ${emailsOpen ? 'rotate-180' : ''}`} />
              </button>
            ) : (
              <NavLink to={to} className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                <Icon size={16} />
                {label}
              </NavLink>
            )}
          </div>
        ))}

        <div className="pt-4 pb-1">
          <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Database</p>
        </div>

        {dbNav.map(({ to, icon: Icon, label }) => (
          <NavLink key={to} to={to} className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <Icon size={16} />
            {label}
          </NavLink>
        ))}

        <div className="pt-4 border-t border-border mt-2">
          {bottomNav.map(({ to, icon: Icon, label }) => (
            <NavLink key={to} to={to} className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </div>
      </nav>

      <div className="px-2 py-3 border-t border-border">
        <div className="flex items-center gap-2 px-3 py-2">
          <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-xs font-semibold shrink-0">
            {user?.name?.[0]?.toUpperCase() ?? 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
            <p className="text-xs text-gray-400 truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full mt-2 flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}
