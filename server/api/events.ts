import prisma from '../prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const events = await prisma.economicEvent.findMany({
      orderBy: { date: 'desc' },
      take: 100
    })
    return NextResponse.json(events)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    )
  }
}