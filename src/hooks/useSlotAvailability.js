import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { supabase, isOffline } from '../lib/supabase'
import { TIME_SLOTS } from '../constants/slots'

export function useSlotAvailability(date) {
  const [availability, setAvailability] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!date) return
    setLoading(true)

    if (isOffline) {
      // Offline mode: all slots are available
      const map = {}
      TIME_SLOTS.forEach(s => { map[s.id] = true })
      setAvailability(map)
      setLoading(false)
      return
    }

    const dateStr = format(date, 'yyyy-MM-dd')

    supabase
      .from('bookings')
      .select('slot_id, status')
      .eq('booking_date', dateStr)
      .in('status', ['pending_slip', 'pending_validation', 'confirmed'])
      .then(({ data }) => {
        const bookedSlots = new Set((data || []).map(b => b.slot_id))
        const map = {}
        TIME_SLOTS.forEach(s => { map[s.id] = !bookedSlots.has(s.id) })
        setAvailability(map)
        setLoading(false)
      })
      .catch(() => {
        const map = {}
        TIME_SLOTS.forEach(s => { map[s.id] = true })
        setAvailability(map)
        setLoading(false)
      })
  }, [date])

  return { availability, loading }
}
