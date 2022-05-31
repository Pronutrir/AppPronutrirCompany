import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
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
} from '../../../hooks/useEvolucao';
import Loading, { LoadHandles } from '../../../components/Loading/Loading';

type ProfileScreenRouteProp = RouteProp<
    RootStackParamList,
    'UpdateEvolucaoEnfermagem'
>;
interface Props {
    route: ProfileScreenRouteProp;
}

const EvolucaoEnfermagem: React.FC<Props> = ({
    route: {
        params: { Evolucao },
    },
}: Props) => {
    /* const {
        stateAuth: {
            usertasy: { usuariO_FUNCIONARIO_SETOR, cD_PESSOA_FISICA },
        },
    } = useContext(AuthContext); */
    const navigation = useNavigation();
    const refModal = useRef<LoadHandles>(null);
    const styles = useThemeAwareObject(createStyles);

    const queryCache = new QueryCache();

    const [evolucao, setEvolucao] = useState<IEvolucao | null>();

    const [defaultText, setDefaultText] = useState<number | null>(null);

    const { mutateAsync: mutateAsyncEvoluçaoEnfermagem } =
        useAddEvoluçaoEnfermagem();

    /* const setTipoEvolucao = (item: string) => {
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
    }; */

    const addEvolucaoEnfermagem = async (evolucao: IEvolucao) => {
        refModal.current?.openModal();
        await mutateAsyncEvoluçaoEnfermagem(evolucao);
        refModal.current?.closeModal();
        navigation.reset({
            index: 0,
            routes: [{ name: 'RouteBottom' }, { name: 'SearchPessoaFisica' }],
        });
    };

    useEffect(() => {
        return () => {
            queryCache.clear();
        };
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.box}>
                <View style={styles.item1}>
                    <PessoaFisicaComponent
                        PessoaFisica={{
                            nM_PESSOA_FISICA: Evolucao.nM_PACIENTE,
                            dT_NASCIMENTO: Evolucao.dT_EVOLUCAO,
                        }}
                    />
                </View>
                <RichComponent
                    //shimerPlaceHolder={isFetching}
                    initialContentHTML={Evolucao.dS_EVOLUCAO}
                    onChanger={(item) => {
                        const textHtml = `<html tasy="html5"><head><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head><body>${item}</body></html>`;
                        setEvolucao({ ...evolucao, dS_EVOLUCAO: textHtml });
                    }}
                />
            </View>
            {evolucao?.dS_EVOLUCAO && (
                <BtnOptions
                    valueText={'Atualizar'}
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
