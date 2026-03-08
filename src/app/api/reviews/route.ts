import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  const { filmId, memberId, stars, text } = (await request.json()) as {
    filmId: string;
    memberId: string;
    stars: number;
    text: string;
  };

  const review = await prisma.review.upsert({
    where: { filmId_memberId: { filmId, memberId } },
    update: { stars, text },
    create: { filmId, memberId, stars, text },
  });

  return NextResponse.json(review);
}
