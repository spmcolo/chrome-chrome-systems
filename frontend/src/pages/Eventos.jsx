import React, { useState, useEffect, lazy, Suspense } from 'react';
import { faker } from '@faker-js/faker';
import * as Icons from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import EventoTable from '../components/EventoTable';
import EventoNotaCanvas from '../components/EventoNotaCanvas';

const Footer = lazy(() => import('../components/Footer'));

const fake = {
  uuid: () => faker.string?.uuid?.() || Math.random().toString(36).slice(2),
  fullName: () => faker.person?.fullName?.() || 'João Silva',
  city: () => faker.location?.city?.() || 'Barretos',
  animalName: () => faker.animal?.type?.() || 'Trovão',
  company: () => faker.company?.name?.() || 'Cia Rodeio Brasil',
  float: (min, max) => parseFloat((Math.random() * (max - min) + min).toFixed(2)),
  recentDate: () => faker.date?.recent?.()?.toISOString?.() || new Date().toISOString(),
  avatar: () => 'https://placehold.co/150x150/e2e8f0/64748b?text=Atleta'
};

const generateMockEventos = (count = 12) => {
  return Array.from({ length: count }, () => ({
    id: fake.uuid(),
    atleta: fake.fullName(),
    atleta_cidade: fake.city(),
    atleta_foto_url: fake.avatar(),
    animal: `${fake.animalName()} - Touro`,
    cia: fake.company(),
    nota: fake.float(70, 95),
    tempo: fake.float(6, 9),
    createdAt: fake.recentDate()
  }));
};

const Icon = ({ name, ...props }) => {
  const LucideIcon = Icons?.[name] || Icons.HelpCircle;
  return <LucideIcon {...props} />;
};

export default function Eventos() {
  const [eventos, setEventos] = useState(() => generateMockEventos(12));
  const [canvasData, setCanvasData] = useState(null);

  const navLinks = [
    { route: '/', label: 'Home' },
    { route: '/atletas', label: 'Atletas' },
    { route: '/cia', label: 'Companhias' },
    { route: '/animais', label: 'Animais' },
    { route: '/eventos', label: 'Eventos' },
    { route: '/eventos/visualizacao', label: 'Visualização' }
  ];

  const handleEditNota = (id, novaNota) => {
    setEventos(prev => prev.map(e => e.id === id ? { ...e, nota: novaNota } : e));
  };

  const handleEditTempo = (id, novoTempo) => {
    setEventos(prev => prev.map(e => e.id === id ? { ...e, tempo: novoTempo } : e));
  };

  const handleDelete = (id) => {
    setEventos(prev => prev.filter(e => e.id !== id));
  };

  const handleDownloadImagem = (id) => {
    const evento = eventos.find(e => e.id === id);
    if (evento) {
      setCanvasData({
        foto_url: evento.atleta_foto_url,
        nome: evento.atleta,
        cidade: evento.atleta_cidade,
        animal_nome: evento.animal,
        nota: evento.nota
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F8F6] font-['Montserrat']">
      <Header navLinks={navLinks} />
      
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 md:px-6 py-12 md:py-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-['Playfair_Display'] text-[#333333] mb-6">
            Eventos de Rodeio
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Gerencie todas as competições, inscreva atletas, registre notas e tempos, e gere imagens personalizadas para divulgação.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <h2 className="text-3xl font-['Playfair_Display'] text-[#333333]">
              Tabela de Eventos
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setEventos(prev => [generateMockEventos(1)[0], ...prev])}
              className="px-6 py-3 bg-[#6D4C3D] text-white rounded-lg hover:bg-[#5A3D30] shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
            >
              <Icon name="Plus" size={20} />
              Novo Evento
            </motion.button>
          </div>

          <EventoTable
            eventos={eventos}
            onEditNota={handleEditNota}
            onEditTempo={handleEditTempo}
            onDelete={handleDelete}
            onDownloadImagem={handleDownloadImagem}
          />
        </motion.div>

        {canvasData && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-['Playfair_Display'] text-[#333333] mb-8 text-center">
              Imagem Gerada
            </h2>
            <EventoNotaCanvas {...canvasData} />
          </motion.div>
        )}
      </motion.main>

      <Suspense fallback={<div className="py-8" />}>
        <Footer footerLinks={navLinks} />
      </Suspense>
    </div>
  );
}