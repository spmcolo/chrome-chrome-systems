import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

const Icon = ({ name, ...props }) => {
  const LucideIcon = Icons?.[name] || Icons.HelpCircle;
  return <LucideIcon {...props} />;
};

export default function FormAtleta({ initialData, onSubmit }) {
  const [form, setForm] = useState({
    nome: initialData?.nome || '',
    apelido: initialData?.apelido || '',
    cpf: initialData?.cpf || '',
    telefone: initialData?.telefone || '',
    email: initialData?.email || '',
    dataNascimento: initialData?.dataNascimento || '',
    cidade: initialData?.cidade || '',
    estado: initialData?.estado || '',
    categoria: initialData?.categoria || 'Montaria em Touros',
    peito: initialData?.peito || '',
    cintura: initialData?.cintura || '',
    quadril: initialData?.quadril || '',
    peso: initialData?.peso || '',
    altura: initialData?.altura || '',
    foto: initialData?.foto || '',
    ...initialData
  });

  const [preview, setPreview] = useState(initialData?.foto || '');
  const fileInputRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setForm(prev => ({ ...prev, foto: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="font-['Montserrat'] bg-[#F9F8F6] text-[#333333]"
    >
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-24">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-[#6D4C3D] mb-10"
        >
          {initialData ? 'Editar Atleta' : 'Cadastrar Atleta'}
        </motion.h1>

        <form onSubmit={handleSubmit} className="grid gap-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="bg-white rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.06)] p-6 md:p-8"
          >
            <h2 className="font-['Playfair_Display'] text-2xl font-semibold text-[#6D4C3D] mb-6">Dados Pessoais</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#333333] mb-2">Nome Completo</label>
                <input
                  name="nome"
                  value={form.nome}
                  onChange={handleChange}
                  required
                  className="w-full border border-[#C97E4B]/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C97E4B] transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#333333] mb-2">Apelido</label>
                <input
                  name="apelido"
                  value={form.apelido}
                  onChange={handleChange}
                  className="w-full border border-[#C97E4B]/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C97E4B] transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#333333] mb-2">CPF</label>
                <input
                  name="cpf"
                  value={form.cpf}
                  onChange={handleChange}
                  required
                  className="w-full border border-[#C97E4B]/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C97E4B] transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#333333] mb-2">Telefone</label>
                <input
                  name="telefone"
                  value={form.telefone}
                  onChange={handleChange}
                  required
                  className="w-full border border-[#C97E4B]/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C97E4B] transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#333333] mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-[#C97E4B]/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C97E4B] transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#333333] mb-2">Data de Nascimento</label>
                <input
                  type="date"
                  name="dataNascimento"
                  value={form.dataNascimento}
                  onChange={handleChange}
                  required
                  className="w-full border border-[#C97E4B]/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C97E4B] transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#333333] mb-2">Cidade</label>
                <input
                  name="cidade"
                  value={form.cidade}
                  onChange={handleChange}
                  required
                  className="w-full border border-[#C97E4B]/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C97E4B] transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#333333] mb-2">Estado</label>
                <select
                  name="estado"
                  value={form.estado}
                  onChange={handleChange}
                  required
                  className="w-full border border-[#C97E4B]/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C97E4B] transition"
                >
                  <option value="">Selecione</option>
                  {['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'].map(uf => (
                    <option key={uf} value={uf}>{uf}</option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="bg-white rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.06)] p-6 md:p-8"
          >
            <h2 className="font-['Playfair_Display'] text-2xl font-semibold text-[#6D4C3D] mb-6">Categoria & Medidas</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#333333] mb-2">Categoria</label>
                <select
                  name="categoria"
                  value={form.categoria}
                  onChange={handleChange}
                  required
                  className="w-full border border-[#C97E4B]/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C97E4B] transition"
                >
                  <option value="Montaria em Touros">Montaria em Touros</option>
                  <option value="Montaria em Cavalos">Montaria em Cavalos</option>
                  <option value="Três Tambores">Três Tambores</option>
                  <option value="Laço Comprido">Laço Comprido</option>
                  <option value="Laço Dupla">Laço Dupla</option>
                </select>
              </div>
              <div className="md:col-span-2 grid md:grid-cols-5 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#333333] mb-2">Peito (cm)</label>
                  <input
                    type="number"
                    name="peito"
                    value={form.peito}
                    onChange={handleChange}
                    className="w-full border border-[#C97E4B]/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C97E4B] transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#333333] mb-2">Cintura (cm)</label>
                  <input
                    type="number"
                    name="cintura"
                    value={form.cintura}
                    onChange={handleChange}
                    className="w-full border border-[#C97E4B]/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C97E4B] transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#333333] mb-2">Quadril (cm)</label>
                  <input
                    type="number"
                    name="quadril"
                    value={form.quadril}
                    onChange={handleChange}
                    className="w-full border border-[#C97E4B]/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C97E4B] transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#333333] mb-2">Peso (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    name="peso"
                    value={form.peso}
                    onChange={handleChange}
                    className="w-full border border-[#C97E4B]/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C97E4B] transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#333333] mb-2">Altura (m)</label>
                  <input
                    type="number"
                    step="0.01"
                    name="altura"
                    value={form.altura}
                    onChange={handleChange}
                    className="w-full border border-[#C97E4B]/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C97E4B] transition"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="bg-white rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.06)] p-6 md:p-8"
          >
            <h2 className="font-['Playfair_Display'] text-2xl font-semibold text-[#6D4C3D] mb-6">Foto do Atleta</h2>
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="w-32 h-32 rounded-lg overflow-hidden border border-[#C97E4B]/30 bg-[#F5E6DC] flex items-center justify-center">
                {preview ? (
                  <img src={preview} alt="Preview" className="w-full h-full object-cover" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/150x150/F5E6DC/6D4C3D?text=Foto'; }} />
                ) : (
                  <Icon name="User" className="w-12 h-12 text-[#C97E4B]" />
                )}
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-[#333333] mb-2">Enviar Foto</label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFile}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-2 bg-[#6D4C3D] text-white px-4 py-2 rounded-lg hover:bg-[#C97E4B] hover:scale-105 active:scale-95 transition duration-300"
                >
                  <Icon name="Upload" className="w-4 h-4" />
                  Escolher Imagem
                </button>
                <p className="text-xs text-gray-500 mt-2">Formatos aceitos: JPG, PNG. Tamanho máx. 2MB</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex justify-end gap-4"
          >
            <button
              type="button"
              onClick={() => setForm({
                nome: '', apelido: '', cpf: '', telefone: '', email: '', dataNascimento: '', cidade: '', estado: '', categoria: 'Montaria em Touros', peito: '', cintura: '', quadril: '', peso: '', altura: '', foto: ''
              })}
              className="px-6 py-3 border border-[#6D4C3D] text-[#6D4C3D] rounded-lg hover:bg-[#F5E6DC] hover:scale-105 active:scale-95 transition duration-300"
            >
              Limpar
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-[#6D4C3D] text-white rounded-lg hover:bg-[#C97E4B] hover:scale-105 active:scale-95 transition duration-300 shadow-[0_4px_12px_rgba(109,76,61,0.25)]"
            >
              {initialData ? 'Atualizar' : 'Cadastrar'} Atleta
            </button>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
}