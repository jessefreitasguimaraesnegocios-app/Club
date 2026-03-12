
import { Club, Booking } from './types';

export const INITIAL_CLUBS: Club[] = [
  {
    id: '1',
    name: 'Oasis Sabará Beach Club',
    description: 'Um paraíso tropical no coração de Minas Gerais. Desfrute de piscinas de cristal, gastronomia refinada e o melhor sunset da região.',
    location: 'Sabará, MG - Rodovia BR-262',
    contact: '(31) 98888-7777',
    hours: '09:00 - 19:00',
    pricing: 150.00,
    prices: {
      adult: 59.90,
      childSmall: 0,
      childLarge: 29.90,
      car: 6.00,
      moto: 3.00
    },
    imageUrl: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=80&w=1200',
    amenities: ['Piscina Infinita', 'Bar Molhado', 'DJ Residente', 'Área VIP', 'Estacionamento'],
    splitPercentage: 85,
    mercadoPagoEmail: 'financeiro@oasissabara.com',
    ownerEmail: 'admin@oasis.com',
    ownerPassword: '123'
  },
  {
    id: '2',
    name: 'Reserva das Águas',
    description: 'Experiência exclusiva de lazer cercada pela natureza. Ideal para famílias que buscam conforto e tranquilidade.',
    location: 'Nova Lima, MG - Condomínio Alpha',
    contact: '(31) 97777-6666',
    hours: '08:00 - 18:00',
    pricing: 120.00,
    prices: {
      adult: 49.90,
      childSmall: 0,
      childLarge: 24.90,
      car: 5.00,
      moto: 2.00
    },
    imageUrl: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=1200',
    amenities: ['Sauna', 'Quadras de Tênis', 'Restaurante Gourmet', 'Kids Club'],
    splitPercentage: 90,
    mercadoPagoEmail: 'contato@reservadasaguas.com',
    ownerEmail: 'admin@reserva.com',
    ownerPassword: '123'
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'b1',
    clubId: '1',
    clubName: 'Oasis Sabará Beach Club',
    userName: 'João Silva',
    userEmail: 'joao@email.com',
    date: '2024-06-15',
    timeSlot: 'Day Use',
    status: 'approved',
    totalPrice: 150.00
  },
  {
    id: 'b2',
    clubId: '2',
    clubName: 'Reserva das Águas',
    userName: 'Maria Souza',
    userEmail: 'maria@email.com',
    date: '2024-06-16',
    timeSlot: 'Day Use',
    status: 'pending',
    totalPrice: 120.00
  }
];
