import { useEffect, useState } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { getPendingUsers, approveUser, getTotalUsers } from '@/services/userService';

interface User {
  id: string;
  name: string;
  email: string;
  isApproved: boolean;
  createdAt: Date;
}

const AdminDashboard = () => {
  const [pendingUsers, setPendingUsers] = useState<User[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const [pending, total] = await Promise.all([
          getPendingUsers(),
          getTotalUsers()
        ]);
        setPendingUsers(pending);
        setTotalUsers(total);
      } catch (error) {
        console.error('Error loading users:', error);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  const handleApprove = async (userId: string) => {
    try {
      await approveUser(userId);
      setPendingUsers(prev => prev.filter(user => user.id !== userId));
      setTotalUsers(prev => prev + 1);
    } catch (error) {
      console.error('Approval failed:', error);
    }
  };

  if (loading) {
    return <div className="p-4">Loading user data...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Statistics */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold mb-4">User Statistics</h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-600">Total Users</p>
              <p className="text-2xl font-bold">{totalUsers}</p>
            </div>
            <div className="bg-amber-50 p-4 rounded-lg">
              <p className="text-sm text-amber-600">Pending Approvals</p>
              <p className="text-2xl font-bold">{pendingUsers.length}</p>
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-4">Pending Approvals</h2>
          {pendingUsers.length === 0 ? (
            <p className="text-gray-500">No pending approvals</p>
          ) : (
            <div className="space-y-3">
              {pendingUsers.map(user => (
                <div key={user.id} className="border p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      <p className="text-xs text-gray-400">
                        Registered: {new Date(user.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <button
                      onClick={() => handleApprove(user.id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                    >
                      Approve
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Events Section */}
        {/* Keep your existing events display code here */}
      </div>
      <Toaster />
    </div>
  );
};

export default AdminDashboard;