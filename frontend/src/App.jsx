import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Atletas from './pages/Atletas';
import CompanhiaDeRodeio from './pages/CompanhiaDeRodeio';
import CadastroDeAnimais from './pages/CadastroDeAnimais';
import Eventos from './pages/Eventos';
import VisualizacaoEventos from './pages/VisualizacaoEventos';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/atletas" element={<Atletas />} />
        <Route path="/cia" element={<CompanhiaDeRodeio />} />
        <Route path="/animais" element={<CadastroDeAnimais />} />
        <Route path="/eventos" element={<Eventos />} />
        <Route path="/eventos/visualizacao" element={<VisualizacaoEventos />} />
      </Routes>
  );
}

export default App;
