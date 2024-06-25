'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

import './Carousel.css';

import { Autoplay, Parallax, Navigation } from 'swiper/modules';

interface CarouselProps {
  slides: {
    backgroundImage: string;
    title: string;
    subtitle: string;
    text: string;
  }[];
}

const Carousel: React.FC<CarouselProps> = ({ slides }) => {
  return (
    <Swiper
      speed={1000}
      autoplay={{
        delay: 5500,
        disableOnInteraction: false,
      }}
      loop={true}
      parallax={true}
      navigation={true}
      modules={[Autoplay, Parallax, Navigation]}
      className="swiper-container"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index} className="parallax-bg">
          <div className="title" data-swiper-parallax="-300">
            {slide.title}
          </div>
          <div className="subtitle" data-swiper-parallax="-200">
            {slide.subtitle}
          </div>
          <div className="text" data-swiper-parallax="-100">
            <p>{slide.text}</p>
          </div>
          <img
            className="carousel-img"
            src={slide.backgroundImage}
            alt={`Image ${index + 1}`}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
