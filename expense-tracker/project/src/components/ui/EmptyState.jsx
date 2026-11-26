import { Inbox } from 'lucide-react'
import './ui.css'

export default function EmptyState({ title = 'Nothing here yet', message = 'Your data will appear here once you add something.' }) {
  return <div className="empty-state"><span className="empty-icon"><Inbox size={20} /></span><strong>{title}</strong><p>{message}</p></div>
}
