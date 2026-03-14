import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

const Icon = ({ name, ...props }) => {
  const LucideIcon = Icons?.[name] || Icons.HelpCircle;
  return <LucideIcon {...props} />;
};

export default function EventoTable({ eventos, onEditNota, onEditTempo, onDelete, onDownloadImagem }) {
  const [editing, setEditing] = useState({ id: null, field: null });
  const [tempValue, setTempValue] = useState('');

  const handleEditStart = (id, field, currentValue) => {
    setEditing({ id, field });
    setTempValue(currentValue?.toString() || '');
  };

  const handleEditSave = () => {
    if (editing.field === 'nota') {
      onEditNota(editing.id, parseFloat(tempValue) || 0);
    } else if (editing.field === 'tempo') {
      onEditTempo(editing.id, parseFloat(tempValue) || 0);
    }
    setEditing({ id: null, field: null });
    setTempValue('');
  };

  const handleEditCancel = () => {
    setEditing({ id: null, field: null });
    setTempValue('');
  };

  return (
    <div className="w-full bg-[#F9F8F6] p-6 md:p-10 rounded-lg shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="overflow-x-auto"
      >
        <table className="min-w-full table-auto">
          <thead>
            <tr className="border-b border-[#C97E4B]/30">
              <th className="px-4 py-3 text-left text-sm font-semibold text-[#333333] tracking-wide">Atleta</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-[#333333] tracking-wide">Animal</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-[#333333] tracking-wide">Nota</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-[#333333] tracking-wide">Tempo</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-[#333333] tracking-wide">Ações</th>
            </tr>
          </thead>
          <tbody>
            {eventos.map((evento, idx) => (
              <motion.tr
                key={evento.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="border-b border-[#C97E4B]/20 hover:bg-[#F5E6DC]/50 transition-colors duration-300"
              >
                <td className="px-4 py-4 text-[#333333] font-['Montserrat']">{evento.atleta}</td>
                <td className="px-4 py-4 text-[#333333] font-['Montserrat']">{evento.animal}</td>
                <td className="px-4 py-4">
                  {editing.id === evento.id && editing.field === 'nota' ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="100"
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        className="w-20 px-2 py-1 border border-[#C97E4B] rounded-lg text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#C97E4B]"
                        autoFocus
                      />
                      <button
                        onClick={handleEditSave}
                        className="text-green-700 hover:text-green-900 transition-colors"
                      >
                        <Icon name="Check" size={16} />
                      </button>
                      <button
                        onClick={handleEditCancel}
                        className="text-red-700 hover:text-red-900 transition-colors"
                      >
                        <Icon name="X" size={16} />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleEditStart(evento.id, 'nota', evento.nota)}
                      className="flex items-center gap-2 text-[#6D4C3D] hover:text-[#C97E4B] transition-colors duration-300"
                    >
                      <span>{evento.nota?.toFixed(1) || '0.0'}</span>
                      <Icon name="Edit" size={14} />
                    </button>
                  )}
                </td>
                <td className="px-4 py-4">
                  {editing.id === evento.id && editing.field === 'tempo' ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        className="w-20 px-2 py-1 border border-[#C97E4B] rounded-lg text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#C97E4B]"
                        autoFocus
                      />
                      <button
                        onClick={handleEditSave}
                        className="text-green-700 hover:text-green-900 transition-colors"
                      >
                        <Icon name="Check" size={16} />
                      </button>
                      <button
                        onClick={handleEditCancel}
                        className="text-red-700 hover:text-red-900 transition-colors"
                      >
                        <Icon name="X" size={16} />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleEditStart(evento.id, 'tempo', evento.tempo)}
                      className="flex items-center gap-2 text-[#6D4C3D] hover:text-[#C97E4B] transition-colors duration-300"
                    >
                      <span>{evento.tempo?.toFixed(2) || '0.00'}s</span>
                      <Icon name="Edit" size={14} />
                    </button>
                  )}
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onDownloadImagem(evento.id)}
                      className="flex items-center gap-2 px-3 py-2 bg-[#6D4C3D] text-white rounded-lg hover:bg-[#C97E4B] transition-colors duration-300"
                    >
                      <Icon name="Download" size={16} />
                      <span className="hidden sm:inline">Imagem</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onDelete(evento.id)}
                      className="flex items-center gap-2 px-3 py-2 bg-transparent text-red-700 border border-red-700 rounded-lg hover:bg-red-700 hover:text-white transition-all duration-300"
                    >
                      <Icon name="Trash2" size={16} />
                      <span className="hidden sm:inline">Excluir</span>
                    </motion.button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}