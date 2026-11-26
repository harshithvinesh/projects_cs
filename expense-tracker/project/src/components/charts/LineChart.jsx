import { useMemo, useState } from 'react'
import { formatMoney } from '../../lib/money.js'
import './charts.css'

function points(values, width, height, pad, max) {
  return values.map((value, index) => `${pad + (index * (width - pad * 2)) / Math.max(1, values.length - 1)},${height - pad - (value / Math.max(1, max)) * (height - pad * 2)}`).join(' ')
}

export default function LineChart({ series = [] }) {
  const [hovered, setHovered] = useState(null)
  const width = 640; const height = 230; const pad = 28
  const max = useMemo(() => Math.max(...series.flatMap((item) => [item.spentPaise, item.incomePaise]), 1), [series])
  const spent = points(series.map((item) => item.spentPaise), width, height, pad, max)
  const income = points(series.map((item) => item.incomePaise), width, height, pad, max)
  return <div className="line-chart-wrap"><svg className="line-chart" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Monthly spending and income trend">
    {[0, 1, 2, 3].map((line) => <line key={line} x1={pad} x2={width - pad} y1={pad + line * 54} y2={pad + line * 54} className="chart-grid" />)}
    <polyline points={spent} className="chart-line chart-spent" /><polyline points={income} className="chart-line chart-income" />
    {series.map((item, index) => { const x = pad + (index * (width - pad * 2)) / Math.max(1, series.length - 1); const spentY = height - pad - (item.spentPaise / max) * (height - pad * 2); const incomeY = height - pad - (item.incomePaise / max) * (height - pad * 2); return <g key={item.month} onMouseEnter={() => setHovered(index)} onMouseLeave={() => setHovered(null)}><rect x={x - 25} y={pad} width="50" height={height - pad * 2} fill="transparent" /><circle cx={x} cy={spentY} r={hovered === index ? 5 : 3} className="chart-point chart-point-spent" /><circle cx={x} cy={incomeY} r={hovered === index ? 5 : 3} className="chart-point chart-point-income" /><text x={x} y={height - 5} textAnchor="middle" className="chart-label">{item.month.slice(5)}</text></g> })}
  </svg>{hovered !== null && <div className="chart-tooltip" style={{ left: `${(hovered / Math.max(1, series.length - 1)) * 100}%` }}><strong>{series[hovered].month}</strong><span><i className="dot dot-expense" />Spent {formatMoney(series[hovered].spentPaise)}</span><span><i className="dot dot-income" />Income {formatMoney(series[hovered].incomePaise)}</span></div>}</div>
}
