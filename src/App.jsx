import AppProviders from './components/wrappers/AppProviders'
import AppRouter from './routes/router'
import '@/assets/css/style.css'
import 'aos/dist/aos.css'
function App() {
  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  )
}
export default App
