import React, { useState, lazy, Suspense } from 'react';
import { faker } from '@faker-js/faker';
import * as Icons from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import CompanhiaCard from '../components/CompanhiaCard';
import FormCompanhia from '../components/FormCompanhia';

const Icon = ({ name, ...props }) => {
  const LucideIcon = Icons?.[name] || Icons.HelpCircle;
  return <LucideIcon {...props} />;
};

const Footer = lazy(() => import('../components/Footer'));

const fake = {
  uuid: () => faker.string?.uuid?.() || Math.random().toString(36).slice(2),
  companyName: () => faker.company?.name?.() || 'Cia Rodeio Brasil',
  city: () => faker.location?.city?.() || 'Barretos',
  state: () => faker.location?.state?.({ abbreviated: true }) || 'SP'
};

const generateMockCompanhias = (count = 12) => {
  const estados = ['SP','MS','MT','GO','MG','RS','PR','BA','PE','CE','RO','TO'];
  return Array.from({ length: count }, () => ({
    id: fake.uuid(),
    cia: fake.companyName(),
    cidade: fake.city(),
    uf: estados[Math.floor(Math.random()*estados.length)]
  }));
};

export default function CompanhiaDeRodeio() {
  const [companhias, setCompanhias] = useState(() => generateMockCompanhias(12));
  const [search, setSearch] = useState('');
  const [filterUF, setFilterUF] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  const navLinks = [
    { route: '/', label: 'Home' },
    { route: '/atletas', label: 'Atletas' },
    { route: '/cia', label: 'Companhias' },
    { route: '/animais', label: 'Animais' },
    { route: '/eventos', label: 'Eventos' },
    { route: '/eventos/visualizacao', label: 'Visualização' }
  ];

  const filtered = companhias.filter(c => {
    const match = search ? c.cia.toLowerCase().includes(search.toLowerCase()) || c.cidade.toLowerCase().includes(search.toLowerCase()) : true;
    const ufMatch = filterUF ? c.uf === filterUF : true;
    return match && ufMatch;
  });

  const handleCreate = (data) => {
    const nova = { id: fake.uuid(), cia: data.nome, cidade: data.cidade, uf: data.estado };
    setCompanhias(prev => [nova, ...prev]);
    setShowForm(false);
  };

  const handleUpdate = (data) => {
    setCompanhias(prev => prev.map(c => c.id === editing.id ? { ...c, cia: data.nome, cidade: data.cidade, uf: data.estado } : c));
    setEditing(null);
  };

  const handleDelete = (id) => {
    setCompanhias(prev => prev.filter(c => c.id !== id));
  };

  const ufs = [...new Set(companhias.map(c => c.uf))].sort();

  return (
    <div className="min-h-screen bg-[#F9F8F6] font-['Montserrat']">
      <Header navLinks={navLinks} />
      
      <main className="container mx-auto px-4 md:px-6 py-12 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-['Playfair_Display'] text-[#333333] mb-4">Companhias de Rodeio</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Gerencie as companhias participantes com visual rústico e operações rápidas.</p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <input
              type="text"
              placeholder="Buscar por nome ou cidade"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C97E4B] focus:border-transparent"
            />
            <select
              value={filterUF}
              onChange={(e) => setFilterUF(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C97E4B] focus:border-transparent"
            >
              <option value="">Todos os estados</option>
              {ufs.map(uf => <option key={uf} value={uf}>{uf}</option>)}
            </select>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => { setEditing(null); setShowForm(true); }}
              className="px-6 py-3 bg-[#6D4C3D] text-white rounded-lg hover:bg-[#5a3d32] transition-colors flex items-center gap-2"
            >
              <Icon name="Plus" />
              Nova Companhia
            </motion.button>
          </div>

          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-12"
              >
                <FormCompanhia
                  initialData={editing}
                  onSubmit={editing ? handleUpdate : handleCreate}
                />
                <button
                  onClick={() => { setShowForm(false); setEditing(null); }}
                  className="mt-4 px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                >
                  Cancelar
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filtered.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <CompanhiaCard
                  cia={c.cia}
                  cidade={c.cidade}
                  uf={c.uf}
                  onEdit={() => { setEditing(c); setShowForm(true); }}
                  onDelete={() => handleDelete(c.id)}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </main>

      <Suspense fallback={<div className="flex justify-center p-8">Loading...</div>}>
        <Footer navLinks={navLinks} />
      </Suspense>
    </div>
  );
}