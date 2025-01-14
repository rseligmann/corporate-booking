import { useState, useEffect } from 'react'
import { fetchTrips, checkApiConnection } from '@/api/api'

export const useTrips = () => {
  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const loadTrips = async () => {
      try {
        await checkApiConnection()
        const data = await fetchTrips()
        setTrips(data)
      } catch (err) {
        console.error('Error in useTrips hook:', err)
        setError(err instanceof Error ? err : new Error('An unknown error occurred'))
      } finally {
        setLoading(false)
      }
    }

    loadTrips()
  }, [])

  return { trips, loading, error }
}