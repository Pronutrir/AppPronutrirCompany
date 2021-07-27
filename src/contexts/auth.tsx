import React, { useEffect, createContext, useState, useReducer } from 'react';
import { credenciais_Mobile } from '../credenciais';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Api from '../services/api';
import { initialState, UserReducer, UserTasy, UsuarioFirebase, LoginState, LoginAction } from '../reducers/UserReducer';
import { getUserTasy, deleteUserTasy } from '../utils';

interface AuthContextData {
    signed: boolean;
    stateAuth: LoginState;
    dispatchAuth: React.Dispatch<LoginAction>;
    loading: boolean;
}

interface IFirebaseLogin {
    email: string;
    uid: string;
}

interface IFirestone {
    cpf: string;
    email: string;
    nM_USUARIO: string;
    nome: string;
    token: string;
}

const AuthContext = createContext({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {

    const [stateAuth, dispatchAuth] = useReducer(UserReducer, initialState);
    const [usuario, setUsuario] = useState<IFirebaseLogin | null>(null);

    const [token, setToken] = useState();

    const [loading, setLoading] = useState(true);

    //consulta e retorna o token para acesso a api tasy
    const GetAuth = async () => {
        return Api.post('Auth/login', credenciais_Mobile).then(response => {
            const { token } = response.data;
            Api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            return token;
        }).catch(error => {
        })
    }

    //consulta e retorna o usuário da api tasy
    const ConsultaCpfTasy = async (cpf: string) => {
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

    const consultaFirebase = async (token: string): Promise<IFirestone | null> => {

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
    const singIn = async (user: any) => {
        setTimeout(async () => {
            try {
                if (user) {

                    const { email, uid }: IFirebaseLogin = user;

                    //armazena os dados da api Firebase
                    dispatchAuth({ type: 'setUser', payload: { email: email, token: uid } })

                    //pega os dados atualizados do firestone
                    const getFireStone = await consultaFirebase(uid);

                    if (getFireStone != null) {
                        // armazena || atualiza os dados do usuário do tasy
                        const result: UserTasy = await ConsultaCpfTasy(getFireStone?.cpf);
                        if (result) {
                            //informa que há usuário logado
                            setUsuario({ email, uid });
                            setLoading(false);
                            dispatchAuth({ type: 'setUserTasy', payload: result })
                        }
                    }
                } else {
                    deleteUserTasy();
                    setLoading(false)
                    setUsuario(null)
                }
            } catch (error) {
                setLoading(false)
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
        <AuthContext.Provider value={{ signed: Boolean(usuario), loading, stateAuth, dispatchAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
