import React, { memo, useState, useContext } from 'react';
import {
    View,
    FlatList,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import HistorySvg from '../../../../assets/svg/historico.svg';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
import CardSimples from '../../../../components/Cards/CardSimples';
import ShimerPlaceHolderCardSNVTs from '../../../../components/shimmerPlaceHolder/shimerPlaceHolderCardSNVTs';
import { IconsultaQT } from '../../../../reducers/ConsultasQTReducer';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import SinaisVitaisContext from '../../../../contexts/sinaisVitaisContext';

interface Props {
    dataSourceQT?: IconsultaQT[] | null;
}

const CardConsultasQTComponent: React.FC<Props> = ({ dataSourceQT }: Props) => {
    const { GetConsultasQT } = useContext(SinaisVitaisContext);
    const [refreshing, setRefreshing] = useState<boolean>(false);

    const navigation = useNavigation();

    const Item = ({ item }: { item: IconsultaQT; index: number }) => {
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
            </TouchableOpacity>
        );
    };

    const renderItem = ({
        item,
        index,
    }: {
        item: IconsultaQT;
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

    /* const ListFooterComponent = () => (
        <View>
            <ActivityIndicator />
        </View>
    ); */

    return (
        <View style={styles.container}>
            {dataSourceQT ? (
                <FlatList
                    data={dataSourceQT}
                    renderItem={({ item, index }) =>
                        renderItem({ item, index })
                    }
                    keyExtractor={(item, index) => index.toString()}
                    refreshing={refreshing}
                    onRefresh={async () => {
                        setRefreshing(true);
                        await GetConsultasQT();
                        setRefreshing(false);
                    }}
                    ListEmptyComponent={renderItemEmpty}
                    //onEndReached={() => console.log('teste')}
                    //onEndReachedThreshold={0.5}
                    //ListFooterComponent={ListFooterComponent}
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
});

export default memo(CardConsultasQTComponent);
