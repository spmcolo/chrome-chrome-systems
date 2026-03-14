import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

const Icon = ({ name, ...props }) => {
  const LucideIcon = Icons?.[name] || Icons.HelpCircle;
  return <LucideIcon {...props} />;
};

export default function FormAnimal({ initialData, onSubmit, companhias }) {
  const [formData, setFormData] = useState({
    nome: '',
    tipo: 'cavalo',
    companhiaId: '',
    numero: '',
    peso: '',
    idade: '',
    pelagem: '',
    observacoes: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        nome: initialData.nome || '',
        tipo: initialData.tipo || 'cavalo',
        companhiaId: initialData.companhiaId || '',
        numero: initialData.numero || '',
        peso: initialData.peso || '',
        idade: initialData.idade || '',
        pelagem: initialData.pelagem || '',
        observacoes: initialData.observacoes || ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.nome.trim()) newErrors.nome = 'Nome é obrigatório';
    if (!formData.companhiaId) newErrors.companhiaId = 'Companhia é obrigatória';
    if (!formData.numero.trim()) newErrors.numero = 'Número é obrigatório';
    if (!formData.peso.trim()) newErrors.peso = 'Peso é obrigatório';
    if (!formData.idade.trim()) newErrors.idade = 'Idade é obrigatória';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onSubmit(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-4xl mx-auto bg-[#F9F8F6] rounded-lg shadow-[0_8px_32px_rgba(0,0,0,0.08)] p-8 md:p-12 font-['Montserrat']"
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="font-['Playfair_Display'] text-3xl md:text-4xl text-[#333333] mb-8"
      >
        {initialData ? 'Editar Animal' : 'Cadastrar Animal'}
      </motion.h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <label className="block text-sm font-medium text-[#333333] mb-2">
              Nome do Animal
            </label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-white border ${errors.nome ? 'border-[#C97E4B]' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6D4C3D] focus:border-transparent transition-all duration-300`}
              placeholder="Ex: Trovão, Relâmpago..."
            />
            {errors.nome && <p className="text-[#C97E4B] text-sm mt-1">{errors.nome}</p>}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <label className="block text-sm font-medium text-[#333333] mb-2">
              Tipo
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="tipo"
                  value="cavalo"
                  checked={formData.tipo === 'cavalo'}
                  onChange={handleChange}
                  className="mr-2 text-[#6D4C3D] focus:ring-[#6D4C3D]"
                />
                <span className="text-[#333333]">Cavalo</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="tipo"
                  value="touro"
                  checked={formData.tipo === 'touro'}
                  onChange={handleChange}
                  className="mr-2 text-[#6D4C3D] focus:ring-[#6D4C3D]"
                />
                <span className="text-[#333333]">Touro</span>
              </label>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <label className="block text-sm font-medium text-[#333333] mb-2">
              Companhia
            </label>
            <select
              name="companhiaId"
              value={formData.companhiaId}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-white border ${errors.companhiaId ? 'border-[#C97E4B]' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6D4C3D] focus:border-transparent transition-all duration-300`}
            >
              <option value="">Selecione uma companhia</option>
              {companhias?.map(companhia => (
                <option key={companhia.id} value={companhia.id}>
                  {companhia.nome}
                </option>
              ))}
            </select>
            {errors.companhiaId && <p className="text-[#C97E4B] text-sm mt-1">{errors.companhiaId}</p>}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <label className="block text-sm font-medium text-[#333333] mb-2">
              Número de Identificação
            </label>
            <input
              type="text"
              name="numero"
              value={formData.numero}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-white border ${errors.numero ? 'border-[#C97E4B]' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6D4C3D] focus:border-transparent transition-all duration-300`}
              placeholder="Ex: 001, 123..."
            />
            {errors.numero && <p className="text-[#C97E4B] text-sm mt-1">{errors.numero}</p>}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <label className="block text-sm font-medium text-[#333333] mb-2">
              Peso (kg)
            </label>
            <input
              type="number"
              name="peso"
              value={formData.peso}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-white border ${errors.peso ? 'border-[#C97E4B]' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6D4C3D] focus:border-transparent transition-all duration-300`}
              placeholder="Ex: 450"
            />
            {errors.peso && <p className="text-[#C97E4B] text-sm mt-1">{errors.peso}</p>}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <label className="block text-sm font-medium text-[#333333] mb-2">
              Idade (anos)
            </label>
            <input
              type="number"
              name="idade"
              value={formData.idade}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-white border ${errors.idade ? 'border-[#C97E4B]' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6D4C3D] focus:border-transparent transition-all duration-300`}
              placeholder="Ex: 5"
            />
            {errors.idade && <p className="text-[#C97E4B] text-sm mt-1">{errors.idade}</p>}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <label className="block text-sm font-medium text-[#333333] mb-2">
            Pelagem
          </label>
          <input
            type="text"
            name="pelagem"
            value={formData.pelagem}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6D4C3D] focus:border-transparent transition-all duration-300"
            placeholder="Ex: Alazão, Preto, Branco..."
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <label className="block text-sm font-medium text-[#333333] mb-2">
            Observações
          </label>
          <textarea
            name="observacoes"
            value={formData.observacoes}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6D4C3D] focus:border-transparent transition-all duration-300 resize-none"
            placeholder="Informações adicionais sobre o animal..."
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex justify-end space-x-4 pt-6"
        >
          <button
            type="button"
            onClick={() => setFormData({
              nome: '',
              tipo: 'cavalo',
              companhiaId: '',
              numero: '',
              peso: '',
              idade: '',
              pelagem: '',
              observacoes: ''
            })}
            className="px-6 py-3 border border-[#6D4C3D] text-[#6D4C3D] rounded-lg hover:bg-[#6D4C3D] hover:text-white transition-all duration-300 transform hover:scale-105"
          >
            Limpar
          </button>
          <button
            type="submit"
            className="px-8 py-3 bg-[#6D4C3D] text-white rounded-lg hover:bg-[#5a3d32] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            {initialData ? 'Atualizar' : 'Cadastrar'}
          </button>
        </motion.div>
      </form>
    </motion.div>
  );
}