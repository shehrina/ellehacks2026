import { useGameStore } from '../store/gameStore'
import { lessons } from '../data/lessons'
import { Card } from './Card'

interface HomeProps {
  onNavigate: (tab: string) => void
}

export function Home({ onNavigate }: HomeProps) {
  const coins = useGameStore((state) => state.coins)
  const savedCoins = useGameStore((state) => state.savedCoins)
  const completedLessons = useGameStore((state) => state.completedLessons)
  const ownedItems = useGameStore((state) => state.ownedItems)

  return (
    <div className="p-6 pb-24 max-w-2xl mx-auto flex flex-col items-center">
      {/* Hero Section */}
      <div className="text-center mb-8 mt-4 w-full flex flex-col items-center">
        {/* Huge Gold Button */}
        <div className="relative group cursor-pointer animate-float mb-8" onClick={() => onNavigate('lessons')}>

          {/* Spinning Container */}
          <div className="animate-spin-slow preserve-3d">
            {/* Main Button Circle - Clean Professional Gold Coin */}
            <div className="w-52 h-52 rounded-full bg-gradient-to-b from-[#FFD700] to-[#E5C100] shadow-[0_10px_30px_rgba(234,179,8,0.5),inset_0_-8px_12px_rgba(0,0,0,0.1),inset_0_4px_12px_rgba(255,255,255,0.7)] flex items-center justify-center border-4 border-[#FFD700] ring-4 ring-yellow-100/50 relative overflow-hidden">

              {/* Subtle Inner Rim */}
              <div className="absolute inset-2 rounded-full border-2 border-[#FFFFFF]/30" />

              {/* W Symbol */}
              <span className="font-black text-[7rem] text-[#B4860B] drop-shadow-sm relative z-10" style={{ fontFamily: 'Fredoka, sans-serif' }}>W</span>

              {/* Shininess / Glare */}
              {/* Static Highlight */}
              <div className="absolute -top-12 -left-12 w-36 h-36 bg-white/40 blur-3xl rounded-full pointer-events-none" />

              {/* Moving Glare / Sheen */}
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-tr from-transparent via-white/50 to-transparent opacity-60 animate-glare pointer-events-none" />

              {/* Bottom Reflection */}
              <div className="absolute -bottom-4 right-4 w-24 h-24 bg-yellow-200/20 blur-xl rounded-full" />
            </div>
          </div>

          {/* Shadow/Glow under button - static relative to page */}
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-40 h-8 bg-black/10 blur-xl rounded-full -z-10" />
        </div>

        <p className="text-xl font-medium tracking-wide" style={{ color: 'var(--text-secondary)' }}>
          Save it. Spend it. See it grow.
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="w-full mb-10 px-4 flex justify-center gap-4">
        <button
          onClick={() => onNavigate('lessons')}
          className="flex-1 bg-[#A7C7E7] hover:bg-[#96b6d6] border-b-4 border-[#85a5c5] rounded-2xl p-4 flex items-center justify-center gap-3 shadow-lg transition-transform active:scale-95 group"
        >
          <div className="bg-white/30 p-1.5 rounded-full group-hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 text-gray-700">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="font-bold text-gray-700 text-lg drop-shadow-sm font-fredoka">Earn coins</span>
        </button>

        <button
          onClick={() => window.location.href = '/webxr-ar.html'}
          className="flex-1 bg-[#C3B1E1] hover:bg-[#b2a0d0] border-b-4 border-[#a18fbf] rounded-2xl p-4 flex items-center justify-center gap-3 shadow-lg transition-transform active:scale-95 group"
        >
          <div className="bg-white/30 p-1.5 rounded-full group-hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 text-gray-700">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
            </svg>
          </div>
          <span className="font-bold text-gray-700 text-lg drop-shadow-sm font-fredoka">AR Room</span>
        </button>
      </div>

      {/* Piggy Bank Tip - FinLit */}
      <div className="w-full flex flex-col items-center animate-pop-in opacity-0" style={{ animationDelay: '1.5s', animationFillMode: 'forwards' }}>
        {/* Speech Bubble */}
        <div className="relative bg-white border-2 border-gray-200 rounded-2xl p-4 mb-2 shadow-sm max-w-xs transform hover:scale-105 transition-transform">
          <p className="text-sm text-gray-700 font-medium text-center">
            "Did you know? Saving even <strong>$1</strong> today can grow into more tomorrow!"
          </p>
          {/* Triangle */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-b-2 border-r-2 border-gray-200 rotate-45"></div>
        </div>

        {/* Piggy Bank Icon */}
        <div className="text-6xl filter drop-shadow-md pb-2 hover:animate-bounce cursor-pointer">
          🐷
        </div>
      </div>

      {/* Progress Section */}
      <div className="w-full">
        <Card backgroundColor="white">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <span>📊</span> Your Progress
          </h2>
          <div className="space-y-4">
            {/* Lessons Progress Bar */}
            <div className="flex justify-between items-center">
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Lessons Completed
              </span>
              <div className="flex items-center gap-2">
                <div
                  className="h-2 w-32 rounded-full overflow-hidden"
                  style={{ backgroundColor: '#e5e5e5' }}
                >
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      backgroundColor: 'var(--dark-sage)',
                      width: `${(completedLessons.length / lessons.length) * 100}%`
                    }}
                  />
                </div>
                <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {completedLessons.length}/{lessons.length}
                </span>
              </div>
            </div>

            {/* Items Collected */}
            <div className="flex justify-between items-center">
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Items Collected
              </span>
              <span className="text-sm font-semibold" style={{ color: 'var(--deep-lavender)' }}>
                {ownedItems.length} items
              </span>
            </div>

            {/* Total Wealth */}
            <div className="flex justify-between items-center pt-3 border-t" style={{ borderColor: '#e5e5e5' }}>
              <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                Total Wealth
              </span>
              <span className="text-lg font-bold" style={{ color: 'var(--dark-sage)' }}>
                {coins + savedCoins} 🪙
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
