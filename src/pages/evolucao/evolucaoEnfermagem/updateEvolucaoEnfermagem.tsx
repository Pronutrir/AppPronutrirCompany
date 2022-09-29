import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { ThemeContextData } from '../../../contexts/themeContext';
import { useThemeAwareObject } from '../../../hooks/useThemedStyles';
import BtnOptions from '../../../components/buttons/BtnOptions';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../routes/routeDashboard';
import RichComponent from '../components/richComponent/richComponent';
import PessoaFisicaComponent from '../components/pessoaFisicaComponent/pessoaFisicaComponent';
import { QueryCache } from 'react-query';
import {
    IEvolucaoHistory,
    useFilterHistoryEvolucao,
    useUpdateEvoluçaoEnfermagem,
} from '../../../hooks/useEvolucao';
import Loading, { LoadHandles } from '../../../components/Loading/Loading';
import ShimmerPlaceHolderText from '../../../components/shimmerPlaceHolder/shimerPlaceHolderText';
import ModalCentralizedOptions, {
    ModalHandles as ModalHandlesCentralizedOptions,
} from '../../../components/Modais/ModalCentralizedOptions';

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
    const navigation = useNavigation();
    const refModal = useRef<LoadHandles>(null);
    const refModalCentralizedOptions =
        useRef<ModalHandlesCentralizedOptions>(null);
    const styles = useThemeAwareObject(createStyles);

    const queryCache = new QueryCache();

    const [evolucao, setEvolucao] = useState<IEvolucaoHistory>(Evolucao);

    const { data: EvolucaoFilter, isFetching } = useFilterHistoryEvolucao(
        Evolucao.cD_EVOLUCAO,
    );

    const { mutateAsync: mutateAsyncUpdateEvoluçaoEnfermagem } =
        useUpdateEvoluçaoEnfermagem();

    const addUpdateEvolucaoEnfermagem = async () => {
        refModal.current?.openModal();
        try {
            setTimeout(() => {
                refModalCentralizedOptions.current?.openModal();
            }, 5000);
            await mutateAsyncUpdateEvoluçaoEnfermagem(evolucao);
            refModal.current?.closeModal();
            navigation.goBack();
        } catch (error) {
            refModal.current?.closeModal();
        }
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
                {EvolucaoFilter ? (
                    <RichComponent
                        disabled={Boolean(Evolucao.dT_LIBERACAO)}
                        shimerPlaceHolder={isFetching}
                        initialContentHTML={EvolucaoFilter.dS_EVOLUCAO}
                        onChanger={(item) => {
                            const textHtml = `<html tasy="html5"><head><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head><body>${item}</body></html>`;
                            setEvolucao({
                                ...EvolucaoFilter,
                                dS_EVOLUCAO: textHtml,
                            });
                        }}
                    />
                ) : (
                    <ShimmerPlaceHolderText />
                )}
            </View>
            {Boolean(!Evolucao.dT_LIBERACAO) && (
                <BtnOptions
                    valueText={'Atualizar'}
                    onPress={() => addUpdateEvolucaoEnfermagem()}
                />
            )}
            <Loading ref={refModal} />
            <ModalCentralizedOptions
                ref={refModalCentralizedOptions}
                message="Deseja liberar esta evolução ?"
                onpress={() => console.log()}
            />
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
