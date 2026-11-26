import { CalendarDays, ChevronDown, Plus, SlidersHorizontal } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button.jsx'
import Card from '../../components/ui/Card.jsx'
import Chip from '../../components/ui/Chip.jsx'
import TransactionForm from './components/TransactionForm.jsx'
import TransactionTable from './components/TransactionTable.jsx'
import useTransactions from './hooks/useTransactions.js'
import './components/transactions.css'

const categories = ['All', 'Food', 'Transport', 'Shopping', 'Bills', 'Rent', 'Entertainment', 'Health', 'Education', 'Salary', 'Freelance', 'Other']

export default function TransactionsPage() {
  const location = useLocation(); const navigate = useNavigate()
  const [category, setCategory] = useState('All'); const [sort, setSort] = useState('date_desc'); const [from, setFrom] = useState(''); const [to, setTo] = useState(''); const [modalOpen, setModalOpen] = useState(false); const [editing, setEditing] = useState(null)
  const filters = useMemo(() => ({ category, sort, ...(from ? { from: new Date(`${from}T00:00:00+05:30`).toISOString() } : {}), ...(to ? { to: new Date(`${to}T23:59:59+05:30`).toISOString() } : {}) }), [category, sort, from, to])
  const { items, nextCursor, loading, error, retry, loadMore, reload, remove } = useTransactions(filters)
  useEffect(() => { if (new URLSearchParams(location.search).get('add') === '1') { setEditing(null); setModalOpen(true); navigate('/transactions', { replace: true }) } }, [location.search, navigate])
  const startAdd = () => { setEditing(null); setModalOpen(true) }
  const startEdit = (item) => { setEditing(item); setModalOpen(true) }
  const handleDelete = async (item) => { if (window.confirm(`Delete “${item.title}”?`)) await remove(item.id) }
  return <div className="transactions-page"><div className="page-heading"><div><span className="eyebrow">Your activity</span><h1>Transactions</h1><p>Every outflow and inflow, in one calm view.</p></div><Button onClick={startAdd} icon={<Plus size={15} />}>Add transaction</Button></div><Card className="filters-card"><div className="filters-top"><div className="filter-title"><SlidersHorizontal size={15} /><strong>Filter activity</strong></div><button className="clear-filters" onClick={() => { setCategory('All'); setFrom(''); setTo(''); setSort('date_desc') }}>Clear all</button></div><div className="chip-row transaction-chips">{categories.map((item) => <Chip key={item} active={category === item} onClick={() => setCategory(item)}>{item}</Chip>)}</div><div className="date-filters"><label><CalendarDays size={14} />From<input type="date" value={from} onChange={(event) => setFrom(event.target.value)} /></label><span className="date-dash">—</span><label><CalendarDays size={14} />To<input type="date" value={to} onChange={(event) => setTo(event.target.value)} /></label><label className="sort-filter"><span>Sort by</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="date_desc">Newest</option><option value="date_asc">Oldest</option><option value="amount_desc">Amount high to low</option><option value="amount_asc">Amount low to high</option></select><ChevronDown size={13} /></label></div></Card><Card className="transactions-table-card"><div className="table-card-header"><div><span className="eyebrow">{loading ? 'Updating' : `${items.length}${nextCursor ? '+' : ''} records`}</span><h2>All transactions</h2></div><span className="table-hint">Amounts shown in INR</span></div><TransactionTable items={items} loading={loading} error={error} onRetry={retry} onEdit={startEdit} onDelete={handleDelete} sort={sort} onSort={setSort} />{nextCursor && !loading && <button className="load-more" onClick={loadMore}>Load more</button>}</Card><TransactionForm open={modalOpen} transaction={editing} onClose={() => setModalOpen(false)} onSaved={() => reload()} /></div>
}
