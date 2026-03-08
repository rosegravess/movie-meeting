export type FilmStatus = 'unwatched' | 'current' | 'watched';

export interface Film {
  id: string;
  title: string;
  meta: string;      // "Director · Year"
  picker: string;
  isNew: boolean;
  tbd?: boolean;     // placeholder — not yet chosen
  svg: (hex: string) => string;
}

export interface Member {
  id: string;
  name: string;
  partner: string;
  color: string;     // CSS var, e.g. "var(--sky)"
  hex: string;
}

export interface Week {
  id: string;
  filmId: string;
  weekNum: number;
  date: string;
}

export interface Review {
  stars: number; // 1–5, or 0 = not rated
  text: string;
}

export interface AppState {
  filmStates: Record<string, FilmStatus>;
  submissions: Record<string, Record<string, boolean>>;
  weeks: Week[];
  // reviews[filmId][memberId] = { stars, text }
  reviews: Record<string, Record<string, Review>>;
}
