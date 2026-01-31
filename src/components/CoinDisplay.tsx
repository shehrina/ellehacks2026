import { useEffect, useState } from 'react'
import { useGameStore } from '../store/gameStore'
import { GiPiggyBank } from 'react-icons/gi'

export function CoinDisplay() {
  const savedCoins = useGameStore((state) => state.savedCoins)
  const [isAnimating, setIsAnimating] = useState(false)
  const [prevCoins, setPrevCoins] = useState(savedCoins)

  useEffect(() => {
    if (savedCoins > prevCoins) {
      setIsAnimating(true)
      const timer = setTimeout(() => {
        setIsAnimating(false)
      }, 600)
      setPrevCoins(savedCoins)
      return () => clearTimeout(timer)
    }
    setPrevCoins(savedCoins)
  }, [savedCoins, prevCoins])

  return (
    <div className="flex items-center gap-4">
      {/* Piggy Bank */}
      <div 
        className={`flex items-center gap-2 bg-pink-100 px-4 py-2 rounded-full transition-all duration-300 ${
          isAnimating ? 'scale-125 shadow-lg' : ''
        }`}
      >
        <GiPiggyBank className={`text-2xl text-pink-700 transition-transform duration-300 ${isAnimating ? 'animate-spin' : ''}`} />
        <span className="font-bold text-pink-700 text-lg">{savedCoins}</span>
      </div>
    </div>
  )
}
