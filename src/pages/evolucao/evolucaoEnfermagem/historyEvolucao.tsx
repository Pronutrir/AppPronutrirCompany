import {
    Dimensions,
    FlatList,
    StyleSheet,
    Text,
    View,
    Platform,
} from 'react-native';
import React, { useContext, useRef, useState } from 'react';
import {
    useHistoryEvolucao,
    IEvolucaoHistory,
    useDeleteEvoluçaoEnfermagem,
    useLiberarEvolucao,
} from '../../../hooks/useEvolucao';
import AuthContext from '../../../contexts/auth';
import CardSimples from '../../../components/Cards/CardSimples';
import { RFPercentage } from 'react-native-responsive-fontsize';
import HistorySvg from '../../../assets/svg/historico.svg';
import moment from 'moment';
import ShimerPlaceHolderCardSNVTs from '../../../components/shimmerPlaceHolder/shimerPlaceHolderCardSNVTs';
import { useThemeAwareObject } from '../../../hooks/useThemedStyles';
import { ThemeContextData } from '../../../contexts/themeContext';
import MenuPopUp, {
    ModalHandlesMenu,
} from '../../../components/menuPopUp/menuPopUp';
import { RouteProp, useNavigation } from '@react-navigation/native';
import Loading, { LoadHandles } from '../../../components/Loading/Loading';
import CheckEvolucaoComponent from '../components/checkEvolucaoComponent/checkEvolucaoComponent';
import ModalCentralizedOptions, {
    ModalHandles,
} from '../../../components/Modais/ModalCentralizedOptions';
import NotificationInfor from '../../../components/Notification/NotificationInfor';
import Infomation from '../../../assets/svg/informacoes.svg';
import { RootStackParamList } from '../../../routes/routeDashboard';
import PressableRipple from '../../../components/ripple/PressableRipple';
import ActiveIndicator from '../../../components/Loading/ActiveIndicator';

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'HistoryEvolucao'>;
interface Props {
    route: ProfileScreenRouteProp;
}

const HistoryEvolucao: React.FC<Props> = ({ route }: Props) => {
    const navigation = useNavigation();
    const styles = useThemeAwareObject(createStyles);

    const refModal = useRef<LoadHandles>(null);
    const refModalBotom = useRef<ModalHandles>(null);

    const [evolucao, setEvolucao] = useState<IEvolucaoHistory | undefined>();

    const {
        stateAuth: {
            usertasy: { nM_USUARIO },
        },
    } = useContext(AuthContext);

    const {
        data,
        refetch,
        isFetching,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = useHistoryEvolucao({
        codPessoaFisica: route?.params.Filter.codPessoaFisica,
        codMedico: route?.params.Filter.codMedico,
    });

    const { mutateAsync: mutateAsyncDeleteEvoluçaoEnfermagem } =
        useDeleteEvoluçaoEnfermagem();

    const { mutateAsync: mutateAsyncLiberarEvolucao } = useLiberarEvolucao();

    const onDeleteEvolucao = async (item?: IEvolucaoHistory) => {
        if (item) {
            setTimeout(
                () => {
                    refModal.current?.openModal();
                },
                Platform.OS === 'android' ? 0 : 500,
            );
            await mutateAsyncDeleteEvoluçaoEnfermagem(item.cD_EVOLUCAO);
            await refetch();
            refModal.current?.closeModal();
        }
    };

    const onLiberarEvolucao = async (item: IEvolucaoHistory) => {
        setTimeout(
            () => {
                refModal.current?.openModal();
            },
            Platform.OS === 'android' ? 0 : 500,
        );
        await mutateAsyncLiberarEvolucao({
            cD_EVOLUCAO: item.cD_EVOLUCAO,
            nM_USUARIO: nM_USUARIO,
        });
        await refetch();
        refModal.current?.closeModal();
    };

    const MenuPopUpOptions = async (
        itemSelected: string,
        item: IEvolucaoHistory,
    ) => {
        switch (itemSelected) {
            case 'Visualizar':
                navigation.navigate('UpdateEvolucaoEnfermagem', {
                    Evolucao: item,
                });
                break;
            case 'Liberar':
                await onLiberarEvolucao(item);
                break;
            case 'Editar':
                navigation.navigate('UpdateEvolucaoEnfermagem', {
                    Evolucao: item,
                });
                break;
            case 'Excluir':
                {
                    setTimeout(
                        () => {
                            refModalBotom.current?.openModal();
                            setEvolucao(item);
                        },
                        Platform.OS === 'android' ? 0 : 500,
                    );
                }
                break;
            default:
                break;
        }
    };

    const activeMenuPopUp = (ref: React.RefObject<ModalHandlesMenu>) => {
        setTimeout(
            () => {
                ref.current?.showMenu();
            },
            Platform.OS === 'android' ? 0 : 500,
        );
    };

    const Item = ({ item }: { item: IEvolucaoHistory; index: number }) => {
        const refMenuBotom = useRef<ModalHandlesMenu>(null);
        return (
            <PressableRipple
                pressableProps={{
                    onLongPress: () => activeMenuPopUp(refMenuBotom),
                    onPress: () =>
                        navigation.navigate('UpdateEvolucaoEnfermagem', {
                            Evolucao: item,
                        }),
                }}
                childrenStyle={{ flexDirection: 'row' }}
                style={{ flex: 1 }}>
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
                            }>{`${item.nM_PACIENTE.toUpperCase()}`}</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.textLabel}>Data da evolução: </Text>
                        <Text style={styles.text}>{`${moment(
                            item.dT_EVOLUCAO,
                        ).format('DD-MM-YYYY [às] HH:mm')}`}</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.textLabel}>Profissional: </Text>
                        <Text style={styles.text}>{item.nM_PROFISSIONAL}</Text>
                    </View>
                </View>
                <View style={styles.box3}>
                    <View style={{ alignItems: 'flex-end' }}>
                        <MenuPopUp
                            ref={refMenuBotom}
                            btnVisible={false}
                            btnLabels={
                                item.dT_LIBERACAO
                                    ? ['Visualizar']
                                    : ['Liberar', 'Editar', 'Excluir']
                            }
                            onpress={(label) => {
                                refMenuBotom.current?.hideMenu(),
                                    MenuPopUpOptions(label, item);
                            }}
                        />
                    </View>
                    <View>
                        <CheckEvolucaoComponent Item={item.dT_LIBERACAO} />
                    </View>
                </View>
            </PressableRipple>
        );
    };

    const loadMore = () => {
        if (hasNextPage) {
            fetchNextPage();
        }
    };

    const renderItem = ({
        item,
        index,
    }: {
        item: IEvolucaoHistory;
        index: number;
    }) => (
        <CardSimples styleCardContainer={styles.cardStyle}>
            <Item key={index.toString()} item={item} index={index} />
        </CardSimples>
    );

    const renderItemEmpty = () => (
        <CardSimples styleCardContainer={styles.cardStyle}>
            <Text style={styles.text}>Nenhum Histórico encontrado!</Text>
        </CardSimples>
    );

    const renderFooter = () => {
        return <ActiveIndicator active={isFetchingNextPage} />;
    };

    return (
        <View style={styles.container}>
            {data ? (
                <>
                    <View
                        style={{
                            margin: RFPercentage(1),
                            marginBottom: RFPercentage(2.5),
                        }}>
                        <NotificationInfor
                            msn="Somente estará disponível para edição ou exclusão as evoluções que não estiverem liberadas."
                            iconeTop={Infomation}
                        />
                    </View>
                    <FlatList
                        data={data?.pages.map((page) => page).flat()}
                        renderItem={({ item, index }) =>
                            renderItem({ item, index })
                        }
                        keyExtractor={(item, index) => index.toString()}
                        refreshing={isFetching}
                        onRefresh={() => {
                            refetch();
                        }}
                        ListEmptyComponent={renderItemEmpty}
                        ListFooterComponent={renderFooter}
                        onEndReached={loadMore}
                        onEndReachedThreshold={0.5}
                    />
                </>
            ) : (
                Array(4).fill(<ShimerPlaceHolderCardSNVTs />)
            )}
            <ModalCentralizedOptions
                animationType={'slide'}
                ref={refModalBotom}
                message={'Deseja excluir este Sinal Vital ?'}
                onpress={() => onDeleteEvolucao(evolucao)}
            />
            <Loading ref={refModal} />
        </View>
    );
};

export default HistoryEvolucao;

const createStyles = (theme: ThemeContextData) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            width: Dimensions.get('screen').width,
        },
        box1: {
            flex: 0.6,
            margin: 3,
            justifyContent: 'center',
            alignItems: 'center',
        },
        box2: {
            flex: 5,
            justifyContent: 'center',
            alignItems: 'flex-start',
            margin: 3,
        },
        box3: {
            margin: 10,
            justifyContent: 'space-between',
        },
        cardStyle: {
            flex: 1,
            padding: RFPercentage(0.5),
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
    });
    return styles;
};
