import React, { memo } from 'react';
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
import { IConsultas } from '../../../../reducers/ConsultasReducer';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

interface Props {
    dataSourceConsultas?: IConsultas[] | null;
}

const CardConsultasComponent: React.FC<Props> = ({
    dataSourceConsultas,
}: Props) => {
    //const { addNotification } = useContext(ErrorContext);
    //const [refreshing, setRefreshing] = useState<boolean>(false);

    const navigation = useNavigation();

    const Item = ({ item }: { item: IConsultas; index: number }) => {
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
                    {item.dS_ESPECIALIDADE && (
                        <View style={styles.item}>
                            <Text style={styles.textLabel}>
                                Especialidade:{' '}
                            </Text>
                            <Text style={styles.text}>
                                {item.dS_ESPECIALIDADE}
                            </Text>
                        </View>
                    )}
                </View>
            </TouchableOpacity>
        );
    };

    const renderItem = ({
        item,
        index,
    }: {
        item: IConsultas;
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

    return (
        <View style={styles.container}>
            {dataSourceConsultas ? (
                <FlatList
                    data={dataSourceConsultas}
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

export default memo(CardConsultasComponent);
