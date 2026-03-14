import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import * as Icons from "lucide-react";
import { motion } from "framer-motion";
import Header from "../components/Header";

const Icon = ({ name, ...props }) => {
  const LucideIcon = Icons?.[name] || Icons.HelpCircle;
  return <LucideIcon {...props} />;
};

const Footer = lazy(() => import("../components/Footer"));

const navLinks = [
  { route: "/", label: "Home" },
  { route: "/atletas", label: "Atletas" },
  { route: "/cia", label: "Companhias" },
  { route: "/animais", label: "Animais" },
  { route: "/eventos", label: "Eventos" },
  { route: "/eventos/visualizacao", label: "Visualização" }
];

const features = [
  { icon: "Users", title: "Gestão de Atletas", desc: "Cadastro completo com histórico de participações", href: "/atletas" },
  { icon: "Building", title: "Companhias", desc: "Administração de companhias de rodeio", href: "/cia" },
  { icon: "Horse", title: "Animais", desc: "Controle de animais participantes", href: "/animais" },
  { icon: "Trophy", title: "Eventos", desc: "Organização e registro de competições", href: "/eventos" },
  { icon: "Camera", title: "Imagens", desc: "Geração automática de imagens para divulgação", href: "/eventos/visualizacao" }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F9F8F6] font-['Montserrat']">
      <Header navLinks={navLinks} />
      
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="relative h-[70vh] flex items-center justify-center overflow-hidden"
        style={{ backgroundImage: "url(https://images.pexels.com/photos/33251/rodeo-horse-white-horse-action-shot.jpg)", backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#6D4C3D]/60 to-[#6D4C3D]/80" />
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1 
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-['Playfair_Display'] text-5xl md:text-8xl font-bold tracking-tight mb-6"
          >
            Gestão de Rodeio
          </motion.h1>
          <motion.p 
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed"
          >
            Sistema completo para administração de atletas, animais, companhias e eventos de rodeio
          </motion.p>
          <motion.div 
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-10"
          >
            <Link 
              to="/eventos"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#C97E4B] text-white font-semibold rounded-lg shadow-lg hover:bg-[#b3693f] hover:scale-105 transition-all duration-300"
            >
              <Icon name="ArrowRight" size={20} />
              Explorar Sistema
            </Link>
          </motion.div>
        </div>
      </motion.section>

      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-20"
          >
            <h2 className="font-['Playfair_Display'] text-4xl md:text-6xl text-[#333333] mb-6">
              Sistema Completo
            </h2>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              Desde o cadastro de atletas até a geração automática de imagens para divulgação, 
              nossa plataforma oferece todas as ferramentas necessárias para gerenciar rodeios profissionais.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((item, idx) => (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-lg shadow-[0_8px_32px_rgba(0,0,0,0.06)] p-8 text-center group"
              >
                <div className="w-20 h-20 bg-[#6D4C3D] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#C97E4B] transition-colors duration-300">
                  <Icon name={item.icon} size={32} className="text-white" />
                </div>
                <h3 className="font-['Playfair_Display'] text-2xl text-[#333333] mb-3">{item.title}</h3>
                <p className="text-gray-600 mb-6">{item.desc}</p>
                <Link 
                  to={item.href}
                  className="inline-flex items-center gap-2 text-[#6D4C3D] font-medium hover:text-[#C97E4B] transition-colors duration-300"
                >
                  Acessar
                  <Icon name="ArrowRight" size={16} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="flex justify-center p-8">Loading...</div>}>
        <Footer footerLinks={navLinks} />
      </Suspense>
    </div>
  );
}