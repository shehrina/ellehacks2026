import { useState } from 'react'
import { useGameStore } from '../store/gameStore'

export function PiggyBank() {
  const coins = useGameStore((state) => state.coins)
  const savedCoins = useGameStore((state) => state.savedCoins)
  const saveCoins = useGameStore((state) => state.saveCoins)
  const withdrawCoins = useGameStore((state) => state.withdrawCoins)
  const growSavings = useGameStore((state) => state.growSavings)
  
  const [amount, setAmount] = useState(5)
  const [showGrowAnimation, setShowGrowAnimation] = useState(false)

  const handleSave = () => {
    if (coins >= amount) {
      saveCoins(amount)
    }
  }

  const handleWithdraw = () => {
    if (savedCoins >= amount) {
      withdrawCoins(amount)
    }
  }

  const handleFastForward = () => {
    setShowGrowAnimation(true)
    growSavings()
    setTimeout(() => setShowGrowAnimation(false), 1000)
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      {/* Piggy Bank Visual */}
      <div className={`bg-gradient-to-b from-pink-100 to-pink-200 rounded-3xl p-8 mb-6 text-center transition-transform ${showGrowAnimation ? 'scale-110' : ''}`}>
        <div className="text-8xl mb-4">🐷</div>
        <div className="text-4xl font-bold text-pink-700 mb-2 flex items-center justify-center gap-2">
          {savedCoins}
          <div className="w-10 h-10 rounded-full bg-gradient-to-b from-[#FFD700] to-[#E5C100] shadow-sm flex items-center justify-center border border-[#FFD700] relative overflow-hidden">
            <span className="font-black text-lg text-[#B4860B]" style={{ fontFamily: 'Fredoka, sans-serif' }}>W</span>
          </div>
        </div>
        <p className="text-pink-600 text-sm">
          Money grows when you don't touch it!
        </p>
      </div>

      {/* Amount selector */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
        <label className="block text-gray-500 text-xs font-bold uppercase tracking-wider mb-4 text-center">Set Savings Amount</label>
        <div className="flex items-center justify-between px-2">
          <button
            onClick={() => setAmount(Math.max(1, amount - 5))}
            className="w-12 h-12 rounded-full font-bold text-gray-400 hover:text-gray-700 hover:bg-gray-100 active:scale-90 transition-all flex items-center justify-center text-3xl"
          >
            −
          </button>
          <div className="flex-1 flex flex-col items-center">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full text-center text-4xl font-bold text-gray-800 bg-transparent border-none outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Coins</span>
          </div>
          <button
            onClick={() => setAmount(amount + 5)}
            className="w-12 h-12 rounded-full font-bold text-gray-400 hover:text-gray-700 hover:bg-gray-100 active:scale-90 transition-all flex items-center justify-center text-3xl"
          >
            +
          </button>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={handleSave}
          disabled={coins < amount}
          className={`flex-1 py-3 rounded-full font-semibold transition-all ${
            coins >= amount
              ? 'bg-pink-500 text-white hover:bg-pink-600 active:scale-95'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Save
        </button>
        <button
          onClick={handleWithdraw}
          disabled={savedCoins < amount}
          className={`flex-1 py-3 rounded-full font-semibold transition-all ${
            savedCoins >= amount
              ? 'bg-yellow-500 text-white hover:bg-yellow-600 active:scale-95'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Withdraw
        </button>
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
        Fast Forward 24h (Watch it grow!)
      </button>
      
      <p className="text-center text-gray-400 text-xs mt-2">
        Demo feature: See how your savings grow over time
      </p>
    </div>
  )
}
