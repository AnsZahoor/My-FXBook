import { useEffect, useState } from 'react';
import api from '@/lib/api';
import type { User } from '@/types';

const AdminDashboard = () => {
  const [pendingUsers, setPendingUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPendingUsers = async () => {
      try {
        const { data } = await api.get<User[]>('/admin/pending-users');
        setPendingUsers(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch pending users:', err);
        setError('Failed to load pending users');
      } finally {
        setLoading(false);
      }
    };

    fetchPendingUsers();
  }, []);

  const handleApprove = async (userId: string) => {
    try {
      await api.patch(`/admin/approve-user/${userId}`);
      setPendingUsers(prev => prev.filter(user => user.id !== userId));
    } catch (err) {
      console.error('Approval failed:', err);
      setError('Approval failed. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Pending User Approvals</h1>
      
      {pendingUsers.length === 0 ? (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
          No pending user approvals
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <ul className="divide-y divide-gray-200">
            {pendingUsers.map((user) => (
              <li key={user.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleApprove(user.id)}
                    className="ml-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Approve
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;