import { useCallback, useEffect, useState } from 'react'
import { getSummary, getTransactions } from '../../../api/index.js'

export default function useOverview() {
  const [summary, setSummary] = useState(null); const [transactions, setTransactions] = useState([]); const [nextCursor, setNextCursor] = useState(null); const [loading, setLoading] = useState(true); const [error, setError] = useState('')
  const load = useCallback(async (cursor = null, append = false) => { setLoading(true); setError(''); try { const transactionPromise = getTransactions({ limit: 8, sort: 'date_desc', cursor }); if (append) { const transactionResponse = await transactionPromise; setTransactions((current) => [...current, ...transactionResponse.items]); setNextCursor(transactionResponse.nextCursor) } else { const [summaryResponse, transactionResponse] = await Promise.all([getSummary({}), transactionPromise]); setSummary(summaryResponse); setTransactions(transactionResponse.items); setNextCursor(transactionResponse.nextCursor) } } catch (caught) { setError(caught.error?.message || 'Unable to load your overview.') } finally { setLoading(false) } }, [])
  useEffect(() => { load() }, [load])
  return { summary, transactions, nextCursor, loading, error, retry: () => load(), loadMore: () => load(nextCursor, true) }
}
