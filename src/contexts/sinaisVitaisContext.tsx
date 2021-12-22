import React, { createContext } from 'react';
import JsonMoc from '../QuimioterapiasDia';

export interface consultaQT {
    DT_PREVISTA: string;
    DT_REAL: string;
    CD_PESSOA_FISICA: string;
    NM_PESSOA_FISICA: string;
    DS_DIA_CICLO: string;
    QT_PESO: string;
    QT_ALTURA: number;
    QT_SUPERF_CORPORAL: number;
    DT_PREVISTA_1: string;
    DT_REAL_1: string;
    NR_SEQ_PACIENTE: number;
    CD_ESTABELECIMENTO: number;
    PROTOCOLO: string;
    NM_MEDICACAO: string;
}

interface AuthContextData {
    consultasQT: consultaQT[];
}

const SinaisVitaisContext = createContext({} as AuthContextData);

export const SinaisVitaisProvider: React.FC = ({ children }) => {
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
        <SinaisVitaisContext.Provider value={{ consultasQT: JsonMoc }}>
            {children}
        </SinaisVitaisContext.Provider>
    );
};

export default SinaisVitaisContext;
