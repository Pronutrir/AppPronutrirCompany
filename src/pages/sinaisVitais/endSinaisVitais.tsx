import React, {
    useState,
    useEffect,
    memo,
    useContext,
    useCallback,
} from 'react';
import { View, FlatList, Text, StyleSheet, Dimensions } from 'react-native';
import { ISinaisVitais } from '../../reducers/ConsultasReducer';
import HistorySvg from '../../assets/svg/historico.svg';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
import CardSimples from '../../components/Cards/CardSimples';
import moment from 'moment';
import Api from '../../services/api';
import NotificationGlobalContext from '../../contexts/notificationGlobalContext';
import ShimerPlaceHolderCardSNVTs from '../../components/shimmerPlaceHolder/shimerPlaceHolderCardSNVTs';

const EndSinaisVitais: React.FC = ({}) => {
    const { addNotification } = useContext(NotificationGlobalContext);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [listSinaisVitais, setListSinaisVitais] = useState<
    ISinaisVitais[] | null
    >(null);

    const GetSinaisVitais = useCallback(async () => {
        try {
            const _sinaisVitais: ISinaisVitais[] = await Api.get(
                `SinaisVitaisMonitoracaoGeral/ListarTodosSVMG?pagina=${1}&rows=${5}`,
            ).then((response) => {
                const { result } = response.data;
                if (result) {
                    /* const order_result = */ result.sort(function (
                        a: ISinaisVitais,
                        b: ISinaisVitais,
                    ) {
                        return a.nR_SEQUENCIA > b.nR_SEQUENCIA
                            ? -1
                            : a.nR_SEQUENCIA < b.nR_SEQUENCIA
                            ? 1
                            : 0;
                    });
                    return result;
                }
            });
            setListSinaisVitais(_sinaisVitais);
            setRefreshing(false);
        } catch (error) {
            setRefreshing(false);
            addNotification({
                message:
                    'Não foi possivel realizar a consulta, tente mais tarde!',
                status: 'error',
            });
        }
    }, [addNotification]);

    const Item = ({ item }: { item: ISinaisVitais; index: number }) => {
        return (
            <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
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
            </View>
        );
    };

    const renderItem = ({
        item,
        index,
    }: {
        item: ISinaisVitais;
        index: number;
    }) => (
        <CardSimples styleCardContainer={styles.cardStyle}>
            <Item key={item.nR_SEQUENCIA} item={item} index={index} />
        </CardSimples>
    );

    const renderItemEmpty = () => (
        <CardSimples styleCardContainer={styles.cardStyle}>
            <Text style={styles.text}>Nenhum sinal vital encontrado</Text>
        </CardSimples>
    );

    useEffect(() => {
        GetSinaisVitais();
    }, [GetSinaisVitais]);

    return (
        <View style={styles.container}>
            <Text style={[styles.textLabel, styles.titleLabel]}>
                Ultimos sinais vitais adicionados!
            </Text>
            {listSinaisVitais ? (
                <FlatList
                    data={listSinaisVitais}
                    renderItem={({ item, index }) =>
                        renderItem({ item, index })
                    }
                    keyExtractor={(item, index) => index.toString()}
                    refreshing={refreshing}
                    onRefresh={() => {
                        setRefreshing(true);
                        GetSinaisVitais();
                    }}
                    ListEmptyComponent={renderItemEmpty}
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
        width: Dimensions.get('screen').width,
        paddingVertical: 10,
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    cardStyle: {
        flex: 1,
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
});

export default memo(EndSinaisVitais);
