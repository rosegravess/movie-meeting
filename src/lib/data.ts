import type { Film, Member } from './types';

export const MEMBERS: Member[] = [
  { id: 'clara',    name: 'Clara',    partner: 'Nicholas', color: 'var(--sky)',  hex: '#1A6496' },
  { id: 'kaitlyn',  name: 'Kaitlyn',  partner: 'Rhett',    color: 'var(--lav)',  hex: '#7C4A9E' },
  { id: 'nicholas', name: 'Nicholas', partner: 'Clara',    color: 'var(--acid)', hex: '#3A7840' },
  { id: 'rhett',    name: 'Rhett',    partner: 'Kaitlyn',  color: 'var(--gold)', hex: '#B8860B' },
  { id: 'vanessa',  name: 'Vanessa',  partner: 'Brandon',  color: 'var(--coral)', hex: '#9E4A6B' },
  { id: 'brandon',  name: 'Brandon',  partner: 'Vanessa',  color: 'var(--sky)',   hex: '#4A6B8B' },
  { id: 'justin',   name: 'Justin',   partner: 'Mandy',    color: 'var(--gold)',  hex: '#6B4A2A' },
  { id: 'mandy',    name: 'Mandy',    partner: 'Justin',   color: 'var(--acid)',  hex: '#2A7A6B' },
];

export const COUPLES: { label: string; memberIds: [string, string] }[] = [
  { label: 'Rhett & Kaitlyn',   memberIds: ['rhett',   'kaitlyn']  },
  { label: 'Nicholas & Clara',  memberIds: ['nicholas', 'clara']   },
  { label: 'Vanessa & Brandon', memberIds: ['vanessa', 'brandon']  },
  { label: 'Justin & Mandy',    memberIds: ['justin',  'mandy']    },
];

export const FILMS: Film[] = [
  {
    id: 'everything-everywhere-all-at-once',
    title: 'Everything Everywhere All at Once',
    meta: 'Kwan & Scheinert · 2022',
    picker: 'kaitlyn',
    isNew: false,
    svg: (c) => `<svg viewBox="0 0 30 30" fill="none" stroke="${c}" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><circle cx="15" cy="15" r="10"/><circle cx="15" cy="15" r="4"/><circle cx="11" cy="9.5" r="1" fill="${c}" stroke="none"/><circle cx="18" cy="9" r="1" fill="${c}" stroke="none"/><circle cx="22" cy="14" r="1" fill="${c}" stroke="none"/><circle cx="20" cy="21" r="1" fill="${c}" stroke="none"/><circle cx="13" cy="22" r="1" fill="${c}" stroke="none"/><circle cx="8" cy="18" r="1" fill="${c}" stroke="none"/><circle cx="8" cy="11" r="1" fill="${c}" stroke="none"/></svg>`,
  },
  {
    id: 'the-big-lebowski',
    title: 'The Big Lebowski',
    meta: 'Coen Brothers · 1998',
    picker: 'rhett',
    isNew: true,
    svg: (c) => `<svg viewBox="0 0 30 30" fill="none" stroke="${c}" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><circle cx="15" cy="15" r="11"/><circle cx="10.5" cy="12" r="1.8" fill="${c}" stroke="none"/><circle cx="15" cy="11" r="1.8" fill="${c}" stroke="none"/><circle cx="19.5" cy="12" r="1.8" fill="${c}" stroke="none"/></svg>`,
  },
  {
    id: 'memories-of-murder',
    title: 'Memories of Murder',
    meta: 'Bong · 2003',
    picker: 'clara',
    isNew: false,
    svg: (c) => `<svg viewBox="0 0 30 30" fill="none" stroke="${c}" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8"/><line x1="17.5" y1="17.5" x2="25.5" y2="25.5" stroke-width="2.5"/></svg>`,
  },
  {
    id: 'challengers',
    title: 'Challengers',
    meta: 'Guadagnino · 2024',
    picker: 'nicholas',
    isNew: true,
    svg: (c) => `<svg viewBox="0 0 30 30" fill="none" stroke="${c}" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><circle cx="15" cy="15" r="11"/><path d="M5.5 10 C9.5 15 9.5 15 5.5 20"/><path d="M24.5 10 C20.5 15 20.5 15 24.5 20"/></svg>`,
  },
  {
    id: 'christopher-robin',
    title: 'Christopher Robin',
    meta: 'Forster · 2018',
    picker: 'vanessa',
    isNew: false,
    svg: (c) => `<svg viewBox="0 0 30 30" fill="none" stroke="${c}" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M8 15 L8 23 Q8 27 15 27 Q22 27 22 23 L22 15 Z"/><ellipse cx="15" cy="15" rx="7" ry="2"/><ellipse cx="15" cy="10" rx="5" ry="3.5"/><rect x="11" y="18" width="8" height="5" rx="1"/></svg>`,
  },
  {
    id: 'watchmen',
    title: 'Watchmen',
    meta: 'Snyder · 2009',
    picker: 'brandon',
    isNew: true,
    svg: (c) => `<svg viewBox="0 0 30 30" fill="none" stroke="${c}" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><circle cx="15" cy="16" r="11"/><circle cx="11" cy="13.5" r="1.3" fill="${c}" stroke="none"/><circle cx="19" cy="13.5" r="1.3" fill="${c}" stroke="none"/><path d="M10 20.5 Q15 25 20 20.5"/><path d="M22 3 Q24 1 26 3 Q26.5 6 24 6.5 Q21.5 6 22 3Z" fill="${c}" stroke="none"/></svg>`,
  },

  // ── TBD placeholders ──────────────────────────────────────────────────
  { id: 'tbd-justin-1', title: 'TBD', meta: "Justin's pick",  picker: 'justin', isNew: false, tbd: true, svg: () => '' },
  { id: 'tbd-mandy-1',  title: 'TBD', meta: "Mandy's pick",   picker: 'mandy',  isNew: false, tbd: true, svg: () => '' },
];

export function getFilm(id: string) {
  return FILMS.find((f) => f.id === id);
}

export function getMember(id: string) {
  return MEMBERS.find((m) => m.id === id);
}
