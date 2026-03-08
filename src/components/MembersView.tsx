'use client';

import { useState } from 'react';
import { FILMS, MEMBERS } from '@/lib/data';
import { getHotDog } from '@/components/FilmModal';
import type { AppState } from '@/lib/types';

export default function MembersView({ state }: MembersViewProps) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div>
      <div className="sec-head" style={{ marginBottom: 28 }}>
        <div className="sec-head-title">Members</div>
        <div className="sec-head-line" />
      </div>

      <div className="members-view-grid">
        {MEMBERS.map((member) => {
          const isOpen = selected === member.id;

          let totalVideos = 0;
          FILMS.forEach((f) => {
            const subs = state.submissions[f.id] ?? {};
            if (subs[member.id]) totalVideos++;
            if (f.picker === member.id && subs['intro']) totalVideos++;
          });

          const myFilms = FILMS.filter((f) => f.picker === member.id);

          // All films this member has reviewed (stars > 0 or text)
          const myReviews = FILMS.flatMap((f) => {
            const rev = state.reviews[f.id]?.[member.id];
            if (!rev || (rev.stars === 0 && !rev.text.trim())) return [];
            return [{ film: f, stars: rev.stars, text: rev.text }];
          });

          return (
            <div key={member.id} className="member-card">
              {/* Header — clickable to expand */}
              <div
                className="member-card-header"
                onClick={() => setSelected(isOpen ? null : member.id)}
              >
                <div className="member-accent-bar" style={{ background: member.hex }} />
                <div>
                  <div className="member-card-name" style={{ color: member.hex }}>
                    {member.name}
                  </div>
                  <div className="member-card-partner">with {member.partner}</div>
                </div>
                <div className="member-vid-count">
                  <div className="member-vid-big" style={{ color: member.hex }}>{totalVideos}</div>
                  <div className="member-vid-label">Videos Sent</div>
                </div>
                <div className={`member-chevron${isOpen ? ' open' : ''}`}>▾</div>
              </div>

              {/* Picks — always visible */}
              <div className="member-card-films">
                {myFilms.map((f) => {
                  const fs = state.filmStates[f.id] ?? 'unwatched';
                  return (
                    <div key={f.id} className="member-film-row">
                      <div className="mfr-dot" style={{ background: member.hex }} />
                      <div className="mfr-title">{f.title}</div>
                      <div className={`mfr-status ${fs}`}>
                        {fs === 'watched' ? '✓ watched' : fs === 'current' ? '▶ now' : 'upcoming'}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Expanded reviews panel */}
              {isOpen && (
                <div className="member-reviews-panel">
                  <div className="member-reviews-title">Reviews</div>

                  {myReviews.length === 0 ? (
                    <div className="member-no-reviews">No reviews left yet</div>
                  ) : (
                    myReviews.map(({ film, stars, text }) => {
                      return (
                        <div key={film.id} className="member-review-item">
                          <img
                            className="mri-icon"
                            src={`/thumbnails/${film.id}-thumbnail.png`}
                            alt={film.title}
                          />
                          <div className="mri-body">
                            <div className="mri-film">{film.title}</div>
                            {stars > 0 && (
                              <div className="mri-hotdog">🌭 {getHotDog(stars)}</div>
                            )}
                            {text.trim() && (
                              <div className="mri-text">&ldquo;{text}&rdquo;</div>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
