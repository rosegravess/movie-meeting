'use client';

import { getFilm, getMember, MEMBERS } from '@/lib/data';
import type { AppState } from '@/lib/types';

interface LogViewProps {
  state: AppState;
}

export default function LogView({ state }: LogViewProps) {
  const weeks = [...state.weeks].reverse();

  return (
    <div>
      <div className="sec-head" style={{ marginBottom: 28 }}>
        <div className="sec-head-title">Week by Week</div>
        <div className="sec-head-line" />
      </div>

      {weeks.length === 0 ? (
        <div className="empty-log">No weeks logged yet · Head to Draw to begin</div>
      ) : (
        weeks.map((w) => {
          const film   = getFilm(w.filmId);
          const member = film ? getMember(film.picker) : null;
          const subs   = state.submissions[w.filmId] ?? {};

          return (
            <div key={w.id} className="week-entry">
              <div className="week-num-big">{w.weekNum}</div>
              <div className="week-divider" />
              <div className="week-entry-body">
                <div className="week-entry-film">{film?.title ?? w.filmId}</div>
                <div className="week-entry-meta">
                  {film?.meta} · Picked by {member?.name} · {w.date}
                </div>
                <div className="week-subs">
                  {MEMBERS.map((m) =>
                    subs[m.id] ? (
                      <div
                        key={m.id}
                        className="week-sub-chip"
                        style={{ color: m.hex, borderColor: m.hex + '44' }}
                      >
                        {m.name}
                      </div>
                    ) : null
                  )}
                  {member && subs['intro'] && (
                    <div
                      className="week-sub-chip"
                      style={{ color: member.hex, borderColor: member.hex + '44' }}
                    >
                      {member.name} intro
                    </div>
                  )}
                  {!MEMBERS.some((m) => subs[m.id]) && !subs['intro'] && (
                    <span style={{ fontFamily: "'Syne Mono',monospace", fontSize: '7.5px', color: 'var(--dim)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                      No videos submitted yet
                    </span>
                  )}
                </div>
              </div>
              {film && (
                <img
                  className="week-poster"
                  src={`/posters/${film.id}.jpg`}
                  alt={film.title}
                />
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
