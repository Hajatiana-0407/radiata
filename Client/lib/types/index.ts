export interface Destination {
  id: string;
  titre: string;
  description: string;
  image: string;
  prix_base: number;
  difficulte: 'easy' | 'moderate' | 'hard';
  duree_jours: number;
  location: string;
  highlights: string[];
  date_creation: string;
  updatedAt: string;
  score_ecotourisme?: number ; 
  actif?: boolean ;
}

export interface Reservation {
  id: string;
  destinationId: string;
  destination?: Destination;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  startDate: string;
  endDate: string;
  numberOfPeople: number;
  specialRequests: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'resolved';
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface DashboardStats {
  totalDestinations: number;
  totalReservations: number;
  totalContacts: number;
  revenueThisMonth: number;
}

export interface ContentData {
  heroTitle: string;
  heroDescription: string;
  aboutText: string;
  galleryImages: string[];
  values: string[];
}
