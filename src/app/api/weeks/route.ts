import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  const { filmId, weekNum, date } = (await request.json()) as {
    filmId: string;
    weekNum: number;
    date: string;
  };

  const week = await prisma.week.create({
    data: { filmId, weekNum, date },
  });

  return NextResponse.json(week);
}
