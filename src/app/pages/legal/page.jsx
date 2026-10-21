import PageMetaData from '@/components/PageMetaData'
import TopNavbar from '@/components/TopNavbar'
import Footer from '@/components/SiteFooter'
import Hero from './components/Hero'
import './styles.css'
const LegalPage = () => {
  return (
    <>
      <PageMetaData title="Legal Information" />
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
                <ul className="legal-links list-disc list-inside space-y-2">
                  <li>
                    <a href="/privacy" className="">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="/tos" className="">
                      Terms of Service
                    </a>
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
