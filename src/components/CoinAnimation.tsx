import { useEffect, useState } from 'react'

interface CoinAnimationProps {
  onComplete: () => void
  startX?: number
  startY?: number
  targetX?: number
  targetY?: number
}

export function CoinAnimation({ 
  onComplete, 
  startX = window.innerWidth / 2, 
  startY = window.innerHeight / 2,
  targetX = window.innerWidth - 100,
  targetY = 50
}: CoinAnimationProps) {
  const [position, setPosition] = useState({ x: startX, y: startY })
  const [scale, setScale] = useState(1)
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    // Bounce animation sequence
    const duration = 1500 // 1.5 seconds
    const startTime = Date.now()
    
    // Create a bouncing path with multiple bounces
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function for bounce effect
      const easeOutBounce = (t: number): number => {
        if (t < 1 / 2.75) {
          return 7.5625 * t * t
        } else if (t < 2 / 2.75) {
          return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75
        } else if (t < 2.5 / 2.75) {
          return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375
        } else {
          return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375
        }
      }
      
      const easedProgress = easeOutBounce(progress)
      
      // Calculate position with bounce
      const currentX = startX + (targetX - startX) * easedProgress
      const currentY = startY + (targetY - startY) * easedProgress
      
      // Add vertical bounce effect
      const bounceHeight = 50 * Math.sin(progress * Math.PI * 3)
      const finalY = currentY - bounceHeight * (1 - progress)
      
      setPosition({ x: currentX, y: finalY })
      setRotation(progress * 720) // Rotate 2 full turns
      setScale(1 + Math.sin(progress * Math.PI * 4) * 0.3) // Pulse effect
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        // Animation complete
        setTimeout(() => {
          onComplete()
        }, 200)
      }
    }
    
    requestAnimationFrame(animate)
  }, [startX, startY, targetX, targetY, onComplete])

  return (
    <div
      className="fixed pointer-events-none z-50"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `translate(-50%, -50%) scale(${scale}) rotate(${rotation}deg)`,
        transition: 'none',
        willChange: 'transform',
      }}
    >
      <img src="/icons/coin.webp" alt="coin" className="w-12 h-12 drop-shadow-lg" />
    </div>
  )
}
