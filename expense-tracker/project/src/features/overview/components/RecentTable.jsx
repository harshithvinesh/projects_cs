import { ChevronDown, Utensils, TrainFront, ShoppingBag, Receipt, Home, HeartPulse, GraduationCap, Clapperboard, CircleDollarSign } from 'lucide-react'
import { formatMoney } from '../../../lib/money.js'
import { formatShortDate } from '../../../lib/dates.js'
import Card from '../../../components/ui/Card.jsx'
import EmptyState from '../../../components/ui/EmptyState.jsx'
import Skeleton from '../../../components/ui/Skeleton.jsx'
import './overview.css'

const categoryIcons = { Food: Utensils, Transport: TrainFront, Shopping: ShoppingBag, Bills: Receipt, Rent: Home, Health: HeartPulse, Education: GraduationCap, Entertainment: Clapperboard, Salary: CircleDollarSign, Freelance: CircleDollarSign, Other: CircleDollarSign }

export default function RecentTable({ items, loading, error, retry, nextCursor, onLoadMore, sort, onSort }) {
  return <Card className="recent-card"><div className="section-header"><div><span className="eyebrow">Activity</span><h3>Recent transactions</h3></div><label className="sort-select"><span>Sort by</span><select value={sort} onChange={(event) => onSort(event.target.value)}><option value="date_desc">Newest</option><option value="amount_desc">Amount high to low</option><option value="amount_asc">Amount low to high</option></select><ChevronDown size={13} /></label></div>{error ? <div className="widget-error"><p>{error}</p><button onClick={retry}>Try again</button></div> : loading ? <div className="table-skeleton">{[1, 2, 3, 4].map((item) => <Skeleton key={item} />)}</div> : items.length === 0 ? <EmptyState title="No recent transactions" message="Add your first transaction to see it here." /> : <div className="transaction-list">{items.map((item) => { const Icon = categoryIcons[item.category] || CircleDollarSign; return <div className="transaction-row" key={item.id}><span className={`category-icon ${item.type}`}><Icon size={15} /></span><div className="transaction-main"><strong>{item.title}</strong><span>{item.category} <i /> {formatShortDate(item.date)}</span></div><div className={`transaction-amount ${item.type}`}>{item.type === 'income' ? '+' : '-'}{formatMoney(item.amountPaise)}</div></div> })}</div>}{nextCursor && <button className="load-more" onClick={onLoadMore}>Load more</button>}</Card>
}
