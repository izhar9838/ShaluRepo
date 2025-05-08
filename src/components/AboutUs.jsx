
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Background from '../assets/background.jpg';

const AboutUs = () => {
  const values = [
    {
      title: 'Passionate Travel Experts',
      description:
        'Our team is dedicated to crafting personalized travel experiences, ensuring every journey is unforgettable.',
    },
    {
      title: 'Customer-Centric Approach',
      description:
        'We prioritize your needs and preferences, offering tailored solutions for every traveler.',
    },
    {
      title: 'Global Reach, Local Insights',
      description:
        'With a network spanning the globe, we provide local expertise to make your travels seamless.',
    },
  ];

  // Animation variants for the heading
  const headingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  // Animation variants for the introduction paragraph
  const paragraphVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut', delay: 0.2 },
    },
  };

  // Animation variants for the value cards
  const valueVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: 'easeOut', delay: i * 0.1 },
    }),
  };

  // Animation variants for the button
  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95, transition: { duration: 0.2 } },
  };

  return (
    <section className="min-h-[86vh] min-w-full relative py-8">
      {/* Background Image with Blur (No Animation) */}
      <div
        className="absolute inset-0 backdrop-blur-xl"
        style={{
          backgroundImage: `url(${Background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      ></div>
      {/* Overlay with Purple Gradient (No Animation) */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-300 to-purple-100 opacity-30"></div>
      {/* Content */}
      <div className="relative z-10">
        <div className="container mx-auto px-2">
          {/* Introduction */}
          <motion.h2
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 text-center mb-4"
            style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}
            variants={headingVariants}
            initial="hidden"
            animate="visible"
          >
            About Us
          </motion.h2>
          <motion.p
            className="text-sm md:text-base lg:text-lg text-gray-700 font-medium text-center max-w-2xl mx-auto mb-12"
            style={{ textShadow: '1px 1px 3px rgba(0, 0, 0, 0.1)' }}
            variants={paragraphVariants}
            initial="hidden"
            animate="visible"
          >
            Founded in 2015, Shalu Travels is your trusted partner for exploring the world. We specialize in creating memorable travel experiences, from breathtaking adventures to relaxing getaways. Our mission is to make travel accessible, enjoyable, and tailored to your unique desires.
          </motion.p>

          {/* Values/Team Section */}
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
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                  {value.title}
                </h3>
                <p className="text-sm md:text-base text-gray-600">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Link
                to="/contact-us"
                className="bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition-colors"
              >
                Contact Us Today
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
