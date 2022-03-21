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
    IAlertaPaciente,
} from '../reducers/ConsultasReducer';
import axios, { AxiosResponse, CancelTokenSource } from 'axios';
import { useQuery, UseQueryResult } from 'react-query';
import firestore from '@react-native-firebase/firestore';
interface AuthContextData {
    stateConsultasQT: IstateConsultasQT;
    stateConsultas: IstateConsultas;
    AddSinaisVitais(atendimento: SinaisVitaisPost): Promise<void>;
    GetConsultasQT(): Promise<void>;
    GetConsultas(filter?: IFilterConsultas): Promise<void>;
    dispatchConsultas: React.Dispatch<ConsultasAction>;
    SearchPFSinaisVitais(
        filter: IFilterPF,
    ): Promise<IPFSinaisVitais[] | null | undefined>;
    GetSinaisVitais(
        nR_SEQUENCIA: string,
    ): Promise<ISinaisVitais | null | undefined>;
    GetAllSinaisVitais(): Promise<void>;
    FilterConsultas({
        dS_ESPECIALIDADE,
        nM_GUERRA,
    }: IFilterConsultas): IConsultas[] | undefined;
    UpdateSinaisVitais(sinaisUpdate: SinaisVitaisPut): Promise<void>;
    ValidationAutorizeEnfermagem: () => boolean | undefined;
    ValidationAutorizeTriagem: () => boolean;
    InativarSinaisVitais: (
        sinaisUpdate: IInativarSinaisVitais,
    ) => Promise<void>;
    useAlerts: (codPacient: string) => UseQueryResult<IAlertaPaciente[], unknown>;
    useHistoryAlerts: () => UseQueryResult<IAlertaPaciente[], unknown>;
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
export interface SinaisVitaisPost {
    cD_PACIENTE: string;
    qT_SATURACAO_O2: number | null;
    qT_TEMP: number | null;
    qT_PESO: number | null;
    qT_ALTURA_CM: number | null;
    qT_PA_SISTOLICA?: number | null;
    qT_PA_DIASTOLICA?: number | null;
    qT_PAM?: number | null;
    qT_FREQ_CARDIACA?: number | null;
    qT_FREQ_RESP?: number | null;
    cD_ESCALA_DOR?: string | null;
    qT_ESCALA_DOR?: number | null;
}
export interface SinaisVitaisPut {
    nR_SEQUENCIA: number;
    cD_PACIENTE: string;
    qT_SATURACAO_O2: number | null;
    qT_TEMP: number | null;
    qT_PESO: number | null;
    qT_ALTURA_CM: number | null;
    qT_PA_SISTOLICA?: number | null;
    qT_PA_DIASTOLICA?: number | null;
    qT_PAM?: number | null;
    qT_FREQ_CARDIACA?: number | null;
    qT_FREQ_RESP?: number | null;
    cD_ESCALA_DOR?: string | null;
    qT_ESCALA_DOR?: number | null;
}
interface ISinaisVitaisDefault {
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
    iE_SITUACAO: string;
}

const sinaisVitaisDefault: ISinaisVitaisDefault = {
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
    iE_SITUACAO: 'A',
};
interface ResponsePFdados {
    result: IPFSinaisVitais[];
}
interface ResponseSVMG {
    result: ISinaisVitais;
}
export interface IPFSinaisVitais {
    cD_PESSOA_FISICA: string;
    dT_ATUALIZACAO: string;
    dT_CADASTRO_ORIGINAL: string;
    dT_NASCIMENTO: string;
    iE_TIPO_PESSOA: number;
    nM_PESSOA_FISICA: string;
}
export interface IPerfisLiberados {
    cD_PERFIL: number;
    dS_PERFIL: string;
}
export interface IInativarSinaisVitais {
    nR_SEQUENCIA: number;
    iE_SITUACAO: string;
    nM_USUARIO: string;
    cD_PACIENTE: string;
}
interface IAlertPacientResponse {
    result: IAlertaPaciente[];
}

const SinaisVitaisContext = createContext({} as AuthContextData);

export const SinaisVitaisProvider: React.FC = ({ children }) => {
    const {
        stateAuth: { usertasy },
        stateAuth,
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

    /* const GetMedicosConsultas = useCallback(async () => {
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
    }, []); */

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
    ): Promise<ISinaisVitais | null | undefined> => {
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
    }, [addAlert, usertasy]);

    const AddSinaisVitais = async (atendimento: SinaisVitaisPost) => {
        await Api.post<ISinaisVitais>('SinaisVitaisMonitoracaoGeral', {
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
            qT_PA_SISTOLICA: atendimento.qT_PA_SISTOLICA,
            qT_PA_DIASTOLICA: atendimento.qT_PA_DIASTOLICA,
            qT_PAM: atendimento.qT_PAM,
            qT_FREQ_CARDIACA: atendimento.qT_FREQ_CARDIACA,
            qT_FREQ_RESP: atendimento.qT_FREQ_CARDIACA,
            cD_ESCALA_DOR: atendimento.cD_ESCALA_DOR,
            qT_ESCALA_DOR: atendimento.qT_ESCALA_DOR,
            iE_UNID_MED_ALTURA: sinaisVitaisDefault.iE_UNID_MED_ALTURA,
            iE_SITUACAO: sinaisVitaisDefault.iE_SITUACAO,
            dT_LIBERACAO: moment().format(),
            nM_USUARIO: usertasy.nM_USUARIO,
        })
            .then(() => {
                addAlert({
                    message: 'Dados enviado com sucesso!',
                    status: 'sucess',
                });
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
                nM_USUARIO: usertasy.usuariO_FUNCIONARIO_SETOR[0]?.nM_USUARIO,
                cD_PACIENTE: sinaisUpdate.cD_PACIENTE,
                qT_TEMP: sinaisUpdate.qT_TEMP,
                qT_PESO: sinaisUpdate.qT_PESO,
                qT_SATURACAO_O2: sinaisUpdate.qT_SATURACAO_O2,
                qT_ALTURA_CM: sinaisUpdate.qT_ALTURA_CM,
                qT_PA_SISTOLICA: sinaisUpdate.qT_PA_SISTOLICA,
                qT_PA_DIASTOLICA: sinaisUpdate.qT_PA_DIASTOLICA,
                qT_PAM: sinaisUpdate.qT_PAM,
                qT_FREQ_CARDIACA: sinaisUpdate.qT_FREQ_CARDIACA,
                qT_FREQ_RESP: sinaisUpdate.qT_FREQ_RESP,
                cD_ESCALA_DOR: sinaisUpdate.cD_ESCALA_DOR,
                qT_ESCALA_DOR: sinaisUpdate.qT_ESCALA_DOR,
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

    const InativarSinaisVitais = async (
        sinaisUpdate: IInativarSinaisVitais,
    ) => {
        sinaisUpdate.iE_SITUACAO = 'I';
        Api.put<ISinaisVitais>(
            `SinaisVitaisMonitoracaoGeral/PutAtivarInativarSVMG/${sinaisUpdate.nR_SEQUENCIA}`,
            {
                iE_SITUACAO: sinaisUpdate?.iE_SITUACAO,
                nM_USUARIO: usertasy.usuariO_FUNCIONARIO_SETOR[0]?.nM_USUARIO,
                cD_PACIENTE: sinaisUpdate.cD_PACIENTE,
            },
        )
            .then(() => {
                addAlert({
                    message: 'Sinal vital excluído com sucesso!',
                    status: 'sucess',
                });
            })
            .catch(() => {
                addAlert({
                    message: 'Não foi possivel excluído tente mais tarde!',
                    status: 'error',
                });
            });
    };

    /* const DeleteSinaisVitais = async (id: number) => {
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
    }; */

    const getPerfilAutorizeEnfermagem = async () => {
        const useRef = firestore()
            .doc('FunctionsApp/SinaisVitaisEnfermagem')
            .collection('Perfis');

        const resultPerfis: IPerfisLiberados[] = [];

        await useRef.get().then((querySnapshot) => {
            return querySnapshot.forEach((item) => {
                resultPerfis.push({
                    cD_PERFIL: item.get('cD_PERFIL'),
                    dS_PERFIL: item.get('dS_PERFIL'),
                });
            });
        });

        return resultPerfis;
    };

    const { data: PerfisSinaisVitaisEnfermagem } = useQuery(
        'PerfisEnfermagem',
        getPerfilAutorizeEnfermagem,
    );

    const getPerfilAutorizeTriagem = async () => {
        const useRef = firestore()
            .doc('FunctionsApp/SinaisVitaisTriagem')
            .collection('Perfis');

        const resultPerfis: IPerfisLiberados[] = [];

        await useRef.get().then((querySnapshot) => {
            return querySnapshot.forEach((item) => {
                resultPerfis.push({
                    cD_PERFIL: item.get('cD_PERFIL'),
                    dS_PERFIL: item.get('dS_PERFIL'),
                });
            });
        });

        return resultPerfis;
    };

    const { data: PerfisSinaisVitaisTriagem } = useQuery(
        'PerfisTriagem',
        getPerfilAutorizeTriagem,
    );

    const useAlerts = (codPacient: string) => {
        return useQuery('AlertaPaciente', async () => {
            const {
                data: { result },
            } = await Api.get<IAlertPacientResponse>(
                `AlergiaReacoesAdversas/ListarAlergiaReacoesAdversasPacienteAll?codPaciente=${codPacient}`,
            );
            return result.filter(item => item.iE_ALERTA === "S");
        }, {  });
    };

    const useHistoryAlerts = () => {
        return useQuery(
            'AlertaPacienteHistory',
            async ({ signal }) => {
                const {
                    data: { result },
                } = await Api.get<IAlertPacientResponse>(
                    `SinaisVitaisMonitoracaoGeral/HistoricoSVMPProfissionalGeral/${usertasy.cD_PESSOA_FISICA},${moment().format(
                        'YYYY-MM-DD',
                    )},${moment().format('YYYY-MM-DD')}?pagina=1&rows=100`, { signal }
                );
                return result;
            },
            {
                enabled: true,
                onError: () => {
                    addAlert({
                        message: 'Não foi possivel acessar o histórico tente mais tarde!',
                        status: 'error',
                    });
                }
            },
        );
    };

    const ValidationAutorizeEnfermagem = useCallback(() => {
        return PerfisSinaisVitaisEnfermagem?.some(
            (element: IPerfisLiberados) => {
                return (
                    element.cD_PERFIL === stateAuth.PerfilSelected?.cD_PERFIL
                );
            },
        );
    }, [PerfisSinaisVitaisEnfermagem, stateAuth.PerfilSelected]);

    const ValidationAutorizeTriagem = useCallback(() => {
        const result = PerfisSinaisVitaisTriagem?.some(
            (element: IPerfisLiberados) => {
                return (
                    element.cD_PERFIL === stateAuth.PerfilSelected?.cD_PERFIL
                );
            },
        );

        if (result) {
            return result;
        } else {
            return false;
        }
    }, [PerfisSinaisVitaisTriagem, stateAuth.PerfilSelected]);

    useEffect(() => {
        if (usertasy.cD_PESSOA_FISICA) {
            GetAllSinaisVitais();
        }
    }, [GetAllSinaisVitais, usertasy]);

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
                ValidationAutorizeEnfermagem,
                InativarSinaisVitais,
                ValidationAutorizeTriagem,
                useAlerts,
                useHistoryAlerts,
            }}>
            {children}
        </SinaisVitaisContext.Provider>
    );
};

export default SinaisVitaisContext;
