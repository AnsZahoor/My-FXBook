import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import { fetchStoredEvents } from "@/services/eventStorage";
import { EconomicEvent } from "@/types/event";

const AdminDashboard = () => {
/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Asynchronously loads stored events from the backend and updates the state.
 */

/*******  12816f33-15ef-4269-8de3-3ec3d1eb19b7  *******/  const [events, setEvents] = useState<EconomicEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchStoredEvents();
        setEvents(data);
      } catch (error) {
        console.error("Error loading events:", error);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  if (loading) {
    return <div className="p-4">Loading events...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <TooltipProvider>
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold mb-2">Recent Events</h2>
          {events.length > 0 ? (
            <ul className="space-y-2">
              {events.map((event) => (
                <li key={event.id} className="border-b pb-2">
                  <p className="font-medium">{event.title}</p>
                  <p className="text-sm text-gray-600">
                    {event.date} • {event.currency}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No events found</p>
          )}
        </div>
        <Toaster />
      </TooltipProvider>
    </div>
  );
};

export default AdminDashboard;