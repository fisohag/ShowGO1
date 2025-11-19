
import { Event } from './types';

export const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    eventName: 'Neon Nights Festival',
    description: 'Experience the pulse of the city with top tier electronic artists from around the globe.',
    image: 'https://picsum.photos/300/300?random=1',
    venue: 'The Cyber Loft',
    location: 'Brooklyn, NY',
    date: '2024-12-15',
    time: '10:00 PM',
    category: 'Electronic',
    price: '$85',
    link: '#'
  },
  {
    id: '2',
    eventName: 'Indie Soul Sessions',
    description: 'An intimate evening featuring breakthrough indie artists in a cozy acoustic setting.',
    image: 'https://picsum.photos/300/300?random=2',
    venue: 'Echo Chamber',
    location: 'Austin, TX',
    date: '2024-12-18',
    time: '8:00 PM',
    category: 'Indie Rock',
    price: '$35',
    link: '#'
  },
  {
    id: '3',
    eventName: 'Underground Bass',
    description: 'Deep bass and dubstep rhythms shaking the foundation of the warehouse district.',
    image: 'https://picsum.photos/300/300?random=3',
    venue: 'Sub-Zero',
    location: 'Berlin, DE',
    date: '2024-12-20',
    time: '11:30 PM',
    category: 'Dubstep',
    price: '$25',
    link: '#'
  },
  {
    id: '4',
    eventName: 'Jazz Fusion Collective',
    description: 'Modern jazz meets electronic textures. A unique auditory experience for connoisseurs.',
    image: 'https://picsum.photos/300/300?random=4',
    venue: 'Blue Note Modern',
    location: 'Chicago, IL',
    date: '2024-12-22',
    time: '7:30 PM',
    category: 'Live Jazz',
    price: '$40',
    link: '#'
  },
  {
    id: '5',
    eventName: 'Synthwave Sunset',
    description: 'Retro-futuristic beats to drive into the night. 80s nostalgia with a modern twist.',
    image: 'https://picsum.photos/300/300?random=5',
    venue: 'Palm Horizon',
    location: 'Miami, FL',
    date: '2024-12-24',
    time: '9:00 PM',
    category: 'Electronic',
    price: '$30',
    link: '#'
  },
  {
    id: '6',
    eventName: 'Urban Hip-Hop Showcase',
    description: 'The freshest rhymes and beats from the local underground hip-hop scene.',
    image: 'https://picsum.photos/300/300?random=6',
    venue: 'The Block',
    location: 'Atlanta, GA',
    date: '2024-12-26',
    time: '8:30 PM',
    category: 'Hip-Hop',
    price: '$45',
    link: '#'
  },
  {
    id: '7',
    eventName: 'Alternative Currents',
    description: 'Breaking boundaries with experimental rock and alternative sounds.',
    image: 'https://picsum.photos/300/300?random=7',
    venue: 'Garage 42',
    location: 'Seattle, WA',
    date: '2024-12-28',
    time: '8:00 PM',
    category: 'Alternative',
    price: '$20',
    link: '#'
  },
  {
    id: '8',
    eventName: 'Techno Bunker',
    description: 'Hard hitting techno beats until sunrise. strictly underground vibes.',
    image: 'https://picsum.photos/300/300?random=8',
    venue: 'Vault 101',
    location: 'London, UK',
    date: '2024-12-30',
    time: '12:00 AM',
    category: 'Techno',
    price: '$30',
    link: '#'
  },
   {
    id: '9',
    eventName: 'Acoustic Reverie',
    description: 'Unplugged sessions with award-winning songwriters sharing the stories behind the songs.',
    image: 'https://picsum.photos/300/300?random=9',
    venue: 'The Living Room',
    location: 'Nashville, TN',
    date: '2025-01-05',
    time: '7:00 PM',
    category: 'Acoustic',
    price: 'Free',
    link: '#'
  }
];

export const CATEGORIES = ["All", "Electronic", "Indie Rock", "Hip-Hop", "Live Jazz", "Techno", "Alternative"];
