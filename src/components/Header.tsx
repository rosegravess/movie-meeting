'use client';

export type View = 'dashboard' | 'draw' | 'log' | 'members' | 'films';

const NAV: { id: View; label: string }[] = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'draw',      label: 'Draw' },
  { id: 'log',       label: 'Log' },
  { id: 'members',   label: 'Members' },
  { id: 'films',     label: 'Films' },
];

interface HeaderProps {
  activeView: View;
  onViewChange: (v: View) => void;
}

export default function Header({ activeView, onViewChange }: HeaderProps) {
  return (
    <header className="site-header">
      <div className="logo">Movie Meeting</div>
      <nav className="header-nav">
        {NAV.map((n) => (
          <button
            key={n.id}
            className={`nav-btn${activeView === n.id ? ' active' : ''}`}
            onClick={() => onViewChange(n.id)}
          >
            {n.label}
          </button>
        ))}
      </nav>
    </header>
  );
}
