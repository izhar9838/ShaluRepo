// File: Header.jsx
// Description: This file contains the Header component for the Shalu Travels website.
import React, { useState, useEffect,useRef } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ShaluLogo from '../../assets/shalu.png'; // Adjust the path to your logo image

const navItems = [
  { name: 'Home', link: '/', status: true },
  { name: 'Services', link: '/services', status: true },
  { name: 'Contact Us', link: '/contact-us', status: true },
  { name: 'About Us', link: '/about-us', status: true },
];

const Logo = () => (
  <img
    src={ShaluLogo}
    className="w-8 h-8 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full "
    alt="Logo"
  />
);

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  // Handle clicks outside the mobile menu
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };
  
      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      }
  
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isOpen]);
  // Handle screen size changes
  useEffect(() => {
    const handleResize = () => {
      // Tailwind 'md' breakpoint is 768px
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    // Add event listener for resize
    window.addEventListener('resize', handleResize);

    // Call immediately to handle initial state
    handleResize();

    // Cleanup listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animation variants for the mobile menu container
  const menuVariants = {
    hidden: { opacity: 0, x: '100%' },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.2, ease: 'easeOut', delay: 0.1 },
    },
    exit: {
      opacity: 0,
      x: '100%',
      transition: { duration: 0.4, ease: 'easeIn' },
    },
  };

  // Animation variants for individual nav items
  const itemVariants = {
    hidden: { opacity: 0, x: 30, scale: 0.9 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { delay: 0.2 + i * 0.08, duration: 0.3, ease: 'easeOut' },
    }),
  };

  return (
    <header className="bg-orange-100 min-w-full shadow-md  m-0 relative">
      <nav className="container min-w-full mx-auto px-2 py-2 flex items-center justify-between max-h-[50px]">
        <div className="logo">
          <Logo />
        </div>
        <div className="hidden md:flex space-x-14">
          {navItems.map((item) =>
            item.status ? (
              <Link
                key={item.name}
                to={item.link}
                className="font-semibold pl-[32px] hover:text-orange-500 transition-colors"
              >
                {item.name}
              </Link>
            ) : null
          )}
        </div>
        <button
          className="md:hidden text-gray-700 hover:text-gray-800 flex items-center justify-center"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </nav>
      {isOpen && (
        <motion.div
          className="md:hidden bg-orange-100 shadow-md text-center w-full h-auto z-101 absolute left-0"
          ref={menuRef}
          style={{ top: '40px' }}
          variants={menuVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {navItems.map((item, index) =>
            item.status ? (
              <motion.div
                key={item.name}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                custom={index}
              >
                <Link
                  to={item.link}
                  className="block px-4 py-3 font-semibold hover:text-orange-500 transition-colors"
                  onClick={toggleMenu}
                >
                  {item.name}
                </Link>
              </motion.div>
            ) : null
          )}
        </motion.div>
      )}
    </header>
  );
};

export default Header;
