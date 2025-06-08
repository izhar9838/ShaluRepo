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
          section {
            padding-top: 2rem;
            padding-bottom: calc(2rem + env(safe-area-inset-bottom));
          }
          @media (max-width: 320px) {
            section {
              padding-top: 6rem;
              padding-bottom: 3rem;
            }
          }
          @media (min-width: 768px) {
            section {
              padding-top: 3rem;
              padding-bottom: calc(3rem + env(safe-area-inset-bottom));
            }
          }
          .content-container {
            opacity: 0;
            animation: appear 0.8s ease-in-out forwards;
          }
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
          .contact-heading {
            position: absolute;
            top: -1.2rem;

            transform: translateX(-50%);
            width: 100%;
            text-align: center;
          }
          /* Very small screens (e.g., iPhone 5) */
          @media (max-width: 320px) {
            .content-container {
              animation-duration: 0.6s;
              padding-top: 2.5rem;
            }
            .contact-heading {
              font-size: 1.5rem;
            }
            .contact-form-container, .contact-map-container {
              height: auto;
              overflow: visible;
            }
            .contact-form-container form {
              padding: 0.25rem;
            }
            .contact-form-container .form-label {
              font-size: 0.75rem;
              margin-bottom: 0.1rem;
            }
            .contact-form-container .form-input, .contact-form-container .form-textarea {
              font-size: 0.625rem;
              padding: 0.25rem;
            }
            .contact-form-container .form-textarea {
              min-height: 2rem;
            }
            .contact-form-container button {
              font-size: 0.625rem;
              padding: 0.25rem 0.5rem;
            }
          }
          /* Mobile devices (≤640px) */
          @media (min-width: 321px) and (max-width: 640px) {
            .content-container {
              animation-duration: 0.6s;
              padding-top: 4rem;
            }
            .contact-heading {
              font-size: 2rem;
            }
            .contact-form-container, .contact-map-container {
              height: auto;
              overflow: visible;
            }
            .contact-form-container form {
              padding: 0.5rem;
            }
            .contact-form-container .form-label {
              font-size: 0.875rem;
              margin-bottom: 0.2rem;
            }
            .contact-form-container .form-input, .contact-form-container .form-textarea {
              font-size: 0.75rem;
              padding: 0.4rem;
            }
            .contact-form-container .form-textarea {
              min-height: 3rem;
            }
            .contact-form-container button {
              font-size: 0.75rem;
              padding: 0.4rem 0.8rem;
            }
          }
          /* Tablet devices (641px–768px) */
          @media (min-width: 641px) and (max-width: 768px) {
            .content-container {
              animation-duration: 0.6s;
              padding-top: 4.5rem;
            }
            .contact-heading {
              font-size: 2.5rem;
            }
            .contact-form-container, .contact-map-container {
              max-height: calc((94vh - 4.5rem - 3rem - 3rem - 1.5rem) / 2);
              overflow: hidden;
            }
            .contact-form-container form {
              max-height: 100%;
              padding: 0.75rem;
            }
            .contact-form-container .form-label {
              font-size: 0.95rem;
              margin-bottom: 0.3rem;
            }
            .contact-form-container .form-input, .contact-form-container .form-textarea {
              font-size: 0.85rem;
              padding: 0.5rem;
            }
            .contact-form-container .form-textarea {
              min-height: 4rem;
            }
            .contact-form-container button {
              font-size: 0.85rem;
              padding: 0.5rem 1rem;
            }
          }
          /* Laptop and larger (≥769px) */
          @media (min-width: 769px) {
            .content-container {
              padding-top: 5rem;
            }
            .contact-heading {
              font-size: 3rem;
            }
              iframe{
              min-height:360px;

              }
            .contact-form-container{
              width: 50%;
              min-height: 360px;
              max-height: calc(94vh - 5rem - 3rem);
            
              overflow: hidden;
            }
            .contact-map-container{
            min-height: 360px;
            
            }
            .contact-form-container form {
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              padding: 1rem;
            }
            .contact-form-container .form-label {
              font-size: 1rem;
              margin-bottom: 0.4rem;
            }
            .contact-form-container .form-input, .contact-form-container .form-textarea {
              font-size: 0.9rem;
              padding: 0.6rem;
            }
            .contact-form-container .form-textarea {
              min-height: 5rem;
            }
            .contact-form-container button {
              font-size: 0.9rem;
              padding: 0.6rem 1.2rem;
            }
          }
        `}
      </style>
      <section className="min-h-[94vh] max-h-[94vh] w-full relative overflow-hidden flex flex-col justify-center">
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
          <div className={`purple-gradient-overlay transition-all duration-300 ${showPopup ? 'opacity-20' : 'opacity-30'}`}></div>
        </div>
        <div className="content-container relative z-10 container mx-auto px-4">
          <motion.h2
            className="contact-heading text-3xl md:text-4xl font-bold text-gray-800"
            style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            Contact Us
            <span className="block w-16 h-1 bg-white mx-auto mt-2"></span>
          </motion.h2>
          <motion.div
            className="flex flex-col items-center lg:flex-row lg:items-center lg:gap-8 gap-6 max-w-3xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="w-full max-w-sm contact-form-container flex-1">
              <form ref={form} onSubmit={handleSubmit(onSubmit)} className="bg-orange-50 shadow-md rounded-lg space-y-2">
                <motion.div variants={fieldVariants} initial="hidden" animate="visible" custom={1}>
                  <label htmlFor="email" className="form-label block font-medium text-gray-900 mb-1">
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
                  <label htmlFor="subject" className="form-label block font-medium text-gray-900 mb-1">
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
                <motion.div variants={fieldVariants} initial="hidden" animate="visible" custom={3} className="flex-1">
                  <label htmlFor="message" className="form-label block font-medium text-gray-900 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    {...register('message', { required: 'Message is required' })}
                    className="form-textarea w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-100 resize-y flex-1"
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
            </div>
            <div className="w-full max-w-sm contact-map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3564.8756880613096!2d84.05364507519202!3d26.684457976783975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjbCsDQxJzA0LjEiTiA4NMKwMDMnMjIuNCJF!5e0!3m2!1sen!2sin!4v1749357436142!5m2!1sen!2sin"
                className="w-full rounded-lg border-2  border-white"
                loading="lazy"
                allowFullScreen=""
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </motion.div>
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