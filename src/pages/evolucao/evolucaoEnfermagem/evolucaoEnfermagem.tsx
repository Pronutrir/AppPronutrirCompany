import React, { useContext, useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { ThemeContextData } from '../../../contexts/themeContext';
import { useThemeAwareObject } from '../../../hooks/useThemedStyles';
import BtnOptions from '../../../components/buttons/BtnOptions';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../routes/routeDashboard';
import SelectedNotaText from '../components/selectedNotaText/selectedNotaText';
import RichComponent from '../components/richComponent/richComponent';
import PessoaFisicaComponent from '../components/pessoaFisicaComponent/pessoaFisicaComponent';
import { QueryCache } from 'react-query';
import {
    useEvolucaoTextDefault,
    useAddEvoluçaoEnfermagem,
    IEvolucao,
    useLiberarEvolucao,
} from '../../../hooks/useEvolucao';
import moment from 'moment';
import Loading, { LoadHandles } from '../../../components/Loading/Loading';
import AuthContext from '../../../contexts/auth';
import MenuPopUp from '../../../components/menuPopUp/menuPopUp';
import ModalCentralizedOptions, {
    ModalHandles as ModalHandlesCentralizedOptions,
} from '../../../components/Modais/ModalCentralizedOptions';

type ProfileScreenRouteProp = RouteProp<
    RootStackParamList,
    'EvolucaoEnfermagem'
>;
interface Props {
    route: ProfileScreenRouteProp;
}

const EvolucaoEnfermagem: React.FC<Props> = ({
    route: {
        params: { PessoaFisica },
    },
}: Props) => {
    const {
        stateAuth: {
            usertasy: { usuariO_FUNCIONARIO_SETOR, cD_PESSOA_FISICA },
        },
    } = useContext(AuthContext);
    const navigation = useNavigation();
    const refModal = useRef<LoadHandles>(null);
    const refModalCentralizedOptions =
        useRef<ModalHandlesCentralizedOptions>(null);
    const styles = useThemeAwareObject(createStyles);

    const queryCache = new QueryCache();

    const [evolucao, setEvolucao] = useState<IEvolucao | null>();

    const evolucaoLiberacao = useRef<IEvolucao>();

    const [defaultText, setDefaultText] = useState<number | null>(null);

    const { data: resultTextDefault, isFetching } =
        useEvolucaoTextDefault(defaultText);

    const { mutateAsync: mutateAsyncEvoluçaoEnfermagem } =
        useAddEvoluçaoEnfermagem();

    const { mutateAsync: mutateAsyncLiberarEvolucao } = useLiberarEvolucao();

    const setTipoEvolucao = (item: string) => {
        if (item) {
            setEvolucao({
                ...evolucao,
                iE_TIPO_EVOLUCAO: 1,
                iE_SITUACAO: 'A',
                nM_USUARIO: usuariO_FUNCIONARIO_SETOR[0].nM_USUARIO,
                cD_MEDICO: cD_PESSOA_FISICA,
                cD_PESSOA_FISICA: PessoaFisica.cD_PESSOA_FISICA,
                dT_ATUALIZACAO: moment().format('YYYY-MM-DD HH:mm:ss'),
                dT_EVOLUCAO: moment().format('YYYY-MM-DD HH:mm:ss'),
            });
        }
    };

    const addEvolucaoEnfermagem = async (evolucao: IEvolucao) => {
        try {
            refModal.current?.openModal();
            const { result } = (await mutateAsyncEvoluçaoEnfermagem(evolucao))
                .data;
            evolucaoLiberacao.current = result;
            refModal.current?.closeModal();
            setTimeout(
                () => {
                    refModalCentralizedOptions.current?.openModal();
                },
                Platform.OS === 'android' ? 0 : 500,
            );
        } catch (error) {
            refModal.current?.closeModal();
        }
    };

    const onLiberarEvolucao = async () => {
        if (
            evolucaoLiberacao.current &&
            evolucaoLiberacao.current.cD_EVOLUCAO &&
            evolucaoLiberacao.current.nM_USUARIO
        ) {
            setTimeout(
                () => {
                    refModal.current?.openModal();
                },
                Platform.OS === 'android' ? 0 : 500,
            );
            await mutateAsyncLiberarEvolucao({
                cD_EVOLUCAO: evolucaoLiberacao.current.cD_EVOLUCAO,
                nM_USUARIO: evolucaoLiberacao.current.nM_USUARIO,
            });
            navigation.navigate({
                name: 'IndexEvolucao',
                params: { Index: 1 },
            });
            refModal.current?.closeModal();
        } else {
            console.log('teste');
        }
    };

    useEffect(() => {
        return () => {
            queryCache.clear();
        };
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <View style={styles.item1}>
                    <View
                        style={{
                            width: '100%',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                        <PessoaFisicaComponent PessoaFisica={PessoaFisica} />
                        <MenuPopUp
                            btnLabels={['Histórico']}
                            onpress={() =>
                                navigation.navigate('HistoryEvolucao', {
                                    Filter: {
                                        codPessoaFisica:
                                            PessoaFisica.cD_PESSOA_FISICA,
                                    },
                                })
                            }
                        />
                    </View>
                    <SelectedNotaText
                        onPressTipoNota={(item) =>
                            setTipoEvolucao(item.cD_TIPO_EVOLUCAO)
                        }
                        onPressTextPadrao={(item) =>
                            setDefaultText(item.nR_SEQUENCIA)
                        }
                    />
                </View>
                <RichComponent
                    shimerPlaceHolder={isFetching}
                    initialContentHTML={resultTextDefault?.dS_TEXTO}
                    onChanger={(item) => {
                        const textHtml = `<html tasy="html5"><body>${item}</body></html>`;
                        setEvolucao({ ...evolucao, dS_EVOLUCAO: textHtml });
                    }}
                />
            </View>
            {evolucao?.dS_EVOLUCAO && evolucao.iE_TIPO_EVOLUCAO && (
                <BtnOptions
                    valueText={'Enviar'}
                    onPress={() => addEvolucaoEnfermagem(evolucao)}
                />
            )}
            <Loading ref={refModal} />
            <ModalCentralizedOptions
                ref={refModalCentralizedOptions}
                message="Deseja liberar esta evolução ?"
                onpress={() => onLiberarEvolucao()}
            />
        </View>
    );
};

export default EvolucaoEnfermagem;

const createStyles = (theme: ThemeContextData) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.BACKGROUND_1,
        },
        box: {
            flex: 1,
            height: '100%',
        },
        item1: {
            padding: 10,
            alignItems: 'flex-start',
        },
    });
    return styles;
};
