import { useNavigate } from 'react-router-dom'
import { useGameStore } from '../store/gameStore'
import { lessons } from '../data/lessons'
import { Card } from './Card'
import { HiChartBar } from 'react-icons/hi2'

export function Home() {
  const navigate = useNavigate()
  const coins = useGameStore((state) => state.coins)
  const completedLessons = useGameStore((state) => state.completedLessons)
  const ownedItems = useGameStore((state) => state.ownedItems)

  return (
    <div className="p-6 pb-24 max-w-2xl mx-auto flex flex-col items-center">
      {/* Hero Section */}
      <div className="text-center mb-4 mt-4 w-full flex flex-col items-center">
        {/* Huge Gold Button */}
        <div className="relative group cursor-pointer animate-float mb-4" onClick={() => navigate('/lessons')}>

          {/* Spinning Container */}
          <div className="animate-spin-slow preserve-3d">
            {/* Main Button Circle - Clean Professional Gold Coin */}
            <div className="w-32 h-32 rounded-full bg-gradient-to-b from-[#FFD700] to-[#E5C100] shadow-[0_10px_30px_rgba(234,179,8,0.5),inset_0_-8px_12px_rgba(0,0,0,0.1),inset_0_4px_12px_rgba(255,255,255,0.7)] flex items-center justify-center border-4 border-[#FFD700] ring-4 ring-yellow-100/50 relative overflow-hidden">

              {/* Subtle Inner Rim */}
              <div className="absolute inset-1.5 rounded-full border border-[#FFFFFF]/30" />

              {/* W Symbol */}
              <span className="font-black text-[4.5rem] text-[#B4860B] drop-shadow-sm relative z-10" style={{ fontFamily: 'Fredoka, sans-serif' }}>W</span>

              {/* Shininess / Glare */}
              {/* Static Highlight */}
              <div className="absolute -top-8 -left-8 w-24 h-24 bg-white/40 blur-2xl rounded-full pointer-events-none" />

              {/* Moving Glare / Sheen */}
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-tr from-transparent via-white/50 to-transparent opacity-60 animate-glare pointer-events-none" />

              {/* Bottom Reflection */}
              <div className="absolute -bottom-3 right-3 w-16 h-16 bg-yellow-200/20 blur-xl rounded-full" />
            </div>
          </div>

          {/* Shadow/Glow under button - static relative to page */}
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-black/10 blur-xl rounded-full -z-10" />
        </div>

        <p className="text-sm font-medium tracking-wide mb-4" style={{ color: 'var(--text-secondary)' }}>
          Save it. Spend it. See it.
        </p>
      </div>

      {/* Navigation Buttons - Side-by-Side 3D Design */}
      <div className="w-full mb-10 px-4 flex flex-row items-center justify-center gap-4">

        {/* Earn Coins Button - 3D Previous Blue */}
        <button
          onClick={() => navigate('/lessons')}
          className="flex-1 max-w-[180px] bg-[#A7C7E7] hover:bg-[#96b6d6] border-b-[6px] border-[#85a5c5] rounded-xl py-3 px-4 flex items-center justify-center gap-2 shadow-xl transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1 active:translate-y-1 active:border-b-[2px] group relative overflow-hidden"
        >
          {/* Shine overlay */}
          <div className="absolute top-0 left-0 w-full h-[50%] bg-white/10 pointer-events-none" />

          {/* W Token Coin Icon */}
          <div className="w-7 h-7 rounded-full bg-gradient-to-b from-[#FFD700] to-[#E5C100] shadow-[0_2px_4px_rgba(0,0,0,0.2),inset_0_-1px_2px_rgba(0,0,0,0.2),inset_0_1px_2px_rgba(255,255,255,0.8)] flex items-center justify-center border-2 border-[#FFD700] shrink-0 transform group-hover:rotate-[20deg] transition-transform duration-500 relative overflow-hidden">
            <span className="font-black text-sm text-[#B4860B]" style={{ fontFamily: 'Fredoka, sans-serif' }}>W</span>
            <div className="absolute -top-1 -left-1 w-3 h-3 bg-white/40 blur-sm rounded-full pointer-events-none" />
          </div>

          <span className="font-bold text-gray-700 text-sm drop-shadow-sm font-fredoka tracking-wide whitespace-nowrap">Earn Coins</span>
        </button>

        {/* AR Room Button - 3D Previous Purple */}
        <button
          onClick={() => window.location.href = '/webxr-ar.html'}
          className="flex-1 bg-[#C3B1E1] hover:bg-[#b2a0d0] border-b-4 border-[#a18fbf] rounded-2xl p-4 flex items-center justify-center gap-3 shadow-lg transition-transform active:scale-95 group"
        >
          {/* Box Icon Container */}
          <div className="w-7 h-7 rounded-full bg-white/30 flex items-center justify-center shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-gray-700">
              <path d="M12.378 1.602a.75.75 0 00-.756 0L3 6.632l9 5.25 9-5.25-8.622-5.03zM21.75 7.93l-9 5.25v9l8.628-5.032a.75.75 0 00.372-.648V7.93zM11.25 22.18v-9l-9-5.25v8.59a.75.75 0 00.372.648l8.628 5.033z" />
            </svg>
          </div>
          <span className="font-bold text-gray-700 text-sm font-fredoka tracking-wide whitespace-nowrap">AR Room</span>
        </button>
      </div>

      {/* Tip Section - Slim Speech Bubble with Flush Hero Bear */}
      <div className="w-full mb-10 px-4 animate-pop-in opacity-0" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
        <div className="relative bg-white rounded-[1.5rem] sm:rounded-[2.5rem] border-2 border-slate-100 shadow-[inset_0_4px_8px_rgba(0,0,0,0.03),0_10px_30px_rgba(0,0,0,0.05)] pt-8 sm:pt-12 pb-0.5 sm:pb-1 pl-2 sm:pl-4 pr-4 sm:pr-8 flex flex-row items-end overflow-visible group hover:scale-[1.01] transition-transform duration-500 min-h-[80px] sm:min-h-[120px]">

          {/* Triangular Notch (Speech Bubble Tail) on the left */}
          <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-l-2 border-b-2 border-slate-100 rotate-45 z-10 hidden sm:block shadow-[-2px_2px_3px_rgba(0,0,0,0.02)]"></div>

          {/* Top Badge (Lighter Purple) */}
          <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 bg-[#DED2F0] border-b-2 sm:border-b-4 border-[#C7B5E2] px-5 sm:px-8 py-1 rounded-full shadow-lg z-30 whitespace-nowrap">
            <span className="text-gray-700 font-bold text-xs sm:text-lg tracking-wide drop-shadow-sm font-fredoka">Tip of the day</span>
          </div>

          {/* Left: Wally Mascot (Flush with bottom, Hero Size) */}
          <div className="absolute bottom-0 left-0 sm:left-2 w-28 h-28 sm:w-48 sm:h-48 shrink-0 z-20 group-hover:scale-105 transition-transform duration-500 pointer-events-none">
            <img
              src="/wally-tip.png"
              alt="Wally Bear"
              className="w-full h-full object-contain object-bottom filter drop-shadow-sm"
            />
          </div>

          {/* Spacer for Heavy Bear Mascot (Width matches bear's footprint) */}
          <div className="w-24 sm:w-44 shrink-0" />

          {/* Right: Tip Text (Bottom-aligned) */}
          <div className="flex-1 flex flex-col items-center sm:items-start relative z-10 pb-1 sm:pb-2">
            <p className="text-slate-700 font-semibold text-center sm:text-left text-xs sm:text-base md:text-lg leading-relaxed sm:leading-snug font-fredoka drop-shadow-sm">
              Saving even $1 today can grow into more tomorrow!
            </p>
            {/* Subtle Divider Line */}
            <div className="w-12 sm:w-24 h-0.5 bg-slate-50 mt-1 sm:mt-2 rounded-full mx-auto sm:mx-0" />
          </div>

        </div>
      </div>

      {/* Progress Section */}
      <div className="w-full">
        <Card backgroundColor="white">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <HiChartBar className="w-5 h-5 text-blue-500" /> Your Progress
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
                Total Coins
              </span>
              <span className="text-lg font-bold flex items-center gap-1.5" style={{ color: 'var(--dark-sage)' }}>
                {coins}
                <div className="w-5 h-5 rounded-full bg-gradient-to-b from-[#FFD700] to-[#E5C100] shadow-sm flex items-center justify-center border border-[#FFD700] relative overflow-hidden">
                  <span className="font-black text-[10px] text-[#B4860B]" style={{ fontFamily: 'Fredoka, sans-serif' }}>W</span>
                </div>
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
