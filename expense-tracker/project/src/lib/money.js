export function paiseToRupees(amountPaise) {
  return Math.floor(amountPaise / 100).toString() + '.' + String(amountPaise % 100).padStart(2, '0')
}

export function rupeesToPaise(value) {
  const [rupees = '0', paise = ''] = String(value).trim().split('.')
  const normalizedPaise = `${paise}00`.slice(0, 2)
  return Number(`${rupees.replace(/[^0-9]/g, '') || '0'}${normalizedPaise}`)
}

export function formatMoney(amountPaise, options = {}) {
  const amount = Number(amountPaise || 0) / 100
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2, ...options }).format(amount)
}
