import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./Screens/LandingPage";
import { Login } from "./Screens/Login";
import Dashboard from "./Screens/Dashboard";
import { Contact } from "./Screens/Contact";
import { About } from "./Screens/About";
import { Voluntarios } from "./Screens/Voluntarios";
import { Beneficiarios } from "./Screens/Beneficiarios";
import { Main } from "./components/Main";
import AtualizarInformacoes from "./Screens/AtualizarInformacoes";
import Registro from "./Screens/RegistroBeneficiario";
import AtualizarInformacoesVisitas from "./Screens/atualizarInformacoesVisitas";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />}>
          <Route index element={<Main />} />
          <Route path="contatos" element={<Contact />} />
          <Route path="sobre" element={<About />} />
          <Route path="voluntarios" element={<Voluntarios />} />
          <Route path="beneficiarios" element={<Beneficiarios />} />
          <Route path="/atualizar" element={<AtualizarInformacoes />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/visitas" element={<AtualizarInformacoesVisitas />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
