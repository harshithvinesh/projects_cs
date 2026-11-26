import { BarChart3, LogOut, ReceiptText, WalletCards } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../app/providers.jsx'
import { initials } from '../../lib/format.js'
import './TopPillNav.css'

export default function TopPillNav() {
  const { user, logout } = useAuth()
  return <header className="top-nav"><NavLink to="/" className="brand"><span className="brand-mark"><WalletCards size={17} /></span><span>ledger<span className="brand-dot">.</span></span></NavLink><nav className="pill-nav" aria-label="Main navigation"><NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}><BarChart3 size={14} />Overview</NavLink><NavLink to="/transactions" className={({ isActive }) => isActive ? 'active' : ''}><ReceiptText size={14} />Transactions</NavLink></nav><div className="nav-user"><div className="avatar">{initials(user?.name || user?.username)}</div><div className="user-copy"><strong>{user?.name || user?.username}</strong><span>Personal account</span></div><button className="logout-button" onClick={logout} aria-label="Log out"><LogOut size={15} /></button></div></header>
}
