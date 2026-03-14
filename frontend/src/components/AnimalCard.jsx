import React from 'react';
import * as Icons from 'lucide-react';
import { motion } from 'framer-motion';

const Icon = ({ name, ...props }) => {
  const LucideIcon = Icons?.[name] || Icons.HelpCircle;
  return <LucideIcon {...props} />;
};

export default function AnimalCard({ nome, tipo, cia, onEdit, onDelete }) {
  const imageMap = {
    boi: 'https://images.pexels.com/photos/17134781/pexels-photo-17134781.jpeg',
    cavalo: 'https://images.pexels.com/photos/13045061/pexels-photo-13045061.jpeg',
    novilho: 'https://images.pexels.com/photos/16393501/pexels-photo-16393501.jpeg',
    porco: 'https://images.pexels.com/photos/5367338/pexels-photo-5367338.jpeg',
  };

  const image = imageMap[tipo?.toLowerCase()] || 'https://images.pexels.com/photos/12950488/pexels-photo-12950488.jpeg';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      whileHover={{ y: -4 }}
      className="bg-[#F9F8F6] rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.06)] overflow-hidden group"
    >
      <div className="relative h-48 w-full">
        <img
          src={image}
          alt={nome}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://placehold.co/600x400/6D4C3D/F9F8F6?text=Animal';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#6D4C3D]/40 to-transparent" />
      </div>
      <div className="p-6">
        <h3 className="font-['Playfair_Display'] text-2xl text-[#333333] mb-1">{nome}</h3>
        <p className="font-['Montserrat'] text-sm text-[#C97E4B] uppercase tracking-wider mb-2">{tipo}</p>
        <p className="font-['Montserrat'] text-sm text-gray-700 mb-4">{cia}</p>
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={onEdit}
            className="flex items-center gap-2 px-4 py-2 bg-[#6D4C3D] text-white rounded-lg shadow-sm hover:bg-[#5A3C30] transition-colors duration-300"
          >
            <Icon name="Edit" size={16} />
            Editar
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={onDelete}
            className="flex items-center gap-2 px-4 py-2 bg-transparent border border-[#C97E4B] text-[#C97E4B] rounded-lg hover:bg-[#C97E4B] hover:text-white transition-all duration-300"
          >
            <Icon name="Trash2" size={16} />
            Excluir
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}