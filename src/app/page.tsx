'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Header, { type View } from '@/components/Header';
import DashboardView from '@/components/DashboardView';
import DrawView      from '@/components/DrawView';
import LogView       from '@/components/LogView';
import MembersView   from '@/components/MembersView';
import FilmsView     from '@/components/FilmsView';
import FilmModal     from '@/components/FilmModal';
import Confetti      from '@/components/Confetti';
import { FILMS, getMember } from '@/lib/data';
import { playTick, playWinner, EBM9_NOTES } from '@/lib/sounds';
import type { AppState, FilmStatus } from '@/lib/types';

const EMPTY_STATE: AppState = { filmStates: {}, submissions: {}, weeks: [], reviews: {} };

export default function Home() {
  const [view,          setView]          = useState<View>('dashboard');
  const [appState,      setAppState]      = useState<AppState>(EMPTY_STATE);
  const [modalFilmId,   setModalFilmId]   = useState<string | null>(null);
  const [isSpinning,    setIsSpinning]    = useState(false);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [resultVisible, setResultVisible] = useState(false);
  const [resultTitle,   setResultTitle]   = useState('');
  const [resultSub,     setResultSub]     = useState('');
  const [resultFilmId,  setResultFilmId]  = useState<string | null>(null);
  const [confettiKey,   setConfettiKey]   = useState(0);

  const pendingFilmId = useRef<string | null>(null);
  const spinTimeout   = useRef<ReturnType<typeof setTimeout> | null>(null);

  const reload = useCallback(async () => {
    try {
      const res = await fetch('/api/state');
      const fresh = await res.json();
      if (res.ok) setAppState(fresh);
      else console.error('[reload] /api/state error:', fresh);
    } catch (err) {
      console.error('[reload] fetch failed:', err);
    }
  }, []);

  useEffect(() => { reload(); }, [reload]);

  // ── Draw ──────────────────────────────────────────────────────────────
  const getRemaining = useCallback(
    () => FILMS.filter((f) => !f.tbd && (appState.filmStates[f.id] ?? 'unwatched') === 'unwatched'),
    [appState.filmStates]
  );

  const cancelDraw = useCallback(() => {
    if (spinTimeout.current) clearTimeout(spinTimeout.current);
    pendingFilmId.current = null;
    setIsSpinning(false);
    setHighlightedId(null);
    setResultVisible(false);
    setResultFilmId(null);
  }, []);

  const startDraw = useCallback(() => {
    if (isSpinning) return;
    const remaining = getRemaining();
    if (remaining.length === 0) return;

    // Exclude films by whoever picked the current film so no member goes back-to-back
    const currentFilm  = FILMS.find((f) => appState.filmStates[f.id] === 'current');
    const excludePicker = currentFilm?.picker ?? null;
    const pool         = excludePicker ? remaining.filter((f) => f.picker !== excludePicker) : remaining;
    const drawPool     = pool.length > 0 ? pool : remaining; // fallback if only one member left

    // Pick winner upfront — spin is choreographed to land on it
    const pick        = drawPool[Math.floor(Math.random() * drawPool.length)];
    const winnerIdx   = remaining.findIndex((f) => f.id === pick.id);
    const fullLaps    = 4 + Math.floor(Math.random() * 4); // 4–7 full loops
    const totalSteps  = fullLaps * remaining.length + winnerIdx + 1;

    setIsSpinning(true);
    setResultVisible(false);
    setHighlightedId(null);

    let step = 0;

    const spin = () => {
      if (step >= totalSteps) {
        // Selector has landed on the winner
        pendingFilmId.current = pick.id;
        setHighlightedId(null);
        setIsSpinning(false);
        const mem = getMember(pick.picker)!;
        setResultTitle(pick.title);
        setResultSub(`${pick.meta} · Picked by ${mem.name}`);
        setResultFilmId(pick.id);
        setResultVisible(true);
        playWinner();
        return;
      }

      const currentFilm = remaining[step % remaining.length];
      setHighlightedId(currentFilm.id);

      // Each film gets a fixed note from Eb maj9 via a zigzag pattern:
      // period-8 triangle: 0→Eb4, 1→G4, 2→Bb4, 3→D5, 4→F5, 3→D5, 2→Bb4, 1→G4, repeat
      const filmIdx = FILMS.findIndex((f) => f.id === currentFilm.id);
      const pos      = filmIdx % 8;
      const noteIdx  = pos <= 4 ? pos : 8 - pos;
      playTick(EBM9_NOTES[noteIdx]);
      step++;

      const progress = step / totalSteps;
      let interval: number;

      if (progress < 0.2) {
        // Ease in: start slow and build up  280ms → 90ms
        const t = progress / 0.2;
        interval = 280 - t * 190;
      } else if (progress < 0.55) {
        // Full speed plateau
        interval = 90;
      } else {
        // Ease out: cubic slow-down back to a crawl  90ms → 520ms
        const t = (progress - 0.55) / 0.45;
        interval = 90 + t * t * t * 430;
      }

      spinTimeout.current = setTimeout(spin, interval);
    };

    spin();
  }, [isSpinning, getRemaining, appState.filmStates]);

  const handleDraw = useCallback(() => {
    setView('draw');
    setTimeout(startDraw, 50);
  }, [startDraw]);

  const confirmDraw = useCallback(async () => {
    const filmId = pendingFilmId.current;
    if (!filmId) return;

    const currentFilm = FILMS.find((f) => appState.filmStates[f.id] === 'current');
    if (currentFilm) {
      await fetch(`/api/films/${currentFilm.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'watched' }),
      });
    }
    await fetch(`/api/films/${filmId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'current' }),
    });
    await fetch('/api/weeks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        filmId,
        weekNum: appState.weeks.length + 1,
        date: new Date().toISOString().split('T')[0],
      }),
    });

    pendingFilmId.current = null;
    setResultVisible(false);
    setHighlightedId(null);
    setConfettiKey((k) => k + 1);
    await reload();
  }, [appState, reload]);

  const redraw = useCallback(() => {
    if (spinTimeout.current) clearTimeout(spinTimeout.current);
    pendingFilmId.current = null;
    setResultVisible(false);
    setHighlightedId(null);
    startDraw();
  }, [startDraw]);

  // ── Status / submissions / reviews ────────────────────────────────────
  const handleStatusChange = useCallback(async (filmId: string, status: FilmStatus) => {
    await fetch(`/api/films/${filmId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    await reload();
  }, [reload]);

  const handleToggleSub = useCallback(async (filmId: string, memberId: string) => {
    await fetch('/api/submissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filmId, memberId }),
    });
    await reload();
  }, [reload]);

  const handleSaveReview = useCallback(async (
    filmId: string, memberId: string, stars: number, text: string
  ) => {
    await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filmId, memberId, stars, text }),
    });
    await reload();
  }, [reload]);

  return (
    <>
      <Header activeView={view} onViewChange={setView} />

      <main className="main">
        {view === 'dashboard' && (
          <DashboardView state={appState} onCardClick={setModalFilmId} />
        )}
        {view === 'draw' && (
          <DrawView
            state={appState}
            highlightedId={highlightedId}
            isSpinning={isSpinning}
            resultVisible={resultVisible}
            resultTitle={resultTitle}
            resultSub={resultSub}
            resultFilmId={resultFilmId}
            onDraw={startDraw}
            onConfirm={confirmDraw}
            onRedraw={redraw}
            onCancel={cancelDraw}
            onCardClick={setModalFilmId}
          />
        )}
        {view === 'log'      && <LogView      state={appState} />}
        {view === 'members'  && <MembersView  state={appState} />}
        {view === 'films' && (
          <FilmsView state={appState} onCardClick={setModalFilmId} />
        )}
      </main>

      {modalFilmId && (
        <FilmModal
          filmId={modalFilmId}
          state={appState}
          onClose={() => setModalFilmId(null)}
          onStatusChange={handleStatusChange}
          onToggleSub={handleToggleSub}
          onSaveReview={handleSaveReview}
        />
      )}

      <Confetti trigger={confettiKey} />
    </>
  );
}
