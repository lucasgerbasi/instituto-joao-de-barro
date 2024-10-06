import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { api } from '../api';
import { User } from '../@types';

interface AuthContextType {
    user: User | null;
    login: (request: LoginRequest) => Promise<LoginResponse>;
    logout: () => void;
    verifyLogin: () => LoginResponse;
    navigate: (path: string) => void;
}

interface LoginRequest {
    email: string;
    password: string;
}

interface LoginResponse {
    user: User | null;
    success: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const navigate = (path: string) => {
        window.location.href = path
    }
    const [user, setUser] = useState<User | null>(null);

    const login = async ({ email, password }: LoginRequest): Promise<LoginResponse> => {
        try {
            const response = await api.get('/users');
            const user = response.data.find((u: User) => u.email === email && u.password === password);
            
            if (user) {
                setUser(user);
                localStorage.setItem('user', JSON.stringify(user)); // Persist login
                user.role === 'BENEFICIARIO' ? navigate('/dashboard/visualizar') : ('/dashboard')
                return { user, success: true };
            } else {
                return { user: null, success: false };
            }
        } catch (error) {
            console.error('Login error:', error);
            return { user: null, success: false };
        }
        
    }
    
    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');  // Remover o usuário do localStorage
        navigate('/login');
    }
    

    const verifyLogin = (): LoginResponse => {
        return { user, success: !!user };
    }

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, verifyLogin, navigate }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};