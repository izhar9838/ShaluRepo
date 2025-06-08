
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  // Refs to track each section
  const sectionRefs = useRef([]);
  // Track scroll direction
  const [scrollDirection, setScrollDirection] = useState(null);
  const lastScrollY = useRef(window.scrollY);

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
          if (entry.isIntersecting && scrollDirection === 'down') {
            // Add the 'animate-on-scroll-down' class to trigger the animation
            entry.target.classList.add('animate-on-scroll-down');
          } else if (!entry.isIntersecting && scrollDirection === 'up') {
            // Remove the 'animate-on-scroll-down' class to reset the animation
            entry.target.classList.remove('animate-on-scroll-down');
          }
        });
      },
      { threshold: 0.3 } // Trigger when 30% of the element is visible
    );

    // Observe each section
    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    // Cleanup observer on component unmount
    return () => {
      sectionRefs.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, [scrollDirection]);

  // Helper to add refs to the sections array
  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };
  const platforms=[{
    name: 'Facebook',
    url: 'https://www.facebook.com/people/Alam-Geer/pfbid032r45NyeD3sdbhWZZax1iwLFSnqhQP2WUv4nj4qYbBumfZw4EwSamr7y4yoyZcXMDl/?rdid=6RyZCaGaACENaHDq&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1Bo4xiQDBd%2F'
  }, {
    name: 'Instagram',
    url: 'https://www.instagram.com/alamgir_087/?igsh=YnJ4dGZnM25icWNy&utm_source=ig_contact_invite'
  }, {
    name: 'Twitter',
    url: 'https://x.com/AalamgirAalam1?t=ag5F4z2vlSTk0bBn5WXpuQ&s=09'
  }, {
    name: 'YouTube',
    url: 'https://www.youtube.com/@goweb3157'
  }]
  return (
    <>
      {/* Inject CSS styles */}
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
          .footer-section {
            opacity: 0; /* Initial state */
          }
          .footer-section.animate-on-scroll-down {
            animation: appear .8s ease-in-out; 
            animation-iteration-count: 1;
            animation-fill-mode: forwards;
          }
          /* Ensure child elements of Copyright section animate */
          .copyright-text {
            opacity: 0;
          }
          .footer-section.animate-on-scroll-down .copyright-text {
            animation: appear 1s linear 0.4s; /* Delay for stagger */
            animation-iteration-count: 1;
            animation-fill-mode: forwards;
          }
        `}
      </style>
      <footer className="bg-orange-100 min-w-full text-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div ref={addToRefs} className="footer-section text-center md:text-left">
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-4">
                Shalu Travels
              </h3>
              <p className="text-sm md:text-base lg:text-lg">
                Your trusted partner for unforgettable travel experiences. Explore the world with us, one journey at a time.
              </p>
            </div>

            {/* Quick Links */}
            <div ref={addToRefs} className="footer-section text-center md:text-left">
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2">
                {['Home', 'Services', 'Contact Us', 'About Us'].map((link) => (
                  <li key={link}>
                    <Link
                      to={link === 'Home' ? '/' : `/${link.toLowerCase().replace(' ', '-')}`}
                      className="text-sm md:text-base lg:text-lg hover:text-orange-500 transition-colors"
                      onClick={() => {
                        window.scrollTo({
                          top: 0,
                          behavior: 'smooth',
                        });
                      }}
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div ref={addToRefs} className="footer-section text-center md:text-left">
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-4">
                Contact Us
              </h3>
              <ul className="space-y-2 text-sm md:text-base lg:text-lg">
                <li>Email: shalutravel006@gmail.com</li>
                <li>Phone: +91 9838803405</li>
                <li>Address: Dhanauji Road Fazilnagar, Kushinagar 274401</li>
              </ul>
            </div>

            {/* Social Media */}
            <div ref={addToRefs} className="footer-section text-center md:text-left">
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-4">
                Follow Us
              </h3>
              <ul className="space-y-2">
                {platforms.map((platform) => (
                  <li key={platform.name}>
                    <Link
                      to="#"
                      onClick={() =>
                        window.open(
                          `${platform.url}`,
                          '_blank',
                          'noopener,noreferrer'
                        )
                      }
                      className="text-sm md:text-base lg:text-lg hover:text-orange-500 transition-colors"
                    >
                      {platform.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div ref={addToRefs} className="footer-section mt-8 text-center border-t border-gray-600 pt-4">
            <p className="text-sm md:text-base lg:text-lg copyright-text">
              © {new Date().getFullYear()} Shalu Travels. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
