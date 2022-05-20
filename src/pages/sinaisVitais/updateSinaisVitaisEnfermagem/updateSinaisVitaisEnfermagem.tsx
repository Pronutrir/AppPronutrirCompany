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
import ShimerPlaceHolderMenu from '../../../components/shimmerPlaceHolder/shimerPlaceHolderMenu';
import TouchableShowHide from '../../../components/TouchableShowHide/TouchableShowHide';
import EscalaDorComponent from '../components/escalaDorComponent/escalaDorComponent';
import ToggleSwitch from '../../../components/Switch/ToggleSwitch';
import ModalAlertPaciente from '../../../components/Modais/ModalAlertPaciente';
import { useSinaisVitaisAll } from '../../../hooks/useSinaisVitais';
import BtnRadius from '../../../components/buttons/BtnRadius';
import { useThemeAwareObject } from '../../../hooks/useThemedStyles';

type ProfileScreenRouteProp = RouteProp<
    RootStackParamList,
    'UpdateSinaisVitaisEnfermagem'
>;
interface Props {
    route: ProfileScreenRouteProp;
}

const UpdateSinaisVitaisEnfermagem: React.FC<Props> = ({
    route: {
        params: { PessoaFisica, SinaisVitais },
    },
}: Props) => {
    const styles = useThemeAwareObject(createStyles);
    const navigation = useNavigation();
    const {
        AddSinaisVitais,
        GetSinaisVitais,
        UpdateSinaisVitais,
    } = useContext(SinaisVitaisContext);

    const { refetch: refetchSinaisVitais } = useSinaisVitaisAll();

    const [activeModal, setActiveModal] = useState<boolean>(false);
    const [activeShimmer, setActiveShimmer] = useState<boolean>(false);
    const [activeModalOptions, setActiveModalOptions] =
        useState<boolean>(false);

    const [disabledAntropometria, setDisabledAntropometria] = useState(true);
    const [disabledSinaisVitais, setDisabledSinaisVitais] = useState(false);
    const [disabledRegistroDor, setDisabledRegistroDor] = useState(false);
    const [disabledTemperatura, setDisabledTemperatura] = useState(false);
    const [disabledMonitorizacao, setDisabledMonitorizacao] = useState(true);

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
            cD_ESCALA_DOR: 'FEVA',
            qT_ESCALA_DOR: dor,
            qT_FREQ_CARDIACA: fc <= 0 ? null : fc,
            qT_FREQ_RESP: fr <= 12 ? null : fr,
            qT_PAM: pam <= 0 ? null : pam,
            qT_PA_DIASTOLICA: pad <= 40 ? null : pad,
            qT_PA_SISTOLICA: pas <= 40 ? null : pas,
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
            cD_ESCALA_DOR: 'FEVA',
            qT_ESCALA_DOR: dor,
            qT_FREQ_CARDIACA: fc <= 0 ? null : fc,
            qT_FREQ_RESP: fr <= 0 ? null : fr,
            qT_PAM: pam <= 0 ? null : pam,
            qT_PA_DIASTOLICA: pad <= 40 ? null : pad,
            qT_PA_SISTOLICA: pas <= 40 ? null : pas,
        });
        setActiveModal(false);
        navigation.goBack();
    };

    const pressaoArterialMedia = (): number => {
        if (pas !== 40 && pad !== 40) {
            const pam: number = (pas + pad * 2) / 3;
            return parseInt(pam.toFixed());
        } else {
            return 0;
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
            setPas(
                SinaisVitais.qT_PA_SISTOLICA ? SinaisVitais.qT_PA_SISTOLICA : 0,
            );
            setPad(
                SinaisVitais.qT_PA_DIASTOLICA
                    ? SinaisVitais.qT_PA_DIASTOLICA
                    : 0,
            );
            setFc(
                SinaisVitais.qT_FREQ_CARDIACA
                    ? SinaisVitais.qT_FREQ_CARDIACA
                    : 0,
            );
            setFr(SinaisVitais.qT_FREQ_RESP ? SinaisVitais.qT_FREQ_RESP : 0);
            setDor(SinaisVitais.qT_ESCALA_DOR ? SinaisVitais.qT_ESCALA_DOR : 0);
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
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                <BtnRadius
                    containerStyles={{
                        backgroundColor: 'white',
                    }}
                    size={3}
                    onPress={() => {navigation.navigate('EndSinaisVitais', {
                        Paciente: SinaisVitais?.nM_PESSOA_FISICA
                        ? SinaisVitais?.nM_PESSOA_FISICA
                        : PessoaFisica?.nM_PESSOA_FISICA,
                        Tipo: 'day'
                    })}}
                />
                <ModalAlertPaciente
                    codPacient={
                        SinaisVitais?.cD_PACIENTE
                            ? SinaisVitais?.cD_PACIENTE
                            : PessoaFisica?.cD_PESSOA_FISICA
                    }
                />
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
                            <TouchableShowHide TextHeader={'Antropometria'}>
                                <View style={styles.item2}>
                                    <ToggleSwitch
                                        onpress={() =>
                                            setDisabledAntropometria(
                                                !disabledAntropometria,
                                            )
                                        }
                                    />
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
                                        disabled={disabledAntropometria}
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
                                        disabled={disabledAntropometria}
                                    />
                                </View>
                            </TouchableShowHide>
                            <TouchableShowHide TextHeader={'Sinais vitais'}>
                                <View style={styles.item2}>
                                    <ToggleSwitch
                                        onpress={() =>
                                            setDisabledSinaisVitais(
                                                !disabledSinaisVitais,
                                            )
                                        }
                                        Enabled={!disabledSinaisVitais}
                                    />
                                    <SlideRanger
                                        label={'PAS(mmHG)'}
                                        medida={'mmHg'}
                                        step={1}
                                        valueMin={40}
                                        valueMax={280}
                                        valueRanger={pas}
                                        setValueRanger={(value) =>
                                            setPas(value)
                                        }
                                        disabled={disabledSinaisVitais}
                                    />
                                </View>
                                <View style={styles.item2}>
                                    <SlideRanger
                                        label={'PAD(mmHg)'}
                                        medida={'mmHg'}
                                        step={1}
                                        valueMin={40}
                                        valueMax={150}
                                        valueRanger={pad}
                                        setValueRanger={(value) =>
                                            setPad(value)
                                        }
                                        disabled={disabledSinaisVitais}
                                    />
                                </View>
                                <View style={styles.item2}>
                                    <SlideRanger
                                        label={'PAM(mmHg)'}
                                        medida={'mmHg'}
                                        step={1}
                                        valueMin={0}
                                        valueMax={200}
                                        valueRanger={pressaoArterialMedia()}
                                        setValueRanger={(value) =>
                                            setPam(value)
                                        }
                                        disabled={disabledSinaisVitais}
                                        disabledIncrement={true}
                                    />
                                </View>
                                <View style={styles.item2}>
                                    <SlideRanger
                                        label={'FC(bpm)'}
                                        medida={'bpm'}
                                        step={1}
                                        valueMin={0}
                                        valueMax={300}
                                        valueRanger={fc}
                                        setValueRanger={(value) => setFc(value)}
                                        disabled={disabledSinaisVitais}
                                    />
                                </View>
                                <View style={styles.item2}>
                                    <SlideRanger
                                        label={'FR(mm)'}
                                        medida={'mrm'}
                                        step={1}
                                        valueMin={12}
                                        valueMax={80}
                                        valueRanger={fr}
                                        setValueRanger={(value) => setFr(value)}
                                        disabled={disabledSinaisVitais}
                                    />
                                </View>
                                <View style={styles.item2}>
                                    <ToggleSwitch
                                        onpress={() =>
                                            setDisabledTemperatura(
                                                !disabledTemperatura,
                                            )
                                        }
                                        Enabled={disabledTemperatura}
                                    />
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
                                        disabled={!disabledTemperatura}
                                    />
                                </View>
                            </TouchableShowHide>
                            <TouchableShowHide TextHeader={'Registro de dor'}>
                                <View style={styles.item2}>
                                    <ToggleSwitch
                                        onpress={() =>
                                            setDisabledRegistroDor(
                                                !disabledRegistroDor,
                                            )
                                        }
                                        Enabled={!disabledRegistroDor}
                                    />
                                    <EscalaDorComponent
                                        onpress={(item) => {
                                            setDor(item);
                                        }}
                                        disabled={disabledRegistroDor}
                                    />
                                    <SlideRanger
                                        label={'Escala de dor'}
                                        medida={'nº'}
                                        step={1}
                                        valueMin={0}
                                        valueMax={10}
                                        valueRanger={dor}
                                        setValueRanger={(value) =>
                                            setDor(value)
                                        }
                                        disabled={disabledRegistroDor}
                                    />
                                </View>
                            </TouchableShowHide>
                            <TouchableShowHide
                                TextHeader={'Monitorização geral'}>
                                <View style={styles.item2}>
                                    <ToggleSwitch
                                        onpress={() =>
                                            setDisabledMonitorizacao(
                                                !disabledMonitorizacao,
                                            )
                                        }
                                        Enabled={disabledMonitorizacao}
                                    />
                                    <SlideRanger
                                        label={'Oximetria'}
                                        medida={'%'}
                                        step={1}
                                        valueMin={50}
                                        valueMax={100}
                                        valueRanger={oxigenacao}
                                        setValueRanger={(value) =>
                                            setOxigenacao(value)
                                        }
                                        disabled={!disabledMonitorizacao}
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
                        Array(4).fill(<ShimerPlaceHolderMenu />)
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

export default UpdateSinaisVitaisEnfermagem;
