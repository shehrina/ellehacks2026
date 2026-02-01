import type { ShopItem } from '../store/gameStore'

export const shopItems: ShopItem[] = [
  {
    id: 'armchair',
    name: 'Cozy Armchair',
    price: 30,
    modelPath: '/models/armchair-fixed.glb',
    category: 'upgrade',
  },
  {
    id: 'toy-cat',
    name: 'Toy Cat',
    price: 15,
    modelPath: '/models/toy-cat.glb',
    category: 'want',
  },
  {
    id: 'plant',
    name: 'Monstera Plant',
    price: 20,
    modelPath: '/models/plant.glb',
    category: 'want',
  },
  {
    id: 'warrior-toy',
    name: 'Warrior Toy',
    price: 25,
    modelPath: '/models/warrior-toy-fixed.glb',
    category: 'want',
  },
  {
    id: 'bed',
    name: 'Children Bed',
    price: 40,
    modelPath: '/models/bed.glb',
    category: 'upgrade',
  },
  {
    id: 'bookshelf',
    name: 'Book Shelf',
    price: 35,
    modelPath: '/models/bookshelf.glb',
    category: 'upgrade',
  },
  {
    id: 'dinosaur',
    name: 'Dinosaur Toy',
    price: 20,
    modelPath: '/models/dinosaur.glb',
    category: 'want',
  },
]
