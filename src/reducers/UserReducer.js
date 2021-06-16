export const initialState = {
    token: null,
    usuario: null,
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
        ImgPerfil: '' //base64
    }
};

export const UserReducer = (state, action) => {
    switch (action.type) {
        case 'setUser':
            return { ...state, usuario: action.usuario };
            break;
        case 'delUser':
            return {
                token: null,
                usuario: null,
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
                    nR_Senha: ''
                }
            };
            break;
        case 'setToken':
            return { ...state, token: action.token };
            break;
        case 'setUserTasy':
            return { ...state, usertasy: action.usertasy };
            break;
        case 'UpdateUserTasyCPF':
            return { ...state, usertasy: { ...state.usertasy, nR_CPF: action.nR_CPF } };
            break;
        case 'UpdateUserTasyNome':
            return { ...state, usertasy: { ...state.usertasy, nM_PESSOA_FISICA: action.nM_PESSOA_FISICA } };
            break;
        case 'UpdateUserTasyDataNasc':
            return { ...state, usertasy: { ...state.usertasy, dT_NASCIMENTO: action.dT_NASCIMENTO } };
            break;
        case 'UpdateUserTasyDDD':
            return { ...state, usertasy: { ...state.usertasy, nR_DDD_CELULAR: action.nR_DDD_CELULAR } };
            break;
        case 'UpdateUserTasyFone':
            return { ...state, usertasy: { ...state.usertasy, nR_TELEFONE_CELULAR: action.nR_TELEFONE_CELULAR } };
            break;
        case 'UpdateUserTasyEmail':
            return { ...state, usertasy: { ...state.usertasy, dS_EMAIL: action.dS_EMAIL } };
            break;
        case 'UpdateSenha':
            return { ...state, usertasy: { ...state.usertasy, nR_Senha: action.nR_Senha } };
            break;
        case 'setConvenios':
            return { ...state, Convenios: [action.conveniosTasy] };
            break;
        case 'setImgPerfil':
            return { ...state, usertasy: { ...state.usertasy, ImgPerfil: action.ImgPerfil } };
            break;
        default:
            break;
    }
}