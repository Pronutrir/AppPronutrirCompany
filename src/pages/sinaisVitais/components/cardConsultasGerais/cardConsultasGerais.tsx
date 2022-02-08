import React, { memo, useContext } from 'react';
import {
    View,
    FlatList,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import HistorySvg from '../../../../assets/svg/historico.svg';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
import CardSimples from '../../../../components/Cards/CardSimples';
import ShimerPlaceHolderCardSNVTs from '../../../../components/shimmerPlaceHolder/shimerPlaceHolderCardSNVTs';
import { useNavigation } from '@react-navigation/native';
import { IParamConsulta } from '../../sinaisVItaisGerais/sinaisVitaisGerais';
import moment from 'moment';
import SinaisVitaisContext, {
    IPFSinaisVitais,
} from '../../../../contexts/sinaisVitaisContext';
import CheckSinaisVitaisComponent from '../checkSinaisVitaisComponent/checkSinaisVitaisComponent';

interface Props {
    dataSourcePFsinaisVitais?: IPFSinaisVitais[] | null;
    setState: React.Dispatch<React.SetStateAction<IParamConsulta>>;
    state: IParamConsulta;
}

const CardConsultasGerais: React.FC<Props> = ({
    dataSourcePFsinaisVitais,
    setState,
    state,
}: Props) => {
    const { SearchPFSinaisVitais } = useContext(SinaisVitaisContext);
    //const [refreshing, setRefreshing] = useState<boolean>(false);

    const navigation = useNavigation();

    const LoadingSearch = async () => {
        if (state.continue && state.dataSource.length >= 10) {
            setState({ ...state, loadingScrow: true });

            const PFSinaisVitais = await SearchPFSinaisVitais(
                state.query,
                state.page,
            );

            if (PFSinaisVitais === undefined) {
                return;
            }

            if (PFSinaisVitais && PFSinaisVitais?.length) {
                setState((prevState) => {
                    return {
                        ...prevState,
                        loadingScrow: false,
                        dataSource: [
                            ...prevState.dataSource,
                            ...PFSinaisVitais,
                        ],
                        page: prevState.page + 1,
                        continue: true,
                    };
                });
            } else {
                setState((prevState) => {
                    return {
                        ...prevState,
                        loadingScrow: false,
                        continue: false,
                        page: 2,
                    };
                });
            }
        }
    };

    const Item = ({ item }: { item: IPFSinaisVitais; index: number }) => {
        return (
            <TouchableOpacity
                onPress={() =>
                    navigation.navigate('updateSinais', { consultaQt: item })
                }
                style={{ flexDirection: 'row', paddingVertical: 10 }}>
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
                        <Text style={styles.textLabel}>Data Nascimento: </Text>
                        <Text style={styles.text}>
                            {moment(item.dT_NASCIMENTO).format('DD-MM-YYYY')}
                        </Text>
                    </View>
                </View>
                <CheckSinaisVitaisComponent Item={item.cD_PESSOA_FISICA} />
            </TouchableOpacity>
        );
    };

    const renderItem = ({
        item,
        index,
    }: {
        item: IPFSinaisVitais;
        index: number;
    }) => (
        <CardSimples styleCardContainer={styles.cardStyle}>
            <Item key={item.cD_PESSOA_FISICA} item={item} index={index} />
        </CardSimples>
    );

    const renderItemEmpty = () => (
        <CardSimples styleCardContainer={styles.cardStyle}>
            <Text style={styles.text}>Nenhum sinal vital encontrado</Text>
        </CardSimples>
    );

    const renderFooter = () => {
        if (!state.loadingScrow) {
            return null;
        }
        return (
            <View style={styles.loading}>
                <ActivityIndicator size={'small'} color={'#08948A'} />
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {dataSourcePFsinaisVitais ? (
                <FlatList
                    data={dataSourcePFsinaisVitais}
                    renderItem={({ item, index }) =>
                        renderItem({ item, index })
                    }
                    keyExtractor={(item, index) => index.toString()}
                    //refreshing={refreshing}
                    /*  onRefresh={async () => {
                        setRefreshing(true);
                        await GetConsultasQT();
                        setRefreshing(false);
                    }} */
                    ListEmptyComponent={renderItemEmpty}
                    onEndReached={LoadingSearch}
                    onEndReachedThreshold={0.3}
                    ListFooterComponent={renderFooter}
                />
            ) : (
                Array(4).fill(<ShimerPlaceHolderCardSNVTs />)
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
    },
    cardStyle: {
        flex: 1,
        padding: 10,
    },
    titleLabel: {
        alignSelf: 'flex-start',
        paddingLeft: 10,
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
        justifyContent: 'center',
        alignItems: 'center',
        margin: 3,
    },
    box2: {
        flex: 5,
        justifyContent: 'center',
        alignItems: 'flex-start',
        margin: 3,
    },
    loading: {
        margin: 10,
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
    },
});

export default memo(CardConsultasGerais);
