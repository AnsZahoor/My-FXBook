import express, { Request, Response } from 'express'
import { getUsers } from './api/user'
import { approveUser } from './api/approve'

const app = express()
app.use(express.json())

// API Routes
app.get('/api/user', getUsers)
app.post('/api/approve', approveUser)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})