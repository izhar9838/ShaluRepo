import React from 'react';
import { Link } from 'react-router-dom';
import useBackgroundSlideshow from './useBackgroundSlideShow';

const Services = () => {
  const services = [
    {
      title: 'Train Booking',
      description: 'Book your train tickets hassle-free with us. We ensure the best routes and seats for your journey.',
      link: '/services/train-booking',
    },
    {
      title: 'Flight Booking',
      description: 'Find the best flight deals for domestic and international travel. Book with ease and fly with comfort.',
      link: '/services/flight-booking',
    },
    {
      title: 'Passport Services',
      description: 'Get assistance with passport applications, renewals, and documentation for a smooth process.',
      link: '/services/passport-services',
    },
    {
      title: 'Visa Stamping',
      description: 'We handle your visa stamping needs with expertise, ensuring quick and reliable processing.',
      link: '/services/visa-stamping',
    },
    {
      title: 'CSC Services - PAN Card',
      description: 'Apply for or update your PAN card through our CSC services with minimal effort.',
      link: '/services/csc-pan-card',
    },
    {
      title: 'CSC Services - Aay Jaat Nivas',
      description: 'Apply for Aay Jaat Nivas etc through our CSC services with minimal effort.',
      link: '/services/csc-day-jaat-nivas',
    },
  ];

  const { backgroundImages, currentImageIndex, prevImageIndex } = useBackgroundSlideshow();

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
          .service-card {
            animation: appear 0.9s ease-in-out;
            animation-iteration-count: 1;
            animation-fill-mode: forwards;
          }
          /* Responsive adjustments for mobile and tablet */
          @media (max-width: 768px) {
            .content-container.animate-on-load {
              animation-duration: 0.6s;
            }
            .service-heading {
              font-size: 2.5rem;
            }
            .service-card {
              animation-duration: 0.7s;
            }
            .service-title {
              font-size: 1.125rem;
            }
            .service-description {
              font-size: 0.875rem;
            }
            .service-link {
              font-size: 0.875rem;
            }
            .service-card {
              width: 10.2rem !important;
              height: 10.2rem !important;
              padding: 0.5rem !important;
            }
          }
          @media (max-width: 640px) {
            .service-heading {
              font-size: 2rem;
            }
            .service-title {
              font-size: 1rem;
            }
            .service-description {
              font-size: 0.75rem;
            }
            .service-link {
              font-size: 0.75rem;
            }
            .service-card {
              width: 10.2rem !important;
              height: 10.2rem !important;
              padding: 0.375rem !important;
            }
          }
        `}
      </style>
      <section className="min-h-[90vh] min-w-full relative py-12 overflow-hidden">
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
        <div className="content-container container mx-auto px-2 relative z-10 flex flex-col items-center animate-on-load">
          <h2
            className="service-heading   text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 text-gray-800"
            style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}
          >
            Our Services
          </h2>
          <div className="flex justify-center w-full">
            <div className="grid grid-cols-2 gap-4 xs:gap-6 sm:gap-8 lg:grid-cols-3 lg:gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="service-card  bg-white/80 rounded-lg shadow-lg w-40 xs:w-44 sm:w-52 md:w-48 lg:w-56 h-40 xs:h-44 sm:h-52 md:h-48 lg:h-56 p-2 xs:p-3 sm:p-4 lg:p-4 hover:shadow-xl transition-shadow duration-300"
                >
                  <h3 className="service-title text-xs xs:text-sm sm:text-base md:text-sm lg:text-base font-semibold mb-1 xs:mb-2 sm:mb-3 lg:mb-3 text-gray-800">
                    {service.title}
                  </h3>
                  <p className="service-description text-[10px] xs:text-xs sm:text-sm md:text-xs lg:text-sm text-gray-600 mb-2 xs:mb-3 sm:mb-4 lg:mb-4">
                    {service.description}
                  </p>
                  <Link
                    to={service.link}
                    className="service-link text-[10px] xs:text-xs sm:text-sm md:text-xs lg:text-sm text-orange-500 hover:text-orange-600 font-medium transition-colors"
                  >
                    Learn More →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;