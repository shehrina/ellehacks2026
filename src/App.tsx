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
    <div className="min-h-screen" style={{ backgroundColor: '#f9f8f6' }}>
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
  )
}

export default App
