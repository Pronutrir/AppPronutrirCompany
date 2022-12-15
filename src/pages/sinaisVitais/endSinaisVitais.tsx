import React, {
    useState,
    useContext,
    useCallback,
    useRef,
    useEffect,
} from 'react';
import {
    Text,
    View,
    FlatList,
    Platform,
    StyleSheet,
    Dimensions,
    AppState,
} from 'react-native';
import { focusManager } from 'react-query';
import CardSimples from '../../components/Cards/CardSimples';
import { RFPercentage } from 'react-native-responsive-fontsize';
import HistorySvg from '../../assets/svg/historico.svg';
import ModalCentralizedOptions, {
    ModalHandles,
} from '../../components/Modais/ModalCentralizedOptions';
import MenuPopUp, {
    ModalHandlesMenu,
} from '../../components/menuPopUp/menuPopUp';
import Loading, { LoadHandles } from '../../components/Loading/Loading';
import { RouteProp, useNavigation } from '@react-navigation/native';
import moment from 'moment';
import SinaisVitaisContext, {
    IInativarSinaisVitais,
} from '../../contexts/sinaisVitaisContext';
import { ISinaisVitais } from '../../reducers/ConsultasReducer';
import ShimerPlaceHolderCardSNVTs from '../../components/shimmerPlaceHolder/shimerPlaceHolderCardSNVTs';
import {
    IFilterSinaisVitaisProfissional,
    useSinaisVitaisAll,
    _useSinaisVitaisHistory,
} from '../../hooks/useSinaisVitais';
import { ThemeContextData } from '../../contexts/themeContext';
import { useThemeAwareObject } from '../../hooks/useThemedStyles';
import ModalFiltroData from '../../components/Modais/ModalFiltroData';
import ActiveIndicator from '../../components/Loading/ActiveIndicator';
import { RootStackParamList } from '../../routes/routeDashboard';

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'EndSinaisVitais'>;
interface Props {
    route: ProfileScreenRouteProp;
}
export interface PessoaSelected {
    cD_PESSOA_FISICA: string;
    nM_PESSOA_FISICA: string;
    dT_NASCIMENTO: string;
}

type IFilter = 'Diario' | 'Todos' | 'Periodo';

focusManager.setEventListener((handleFocus) => {
    const subscription = AppState.addEventListener('change', (state) => {
        handleFocus(state === 'active');
    });

    return () => {
        subscription;
    };
});

const EndSinaisVitais: React.FC<Props> = ({
    route: {
        params: { Paciente, Tipo },
    },
}: Props) => {
    const styles = useThemeAwareObject(createStyles);
    const navigation = useNavigation();
    const {
        ValidationAutorizeEnfermagem,
        InativarSinaisVitais,
        UpdateSinaisVitais,
        AddSinaisVitais,
    } = useContext(SinaisVitaisContext);

    const { refetch: refetchSinaisVitais } = useSinaisVitaisAll();

    const [filterOptions, setFilterOptions] =
        useState<IFilterSinaisVitaisProfissional>({
            cd_pessoa_fisica: Paciente,
            dataInicio:
                Tipo === 'Diario'
                    ? moment().format('YYYY-MM-DD')
                    : moment().subtract(1, 'year').format('YYYY-MM-DD'),
            dataFinal: moment().format('YYYY-MM-DD'),
        });

    const [checkboxFilter, setCheckboxFilter] = useState<IFilter>(
        ValidationAutorizeEnfermagem() ? 'Diario' : 'Todos',
    );

    const {
        data: historySinalVitais,
        isLoading,
        refetch: refetchHistory,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = _useSinaisVitaisHistory({
        nomePaciente: Paciente,
        dataInicio: filterOptions?.dataInicio,
        dataFinal: filterOptions?.dataFinal,
    });

    const refModalOptions = useRef<ModalHandles>(null);
    const refMenuPopUp = useRef<ModalHandlesMenu>(null);
    const refLoading = useRef<LoadHandles>(null);
    const ModalFiltroDataRef = useRef<ModalHandles>(null);

    const [selectedSinais, setSelectedSinais] =
        useState<IInativarSinaisVitais>();

    const loadMore = () => {
        if (hasNextPage) {
            fetchNextPage();
        }
    };

    const setSelectedSinaisInativar = (item: IInativarSinaisVitais) => {
        setTimeout(
            () => {
                refModalOptions.current?.openModal();
            },
            Platform.OS === 'android' ? 0 : 500,
        );
        setSelectedSinais(item);
    };

    const RedirectNavigation = (item: ISinaisVitais) => {
        if (ValidationAutorizeEnfermagem()) {
            navigation.navigate('UpdateSinaisVitaisEnfermagem', {
                SinaisVitais: item,
                PessoaFisica: item,
            });
        } else {
            navigation.navigate('UpdateSinais', {
                SinaisVitais: item,
                PessoaFisica: item,
            });
        }
    };

    const InativarSinalVital = async () => {
        if (selectedSinais) {
            setTimeout(
                () => {
                    refLoading.current?.openModal();
                },
                Platform.OS === 'android' ? 0 : 500,
            );
            await InativarSinaisVitais(selectedSinais);
            await refetchHistory();
            refetchSinaisVitais();
            refLoading.current?.closeModal();
        }
    };

    const MenuPopUpOptions = (itemSelected: string, item: ISinaisVitais) => {
        switch (itemSelected) {
            case 'Editar':
                RedirectNavigation(item);
                break;
            case 'Inativar':
                setSelectedSinaisInativar(item);
                break;
            default:
                break;
        }
    };

    const ComplementoEnfermagem = ({
        item,
        index,
    }: {
        item: ISinaisVitais;
        index: number;
    }) => {
        if (ValidationAutorizeEnfermagem()) {
            return (
                <>
                    <View key={index.toString()} style={styles.item}>
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

    const Item = ({ item, index }: { item: ISinaisVitais; index: number }) => {
        return (
            <View
                key={index.toString()}
                style={{ flexDirection: 'row', padding: 10 }}>
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
                            <Text style={styles.textLabel}>Oxigenação: </Text>
                            <Text style={styles.text}>{`${
                                item?.qT_SATURACAO_O2 ?? ''
                            }`}</Text>
                        </View>
                    </View>
                    <View style={styles.item}>
                        <View style={styles.SubItem}>
                            <Text style={styles.textLabel}>Peso: </Text>
                            <Text style={styles.text}>{`${
                                item?.qT_PESO ?? ''
                            }`}</Text>
                        </View>
                        <View style={styles.SubItem}>
                            <Text style={styles.textLabel}>Temperatura: </Text>
                            <Text style={styles.text}>{`${
                                item?.qT_TEMP ?? ''
                            }`}</Text>
                        </View>
                    </View>
                    <ComplementoEnfermagem item={item} index={index} />
                </View>
                <View style={styles.box3}>
                    <MenuPopUp
                        ref={refMenuPopUp}
                        btnLabels={
                            checkboxFilter === 'Diario'
                                ? ['Editar', 'Inativar']
                                : ['Inativar']
                        }
                        onpress={(label) => {
                            refMenuPopUp.current?.hideMenu(),
                                MenuPopUpOptions(label, item);
                        }}
                    />
                </View>
            </View>
        );
    };

    Item.displayName = 'Item';

    const renderItem = ({
        item,
        index,
    }: {
        item: ISinaisVitais;
        index: number;
    }) => {
        return (
            <CardSimples
                key={index.toString()}
                styleCardContainer={styles.cardStyle}>
                <Item key={index.toString()} item={item} index={index} />
            </CardSimples>
        );
    };

    const renderItemEmpty = () => (
        <CardSimples styleCardContainer={styles.cardStyle}>
            <Text style={styles.text}>Nenhum Histórico encontrado!</Text>
        </CardSimples>
    );

    const renderItemCall = useCallback(
        ({ item, index }) => renderItem({ item, index }),
        [],
    );

    const renderFooter = () => {
        return <ActiveIndicator active={isFetchingNextPage} />;
    };

    const selectedOptions = (item: string) => {
        switch (item) {
            case 'Diario':
                setFilterOptions({
                    cd_pessoa_fisica: Paciente,
                    dataInicio: moment().format('YYYY-MM-DD'),
                    dataFinal: moment().format('YYYY-MM-DD'),
                });
                setCheckboxFilter('Diario');
                break;
            case 'Todos':
                setFilterOptions({
                    cd_pessoa_fisica: Paciente,
                    dataInicio: moment()
                        .subtract(1, 'year')
                        .format('YYYY-MM-DD'),
                    dataFinal: moment().format('YYYY-MM-DD'),
                });
                setCheckboxFilter('Todos');
                break;
            case 'Periodo':
                setTimeout(
                    () => {
                        ModalFiltroDataRef.current?.openModal();
                    },
                    Platform.OS === 'ios' ? 500 : 0,
                );
                setCheckboxFilter('Periodo');
                break;
        }
    };

    useEffect(() => {
        refetchHistory();
    }, [UpdateSinaisVitais, AddSinaisVitais]);

    return (
        <View style={styles.container}>
            <View
                style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: RFPercentage(0.5),
                }}>
                <Text style={[styles.textLabel, styles.titleLabel]}>
                    Ultimos sinais vitais adicionados!
                </Text>
                <View
                    style={{
                        position: 'absolute',
                        right: 0,
                    }}>
                    <MenuPopUp
                        btnLabels={['Diario', 'Todos', 'Periodo']}
                        onpress={(item) => selectedOptions(item)}
                        showItemSelected={true}
                        ItemSelected={checkboxFilter}
                    />
                </View>
            </View>
            {!isLoading ? (
                <FlatList
                    data={historySinalVitais?.pages.map((page) => page).flat()}
                    renderItem={({ item, index }) =>
                        renderItemCall({ item, index })
                    }
                    keyExtractor={(item, index) => index.toString()}
                    ListEmptyComponent={renderItemEmpty}
                    ListFooterComponent={renderFooter}
                    onEndReached={loadMore}
                    onEndReachedThreshold={0.5}
                />
            ) : (
                Array(4).fill(<ShimerPlaceHolderCardSNVTs />)
            )}
            <Loading ref={refLoading} />
            <ModalFiltroData
                ref={ModalFiltroDataRef}
                clear={() => {
                    setFilterOptions({
                        cd_pessoa_fisica: Paciente,
                        dataInicio: moment().format('YYYY-MM-DD'),
                        dataFinal: moment().format('YYYY-MM-DD'),
                    });
                    ModalFiltroDataRef.current?.closeModal();
                }}
                onPress={(initialDate, endDate) => {
                    setFilterOptions({
                        cd_pessoa_fisica: Paciente,
                        dataInicio: moment(initialDate, 'DD/MM/YYYY').format(
                            'YYYY-MM-DD',
                        ),
                        dataFinal: moment(endDate, 'DD/MM/YYYY').format(
                            'YYYY-MM-DD',
                        ),
                    });
                    ModalFiltroDataRef.current?.closeModal();
                }}
            />
            <ModalCentralizedOptions
                animationType={'slide'}
                ref={refModalOptions}
                message={'Deseja inativar este Sinal Vital ?'}
                onpress={() => InativarSinalVital()}
            />
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
            backgroundColor: theme.colors.BACKGROUND_2,
        },
        cardStyle: {
            flex: 1,
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
            marginVertical: RFPercentage(0.5),
        },
        SubItem: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        box1: {
            flex: 0.7,
            paddingTop: 10,
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        box2: {
            flex: 5,
            margin: 10,
            justifyContent: 'center',
            alignItems: 'flex-start',
        },
        box3: {
            margin: 5,
            justifyContent: 'flex-start',
        },
        btn: {
            width: RFPercentage(5),
            height: RFPercentage(5),
            padding: 5,
            marginHorizontal: 5,
            marginVertical: RFPercentage(2),
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
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
        titleLabel: {
            alignSelf: 'center',
            paddingLeft: 10,
            textAlignVertical: 'center',
            ...Platform.select({
                ios: {
                    lineHeight: RFPercentage(6), // as same as height
                },
            }),
        },
    });
    return styles;
};

export default EndSinaisVitais;
