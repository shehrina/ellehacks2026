import { useGameStore } from '../store/gameStore'
import userBadge from '../assets/user_badge.png'

interface TopNavProps {
    onNavigate: (tab: string) => void
}

export function TopNav({ onNavigate }: TopNavProps) {
    const coins = useGameStore((state) => state.coins)

    return (
        <header className="sticky top-0 bg-white border-b border-gray-200 px-4 py-2 z-10 relative">
            <div className="flex justify-between items-center w-full max-w-2xl mx-auto">
                {/* Left: User Profile */}
                <div className="flex items-center hover:opacity-90 transition-opacity cursor-pointer z-20">
                    <img src={userBadge} alt="Kai User Profile" className="h-20 w-auto object-contain -my-4 drop-shadow-md" />
                </div>

                {/* Center: Title */}
                <div className="absolute left-1/2 transform -translate-x-1/2">
                    <span className="font-bold text-3xl text-gray-900 tracking-tight" style={{ fontFamily: 'Fredoka, sans-serif' }}>CoinQuest</span>
                </div>

                {/* Right: Coins & Action */}
                <div className="flex items-center bg-[#d3eaf5] rounded-full p-1.5 pr-3 gap-2 shadow-lg border-4 border-blue-50">
                    {/* Coin Icon */}
                    {/* Coin Icon - W Coin */}
                    <div className="w-10 h-10 rounded-full bg-gradient-to-b from-[#FFD700] to-[#E5C100] shadow-sm flex items-center justify-center border border-[#FFD700] relative overflow-hidden ring-1 ring-yellow-100/50">
                        {/* W Symbol */}
                        <span className="font-black text-lg text-[#B4860B] drop-shadow-sm relative z-10" style={{ fontFamily: 'Fredoka, sans-serif' }}>W</span>

                        {/* Glare */}
                        <div className="absolute -top-3 -left-3 w-8 h-8 bg-white/40 blur-md rounded-full pointer-events-none" />
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent opacity-50 pointer-events-none" />
                    </div>

                    {/* Count */}
                    <span className="font-bold text-black text-xl tracking-wide drop-shadow-sm" style={{ fontFamily: 'Fredoka, sans-serif' }}>{coins} coins</span>

                    {/* Plus Button */}
                    <button
                        onClick={() => onNavigate('lessons')}
                        className="w-7 h-7 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center text-blue-500 transition-all hover:scale-105 shadow-sm ml-1"
                        aria-label="Add Lesson"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    )
}
