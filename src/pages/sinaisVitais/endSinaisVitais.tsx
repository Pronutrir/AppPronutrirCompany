import React, { memo, useContext, useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, Dimensions } from 'react-native';
import HistorySvg from '../../assets/svg/historico.svg';
import { RFPercentage } from 'react-native-responsive-fontsize';
import CardSimples from '../../components/Cards/CardSimples';
import moment from 'moment';
import ShimerPlaceHolderCardSNVTs from '../../components/shimmerPlaceHolder/shimerPlaceHolderCardSNVTs';
import {
    ISinaisVitais,
    _useSinaisVitaisHistory,
} from '../../hooks/useSinaisVitais';
import { RootStackParamList } from '../../routes/routeDashboard';
import { RouteProp } from '@react-navigation/native';
import ActiveIndicator from '../../components/Loading/ActiveIndicator';
import { useThemeAwareObject } from '../../hooks/useThemedStyles';
import { ThemeContextData } from '../../contexts/themeContext';
import Checkbox from '../../components/checkbox/checkbox';
import SinaisVitaisContext from '../../contexts/sinaisVitaisContext';

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'EndSinaisVitais'>;
interface Props {
    route: ProfileScreenRouteProp;
}

type IFilter = 'day' | 'all';

const EndSinaisVitais: React.FC<Props> = ({
    route: {
        params: { Paciente },
    },
}: Props) => {
    const styles = useThemeAwareObject(createStyles);

    const { ValidationAutorizeEnfermagem } = useContext(SinaisVitaisContext);

    const [checkboxFilter, setCheckboxFilter] = useState<IFilter>(
        ValidationAutorizeEnfermagem() ? 'day' : 'all',
    );

    const {
        data: historySinalVitais,
        isLoading,
        remove,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = _useSinaisVitaisHistory(Paciente);

    const loadMore = () => {
        if (hasNextPage && checkboxFilter === 'all') {
            fetchNextPage();
        }
    };

    const ComplementoEnfermagem = ({ item }: { item: ISinaisVitais }) => {
        if (ValidationAutorizeEnfermagem()) {
            return (
                <>
                    <View style={styles.item}>
                        <View style={styles.SubItem}>
                            <Text style={styles.textLabel}>
                                Pressão arterial sistólica:{' '}
                            </Text>
                            <Text style={styles.text}>
                                {item.qT_PA_SISTOLICA}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.item}>
                        <View style={styles.SubItem}>
                            <Text style={styles.textLabel}>
                                Pressão arterial diastólica:{' '}
                            </Text>
                            <Text style={styles.text}>
                                {item.qT_PA_DIASTOLICA}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.item}>
                        <View style={styles.SubItem}>
                            <Text style={styles.textLabel}>
                                Pressão arterial média :{' '}
                            </Text>
                            <Text style={styles.text}>{item.qT_PAM}</Text>
                        </View>
                    </View>
                    <View style={styles.item}>
                        <View style={styles.SubItem}>
                            <Text style={styles.textLabel}>
                                Frequência cardíaca:{' '}
                            </Text>
                            <Text style={styles.text}>
                                {item.qT_FREQ_CARDIACA}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.item}>
                        <View style={styles.SubItem}>
                            <Text style={styles.textLabel}>
                                Frequência respiratória:{' '}
                            </Text>
                            <Text style={styles.text}>{item.qT_FREQ_RESP}</Text>
                        </View>
                    </View>
                    <View style={styles.item}>
                        <View style={styles.SubItem}>
                            <Text style={styles.textLabel}>
                                Escala de dor:{' '}
                            </Text>
                            <Text style={styles.text}>
                                {item.qT_ESCALA_DOR}
                            </Text>
                        </View>
                    </View>
                </>
            );
        } else {
            return null;
        }
    };

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
                        ).format('DD-MM-YYYY [às] HH:mm')}`}</Text>
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
                    <ComplementoEnfermagem item={item} />
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
        <CardSimples key={index} styleCardContainer={styles.cardStyle}>
            <Item key={index} item={item} index={index} />
        </CardSimples>
    );

    const renderItemEmpty = () => (
        <CardSimples styleCardContainer={styles.cardStyle}>
            <Text style={styles.text}>Nenhum sinal vital encontrado</Text>
        </CardSimples>
    );

    const renderFooter = () => {
        return <ActiveIndicator active={isFetchingNextPage} />;
    };

    const historySinaisVitaisFilter = (
        value: IFilter,
    ): ISinaisVitais[] | undefined => {
        let result = historySinalVitais?.pages.map((page) => page).flat();
        if (value === 'day') {
            result = result?.filter(
                ({ dT_SINAL_VITAL }) =>
                    moment(dT_SINAL_VITAL).format('YYYY-MM-DD') ===
                    moment().format('YYYY-MM-DD'),
            );
        }
        return result;
    };

    useEffect(() => {
        return () => {
            remove();
        };
    }, []);

    return (
        <View style={styles.container}>
            <Text style={[styles.textLabel, styles.titleLabel]}>
                Ultimos sinais vitais adicionados!
            </Text>
            {!isLoading ? (
                <>
                    <View style={styles.BoxCheckbox}>
                        <Checkbox
                            isChecked={checkboxFilter === 'day' ? true : false}
                            text="Diário"
                            onPress={() => setCheckboxFilter('day')}
                        />
                        <Checkbox
                            isChecked={checkboxFilter === 'all' ? true : false}
                            text="Todos"
                            onPress={() => setCheckboxFilter('all')}
                        />
                    </View>
                    <FlatList
                        data={historySinaisVitaisFilter(checkboxFilter)}
                        renderItem={({ item, index }) =>
                            renderItem({ item, index })
                        }
                        keyExtractor={(item, index) => index.toString()}
                        /* refreshing={isFetching}
                    onRefresh={() => {
                        refetch;
                    }} */
                        ListEmptyComponent={renderItemEmpty}
                        ListFooterComponent={renderFooter}
                        onEndReached={loadMore}
                        onEndReachedThreshold={0.5}
                    />
                </>
            ) : (
                Array(4).fill(<ShimerPlaceHolderCardSNVTs />)
            )}
        </View>
    );
};

const createStyles = (theme: ThemeContextData) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            width: Dimensions.get('screen').width,
            paddingVertical: 10,
            alignItems: 'center',
            backgroundColor: theme.colors.BACKGROUND_1,
        },
        cardStyle: {
            flex: 1,
            padding: RFPercentage(1),
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
            flex: 0.5,
            margin: 3,
        },
        box2: {
            flex: 5,
            justifyContent: 'center',
            alignItems: 'flex-start',
            margin: 3,
        },
        BoxCheckbox: {
            flexDirection: 'row',
            margin: 10,
        },
        Checkbox: {
            marginHorizontal: 10,
        },
    });
    return styles;
};

export default memo(EndSinaisVitais);
