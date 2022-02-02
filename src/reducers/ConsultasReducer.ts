export const initialStateConsultas: IstateConsultas = {
    flag: false,
    consultas: [],
    medicos: [],
};
export interface IstateConsultas {
    flag?: boolean;
    consultas?: IConsultas[];
    medicos?: IMedico[] | null;
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

export type ConsultasAction =
    | {
          type: 'setConsultas';
          payload: IstateConsultas;
      }
    | { type: 'setMedicos'; payload: IstateConsultas };
//   | { type: 'setUser'; payload: UsuarioFirebase };

export const ConsultasReducer = (
    state: IstateConsultas,
    action: ConsultasAction,
): IstateConsultas => {
    switch (action.type) {
        case 'setConsultas':
            return { ...state, ...action.payload };
        case 'setMedicos':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
