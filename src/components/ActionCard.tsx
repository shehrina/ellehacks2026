interface ActionCardProps {
  icon: string
  title: string
  description: string
  backgroundColor: string
  arrowColor: string
  onClick: () => void
}

export function ActionCard({ 
  icon, 
  title, 
  description, 
  backgroundColor, 
  arrowColor,
  onClick 
}: ActionCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-3xl p-6 text-left shadow-sm hover:shadow-lg transition-all active:scale-[0.98]"
      style={{ backgroundColor }}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">{icon}</span>
            <h3 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
              {title}
            </h3>
          </div>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            {description}
          </p>
        </div>
        <div className="text-2xl" style={{ color: arrowColor }}>→</div>
      </div>
    </button>
  )
}
