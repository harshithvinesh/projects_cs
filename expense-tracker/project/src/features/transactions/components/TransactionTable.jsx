import { ArrowDownLeft, ArrowUpRight, ChevronDown, Edit3, Trash2 } from 'lucide-react'
import { formatDate } from '../../../lib/dates.js'
import { formatMoney } from '../../../lib/money.js'
import EmptyState from '../../../components/ui/EmptyState.jsx'
import Skeleton from '../../../components/ui/Skeleton.jsx'
import './transactions.css'

export default function TransactionTable({ items, loading, error, onRetry, onEdit, onDelete, sort, onSort }) {
  if (error) return <div className="table-error"><p>{error}</p><button onClick={onRetry}>Try again</button></div>
  if (loading) return <div className="full-table-skeleton">{[1, 2, 3, 4, 5].map((item) => <Skeleton key={item} />)}</div>
  if (!items.length) return <EmptyState title="No transactions found" message="Try a different filter or add your first transaction." />
  return <div className="full-table-wrap"><table className="full-table"><thead><tr><th>Transaction</th><th>Category</th><th>Date</th><th><label className="table-sort">Amount<select value={sort} onChange={(event) => onSort(event.target.value)}><option value="date_desc">Newest</option><option value="amount_desc">High to low</option><option value="amount_asc">Low to high</option></select><ChevronDown size={12} /></label></th><th><span className="sr-only">Actions</span></th></tr></thead><tbody>{items.map((item) => <tr key={item.id}><td><div className="table-title"><span className={`table-icon ${item.type}`}>{item.type === 'income' ? <ArrowDownLeft size={15} /> : <ArrowUpRight size={15} />}</span><span><strong>{item.title}</strong><small>{item.note || 'Personal transaction'}</small></span></div></td><td><span className="category-pill">{item.category}</span></td><td className="date-cell">{formatDate(item.date)}</td><td className={`amount-cell ${item.type}`}>{item.type === 'income' ? '+' : '-'}{formatMoney(item.amountPaise)}</td><td><div className="row-actions"><button onClick={() => onEdit(item)} aria-label={`Edit ${item.title}`}><Edit3 size={14} /></button><button onClick={() => onDelete(item)} aria-label={`Delete ${item.title}`}><Trash2 size={14} /></button></div></td></tr>)}</tbody></table></div>
}
