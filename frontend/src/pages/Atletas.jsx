import { useState, lazy, Suspense } from 'react';
import { faker } from '@faker-js/faker';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import Header from '../components/Header';
import AtletaCard from '../components/AtletaCard';
import FormAtleta from '../components/FormAtleta';

const Footer = lazy(() => import('../components/Footer'));

const fake = {
  uuid: () => faker.string?.uuid?.() || Math.random().toString(36).slice(2),
  fullName: () => faker.person?.fullName?.() || 'João Silva',
  city: () => faker.location?.city?.() || 'Barretos',
  phone: () => faker.phone?.number?.() || '+55 67 9 9999-9999',
  email: () => faker.internet?.email?.() || 'joao@example.com',
  cpf: () => faker.string?.numeric?.(11) || '12345678901',
  date: () => faker.date?.birthdate?.({ min: 18, max: 40 })?.toISOString?.()?.split('T')?.[0] || '1995-01-01',
  state: () => faker.location?.state?.()?.slice(0,2)?.toUpperCase?.() || 'SP',
  number: (min,max) => faker.number?.int?.({min,max}) || min,
  avatar: () => 'https://placehold.co/300x400/F5E6DC/6D4C3D?text=Atleta'
};

const generateAtletas = (count = 12) => Array.from({ length: count }, () => ({
  id: fake.uuid(),
  nome: fake.fullName(),
  cidade: fake.city(),
  estado: fake.state(),
  telefone: fake.phone(),
  email: fake.email(),
  cpf: fake.cpf(),
  dataNascimento: fake.date(),
  categoria: 'Montaria em Touros',
  peito: fake.number(90,110),
  cintura: fake.number(70,90),
  quadril: fake.number(90,110),
  peso: fake.number(60,85),
  altura: (fake.number(160,185)/100).toFixed(2),
  foto: fake.avatar()
}));

const navLinks = [
  { route: '/', label: 'Home' },
  { route: '/atletas', label: 'Atletas' },
  { route: '/cia', label: 'Companhias' },
  { route: '/animais', label: 'Animais' },
  { route: '/eventos', label: 'Eventos' },
  { route: '/eventos/visualizacao', label: 'Visualização' }
];

function Atletas() {
  const [atletas, setAtletas] = useState(() => generateAtletas(12));
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [page, setPage] = useState(1);
  const perPage = 6;

  const paginated = atletas.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(atletas.length / perPage);

  const handleCreate = (data) => {
    setAtletas(prev => [{ ...data, id: fake.uuid() }, ...prev]);
    setShowForm(false);
  };

  const handleUpdate = (data) => {
    setAtletas(prev => prev.map(a => a.id === editing.id ? { ...a, ...data } : a));
    setEditing(null);
  };

  const handleDelete = (id) => {
    setAtletas(prev => prev.filter(a => a.id !== id));
  };

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
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div>
              <h1 className="font-['Playfair_Display'] text-4xl md:text-6xl font-bold text-[#6D4C3D]">Atletas</h1>
              <p className="text-lg text-[#333333] mt-2">Gerencie os participantes do rodeio</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setEditing(null); setShowForm(true); }}
              className="bg-[#6D4C3D] text-white px-6 py-3 rounded-lg shadow-lg hover:bg-[#5a3d30] transition-colors duration-300 flex items-center gap-2"
            >
              <Icons.Plus className="w-5 h-5" />
              Novo Atleta
            </motion.button>
          </div>

          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              className="mb-12"
            >
              <FormAtleta
                initialData={editing}
                onSubmit={editing ? handleUpdate : handleCreate}
              />
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {paginated.map((atleta, idx) => (
              <motion.div
                key={atleta.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
              >
                <AtletaCard
                  {...atleta}
                  onEdit={() => { setEditing(atleta); setShowForm(true); }}
                  onDelete={() => handleDelete(atleta.id)}
                />
              </motion.div>
            ))}
          </motion.div>

          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex justify-center gap-2 mt-12"
            >
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-[#6D4C3D] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#5a3d30] transition-colors duration-300"
              >
                <Icons.ChevronLeft className="w-5 h-5" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setPage(i + 1)}
                  className={`px-4 py-2 rounded-lg transition-colors duration-300 ${page === i + 1 ? 'bg-[#6D4C3D] text-white' : 'bg-white text-[#6D4C3D] border border-[#6D4C3D]/30 hover:bg-[#F5E6DC]'}`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 bg-[#6D4C3D] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#5a3d30] transition-colors duration-300"
              >
                <Icons.ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </motion.div>
      </main>
      <Suspense fallback={<div className="h-40" />}>
        <Footer footerLinks={navLinks} />
      </Suspense>
    </div>
  );
}

export default Atletas;