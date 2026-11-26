import TopPillNav from './TopPillNav.jsx'
import './AppShell.css'

export default function AppShell({ children }) { return <><div className="app-background" /><div className="app-shell"><TopPillNav /><main>{children}</main></div></> }
