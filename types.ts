
export interface ClubPrices {
  adult: number;
  childSmall: number;
  childLarge: number;
  car: number;
  moto: number;
}

export interface Club {
  id: string;
  name: string;
  description: string;
  location: string;
  contact: string;
  hours: string;
  pricing: number; // Keep for backward compatibility or legacy display
  prices: ClubPrices;
  imageUrl: string;
  videoUrl?: string;
  amenities: string[];
  splitPercentage: number;
  mercadoPagoEmail: string;
  ownerEmail: string;
  ownerPassword: string;
}

export interface Booking {
  id: string;
  clubId: string;
  clubName: string;
  userName: string;
  userEmail: string;
  date: string;
  timeSlot: string;
  status: 'pending' | 'approved' | 'rejected' | 'paid';
  totalPrice: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'club_admin';
  managedClubId?: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}
