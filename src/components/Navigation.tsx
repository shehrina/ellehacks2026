import { HiHome, HiCurrencyDollar, HiShoppingBag, HiCube } from 'react-icons/hi'
import { GiPiggyBank } from 'react-icons/gi'

interface NavigationProps {
  currentTab: string
  onTabChange: (tab: string) => void
}

const tabs = [
  { id: 'home', label: 'Home', icon: HiHome },
  { id: 'lessons', label: 'Earn', icon: HiCurrencyDollar },
  { id: 'shop', label: 'Shop', icon: HiShoppingBag },
  { id: 'piggy', label: 'Save', icon: GiPiggyBank },
  { id: 'ar', label: 'AR Room', icon: HiCube },
]

export function Navigation({ currentTab, onTabChange }: NavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 pb-safe">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
        {tabs.map((tab) => {
          const IconComponent = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center w-16 h-full transition-all ${
                currentTab === tab.id
                  ? 'text-blue-600 scale-110'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <IconComponent className="text-xl mb-0.5" />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
