const request = require('supertest')
const mongoose = require('mongoose')

// Use in-memory or test DB
process.env.MONGODB_URI = 'mongodb://localhost:27017/venture-crm-test'
process.env.JWT_SECRET = 'test_secret'
process.env.JWT_EXPIRES_IN = '1d'

const app = require('../src/server')

let token = ''
let noteId = ''

beforeAll(async () => {
  // Wait for DB connection
  await new Promise((resolve) => setTimeout(resolve, 1000))
  // Clean test collections
  await mongoose.connection.collection('users').deleteMany({ email: 'jest@test.com' })
  await mongoose.connection.collection('notes').deleteMany({})
})

afterAll(async () => {
  await mongoose.connection.close()
})

// ── Auth ──────────────────────────────────────────────────────────────────────
describe('POST /api/auth/register', () => {
  it('registers a new user', async () => {
    const res = await request(app).post('/api/auth/register').send({
      name: 'Jest User', email: 'jest@test.com', password: 'password123',
    })
    expect(res.status).toBe(201)
    expect(res.body.token).toBeDefined()
    expect(res.body.user.email).toBe('jest@test.com')
    token = res.body.token
  })

  it('rejects duplicate email', async () => {
    const res = await request(app).post('/api/auth/register').send({
      name: 'Jest User', email: 'jest@test.com', password: 'password123',
    })
    expect(res.status).toBe(400)
  })
})

describe('POST /api/auth/login', () => {
  it('logs in with correct credentials', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'jest@test.com', password: 'password123',
    })
    expect(res.status).toBe(200)
    expect(res.body.token).toBeDefined()
  })

  it('rejects wrong password', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'jest@test.com', password: 'wrongpass',
    })
    expect(res.status).toBe(401)
  })
})

describe('GET /api/auth/profile', () => {
  it('returns profile with valid token', async () => {
    const res = await request(app)
      .get('/api/auth/profile')
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(res.body.user.email).toBe('jest@test.com')
  })

  it('rejects without token', async () => {
    const res = await request(app).get('/api/auth/profile')
    expect(res.status).toBe(401)
  })
})

// ── Notes ─────────────────────────────────────────────────────────────────────
describe('POST /api/notes', () => {
  it('creates a note', async () => {
    const res = await request(app)
      .post('/api/notes')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Test Note', description: 'Test desc', status: 'Weekly' })
    expect(res.status).toBe(201)
    expect(res.body.title).toBe('Test Note')
    noteId = res.body._id
  })

  it('rejects note without title', async () => {
    const res = await request(app)
      .post('/api/notes')
      .set('Authorization', `Bearer ${token}`)
      .send({ description: 'No title' })
    expect(res.status).toBe(400)
  })
})

describe('GET /api/notes', () => {
  it('returns notes for authenticated user', async () => {
    const res = await request(app)
      .get('/api/notes')
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body.length).toBeGreaterThan(0)
  })
})

describe('PUT /api/notes/:id', () => {
  it('updates a note', async () => {
    const res = await request(app)
      .put(`/api/notes/${noteId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Updated Note' })
    expect(res.status).toBe(200)
    expect(res.body.title).toBe('Updated Note')
  })
})

describe('DELETE /api/notes/:id', () => {
  it('deletes a note', async () => {
    const res = await request(app)
      .delete(`/api/notes/${noteId}`)
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Note deleted')
  })
})
