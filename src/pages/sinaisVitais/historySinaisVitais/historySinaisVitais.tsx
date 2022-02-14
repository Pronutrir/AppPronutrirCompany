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
import SinaisVitaisContext from '../../../contexts/sinaisVitaisContext';
import { ISinaisVitais } from '../../../reducers/ConsultasReducer';

export interface PessoaSelected {
    cD_PESSOA_FISICA: string;
    nM_PESSOA_FISICA: string;
    dT_NASCIMENTO: string;
}

interface sinaisVitaisUpdate {
    nR_SEQUENCIA: number;
    iE_SITUACAO: string;
    cD_PACIENTE: string;
}

type RootStackParamList = {
    Profile: PessoaSelected;
    Feed: { sort: 'updateSinais' } | undefined;
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
        GetAllSinaisVitais,
    } = useContext(SinaisVitaisContext);
    const { addNotification } = useContext(NotificationGlobalContext);
    const selected: PessoaSelected = {
        cD_PESSOA_FISICA: '159969',
        dT_NASCIMENTO: '19-08-1985',
        nM_PESSOA_FISICA: 'WILLIAME CORREIA',
    };
    const [selectedSinais, setSelectedSinais] = useState<sinaisVitaisUpdate>({
        iE_SITUACAO: '',
        nR_SEQUENCIA: 0,
        cD_PACIENTE: '',
    });

    const [listSinaisVitais, setListSinaisVitais] = useState<
        ISinaisVitais[] | null
    >(null);

    const [activeModal, setActiveModal] = useState<boolean>(false);
    const [activeModalOptions, setActiveModalOptions] =
        useState<boolean>(false);
    const [activeModalDel, setActiveModalDel] = useState<boolean>(false);
    const [refreshing, setRefreshing] = useState<boolean>(false);

    /* const setSelectedSinaisInativar = (item: sinaisVitaisUpdate) => {
        setActiveModalOptions(true);
        setSelectedSinais(item);
    }; */

    /* const setSelectedSinaisDeletar = (item: sinaisVitaisUpdate) => {
        setActiveModalDel(true);
        setSelectedSinais(item);
    }; */

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
                            <Text style={styles.textLabel}>Peso: </Text>
                            <Text style={styles.text}>{`${
                                item?.qT_PESO ?? ''
                            }`}</Text>
                        </View>
                    </View>
                    <View style={styles.item}>
                        <View style={styles.SubItem}>
                            <Text style={styles.textLabel}>Oxigenação: </Text>
                            <Text style={styles.text}>{`${
                                item?.qT_SATURACAO_O2 ?? ''
                            }`}</Text>
                        </View>
                        <View style={styles.SubItem}>
                            <Text style={styles.textLabel}>Temperatura: </Text>
                            <Text style={styles.text}>{`${
                                item?.qT_TEMP ?? ''
                            }`}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.box3}>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() =>
                            navigation.navigate('updateSinais', {
                                SinaisVitais: item,
                                PessoaFisica: item,
                            })
                        }>
                        <EditarSvg
                            fill={'#748080'}
                            width={RFPercentage(4)}
                            height={RFPercentage(4)}
                        />
                    </TouchableOpacity>
                    {/* <TouchableOpacity
                            style={styles.btn}
                            onPress={() => setSelectedSinaisInativar(item)}>
                            <DisabledSvg
                                fill={'#748080'}
                                width={RFPercentage(4)}
                                height={RFPercentage(4)}>
                                Botão
                            </DisabledSvg>
                        </TouchableOpacity> */}
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
            <Text style={styles.text}>Nenhum sinal vital encontrado</Text>
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
                        await GetAllSinaisVitais();
                        setRefreshing(false);
                    }}
                    ListEmptyComponent={renderItemEmpty}
                />
            ) : (
                <LoadingBall active={true} />
            )}
            <Loading activeModal={activeModal} />
            {/* <ModalCentralizedOptions
                activeModal={activeModalOptions}
                message={'Deseja inativar este Sinal Vital ?'}
                onpress={() => UpdateSinaisVitais(selectedSinais)}
                setActiveModal={setActiveModalOptions}
            />
            <ModalCentralizedOptions
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
    },
    SubItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    box1: {
        flex: 0.5,
        padding: 0.5,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    box2: {
        flex: 5,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    box3: {
        alignSelf: 'flex-start',
        marginVertical: 5,
    },
    btn: {
        width: RFPercentage(5),
        height: RFPercentage(5),
        padding: 5,
        marginHorizontal: 5,
        backgroundColor: '#fff',
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
