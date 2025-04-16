import { Request, Response } from 'express'
import prisma from '../lib/prisma'

export const approveUser = async (req: Request, res: Response) => {
  const { userId } = req.body

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' })
  }

  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { approved: true }  // Changed from isApproved
    })
    res.status(200).json(user)
  } catch (error) {
    console.error('Approval error:', error)
    res.status(500).json({ error: 'Failed to approve user' })
  }
}