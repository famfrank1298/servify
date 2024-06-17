import React from 'react';
import './Footer.css';
import { useMediaQuery } from '@/hooks/use-media-query';

export default function Footer() {
  const isMobile = useMediaQuery('(max-width: 530px)');

  return (
    <footer>
      {isMobile ? (
        <nav className="navFooter">
          <ul>
            <li>
              <a>
                <img src="/assets/icons/homeIcon.png" className="icon" />
                <p>Home</p>
              </a>
            </li>
            <li>
              <a>
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
      ) : (
        <div className="desktopFooter">
          <ul>
            <li>
              <a href="/">About</a>
            </li>
            <li>
              <a href="/">Leaderboard</a>
            </li>
            <li>
              <a href="/">Create</a>
            </li>
            <li>
              <a href="/">About</a>
            </li>
            <li>
              <a href="/">Contact</a>
            </li>
          </ul>
          <h4 className="slogan">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
            dolorem nesciunt obcaecati, molestias vero fuga nobis id adipisci
            vel doloribus, recusandae libero veniam tempora quas!
          </h4>
          <h1 className="copyright">
            © Copyright 2024 Servify All Rights Reserved.
          </h1>
        </div>
      )}
    </footer>
  );
}
