export interface User {
    id: string;
    name: string;
    email: string;
    isApproved: boolean;
    createdAt: string;
    updatedAt: string;
    role: 'user' | 'admin';
  }