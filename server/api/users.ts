import { NextResponse } from 'next/server';
import prisma from '../prisma';

export async function GET() {
  try {
    const pendingUsers = await prisma.user.findMany({
      where: { isApproved: false },
      select: { id: true, name: true, email: true, createdAt: true }
    });
    
    const totalUsers = await prisma.user.count();
    
    return NextResponse.json({
      pendingUsers,
      totalUsers
    });
    
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const { userId } = await request.json();
  
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { isApproved: true }
    });
    
    return NextResponse.json({ success: true });
    
  } catch (error) {
    return NextResponse.json(
      { error: "Approval failed" },
      { status: 500 }
    );
  }
}