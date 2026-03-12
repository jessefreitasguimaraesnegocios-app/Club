
import React from 'react';
import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 border-b border-slate-800 pb-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-serif font-bold mb-4">CLUBE <span className="font-light">RESERVE</span></h3>
            <p className="text-slate-400 max-w-md">
              A maior rede de clubes de lazer e entretenimento. Reserve seu momento de descanso com facilidade e segurança.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-teal-400">Sobre Nós</a></li>
              <li><a href="#" className="hover:text-teal-400">Clubes Parceiros</a></li>
              <li><a href="#" className="hover:text-teal-400">Como Funciona</a></li>
              <li><a href="#" className="hover:text-teal-400">Privacidade</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>suporte@clubereserve.com.br</span>
              </li>
              <li className="flex space-x-4 pt-2">
                <Instagram className="w-5 h-5 cursor-pointer hover:text-teal-400" />
                <Facebook className="w-5 h-5 cursor-pointer hover:text-teal-400" />
                <Twitter className="w-5 h-5 cursor-pointer hover:text-teal-400" />
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center text-slate-500 text-xs">
          © {new Date().getFullYear()} Clube Reserve. Todos os direitos reservados. Inspirado em Oasis Sabará.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
