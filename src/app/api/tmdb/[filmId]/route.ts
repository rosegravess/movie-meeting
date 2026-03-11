import { NextResponse } from 'next/server';
import { FILMS } from '@/lib/data';

const KEY  = process.env.TMDB_API_KEY!;
const BASE = 'https://api.themoviedb.org/3';

export const dynamic = 'force-dynamic';

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

  // 2 — fetch credits + watch providers in parallel
  const [creditsRes, providersRes] = await Promise.all([
    fetch(`${BASE}/movie/${tmdbId}/credits?api_key=${KEY}`, { next: { revalidate: 86400 } }),
    fetch(`${BASE}/movie/${tmdbId}/watch/providers?api_key=${KEY}`, { next: { revalidate: 86400 } }),
  ]);
  if (!creditsRes.ok) return NextResponse.json({ error: 'TMDB credits failed' }, { status: 502 });

  const credits = await creditsRes.json();
  const providersData = providersRes.ok ? await providersRes.json() : null;

  const cast = (credits.cast ?? [])
    .slice(0, 6)
    .map((c: { name: string; character: string }) => ({
      name: c.name,
      character: c.character,
    }));

  const crewFind = (job: string) =>
    (credits.crew ?? []).find((c: { job: string; name: string }) => c.job === job)?.name ?? null;

  const flatrate: { provider_name: string; logo_path: string }[] =
    providersData?.results?.US?.flatrate ?? [];
  const providers = flatrate.map((p) => ({
    name: p.provider_name,
    logo: `https://image.tmdb.org/t/p/original${p.logo_path}`,
  }));

  return NextResponse.json({
    cast,
    director:  crewFind('Director'),
    dp:        crewFind('Director of Photography'),
    composer:  crewFind('Original Music Composer'),
    providers,
  });
}
