import React from 'react';
import './Footer.css';
import { useMediaQuery } from '@/hooks/use-media-query';

export default function Footer() {
  const isMobile = useMediaQuery('(max-width: 530px)');

  return (
    <div>
      {isMobile && (
        <nav className="navFooter">
          <ul>
            <li>
              <a>
                <img src="/assets/icons/homeIcon.png" className="icon" />
                <p>Home</p>
              </a>
            </li>
            <li>
              <a href="./pages/Leaderboard/Leaderboard.tsx">
                <img src="/assets/icons/leaderboardIcon.png" className="icon" />
                <p>Leaderboard</p>
              </a>
            </li>
            <li>
              <a>
                <img src="/assets/icons/plusIcon.png" className="icon" />
                <p>Create</p>
              </a>
            </li>
            <li>
              <a>
                <img src="/assets/icons/peopleIcon.png" className="icon" />
                <p>Community</p>
              </a>
            </li>
            <li>
              <a>
                <img src="/assets/icons/profileIcon.png" className="icon" />
                <p>Profile</p>
              </a>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
