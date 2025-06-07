import { useState, useEffect } from 'react';
import Background1 from '../assets/background.jpg';
import Background2 from '../assets/background1.jpg';
import Background3 from '../assets/background3.jpg';
import Background4 from '../assets/background4.jpg';

const useBackgroundSlideshow = () => {
  const backgroundImages = [Background1, Background2, Background3, Background4];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [prevImageIndex, setPrevImageIndex] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevImageIndex(currentImageIndex);
      setCurrentImageIndex((prevIndex) =>
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000); // Change image every 2 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [currentImageIndex, backgroundImages.length]);

  return { backgroundImages, currentImageIndex, prevImageIndex };
};

export default useBackgroundSlideshow;