import { useState, useEffect } from 'react';
import { assets } from '../assets/assets';

const ConnectWithus = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(window.innerWidth >= 768);

  const toggleOpen = () => {
    setIsOpen(prevOpen => !prevOpen);
  };

  // Set visibility based on screen width
  useEffect(() => {
    const handleResize = () => {
      setIsVisible(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        right: 0,
        transform: 'translateY(-50%)',
        width: isOpen ? '200px' : '60px', // Toggle width
        backgroundColor: '#4A4A4A',
        color: 'white',
        transition: 'width 0.3s ease', // Smooth transition
        cursor: 'pointer',
        borderRadius: '8px 0 0 8px',
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        overflow: 'hidden',
      }}
      onClick={toggleOpen}
    >
      {/* Left-pointing arrow */}
      <div
        style={{
          width: '0',
          height: '0',
          borderTop: '8px solid transparent',
          borderBottom: '8px solid transparent',
          borderRight: '10px solid white',
          marginBottom: '5px', // Adjust spacing above the text
        }}
      ></div>
      
      {/* Vertical text with horizontal words */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginRight: '10px',
          writingMode: 'vertical-lr', // Make the text stack vertically
          textOrientation: 'mixed',   // Each word remains horizontal
          fontSize: '24px',
          fontWeight: '800', // Extra bold font
          letterSpacing: '1px', // Add spacing between letters for readability
          color: 'white',
        }}
      >
        STAY IN TOUCH
      </div>

      {/* Show social media links only when isOpen is true */}
      {isOpen && (
        <div
          style={{
            padding: '10px',
            fontSize: '14px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          {/* Social Media Links */}
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}>
            <img src={assets.instagram_logo} alt="Instagram" style={{ width: '40px', height: '40px' }} />
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}>
            <img src={assets.facebook_logo} alt="Facebook" style={{ width: '40px', height: '40px' }} />
          </a>
          <a href="https://wa.me/yourphonenumber" target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}>
            <img src={assets.watsapp_logo} alt="WhatsApp" style={{ width: '40px', height: '40px' }} />
          </a>
          <a href="mailto:your-email@example.com" style={{ color: 'white' }}>
            <img src={assets.email_logo} alt="Email" style={{ width: '40px', height: '40px' }} />
          </a>
        </div>
      )}
    </div>
  );
};

export default ConnectWithus;
