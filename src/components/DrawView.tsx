'use client';

import { FILMS, getMember } from '@/lib/data';
import type { AppState } from '@/lib/types';

interface DrawViewProps {
  state: AppState;
  highlightedId: string | null;
  isSpinning: boolean;
  resultVisible: boolean;
  resultTitle: string;
  resultSub: string;
  resultFilmId: string | null;
  onDraw: () => void;
  onConfirm: () => void;
  onRedraw: () => void;
  onCancel: () => void;
  onCardClick: (filmId: string) => void;
}

export default function DrawView({
  state, highlightedId, isSpinning,
  resultVisible, resultTitle, resultSub, resultFilmId,
  onDraw, onConfirm, onRedraw, onCancel, onCardClick,
}: DrawViewProps) {
  const remaining = FILMS.filter((f) => !f.tbd && state.filmStates[f.id] === 'unwatched').length;

  return (
    <div>
      <div className="sec-head" style={{ marginBottom: 28 }}>
        <div className="sec-head-title">Weekly Draw</div>
        <div className="sec-head-line" />
      </div>

      {/* Reel grid */}
      <div className="reel-grid">
        {FILMS.filter((f) => !f.tbd).map((film) => {
          const fs     = state.filmStates[film.id] ?? 'unwatched';
          const member = getMember(film.picker)!;
          const isHighlighted = highlightedId === film.id;

          let cardClass = 'reel-card';
          if (isHighlighted)                                    cardClass += ' highlighted';
          else if (resultVisible && film.id === resultFilmId)   cardClass += ' winner';
          else if (fs === 'current')                            cardClass += ' chosen';
          else if (fs === 'watched')                            cardClass += ' prev-pick';
          else                                                  cardClass += ' idle';

          return (
            <div
              key={film.id}
              id={`reel-card-${film.id}`}
              className={cardClass}
              onClick={() => onCardClick(film.id)}
            >
              <img
                className="reel-card-poster"
                src={`/thumbnails/${film.id}-thumbnail.png`}
                alt={film.title}
              />
              <div className="reel-card-footer" style={{ borderTop: `2px solid ${fs === 'watched' ? 'transparent' : member.hex + '55'}` }}>
                <div className="reel-card-title" style={{ color: fs === 'watched' ? '#3A3A50' : member.hex }}>
                  {film.title}
                </div>
                <div className="reel-card-picker" style={{ color: fs === 'watched' ? '#2A2A3A' : member.hex + '88' }}>
                  {member.name}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Draw area */}
      <div className="draw-area">
        <button
          className={`draw-btn${isSpinning ? ' spinning' : ''}`}
          onClick={onDraw}
          disabled={isSpinning || remaining === 0}
        >
          <div className="draw-btn-outer">
            <span className="deco-corner deco-tl" />
            <span className="deco-corner deco-tr" />
            <span className="deco-corner deco-bl" />
            <span className="deco-corner deco-br" />
            <div className="draw-btn-inner">
              <div className="draw-deco-rule"><span>◆</span></div>
              <div className="draw-label">{isSpinning ? 'Drawing…' : remaining === 0 ? 'All Done' : 'Draw'}</div>
              <div className="draw-sub">{remaining === 0 ? 'season complete' : 'a film'}</div>
              <div className="draw-deco-rule"><span>◆</span></div>
            </div>
          </div>
        </button>

        <div className="draw-remaining">
          <span>{remaining}</span> films remaining in pool
        </div>

        {/* Cancel button while spinning */}
        {isSpinning && (
          <button className="btn-cancel-draw" onClick={onCancel}>
            ✕ cancel
          </button>
        )}

        {/* Result panel */}
        <div className={`result-panel${resultVisible ? ' visible' : ''}`}>
          {resultFilmId && (
            <img
              className="result-poster"
              src={`/posters/${resultFilmId}.jpg`}
              alt={resultTitle}
            />
          )}
          <div className="result-panel-body">
          <div className="result-confirm-label">Selected Film</div>
          <div className="result-film-title">{resultTitle}</div>
          <div className="result-film-sub">{resultSub}</div>
          <div className="result-actions">
            <button className="btn-confirm" onClick={onConfirm}>✓ Confirm this pick</button>
            <button className="btn-redraw"  onClick={onRedraw}>↺ Draw again</button>
            <button className="btn-cancel"  onClick={onCancel}>✕ Cancel</button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
