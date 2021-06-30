import React, { useState, useEffect, useContext } from 'react';
import { View, SafeAreaView, FlatList, Pressable, Text, ScrollView, TouchableOpacity } from 'react-native';
import SearchBar from 'react-native-dynamic-search-bar';
import styles from './style';
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import LoadingBall from '../../components/Loading/LoadingBall';
import SlideRanger from '../../components/Slider/SlideRanger';
import BtnCentered from '../../components/buttons/BtnCentered';
import Api from '../../services/api';
import moment from 'moment';
import AuthContext from '../../contexts/auth';
import ErrorContext from '../../contexts/errorNotification';
import Loading from '../../componentes/Loading';
import ModalCentralizedOptions from '../../components/Modais/ModalCentralizedOptions';
import HistorySvg from '../../assets/svg/historico.svg';
import { useNavigation } from '@react-navigation/native';

export interface SinaisVitais {
    iE_PRESSAO: string,
    iE_MEMBRO: string,
    iE_MANGUITO: string,
    iE_APARELHO_PA: string,
    iE_COND_SAT_O2: string,
    iE_MEMBRO_SAT_O2: string,
    iE_RITMO_ECG: string,
    iE_DECUBITO: string,
    iE_UNID_MED_PESO: string,
    iE_UNID_MED_ALTURA: string,
    cD_PACIENTE: string,
    cD_PESSOA_FISICA: string,
    qT_SATURACAO_O2: number,
    qT_TEMP: number,
    qT_PESO: number,
    qT_ALTURA_CM: number,
    iE_SITUACAO: string,
    nM_USUARIO: string
}
 
export interface PessoaSelected {
    cD_PESSOA_FISICA: string;
    nM_PESSOA_FISICA: string;
    dT_NASCIMENTO: string;
}

interface Consulta {
    query: string,
    isLoading: boolean,
    refreshing: boolean,
    dataBackup: PessoaSelected[],
    dataSource: PessoaSelected[],
    spinnerVisibility: boolean,
}

const sinaisVitaisDefault: SinaisVitais = {
    iE_PRESSAO: 'D',
    iE_MEMBRO: 'MSE',
    iE_MANGUITO: 'C',
    iE_APARELHO_PA: 'C',
    iE_COND_SAT_O2: "AA",
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
    iE_SITUACAO: '',
    nM_USUARIO: ''
}

const sinaisVitais: React.FC = (props) => {

    const navigation = useNavigation();
    const { stateAuth: { usertasy } } = useContext(AuthContext);
    const { addNotification } = useContext(ErrorContext);

    const [state, setState] = useState<Consulta>({
        query: '',
        isLoading: true,
        refreshing: false,
        dataBackup: [],
        dataSource: [],
        spinnerVisibility: false,
    });

    const [activeBall, setActiveBall] = useState<boolean>(false);
    const [activeModal, setActiveModal] = useState<boolean>(false);
    const [activeModalOptions, setActiveModalOptions] = useState<boolean>(false);
    const [selected, setSelected] = useState<PessoaSelected>();
    const [atendimento, setAtendimento] = useState<SinaisVitais | null>(null);

    const [Peso, setPeso] = useState(0);
    const [Altura, setAltura] = useState(0);
    const [temperatura, setTemperatura] = useState(0);
    const [oxigenacao, setOxigenacao] = useState(0);

    const Search = async (nome: string) => {
        setSelected(undefined);
        setAtendimento(null);
        setState((prevState) => { return { ...prevState, spinnerVisibility: true }});
        try {
            const { data: { result } } = await Api.get(`PessoaFisica/FiltrarPFdadosReduzidos/${nome}`);
            setState(prevState => { return { ...prevState, spinnerVisibility: false, dataSource: result } });
        } catch (error) {
            setState(prevState => { return { ...prevState, spinnerVisibility: false } });
            addNotification({ message: "Não foi possivel realizar a consulta, tente mais tarde!", status: 'error' });
            console.log(error);
        }
    }

    const SearchAtendimentos = async (item: PessoaSelected) => {
        setActiveBall(true);
        setSelected(item);
        setState(prevState => { return { ...prevState, dataSource: [] } });
        try {
            const { data: { result } } = await Api.get(`SinaisVitaisMonitoracaoGeral/RecuperaDadosRecentesSVMG/${item.cD_PESSOA_FISICA}`);
            if (result) {
                setAtendimento(result);
            } else {
                resetValores();
                setAtendimento(sinaisVitaisDefault);
            }
            setActiveBall(false);
        } catch (error) {
            addNotification({ message: "Não foi possivel realizar a consulta, tente mais tarde!", status: 'error' });
            setActiveBall(false);
            console.log(error);
        }
    }

    const AddSinaisVitais = async () => {
        setActiveModal(true);
        Api.post<SinaisVitais>('SinaisVitaisMonitoracaoGeral', {
            iE_PRESSAO: atendimento?.iE_PRESSAO,
            iE_MEMBRO: atendimento?.iE_MEMBRO,
            iE_MANGUITO: atendimento?.iE_MANGUITO,
            iE_APARELHO_PA: atendimento?.iE_APARELHO_PA,
            cD_PACIENTE: atendimento?.cD_PACIENTE ?? selected?.cD_PESSOA_FISICA,
            cD_PESSOA_FISICA: usertasy.cD_PESSOA_FISICA,
            qT_SATURACAO_O2: oxigenacao,
            iE_COND_SAT_O2: atendimento?.iE_COND_SAT_O2 ?? "AA",
            iE_MEMBRO_SAT_O2: atendimento?.iE_MEMBRO_SAT_O2,
            iE_RITMO_ECG: atendimento?.iE_RITMO_ECG,
            iE_DECUBITO: atendimento?.iE_DECUBITO,
            qT_TEMP: temperatura,
            qT_PESO: Peso,
            iE_UNID_MED_PESO: atendimento?.iE_UNID_MED_PESO,
            qT_ALTURA_CM: Altura,
            iE_UNID_MED_ALTURA: atendimento?.iE_UNID_MED_ALTURA,
            iE_SITUACAO: atendimento?.iE_SITUACAO,
            nM_USUARIO: usertasy.usuariO_FUNCIONARIO[0]?.nM_USUARIO
        }).then(response => {
            setActiveModal(false);
            Onclean();
            addNotification({ message: "Dados atualizados com sucesso!", status: 'sucess' });
        }).catch(error => {
            setActiveModal(false);
            addNotification({ message: "Não foi possivel atualizar tente mais tarde!", status: 'error'});
        })
    }

    const autoSet = (dadosAtendimento: SinaisVitais | null) => {
        if (dadosAtendimento) {
            dadosAtendimento.qT_ALTURA_CM && setAltura(dadosAtendimento?.qT_ALTURA_CM);
            dadosAtendimento.qT_PESO && setPeso(dadosAtendimento?.qT_PESO);
            dadosAtendimento.qT_TEMP && setTemperatura(dadosAtendimento?.qT_TEMP);
            dadosAtendimento.qT_SATURACAO_O2 && setOxigenacao(dadosAtendimento?.qT_SATURACAO_O2);
        }
    }

    const ChangerProperty = () => {

        let x = false;

        x = atendimento?.qT_ALTURA_CM === Altura && atendimento?.qT_PESO === Peso && atendimento?.qT_SATURACAO_O2 === oxigenacao && atendimento?.qT_TEMP === temperatura

        return x;
    }

    const resetValores = () => {
        setPeso(0);
        setAltura(0);
        setOxigenacao(0);
        setTemperatura(0);
    }

    useEffect(() => {
        autoSet(atendimento);
    }, [atendimento])

    const Onclean = () => {
        setSelected(undefined);
        setAtendimento(null);
        setState(prevState => {
            return { ...prevState, spinnerVisibility: false, dataSource: [] }
        });
    }

    const Item = ({ title }: { title: PessoaSelected}) => {
        return (
            <Pressable key={title.nM_PESSOA_FISICA} style={styles.item} onPress={() => SearchAtendimentos(title)}>
                <Text style={styles.descricao}>{`${title.nM_PESSOA_FISICA.toUpperCase()}`}</Text>
            </Pressable>
        )
    }

    const renderItem = ({ item }: { item: PessoaSelected}) => (
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
                        selectionColor='#fff'
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
                            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('historySinaisVitais', selected)}>
                                <HistorySvg width={RFPercentage(5)} height={RFPercentage(5)}>Botão</HistorySvg>
                            </TouchableOpacity>
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
                                    step={0.1}
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
                                    valueMin={30}
                                    valueMax={42}
                                    valueRanger={temperatura}
                                    setValueRanger={setTemperatura}
                                />
                            </View>
                            <View style={styles.item2}>
                                <SlideRanger
                                    label={"Oximetria"}
                                    medida={'SpO²'}
                                    step={1}
                                    valueMin={50}
                                    valueMax={100}
                                    valueRanger={oxigenacao}
                                    setValueRanger={setOxigenacao}
                                />
                            </View>
                            <View style={styles.item3}>
                                {selected &&
                                    <BtnCentered SizeText={18} labelBtn={"Adicionar"} onPress={() => setActiveModalOptions(true)} enabled={ChangerProperty()} />
                                }
                            </View>
                        </>
                    }
                    <LoadingBall active={!atendimento && !!selected} />
                </ScrollView>
            </View>
            <Loading activeModal={activeModal} />
            <ModalCentralizedOptions activeModal={activeModalOptions} message={"Deseja adicionar os Sinais Vitais ?"} onpress={() => AddSinaisVitais()} setActiveModal={setActiveModalOptions} />
        </SafeAreaView>
    )
}

export default sinaisVitais;
