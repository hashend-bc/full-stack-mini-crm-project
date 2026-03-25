import { useState, FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { useAuth } from '@/auth/AuthContext'
import Logo from '@/shared/ui/Logo'
import Button from '@/shared/ui/Button'
import Input from '@/shared/ui/Input'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      navigate('/notes')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel — dark navy */}
      <div className="hidden lg:flex lg:w-[55%] bg-primary flex-col px-12 py-10 relative overflow-hidden">
        <Logo light />

        <div className="mt-16">
          <h1 className="text-4xl font-bold text-white leading-tight">Sign in to</h1>
          <p className="text-xl text-blue-200 mt-1">Lorem Ipsum is simply</p>
          <p className="text-sm text-blue-300 mt-4 max-w-sm leading-relaxed">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
          </p>
        </div>

        {/* Illustration placeholder */}
        <div className="flex-1 flex items-end justify-center pb-8">
          <div className="w-80 h-64 flex items-center justify-center">
            <svg viewBox="0 0 320 260" fill="none" className="w-full h-full opacity-90">
              {/* Monitor */}
              <rect x="60" y="100" width="140" height="100" rx="8" fill="#2D3561" />
              <rect x="68" y="108" width="124" height="80" rx="4" fill="#1a2050" />
              <rect x="120" y="200" width="20" height="20" fill="#2D3561" />
              <rect x="100" y="218" width="60" height="6" rx="3" fill="#2D3561" />
              {/* Laptop */}
              <rect x="180" y="150" width="90" height="60" rx="6" fill="#c0392b" />
              <rect x="186" y="156" width="78" height="48" rx="3" fill="#e74c3c" />
              <rect x="170" y="208" width="110" height="8" rx="4" fill="#a93226" />
              {/* Character body */}
              <circle cx="200" cy="110" r="22" fill="#f5cba7" />
              <rect x="178" y="130" width="44" height="50" rx="8" fill="white" />
              {/* Hat */}
              <ellipse cx="200" cy="92" rx="28" ry="8" fill="#8e44ad" />
              <rect x="185" y="78" width="30" height="16" rx="4" fill="#9b59b6" />
              {/* Raised arm */}
              <path d="M222 135 Q250 110 255 90" stroke="white" strokeWidth="10" strokeLinecap="round" fill="none" />
              <circle cx="255" cy="88" r="8" fill="#f5cba7" />
              {/* Hand wave lines */}
              <line x1="262" y1="78" x2="268" y2="68" stroke="#f5cba7" strokeWidth="3" strokeLinecap="round" />
              <line x1="268" y1="82" x2="276" y2="74" stroke="#f5cba7" strokeWidth="3" strokeLinecap="round" />
              <line x1="256" y1="76" x2="260" y2="64" stroke="#f5cba7" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* Right panel — white form */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 lg:px-16 bg-white">
        <div className="w-full max-w-sm mx-auto">
          <div className="mb-8">
            <Logo size="sm" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-6">Nice to see you again</h2>

          {error && (
            <div className="mb-4 px-3 py-2 bg-red-50 border border-red-200 rounded text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Login</label>
              <Input
                type="email"
                placeholder="Email or phone number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <div>
              <label className="text-sm text-gray-500 mb-1 block">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
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

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <button
                  type="button"
                  role="switch"
                  aria-checked={remember}
                  onClick={() => setRemember(!remember)}
                  className={`relative w-9 h-5 rounded-full transition-colors ${remember ? 'bg-primary' : 'bg-gray-200'}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${remember ? 'translate-x-4' : ''}`} />
                </button>
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-accent hover:underline">Forgot password?</a>
            </div>

            <Button type="submit" loading={loading} className="w-full py-3 text-base rounded-lg mt-2">
              Sign in
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <Link to="/register" className="text-accent font-medium hover:underline">Sign up now</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
