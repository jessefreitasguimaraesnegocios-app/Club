
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../App';
import { LogOut, User as UserIcon, Calendar, LayoutDashboard, Home } from 'lucide-react';

const Navbar: React.FC = () => {
  const { currentUser, setCurrentUser } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/');
  };

  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-serif font-bold text-teal-600">CLUBE</span>
              <span className="text-2xl font-serif font-light text-slate-800">RESERVE</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {currentUser ? (
              <>
                <Link to="/admin/dashboard" className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${isAdminPath ? 'text-teal-600 bg-teal-50' : 'text-slate-600 hover:text-teal-600 hover:bg-slate-50'}`}>
                  <LayoutDashboard className="w-4 h-4" />
                  <span className="hidden sm:inline">Painel</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Sair</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/" className="text-slate-600 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium">
                  Início
                </Link>
                <Link to="/admin/login" className="bg-teal-600 text-white hover:bg-teal-700 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                  Área do Clube
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
