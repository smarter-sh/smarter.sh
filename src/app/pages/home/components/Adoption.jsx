import { SelfHost as SelfHostWidget } from '@smarter.sh/ui-widgets'
import SmartLink from '@/components/site/SmartLink'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { ConsoleCard, Symbol, toneOf } from '@/components/site/ConsoleCard'
import { audiences, openSource } from '../data'

// Why Smarter is free and open source, beside the console's Self Host widget.
export const WhyOpenSource = () => (
  <>
    <div className="col-xl-6">
      <ConsoleCard
        id="why-open-source"
        title="Free and open source, for everyone"
        subtitle="Smarter is a community project, not a product. There is nothing to buy: organizations, instructors and students use the same software, under the AGPL-3.0 license."
      >
        <div className="row g-6">
          {openSource.map((item) => (
            <div key={item.title} className="col-sm-6">
              <div className="d-flex align-items-start">
                <Symbol icon={item.icon} tone={toneOf(item.accent)} className="me-4" />
                <div>
                  <h3 className="fs-5 fw-bold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-gray-700 fs-7 mb-0">{item.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-gray-600 fs-7 mt-8 mb-0">
          Smarter is supported by its community. Organizations that want help installing
          or running it can work with an independent{' '}
          <SmartLink href="/partners" className="fw-semibold">
            partner
          </SmartLink>
          .
        </p>
      </ConsoleCard>
    </div>
    <div className="col-xl-6">
      <SelfHostWidget />
    </div>
  </>
)

// Where to go next, for each kind of organization.
export const WhoItsFor = () =>
  audiences.map((item) => (
    <div key={item.title} className="col-md-6 col-xl-3">
      <SmartLink href={item.href} className="card h-100 home-audience">
        <div className="card-body d-flex flex-column p-7">
          <Symbol icon={item.icon} tone={toneOf(item.accent)} size={60} iconSize={28} />
          <h3 className="fs-4 fw-bold text-gray-900 mt-6 mb-2">{item.title}</h3>
          <p className="text-gray-700 fs-7 mb-6">{item.text}</p>
          <span
            className={`mt-auto d-inline-flex align-items-center gap-2 fw-semibold fs-6 text-${toneOf(
              item.accent
            )}`}
          >
            {item.linkText}
            <IconifyIcon icon="lucide:move-right" width={16} height={16} />
          </span>
        </div>
      </SmartLink>
    </div>
  ))
