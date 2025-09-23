import Background2 from '@/components/Background2'
import TopNavbar from '@/components/TopNavbar'
import { navLinks } from './data'
import Hero from './components/Hero'
import BusinessTools from './components/BusinessTools'
import PostGenerator from './components/PostGenerator'
import Features from './components/Features'
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
        <BusinessTools />
        <PostGenerator />
        <Features />
        <Faqs />
      </main>
      <Footer />
    </>
  )
}
export default Home
