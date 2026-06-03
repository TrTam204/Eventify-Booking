export default function Badge({ children, variant = 'gold', style }) {
  const styles = {
    gold:    { background: 'rgba(181,147,90,0.12)', color: '#B5935A', border: '1px solid rgba(181,147,90,0.3)' },
    green:   { background: 'rgba(34,197,94,0.1)',   color: '#16a34a', border: '1px solid rgba(34,197,94,0.3)'  },
    amber:   { background: 'rgba(245,158,11,0.1)',  color: '#d97706', border: '1px solid rgba(245,158,11,0.3)' },
    red:     { background: 'rgba(239,68,68,0.1)',   color: '#dc2626', border: '1px solid rgba(239,68,68,0.3)'  },
    neutral: { background: 'rgba(44,26,14,0.07)',   color: '#7A5C40', border: '1px solid rgba(44,26,14,0.15)'  },
  }

  return (
    <span style={{
      fontFamily: '"DM Sans"', fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase',
      padding: '3px 8px', borderRadius: 4, display: 'inline-block',
      ...styles[variant], ...style,
    }}>
      {children}
    </span>
  )
}
