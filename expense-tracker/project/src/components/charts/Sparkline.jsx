import './charts.css'

export default function Sparkline({ values = [], color = 'var(--accent)' }) {
  const max = Math.max(...values, 1); const min = Math.min(...values, 0)
  const points = values.map((value, index) => `${index * 20},${34 - ((value - min) / Math.max(max - min, 1)) * 30}`).join(' ')
  return <svg className="sparkline" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true"><polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
}
