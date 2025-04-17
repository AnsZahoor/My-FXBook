import { approveUser } from './api/approve';

// Add this with your other routes
app.post('/api/user/approve', approveUser);