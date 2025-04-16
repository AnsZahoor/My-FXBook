import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { userId } = req.body

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { approved: true }
    })

    res.status(200).json(updatedUser)
  } catch (error) {
    console.error('Error approving user:', error)
    res.status(500).json({ error: 'Failed to approve user' })
  }
}