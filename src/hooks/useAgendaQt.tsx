import moment from "moment";
import { useContext } from "react";
import { useQuery } from "react-query"
import AuthContext from "../contexts/auth";
import NotificationGlobalContext from "../contexts/notificationGlobalContext";
import Api from "../services/api";

export interface IAgendaQT {
    //DT_PREVISTA: string;
    dT_REAL: string;
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

interface IResponseAgendaQt {
    result: IAgendaQT[];
}

const useGetAgendasQt = () => {

    const { addAlert } = useContext(NotificationGlobalContext);

    const {
        stateAuth: { UnidadeSelected },
    } = useContext(AuthContext);

    return useQuery('agendaQuimio', async  () => {
        const { result } = (await Api.get<IResponseAgendaQt>(
            `AgendaQuimio/GetAgendaQuimioterapiaGeral/${UnidadeSelected?.cD_ESTABELECIMENTO},75,${moment().format(
                'YYYY-MM-DD',
            )},${moment().format('YYYY-MM-DD')}?pagina=1&rows=100`,
        )).data;

        const resultByOrder = result.sort((a, b) => {
            return a.dT_REAL < b.dT_REAL
                ? -1
                : a.dT_REAL > b.dT_REAL
                ? 1
                : 0;
        });

        return resultByOrder;

    },
    {
        //enabled: false,
        staleTime : 60 * 30000, // 30 minuto
        onError: () => {
            addAlert({
                message: 'Error ao carregar as agendas, tentar mais tarde!',
                status: 'error',
            });
        },
    });
};

export { useGetAgendasQt }
