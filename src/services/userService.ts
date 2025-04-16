import prisma from '@/lib/prisma';

interface User {
  id: string;
  name: string;
  email: string;
  isApproved: boolean;
  createdAt: Date;
}

export const getPendingUsers = async (): Promise<User[]> => {
  return await prisma.user.findMany({
    where: { isApproved: false },
    select: {
      id: true,
      name: true,
      email: true,
      isApproved: true,
      createdAt: true
    },
    orderBy: { createdAt: 'desc' }
  });
};

export const approveUser = async (userId: string): Promise<void> => {
  await prisma.user.update({
    where: { id: userId },
    data: { isApproved: true }
  });
};

export const getTotalUsers = async (): Promise<number> => {
  return await prisma.user.count();
};