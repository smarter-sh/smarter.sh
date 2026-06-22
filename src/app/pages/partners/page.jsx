import PageMetaData from '@/components/PageMetaData'
import Background1 from '@/components/Background1'
import TopNavbar from '@/components/TopNavbar'
import Footer from '@/components/Footer'
import Hero from './components/Hero'
import PartnerTable from './components/PartnerTable'
const Partners = () => {
  return (
    <>
      <PageMetaData title="Partners" />
      <Background1 />
      <TopNavbar />
      <main>
        <Hero />
        <PartnerTable />
      </main>
      <Footer />
    </>
  )
}
export default Partners
