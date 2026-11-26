import { ArrowUpRight, CalendarDays, CircleDollarSign, RefreshCcw } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../../components/ui/Card.jsx'
import Chip from '../../components/ui/Chip.jsx'
import EmptyState from '../../components/ui/EmptyState.jsx'
import Skeleton from '../../components/ui/Skeleton.jsx'
import Button from '../../components/ui/Button.jsx'
import LineChart from '../../components/charts/LineChart.jsx'
import Donut from '../../components/charts/Donut.jsx'
import { formatMoney } from '../../lib/money.js'
import { formatShortDate } from '../../lib/dates.js'
import { useAuth } from '../../app/providers.jsx'
import useOverview from './hooks/useOverview.js'
import StatCard, { moneyStat } from './components/StatCard.jsx'
import HeroCard from './components/HeroCard.jsx'
import RecentTable from './components/RecentTable.jsx'
import './components/overview.css'

export default function OverviewPage() {
  const { user } = useAuth(); const navigate = useNavigate(); const { summary, transactions, nextCursor, loading, error, retry, loadMore } = useOverview(); const [category, setCategory] = useState('All'); const [sort, setSort] = useState('date_desc')
  const sortedTransactions = useMemo(() => [...transactions].sort((a, b) => sort === 'amount_desc' ? b.amountPaise - a.amountPaise : sort === 'amount_asc' ? a.amountPaise - b.amountPaise : new Date(b.date) - new Date(a.date)), [transactions, sort])
  const filteredBreakdown = summary?.categoryBreakdown?.filter((item) => category === 'All' || item.category === category) || []
  const categories = summary?.categoryBreakdown?.map((item) => item.category) || []
  return <div className="overview-page"><div className="overview-heading"><div><span className="eyebrow">Thursday, 26 November 2026</span><h1>Welcome back, {user?.username || user?.name?.split(' ')[0]}</h1><p>A quiet look at where your money is moving this month.</p></div><Button variant="secondary" onClick={() => navigate('/transactions?add=1')} icon={<CalendarDays size={15} />}>This month</Button></div>{error ? <Card className="widget-error"><p>{error}</p><button onClick={retry}><RefreshCcw size={13} /> Try again</button></Card> : loading || !summary ? <><div className="stat-grid">{[1, 2, 3, 4, 5].map((item) => <Skeleton key={item} className="stat-card" />)}</div><Skeleton className="hero-card" /></> : <><div className="stat-grid"><StatCard label="Total spent" value={moneyStat(summary.totalSpentPaise)} delta={summary.deltas?.spentPct || 0} tone="expense" icon="spent" sparkline={summary.monthlySeries.map((item) => item.spentPaise)} /><StatCard label="Total income" value={moneyStat(summary.totalIncomePaise)} delta={summary.deltas?.incomePct || 0} tone="income" icon="income" sparkline={summary.monthlySeries.map((item) => item.incomePaise)} /><StatCard label="Avg per day" value={moneyStat(summary.avgPerDayPaise)} delta={-2.8} tone="violet" icon="average" /><StatCard label="Top category" value={summary.topCategory?.category || '—'} delta={4.6} tone="accent" icon="category" /><StatCard label="Transactions" value={summary.transactionCount} delta={9.3} tone="accent" icon="transactions" /></div><HeroCard summary={summary} onAdd={() => navigate('/transactions?add=1')} /><div className="overview-columns"><Card className="chart-card"><div className="section-header"><div><span className="eyebrow">Cash flow</span><h3>Monthly trend</h3></div><div className="legend"><span><i className="legend-dot legend-spent" />Spent</span><span><i className="legend-dot legend-income" />Income</span></div></div><LineChart series={summary.monthlySeries} /></Card><Card className="category-card"><div className="section-header"><div><span className="eyebrow">Breakdown</span><h3>Where it goes</h3></div></div><div className="chip-row"><Chip active={category === 'All'} onClick={() => setCategory('All')}>All</Chip>{categories.map((item) => <Chip key={item} active={category === item} onClick={() => setCategory(item)}>{item}</Chip>)}</div>{filteredBreakdown.length ? <Donut items={filteredBreakdown} /> : <EmptyState title="No category data" message="There is no spend in this filter yet." />}</Card></div><Card className="latest-card"><div className="section-header"><div><span className="eyebrow">Just in</span><h3>Latest transaction</h3></div><ArrowUpRight size={16} color="var(--muted)" /></div>{summary.latestTransaction ? <div className="latest-row"><span className={`category-icon ${summary.latestTransaction.type}`}><CircleDollarSign size={15} /></span><div className="latest-copy"><strong>{summary.latestTransaction.title}</strong><span>{summary.latestTransaction.category} <i /> {formatShortDate(summary.latestTransaction.date)}</span></div><span className={`latest-amount ${summary.latestTransaction.type}`}>{summary.latestTransaction.type === 'income' ? '+' : '-'}{formatMoney(summary.latestTransaction.amountPaise)}</span></div> : <EmptyState title="No latest transaction" />}</Card><RecentTable items={sortedTransactions} loading={false} error="" retry={retry} nextCursor={nextCursor} onLoadMore={loadMore} sort={sort} onSort={setSort} /></>}</div>
}
