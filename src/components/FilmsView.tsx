'use client';

import { FILMS, getMember } from '@/lib/data';
import type { AppState } from '@/lib/types';

interface FilmsViewProps {
  state: AppState;
  onCardClick: (filmId: string) => void;
}

export default function FilmsView({ state, onCardClick }: FilmsViewProps) {
  // Order: current → unwatched → watched
  const ordered = [
    ...FILMS.filter((f) => state.filmStates[f.id] === 'current'),
    ...FILMS.filter((f) => (state.filmStates[f.id] ?? 'unwatched') === 'unwatched'),
    ...FILMS.filter((f) => state.filmStates[f.id] === 'watched'),
  ];

  return (
    <div>
      <div className="sec-head" style={{ marginBottom: 28 }}>
        <div className="sec-head-title">All Films</div>
        <div className="sec-head-line" />
      </div>

      <div className="films-view-grid">
        {ordered.map((film) => {
          const member = getMember(film.picker)!;
          const fs     = state.filmStates[film.id] ?? 'unwatched';

          let badge: string | null = null;
          if (fs === 'current') badge = '▶ Now Playing';
          else if (fs === 'watched') badge = '✓ Watched';

          return (
            <div
              key={film.id}
              className={`film-poster-card${fs === 'watched' ? ' fpc-watched' : ''}${fs === 'current' ? ' fpc-current' : ''}`}
              onClick={() => onCardClick(film.id)}
            >
              {film.tbd ? (
                <div className="film-poster-tbd">?</div>
              ) : (
                <img
                  className="film-poster-img"
                  src={`/posters/${film.id}.jpg`}
                  alt={film.title}
                />
              )}

              {/* Member accent bar at top */}
              <div className="film-poster-bar" style={{ background: member.hex }} />

              {/* Status badge */}
              {badge && (
                <div className={`film-poster-badge ${fs === 'current' ? 'fpb-current' : 'fpb-watched'}`}>
                  {badge}
                </div>
              )}

              {/* Bottom overlay with title */}
              <div className="film-poster-overlay" style={{ '--member-hex': member.hex } as React.CSSProperties}>
                <div className="film-poster-title">{film.title}</div>
                <div className="film-poster-picker" style={{ color: member.hex }}>{member.name} & {member.partner}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
