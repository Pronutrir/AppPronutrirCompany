export const initialState = {
    Convenio: null,
    Unidades: [],
    Unidade: null,
    Option: null,
    Option_02: null,
    Especialidades: [],
    Especialidade: null,
    Medicos: [],
    Medico: null,
    ListDatas: null,
    Data: null,
    Agenda: null,
    ValorConsulta: null,
    Notifications: [],
    ImgMedicos: [],
    UnidadesUrl: [],
    Consulta: null
}

export const UserReducer = (state, action) => {
    switch (action.type) {
        case 'setSelectedConvenio':
            return {
                ...state,
                Convenio: action.convenio,
                Unidades: [],
                Unidade: null,
                Option: null,
                Option_02: null,
                Especialidades: [],
                Especialidade: null,
                Medicos: [],
                Medico: null,
                ListDatas: null,
                Data: null,
                Agenda: null,
                ValorConsulta: null
            };
            break;
        case 'setUnidades':
            return {
                ...state,
                Unidades: action.unidades,
                Unidade: null,
                Option: null,
                Option_02: null,
                Especialidades: [],
                Especialidade: null,
                Medicos: [],
                Medico: null,
                ListDatas: null,
                Data: null,
                Agenda: null,
                ValorConsulta: null
            };
            break;
        case 'setUnidade':
            return {
                ...state,
                Unidade: action.unidade,
                Option: null,
                Option_02: null,
                Especialidades: [],
                Especialidade: null,
                Medicos: [],
                Medico: null,
                ListDatas: null,
                Data: null,
                Agenda: null,
                ValorConsulta: null
            };
            break;
        case 'setOptions':
            return {
                ...state,
                Option: action.option,
                Especialidades: [],
                Especialidade: null,
                Medicos: [],
                Medico: null,
                ListDatas: null,
                Data: null,
                Agenda: null,
                ValorConsulta: null
            };
            break;
        case 'setOptions_02':
            return {
                ...state,
                Option_02: action.option,
                ListDatas: null,
                Data: null,
                Agenda: null,
                ValorConsulta: null
            };
            break;
        case 'setEspecialidades':
            return {
                ...state,
                Especialidades: action.especialidades,
                Especialidade: null,
                Medicos: [],
                Medico: null,
                ListDatas: null,
                Data: null,
                Agenda: null,
                ValorConsulta: null
            };
            break;
        case 'setEspecialidade':
            return {
                ...state,
                Especialidade: action.especialidade,
                Medicos: [],
                Option_02: null,
                ListDatas: null,
                Data: null,
                Agenda: null,
                ValorConsulta: null
            };
            break;
        case 'setEspecialidadeOption2':
            return {
                ...state,
                Especialidade: action.especialidade,
                Option_02: null,
                ListDatas: null,
                Data: null,
                Agenda: null,
                ValorConsulta: null
            };
            break;
        case 'setMedicos':
            return {
                ...state,
                Medicos: action.medicos,
                Medico: null,
                ListDatas: null,
                Data: null,
                Agenda: null,
                ValorConsulta: null
            };
            break;
        case 'setMedico':
            return {
                ...state,
                Medico: action.medico,
                ListDatas: null,
                Data: null,
                Agenda: null,
                ValorConsulta: null
            };
            break;
        case 'delMedico':
            return {
                ...state,
                Medico: null,
                ListDatas: null,
                Data: null,
                Agenda: null,
                ValorConsulta: null
            };
            break;
        case 'setListDatas':
            return {
                ...state,
                ListDatas: action.listDatas,
                Data: null,
                Agenda: null,
            };
            break;
        case 'setData':
            return {
                ...state,
                Data: action.data,
                Agenda: null,
            };
            break;
        case 'setHora':
            return { ...state, Hora: action.hora };
            break;
        case 'setAgenda':
            return { ...state, Agenda: action.agenda };
            break;
        case 'setValorConsulta':
            return { ...state, ValorConsulta: action.valorConsulta };
            break;
        case 'setImgMedicos':
            return { ...state, ImgMedicos: action.ImgMedicos };
            break;
        case 'setUnidadesUrl':
            return { ...state, UnidadesUrl: action.UnidadesUrl };
            break;
        case 'setConsulta':
            return { ...state, Consulta: action.Consulta };
            break;
        case 'setStateClear':
            return {
                ...state,
                Convenio: null,
                Unidades: [],
                Unidade: null,
                Option: null,
                Option_02: null,
                Especialidades: [],
                Especialidade: null,
                Medicos: [],
                Medico: null,
                DatasHorarios: [],
                Data: null,
                Agenda: null,
                ValorConsulta: null
            };
            break;
        case 'setNotifications':
            return { ...state, Notifications: action.Notification }
        default:
            break;
    }
}