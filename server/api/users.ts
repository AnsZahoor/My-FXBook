import { Request, Response } from 'express'
import prisma from '../lib/prisma'

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        approved: true,
        createdAt: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    res.status(200).json(users)
  } catch (error) {
    console.error('Error fetching users:', error)
    res.status(500).json({ error: 'Failed to fetch users' })
  }
}