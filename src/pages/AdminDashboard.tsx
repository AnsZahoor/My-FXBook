// Update your user interface
interface User {
  id: string
  name: string
  email: string
  approved: boolean
  createdAt: Date
  profile?: {
    status: string
  }
  role?: {
    role: string
  }
}

// Update approval handler
const handleApprove = async (userId: string) => {
  try {
    await fetch('/api/user/approve', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId })
    })
    
    setUsers(users.map(user => 
      user.id === userId ? { ...user, approved: true } : user
    ))
  } catch (error) {
    console.error('Approval failed:', error)
  }
}