import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { FILMS } from '@/lib/data';
import type { FilmStatus, AppState } from '@/lib/types';

export const dynamic = 'force-dynamic';

async function ensureSeeded() {
  for (const film of FILMS) {
    await prisma.filmState.upsert({
      where: { id: film.id },
      update: {},
      create: { id: film.id, status: 'unwatched' },
    });
  }
}

export async function GET() {
  await ensureSeeded();

  const [filmStateRows, submissionRows, weekRows, reviewRows] = await Promise.all([
    prisma.filmState.findMany(),
    prisma.submission.findMany(),
    prisma.week.findMany({ orderBy: { weekNum: 'asc' } }),
    prisma.review.findMany(),
  ]);

  const filmStates: Record<string, FilmStatus> = {};
  filmStateRows.forEach((r) => { filmStates[r.id] = r.status as FilmStatus; });

  const submissions: Record<string, Record<string, boolean>> = {};
  submissionRows.forEach((r) => {
    if (!submissions[r.filmId]) submissions[r.filmId] = {};
    submissions[r.filmId][r.memberId] = r.submitted;
  });

  const reviews: AppState['reviews'] = {};
  reviewRows.forEach((r) => {
    if (!reviews[r.filmId]) reviews[r.filmId] = {};
    reviews[r.filmId][r.memberId] = { stars: r.stars, text: r.text };
  });

  const state: AppState = {
    filmStates,
    submissions,
    weeks: weekRows.map((w) => ({ id: w.id, filmId: w.filmId, weekNum: w.weekNum, date: w.date })),
    reviews,
  };

  return NextResponse.json(state);
}
