import {
    Dimensions,
    ListRenderItem,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { ThemeContextData } from '../../../contexts/themeContext';
import PessoaFisicaComponent from '../components/pessoaFisicaComponent/pessoaFisicaComponent';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../routes/routeDashboard';
import { useThemeAwareObject } from '../../../hooks/useThemedStyles';
import Loading, { LoadHandles } from '../../../components/Loading/Loading';
import {
    IFamiliar,
    useGetFamiliar,
    useVincularFamiliar,
} from '../../../hooks/useFamiliar';
import { FlatList } from 'react-native-gesture-handler';
import ShimerPlaceHolderCardSNVTs from '../../../components/shimmerPlaceHolder/shimerPlaceHolderCardSNVTs';
import ModalCentralizedOptions, {
    ModalHandles,
} from '../../../components/Modais/ModalCentralizedOptions';
import MenuPopUp from '../../../components/menuPopUp/menuPopUp';
import moment from 'moment';

type ProfileScreenRouteProp = RouteProp<
    RootStackParamList,
    'AcompanhateSinaisVitais'
>;
interface Props {
    route: ProfileScreenRouteProp;
}

const AcompanhateSinaisVitais = ({ route }: Props) => {
    const styles = useThemeAwareObject(createStyle);

    const navigation = useNavigation();

    const refModal = useRef<LoadHandles>(null);
    const refModalOptions = useRef<ModalHandles>(null);

    const [acompanhante, setAcompanhante] = useState<IFamiliar | undefined>();

    const {
        data: listFamiliar,
        isFetching,
        refetch,
    } = useGetFamiliar(route.params.PessoaFisica.cD_PESSOA_FISICA);

    const { mutateAsync } = useVincularFamiliar();

    const vincularAcompanhante = async (item?: IFamiliar) => {
        try {
            if (item) {
                refModal.current?.openModal();
                await mutateAsync({
                    cod_Grau_Parentesco: item.cod_Grau_Parentesco,
                    cod_Pf_Familiar: item.cod_Pf_Familiar,
                    cod_Pf_Paciente: item.cod_Pf_Paciente,
                    cod_Pf_Profissional: item.cod_Pf_Profissional,
                    dt_Atualizacao: item.dt_Atualizacao,
                    dt_Registro: item.dt_Registro,
                    ie_Sexo: item.ie_Sexo,
                    ie_Situacao: item.ie_Situacao,
                    nm_Usuario: item.nm_Usuario,
                    nm_Usuario_Reg: item.nm_Usuario_Reg,
                });
                refModal.current?.closeModal();
            }
        } catch (error) {
            refModal.current?.closeModal();
        }
    };

    const addAcompanhante = (item: IFamiliar) => {
        refModalOptions.current?.openModal();
        setAcompanhante(item);
    };

    const renderItem: ListRenderItem<IFamiliar> = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => addAcompanhante(item)}
                style={styles.cards}>
                <View style={styles.box1}>
                    {/* <HistorySvg
                        width={RFPercentage(5)}
                        height={RFPercentage(5)}>
                        Botão
                    </HistorySvg> */}
                </View>
                <View style={styles.box2}>
                    <View style={styles.item}>
                        <Text style={styles.textLabel}>Acompanhante: </Text>
                        <Text
                            style={
                                styles.text
                            }>{`${item?.pessoaFisicaSimplificadoSqlServer?.nm_Pessoa_Fisica?.toUpperCase()}`}</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.textLabel}>
                            Data de nascimento:{' '}
                        </Text>
                        <Text style={styles.text}>
                            {moment(
                                item.pessoaFisicaSimplificadoSqlServer
                                    .dt_Nascimento,
                            ).format('DD-MM-YYYY')}
                        </Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.textLabel}>
                            Grau de parentesco:{' '}
                        </Text>
                        <Text style={styles.text}>
                            {item.desc_Grau_Parentesco}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    const EmptyComponent = () => (
        <View style={styles.viewEmpty}>
            <Text style={styles.textEmpty}>
                Paciente não possui acompanhante cadastrado.
            </Text>
        </View>
    );

    const MenuPopUpOptions = async (itemSelected: string) => {
        switch (itemSelected) {
            case 'Adicionar Acompanhante':
                navigation.navigate('addAcompanhanteSinaisVitais', {
                    PessoaFisica: route.params.PessoaFisica,
                });
                break;
            default:
                break;
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Text style={styles.title}>Paciente</Text>
                <PessoaFisicaComponent
                    PessoaFisica={route.params.PessoaFisica}
                />
            </View>
            <View style={[styles.box, styles.boxTitle]}>
                <Text style={styles.title}>Acompanhantes Cadastrados</Text>
                <View style={styles.menu}>
                    <MenuPopUp
                        widthMenu={RFPercentage(31)}
                        btnLabels={['Adicionar Acompanhante']}
                        onpress={(item) => MenuPopUpOptions(item)}
                    />
                </View>
            </View>
            <View style={styles.boxCards}>
                {isFetching ? (
                    Array(3).fill(<ShimerPlaceHolderCardSNVTs />)
                ) : (
                    <FlatList
                        data={listFamiliar}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderItem}
                        showsHorizontalScrollIndicator={false}
                        ListEmptyComponent={EmptyComponent}
                    />
                )}
            </View>
            <Loading ref={refModal} />
            <ModalCentralizedOptions
                ref={refModalOptions}
                message={'Deseja vincular o acompanhante ?'}
                onpress={() => vincularAcompanhante(acompanhante)}
            />
        </View>
    );
};

export default AcompanhateSinaisVitais;

const createStyle = (theme: ThemeContextData) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            backgroundColor: theme.colors.BACKGROUND_2,
        },
        box: {
            width: '100%',
            backgroundColor: theme.colors.BACKGROUND_1,
            padding: RFPercentage(1),
            paddingVertical: RFPercentage(2),
            marginTop: RFPercentage(2),
        },
        boxCards: {
            flex: 1,
            marginVertical: RFPercentage(2),
        },
        boxTitle: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        },
        menu: {
            position: 'absolute',
            right: 0,
            marginHorizontal: 10,
        },
        cards: {
            width: (Dimensions.get('screen').width / 100) * 95,
            borderRadius: 10,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            backgroundColor: theme.colors.BACKGROUND_1,
            margin: 10,
            paddingVertical: RFPercentage(1),
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
        title: {
            margin: 10,
            fontFamily: theme.typography.FONTES.Bold,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_SECONDARY,
            fontSize: theme.typography.SIZE.fontysize16,
            textAlign: 'center',
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
        textEmpty: {
            fontFamily: theme.typography.FONTES.Bold,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_SECONDARY,
            fontSize: theme.typography.SIZE.fontysize16,
            marginHorizontal: 10,
            textAlign: 'center',
        },
        viewEmpty: {
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: RFValue(22, 680),
        },
    });
    return styles;
};
