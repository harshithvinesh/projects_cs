import './ui.css'

export default function GlassCard({ className = '', children, ...props }) {
  return <section className={`card glass-card ${className}`} {...props}>{children}</section>
}
