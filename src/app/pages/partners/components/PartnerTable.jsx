import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const partners = [
  {
    partner_name: 'OpenCogent, LLC',
    offering:
      'Installation, customization, training, support, hosting, localization, and staffing services across the Americas in English and Spanish.',
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
      <div className="overflow-hidden rounded-xl border border-keen-200 bg-white shadow-card">
        <table className="w-full">
          <thead>
            <tr className="border-b border-keen-200">
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide text-keen-900">
                Partner
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide text-keen-900">
                Offering
              </th>
            </tr>
          </thead>

          <tbody>
            {partners.map((partner) => (
              <tr
                key={partner.partner_name}
                className="border-b border-keen-200 last:border-b-0"
              >
                <td className="px-6 py-5 align-top">
                  <a
                    href={partner.organization_url}
                    className="font-medium text-keen-900 hover:text-primary transition-colors"
                  >
                    {partner.partner_name}
                  </a>
                </td>

                <td className="px-6 py-5 text-keen-600">{partner.offering}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default PartnerTable
