import PageMetaData from '@/components/PageMetaData'
import Background2 from '@/components/Background2'
import TopNavbar from '@/components/TopNavbar'
import SiteFooter from '@/components/SiteFooter'

// The frame of every marketing page: metadata, background, navigation and footer. A `console` page
// (one built with ConsoleDashboard) has the web console's dark page color, #0F1014, the Keen
// theme's --bs-app-bg-color, instead of the site's glows.
const PageShell = ({ title, description, console = false, children }) => {
  return (
    <div>
      <PageMetaData title={title} description={description} />
      {console ? (
        <div
          aria-hidden="true"
          className="fixed inset-0 -z-10"
          style={{ background: '#0F1014' }}
        />
      ) : (
        <Background2 />
      )}
      <TopNavbar />
      <main className="w-full">{children}</main>
      <SiteFooter />
    </div>
  )
}
export default PageShell
