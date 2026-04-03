import React from 'react';
import { motion } from 'framer-motion';

const ARCHIVE_ITEMS = [
  { id: 'arc-1', name: 'HOODIE // 000', year: '2023', img: '/lookbook_1.png' },
  { id: 'arc-2', name: 'CARGO // ORIGIN', year: '2023', img: '/product_model_1.png' },
  { id: 'arc-3', name: 'TEST PRINT // 01', year: '2023', img: '/visual_strip_1.png' },
  { id: 'arc-4', name: 'UTILITY // ALPHA', year: '2024', img: '/story_origin_gritty.png' },
  { id: 'arc-5', name: 'KNIT // VOID', year: '2024', img: '/lookbook_2.png' },
  { id: 'arc-6', name: 'SHELL // PROTO', year: '2024', img: '/product_model_2.png' },
  { id: 'arc-7', name: 'BOXY TEE // 000', year: '2024', img: '/lookbook_3.png' },
  { id: 'arc-8', name: 'PROCESS // 01', year: '2024', img: '/story_process_gritty.png' },
  { id: 'arc-9', name: 'STRAP // GENESIS', year: '2025', img: '/visual_strip_2.png' },
];

export default function ArchivePage() {
  return (
    <div className="bg-[#050505] min-h-screen pt-32 pb-24 border-t-8 border-[#CCFF00]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16">
        <div className="mb-16 md:mb-24">
          <p className="font-['Impact'] text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#CCFF00] mb-4">
            LEGACY FILES
          </p>
          <h1 className="font-['Impact'] text-[clamp(4rem,10vw,8rem)] uppercase tracking-widest text-white/20 leading-none">
            ARCHIVE
          </h1>
          <p className="mt-6 text-white/30 font-mono tracking-widest uppercase text-xs md:text-sm max-w-lg leading-relaxed border-l-2 border-[#CCFF00] pl-4">
            These artifacts are dead. Previous forms abandoned in the pursuit of evolution. Viewing only. Not for sale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {ARCHIVE_ITEMS.map((item, idx) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: (idx % 3) * 0.1 }}
              className="bg-[#0A0A0A] group relative overflow-hidden aspect-[3/4]"
            >
              <img 
                src={item.img} 
                alt={item.name} 
                className="w-full h-full object-cover grayscale opacity-30 mix-blend-luminosity group-hover:opacity-100 transition-all duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/20 transition-colors duration-700 pointer-events-none" />
              
              <div className="absolute bottom-6 left-6 pointer-events-none">
                <p className="font-mono text-[#CCFF00] text-[10px] tracking-widest uppercase mb-1">
                  [{item.year}] // SOLD OUT
                </p>
                <h3 className="font-['Impact'] text-xl text-white tracking-widest uppercase opacity-30 group-hover:opacity-100 transition-opacity duration-300">
                  {item.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
