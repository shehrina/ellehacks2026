interface CardProps {
  backgroundColor: string
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export function Card({ backgroundColor, children, className = '', hover = false }: CardProps) {
  return (
    <div
      className={`rounded-3xl p-6 shadow-sm ${hover ? 'hover:shadow-md transition-shadow' : ''} ${className}`}
      style={{ backgroundColor }}
    >
      {children}
    </div>
  )
}
