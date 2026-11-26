import { LoaderCircle } from 'lucide-react'
import './ui.css'

export default function Button({ children, variant = 'primary', loading = false, icon, ...props }) {
  return <button className={`button button-${variant}`} disabled={loading || props.disabled} {...props}>{loading ? <LoaderCircle size={16} className="spin" /> : icon}{children}</button>
}
