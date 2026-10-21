import PageMetaData from '@/components/PageMetaData'
import TopNavbar from '@/components/TopNavbar'
import Footer from '@/components/SiteFooter'
import Hero from './components/Hero'
import PartnerTable from './components/PartnerTable'
const Partners = () => {
  return (
    <>
      <PageMetaData title="Partners" />
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
