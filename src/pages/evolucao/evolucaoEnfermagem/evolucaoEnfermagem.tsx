import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { ThemeContextData } from '../../../contexts/themeContext';
import { useThemeAwareObject } from '../../../hooks/useThemedStyles';
import BtnOptions from '../../../components/buttons/BtnOptions';
import { View } from 'react-native-animatable';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../routes/routeDashboard';
import SelectedNotaText from '../components/selectedNotaText/selectedNotaText';
import RichComponent from '../components/richComponent/richComponent';
import PessoaFisicaComponent from '../components/pessoaFisicaComponent/pessoaFisicaComponent';
import { useQuery, QueryCache, useMutation } from 'react-query';
import Api from '../../../services/api';
import AuthContext from '../../../contexts/auth';
import moment from 'moment';

type ProfileScreenRouteProp = RouteProp<
    RootStackParamList,
    'EvolucaoEnfermagem'
>;
interface Props {
    route: ProfileScreenRouteProp;
}
interface ITextDefault {
    nR_SEQUENCIA: number;
    nR_SEQ_ITEM_PRONT: number;
    dS_TITULO: string;
    nM_USUARIO: string;
    dT_ATUALIZACAO: string;
    iE_PERMITE_ALTERAR_TEXTO: string;
    dS_TEXTO: string;
    dT_ATUALIZACAO_NREC: string;
    nM_USUARIO_NREC: string;
}
interface ITextDefaultResponse {
    result: ITextDefault[];
}
interface IEvolucao {
    dT_EVOLUCAO?: string;
    iE_TIPO_EVOLUCAO?: number;
    iE_SITUACAO?: string;
    dT_ATUALIZACAO?: string;
    nM_USUARIO?: string;
    cD_PESSOA_FISICA?: string;
    dS_EVOLUCAO?: string;
}

const EvolucaoEnfermagem: React.FC<Props> = ({
    route: {
        params: { PessoaFisica },
    },
}: Props) => {
    const styles = useThemeAwareObject(createStyles);

    const queryCache = new QueryCache();

    const [evolucao, setEvolucao] = useState<IEvolucao | null>();

    const [defaultText, setDefaultText] = useState<number | null>(null);

    const getTextDefault = (value: number | null) => {
        return useQuery(
            ['defaultTextHtml', value],
            async () => {
                const {
                    data: { result },
                } = await Api.get<ITextDefaultResponse>(
                    `TextoPadrao/ListarTextosPadroesInstituicao?nrSequencia=${value}`,
                );
                return result[0];
            },
            { enabled: defaultText != null },
        );
    };

    const { data: resultTextDefault, isFetching } = getTextDefault(defaultText);

    const addEvoluçaoEnfermagem = useMutation((item: IEvolucao) => {
        return Api.post(`EvolucaoPaciente/PostEvolucaoPaciente`, item)
            .then((response) => {
                console.log(response);
            })
            .catch((erro) => {
                console.log(erro);
            });
    });

    const setTipoEvolucao = (item: string) => {
        if (item) {
            setEvolucao({
                ...evolucao,
                iE_TIPO_EVOLUCAO: 1,
                iE_SITUACAO: 'A',
                nM_USUARIO: 'wcorreia',
                cD_PESSOA_FISICA: PessoaFisica.cD_PESSOA_FISICA,
                dT_ATUALIZACAO: moment().format('YYYY-MM-DD HH:mm:ss'),
                dT_EVOLUCAO: moment().format('YYYY-MM-DD HH:mm:ss'),
            });
        }
    };

    /* const setTextEvolucao = () => {

    } */

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
                    onPress={() => addEvoluçaoEnfermagem.mutate(evolucao)}
                />
            )}
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
