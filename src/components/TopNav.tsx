import { GiBearFace } from 'react-icons/gi'
import { useGameStore } from '../store/gameStore'
import { Link } from 'react-router-dom'

export function TopNav() {
    const coins = useGameStore((state) => state.coins)

    return (
        <header className="sticky top-0 bg-gray-50/90 backdrop-blur-md border-b border-gray-100 px-4 py-3 z-30 min-h-[72px] flex items-center">
            <div className="relative flex justify-between items-center w-full max-w-5xl mx-auto">
                {/* Left: Wally the Bear Avatar (Pill Design) */}
                <div className="flex justify-start items-center z-20 min-w-0">
                    <Link to="/" className="group flex items-center transition-all duration-300 relative">
                        {/* Avatar Square (Rounded Edges) - Moved to front of pill */}
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#A3C1E0] group-hover:bg-[#1E3A8A] rounded-xl sm:rounded-2xl flex items-center justify-center border-2 border-white shadow-md transition-all group-hover:scale-110 overflow-hidden shrink-0 z-30 relative">
                            <GiBearFace className="text-2xl sm:text-3xl text-black group-hover:text-white transition-all duration-300" />
                        </div>

                        {/* The Pill Background - Now with thicker white border and horizontal 'pop out' animation */}
                        <div className="h-8 sm:h-10 bg-blue-50 rounded-full pl-6 pr-4 sm:pl-8 sm:pr-5 -ml-4 shadow-sm flex items-center border-2 border-white group-hover:bg-blue-100 transition-all duration-500 group-hover:translate-x-2 z-20">
                            <span
                                className="font-medium text-black text-[10px] sm:text-sm tracking-wide transition-all duration-300 group-hover:scale-105"
                                style={{ fontFamily: 'Fredoka, sans-serif' }}
                            >
                                Wally
                            </span>
                        </div>
                    </Link>
                </div>

                {/* Center: Title (Mathematically Centered) */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-auto pointer-events-none z-10">
                    <Link
                        to="/"
                        className="hover:opacity-100 transition-all whitespace-nowrap pointer-events-auto group px-7 py-3.5 rounded-2xl hover:bg-blue-50/50 active:scale-95 flex items-center justify-center border border-transparent hover:border-blue-100/50"
                    >
                        <span
                            className="font-bold text-2xl sm:text-4xl md:text-5xl text-gray-900 tracking-tighter text-center block transition-transform group-hover:scale-105"
                            style={{ fontFamily: '"Cinzel", serif', wordSpacing: '-0.05em' }}
                        >
                            Coinquest
                        </span>
                    </Link>
                </div>

                {/* Right: Coins (Balanced Size) */}
                <div className="flex justify-end items-center z-20 min-w-0">
                    <div className="flex items-center bg-[#d3eaf5] rounded-full py-1.5 sm:py-2 px-3 sm:px-4.5 gap-2 sm:gap-2.5 shadow-sm border-2 border-blue-200 scale-85 sm:scale-95 origin-right min-w-[50px] sm:min-w-[75px] justify-center">
                        {/* Coin Icon */}
                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-b from-[#FFED4A] to-[#E5C100] shadow-md flex items-center justify-center border border-yellow-400 relative overflow-hidden shrink-0">
                            <span className="font-black text-[10px] sm:text-sm text-[#B4860B] relative z-10" style={{ fontFamily: 'Fredoka, sans-serif' }}>W</span>
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-transparent via-white/40 to-transparent opacity-0 animate-glare" />
                        </div>

                        {/* Count */}
                        <span className="font-medium text-black text-xs sm:text-base tracking-wide whitespace-nowrap" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                            {coins}
                        </span>

                        {/* Plus Link */}
                        <Link
                            to="/lessons"
                            className="w-5 h-5 sm:w-7 sm:h-7 bg-white hover:bg-blue-500 hover:text-white rounded-full flex items-center justify-center text-blue-500 transition-all duration-300 hover:scale-110 shadow-sm border border-blue-50 shrink-0"
                            aria-label="Add Coins"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4.5} stroke="currentColor" className="w-3 h-3 sm:w-4.5 h-4.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}
