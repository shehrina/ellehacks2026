import { useEffect, useState } from 'react'

interface SplashScreenProps {
  onComplete: () => void
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      // Small delay for fade out animation
      setTimeout(() => {
        onComplete()
      }, 300)
    }, 3000) // 3 seconds

    return () => clearTimeout(timer)
  }, [onComplete])

  if (!isVisible) {
    return null
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-300"
      style={{ backgroundColor: '#f9f8f6' }}
    >
      <div className="flex flex-col items-center justify-center">
        <img 
          src="/icons/spinning_wealthsimple_gif.webp" 
          alt="Wealthsimple" 
          className="w-32 h-32"
        />
      </div>
    </div>
  )
}
