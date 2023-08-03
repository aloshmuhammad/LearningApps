import React from 'react'
import Navba from '../../Components/Navba'
import Landing from '../../Components/Landing'
import LandingCards from '../../Components/LandingCards'
import LandingReccomendations from '../../Components/LandingReccomendations'
import OffersLanding from '../../Components/OffersLanding'
import BannersHome from '../../Components/BannersHome'
import Footer from '../../Components/Footer'
const Home = () => {
  return (
    <div>
      <Navba/>
      <Landing/>
      <LandingCards/>
      <LandingReccomendations/>
      <OffersLanding/>
      <BannersHome/>
      <Footer/>
    </div>
  )
}

export default Home
