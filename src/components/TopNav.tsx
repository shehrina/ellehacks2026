import { Link } from 'react-router-dom'
import { useGameStore } from '../store/gameStore'
import userBadge from '../assets/user_badge.png'

export function TopNav() {
    const coins = useGameStore((state) => state.coins)

    return (
        <header className="sticky top-0 bg-white border-b border-gray-200 px-3 py-2 z-10">
            <div className="flex justify-between items-center w-full max-w-2xl mx-auto gap-2">
                {/* Left: User Profile */}
                <Link to="/" className="flex items-center hover:opacity-90 transition-opacity cursor-pointer flex-shrink-0">
                    <img src={userBadge} alt="Kai User Profile" className="h-12 w-auto object-contain drop-shadow-md" />
                </Link>

                {/* Center: Title */}
                <Link to="/" className="flex-shrink-0">
                    <span className="font-bold text-xl sm:text-2xl text-gray-900 tracking-tight" style={{ fontFamily: 'Fredoka, sans-serif' }}>CoinQuest</span>
                </Link>

                {/* Right: Coins */}
                <div className="flex items-center bg-[#d3eaf5] rounded-full px-2 py-1 gap-1.5 shadow-md border-2 border-blue-50 flex-shrink-0">
                    {/* Coin Icon - W Coin */}
                    <div className="w-7 h-7 rounded-full bg-gradient-to-b from-[#FFD700] to-[#E5C100] shadow-sm flex items-center justify-center border border-[#FFD700] relative overflow-hidden">
                        <span className="font-black text-sm text-[#B4860B]" style={{ fontFamily: 'Fredoka, sans-serif' }}>W</span>
                        <div className="absolute -top-2 -left-2 w-5 h-5 bg-white/40 blur-md rounded-full pointer-events-none" />
                    </div>

                    {/* Count */}
                    <span className="font-bold text-black text-base" style={{ fontFamily: 'Fredoka, sans-serif' }}>{coins}</span>
                </div>
            </div>
        </header>
    )
}
