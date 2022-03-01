import React, { useState, useContext, useEffect } from 'react';
import { View, ScrollView, Text } from 'react-native';
import styles from './style';
import SlideRanger from '../../../components/Slider/SlideRanger';
import BtnCentered from '../../../components/buttons/BtnCentered';
import ModalCentralizedOptions from '../../../components/Modais/ModalCentralizedOptions';
import Loading from '../../../components/Loading/Loading';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../routes/routeDashboard';
import SinaisVitaisContext from '../../../contexts/sinaisVitaisContext';
import moment from 'moment';
import ShimmerPaceHolderSNMG from '../../../components/shimmerPlaceHolder/shimmerPaceHolderSNMG';
import TouchableShowHide from '../../../components/TouchableShowHide/TouchableShowHide';

type ProfileScreenRouteProp = RouteProp<
    RootStackParamList,
    'UpdateSinaisVitaisEnfermagem'
>;
interface Props {
    route: ProfileScreenRouteProp;
}
interface Params {
    peso: number;
    altura: number;
    temperatura: number;
    oxigenacao: number;
}

const UpdateSinaisVitaisEnfermagem: React.FC<Props> = ({
    route: {
        params: { PessoaFisica, SinaisVitais },
    },
}: Props) => {
    const navigation = useNavigation();
    const {
        AddSinaisVitais,
        GetSinaisVitais,
        UpdateSinaisVitais,
        GetAllSinaisVitais,
    } = useContext(SinaisVitaisContext);

    const [activeModal, setActiveModal] = useState<boolean>(false);
    const [activeShimmer, setActiveShimmer] = useState<boolean>(false);
    const [activeModalOptions, setActiveModalOptions] =
        useState<boolean>(false);

    const [Peso, setPeso] = useState(0);
    const [Altura, setAltura] = useState(0);
    const [temperatura, setTemperatura] = useState(0);
    const [oxigenacao, setOxigenacao] = useState(0);
    const [pas, setPas] = useState(0);
    const [pad, setPad] = useState(0);
    const [pam, setPam] = useState(0);
    const [fc, setFc] = useState(0);
    const [fr, setFr] = useState(0);
    const [dor, setDor] = useState(0);


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
        await GetAllSinaisVitais();
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
        setActiveModal(false);
        navigation.goBack();
    };

    useEffect(() => {
        if (SinaisVitais) {
            setAltura(SinaisVitais.qT_ALTURA_CM);
            setPeso(SinaisVitais.qT_PESO ? SinaisVitais.qT_PESO : 0);
            setTemperatura(SinaisVitais.qT_TEMP ? SinaisVitais.qT_TEMP : 0);
            setOxigenacao(SinaisVitais.qT_SATURACAO_O2 ? SinaisVitais.qT_SATURACAO_O2 : 0);
            setActiveShimmer(true);
        } else {
            GetSinaisVitais(PessoaFisica.cD_PESSOA_FISICA)
                .then((response) => {
                    if (response?.qT_ALTURA_CM) {
                        setAltura(response?.qT_ALTURA_CM);
                        setPeso(response?.qT_PESO);
                        setTemperatura(response?.qT_TEMP);
                        setOxigenacao(response?.qT_SATURACAO_O2);
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
            <ScrollView style={styles.box}>
                <View style={styles.item1}>
                    <View style={styles.boxLabel}>
                        <Text style={styles.label}>Nome: </Text>
                        <Text style={styles.text}>
                            {PessoaFisica.nM_PESSOA_FISICA}
                        </Text>
                    </View>
                    <View style={styles.boxLabel}>
                        <Text style={styles.label}>Nascimento: </Text>
                        <Text style={styles.text}>
                            {moment(PessoaFisica.dT_NASCIMENTO).format(
                                'DD-MM-YYYY',
                            )}
                        </Text>
                    </View>
                </View>
                <View>
                    {activeShimmer ? (
                        <>
                            <TouchableShowHide TextHeader={'Antropometria'}>
                                <View style={styles.item2}>
                                    <SlideRanger
                                        label={'Altura'}
                                        medida={'cm'}
                                        step={1}
                                        valueMin={0}
                                        valueMax={300}
                                        valueRanger={Altura}
                                        setValueRanger={(value) =>
                                            setAltura(value)
                                        }
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
                                        setValueRanger={(value) =>
                                            setPeso(value)
                                        }
                                    />
                                </View>
                            </TouchableShowHide>
                            <TouchableShowHide TextHeader={'Sinais vitais'}>
                                <View style={styles.item2}>
                                    <SlideRanger
                                        label={'PAS(mmHG)'}
                                        medida={'cm'}
                                        step={1}
                                        valueMin={0}
                                        valueMax={200}
                                        valueRanger={pas}
                                        setValueRanger={(value) =>
                                            setPas(value)
                                        }
                                    />
                                </View>
                                <View style={styles.item2}>
                                    <SlideRanger
                                        label={'PAD(mmHg)'}
                                        medida={'kg'}
                                        step={0.1}
                                        valueMin={0}
                                        valueMax={200}
                                        valueRanger={pad}
                                        setValueRanger={(value) =>
                                            setPad(value)
                                        }
                                    />
                                </View>
                                <View style={styles.item2}>
                                    <SlideRanger
                                        label={'PAM(mmHg)'}
                                        medida={'°C'}
                                        step={0.1}
                                        valueMin={0}
                                        valueMax={200}
                                        valueRanger={pam}
                                        setValueRanger={(value) =>
                                            setPam(value)
                                        }
                                    />
                                </View>
                                <View style={styles.item2}>
                                    <SlideRanger
                                        label={'FC(bpm)'}
                                        medida={'SpO²'}
                                        step={1}
                                        valueMin={0}
                                        valueMax={100}
                                        valueRanger={fc}
                                        setValueRanger={(value) =>
                                            setFc(value)
                                        }
                                    />
                                </View>
                                <View style={styles.item2}>
                                    <SlideRanger
                                        label={'FR(mm)'}
                                        medida={'SpO²'}
                                        step={1}
                                        valueMin={0}
                                        valueMax={100}
                                        valueRanger={fr}
                                        setValueRanger={(value) =>
                                            setFr(value)
                                        }
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
                            </TouchableShowHide>
                            <TouchableShowHide TextHeader={'Registro de dor'}>
                                <View style={styles.item2}>
                                    <SlideRanger
                                        label={'Escala de dor'}
                                        medida={'SpO²'}
                                        step={1}
                                        valueMin={0}
                                        valueMax={10}
                                        valueRanger={dor}
                                        setValueRanger={(value) =>
                                            setDor(value)
                                        }
                                    />
                                </View>
                            </TouchableShowHide>
                            <TouchableShowHide
                                TextHeader={'Monitorização geral'}>
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
                            </TouchableShowHide>
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
                message={
                    SinaisVitais
                        ? 'Deseja atualizar os Sinais Vitais ?'
                        : 'Deseja inserir os Sinais Vitais ?'
                }
                onpress={() =>
                    SinaisVitais ? SinaisVitaisUpdate() : PostSinaisVitais()
                }
                setActiveModal={setActiveModalOptions}
            />
        </View>
    );
};

export default UpdateSinaisVitaisEnfermagem;
