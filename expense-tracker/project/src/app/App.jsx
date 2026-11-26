import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes.jsx'
import { AuthProvider } from './providers.jsx'

export default function App() {
  return <BrowserRouter><AuthProvider><AppRoutes /></AuthProvider></BrowserRouter>
}
