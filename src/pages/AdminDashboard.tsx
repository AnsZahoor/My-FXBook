// Remove any Prisma imports
import { getStoredEvents } from '@/services/eventStorage'

const AdminDashboard = () => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    const loadEvents = async () => {
      const data = await getStoredEvents()
      setEvents(data)
    }
    loadEvents()
  }, [])

  return (
    /* ... your existing JSX ... */
  )
}