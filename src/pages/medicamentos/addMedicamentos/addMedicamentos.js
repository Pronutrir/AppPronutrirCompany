import React, { useState, useEffect, useContext } from 'react'
import {
    Text,
    View,
    TextInput,
    Pressable,
    FlatList,
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
import ErrorContext from '../../../contexts/errorNotification';
import Loading from '../../../componentes/Loading';
import Notification from '../../../componentes/Notification';

export default function AddMedicamento({ navigation }) {

    const { addError } = useContext(ErrorContext);
    const { postMedicamento, getCalendarioMedicamentos } = useContext(MedicamentosContext);

    const [medicamentoSelected, setMedicamentoSelected] = useState();
    const [selectedIntervalo, setSelectedIntervalo] = useState({ id: 'AGO', name: 'Selecione o Intervalo' });
    const [selectedDuracao, setSelectedDuracao] = useState({ numero_Dias: '', duracao: '', semana_dias: [] });
    const [selectedDias, setSelectedDias] = useState();
    const [activeLoad, setActiveLoad] = useState(false);

    const [modalNotification, setModalNotification] = useState({
        active: false,
        message: '',
        type: ''
    });

    const [medicamentos, setMedicamentos] = useState({
        data: [],
        page: 1,
        page_size: 20,
        loading: false,
        continue: true
    });
    const [inputValue, setInputValue] = useState('');

    const pesquisa_increment = (data) => {
        setInputValue(text);
        if (inputValue.length >= 4 && medicamentos.continue) {
            ApiInterageMd.get(`medicamentos/?search=${text}&&page=${medicamentos.page}&&page_size=${medicamentos.page_size}`).then(response => {
                const { results } = response.data;
                setMedicamentos({
                    ...medicamentos,
                    data: increment ? [...medicamentos.data, ...results] : results,
                    page: medicamentos.page + 1,
                    loading: false,
                    continue: !(results.length < medicamentos.page_size)
                })
            }).catch(error => {
                addError(`Não foi possivel acessar os medicamentos! tente mais tarde - ${error.message}`);
            })
        } else {
            increment ?
                setMedicamentos({ ...medicamentos })
                :
                setMedicamentos({ ...medicamentos, data: [], continue: true })
        }
    }

    const searchMedicamentos = (text) => {

        setInputValue(text);

        if (text.length >= 4) {
            ApiInterageMd.get(`medicamentos/?search=${text}`).then(response => {
                const { results } = response.data;
                setMedicamentos({
                    ...medicamentos,
                    data: results,
                })
            }).catch(error => {
                addError(`Não foi possivel acessar os medicamentos! tente mais tarde - ${error.message}`);
            })
        } else {
            setMedicamentos({ ...medicamentos, data: [] })
        }
    }

    const AddMedicamento = (medicamento) => {
        setInputValue("");
        setMedicamentos({ ...medicamentos, data: [] });
        setMedicamentoSelected(medicamento);
    }

    const RemoverMedicamento = () => {
        setMedicamentoSelected();
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
            await postMedicamento(medicamentoSelected, selectedIntervalo, selectedDuracao);
            navigation.navigate('Medicamentos');
        } catch (error) {
            setModalNotification(prevState => {
                return { ...prevState, active: true, message: "Algo deu errado tente mais tarde.", type: 'error' }
            });
        }finally{
            setActiveLoad(false);
        }
    }

    useEffect(() => {
        setSelectedIntervalo({ id: 'AGO', name: 'Selecione o Intervalo' });
    }, [medicamentoSelected])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.box1}>
                <TextInput
                    value={inputValue}
                    autoCapitalize={'none'}
                    style={styles.input}
                    onChangeText={text => searchMedicamentos(text, false)}
                    placeholder={'Pesquisar Medicamento'}
                />
            </View>
            {(medicamentos.data.length >= 0 && inputValue.length > 4) &&
                <View on style={styles.containerAutoComplete}>
                    <FlatList
                        style={styles.AutoComplete}
                        data={medicamentos.data}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        ListEmptyComponent={renderEmpty}
                        //ListFooterComponent={renderFooter}
                        //onEndReachedThreshold={0.1}
                        //onEndReached={() => searchMedicamentos(inputValue, true)}
                    />
                </View>
            }
            <ScrollView style={styles.box2}>
                {
                    medicamentoSelected &&
                    <>
                        <ShowHideMedicamentos item={medicamentoSelected} />
                        <ShowHideLembretes selectedIntervalo={selectedIntervalo} setSelectedIntervalo={setSelectedIntervalo} />
                    </>
                }
                {
                    selectedIntervalo.date &&
                    <>
                        {
                            selectedIntervalo.id !== '1º D' &&
                            <ShowHideAgendamento selectedDuracao={selectedDuracao} setSelectedDuracao={setSelectedDuracao} setSelectedDias={setSelectedDias} />
                        }
                        <MyButtom valueText={"Adicionar"} fontSize={18} onPress={() => incluirMedicamento()} />
                    </>
                }
            </ScrollView>
            <Loading activeModal={activeLoad}/>
            <Notification
                active={modalNotification.active}
                setActive={setModalNotification}
                type={modalNotification.type}
                message={modalNotification.message}
            />
        </SafeAreaView>
    )
}
