import { useState, FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { useAuth } from '@/auth/AuthContext'
import Logo from '@/shared/ui/Logo'
import Button from '@/shared/ui/Button'
import Input from '@/shared/ui/Input'

export default function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    if (password.length < 6) { setError('Password must be at least 6 characters'); return }
    setLoading(true)
    try {
      await register(name, email, password)
      navigate('/notes')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-[55%] bg-primary flex-col px-12 py-10 relative overflow-hidden">
        <Logo light />

        <div className="mt-16">
          <h1 className="text-4xl font-bold text-white leading-tight">Create your</h1>
          <p className="text-xl text-blue-200 mt-1">Venture account</p>
          <p className="text-sm text-blue-300 mt-4 max-w-sm leading-relaxed">
            Join thousands of teams using Venture to manage contacts, notes, and tasks in one place.
          </p>
        </div>

        <div className="flex-1 flex items-end justify-center pb-8">
          <div className="w-80 h-64 flex items-center justify-center">
            <svg viewBox="0 0 320 260" fill="none" className="w-full h-full opacity-90">
              <rect x="60" y="100" width="140" height="100" rx="8" fill="#2D3561" />
              <rect x="68" y="108" width="124" height="80" rx="4" fill="#1a2050" />
              <rect x="120" y="200" width="20" height="20" fill="#2D3561" />
              <rect x="100" y="218" width="60" height="6" rx="3" fill="#2D3561" />
              <rect x="180" y="150" width="90" height="60" rx="6" fill="#c0392b" />
              <rect x="186" y="156" width="78" height="48" rx="3" fill="#e74c3c" />
              <rect x="170" y="208" width="110" height="8" rx="4" fill="#a93226" />
              <circle cx="200" cy="110" r="22" fill="#f5cba7" />
              <rect x="178" y="130" width="44" height="50" rx="8" fill="white" />
              <ellipse cx="200" cy="92" rx="28" ry="8" fill="#8e44ad" />
              <rect x="185" y="78" width="30" height="16" rx="4" fill="#9b59b6" />
              <path d="M222 135 Q250 110 255 90" stroke="white" strokeWidth="10" strokeLinecap="round" fill="none" />
              <circle cx="255" cy="88" r="8" fill="#f5cba7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 lg:px-16 bg-white">
        <div className="w-full max-w-sm mx-auto">
          <div className="mb-8">
            <Logo size="sm" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-6">Create an account</h2>

          {error && (
            <div className="mb-4 px-3 py-2 bg-red-50 border border-red-200 rounded text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
            />

            <Input
              label="Email"
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <Button type="submit" loading={loading} className="w-full py-3 text-base rounded-lg mt-2">
              Create account
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="text-accent font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
