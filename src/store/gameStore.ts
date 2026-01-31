import { create } from 'zustand'

export interface ShopItem {
  id: string
  name: string
  price: number
  modelPath: string
  category: 'want' | 'need' | 'upgrade'
  thumbnail?: string
}

export interface OwnedItem {
  id: string
  itemId: string
  position?: { x: number; y: number; z: number }
  scale?: number
}

interface GameState {
  // Piggy Bank (all coins stored here)
  savedCoins: number
  addCoins: (amount: number) => void
  spendCoins: (amount: number) => boolean
  growSavings: () => void // Simulates interest

  // Inventory
  ownedItems: OwnedItem[]
  buyItem: (item: ShopItem) => boolean
  
  // Lessons
  completedLessons: string[]
  completeLesson: (lessonId: string) => void
}

export const useGameStore = create<GameState>((set, get) => ({
  // Piggy Bank - all coins stored here
  savedCoins: 50, // Start with some coins for demo
  
  addCoins: (amount) => set((state) => ({ 
    savedCoins: state.savedCoins + amount 
  })),
  
  spendCoins: (amount) => {
    const state = get()
    if (state.savedCoins >= amount) {
      set({ savedCoins: state.savedCoins - amount })
      return true
    }
    return false
  },
  
  growSavings: () => set((state) => ({ 
    // 10% growth rate for demo purposes
    savedCoins: Math.floor(state.savedCoins * 1.1) 
  })),

  // Inventory
  ownedItems: [],
  
  buyItem: (item) => {
    const state = get()
    if (state.savedCoins >= item.price) {
      set({ 
        savedCoins: state.savedCoins - item.price,
        ownedItems: [...state.ownedItems, { 
          id: `${item.id}-${Date.now()}`, 
          itemId: item.id 
        }]
      })
      return true
    }
    return false
  },

  // Lessons
  completedLessons: [],
  
  completeLesson: (lessonId) => set((state) => ({
    completedLessons: state.completedLessons.includes(lessonId) 
      ? state.completedLessons 
      : [...state.completedLessons, lessonId]
  })),
}))
