import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useBackgroundSlideshow from './useBackgroundSlideShow';

const AboutUs = () => {
  const values = [
    {
      title: 'Passionate Travel Experts',
      description: 'Our team is dedicated to crafting personalized travel experiences, ensuring every journey is unforgettable.',
    },
    {
      title: 'Customer-Centric Approach',
      description: 'We prioritize your needs and preferences, offering tailored solutions for every traveler.',
    },
    {
      title: 'Global Reach, Local Insights',
      description: 'With a network spanning the globe, we provide local expertise to make your travels seamless.',
    },
  ];

  const { backgroundImages, currentImageIndex, prevImageIndex } = useBackgroundSlideshow();

  const headingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const paragraphVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', delay: 0.2 } },
  };

  const valueVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: 'easeOut', delay: i * 0.1 },
    }),
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95, transition: { duration: 0.2 } },
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

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
          .content-container {
            opacity: 0;
          }
          .content-container.animate-on-load {
            animation: appear 0.8s ease-in-out;
            animation-iteration-count: 1;
            animation-fill-mode: forwards;
          }
          /* Responsive adjustments for mobile and tablet */
          @media (max-width: 768px) {
            .content-container.animate-on-load {
              animation-duration: 0.6s;
            }
            .heading {
              font-size: 2.5rem;
            }
            .paragraph {
              font-size: 0.875rem;
            }
            .value-title {
              font-size: 1.125rem;
            }
            .value-description {
              font-size: 0.875rem;
            }
          }
          @media (max-width: 640px) {
            .heading {
              font-size: 2rem;
            }
            .paragraph {
              font-size: 0.75rem;
            }
            .value-title {
              font-size: 1rem;
            }
            .value-description {
              font-size: 0.75rem;
            }
          }
        `}
      </style>
      <section className="min-h-[86vh] min-w-full relative py-8 overflow-hidden">
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
        <motion.div
          className="content-container relative z-10 animate-on-load"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="container mx-auto px-2">
            <motion.h2
              className="heading text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 text-center mb-4"
              style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}
              variants={headingVariants}
              initial="hidden"
              animate="visible"
            >
              About Us
            </motion.h2>
            <motion.p
              className="paragraph text-sm md:text-base lg:text-lg text-gray-700 font-medium text-center max-w-2xl mx-auto mb-12"
              style={{ textShadow: '1px 1px 3px rgba(0, 0, 0, 0.1)' }}
              variants={paragraphVariants}
              initial="hidden"
              animate="visible"
            >
              Founded in 2015, Shalu Travels is your trusted partner for exploring the world. We specialize in creating memorable travel experiences, from breathtaking adventures to relaxing getaways. Our mission is to make travel accessible, enjoyable, and tailored to your unique desires.
            </motion.p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  className="bg-white/80 shadow-md rounded-lg p-4 text-center"
                  variants={valueVariants}
                  initial="hidden"
                  animate="visible"
                  custom={index}
                >
                  <h3 className="value-title text-lg md:text-xl font-semibold text-gray-800 mb-2">
                    {value.title}
                  </h3>
                  <p className="value-description text-sm md:text-base text-gray-600">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
            <div className="text-center">
              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <Link
                  to="/contact-us"
                  className="bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition-colors"
                >
                  Contact Us Today
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default AboutUs;