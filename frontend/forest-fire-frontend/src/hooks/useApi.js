import { useCallback, useEffect, useState } from 'react'

// Generic data-fetching hook used by every list page.
// Exposes { data, loading, error, refresh } so pages don't duplicate
// loading/error/empty-state handling.
export function useApi(fetcherFn, deps = []) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await fetcherFn()
      setData(result)
    } catch (err) {
      setError(err?.message || 'Something went wrong while loading data.')
    } finally {
      setLoading(false)
    }
  }, deps) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    refresh()
  }, [refresh])

  return { data, loading, error, refresh, setData }
}
