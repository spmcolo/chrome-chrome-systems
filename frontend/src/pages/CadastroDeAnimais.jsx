import { lazy, Suspense, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { faker } from '@faker-js/faker';
import * as Icons from 'lucide-react';
import Header from '../components/Header';
import AnimalCard from '../components/AnimalCard';
import FormAnimal from '../components/FormAnimal';

const Icon = ({ name, ...props }) => {
  const LucideIcon = Icons?.[name] || Icons.HelpCircle;
  return <LucideIcon {...props} />;
};

const fake = {
  uuid: () => faker.string?.uuid?.() || Math.random().toString(36).slice(2),
  animalName: () => faker.person?.firstName?.() || 'Trovão',
  companyName: () => faker.company?.name?.() || 'Cia Rodeio Brasil',
  city: () => faker.location?.city?.() || 'Barretos',
  state: () => faker.location?.state?.({ abbreviated: true }) || 'SP',
  int: (opts) => faker.number?.int?.(opts) || 5
};

const generateMockAnimais = (count = 12) => {
  const tipos = ['Cavalo', 'Touro'];
  return Array.from({ length: count }, () => ({
    id: fake.uuid(),
    nome: fake.animalName(),
    tipo: tipos[fake.int({ min: 0, max: 1 })],
    cia_id: fake.int({ min: 1, max: 3 }),
    cia: fake.companyName()
  }));
};

const generateMockCompanhias = (count = 3) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    nome: fake.companyName(),
    cidade: fake.city(),
    estado: fake.state()
  }));
};

const Footer = lazy(() => import('../components/Footer'));

export default function CadastroDeAnimais() {
  const [animais, setAnimais] = useState(() => generateMockAnimais());
  const [companhias] = useState(() => generateMockCompanhias());
  const [filterTipo, setFilterTipo] = useState('');
  const [filterCia, setFilterCia] = useState('');
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

  const filtered = animais.filter(a => {
    const matchTipo = !filterTipo || a.tipo === filterTipo;
    const matchCia = !filterCia || a.cia_id === Number(filterCia);
    return matchTipo && matchCia;
  });

  const handleCreate = (data) => {
    const nova = {
      id: fake.uuid(),
      nome: data.nome,
      tipo: data.tipo,
      cia_id: Number(data.companhiaId),
      cia: companhias.find(c => c.id === Number(data.companhiaId))?.nome || ''
    };
    setAnimais(prev => [nova, ...prev]);
    setShowForm(false);
  };

  const handleUpdate = (data) => {
    setAnimais(prev => prev.map(a => a.id === editing.id ? {
      ...a,
      nome: data.nome,
      tipo: data.tipo,
      cia_id: Number(data.companhiaId),
      cia: companhias.find(c => c.id === Number(data.companhiaId))?.nome || ''
    } : a));
    setEditing(null);
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setAnimais(prev => prev.filter(a => a.id !== id));
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
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <div>
              <h1 className="font-['Playfair_Display'] text-4xl md:text-6xl text-[#333333]">Animais</h1>
              <p className="text-[#C97E4B] mt-2">Gerencie o cadastro completo dos animais participantes</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => { setShowForm(true); setEditing(null); }}
              className="bg-[#6D4C3D] text-white px-6 py-3 rounded-lg hover:bg-[#5a3d32] transition-all duration-300 flex items-center gap-2 shadow-lg"
            >
              <Icon name="Plus" size={20} />
              Novo Animal
            </motion.button>
          </div>

          <div className="flex flex-wrap gap-4 mb-8">
            <select
              value={filterTipo}
              onChange={e => setFilterTipo(e.target.value)}
              className="px-4 py-2 border border-[#C97E4B]/30 rounded-lg bg-white text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#C97E4B]"
            >
              <option value="">Todos os Tipos</option>
              <option value="Cavalo">Cavalo</option>
              <option value="Touro">Touro</option>
            </select>
            <select
              value={filterCia}
              onChange={e => setFilterCia(e.target.value)}
              className="px-4 py-2 border border-[#C97E4B]/30 rounded-lg bg-white text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#C97E4B]"
            >
              <option value="">Todas as Companhias</option>
              {companhias.map(c => (
                <option key={c.id} value={c.id}>{c.nome}</option>
              ))}
            </select>
          </div>

          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <FormAnimal
                initialData={editing}
                onSubmit={editing ? handleUpdate : handleCreate}
                companhias={companhias}
              />
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filtered.map((animal, idx) => (
              <motion.div
                key={animal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
              >
                <AnimalCard
                  nome={animal.nome}
                  tipo={animal.tipo}
                  cia={animal.cia}
                  onEdit={() => { setEditing(animal); setShowForm(true); }}
                  onDelete={() => handleDelete(animal.id)}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </main>

      <Suspense fallback={<div className="h-32" />}>
        <Footer />
      </Suspense>
    </div>
  );
}