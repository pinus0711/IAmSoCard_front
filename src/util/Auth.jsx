import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);
export const BASE_URL = import.meta.env.VITE_BASE_URL;

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        setIsLoggedIn(!!token);
    }, []);

    const login = (token) => {
        localStorage.setItem("accessToken", token);
        setIsLoggedIn(true);
        navigate("/");
    };

    const logout = () => {
        axios.post(BASE_URL + "/logout", localStorage.getItem("username"),
            {
                headers: {
                    'Authorization': localStorage.getItem("accessToken")
                }
            }).then(res => {
                localStorage.clear();
            })

        setIsLoggedIn(false);
        navigate("/");

    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);