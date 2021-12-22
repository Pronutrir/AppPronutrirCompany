import React, { memo } from 'react';
import {
    View,
    FlatList,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import HistorySvg from '../../../assets/svg/historico.svg';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
import CardSimples from '../../../components/Cards/CardSimples';
import moment from 'moment';
import ShimerPlaceHolderCardSNVTs from '../../../components/shimmerPlaceHolder/shimerPlaceHolderCardSNVTs';
import { consultaQT } from '../../../contexts/sinaisVitaisContext';
import { useNavigation } from '@react-navigation/native';

interface Props {
    dataSource: consultaQT[];
}

const CardSinaisVitais: React.FC<Props> = ({ dataSource }: Props) => {
    //const { addNotification } = useContext(ErrorContext);
    //const [refreshing, setRefreshing] = useState<boolean>(false);

    const navigation = useNavigation();

    const Item = ({ item }: { item: consultaQT; index: number }) => {
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
                            }>{`${item.NM_PESSOA_FISICA.toUpperCase()}`}</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.textLabel}>Data: </Text>
                        <Text style={styles.text}>{`${moment(
                            item.DT_PREVISTA,
                        ).format('DD-MM-YYYY')}`}</Text>
                    </View>
                    <View style={styles.item}>
                        <View style={styles.SubItem}>
                            <Text style={styles.textLabel}>Altura: </Text>
                            <Text style={styles.text}>{`${
                                item?.QT_ALTURA ?? ''
                            }`}</Text>
                        </View>
                        <View style={styles.SubItem}>
                            <Text style={styles.textLabel}>Peso: </Text>
                            <Text style={styles.text}>{`${
                                item?.QT_PESO ?? ''
                            }`}</Text>
                        </View>
                    </View>
                    <View style={styles.item}>
                        <View style={styles.SubItem}>
                            <Text style={styles.textLabel}>Oxigenação: </Text>
                            <Text style={styles.text}>{`${
                                item?.QT_SUPERF_CORPORAL ?? ''
                            }`}</Text>
                        </View>
                        <View style={styles.SubItem}>
                            <Text style={styles.textLabel}>Temperatura: </Text>
                            <Text style={styles.text}>{`${
                                item?.QT_ALTURA ?? ''
                            }`}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    const renderItem = ({
        item,
        index,
    }: {
        item: consultaQT;
        index: number;
    }) => (
        <CardSimples styleCardContainer={styles.cardStyle}>
            <Item key={item.CD_PESSOA_FISICA} item={item} index={index} />
        </CardSimples>
    );

    const renderItemEmpty = () => (
        <CardSimples styleCardContainer={styles.cardStyle}>
            <Text style={styles.text}>Nenhum sinal vital encontrado</Text>
        </CardSimples>
    );

    return (
        <View style={styles.container}>
            {dataSource ? (
                <FlatList
                    data={dataSource}
                    renderItem={({ item, index }) =>
                        renderItem({ item, index })
                    }
                    keyExtractor={(item, index) => index.toString()}
                    //refreshing={refreshing}
                    //onRefresh={() => {
                    //setRefreshing(true);
                    //GetSinaisVitais();
                    //}}
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
        backgroundColor: '#fff',
        marginTop: 10,
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

export default memo(CardSinaisVitais);
