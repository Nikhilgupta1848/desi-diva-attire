import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { assets } from '../assets/assets'; // Assume you have more images in this object
import { gsap } from 'gsap';

const ImageSlider = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const images = [
    assets.festive_slide, // Add your first image URL
    assets.festive_slide1, // Add your second image URL
    assets.festive_slide3,  // Add your third image URL
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const imageRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      gsap.to(imageRef.current, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
          gsap.to(imageRef.current, { opacity: 1, duration: 0.5 });
        },
      });
    }, 7000); // Slide every 7 seconds

    return () => clearInterval(interval); // Clear interval on unmount
  }, [images.length]);

  const handleNext = () => {
    gsap.to(imageRef.current, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        gsap.to(imageRef.current, { opacity: 1, duration: 0.5 });
      },
    });
  };

  const handlePrevious = () => {
    gsap.to(imageRef.current, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        setCurrentIndex((prevIndex) =>
          prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
        gsap.to(imageRef.current, { opacity: 1, duration: 0.5 });
      },
    });
  };

  // Function to handle the "SHOP NOW" button click
  const handleShopNowClick = () => {
    navigate('/collection'); // Redirect to the collection page
  };

  return (
    <div className="flex flex-col sm:flex-row border border-gray-400 z-10">
      {/* Left side with announcement */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-6 sm:py-10 bg-[#fffdf9]">
        <div className="text-[#414141] px-4 sm:px-0 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
            <p className="font-medium text-sm md:text-base">TRENDING RIGHT NOW</p>
          </div>
          <h1 className="prata-regular text-2xl sm:text-3xl md:text-4xl lg:text-5xl sm:py-3 leading-relaxed">
            Festive Sale!
          </h1>
          <p className="font-semibold text-base sm:text-lg md:text-xl text-[#b21818]">
            Up to 50% Off
          </p>
          {/* Shop Now Button */}
          <button
            onClick={handleShopNowClick} // Call the navigation function
            className="mt-3 px-4 py-2 text-sm sm:text-base font-semibold text-white bg-[#000000] rounded-md hover:bg-[#e26bf7] transition"
          >
            SHOP NOW
          </button>
        </div>
      </div>

      {/* Right side with animated images and arrows */}
      <div className="relative w-full sm:w-1/2 flex items-center justify-center overflow-hidden">
        <img
          className="w-full h-full object-cover transition-opacity duration-500"
          ref={imageRef}
          src={images[currentIndex]}
          alt="Hero"
        />

        {/* Left arrow */}
        <button
          onClick={handlePrevious}
          className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 text-2xl sm:text-3xl text-gray-700 bg-white rounded-full shadow-md p-1 sm:p-2 hover:bg-gray-200"
        >
          &#10094;
        </button>

        {/* Right arrow */}
        <button
          onClick={handleNext}
          className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 text-2xl sm:text-3xl text-gray-700 bg-white rounded-full shadow-md p-1 sm:p-2 hover:bg-gray-200"
        >
          &#10095;
        </button>

        {/* Dot indicators */}
        <div className="absolute bottom-4 flex justify-center w-full gap-2">
          {images.map((_, index) => (
            <span
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? 'bg-gray-600' : 'bg-white'
              } transition duration-300`}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
