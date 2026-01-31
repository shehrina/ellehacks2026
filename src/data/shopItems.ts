import type { ShopItem } from '../store/gameStore'

export const shopItems: ShopItem[] = [
  {
    id: 'armchair',
    name: 'Cozy Armchair',
    price: 30,
    modelPath: '/models/armchair.glb',
    category: 'upgrade',
  },
  // Add more items here as you get more models
  // {
  //   id: 'lamp',
  //   name: 'Desk Lamp',
  //   price: 15,
  //   modelPath: '/models/lamp.glb',
  //   category: 'need',
  // },
  // {
  //   id: 'plant',
  //   name: 'Small Plant',
  //   price: 10,
  //   modelPath: '/models/plant.glb',
  //   category: 'want',
  // },
]
