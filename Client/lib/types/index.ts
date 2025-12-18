export interface ApiReturnType {
  success: boolean;
  message: string;
  data: any;
  pagination?: {
    page: number,
    totalPages: number,
    total: number
  }
}
export const ApiReturnTypeInitialValue: ApiReturnType = {
  success: false,
  message: '',
  data: null,
};

export interface Destination {
  id: string;
  slug: string
  title: string;
  description: string;
  image: string;
  price: number;
  difficulty: number;
  duration: number;
  location: string;
  highlights: string[];
  createdAt: string;
  updatedAt: string;
  ecotourism_score?: number;
  active?: boolean;
  isPopular?: boolean
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
