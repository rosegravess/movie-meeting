'use client';

import { COUPLES, FILMS, MEMBERS, getMember } from '@/lib/data';
import type { AppState } from '@/lib/types';

interface DashboardViewProps {
  state: AppState;
  onCardClick: (filmId: string) => void;
}

const SUB_KEYS = ['intro', ...MEMBERS.map((m) => m.id)];

export default function DashboardView({ state, onCardClick }: DashboardViewProps) {
  const realFilms = FILMS.filter((f) => !f.tbd);
  const watched   = realFilms.filter((f) => state.filmStates[f.id] === 'watched').length;
  const remaining = realFilms.filter((f) => (state.filmStates[f.id] ?? 'unwatched') === 'unwatched').length;
  const pct       = Math.round((watched / (realFilms.length || 1)) * 100);

  const cur       = FILMS.find((f) => state.filmStates[f.id] === 'current');
  const curWeek   = cur ? state.weeks.find((w) => w.filmId === cur.id) : null;
  const curMember = cur ? getMember(cur.picker) : null;

  let totalVideos = 0;
  Object.values(state.submissions).forEach((s) =>
    Object.values(s).forEach((v) => { if (v) totalVideos++; })
  );

  return (
    <div>
      {/* Progress hero */}
      <div className="progress-hero">
        <div>
          <div className="hero-eyebrow">Season I</div>
          <div className="hero-title">
            Movie<br /><strong>Meeting</strong>
          </div>
          <div className="hero-sub">
            {COUPLES.map((c, i) => (
              <span key={c.label}>
                {i > 0 && ' · '}
                {c.label}
              </span>
            ))}
          </div>
          <div className="progress-bar-wrap">
            <div className="progress-bar-track">
              <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
            </div>
            <div className="progress-nums">
              <span>{watched} of {realFilms.length} films watched</span>
              <span>{pct}%</span>
            </div>
          </div>
        </div>
        <div className="stat-pills">
          <div className="stat-pill">
            <div className="stat-pill-num" style={{ color: 'var(--acid)' }}>{watched}</div>
            <div className="stat-pill-label">Watched</div>
          </div>
          <div className="stat-pill">
            <div className="stat-pill-num" style={{ color: 'var(--lav)' }}>{totalVideos}</div>
            <div className="stat-pill-label">Videos In</div>
          </div>
          <div className="stat-pill">
            <div className="stat-pill-num" style={{ color: 'var(--sky)' }}>{remaining}</div>
            <div className="stat-pill-label">Remaining</div>
          </div>
        </div>
      </div>

      {/* Current pick banner */}
      {cur && curMember && !cur.tbd && (
        <div className="current-pick-banner">
          <img
            className="pick-poster"
            src={`/posters/${cur.id}.jpg`}
            alt={cur.title}
          />
          <div className="pick-content">
            <div className="pick-label">Now Playing</div>
            <div className="pick-title">{cur.title}</div>
            <div className="pick-meta">{cur.meta}</div>
            <div className="pick-by">
              Picked by <span style={{ color: curMember.hex }}>{curMember.name} & {curMember.partner}</span>
            </div>
          </div>
          <div className="pick-week">
            <div className="pick-week-num">{curWeek?.weekNum ?? '—'}</div>
            <div className="pick-week-label">Week</div>
          </div>
        </div>
      )}

      {/* Films grid — organised by couple */}
      <div className="sec-head">
        <div className="sec-head-title">All Films</div>
        <div className="sec-head-line" />
      </div>

      <div className="couples-grid">
        {COUPLES.map((couple) => {
          const coupleMembers = couple.memberIds.map((id) => MEMBERS.find((m) => m.id === id)!);
          const coupleFilms   = FILMS.filter((f) => couple.memberIds.includes(f.picker));

          return (
            <div key={couple.label} className="couple-section">
              {/* Couple header */}
              <div className="couple-header">
                <div className="couple-header-dots">
                  {coupleMembers.map((m) => (
                    <div key={m.id} className="couple-dot" style={{ background: m.hex }} />
                  ))}
                </div>
                <span>{couple.label}</span>
              </div>

              {/* All films for this couple */}
              {coupleFilms.map((film) => {
                const member = getMember(film.picker)!;
                const fs     = state.filmStates[film.id] ?? 'unwatched';
                const subs   = state.submissions[film.id] ?? {};

                let cardClass = 'film-card';
                if (fs === 'current') cardClass += ' fc-current';
                if (fs === 'watched') cardClass += ' fc-watched';

                let badge: React.ReactNode = null;
                if (fs === 'current')      badge = <div className="badge badge-pick">&#9658; Now</div>;
                else if (fs === 'watched') badge = <div className="badge badge-done">&#10003; Seen</div>;
                else if (film.isNew)       badge = <div className="badge badge-new">New</div>;

                return (
                  <div key={film.id} className={cardClass} onClick={() => onCardClick(film.id)}>
                    <div className="fc-bar" style={{ background: member.hex }} />

                    {film.tbd ? (
                      <div className="fc-poster-tbd">?</div>
                    ) : (
                      <img
                        className="fc-poster"
                        src={`/thumbnails/${film.id}-thumbnail.png`}
                        alt={film.title}
                      />
                    )}

                    <div className="fc-body">
                      <div className="fc-title">{film.tbd ? 'TBD' : film.title}</div>
                      <div className="fc-sub">{film.tbd ? 'To be chosen' : film.meta}</div>
                    </div>

                    {!film.tbd && (
                      <>
                        <div className="fc-badges">{badge}</div>
                        <div className="sub-dots">
                          {SUB_KEYS.map((k) => (
                            <div key={k} className={`sub-dot${subs[k] ? ' filled' : ''}`} />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
