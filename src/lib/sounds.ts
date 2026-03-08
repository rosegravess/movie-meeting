let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!ctx) {
    ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

// Eb major 9 chord tones: Eb4 · G4 · Bb4 · D5 · F5
export const EBM9_NOTES = [311.13, 392.00, 466.16, 587.33, 698.46] as const;

/** Short tick at the given frequency — call on every highlighted-card change during spin. */
export function playTick(freq: number = 440) {
  const ac = getCtx();
  if (!ac) return;

  const osc  = ac.createOscillator();
  const gain = ac.createGain();
  osc.connect(gain);
  gain.connect(ac.destination);

  osc.type = 'sine';
  osc.frequency.value = freq;

  const now = ac.currentTime;
  gain.gain.setValueAtTime(0.022, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

  osc.start(now);
  osc.stop(now + 0.09);
}

/** Eb major 9 chord strum (Eb3·G4·Bb4·D5·F5) — jazzy winner reveal. */
export function playWinner() {
  const ac = getCtx();
  if (!ac) return;

  // Eb maj9 voicing strummed upward: Eb3 (bass), G4, Bb4, D5, F5
  const chord: { freq: number; gain: number; delay: number }[] = [
    { freq: 155.56, gain: 0.07, delay: 0.000 }, // Eb3  — bass
    { freq: 392.00, gain: 0.05, delay: 0.055 }, // G4   — major 3rd
    { freq: 466.16, gain: 0.04, delay: 0.110 }, // Bb4  — 5th
    { freq: 587.33, gain: 0.04, delay: 0.165 }, // D5   — major 7th
    { freq: 698.46, gain: 0.04, delay: 0.220 }, // F5   — 9th
  ];

  chord.forEach(({ freq, gain: peak, delay }) => {
    const t = ac.currentTime + delay;

    // Two slightly detuned triangle oscillators for warmth
    ([0, -4] as const).forEach((detuneCents, j) => {
      const osc  = ac.createOscillator();
      const gain = ac.createGain();
      osc.connect(gain);
      gain.connect(ac.destination);

      osc.type = 'triangle';
      osc.frequency.value = freq;
      osc.detune.value = detuneCents;

      const g = j === 0 ? peak : peak * 0.35;
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(g, t + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 1.8);

      osc.start(t);
      osc.stop(t + 1.8);
    });
  });
}
