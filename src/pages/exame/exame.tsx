import {
    View,
    StyleSheet,
    Text,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { ThemeContextData } from '../../contexts/themeContext';
import { useThemeAwareObject } from '../../hooks/useThemedStyles';
import CardStatusExamesComponent from './components/cardStatusExamesComponent/cardStatusExamesComponent';
import SearchBarPerson, {
    IParamConsulta,
} from '../../components/seachBar/searchBarPerson';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { IExame, useExames } from '../../hooks/useExames';
import CardSimples from '../../components/Cards/CardSimples';
import ExamSvg from '../../assets/svg/exame.svg';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import ShimerPlaceHolderCardSNVTs from '../../components/shimmerPlaceHolder/shimerPlaceHolderCardSNVTs';

const Exame: React.FC = () => {
    const styles = useThemeAwareObject(creatStyles);

    const navigation = useNavigation();

    const [state, setState] = useState<IParamConsulta<IExame>>({
        query: '',
        isLoading: false,
        refreshing: false,
        dataSource: undefined,
        spinnerVisibility: false,
        page: 1,
        loadingScrow: false,
        continue: true,
        showRequest: false,
    });

    const { data, isLoading, isFetching } = useExames(state.query);

    const renderItem = ({ index, item }: { index: number; item: IExame }) => (
        <CardSimples
            key={index.toString()}
            styleCardContainer={styles.cardStyle}>
            <TouchableOpacity
                key={index.toString()}
                onPress={() =>
                    navigation.navigate('ExameDetalhes', { exames: item })
                }
                style={styles.containerCard}>
                <View style={styles.box1Card}>
                    <ExamSvg width={RFPercentage(5)} height={RFPercentage(5)}>
                        Botão
                    </ExamSvg>
                </View>
                <View style={styles.box2Card}>
                    <View style={styles.item}>
                        <Text style={styles.textLabel}>Paciente: </Text>
                        <Text
                            style={
                                styles.text
                            }>{`${item.nm_patient.toUpperCase()}`}</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.textLabel}>Data Nascimento: </Text>
                        <Text style={styles.text}>
                            {moment(item.dt_update).format('DD-MM-YYYY')}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        </CardSimples>
    );

    const renderItemEmpty = () => {
        if (state.showRequest) {
            return (
                <CardSimples styleCardContainer={styles.cardStyle}>
                    <Text style={styles.text}>
                        Nenhum sinal vital encontrado
                    </Text>
                </CardSimples>
            );
        } else {
            return null;
        }
    };

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

    useEffect(() => {
        setState((old) => {
            return { ...old, dataSource: data, isLoading: isLoading };
        });
    }, [data, isLoading]);

    return (
        <View style={styles.container}>
            <View style={styles.box1}>
                <CardStatusExamesComponent
                    label="Liberadas"
                    value={data?.filter((item) => item.status == '1').length}
                />
                <CardStatusExamesComponent
                    label="Pendentes"
                    value={data?.filter((item) => item.status == '2').length}
                />
            </View>
            <View style={styles.box2}>
                <SearchBarPerson
                    item={state}
                    onChangeText={(text) =>
                        setState((old) => {
                            return { ...old, query: text };
                        })
                    }
                    onClean={() =>
                        setState((old) => {
                            return {
                                ...old,
                                query: '',
                                isLoading: false,
                                dataSource: undefined,
                            };
                        })
                    }
                    btnOptions={true}
                />
                {!isFetching ? (
                    <FlatList
                        nestedScrollEnabled={true}
                        data={state.dataSource}
                        renderItem={({ item, index }) =>
                            renderItem({ index, item })
                        }
                        scrollEnabled
                        keyExtractor={(item, index) => `key-${index}`}
                        ListEmptyComponent={renderItemEmpty}
                        //onEndReached={LoadingSearch}
                        onEndReachedThreshold={0.3}
                        ListFooterComponent={renderFooter}
                    />
                ) : (
                    Array(4).fill(<ShimerPlaceHolderCardSNVTs />)
                )}
            </View>
        </View>
    );
};

const creatStyles = (theme: ThemeContextData) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        box1: {
            flexDirection: 'row',
            marginTop: RFPercentage(1),
            paddingBottom: RFPercentage(1),
            backgroundColor: theme.colors.BACKGROUND_1,
        },
        box2: {
            flex: 1,
            marginVertical: RFPercentage(1),
        },
        containerCard: {
            flex: 1,
            flexDirection: 'row',
            paddingVertical: 10,
            justifyContent: 'space-around',
        },
        box1Card: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 3,
        },
        box2Card: {
            flex: 8,
            justifyContent: 'center',
            alignItems: 'flex-start',
            margin: 3,
        },
        textStyle: {
            fontFamily: theme.typography.FONTES.Regular,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_SECONDARY,
            fontSize: theme.typography.SIZE.fontysize16,
            textAlign: 'center',
        },
        cardStyle: {
            flex: 1,
            padding: 10,
        },
        item: {
            flexDirection: 'row',
            flexWrap: 'wrap',
        },
        textLabel: {
            fontFamily: theme.typography.FONTES.Bold,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_PRIMARY,
            fontSize: theme.typography.SIZE.fontysize16,
            textAlignVertical: 'center',
        },
        text: {
            fontFamily: theme.typography.FONTES.Regular,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_SECONDARY,
            fontSize: theme.typography.SIZE.fontysize16,
            textAlignVertical: 'center',
        },
        loading: {
            margin: 10,
            width: '100%',
            height: '100%',
            backgroundColor: '#fff',
        },
    });
    return styles;
};

export default Exame;
