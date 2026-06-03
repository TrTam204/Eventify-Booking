import { useState } from 'react'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { addDays, format, isBefore, startOfDay } from 'date-fns'
import { useSlotAvailability } from '../../hooks/useSlotAvailability'
import { TIME_SLOTS } from '../../constants/slots'
import { ADVANCE_BOOKING_DAYS } from '../../constants/services'
import { useTranslation } from 'react-i18next'

export default function DateSlotPicker({ date, slot, onDate, onSlot, blockedDates = [] }) {
  const minDate = addDays(new Date(), ADVANCE_BOOKING_DAYS)
  const { availability, loading: slotLoading } = useSlotAvailability(date)
  const { t } = useTranslation()

  const isDisabled = (d) =>
    isBefore(startOfDay(d), startOfDay(minDate)) ||
    blockedDates.some(b => format(d, 'yyyy-MM-dd') === b)

  return (
    <div className="booking-step-panel" style={{ padding: '40px 0 24px' }}>
      <h2 style={{ fontFamily: '"Cormorant Garamond"', fontSize: 30, color: '#2C1A0E', marginBottom: 8 }}>{t('booking.pick_date_time')}</h2>
      <p style={{ fontFamily: '"DM Sans"', fontSize: 13, color: '#7A5C40', marginBottom: 8 }}>
        {t('booking.advance_notice', { days: ADVANCE_BOOKING_DAYS })}
      </p>
      <p style={{ fontFamily: '"DM Sans"', fontSize: 12, color: '#B5935A', marginBottom: 32 }}>
        {t('booking.first_available', { date: format(minDate, 'MMMM d, yyyy') })}
      </p>

      <div className="booking-date-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'start' }}>
        {/* Calendar */}
        <div className="booking-calendar-card">
          <DayPicker
             className="booking-day-picker"
             mode="single"
             selected={date}
             onSelect={onDate}
             disabled={isDisabled}
             startMonth={minDate}
             modifiersStyles={{ selected: { background: '#B5935A', color: '#FAF7F2' } }}
          />
        </div>

        {/* Slot buttons */}
        <div className="booking-slot-panel">
          <h3 style={{ fontFamily: '"DM Sans"', fontSize: 13, fontWeight: 600, color: '#2C1A0E', marginBottom: 16, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            {t('booking.available_times')}{date && ` — ${format(date, 'MMM d')}`}
          </h3>

          {!date ? (
            <p style={{ fontFamily: '"DM Sans"', fontSize: 13, color: '#9A7060', fontStyle: 'italic' }}>{t('booking.select_date_prompt')}</p>
          ) : slotLoading ? (
            <p style={{ fontFamily: '"DM Sans"', fontSize: 13, color: '#9A7060' }}>{t('booking.checking_availability')}</p>
          ) : (
            <div className="booking-slot-list" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {TIME_SLOTS.map(s => {
                const avail = availability[s.id] !== false
                const isSel  = slot === s.id

                return (
                  <button key={s.id}
                    className="booking-slot-button"
                    onClick={() => avail && onSlot(s.id)}
                    disabled={!avail}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '14px 18px', borderRadius: 8, border: '2px solid',
                      borderColor: isSel ? '#B5935A' : avail ? 'rgba(44,26,14,0.15)' : 'rgba(44,26,14,0.07)',
                      background: isSel ? 'rgba(181,147,90,0.08)' : avail ? '#fff' : '#f8f5f2',
                      cursor: avail ? 'pointer' : 'not-allowed', width: '100%',
                    }}
                  >
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontFamily: '"DM Sans"', fontSize: 14, fontWeight: 500, color: avail ? '#2C1A0E' : '#C0A898' }}>{t(`booking.slots.${s.id}_label`, s.label)}</div>
                      <div style={{ fontFamily: '"DM Sans"', fontSize: 12, color: '#9A7060' }}>{s.displayTime}</div>
                    </div>
                    {avail ? (
                      <span style={{ fontFamily: '"DM Sans"', fontSize: 11, color: '#22a845', background: 'rgba(34,168,69,0.1)', padding: '3px 8px', borderRadius: 4 }}>{t('booking.available')}</span>
                    ) : (
                      <span style={{ fontFamily: '"DM Sans"', fontSize: 11, color: '#B5935A', background: 'rgba(181,147,90,0.1)', padding: '3px 8px', borderRadius: 4 }}>{t('booking.full')}</span>
                    )}
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
