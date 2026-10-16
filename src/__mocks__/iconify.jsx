// @iconify/react loads its icons over the network, which tests don't have.
export const Icon = ({ icon, className }) => (
  <span data-icon={icon} className={className} />
)
