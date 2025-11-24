import Background2 from '@/components/Background2'
import TopNavbar from '@/components/TopNavbar'
import Hero from './components/Hero'
import About from './components/About'
import Features from './components/Features'
import ProfessionalServices from './components/ProfessionalServices'
import PremiumServices from './components/PremiumServices'
import Faqs from './components/Faqs'
import Footer from './components/Footer'
const Home = () => {
  return (
    <div>
      <Background2 />
      <TopNavbar />
      <main className="w-full">
        <Hero />
        <About />
        <Features />
        <ProfessionalServices />
        <PremiumServices />
        <Faqs />
      </main>
      <Footer />
    </div>
  )
}
export default Home
