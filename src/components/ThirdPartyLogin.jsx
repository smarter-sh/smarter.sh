import { Link } from 'react-router-dom'
import IconifyIcon from './wrappers/IconifyIcon'
const ThirdPartyLogin = ({ label = 'Sign in with' }) => {
  return (
    <div>
      <div className="text-center">
        <p className="mb-4 text-lg font-semibold text-white">{label}</p>
        <hr className="my-4 border-t border-white/30 mx-20" />
        <ul className="flex flex-wrap items-center justify-center gap-2">
          <li>
            <Link
              to=""
              className="group inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-2xl transition-all duration-500 hover:bg-red-500/60"
            >
              <IconifyIcon
                icon="mdi:google"
                className="text-2xl text-white group-hover:text-white"
              />
            </Link>
          </li>
          <li>
            <Link
              to=""
              className="group inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-2xl transition-all duration-500 hover:bg-default-600/60"
            >
              <IconifyIcon
                icon="mdi:github"
                className="text-2xl text-white group-hover:text-white"
              />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
export default ThirdPartyLogin
