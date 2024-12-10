import { Shield, Target, Crosshair, Cpu } from 'lucide-react';

// Import product images
import eftPreview1 from '../assets/products/eft/eftpreview1.png';
import eftPreview2 from '../assets/products/eft/eftpreview2.png';
import eftPreview3 from '../assets/products/eft/eftpreview3.png';
import eftPreview4 from '../assets/products/eft/eftpreview4.png';
import eftPreview5 from '../assets/products/eft/eftpreview5.png';
import eftPreview6 from '../assets/products/eft/eftpreview6.png';
import eftPreview7 from '../assets/products/eft/eftpreview7.png';
import eftPreview8 from '../assets/products/eft/eftpreview8.png';
import eftPreview9 from '../assets/products/eft/eftpreview9.png';
import eftPreview10 from '../assets/products/eft/eftpreview10.png';
import eftPreview11 from '../assets/products/eft/eftpreview11.png';
import eftPreview12 from '../assets/products/eft/eftpreview12.png';
import spooferPreview1 from '../assets/products/spoofer/spooferpreview1.png';
import spooferPreview2 from '../assets/products/spoofer/spooferpreview1.png';
import fortnitePreview1 from '../assets/products/fortnite/preview1.jpg';
import fortnitePreview2 from '../assets/products/fortnite/preview2.jpg';

export const sellSnButtons = {
  'eft-full': {
    '2h': 'd05a8988-8d23-4465-809c-3c2150e1a3fa',
    day: 'b87a2bcf-9646-44ea-96fd-3f60bc33765f',
    week: '7bb05e01-e274-4b8e-bb17-df7148417ab4',
    month: 'fcb05f39-4d82-4e84-be66-3228348df45b',
  },
  'temp-spoofer': {
    day: '6c569abe-b4a6-4b92-93f2-ceecb5c7dfde',
    week: '585ea949-49a2-4275-8577-4ee65fcda13d',
    month: 'eb3534c0-cdbc-45b5-9aff-2ac0edb0225e',
  },
};

export const products = {
  'eft-full': {
    id: 'eft-full',
    name: 'EFT External',
    icon: Shield,
    description:
      'Premium external cheat for Escape from Tarkov with advanced features.',
    systemRequirements: [
      'AES (CPU)',
      'SVM / VT-X (BIOS)',
      'Support Windows 10-11 (1903-23h2)',
      'INTEL + AMD CPU',
    ],
    features: [
      'Built-in HWID spoofer',
      'Advanced Aimbot System',
      'ESP & Wallhack',
      'Comprehensive Loot ESP',
    ],
    featureCategories: {
      aimbot: {
        vector: [
          'Smooth settings',
          'Prediction',
          'Visible only',
          'Bones settings',
          'FOV settings',
        ],
        silent: [
          'Enabled',
          'HitRate',
          'HitRate settings',
          'FOV settings',
          'Visible only',
          'Ignore Vector if silent enabled',
        ],
        other: [
          'No Recoil',
          'No Sway',
          'No ADS',
          'Run&Shoot',
          'Legit Aimbot Settings (Randomization, Custom Bones, etc',
        ],
      },
      visuals: {
        player: [
          'All color filters for selected category',
          'Health',
          'Player Info (Name/LVL/KD/Hours/Role)',
          'Chams',
          'Enemy/PMC ESP',
          'Teammates ESP',
          'Skeleton',
          'Distance',
          'Weapon',
        ],
        world: [
          'Custom Loot Filters',
          'Price Loot Filters',
          'All color filters settings',
          'Show Price',
          'Containers',
          'Body',
          'Player Body Price',
          'PMC/BOT/BOSSES total body prices',
          'Min/Max Price slider',
          'Quests items / Quest places',
        ],
      },
      misc: [
        'Battlemode (bind)',
        'Night Vision',
        'Thermal Vision',
        'Show Bot names',
        'No Visor',
        'Speed Hack',
        'Speed Hack Setting (Slider)',
        'Infinity Stamina',
        'Loot through walls',
        'Loot Range Slider',
        'Show Info',
        'Show Ammo',
        'Fast ammo unload',
        'Allow to drop dogtag',
        'Disable Discard limits',
        'High Jump',
        'High Jump (Bind)',
        'High Jump (Slider)',
        'Custom Time',
        'Extra-Fov',
        'Extra-Fov Slider',
      ],
      'temporary removed': [
        'Multi Search',
        'Instant Search',
        'Containers Loot (PvP only)',
        'Instant examine',
      ],
    },
    images: [
      eftPreview1,
      eftPreview2,
      eftPreview3,
      eftPreview4,
      eftPreview5,
      eftPreview6,
      eftPreview7,
      eftPreview8,
      eftPreview9,
      eftPreview10,
      eftPreview11,
      eftPreview12,
    ],
    videoUrl: 'https://www.youtube.com/embed/7HLhBT3lqas',
    videoThumbnail: eftPreview1,
    pricing: [
      {
        period: '2h',
        price: 1.0,
        buttonId: 'd05a8988-8d23-4465-809c-3c2150e1a3fa',
      },
      {
        period: 'day',
        price: 6.0,
        buttonId: 'b87a2bcf-9646-44ea-96fd-3f60bc33765f',
      },
      {
        period: 'week',
        price: 25.0,
        buttonId: '7bb05e01-e274-4b8e-bb17-df7148417ab4',
      },
      {
        period: 'month',
        price: 50.0,
        buttonId: 'fcb05f39-4d82-4e84-be66-3228348df45b',
      },
    ],
  },
  'temp-spoofer': {
    id: 'temp-spoofer',
    name: 'Temp Spoofer (EAC&BE)',
    icon: Cpu,
    description:
      'Supports INTEL&AMD CPU. Cleaner supports Apex and EFT only. Bring your own cleaner for other games and platforms like FIveM and FN. Windows 10 Version 1903 - 22H2 Supported. Windows 11 22H2 - 24H2 Supported.',
    systemRequirements: [
      'TPM - OFF (BIOS)',
      'RAID / Rapid Storage - OFF (BIOS)',
      'Vanilla Windows Installation',
      'No Custom OS Support',
    ],
    features: [
      'EAC Support',
      'BattlEye Support',
      'Ricochet Support',
      'FiveM Support',
      'UAC Support',
      'Apex Cleaner',
      'EFT Cleaner',
      'Rust Support',
    ],
    featureCategories: {
      platforms: {
        supported: [
          'EAC (Easy Anti-Cheat)',
          'BattlEye',
          'Ricochet Anti-Cheat',
          'FiveM',
          'UAC (User Account Control)',
        ],
        cleaner: ['Apex Legends', 'Escape from Tarkov', 'Rust'],
      },
      requirements: {
        bios: ['TPM Disabled', 'RAID/RST Disabled', 'Clean Windows Install'],
        windows: ['Windows 10 (1903-22H2)', 'Windows 11 (22H2-24H2)'],
      },
    },
    images: [spooferPreview1, spooferPreview2],
    videoUrl: 'https://www.youtube.com/embed/YOUR_SPOOFER_VIDEO_ID',
    videoThumbnail: spooferPreview1,
    pricing: [
      {
        period: 'day',
        price: 4.0,
        buttonId: '6c569abe-b4a6-4b92-93f2-ceecb5c7dfde',
      },
      {
        period: 'week',
        price: 10.0,
        buttonId: '585ea949-49a2-4275-8577-4ee65fcda13d',
      },
      {
        period: 'month',
        price: 20.0,
        buttonId: 'eb3534c0-cdbc-45b5-9aff-2ac0edb0225e',
      },
    ],
  },
  fortnite: {
    id: 'fortnite',
    name: 'Fortnite',
    icon: Crosshair,
    description:
      'Currently in development. Our team is working hard to bring you the best Fortnite gaming tools.',
    features: [
      'Coming Soon',
      'Under Development',
      'Join Discord for Updates',
      'Early Access Available Soon',
    ],
    featureCategories: {
      aimbot: {
        vector: ['Under Development'],
        silent: ['Under Development'],
        other: ['Under Development'],
      },
      visuals: {
        player: ['Under Development'],
        world: ['Under Development'],
      },
      misc: ['Under Development'],
    },
    images: [fortnitePreview1, fortnitePreview2],
    videoUrl: 'https://www.youtube.com/embed/YOUR_VIDEO_ID',
    videoThumbnail: fortnitePreview1,
    pricing: [], // Empty pricing array indicates "coming soon" status
  },
};
