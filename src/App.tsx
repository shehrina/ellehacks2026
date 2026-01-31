import { useState } from 'react'
import { Navigation } from './components/Navigation'
import { Home } from './components/Home'
import { Shop } from './components/Shop'
import { ARRoom } from './components/ARRoom'
import { PiggyBank } from './components/PiggyBank'
import { Lessons } from './components/Lessons'
import { CoinDisplay } from './components/CoinDisplay'

function App() {
  const [currentTab, setCurrentTab] = useState('home')

  const renderContent = () => {
    switch (currentTab) {
      case 'home':
        return <Home onNavigate={setCurrentTab} />
      case 'lessons':
        return <Lessons />
      case 'shop':
        return <Shop />
      case 'piggy':
        return <PiggyBank />
      case 'ar':
        return <ARRoom />
      default:
        return <Home onNavigate={setCurrentTab} />
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f9f8f6' }}>
      {/* Header with coins */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-200 px-4 py-3 z-10">
        <div className="flex justify-between items-center max-w-lg mx-auto">
          <span className="font-bold text-lg text-gray-800">🪙 CoinQuest</span>
          <CoinDisplay />
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-lg mx-auto pb-20">
        {renderContent()}
      </main>

      {/* Bottom navigation */}
      <Navigation currentTab={currentTab} onTabChange={setCurrentTab} />
    </div>
  )
}

export default App
