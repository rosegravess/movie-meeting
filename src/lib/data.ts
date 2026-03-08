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
    id: 'princess-mononoke',
    title: 'Princess Mononoke',
    meta: 'Miyazaki · 1997',
    picker: 'clara',
    isNew: false,
    svg: (c) => `<svg viewBox="0 0 30 30" fill="none" stroke="${c}" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="15" cy="17" rx="8" ry="6"/><path d="M9 13 L6 5 L12 10"/><path d="M21 13 L24 5 L18 10"/><circle cx="12" cy="16" r="1.1" fill="${c}"/><circle cx="18" cy="16" r="1.1" fill="${c}"/><path d="M13 19.5 Q15 21 17 19.5"/><path d="M3 26 L3 22 M3 22 L1 24 M3 22 L5 24"/><path d="M27 26 L27 22 M27 22 L25 24 M27 22 L29 24"/></svg>`,
  },
  {
    id: 'punch-drunk-love',
    title: 'Punch Drunk Love',
    meta: 'P.T. Anderson · 2002',
    picker: 'clara',
    isNew: false,
    svg: (c) => `<svg viewBox="0 0 30 30" fill="none" stroke="${c}" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="13" width="22" height="11" rx="1"/><path d="M4 13 Q15 8 26 13"/><line x1="8" y1="13" x2="8" y2="24"/><line x1="12" y1="13" x2="12" y2="24"/><line x1="16" y1="13" x2="16" y2="24"/><line x1="20" y1="13" x2="20" y2="24"/><line x1="7" y1="24" x2="7" y2="28"/><line x1="23" y1="24" x2="23" y2="28"/></svg>`,
  },
  {
    id: 'angels-egg',
    title: "Angel's Egg",
    meta: 'Oshii · 1985',
    picker: 'clara',
    isNew: true,
    svg: (c) => `<svg viewBox="0 0 30 30" fill="none" stroke="${c}" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M15 4 C20 4 24 10 24 16 C24 22 20 27 15 27 C10 27 6 22 6 16 C6 10 10 4 15 4Z"/><path d="M15 19 L13.5 23 L16 21 L14.5 25"/><path d="M19 11 Q24 9 23 14"/></svg>`,
  },
  {
    id: 'fantastic-mr-fox',
    title: 'Fantastic Mr. Fox',
    meta: 'W. Anderson · 2009',
    picker: 'kaitlyn',
    isNew: false,
    svg: (c) => `<svg viewBox="0 0 30 30" fill="none" stroke="${c}" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M15 7 L8 12 L8 22 L15 26 L22 22 L22 12 Z"/><path d="M8 12 L4 5 L10 10"/><path d="M22 12 L26 5 L20 10"/><circle cx="11.5" cy="16" r="1.2" fill="${c}"/><circle cx="18.5" cy="16" r="1.2" fill="${c}"/><ellipse cx="15" cy="20" rx="1.4" ry="0.9" fill="${c}"/><line x1="8.5" y1="19" x2="12" y2="20"/><line x1="21.5" y1="19" x2="18" y2="20"/></svg>`,
  },
  {
    id: 'the-mask',
    title: 'The Mask',
    meta: 'Russell · 1994',
    picker: 'kaitlyn',
    isNew: false,
    svg: (c) => `<svg viewBox="0 0 30 30" fill="none" stroke="${c}" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7 Q15 3 23 7 L25 18 Q22 26 15 28 Q8 26 5 18 Z"/><ellipse cx="11" cy="14" rx="2.3" ry="1.8"/><ellipse cx="19" cy="14" rx="2.3" ry="1.8"/><path d="M9.5 21 Q15 25 20.5 21"/><rect x="10" y="1" width="10" height="4" rx="1"/><line x1="8" y1="5" x2="22" y2="5"/></svg>`,
  },
  {
    id: 'eyes-wide-shut',
    title: 'Eyes Wide Shut',
    meta: 'Kubrick · 1999',
    picker: 'kaitlyn',
    isNew: true,
    svg: (c) => `<svg viewBox="0 0 30 30" fill="none" stroke="${c}" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15 Q4 8 15 8 Q26 8 26 15 Q26 21 21 21 L19 23 L15 25 L11 23 L9 21 Q4 21 4 15Z"/><ellipse cx="10.5" cy="15" rx="2.8" ry="2"/><ellipse cx="19.5" cy="15" rx="2.8" ry="2"/><path d="M12 8 Q15 4 18 8"/><line x1="15" y1="4" x2="15" y2="2.5"/><circle cx="15" cy="2" r="1"/></svg>`,
  },
  {
    id: 'be-kind-rewind',
    title: 'Be Kind Rewind',
    meta: 'Gondry · 2008',
    picker: 'nicholas',
    isNew: true,
    svg: (c) => `<svg viewBox="0 0 30 30" fill="none" stroke="${c}" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="8" width="22" height="16" rx="2"/><circle cx="10" cy="16" r="3"/><circle cx="20" cy="16" r="3"/><line x1="13" y1="16" x2="17" y2="16"/><path d="M7 8 L7 5 L23 5 L23 8"/></svg>`,
  },
  {
    id: 'my-life-as-a-zucchini',
    title: 'My Life as a Zucchini',
    meta: 'Barras · 2016',
    picker: 'nicholas',
    isNew: false,
    svg: (c) => `<svg viewBox="0 0 30 30" fill="none" stroke="${c}" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3 L25 15 L15 27 L5 15 Z"/><line x1="5" y1="15" x2="25" y2="15"/><line x1="15" y1="3" x2="15" y2="27"/><path d="M15 27 Q18 30 15 32 Q12 30 15 28"/></svg>`,
  },
  {
    id: 'the-fall',
    title: 'The Fall',
    meta: 'Singh · 2006',
    picker: 'nicholas',
    isNew: true,
    svg: (c) => `<svg viewBox="0 0 30 30" fill="none" stroke="${c}" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M6 26 L6 13 Q6 4 15 4 Q24 4 24 13 L24 26"/><line x1="4" y1="26" x2="26" y2="26"/><line x1="9.5" y1="26" x2="9.5" y2="14"/><line x1="20.5" y1="26" x2="20.5" y2="14"/><line x1="4" y1="9" x2="26" y2="9"/></svg>`,
  },
  {
    id: 'bugonia',
    title: 'Bugonia',
    meta: 'Kang · 2025',
    picker: 'rhett',
    isNew: true,
    svg: (c) => `<svg viewBox="0 0 30 30" fill="none" stroke="${c}" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="15" cy="19" rx="6" ry="7.5"/><line x1="9.2" y1="17" x2="20.8" y2="17"/><line x1="9.2" y1="21" x2="20.8" y2="21"/><ellipse cx="9" cy="12" rx="3.5" ry="2" transform="rotate(-20 9 12)"/><ellipse cx="21" cy="12" rx="3.5" ry="2" transform="rotate(20 21 12)"/><circle cx="15" cy="10" r="3"/><line x1="13.2" y1="7.4" x2="10.5" y2="5"/><circle cx="10" cy="4.5" r="1"/><line x1="16.8" y1="7.4" x2="19.5" y2="5"/><circle cx="20" cy="4.5" r="1"/></svg>`,
  },
  {
    id: 'shawshank-redemption',
    title: 'The Shawshank Redemption',
    meta: 'Darabont · 1994',
    picker: 'rhett',
    isNew: false,
    svg: (c) => `<svg viewBox="0 0 30 30" fill="none" stroke="${c}" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="6" width="22" height="20" rx="1"/><line x1="9" y1="6" x2="9" y2="26"/><line x1="15" y1="6" x2="15" y2="26"/><line x1="21" y1="6" x2="21" y2="26"/><line x1="4" y1="16" x2="26" y2="16"/><circle cx="15" cy="21" r="2"/><path d="M14 23 L14 26 L16 26 L16 23"/></svg>`,
  },
  {
    id: 'arrival',
    title: 'Arrival',
    meta: 'Villeneuve · 2016',
    picker: 'rhett',
    isNew: true,
    svg: (c) => `<svg viewBox="0 0 30 30" fill="none" stroke="${c}" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="15" cy="18" rx="11" ry="8"/><path d="M4 18 Q15 4 26 18"/><circle cx="15" cy="18" r="2.5"/><line x1="15" y1="15.5" x2="15" y2="8"/></svg>`,
  },

  // ── TBD placeholders ──────────────────────────────────────────────────
  { id: 'tbd-vanessa-1', title: 'TBD', meta: "Vanessa's pick", picker: 'vanessa', isNew: true, tbd: true, svg: () => '' },
  { id: 'tbd-vanessa-2', title: 'TBD', meta: "Vanessa's pick", picker: 'vanessa', isNew: true, tbd: true, svg: () => '' },
  { id: 'tbd-brandon-1', title: 'TBD', meta: "Brandon's pick", picker: 'brandon', isNew: true, tbd: true, svg: () => '' },
  { id: 'tbd-brandon-2', title: 'TBD', meta: "Brandon's pick", picker: 'brandon', isNew: true, tbd: true, svg: () => '' },
  { id: 'tbd-justin-1',  title: 'TBD', meta: "Justin's pick",  picker: 'justin',  isNew: true, tbd: true, svg: () => '' },
  { id: 'tbd-justin-2',  title: 'TBD', meta: "Justin's pick",  picker: 'justin',  isNew: true, tbd: true, svg: () => '' },
  { id: 'tbd-mandy-1',   title: 'TBD', meta: "Mandy's pick",   picker: 'mandy',   isNew: true, tbd: true, svg: () => '' },
  { id: 'tbd-mandy-2',   title: 'TBD', meta: "Mandy's pick",   picker: 'mandy',   isNew: true, tbd: true, svg: () => '' },
];

export function getFilm(id: string) {
  return FILMS.find((f) => f.id === id);
}

export function getMember(id: string) {
  return MEMBERS.find((m) => m.id === id);
}
