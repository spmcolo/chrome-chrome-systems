import React from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { motion } from 'framer-motion';

const Icon = ({ name, ...props }) => {
  const LucideIcon = Icons?.[name] || Icons.HelpCircle;
  return <LucideIcon {...props} />;
};

export default function Footer({ footerLinks = [] }) {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      viewport={{ once: true }}
      className="bg-[#6D4C3D] text-[#F5E6DC]"
    >
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div className="md:col-span-1">
            <Link
              to="/"
              className="inline-block text-2xl font-['Playfair_Display'] font-bold tracking-tight text-white mb-4"
            >
              rodeo-scoreboard-network
            </Link>
            <p className="font-['Montserrat'] text-sm text-[#F5E6DC] opacity-90 max-w-xs">
              Gestão completa de atletas, animais, companhias e eventos de rodeio com geração automática de imagens para divulgação.
            </p>
          </div>

          <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-['Playfair_Display'] text-lg font-semibold text-white mb-4">
                Navegação
              </h3>
              <ul className="space-y-2">
                {footerLinks.map((link) => (
                  <li key={link.route}>
                    <Link
                      to={link.route}
                      className="font-['Montserrat'] text-sm text-[#F5E6DC] hover:text-white transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-['Playfair_Display'] text-lg font-semibold text-white mb-4">
                Contato
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Icon name="Mail" className="w-4 h-4 text-[#C97E4B]" />
                  <span className="font-['Montserrat'] text-sm text-[#F5E6DC]">contato@rodeoscore.com</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Phone" className="w-4 h-4 text-[#C97E4B]" />
                  <span className="font-['Montserrat'] text-sm text-[#F5E6DC]">+55 67 9 9999-9999</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="MapPin" className="w-4 h-4 text-[#C97E4B]" />
                  <span className="font-['Montserrat'] text-sm text-[#F5E6DC]">Campo Grande, MS</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-['Playfair_Display'] text-lg font-semibold text-white mb-4">
                Redes Sociais
              </h3>
              <div className="flex gap-3">
                <motion.a
                  href="#"
                  aria-label="Facebook"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-lg bg-[#C97E4B] text-white flex items-center justify-center shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <Icon name="Facebook" className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="#"
                  aria-label="Instagram"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-lg bg-[#C97E4B] text-white flex items-center justify-center shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <Icon name="Instagram" className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="#"
                  aria-label="YouTube"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-lg bg-[#C97E4B] text-white flex items-center justify-center shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <Icon name="Youtube" className="w-5 h-5" />
                </motion.a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#C97E4B] border-opacity-30">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-['Montserrat'] text-xs text-[#F5E6DC] opacity-80">
              © {currentYear} rodeo-scoreboard-network. Todos os direitos reservados.
            </p>
            <div className="flex gap-6">
              <Link
                to="/privacidade"
                className="font-['Montserrat'] text-xs text-[#F5E6DC] hover:text-white transition-colors duration-300"
              >
                Política de Privacidade
              </Link>
              <Link
                to="/termos"
                className="font-['Montserrat'] text-xs text-[#F5E6DC] hover:text-white transition-colors duration-300"
              >
                Termos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}