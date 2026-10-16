import PageMetaData from '@/components/PageMetaData'
import Background2 from '@/components/Background2'
import TopNavbar from '@/components/TopNavbar'
import SiteFooter from '@/components/SiteFooter'

// The frame of every marketing page: metadata, background, navigation and footer.
const PageShell = ({ title, description, children }) => {
  return (
    <div>
      <PageMetaData title={title} description={description} />
      <Background2 />
      <TopNavbar />
      <main className="w-full">{children}</main>
      <SiteFooter />
    </div>
  )
}
export default PageShell
