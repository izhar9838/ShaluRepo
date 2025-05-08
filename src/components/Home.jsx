
import React, { useRef, useState, useEffect } from 'react';
import Background from '../assets/background.jpg';

const Home = () => {
  // Refs to track the section
  const sectionRef = useRef(null);
  // Track scroll direction
  const [scrollDirection, setScrollDirection] = useState(null);
  const lastScrollY = useRef(window.scrollY);
  // Track if initial animation has played
  const [hasAnimatedOnLoad, setHasAnimatedOnLoad] = useState(false);

  // Detect scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer to trigger animation when in view and reset when out of view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && scrollDirection === 'up') {
            // Add the 'animate-on-scroll-up' class to trigger the animation
            entry.target.classList.add('animate-on-scroll-up');
          } else if (!entry.isIntersecting && scrollDirection === 'down') {
            // Remove the 'animate-on-scroll-up' class to reset the animation
            entry.target.classList.remove('animate-on-scroll-up');
          }
        });
      },
      { threshold: 0.3 } // Trigger when 30% of the element is visible
    );

    // Observe the section
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Cleanup observer on component unmount
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [scrollDirection]);

  // Check if the section is in view on initial load (page refresh or navigation)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedOnLoad) {
            // Trigger animation on initial load if in view
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
              transform: translateY(100%);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .hero-section {
            opacity: 0; /* Initial state */
          }
          .hero-section.animate-on-scroll-up {
            animation: appear 0.8s ease-in-out;
            animation-iteration-count: 1;
            animation-fill-mode: forwards;
          }
          /* Ensure child elements animate with stagger */
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
            animation: appear 0.8s ease-in-out 0.4s; /* Delay for stagger */
            animation-iteration-count: 1;
            animation-fill-mode: forwards;
          }
        `}
      </style>
      <section className="min-h-[90vh] min-w-full flex items-center justify-center bg-cover bg-center bg-no-repeat relative">
        {/* Background Image with Blur */}
        <div
          className="absolute inset-0 backdrop-blur-xl"
          style={{
            backgroundImage: `url(${Background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        {/* Overlay with Purple Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-300 to-purple-100 opacity-30"></div>
        {/* Content */}
        <div ref={sectionRef} className="hero-section">
          <div className="text-center relative z-10">
            <h1
              className="hero-heading text-5xl lg:text-7xl md:text-6xl font-bold text-gray-800 mb-4"
              style={{
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)',
              }}
            >
              Shalu Travels
            </h1>
            <p
              className="hero-subheading lg:text-xl text-sm md:text-[16px] text-gray-800 font-medium"
              style={{
                textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
              }}
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
