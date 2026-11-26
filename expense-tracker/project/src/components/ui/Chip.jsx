import './ui.css'

export default function Chip({ children, active = false, ...props }) {
  return <button className={`chip ${active ? 'chip-active' : ''}`} {...props}>{children}</button>
}
