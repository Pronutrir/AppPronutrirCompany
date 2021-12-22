import React, { useState, useContext } from 'react';
import { View, SafeAreaView, ScrollView, Text } from 'react-native';
import styles from './style';
import SlideRanger from '../../../components/Slider/SlideRanger';
import BtnCentered from '../../../components/buttons/BtnCentered';
/* import { PessoaSelected } from '../sinaisVitais';
import { sinaisVitais } from '../historySinaisVitais/historySinaisVitais'; */
import AuthContext from '../../../contexts/auth';
import ErrorContext from '../../../contexts/errorNotification';
import ModalCentralizedOptions from '../../../components/Modais/ModalCentralizedOptions';
import Loading from '../../../components/Loading/Loading';
import moment from 'moment';
import Api from '../../../services/api';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../routes/routeDashboard';
//import { consultaQT } from '../../../contexts/sinaisVitaisContext';
interface sinaisVitaisUpdate {
    nR_SEQUENCIA: number;
    cD_PACIENTE: string;
    qT_TEMP: number;
    qT_PESO: number;
    qT_SATURACAO_O2: number;
    qT_ALTURA_CM: number;
}

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'updateSinais'>;

interface Props {
    route: ProfileScreenRouteProp;
}

const UpdateSinais: React.FC<Props> = ({ route }: Props) => {
    const {
        stateAuth: { usertasy },
    } = useContext(AuthContext);
    const { addNotification } = useContext(ErrorContext);

    //const selectedSinaisVitais: consultaQT = route.params.consultaQt;
    //const selectedPessoa: PessoaSelected = route.params.pessoaSelected;

    const [activeModal, setActiveModal] = useState<boolean>(false);
    const [activeModalOptions, setActiveModalOptions] =
        useState<boolean>(false);

    const [Peso, setPeso] = useState(0);
    const [Altura, setAltura] = useState(0);
    const [temperatura, setTemperatura] = useState(0);
    const [oxigenacao, setOxigenacao] = useState(0);

    /* const ChangerProperty = () => {
        let x = false;
        x =
            selectedSinaisVitais?.qT_ALTURA_CM === Altura &&
            selectedSinaisVitais?.qT_PESO === Peso &&
            selectedSinaisVitais?.qT_SATURACAO_O2 === oxigenacao &&
            selectedSinaisVitais?.qT_TEMP === temperatura;
        return x;
    }; */

    const UpdateSinaisVitais = async (sinaisUpdate: sinaisVitaisUpdate) => {
        setActiveModal(true);
        Api.put<sinaisVitaisUpdate>(
            `SinaisVitaisMonitoracaoGeral/PutSVMG/${sinaisUpdate.nR_SEQUENCIA}`,
            {
                nM_USUARIO: usertasy.usuariO_FUNCIONARIO[0]?.nM_USUARIO,
                cD_PACIENTE: sinaisUpdate.cD_PACIENTE,
                qT_TEMP: sinaisUpdate.qT_TEMP,
                qT_PESO: sinaisUpdate.qT_PESO,
                qT_SATURACAO_O2: sinaisUpdate.qT_SATURACAO_O2,
                qT_ALTURA_CM: sinaisUpdate.qT_ALTURA_CM,
            },
        )
            .then(() => {
                setActiveModal(false);
                //Onclean();
                addNotification({
                    message: 'Dados atualizados com sucesso!',
                    status: 'sucess',
                });
            })
            .catch(() => {
                setActiveModal(false);
                addNotification({
                    message: 'Não foi possivel atualizar tente mais tarde!',
                    status: 'error',
                });
            });
    };

    return (
        <SafeAreaView style={styles.safeAreaViewStyle}>
            <View style={styles.SearchBarBoxStyle}>
                <ScrollView style={styles.box2}>
                    <View style={styles.item1}>
                        <View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.label}>Nome: </Text>
                                <Text style={styles.text}>
                                    {route.params.consultaQt.NM_PESSOA_FISICA}
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.label}>Nascimento: </Text>
                                <Text style={styles.text}>
                                    {moment(
                                        route.params.consultaQt.DT_REAL,
                                    ).format('DD-MM-YYYY')}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <>
                        <View style={styles.item2}>
                            <SlideRanger
                                label={'Altura'}
                                medida={'cm'}
                                step={1}
                                valueMin={0}
                                valueMax={300}
                                valueRanger={Altura}
                                setValueRanger={setAltura}
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
                                setValueRanger={setPeso}
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
                                setValueRanger={setTemperatura}
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
                                setValueRanger={setOxigenacao}
                            />
                        </View>
                        <View style={styles.item3}>
                            <BtnCentered
                                SizeText={18}
                                labelBtn={'Adicionar'}
                                onPress={() => setActiveModalOptions(true)}
                                //enabled={ChangerProperty()}
                            />
                        </View>
                    </>
                </ScrollView>
            </View>
            <Loading activeModal={activeModal} />
            <ModalCentralizedOptions
                activeModal={activeModalOptions}
                message={'Deseja atualizar o Sinal Vital ?'}
                onpress={() =>
                    UpdateSinaisVitais({
                        cD_PACIENTE: route.params.consultaQt.CD_PESSOA_FISICA,
                        nR_SEQUENCIA: 10,
                        qT_ALTURA_CM: Altura,
                        qT_PESO: Peso,
                        qT_SATURACAO_O2: oxigenacao,
                        qT_TEMP: temperatura,
                    })
                }
                setActiveModal={setActiveModalOptions}
            />
        </SafeAreaView>
    );
};

export default UpdateSinais;
