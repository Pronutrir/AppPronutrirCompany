import React, { useState, useContext } from 'react';
import { View, SafeAreaView, ScrollView, Text } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import styles from './style';
import SlideRanger from '../../../components/Slider/SlideRanger';
import BtnCentered from '../../../components/buttons/BtnCentered';
import { PessoaSelected } from '../sinaisVitais';
import { sinaisVitais } from '../historySinaisVitais/historySinaisVitais';
import AuthContext from '../../../contexts/auth';
import ErrorContext from '../../../contexts/errorNotification';
import ModalCentralizedOptions from '../../../components/Modais/ModalCentralizedOptions';
import Loading from '../../../componentes/Loading';
import moment from 'moment';
import Api from '../../../services/api';

interface sinaisVitaisUpdate {
    nR_SEQUENCIA: number;
    cD_PACIENTE: string;
    qT_TEMP: number,
    qT_PESO: number,
    qT_SATURACAO_O2: number,
    qT_ALTURA_CM: number,
}

type RootStackParamList = {
    Profile: { sinaisVitais: sinaisVitais, pessoaSelected: PessoaSelected };
    Feed: { sort: 'latest' | 'top' } | undefined;
};

type Props = StackScreenProps<RootStackParamList, 'Profile'>;

const updateSinais: React.FC<Props> = ({ route }: Props) => {

    const { stateAuth: { usertasy } } = useContext(AuthContext);
    const { addNotification } = useContext(ErrorContext);

    const selectedSinaisVitais: sinaisVitais = route.params.sinaisVitais;
    const selectedPessoa: PessoaSelected = route.params.pessoaSelected;

    const [activeModal, setActiveModal] = useState<boolean>(false);
    const [activeModalOptions, setActiveModalOptions] = useState<boolean>(false);

    const [Peso, setPeso] = useState(selectedSinaisVitais.qT_PESO);
    const [Altura, setAltura] = useState(selectedSinaisVitais.qT_ALTURA_CM);
    const [temperatura, setTemperatura] = useState(selectedSinaisVitais.qT_TEMP);
    const [oxigenacao, setOxigenacao] = useState(selectedSinaisVitais.qT_SATURACAO_O2);

    const ChangerProperty = () => {
        let x = false;
        x = selectedSinaisVitais?.qT_ALTURA_CM === Altura && selectedSinaisVitais?.qT_PESO === Peso && selectedSinaisVitais?.qT_SATURACAO_O2 === oxigenacao && selectedSinaisVitais?.qT_TEMP === temperatura
        return x;
    }

    const UpdateSinaisVitais = async (sinaisUpdate: sinaisVitaisUpdate) => {
        setActiveModal(true);
        Api.put<sinaisVitaisUpdate>(`SinaisVitaisMonitoracaoGeral/PutSVMG/${sinaisUpdate.nR_SEQUENCIA}`, {
            nM_USUARIO: usertasy.usuariO_FUNCIONARIO[0]?.nM_USUARIO,
            cD_PACIENTE: sinaisUpdate.cD_PACIENTE,
            qT_TEMP: sinaisUpdate.qT_TEMP,
            qT_PESO: sinaisUpdate.qT_PESO,
            qT_SATURACAO_O2: sinaisUpdate.qT_SATURACAO_O2,
            qT_ALTURA_CM: sinaisUpdate.qT_ALTURA_CM,
        }).then(response => {
            setActiveModal(false);
            //Onclean();
            addNotification({ message: "Dados atualizados com sucesso!", status: 'sucess' });
        }).catch(error => {
            setActiveModal(false);
            addNotification({ message: "Não foi possivel atualizar tente mais tarde!", status: 'error' });
        })
    }

    return (
        <SafeAreaView style={styles.safeAreaViewStyle}>
            <View style={styles.SearchBarBoxStyle}>
                <ScrollView style={styles.box2}>
                    <View style={styles.item1}>
                        <View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.label}>Nome: </Text>
                                <Text style={styles.text}>{selectedPessoa.nM_PESSOA_FISICA}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.label}>Nascimento: </Text>
                                <Text style={styles.text}>{moment(selectedPessoa.dT_NASCIMENTO).format('DD-MM-YYYY')}</Text>
                            </View>
                        </View>
                    </View>
                    <>
                        <View style={styles.item2}>
                            <SlideRanger
                                label={"Altura"}
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
                                label={"Peso"}
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
                                label={"Temperatura"}
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
                                label={"Oximetria"}
                                medida={'SpO²'}
                                step={1}
                                valueMin={50}
                                valueMax={100}
                                valueRanger={oxigenacao}
                                setValueRanger={setOxigenacao}
                            />
                        </View>
                        <View style={styles.item3}>
                            <BtnCentered SizeText={18} labelBtn={"Adicionar"} onPress={() => setActiveModalOptions(true)} enabled={ChangerProperty()} />
                        </View>
                    </>
                </ScrollView>
            </View>
            <Loading activeModal={activeModal} />
            <ModalCentralizedOptions
                activeModal={activeModalOptions}
                message={"Deseja atualizar o Sinal Vital ?"}
                onpress={() => UpdateSinaisVitais(
                    { 
                        cD_PACIENTE: selectedSinaisVitais.cD_PACIENTE,
                        nR_SEQUENCIA: selectedSinaisVitais.nR_SEQUENCIA,
                        qT_ALTURA_CM: Altura,
                        qT_PESO: Peso,
                        qT_SATURACAO_O2: oxigenacao,
                        qT_TEMP: temperatura
                    }
                )}
                setActiveModal={setActiveModalOptions} />
        </SafeAreaView>
    );
}

export { updateSinais };