export const initialStateQT: consultaQT[] = [];

export interface consultaQT {
    //DT_PREVISTA: string;
    //DT_REAL: string;
    cD_PESSOA_FISICA: string;
    nM_PESSOA_FISICA: string;
    dT_NASCIMENTO: string;
    //DS_DIA_CICLO: string;
    //QT_PESO: string;
    //QT_ALTURA: number;
    //QT_SUPERF_CORPORAL: number;
    //DT_PREVISTA_1: string;
    //DT_REAL_1: string;
    //NR_SEQ_PACIENTE: number;
    //CD_ESTABELECIMENTO: number;
    //PROTOCOLO: string;
    //NM_MEDICACAO: string;
}

export type ConsultasQTAction = {
    type: 'setConsultasQT';
    payload: consultaQT[];
};
//   | { type: 'setUserTasy'; payload: UserTasy }
//   | { type: 'setUser'; payload: UsuarioFirebase };

export const ConsultasQTReducer = (
    state: consultaQT[],
    action: ConsultasQTAction,
): consultaQT[] => {
    switch (action.type) {
        case 'setConsultasQT':
            return action.payload;
        default:
            return state;
    }
};
