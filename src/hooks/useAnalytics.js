import { useState, useEffect } from 'react'
import { supabase, isOffline } from '../lib/supabase'
import { format, startOfMonth, endOfMonth, subMonths } from 'date-fns'
import { getMockAnalytics } from '../lib/mockDb'

export function useAnalytics() {
  const [data, setData]     = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isOffline) {
      setData(getMockAnalytics())
      setLoading(false)
      return
    }

    async function load() {
      try {
        const months = Array.from({ length: 6 }, (_, i) => subMonths(new Date(), 5 - i))

        const revenueRows = await Promise.all(
          months.map(async m => {
            const { data } = await supabase
              .from('bookings')
              .select('price_per_side')
              .gte('booking_date', format(startOfMonth(m), 'yyyy-MM-dd'))
              .lte('booking_date', format(endOfMonth(m), 'yyyy-MM-dd'))
              .in('status', ['confirmed', 'completed'])
            return { month: format(m, 'MMM'), revenue: (data || []).reduce((s, b) => s + b.price_per_side, 0) }
          }),
        )

        const { data: svcData } = await supabase
          .from('bookings')
          .select('services(name)')
          .in('status', ['confirmed', 'completed'])

        const svcMap = {}
        ;(svcData || []).forEach(b => {
          const n = b.services?.name || 'Unknown'
          svcMap[n] = (svcMap[n] || 0) + 1
        })
        const byService = Object.entries(svcMap).map(([name, value]) => ({ name, value }))

        const { data: slotData } = await supabase
          .from('bookings')
          .select('time_slots(label)')
          .in('status', ['confirmed', 'completed'])

        const slotMap = {}
        ;(slotData || []).forEach(b => {
          const l = b.time_slots?.label || 'Unknown'
          slotMap[l] = (slotMap[l] || 0) + 1
        })
        const bySlot = Object.entries(slotMap).map(([name, value]) => ({ name, value }))

        setData({ revenue: revenueRows, byService, bySlot })
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return { data, loading }
}
