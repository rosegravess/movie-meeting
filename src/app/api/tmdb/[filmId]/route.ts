import { NextResponse } from 'next/server';
import { FILMS } from '@/lib/data';

const KEY  = process.env.TMDB_API_KEY!;
const BASE = 'https://api.themoviedb.org/3';

export async function GET(
  _req: Request,
  { params }: { params: { filmId: string } }
) {
  const film = FILMS.find((f) => f.id === params.filmId);
  if (!film) return NextResponse.json({ error: 'Film not found' }, { status: 404 });

  // meta format: "Director · Year"
  const year = film.meta.split(' · ').at(-1);

  // 1 — search by title + year
  const searchRes = await fetch(
    `${BASE}/search/movie?api_key=${KEY}&query=${encodeURIComponent(film.title)}&year=${year}&language=en-US`,
    { next: { revalidate: 86400 } }
  );
  if (!searchRes.ok) return NextResponse.json({ error: 'TMDB search failed' }, { status: 502 });

  const searchData = await searchRes.json();
  const tmdbId = searchData.results?.[0]?.id;
  if (!tmdbId) return NextResponse.json({ error: 'Not found on TMDB' }, { status: 404 });

  // 2 — fetch credits
  const creditsRes = await fetch(
    `${BASE}/movie/${tmdbId}/credits?api_key=${KEY}`,
    { next: { revalidate: 86400 } }
  );
  if (!creditsRes.ok) return NextResponse.json({ error: 'TMDB credits failed' }, { status: 502 });

  const credits = await creditsRes.json();

  const cast = (credits.cast ?? [])
    .slice(0, 6)
    .map((c: { name: string; character: string }) => ({
      name: c.name,
      character: c.character,
    }));

  const crewFind = (job: string) =>
    (credits.crew ?? []).find((c: { job: string; name: string }) => c.job === job)?.name ?? null;

  return NextResponse.json({
    cast,
    director:  crewFind('Director'),
    dp:        crewFind('Director of Photography'),
    composer:  crewFind('Original Music Composer'),
  });
}
