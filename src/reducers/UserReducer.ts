export const initialState: LoginState = {
    Usuario: {
        email: '',
        token: '',
    },
    usertasy: {
        cD_PESSOA_FISICA: '', //159969
        dT_ATUALIZACAO: '', //2020-09-23T13:24:42
        dT_NASCIMENTO: '', //1985-08-19T00:00:00
        iE_FUNCIONARIO: 'N',
        iE_TIPO_PESSOA: 1, //1
        nM_PESSOA_FISICA: '', //WILLIAME CORREIA DE LIMA
        nM_USUARIO: 'AppMobile', //CM.TECNOLOGIA
        nR_CPF: '', //67023339353
        nR_PRONTUARIO: null, //14170
        nR_DDD_CELULAR: '', //85
        nR_TELEFONE_CELULAR: '', //986849878
        dS_EMAIL: '', // williame_lima@hotmail.com
        nR_Senha: '',
        ImgPerfil: '', //base64
        usuariO_FUNCIONARIO: [],
    },
};

export interface UsuarioFirebase {
    email: string;
    token: string;
}

export interface LoginState {
    Usuario: UsuarioFirebase;
    usertasy: UserTasy;
}

export interface UserTasy {
    cD_PESSOA_FISICA: string;
    dT_ATUALIZACAO: string;
    dT_NASCIMENTO: string;
    iE_FUNCIONARIO: string;
    iE_TIPO_PESSOA: number;
    nM_PESSOA_FISICA: string;
    nM_USUARIO: string;
    nR_CPF: string;
    nR_PRONTUARIO: number | null;
    nR_DDD_CELULAR: string;
    nR_TELEFONE_CELULAR: string;
    dS_EMAIL: string;
    nR_Senha: string;
    ImgPerfil: string;
    usuariO_FUNCIONARIO: UsuarioFuncionario[];
}

export interface UsuarioFuncionario {
    nM_USUARIO: string;
    cD_SETOR_ATENDIMENTO: number;
    dS_SETOR_ATENDIMENTO: string;
    cD_ESTABELECIMENTO: number;
}

export type LoginAction =
    | {
          type:
              | 'delUser'
              | 'setToken'
              | 'UpdateUserTasyCPF'
              | 'UpdateUserTasyNome'
              | 'UpdateUserTasyDataNasc'
              | 'UpdateUserTasyDDD'
              | 'UpdateUserTasyFone'
              | 'UpdateUserTasyEmail'
              | 'UpdateSenha'
              | 'setImgPerfil';
          payload: string;
      }
    | { type: 'setUserTasy'; payload: UserTasy }
    | { type: 'setUser'; payload: UsuarioFirebase };

export const UserReducer = (
    state: LoginState,
    action: LoginAction,
): LoginState => {
    switch (action.type) {
        case 'setUser':
            return { ...state, Usuario: action.payload };

        case 'delUser':
            return {
                Usuario: {
                    email: '',
                    token: '',
                },
                usertasy: {
                    cD_PESSOA_FISICA: '',
                    dT_ATUALIZACAO: '',
                    dT_NASCIMENTO: '',
                    iE_FUNCIONARIO: 'N',
                    iE_TIPO_PESSOA: 1,
                    nM_PESSOA_FISICA: '',
                    nM_USUARIO: 'AppMobile',
                    nR_CPF: '',
                    nR_PRONTUARIO: null,
                    nR_DDD_CELULAR: '',
                    nR_TELEFONE_CELULAR: '',
                    dS_EMAIL: '',
                    nR_Senha: '',
                    ImgPerfil: '',
                    usuariO_FUNCIONARIO: [],
                },
            };

        case 'setUserTasy':
            return { ...state, usertasy: action.payload };

        case 'UpdateUserTasyCPF':
            return {
                ...state,
                usertasy: { ...state.usertasy, nR_CPF: action.payload },
            };

        case 'UpdateUserTasyNome':
            return {
                ...state,
                usertasy: {
                    ...state.usertasy,
                    nM_PESSOA_FISICA: action.payload,
                },
            };

        case 'UpdateUserTasyDataNasc':
            return {
                ...state,
                usertasy: { ...state.usertasy, dT_NASCIMENTO: action.payload },
            };

        case 'UpdateUserTasyDDD':
            return {
                ...state,
                usertasy: { ...state.usertasy, nR_DDD_CELULAR: action.payload },
            };

        case 'UpdateUserTasyFone':
            return {
                ...state,
                usertasy: {
                    ...state.usertasy,
                    nR_TELEFONE_CELULAR: action.payload,
                },
            };

        case 'UpdateUserTasyEmail':
            return {
                ...state,
                usertasy: { ...state.usertasy, dS_EMAIL: action.payload },
            };

        case 'UpdateSenha':
            return {
                ...state,
                usertasy: { ...state.usertasy, nR_Senha: action.payload },
            };

        case 'setImgPerfil':
            return {
                ...state,
                usertasy: { ...state.usertasy, ImgPerfil: action.payload },
            };

        default:
            return state;
    }
};
