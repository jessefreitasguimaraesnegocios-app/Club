
import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../App';
import { MapPin, Star, ArrowRight, Search } from 'lucide-react';

const Home: React.FC = () => {
  const { clubs } = useApp();

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=2000" 
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/40"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight animate-fade-in">
            Encontre o seu <br /> <span className="text-teal-300">próximo oásis.</span>
          </h1>
          <p className="text-xl text-slate-100 mb-8 max-w-xl">
            Descubra os melhores clubes, beach clubs e centros de lazer para relaxar e se divertir com estilo.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-grow bg-white rounded-full p-2 flex items-center shadow-lg max-w-md">
              <Search className="w-6 h-6 text-slate-400 ml-3" />
              <input 
                type="text" 
                placeholder="Para onde você quer ir?"
                className="w-full px-3 py-2 text-slate-800 focus:outline-none bg-transparent"
              />
              <button className="bg-teal-600 text-white px-6 py-2 rounded-full font-medium hover:bg-teal-700 transition-colors">
                Buscar
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Clubs */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-serif font-bold text-slate-900">Clubes em Destaque</h2>
            <p className="text-slate-500">As melhores opções selecionadas para você</p>
          </div>
          <Link to="/search" className="text-teal-600 font-medium flex items-center hover:underline">
            Ver todos <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clubs.map((club) => (
            <Link 
              key={club.id} 
              to={`/club/${club.id}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={club.imageUrl} 
                  alt={club.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-bold text-teal-600 shadow-sm">
                  R$ {club.pricing.toFixed(2)}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center text-teal-600 text-sm font-medium mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  {club.location}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-teal-600 transition-colors">
                  {club.name}
                </h3>
                <p className="text-slate-500 text-sm line-clamp-2 mb-4">
                  {club.description}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <div className="flex items-center space-x-1">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                  </div>
                  <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                    {club.hours}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-teal-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-6">Possui um Clube?</h2>
          <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
            Aumente suas reservas, profissionalize sua gestão e receba pagamentos automaticamente com nossa plataforma.
          </p>
          <Link to="/admin/login" className="bg-teal-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-teal-700 transition-shadow shadow-lg hover:shadow-teal-200">
            Cadastre seu Clube Agora
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
