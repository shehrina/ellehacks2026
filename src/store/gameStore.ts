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
  coins: number
  // Piggy Bank (all coins stored here)
  savedCoins: number
  addCoins: (amount: number) => void
  spendCoins: (amount: number) => boolean
  growSavings: () => void // Simulates interest
  saveCoins: (amount: number) => void
  withdrawCoins: (amount: number) => boolean

  // Inventory
  ownedItems: OwnedItem[]
  buyItem: (item: ShopItem) => boolean

  // Lessons
  completedLessons: string[]
  completeLesson: (lessonId: string) => void
}

export const useGameStore = create<GameState>((set, get) => ({
  // Start with some coins for demo
  coins: 20,

  addCoins: (amount) => set((state) => ({
    coins: state.coins + amount
  })),

  spendCoins: (amount) => {
    const state = get()
    if (state.coins >= amount) {
      set({ coins: state.coins - amount })
      return true
    }
    return false
  },

  // Piggy Bank
  savedCoins: 0,

  saveCoins: (amount: number) => {
    const state = get()
    if (state.coins >= amount) {
      set({
        coins: state.coins - amount,
        savedCoins: state.savedCoins + amount
      })
    }
  },

  withdrawCoins: (amount: number) => {
    const state = get()
    if (state.savedCoins >= amount) {
      set({
        savedCoins: state.savedCoins - amount,
        coins: state.coins + amount
      })
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
    if (state.coins >= item.price) {
      set({
        coins: state.coins - item.price,
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
