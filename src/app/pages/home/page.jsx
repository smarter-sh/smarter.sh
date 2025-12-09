import Background2 from '@/components/Background2'
import TopNavbar from '@/components/TopNavbar'
import Hero from './components/Hero'
import About from './components/About'
import Features from './components/Features'
import ProfessionalServices from './components/ProfessionalServices'
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
      </main>
      <Footer />
    </div>
  )
}
export default Home
