import { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    Outlet
} from "react-router-dom";
import { PublicRoutes } from "./routes/publicRoutes";
import VisualizarInfo from "./Screens/VisualizarInfo";
import LandingPage from "./Screens/LandingPage";
import { PrivateRoutes } from "./routes/privateRoutes";
import { useAuth } from "./contexts/loginContext";

interface ProtectedRouteProps {
    allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
    const { user } = useAuth(); // Pega o user do contexto de autenticação

    if (!user) {
        // Se não há usuário logado, redireciona para a página de login
        return <Navigate to="/login" />;
    }

    if (!allowedRoles.includes(user.role)) {
        // Se o usuário não tem a role permitida, redireciona para uma página não autorizada
        return <Navigate to="/" />;
    }

    // Caso tudo esteja certo, renderiza a rota privada
    return <Outlet />;
};

const App: React.FC = () => {
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (user !== undefined) {
            setIsLoading(false); // Quando o usuário for definido, interrompe o carregamento
        }
    }, [user]);

    if (isLoading) {
        return <div>Loading...</div>; // Carregamento até que o usuário seja verificado
    }

    return (
        <Router>
            <Routes>
                <Route path="/*" element={<PublicRoutes />} />
                <Route path="/unauthorized" element={<LandingPage />} />
                <Route element={<ProtectedRoute allowedRoles={['ADMIN', 'VOLUNTARIO']} />}>
                    <Route path="/dashboard/*" element={<PrivateRoutes />} />
                </Route>
                <Route element={<ProtectedRoute allowedRoles={['BENEFICIARIO']} />}>
                    <Route path="/dashboard/visualizar" element={<VisualizarInfo />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
