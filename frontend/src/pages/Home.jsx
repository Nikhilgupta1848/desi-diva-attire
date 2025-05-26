import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'
import ImageSlider from '../components/ImageSlider'
import ProductCards from '../components/ProductCards'
import ConnectWithus from '../components/ConnectWithus'



const Home = () => {
  return (
    <div>
     <Hero/> 
     <LatestCollection/>
     <ProductCards/>
     <ImageSlider/>
     <BestSeller/>
     <OurPolicy/>
     <NewsletterBox/>
    <ConnectWithus/>
    </div>
  )
}

export default Home;