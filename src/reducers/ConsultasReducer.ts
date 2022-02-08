export const initialStateConsultas: IstateConsultas = {
    flag: false,
    consultas: [],
    medicos: [],
    sinaisVitais: [],
};
export interface IstateConsultas {
    flag?: boolean;
    consultas?: IConsultas[];
    medicos?: IMedico[] | null;
    sinaisVitais?: ISinaisVitais[] | null;
}
export interface IMedico {
    cD_ESPECIALIDADE: number;
    dS_ESPECIALIDADE: string;
    cD_PESSOA_FISICA: string;
    nM_GUERRA: string;
}
export interface IConsultas {
    nR_SEQUENCIA?: number;
    cD_AGENDA?: number;
    nM_PACIENTE?: string;
    cD_PESSOA_FISICA: string;
    nM_PESSOA_FISICA: string;
    dT_NASCIMENTO?: string;
    cD_ESPECIALIDADE?: number;
    dS_ESPECIALIDADE?: string;
    nM_GUERRA?: string;
    nR_TELEFONE?: string;
    nR_TELEFONE_CELULAR?: string;
    dT_AGENDA: string;
    nR_MINUTO_DURACAO?: number;
    iE_STATUS_AGENDA?: string;
    iE_CLASSIF_AGENDA?: string;
    dT_ATUALIZACAO?: string;
    nM_USUARIO?: string;
    cD_TURNO?: string;
    cD_CONVENIO?: number;
    cD_CATEGORIA?: string;
    cD_PLANO?: string;
    dS_CONVENIO?: string;
    dS_PLANO?: string;
    cD_ESTABELECIMENTO?: number;
    eNDERECO?: string;
}

interface ISinaisVitais {
    nR_SEQUENCIA: number;
    nR_ATENDIMENTO: number;
    dT_SINAL_VITAL: string;
    dT_ATUALIZACAO: string;
    iE_PRESSAO: string;
    iE_MEMBRO: string;
    iE_MANGUITO: string;
    iE_APARELHO_PA: string;
    cD_PACIENTE: string;
    nM_PESSOA_FISICA: string;
    cD_PESSOA_FISICA: string;
    qT_SATURACAO_O2: number;
    iE_COND_SAT_O2: string;
    iE_MEMBRO_SAT_O2: string;
    iE_RITMO_ECG: string;
    iE_DECUBITO: string;
    iE_UNID_MED_PESO: string;
    qT_ALTURA_CM: number;
    iE_UNID_MED_ALTURA: string;
    dS_UTC: string;
    dS_UTC_ATUALIZACAO: string;
    dT_LIBERACAO: string;
    iE_SITUACAO: string;
    nM_USUARIO: string;
}

export type ConsultasAction =
    | {
          type: 'setConsultas';
          payload: IstateConsultas;
      }
    | { type: 'setMedicos'; payload: IstateConsultas }
    | { type: 'setSinaisVitais'; payload: ISinaisVitais[] };

export const ConsultasReducer = (
    state: IstateConsultas,
    action: ConsultasAction,
): IstateConsultas => {
    switch (action.type) {
        case 'setConsultas':
            return { ...state, ...action.payload };
        case 'setMedicos':
            return { ...state, ...action.payload };
        case 'setSinaisVitais':
            return { ...state, sinaisVitais: action.payload };
        default:
            return state;
    }
};
