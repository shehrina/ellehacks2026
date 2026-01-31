interface StatCardProps {
  icon: string
  label: string
  value: number | string
  sublabel: string
  backgroundColor: string
}

export function StatCard({ icon, label, value, sublabel, backgroundColor }: StatCardProps) {
  return (
    <div 
      className="rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow"
      style={{ backgroundColor }}
    >
      <div className="text-4xl mb-3">{icon}</div>
      <p className="text-sm font-medium mb-1" style={{ color: 'var(--text-primary)', opacity: 0.7 }}>
        {label}
      </p>
      <p className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
        {value}
      </p>
      <p className="text-xs mt-1" style={{ color: 'var(--text-primary)', opacity: 0.6 }}>
        {sublabel}
      </p>
    </div>
  )
}
