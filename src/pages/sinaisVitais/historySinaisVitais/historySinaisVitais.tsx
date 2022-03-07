import React, {
    useState,
    useContext,
    useCallback,
    memo,
    useEffect,
} from 'react';
import {
    Text,
    View,
    FlatList,
    Platform,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import LoadingBall from '../../../components/Loading/LoadingBall';
import CardSimples from '../../../components/Cards/CardSimples';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
import HistorySvg from '../../../assets/svg/historico.svg';
import EditarSvg from '../../../assets/svg/editar.svg';
import ExcluirSvg from '../../../assets/svg/excluir.svg';
import DisabledSvg from '../../../assets/svg/disable.svg';
import AuthContext from '../../../contexts/auth';
import NotificationGlobalContext from '../../../contexts/notificationGlobalContext';
import ModalCentralizedOptions from '../../../components/Modais/ModalCentralizedOptions';
import Loading from '../../../components/Loading/Loading';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import SinaisVitaisContext, { IInativarSinaisVitais } from '../../../contexts/sinaisVitaisContext';
import { ISinaisVitais } from '../../../reducers/ConsultasReducer';
import ShimerPlaceHolderCardSNVTs from '../../../components/shimmerPlaceHolder/shimerPlaceHolderCardSNVTs';

export interface PessoaSelected {
    cD_PESSOA_FISICA: string;
    nM_PESSOA_FISICA: string;
    dT_NASCIMENTO: string;
}

type RootStackParamList = {
    Profile: PessoaSelected;
    Feed: { sort: 'UpdateSinais' } | undefined;
};

interface Parms {
    item: ISinaisVitais;
    index: number;
}

//type Props = StackScreenProps<RootStackParamList, 'Profile'>;

const HistorySinaisVitais: React.FC = () => {
    const navigation = useNavigation();
    const {
        stateAuth: { usertasy },
    } = useContext(AuthContext);
    const {
        stateConsultas: { sinaisVitais },
        GetAllSinaisVitais, ValidationAutorize, InativarSinaisVitais
    } = useContext(SinaisVitaisContext);
    const { addNotification } = useContext(NotificationGlobalContext);
    
    const [listSinaisVitais, setListSinaisVitais] = useState<
        ISinaisVitais[] | null
    >(null);

    const [activeModal, setActiveModal] = useState<boolean>(false);
    const [activeModalOptions, setActiveModalOptions] =
        useState<boolean>(false);
    const [activeModalDel, setActiveModalDel] = useState<boolean>(false);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [ selectedSinais , setSelectedSinais] = useState<IInativarSinaisVitais>();

    const setSelectedSinaisInativar = (item: IInativarSinaisVitais) => {
        setActiveModalOptions(true);
        setSelectedSinais(item);
    };

    /* const setSelectedSinaisDeletar = (item: sinaisVitaisUpdate) => {
        setActiveModalDel(true);
        setSelectedSinais(item);
    }; */

    const RedirectNavigation = (item: ISinaisVitais) => {
        if(ValidationAutorize()){
            navigation.navigate('UpdateSinaisVitaisEnfermagem', {
                SinaisVitais: item,
                PessoaFisica: item,
            })
        }else{
            navigation.navigate('UpdateSinais', {
                SinaisVitais: item,
                PessoaFisica: item,
            })
        }
    }

    const InativarSinalVital = async () => {
        if(selectedSinais){
            setActiveModal(true);
            await InativarSinaisVitais(selectedSinais);
            await GetAllSinaisVitais();
            setActiveModal(false);
        } 
    }

    const ComplementoEnfermagem = ({ item }: { item: ISinaisVitais }) => {
        return (
            <>
                <View style={styles.item}>
                    <View style={styles.SubItem}>
                        <Text style={styles.textLabel}>Pressão arterial sistólica: </Text>
                        <Text style={styles.text}>{item.qT_PA_SISTOLICA}</Text>
                    </View>
                </View>
                <View style={styles.item}>
                    <View style={styles.SubItem}>
                        <Text style={styles.textLabel}>Pressão arterial diastólica: </Text>
                        <Text style={styles.text}>{item.qT_PA_DIASTOLICA}</Text>
                    </View>
                </View>
                <View style={styles.item}>
                    <View style={styles.SubItem}>
                        <Text style={styles.textLabel}>Pressão arterial média : </Text>
                        <Text style={styles.text}>{item.qT_PAM}</Text>
                    </View>
                </View>
                <View style={styles.item}>
                    <View style={styles.SubItem}>
                        <Text style={styles.textLabel}>Frequência cardíaca: </Text>
                        <Text style={styles.text}>{item.qT_FREQ_CARDIACA}</Text>
                    </View>
                </View>
                <View style={styles.item}>
                    <View style={styles.SubItem}>
                        <Text style={styles.textLabel}>Frequência respiratória: </Text>
                        <Text style={styles.text}>{item.qT_FREQ_RESP}</Text>
                    </View>
                </View>
                <View style={styles.item}>
                    <View style={styles.SubItem}>
                        <Text style={styles.textLabel}>Escala de dor: </Text>
                        <Text style={styles.text}>{item.qT_ESCALA_DOR}</Text>
                    </View>
                </View>
            </>
        );
    };

    const Item = memo<Parms>(({ item }) => {
        return (
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.box1}>
                    <HistorySvg
                        width={RFPercentage(5)}
                        height={RFPercentage(5)}>
                        Botão
                    </HistorySvg>
                </View>
                <View style={styles.box2}>
                    <View style={styles.item}>
                        <Text style={styles.textLabel}>Paciente: </Text>
                        <Text
                            style={
                                styles.text
                            }>{`${item.nM_PESSOA_FISICA.toUpperCase()}`}</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.textLabel}>Data: </Text>
                        <Text style={styles.text}>{`${moment(
                            item.dT_SINAL_VITAL,
                        ).format('DD-MM-YYYY')}`}</Text>
                    </View>
                    <View style={styles.item}>
                        <View style={styles.SubItem}>
                            <Text style={styles.textLabel}>Altura: </Text>
                            <Text style={styles.text}>{`${
                                item?.qT_ALTURA_CM ?? ''
                            }`}</Text>
                        </View>
                        <View style={styles.SubItem}>
                            <Text style={styles.textLabel}>Oxigenação: </Text>
                            <Text style={styles.text}>{`${
                                item?.qT_SATURACAO_O2 ?? ''
                            }`}</Text>
                        </View>
                    </View>
                    <View style={styles.item}>
                    <View style={styles.SubItem}>
                            <Text style={styles.textLabel}>Peso: </Text>
                            <Text style={styles.text}>{`${
                                item?.qT_PESO ?? ''
                            }`}</Text>
                        </View>
                        <View style={styles.SubItem}>
                            <Text style={styles.textLabel}>Temperatura: </Text>
                            <Text style={styles.text}>{`${
                                item?.qT_TEMP ?? ''
                            }`}</Text>
                        </View>
                    </View>
                    <ComplementoEnfermagem item={item} />
                </View>
                <View style={styles.box3}>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => RedirectNavigation(item) }>
                        <EditarSvg
                            fill={'#748080'}
                            width={RFPercentage(4)}
                            height={RFPercentage(4)}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                            style={styles.btn}
                            onPress={() => setSelectedSinaisInativar(item)}>
                            <DisabledSvg
                                fill={'#748080'}
                                width={RFPercentage(4)}
                                height={RFPercentage(4)}>
                                Botão
                            </DisabledSvg>
                        </TouchableOpacity>
                </View>
            </View>
        );
    });

    const renderItem = useCallback(
        ({ item, index }: { item: ISinaisVitais; index: number }) => {
            return (
                <CardSimples styleCardContainer={styles.cardStyle}>
                    <Item key={item.nM_USUARIO} item={item} index={index} />
                </CardSimples>
            );
        },
        [],
    );

    const renderItemEmpty = () => (
        <CardSimples styleCardContainer={styles.cardStyle}>
            <Text style={styles.text}>Nenhum Histórico encontrado!</Text>
        </CardSimples>
    );

    const renderItemCall = useCallback(
        ({ item, index }) => renderItem({ item, index }),
        [],
    );

    useEffect(() => {
        if (sinaisVitais) {
            setListSinaisVitais(
                sinaisVitais.filter(
                    (element) =>
                        element.cD_PESSOA_FISICA === usertasy.cD_PESSOA_FISICA,
                ),
            );
        }
    }, [sinaisVitais]);

    return (
        <View style={styles.container}>
            {listSinaisVitais ? (
                <FlatList
                    data={listSinaisVitais}
                    renderItem={renderItemCall}
                    keyExtractor={(item, index) => index.toString()}
                    refreshing={refreshing}
                    onRefresh={async () => {
                        setRefreshing(true);
                        setListSinaisVitais(null);
                        await GetAllSinaisVitais();
                        setRefreshing(false);
                    }}
                    ListEmptyComponent={renderItemEmpty}
                />
            ) : (
                Array(4).fill(<ShimerPlaceHolderCardSNVTs />)
            )}
            <Loading activeModal={activeModal} />
            <ModalCentralizedOptions
                activeModal={activeModalOptions}
                message={'Deseja inativar este Sinal Vital ?'}
                onpress={() => InativarSinalVital()}
                setActiveModal={setActiveModalOptions}
            />
            {/* <ModalCentralizedOptions
                activeModal={activeModalDel}
                message={'Deseja deletar este Sinal Vital ?'}
                onpress={() => DeleteSinaisVitais(selectedSinais.nR_SEQUENCIA)}
                setActiveModal={setActiveModalDel}
            /> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get('screen').width,
        paddingVertical: 10,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    cardStyle: {
        flex: 1,
    },
    textLabel: {
        color: '#1E707D',
        fontSize: RFValue(16, 680),
        fontWeight: 'bold',
    },
    text: {
        color: '#666666',
        fontSize: RFValue(16, 680),
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: RFPercentage(0.5),
    },
    SubItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    box1: {
        flex: 0.7,
        paddingTop: 10,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    box2: {
        flex: 5,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    box3: {
        marginVertical: 5,
        justifyContent: 'space-between'
    },
    btn: {
        width: RFPercentage(5),
        height: RFPercentage(5),
        padding: 5,
        marginHorizontal: 5,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        ...Platform.select({
            ios: {
                shadowOffset: {
                    width: 0,
                    height: 5,
                },
                shadowOpacity: 0.2,
                shadowRadius: 6,
            },
            android: {
                elevation: 3,
            },
        }),
    },
});

export { HistorySinaisVitais };
