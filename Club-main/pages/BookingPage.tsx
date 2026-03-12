
import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../App';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  CreditCard, 
  ChevronRight, 
  CheckCircle, 
  ArrowLeft, 
  ChevronLeft, 
  HelpCircle,
  Plus,
  Minus,
  Info,
  Car,
  Bike,
  User as UserIcon
} from 'lucide-react';

const BookingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { clubs, addBooking } = useApp();
  const club = clubs.find(c => c.id === id);

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    date: '',
    name: '',
    email: '',
    vehicleInfo: '',
  });

  const [quantities, setQuantities] = useState({
    adult: 0,
    moto: 0,
    childSmall: 0,
    childLarge: 0,
    car: 0
  });

  if (!club) return null;

  // Use prices from the club admin configuration
  const prices = club.prices;

  const totalPrice = useMemo(() => {
    return (quantities.adult * prices.adult) + 
           (quantities.moto * prices.moto) + 
           (quantities.childLarge * prices.childLarge) + 
           (quantities.childSmall * prices.childSmall) + 
           (quantities.car * prices.car);
  }, [quantities, prices]);

  const [currentMonth, setCurrentMonth] = useState(new Date());

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleQuantity = (key: keyof typeof quantities, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [key]: Math.max(0, prev[key] + delta)
    }));
  };

  const handleCompletePayment = () => {
    const newBooking = {
      id: Math.random().toString(36).substr(2, 9),
      clubId: club.id,
      clubName: club.name,
      userName: formData.name,
      userEmail: formData.email,
      date: formData.date,
      timeSlot: 'Day Use',
      status: 'paid' as const,
      totalPrice: totalPrice
    };
    addBooking(newBooking);
    setStep(5);
  };

  // Calendar Logic
  const monthName = currentMonth.toLocaleString('pt-BR', { month: 'long', year: 'numeric' });
  const capitalizedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1);

  const daysInMonth = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const date = new Date(year, month, 1);
    const days = [];
    const firstDay = date.getDay();
    for (let i = 0; i < firstDay; i++) days.push(null);
    const lastDay = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= lastDay; i++) days.push(new Date(year, month, i));
    return days;
  }, [currentMonth]);

  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() && 
           date.getMonth() === today.getMonth() && 
           date.getFullYear() === today.getFullYear();
  };

  const isSelected = (date: Date) => {
    if (!formData.date) return false;
    const d = new Date(formData.date + 'T00:00:00');
    return date.getDate() === d.getDate() && 
           date.getMonth() === d.getMonth() && 
           date.getFullYear() === d.getFullYear();
  };

  const isPast = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const handleDateSelect = (date: Date) => {
    if (isPast(date)) return;
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - (offset * 60 * 1000));
    setFormData({ ...formData, date: localDate.toISOString().split('T')[0] });
  };

  const changeMonth = (offset: number) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset, 1);
    setCurrentMonth(newDate);
  };

  return (
    <div className="min-h-screen bg-slate-100/50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-[2rem] shadow-2xl border border-slate-200 overflow-hidden">
          {/* Custom Header with Stepper */}
          <div className="bg-teal-400 p-8 text-white relative">
            <button onClick={() => navigate(-1)} className="absolute right-6 top-6 text-white/80 hover:text-white">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold mb-6">Day Use {club.name}</h2>
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step === 1 ? 'bg-white text-teal-500' : 'bg-teal-300 text-white'}`}>1</div>
              <span className="text-xs sm:text-sm font-medium">Data</span>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step === 2 ? 'bg-white text-teal-500' : 'bg-teal-300 text-white'}`}>2</div>
              <span className="text-xs sm:text-sm font-medium">Ingressos</span>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 3 ? 'bg-white text-teal-500' : 'bg-teal-300 text-white'}`}>3</div>
              <span className="text-xs sm:text-sm font-medium">Suas Informações</span>
            </div>
          </div>

          {step === 1 && (
            <div className="p-8">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8 text-[10px] sm:text-xs font-bold uppercase text-slate-400">
                <div className="flex items-center"><span className="w-6 h-4 bg-teal-500 rounded-sm mr-2"></span>Disponível</div>
                <div className="flex items-center"><span className="w-6 h-4 border-2 border-blue-400 rounded-sm mr-2"></span>Hoje</div>
                <div className="flex items-center"><span className="w-6 h-4 bg-slate-200 rounded-sm mr-2"></span>Indisponível</div>
                <div className="flex items-center cursor-pointer hover:text-slate-600">Preços podem variar <HelpCircle className="w-4 h-4 ml-1" /></div>
              </div>

              <div className="flex items-center justify-between mb-8">
                <button onClick={() => changeMonth(-1)} className="p-2 text-slate-400"><ChevronLeft className="w-6 h-6" /></button>
                <h3 className="text-xl font-bold text-slate-700">{capitalizedMonth}</h3>
                <button onClick={() => changeMonth(1)} className="p-2 text-slate-400"><ChevronRight className="w-6 h-6" /></button>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-2 text-center text-xs font-bold text-slate-900">
                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(d => <div key={d}>{d}</div>)}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {daysInMonth.map((date, idx) => {
                  if (!date) return <div key={idx} className="h-12" />;
                  const isDatePast = isPast(date);
                  const isDateSelected = isSelected(date);
                  const isDateToday = isToday(date);
                  return (
                    <button
                      key={idx}
                      disabled={isDatePast}
                      onClick={() => handleDateSelect(date)}
                      className={`h-12 sm:h-14 rounded-md flex items-center justify-center text-sm font-bold transition-all ${isDatePast ? 'bg-slate-50 text-slate-300' : isDateSelected ? 'bg-teal-500 text-white shadow-lg' : 'bg-teal-500/80 text-white hover:bg-teal-500'} ${isDateToday && !isDateSelected ? 'border-2 border-blue-400' : ''}`}
                    >
                      {date.getDate()}
                    </button>
                  );
                })}
              </div>

              <div className="mt-12">
                <button disabled={!formData.date} onClick={handleNext} className="w-full bg-orange-500 text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-orange-600 shadow-lg disabled:opacity-50 transition-all">
                  Prosseguir
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="p-8">
              <div className="mb-6 pb-4 border-b">
                <h3 className="text-slate-400 text-xs font-bold uppercase mb-1">Data Selecionada</h3>
                <p className="text-xl font-bold text-slate-800">{formData.date.split('-').reverse().join('/')}</p>
              </div>

              <div className="space-y-10">
                {/* Ingresso Adulto */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-800">Ingresso Adulto</h4>
                    <p className="text-sm text-teal-600 font-bold">R$ {prices.adult.toFixed(2)}</p>
                    <p className="text-xs text-slate-400 mt-1">Day Use adulto sem churrasqueira</p>
                  </div>
                  <div className="flex items-center space-x-4 bg-slate-50 p-2 rounded-xl">
                    <button onClick={() => handleQuantity('adult', -1)} className="p-1 rounded-full bg-white border border-slate-200 text-slate-400 hover:text-teal-500"><Minus className="w-4 h-4" /></button>
                    <span className="font-bold w-4 text-center">{quantities.adult}</span>
                    <button onClick={() => handleQuantity('adult', 1)} className="p-1 rounded-full bg-white border border-slate-200 text-slate-400 hover:text-teal-500"><Plus className="w-4 h-4" /></button>
                  </div>
                </div>

                {/* Moto */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-800">Estacionamento moto</h4>
                    <p className="text-sm text-teal-600 font-bold">R$ {prices.moto.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center space-x-4 bg-slate-50 p-2 rounded-xl">
                    <button onClick={() => handleQuantity('moto', -1)} className="p-1 rounded-full bg-white border border-slate-200 text-slate-400 hover:text-teal-500"><Minus className="w-4 h-4" /></button>
                    <span className="font-bold w-4 text-center">{quantities.moto}</span>
                    <button onClick={() => handleQuantity('moto', 1)} className="p-1 rounded-full bg-white border border-slate-200 text-slate-400 hover:text-teal-500"><Plus className="w-4 h-4" /></button>
                  </div>
                </div>

                {/* Infantil 7-12 */}
                <div className="flex items-start justify-between opacity-60">
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-800">Ingresso - Infantil (7 a 12 anos)</h4>
                    <p className="text-sm text-slate-400 line-through">R$ {prices.childLarge.toFixed(2)}</p>
                  </div>
                  <div className="bg-red-50 text-red-600 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">Esgotado</div>
                </div>

                {/* Infantil 0-6 */}
                <div className="flex items-start justify-between opacity-60">
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-800">Ingresso - Infantil (0 a 6 anos)</h4>
                    <p className="text-sm text-slate-400 line-through">R$ {prices.childSmall.toFixed(2)}</p>
                  </div>
                  <div className="bg-red-50 text-red-600 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">Esgotado</div>
                </div>

                {/* Carro */}
                <div className="flex items-start justify-between opacity-60">
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-800">Estacionamento carro</h4>
                    <p className="text-sm text-slate-400 line-through">R$ {prices.car.toFixed(2)}</p>
                  </div>
                  <div className="bg-red-50 text-red-600 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">Esgotado</div>
                </div>
              </div>

              {(quantities.car > 0 || quantities.moto > 0) && (
                <div className="mt-8 p-4 bg-blue-50 text-blue-700 rounded-xl text-xs font-medium border border-blue-100">
                  <Info className="w-4 h-4 inline mr-2" />
                  Informações do veículo serão solicitadas na próxima etapa.
                </div>
              )}

              <div className="mt-12 pt-6 border-t">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-slate-500 font-medium">Total:</span>
                  <span className="text-3xl font-bold text-teal-600">R$ {totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex gap-4">
                  <button onClick={handleBack} className="flex-1 border border-slate-200 py-4 rounded-xl font-bold uppercase text-slate-400 hover:bg-slate-50">Voltar</button>
                  <button disabled={totalPrice === 0} onClick={handleNext} className="flex-[2] bg-orange-500 text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-orange-600 shadow-lg disabled:opacity-50">
                    Continuar
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="p-8">
              <h3 className="text-xl font-bold text-slate-800 mb-6">Suas Informações</h3>
              
              {/* Summary of selection */}
              <div className="bg-slate-50 p-6 rounded-2xl mb-10 border border-slate-100">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Itens Selecionados</h4>
                <div className="space-y-3">
                  {quantities.adult > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600 font-medium">{quantities.adult}x Ingresso Adulto</span>
                      <span className="font-bold text-slate-800">R$ {(quantities.adult * prices.adult).toFixed(2)}</span>
                    </div>
                  )}
                  {quantities.moto > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600 font-medium">{quantities.moto}x Estacionamento Moto</span>
                      <span className="font-bold text-slate-800">R$ {(quantities.moto * prices.moto).toFixed(2)}</span>
                    </div>
                  )}
                  {quantities.childLarge > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600 font-medium">{quantities.childLarge}x Ingresso Infantil (7-12)</span>
                      <span className="font-bold text-slate-800">R$ {(quantities.childLarge * prices.childLarge).toFixed(2)}</span>
                    </div>
                  )}
                  <div className="border-t pt-3 flex justify-between items-center">
                    <span className="font-bold text-slate-900">Total</span>
                    <span className="text-xl font-bold text-teal-600">R$ {totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Nome Completo</label>
                  <input 
                    type="text" 
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    placeholder="Ex: João da Silva"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">E-mail para Confirmação</label>
                  <input 
                    type="email" 
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    placeholder="joao@exemplo.com"
                  />
                </div>
                
                {(quantities.moto > 0 || quantities.car > 0) && (
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide leading-tight">
                      Informações do veículo (nome - placa - cpf/telefone responsável)
                    </label>
                    <textarea 
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none h-24 resize-none"
                      value={formData.vehicleInfo}
                      onChange={e => setFormData({...formData, vehicleInfo: e.target.value})}
                      placeholder="Ex: Honda PCX - ABC1234 - João Silva 11999999999"
                    />
                  </div>
                )}
              </div>

              <div className="mt-12 flex gap-4">
                <button onClick={handleBack} className="flex-1 border border-slate-200 py-4 rounded-xl font-bold uppercase text-slate-400 hover:bg-slate-50">Voltar</button>
                <button 
                  disabled={!formData.name || !formData.email || ((quantities.car > 0 || quantities.moto > 0) && !formData.vehicleInfo)} 
                  onClick={handleNext} 
                  className="flex-[2] bg-orange-500 text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-orange-600 shadow-lg disabled:opacity-50"
                >
                  Confirmar Dados
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="p-8 text-center">
              <h3 className="text-xl font-bold text-slate-800 mb-8">Pagamento Seguro via Mercado Pago</h3>
              
              <div className="bg-blue-50 p-8 rounded-[2rem] border-2 border-blue-100 mb-10">
                <img src="https://logodownload.org/wp-content/uploads/2019/06/mercado-pago-logo.png" alt="Mercado Pago" className="h-10 mx-auto mb-6" />
                <p className="text-slate-600 text-sm mb-6">Sua reserva de <strong>R$ {totalPrice.toFixed(2)}</strong> está pronta. Clique abaixo para ser redirecionado ao ambiente seguro de pagamento.</p>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 mr-2 text-green-500" /> Transação Criptografada
                </div>
              </div>

              <div className="flex gap-4">
                <button onClick={handleBack} className="flex-1 border border-slate-200 py-4 rounded-xl font-bold uppercase text-slate-400 hover:bg-slate-50">Voltar</button>
                <button 
                  onClick={handleCompletePayment}
                  className="flex-[2] bg-blue-600 text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-blue-700 shadow-lg"
                >
                  Pagar Agora
                </button>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="p-12 text-center">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-4">Reserva Confirmada!</h3>
              <p className="text-slate-500 mb-8 leading-relaxed">
                Parabéns! Sua vaga no <strong>{club.name}</strong> está garantida para o dia <strong>{formData.date.split('-').reverse().join('/')}</strong>.
                <br /><br />
                Enviamos os detalhes da reserva para o seu e-mail: <strong>{formData.email}</strong>.
              </p>
              <button onClick={() => navigate('/')} className="w-full bg-teal-600 text-white py-4 rounded-xl font-bold uppercase hover:bg-teal-700 shadow-lg transition-colors">
                Voltar ao Início
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Simple internal icon component for the payment step
const ShieldCheck = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
);

export default BookingPage;
