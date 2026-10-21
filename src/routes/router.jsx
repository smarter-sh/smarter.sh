import { Navigate, Route, Routes } from 'react-router-dom'
import { appRoutes } from './index'
const AppRouter = () => {
  return (
    <Routes>
      {appRoutes.map((route, idx) => (
        <Route key={idx + route.name} path={route.path} element={route.element} />
      ))}
      {/* Any other url, e.g. a removed page's, goes to the home page instead of a blank one. */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
export default AppRouter
