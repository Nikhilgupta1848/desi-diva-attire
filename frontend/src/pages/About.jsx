import React, { useEffect, useState } from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const carouselImages = [
    assets.about_img2,
    assets.about_img3,
    assets.about_img4,
    assets.about_img5,
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    // GSAP animation for rotating service cards on scroll
    gsap.utils.toArray('.service-card').forEach((card) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 80%', // Start the animation when the card is 80% from the top of the viewport
          toggleActions: 'play none none reverse', // Play on enter, reverse on leave
        },
        opacity: 0,
        rotationY: 180,
        duration: 1,
      });
    });
  }, []);

  const handleNextImage = () => {
    setCurrentImage((prev) => (prev + 1) % carouselImages.length);
  };

  const handlePrevImage = () => {
    setCurrentImage((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-8">
        <img
          className="w-full md:max-w-[450px] h-auto object-cover rounded-lg shadow-md"
          src={assets.about_img}
          alt="About Us"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            ❤ Welcome to DesiDivaAttire.com, where traditional elegance meets modern style. As an Indian brand, we celebrate the blend of Indian and Western fashion, offering quality-crafted collections to help you express your unique style with confidence and grace.
          </p>
          <p>
            ❤ At DesiDivaAttire.com, we’re here to make shopping effortless and enjoyable with our hassle-free exchange policy, a 7-day return option, and 24/7 dedicated customer support. Discover our collection with confidence, knowing we’re always ready to assist you at every step.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            ❤ Our mission at DesiDivaAttire.com is to celebrate the fusion of tradition and modernity by offering high-quality Indian and Western fashion. We aim to empower every diva with style and confidence, making elegance accessible for all.
          </p>
        </div>
      </div>

      {/* Combined Carousel and Connect with Us / Payment Methods Section */}
      <div className="flex flex-col md:flex-row justify-between items-stretch mb-20 gap-10">
        {/* Connect with Us Section */}
        <div className="service-card border px-4 py-6 flex flex-col gap-10 rounded-lg shadow-md md:w-1/4 h-[300px]">
          <b>Connect With Us</b>
          <div className="flex flex-col space-y-2">
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="flex text-gray-600 items-center">
              <img src={assets.instagram_logo} alt="Instagram" className="w-5 h-5 mr-2" />
              Instagram
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="flex text-gray-600 items-center">
              <img src={assets.facebook_logo} alt="Facebook" className="w-5 h-5 mr-2" />
              Facebook
            </a>
            <a href="https://wa.me/yourphonenumber" target="_blank" rel="noopener noreferrer" className="flex text-gray-600 items-center">
              <img src={assets.watsapp_logo} alt="WhatsApp" className="w-5 h-5 mr-2" />
              WhatsApp
            </a>
            <a href="mailto:your-email@example.com" className="flex text-gray-600 items-center">
              <img src={assets.email_logo} alt="Email" className="w-5 h-5 mr-2" />
              Email
            </a>
          </div>
        </div>

        {/* Image Carousel Section */}
        <div className="relative md:w-1/2 h-full">
          <button 
            onClick={handlePrevImage} 
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full shadow-md"
          >
            &#10094;
          </button>
          <img
            className="w-full h-[300px] object-cover rounded-lg shadow-md"
            src={carouselImages[currentImage]}
            alt="Carousel"
          />
          <button 
            onClick={handleNextImage} 
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full shadow-md"
          >
            &#10095;
          </button>
        </div>

        {/* Payment Methods Section */}
        <div className="service-card border px-4 py-6 flex flex-col gap-10 rounded-lg shadow-md md:w-1/4 h-[300px]">
          <b>Payment Options</b>
          <div className="flex flex-col text-gray-600 space-y-2">
            <p>✔️ Cash </p>
            <p>✔️ Cards</p>
            <p>✔️ UPI</p>
            <p>✔️ Net Banking </p>
           </div>
          
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="text-xl py-4">
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20 gap-6">
        <div className="service-card border px-6 py-8 md:py-10 flex flex-col gap-3 rounded-lg shadow-md">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">
            Our Quality Assurance ensures each piece at DesiDivaAttire meets the highest standards, from fabric selection to final stitching. We meticulously check every detail so you receive only the finest quality and craftsmanship.
          </p>
        </div>

        <div className="service-card border px-6 py-8 md:py-10 flex flex-col gap-3 rounded-lg shadow-md">
          <b>Convenience:</b>
          <p className="text-gray-600">
            At DesiDivaAttire, convenience is at the heart of your shopping experience. Enjoy easy browsing, secure payments, and quick checkout, designed to make your purchase seamless.
          </p>
        </div>

        <div className="service-card border px-6 py-8 md:py-10 flex flex-col gap-3 rounded-lg shadow-md">
          <b>Exceptional Customer Services:</b>
          <p className="text-gray-600">
            Our commitment to exceptional customer service means we’re here for you at every step. From 24/7 support to quick responses and personalized assistance, we ensure your shopping experience is smooth and satisfying.
          </p>
        </div>
      </div>

      <NewsletterBox />
    </div>
  );
};

export default About;
