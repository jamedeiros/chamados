import { useState, useContext, useEffect, createContext } from 'react';
import firebase from '../services/FirebaseConnection';

export const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        function loadStorage() {
            const storageUser = localStorage.getItem('SistemaUser');

            if (storageUser) {
                setUser(JSON.parse(storageUser));
            }
            setLoading(false);
        }

        loadStorage();
        // eslint-disable-next-line
    }, []);

    return (
        <AuthContext.Provider value={{ signed: !!user, user, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
