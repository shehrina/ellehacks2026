import { useState } from 'react'
import { Navigation } from './components/Navigation'
import { TopNav } from './components/TopNav'
import { Home } from './components/Home'
import { Shop } from './components/Shop'
import { ARRoom } from './components/ARRoom'
import { PiggyBank } from './components/PiggyBank'
import { Lessons } from './components/Lessons'


function App() {
  const [currentTab, setCurrentTab] = useState('home')
  const [showSplash, setShowSplash] = useState(true)

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
      {/* Header with coins */}
      <TopNav onNavigate={setCurrentTab} />

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
