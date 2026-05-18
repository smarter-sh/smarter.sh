import Background2 from '@/components/Background2'
import TopNavbar from '@/components/TopNavbar'
import Hero from './components/Hero'
import DeveloperResources from './components/DeveloperResources'
import Footer from './components/Footer'
const Home = () => {
  return (
    <div>
      <Background2 />
      <TopNavbar />
      <main className="w-full">
        <Hero />
        <DeveloperResources />
      </main>
      <Footer />
    </div>
  )
}
export default Home
