import  { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { assets } from '../assets/assets';
import { gsap } from 'gsap';

const Hero = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const images = [
    assets.hero_img1, // First image URL
    assets.hero_img2, // Second image URL
    assets.hero_img, // Third image URL
  ];

  const imageRef = useRef(null);
  const indexRef = useRef(0);

  useEffect(() => {
    const slideImages = () => {
      gsap.to(imageRef.current, {
        opacity: 0,
        duration: 0.8, // Fade-out duration
        ease: 'power2.inOut', // Smooth easing
        onComplete: () => {
          indexRef.current = (indexRef.current + 1) % images.length; // Loop through images
          imageRef.current.src = images[indexRef.current]; // Change the image source
          gsap.to(imageRef.current, {
            opacity: 1,
            duration: 0.8, // Fade-in duration
            ease: 'power2.inOut', // Smooth easing
          });
        },
      });
    };

    const interval = setInterval(slideImages, 4000); // Change images every 4 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [images]);

  const handleShopNow = () => {
    navigate('/collection'); // Redirect to the collection page
  };

  return (
    <div className="flex flex-col sm:flex-row border border-gray-400 z-10">
      {/* Hero left side */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
        <div className="text-[#414141] px-5 sm:px-0">
          <div className="flex items-center gap-2">
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
            <p className="font-medium text-sm md:text-base">OUR BESTSELLERS</p>
          </div>
          <h1 className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed">
            Latest Arrivals
          </h1>
          <div className="flex items-center gap-2">
            {/* Shop Now Button */}
            <button
              className="mt-3 px-4 py-2 text-sm sm:text-base font-semibold text-white bg-[#000000] rounded-md hover:bg-[#e26bf7] transition"
              onClick={handleShopNow} // Redirect on click
            >
              SHOP NOW
            </button>
          </div>
        </div>
      </div>
      {/* Hero right side with animated images */}
      <div className="relative w-full sm:w-1/2 overflow-hidden">
        <img
          className="w-full h-auto object-cover" // Ensures the image fits on small screens
          ref={imageRef}
          src={images[0]}
          srcSet=""
          alt="Hero"
        />
      </div>
    </div>
  );
};

export default Hero;
