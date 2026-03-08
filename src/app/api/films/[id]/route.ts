import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import type { FilmStatus } from '@/lib/types';

interface Params {
  params: { id: string };
}

export async function PATCH(request: Request, { params }: Params) {
  const { status } = (await request.json()) as { status: FilmStatus };
  const filmId = params.id;

  // If setting to 'current', clear any existing current film first
  if (status === 'current') {
    await prisma.filmState.updateMany({
      where: { status: 'current' },
      data: { status: 'unwatched' },
    });
  }

  const updated = await prisma.filmState.update({
    where: { id: filmId },
    data: { status },
  });

  return NextResponse.json(updated);
}
