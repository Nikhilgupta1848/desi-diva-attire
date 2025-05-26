
import { assets } from '../assets/assets'



const Footer = () => {
  return (
    
    <div>
       < hr />
       <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-10 text-sm'>
        
        <div>
          
        <img src={assets.logo} className='mb-5 w-60' alt="" />
            <p className='w-full md:2/3 text-gray-600'>
              When it comes to online shopping sites for women outfits, Desi Diva Attire comprises the chicest apparel for girls, ranging from Tops, hottest Dresses, Shirts, Jackets, Skirts, Jeans, Blazers, Indian Wear , Pants and many more. And when you slip into one of these outfits, we make sure that we get all the spotlight on you. Just tag us and get featured on our website. You go, Diva!
              </p>
        </div>
         <div>
    
          <p className='text-xl font-medium mb-10'>COMPANY</p>
          <ul className='flex flex-col gap-1 text-gray-600 '>
          <li>Home</li>
          <li>About Us</li>
          <li>Delivery</li>
          <li>Privacy Policy</li>
          </ul>
         </div>

         <div>
          <p className='text-xl font-medium mb-10 '>CONTACT US</p>
          <ul className='flex flex-col gap-1 text-gray-600 '>
          <li>+91-7461925193</li>
          <li>contact@dda.com</li>
          <li>Address - Reva Circle , Sathanur , 560064 , Bengaluru, India</li>
          </ul>

         </div>

        </div> 

        <div>
          <hr />
          <p className='py-5 text-sm text-center'>&copy;2024  DesiDivaAttire.com - All Rights Reserved </p>
        </div>
    </div>
  )
}

export default Footer