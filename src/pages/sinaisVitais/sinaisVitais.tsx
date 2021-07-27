import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, SafeAreaView, FlatList, Pressable, Text, ScrollView, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
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
import Loading from '../../components/Loading/Loading';
import ModalCentralizedOptions from '../../components/Modais/ModalCentralizedOptions';
import HistorySvg from '../../assets/svg/historico.svg';
import { useNavigation } from '@react-navigation/native';
import EndSinaisVitais from './endSinaisVitais';
import axios, { CancelTokenSource } from 'axios';
import ApiInterageMd from '../../services/apiInterageMedicamentos';

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

export interface PessoaSelected {
    cD_PESSOA_FISICA: string;
    nM_PESSOA_FISICA: string;
    dT_NASCIMENTO: string;
}

interface Consulta {
    query: string;
    isLoading: boolean;
    refreshing: boolean;
    dataSource: PessoaSelected[];
    spinnerVisibility: boolean;
    page: number;
    loadingScrow: boolean;
    continue: boolean;
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
    iE_SITUACAO: 'A',
    dT_LIBERACAO: '',
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
        dataSource: [],
        spinnerVisibility: false,
        page: 1,
        loadingScrow: false,
        continue: true
    });

    const [activeBall, setActiveBall] = useState<boolean>(false);
    const [activeModal, setActiveModal] = useState<boolean>(false);
    const [activeModalOptions, setActiveModalOptions] = useState<boolean>(false);
    const [selected, setSelected] = useState<PessoaSelected>();
    const [atendimento, setAtendimento] = useState<SinaisVitais | null>(null);

    const [Peso, setPeso] = useState<number | null>(null);
    const [Altura, setAltura] = useState<number | null>(null);
    const [temperatura, setTemperatura] = useState<number | null>(null);
    const [oxigenacao, setOxigenacao] = useState<number | null>(null);
    const axiosSource = useRef<CancelTokenSource | null>(null);

    const Search = async (nome: string) => {

        //Check if there are any previous pending requests
        if (axiosSource != null) {
            axiosSource.current?.cancel("Operação cancelada por uma nova requisição!")
        }

        axiosSource.current = axios.CancelToken.source();

        setSelected(undefined);
        setAtendimento(null);
        setState((prevState) => { return { ...prevState, spinnerVisibility: true, query: nome, dataSource: [] } });

        await Api.get(`PessoaFisica/FiltrarPFdadosReduzidos/${nome}?rows=10`, { cancelToken: axiosSource.current.token }).then(response => {
            const { result } = response.data;
            setState(prevState => { return { ...prevState, spinnerVisibility: false, dataSource: result } });
        }).catch(error => {
            if (axios.isCancel(error)) { return };
            setState(prevState => { return { ...prevState, spinnerVisibility: false } });
            addNotification({ message: "Não foi possivel realizar a consulta, tente mais tarde!", status: 'error' });
        });
    }

    const LoadingSearch = async () => {
        if (state.continue && state.dataSource.length >= 10) {
            setState({ ...state, loadingScrow: true })
            await Api.get(`PessoaFisica/FiltrarPFdadosReduzidos/${state.query}?pagina=${state.page}&rows=10`).then(response => {
                const { result } = response.data;
                if (result && result?.length) {
                    setState(
                        prevState => {
                            return {
                                ...prevState,
                                loadingScrow: false,
                                dataSource: [...prevState.dataSource, ...result],
                                page: prevState.page + 1,
                                continue: true
                            }
                        }
                    );
                } else {
                    setState(
                        prevState => {
                            return {
                                ...prevState,
                                loadingScrow: false,
                                continue: false,
                                page: 2
                            }
                        }
                    );
                }
            }).catch(error => {
                addNotification({ message: error, status: 'error' });
            });
        } else {
            
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
        }
    }

    const AddSinaisVitais = async () => {
        setActiveModal(true);
        Api.post<SinaisVitais>('SinaisVitaisMonitoracaoGeral', {
            iE_PRESSAO: atendimento?.iE_PRESSAO,
            iE_MEMBRO: atendimento?.iE_MEMBRO,
            iE_MANGUITO: atendimento?.iE_MANGUITO,
            iE_APARELHO_PA: atendimento?.iE_APARELHO_PA,
            cD_PACIENTE: selected?.cD_PESSOA_FISICA,
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
            dT_LIBERACAO: moment().format(),
            nM_USUARIO: usertasy.usuariO_FUNCIONARIO[0]?.nM_USUARIO
        }).then(response => {
            setActiveModal(false);
            Onclean();
            addNotification({ message: "Dados atualizados com sucesso!", status: 'sucess' });
        }).catch(error => {
            setActiveModal(false);
            addNotification({ message: "Não foi possivel atualizar tente mais tarde!", status: 'error' });
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
            return { ...prevState, spinnerVisibility: false, dataSource: [], query: '' }
        });
    }

    const renderFooter = () => {
        if (!state.loadingScrow) return null;
        return (
            <View style={styles.loading}>
                <ActivityIndicator size={"small"} color={'#08948A'} />
            </View>
        );
    };

    const Item = ({ title }: { title: PessoaSelected }) => {
        return (
            <Pressable key={title.nM_PESSOA_FISICA} style={styles.item} onPress={() => SearchAtendimentos(title)}>
                <Text style={styles.descricao}>{`${title.nM_PESSOA_FISICA.toUpperCase()}`}</Text>
            </Pressable>
        )
    }

    const renderItem = ({ item }: { item: PessoaSelected }) => (
        <Item title={item} />
    );

    return (
        <SafeAreaView style={styles.safeAreaViewStyle}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.SearchBarBoxStyle}>
                <View style={styles.box1}>
                    <SearchBar
                        darkMode
                        placeholder="Pesquise o nome do paciente"
                        spinnerVisibility={state.spinnerVisibility}
                        style={styles.SearchBarStyle}
                        textInputStyle={styles.textInputStyle}
                        spinnerSize={RFValue(20, 680)}
                        clearIconImageStyle={styles.clearIconImageStyle}
                        searchIconImageStyle={styles.searchIconImageStyle}
                        onChangeText={(text) => text.length > 4 ? Search(text) : setState(prevState => { return { ...prevState, spinnerVisibility: false, query: text } })}
                        onClearPress={() => Onclean()}
                        selectionColor='#fff'
                        value={state.query}
                    />
                    {
                        (state.dataSource.length > 0 && state.query.length > 4) &&
                        <View style={styles.containerAutoComplete}>
                            <FlatList
                                data={state.dataSource}
                                renderItem={renderItem}
                                keyExtractor={(item, index) => index.toString()}
                                onEndReached={LoadingSearch}
                                onEndReachedThreshold={0.5}
                                ListFooterComponent={renderFooter} />
                        </View>
                    }
                </View>
                {
                    !state.query
                        ?
                        <View style={styles.listBox2}>
                            <EndSinaisVitais />
                        </View>
                        :
                        <ScrollView style={styles.box2}>
                            {
                                selected &&
                                <View style={styles.item1}>
                                    <View style={{ flex: 3, paddingHorizontal: RFPercentage(4)}}>
                                        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                            <Text style={styles.label}>Nome: </Text>
                                            <Text style={styles.text}>{selected.nM_PESSOA_FISICA}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={styles.label}>Nascimento: </Text>
                                            <Text style={styles.text}>{moment(selected.dT_NASCIMENTO).format('DD-MM-YYYY')}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('historySinaisVitais', selected)}>
                                            <HistorySvg width={RFPercentage(5)} height={RFPercentage(5)}>Botão</HistorySvg>
                                        </TouchableOpacity>
                                        <Text style={styles.textBtn}>Histórico</Text>
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
                                            valueMin={50}
                                            valueMax={220}
                                            valueRanger={!!Altura ? Altura : 0}
                                            setValueRanger={setAltura}
                                        />
                                    </View>
                                    <View style={styles.item2}>
                                        <SlideRanger
                                            label={"Peso"}
                                            medida={'kg'}
                                            step={0.1}
                                            valueMin={20}
                                            valueMax={200}
                                            valueRanger={!!Peso ? Peso : 0}
                                            setValueRanger={setPeso}
                                        />
                                    </View>
                                    <View style={styles.item2}>
                                        <SlideRanger
                                            label={"Temperatura"}
                                            medida={'°C'}
                                            step={0.1}
                                            valueMin={33}
                                            valueMax={42}
                                            valueRanger={!!temperatura ? temperatura : 0}
                                            setValueRanger={setTemperatura}
                                        />
                                    </View>
                                    <View style={styles.item2}>
                                        <SlideRanger
                                            label={"Oximetria"}
                                            medida={'SpO²'}
                                            step={1}
                                            valueMin={60}
                                            valueMax={100}
                                            valueRanger={!!oxigenacao ? oxigenacao : 0}
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
                }
            </KeyboardAvoidingView>
            <Loading activeModal={activeModal} />
            <ModalCentralizedOptions activeModal={activeModalOptions} message={"Deseja adicionar os Sinais Vitais ?"} onpress={() => AddSinaisVitais()} setActiveModal={setActiveModalOptions} />
        </SafeAreaView>
    )
}

export default sinaisVitais;
