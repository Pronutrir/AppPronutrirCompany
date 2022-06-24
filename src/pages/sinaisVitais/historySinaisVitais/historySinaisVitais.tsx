import React, {
    useState,
    useContext,
    useCallback,
    memo,
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
import CardSimples from '../../../components/Cards/CardSimples';
import { RFPercentage } from 'react-native-responsive-fontsize';
import HistorySvg from '../../../assets/svg/historico.svg';
import ModalCentralizedOptions, {
    ModalHandles,
} from '../../../components/Modais/ModalCentralizedOptions';
import MenuPopUp, {
    ModalHandlesMenu,
} from '../../../components/menuPopUp/menuPopUp';
import Loading, { LoadHandles } from '../../../components/Loading/Loading';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import SinaisVitaisContext, {
    IInativarSinaisVitais,
} from '../../../contexts/sinaisVitaisContext';
import { ISinaisVitais } from '../../../reducers/ConsultasReducer';
import ShimerPlaceHolderCardSNVTs from '../../../components/shimmerPlaceHolder/shimerPlaceHolderCardSNVTs';
import { useSinaisVitaisAll, useSinaisVitaisFilter } from '../../../hooks/useSinaisVitais';
import { ThemeContextData } from '../../../contexts/themeContext';
import { useThemeAwareObject } from '../../../hooks/useThemedStyles';
import AuthContext from '../../../contexts/auth';
export interface PessoaSelected {
    cD_PESSOA_FISICA: string;
    nM_PESSOA_FISICA: string;
    dT_NASCIMENTO: string;
}
interface Parms {
    item: ISinaisVitais;
    index: number;
}

focusManager.setEventListener((handleFocus) => {
    const subscription = AppState.addEventListener('change', (state) => {
        handleFocus(state === 'active');
    });

    return () => {
        subscription;
        //subscription.remove()
    };
});

const HistorySinaisVitais: React.FC = () => {

    const { stateAuth: { usertasy } } = useContext(AuthContext);

    const styles = useThemeAwareObject(createStyles);
    const navigation = useNavigation();
    const {
        ValidationAutorizeEnfermagem,
        InativarSinaisVitais,
        UpdateSinaisVitais,
        AddSinaisVitais,
    } = useContext(SinaisVitaisContext);

    const { refetch: refetchSinaisVitais } = useSinaisVitaisAll();

    const {
        data: historySinaisVitais,
        refetch,
        isLoading,
        isFetching,
    } = useSinaisVitaisFilter(usertasy.cD_PESSOA_FISICA);

    const refModalOptions = useRef<ModalHandles>(null);
    const refMenuPopUp = useRef<ModalHandlesMenu>(null);
    const refLoading = useRef<LoadHandles>(null);

    const [selectedSinais, setSelectedSinais] =
        useState<IInativarSinaisVitais>();

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
            await refetchSinaisVitais();
            refLoading.current?.closeModal();
        }
    };

    const MenuPopUpOptions = (itemSelected: string, item: ISinaisVitais) => {
        switch (itemSelected) {
            case 'Editar':
                RedirectNavigation(item);
                break;
            case 'Excluir':
                setSelectedSinaisInativar(item);
                break;
            default:
                break;
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

    const Item = memo<Parms>(({ item }) => {
        return (
            <View style={{ flexDirection: 'row' }}>
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
                    <ComplementoEnfermagem item={item} />
                </View>
                <View style={styles.box3}>
                    <MenuPopUp
                        ref={refMenuPopUp}
                        btnLabels={['Editar', 'Excluir']}
                        onpress={(label) => {
                            refMenuPopUp.current?.hideMenu(),
                                MenuPopUpOptions(label, item);
                        }}
                    />
                </View>
            </View>
        );
    });

    Item.displayName = 'Item';

    const renderItem = useCallback(
        ({ item, index }: { item: ISinaisVitais; index: number }) => {
            return (
                <CardSimples styleCardContainer={styles.cardStyle}>
                    <Item key={item.nM_USUARIO} item={item} index={index} />
                </CardSimples>
            );
        },
        [],
    );

    const renderItemEmpty = () => (
        <CardSimples styleCardContainer={styles.cardStyle}>
            <Text style={styles.text}>Nenhum Histórico encontrado!</Text>
        </CardSimples>
    );

    const renderItemCall = useCallback(
        ({ item, index }) => renderItem({ item, index }),
        [],
    );

    useEffect(() => {
        refetch();
    }, [UpdateSinaisVitais, AddSinaisVitais]);

    return (
        <View style={styles.container}>
            {!isFetching ? (
                <FlatList
                    data={historySinaisVitais}
                    renderItem={renderItemCall}
                    keyExtractor={(item, index) => index.toString()}
                    refreshing={isLoading}
                    onRefresh={refetch}
                    ListEmptyComponent={renderItemEmpty}
                />
            ) : (
                Array(4).fill(<ShimerPlaceHolderCardSNVTs />)
            )}
            <Loading ref={refLoading} />
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
            flex: 0.7,
            paddingTop: 10,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
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
    });
    return styles;
};

export { HistorySinaisVitais };
