import { lazy, Suspense, useState, useEffect } from 'react';
import { faker } from '@faker-js/faker';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import Header from '../components/Header';
import EventoTable from '../components/EventoTable';
import EventoNotaCanvas from '../components/EventoNotaCanvas';

const fake = {
  uuid: () => faker.string?.uuid?.() || Math.random().toString(36).slice(2),
  fullName: () => faker.person?.fullName?.() || 'João Silva',
  city: () => faker.location?.city?.() || 'Barretos',
  animalName: () => faker.animal?.type?.()?.split(',')[0] || 'Trovão',
  companyName: () => faker.company?.name?.() || 'Cia Rodeio Brasil',
  float: (min, max) => parseFloat((Math.random() * (max - min) + min).toFixed(2)),
  avatar: () => 'https://placehold.co/150x150/e2e8f0/64748b?text=User'
};

const generateMockEventos = (count = 15) => {
  return Array.from({ length: count }, () => ({
    id: fake.uuid(),
    atleta: fake.fullName(),
    atleta_cidade: fake.city(),
    atleta_foto_url: fake.avatar(),
    animal: fake.animalName(),
    animal_tipo: 'Touro',
    cia: fake.companyName(),
    nota: fake.float(0, 100),
    tempo: fake.float(0, 10)
  }));
};

const Footer = lazy(() => import('../components/Footer'));

const Icon = ({ name, ...props }) => {
  const LucideIcon = Icons?.[name] || Icons.HelpCircle;
  return <LucideIcon {...props} />;
};

export default function VisualizacaoEventos() {
  const [eventos, setEventos] = useState(() => generateMockEventos());
  const [showCanvas, setShowCanvas] = useState(false);
  const [canvasData, setCanvasData] = useState(null);

  const navLinks = [
    { route: '/', label: 'Home' },
    { route: '/atletas', label: 'Atletas' },
    { route: '/cia', label: 'Companhias' },
    { route: '/animais', label: 'Animais' },
    { route: '/eventos', label: 'Eventos' },
    { route: '/eventos/visualizacao', label: 'Visualização' }
  ];

  const handleEditNota = (id, nota) => {
    setEventos(prev => prev.map(e => e.id === id ? { ...e, nota } : e));
    const evento = eventos.find(e => e.id === id);
    if (evento) {
      setCanvasData({
        foto_url: evento.atleta_foto_url,
        nome: evento.atleta,
        cidade: evento.atleta_cidade,
        animal_nome: evento.animal,
        nota
      });
      setShowCanvas(true);
    }
  };

  const handleEditTempo = (id, tempo) => {
    setEventos(prev => prev.map(e => e.id === id ? { ...e, tempo } : e));
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
      setShowCanvas(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F8F6] font-['Montserrat']">
      <Header navLinks={navLinks} />
      <main className="container mx-auto px-4 md:px-6 py-12 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-['Playfair_Display'] text-[#333333] mb-4">Visualização de Eventos</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Interface rápida para registro e acompanhamento de notas e tempos durante o rodeio.</p>
          </div>

          <EventoTable
            eventos={eventos}
            onEditNota={handleEditNota}
            onEditTempo={handleEditTempo}
            onDelete={handleDelete}
            onDownloadImagem={handleDownloadImagem}
          />

          {showCanvas && canvasData && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
              onClick={() => setShowCanvas(false)}
            >
              <motion.div
                className="relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setShowCanvas(false)}
                  className="absolute -top-3 -right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors"
                >
                  <Icon name="X" size={16} className="text-gray-700" />
                </button>
                <EventoNotaCanvas {...canvasData} />
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </main>
      <Suspense fallback={<div className="flex justify-center p-8">Loading...</div>}>
        <Footer footerLinks={navLinks} />
      </Suspense>
    </div>
  );
}