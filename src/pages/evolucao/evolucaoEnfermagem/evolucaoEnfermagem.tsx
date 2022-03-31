import React, { useEffect, useState } from 'react';
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
import { useQuery, QueryCache } from 'react-query';
import Api from '../../../services/api';

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

const EvolucaoEnfermagem: React.FC<Props> = ({
    route: {
        params: { PessoaFisica },
    },
}: Props) => {
    const styles = useThemeAwareObject(createStyles);

    const queryCache = new QueryCache()

    const [defaultText, setDefaultText] = useState<string | null>(null);
    const [tipoNota, setTipoNota] = useState<string | null>(null);

    const getTextDefault = (value: string | null) => {
        return useQuery(
            ['defaltTextHtml', value],
            async () => {
                const {
                    data: { result },
                } = await Api.get<ITextDefaultResponse>(
                    `TextoPadrao/ListarTextosPadroesInstituicao?titulo=${value}`,
                );
                return result[0];
            },
            { enabled: defaultText != null },
        );
    };

    const { data: resultTextDefault, isFetching, remove } = getTextDefault(defaultText);

    /* const addEvoluçaoEnfermagem = useMutation(() => 
        Api.post()
    )
 */
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
                        onPressTipoNota={(item) => setTipoNota(item?.label)}
                        onPressTextPadrao={(item) =>
                            setDefaultText(item?.label)
                        }
                    />
                </View>
                <RichComponent
                    shimerPlaceHolder={isFetching}
                    initialContentHTML={resultTextDefault?.dS_TEXTO}
                />
            </View>
            {defaultText && tipoNota && (
                <BtnOptions
                    valueText={'Enviar'}
                    onPress={() => console.log('')}
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
