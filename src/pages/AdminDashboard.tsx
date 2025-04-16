import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { fetchStoredEvents } from "@/services/eventStorage";
import { getPendingUsers, approveUser, getTotalUsers } from "@/services/userService";

interface User {
  id: string;
  name: string;
  email: string;
  isApproved: boolean;
  createdAt: string;
}

const AdminDashboard = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [pendingUsers, setPendingUsers] = useState<User[]>([]);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [loading, setLoading] = useState({
    events: true,
    users: true
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load events
        const eventData = await fetchStoredEvents();
        setEvents(eventData.slice(0, 15)); // Show only recent 15 events
        
        // Load user data
        const [pending, total] = await Promise.all([
          getPendingUsers(),
          getTotalUsers()
        ]);
        
        setPendingUsers(pending);
        setTotalUsers(total);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading({ events: false, users: false });
      }
    };

    loadData();
  }, []);

  const handleApprove = async (userId: string) => {
    try {
      await approveUser(userId);
      setPendingUsers(prev => prev.filter(user => user.id !== userId));
      setTotalUsers(prev => prev + 1);
    } catch (error) {
      console.error("Approval failed:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Events Section */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold mb-4">Recent Events</h2>
          {loading.events ? (
            <p>Loading events...</p>
          ) : (
            <ul className="space-y-2">
              {events.map((event) => (
                <li key={event.id} className="border-b pb-2 last:border-b-0">
                  <p className="font-medium">{event.title}</p>
                  <p className="text-sm text-gray-600">
                    {event.date} • {event.currency}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* User Management Section */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">User Statistics</h2>
            <div className="flex gap-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-600">Total Users</p>
                <p className="text-2xl font-bold">{totalUsers}</p>
              </div>
              <div className="bg-yellow-50 p-3 rounded-lg">
                <p className="text-sm text-yellow-600">Pending Approvals</p>
                <p className="text-2xl font-bold">{pendingUsers.length}</p>
              </div>
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-4">New User Approvals</h2>
          {loading.users ? (
            <p>Loading users...</p>
          ) : pendingUsers.length === 0 ? (
            <p className="text-gray-500">No pending approvals</p>
          ) : (
            <ul className="space-y-3">
              {pendingUsers.map((user) => (
                <li key={user.id} className="border p-3 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      <p className="text-xs text-gray-400">
                        Joined: {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={() => handleApprove(user.id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                    >
                      Approve
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default AdminDashboard;