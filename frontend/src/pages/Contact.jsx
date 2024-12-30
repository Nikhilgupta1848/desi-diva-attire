import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div className="px-4 sm:px-8 lg:px-16">
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Hi, Divas</p>
          <p className='text-gray-500'>
            We hope you’re enjoying shopping with us. <br /><br />
            If you have any issues related to our products and services, please reach out to our customer care team at customercare@dda.com or WhatsApp us on +91-7461925193. <br /><br />
            We’re available Monday to Saturday from 9:00 AM to 6:00 PM.
          </p>
          <p className='font-semibold text-xl text-gray-600'>Registered Office Address</p>
          <p className='text-gray-500'>
            Reva Circle, Sathanur <br />
            560064, Bengaluru, India
          </p>
          <p className='text-gray-500'>
            Ph: +91-7461925193 <br />
            Email: contact@dda.com
          </p>
          <p className='font-semibold text-xl text-gray-600'>Careers at Desi Diva Attire</p>
          <p className='text-gray-500'>Learn more about our teams and openings</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore jobs</button>
        </div>
      </div>

      {/* Connect with Us Section */}
      <div className="flex flex-col md:flex-row justify-center gap-8 mb-10 items-center">
        <div className="service-card border px-4 py-6 flex flex-col gap-10 rounded-lg shadow-md w-full sm:w-3/4 md:w-1/4 h-auto">
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

        {/* Image beside Connect with Us section */}
        <img src={assets.about_img5} alt="Connect Illustration" className="w-full sm:w-48 md:w-60 h-auto rounded-lg shadow-md" />
      </div>

      <NewsletterBox />
    </div>
  )
}

export default Contact
