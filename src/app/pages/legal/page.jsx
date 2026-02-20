
import PageMetaData from '@/components/PageMetaData'
import Background1 from '@/components/Background1'
import TopNavbar from '@/components/TopNavbar'
import Footer from '@/components/Footer'
import Hero from './components/Hero'
import './styles.css'
const LegalPage = () => {
  return (
    <>
      <PageMetaData title="Legal Information" />
      <Background1 />
      <TopNavbar />
      <main>
        <Hero />
        <section
          className="py-20"
          data-aos="zoom-out"
          data-aos-easing="ease"
          data-aos-duration={1000}
        >
          <div id="services" className="container">
            <div className="mb-10 flex items-end justify-between">
              <div className="mx-auto max-w-2xl text-center">
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    <a href="/privacy" className="">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="/tos" className="">Terms of Service</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
export default LegalPage
