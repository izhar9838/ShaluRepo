import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import useBackgroundSlideshow from './useBackgroundSlideShow';

const ContactUs = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: { email: '', subject: '', message: '' },
  });

  const form = useRef();
  const [status, setStatus] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const { backgroundImages, currentImageIndex, prevImageIndex } = useBackgroundSlideshow();

  const onSubmit = (data) => {
    const serviceID = import.meta.env.VITE_SERVICEID;
    const templateID = import.meta.env.VITE_TEMPLATEID;
    const publicKey = import.meta.env.VITE_PUBLICKEY;

    emailjs.sendForm(serviceID, templateID, form.current, publicKey).then(
      () => {
        setStatus('Message sent successfully!');
        setShowPopup(true);
        reset();
        setTimeout(() => {
          setStatus('');
          setShowPopup(false);
        }, 3000);
      },
      (error) => {
        setStatus('Failed to send message. Please try again.');
        setShowPopup(true);
        console.error('EmailJS error:', error);
        setTimeout(() => {
          setStatus('');
          setShowPopup(false);
        }, 3000);
      }
    );
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const fieldVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.3, ease: 'easeOut' },
    }),
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95, transition: { duration: 0.2 } },
  };

  const popupVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
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
          .form-container {
            opacity: 0;
          }
          .form-container.animate-on-load {
            animation: appear 0.8s ease-in-out;
            animation-iteration-count: 1;
            animation-fill-mode: forwards;
          }
          /* Responsive adjustments for mobile and tablet */
          @media (max-width: 768px) {
            .form-container.animate-on-load {
              animation-duration: 0.6s;
            }
            .form-heading {
              font-size: 2.5rem;
            }
            .form-label {
              font-size: 0.875rem;
            }
            .form-input, .form-textarea {
              font-size: 0.875rem;
            }
          }
          @media (max-width: 640px) {
            .form-heading {
              font-size: 2rem;
            }
            .form-label {
              font-size: 0.75rem;
            }
            .form-input, .form-textarea {
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
        <div className={`purple-gradient-overlay transition-all duration-300 ${showPopup ? 'opacity-20' : 'opacity-30'}`}></div>
        <div className="relative z-10">
          <div className="container mx-auto px-4">
            <motion.h2
              className="form-heading text-3xl lg:text-5xl md:text-4xl font-bold text-gray-800 text-center mb-8"
              style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              Contact Us
            </motion.h2>
            <motion.div
              className="form-container max-w-md md:max-w-lg mx-auto bg-orange-50 shadow-md rounded-lg p-6 animate-on-load"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <form ref={form} onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <motion.div variants={fieldVariants} initial="hidden" animate="visible" custom={1}>
                  <label htmlFor="email" className="form-label block text-sm md:text-base font-medium text-gray-900 mb-1">
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
                    className="form-input w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-100"
                    placeholder="your.email@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </motion.div>
                <motion.div variants={fieldVariants} initial="hidden" animate="visible" custom={2}>
                  <label htmlFor="subject" className="form-label block text-sm md:text-base font-medium text-gray-900 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    {...register('subject', { required: 'Subject is required' })}
                    className="form-input w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-100"
                    placeholder="Subject of your message"
                  />
                  {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
                </motion.div>
                <motion.div variants={fieldVariants} initial="hidden" animate="visible" custom={3}>
                  <label htmlFor="message" className="form-label block text-sm md:text-base font-medium text-gray-900 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    {...register('message', { required: 'Message is required' })}
                    rows="4"
                    className="form-textarea w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-100 resize-y"
                    placeholder="Your message here..."
                  ></textarea>
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                </motion.div>
                <div className="text-center">
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
        <AnimatePresence>
          {showPopup && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center bg-gray-50 bg-opacity-40 backdrop-blur-sm z-50"
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
                style={{ border: '2px solid #f97316', boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)' }}
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
    </>
  );
};

export default ContactUs;