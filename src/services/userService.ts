interface User {
    id: string;
    name: string;
    email: string;
    isApproved: boolean;
    createdAt: string;
  }
  
  // Mock implementation - replace with real API calls
  export const getPendingUsers = async (): Promise<User[]> => {
    // In a real app, this would be an API call:
    // const response = await fetch('/api/users/pending');
    // return await response.json();
    
    // Mock data
    return [
      {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        isApproved: false,
        createdAt: "2023-05-15T10:00:00Z"
      },
      {
        id: "2",
        name: "Jane Smith",
        email: "jane@example.com",
        isApproved: false,
        createdAt: "2023-05-16T11:30:00Z"
      }
    ];
  };
  
  export const approveUser = async (userId: string): Promise<void> => {
    // In a real app:
    // await fetch(`/api/users/${userId}/approve`, { method: 'POST' });
    
    // Mock implementation
    return new Promise(resolve => setTimeout(resolve, 500));
  };
  
  export const getTotalUsers = async (): Promise<number> => {
    // In a real app:
    // const response = await fetch('/api/users/count');
    // const data = await response.json();
    // return data.count;
    
    // Mock data
    return 42;
  };