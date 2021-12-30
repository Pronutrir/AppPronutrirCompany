import React, { createContext, useContext } from 'react';
import JsonMoc from '../QuimioterapiasDia';
import ConsultasMoc from '../agendaConsultas';
import Api from '../services/api';
import AuthContext from './auth';
import moment from 'moment';
import NotificationGlobalContext from './notificationGlobalContext';
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
    AddSinaisVitais(atendimento: SinaisVitaisPost): Promise<void>;
}

export interface SinaisVitais {
    iE_PRESSAO: string;
    iE_MEMBRO: string;
    iE_MANGUITO: string;
    iE_APARELHO_PA: string;
    iE_COND_SAT_O2: string;
    iE_MEMBRO_SAT_O2: string;
    iE_RITMO_ECG: string;
    iE_DECUBITO: string;
    iE_UNID_MED_PESO: string;
    iE_UNID_MED_ALTURA: string;
    cD_PACIENTE: string;
    cD_PESSOA_FISICA: string;
    qT_SATURACAO_O2: number | null;
    qT_TEMP: number | null;
    qT_PESO: number | null;
    qT_ALTURA_CM: number | null;
    iE_SITUACAO: string;
    dT_LIBERACAO: string;
    nM_USUARIO: string;
}

export interface SinaisVitaisPost {
    cD_PACIENTE: string;
    qT_SATURACAO_O2: number | null;
    qT_TEMP: number | null;
    qT_PESO: number | null;
    qT_ALTURA_CM: number | null;
}

const sinaisVitaisDefault: SinaisVitais = {
    iE_PRESSAO: 'D',
    iE_MEMBRO: 'MSE',
    iE_MANGUITO: 'C',
    iE_APARELHO_PA: 'C',
    iE_COND_SAT_O2: 'AA',
    iE_MEMBRO_SAT_O2: 'MSE',
    iE_RITMO_ECG: '1',
    iE_DECUBITO: 'DDH',
    iE_UNID_MED_PESO: 'Kg',
    iE_UNID_MED_ALTURA: 'cm',
    cD_PACIENTE: '',
    cD_PESSOA_FISICA: '',
    qT_SATURACAO_O2: 0,
    qT_TEMP: 0,
    qT_PESO: 0,
    qT_ALTURA_CM: 0,
    iE_SITUACAO: 'A',
    dT_LIBERACAO: '',
    nM_USUARIO: '',
};

const SinaisVitaisContext = createContext({} as AuthContextData);

export const SinaisVitaisProvider: React.FC = ({ children }) => {
    const {
        stateAuth: { usertasy },
    } = useContext(AuthContext);

    const { addAlert } = useContext(NotificationGlobalContext);

    const AddSinaisVitais = async (atendimento: SinaisVitaisPost) => {
        await Api.post<SinaisVitais>('SinaisVitaisMonitoracaoGeral', {
            iE_PRESSAO: sinaisVitaisDefault.iE_PRESSAO,
            iE_MEMBRO: sinaisVitaisDefault.iE_MEMBRO,
            iE_MANGUITO: sinaisVitaisDefault.iE_MANGUITO,
            iE_APARELHO_PA: sinaisVitaisDefault.iE_APARELHO_PA,
            cD_PACIENTE: 159969,
            cD_PESSOA_FISICA: usertasy.cD_PESSOA_FISICA,
            qT_SATURACAO_O2: atendimento.qT_SATURACAO_O2,
            iE_COND_SAT_O2: sinaisVitaisDefault.iE_COND_SAT_O2,
            iE_MEMBRO_SAT_O2: sinaisVitaisDefault.iE_MEMBRO_SAT_O2,
            iE_RITMO_ECG: sinaisVitaisDefault.iE_RITMO_ECG,
            iE_DECUBITO: sinaisVitaisDefault.iE_DECUBITO,
            qT_TEMP: atendimento.qT_TEMP,
            qT_PESO: atendimento.qT_PESO,
            iE_UNID_MED_PESO: sinaisVitaisDefault.iE_UNID_MED_PESO,
            qT_ALTURA_CM: atendimento.qT_ALTURA_CM,
            iE_UNID_MED_ALTURA: sinaisVitaisDefault.iE_UNID_MED_ALTURA,
            iE_SITUACAO: sinaisVitaisDefault.iE_SITUACAO,
            dT_LIBERACAO: moment().format(),
            nM_USUARIO: usertasy.nM_USUARIO,
        })
            .then((response) => {
                console.log(response);
                addAlert({
                    message: 'Dados atualizados com sucesso!',
                    status: 'sucess',
                });
            })
            .catch((error) => {
                console.log(error);
                addAlert({
                    message: 'Não foi possivel atualizar tente mais tarde!',
                    status: 'error',
                });
            });
    };

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
            value={{
                consultasQT: JsonMoc,
                consultas: ConsultasMoc,
                AddSinaisVitais,
            }}>
            {children}
        </SinaisVitaisContext.Provider>
    );
};

export default SinaisVitaisContext;
