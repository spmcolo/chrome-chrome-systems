import React from 'react';
import * as Icons from 'lucide-react';
import { motion } from 'framer-motion';

const Icon = ({ name, ...props }) => {
  const LucideIcon = Icons?.[name] || Icons.HelpCircle;
  return <LucideIcon {...props} />;
};

export default function CompanhiaCard({ cia, cidade, uf, onEdit, onDelete }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
      className="bg-[#F9F8F6] rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.06)] overflow-hidden group"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-[#6D4C3D] rounded-lg flex items-center justify-center">
              <Icon name="Building" className="w-8 h-8 text-[#F5E6DC]" />
            </div>
            <div>
              <h3 className="font-['Playfair_Display'] text-2xl text-[#333333] font-semibold leading-tight">
                {cia}
              </h3>
              <p className="font-['Montserrat'] text-sm text-[#C97E4B] mt-1">
                Companhia de Rodeio
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-6">
          <Icon name="MapPin" className="w-4 h-4 text-[#6D4C3D]" />
          <span className="font-['Montserrat'] text-[#333333] text-sm">
            {cidade}, {uf}
          </span>
        </div>

        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onEdit}
            className="flex-1 bg-[#6D4C3D] text-white font-['Montserrat'] text-sm py-3 px-4 rounded-lg hover:bg-[#5a3d32] transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Icon name="Edit" className="w-4 h-4" />
            Editar
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onDelete}
            className="flex-1 bg-[#C97E4B] text-white font-['Montserrat'] text-sm py-3 px-4 rounded-lg hover:bg-[#b3693f] transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Icon name="Trash2" className="w-4 h-4" />
            Excluir
          </motion.button>
        </div>
      </div>

      <div className="h-2 bg-gradient-to-r from-[#6D4C3D] to-[#C97E4B]" />
    </motion.div>
  );
}