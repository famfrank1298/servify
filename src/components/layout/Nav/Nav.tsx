import './Nav.css';
import { ModeToggle } from '@/components/ModeToggle';

export default function Nav() {
  return (
    <header>
      <div className="hardHeader">
        <h2>
          <a href="/">Servify</a>
        </h2>
        <ModeToggle />
      </div>
      <nav className="islandNav">
        <ul>
          <li>
            <a href="/">ABOUT</a>
          </li>
          <li>
            <a href="/">LEADERBOARD</a>
          </li>
          <li>
            <a href="/">PROFILE</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
