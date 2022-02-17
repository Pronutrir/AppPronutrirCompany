import React, {
    createContext,
    useCallback,
    useContext,
    useReducer,
    useRef,
    useEffect,
} from 'react';
import Api from '../services/api';
import AuthContext from './auth';
import moment from 'moment';
import NotificationGlobalContext from './notificationGlobalContext';
import {
    ConsultasQTReducer,
    initialStateQT,
    IstateConsultasQT,
    IconsultaQT,
} from '../reducers/ConsultasQTReducer';
import {
    ConsultasReducer,
    initialStateConsultas,
    IConsultas,
    IstateConsultas,
    IMedico,
    ConsultasAction,
    ISinaisVitais,
} from '../reducers/ConsultasReducer';
import axios, { AxiosResponse, CancelTokenSource } from 'axios';

interface AuthContextData {
    stateConsultasQT: IstateConsultasQT;
    stateConsultas: IstateConsultas;
    AddSinaisVitais(atendimento: SinaisVitaisPost): Promise<void>;
    GetConsultasQT(): Promise<void>;
    GetConsultas(filter?: IFilterConsultas): Promise<void>;
    //GetMedicosConsultas(): Promise<void>;
    dispatchConsultas: React.Dispatch<ConsultasAction>;
    SearchPFSinaisVitais(
        filter: IFilterPF,
    ): Promise<IPFSinaisVitais[] | null | undefined>;
    GetSinaisVitais(
        nR_SEQUENCIA: string,
    ): Promise<SinaisVitais | null | undefined>;
    GetAllSinaisVitais(): Promise<void>;
    FilterConsultas({
        dS_ESPECIALIDADE,
        nM_GUERRA,
    }: IFilterConsultas): IConsultas[] | undefined;
    UpdateSinaisVitais(sinaisUpdate: SinaisVitaisPut): Promise<void>;
}
export interface IFilterConsultas {
    codMedico?: number | null;
    nM_GUERRA?: string | null;
    codEspecialidade?: number | null;
    dS_ESPECIALIDADE?: string | null;
    dataInicio?: string | null;
    dataFinal?: string | null;
    pagina?: number | null;
}

export interface IFilterPF {
    queryNome?: string | null;
    queryDate?: string | null;
    page?: number | null;
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
export interface SinaisVitaisPut {
    nR_SEQUENCIA: number;
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
interface ResponsePFdados {
    result: IPFSinaisVitais[];
}

interface ResponseSVMG {
    result: SinaisVitais;
}

interface ResponseSVMGAll {
    result: SinaisVitais[];
}
export interface IPFSinaisVitais {
    cD_PESSOA_FISICA: string;
    dT_ATUALIZACAO: string;
    dT_CADASTRO_ORIGINAL: string;
    dT_NASCIMENTO: string;
    iE_TIPO_PESSOA: number;
    nM_PESSOA_FISICA: string;
}

const SinaisVitaisContext = createContext({} as AuthContextData);

export const SinaisVitaisProvider: React.FC = ({ children }) => {
    const {
        stateAuth: { usertasy },
    } = useContext(AuthContext);

    const { addAlert } = useContext(NotificationGlobalContext);

    const axiosSourceConsultas = useRef<CancelTokenSource | null>(null);
    const axiosSourcePFSinaisVitais = useRef<CancelTokenSource | null>(null);

    const [consultasQT, dispatchConsultasQT] = useReducer(
        ConsultasQTReducer,
        initialStateQT,
    );

    const [stateConsultas, dispatchConsultas] = useReducer(
        ConsultasReducer,
        initialStateConsultas,
    );

    const GetConsultasQT = useCallback(async () => {
        await Api.get(
            `AgendaQuimio/GetAgendaQuimioterapiaGeral/7,75,${moment().format(
                'YYYY-MM-DD',
            )},${moment().format('YYYY-MM-DD')}?pagina=1&rows=100`,
        )
            .then((response) => {
                const { result }: { result: IconsultaQT[] } = response.data;
                if (result) {
                    const _result = result.sort((a, b) => {
                        return a.dT_REAL < b.dT_REAL
                            ? -1
                            : a.dT_REAL > b.dT_REAL
                            ? 1
                            : 0;
                    });
                    dispatchConsultasQT({
                        type: 'setConsultasQT',
                        payload: { flagQT: true, consultasQT: _result },
                    });
                }
            })
            .catch(() => {
                addAlert({
                    message:
                        'Falha ao atualizar as consultas oncologicas tente mais tarde!',
                    status: 'error',
                });
                dispatchConsultasQT({
                    type: 'setConsultasQT',
                    payload: { flagQT: true, consultasQT: [] },
                });
                return;
            });
    }, [addAlert]);

    const GetConsultas = useCallback(
        async (filter?: IFilterConsultas) => {
            //Check if there are any previous pending requests
            if (axiosSourceConsultas != null) {
                axiosSourceConsultas.current?.cancel(
                    'Operação cancelada por uma nova requisição!',
                );
            }

            axiosSourceConsultas.current = axios.CancelToken.source();

            await Api.get(
                `AgendaConsultas/FilterAgendamentosGeral/${moment().format(
                    'YYYY-MM-DD',
                )},${moment().format(
                    'YYYY-MM-DD',
                )}?pagina=1&semStatusAgenda='C'${
                    filter?.nM_GUERRA ? `&nomeMedico=${filter.nM_GUERRA}` : ''
                }${
                    filter?.dS_ESPECIALIDADE
                        ? `&descEspecialidade=${filter.dS_ESPECIALIDADE}`
                        : ''
                }&codEstabelecimento=7&rows=200`,
                {
                    cancelToken: axiosSourceConsultas.current.token,
                },
            )
                .then((response) => {
                    const { result }: { result: IConsultas[] } = response.data;
                    if (result) {
                        const _result = result.sort((a, b) => {
                            return a.dT_AGENDA < b.dT_AGENDA
                                ? -1
                                : a.dT_AGENDA > b.dT_AGENDA
                                ? 1
                                : 0;
                        });
                        dispatchConsultas({
                            type: 'setConsultas',
                            payload: {
                                flag: true,
                                consultas: _result,
                            },
                        });
                    }
                })
                .catch((error) => {
                    if (axios.isCancel(error)) {
                        return;
                    }
                    addAlert({
                        message:
                            'Falha ao atualizar as consultas agendadas tente mais tarde!',
                        status: 'error',
                    });
                    dispatchConsultas({
                        type: 'setConsultas',
                        payload: {
                            flag: true,
                            consultas: [],
                        },
                    });
                    return;
                });
        },
        [addAlert],
    );

    const FilterConsultas = ({
        dS_ESPECIALIDADE,
        nM_GUERRA,
    }: IFilterConsultas): IConsultas[] | undefined => {
        if (stateConsultas.consultas && dS_ESPECIALIDADE) {
            return stateConsultas.consultas?.filter(
                (item) => item.dS_ESPECIALIDADE === dS_ESPECIALIDADE,
            );
        }
        if (stateConsultas.consultas && nM_GUERRA) {
            return stateConsultas.consultas?.filter(
                (item) => item.nM_GUERRA === nM_GUERRA,
            );
        }
    };

    const GetMedicosConsultas = useCallback(async () => {
        await Api.get(
            `AgendaConsultas/ApresentarDadosNomeMedicosOuEspecialidadesAgendaConsultasGeral/${moment().format(
                'YYYY-MM-DD',
            )},${moment().format(
                'YYYY-MM-DD',
            )}?nomeMedico=true&descEspecialidade=true&codEstabelecimento=7`,
        )
            .then((response) => {
                const { result }: { result: IMedico[] } = response.data;
                if (result.length > 0) {
                    dispatchConsultas({
                        type: 'setMedicos',
                        payload: { medicos: result },
                    });
                }
            })
            .catch(() => {
                dispatchConsultas({
                    type: 'setConsultas',
                    payload: {
                        flag: true,
                        medicos: [],
                    },
                });
                return;
            });
    }, []);

    const SearchPFSinaisVitais = async (
        filter: IFilterPF,
    ): Promise<IPFSinaisVitais[] | null | undefined> => {
        //Check if there are any previous pending requests
        if (axiosSourcePFSinaisVitais != null) {
            axiosSourcePFSinaisVitais.current?.cancel(
                'Operação cancelada por uma nova requisição!',
            );
        }

        axiosSourcePFSinaisVitais.current = axios.CancelToken.source();

        const listPFsinaisVitais = await Api.get<
            any,
            AxiosResponse<ResponsePFdados>
        >(
            `PessoaFisica/FiltrarPFdadosReduzidos?${
                filter.queryDate
                    ? `&dataNascimento=${moment(
                          filter.queryDate,
                          'DD/MM/YYYY',
                      ).format('YYYY-MM-DD')}`
                    : ''
            }${
                filter.queryNome ? `&nomePessoaFisica=${filter.queryNome}` : ''
            }&pagina=1&rows=100`,
            {
                cancelToken: axiosSourcePFSinaisVitais.current.token,
            },
        )
            .then((response) => {
                const { result } = response.data;
                return result;
            })
            .catch((error) => {
                if (axios.isCancel(error)) {
                    return;
                }
                addAlert({
                    message:
                        'Não foi possivel realizar a consulta, tente mais tarde!',
                    status: 'error',
                });
                return null;
            });
        return listPFsinaisVitais;
    };

    const GetSinaisVitais = async (
        nR_SEQUENCIA: string,
    ): Promise<SinaisVitais | null | undefined> => {
        return Api.get<any, AxiosResponse<ResponseSVMG>>(
            `SinaisVitaisMonitoracaoGeral/RecuperaDadosRecentesSVMG/${nR_SEQUENCIA}`,
        )
            .then((response) => {
                const { result } = response.data;
                if (result) {
                    return result;
                } else {
                    addAlert({
                        message:
                            'Paciente não possui sinais vitais cadastrados!',
                        status: 'info',
                    });
                }
            })
            .catch(() => {
                addAlert({
                    message:
                        'Não foi possivel consultar os sinais vitais, tente mais tarde!',
                    status: 'error',
                });
                return null;
            });
    };

    const GetAllSinaisVitais = useCallback(async (): Promise<void> => {
        await Api.get(
            `SinaisVitaisMonitoracaoGeral/RecuperaDadosRecentesSVMGListagem/${moment().format(
                'YYYY-MM-DD',
            )},${moment().format('YYYY-MM-DD')}`,
        )
            .then((response) => {
                const { result } = response.data;
                if (result) {
                    dispatchConsultas({
                        type: 'setSinaisVitais',
                        payload: result,
                    });
                } else {
                    addAlert({
                        message:
                            'Não foi possivel consultar os sinais vitais, tente mais tarde!',
                        status: 'info',
                    });
                }
            })
            .catch(() => {
                addAlert({
                    message:
                        'Não foi possivel consultar os sinais vitais, tente mais tarde!',
                    status: 'error',
                });
                return null;
            });
    }, [addAlert]);

    const AddSinaisVitais = async (atendimento: SinaisVitaisPost) => {
        await Api.post<SinaisVitais>('SinaisVitaisMonitoracaoGeral', {
            iE_PRESSAO: sinaisVitaisDefault.iE_PRESSAO,
            iE_MEMBRO: sinaisVitaisDefault.iE_MEMBRO,
            iE_MANGUITO: sinaisVitaisDefault.iE_MANGUITO,
            iE_APARELHO_PA: sinaisVitaisDefault.iE_APARELHO_PA,
            cD_PACIENTE: atendimento.cD_PACIENTE,
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
            .then(() => {
                addAlert({
                    message: 'Dados atualizados com sucesso!',
                    status: 'sucess',
                });
                GetAllSinaisVitais();
            })
            .catch(() => {
                addAlert({
                    message:
                        'Falha ao enviar os sinais vitais tente mais tarde!',
                    status: 'error',
                });
                return;
            });
    };

    const UpdateSinaisVitais = async (sinaisUpdate: SinaisVitaisPut) => {
        await Api.put<ISinaisVitais>(
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
                addAlert({
                    message: 'Dados Atualizado com sucesso!',
                    status: 'sucess',
                });
            })
            .catch(() => {
                addAlert({
                    message: 'Não foi possivel inativar tente mais tarde!',
                    status: 'error',
                });
            });
    };

    const DeleteSinaisVitais = async (id: number) => {
        await Api.delete(`SinaisVitaisMonitoracaoGeral/DeleteSVMG/${id}`)
            .then(() => {
                GetAllSinaisVitais();
                addAlert({
                    message: 'Dados excluir com sucesso!',
                    status: 'sucess',
                });
            })
            .catch(() => {
                addAlert({
                    message: 'Não foi possivel excluir tente mais tarde!',
                    status: 'error',
                });
            });
    };

    useEffect(() => {
        GetAllSinaisVitais();
    }, [GetAllSinaisVitais]);

    return (
        <SinaisVitaisContext.Provider
            value={{
                stateConsultasQT: consultasQT,
                stateConsultas: stateConsultas,
                AddSinaisVitais,
                GetConsultasQT,
                GetConsultas,
                //GetMedicosConsultas,
                dispatchConsultas,
                SearchPFSinaisVitais,
                GetSinaisVitais,
                GetAllSinaisVitais,
                FilterConsultas,
                UpdateSinaisVitais,
            }}>
            {children}
        </SinaisVitaisContext.Provider>
    );
};

export default SinaisVitaisContext;
