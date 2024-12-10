export const providers = {
  'eft-full': [
    {
      id: 'provider1',
      name: 'Supreme Cheats',
      rating: 4.9,
      users: '1.2k',
      lastUpdate: '2 hours ago',
      features: ['Aimbot', 'ESP', 'Radar', 'No Recoil'],
      pricing: [
        { period: '1 day', price: 15 },
        { period: '7 days', price: 50 },
        { period: '30 days', price: 120 }
      ]
    },
    {
      id: 'provider2',
      name: 'Elite Hacks',
      rating: 4.8,
      users: '950',
      lastUpdate: '5 hours ago',
      features: ['Aimbot', 'Wallhack', 'Item ESP', 'Loot Filter'],
      pricing: [
        { period: '1 day', price: 12 },
        { period: '7 days', price: 45 },
        { period: '30 days', price: 100 }
      ]
    }
  ],
  'apex': [
    {
      id: 'provider3',
      name: 'Apex Masters',
      rating: 4.7,
      users: '800',
      lastUpdate: '1 hour ago',
      features: ['Aimbot', 'ESP', 'No Recoil', 'Triggerbot'],
      pricing: [
        { period: '1 day', price: 10 },
        { period: '7 days', price: 40 },
        { period: '30 days', price: 90 }
      ]
    }
  ]
};

export const gameNames = {
  'eft-full': 'Escape from Tarkov',
  'apex': 'Apex Legends',
  'rust': 'Rust',
  'fortnite': 'Fortnite',
  'warzone': 'Warzone',
  'pubg': 'PUBG',
  'dayz': 'DayZ'
};