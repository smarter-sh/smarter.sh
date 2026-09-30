import Background2 from '@/components/Background2'
import TopNavbar from '@/components/TopNavbar'
import Hero from './components/Hero'
import About from './components/About'
import WhySmarter from './components/WhySmarter'
import Features from './components/Features'
import GetStarted from './components/GetStarted'
import Footer from './components/Footer'
const Home = () => {
  return (
    <div>
      <Background2 />
      <TopNavbar />
      <main className="w-full">
        <Hero />
        <About />
        <WhySmarter />
        <Features />
        <GetStarted />
      </main>
      <Footer />
    </div>
  )
}
export default Home
