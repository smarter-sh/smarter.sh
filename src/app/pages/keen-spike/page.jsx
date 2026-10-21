import { SelfHost, Sdk } from '@smarter.sh/ui-widgets'
import PageShell from '@/components/site/PageShell'
import { OPENAPI_DOCS } from '@/common/constants'

// Keen spike: two of the web console's dashboard widgets, from @smarter.sh/ui-widgets,
// inside the site's own page shell. The .keen wrapper scopes the Keen theme to them.
const KeenSpike = () => {
  return (
    <PageShell title="Keen spike" description="Web console widgets on smarter.sh">
      <section className="keen mx-auto max-w-7xl px-4 pb-10 pt-32">
        <div className="row g-5 g-xl-10">
          <div className="col-xl-8 mb-5 mb-xl-10">
            <SelfHost />
          </div>
          <Sdk openapiUrl={OPENAPI_DOCS} />
        </div>
      </section>
    </PageShell>
  )
}

export default KeenSpike
