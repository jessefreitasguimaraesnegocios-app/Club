
import React from 'react';
import { useApp } from '../App';
import { Check, X, Mail, Phone, Calendar as CalendarIcon } from 'lucide-react';

const AdminBookings: React.FC = () => {
  const { bookings, updateBookingStatus } = useApp();

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-serif font-bold text-slate-900">Gestão de Reservas</h1>
        <p className="text-slate-500">Visualize e controle todas as reservas feitas através da plataforma.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Cliente / Contato</th>
                <th className="px-6 py-4">Clube</th>
                <th className="px-6 py-4">Data / Hora</th>
                <th className="px-6 py-4">Valor</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {bookings.slice().reverse().map((booking) => (
                <tr key={booking.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      booking.status === 'paid' ? 'bg-green-100 text-green-800' :
                      booking.status === 'approved' ? 'bg-blue-100 text-blue-800' :
                      booking.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900">{booking.userName}</div>
                    <div className="text-xs text-slate-400 flex items-center mt-0.5">
                      <Mail className="w-3 h-3 mr-1" /> {booking.userEmail}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                    {booking.clubName}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-slate-900 flex items-center">
                      <CalendarIcon className="w-4 h-4 mr-1.5 text-slate-400" /> {booking.date}
                    </div>
                    <div className="text-xs text-slate-400 ml-5">{booking.timeSlot}</div>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-teal-600">
                    R$ {booking.totalPrice.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {booking.status === 'pending' && (
                      <div className="flex justify-end space-x-2">
                        <button 
                          onClick={() => updateBookingStatus(booking.id, 'rejected')}
                          className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                          title="Rejeitar"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => updateBookingStatus(booking.id, 'approved')}
                          className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100"
                          title="Aprovar"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                    {booking.status !== 'pending' && (
                      <span className="text-xs text-slate-300 font-medium italic">Sem ações</span>
                    )}
                  </td>
                </tr>
              ))}
              {bookings.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center text-slate-400 font-medium">
                    Nenhuma reserva encontrada no sistema.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminBookings;
