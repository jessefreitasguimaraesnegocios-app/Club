
import React, { useState, useEffect } from 'react';
import { useApp } from '../App';
import { Plus, Edit2, Trash2, Globe, Settings, DollarSign, Camera, MapPin, Phone, Clock } from 'lucide-react';
import { Club, ClubPrices } from '../types';

const AdminClubs: React.FC = () => {
  const { clubs, setClubs, currentUser } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [editingClub, setEditingClub] = useState<Club | null>(null);

  const isPlatformAdmin = currentUser?.role === 'admin';
  const managedClubId = currentUser?.managedClubId;

  // Initial form state
  const initialPrices: ClubPrices = {
    adult: 0,
    childSmall: 0,
    childLarge: 0,
    car: 0,
    moto: 0
  };

  const [formData, setFormData] = useState<Partial<Club>>({
    name: '',
    description: '',
    location: '',
    contact: '',
    hours: '',
    prices: initialPrices,
    splitPercentage: 80,
    mercadoPagoEmail: '',
    imageUrl: '',
    amenities: []
  });

  const filteredClubs = isPlatformAdmin 
    ? clubs 
    : clubs.filter(c => c.id === managedClubId);

  const handleSave = () => {
    if (editingClub) {
      setClubs(prev => prev.map(c => c.id === editingClub.id ? { ...editingClub, ...formData } as Club : c));
    } else if (isPlatformAdmin) {
      const newClub: Club = {
        ...formData as Club,
        id: Math.random().toString(36).substr(2, 9),
        prices: formData.prices || initialPrices,
        amenities: formData.amenities || ['Piscina'],
        ownerEmail: '', // Platform admin creates it without owner initially
        ownerPassword: '123'
      };
      setClubs(prev => [...prev, newClub]);
    }
    setShowModal(false);
    setEditingClub(null);
  };

  const handleEdit = (club: Club) => {
    setEditingClub(club);
    setFormData(club);
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja remover este clube?')) {
      setClubs(prev => prev.filter(c => c.id !== id));
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-slate-900">
            {isPlatformAdmin ? 'Gestão de Todos os Clubes' : 'Configurações do Meu Clube'}
          </h1>
          <p className="text-slate-500">
            {isPlatformAdmin ? 'Administre todos os estabelecimentos da rede.' : 'Ajuste valores, fotos e informações do seu estabelecimento.'}
          </p>
        </div>
        {isPlatformAdmin && (
          <button 
            onClick={() => { setShowModal(true); setEditingClub(null); setFormData({ prices: initialPrices }); }}
            className="flex items-center space-x-2 bg-teal-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-teal-700 shadow-lg shadow-teal-100"
          >
            <Plus className="w-5 h-5" />
            <span>Cadastrar Novo Clube</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-8">
        {filteredClubs.map(club => (
          <div key={club.id} className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden flex flex-col md:flex-row">
            <div className="w-full md:w-80 h-64 md:h-auto relative">
              <img src={club.imageUrl} alt={club.name} className="w-full h-full object-cover" />
              <button 
                onClick={() => handleEdit(club)}
                className="absolute bottom-4 right-4 bg-white/90 backdrop-blur p-3 rounded-2xl shadow-lg text-teal-600 hover:scale-105 transition-transform"
              >
                <Camera className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-grow p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-slate-900 mb-1">{club.name}</h3>
                  <div className="flex items-center text-slate-400 text-sm">
                    <MapPin className="w-4 h-4 mr-1" /> {club.location}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button onClick={() => handleEdit(club)} className="p-3 bg-teal-50 text-teal-600 rounded-xl hover:bg-teal-100 transition-colors">
                    <Edit2 className="w-5 h-5" />
                  </button>
                  {isPlatformAdmin && (
                    <button onClick={() => handleDelete(club.id)} className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Adulto</span>
                  <span className="text-xl font-bold text-slate-800">R$ {club.prices.adult.toFixed(2)}</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Criança (7-12)</span>
                  <span className="text-xl font-bold text-slate-800">R$ {club.prices.childLarge.toFixed(2)}</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Taxa Carro</span>
                  <span className="text-xl font-bold text-slate-800">R$ {club.prices.car.toFixed(2)}</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Taxa Moto</span>
                  <span className="text-xl font-bold text-slate-800">R$ {club.prices.moto.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                <span className="flex items-center"><Phone className="w-4 h-4 mr-2 text-teal-500" /> {club.contact}</span>
                <span className="flex items-center"><Clock className="w-4 h-4 mr-2 text-teal-500" /> {club.hours}</span>
                <span className="flex items-center"><Settings className="w-4 h-4 mr-2 text-teal-500" /> Split: {club.splitPercentage}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal - Extensive Editing Form */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-[2.5rem] w-full max-w-3xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-10">
              <h2 className="text-3xl font-serif font-bold text-slate-900 mb-8">
                {editingClub ? `Editar ${editingClub.name}` : 'Cadastrar Novo Clube'}
              </h2>
              
              <div className="space-y-10">
                {/* Basic Info Section */}
                <div>
                  <h3 className="text-lg font-bold text-teal-600 mb-6 flex items-center">
                    <span className="w-2 h-2 bg-teal-600 rounded-full mr-3"></span> Informações Básicas
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="col-span-full">
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Nome do Estabelecimento</label>
                      <input 
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="col-span-full">
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">URL da Imagem de Capa</label>
                      <input 
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                        value={formData.imageUrl}
                        onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                        placeholder="https://exemplo.com/foto.jpg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Localização</label>
                      <input 
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                        value={formData.location}
                        onChange={e => setFormData({...formData, location: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Contato / WhatsApp</label>
                      <input 
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                        value={formData.contact}
                        onChange={e => setFormData({...formData, contact: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                {/* Pricing Section - THE KEY PART */}
                <div>
                  <h3 className="text-lg font-bold text-teal-600 mb-6 flex items-center">
                    <span className="w-2 h-2 bg-teal-600 rounded-full mr-3"></span> Tabela de Preços (Day Use)
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Adulto (R$)</label>
                      <input 
                        type="number"
                        step="0.01"
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-800"
                        value={formData.prices?.adult}
                        onChange={e => setFormData({...formData, prices: {...formData.prices!, adult: Number(e.target.value)}})}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Criança 7-12 (R$)</label>
                      <input 
                        type="number"
                        step="0.01"
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-800"
                        value={formData.prices?.childLarge}
                        onChange={e => setFormData({...formData, prices: {...formData.prices!, childLarge: Number(e.target.value)}})}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Criança 0-6 (R$)</label>
                      <input 
                        type="number"
                        step="0.01"
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-800"
                        value={formData.prices?.childSmall}
                        onChange={e => setFormData({...formData, prices: {...formData.prices!, childSmall: Number(e.target.value)}})}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Estac. Carro (R$)</label>
                      <input 
                        type="number"
                        step="0.01"
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-800"
                        value={formData.prices?.car}
                        onChange={e => setFormData({...formData, prices: {...formData.prices!, car: Number(e.target.value)}})}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Estac. Moto (R$)</label>
                      <input 
                        type="number"
                        step="0.01"
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-800"
                        value={formData.prices?.moto}
                        onChange={e => setFormData({...formData, prices: {...formData.prices!, moto: Number(e.target.value)}})}
                      />
                    </div>
                  </div>
                </div>

                {/* Financial Section */}
                <div>
                  <h3 className="text-lg font-bold text-teal-600 mb-6 flex items-center">
                    <span className="w-2 h-2 bg-teal-600 rounded-full mr-3"></span> Configuração Financeira
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">E-mail Mercado Pago</label>
                      <input 
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-teal-500 outline-none"
                        value={formData.mercadoPagoEmail}
                        onChange={e => setFormData({...formData, mercadoPagoEmail: e.target.value})}
                        placeholder="financeiro@seubanco.com"
                      />
                    </div>
                    {isPlatformAdmin && (
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Split para o Clube (%)</label>
                        <input 
                          type="number"
                          className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold"
                          value={formData.splitPercentage}
                          onChange={e => setFormData({...formData, splitPercentage: Number(e.target.value)})}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-12 flex gap-4">
                <button 
                  onClick={() => setShowModal(false)} 
                  className="flex-1 px-8 py-5 border-2 border-slate-100 rounded-3xl font-bold text-slate-400 hover:bg-slate-50 transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleSave} 
                  className="flex-[2] px-8 py-5 bg-teal-600 text-white rounded-3xl font-bold hover:bg-teal-700 shadow-xl shadow-teal-100 transition-all active:scale-95"
                >
                  Salvar Todas as Alterações
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminClubs;
