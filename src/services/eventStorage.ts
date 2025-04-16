// Remove all Prisma imports
import { fetchEvents } from '@/lib/api'

export const getStoredEvents = async () => {
  try {
    const response = await fetch('/api/events')
    return await response.json()
  } catch (error) {
    console.error('Error fetching events:', error)
    return []
  }
}