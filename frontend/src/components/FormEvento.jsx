import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

const Icon = ({ name, ...props }) => {
  const LucideIcon = Icons?.[name] || Icons.HelpCircle;
  return <LucideIcon {...props} />;
};

export default function FormEvento({ initialData, onSubmit, atletas, animais }) {
  const [formData, setFormData] = useState({
    nome: '',
    data: '',
    local: '',
    atletaId: '',
    animalId: '',
    nota: '',
    tempo: '',
    status: 'ativo',
    imagem: 'https://images.pexels.com/photos/33251/rodeo-horse-white-horse-action-shot.jpg'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        nome: initialData.nome || '',
        data: initialData.data ? new Date(initialData.data).toISOString().split('T')[0] : '',
        local: initialData.local || '',
        atletaId: initialData.atletaId || '',
        animalId: initialData.animalId || '',
        nota: initialData.nota || '',
        tempo: initialData.tempo || '',
        status: initialData.status || 'ativo',
        imagem: initialData.imagem || 'https://images.pexels.com/photos/33251/rodeo-horse-white-horse-action-shot.jpg'
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onSubmit({
        ...formData,
        nota: formData.nota ? parseFloat(formData.nota) : null,
        tempo: formData.tempo ? parseFloat(formData.tempo) : null
      });
    } catch (error) {
      console.error('Erro ao salvar evento:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-[#F9F8F6] font-['Montserrat']">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-['Playfair_Display'] text-[#333333] mb-4">
              {initialData ? 'Editar Evento' : 'Novo Evento'}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Cadastre ou edite as informações do evento de rodeio, selecionando atleta e animal participantes.
            </p>
          </div>

          <motion.form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.08)] p-8 md:p-12 space-y-8"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div variants={inputVariants}>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Nome do Evento
                </label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C97E4B] focus:border-transparent transition-all duration-300 font-['Montserrat']"
                  placeholder="Ex: Rodeio Internacional de Barretos"
                />
              </motion.div>

              <motion.div variants={inputVariants}>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Data do Evento
                </label>
                <input
                  type="date"
                  name="data"
                  value={formData.data}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C97E4B] focus:border-transparent transition-all duration-300 font-['Montserrat']"
                />
              </motion.div>

              <motion.div variants={inputVariants}>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Local do Evento
                </label>
                <input
                  type="text"
                  name="local"
                  value={formData.local}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C97E4B] focus:border-transparent transition-all duration-300 font-['Montserrat']"
                  placeholder="Ex: Arena Barretos, SP"
                />
              </motion.div>

              <motion.div variants={inputVariants}>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C97E4B] focus:border-transparent transition-all duration-300 font-['Montserrat']"
                >
                  <option value="ativo">Ativo</option>
                  <option value="encerrado">Encerrado</option>
                  <option value="cancelado">Cancelado</option>
                </select>
              </motion.div>
            </div>

            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-xl font-['Playfair_Display'] text-[#333333] mb-6">
                Participantes
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div variants={inputVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Atleta
                  </label>
                  <select
                    name="atletaId"
                    value={formData.atletaId}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C97E4B] focus:border-transparent transition-all duration-300 font-['Montserrat']"
                  >
                    <option value="">Selecione um atleta</option>
                    {atletas?.map(atleta => (
                      <option key={atleta.id} value={atleta.id}>
                        {atleta.nome}
                      </option>
                    ))}
                  </select>
                </motion.div>

                <motion.div variants={inputVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Animal
                  </label>
                  <select
                    name="animalId"
                    value={formData.animalId}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C97E4B] focus:border-transparent transition-all duration-300 font-['Montserrat']"
                  >
                    <option value="">Selecione um animal</option>
                    {animais?.map(animal => (
                      <option key={animal.id} value={animal.id}>
                        {animal.nome} - {animal.categoria}
                      </option>
                    ))}
                  </select>
                </motion.div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-xl font-['Playfair_Display'] text-[#333333] mb-6">
                Resultados
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div variants={inputVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Nota (0-100)
                  </label>
                  <input
                    type="number"
                    name="nota"
                    value={formData.nota}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    step="0.1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C97E4B] focus:border-transparent transition-all duration-300 font-['Montserrat']"
                    placeholder="Ex: 85.5"
                  />
                </motion.div>

                <motion.div variants={inputVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Tempo (segundos)
                  </label>
                  <input
                    type="number"
                    name="tempo"
                    value={formData.tempo}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C97E4B] focus:border-transparent transition-all duration-300 font-['Montserrat']"
                    placeholder="Ex: 8.45"
                  />
                </motion.div>
              </div>
            </div>

            <motion.div 
              variants={inputVariants}
              className="flex justify-end space-x-4 pt-8"
            >
              <button
                type="button"
                onClick={() => window.history.back()}
                className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 font-medium"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-[#6D4C3D] text-white rounded-lg hover:bg-[#5A3D30] hover:shadow-lg transform hover:scale-105 active:scale-95 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <Icon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
                    Salvando...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Icon name="Save" className="w-4 h-4 mr-2" />
                    {initialData ? 'Atualizar Evento' : 'Criar Evento'}
                  </span>
                )}
              </button>
            </motion.div>
          </motion.form>
        </motion.div>
      </div>
    </div>
  );
}