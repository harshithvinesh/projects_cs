import { useCallback, useEffect, useState } from 'react'
import { deleteTransaction, getTransactions } from '../../../api/index.js'

export default function useTransactions(filters) {
  const [items, setItems] = useState([]); const [nextCursor, setNextCursor] = useState(null); const [loading, setLoading] = useState(true); const [error, setError] = useState('')
  const load = useCallback(async (cursor = null, append = false) => { setLoading(true); setError(''); try { const response = await getTransactions({ ...filters, limit: 20, cursor }); setItems((current) => append ? [...current, ...response.items] : response.items); setNextCursor(response.nextCursor) } catch (caught) { setError(caught.error?.message || 'Unable to load transactions.') } finally { setLoading(false) } }, [filters])
  useEffect(() => { load() }, [load])
  const remove = async (id) => { await deleteTransaction(id); setItems((current) => current.filter((item) => item.id !== id)) }
  return { items, nextCursor, loading, error, retry: () => load(), loadMore: () => load(nextCursor, true), reload: () => load(), remove }
}
