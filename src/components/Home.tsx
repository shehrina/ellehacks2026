import { useGameStore } from '../store/gameStore'
import { lessons } from '../data/lessons'
import { StatCard } from './StatCard'
import { ActionCard } from './ActionCard'
import { Card } from './Card'

interface HomeProps {
  onNavigate: (tab: string) => void
}

export function Home({ onNavigate }: HomeProps) {
  const coins = useGameStore((state) => state.coins)
  const savedCoins = useGameStore((state) => state.savedCoins)
  const completedLessons = useGameStore((state) => state.completedLessons)
  const ownedItems = useGameStore((state) => state.ownedItems)

  const availableLessons = lessons.filter(
    (l) => !completedLessons.includes(l.id)
  ).length

  const getLessonDescription = () => {
    if (availableLessons === 0) return 'All caught up! Great work! 🎉'
    const plural = availableLessons === 1 ? 'lesson' : 'lessons'
    return `${availableLessons} ${plural} waiting for you`
  }

  const getItemsDescription = () => {
    if (ownedItems.length === 0) return 'Start with a lesson to unlock items'
    const plural = ownedItems.length === 1 ? 'item' : 'items'
    return `${ownedItems.length} ${plural} ready to place`
  }

  return (
    <div className="p-6 pb-24 max-w-2xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12 mt-8">
        <div className="inline-block mb-4 text-6xl animate-bounce-slow">🪙</div>
        <h1 className="text-4xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
          Learn Money,<br />
          <span style={{ color: 'var(--dark-sage)' }}>Play Smart</span>
        </h1>
        <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
          Save it. Spend it. See it grow.
        </p>
      </div>

      {/* Wallet & Piggy Bank Cards */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <StatCard
          icon="👛"
          label="Wallet"
          value={coins}
          sublabel="ready to spend"
          backgroundColor="var(--sage-green)"
        />
        <StatCard
          icon="🐷"
          label="Piggy Bank"
          value={savedCoins}
          sublabel="growing safely"
          backgroundColor="var(--soft-lavender)"
        />
      </div>

      {/* Action Cards */}
      <div className="space-y-4 mb-8">
        <ActionCard
          icon="📚"
          title="Play a Lesson"
          description={getLessonDescription()}
          backgroundColor="var(--soft-mint)"
          arrowColor="var(--dark-sage)"
          onClick={() => onNavigate('lessons')}
        />
        <ActionCard
          icon="✨"
          title="Open AR Room"
          description={getItemsDescription()}
          backgroundColor="var(--soft-peach)"
          arrowColor="var(--deep-lavender)"
          onClick={() => onNavigate('ar')}
        />
        <ActionCard
          icon="🛍️"
          title="Visit Shop"
          description="Spend your coins on cool items"
          backgroundColor="var(--light-gray)"
          arrowColor="var(--text-secondary)"
          onClick={() => onNavigate('shop')}
        />
      </div>

      {/* Progress Section */}
      <Card backgroundColor="white">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
          <span>📊</span> Your Progress
        </h2>
        <div className="space-y-4">
          {/* Lessons Progress Bar */}
          <div className="flex justify-between items-center">
            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Lessons Completed
            </span>
            <div className="flex items-center gap-2">
              <div 
                className="h-2 w-32 rounded-full overflow-hidden"
                style={{ backgroundColor: '#e5e5e5' }}
              >
                <div 
                  className="h-full rounded-full transition-all"
                  style={{ 
                    backgroundColor: 'var(--dark-sage)',
                    width: `${(completedLessons.length / lessons.length) * 100}%`
                  }}
                />
              </div>
              <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                {completedLessons.length}/{lessons.length}
              </span>
            </div>
          </div>

          {/* Items Collected */}
          <div className="flex justify-between items-center">
            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Items Collected
            </span>
            <span className="text-sm font-semibold" style={{ color: 'var(--deep-lavender)' }}>
              {ownedItems.length} items
            </span>
          </div>

          {/* Total Wealth */}
          <div className="flex justify-between items-center pt-3 border-t" style={{ borderColor: '#e5e5e5' }}>
            <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
              Total Wealth
            </span>
            <span className="text-lg font-bold" style={{ color: 'var(--dark-sage)' }}>
              {coins + savedCoins} 🪙
            </span>
          </div>
        </div>
      </Card>
    </div>
  )
}
