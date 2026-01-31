import { useState } from 'react'
import { useGameStore } from '../store/gameStore'

export function PiggyBank() {
  const savedCoins = useGameStore((state) => state.savedCoins)
  const growSavings = useGameStore((state) => state.growSavings)
  
  const [showGrowAnimation, setShowGrowAnimation] = useState(false)

  const handleFastForward = () => {
    setShowGrowAnimation(true)
    growSavings()
    setTimeout(() => setShowGrowAnimation(false), 1000)
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">🐷 Piggy Bank</h2>
      
      {/* Piggy Bank Visual */}
      <div className={`bg-gradient-to-b from-pink-100 to-pink-200 rounded-3xl p-8 mb-6 text-center transition-transform ${showGrowAnimation ? 'scale-110' : ''}`}>
        <div className="text-8xl mb-4">🐷</div>
        <div className="text-4xl font-bold text-pink-700 mb-2">
          {savedCoins} 🪙
        </div>
        <p className="text-pink-600 text-sm">
          Money grows when you don't touch it!
        </p>
      </div>

      {/* Fast forward button (for demo) */}
      <button
        onClick={handleFastForward}
        disabled={savedCoins === 0}
        className={`w-full py-3 rounded-full font-semibold transition-all ${
          savedCoins > 0
            ? 'bg-purple-500 text-white hover:bg-purple-600 active:scale-95'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        ⏩ Fast Forward 24h (Watch it grow!)
      </button>
      
      <p className="text-center text-gray-400 text-xs mt-2">
        Demo feature: See how your savings grow over time
      </p>
    </div>
  )
}
