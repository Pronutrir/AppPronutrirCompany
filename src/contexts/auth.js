import React, { useEffect, createContext, useState, useReducer } from 'react';
import { credenciais_Mobile } from '../credenciais';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Api from '../services/api';
import { initialState, UserReducer } from '../reducers/UserReducer';
import { getUserTasy, deleteUserTasy } from '../utils';

const AuthContext = createContext({ signed: false });

export const AuthProvider = ({ children }) => {

    const [stateAuth, dispatchAuth] = useReducer(UserReducer, initialState);

    const [usuario, setUsuario] = useState({
        email: '',
        uid: ''
    });

    const [token, setToken] = useState();

    const [loading, setLoading] = useState(true);

    //consulta e retorna o token para acesso a api tasy
    const GetAuth = async () => {
        return Api.post('Auth/login', credenciais_Mobile).then(response => {
            const { token } = response.data;
            console.log(token)
            Api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            return token;
        }).catch(error => {
            console.log(error)
        })
    }

    //consulta e retorna o usuário da api tasy
    const ConsultaCpfTasy = async (cpf) => {
        return Api.get(`PessoaFisica/buscaCpfEmail?cpf=${cpf}`
        ).then(response => {
            const { result } = response.data;
            if (result) {
                return result;
            } else {
                return null;
            }
        })
    }

    const consultaFirebase = async (token) => {

        const usersRef = firestore().collection('users');
        let dados = null;

        const cpfExiste = await usersRef.where('token', '==', token).get();

        if (cpfExiste.size !== 0) {
            cpfExiste.docs.forEach(item => {
                dados = item.data();
            })
            return dados;
        } else {
            return null;
        }
    }

    // metodo principal de validacão de acesso!
    const singIn = async (user) => {
        setTimeout(async ()  => {
            try {
                if (user) {

                    const { email, uid } = user;

                    //armazena os dados da api Firebase
                    dispatchAuth({ type: 'setUser', usuario: { email: email, uid: uid } })

                    //pega os dados atualizados do firestone
                    const getFireStone = await consultaFirebase(uid);

                    // armazena || atualiza os dados do usuário do tasy
                    const result = await ConsultaCpfTasy(getFireStone.cpf);
                    if (result) {
                        //informa que há usuário logado
                        setUsuario({ email, uid });
                        setLoading(false);
                        dispatchAuth({ type: 'setUserTasy', usertasy: result })
                    }

                } else {
                    deleteUserTasy();
                    setLoading(false)
                    setUsuario({ email: undefined })
                }
            } catch (error) {
                setLoading(false)
                console.log(error);
            }
        }, 3000);
    }

    useEffect(() => {
        (async () => {
            const token = await GetAuth();
            if (token) {
                const subscribe = auth().onAuthStateChanged(singIn);
            }
            return () => {
        
            }
        })()
    }, [])

    return (
        <AuthContext.Provider value={{ signed: Boolean(usuario.email), loading, token, stateAuth, dispatchAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
