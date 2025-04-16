// Client-side only API calls
const API_BASE_URL = import.meta.env.VITE_API_URL

export const fetchEvents = async (startDate: string, endDate: string) => {
  const response = await fetch(
    `${API_BASE_URL}/events?start=${startDate}&end=${endDate}`
  )
  if (!response.ok) throw new Error('Network response was not ok')
  return response.json()
}