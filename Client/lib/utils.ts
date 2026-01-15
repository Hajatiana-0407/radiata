import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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
  { label: "faq", href: "/faq" },
  { label: "Contact", href: "/contact" },
]