import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

const Icon = ({ name, ...props }) => {
  const LucideIcon = Icons?.[name] || Icons.HelpCircle;
  return <LucideIcon {...props} />;
};

export default function FormCompanhia({ initialData, onSubmit }) {
  const [form, setForm] = useState({
    nome: '',
    responsavel: '',
    telefone: '',
    email: '',
    cidade: '',
    estado: '',
    logo: '',
    corPrimaria: '#6D4C3D',
    corSecundaria: '#F5E6DC',
    ativo: true,
    ...initialData
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-[#F9F8F6] font-['Montserrat'] text-[#333333]"
    >
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 1.5 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="font-['Playfair_Display'] text-4xl md:text-6xl text-[#333333] mb-12 text-center">
            {initialData ? 'Editar Companhia' : 'Nova Companhia'}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-lg shadow-[0_8px_24px_rgba(0,0,0,0.04)] p-8"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Nome da Companhia</label>
                  <input
                    name="nome"
                    value={form.nome}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C97E4B] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Responsável</label>
                  <input
                    name="responsavel"
                    value={form.responsavel}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C97E4B] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Telefone</label>
                  <input
                    name="telefone"
                    value={form.telefone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C97E4B] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C97E4B] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Cidade</label>
                  <input
                    name="cidade"
                    value={form.cidade}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C97E4B] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Estado</label>
                  <select
                    name="estado"
                    value={form.estado}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C97E4B] focus:border-transparent transition-all"
                  >
                    <option value="">Selecione</option>
                    <option value="AC">Acre</option>
                    <option value="AL">Alagoas</option>
                    <option value="AP">Amapá</option>
                    <option value="AM">Amazonas</option>
                    <option value="BA">Bahia</option>
                    <option value="CE">Ceará</option>
                    <option value="DF">Distrito Federal</option>
                    <option value="ES">Espírito Santo</option>
                    <option value="GO">Goiás</option>
                    <option value="MA">Maranhão</option>
                    <option value="MT">Mato Grosso</option>
                    <option value="MS">Mato Grosso do Sul</option>
                    <option value="MG">Minas Gerais</option>
                    <option value="PA">Pará</option>
                    <option value="PB">Paraíba</option>
                    <option value="PR">Paraná</option>
                    <option value="PE">Pernambuco</option>
                    <option value="PI">Piauí</option>
                    <option value="RJ">Rio de Janeiro</option>
                    <option value="RN">Rio Grande do Norte</option>
                    <option value="RS">Rio Grande do Sul</option>
                    <option value="RO">Rondônia</option>
                    <option value="RR">Roraima</option>
                    <option value="SC">Santa Catarina</option>
                    <option value="SP">São Paulo</option>
                    <option value="SE">Sergipe</option>
                    <option value="TO">Tocantins</option>
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium mb-2">Logo URL</label>
                <input
                  name="logo"
                  value={form.logo}
                  onChange={handleChange}
                  placeholder="https://images.pexels.com/photos/9973155/pexels-photo-9973155.jpeg"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C97E4B] focus:border-transparent transition-all"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-lg shadow-[0_8px_24px_rgba(0,0,0,0.04)] p-8"
            >
              <h2 className="font-['Playfair_Display'] text-2xl text-[#333333] mb-6">Identidade Visual</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Cor Primária</label>
                  <div className="flex items-center gap-3">
                    <input
                      name="corPrimaria"
                      type="color"
                      value={form.corPrimaria}
                      onChange={handleChange}
                      className="w-16 h-10 rounded-lg cursor-pointer"
                    />
                    <input
                      name="corPrimaria"
                      type="text"
                      value={form.corPrimaria}
                      onChange={handleChange}
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C97E4B] focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Cor Secundária</label>
                  <div className="flex items-center gap-3">
                    <input
                      name="corSecundaria"
                      type="color"
                      value={form.corSecundaria}
                      onChange={handleChange}
                      className="w-16 h-10 rounded-lg cursor-pointer"
                    />
                    <input
                      name="corSecundaria"
                      type="text"
                      value={form.corSecundaria}
                      onChange={handleChange}
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C97E4B] focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <input
                  name="ativo"
                  type="checkbox"
                  checked={form.ativo}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-gray-300 text-[#C97E4B] focus:ring-[#C97E4B]"
                />
                <label className="text-sm font-medium">Companhia Ativa</label>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex justify-end gap-4"
            >
              <button
                type="button"
                className="px-8 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-300"
              >
                Cancelar
              </button>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 bg-[#6D4C3D] text-white rounded-lg hover:bg-[#C97E4B] transition-all duration-300 shadow-lg"
              >
                {initialData ? 'Atualizar Companhia' : 'Criar Companhia'}
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
}