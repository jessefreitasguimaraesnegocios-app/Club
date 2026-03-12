
import React, { useState, createContext, useContext, useEffect } from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import { Club, Booking, User } from './types';
import { INITIAL_CLUBS, INITIAL_BOOKINGS } from './mockData';

// Pages
import Home from './pages/Home';
import ClubDetail from './pages/ClubDetail';
import BookingPage from './pages/BookingPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminClubs from './pages/AdminClubs';
import AdminBookings from './pages/AdminBookings';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

interface AppContextType {
  clubs: Club[];
  bookings: Booking[];
  currentUser: User | null;
  setClubs: React.Dispatch<React.SetStateAction<Club[]>>;
  setBookings: React.Dispatch<React.SetStateAction<Booking[]>>;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  addBooking: (booking: Booking) => void;
  updateBookingStatus: (id: string, status: Booking['status']) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

const App: React.FC = () => {
  const [clubs, setClubs] = useState<Club[]>(INITIAL_CLUBS);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const addBooking = (booking: Booking) => {
    setBookings(prev => [...prev, booking]);
  };

  const updateBookingStatus = (id: string, status: Booking['status']) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
  };

  return (
    <AppContext.Provider value={{
      clubs, bookings, currentUser, setClubs, setBookings, setCurrentUser, addBooking, updateBookingStatus
    }}>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/club/:id" element={<ClubDetail />} />
            <Route path="/club/:id/book" element={<BookingPage />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            
            {/* Protected Admin Routes */}
            <Route 
              path="/admin/*" 
              element={currentUser ? (
                <Routes>
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="clubs" element={<AdminClubs />} />
                  <Route path="bookings" element={<AdminBookings />} />
                  <Route path="*" element={<Navigate to="dashboard" replace />} />
                </Routes>
              ) : <Navigate to="/admin/login" replace />} 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </AppContext.Provider>
  );
};

export default App;
