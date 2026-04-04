import React, { useEffect, useState } from 'react';
import { useCountdown } from '@/hooks/useCountdown';
import { ArrowRight } from 'lucide-react';
import axios from 'axios';

const API = `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'}/api`;

// Set target date 1 month from now for testing
const TARGET_DATE = new Date();
TARGET_DATE.setMonth(TARGET_DATE.getMonth() + 1);
const TARGET_STR = TARGET_DATE.toISOString();

export default function DropCountdownSection() {
  const { days, hours, minutes, seconds, milliseconds, isExpired } = useCountdown(TARGET_STR);
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleNotifySubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    try {
      await axios.post(`${API}/waitlist`, { email_or_phone: email });
      setSubmitted(true);
    } catch (err) {
      console.error('Waitlist submission failed:', err);
      // Give them a brutalist error feedback
      alert('SYSTEM ERROR: UNABLE TO JOIN. TRY LATER.');
    }
  };

  if (isExpired) return null;

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <section className="py-10 md:py-20 transition-colors duration-500 relative overflow-hidden" data-testid="drop-countdown">
      {/* Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.03] opacity-[0.02]">
        <h3 className="font-['Impact']  md:text-[15vw] uppercase tracking-tighter whitespace-nowrap  text-white">
          THE DROP
        </h3>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-16 text-center relative z-10">
        <p className="font-['Impact']  md:text-sm uppercase tracking-[0.4em]  text-white/40 mb-8 md:mb-12">
          Next Drop In
        </p>

        {/* All times strictly in one single line without wrapping */}
        <div className="flex flex-nowrap justify-center items-end gap-x-1 sm:gap-x-3 md:gap-x-8">
          
          {/* Days */}
          <div className="flex flex-col items-center">
            <span className="font-['Impact']  sm:text-5xl md:text-7xl lg:text-9xl  text-white leading-none tracking-tighter w-[2ch] mx-auto ">
              {mounted ? pad(days) : '00'}
            </span>
            <span className="font-['Impact']  sm:text-xs md:text-sm uppercase tracking-[0.2em]  text-white/40 mt-1 md:mt-2">Days</span>
          </div>

          <span className="font-['Impact']  sm:text-3xl md:text-5xl lg:text-7xl  text-white/20 pb-3 sm:pb-5 md:pb-8 lg:pb-12 shrink-0">:</span>

          {/* Hours */}
          <div className="flex flex-col items-center">
            <span className="font-['Impact']  sm:text-5xl md:text-7xl lg:text-9xl  text-white leading-none tracking-tighter w-[2ch] mx-auto ">
              {mounted ? pad(hours) : '00'}
            </span>
            <span className="font-['Impact']  sm:text-xs md:text-sm uppercase tracking-[0.2em]  text-white/40 mt-1 md:mt-2">Hours</span>
          </div>

          <span className="font-['Impact']  sm:text-3xl md:text-5xl lg:text-7xl  text-white/20 pb-3 sm:pb-5 md:pb-8 lg:pb-12 shrink-0">:</span>

          {/* Minutes */}
          <div className="flex flex-col items-center">
            <span className="font-['Impact']  sm:text-5xl md:text-7xl lg:text-9xl  text-white leading-none tracking-tighter w-[2ch] mx-auto ">
              {mounted ? pad(minutes) : '00'}
            </span>
            <span className="font-['Impact']  sm:text-xs md:text-sm uppercase tracking-[0.2em]  text-white/40 mt-1 md:mt-2">Mins</span>
          </div>

          <span className="font-['Impact']  sm:text-3xl md:text-5xl lg:text-7xl  text-white/20 pb-3 sm:pb-5 md:pb-8 lg:pb-12 shrink-0">:</span>

          {/* Seconds */}
          <div className="flex flex-col items-center">
            <span className="font-['Impact']  sm:text-5xl md:text-7xl lg:text-9xl  text-white leading-none tracking-tighter w-[2ch] mx-auto ">
              {mounted ? pad(seconds) : '00'}
            </span>
            <span className="font-['Impact']  sm:text-xs md:text-sm uppercase tracking-[0.2em]  text-white/40 mt-1 md:mt-2">Secs</span>
          </div>

          <span className="font-['Impact']  sm:text-3xl md:text-5xl lg:text-7xl  text-white/20 pb-3 sm:pb-5 md:pb-8 lg:pb-12 shrink-0">.</span>

          {/* Milliseconds */}
          <div className="flex flex-col items-center">
            <span className="font-['Impact']  sm:text-4xl md:text-6xl lg:text-8xl  text-white/60 leading-none tracking-tighter w-[2ch] mx-auto ">
              {mounted ? pad(milliseconds) : '00'}
            </span>
            <span className="font-['Impact']  sm:text-xs md:text-sm uppercase tracking-[0.2em]  text-white/40 mt-1 md:mt-2 opacity-0 select-none">MS</span>
          </div>
        </div>

        {/* Email Notification Form */}
        <div className="mt-16 max-w-md mx-auto">
          {submitted ? (
            <div className="bg-[#CCFF00] text-black py-4 px-6 font-['Impact'] uppercase tracking-widest text-xl">
              LOCKED IN.
            </div>
          ) : (
            <form onSubmit={handleNotifySubmit} className="relative group flex flex-col md:flex-row shadow-2xl">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="NOTIFY ME 15 MINS BEFORE THE DROP"
                required
                className="w-full bg-white/5 border border-white/10 text-white pb-3 pt-4 px-4 font-mono text-sm md:text-base uppercase tracking-widest outline-none transition-colors duration-300 placeholder:text-white/30 focus:border-white focus:bg-white/10 rounded-none mb-2 md:mb-0"
              />
              <button 
                type="submit"
                className="bg-white text-black font-['Impact'] px-6 py-3 uppercase tracking-widest text-base hover:bg-[#CCFF00] transition-colors duration-300 shrink-0 flex items-center justify-center gap-2"
              >
                NOTIFY ME <ArrowRight size={20} />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
