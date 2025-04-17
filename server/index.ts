import { approveUser } from './api/approve';

// Add this with your other routes
app.post('/api/users/approve', approveUser);