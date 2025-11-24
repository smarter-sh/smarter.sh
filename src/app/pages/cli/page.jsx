import PageMetaData from '@/components/PageMetaData'
import Background1 from '@/components/Background1'
import TopNavbar from '@/components/TopNavbar'
import Footer from '@/components/Footer'
import Hero from './components/Hero'
import CommandLineInterface from './components/CommandLineInterface'
const Cli = () => {
  return (
    <>
      <PageMetaData title="CLI" />
      <Background1 />
      <TopNavbar />
      <main>
        <Hero />
        <CommandLineInterface />
      </main>
      <Footer />
    </>
  )
}
export default Cli
