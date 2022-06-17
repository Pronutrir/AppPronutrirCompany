export const initialStateConsultas: IstateConsultas = {
    flag: false,
    consultas: null,
    medicos: [],
    sinaisVitais: [],
};
export interface IstateConsultas {
    flag?: boolean;
    consultas?: IConsultas[] | null;
    medicos?: IMedico[] | null;
    sinaisVitais?: ISinaisVitais[] | null;
}
export interface IMedico {
    cD_ESPECIALIDADE: number;
    dS_ESPECIALIDADE: string;
    nM_GUERRA: string;
}
export interface IConsultas {
    nR_SEQUENCIA?: number;
    cD_AGENDA?: number;
    nM_PACIENTE?: string;
    cD_PESSOA_FISICA: string;
    nM_PESSOA_FISICA: string;
    dT_NASCIMENTO?: string;
    cD_ESPECIALIDADE: number;
    dS_ESPECIALIDADE: string;
    nM_GUERRA: string;
    dT_AGENDA: string;
    iE_STATUS_AGENDA?: string;
    iE_CLASSIF_AGENDA?: string;
    dT_ATUALIZACAO?: string;
    nM_USUARIO?: string;
    cD_ESTABELECIMENTO?: number;
    counT_SVMP: number;
}

export interface ISinaisVitais {
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
    dT_NASCIMENTO: string;
    cD_PESSOA_FISICA: string;
    qT_SATURACAO_O2: number;
    qT_TEMP: number;
    qT_PESO: number;
    qT_PA_SISTOLICA: number;
    qT_PA_DIASTOLICA: number;
    qT_PAM: number;
    qT_FREQ_CARDIACA: number;
    qT_FREQ_RESP: number;
    qT_ESCALA_DOR: number;
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
    dS_OBSERVACAO: "string";
}

export interface IAlertaPaciente {
    nR_SEQUENCIA: 562;
    nM_USUARIO: string;
    iE_CONFIRMACAO: string;
    iE_CLASSIFICACAO: string;
    dT_ATUALIZACAO: string;
    dT_REGISTRO: string;
    cD_PESSOA_FISICA: string;
    nR_SEQ_TIPO: 1;
    dS_OBSERVACAO: string | null;
    iE_INTENSIDADE: string;
    nR_ATENDIMENTO: 89643;
    dT_ATUALIZACAO_NREC: string;
    nM_USUARIO_NREC: string;
    dT_LIBERACAO: string;
    nM_USUARIO_LIBERACAO: string;
    iE_NEGA_ALERGIAS: string;
    cD_PERFIL_ATIVO: 1997;
    dS_MEDIC_NAO_CAD: string;
    iE_ALERTA: string;
    cD_SETOR_ATENDIMENTO: 75;
    cD_PROFISSIONAL: string;
    dS_UTC_ATUALIZACAO: string;
    dS_UTC: string;
    iE_LISTA_PROBLEMA: string;
    iE_ACAO: string;
    dS_TIPO_ALERGIA: string;
    dS_SUBSTANCIA: string;
    dS_REACAO: string;
}

export type ConsultasAction =
    | {
          type: 'setConsultas';
          payload: IstateConsultas;
      }
    | { type: 'setMedicos'; payload: IstateConsultas }
    | { type: 'setSinaisVitais'; payload: ISinaisVitais[] }
    | { type: 'delSinaisVitais' };

export const ConsultasReducer = (
    state: IstateConsultas,
    action: ConsultasAction,
): IstateConsultas => {
    switch (action.type) {
        case 'setConsultas':
            return {
                ...state,
                consultas: action.payload.consultas,
                medicos: action.payload.consultas
                    ?.map((item) => {
                        return {
                            nM_GUERRA: item?.nM_GUERRA,
                            dS_ESPECIALIDADE: item?.dS_ESPECIALIDADE,
                            cD_ESPECIALIDADE: item.cD_ESPECIALIDADE,
                        };
                    })
                    .filter(
                        (item, index, array) =>
                            array.findIndex(
                                (t) => t.nM_GUERRA === item.nM_GUERRA,
                            ) === index,
                    )
                    .sort((a, b) => {
                        return a.nM_GUERRA < b.nM_GUERRA
                            ? -1
                            : a.nM_GUERRA > b.nM_GUERRA
                            ? 1
                            : 0;
                    }),
            };
        case 'setMedicos':
            return { ...state, ...action.payload };
        case 'delSinaisVitais':
            return { ...state, sinaisVitais: null };
        case 'setSinaisVitais':
            return {
                ...state,
                sinaisVitais: action.payload
                    .filter((item) => item.iE_SITUACAO !== 'I')
                    .sort((a, b) => {
                        return a.dT_ATUALIZACAO > b.dT_ATUALIZACAO
                            ? -1
                            : a.dT_ATUALIZACAO < b.dT_ATUALIZACAO
                            ? 1
                            : 0;
                    }),
            };
        default:
            return state;
    }
};
