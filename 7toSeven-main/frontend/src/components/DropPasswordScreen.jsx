import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Lock, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DropPasswordScreen({ onUnlock }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.toUpperCase() === '7TOSEVEN') {
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return createPortal(
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="fixed inset-0 z-[100] bg-[#0A0A0A] flex flex-col items-center justify-start pt-[25vh] px-6" 
      data-testid="drop-password-screen"
    >
      <button 
        onClick={() => navigate('/')} 
        className="absolute top-6 right-6 md:top-8 md:right-8 text-white/40 hover:text-white transition-colors duration-300 z-50 min-w-[44px] min-h-[44px] flex items-center justify-center"
        aria-label="Exit password screen"
      >
        <X size={32} strokeWidth={1.5} />
      </button>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md text-center"
      >
        <Lock className="w-8 h-8 text-white/20 mx-auto mb-8" />
        
        <h2 className="font-['Impact'] text-5xl md:text-7xl uppercase tracking-widest text-white leading-none mb-4">
          LOCKED
        </h2>
        
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/40 mb-12">
          EARLY ACCESS REQUIRES AUTHORIZATION
        </p>

        <form onSubmit={handleSubmit} className="relative group">
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
            }}
            placeholder="ENTER PASSWORD"
            className={`w-full bg-transparent border-b-2 ${error ? 'border-red-500 text-red-500' : 'border-white/20 text-white focus:border-white'} pb-4 px-2 font-['Impact'] text-xl tracking-[0.2em] text-center outline-none transition-colors duration-300 placeholder:text-white/20`}
          />
          <button 
            type="submit"
            className="absolute right-0 top-0 bottom-0 px-4 text-white/40 hover:text-white transition-colors duration-300"
          >
            <ArrowRight size={24} />
          </button>
        </form>

        <AnimatePresence>
          {error && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-red-500 font-mono text-[10px] uppercase tracking-widest mt-6"
            >
              ACCESS DENIED. INVALID CREDENTIALS.
            </motion.p>
          )}
        </AnimatePresence>

      </motion.div>
    </motion.div>,
    document.body
  );
}
