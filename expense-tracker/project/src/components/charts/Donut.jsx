import { useMemo } from 'react'
import { formatMoney } from '../../lib/money.js'
import './charts.css'

const colors = ['#FF7A2F', '#8B7CF6', '#34D399', '#FBBF24', '#F87171', '#60A5FA', '#E879F9', '#A3E635']

export default function Donut({ items = [] }) {
  const total = items.reduce((sum, item) => sum + item.totalPaise, 0)
  const gradient = useMemo(() => { let start = 0; return items.map((item, index) => { const end = start + (item.totalPaise / Math.max(total, 1)) * 360; const value = `${colors[index % colors.length]} ${start}deg ${end}deg`; start = end; return value }).join(', ') }, [items, total])
  return <div className="donut-layout"><div className="donut" style={{ background: `conic-gradient(${gradient || 'var(--panel-soft)'} )` }}><div className="donut-hole"><strong>{items.length}</strong><span>categories</span></div></div><div className="donut-legend">{items.slice(0, 5).map((item, index) => <div className="legend-row" key={item.category}><span><i className="legend-dot" style={{ background: colors[index % colors.length] }} />{item.category}</span><strong>{formatMoney(item.totalPaise, { maximumFractionDigits: 0 })}</strong></div>)}</div></div>
}
