import { useState } from 'react'
import { GiBearFace } from 'react-icons/gi'
import { useGameStore } from '../store/gameStore'
import { Link } from 'react-router-dom'

export function TopNav() {
    const coins = useGameStore((state) => state.coins)
    const completedLessons = useGameStore((state) => state.completedLessons)
    const ownedItems = useGameStore((state) => state.ownedItems)
    
    const [showParentModal, setShowParentModal] = useState(false)
    const [password, setPassword] = useState('')
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [error, setError] = useState('')

    const handlePasswordSubmit = () => {
        if (password === '123password') {
            setIsAuthenticated(true)
            setError('')
        } else {
            setError('Incorrect password')
        }
    }

    const closeModal = () => {
        setShowParentModal(false)
        setPassword('')
        setIsAuthenticated(false)
        setError('')
    }

    return (
        <>
        <header className="sticky top-0 bg-gray-50/90 backdrop-blur-md border-b border-gray-100 px-4 py-3 z-30 min-h-[72px] flex items-center">
            <div className="relative flex justify-between items-center w-full max-w-5xl mx-auto">
                {/* Left: Wally the Bear Avatar (Pill Design) */}
                <div className="flex justify-start items-center z-20 min-w-0">
                    <button onClick={() => setShowParentModal(true)} className="group flex items-center transition-all duration-300 relative">
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
                    </button>
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

        {/* Parent Portal Modal */}
        {showParentModal && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={closeModal}>
                <div 
                    className="bg-white rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                >
                    {!isAuthenticated ? (
                        /* Password Screen */
                        <div className="p-6">
                            <div className="text-center mb-6">
                                <div className="w-16 h-16 bg-[#A3C1E0] rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <GiBearFace className="text-4xl text-black" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                                    Parent Portal
                                </h2>
                                <p className="text-gray-500 mt-2 text-sm">Enter password to view your child's progress</p>
                            </div>
                            
                            <div className="space-y-4">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handlePasswordSubmit()}
                                    placeholder="Enter password"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none text-center text-lg"
                                />
                                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                                <button
                                    onClick={handlePasswordSubmit}
                                    className="w-full bg-[#A3C1E0] hover:bg-[#8fb3d6] text-gray-800 font-bold py-3 rounded-xl transition-all"
                                >
                                    Enter
                                </button>
                                <button
                                    onClick={closeModal}
                                    className="w-full text-gray-400 hover:text-gray-600 py-2"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        /* Parent Dashboard */
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                                        Parent Dashboard
                                    </h2>
                                    <p className="text-gray-500 text-sm">Your child's financial journey</p>
                                </div>
                                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
                            </div>

                            {/* TLDR Summary */}
                            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-5 mb-6 border border-blue-100">
                                <h3 className="font-bold text-gray-800 mb-3">
                                    TLDR Summary
                                </h3>
                                <p className="text-gray-700 leading-relaxed">
                                    Your child has been learning about <strong>saving vs. spending</strong>, 
                                    <strong> needs vs. wants</strong>, and <strong>patience with money</strong>. 
                                    They're building great habits by completing quests and making smart choices 
                                    about their virtual coins!
                                </p>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="bg-yellow-50 rounded-xl p-4 text-center border border-yellow-100">
                                    <p className="text-3xl font-bold text-yellow-600">{coins}</p>
                                    <p className="text-sm text-gray-600">Coins Earned</p>
                                </div>
                                <div className="bg-green-50 rounded-xl p-4 text-center border border-green-100">
                                    <p className="text-3xl font-bold text-green-600">{completedLessons.length}/5</p>
                                    <p className="text-sm text-gray-600">Quests Done</p>
                                </div>
                                <div className="bg-purple-50 rounded-xl p-4 text-center border border-purple-100">
                                    <p className="text-3xl font-bold text-purple-600">{ownedItems.length}</p>
                                    <p className="text-sm text-gray-600">Items Bought</p>
                                </div>
                                <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-100">
                                    <p className="text-3xl font-bold text-blue-600">⭐</p>
                                    <p className="text-sm text-gray-600">Great Progress!</p>
                                </div>
                            </div>

                            {/* What They've Learned */}
                            <div className="mb-6">
                                <h3 className="font-bold text-gray-800 mb-3">
                                    What They've Learned
                                </h3>
                                <ul className="space-y-2">
                                    <li className="flex items-center gap-3 text-gray-700">
                                        <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-sm">✓</span>
                                        Delaying gratification leads to bigger rewards
                                    </li>
                                    <li className="flex items-center gap-3 text-gray-700">
                                        <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-sm">✓</span>
                                        Needs should come before wants
                                    </li>
                                    <li className="flex items-center gap-3 text-gray-700">
                                        <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-sm">✓</span>
                                        Money grows when you give it time
                                    </li>
                                    <li className="flex items-center gap-3 text-gray-700">
                                        <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-sm">✓</span>
                                        Planning helps you reach goals
                                    </li>
                                </ul>
                            </div>

                            {/* Unlocked Achievements */}
                            <div>
                                <h3 className="font-bold text-gray-800 mb-3">
                                    Achievements Unlocked
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
                                        🌟 First Quest Complete
                                    </span>
                                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                                        💰 Smart Saver
                                    </span>
                                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                                        🛍️ First Purchase
                                    </span>
                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                                        🎯 Goal Setter
                                    </span>
                                </div>
                            </div>

                            {/* Powered by */}
                            <div className="mt-6 pt-4 border-t border-gray-100 text-center">
                                <p className="text-xs text-gray-400">
                                    Powered by CoinQuest • Teaching financial literacy through play
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )}
        </>
    )
}
