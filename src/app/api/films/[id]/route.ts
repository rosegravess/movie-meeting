import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import type { FilmStatus } from '@/lib/types';

interface Params {
  params: { id: string };
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    const { status } = (await request.json()) as { status: FilmStatus };
    const filmId = params.id;

    if (status === 'current') {
      await prisma.filmState.updateMany({
        where: { status: 'current' },
        data: { status: 'unwatched' },
      });
    }

    const updated = await prisma.filmState.upsert({
      where: { id: filmId },
      update: { status },
      create: { id: filmId, status },
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error('[PATCH /api/films]', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
