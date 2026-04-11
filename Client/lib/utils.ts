import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const radiataInfo = {
  phone: '+261 34 12 345 67' , 
  email: { 
    contact : 'contact@radiata-explorer.com' , 
    admin : 'admin@radiata-explorer.com'
  } , 
  socialMedia : {
    facebook : 'https://www.facebook.com/radiata.explorer' , 
    instagram : 'https://www.instagram.com/radiata.explorer/' , 
    linkedin : 'https://www.linkedin.com' ,
    whatsapp : 'https://wa.me/261341234567'
  } , 
  location : {
    address  : '123 Avenue de la Nature, Antananarivo, Madagascar' ,
    mapLink : 'https://goo.gl/maps/your-map-link'
  }
}



export function getDificultyLabel(difficulty: number): string {
  switch (difficulty) {
    case 1:
      return 'Facile';
    case 2:
      return 'Intermédiaire';
    case 3:
      return 'Difficile';
    case 4:
      return 'Expert';
    case 5:
      return 'Extrême';
    default:
      return 'Extrême';
  }
}

export const DIFFICULTY_LABELS: Record<number, string> = {
  1: 'Facile',
  2: 'Intermédiaire',
  3: 'Difficile',
  4: 'Expert',
  5: 'Extrême',
};


export const navItems = [
  { label: "Accueil", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "Services", href: "/services" },
  { label: "Gallerie", href: "/gallery" },
  { label: "À Propos", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Faq", href: "/faq" },
  { label: "Contact", href: "/contact" },
]


export const accommodationTypes = [
  { id: 'standard', label: 'Standard', description: 'Chambre basique avec services essentiels' },
  { id: 'comfort', label: 'Confort', description: 'Chambre spacieuse avec plus de commodités' },
  { id: 'luxe', label: 'Luxe', description: 'Suite haut de gamme avec services premium' },
  { id: 'villa', label: 'Villa Privée', description: 'Villa entière avec piscine privée' },
];


export const BaseURL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';