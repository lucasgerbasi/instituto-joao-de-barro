import { Route, Routes } from "react-router-dom";
import { Beneficiarios } from "../Screens/Beneficiarios";
import AtualizarInformacoes from "../Screens/AtualizarInformacoes";
import Registro from "../Screens/RegistroBeneficiario";
import AtualizarInformacoesVisitas from "../Screens/atualizarInformacoesVisitas";
import RegistroVisita from "../Screens/RegistroVisita";
import DashboardPage from "../Screens/Dashboard";
import VisualizarInfo from "../Screens/VisualizarInfo";

export function PrivateRoutes() {
    return (
        <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/beneficiarios" element={<Beneficiarios />} />
            <Route path="/atualizar/:familiaId" element={<AtualizarInformacoes />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/visitas/:id" element={<AtualizarInformacoesVisitas />} /> 
            <Route path="/registroVisita" element={<RegistroVisita />} />
            <Route path="/visualizar" element={<VisualizarInfo />} />
        </Routes>
    );
}