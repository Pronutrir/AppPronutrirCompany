import React, { useState, useEffect, useContext } from 'react';
import { View, SafeAreaView, FlatList, Pressable, Text, ScrollView } from 'react-native';
import SearchBar from 'react-native-dynamic-search-bar';
import styles from './style';
import { RFValue } from "react-native-responsive-fontsize";
import MyLoadingBall from '../../componentes/MyLoadingBall';
import SlideRanger from '../../components/Slider/SlideRanger';
import BtnCentered from '../../components/buttons/BtnCentered';
import Api from '../../services/api';
import moment from 'moment';
import AuthContext from '../../contexts/auth';
import ErrorContext from '../../contexts/errorNotification';
import Loading from '../../componentes/Loading';
import Notification from '../../componentes/Notification';

const sinaisVitais = () => {

    const { stateAuth: { usertasy } } = useContext(AuthContext);
    const { addNotification } = useContext(ErrorContext);

    const [state, setState] = useState({
        query: "",
        isLoading: true,
        refreshing: false,
        dataBackup: [],
        dataSource: [],
        spinnerVisibility: false,
    });

    const [modalNotification, setModalNotification] = useState({
        active: false,
        message: '',
        type: ''
    });

    const [activeBall, setActiveBall] = useState(false);
    const [activeModal, setActiveModal] = useState(false);
    const [selected, setSelected] = useState();
    const [atendimento, setAtendimento] = useState();

    const [Peso, setPeso] = useState(0);
    const [Altura, setAltura] = useState(0);
    const [temperatura, setTemperatura] = useState(0);
    const [oxigenacao, setOxigenacao] = useState(0);

    const Search = async (nome) => {
        setSelected();
        setAtendimento();
        setState(prevState => { return { ...prevState, spinnerVisibility: true } });
        try {
            const { data: { result } } = await Api.get(`PessoaFisica/filtroPessoas/${nome}`);
            setState(prevState => { return { ...prevState, spinnerVisibility: false, dataSource: result } });
        } catch (error) {
            console.log(error);
        }
    }

    const SearchAtendimentos = async (item) => {
        setActiveBall(true);
        setSelected(item);
        setState(prevState => { return { ...prevState, dataSource: [] } });
        try {
            const { data: { result } } = await Api.get(`SinaisVitaisMonitoracaoGeral/RecuperaDadosRecentesSVMG/${item.cD_PESSOA_FISICA}`);
            setAtendimento(result);
            setActiveBall(false);
        } catch (error) {
            console.log(error);
        }
    }

    const AddSinaisVitais = async () => {
        setActiveModal(true);
        Api.post('SinaisVitaisMonitoracaoGeral', {
            iE_PRESSAO: atendimento.iE_PRESSAO,
            iE_MEMBRO: atendimento.iE_MEMBRO,
            iE_MANGUITO: atendimento.iE_MANGUITO,
            iE_APARELHO_PA: atendimento.iE_APARELHO_PA,
            cD_PACIENTE: atendimento.cD_PACIENTE,
            cD_PESSOA_FISICA: atendimento.cD_PESSOA_FISICA,
            qT_SATURACAO_O2: oxigenacao,
            iE_COND_SAT_O2: atendimento?.iE_COND_SAT_O2 ?? "AA",
            iE_MEMBRO_SAT_O2: atendimento.iE_MEMBRO_SAT_O2,
            iE_RITMO_ECG: atendimento.iE_RITMO_ECG,
            iE_DECUBITO: atendimento.iE_DECUBITO,
            qT_TEMP: temperatura,
            qT_PESO: Peso,
            iE_UNID_MED_PESO: atendimento.iE_UNID_MED_PESO,
            qT_ALTURA_CM: Altura,
            iE_UNID_MED_ALTURA: atendimento.iE_UNID_MED_ALTURA,
            iE_SITUACAO: atendimento.iE_SITUACAO,
            nM_USUARIO: usertasy.usuariO_FUNCIONARIO[0]?.nM_USUARIO
        }).then(response =>{
            setActiveModal(false);
            addNotification("Dados atualizados com sucesso !", 'success');
        }).catch(error => {
            setActiveModal(false);
            addNotification("Dados atualizados com sucesso !", 'success');
        })
    }

    const UpdateSinaisVitais = async () =>{
        await AddSinaisVitais();
    }

    const autoSet = (dadosAtendimento) => {
        if (dadosAtendimento) {
            dadosAtendimento.qT_ALTURA_CM && setAltura(dadosAtendimento?.qT_ALTURA_CM);
            dadosAtendimento.qT_PESO && setPeso(dadosAtendimento?.qT_PESO);
            dadosAtendimento.qT_TEMP && setTemperatura(dadosAtendimento?.qT_TEMP);
            dadosAtendimento.qT_SATURACAO_O2 && setOxigenacao(dadosAtendimento?.qT_SATURACAO_O2);
        }
    }

    useEffect(() => {
        autoSet(atendimento)
    }, [atendimento])

    const Onclean = () => {
        setSelected();
        setAtendimento();
        setState(prevState => {
            return { ...prevState, spinnerVisibility: false }
        });
    }

    const Item = ({ title }) => {
        return (
            <Pressable key={title.cD_PESSOA_FISICA} style={styles.item} onPress={() => SearchAtendimentos(title)}>
                <Text style={styles.descricao}>{`${title.nM_PESSOA_FISICA.toUpperCase()}`}</Text>
            </Pressable>
        )
    }

    const renderItem = ({ item }) => (
        <Item title={item} />
    );

    return (
        <SafeAreaView style={styles.safeAreaViewStyle}>
            <View style={styles.SearchBarBoxStyle}>
                <View style={styles.box1}>
                    <SearchBar
                        darkMode
                        placeholder="Pesquisar"
                        spinnerVisibility={state.spinnerVisibility}
                        style={styles.SearchBarStyle}
                        textInputStyle={styles.textInputStyle}
                        spinnerSize={RFValue(20, 680)}
                        clearIconImageStyle={styles.clearIconImageStyle}
                        searchIconImageStyle={styles.searchIconImageStyle}
                        onChangeText={(text) => text.length > 4 ? Search(text) : setState(prevState => { return { ...prevState, spinnerVisibility: false } })}
                        onClearPress={() => Onclean()}
                    />
                    {
                        state.dataSource.length > 0 &&
                        <View style={styles.containerAutoComplete}>
                            <FlatList
                                data={state.dataSource}
                                renderItem={renderItem}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                    }
                </View>
                <ScrollView style={styles.box2}>
                    {
                        selected &&
                        <View style={styles.item1}>
                            <View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.label}>Nome: </Text>
                                    <Text style={styles.text}>{selected.nM_PESSOA_FISICA}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.label}>Nascimento: </Text>
                                    <Text style={styles.text}>{moment(selected.dT_NASCIMENTO).format('DD-MM-YYYY')}</Text>
                                </View>
                            </View>
                        </View>
                    }
                    {
                        atendimento &&
                        <>
                            <View style={styles.item2}>
                                <SlideRanger
                                    label={"Altura"}
                                    medida={'cm'}
                                    step={1}
                                    valueMin={0}
                                    valueMax={300}
                                    valueRanger={Altura}
                                    setValueRanger={setAltura}
                                />
                            </View>
                            <View style={styles.item2}>
                                <SlideRanger
                                    label={"Peso"}
                                    medida={'kg'}
                                    step={1}
                                    valueMin={0}
                                    valueMax={200}
                                    valueRanger={Peso}
                                    setValueRanger={setPeso}
                                />
                            </View>
                            <View style={styles.item2}>
                                <SlideRanger
                                    label={"Temperatura"}
                                    medida={'°C'}
                                    step={0.1}
                                    valueMin={0}
                                    valueMax={45}
                                    valueRanger={temperatura}
                                    setValueRanger={setTemperatura}
                                />
                            </View>
                            <View style={styles.item2}>
                                <SlideRanger
                                    label={"Oxigênio"}
                                    medida={'SpO²'}
                                    step={1}
                                    valueMin={0}
                                    valueMax={100}
                                    valueRanger={oxigenacao}
                                    setValueRanger={setOxigenacao}
                                />
                            </View>
                            <View style={styles.item3}>
                                {selected &&
                                    <BtnCentered labelBtn={"Adicionar"} onPress={() => AddSinaisVitais()} />
                                }
                            </View>
                        </>
                    }
                    {
                        (!atendimento && selected) &&
                        <MyLoadingBall />
                    }
                </ScrollView>
            </View>
            <Loading activeModal={activeModal}/>
            <Notification
                active={modalNotification.active}
                setActive={setModalNotification}
                type={modalNotification.type}
                message={modalNotification.message}
            />
        </SafeAreaView>
    )
}

export default sinaisVitais
