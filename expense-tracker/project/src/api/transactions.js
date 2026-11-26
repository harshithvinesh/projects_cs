import client from './client.js'

export async function getTransactions(params = {}) {
  const { data } = await client.get('/api/transactions', { params })
  return data
}

export async function createTransaction(payload) {
  const { data } = await client.post('/api/transactions', payload)
  return data
}

export async function updateTransaction(id, payload) {
  const { data } = await client.put(`/api/transactions/${id}`, payload)
  return data
}

export async function deleteTransaction(id) {
  await client.delete(`/api/transactions/${id}`)
}
