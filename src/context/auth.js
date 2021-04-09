import { useState, useEffect, createContext } from 'react';
import { toast } from 'react-toastify';
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

    async function signIn(email, password) {
        setLoadingAuth(true);

        await firebase.auth().signInWithEmailAndPassword(email, password)
            .then(async (value) => {
                let uid = value.user.uid;

                const userProfile = await firebase.firestore().collection('users')
                    .doc(uid).get();
                
                let data = {
                    uid: uid,
                    nome: userProfile.nome,
                    avatarUrl: userProfile.avatarUrl,
                    email: value.user.email
                };

                setUser(data);
                storageUser(data);
                setLoadingAuth(false);
                toast.success('Bem vindo de volta!');
            })
            .catch((error) => {
                console.log(error);
                toast.error('Ops, algo deu errado');
                setLoadingAuth(false);
            });
    }

    async function signUp(email, password, nome) {
        setLoadingAuth(true);
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(async (value) => {
            let uid = value.user.id;

            await firebase.firestore().collection('users')
            .doc(uid).set({
                nome: nome,
                avatarUrl: null,
            })
            .then(() => {
                let data = {
                    uid: uid,
                    nome: nome,
                    email: value.user.email,
                    avatarUrl: null
                };

                setUser(data);
                storageUser(data);
                setLoadingAuth(false);

                toast.success('Bem vindo a plataforma');
            });
        })
        .catch((error) => {
            console.log(error);
            toast.error('Ops, algo deu errado');
            setLoadingAuth(false);
        })
    }

    async function signOut() {
        await firebase.auth().signOut();
        localStorage.removeItem('SistemaUser');
        setUser(null);
    }

    function storageUser(data) {
        localStorage.setItem('SistemaUser', JSON.stringify(data));
    }

    return (
        <AuthContext.Provider 
            value={{ 
                signed: !!user, 
                user, 
                loading, 
                signIn,
                signUp,
                signOut,
                loadingAuth
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
