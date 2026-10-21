import PageMetaData from '@/components/PageMetaData'
import TopNavbar from '@/components/TopNavbar'
import Footer from '@/components/SiteFooter'
import Hero from './components/Hero'
import CommandLineInterface from './components/CommandLineInterface'
import { Cli as CliWidget } from '@smarter.sh/ui-widgets'
import ConsoleWidgets from '@/components/site/ConsoleWidgets'
const Cli = () => {
  return (
    <>
      <PageMetaData title="CLI" />
      <TopNavbar />
      <main>
        <Hero />
        <div className="container pt-10">
          <ConsoleWidgets rowClassName="justify-content-center">
            <CliWidget className="col-lg-8 col-xl-6" />
          </ConsoleWidgets>
        </div>
        <CommandLineInterface />
      </main>
      <Footer />
    </>
  )
}
export default Cli
