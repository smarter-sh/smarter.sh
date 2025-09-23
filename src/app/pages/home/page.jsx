import Background2 from '@/components/Background2'
import TopNavbar from '@/components/TopNavbar'
import { navLinks } from './data'
import Hero from './components/Hero'
import About from './components/About'
import ProfessionalServices from './components/ProfessionalServices'
import PremiumServices from './components/PremiumServices'
import Pricing from './components/Pricing'
import Faqs from './components/Faqs'
import Footer from './components/Footer'
const Home = () => {
  return (
    <>
      <Background2 />
      <TopNavbar navLinks={navLinks} />
      <main>
        <Hero />
        <About />
        <ProfessionalServices />
        <PremiumServices />
        <Faqs />
      </main>
      <Footer />
    </>
  )
}
export default Home
