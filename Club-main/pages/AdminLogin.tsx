
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../App';
import { ShieldCheck, Mail, Lock, AlertCircle } from 'lucide-react';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { clubs, setCurrentUser } = useApp();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Check for Platform Admin (Super Admin)
    if (email === 'admin@sistema.com' && password === 'admin') {
      setCurrentUser({
        id: 'platform-admin',
        name: 'Administrador Global',
        email: email,
        role: 'admin'
      });
      navigate('/admin/dashboard');
      return;
    }

    // Check for Specific Club Admin
    const club = clubs.find(c => c.ownerEmail === email && c.ownerPassword === password);
    if (club) {
      setCurrentUser({
        id: `admin-${club.id}`,
        name: `Gestor ${club.name}`,
        email: email,
        role: 'club_admin',
        managedClubId: club.id
      });
      navigate('/admin/dashboard');
    } else {
      setError('Credenciais inválidas. Verifique seu e-mail e senha.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
           <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 text-teal-600 rounded-2xl mb-4">
             <ShieldCheck className="w-8 h-8" />
           </div>
           <h1 className="text-3xl font-serif font-bold text-slate-900">Acesso Administrativo</h1>
           <p className="text-slate-500 mt-2">Gerencie as configurações e reservas do seu clube.</p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl flex items-center text-sm font-medium">
              <AlertCircle className="w-4 h-4 mr-2" />
              {error}
            </div>
          )}
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
                  placeholder="seu@email.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <button 
              type="submit"
              className="w-full bg-teal-600 text-white py-3 rounded-xl font-bold hover:bg-teal-700 transition-colors shadow-lg shadow-teal-100"
            >
              Entrar no Painel
            </button>
          </form>
          
          <div className="mt-8 pt-8 border-t border-slate-100 text-center text-xs text-slate-400 space-y-2">
            <p>Admin Global: admin@sistema.com / admin</p>
            <p>Admin Club: admin@oasis.com / 123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
