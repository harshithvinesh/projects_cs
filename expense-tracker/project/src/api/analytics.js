import client from './client.js'

export async function getSummary(params = {}) {
  const { data } = await client.get('/api/analytics/summary', { params })
  return data
}
