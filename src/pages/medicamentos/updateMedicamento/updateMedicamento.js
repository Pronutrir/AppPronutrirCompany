import React, { useState, useEffect, useContext } from 'react'
import {
    Text,
    View,
    Pressable,
    SafeAreaView,
    ScrollView
} from 'react-native';

import ApiInterageMd from '../../../services/apiInterageMedicamentos';
import ShowHideMedicamentos from '../../../componentes/TouchableShowHideMedicamentos';
import ShowHideLembretes from '../../../componentes/TouchableShowHideLembretes';
import ShowHideAgendamento from '../../../componentes/TouchableShowHideAgendamentos';
import styles from './styles';
import { ConversorMedicamento } from '../../../services/conversorUnidadeMedicamento';
import MyButtom from '../../../componentes/MyButtom';
import MedicamentosContext from '../../../contexts/medicamentos';
import Loading from '../../../componentes/Loading';
import Notification from '../../../componentes/Notification';
import moment from 'moment';

export default function updateMedicamento({ navigation, route }) {

    const medicamentoSelected = route.params;

    const { putMedicamento } = useContext(MedicamentosContext);

    //const [medicamentoSelected, setMedicamentoSelected] = useState();
    const [selectedIntervalo, setSelectedIntervalo] = useState({ id: 'AGO', name: 'Selecione o Intervalo' });
    const [selectedDuracao, setSelectedDuracao] = useState({ numero_Dias: '', duracao: '', semana_dias: "", data_initial: medicamentoSelected.dT_INICIO });
    const [selectedDias, setSelectedDias] = useState();
    const [activeLoad, setActiveLoad] = useState(false);

    const [modalNotification, setModalNotification] = useState({
        active: false,
        message: '',
        type: ''
    });

    const AddMedicamento = (medicamento) => {
        setInputValue("");
        setMedicamentos({ ...medicamentos, data: [] });
        setMedicamentoSelected(medicamento);
    }

    const addIntervalo = (item) => {
        if (item.id === medicamentoSelected.cD_INTERVALO && item.flag) {
            var horarios = medicamentoSelected.dS_HORARIOS.split(',');
            item.date = horarios.map(element => moment(element, "hh:mm:ss").format());
        }
        setSelectedIntervalo(item);
    }

    const Item = ({ title }) => {
        return (
            <Pressable key={title.registro} style={styles.item} onPress={() => AddMedicamento(title)}>
                <Text style={styles.title}>{`${title.produto.toUpperCase()}`}</Text>
                {
                    <View>
                        <Text style={styles.descricao}>
                            {
                                title.substancias.map((item, index) => {
                                    const itemLength = title.substancias.length
                                    return `${item} ${(itemLength > 1 && index != itemLength - 1) ? ' + ' : ''}`
                                })
                            }
                        </Text>
                        <Text style={styles.apresentacao}>
                            {ConversorMedicamento(title.apresentacao)}
                        </Text>
                    </View>
                }
            </Pressable>
        )
    }

    const renderItem = ({ item }) => (
        <Item key={item.registro} title={item} />
    );

    const renderEmpty = () => (
        <View style={[styles.item, { alignItems: 'center', justifyContent: 'center' }]}>
            <Text style={styles.descricao}>Nenhum Item Encontrado!</Text>
        </View>
    )

    const renderFooter = () => (
        <View style={[styles.item, { alignItems: 'center', justifyContent: 'center' }]}>
            <Text style={styles.descricao}>Nenhum Item Encontrado!</Text>
        </View>
    )

    const incluirMedicamento = async () => {
        setActiveLoad(true);
        try {
            await putMedicamento(medicamentoSelected, selectedIntervalo, selectedDuracao);
            navigation.navigate('Medicamentos');
        } catch (error) {
            setModalNotification(prevState => {
                return { ...prevState, active: true, message: "Algo deu errado tente mais tarde.", type: 'error' }
            });
        } finally {
            setActiveLoad(false);
        }
    }

    const getQuantidadeDias = (inicioDate, fimDate) => {
        var inicio = moment(inicioDate, "YYYY/MM/DD");
        var fim = moment(fimDate, "YYYY/MM/DD");
        var dias = fim.diff(inicio, 'days');
        setSelectedDuracao({...selectedDuracao, numero_Dias: dias})
    }

    const getSemanaDias = (item) => {

        const DiasSemana = [
            { id: 1, dia: 'Segunda-feira' },
            { id: 2, dia: 'Terça-feira' },
            { id: 3, dia: 'Quarta-feira' },
            { id: 4, dia: 'Quinta-feira' },
            { id: 5, dia: 'Sexta-feira' },
            { id: 6, dia: 'Sábado' },
            { id: 7, dia: 'Domingo' },
        ]

        var _DiasSemana = DiasSemana.filter(element => item.includes(element.dia));

        setSelectedDuracao({...selectedDuracao, semana_dias: _DiasSemana});
    }

    useEffect(() => {
        if(medicamentoSelected.dT_FIM){
            getQuantidadeDias(moment(medicamentoSelected.dT_INICIO).format('YYYY/MM/DD') , moment(medicamentoSelected.dT_FIM).format('YYYY/MM/DD'));
        }
        if(medicamentoSelected.dS_INTERVALO_ITEM){
            getSemanaDias(medicamentoSelected.dS_INTERVALO_ITEM);
        }
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.box1}>

            </View>
            <ScrollView style={styles.box2}>
                {
                    medicamentoSelected &&
                    <>
                        <ShowHideMedicamentos item={{ produto: medicamentoSelected.dS_MEDICAMENTO }} />
                        <ShowHideLembretes
                            selectedIntervalo={selectedIntervalo}
                            setSelectedIntervalo={addIntervalo}
                            editable={true}
                            idIntervalo={medicamentoSelected.cD_INTERVALO}
                        />
                    </>
                }
                {
                    selectedIntervalo.date &&
                    <>
                        {
                            selectedIntervalo.id !== '1º D' &&
                            <ShowHideAgendamento
                                selectedDuracao={selectedDuracao}
                                setSelectedDuracao={setSelectedDuracao}
                                setSelectedDias={setSelectedDias}
                                editable={true}
                            />
                        }
                        <MyButtom valueText={"Alterar"} fontSize={22} onPress={() => incluirMedicamento()} />
                    </>
                }
            </ScrollView>
            <Loading activeModal={activeLoad} />
            <Notification
                active={modalNotification.active}
                setActive={setModalNotification}
                type={modalNotification.type}
                message={modalNotification.message}
            />
        </SafeAreaView>
    )
}
