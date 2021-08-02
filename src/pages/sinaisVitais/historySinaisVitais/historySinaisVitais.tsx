import React, { useEffect, useState, useContext, useCallback, memo } from 'react';
import { Text, View, FlatList, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import Api from '../../../services/api';
import { StackScreenProps } from '@react-navigation/stack';
import LoadingBall from '../../../components/Loading/LoadingBall';
import CardSimples from '../../../components/Cards/CardSimples';
import sinaisVitais, { PessoaSelected, SinaisVitais } from '../sinaisVitais';
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import HistorySvg from '../../../assets/svg/historico.svg';
import EditarSvg from '../../../assets/svg/editar.svg';
import ExcluirSvg from '../../../assets/svg/excluir.svg'
import DisabledSvg from '../../../assets/svg/disable.svg';
import AuthContext from '../../../contexts/auth';
import ErrorContext from '../../../contexts/errorNotification';
import ModalCentralizedOptions from '../../../components/Modais/ModalCentralizedOptions';
import Loading from '../../../componentes/Loading';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

export interface sinaisVitais {
    nR_SEQUENCIA: number;
    nR_ATENDIMENTO: 0,
    dT_SINAL_VITAL: string;
    dT_ATUALIZACAO: string;
    iE_PRESSAO: string;
    iE_MEMBRO: string;
    iE_MANGUITO: string;
    iE_APARELHO_PA: string;
    cD_PACIENTE: string;
    nM_PESSOA_FISICA: string;
    cD_PESSOA_FISICA: string;
    qT_SATURACAO_O2: number;
    iE_COND_SAT_O2: string;
    iE_MEMBRO_SAT_O2: string;
    iE_RITMO_ECG: string;
    iE_DECUBITO: string;
    qT_TEMP: number;
    qT_PESO: number;
    iE_UNID_MED_PESO: string;
    qT_ALTURA_CM: number;
    iE_UNID_MED_ALTURA: string;
    qT_SUPERF_CORPORIA: number;
    qT_IMC: number;
    dS_UTC: string;
    dS_UTC_ATUALIZACAO: string;
    dT_LIBERACAO: string;
    iE_SITUACAO: string;
    cD_ESTABELECIMENTO: number;
    nM_USUARIO: string;
}

interface sinaisVitaisUpdate {
    nR_SEQUENCIA: number;
    iE_SITUACAO: string;
    cD_PACIENTE: string;
}

type RootStackParamList = {
    Profile: PessoaSelected;
    Feed: { sort: 'updateSinais' } | undefined;
};

interface Parms {
    item: sinaisVitais;
    index: number;
}

type Props = StackScreenProps<RootStackParamList, 'Profile'>;

const historySinaisVitais: React.FC<Props> = ({ route }: Props) => {

    const navigation = useNavigation();
    const { stateAuth: { usertasy } } = useContext(AuthContext);
    const { addNotification } = useContext(ErrorContext);
    const selected: PessoaSelected = route.params
    const [listSinaisVitais, setListSinaisVitais] = useState<sinaisVitais[] | null>(null);
    const [selectedSinais, setSelectedSinais] = useState<sinaisVitaisUpdate>({ iE_SITUACAO: '', nR_SEQUENCIA: 0, cD_PACIENTE: '' });

    const [activeBall, setActiveBall] = useState<boolean>(false);
    const [activeModal, setActiveModal] = useState<boolean>(false);
    const [activeModalOptions, setActiveModalOptions] = useState<boolean>(false);
    const [activeModalDel, setActiveModalDel] = useState<boolean>(false);
    const [refreshing, setRefreshing] = useState<boolean>(false);

    const GetSinaisVitais = async () => {
        setListSinaisVitais(null);
        try {
            const sinaisVitais: sinaisVitais[] = await Api.get(`SinaisVitaisMonitoracaoGeral/ListarTodosDadosSVMGPaciente/${selected.nM_PESSOA_FISICA}`).then(response => {
                const { result } = response.data;
                if (result) {
                    const order_result = result.sort(function (a: sinaisVitais, b: sinaisVitais) {
                        return a.nR_SEQUENCIA > b.nR_SEQUENCIA ? -1 : a.nR_SEQUENCIA < b.nR_SEQUENCIA ? 1 : 0
                    })
                    return result;
                }
            });
            setListSinaisVitais(sinaisVitais);
            setRefreshing(false);
        } catch (error) {
            setRefreshing(false);
            addNotification({ message: "Não foi possivel atualizar tente mais tarde!", status: 'error' });
        }
    }

    const UpdateSinaisVitais = async (sinaisUpdate: sinaisVitaisUpdate) => {
        setActiveModal(true);
        sinaisUpdate.iE_SITUACAO = 'I';
        Api.put<sinaisVitais>(`SinaisVitaisMonitoracaoGeral/PutAtivarInativarSVMG/${sinaisUpdate.nR_SEQUENCIA}`, {
            iE_SITUACAO: sinaisUpdate?.iE_SITUACAO,
            nM_USUARIO: usertasy.usuariO_FUNCIONARIO[0]?.nM_USUARIO,
            cD_PACIENTE: sinaisUpdate.cD_PACIENTE,
        }).then(response => {
            GetSinaisVitais();
            setActiveModal(false);
            //Onclean();
            addNotification({ message: "Dado inativado com sucesso!", status: 'sucess' });
        }).catch(error => {
            setActiveModal(false);
            addNotification({ message: "Não foi possivel inativar tente mais tarde!", status: 'error' });
        })
    }

    const DeleteSinaisVitais = async (id: number) => {
        setActiveModal(true);
        Api.delete(`SinaisVitaisMonitoracaoGeral/DeleteSVMG/${id}`).then(response => {
            GetSinaisVitais();
            setActiveModal(false);
            //Onclean();
            addNotification({ message: "Dado excluir com sucesso!", status: 'sucess' });
        }).catch(error => {
            setActiveModal(false);
            addNotification({ message: "Não foi possivel excluir tente mais tarde!", status: 'error' });
        })
    }

    const setSelectedSinaisInativar = (item: sinaisVitaisUpdate) => {
        setActiveModalOptions(true);
        setSelectedSinais(item);
    }

    const setSelectedSinaisDeletar = (item: sinaisVitaisUpdate) => {
        setActiveModalDel(true);
        setSelectedSinais(item);
    }

    useEffect(() => {
        if (selected) {
            GetSinaisVitais();
        }
    }, []);

    const Item = memo<Parms>(({ item, index }) => {
        return (
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.box1}>
                    <HistorySvg width={RFPercentage(5)} height={RFPercentage(5)}>Botão</HistorySvg>
                </View>
                <View style={styles.box2}>
                    <View style={styles.item}>
                        <Text style={styles.textLabel}>Paciente: </Text>
                        <Text style={styles.text}>{`${item.nM_PESSOA_FISICA.toUpperCase()}`}</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.textLabel}>Data: </Text>
                        <Text style={styles.text}>{`${moment(item.dT_SINAL_VITAL).format('DD-MM-YYYY')}`}</Text>
                    </View>
                    <View style={styles.item}>
                        <View style={styles.SubItem}>
                            <Text style={styles.textLabel}>Altura: </Text>
                            <Text style={styles.text}>{`${item?.qT_ALTURA_CM ?? ''}`}</Text>
                        </View>
                        <View style={styles.SubItem}>
                            <Text style={styles.textLabel}>Peso: </Text>
                            <Text style={styles.text}>{`${item?.qT_PESO ?? ''}`}</Text>
                        </View>
                    </View>
                    <View style={styles.item}>
                        <View style={styles.SubItem}>
                            <Text style={styles.textLabel}>Oxigenação: </Text>
                            <Text style={styles.text}>{`${item?.qT_SATURACAO_O2 ?? ''}`}</Text>
                        </View>
                        <View style={styles.SubItem}>
                            <Text style={styles.textLabel}>Temperatura: </Text>
                            <Text style={styles.text}>{`${item?.qT_TEMP ?? ''}`}</Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.box3, { justifyContent: 'flex-end' }]}>
                    {
                        index === 0 ?
                            <View style={{flex: 1, justifyContent: 'space-between'}}>
                                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("updateSinais", { sinaisVitais: item, pessoaSelected: selected })}>
                                    <EditarSvg fill={'#748080'} width={RFPercentage(4)} height={RFPercentage(4)}/>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.btn} onPress={() => setSelectedSinaisDeletar(item)}>
                                    <ExcluirSvg fill={'#748080'} width={RFPercentage(4)} height={RFPercentage(4)}/>
                                </TouchableOpacity>
                            </View>
                            :
                            <TouchableOpacity style={styles.btn} onPress={() => setSelectedSinaisInativar(item)}>
                                <DisabledSvg fill={'#748080'} width={RFPercentage(4)} height={RFPercentage(4)}>Botão</DisabledSvg>
                            </TouchableOpacity>
                    }
                </View>
            </View>
        )
    });

    const renderItem = useCallback(({ item, index }: { item: sinaisVitais, index: number }) => {
        return (
            <CardSimples styleCardContainer={styles.cardStyle}>
                <Item key={item.nR_SEQUENCIA} item={item} index={index} />
            </CardSimples>
        )
    }, [listSinaisVitais]);

    const renderItemEmpty = () => (
        <CardSimples styleCardContainer={styles.cardStyle}>
            <Text style={styles.text}>Nenhum sinal vital encontrado</Text>
        </CardSimples>
    );

    const renderItemCall = useCallback(({ item, index }) => renderItem({ item, index }), []);

    return (
        <View style={styles.container}>
            {
                !!listSinaisVitais ?
                    <FlatList
                        data={listSinaisVitais}
                        renderItem={renderItemCall}
                        keyExtractor={(item, index) => index.toString()}
                        refreshing={refreshing}
                        onRefresh={() => {
                            setRefreshing(true);
                            GetSinaisVitais();
                        }}
                        ListEmptyComponent={renderItemEmpty}
                    />
                    :
                    <LoadingBall active={true} />
            }
            <Loading activeModal={activeModal} />
            <ModalCentralizedOptions activeModal={activeModalOptions} message={"Deseja inativar este Sinal Vital ?"} onpress={() => UpdateSinaisVitais(selectedSinais)} setActiveModal={setActiveModalOptions} />
            <ModalCentralizedOptions activeModal={activeModalDel} message={"Deseja deletar este Sinal Vital ?"} onpress={() => DeleteSinaisVitais(selectedSinais.nR_SEQUENCIA)} setActiveModal={setActiveModalDel} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingTop: RFPercentage(2)
    },
    cardStyle: {
        flex: 1
    },
    textLabel: {
        color: '#1E707D',
        fontSize: RFValue(16, 680),
        fontWeight: 'bold'
    },
    text: {
        color: '#666666',
        fontSize: RFValue(16, 680)
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    SubItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    box1: {
        flex: 0.5,
        padding: 0.5,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    box2: {
        flex: 5,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    box3: {
        flex: 0.8,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    btn: {
        padding: 5,
        marginHorizontal: 5,
        backgroundColor: '#fff',
        borderRadius: 30,
        ...Platform.select({
            ios: {
                shadowOffset: {
                    width: 0,
                    height: 5
                },
                shadowOpacity: 0.2,
                shadowRadius: 6,
            },
            android: {
                elevation: 3,
            }
        })
    }
})

export { historySinaisVitais };