import { useEffect, useState } from 'react'
import { Toaster } from '@/components/ui/toaster'

interface User {
  id: string
  name: string
  email: string
  approved: boolean
  createdAt: Date
}

const AdminDashboard = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/user')
        if (!response.ok) throw new Error('Failed to fetch users')
        const data = await response.json()
        setUsers(data)
      } catch (error) {
        console.error('Error loading users:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  const handleApprove = async (userId: string) => {
    try {
      const response = await fetch('/api/approve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId })
      })

      if (!response.ok) throw new Error('Approval failed')

      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === userId ? { ...user, approved: true } : user
        )
      )
    } catch (error) {
      console.error('Approval failed:', error)
    }
  }

  if (loading) return <div className="p-4">Loading user data...</div>

  const pendingUsers = users.filter(user => !user.approved)
  const approvedUsers = users.filter(user => user.approved)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      {/* ... rest of your component ... */}
    </div>
  )
}

export default AdminDashboard