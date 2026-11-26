import { expenseCategories, mockState } from './data.js'

const wait = (value) => new Promise((resolve, reject) => {
  const state = new URLSearchParams(window.location.search).get('state')
  const delay = state === 'loading' ? 1000000 : 300
  setTimeout(() => {
  if (state === 'error') reject({ error: { code: 'MOCK_ERROR', message: 'The demo service is unavailable right now.' } })
  else if (state === 'empty') resolve(Array.isArray(value) ? [] : { ...(value || {}), items: [], categoryBreakdown: [], monthlySeries: [], latestTransaction: null, transactionCount: 0 })
  else resolve(value)
  }, delay)
})

function error(message, fields) {
  return Promise.reject({ error: { code: fields ? 'VALIDATION_ERROR' : 'NOT_FOUND', message, ...(fields ? { fields } : {}) } })
}

function sortItems(items, sort = 'date_desc') {
  return [...items].sort((a, b) => {
    if (sort === 'amount_desc') return b.amountPaise - a.amountPaise
    if (sort === 'amount_asc') return a.amountPaise - b.amountPaise
    if (sort === 'date_asc') return new Date(a.date) - new Date(b.date)
    return new Date(b.date) - new Date(a.date)
  })
}

export async function login({ email, password }) {
  if (!email || !password) return error('Please enter your email and password.', { email: !email ? 'Email is required.' : undefined, password: !password ? 'Password is required.' : undefined })
  return wait({ token: `mock-token-${Date.now()}`, user: { ...mockState.user, email } })
}

export async function register({ username, email, password }) {
  if (!username || !email || !password) return error('Please complete all fields.', { username: !username ? 'Name is required.' : undefined, email: !email ? 'Email is required.' : undefined, password: !password ? 'Password is required.' : undefined })
  mockState.user = { ...mockState.user, username, name: username, email }
  return wait({ user: mockState.user })
}

export async function getTransactions(params = {}) {
  let items = [...mockState.transactions]
  if (params.category && params.category !== 'All') items = items.filter((item) => item.category === params.category)
  if (params.type) items = items.filter((item) => item.type === params.type)
  if (params.from) items = items.filter((item) => item.date >= params.from)
  if (params.to) items = items.filter((item) => item.date <= `${params.to}T23:59:59.999Z`)
  const sorted = sortItems(items, params.sort)
  const limit = Number(params.limit || 20)
  const start = params.cursor ? Number(params.cursor) : 0
  return wait({ items: sorted.slice(start, start + limit), nextCursor: start + limit < sorted.length ? String(start + limit) : null })
}

export async function createTransaction(payload) {
  if (!payload.title || !payload.amountPaise || !payload.category || !payload.date) return error('Please complete the transaction details.')
  const created = { ...payload, id: `tx-${Date.now()}` }
  mockState.transactions = [created, ...mockState.transactions]
  return wait(created)
}

export async function updateTransaction(id, payload) {
  const index = mockState.transactions.findIndex((item) => item.id === id)
  if (index < 0) return error('Transaction not found.')
  const updated = { ...payload, id }
  mockState.transactions[index] = updated
  return wait(updated)
}

export async function deleteTransaction(id) {
  mockState.transactions = mockState.transactions.filter((item) => item.id !== id)
  return wait(undefined)
}

export async function getSummary({ from, to } = {}) {
  const response = await getTransactions({ from, to, limit: 1000, sort: 'date_desc' })
  const items = response.items
  const expenseItems = items.filter((item) => item.type === 'expense')
  const incomeItems = items.filter((item) => item.type === 'income')
  const total = (list) => list.reduce((sum, item) => sum + item.amountPaise, 0)
  const breakdown = expenseCategories.map((category) => {
    const matches = expenseItems.filter((item) => item.category === category)
    return { category, totalPaise: total(matches), count: matches.length }
  }).filter((item) => item.count)
  const monthlySeries = Array.from({ length: 7 }, (_, index) => {
    const date = new Date()
    date.setUTCDate(1)
    date.setUTCMonth(date.getUTCMonth() - (6 - index))
    const month = date.toISOString().slice(0, 7)
    const matches = items.filter((item) => item.date.slice(0, 7) === month)
    return { month, spentPaise: total(matches.filter((item) => item.type === 'expense')), incomePaise: total(matches.filter((item) => item.type === 'income')) }
  })
  const topCategory = [...breakdown].sort((a, b) => b.totalPaise - a.totalPaise)[0]
  return wait({ range: { from: from || null, to: to || null }, totalSpentPaise: total(expenseItems), totalIncomePaise: total(incomeItems), transactionCount: items.length, avgPerDayPaise: Math.round(total(expenseItems) / Math.max(1, 30)), topCategory: topCategory ? { category: topCategory.category, totalPaise: topCategory.totalPaise } : null, deltas: { spentPct: 12.4, incomePct: 8.1 }, categoryBreakdown: breakdown, monthlySeries, latestTransaction: items[0] || null })
}
