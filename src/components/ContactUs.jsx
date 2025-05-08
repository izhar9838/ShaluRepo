import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import Background from '../assets/background.jpg';

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const form = useRef();
  const [status, setStatus] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const onSubmit = (data) => {
    const serviceID = import.meta.env.VITE_SERVICEID;
    const templateID = import.meta.env.VITE_TEMPLATEID;
    const publicKey = import.meta.env.VITE_PUBLICKEY;

    emailjs.sendForm(serviceID, templateID, form.current, publicKey)
      .then(
        (result) => {
          setStatus('Message sent successfully!');
          setShowPopup(true);
          reset(); // Reset form fields
          setTimeout(() => {
            setStatus('');
            setShowPopup(false);
          }, 3000); // Clear status and hide popup after 3 seconds
        },
        (error) => {
          setStatus('Failed to send message. Please try again.');
          setShowPopup(true);
          console.error('EmailJS error:', error);
          setTimeout(() => {
            setStatus('');
            setShowPopup(false);
          }, 3000); // Clear status and hide popup after 3 seconds
        }
      );
  };

  // Animation variants for the form container
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  // Animation variants for form fields
  const fieldVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.3, ease: 'easeOut' },
    }),
  };

  // Animation for the submit button
  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95, transition: { duration: 0.2 } },
  };

  // Animation variants for the popup
  const popupVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } }
  };

  return (
    <section className="min-h-[86vh] min-w-full relative py-8">
      {/* Background Image with Blur */}
      <div
        className={`absolute inset-0 transition-all duration-300 ${showPopup ? 'backdrop-blur-3xl' : 'backdrop-blur-xl'}`}
        style={{
          backgroundImage: `url(${Background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      ></div>
      {/* Overlay with Purple Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-b from-purple-300 to-purple-100 transition-all duration-300 ${showPopup ? 'opacity-20' : 'opacity-30'}`}></div>
      {/* Content */}
      <div className="relative z-10">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl lg:text-5xl md:text-4xl font-bold text-gray-800 text-center mb-8"
            style={{
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            Contact Us
          </motion.h2>
          <motion.div
            className="max-w-md md:max-w-lg mx-auto bg-orange-50 shadow-md rounded-lg p-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <form ref={form} onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Email Field */}
              <motion.div
                variants={fieldVariants}
                initial="hidden"
                animate="visible"
                custom={1}
              >
                <label
                  htmlFor="email"
                  className="block text-sm md:text-base font-medium text-gray-900 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: 'Invalid email address',
                    },
                  })}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-100 `}
                  placeholder="your.email@example.com"
                />
                
              </motion.div>

              {/* Subject Field */}
              <motion.div
                variants={fieldVariants}
                initial="hidden"
                animate="visible"
                custom={2}
              >
                <label
                  htmlFor="subject"
                  className="block text-sm md:text-base font-medium text-gray-900 mb-1"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  {...register('subject', { required: 'Subject is required' })}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-100 '
                  }`}
                  placeholder="Subject of your message"
                />
                
              </motion.div>

              {/* Message Field */}
              <motion.div
                variants={fieldVariants}
                initial="hidden"
                animate="visible"
                custom={3}
              >
                <label
                  htmlFor="message"
                  className="block text-sm md:text-base font-medium text-gray-900 mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  {...register('message', { required: 'Message is required' })}
                  rows="4"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-100 resize-y `}
                  placeholder="Your message here..."
                ></textarea>
                
              </motion.div>

              {/* Submit Button */}
              <div className="text-center ">
                <motion.button
                  type="submit"
                  className="bg-orange-500 cursor-pointer text-white px-6 py-2 rounded-md hover:bg-orange-600 transition-colors"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  Send Message
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Popup Modal */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-gray-50  bg-opacity-40 backdrop-blur-sm z-520"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-live="polite"
          >
            <motion.div
              className="bg-orange-50 rounded-lg p-8 max-w-md w-full text-center"
              variants={popupVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{
                border: '2px solid #f97316', // Thicker orange-500 border
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
              }}
            >
              <p className={`text-xl font-semibold ${status.includes('successfully') ? 'text-green-600' : 'text-red-600'} mb-4`}>
                {status}
              </p>
              <button
                onClick={() => setShowPopup(false)}
                className="inline-block bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ContactUs;