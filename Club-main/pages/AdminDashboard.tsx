
import React from 'react';
import { useApp } from '../App';
import { Users, Calendar, TrendingUp, DollarSign, Bell, Home, Settings, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const { bookings, clubs, currentUser } = useApp();
  
  const isClubAdmin = currentUser?.role === 'club_admin';
  const managedClubId = currentUser?.managedClubId;
  
  const filteredBookings = isClubAdmin 
    ? bookings.filter(b => b.clubId === managedClubId)
    : bookings;
    
  const filteredClubs = isClubAdmin
    ? clubs.filter(c => c.id === managedClubId)
    : clubs;

  const stats = [
    { label: isClubAdmin ? 'Meu Clube' : 'Total de Clubes', value: filteredClubs.length, icon: Home, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Reservas Pendentes', value: filteredBookings.filter(b => b.status === 'pending').length, icon: Bell, color: 'text-amber-600', bg: 'bg-amber-100' },
    { label: 'Total Reservas', value: filteredBookings.length, icon: Calendar, color: 'text-teal-600', bg: 'bg-teal-100' },
    { label: 'Faturamento', value: `R$ ${filteredBookings.reduce((acc, b) => acc + b.totalPrice, 0).toLocaleString()}`, icon: DollarSign, color: 'text-green-600', bg: 'bg-green-100' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-slate-900">
            {isClubAdmin ? `Gestão: ${filteredClubs[0]?.name}` : 'Painel Administrativo Global'}
          </h1>
          <p className="text-slate-500">
            {isClubAdmin ? 'Gerencie os preços, fotos e reservas do seu estabelecimento.' : 'Visão geral de todos os clubes cadastrados na plataforma.'}
          </p>
        </div>
        <div className="flex space-x-3">
          {isClubAdmin ? (
            <Link to="/admin/clubs" className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-xl font-bold hover:bg-teal-700 shadow-lg shadow-teal-100">
              <Settings className="w-4 h-4 mr-2" /> Editar Meu Clube
            </Link>
          ) : (
            <Link to="/admin/clubs" className="px-4 py-2 border border-slate-200 rounded-xl font-medium hover:bg-slate-50">Gerenciar Todos os Clubes</Link>
          )}
          <Link to="/admin/bookings" className="px-4 py-2 border border-slate-200 rounded-xl font-medium hover:bg-slate-50">Ver Reservas</Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            <h3 className="text-slate-500 text-sm font-medium">{stat.label}</h3>
            <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
             <h3 className="font-bold text-slate-900">Atividades Recentes</h3>
             <Link to="/admin/bookings" className="text-sm text-teal-600 hover:underline">Ver todas</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                  <th className="px-6 py-4">Cliente</th>
                  <th className="px-6 py-4">Data</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Valor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredBookings.slice(-5).reverse().map((booking) => (
                  <tr key={booking.id} className="text-sm">
                    <td className="px-6 py-4 font-medium">{booking.userName}</td>
                    <td className="px-6 py-4 text-slate-500">{booking.date}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                        booking.status === 'paid' ? 'bg-green-100 text-green-700' : 
                        booking.status === 'approved' ? 'bg-blue-100 text-blue-700' : 
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {booking.status === 'paid' ? 'Pago' : booking.status === 'approved' ? 'Aprovado' : 'Pendente'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-slate-900">R$ {booking.totalPrice.toFixed(2)}</td>
                  </tr>
                ))}
                {filteredBookings.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-slate-400">Nenhuma reserva recente.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {isClubAdmin && filteredClubs[0] && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-bold text-slate-900 mb-6">Meu Clube - Preços Atuais</h3>
            <div className="space-y-4">
               <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                 <span className="text-sm text-slate-600">Adulto</span>
                 <span className="font-bold text-teal-600">R$ {filteredClubs[0].prices.adult.toFixed(2)}</span>
               </div>
               <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                 <span className="text-sm text-slate-600">Criança (7-12)</span>
                 <span className="font-bold text-teal-600">R$ {filteredClubs[0].prices.childLarge.toFixed(2)}</span>
               </div>
               <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                 <span className="text-sm text-slate-600">Estac. Carro</span>
                 <span className="font-bold text-teal-600">R$ {filteredClubs[0].prices.car.toFixed(2)}</span>
               </div>
               <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                 <span className="text-sm text-slate-600">Estac. Moto</span>
                 <span className="font-bold text-teal-600">R$ {filteredClubs[0].prices.moto.toFixed(2)}</span>
               </div>
            </div>
            <Link to="/admin/clubs" className="block w-full text-center mt-8 py-3 bg-teal-50 text-teal-600 rounded-xl font-bold hover:bg-teal-100 transition-colors">
              Editar Todos os Valores
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
