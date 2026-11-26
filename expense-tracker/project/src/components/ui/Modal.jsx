import { X } from 'lucide-react'
import { useEffect } from 'react'
import './ui.css'

export default function Modal({ open, title, onClose, children }) {
  useEffect(() => {
    if (!open) return undefined
    const closeOnEscape = (event) => event.key === 'Escape' && onClose()
    document.addEventListener('keydown', closeOnEscape)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', closeOnEscape); document.body.style.overflow = '' }
  }, [open, onClose])
  if (!open) return null
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><div className="modal glass-card" role="dialog" aria-modal="true" aria-label={title}><div className="modal-header"><div><span className="eyebrow">Transaction details</span><h2>{title}</h2></div><button className="icon-button" aria-label="Close modal" onClick={onClose}><X size={18} /></button></div>{children}</div></div>
}
