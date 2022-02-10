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
import { IConsultas } from '../../../../reducers/ConsultasReducer';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import SinaisVitaisContext, {
    IFilterConsultas,
} from '../../../../contexts/sinaisVitaisContext';
import CheckSinaisVitaisComponent from '../checkSinaisVitaisComponent/checkSinaisVitaisComponent';
import CheckPVSinaisVitaisComponent from '../checkPVSinaisVitaisComponent/checkPVSinaisVitaisComponent';

interface Props {
    dataSourceConsultas?: IConsultas[] | null;
    selectFilter: React.MutableRefObject<IFilterConsultas>;
}

const CardConsultasComponent: React.FC<Props> = ({
    dataSourceConsultas,
    selectFilter,
}: Props) => {
    const [refreshing, setRefreshing] = useState<boolean>(false);

    const navigation = useNavigation();

    const { GetConsultas, GetMedicosConsultas } =
        useContext(SinaisVitaisContext);

    const Item = ({ item }: { item: IConsultas; index: number }) => {
        return (
            <TouchableOpacity
                onPress={() =>
                    navigation.navigate('updateSinais', { consultaQt: item })
                }
                style={{ flexDirection: 'row', paddingVertical: 10 }}>
                <View style={styles.box1}>
                    <CheckPVSinaisVitaisComponent
                        Item={item?.iE_CLASSIF_AGENDA}
                    />
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
                            }>{`${item?.nM_PESSOA_FISICA.toUpperCase()}`}</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.textLabel}>Data Nascimento: </Text>
                        <Text style={styles.text}>
                            {moment(item?.dT_NASCIMENTO).format('DD-MM-YYYY')}
                        </Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.textLabel}>Médico: </Text>
                        <Text style={styles.text}>{item?.nM_GUERRA}</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.textLabel}>Especialidade: </Text>
                        <Text style={styles.text}>
                            {item?.dS_ESPECIALIDADE}
                        </Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.textLabel}>
                            Horário da Agenda:{' '}
                        </Text>
                        <Text style={styles.text}>
                            {moment(item?.dT_AGENDA).format('HH:mm')}
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
        item: IConsultas;
        index: number;
    }) => (
        <CardSimples styleCardContainer={styles.cardStyle}>
            <Item key={item.cD_PESSOA_FISICA} item={item} index={index} />
        </CardSimples>
    );

    const renderItemEmpty = () => (
        <CardSimples styleCardContainer={styles.cardStyle}>
            <Text style={styles.text}>Nenhum consulta encontrada!</Text>
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
                    refreshing={refreshing}
                    onRefresh={async () => {
                        setRefreshing(true);
                        await GetConsultas({
                            nM_GUERRA: selectFilter.current.nM_GUERRA
                                ? selectFilter.current.nM_GUERRA
                                : null,
                            dS_ESPECIALIDADE: selectFilter.current
                                .dS_ESPECIALIDADE
                                ? selectFilter.current.dS_ESPECIALIDADE
                                : null,
                        });
                        await GetMedicosConsultas();
                        setRefreshing(false);
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
        //backgroundColor: '#fff',
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

export default memo(CardConsultasComponent);
