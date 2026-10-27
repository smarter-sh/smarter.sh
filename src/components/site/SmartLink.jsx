import { Link } from 'react-router-dom'

export const isExternal = (href) => /^(https?:|mailto:)/.test(href ?? '')

// A link to a page of this site, to a section of this page, or to another site, in a new tab.
// `newTab={false}` opens another site in this tab, e.g. a site of The Smarter Project.
const SmartLink = ({ href, newTab = true, children, ...props }) => {
  if (href?.startsWith('#') || (isExternal(href) && !newTab)) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    )
  }
  if (isExternal(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    )
  }
  return (
    <Link to={href} {...props}>
      {children}
    </Link>
  )
}
export default SmartLink
