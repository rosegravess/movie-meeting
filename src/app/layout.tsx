import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Movie Meeting',
  description: 'A film club tracker.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,700&family=Syne:wght@400;500;600;700;800&family=Syne+Mono&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <footer className="site-footer">
          <div className="footer-logo">Movie Meeting</div>
          <div className="footer-pips">
            <div className="footer-pip" style={{ background: 'var(--coral)' }} />
            <div className="footer-pip" style={{ background: 'var(--lav)' }} />
            <div className="footer-pip" style={{ background: 'var(--sky)' }} />
            <div className="footer-pip" style={{ background: 'var(--acid)' }} />
            <div className="footer-pip" style={{ background: 'var(--gold)' }} />
          </div>
          <div className="footer-right">Dies Mercurii · Season I</div>
        </footer>
      </body>
    </html>
  );
}
