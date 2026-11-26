import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { useAuth } from './providers.jsx'
import LoginPage from '../features/auth/Page.jsx'
import OverviewPage from '../features/overview/Page.jsx'
import TransactionsPage from '../features/transactions/Page.jsx'
import AppShell from '../components/layout/AppShell.jsx'

function ProtectedRoute() {
  const { user } = useAuth()
  return user ? <AppShell><Outlet /></AppShell> : <Navigate to="/login" replace />
}

export default function AppRoutes() {
  return <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<LoginPage register />} />
    <Route element={<ProtectedRoute />}>
      <Route path="/" element={<OverviewPage />} />
      <Route path="/transactions" element={<TransactionsPage />} />
    </Route>
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
}
