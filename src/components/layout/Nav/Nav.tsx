import { useMediaQuery } from '@/hooks/use-media-query';
import './Nav.css';
import { ModeToggle } from '@/components/ModeToggle';

export default function Nav() {
  const isDesktop = useMediaQuery('(min-width: 530px)');
  return (
    <header className="nav">
      <div className="hardHeader">
        <h2>
          <a href="/">Servify</a>
        </h2>
        <ModeToggle />
      </div>

      {isDesktop && (
        <nav className="islandNav">
          <ul>
            <li>
              <a href="/">ABOUT</a>
            </li>
            <li>
              <a href="./pages/Leaderboard/Leaderboard.tsx">LEADERBOARD</a>
            </li>
            <li>
              <a href="/">PROFILE</a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
