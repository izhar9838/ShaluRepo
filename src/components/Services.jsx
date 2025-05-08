
import React from 'react';
import { Link } from 'react-router-dom';
import Background from '../assets/background.jpg';

const Services = () => {
  // Service data
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
          .service-card {
            animation: appear 0.9s ease-in-out;
            animation-iteration-count: 1;
            animation-fill-mode: forwards;
          }
        `}
      </style>
      <section className="min-h-[90vh] min-w-full bg-cover bg-center bg-no-repeat relative flex items-center py-12">
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
        <div className="service-card container mx-auto px-4 relative z-10 flex flex-col items-center">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 text-gray-800">
            Our Services
          </h2>
          <div className="flex justify-center w-full">
            <div className="grid grid-cols-2 gap-4 xs:gap-6 sm:gap-8 lg:grid-cols-3 lg:gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="service-card bg-white rounded-lg shadow-lg w-40 xs:w-44 sm:w-52 md:w-48 lg:w-56 h-40 xs:h-44 sm:h-52 md:h-48 lg:h-56 p-2 xs:p-3 sm:p-4 lg:p-4 hover:shadow-xl transition-shadow duration-300"
                >
                  <h3 className="text-xs xs:text-sm sm:text-base md:text-sm lg:text-base font-semibold mb-1 xs:mb-2 sm:mb-3 lg:mb-3 text-gray-800">
                    {service.title}
                  </h3>
                  <p className="text-[10px] xs:text-xs sm:text-sm md:text-xs lg:text-sm text-gray-600 mb-2 xs:mb-3 sm:mb-4 lg:mb-4">
                    {service.description}
                  </p>
                  <Link
                    // to={service.link}
                    className="text-[10px] xs:text-xs sm:text-sm md:text-xs lg:text-sm text-orange-500 hover:text-orange-600 font-medium transition-colors"
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
