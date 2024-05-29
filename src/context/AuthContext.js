import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../service/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const response = await api.get('/user/me');
                    setUser(response.data);
                }
            } catch (error) {
                console.error("Failed to load user", error);
            }
        };
        loadUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
