import React, { useState, useContext, useEffect } from 'react';
import { View, ScrollView, Text } from 'react-native';
import createStyles from './style';
import SlideRanger from '../../../components/Slider/SlideRanger';
import BtnCentered from '../../../components/buttons/BtnCentered';
import ModalCentralizedOptions from '../../../components/Modais/ModalCentralizedOptions';
import Loading from '../../../components/Loading/Loading';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../routes/routeDashboard';
import SinaisVitaisContext from '../../../contexts/sinaisVitaisContext';
import moment from 'moment';
import ShimmerPaceHolderSNMG from '../../../components/shimmerPlaceHolder/shimmerPaceHolderSNMG';
import ModalAlertPaciente from '../../../components/Modais/ModalAlertPaciente';
import { useSinaisVitaisAll } from '../../../hooks/useSinaisVitais';
import { useThemeAwareObject } from '../../../hooks/useThemedStyles';
import MenuPopUp from '../../../components/menuPopUp/menuPopUp';

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'UpdateSinais'>;
interface Props {
    route: ProfileScreenRouteProp;
}

const UpdateSinais: React.FC<Props> = ({
    route: {
        params: { PessoaFisica, SinaisVitais },
    },
}: Props) => {
    const styles = useThemeAwareObject(createStyles);

    const navigation = useNavigation();
    const { AddSinaisVitais, GetSinaisVitais, UpdateSinaisVitais } =
        useContext(SinaisVitaisContext);

    const { refetch: refetchSinaisVitais } = useSinaisVitaisAll();

    const [activeModal, setActiveModal] = useState<boolean>(false);
    const [activeShimmer, setActiveShimmer] = useState<boolean>(false);
    const [activeModalOptions, setActiveModalOptions] =
        useState<boolean>(false);

    const [Peso, setPeso] = useState(0);
    const [Altura, setAltura] = useState(0);
    const [temperatura, setTemperatura] = useState(0);
    const [oxigenacao, setOxigenacao] = useState(0);

    const ChangerProperty = () => {
        let x = false;
        x =
            Altura !== 0 ||
            Peso !== 0 ||
            oxigenacao !== 50 ||
            temperatura !== 30;
        return x;
    };

    const SinaisVitaisUpdate = async () => {
        setActiveModal(true);
        await UpdateSinaisVitais({
            cD_PACIENTE: SinaisVitais.cD_PACIENTE,
            nR_SEQUENCIA: SinaisVitais.nR_SEQUENCIA,
            qT_ALTURA_CM: Altura <= 0 ? null : Altura,
            qT_PESO: Peso <= 0 ? null : Peso,
            qT_SATURACAO_O2: oxigenacao <= 50 ? null : oxigenacao,
            qT_TEMP: temperatura <= 30 ? null : temperatura,
        });
        refetchSinaisVitais;
        setActiveModal(false);
        navigation.goBack();
    };

    const PostSinaisVitais = async () => {
        setActiveModal(true);
        await AddSinaisVitais({
            cD_PACIENTE: PessoaFisica.cD_PESSOA_FISICA,
            qT_ALTURA_CM: Altura <= 0 ? null : Altura,
            qT_PESO: Peso <= 0 ? null : Peso,
            qT_SATURACAO_O2: oxigenacao <= 50 ? null : oxigenacao,
            qT_TEMP: temperatura <= 30 ? null : temperatura,
        });
        refetchSinaisVitais;
        setActiveModal(false);
        navigation.goBack();
    };

    const MenuPopUpOptions = async (itemSelected: string) => {
        switch (itemSelected) {
            case 'Histórico':
                navigation.navigate('EndSinaisVitais', {
                    Paciente: SinaisVitais?.nM_PESSOA_FISICA
                        ? SinaisVitais?.nM_PESSOA_FISICA
                        : PessoaFisica?.nM_PESSOA_FISICA,
                    Tipo: 'all',
                });
                break;
            case 'Acompanhante':
                navigation.navigate('AcompanhateSinaisVitais', {
                    PessoaFisica: {
                        nM_PESSOA_FISICA: SinaisVitais?.nM_PESSOA_FISICA
                            ? SinaisVitais?.nM_PESSOA_FISICA
                            : PessoaFisica?.nM_PESSOA_FISICA,
                        dT_NASCIMENTO: SinaisVitais?.dT_NASCIMENTO
                            ? SinaisVitais?.dT_NASCIMENTO
                            : PessoaFisica?.dT_NASCIMENTO,
                    },
                });
                break;
            case 'Observações':
                console.log(itemSelected);
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        if (SinaisVitais) {
            setAltura(SinaisVitais.qT_ALTURA_CM);
            setPeso(SinaisVitais.qT_PESO ? SinaisVitais.qT_PESO : 0);
            setTemperatura(SinaisVitais.qT_TEMP ? SinaisVitais.qT_TEMP : 0);
            setOxigenacao(
                SinaisVitais.qT_SATURACAO_O2 ? SinaisVitais.qT_SATURACAO_O2 : 0,
            );
            setActiveShimmer(true);
        } else {
            GetSinaisVitais(PessoaFisica.cD_PESSOA_FISICA)
                .then((response) => {
                    if (response?.qT_ALTURA_CM) {
                        setAltura(response.qT_ALTURA_CM);
                    }
                    setActiveShimmer(true);
                })
                .catch(() => {
                    setActiveShimmer(true);
                });
        }
    }, []);

    return (
        <View style={styles.container}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                <ModalAlertPaciente
                    codPacient={
                        SinaisVitais?.cD_PACIENTE
                            ? SinaisVitais?.cD_PACIENTE
                            : PessoaFisica?.cD_PESSOA_FISICA
                    }
                />
                <View>
                    <MenuPopUp
                        btnLabels={['Histórico', 'Acompanhante', 'Observações']}
                        onpress={(item) => MenuPopUpOptions(item)}
                    />
                </View>
            </View>
            <ScrollView style={styles.box}>
                <View style={styles.item1}>
                    <View style={styles.boxLabel}>
                        <Text style={styles.label}>Nome: </Text>
                        <Text style={styles.text}>
                            {SinaisVitais?.nM_PESSOA_FISICA
                                ? SinaisVitais?.nM_PESSOA_FISICA
                                : PessoaFisica?.nM_PESSOA_FISICA}
                        </Text>
                    </View>
                    <View style={styles.boxLabel}>
                        <Text style={styles.label}>Nascimento: </Text>
                        <Text style={styles.text}>
                            {moment(
                                SinaisVitais?.dT_NASCIMENTO
                                    ? SinaisVitais?.dT_NASCIMENTO
                                    : PessoaFisica?.dT_NASCIMENTO,
                            ).format('DD-MM-YYYY')}
                        </Text>
                    </View>
                </View>
                <View>
                    {activeShimmer ? (
                        <>
                            <View style={styles.item2}>
                                <SlideRanger
                                    label={'Altura'}
                                    medida={'cm'}
                                    step={1}
                                    valueMin={0}
                                    valueMax={300}
                                    valueRanger={Altura}
                                    setValueRanger={(value) => setAltura(value)}
                                />
                            </View>
                            <View style={styles.item2}>
                                <SlideRanger
                                    label={'Peso'}
                                    medida={'kg'}
                                    step={0.1}
                                    valueMin={0}
                                    valueMax={200}
                                    valueRanger={Peso}
                                    setValueRanger={(value) => setPeso(value)}
                                />
                            </View>
                            <View style={styles.item2}>
                                <SlideRanger
                                    label={'Temperatura'}
                                    medida={'°C'}
                                    step={0.1}
                                    valueMin={30}
                                    valueMax={42}
                                    valueRanger={temperatura}
                                    setValueRanger={(value) =>
                                        setTemperatura(value)
                                    }
                                />
                            </View>
                            <View style={styles.item2}>
                                <SlideRanger
                                    label={'Oximetria'}
                                    medida={'SpO²'}
                                    step={1}
                                    valueMin={50}
                                    valueMax={100}
                                    valueRanger={oxigenacao}
                                    setValueRanger={(value) =>
                                        setOxigenacao(value)
                                    }
                                />
                            </View>
                            <View style={styles.item3}>
                                <BtnCentered
                                    SizeText={18}
                                    labelBtn={
                                        SinaisVitais ? 'Atualizar' : 'Adicionar'
                                    }
                                    onPress={() => setActiveModalOptions(true)}
                                    enabled={ChangerProperty()}
                                />
                            </View>
                        </>
                    ) : (
                        Array(4).fill(<ShimmerPaceHolderSNMG />)
                    )}
                </View>
            </ScrollView>
            <Loading activeModal={activeModal} />
            <ModalCentralizedOptions
                activeModal={activeModalOptions}
                setActiveModal={setActiveModalOptions}
                message={
                    SinaisVitais
                        ? 'Deseja atualizar os Sinais Vitais ?'
                        : 'Deseja inserir os Sinais Vitais ?'
                }
                onpress={() =>
                    SinaisVitais ? SinaisVitaisUpdate() : PostSinaisVitais()
                }
            />
        </View>
    );
};

export default UpdateSinais;
