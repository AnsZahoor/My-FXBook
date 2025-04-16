import express from 'express'
import { getUsers } from './api/user'
import { approveUser } from './api/approve'

const app = express()
app.use(express.json())

// API Routes
app.get('/api/user', getUsers)
app.post('/api/approve', approveUser)

// ... rest of your server configuration ...