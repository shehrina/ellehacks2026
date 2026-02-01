import { HiHome, HiCurrencyDollar, HiShoppingBag, HiCube } from 'react-icons/hi'
import { GiPiggyBank } from 'react-icons/gi'
import { Link, useLocation } from 'react-router-dom'

const tabs = [
  { id: 'home', label: 'Home', icon: HiHome, path: '/' },
  { id: 'lessons', label: 'Earn', icon: HiCurrencyDollar, path: '/lessons' },
  { id: 'shop', label: 'Shop', icon: HiShoppingBag, path: '/shop' },
  { id: 'piggy', label: 'Save', icon: GiPiggyBank, path: '/piggy' },
  { id: 'ar', label: 'AR Room', icon: HiCube, path: '/ar' },
]

export function Navigation() {
  const location = useLocation()
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-300 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] px-2 pb-safe z-[100]">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
        {tabs.map((tab) => {
          const IconComponent = tab.icon
          const isActive = location.pathname === tab.path
          
          return (
            <Link
              key={tab.id}
              to={tab.path}
              className={`flex flex-col items-center justify-center w-16 h-full transition-all ${
                isActive
                  ? 'text-blue-600 scale-110'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <IconComponent className="text-xl mb-0.5" />
              <span className="text-xs font-medium">{tab.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
