import AnimatedLottieView from 'lottie-react-native';
import React, {
    useRef,
    useState,
    useCallback,
    useImperativeHandle,
    useContext,
} from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
    Modal,
    Platform,
    ViewStyle,
    TouchableOpacity,
    Text,
    StyleProp,
    FlatList,
    ListRenderItem,
} from 'react-native';
import Animated, {
    withTiming,
    useAnimatedStyle,
    interpolateColor,
    useDerivedValue,
} from 'react-native-reanimated';
import { RFPercentage } from 'react-native-responsive-fontsize';
import SinaisVitaisContext from '../../contexts/sinaisVitaisContext';
import { ThemeContextData } from '../../contexts/themeContext';
import { useThemeAwareObject } from '../../hooks/useThemedStyles';
import { IAlertaPaciente } from '../../reducers/ConsultasReducer';
import CardSimples from '../Cards/CardSimples';
import ListAlertas from './ListAlertas';

interface Props {
    activeModal?: boolean;
    styleModal?: StyleProp<ViewStyle>;
    styleContainerImg?: StyleProp<ViewStyle>;
    animationType?: 'none' | 'slide' | 'fade';
}

export interface ModalHandles {
    openModal(): void;
    closeModal(): void;
}

type ThemeOpacity = 'light' | 'dark';

const list: IAlertaPaciente[] = [
    {
        nR_SEQUENCIA: 562,
        nM_USUARIO: 'amedina',
        iE_CONFIRMACAO: 'C',
        dT_ATUALIZACAO: '2021-06-08T09:39:01',
        dT_REGISTRO: '2021-06-08T09:38:19',
        cD_PESSOA_FISICA: '9969',
        nR_SEQ_TIPO: 1,
        dS_OBSERVACAO:
            'Paciente refere intolerãncia ao TRAMADOL-vômitos em jato.',
        iE_INTENSIDADE: 'M',
        nR_ATENDIMENTO: 89643,
        dT_ATUALIZACAO_NREC: '2021-06-08T09:39:01',
        nM_USUARIO_NREC: 'amedina',
        dT_LIBERACAO: '2021-06-08T09:39:04',
        nM_USUARIO_LIBERACAO: 'amedina',
        iE_NEGA_ALERGIAS: 'N',
        cD_PERFIL_ATIVO: 1997,
        iE_ALERTA: 'S',
        cD_SETOR_ATENDIMENTO: 75,
        cD_PROFISSIONAL: '134',
        dS_UTC_ATUALIZACAO: '08/06/2021T09:39:04',
        dS_UTC: '08/06/2021T09:38:19',
        iE_LISTA_PROBLEMA: 'N',
        iE_ACAO: 'U',
        dS_TIPO_ALERGIA: 'Medicamento',
    },
    {
        nR_SEQUENCIA: 562,
        nM_USUARIO: 'amedina',
        iE_CONFIRMACAO: 'C',
        dT_ATUALIZACAO: '2021-06-08T09:39:01',
        dT_REGISTRO: '2021-06-08T09:38:19',
        cD_PESSOA_FISICA: '9969',
        nR_SEQ_TIPO: 1,
        dS_OBSERVACAO:
            'Paciente refere intolerãncia ao TRAMADOL-vômitos em jato.',
        iE_INTENSIDADE: 'M',
        nR_ATENDIMENTO: 89643,
        dT_ATUALIZACAO_NREC: '2021-06-08T09:39:01',
        nM_USUARIO_NREC: 'amedina',
        dT_LIBERACAO: '2021-06-08T09:39:04',
        nM_USUARIO_LIBERACAO: 'amedina',
        iE_NEGA_ALERGIAS: 'N',
        cD_PERFIL_ATIVO: 1997,
        iE_ALERTA: 'S',
        cD_SETOR_ATENDIMENTO: 75,
        cD_PROFISSIONAL: '134',
        dS_UTC_ATUALIZACAO: '08/06/2021T09:39:04',
        dS_UTC: '08/06/2021T09:38:19',
        iE_LISTA_PROBLEMA: 'N',
        iE_ACAO: 'U',
        dS_TIPO_ALERGIA: 'Medicamento',
    },
    {
        nR_SEQUENCIA: 562,
        nM_USUARIO: 'amedina',
        iE_CONFIRMACAO: 'C',
        dT_ATUALIZACAO: '2021-06-08T09:39:01',
        dT_REGISTRO: '2021-06-08T09:38:19',
        cD_PESSOA_FISICA: '9969',
        nR_SEQ_TIPO: 1,
        dS_OBSERVACAO:
            'Paciente refere intolerãncia ao TRAMADOL-vômitos em jato.',
        iE_INTENSIDADE: 'M',
        nR_ATENDIMENTO: 89643,
        dT_ATUALIZACAO_NREC: '2021-06-08T09:39:01',
        nM_USUARIO_NREC: 'amedina',
        dT_LIBERACAO: '2021-06-08T09:39:04',
        nM_USUARIO_LIBERACAO: 'amedina',
        iE_NEGA_ALERGIAS: 'N',
        cD_PERFIL_ATIVO: 1997,
        iE_ALERTA: 'S',
        cD_SETOR_ATENDIMENTO: 75,
        cD_PROFISSIONAL: '134',
        dS_UTC_ATUALIZACAO: '08/06/2021T09:39:04',
        dS_UTC: '08/06/2021T09:38:19',
        iE_LISTA_PROBLEMA: 'N',
        iE_ACAO: 'U',
        dS_TIPO_ALERGIA: 'Medicamento',
    },
    {
        nR_SEQUENCIA: 562,
        nM_USUARIO: 'amedina',
        iE_CONFIRMACAO: 'C',
        dT_ATUALIZACAO: '2021-06-08T09:39:01',
        dT_REGISTRO: '2021-06-08T09:38:19',
        cD_PESSOA_FISICA: '9969',
        nR_SEQ_TIPO: 1,
        dS_OBSERVACAO:
            'Paciente refere intolerãncia ao TRAMADOL-vômitos em jato.',
        iE_INTENSIDADE: 'M',
        nR_ATENDIMENTO: 89643,
        dT_ATUALIZACAO_NREC: '2021-06-08T09:39:01',
        nM_USUARIO_NREC: 'amedina',
        dT_LIBERACAO: '2021-06-08T09:39:04',
        nM_USUARIO_LIBERACAO: 'amedina',
        iE_NEGA_ALERGIAS: 'N',
        cD_PERFIL_ATIVO: 1997,
        iE_ALERTA: 'S',
        cD_SETOR_ATENDIMENTO: 75,
        cD_PROFISSIONAL: '134',
        dS_UTC_ATUALIZACAO: '08/06/2021T09:39:04',
        dS_UTC: '08/06/2021T09:38:19',
        iE_LISTA_PROBLEMA: 'N',
        iE_ACAO: 'U',
        dS_TIPO_ALERGIA: 'Medicamento',
    },
    {
        nR_SEQUENCIA: 562,
        nM_USUARIO: 'amedina',
        iE_CONFIRMACAO: 'C',
        dT_ATUALIZACAO: '2021-06-08T09:39:01',
        dT_REGISTRO: '2021-06-08T09:38:19',
        cD_PESSOA_FISICA: '9969',
        nR_SEQ_TIPO: 1,
        dS_OBSERVACAO:
            'Paciente refere intolerãncia ao TRAMADOL-vômitos em jato.',
        iE_INTENSIDADE: 'M',
        nR_ATENDIMENTO: 89643,
        dT_ATUALIZACAO_NREC: '2021-06-08T09:39:01',
        nM_USUARIO_NREC: 'amedina',
        dT_LIBERACAO: '2021-06-08T09:39:04',
        nM_USUARIO_LIBERACAO: 'amedina',
        iE_NEGA_ALERGIAS: 'N',
        cD_PERFIL_ATIVO: 1997,
        iE_ALERTA: 'S',
        cD_SETOR_ATENDIMENTO: 75,
        cD_PROFISSIONAL: '134',
        dS_UTC_ATUALIZACAO: '08/06/2021T09:39:04',
        dS_UTC: '08/06/2021T09:38:19',
        iE_LISTA_PROBLEMA: 'N',
        iE_ACAO: 'U',
        dS_TIPO_ALERGIA: 'Medicamento',
    },
    {
        nR_SEQUENCIA: 562,
        nM_USUARIO: 'amedina',
        iE_CONFIRMACAO: 'C',
        dT_ATUALIZACAO: '2021-06-08T09:39:01',
        dT_REGISTRO: '2021-06-08T09:38:19',
        cD_PESSOA_FISICA: '9969',
        nR_SEQ_TIPO: 1,
        dS_OBSERVACAO:
            'Paciente refere intolerãncia ao TRAMADOL-vômitos em jato.',
        iE_INTENSIDADE: 'M',
        nR_ATENDIMENTO: 89643,
        dT_ATUALIZACAO_NREC: '2021-06-08T09:39:01',
        nM_USUARIO_NREC: 'amedina',
        dT_LIBERACAO: '2021-06-08T09:39:04',
        nM_USUARIO_LIBERACAO: 'amedina',
        iE_NEGA_ALERGIAS: 'N',
        cD_PERFIL_ATIVO: 1997,
        iE_ALERTA: 'S',
        cD_SETOR_ATENDIMENTO: 75,
        cD_PROFISSIONAL: '134',
        dS_UTC_ATUALIZACAO: '08/06/2021T09:39:04',
        dS_UTC: '08/06/2021T09:38:19',
        iE_LISTA_PROBLEMA: 'N',
        iE_ACAO: 'U',
        dS_TIPO_ALERGIA: 'Medicamento',
    },
    {
        nR_SEQUENCIA: 562,
        nM_USUARIO: 'amedina',
        iE_CONFIRMACAO: 'C',
        dT_ATUALIZACAO: '2021-06-08T09:39:01',
        dT_REGISTRO: '2021-06-08T09:38:19',
        cD_PESSOA_FISICA: '9969',
        nR_SEQ_TIPO: 1,
        dS_OBSERVACAO:
            'Paciente refere intolerãncia ao TRAMADOL-vômitos em jato.',
        iE_INTENSIDADE: 'M',
        nR_ATENDIMENTO: 89643,
        dT_ATUALIZACAO_NREC: '2021-06-08T09:39:01',
        nM_USUARIO_NREC: 'amedina',
        dT_LIBERACAO: '2021-06-08T09:39:04',
        nM_USUARIO_LIBERACAO: 'amedina',
        iE_NEGA_ALERGIAS: 'N',
        cD_PERFIL_ATIVO: 1997,
        iE_ALERTA: 'S',
        cD_SETOR_ATENDIMENTO: 75,
        cD_PROFISSIONAL: '134',
        dS_UTC_ATUALIZACAO: '08/06/2021T09:39:04',
        dS_UTC: '08/06/2021T09:38:19',
        iE_LISTA_PROBLEMA: 'N',
        iE_ACAO: 'U',
        dS_TIPO_ALERGIA: 'Medicamento',
    },
    {
        nR_SEQUENCIA: 562,
        nM_USUARIO: 'amedina',
        iE_CONFIRMACAO: 'C',
        dT_ATUALIZACAO: '2021-06-08T09:39:01',
        dT_REGISTRO: '2021-06-08T09:38:19',
        cD_PESSOA_FISICA: '9969',
        nR_SEQ_TIPO: 1,
        dS_OBSERVACAO:
            'Paciente refere intolerãncia ao TRAMADOL-vômitos em jato.',
        iE_INTENSIDADE: 'M',
        nR_ATENDIMENTO: 89643,
        dT_ATUALIZACAO_NREC: '2021-06-08T09:39:01',
        nM_USUARIO_NREC: 'amedina',
        dT_LIBERACAO: '2021-06-08T09:39:04',
        nM_USUARIO_LIBERACAO: 'amedina',
        iE_NEGA_ALERGIAS: 'N',
        cD_PERFIL_ATIVO: 1997,
        iE_ALERTA: 'S',
        cD_SETOR_ATENDIMENTO: 75,
        cD_PROFISSIONAL: '134',
        dS_UTC_ATUALIZACAO: '08/06/2021T09:39:04',
        dS_UTC: '08/06/2021T09:38:19',
        iE_LISTA_PROBLEMA: 'N',
        iE_ACAO: 'U',
        dS_TIPO_ALERGIA: 'Medicamento',
    },
    {
        nR_SEQUENCIA: 562,
        nM_USUARIO: 'amedina',
        iE_CONFIRMACAO: 'C',
        dT_ATUALIZACAO: '2021-06-08T09:39:01',
        dT_REGISTRO: '2021-06-08T09:38:19',
        cD_PESSOA_FISICA: '9969',
        nR_SEQ_TIPO: 1,
        dS_OBSERVACAO:
            'Paciente refere intolerãncia ao TRAMADOL-vômitos em jato.',
        iE_INTENSIDADE: 'M',
        nR_ATENDIMENTO: 89643,
        dT_ATUALIZACAO_NREC: '2021-06-08T09:39:01',
        nM_USUARIO_NREC: 'amedina',
        dT_LIBERACAO: '2021-06-08T09:39:04',
        nM_USUARIO_LIBERACAO: 'amedina',
        iE_NEGA_ALERGIAS: 'N',
        cD_PERFIL_ATIVO: 1997,
        iE_ALERTA: 'S',
        cD_SETOR_ATENDIMENTO: 75,
        cD_PROFISSIONAL: '134',
        dS_UTC_ATUALIZACAO: '08/06/2021T09:39:04',
        dS_UTC: '08/06/2021T09:38:19',
        iE_LISTA_PROBLEMA: 'N',
        iE_ACAO: 'U',
        dS_TIPO_ALERGIA: 'Medicamento',
    },
    {
        nR_SEQUENCIA: 562,
        nM_USUARIO: 'amedina',
        iE_CONFIRMACAO: 'C',
        dT_ATUALIZACAO: '2021-06-08T09:39:01',
        dT_REGISTRO: '2021-06-08T09:38:19',
        cD_PESSOA_FISICA: '9969',
        nR_SEQ_TIPO: 1,
        dS_OBSERVACAO:
            'Paciente refere intolerãncia ao TRAMADOL-vômitos em jato.',
        iE_INTENSIDADE: 'M',
        nR_ATENDIMENTO: 89643,
        dT_ATUALIZACAO_NREC: '2021-06-08T09:39:01',
        nM_USUARIO_NREC: 'amedina',
        dT_LIBERACAO: '2021-06-08T09:39:04',
        nM_USUARIO_LIBERACAO: 'amedina',
        iE_NEGA_ALERGIAS: 'N',
        cD_PERFIL_ATIVO: 1997,
        iE_ALERTA: 'S',
        cD_SETOR_ATENDIMENTO: 75,
        cD_PROFISSIONAL: '134',
        dS_UTC_ATUALIZACAO: '08/06/2021T09:39:04',
        dS_UTC: '08/06/2021T09:38:19',
        iE_LISTA_PROBLEMA: 'N',
        iE_ACAO: 'U',
        dS_TIPO_ALERGIA: 'Medicamento',
    },
    {
        nR_SEQUENCIA: 562,
        nM_USUARIO: 'amedina',
        iE_CONFIRMACAO: 'C',
        dT_ATUALIZACAO: '2021-06-08T09:39:01',
        dT_REGISTRO: '2021-06-08T09:38:19',
        cD_PESSOA_FISICA: '9969',
        nR_SEQ_TIPO: 1,
        dS_OBSERVACAO:
            'Paciente refere intolerãncia ao TRAMADOL-vômitos em jato.',
        iE_INTENSIDADE: 'M',
        nR_ATENDIMENTO: 89643,
        dT_ATUALIZACAO_NREC: '2021-06-08T09:39:01',
        nM_USUARIO_NREC: 'amedina',
        dT_LIBERACAO: '2021-06-08T09:39:04',
        nM_USUARIO_LIBERACAO: 'amedina',
        iE_NEGA_ALERGIAS: 'N',
        cD_PERFIL_ATIVO: 1997,
        iE_ALERTA: 'S',
        cD_SETOR_ATENDIMENTO: 75,
        cD_PROFISSIONAL: '134',
        dS_UTC_ATUALIZACAO: '08/06/2021T09:39:04',
        dS_UTC: '08/06/2021T09:38:19',
        iE_LISTA_PROBLEMA: 'N',
        iE_ACAO: 'U',
        dS_TIPO_ALERGIA: 'Medicamento',
    },
];

const ModalAlertPaciente = React.forwardRef<ModalHandles, Props>(
    (
        {
            animationType = 'none',
            styleContainerImg,
            styleModal,
            activeModal = false,
        }: Props,
        ref,
    ) => {
        const { useAlerts } = useContext(SinaisVitaisContext);
        const { data } = useAlerts();

        const styles = useThemeAwareObject(createStyles);
        const _view = useRef<any>(null);
        const [active, setActive] = useState(activeModal);
        const [theme, setTheme] = useState<ThemeOpacity>('light');

        const closeModal = useCallback(() => {
            setTheme('light');
            setActive(false);
        }, []);

        const openModal = useCallback(() => {
            setActive(true);
        }, []);

        useImperativeHandle(ref, () => {
            return {
                openModal,
                closeModal,
            };
        });

        const progress = useDerivedValue(() => {
            return theme === 'dark' ? withTiming(0, { duration: 500 }) : 1;
        }, [theme]);

        const animatedStyles = useAnimatedStyle(() => {
            const backgroundColor = interpolateColor(
                progress.value,
                [0, 1],
                ['rgba(0,0,0,.8)', 'rgba(0,0,0,.0)'],
            );
            return {
                backgroundColor,
            };
        });

        const Status = ({ item }: { item: IAlertaPaciente }) => {
            switch (item.iE_CONFIRMACAO) {
                case 'C':
                    return (
                        <View style={styles.item}>
                            <Text style={styles.label}>Status:</Text>
                            <Text style={styles.text}>Confirmada</Text>
                        </View>
                    );
                case 'S':
                    return (
                        <View style={styles.item}>
                            <Text style={styles.label}>Status:</Text>
                            <Text style={styles.text}>Suspeita</Text>
                        </View>
                    );
                default:
                    return null;
            }
        };

        const Observacao = ({ item }: { item: IAlertaPaciente }) => {
            if (item.dS_OBSERVACAO) {
                return (
                    <View style={styles.item}>
                        <Text style={styles.label}>Observação</Text>
                        <Text style={styles.text}>{item.dS_OBSERVACAO}</Text>
                    </View>
                );
            } else {
                return null;
            }
        };

        const renderItem: ListRenderItem<IAlertaPaciente> = ({ item }) => (
            <CardSimples styleCardContainer={styles.card}>
                <TouchableOpacity>
                    <>
                        <Status item={item} />
                        <Observacao item={item} />
                    </>
                </TouchableOpacity>
            </CardSimples>
        );

        /* const renderItemEmpty = () => {
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
        }; */

        return (
            <>
                <TouchableOpacity
                    onPress={() => openModal()}
                    style={[styles.container, styleContainerImg]}>
                    <AnimatedLottieView
                        source={require('../../assets/Animacoes/alert-notification.json')}
                        autoPlay={Boolean(data)}
                        loop={true}
                        style={styles.emoji}
                    />
                </TouchableOpacity>
                <View>
                    <Modal
                        animationType={animationType}
                        transparent={true}
                        visible={active}
                        onShow={() => setTheme('dark')}>
                        <Animated.View
                            style={[styles.centeredView, animatedStyles]}
                            ref={_view}
                            onStartShouldSetResponder={(evt) => {
                                evt.persist();
                                if (
                                    evt.nativeEvent.target ===
                                    _view.current?._nativeTag
                                ) {
                                    closeModal();
                                }
                                return true;
                            }}>
                            <SafeAreaView
                                style={[styles.modalView, styleModal]}>
                                <Text style={styles.Titulo}>
                                    (Alergias / Reações adversas)
                                </Text>
                                {data && (
                                    <FlatList
                                        data={list}
                                        renderItem={renderItem}
                                    />
                                )}
                            </SafeAreaView>
                        </Animated.View>
                    </Modal>
                </View>
            </>
        );
    },
);

ModalAlertPaciente.displayName = 'ModalAlertPaciente';

export default ModalAlertPaciente;

const createStyles = (theme: ThemeContextData) => {
    const styles = StyleSheet.create({
        container: {
            width: RFPercentage(4),
            height: RFPercentage(4),
            justifyContent: 'center',
            alignItems: 'center',
        },
        emoji: {
            width: RFPercentage(8),
            height: RFPercentage(8),
        },
        centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.colors.BACKDROP,
        },
        modalView: {
            maxHeight: '50%',
            minHeight: '20%',
            backgroundColor: theme.colors.BACKGROUND_1,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: theme.colors.BACKDROP,
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
        Titulo: {
            paddingVertical: 10,
            fontSize: theme.typography.SIZE.fontysize16,
            fontFamily: theme.typography.FONTES.Regular,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_PRIMARY,
        },
        card: {
            padding: RFPercentage(2),
            flexDirection: 'column',
            alignItems: 'flex-start',
        },
        item: {
            flexDirection: 'column',
            marginVertical: RFPercentage(0.5),
        },
        label: {
            fontSize: theme.typography.SIZE.fontysize14,
            fontFamily: theme.typography.FONTES.Bold,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_PRIMARY,
        },
        text: {
            fontSize: theme.typography.SIZE.fontysize14,
            fontFamily: theme.typography.FONTES.Regular,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_SECONDARY,
        },
    });
    return styles;
};
