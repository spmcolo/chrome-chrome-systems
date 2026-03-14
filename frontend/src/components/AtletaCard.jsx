import React from 'react';
import * as Icons from 'lucide-react';
import { motion } from 'framer-motion';

const Icon = ({ name, ...props }) => {
  const LucideIcon = Icons?.[name] || Icons.HelpCircle;
  return <LucideIcon {...props} />;
};

export default function AtletaCard({ nome, cidade, foto_url, onEdit, onDelete }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
      className="bg-[#F9F8F6] rounded-lg shadow-[0_8px_24px_rgba(0,0,0,0.06)] overflow-hidden group"
    >
      <div className="relative">
        <img
          src={foto_url || 'https://images.pexels.com/photos/29527829/pexels-photo-29527829.jpeg'}
          alt={nome}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://placehold.co/600x400/F5E6DC/6D4C3D?text=Atleta';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <div className="p-6">
        <h3 className="font-['Playfair_Display'] text-2xl text-[#333333] mb-1">
          {nome}
        </h3>
        <p className="font-['Montserrat'] text-sm text-[#C97E4B] tracking-wide uppercase">
          {cidade}
        </p>

        <div className="mt-6 flex gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onEdit}
            className="flex-1 flex items-center justify-center gap-2 bg-[#6D4C3D] text-white py-2.5 px-4 rounded-lg shadow-sm hover:bg-[#5a3d30] transition-colors duration-300"
          >
            <Icon name="Edit3" className="w-4 h-4" />
            <span className="font-['Montserrat'] text-sm font-medium">Editar</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onDelete}
            className="flex-1 flex items-center justify-center gap-2 bg-transparent border border-[#C97E4B] text-[#C97E4B] py-2.5 px-4 rounded-lg hover:bg-[#C97E4B] hover:text-white transition-all duration-300"
          >
            <Icon name="Trash2" className="w-4 h-4" />
            <span className="font-['Montserrat'] text-sm font-medium">Excluir</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}