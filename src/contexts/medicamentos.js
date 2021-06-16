import React, { createContext, useState, useEffect, useReducer, useContext } from 'react';
import { initialStateMedicamentos, MedicamentosReducer } from '../reducers/MedicamentosReducer';
import AuthContext from './auth';
import moment from 'moment';
import Api from '../services/api';
import ErrorContext from '../contexts/errorNotification';
import OneSignal from 'react-native-onesignal';

const MedicamentosContext = createContext();

export const MedicamentosProvider = ({ children }) => {

    const { addError } = useContext(ErrorContext);
    const { stateAuth } = useContext(AuthContext);
    const { usertasy } = stateAuth;

    const [stateMedicamentos, dispatchMedicamentos] = useReducer(MedicamentosReducer, initialStateMedicamentos);
    const [datasResult, setDatasResult] = useState("");
    const [datas, setDatas] = useState([]);
    const [indexInitial, setIndexInitial] = useState();
    const [activeLoading, setActiveLoading] = useState(false);

    const getDatas = async () => {
        var dateArray = [];
        var currentDate = moment().subtract(1, 'M');
        var stopDate = moment().add(1, 'M');
        while (currentDate <= stopDate) {
            dateArray.push({ dia_semana: moment(currentDate).format('YYYY-MM-DD') })
            currentDate = moment(currentDate).add(1, 'days');
        }
        setDatas(dateArray);
        return dateArray;
    }

    const GetMedicamentos = async () => {
        var dataInitial = moment().subtract(1, 'M').format('YYYY-MM-DD');
        var dataFinal = moment().add(1, 'M').format('YYYY-MM-DD');
        return Api.get(`MedicamentoUsoPaciente/ListarMedicamentosPorPacientes/${usertasy.nR_CPF}?dataInicio=${dataInitial}&dataFinal=${dataFinal}`).then(response => {
            const { result } = response.data;
            dispatchMedicamentos({ type: 'setMedicamentos', medicamentos: result })
            return result;
        }).catch(error => {
            addError(`Não foi possivel acessar os medicamentos tente mais tarde - ${error.message}`);
        });
    }

    const postMedicamento = async (medicamentoSelected, selectedIntervalo, selectedDuracao) => {

        selectedIntervalo.id === '1º D' && (selectedDuracao.numero_Dias = 0);

        const concat_horarios = concatIntervalo(selectedIntervalo.date);
        const concat_diasSemana = concatDiasSemana(selectedDuracao.semana_dias);
        const dataFinal = selecteDateEnd(selectedDuracao);

        await Api.post('MedicamentoUsoPaciente/RegistrarMedicamentoUsoPaciente', {
            cD_PESSOA_FISICA: usertasy.cD_PESSOA_FISICA,
            nM_USUARIO: 'AppMobile',
            dT_REGISTRO: moment().format(),
            dT_ATUALIZACAO: moment().format(),
            dS_MEDICAMENTO: medicamentoSelected.produto,
            nR_CPF: usertasy.nR_CPF,
            qT_DOSE: selectedIntervalo.valueDose,
            cD_UNID_MED: selectedIntervalo.tipoDose.id,
            //iE_VIA_APLICACAO: "string",
            cD_INTERVALO: selectedIntervalo.id,
            dS_INTERVALO_ITEM: concat_diasSemana,
            dS_HORARIOS: concat_horarios,
            dT_INICIO: moment(selectedDuracao.data_initial).format(),
            dT_FIM: dataFinal,
            //dT_ULTIMA_DOSE: "2021-05-24T19:55:14.536Z",
            dS_REACAO: "reação app mobile",
            dS_OBSERVACAO: "observação app mobile"
        });
        await getCalendarioMedicamentos();
    }

    const putMedicamento = async (medicamentoSelected, selectedIntervalo, selectedDuracao) => {

        selectedIntervalo.id === '1º D' && (selectedDuracao.numero_Dias = 0);

        const concat_horarios = concatIntervalo(selectedIntervalo.date);
        const concat_diasSemana = concatDiasSemana(selectedDuracao.semana_dias);
        const dataFinal = selecteDateEnd(selectedDuracao);

        await Api.put(`MedicamentoUsoPaciente/AtualizarMedicamentoUsoPaciente/${medicamentoSelected.nR_SEQUENCIA}`, {
            cD_PESSOA_FISICA: usertasy.cD_PESSOA_FISICA,
            nM_USUARIO: 'AppMobile',
            dT_ATUALIZACAO: moment().format(),
            dS_MEDICAMENTO: medicamentoSelected.dS_MEDICAMENTO,
            nR_CPF: usertasy.nR_CPF,
            qT_DOSE: selectedIntervalo.valueDose,
            cD_UNID_MED: selectedIntervalo.tipoDose.id,
            //iE_VIA_APLICACAO: "string",
            cD_INTERVALO: selectedIntervalo.id,
            dS_INTERVALO_ITEM: concat_diasSemana,
            dS_HORARIOS: concat_horarios,
            dT_INICIO: moment(selectedDuracao.data_initial).format(),
            dT_FIM: dataFinal,
            //dT_ULTIMA_DOSE: "2021-05-24T19:55:14.536Z",
            dS_REACAO: "reação app mobile",
            dS_OBSERVACAO: "observação app mobile"
        });
        await getCalendarioMedicamentos();
    }

    const deleteMedicamento = async (id) => {
        setActiveLoading(true);
        try {
            await Api.delete(`MedicamentoUsoPaciente/RemoverMedicamentoUsoPaciente/${id}`);
            await getCalendarioMedicamentos();
            setActiveLoading(false);
        } catch (error) {
            setActiveLoading(false);
            addError(`Não foi possivel remover o medicamento tente mais tarde - ${error.message}`);
        }
    }

    const scrollToIndexInitial = async (arrayDatas) => {
        var index = arrayDatas.findIndex((item) => {
            if (item.dia_semana == moment().format('YYYY-MM-DD')) {
                return item;
            }
        })
        setIndexInitial(index);
    }

    const listaFinal = async (listDatas, listMedicamentos) => {
        var arrayCalendario = [];
        var caledarioResult = listDatas;
        var listDatasLength = listDatas.length - 1;
        if (listMedicamentos) {
            listMedicamentos.map(item => {
                var currentDate = moment(item.dT_INICIO).format('YYYY-MM-DD');
                var stopDate = item.dT_FIM ? moment(item.dT_FIM).format('YYYY-MM-DD') : moment(listDatas[listDatasLength].dia_semana).format('YYYY-MM-DD');
                while (currentDate <= stopDate) {
                    arrayCalendario.push({ ...item, data: moment(currentDate).format('YYYY-MM-DD') });
                    currentDate = moment(currentDate).add(1, 'days').format('YYYY-MM-DD');
                }
            });

            const resultado = caledarioResult.map(item => {
                const filterMedicamentos = (element) => {

                    if (element.dS_INTERVALO_ITEM) {

                        var diasSemana = moment(item.dia_semana).format('dddd');
                        var intervalo = element.dS_INTERVALO_ITEM.toLowerCase();

                        if (element.data === item.dia_semana && intervalo.includes(diasSemana)) {
                            return { dia_semana: item.dia_semana, ...element }
                        }
                    } else {
                        if (element.data === item.dia_semana) {
                            return { dia_semana: item.dia_semana, ...element }
                        }
                    }
                }
                return { ...item, dados: arrayCalendario.filter(filterMedicamentos) }
            })
            scrollToIndexInitial(resultado);
            return resultado;
        } else {
            scrollToIndexInitial(listDatas);
            return listDatas;
        }
    }

    const concatIntervalo = (horarios) => {
        if (Array.isArray(horarios)) {
            var concat_horarios = horarios.map((element) => (
                moment(element).format('LT')
            )).join(',')

            return concat_horarios;
        } else {
            return null;
        }
    }

    const concatDiasSemana = (diasSemana) => {
        if (Array.isArray(diasSemana)) {
            var concatDiasSemana = diasSemana.map((element) => (
                element.dia
            )).join(',')
            return concatDiasSemana;
        } else {
            return null
        }
    }

    const selecteDateEnd = (duracao) => {
        if (duracao.numero_Dias && duracao.numero_Dias != 0) {
            return moment().add(duracao.numero_Dias, 'days').format();
        } else if (duracao.numero_Dias === 0) {
            return moment().format();
        } else {
            return null;
        }
    }

    const getCalendarioMedicamentos = async () => {
        setDatasResult(null);
        const listMedicamentos = await GetMedicamentos();
        const result = await listaFinal(datas, listMedicamentos);
        if(result){
            OneSignal.sendTags({ teste: 'Medicamentos', topic: 'tags' });
        }
        setDatasResult(result);
    }

    useEffect(() => {
        (async () => {
            await getDatas();
        })()
    }, [])

    return (
        <MedicamentosContext.Provider
            value={{
                datasResult,
                datas,
                getCalendarioMedicamentos,
                postMedicamento,
                deleteMedicamento,
                indexInitial,
                stateMedicamentos,
                dispatchMedicamentos,
                activeLoading,
                putMedicamento
            }}>
            {children}
        </MedicamentosContext.Provider>
    )
};

export default MedicamentosContext;
