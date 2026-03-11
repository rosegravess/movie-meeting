'use client';

import { useEffect, useState } from 'react';
import { MEMBERS, getFilm, getMember } from '@/lib/data';
import type { AppState, FilmStatus } from '@/lib/types';

interface FilmModalProps {
  filmId: string | null;
  state: AppState;
  onClose: () => void;
  onStatusChange: (filmId: string, status: FilmStatus) => void;
  onToggleSub: (filmId: string, memberId: string) => void;
  onSaveReview: (filmId: string, memberId: string, stars: number, text: string) => void;
}

interface TmdbInfo {
  cast: { name: string; character: string }[];
  director: string | null;
  dp: string | null;
  composer: string | null;
  providers: { name: string; logo: string }[];
}

const STATUS_OPTIONS: { value: FilmStatus; label: string }[] = [
  { value: 'unwatched', label: 'Upcoming' },
  { value: 'current',   label: '▶ Now' },
  { value: 'watched',   label: '✓ Watched' },
];

export const HOT_DOGS = [
  { value: 1, label: 'Ballpark Dog' },
  { value: 2, label: 'Chicago Dog' },
  { value: 3, label: 'Corn Dog' },
  { value: 4, label: 'Loaded Chili Cheese Dog' },
  { value: 5, label: 'Coney Island Dog' },
] as const;

export function getHotDog(n: number): string {
  return HOT_DOGS.find((d) => d.value === n)?.label ?? '';
}

function HotDogInput({
  memberName, memberHex, initialStars, initialText, onSave,
}: {
  memberName: string; memberHex: string;
  initialStars: number; initialText: string;
  onSave: (stars: number, text: string) => void;
}) {
  const [pick, setPick] = useState(initialStars);
  const [text, setText] = useState(initialText);

  function handlePick(n: number) {
    const next = pick === n ? 0 : n;
    setPick(next);
    onSave(next, text);
  }

  function handleTextBlur() {
    if (pick > 0 || text.trim()) onSave(pick, text);
  }

  return (
    <div className="rating-row">
      <div className="rating-member" style={{ color: memberHex }}>{memberName}</div>
      <div className="hotdog-picker">
        {HOT_DOGS.map((d) => (
          <button
            key={d.value}
            className={`hotdog-btn${pick === d.value ? ' selected' : ''}`}
            style={pick === d.value ? { borderColor: memberHex, color: memberHex, background: memberHex + '18' } : undefined}
            onClick={() => handlePick(d.value)}
          >
            🌭 {d.label}
          </button>
        ))}
      </div>
      <textarea
        className="rating-text-input"
        placeholder="Leave a note…"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={handleTextBlur}
        rows={3}
      />
    </div>
  );
}

export default function FilmModal({
  filmId, state, onClose, onStatusChange, onToggleSub, onSaveReview,
}: FilmModalProps) {
  const [tmdb, setTmdb] = useState<TmdbInfo | null>(null);
  const [tmdbLoading, setTmdbLoading] = useState(false);

  useEffect(() => {
    if (!filmId) { setTmdb(null); return; }
    setTmdb(null);
    setTmdbLoading(true);
    fetch(`/api/tmdb/${filmId}`)
      .then((r) => r.ok ? r.json() : null)
      .then((data) => { setTmdb(data); setTmdbLoading(false); })
      .catch(() => setTmdbLoading(false));
  }, [filmId]);

  if (!filmId) return null;
  const film   = getFilm(filmId);
  if (!film) return null;
  const member = getMember(film.picker)!;
  const subs   = state.submissions[filmId] ?? {};
  const revs   = state.reviews[filmId]    ?? {};
  const fs     = state.filmStates[filmId] ?? 'unwatched';

  const slots = [
    { key: 'intro', label: member.name, type: 'Intro Video',     color: member.hex },
    ...MEMBERS.map((m) => ({ key: m.id, label: m.name, type: 'Reaction Video', color: m.hex })),
  ];

  return (
    <div
      className="modal-overlay open"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="modal">
        {/* Header */}
        <div className="modal-header">
          {film.tbd ? (
            <div className="modal-poster modal-poster-tbd">?</div>
          ) : (
            <img
              className="modal-poster"
              src={`/posters/${film.id}.jpg`}
              alt={film.title}
            />
          )}
          <div style={{ flex: 1 }}>
            <div className="modal-title">{film.title}</div>
            <div className="modal-meta">{film.meta}</div>
            <div className="modal-picked-by">
              Picked by{' '}
              <span style={{ color: member.hex, fontWeight: 600 }}>{member.name}</span>
            </div>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          {/* Status */}
          <div className="modal-status-row">
            <div className="modal-status-label">Status</div>
            <div className="status-toggle-group">
              {STATUS_OPTIONS.map(({ value, label }) => (
                <button
                  key={value}
                  className={`status-toggle${fs === value ? ` active-${value}` : ''}`}
                  onClick={() => onStatusChange(filmId, value)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Cast & Crew — Playbill */}
          <div className="playbill" style={{ marginBottom: 24 }}>
            <div className="playbill-rule"><span>◆</span></div>

            {tmdbLoading ? (
              <div className="playbill-loading">Loading…</div>
            ) : tmdb ? (
              <>
                {/* Director — headline billing */}
                {tmdb.director && (
                  <div className="playbill-credit">
                    <div className="playbill-role">Directed by</div>
                    <div className="playbill-name">{tmdb.director}</div>
                  </div>
                )}

                {/* DP + Composer — secondary billing */}
                {(tmdb.dp || tmdb.composer) && (
                  <div className="playbill-secondary">
                    {tmdb.dp && (
                      <div className="playbill-credit">
                        <div className="playbill-role">Cinematography</div>
                        <div className="playbill-name-sm">{tmdb.dp}</div>
                      </div>
                    )}
                    {tmdb.composer && (
                      <div className="playbill-credit">
                        <div className="playbill-role">Original Score</div>
                        <div className="playbill-name-sm">{tmdb.composer}</div>
                      </div>
                    )}
                  </div>
                )}

                {/* Cast */}
                {tmdb.cast.length > 0 && (
                  <>
                    <div className="playbill-rule"><span>◆</span></div>
                    <div className="playbill-starring">Starring</div>
                    <div className="playbill-cast">
                      {tmdb.cast.map((c) => (
                        <div key={c.name} className="playbill-cast-entry">
                          <div className="playbill-cast-name">{c.name}</div>
                          {c.character && (
                            <div className="playbill-cast-as">as {c.character}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* Streaming providers */}
                {tmdb.providers.length > 0 && (
                  <>
                    <div className="playbill-rule"><span>◆</span></div>
                    <div className="playbill-role" style={{ textAlign: 'center', marginBottom: 10 }}>Stream on</div>
                    <div className="providers-row">
                      {tmdb.providers.map((p) => (
                        <img
                          key={p.name}
                          className="provider-logo"
                          src={p.logo}
                          alt={p.name}
                          title={p.name}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="playbill-loading">Not found in database</div>
            )}

            <div className="playbill-rule"><span>◆</span></div>
          </div>

          {/* Hot Dog Rankings */}
          <div className="modal-sec-title" style={{ marginBottom: 14 }}>Hot Dog Ranking</div>
          <div className="ratings-grid" style={{ marginBottom: 24 }}>
            {MEMBERS.map((m) => {
              const rev = revs[m.id] ?? { stars: 0, text: '' };
              return (
                <HotDogInput
                  key={`${filmId}-${m.id}`}
                  memberName={m.name}
                  memberHex={m.hex}
                  initialStars={rev.stars}
                  initialText={rev.text}
                  onSave={(stars, text) => onSaveReview(filmId, m.id, stars, text)}
                />
              );
            })}
          </div>

          {/* Submissions */}
          <div className="modal-sec-title">Video Submissions</div>
          <div className="submissions-grid">
            {slots.map((slot) => {
              const checked = !!subs[slot.key];
              return (
                <div key={slot.key} className="submission-item">
                  <div>
                    <div className="sub-person" style={{ color: slot.color }}>{slot.label}</div>
                    <div className="sub-type">{slot.type}</div>
                  </div>
                  <button
                    className={`sub-check${checked ? ' checked' : ''}`}
                    onClick={() => onToggleSub(filmId, slot.key)}
                  >
                    {checked ? '✓' : ''}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
