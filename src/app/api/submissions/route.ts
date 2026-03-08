import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  const { filmId, memberId } = (await request.json()) as {
    filmId: string;
    memberId: string;
  };

  // Toggle: find existing and flip, or create as true
  const existing = await prisma.submission.findUnique({
    where: { filmId_memberId: { filmId, memberId } },
  });

  const submitted = existing ? !existing.submitted : true;

  const record = await prisma.submission.upsert({
    where: { filmId_memberId: { filmId, memberId } },
    update: { submitted },
    create: { filmId, memberId, submitted },
  });

  return NextResponse.json(record);
}
