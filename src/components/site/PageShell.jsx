import PageMetaData from '@/components/PageMetaData'
import TopNavbar from '@/components/TopNavbar'
import SiteFooter from '@/components/SiteFooter'

// The frame of every marketing page: metadata, navigation and footer, on the web console's light
// page color (the body's, see _reboot.css).
const PageShell = ({ title, description, children }) => {
  return (
    <div>
      <PageMetaData title={title} description={description} />
      <TopNavbar />
      <main className="w-full">{children}</main>
      <SiteFooter />
    </div>
  )
}
export default PageShell
