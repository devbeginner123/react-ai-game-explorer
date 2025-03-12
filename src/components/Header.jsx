import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-gray-900 py-2">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">GameGPT</h1>
          <p className="text-gray-400 mt-2">Ai-game Recommendation</p>
        </div>

        
        <nav className="hidden md:flex gap-6 text-white">
          {children}
        </nav>

        
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

     
      <div className={`fixed top-0 right-0 h-full w-64 bg-gray-800 shadow-lg transform ${isOpen ? 'translate-x-0 z-20' : 'translate-x-full'} transition-transform duration-300 ease-in-out flex flex-col p-4 md:hidden`}>
        <div className="flex justify-end">
          <button onClick={() => setIsOpen(false)} className="text-white">
            <X size={28} />
          </button>
        </div>
        <nav className="flex flex-col gap-4 text-white">
          {children}
        </nav>
      </div>
    </header>
  );
};

export default Header;
