import React from 'react';
import './Hero.css';
import { useMediaQuery } from '@/hooks/use-media-query';
import Carousel from '../Carousel/Carousel';
import BulletinBoard from '../BulletinBoard/BulletinBoard';

export default function Hero() {
  const title = 'SERVIFY';
  const subtitle = 'Discover, Connect, and Serve with Ease';
  const text =
    'Servify simplifies finding and creating volunteer opportunities for individuals and organizations alike. Join a vibrant community, promote your events effortlessly, and amplify your impact with our powerful, free tools.';

  const carouselSlides = [
    {
      backgroundImage: '/assets/hero/hero1.jpg',
      title: title,
      subtitle: subtitle,
      text: text,
    },
    {
      backgroundImage: '/assets/hero/hero2.jpg',
      title: title,
      subtitle: subtitle,
      text: text,
    },
    {
      backgroundImage: '/assets/hero/hero3.jpg',
      title: title,
      subtitle: subtitle,
      text: text,
    },
  ];

  const isDesktop = useMediaQuery('(min-width: 530px)');

  return (
    <div>
      {isDesktop && (
        <div className="laptop-container">
          <Carousel slides={carouselSlides} />
        </div>
      )}
      {!isDesktop && (
        <div>
          <h1 className="logo">SERVIFY</h1>
          <div className="mobile-container">
            <BulletinBoard />
          </div>
        </div>
      )}
    </div>
  );
}
