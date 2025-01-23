import React from 'react'
import HeroSestion from "../_components/HeroSection/HeroSestion";
import About from "../_components/About/About";
import Services from "../_components/Services/Services";
import ChooseUs from "../_components/ChooseUs/ChooseUs";
import Reviews from "../_components/customerReviews/Reviews";
import HowWeWork from "../_components/HowWeWork/HowWeWork";
import SpecialOffers from "../_components/Offers/SpecialOffers";
import BlogPage from '../_components/Blog/Blog';
import WhatsAppBtn from '../_components/WhatsAppBtn/WhatsAppBtn';

function Home() {

  return (
    <div className='relative'>
    
      <HeroSestion />
      <About />
      <Services />
      <ChooseUs />
      <Reviews />
      <HowWeWork />
      <SpecialOffers />
      <BlogPage/>
      <WhatsAppBtn/>
    </div>
  )
}

export default Home