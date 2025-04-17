import React, { useState, useEffect } from 'react';

// Define the User interface
interface User {
  id: string;
  name: string;
  email: string;
  approved: boolean;
  createdAt: Date;
  profile?: {
    status: string;
  };
  role?: {
    role: string;
  };
}

const AdminDashboard: React.FC = () => {
  // State to manage the list of users
  const [users, setUsers] = useState<User[]>([]);

  // Fetch users from the API when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users'); // Ensure this matches your Express route
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
        alert(`Error fetching users: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    };

    fetchUsers();
  }, []);

  const handleApprove = async (userId: string) => {
    try {
      const response = await fetch('/api/user/approve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const updatedUser = await response.json();

      // Update the users state with the approved user
      setUsers(users.map(user => 
        user.id === updatedUser.id ? updatedUser : user
      ));
    } catch (error) {
      console.error('Approval failed:', error);
      alert(`Approval failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {/* Render the list of users */}
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} - {user.email} - Approved: {user.approved ? 'Yes' : 'No'}
            <button onClick={() => handleApprove(user.id)}>Approve</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;