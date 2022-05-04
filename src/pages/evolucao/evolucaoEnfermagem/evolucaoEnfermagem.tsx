import React, { useContext, useEffect, useRef, useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { ThemeContextData } from '../../../contexts/themeContext';
import { useThemeAwareObject } from '../../../hooks/useThemedStyles';
import BtnOptions from '../../../components/buttons/BtnOptions';
import { View } from 'react-native-animatable';
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
} from '../../../hooks/useEvolucao';
import moment from 'moment';
import Loading, { LoadHandles } from '../../../components/Loading/Loading';
import AuthContext from '../../../contexts/auth';

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
    const { stateAuth: { usertasy: { usuariO_FUNCIONARIO_SETOR, cD_PESSOA_FISICA }  } } = useContext(AuthContext);
    const navigation = useNavigation();
    const refModal = useRef<LoadHandles>(null);
    const styles = useThemeAwareObject(createStyles);

    const queryCache = new QueryCache();

    const [evolucao, setEvolucao] = useState<IEvolucao | null>();

    const [defaultText, setDefaultText] = useState<number | null>(null);

    const { data: resultTextDefault, isFetching } =
        useEvolucaoTextDefault(defaultText);
    const { mutateAsync: mutateAsyncEvoluçaoEnfermagem } =
        useAddEvoluçaoEnfermagem();

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
        refModal.current?.openModal();
        await mutateAsyncEvoluçaoEnfermagem(evolucao);
        refModal.current?.closeModal();
        navigation.reset({ index: 0, routes: [{ name: 'RouteBottom' }, { name: 'SearchPessoaFisica' }] })
    };

    useEffect(() => {
        return () => {
            queryCache.clear();
        };
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ flex: 1, height: '100%' }}>
                <View style={styles.item1}>
                    <PessoaFisicaComponent PessoaFisica={PessoaFisica} />
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
        </SafeAreaView>
    );
};

export default EvolucaoEnfermagem;

const createStyles = (theme: ThemeContextData) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.BACKGROUND_1,
        },
        item1: {
            padding: 10,
            alignItems: 'flex-start',
        },
        boxLabel: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: 10,
        },
        label: {
            color: '#1E707D',
            fontSize: RFValue(16, 680),
            fontWeight: 'bold',
        },
        text: {
            color: '#1E707D',
            fontSize: RFValue(16, 680),
            flexWrap: 'wrap',
        },
    });
    return styles;
};
