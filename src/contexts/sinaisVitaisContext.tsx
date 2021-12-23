import React, { createContext } from 'react';
import JsonMoc from '../QuimioterapiasDia';
import ConsultasMoc from '../agendaConsultas';
export interface consultaQT {
    //DT_PREVISTA: string;
    //DT_REAL: string;
    cD_PESSOA_FISICA: string;
    nM_PESSOA_FISICA: string;
    dT_NASCIMENTO?: string;
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

interface AuthContextData {
    consultasQT: consultaQT[];
    consultas: Consultas[];
}

const SinaisVitaisContext = createContext({} as AuthContextData);

export const SinaisVitaisProvider: React.FC = ({ children }) => {
    /* const AddSinaisVitais = async () => {
        setActiveModal(true);
        Api.post<SinaisVitais>('SinaisVitaisMonitoracaoGeral', {
            iE_PRESSAO: atendimento?.iE_PRESSAO,
            iE_MEMBRO: atendimento?.iE_MEMBRO,
            iE_MANGUITO: atendimento?.iE_MANGUITO,
            iE_APARELHO_PA: atendimento?.iE_APARELHO_PA,
            cD_PACIENTE: selected?.cD_PESSOA_FISICA,
            cD_PESSOA_FISICA: usertasy.cD_PESSOA_FISICA,
            qT_SATURACAO_O2: oxigenacao === oxigenacaoMin ? null : oxigenacao,
            iE_COND_SAT_O2: atendimento?.iE_COND_SAT_O2 ?? 'AA',
            iE_MEMBRO_SAT_O2: atendimento?.iE_MEMBRO_SAT_O2,
            iE_RITMO_ECG: atendimento?.iE_RITMO_ECG,
            iE_DECUBITO: atendimento?.iE_DECUBITO,
            qT_TEMP: temperatura === temperaturaMin ? null : temperatura,
            qT_PESO: Peso === PesoMin ? null : Peso,
            iE_UNID_MED_PESO: atendimento?.iE_UNID_MED_PESO,
            qT_ALTURA_CM: Altura === AlturaMin ? null : Altura,
            iE_UNID_MED_ALTURA: atendimento?.iE_UNID_MED_ALTURA,
            iE_SITUACAO: atendimento?.iE_SITUACAO,
            dT_LIBERACAO: moment().format(),
            nM_USUARIO: usertasy.usuariO_FUNCIONARIO[0]?.nM_USUARIO,
        })
            .then((response) => {
                setActiveModal(false);
                Onclean();
                addNotification({
                    message: 'Dados atualizados com sucesso!',
                    status: 'sucess',
                });
            })
            .catch((error) => {
                setActiveModal(false);
                addNotification({
                    message: 'Não foi possivel atualizar tente mais tarde!',
                    status: 'error',
                });
            });
    }; */

    /* const UpdateSinaisVitais = async (sinaisUpdate: sinaisVitaisUpdate) => {
        setActiveModal(true);
        Api.put<sinaisVitaisUpdate>(
            `SinaisVitaisMonitoracaoGeral/PutSVMG/${sinaisUpdate.nR_SEQUENCIA}`,
            {
                nM_USUARIO: usertasy.usuariO_FUNCIONARIO[0]?.nM_USUARIO,
                cD_PACIENTE: sinaisUpdate.cD_PACIENTE,
                qT_TEMP: sinaisUpdate.qT_TEMP,
                qT_PESO: sinaisUpdate.qT_PESO,
                qT_SATURACAO_O2: sinaisUpdate.qT_SATURACAO_O2,
                qT_ALTURA_CM: sinaisUpdate.qT_ALTURA_CM,
            },
        )
            .then(() => {
                setActiveModal(false);
                //Onclean();
                addNotification({
                    message: 'Dados atualizados com sucesso!',
                    status: 'sucess',
                });
            })
            .catch(() => {
                setActiveModal(false);
                addNotification({
                    message: 'Não foi possivel atualizar tente mais tarde!',
                    status: 'error',
                });
            });
    }; */

    return (
        <SinaisVitaisContext.Provider
            value={{ consultasQT: JsonMoc, consultas: ConsultasMoc }}>
            {children}
        </SinaisVitaisContext.Provider>
    );
};

export default SinaisVitaisContext;
