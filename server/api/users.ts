import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const pendingUsers = await prisma.user.findMany({
        where: { isApproved: false },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true
        }
      });
      
      const totalUsers = await prisma.user.count();
      
      return res.status(200).json({ pendingUsers, totalUsers });
      
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch users' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { userId } = req.body;
      
      await prisma.user.update({
        where: { id: userId },
        data: { isApproved: true }
      });
      
      return res.status(200).json({ success: true });
      
    } catch (error) {
      return res.status(500).json({ error: 'Approval failed' });
    }
  }

  return res.status(405).end(); // Method Not Allowed
}