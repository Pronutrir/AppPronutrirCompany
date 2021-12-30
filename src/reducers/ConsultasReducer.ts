export const initialStateConsultas: Consultas[] = [];

export interface Consultas {
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
    dT_AGENDA?: string;
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

export type ConsultasAction = {
    type: 'setConsultas';
    payload: Consultas[];
};
//   | { type: 'setUserTasy'; payload: UserTasy }
//   | { type: 'setUser'; payload: UsuarioFirebase };

export const ConsultasReducer = (
    state: Consultas[],
    action: ConsultasAction,
): Consultas[] => {
    switch (action.type) {
        case 'setConsultas':
            return action.payload;
        default:
            return state;
    }
};
