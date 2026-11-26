import { ArrowUpRight, Plus, ShieldCheck, Sparkles } from 'lucide-react'
import { formatMoney } from '../../../lib/money.js'
import Button from '../../../components/ui/Button.jsx'
import GlassCard from '../../../components/ui/GlassCard.jsx'
import './overview.css'

export default function HeroCard({ summary, onAdd }) {
  return <GlassCard className="hero-card"><div className="hero-copy"><span className="eyebrow"><Sparkles size={12} /> Your financial rhythm</span><h2>Make room for<br /><em>what matters.</em></h2><p>Small, steady awareness adds up to a more intentional month.</p><Button onClick={onAdd} icon={<Plus size={15} />}>Add transaction</Button></div><div className="hero-orb"><div className="orb-inner"><ShieldCheck size={20} /><span>On track</span></div></div><div className="hero-metrics"><div><span>Net this period</span><strong className={summary.totalIncomePaise - summary.totalSpentPaise >= 0 ? 'income-text' : 'expense-text'}>{formatMoney(summary.totalIncomePaise - summary.totalSpentPaise)}</strong></div><div><span>Daily average</span><strong>{formatMoney(summary.avgPerDayPaise)}</strong></div><div><span>Transactions</span><strong>{summary.transactionCount}</strong></div><div className="hero-arrow"><ArrowUpRight size={17} /></div></div></GlassCard>
}
