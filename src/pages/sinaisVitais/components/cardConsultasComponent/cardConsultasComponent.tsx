import React, { memo, useState } from 'react';
import {
    View,
    FlatList,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import HistorySvg from '../../../../assets/svg/historico.svg';
import { RFPercentage } from 'react-native-responsive-fontsize';
import CardSimples from '../../../../components/Cards/CardSimples';
import ShimerPlaceHolderCardSNVTs from '../../../../components/shimmerPlaceHolder/shimerPlaceHolderCardSNVTs';
import { IConsultas } from '../../../../reducers/ConsultasReducer';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { IFilterConsultas } from '../../../../contexts/sinaisVitaisContext';
import CheckSinaisVitaisComponent from '../checkSinaisVitaisComponent/checkSinaisVitaisComponent';
import CheckPVSinaisVitaisComponent from '../checkPVSinaisVitaisComponent/checkPVSinaisVitaisComponent';
import { useThemeAwareObject } from '../../../../hooks/useThemedStyles';
import { ThemeContextData } from '../../../../contexts/themeContext';
import {
    IAgendaConsulta,
    useGetAgendaConsultas,
} from '../../../../hooks/useAgendaConsultas';
interface Props {
    dataSourceConsultas?: IConsultas[] | null;
    selectFilter: React.MutableRefObject<IFilterConsultas>;
    isFetching?: boolean;
    filterConsultas: (item?: IFilterConsultas) => IAgendaConsulta[] | undefined;
}

const CardConsultasComponent: React.FC<Props> = ({
    dataSourceConsultas,
    selectFilter,
    isFetching,
    filterConsultas,
}: Props) => {
    const styles = useThemeAwareObject(createStyles);

    const [refreshing, setRefreshing] = useState<boolean>(false);

    const navigation = useNavigation();

    const { refetch } = useGetAgendaConsultas();

    const Item = ({ item, index }: { item: IConsultas; index: number }) => {
        return (
            <TouchableOpacity
                key={index.toString()}
                onPress={() =>
                    navigation.navigate('UpdateSinais', { PessoaFisica: item })
                }
                style={{
                    flexDirection: 'row',
                    paddingVertical: RFPercentage(1),
                }}>
                <View style={styles.box1}>
                    <CheckPVSinaisVitaisComponent Item={item.counT_SVMP} />
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
            <Item key={index.toString()} item={item} index={index} />
        </CardSimples>
    );

    const renderItemEmpty = () => (
        <CardSimples styleCardContainer={styles.cardStyle}>
            <Text style={styles.text}>Nenhum consulta encontrada!</Text>
        </CardSimples>
    );

    return (
        <View style={styles.container}>
            {isFetching ? (
                Array(4).fill(<ShimerPlaceHolderCardSNVTs />)
            ) : (
                <FlatList
                    data={dataSourceConsultas}
                    renderItem={({ item, index }) =>
                        renderItem({ item, index })
                    }
                    keyExtractor={(item, index) => index.toString()}
                    refreshing={refreshing}
                    onRefresh={async () => {
                        setRefreshing(true);
                        if (
                            selectFilter.current.nM_GUERRA ||
                            selectFilter.current.dS_ESPECIALIDADE
                        ) {
                            filterConsultas({
                                nM_GUERRA: selectFilter.current.nM_GUERRA
                                    ? selectFilter.current.nM_GUERRA
                                    : null,
                                dS_ESPECIALIDADE: selectFilter.current
                                    .dS_ESPECIALIDADE
                                    ? selectFilter.current.dS_ESPECIALIDADE
                                    : null,
                            });
                        } else {
                            await refetch();
                            //await GetConsultas();
                        }
                        setRefreshing(false);
                    }}
                    ListEmptyComponent={renderItemEmpty}
                />
            )}
        </View>
    );
};

const createStyles = (theme: ThemeContextData) => {
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
            fontFamily: theme.typography.FONTES.Bold,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_PRIMARY,
            fontSize: theme.typography.SIZE.fontysize16,
        },
        text: {
            fontFamily: theme.typography.FONTES.Regular,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_SECONDARY,
            fontSize: theme.typography.SIZE.fontysize16,
        },
        item: {
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
    return styles;
};

export default memo(CardConsultasComponent);
