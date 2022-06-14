import React, {
    useEffect,
    createContext,
    useState,
    useReducer,
    useCallback,
} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Api from '../services/api';
import {
    initialState,
    UserReducer,
    UserTasy,
    LoginState,
    LoginAction,
} from '../reducers/UserReducer';
import OneSignal from 'react-native-onesignal';
import { useQuery, useQueryClient, UseQueryResult } from 'react-query';
import { getPerfil, getUnidade, saveRefreshToken } from '../utils';
import ApiAuth from '../services/apiAuth';
interface AuthContextData {
    signed: boolean;
    stateAuth: LoginState;
    dispatchAuth: React.Dispatch<LoginAction>;
    loading: boolean;
    getPerfis(nomeUsuario: string): UseQueryResult<IPerfis[], Error>;
    ValidationAutorizeEvolucao: () => boolean;
    useGetFetchQuery<T extends Record<keyof T, unknown>>(key: string): T | undefined;
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
interface ReponsePerfis {
    result: IPerfis[];
}
interface IPerfis {
    cD_PESSOA_FISICA: string;
    nM_USUARIO: string;
    cD_PERFIL: number;
    dS_PERFIL: string;
    dT_ATUALIZACAO: string;
    nM_USUARIO_ATUAL: string;
    dT_LIBERACAO: string;
    nR_SEQUENCIA: number;
    dS_UTC_ATUALIZACAO: string;
    dS_UTC: string;
    iE_HORARIO_VERAO: string;
}
export interface IPerfisLiberados {
    cD_PERFIL: number;
    dS_PERFIL: string;
}

interface TokenResponse {
    id: number;
    username: string;
    dataRegistro: string;
    dataAtualizacao: string;
    dataHoraValidado: string;
    dataExpira: string;
    ativo: true;
    jwtToken: string;
    integraApi: boolean;
    refreshToken: string;
}

const AuthContext = createContext({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
    const [stateAuth, dispatchAuth] = useReducer(UserReducer, initialState);
    const [usuario, setUsuario] = useState<IFirebaseLogin | null>(null);
    const queryClient = useQueryClient();
    const [loading, setLoading] = useState(true);

    const useGetFetchQuery = <T extends Record<keyof T, unknown>>(key: string): T | undefined => {
        return queryClient.getQueryData<T>(key);
    };

    //consulta e retorna o token para acesso a api tasy
    const GetAuth = useCallback(async () => {
        return ApiAuth.get<TokenResponse>('auth').then((response) => {
            const { jwtToken, refreshToken } = response.data;
            Api.defaults.headers.common.Authorization = `Bearer ${jwtToken}`;
            saveRefreshToken(refreshToken);
            return jwtToken;
        }).catch((error) => {
            console.log('Error token', error);
        });
    }, []);

    //consulta e retorna o usuário da api tasy
    const ConsultaCpfTasy = async (cpf: string) => {
        return Api.get(`PessoaFisica/buscaCpfEmail?cpf=${cpf}`).then(
            (response) => {
                const { result } = response.data;
                if (result) {
                    dispatchAuth({
                        type: 'setUserTasy',
                        payload: result,
                    });
                    return result;
                } else {
                    return null;
                }
            },
        );
    };

    const consultaFirebase = async (
        token: string,
    ): Promise<IFirestone | null> => {
        const usersRef = firestore().collection('users');
        let dados = null;

        const cpfExiste = await usersRef.where('token', '==', token).get();

        if (cpfExiste.size !== 0) {
            cpfExiste.docs.forEach((item) => {
                dados = item.data();
            });
            return dados;
        } else {
            return null;
        }
    };

    const getPerfilUnidadeUser = async (cD_PESSOA_FISICA: string) => {
        const resultUnidade = await getUnidade();
        const resultPerfil = await getPerfil();
        if (resultPerfil?.cD_PESSOA_FISICA === cD_PESSOA_FISICA) {
            dispatchAuth({ type: 'setUnidade', payload: resultUnidade });
            dispatchAuth({ type: 'setPerfilApp', payload: resultPerfil });
        } else {
            dispatchAuth({ type: 'setUnidade', payload: null });
            dispatchAuth({ type: 'setPerfilApp', payload: null });
        }
    };

    // metodo principal de validacão de acesso!
    const singIn = useCallback(async (user: any) => {
        setTimeout(async () => {
            try {
                if (user) {
                    const { email, uid }: IFirebaseLogin = user;

                    //armazena os dados da api Firebase
                    dispatchAuth({
                        type: 'setUser',
                        payload: { email: email, token: uid },
                    });

                    //pega os dados atualizados do firestone
                    const getFireStone = await consultaFirebase(uid);

                    if (getFireStone != null) {
                        // armazena || atualiza os dados do usuário do tasy
                        const result: UserTasy = await ConsultaCpfTasy(
                            getFireStone?.cpf,
                        );

                        //verificar perfil usuário cache
                        await getPerfilUnidadeUser(result.cD_PESSOA_FISICA);

                        if (result) {
                            //informa que há usuário logado
                            setUsuario({ email, uid });
                            setLoading(false);
                        }
                        //registra o dispositivo no onesignal inclui um id externo para notificações!
                        OneSignal.setExternalUserId(result.cD_PESSOA_FISICA);
                        //Adiciona uma tag para diferenciar as aplicações mobile
                        OneSignal.sendTag('NameApp', 'pronutrirCompany');
                    }
                } else {
                    setLoading(false);
                    setUsuario(null);
                }
            } catch (error) {
                setLoading(false);
            }
        }, 3000);
    }, []);

    const getPerfis = () => {
        return useQuery<IPerfis[], Error>('perfis', async () => {
            const {
                data: { result },
            } = await Api.get<ReponsePerfis>(
                `UsuarioPerfil/FiltrarUsuarioPerfisCodUsuarioNumSeqGeral?nomeUsuario=${stateAuth.usertasy.usuariO_FUNCIONARIO_PERFIL[0].nM_USUARIO}&pagina=1`,
            );
            return result;
        });
    };

    const getPerfilAutorizeEvolucao = async () => {
        const useRef = firestore()
            .doc('FunctionsApp/Evolucao')
            .collection('Perfis');

        const resultPerfis: IPerfisLiberados[] = [];

        await useRef.get().then((querySnapshot) => {
            return querySnapshot.forEach((item) => {
                resultPerfis.push({
                    cD_PERFIL: item.get('cD_PERFIL'),
                    dS_PERFIL: item.get('dS_PERFIL'),
                });
            });
        });

        return resultPerfis;
    };

    const { data: PerfisEvolucao } = useQuery(
        'PerfisEvolucao',
        getPerfilAutorizeEvolucao,
    );

    const ValidationAutorizeEvolucao = useCallback(() => {
        const result = PerfisEvolucao?.some((element: IPerfisLiberados) => {
            return element.cD_PERFIL === stateAuth.PerfilSelected?.cD_PERFIL;
        });
        if (result) {
            return result;
        } else {
            return false;
        }
    }, [PerfisEvolucao, stateAuth.PerfilSelected]);

    useEffect(() => {
        (async () => {
            const token = await GetAuth();
            if (token) {
                auth().onAuthStateChanged(singIn);
            }
        })();
    }, [singIn]);

    return (
        <AuthContext.Provider
            value={{
                signed: Boolean(usuario),
                loading,
                stateAuth,
                dispatchAuth,
                getPerfis,
                ValidationAutorizeEvolucao,
                useGetFetchQuery,
            }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
