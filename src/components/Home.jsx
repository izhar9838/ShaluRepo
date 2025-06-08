import React, { useRef, useState, useEffect } from 'react';
import useBackgroundSlideshow from './useBackgroundSlideShow';

const Home = () => {
  const sectionRef = useRef(null);
  const [hasAnimatedOnLoad, setHasAnimatedOnLoad] = useState(false);
  const { backgroundImages, currentImageIndex, prevImageIndex } = useBackgroundSlideshow();

  // Intersection Observer for initial load animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedOnLoad) {
            entry.target.classList.add('animate-on-scroll-up');
            setHasAnimatedOnLoad(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasAnimatedOnLoad]);

  return (
    <>
      <style>
        {`
          @keyframes appear {
            from {
              opacity: 0;
              transform: translateY(50%);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .hero-section {

            margin-top: 7rem;
            left: 0;
            right: 0;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            padding-top: 10vh;
            z-index: 10;
            opacity: 0;
          }
          .hero-section.animate-on-scroll-up {
            animation: appear 0.8s ease-in-out;
            animation-iteration-count: 1;
            animation-fill-mode: forwards;
          }
          .hero-heading {
            opacity: 0;
          }
          .hero-subheading {
            opacity: 0;
          }
          .hero-section.animate-on-scroll-up .hero-heading {
            animation: appear 0.8s ease-in-out;
            animation-iteration-count: 1;
            animation-fill-mode: forwards;
          }
          .hero-section.animate-on-scroll-up .hero-subheading {
            animation: appear 0.8s ease-in-out 0.4s;
            animation-iteration-count: 1;
            animation-fill-mode: forwards;
          }
          /* Responsive adjustments for mobile and tablet */
          @media (max-width: 768px) {
            .hero-section {
            margin-top: 10rem;
              padding-top: 8vh;
            }
            .hero-heading {
              font-size: 2.5rem;
            }
            .hero-subheading {
              font-size: 0.875rem;
            }
            .hero-section.animate-on-scroll-up .hero-heading {
              animation-duration: 0.6s;
            }
            .hero-section.animate-on-scroll-up .hero-subheading {
              animation-duration: 0.6s;
              animation-delay: 0.2s;
            }
          }
          @media (max-width: 640px) {
            .hero-section {
              padding-top: 5vh;
            }
            .hero-heading {
              font-size: 2rem;
            }
            .hero-subheading {
              font-size: 0.75rem;
            }
          }
        `}
      </style>
      <section className="max-h-[93vh] w-full relative overflow-hidden">
        <div className="background-container">
          {prevImageIndex !== null && (
            <div
              key={prevImageIndex}
              className="background-image-exit"
              style={{ backgroundImage: `url(${backgroundImages[prevImageIndex]})` }}
            ></div>
          )}
          <div
            key={currentImageIndex}
            className="background-image"
            style={{ backgroundImage: `url(${backgroundImages[currentImageIndex]})` }}
          ></div>
        </div>
        <div className="purple-gradient-overlay"></div>
        <div ref={sectionRef} className="hero-section">
          <div className="text-center relative z-10 px-4">
            <h1
              className="hero-heading text-5xl lg:text-7xl md:text-6xl font-bold text-gray-800 mb-4"
              style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)' }}
            >
              Shalu Travels
            </h1>
            <p
              className="hero-subheading lg:text-xl text-sm md:text-[16px] text-gray-800 font-medium"
              style={{ textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)' }}
            >
              Explore the World, One Journey at a Time
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;