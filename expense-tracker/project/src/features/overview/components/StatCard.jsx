import { ArrowDownRight, ArrowUpRight, CircleDollarSign, CreditCard, Flame, Layers3, Wallet } from 'lucide-react'
import { formatMoney } from '../../../lib/money.js'
import { percent } from '../../../lib/format.js'
import Card from '../../../components/ui/Card.jsx'
import Sparkline from '../../../components/charts/Sparkline.jsx'
import './overview.css'

const icons = { spent: CreditCard, income: Wallet, average: CircleDollarSign, category: Flame, transactions: Layers3 }

export default function StatCard({ label, value, delta, tone = 'accent', icon = 'spent', sparkline }) {
  const Icon = icons[icon] || CreditCard; const positive = delta >= 0
  return <Card className="stat-card"><div className="stat-top"><span className={`stat-icon stat-${tone}`}><Icon size={15} /></span><span className="stat-label">{label}</span><span className="stat-menu">•••</span></div><div className="stat-value">{value}</div><div className="stat-bottom"><span className={positive ? 'delta-positive' : 'delta-negative'}>{positive ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}{percent(delta)}</span><span className="delta-label">vs last period</span>{sparkline && <Sparkline values={sparkline} color={tone === 'income' ? 'var(--income)' : tone === 'expense' ? 'var(--expense)' : 'var(--accent)'} />}</div></Card>
}

export function moneyStat(amountPaise) { return formatMoney(amountPaise, { maximumFractionDigits: 0 }) }
