import { useContext } from "react";
import { useMutation, useQuery } from "react-query";
import NotificationGlobalContext from "../contexts/notificationGlobalContext";
import Api from "../services/api";

export interface IEvolucao {
    dT_EVOLUCAO?: string;
    iE_TIPO_EVOLUCAO?: number;
    iE_SITUACAO?: string;
    dT_ATUALIZACAO?: string;
    nM_USUARIO?: string;
    cD_PESSOA_FISICA?: string;
    dS_EVOLUCAO?: string;
}

export interface ITextDefaultResponse {
    result: ITextDefault[];
}

export interface ITextDefault {
    nR_SEQUENCIA: number;
    nR_SEQ_ITEM_PRONT: number;
    dS_TITULO: string;
    nM_USUARIO: string;
    dT_ATUALIZACAO: string;
    iE_PERMITE_ALTERAR_TEXTO: string;
    dS_TEXTO: string;
    dT_ATUALIZACAO_NREC: string;
    nM_USUARIO_NREC: string;
}

/* const useAddEvoluçaoEnfermagem = useMutation((item: IEvolucao) => {
    return Api.post(`EvolucaoPaciente/PostEvolucaoPaciente`, item)
}); */

const useAddEvoluçaoEnfermagem = () => {
    const { addAlert } = useContext(NotificationGlobalContext);
    return useMutation((item: IEvolucao) => {
        return Api.post(`EvolucaoPaciente/PostEvolucaoPaciente`, item)
    },{
        onError: () => {
            addAlert({
                message: 'Error ao adicionar a evolução tente mais tarde!',
                status: 'error',
            });
        },
    },)
}

const useEvolucaoTextDefault = (value: number | null) => {
    const { addAlert } = useContext(NotificationGlobalContext);
    return useQuery(
        ['defaultTextHtml', value],
        async () => {
            const {
                data: { result },
            } = await Api.get<ITextDefaultResponse>(
                `TextoPadrao/ListarTextosPadroesInstituicao?nrSequencia=${value ? value : 0}`,
            );
            return result[0];
        },
        {
            onError: () => {
                addAlert({
                    message: 'Error ao listar os textos padroes tenta mais tarde!',
                    status: 'error',
                });
            },
        },
    );
};

export { useAddEvoluçaoEnfermagem, useEvolucaoTextDefault }
