import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const approveUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { approved: true },
      select: {
        id: true,
        name: true,
        email: true,
        approved: true,
        createdAt: true
      }
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error approving user:', error);
    res.status(500).json({ error: 'Failed to approve user' });
  }
};