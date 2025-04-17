// Update your user interface
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

const handleApprove = async (userId: string) => {
  try {
    const response = await fetch('/api/user/approve', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId })
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    const updatedUser = await response.json();
    
    setUsers(users.map(user => 
      user.id === updatedUser.id ? updatedUser : user
    ));
  } catch (error) {
    console.error('Approval failed:', error);
    // Add proper error handling in your UI
    alert(`Approval failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};