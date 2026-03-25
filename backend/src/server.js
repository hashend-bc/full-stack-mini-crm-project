require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')

const app = express()

// ✅ Allowed origins (add your frontend URLs here)
const allowedOrigins = [
  process.env.CLIENT_URL, // from .env
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175'
]

// ✅ CORS configuration
app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like Postman, mobile apps)
    if (!origin) return callback(null, true)

    if (allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}))

// Middleware
app.use(express.json())

// Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

// Health check
app.get('/api/health', (_, res) => res.json({ status: 'ok' }))

// Global error handler
app.use((err, _req, res, _next) => {
  console.error(err.stack)
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error'
  })
})

const PORT = process.env.PORT || 5001

const start = async () => {
  await connectDB()
  app.listen(PORT, () =>
    console.log(`🚀 Server running on port ${PORT}`)
  )
}

start().catch(console.error)

module.exports = app