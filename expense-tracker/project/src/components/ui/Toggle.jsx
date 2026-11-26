import './ui.css'

export default function Toggle({ options, value, onChange }) {
  return <div className="toggle" role="group">{options.map((option) => <button key={option.value} className={value === option.value ? 'toggle-active' : ''} onClick={() => onChange(option.value)} type="button">{option.label}</button>)}</div>
}
