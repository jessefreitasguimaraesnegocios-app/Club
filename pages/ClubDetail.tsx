
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../App';
import { MapPin, Clock, Phone, CheckCircle2, ArrowLeft, Calendar } from 'lucide-react';

const ClubDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { clubs } = useApp();
  const club = clubs.find(c => c.id === id);

  if (!club) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold">Clube não encontrado.</h2>
        <Link to="/" className="text-teal-600 hover:underline mt-4 inline-block">Voltar ao início</Link>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Header Image */}
      <div className="relative h-[60vh]">
        <img src={club.imageUrl} alt={club.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        <div className="absolute bottom-8 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6 bg-black/20 backdrop-blur px-3 py-1 rounded-full text-sm">
            <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
          </Link>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">{club.name}</h1>
          <div className="flex flex-wrap gap-4 items-center text-sm font-medium">
            <span className="flex items-center"><MapPin className="w-4 h-4 mr-1 text-teal-400" /> {club.location}</span>
            <span className="flex items-center"><Clock className="w-4 h-4 mr-1 text-teal-400" /> {club.hours}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6 border-b pb-4">Sobre o Clube</h2>
            <p className="text-slate-600 leading-relaxed mb-10 text-lg">
              {club.description}
            </p>

            <h3 className="text-xl font-bold mb-6">Comodidades</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
              {club.amenities.map((item, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <CheckCircle2 className="w-5 h-5 text-teal-500" />
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>

            <h3 className="text-xl font-bold mb-6">Localização</h3>
            <div className="bg-slate-100 rounded-2xl h-80 flex items-center justify-center relative overflow-hidden">
               <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200" alt="Map Placeholder" className="w-full h-full object-cover opacity-50" />
               <div className="absolute bg-white p-4 rounded-xl shadow-lg border border-slate-200">
                  <p className="font-bold text-slate-900">{club.name}</p>
                  <p className="text-sm text-slate-500">{club.location}</p>
               </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 border border-slate-200 rounded-2xl p-8 shadow-sm bg-white">
              <div className="flex justify-between items-center mb-6">
                <span className="text-slate-500 font-medium">Day Use / Entrada</span>
                <span className="text-3xl font-bold text-teal-600">R$ {club.pricing.toFixed(2)}</span>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center text-sm text-slate-600 p-3 bg-slate-50 rounded-lg">
                  <Phone className="w-4 h-4 mr-3 text-teal-500" />
                  <span>{club.contact}</span>
                </div>
                <div className="flex items-center text-sm text-slate-600 p-3 bg-slate-50 rounded-lg">
                  <Calendar className="w-4 h-4 mr-3 text-teal-500" />
                  <span>Reserva Online Instantânea</span>
                </div>
              </div>

              <Link 
                to={`/club/${club.id}/book`}
                className="block w-full text-center bg-teal-600 text-white font-bold py-4 rounded-xl hover:bg-teal-700 transition-colors shadow-lg shadow-teal-100"
              >
                RESERVAR AGORA
              </Link>
              <p className="text-center text-slate-400 text-xs mt-4">
                Cancelamento gratuito até 24h antes
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubDetail;
