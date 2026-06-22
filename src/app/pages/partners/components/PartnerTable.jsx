import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const partners = [
  {
    partner_name: 'OpenCogent, LLC',
    offering: 'Installation, customization, training, support, hosting, localization, and staffing services across the Americas in English and Spanish.',
    organization_url: 'https://opencogent.ai/',
  },
]

const PartnerTable = () => {
  return (
    <section
      className="py-20"
      data-aos="zoom-out"
      data-aos-easing="ease"
      data-aos-duration={1000}
    >
      <div className="overflow-hidden rounded-3xl bg-default-950/40 backdrop-blur-3xl">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide text-white">
                Partner
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide text-white">
                Offering
              </th>
            </tr>
          </thead>

          <tbody>
            {partners.map((partner) => (
              <tr
                key={partner.partner_name}
                className="border-b border-white/10 last:border-b-0"
              >
                <td className="px-6 py-5 align-top">
                  <a
                    href={partner.organization_url}
                    className="font-medium text-white hover:text-primary transition-colors"
                  >
                    {partner.partner_name}
                  </a>
                </td>

                <td className="px-6 py-5 text-default-300">
                  {partner.offering}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default PartnerTable
