import './ui.css'

export default function Tooltip({ label, children }) { return <span className="tooltip-wrap"><span className="tooltip-content">{label}</span>{children}</span> }
