import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useRef, useEffect } from 'react';
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
import { useNavigation } from '@react-navigation/native';
import Loading, { LoadHandles } from '../../../components/Loading/Loading';
import CheckEvolucaoComponent from '../components/checkEvolucaoComponent/checkEvolucaoComponent';

const HistoryEvolucao: React.FC = () => {
    const navigation = useNavigation();
    const styles = useThemeAwareObject(createStyles);
    const refMenuBotom = useRef<ModalHandlesMenu>(null);
    const refModal = useRef<LoadHandles>(null);

    const {
        stateAuth: {
            usertasy: { cD_PESSOA_FISICA },
        },
    } = useContext(AuthContext);
    const { data, refetch, isFetching } = useHistoryEvolucao(cD_PESSOA_FISICA);

    const { mutateAsync: mutateAsyncDeleteEvoluçaoEnfermagem } =
        useDeleteEvoluçaoEnfermagem();

    const { mutateAsync: mutateAsyncLiberarEvolucao } = useLiberarEvolucao();

    const onDeleteEvolucao = async (item: IEvolucaoHistory) => {
        refModal.current?.openModal();
        await mutateAsyncDeleteEvoluçaoEnfermagem(item.cD_EVOLUCAO);
        await refetch();
        refModal.current?.closeModal();
    };

    const onLiberarEvolucao = async (idEvolucao: number) => {
        refModal.current?.openModal();
        await mutateAsyncLiberarEvolucao(idEvolucao);
        await refetch();
        refModal.current?.closeModal();
    };

    const MenuPopUpOptions = async (
        itemSelected: string,
        item: IEvolucaoHistory,
    ) => {
        switch (itemSelected) {
            case 'Liberar':
                await onLiberarEvolucao(item.cD_EVOLUCAO);
                break;
            case 'Editar':
                navigation.navigate('UpdateEvolucaoEnfermagem', {
                    Evolucao: item,
                });
                break;
            case 'Excluir':
                await onDeleteEvolucao(item);
                break;
            default:
                break;
        }
    };

    const Item = ({ item }: { item: IEvolucaoHistory; index: number }) => {
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
                            }>{`${item.nM_PACIENTE.toUpperCase()}`}</Text>
                    </View>
                    {/* <View style={styles.item}>
                        <Text style={styles.textLabel}>Data de nascimento: </Text>
                        <Text style={styles.text}>{`${moment(
                            dT_NASCIMENTO,
                        ).format('DD-MM-YYYY')}`}</Text>
                    </View> */}
                    <View style={styles.item}>
                        <Text style={styles.textLabel}>Data da evolução: </Text>
                        <Text style={styles.text}>{`${moment(
                            item.dT_EVOLUCAO,
                        ).format('DD-MM-YYYY [às] HH:mm')}`}</Text>
                    </View>
                </View>
                <View style={styles.box3}>
                    <MenuPopUp
                        ref={refMenuBotom}
                        btnLabels={['Liberar', 'Editar', 'Excluir']}
                        onpress={(label) => {
                            refMenuBotom.current?.hideMenu(),
                                MenuPopUpOptions(label, item);
                        }}
                    />
                </View>
                <View style={{ marginVertical: 2 }}>
                    <CheckEvolucaoComponent Item={item.cD_PESSOA_FISICA} />
                </View>
            </View>
        );
    };

    const renderItem = ({
        item,
        index,
    }: {
        item: IEvolucaoHistory;
        index: number;
    }) => (
        <CardSimples styleCardContainer={styles.cardStyle}>
            <Item key={index} item={item} index={index} />
        </CardSimples>
    );

    return (
        <View style={styles.container}>
            {data ? (
                <FlatList
                    data={data}
                    renderItem={({ item, index }) =>
                        renderItem({ item, index })
                    }
                    keyExtractor={(item, index) => index.toString()}
                    refreshing={isFetching}
                    onRefresh={() => {
                        refetch();
                    }}
                    //ListEmptyComponent={renderItemEmpty}
                    //ListFooterComponent={renderFooter}
                    //onEndReached={loadMore}
                    onEndReachedThreshold={0.5}
                />
            ) : (
                Array(4).fill(<ShimerPlaceHolderCardSNVTs />)
            )}
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
            flex: 0.5,
            margin: 3,
            justifyContent: 'center',
        },
        box2: {
            flex: 5,
            justifyContent: 'center',
            alignItems: 'flex-start',
            margin: 3,
        },
        box3: {
            justifyContent: 'flex-start',
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
