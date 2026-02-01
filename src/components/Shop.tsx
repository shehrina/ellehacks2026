import { useGameStore } from '../store/gameStore'
import type { ShopItem } from '../store/gameStore'
import { shopItems } from '../data/shopItems'
import { ModelViewer } from './ModelViewer'
import { FaShoppingBag, FaArrowUp, FaBox } from 'react-icons/fa'
import { MdStar } from 'react-icons/md'

const categoryColors = {
  want: 'bg-purple-100 text-purple-700',
  need: 'bg-blue-100 text-blue-700',
  upgrade: 'bg-green-100 text-green-700',
}

const categoryLabels = {
  want: { icon: <MdStar className="inline" />, text: 'Want' },
  need: { icon: <FaBox className="inline" />, text: 'Need' },
  upgrade: { icon: <FaArrowUp className="inline" />, text: 'Upgrade' },
}

interface ShopItemCardProps {
  item: ShopItem
}

function ShopItemCard({ item }: ShopItemCardProps) {
  const coins = useGameStore((state) => state.coins)
  const buyItem = useGameStore((state) => state.buyItem)
  const canAfford = coins >= item.price

  const handleBuy = () => {
    const success = buyItem(item)
    if (success) {
      // Could add animation/sound here
      console.log(`Bought ${item.name}!`)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-100">
      {/* 3D Preview */}
      <div className="h-48 bg-gradient-to-b from-gray-50 to-gray-100">
        <ModelViewer src={item.modelPath} alt={item.name} ar={false} />
      </div>
      
      {/* Info */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-gray-800">{item.name}</h3>
          <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${categoryColors[item.category]}`}>
            {categoryLabels[item.category].icon}
            {categoryLabels[item.category].text}
          </span>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-1">
            <img src="/icons/coin.webp" alt="coin" className="w-5 h-5" />
            <span className="font-bold text-lg">{item.price}</span>
          </div>
          
          <button
            onClick={handleBuy}
            disabled={!canAfford}
            className={`px-4 py-2 rounded-full font-semibold transition-all ${
              canAfford
                ? 'bg-green-500 text-white hover:bg-green-600 active:scale-95'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {canAfford ? 'Buy' : 'Need more coins'}
          </button>
        </div>
      </div>
    </div>
  )
}

export function Shop() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <FaShoppingBag />
        Shop
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {shopItems.map((item) => (
          <ShopItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}
