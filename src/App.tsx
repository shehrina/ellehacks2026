import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Navigation } from './components/Navigation'
import { TopNav } from './components/TopNav'
import { Home } from './components/Home'
import { Shop } from './components/Shop'
import { ARRoom } from './components/ARRoom'
import { PiggyBank } from './components/PiggyBank'
import { Lessons } from './components/Lessons'


function App() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#f8fbff] via-[#f0f9ff] to-[#f8fbff]">
      {/* Enhanced Multi-shaded Background Glare Effects */}
      <div className="absolute top-[-5%] right-[-5%] w-[60%] h-[60%] bg-[#BAE6FD]/30 blur-[120px] rounded-full pointer-events-none -z-0 animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-[-10%] left-[-5%] w-[50%] h-[50%] bg-[#BFDBFE]/20 blur-[100px] rounded-full pointer-events-none -z-0 animate-pulse" style={{ animationDuration: '12s' }} />
      <div className="absolute top-[20%] left-[10%] w-[30%] h-[30%] bg-white/50 blur-[80px] rounded-full pointer-events-none -z-0" />
      <div className="absolute bottom-[20%] right-[15%] w-[35%] h-[35%] bg-[#F0F9FF]/40 blur-[90px] rounded-full pointer-events-none -z-0" />

      <div className="relative z-10">
        <TopNav />

        {/* Main content */}
        <main className="max-w-lg mx-auto pb-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lessons" element={<Lessons />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/piggy" element={<PiggyBank />} />
            <Route path="/ar" element={<ARRoom />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Bottom navigation */}
        <Navigation />
      </div>
    </div>
  )
}

export default App
