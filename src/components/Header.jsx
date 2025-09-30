import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-gray-900/70 bg-gray-900/90 border-b border-white/10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-md bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/20" />
          <div className="leading-tight">
            <h1 className="text-2xl font-bold tracking-tight text-white">GameGPT</h1>
            <p className="text-xs text-gray-400">AI Game Recommendation</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-3 text-white/90">
          {children}
        </nav>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center justify-center h-10 w-10 rounded-md border border-white/10 bg-white/5 text-white hover:bg-white/10 transition">
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div className={`md:hidden fixed top-0 right-0 h-full w-72 bg-gray-900/95 backdrop-blur border-l border-white/10 shadow-2xl transform ${isOpen ? 'translate-x-0 z-40' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>        
        <div className="p-4 flex justify-between items-center border-b border-white/10">
          <div className="text-white font-semibold">Menu</div>
          <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition">
            <X size={24} />
          </button>
        </div>
        <nav className="flex flex-col gap-3 p-4 text-white/90">
          {children}
        </nav>
      </div>
    </header>
  );
};

export default Header;
